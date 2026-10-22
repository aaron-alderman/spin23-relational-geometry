from itertools import product
import importlib.util
import json
import numpy as np

spec = importlib.util.spec_from_file_location("connectors", ".scratch_spin23_connectors.py")
c = importlib.util.module_from_spec(spec)
spec.loader.exec_module(c)

TARGET_L = ((8, 10), (10, 1))
TARGET_R = ((10, 2), (7, 5))
ACTIVE = ((2, 9), (5, 10), (2, 6), (6, 7))
MARGINAL = ((1, 2), (1, 3), (1, 4), (1, 7), (7, 8))

carrier = next(x for x in c.strong_carriers() if x["lpair"] == TARGET_L and x["rpair"] == TARGET_R)
op = carrier["op"]
block_dims = [c.DIMS[i] * c.DIMS[j] for i, j in op]
offsets = np.cumsum([0] + block_dims[:-1]).tolist()
assert sum(block_dims) == 92


def default_f(a, b):
    if c.DIMS[a] == c.DIMS[b]:
        return np.eye(c.DIMS[a])
    if {c.DIMS[a], c.DIMS[b]} == {1, 2}:
        return np.array([[1.0, 0.0]]) if c.DIMS[a] == 2 else np.array([[1.0], [0.0]])
    raise ValueError((a, b))


def field_matrix(label, override=None):
    D = np.zeros((184, 184), dtype=float)
    for edge in carrier["graph"]["edges"]:
        if edge["orbit"] != label:
            continue
        u, v = edge["u"], edge["v"]
        p, q = op[u], op[v]
        horizontal = p[1] == q[0] and p[0] != q[1]
        vertical = p[0] == q[1] and p[1] != q[0]
        assert horizontal != vertical
        if horizontal:
            F = default_f(p[0], q[1]) if override is None else override
            X = np.kron(F, np.eye(c.DIMS[p[1]]))
            XJ = np.kron(np.eye(c.DIMS[p[1]]), F)
        else:
            F = default_f(p[1], q[0]) if override is None else override
            X = np.kron(np.eye(c.DIMS[p[0]]), F)
            XJ = np.kron(F, np.eye(c.DIMS[p[0]]))
        pu, jv, ju, pv = offsets[u], 92 + offsets[v], 92 + offsets[u], offsets[v]
        D[jv:jv+X.shape[0], pu:pu+X.shape[1]] += X
        D[pu:pu+X.shape[1], jv:jv+X.shape[0]] += X.T
        D[pv:pv+XJ.shape[0], ju:ju+XJ.shape[1]] += XJ
        D[ju:ju+XJ.shape[1], pv:pv+XJ.shape[0]] += XJ.T
    return D


def tr2(D):
    return float(np.trace(D @ D))


def tr4(D):
    D2 = D @ D
    return float(np.trace(D2 @ D2))


def potential(D):
    return -tr2(D) + tr4(D)


active_x = (0.25, 0.25, 0.5, 0.25)
D0 = sum(np.sqrt(active_x[i]) * field_matrix(label) for i, label in enumerate(ACTIVE))
V0 = potential(D0)
results = []
for label in MARGINAL:
    basis = []
    for row, col in product(range(2), repeat=2):
        F = np.zeros((2, 2))
        F[row, col] = 1.0
        basis.append(field_matrix(label, F))
    A = np.zeros((4, 4))
    for i, Xi in enumerate(basis):
        A[i, i] = (potential(D0 + Xi) + potential(D0 - Xi)) / 2 - V0 - tr4(Xi)
        for j in range(i):
            Xj = basis[j]
            def mixed(h):
                return (potential(D0+h*Xi+h*Xj)-potential(D0+h*Xi-h*Xj)
                        -potential(D0-h*Xi+h*Xj)+potential(D0-h*Xi-h*Xj))/(4*h*h)
            coefficient = (4*mixed(1.0)-mixed(2.0))/3
            A[i, j] = A[j, i] = coefficient / 2
    direction_checks = []
    directions = [np.eye(4)[i] for i in range(4)]
    directions += [np.array(v, dtype=float) for v in product((-1, 0, 1), repeat=4)
                   if any(v) and next(x for x in v if x) > 0][:36]
    for direction in directions:
        X = sum(direction[i] * basis[i] for i in range(4))
        dm1 = potential(D0 + X) - potential(D0 - X)
        dm2 = potential(D0 + 2*X) - potential(D0 - 2*X)
        linear = (8*dm1 - dm2) / 12
        cubic = (dm2 - 2*dm1) / 12
        direction_checks.append((linear, cubic))
    results.append({
        "label": label,
        "quadraticForm": A.tolist(),
        "eigenvalues": np.linalg.eigvalsh(A).tolist(),
        "rank": int(np.linalg.matrix_rank(A, tol=1e-8)),
        "maxAbsDirectionalLinear": max(abs(x[0]) for x in direction_checks),
        "maxAbsDirectionalCubic": max(abs(x[1]) for x in direction_checks),
        "minimumSelfQuartic": min(tr4(sum(direction[i] * basis[i] for i in range(4)))
                                   for direction in directions)
    })

print(json.dumps({
    "protocol": "spin23-marginal-ab-real-matrix-hessian/1",
    "carrier": {"FQL": TARGET_L, "FQR": TARGET_R},
    "backgroundX": active_x,
    "backgroundPotential": V0,
    "componentOrder": ["Re11", "Re12", "Re21", "Re22"],
    "results": results
}, indent=2))
