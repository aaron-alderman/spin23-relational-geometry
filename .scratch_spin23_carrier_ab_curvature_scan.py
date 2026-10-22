from collections import Counter
from itertools import combinations
import importlib.util
import json
import numpy as np

spec = importlib.util.spec_from_file_location("connectors", ".scratch_spin23_connectors.py")
c = importlib.util.module_from_spec(spec)
spec.loader.exec_module(c)

ACTIVE = ((2, 9), (5, 10), (2, 6), (6, 7))
A, B = c.A, c.B


def components(n, edges):
    return c.connected_with_edges(n, edges)


def matrix_for_label(carrier, label):
    op = carrier["op"]
    block_dims = [c.DIMS[i] * c.DIMS[j] for i, j in op]
    offsets = np.cumsum([0] + block_dims[:-1]).tolist()
    positive_dim = sum(block_dims)
    assert positive_dim == 92
    D = np.zeros((184, 184), dtype=float)

    def fmap(a, b):
        if c.DIMS[a] == c.DIMS[b]:
            return np.eye(c.DIMS[a])
        if {c.DIMS[a], c.DIMS[b]} == {1, 2}:
            return np.array([[1.0, 0.0]]) if c.DIMS[a] == 2 else np.array([[1.0], [0.0]])
        raise ValueError((a, b, label))

    for edge in carrier["graph"]["edges"]:
        if edge["orbit"] != label:
            continue
        u, v = edge["u"], edge["v"]
        p, q = op[u], op[v]
        horizontal = p[1] == q[0] and p[0] != q[1]
        vertical = p[0] == q[1] and p[1] != q[0]
        assert horizontal != vertical
        if horizontal:
            F = fmap(p[0], q[1])
            X = np.kron(F, np.eye(c.DIMS[p[1]]))
            XJ = np.kron(np.eye(c.DIMS[p[1]]), F)
        else:
            F = fmap(p[1], q[0])
            X = np.kron(np.eye(c.DIMS[p[0]]), F)
            XJ = np.kron(F, np.eye(c.DIMS[p[0]]))
        pu, jv = offsets[u], 92 + offsets[v]
        ju, pv = 92 + offsets[u], offsets[v]
        D[jv:jv + X.shape[0], pu:pu + X.shape[1]] += X
        D[pu:pu + X.shape[1], jv:jv + X.shape[0]] += X.T
        D[pv:pv + XJ.shape[0], ju:ju + XJ.shape[1]] += XJ
        D[ju:ju + XJ.shape[1], pv:pv + XJ.shape[0]] += XJ.T
    return D


def traces(D):
    D2 = D @ D
    return float(np.trace(D2)), float(np.trace(D2 @ D2))


def active_stationary(mats):
    n = len(mats)
    t2 = np.array([traces(M)[0] for M in mats])
    t4 = np.array([traces(M)[1] for M in mats])
    Q = np.diag(t4)
    odd = 0.0
    for i, j in combinations(range(n), 2):
        plus = traces(mats[i] + mats[j])[1]
        minus = traces(mats[i] - mats[j])[1]
        odd = max(odd, abs(plus - minus))
        cross = (plus + minus) / 2 - t4[i] - t4[j]
        Q[i, j] = Q[j, i] = cross / 2
    if np.any(t2 == 0) or np.linalg.matrix_rank(Q) < n:
        return t2, Q, None, None, odd
    x = np.linalg.solve(2 * Q, t2)
    energy = -float(t2 @ x) + float(x @ Q @ x)
    return t2, Q, x, energy, odd


rows = []
for carrier in c.strong_carriers():
    phase = {node: carrier["phase"][g] for g, group in enumerate(c.GROUPS) for node in group}
    colored = lambda label: (label[0] in {5, 10}) ^ (label[1] in {5, 10})
    direct_ql = lambda label: colored(label) and abs(phase[label[0]] - phase[label[1]]) == 172
    ab = lambda label: ((label[0] in A and label[1] in B) or (label[1] in A and label[0] in B))
    safe = [edge for edge in carrier["graph"]["edges"] if not direct_ql(edge["orbit"])]
    no_ab = [edge for edge in safe if not ab(edge["orbit"])]
    candidates = []
    for label in sorted({edge["orbit"] for edge in safe if ab(edge["orbit"])}):
        trial = no_ab + [edge for edge in safe if edge["orbit"] == label]
        if components(len(carrier["op"]), trial):
            candidates.append(label)

    mats = [matrix_for_label(carrier, label) for label in ACTIVE]
    t2, Q, x, energy, odd = active_stationary(mats)
    background = None if x is None else sum(np.sqrt(max(0.0, x[i])) * mats[i] for i in range(4))
    bg4 = None if background is None else traces(background)[1]
    candidate_rows = []
    for label in candidates:
        X = matrix_for_label(carrier, label)
        xt2, x4 = traces(X)
        even_cross = None if background is None else ((traces(background + X)[1] + traces(background - X)[1]) / 2 - bg4 - x4)
        curvature = None if even_cross is None else -xt2 + even_cross
        candidate_rows.append((label, curvature, xt2, even_cross))
    k5 = sum(c.DIMS[j] / 2 if i == 5 else c.DIMS[i] / 2 if j == 5 else 0 for i, j in carrier["op"])
    k10 = sum(c.DIMS[j] / 2 if i == 10 else c.DIMS[i] / 2 if j == 10 else 0 for i, j in carrier["op"])
    rows.append({
        "split": (int(k5), int(k10)), "lpair": carrier["lpair"], "rpair": carrier["rpair"],
        "x": None if x is None else x.tolist(), "t2": t2.tolist(), "energy": energy, "odd": odd, "qMinEig": float(np.linalg.eigvalsh(Q).min()),
        "candidates": candidate_rows
    })

print("CARRIERS", len(rows))
print("ACTIVE_PRESENCE", Counter((row["split"], row["x"] is not None) for row in rows))
valid = [row for row in rows if row["x"] is not None]
print("ABSENT_T2_PATTERNS", Counter((row["split"], tuple(row["t2"])) for row in rows if row["x"] is None))
print("ALL_ACTIVE_POSITIVE", Counter((row["split"], all(v > 1e-10 for v in row["x"])) for row in valid))
print("ACTIVE_Q_POSITIVE", Counter((row["split"], row["qMinEig"] > 1e-9) for row in rows))
print("ODD_PAIR_MAX", max(row["odd"] for row in rows))
print("RECONNECTING_CANDIDATE_COUNTS", Counter((row["split"], len(row["candidates"])) for row in rows))
print("HAS_NONNEGATIVE_CANDIDATE", Counter((row["split"], any(cand[1] >= -1e-8 for cand in row["candidates"])) for row in valid))
curvatures = [cand[1] for row in valid for cand in row["candidates"]]
print("CURVATURE_RANGE", min(curvatures), max(curvatures))
for row in sorted(valid, key=lambda r: max((x[1] for x in r["candidates"]), default=-1e9), reverse=True)[:12]:
    print("BEST", json.dumps(row, default=list))

target_l = ((8, 10), (10, 1))
target_r = ((10, 2), (7, 5))
target = next(carrier for carrier in c.strong_carriers()
              if carrier["lpair"] == target_l and carrier["rpair"] == target_r)
target_phase = {node: target["phase"][g] for g, group in enumerate(c.GROUPS) for node in group}
target_colored = lambda label: (label[0] in {5, 10}) ^ (label[1] in {5, 10})
target_safe = [edge for edge in target["graph"]["edges"]
               if not (target_colored(edge["orbit"]) and abs(target_phase[edge["orbit"][0]] - target_phase[edge["orbit"][1]]) == 172)]
target_ab = lambda label: ((label[0] in A and label[1] in B) or (label[1] in A and label[0] in B))
target_restricted = [edge for edge in target_safe if not target_ab(edge["orbit"]) or edge["orbit"] == (1, 4)]
target_support = c.minimum_orbit_species(len(target["op"]), target_restricted,
                                         {tuple(sorted((9, b))) for b in B})
target_weighted_support = c.minimum_weighted_species(
    len(target["op"]), target_restricted, {tuple(sorted((9, b))) for b in B},
    lambda label: int(target_colored(label)))
target_ab_options = {}
for retained_ab in ((1, 4), (4, 8)):
    restricted = [edge for edge in target_safe if not target_ab(edge["orbit"]) or edge["orbit"] == retained_ab]
    target_ab_options[str(retained_ab)] = c.minimum_weighted_species(
        len(target["op"]), restricted, {tuple(sorted((9, b))) for b in B},
        lambda label: int(target_colored(label)))
target_unrestricted_weighted = c.minimum_weighted_species(
    len(target["op"]), target_safe, {tuple(sorted((9, b))) for b in B},
    lambda label: int(target_colored(label)))
target_active_x = np.array([0.25, 0.25, 0.5, 0.25])
target_active_mats = [matrix_for_label(target, label) for label in ACTIVE]
target_background = sum(np.sqrt(target_active_x[i]) * target_active_mats[i] for i in range(4))
target_bg4 = traces(target_background)[1]
target_all_ab_curvatures = {}
for label in sorted({edge["orbit"] for edge in target_safe if target_ab(edge["orbit"])}):
    X = matrix_for_label(target, label)
    xt2, x4 = traces(X)
    even_cross = ((traces(target_background + X)[1] + traces(target_background - X)[1]) / 2
                  - target_bg4 - x4)
    target_all_ab_curvatures[str(label)] = -xt2 + even_cross
stable_ab = {label for label in {edge["orbit"] for edge in target_safe if target_ab(edge["orbit"])}
             if target_all_ab_curvatures[str(label)] >= -1e-8}
target_stable_edges = [edge for edge in target_safe if not target_ab(edge["orbit"]) or edge["orbit"] in stable_ab]
target_stable_weighted = c.minimum_weighted_species(
    len(target["op"]), target_stable_edges, {tuple(sorted((9, b))) for b in B},
    lambda label: int(target_colored(label)))
labels5 = ACTIVE + ((1, 4),)
mats5 = [matrix_for_label(target, label) for label in labels5]
t2_5 = np.array([traces(M)[0] for M in mats5])
t4_5 = np.array([traces(M)[1] for M in mats5])
Q5 = np.diag(t4_5)
odd5 = 0.0
for i, j in combinations(range(5), 2):
    plus = traces(mats5[i] + mats5[j])[1]
    minus = traces(mats5[i] - mats5[j])[1]
    odd5 = max(odd5, abs(plus - minus))
    Q5[i, j] = Q5[j, i] = ((plus + minus) / 2 - t4_5[i] - t4_5[j]) / 2
x5 = np.linalg.solve(2 * Q5, t2_5) if np.linalg.matrix_rank(Q5) == 5 else np.linalg.lstsq(2 * Q5, t2_5, rcond=None)[0]
print("TARGET5", json.dumps({
    "labels": labels5, "t2": t2_5.tolist(), "t4": t4_5.tolist(), "Q": Q5.tolist(),
    "eigenvalues": np.linalg.eigvalsh(Q5).tolist(), "rank": int(np.linalg.matrix_rank(Q5)),
    "stationaryX": x5.tolist(), "oddPairMax": odd5,
    "energy": float(-t2_5 @ x5 + x5 @ Q5 @ x5),
    "phase": target["phase"], "minimumRestrictedSupport": target_support,
    "coloredThenSizeRestrictedSupport": target_weighted_support,
    "abOptionColorCosts": target_ab_options
    ,"unrestrictedColorMinimum": target_unrestricted_weighted
    ,"allABCurvatures": target_all_ab_curvatures
    ,"stableABColorMinimum": target_stable_weighted
}, default=list))
