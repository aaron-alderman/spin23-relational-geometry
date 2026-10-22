import importlib.util
from pathlib import Path


root = Path(__file__).resolve().parent
spec = importlib.util.spec_from_file_location(
    "spin23_connectors", root / ".scratch_spin23_connectors.py"
)
module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)

carrier = next(
    c
    for c in module.strong_carriers()
    if c["lpair"] == ((1, 5), (10, 1))
    and c["rpair"] == ((10, 2), (4, 10))
)

local_edges = [{"left": [], "right": []} for _ in carrier["op"]]
for edge in carrier["graph"]["edges"]:
    p = carrier["op"][edge["u"]]
    q = carrier["op"][edge["v"]]
    horizontal = p[1] == q[0] and p[0] != q[1]
    vertical = p[0] == q[1] and p[1] != q[0]
    if horizontal:
        local_edges[edge["u"]]["left"].append(edge)
        local_edges[edge["v"]]["right"].append(edge)
    if vertical:
        local_edges[edge["u"]]["right"].append(edge)
        local_edges[edge["v"]]["left"].append(edge)

target = tuple(sorted(((2, 9), (5, 10))))
hits = []
for vertex, incident in enumerate(local_edges):
    for left in incident["left"]:
        for right in incident["right"]:
            pair = tuple(sorted((left["orbit"], right["orbit"])))
            if pair == target:
                hits.append(
                    {
                        "vertex": vertex,
                        "module": carrier["op"][vertex],
                        "left": module.edge_key(left),
                        "left_modules": (
                            carrier["op"][left["u"]],
                            carrier["op"][left["v"]],
                        ),
                        "right": module.edge_key(right),
                        "right_modules": (
                            carrier["op"][right["u"]],
                            carrier["op"][right["v"]],
                        ),
                    }
                )

print("PROTOCOL spin23-736d-dual-lock-corner/1")
print("HITS", hits)
assert len(hits) == 1
