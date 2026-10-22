from collections import Counter
from fractions import Fraction
import heapq
import importlib.util

spec = importlib.util.spec_from_file_location("connectors", ".scratch_spin23_connectors.py")
c = importlib.util.module_from_spec(spec)
spec.loader.exec_module(c)

A = c.A
B = c.B
COLOR = {5, 10}


def trace_weight(op, node):
    return sum(Fraction(c.DIMS[j], 2) if i == node else Fraction(c.DIMS[i], 2) if j == node else 0
               for i, j in op)


def merged(partition, edges):
    parent = list(range(len(partition)))

    def find(x):
        while parent[x] != x:
            parent[x] = parent[parent[x]]
            x = parent[x]
        return x

    reps = {}
    for vertex, component in enumerate(partition):
        if component in reps:
            parent[find(vertex)] = find(reps[component])
        else:
            reps[component] = vertex
    for edge in edges:
        x, y = find(edge["u"]), find(edge["v"])
        if x != y:
            parent[x] = y
    roots = [find(i) for i in range(len(partition))]
    renumber = {}
    return tuple(renumber.setdefault(root, len(renumber)) for root in roots)


def minimum_support(carrier, forbid_ab=False):
    phase = {node: carrier["phase"][g] for g, group in enumerate(c.GROUPS) for node in group}

    def colored(label):
        return (label[0] in COLOR) ^ (label[1] in COLOR)

    def direct_ql(label):
        return colored(label) and abs(phase[label[0]] - phase[label[1]]) == 172

    def ab(label):
        return (label[0] in A and label[1] in B) or (label[1] in A and label[0] in B)

    admissible = [e for e in carrier["graph"]["edges"] if not direct_ql(e["orbit"])]
    by_label = {}
    for edge in admissible:
        by_label.setdefault(edge["orbit"], []).append(edge)
    labels = sorted(label for label in by_label if not (forbid_ab and ab(label)))
    weak = {tuple(sorted((9, b))) for b in B}
    start = (tuple(range(len(carrier["op"]))), False, False)
    queue = [((0, 0), (), start)]
    best = {start: (0, 0)}
    while queue:
        cost, chosen, state = heapq.heappop(queue)
        if best.get(state) != cost:
            continue
        partition, has_weak, has_color_lock = state
        if len(set(partition)) == 1 and has_weak and has_color_lock:
            return cost, chosen
        for label in labels:
            if label in chosen:
                continue
            nxt_partition = merged(partition, by_label[label])
            nxt_weak = has_weak or label in weak
            nxt_color_lock = has_color_lock or label == (5, 10)
            if (nxt_partition, nxt_weak, nxt_color_lock) == state:
                continue
            nxt = (nxt_partition, nxt_weak, nxt_color_lock)
            nxt_cost = (cost[0] + int(colored(label)), cost[1] + 1)
            if nxt_cost < best.get(nxt, (999, 999)):
                best[nxt] = nxt_cost
                heapq.heappush(queue, (nxt_cost, tuple(sorted(chosen + (label,))), nxt))
    return None


rows = []
for carrier in c.strong_carriers():
    k5, k10 = trace_weight(carrier["op"], 5), trace_weight(carrier["op"], 10)
    ordinary = minimum_support(carrier)
    no_ab = minimum_support(carrier, forbid_ab=True)
    rows.append((k5, k10, carrier, ordinary, no_ab))

print("CARRIERS", len(rows))
print("TRACE_SPLITS", Counter((str(k5), str(k10)) for k5, k10, *_ in rows))
for split in sorted(set((k5, k10) for k5, k10, *_ in rows)):
    subset = [row for row in rows if row[:2] == split]
    print("SPLIT", split, "COUNT", len(subset))
    print("OPTIMAL_COSTS", Counter(row[3][0] if row[3] else None for row in subset))
    print("NO_AB_COSTS", Counter(row[4][0] if row[4] else None for row in subset))
    print("AB_FORCED_AT_OPTIMUM", sum(row[4] is None or row[4][0] > row[3][0] for row in subset))
    print("AB_TOPOLOGICALLY_FORCED", sum(row[4] is None for row in subset))
    examples = sorted(subset, key=lambda row: (row[4] is None, row[4][0] if row[4] else (999,999), row[2]["lpair"], row[2]["rpair"]))[:4]
    for k5, k10, carrier, ordinary, no_ab in examples:
        print("EXAMPLE", carrier["lpair"], carrier["rpair"], "OPT", ordinary, "NO_AB", no_ab)
