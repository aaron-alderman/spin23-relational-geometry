"""Fit observable definitions to archived counts, then enumerate compatible two-readout histories."""
import argparse
from collections import Counter
from hashlib import sha256
from itertools import product
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
LANE = ROOT / "corpus/programmes/programme-algebra/learning"
RULES = {"first": lambda w: w[0], "last": lambda w: w[-1], "any": any, "all": all,
         "odd": lambda w: sum(w) % 2, "majority": lambda w: 2 * sum(w) > len(w)}
TARGETS = ("exactEndpoints", "exactDepartures")


def training(store):
    pin = json.loads((LANE / "departure-change-index-prepared.json").read_bytes())
    row = next(r for r in pin["traces"] if r["trace"] == "delft")
    raw = (store / "delft-manifest.json").read_bytes()
    assert sha256(raw).hexdigest() == row["manifestSha256"]
    manifest = json.loads(raw)
    packed = (store / "delft-packed.bin").read_bytes()
    width = manifest["reader"]["chunkLabels"]
    assert [sha256(packed[i:i+width]).hexdigest() for i in range(0,len(packed),width)] == manifest["reader"]["chunkSha256"]
    def label(i):
        return (packed[i//8] >> (i%8)) & 1
    examples = []
    for arm in manifest["contexts"]:
        counts = Counter()
        for start in arm["starts"]:
            assert label(start) == arm["initial"]
            window = [label(start+i) != arm["initial"] for i in range(1, arm["steps"]+1)]
            counts.update({k: int(rule(window)) for k,rule in RULES.items()})
        examples.append((counts, arm))
    return row["manifestSha256"], examples


def predict(rules, populations):
    # Each joint population is an ordered list of equally weighted sample histories.
    predictions = {}
    for population in populations:
        for name in rules:
            p = sum(RULES[name](history) for history in population)/len(population)
            predictions.setdefault(p, {"population": population, "rule": name})
    return {"possible": sorted(predictions), "witnesses": list(predictions.values())}


def run(store):
    pin, examples = training(store)
    histories = list(product((0,1), repeat=2))
    compatible = [population for population in product(histories, repeat=2)
                  if all(sum(h[i] for h in population) == 1 for i in range(2))]
    joint = [((0,1),(1,0))]
    result = {}
    for label, rows in (("withDelft", examples), ("omitDelft", [])):
        result[label] = {}
        for target in TARGETS:
            survivors = [k for k in RULES if all(counts[k]==arm[target] for counts,arm in rows)]
            result[label][target] = dict(survivors=survivors, marginals=predict(survivors,compatible),
                                        suppliedJoint=predict(survivors,joint))
    trained = result["withDelft"]
    assert [trained[k]["survivors"] for k in TARGETS] == [["last"],["any"]]
    assert [trained[k]["marginals"]["possible"] for k in TARGETS] == [[0.5],[0.5,1.0]]
    assert [trained[k]["suppliedJoint"]["possible"] for k in TARGETS] == [[0.5],[1.0]]
    assert all(len(result["omitDelft"][k]["suppliedJoint"]["possible"])>1 for k in TARGETS)
    return dict(manifestSha256=pin, contexts=len(examples), grammar=list(RULES), results=result,
                scope="Exact for two equally weighted members. Intermediate mixtures fill the interval for arbitrary population weights.")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("store", type=Path)
    print(json.dumps(run(parser.parse_args().store), indent=2))

