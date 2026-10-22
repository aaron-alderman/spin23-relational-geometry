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
safe = {
    (1, 2), (1, 3), (1, 4), (1, 5), (1, 7), (1, 9),
    (2, 6), (2, 9), (4, 8), (5, 10), (6, 7),
}


def components(labels):
    adjacency = [set() for _ in carrier["op"]]
    for edge in carrier["graph"]["edges"]:
        if edge["orbit"] not in labels:
            continue
        adjacency[edge["u"]].add(edge["v"])
        adjacency[edge["v"]].add(edge["u"])
    unseen = set(range(len(carrier["op"])))
    out = []
    while unseen:
        root_vertex = min(unseen)
        stack = [root_vertex]
        seen = {root_vertex}
        while stack:
            vertex = stack.pop()
            for neighbor in adjacency[vertex] - seen:
                seen.add(neighbor)
                stack.append(neighbor)
        out.append(sorted(seen))
        unseen -= seen
    return out


baseline = components(safe)
results = {}
for label in sorted(safe):
    result = components(safe - {label})
    results[label] = {
        "component_count": len(result),
        "component_sizes": [len(component) for component in result],
        "isolated_modules": [
            carrier["op"][component[0]]
            for component in result
            if len(component) == 1
        ],
    }

print("PROTOCOL spin23-safe-label-essentiality/1")
print("BASELINE", len(baseline), [len(component) for component in baseline])
print("REMOVALS", results)
assert len(baseline) == 1
