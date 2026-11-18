"""Learn a tie-break from past probe losses, then compare it to the frozen selector."""
import argparse
from collections import Counter
from hashlib import sha256
import json
from pathlib import Path
import random
import runpy

HERE = Path(__file__).resolve().parent
prior = runpy.run_path(str(HERE / "test-observation-selector.py"))
LANE = prior["LANE"]
LOCK = LANE / "observation-selector-revision-frozen.json"
SEED = 31987012
BATCHES = 4


def digest(data):
    return sha256(data).hexdigest()


def read(name):
    raw = (LANE / name).read_bytes()
    return json.loads(raw), digest(raw)


def encode(data):
    return json.dumps(data, sort_keys=True, separators=(",", ":")).encode()


def forecasts(menu, rules):
    return [{name: sum(rule(window) for window in probe) for name, rule in rules.items()}
            for probe in menu]


def survivor_sizes(predictions):
    counts = Counter(predictions.values())
    return {name: counts[value] for name, value in predictions.items()}


def best_probes(predictions, model):
    scores = [model["intercept"] + model["slope"] * prior["trainer"]["disagreement"](list(p.values()))
              for p in predictions]
    return [i for i, score in enumerate(scores) if score == max(scores)]


def choose(best, sizes, method, losses):
    def penalty(i):
        costs = []
        for name, size in sizes[i].items():
            excess = max(0, size - sizes[0][name])
            if method == "count-regressions":
                costs.append(int(excess > 0))
            elif method == "excess-survivors":
                costs.append(excess)
            elif method == "weighted-excess":
                costs.append((1 + losses.get(name, 0)) * excess)
            elif method == "weighted-ambiguity":
                costs.append((1 + losses.get(name, 0)) * (size - 1))
            else:
                assert method == "original-order"
        return sum(costs)
    return min(best, key=penalty)


def fit():
    receipt, old_hash = read("observation-selector-test.json")
    frozen, lock_hash = read("observation-selector-frozen.json")
    assert receipt["frozenSha256"] == lock_hash
    assert frozen == prior["trainer"]["freeze"]()
    assert receipt["testCodeSha256"] == digest((HERE/"test-observation-selector.py").read_bytes())
    cases, losses, loss_ids = [], Counter(), []
    for family, data in receipt["families"].items():
        rules = prior["numeric" if family == "numeric" else "binary"]
        for j, row in enumerate(data["rows"]):
            preds = forecasts(row["menu"], rules)
            sizes = list(map(survivor_sizes, preds))
            best = best_probes(preds, frozen["model"])
            assert row["choices"] == {"original":0, "learned":best[0]}
            for decision in row["decisions"]:
                truth = decision["truth"]
                base, old = sizes[0][truth], sizes[best[0]][truth]
                assert (base, old) == tuple(len(decision[k]["survivors"]) for k in ("original","learned"))
                if old > base:
                    losses[truth] += 1
                    loss_ids.append([family,j,truth,base,old])
                cases.append((best,sizes,truth,base,old))
    trials = []
    for method in ("original-order","count-regressions","excess-survivors","weighted-excess","weighted-ambiguity"):
        outstanding = total_regressions = remaining = 0
        for best,sizes,truth,base,old in cases:
            new = sizes[choose(best,sizes,method,losses)][truth]
            outstanding += old > base and new > base
            total_regressions += new > base
            remaining += new
        trials.append(dict(method=method,stillLost=outstanding,allRegressions=total_regressions,
                           totalSurvivors=remaining))
    winner = min(trials,key=lambda r:(r["stillLost"],r["allRegressions"],r["totalSurvivors"]))
    return dict(priorResults=old_hash,priorLock=lock_hash,runner=digest(Path(__file__).read_bytes()),
                priorModel=frozen["model"],lossRows=loss_ids,lossFrequency=losses,trials=trials,
                method=winner["method"] if loss_ids else "original-order",
                omissionMethod="original-order",seed=SEED,batches=BATCHES,
                protocol="Primary: regressions versus the supplied first probe. Secondary: direct fewer/same/more, unique and total survivors. Each selector takes one aggregate per truth. Four batches of 32 fresh menus in each family; score all six truths.")


def test():
    lock, lock_pin = read(LOCK.name)
    assert lock == fit()
    archive, _ = read("observation-selector-test.json")
    seen = {digest(encode(row["menu"])) for family in archive["families"].values() for row in family["rows"]}
    rng = random.Random(SEED)
    families = {}
    for family in ("binary","numeric","sparse-binary"):
        rules = prior["numeric" if family == "numeric" else "binary"]
        stats = Counter()
        rows = []
        for _ in range(BATCHES):
            menus = prior["synthetic"](rng, 5 if family == "numeric" else 2)
            if family == "sparse-binary":
                menus = [[[[int(bit and rng.random() < 0.2) for bit in w] for w in probe]
                          for probe in menu] for menu in menus]
            for menu in menus:
                key = digest(encode(menu))
                assert key not in seen
                seen.add(key)
                preds = forecasts(menu,rules)
                sizes = list(map(survivor_sizes,preds))
                best = best_probes(preds,lock["priorModel"])
                old = best[0]
                new = choose(best,sizes,lock["method"],lock["lossFrequency"])
                assert old == choose(best,sizes,lock["omissionMethod"],{})
                stats["changedProbes"] += new != old
                decisions = []
                for truth in rules:
                    # Exactly one oracle label per arm. Passive-reference sizes are computed
                    # counterfactually by the evaluator after both choices have been frozen.
                    labels = [prior["observed"](family,menu[i],truth) for i in (old,new)]
                    assert labels == [preds[i][truth] for i in (old,new)]
                    a,b = [sum(v == label for v in preds[i].values()) for i,label in zip((old,new),labels)]
                    reference = sizes[0][truth]
                    stats["cases"] += 1
                    stats["oldLosses"] += a > reference
                    stats["newLosses"] += b > reference
                    stats["repaired"] += a > reference and b <= reference
                    stats["introduced"] += a <= reference and b > reference
                    stats["oldUnique"] += a == 1
                    stats["newUnique"] += b == 1
                    stats["oldSurvivors"] += a
                    stats["newSurvivors"] += b
                    stats["fewer" if b<a else "more" if b>a else "same"] += 1
                    decisions.append([truth,*labels,reference,a,b])
                rows.append(dict(menuSha256=key,frozenProbe=old,revisedProbe=new,decisions=decisions))
        assert stats["oldSurvivors"] == stats["newSurvivors"]
        families[family] = dict(summary=stats,rows=rows)
    return dict(lockSha256=lock_pin,decisionColumns=["truth","frozenLabel","revisedLabel","firstProbeSize",
                "frozenSize","revisedSize"],families=families)


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("stage",choices=["fit","test"])
    args = parser.parse_args()
    print(json.dumps(fit() if args.stage=="fit" else test(),indent=2 if args.stage=="fit" else None))
