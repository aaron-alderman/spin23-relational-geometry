"""Fit a second-observation policy on past menus and score a locked two-label comparison."""
import argparse
from collections import Counter
import json
from pathlib import Path
import random
import runpy

HERE = Path(__file__).resolve().parent
rev = runpy.run_path(str(HERE / "revise-observation-selector.py"))
prior = rev["prior"]
read = rev["read"]
LOCK = "second-probe-frozen.json"
SEED = 57428193
METHODS = ("repeat-frozen", "joint-fixed", "survivor-frozen", "conditional-unique")


def frozen_choice(probes, lock):
    best = rev["best_probes"](probes, lock["priorModel"])
    return rev["choose"](best, list(map(rev["survivor_sizes"], probes)), lock["method"], lock["lossFrequency"])


def split_score(values):
    groups = Counter(values)
    return (sum(size == 1 for size in groups.values()), -sum(size**2 for size in groups.values()))


def second_policy(predictions, first, label, lock):
    remaining = [i for i in range(len(predictions)) if i != first]
    probs = [predictions[i] for i in remaining]
    candidates = [name for name, value in predictions[first].items() if value == label]
    assert candidates
    subset = [{name:p[name] for name in candidates} for p in probs]
    repeat = frozen_choice(probs, lock)
    # This control commits to one second probe over all first-label branches.
    fixed = max(range(len(probs)),key=lambda j:split_score(
        (value,probs[j][name]) for name,value in predictions[first].items()))
    conditional = frozen_choice(subset, lock)
    unique = max(range(len(probs)),key=lambda j:split_score(subset[j].values()))
    return dict(zip(METHODS, (remaining[i] for i in (repeat,fixed,conditional,unique))))


def menus(rng, family):
    data = prior["synthetic"](rng,5 if family=="numeric" else 2)
    if family == "sparse-binary":
        return [[[[int(bit and rng.random()<0.2) for bit in w] for w in probe]
                 for probe in menu] for menu in data]
    return data


def train():
    old, old_pin = read("observation-selector-revision-frozen.json")
    assert old == rev["fit"]()
    records, records_pin = read("observation-selector-revision-test.json")
    assert records["lockSha256"] == old_pin
    rng = random.Random(old["seed"])
    scores = {key:Counter() for key in METHODS}
    for family, dataset in records["families"].items():
        rules = prior["numeric" if family=="numeric" else "binary"]
        stored = iter(dataset["rows"])
        for _ in range(old["batches"]):
            for menu in menus(rng,family):
                row = next(stored)
                assert rev["digest"](rev["encode"](menu)) == row["menuSha256"]
                preds = rev["forecasts"](menu,rules)
                i = frozen_choice(preds,old)
                assert i == row["revisedProbe"]
                branches = {y:second_policy(preds,i,y,old) for y in set(preds[i].values())}
                for truth,_,label,_,_,count in row["decisions"]:
                    assert label == preds[i][truth]
                    current = [name for name in rules if preds[i][name]==label]
                    assert len(current)==count
                    for method,j in branches[label].items():
                        # Historical first labels; counterfactual second labels from the known synthetic rule.
                        outcome = preds[j][truth]
                        size = sum(preds[j][name]==outcome for name in current)
                        scores[method]["unique"] += size==1
                        scores[method]["survivors"] += size
                        scores[method]["cases"] += 1
        assert next(stored,None) is None
    winner = max(METHODS,key=lambda m:(scores[m]["unique"],-scores[m]["survivors"]))
    return dict(priorLock=old_pin,trainingReceipt=records_pin,runner=rev["digest"](Path(__file__).read_bytes()),
                scores=scores,winner=winner,seed=SEED,menusPerFamily=128,budget=2,
                criterion="Maximize unique rules after two labels, then minimize total survivors. Ties follow declared method order.",
                methods=METHODS)


def test():
    lock,pin = read(LOCK)
    assert lock == json.loads(json.dumps(train()))
    old,_ = read("observation-selector-revision-frozen.json")
    original,_ = read("observation-selector-test.json")
    previous,_ = read("observation-selector-revision-test.json")
    seen = {r["menuSha256"] for d in previous["families"].values() for r in d["rows"]}
    seen.update(rev["digest"](rev["encode"](r["menu"])) for d in original["families"].values() for r in d["rows"])
    rng = random.Random(lock["seed"])
    results = {}
    for family in ("binary","numeric","sparse-binary"):
        rules = prior["numeric" if family=="numeric" else "binary"]
        stats = Counter()
        outcomes = {m:Counter() for m in METHODS}
        rows = []
        for _ in range(lock["menusPerFamily"]//32):
            for menu in menus(rng,family):
                key = rev["digest"](rev["encode"](menu))
                assert key not in seen
                seen.add(key)
                preds = rev["forecasts"](menu,rules)
                i = frozen_choice(preds,old)
                decisions = []
                branch_choices = {}
                for truth in rules:
                    # Shared first acquisition. Each comparator independently pays for its chosen second label.
                    label = prior["observed"](family,menu[i],truth)
                    assert label == preds[i][truth]
                    current = [name for name in rules if preds[i][name]==label]
                    stats["firstUnique"] += len(current)==1
                    choices = second_policy(preds,i,label,old)
                    sizes = {}
                    labels = {}
                    for method,j in choices.items():
                        assert j!=i
                        labels[method] = prior["observed"](family,menu[j],truth)
                        assert labels[method] == preds[j][truth]
                        sizes[method] = sum(preds[j][name]==labels[method] for name in current)
                        outcomes[method]["unique"] += sizes[method]==1
                        outcomes[method]["survivors"] += sizes[method]
                        outcomes[method]["labelsSpent"] += 2
                    a,b = sizes["repeat-frozen"],sizes[lock["winner"]]
                    stats["fewer" if b<a else "more" if b>a else "same"] += 1
                    if len(current)>1:
                        branch_choices[label] = choices[lock["winner"]]
                    decisions.append([truth,label,choices,labels,sizes])
                stats["menusWithDifferentAmbiguousBranchChoices"] += len(set(branch_choices.values()))>1
                rows.append(dict(menuHash=key,first=i,decisions=decisions))
        results[family]=dict(stats=stats,outcomes=outcomes,rows=rows)
    return dict(lockSha256=pin,decisionColumns=["truth","firstLabel","secondProbe","secondLabel","survivorCount"],
                families=results)


if __name__=="__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("stage",choices=["train","test"])
    args = parser.parse_args()
    print(json.dumps(train() if args.stage=="train" else test(),indent=2 if args.stage=="train" else None))
