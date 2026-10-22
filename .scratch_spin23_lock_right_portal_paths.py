import importlib.util
from collections import Counter, deque
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

pair_counts = Counter()
for incident in local_edges:
    for left in incident["left"]:
        for right in incident["right"]:
            pair = tuple(sorted((left["orbit"], right["orbit"])))
            if pair[0] in safe and pair[1] in safe:
                pair_counts[pair] += 1

adjacency = {label: set() for label in safe}
for (a, b), count in pair_counts.items():
    adjacency[a].add(b)
    adjacency[b].add(a)


def shortest_paths(source, target):
    queue = deque([[source]])
    best = None
    out = []
    while queue:
        path = queue.popleft()
        if best is not None and len(path) > best:
            continue
        node = path[-1]
        if node == target:
            best = len(path)
            out.append(path)
            continue
        for nxt in sorted(adjacency[node]):
            if nxt not in path:
                queue.append(path + [nxt])
    return out


locks = [(2, 9), (5, 10)]
rights = [(2, 6), (6, 7)]
results = {}
for source in locks:
    for target in rights:
        paths = shortest_paths(source, target)
        results[(source, target)] = [
            {
                "path": path,
                "edge_multiplicities": [
                    pair_counts[tuple(sorted((a, b)))]
                    for a, b in zip(path, path[1:])
                ],
            }
            for path in paths
        ]

print("PROTOCOL spin23-lock-right-safe-portal-paths/1")
print("DIRECT", {
    (source, target): pair_counts[tuple(sorted((source, target)))]
    for source in locks for target in rights
})
print("SHORTEST", results)
assert all(
    pair_counts[tuple(sorted((source, target)))] == 0
    for source in locks for target in rights
)
