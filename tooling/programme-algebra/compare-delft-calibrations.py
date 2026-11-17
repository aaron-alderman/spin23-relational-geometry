"""Freeze and compare repeat-level and time-block calibrations."""

import argparse
from collections import defaultdict
import importlib.util
import json
from pathlib import Path
from statistics import mean

import numpy as np


def load_qualification():
    path = Path(__file__).with_name("qualify-delft-return-routes.py")
    spec = importlib.util.spec_from_file_location("delft_qualification", path)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


def transition_counts(labels):
    return np.bincount(2 * labels[:-1] + labels[1:], minlength=4).reshape(2, 2)


def transition_matrix(counts):
    if (counts.sum(axis=1) == 0).any():
        raise ValueError("Both decoded starting labels must occur")
    return {
        "lowToHigh": float(counts[0, 1] / counts[0].sum()),
        "highToLow": float(counts[1, 0] / counts[1].sum()),
    }


def forecast_rows(qualification, plan, chain, matrix):
    return qualification.plan_forecasts(
        {**chain, **matrix}, plan["windowSteps"], plan["startingLevels"], plan["stridesInDecodedSamples"]
    )


def forecast_index(rows):
    return {
        (row["target"], row["result"]["startLevel"], row["result"]["observationStride"]): row["result"]["probability"]
        for row in rows
    }


def inputs(qualification):
    read = qualification.read_record
    stem = "return-path-delft-row75"
    plan, plan_pin = read(stem + "-blocked-plan.json")
    design, design_pin = read(stem + "-plan.json", plan["referencePlanSha256"])
    prior, prior_pin = read(stem + "-frozen.json", plan["priorFrozenSha256"])
    old_scores, old_scores_pin = read(stem + "-qualification-result.json", plan["priorQualificationSha256"])
    training = set(plan["trainingReplicateIndices"])
    held = plan["scoreReplicateIndices"]
    expected_training = {design["design"]["calibrationReplicateIndex"]} | {
        trace["acquisition"]["replicateIndex"] for trace in old_scores["held"]
    }
    if (training != expected_training or not held or len(held) != len(set(held)) or training.intersection(held)):
        raise ValueError("New traces must be disjoint from the prior calibration and scoring repeats")
    if plan["evidenceFamily"] != design["evidenceFamily"] or prior["design"] != design_pin:
        raise ValueError("Blocked test and frozen decoder must refer to the same acquisition series")
    return plan, design, prior, [plan_pin, design_pin, prior_pin, old_scores_pin]


def freeze(qualification, directory, plan, design, prior, sources):
    audit = qualification.load_audit()
    training = []
    training_counts = []
    phase_counts = []
    for source, labels in audit.iq_score_labels(design, directory, prior["calibration"], plan["trainingReplicateIndices"][1:]):
        states = np.asarray(labels)
        training.append(source)
        training_counts.append(transition_counts(states))
        phase_counts.append([transition_counts(block) for block in np.array_split(states, plan["traceBlocks"])])

    values, step, source = audit.load_iq(design, directory, plan["trainingReplicateIndices"][0])
    if source != prior["calibration"]["acquisition"] or step != prior["sampledChain"]["periodSeconds"]:
        raise ValueError("Original calibration trace changed")
    decoder = prior["calibration"]["decoder"]
    states = ((values @ decoder["axis"]) > decoder["threshold"]).astype(int)
    training.insert(0, source)
    training_counts.insert(0, transition_counts(states))
    phase_counts.insert(0, [transition_counts(block) for block in np.array_split(states, plan["traceBlocks"])])
    chain = prior["sampledChain"]
    stages = {
        "single-repeat": transition_matrix(training_counts[0]),
        "pooled-repeats": transition_matrix(sum(training_counts)),
        **{f"matched-time-block/{block}": transition_matrix(sum(row[block] for row in phase_counts))
           for block in plan["scoreBlocks"]}
    }
    for key in stages["single-repeat"]:
        if stages["single-repeat"][key] != chain[key]:
            raise ValueError("First-repeat matrix no longer reproduces its pinned calibration")
    return {
        "sources": sources,
        "training": [
            {"acquisition": source, "matrix": transition_matrix(full),
             "blockMatrices": [transition_matrix(counts) for counts in phases]}
            for source, full, phases in zip(training, training_counts, phase_counts, strict=True)
        ],
        "models": {key: {"matrix": matrix, "forecasts": forecast_rows(qualification, plan, chain, matrix)}
                   for key, matrix in stages.items()},
    }


def assess(qualification, directory, plan, design, prior, sources, frozen, frozen_pin, *, score_repeats=None):
    if frozen["sources"] != sources:
        raise ValueError("Frozen training sources changed")
    horizon = plan["windowSteps"]
    strides = plan["stridesInDecodedSamples"]
    limit = plan["maximumAbsoluteFrequencyError"]
    audit = qualification.load_audit()
    fixed = {key: forecast_index(model["forecasts"]) for key, model in frozen["models"].items()}
    seen = {trace["acquisition"]["sha256"] for trace in frozen["training"]}
    held = []
    repeats = plan["scoreReplicateIndices"] if score_repeats is None else score_repeats
    for source, labels in audit.iq_score_labels(design, directory, prior["calibration"], repeats):
        if source["sha256"] in seen:
            raise ValueError("Held acquisition duplicates a training trace")
        seen.add(source["sha256"])
        blocks = np.array_split(np.asarray(labels), plan["traceBlocks"])
        prefix = transition_matrix(transition_counts(blocks[plan["prefixBlock"]]))
        local_rows = forecast_rows(qualification, plan, prior["sampledChain"], prefix)
        local = forecast_index(local_rows)
        observations = defaultdict(list)
        blocks_diagnostic = []
        for phase in plan["scoreBlocks"]:
            block = blocks[phase]
            blocks_diagnostic.append(transition_matrix(transition_counts(block)))
            for start in plan["startingLevels"]:
                observed = audit.compare_sample_grids(block, horizon, strides, start)
                n = observed["windowCount"]
                for grid in observed["grids"]:
                    stride = grid["stride"]
                    for target, frequency in (
                        (qualification.ENDPOINT, observed["changedEndpoint"]),
                        (qualification.DEPARTURE, grid["firstObservedExit"]),
                    ):
                        key = (target, start, stride)
                        forecasts = {
                            "single-repeat": fixed["single-repeat"][key],
                            "pooled-repeats": fixed["pooled-repeats"][key],
                            "matched-time-block": fixed[f"matched-time-block/{phase}"][key],
                            "local-prefix": local[key],
                        }
                        observations[key].append((n, frequency, forecasts))
        comparisons = []
        for (target, start, stride), terms in observations.items():
            n = sum(count for count, _, _ in terms)
            observed = sum(count * value for count, value, _ in terms) / n
            for policy in plan["candidates"]:
                forecast = sum(count * values[policy] for count, _, values in terms) / n
                error = forecast - observed
                comparisons.append({
                    "policy": policy, "target": target, "startLevel": start, "stride": stride, "windows": n,
                    "forecast": forecast, "observed": observed, "signedFrequencyError": error,
                    "withinTolerance": abs(error) <= limit,
                })
        held.append({
            "acquisition": source, "prefixMatrix": prefix, "heldBlockMatricesDiagnosticOnly": blocks_diagnostic,
            "comparisons": comparisons,
        })
    summary = []
    for policy in plan["candidates"]:
        filtered = [{"comparisons": [row for row in trace["comparisons"] if row["policy"] == policy]} for trace in held]
        errors = [abs(row["signedFrequencyError"]) for trace in filtered for row in trace["comparisons"]]
        summary.append({
            "policy": policy, "meanAbsoluteFrequencyError": mean(errors), "maxAbsoluteFrequencyError": max(errors),
            "qualifications": qualification.summarize(filtered, plan["startingLevels"]),
        })
    return {
        "sources": [*sources, frozen_pin], "held": held, "summary": summary,
        "authority": "Policies forecast the same score windows under the fixed decoder. Prefix calibration can use only earlier samples of its own trace. Future-window transition estimates are diagnostic and do not identify physical switching.",
    }


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("trace_dir", type=Path)
    parser.add_argument("--frozen", help="Previously frozen training record filename in the learning directory")
    args = parser.parse_args()
    qualification = load_qualification()
    plan, design, prior, sources = inputs(qualification)
    if args.frozen:
        frozen, frozen_pin = qualification.read_record(args.frozen)
        output = assess(qualification, args.trace_dir, plan, design, prior, sources, frozen, frozen_pin)
    else:
        output = freeze(qualification, args.trace_dir, plan, design, prior, sources)
    print(json.dumps(output, indent=2, allow_nan=False))
