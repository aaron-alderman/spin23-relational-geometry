"""Calculate the scope-hint cost boundary and evaluate recorded cohorts."""

import argparse
from collections import Counter
import hashlib
import json
from pathlib import Path


ROOT = Path(__file__).resolve().parents[2]
LANE = ROOT / "corpus/programmes/programme-algebra/learning"
ENDINGS = ("short", "narrow", "expanding")


def read(path, expected=None):
    raw = path.read_bytes()
    digest = hashlib.sha256(raw).hexdigest()
    if expected is not None and digest != expected:
        raise ValueError(f"Evidence changed: {path.name}")
    return json.loads(raw), digest


def boundary(replay):
    costs = {}
    for name in ENDINGS:
        runs = replay["workloads"][name]["runs"]
        missing = runs["missing"]["totalIncludingHint"]
        expand = runs["expand"]["totalIncludingHint"]
        costs[name] = {"missing": missing, "expand": expand, "incrementalExpandBytes": expand - missing}
    short, narrow, expanded = (costs[name]["incrementalExpandBytes"] for name in ENDINGS)
    assert 0 < short <= narrow and expanded < 0
    return {
        "pairedCosts": costs,
        "expectedIncrementalBytes": {
            "shortProbabilityCoefficient": short, "narrowProbabilityCoefficient": narrow,
            "expansionProbabilityCoefficient": expanded,
        },
        "expansionBreakEvenRange": [short / (short - expanded), narrow / (narrow - expanded)],
        "limitingMixes": ["Every nonexpanding stream stops early", "Every nonexpanding stream completes the narrow prefix"],
    }


def record_key(row):
    return row["family"], row["streamId"]


def summarize(rows, policy):
    endings = Counter(row["ending"] for row in rows)
    by_policy = {key: sum(row["pairedBytes"][key] for row in rows) for key in ("missing", "expand")}
    return {
        "streams": len(rows), "evidenceFamilies": sorted({row["family"] for row in rows}),
        "endings": {ending: endings[ending] for ending in ENDINGS},
        "expansionFraction": endings["expanding"] / len(rows),
        "fixedPolicyBytes": by_policy, "frozenPolicyBytes": by_policy[policy],
        "bytesSavedVersusNoHint": by_policy["missing"] - by_policy[policy],
    }


def select(training):
    delta = sum(row["pairedBytes"]["expand"] - row["pairedBytes"]["missing"] for row in training)
    return "expand" if delta < 0 else "missing"


def verify_pair(row, directory):
    records = []
    for key in ("requestReceipt", "pairedCostReceipt"):
        reference = row[key]
        digest = reference["sha256"]
        if not isinstance(digest, str) or len(digest) != 64 or any(c not in "0123456789abcdef" for c in digest):
            raise ValueError("Need request and paired-cost receipt hashes")
        data, _ = read(directory / reference["path"], digest)
        records.append(data)
    request, paired = records
    fields = ("family", "streamId", "evidenceClass", "complete", "receivedHint", "ending")
    if any(request.get(field) != row[field] for field in fields):
        raise ValueError("Request receipt disagrees with the recorded stream")
    if (paired["requestReceiptSha256"] != row["requestReceipt"]["sha256"]
            or paired.get("answersMatched") is not True or paired["pairedBytes"] != row["pairedBytes"]):
        raise ValueError("Paired costs must verify the same request receipt and answers")


def score(frame, directory=LANE):
    if frame is None:
        return {"status": "no-recorded-cohorts", "calibratedExpansionFraction": None}
    training, held = frame["training"], frame["held"]
    seen = set()
    observed = []
    for rows in (training, held):
        accepted = []
        for row in rows:
            if (row.get("evidenceClass") != "recorded-request-stream" or row.get("complete") is not True
                    or row.get("receivedHint") != "expand" or row.get("ending") not in ENDINGS):
                raise ValueError("Need complete recorded demand with a delivered expansion hint")
            family, stream = record_key(row)
            if not all(isinstance(field, str) and field.strip() for field in (family, stream)):
                raise ValueError("Need a request stream identity and evidence family")
            if (family, stream) in seen:
                raise ValueError("Duplicate stream")
            seen.add((family, stream))
            costs = row["pairedBytes"]
            if set(costs) != {"missing", "expand"} or any(type(value) is not int or value < 0 for value in costs.values()):
                raise ValueError("Need nonnegative paired byte totals")
            verify_pair(row, directory)
            accepted.append(row)
        observed.append(accepted)
    train, test = observed
    if not train or not test:
        return {"status": "no-recorded-cohorts", "calibratedExpansionFraction": None}
    if {row["family"] for row in train} & {row["family"] for row in test}:
        raise ValueError("Training and holdout share an evidence family")
    policy = select(train)
    return {
        "status": "held-cohort-scored", "frozenPolicy": policy,
        "training": summarize(train, policy), "held": summarize(test, policy),
        "authority": "Descriptive evidence for the supplied request and paired-cost receipts. Keep their acquisition provenance with this result.",
    }


def control(cases):
    costs = cases["pairedCosts"]
    cheap = {"pairedBytes": {key: costs["short"][key] for key in ("missing", "expand")}}
    expansion = {"pairedBytes": {key: costs["expanding"][key] for key in ("missing", "expand")}}
    assert select([cheap]) == "missing" and select([expansion]) == "expand"
    try:
        score({"training": [{**expansion, "evidenceClass": "controlled-ending"}], "held": []})
    except ValueError as exc:
        assert "recorded demand" in str(exc)
    else:
        raise AssertionError("Intervention must be rejected by the cohort scorer")
    return {"trainingCostCases": "both policy choices verified", "controlledEnding": "refused as calibration"}


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--recorded-cohorts", type=Path)
    args = parser.parse_args()
    plan, plan_pin = read(LANE / "departure-scope-calibration-plan.json")
    replay, replay_pin = read(LANE / "departure-scope-hint-replay.json", plan["interventionReplaySha256"])
    costs = boundary(replay)
    frame, frame_pin = read(args.recorded_cohorts) if args.recorded_cohorts else (None, None)
    print(json.dumps({
        "planSha256": plan_pin, "interventionReplaySha256": replay_pin, "recordedCohortsSha256": frame_pin,
        "boundary": costs, "controls": control(costs),
        "calibration": score(frame, args.recorded_cohorts.parent if args.recorded_cohorts else LANE),
    }, indent=2, allow_nan=False))
