"""Replay the scored menus with the per-rule loss weights removed."""
from collections import Counter
from pathlib import Path
import json
import random
import runpy

runner = runpy.run_path(str(Path(__file__).with_name("revise-observation-selector.py")))
lock, pin = runner["read"](runner["LOCK"].name)
assert lock == runner["fit"]()
scored, score_pin = runner["read"]("observation-selector-revision-test.json")
assert scored["lockSha256"] == pin
rng = random.Random(lock["seed"])
summaries = {}
for family, data in scored["families"].items():
    numeric = family == "numeric"
    rules = runner["prior"]["numeric" if numeric else "binary"]
    summary = Counter()
    rows = iter(data["rows"])
    for _ in range(lock["batches"]):
        for menu in runner["prior"]["synthetic"](rng,5 if numeric else 2):
            if family == "sparse-binary":
                menu = [[[int(bit and rng.random()<0.2) for bit in w] for w in probe] for probe in menu]
            row = next(rows)
            assert runner["digest"](runner["encode"](menu)) == row["menuSha256"]
            predictions = runner["forecasts"](menu,rules)
            best = runner["best_probes"](predictions,lock["priorModel"])
            index = runner["choose"](best,list(map(runner["survivor_sizes"],predictions)),lock["method"],{})
            for truth,_,_,reference,_,_ in row["decisions"]:
                observed = runner["prior"]["observed"](family,menu[index],truth)
                remaining = sum(v == observed for v in predictions[index].values())
                summary["cases"] += 1
                summary["losses"] += remaining > reference
                summary["unique"] += remaining == 1
    assert next(rows,None) is None
    summaries[family] = summary
print(json.dumps(dict(lockSha256=pin,scoredSha256=score_pin,summaries=summaries),indent=2))
