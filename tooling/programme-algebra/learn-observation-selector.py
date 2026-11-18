"""Fit and freeze observation utility using only previously recorded investigations."""
from hashlib import sha256
from itertools import combinations
from pathlib import Path
import json
from statistics import mean

LANE = Path(__file__).resolve().parents[2] / "corpus/programmes/programme-algebra/learning"
TOL = 1e-12


def disagreement(predictions):
    pairs = list(combinations(predictions, 2))
    return mean(abs(a-b) > 2*TOL for a,b in pairs) if pairs else 0


def fit(rows):
    # Give each investigation equal total weight.
    weights = [1 / sum(other["family"] == r["family"] for other in rows) for r in rows]
    def avg(field):
        return sum(w*r[field] for w,r in zip(weights,rows))/sum(weights)
    x, y = avg("disagreement"), avg("eliminatedFraction")
    variance = sum(w*(r["disagreement"]-x)**2 for w,r in zip(weights,rows))
    if variance == 0:
        return {"intercept": y, "slope": 0}
    slope = sum(w*(r["disagreement"]-x)*(r["eliminatedFraction"]-y) for w,r in zip(weights,rows))/variance
    return {"intercept": y-slope*x, "slope": slope}


def freeze():
    pins, rows = {}, []
    def read(name):
        raw = (LANE / (name+".json")).read_bytes()
        pins[name] = sha256(raw).hexdigest()
        return json.loads(raw)
    def add(family, probe, predictions, observed):
        survivors = sum(abs(v-observed) <= TOL for v in predictions)
        assert survivors
        rows.append(dict(family=family, probe=probe, predictions=predictions, observed=observed,
                         disagreement=disagreement(predictions), eliminatedFraction=1-survivors/len(predictions)))
    survival = read("survival-proposal-audit")
    candidates = survival["candidates"]
    for i, item in enumerate([survival["training"], *survival["challenges"]]):
        forecasts = [c["training"] if i==0 else c["challenges"][i-1] for c in candidates]
        assert all(f["case"] == item["case"] for f in forecasts)
        add("survival",item["case"],[f["prediction"] for f in forecasts],item["replayProbability"])
    detector = read("detector-inferred-proposals")
    challenge = read("detector-proposal-challenge")
    for collection in ([c for c in detector["fitted"] if c["candidate"] in detector["remaining"]], challenge["results"]):
        assert len(collection)==2 and all(c["candidate"] in detector["remaining"] for c in collection)
        for forecasts in zip(*(c["observations"] for c in collection),strict=True):
            assert len({(f["at"],f["expected"]) for f in forecasts})==1
            add("detector",forecasts[0]["at"],[f["prediction"] for f in forecasts],forecasts[0]["expected"])
    return dict(sources=pins, rows=rows, model=fit(rows),
                leaveOneFamilyOut={f:fit([r for r in rows if r["family"]!=f]) for f in ("survival","detector")},
                noHistory={"slope":0,"intercept":0}, tolerance=TOL,
                feature="fraction of candidate pairs with predictions separated by more than twice tolerance",
                design="One observed aggregate per policy per hidden target. First supplied probe for the passive learner and for utility ties. Synthetic test enumerates all six truths on 32 menus of 8 probes for each of two families. Each probe costs four histories of length five. Recorded parity uses equal-sized disjoint blocks, 4 windows of 5 samples, targets endpoint and any. Seed 20261118.")


if __name__ == "__main__":
    print(json.dumps(freeze(),indent=2))
