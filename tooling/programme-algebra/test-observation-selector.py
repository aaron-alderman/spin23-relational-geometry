"""Compare a frozen observation selector with the original passive elimination learner."""
import argparse
from hashlib import sha256
import json
from pathlib import Path
import random
import runpy
from statistics import mean, median

HERE = Path(__file__).resolve().parent
trainer = runpy.run_path(str(HERE/"learn-observation-selector.py"))
LANE = trainer["LANE"]
binary = runpy.run_path(str(HERE/"test-marginal-transfer.py"))["RULES"]
numeric = {"first":lambda w:w[0],"last":lambda w:w[-1],"min":min,"max":max,
           "median":median,"sum":sum}
BUDGET = 1


def observed(family, probe, truth):
    # Independent oracle implementation. No oracle calls during observation selection.
    total = 0
    for w in probe:
        if family=="numeric":
            ordered = sorted(w)
            results = dict(first=w[0],last=w[4],min=ordered[0],max=ordered[4],median=ordered[2],sum=sum(w))
        else:
            ones = w.count(1)
            results = dict(first=w[0],last=w[4],any=ones>0,all=ones==5,odd=ones%2,majority=ones>=3)
        total += results[truth]
    return total


def evaluate(family, menus, rules, truths, lock):
    rows = []
    for menu in menus:
        predictions = [{name:sum(rule(w) for w in probe) for name,rule in rules.items()} for probe in menu]
        features = [trainer["disagreement"](list(p.values())) for p in predictions]
        def choose(model):
            return max(range(len(menu)),key=lambda i:model["intercept"]+model["slope"]*features[i])
        active = choose(lock["model"])
        assert choose(lock["noHistory"])==0
        choices = {"original":0,"learned":active}
        decisions = []
        for truth in truths:
            decision = {}
            for policy, index in choices.items():
                value = observed(family,menu[index],truth)
                survivors = [k for k,v in predictions[index].items() if v==value]
                assert truth in survivors
                decision[policy] = dict(label=value,survivors=survivors)
            decisions.append(dict(truth=truth,**decision))
        rows.append(dict(menu=menu,choices=choices,features=features,decisions=decisions))
    cases = [d for r in rows for d in r["decisions"]]
    sizes = {k:[len(d[k]["survivors"]) for d in cases] for k in choices}
    summary = {k:dict(unique=v.count(1),meanRemaining=mean(v),labelsSpent=len(cases)*BUDGET) for k,v in sizes.items()}
    deltas = [a-b for a,b in zip(sizes["original"],sizes["learned"],strict=True)]
    return dict(menus=len(rows),cases=len(cases),summary=summary,
                fewer=sum(d>0 for d in deltas),same=deltas.count(0),more=sum(d<0 for d in deltas),rows=rows)


def synthetic(rng, alphabet):
    return [[[[rng.randrange(alphabet) for _ in range(5)] for _ in range(4)] for _ in range(8)] for _ in range(32)]


def parity(store, rng):
    prepared = json.loads((LANE/"departure-change-index-prepared.json").read_bytes())
    entry = next(e for e in prepared["traces"] if e["trace"]=="parity")
    raw = (store/"parity-manifest.json").read_bytes()
    assert sha256(raw).hexdigest()==entry["manifestSha256"]
    manifest = json.loads(raw)
    packed = (store/"parity-packed.bin").read_bytes()
    width = manifest["reader"]["chunkLabels"]
    assert [sha256(packed[i:i+width]).hexdigest() for i in range(0,len(packed),width)] == manifest["reader"]["chunkSha256"]
    def label(i):
        return packed[i//8]>>(i%8)&1
    # One starting label and five subsequent readouts, expressed relative to the start.
    windows = [[label(i+j)!=label(i) for j in range(1,6)] for i in range(0,manifest["labels"]-5,6)]
    rng.shuffle(windows)
    menus = [[windows[i+j:i+j+4] for j in range(0,32,4)] for i in range(0,len(windows)-31,32)]
    return menus,entry["manifestSha256"]


def test(store, frozen):
    raw = frozen.read_bytes()
    lock = json.loads(raw)
    assert lock == trainer["freeze"](), "Frozen policy or training sources changed"
    rng = random.Random(20261118)
    families = {}
    for family,alphabet,rules in (("binary",2,binary),("numeric",5,numeric)):
        families[family] = evaluate(family,synthetic(rng,alphabet),rules,rules,lock)
    menus,pin = parity(store,rng)
    families["parity"] = evaluate("parity",menus,binary,["last","any"],lock)
    return dict(frozenSha256=sha256(raw).hexdigest(),testCodeSha256=sha256(Path(__file__).read_bytes()).hexdigest(),
                parityManifestSha256=pin,seed=20261118,evidenceBudget=BUDGET,families=families)


if __name__ == "__main__":
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument("store",type=Path)
    parser.add_argument("frozen",type=Path)
    args=parser.parse_args()
    print(json.dumps(test(args.store,args.frozen),separators=(",",":")))

