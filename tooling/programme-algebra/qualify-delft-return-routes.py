"""Score frozen sampled-return forecasts on the reserved Delft trace."""

import argparse
import hashlib
import importlib.util
import json
from pathlib import Path
import subprocess
from tempfile import TemporaryDirectory


ROOT = Path(__file__).resolve().parents[2]
LANE = ROOT / "corpus/programmes/programme-algebra/learning"
STEM = "return-path-delft"
PRIOR_PLANS = ("", "-thinning", "-noise", "-interleaved", "-injection", "-shape")
ENDPOINT = "changed-endpoint-probability"
DEPARTURE = "first-observed-exit-probability"


def read_record(name, expected=None):
    path = LANE / name
    raw = path.read_bytes()
    digest = hashlib.sha256(raw).hexdigest()
    if expected is not None and digest != expected:
        raise ValueError(f"Frozen input changed: {name}")
    return json.loads(raw), {"path": path.relative_to(ROOT).as_posix(), "sha256": digest}


def load_audit():
    path = Path(__file__).with_name("audit-return-path.py")
    spec = importlib.util.spec_from_file_location("return_path_audit", path)
    audit = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(audit)
    return audit


def score(audit, directory, design, calibration, requested, horizon, strides, levels, limit, reference):
    held = []
    for source, labels in audit.iq_score_labels(design, directory, calibration, requested):
        rows = []
        for start in levels:
            arm = audit.compare_sample_grids(labels, horizon, strides, start)
            for grid in arm["grids"]:
                stride = grid["stride"]
                for target, observed in ((ENDPOINT, arm["changedEndpoint"]), (DEPARTURE, grid["firstObservedExit"])):
                    predicted = reference[(target, start, stride)]
                    error = predicted - observed
                    rows.append({
                        "target": target, "startLevel": start, "stride": stride, "windows": arm["windowCount"],
                        "forecast": predicted, "observed": observed, "signedFrequencyError": error,
                        "withinTolerance": abs(error) <= limit,
                    })
        held.append({"acquisition": source, "comparisons": rows})
    return held


def summarize(held, levels):
    qualifications = []
    for start in levels:
        for target in (ENDPOINT, DEPARTURE):
            applicable = [
                row for trace in held for row in trace["comparisons"]
                if row["startLevel"] == start and row["target"] == target
            ]
            worst_error = max(abs(row["signedFrequencyError"]) for row in applicable)
            by_stride = {
                stride: all(row["withinTolerance"] for row in applicable if row["stride"] == stride)
                for stride in sorted({row["stride"] for row in applicable})
            }
            qualifications.append({
                "target": target, "startLevel": start,
                "pass": all(row["withinTolerance"] for row in applicable),
                "maxAbsoluteFrequencyError": worst_error,
                "withinToleranceGrids": [stride for stride, passed in by_stride.items() if passed],
            })
    return qualifications


def qualify(directory):
    plan, plan_pin = read_record(f"{STEM}-qualification-plan.json")
    design, design_pin = read_record(f"{STEM}-plan.json", plan["referencePlanSha256"])
    calibration, calibration_pin = read_record(f"{STEM}-calibration.json", plan["calibrationSha256"])
    forecast, forecast_pin = read_record("return-routes-replay.json", plan["forecastReplaySha256"])
    acquisition = calibration["acquisition"]
    if not (design["evidenceFamily"] == calibration["evidenceFamily"] == forecast["sampledChain"]["context"]
            == plan["evidenceFamily"] and calibration["planSha256"] == design_pin["sha256"]
            and forecast["sampledChain"]["periodSeconds"] == calibration["binnedSamplePeriodSeconds"]
            and acquisition["replicateIndex"] == plan["calibrationReplicateIndex"]
            and calibration_pin in forecast["sources"]):
        raise ValueError("Forecast, decoder, and qualification plan must share the same calibration")

    used = {acquisition["replicateIndex"]}
    prior_pins = []
    for suffix in PRIOR_PLANS:
        prior, prior_pin = read_record(f"{STEM}{suffix}-plan.json")
        prior_pins.append(prior_pin)
        scores = prior["scoreReplicateIndices"] if suffix else prior["design"]["scoreReplicateIndices"]
        used.update(scores)
    requested = plan["scoreReplicateIndices"]
    if not requested or used.intersection(requested) or len(requested) != len(set(requested)):
        raise ValueError("Score only distinct reserved repeats")

    horizon = plan["windowSteps"]
    period = calibration["binnedSamplePeriodSeconds"]
    strides = plan["stridesInDecodedSamples"]
    levels = plan["startingLevels"]
    limit = plan["maximumAbsoluteFrequencyError"]
    reference_repeat = plan["forecastReferenceReplicateIndex"]
    reference = {
        (row["target"], row["result"]["startLevel"], row["result"]["observationStride"]): row["result"]["probability"]
        for row in forecast["rows"]
        if row["replicate"] == reference_repeat and row["result"]["windowSeconds"] == horizon * period
    }
    held = score(load_audit(), directory, design, calibration, requested, horizon, strides, levels, limit, reference)
    return {
        "sources": [plan_pin, design_pin, calibration_pin, forecast_pin, *prior_pins[1:]],
        "earlierReplicateIndices": sorted(used),
        "scope": {
            "evidenceFamily": plan["evidenceFamily"], "calibration": acquisition,
            "sampledChain": forecast["sampledChain"],
            "windowSteps": horizon, "windowSeconds": horizon * period, "strides": strides,
            "maximumAbsoluteFrequencyError": limit,
        },
        "held": held, "qualifications": summarize(held, levels),
        "authority": "Point-error qualification on the decoded held trace under the frozen criterion. It supplies neither a coverage guarantee for new acquisitions nor a physical first-exit measurement.",
    }


def plan_forecasts(sampled_chain, window_steps, levels, strides):
    jobs = []
    for start in levels:
        for stride in strides:
            for target, event in ((ENDPOINT, "changed-state-at-readout"), (DEPARTURE, "first-observed-exit")):
                jobs.append({
                    "id": f"level-{start}-stride-{stride}/{target}",
                    "source": sampled_chain["source"], "targetType": target,
                    "facts": {
                        "sampledChain": sampled_chain,
                        "acquisition": {key: sampled_chain[key] for key in ("context", "decoder")},
                        "eventType": event, "startLevel": start,
                        "windowSteps": window_steps, "observationStride": stride,
                    },
                })
    with TemporaryDirectory(prefix="delft-forecast-") as temp:
        folder = Path(temp)
        names = [f"case-{i}.json" for i in range(len(jobs))]
        for name, job in zip(names, jobs, strict=True):
            (folder / name).write_text(json.dumps(job), encoding="utf-8")
        stream = folder / "stream.json"
        stream.write_text(json.dumps(names), encoding="utf-8")
        runner = Path(__file__).with_name("plan-admitted-budget.mjs")
        predictions = json.loads(subprocess.check_output(["node", runner, "stream", stream], cwd=ROOT))
    if len(predictions) != len(jobs) or any(row["status"] != "executed" for row in predictions):
        raise ValueError("Could not freeze all sampled return forecasts")
    return [{"target": job["targetType"], "result": row} for job, row in zip(jobs, predictions, strict=True)]


def freeze(directory, design, design_pin):
    calibration = load_audit().iq_calibration(design, design_pin["sha256"], directory)
    fit = calibration["ratesByStartingLevel"][0]
    sampled_chain = {
        "type": "calibrated-two-state-sampled-chain",
        "context": design["evidenceFamily"], "source": design_pin["path"],
        "decoder": "frozen-five-native-sample-IQ-decoder",
        "periodSeconds": calibration["binnedSamplePeriodSeconds"],
        "lowToHigh": fit["sampledLowToHigh"], "highToLow": fit["sampledHighToLow"],
    }
    policy = design["qualification"]
    forecasts = plan_forecasts(sampled_chain, design["design"]["primaryWindowSteps"],
                               policy["startingLevels"], policy["stridesInDecodedSamples"])
    return {
        "design": design_pin, "calibration": calibration, "sampledChain": sampled_chain,
        "forecasts": forecasts,
    }


def qualify_frozen(directory, design, design_pin, frozen, frozen_pin):
    calibration = frozen["calibration"]
    if frozen["design"] != design_pin or calibration["planSha256"] != design_pin["sha256"]:
        raise ValueError("Frozen forecast must reference the exact design")
    selection = design["design"]
    policy = design["qualification"]
    requested = selection["scoreReplicateIndices"]
    if (not requested or selection["calibrationReplicateIndex"] != calibration["acquisition"]["replicateIndex"]
            or selection["calibrationReplicateIndex"] in requested or len(requested) != len(set(requested))):
        raise ValueError("Calibration and scoring traces must be distinct")
    horizon = selection["primaryWindowSteps"]
    levels = policy["startingLevels"]
    strides = policy["stridesInDecodedSamples"]
    limit = policy["maximumAbsoluteFrequencyError"]
    reference = {
        (row["target"], row["result"]["startLevel"], row["result"]["observationStride"]): row["result"]["probability"]
        for row in frozen["forecasts"]
    }
    held = score(load_audit(), directory, design, calibration, requested, horizon, strides, levels, limit, reference)
    qualifications = summarize(held, levels)
    return {
        "sources": [design_pin, frozen_pin],
        "scope": {
            "evidenceFamily": design["evidenceFamily"], "calibration": calibration["acquisition"],
            "sampledChain": frozen["sampledChain"], "windowSteps": horizon, "strides": strides,
            "maximumAbsoluteFrequencyError": limit,
        },
        "held": held, "qualifications": qualifications,
        "authority": "Held decoded forecasts at this setting on the same physical device. Qualification is limited to the declared observable, starting label, horizon and grids.",
    }


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("trace_dir", type=Path)
    parser.add_argument("--design", help="New acquisition design filename in the learning directory")
    parser.add_argument("--frozen", help="Previously frozen forecast filename in the learning directory")
    args = parser.parse_args()
    if args.frozen and not args.design:
        parser.error("--frozen requires --design")
    if args.design:
        design, design_pin = read_record(args.design)
        if args.frozen:
            frozen, frozen_pin = read_record(args.frozen)
            output = qualify_frozen(args.trace_dir, design, design_pin, frozen, frozen_pin)
        else:
            output = freeze(args.trace_dir, design, design_pin)
    else:
        output = qualify(args.trace_dir)
    print(json.dumps(output, indent=2, allow_nan=False))
