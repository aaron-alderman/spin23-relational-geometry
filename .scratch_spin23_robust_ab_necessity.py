from collections import Counter, deque
from fractions import Fraction
import importlib.util

spec = importlib.util.spec_from_file_location("connectors", ".scratch_spin23_connectors.py")
c = importlib.util.module_from_spec(spec)
spec.loader.exec_module(c)


def trace_weight(op, node):
    return sum(Fraction(c.DIMS[j], 2) if i == node else Fraction(c.DIMS[i], 2) if j == node else 0
               for i, j in op)


def components(n, edges):
    adjacency = [set() for _ in range(n)]
    for edge in edges:
        adjacency[edge["u"]].add(edge["v"])
        adjacency[edge["v"]].add(edge["u"])
    unseen = set(range(n))
    sizes = []
    while unseen:
        root = next(iter(unseen))
        seen = {root}
        queue = deque([root])
        while queue:
            u = queue.popleft()
            for v in adjacency[u] - seen:
                seen.add(v)
                queue.append(v)
        sizes.append(len(seen))
        unseen -= seen
    return tuple(sorted(sizes, reverse=True))


rows = []
for index, carrier in enumerate(c.strong_carriers(), 1):
    phase = {node: carrier["phase"][g] for g, group in enumerate(c.GROUPS) for node in group}
    colored = lambda label: (label[0] in {5, 10}) ^ (label[1] in {5, 10})
    direct_ql = lambda label: colored(label) and abs(phase[label[0]] - phase[label[1]]) == 172
    ab = lambda label: ((label[0] in c.A and label[1] in c.B) or
                        (label[1] in c.A and label[0] in c.B))
    safe = [edge for edge in carrier["graph"]["edges"] if not direct_ql(edge["orbit"])]
    no_ab = [edge for edge in safe if not ab(edge["orbit"])]
    k5, k10 = trace_weight(carrier["op"], 5), trace_weight(carrier["op"], 10)
    rows.append((k5, k10, carrier, components(len(carrier["op"]), safe), components(len(carrier["op"]), no_ab)))
    if index % 8 == 0:
        print("PROGRESS", index, flush=True)

print("CARRIERS", len(rows))
print("TRACE_SPLITS", Counter((str(k5), str(k10)) for k5, k10, *_ in rows))
for split in sorted(set((k5, k10) for k5, k10, *_ in rows)):
    subset = [row for row in rows if row[:2] == split]
    print("SPLIT", tuple(str(x) for x in split), "COUNT", len(subset))
    print("SAFE_COMPONENTS", Counter(row[3] for row in subset))
    print("NO_AB_COMPONENTS", Counter(row[4] for row in subset))
    connected_without = [row for row in subset if row[4] == (20,)]
    print("CONNECTED_WITHOUT_AB", len(connected_without))
    for row in connected_without[:6]:
        carrier = row[2]
        print("NO_AB_EXAMPLE", carrier["lpair"], carrier["rpair"], "DET", carrier["det"])
