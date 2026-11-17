"""Freeze a prefix-based release rule and compare it with a static rule."""

import argparse
from collections import defaultdict
import importlib.util
import json
from pathlib import Path


STEM = "return-path-delft-row75"


def load_comparison():
    path = Path(__file__).with_name("compare-delft-calibrations.py")
    spec = importlib.util.spec_from_file_location("delft_comparison", path)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


def input_bundle(comparison, qualification):
    read = qualification.read_record
    plan, plan_pin = read(STEM + "-abstention-plan.json")
    prior_plan, design, prior, comparison_sources = comparison.inputs(qualification)
    sources = [
        plan_pin,
        *comparison_sources,
    ]
    _, expected_prior, expected_design, *_ = sources
    if (expected_prior["sha256"] != plan["comparisonPlanSha256"]
            or expected_design["sha256"] != plan["referencePlanSha256"]):
        raise ValueError("Comparison and abstention sources do not match")
    frozen, frozen_pin = read(STEM + "-blocked-frozen.json", plan["comparisonFrozenSha256"])
    development, development_pin = read(STEM + "-blocked-result.json", plan["developmentResultSha256"])
    sources.extend([frozen_pin, development_pin])
    learned_from = [trace["acquisition"]["replicateIndex"] for trace in development["held"]]
    used = set(learned_from) | set(prior_plan["trainingReplicateIndices"])
    reserved = plan["scoreReplicateIndices"]
    if (learned_from != plan["developmentReplicateIndices"] or not reserved
            or len(reserved) != len(set(reserved)) or used.intersection(reserved)
            or sorted(used | set(reserved)) != list(range(len(design["settingsEvidence"]["rowTimestamps"])))):
        raise ValueError("Test all reserved traces independently of training and development")
    if development["sources"] != [*comparison_sources, frozen_pin]:
        raise ValueError("Development result does not reference the frozen comparison")
    return plan, prior_plan, design, prior, comparison_sources, frozen, frozen_pin, development, sources


def group_key(row):
    return row["target"], row["startLevel"]


def grid_key(row):
    return (*group_key(row), row["stride"])


def freeze(development, sources):
    errors = defaultdict(lambda: defaultdict(list))
    for trace in development["held"]:
        for row in trace["comparisons"]:
            errors[grid_key(row)][row["policy"]].append(abs(row["signedFrequencyError"]))
    return {
        "sources": sources,
        "grids": [
            {"target": target, "startLevel": start, "stride": stride,
             "fixedMaxError": max(policies["single-repeat"]), "prefixRadius": max(policies["local-prefix"])}
            for (target, start, stride), policies in sorted(errors.items())
        ],
    }


def apply_rules(held, learned, limit):
    thresholds = {grid_key(row): row for row in learned["grids"]}
    rows = []
    for trace in held:
        groups = defaultdict(list)
        prefixes = {grid_key(row): row for row in trace["comparisons"] if row["policy"] == "local-prefix"}
        for point in (row for row in trace["comparisons"] if row["policy"] == "single-repeat"):
            key = grid_key(point)
            center = prefixes[key]["forecast"]
            limits = thresholds[key]
            radius = limits["prefixRadius"]
            low, high = max(0, center - radius), min(1, center + radius)
            fixed = point["forecast"]
            actual = point["observed"]
            groups[group_key(point)].append({
                "stride": point["stride"], "windows": point["windows"], "fixedForecast": fixed,
                "prefixForecast": center, "prefixEnvelope": [low, high], "radius": radius,
                "observed": actual, "covered": low <= actual <= high,
                "fixedError": point["signedFrequencyError"],
                "staticAdmits": limits["fixedMaxError"] <= limit,
                "prefixAdmits": low >= fixed - limit and high <= fixed + limit,
            })
        for (target, start), grids in groups.items():
            rows.append({
                "replicateIndex": trace["acquisition"]["replicateIndex"], "target": target, "startLevel": start,
                "release": {
                    "always": True,
                    "static": all(row["staticAdmits"] for row in grids),
                    "prefix": all(row["prefixAdmits"] for row in grids),
                },
                "fixedMiss": any(abs(row["fixedError"]) > limit for row in grids),
                "coveredOnAllGrids": all(row["covered"] for row in grids),
                "grids": grids,
            })
    return rows


def summarize(rows, policies):
    return {
        policy: {
            "released": sum(row["release"][policy] for row in rows),
            "releasedMisses": sum(row["release"][policy] and row["fixedMiss"] for row in rows),
            "withheldMisses": sum(not row["release"][policy] and row["fixedMiss"] for row in rows),
            "withheldAccurate": sum(not row["release"][policy] and not row["fixedMiss"] for row in rows),
        }
        for policy in policies
    }


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--envelopes", help="Frozen envelope filename in the learning directory")
    parser.add_argument("--trace-dir", type=Path, help="Directory of the reserved acquisition members")
    args = parser.parse_args()
    if bool(args.envelopes) != bool(args.trace_dir):
        parser.error("Provide --envelopes and --trace-dir together to score")
    comparison = load_comparison()
    qualification = comparison.load_qualification()
    plan, prior_plan, design, prior, comparison_sources, frozen, frozen_pin, development, sources = input_bundle(
        comparison, qualification
    )
    if not args.envelopes:
        output = freeze(development, sources)
    else:
        learned, learned_pin = qualification.read_record(args.envelopes)
        if learned != freeze(development, sources):
            raise ValueError("Frozen envelopes no longer reproduce")
        result = comparison.assess(
            qualification, args.trace_dir, prior_plan, design, prior, comparison_sources, frozen, frozen_pin,
            score_repeats=plan["scoreReplicateIndices"],
        )
        old_hashes = {trace["acquisition"]["sha256"] for trace in development["held"]}
        if any(trace["acquisition"]["sha256"] in old_hashes for trace in result["held"]):
            raise ValueError("Held trace duplicates development evidence")
        rows = apply_rules(result["held"], learned, plan["maximumAbsoluteFrequencyError"])
        output = {
            "sources": [*sources, learned_pin],
            "acquisitions": [trace["acquisition"] for trace in result["held"]],
            "policyResults": summarize(rows, plan["policies"]),
            "coverage": {
                "groupsOnAllGrids": sum(row["coveredOnAllGrids"] for row in rows),
                "groups": len(rows),
                "gridComparisonsCovered": sum(grid["covered"] for row in rows for grid in row["grids"]),
                "gridComparisons": sum(len(row["grids"]) for row in rows),
            },
            "rows": rows,
            "authority": "Empirical screening performance on the four reserved repeats. Grouped grids share windows. The observed development maxima do not guarantee coverage.",
        }
    print(json.dumps(output, indent=2, allow_nan=False))
