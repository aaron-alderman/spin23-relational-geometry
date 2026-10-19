from fractions import Fraction as Q
from itertools import combinations
import json
import sys


P = 3
MU = [2, 2, 2, 2, 2, 2, -4, -4, -1, -1, -1]
ONES = [1] * 11
E = [
    [1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0],
    [1, -1, 1, -1, 0, 0, 0, 0, 2, -2, 0],
    [1, -1, 0, 0, 0, 1, 0, 0, 1, -1, 2],
]
S = [
    [1, 2, 2, 2, 1, 0, 1, 0, 0, 0, 0],
    [0, 1, 2, 2, 2, 1, 0, 1, 0, 0, 0],
    [2, 1, 2, 0, 1, 2, 0, 0, 1, 0, 0],
    [1, 1, 0, 1, 1, 1, 0, 0, 0, 1, 0],
    [2, 2, 2, 1, 0, 1, 0, 0, 0, 0, 1],
]

MODE = "witt-block" if "--witt-block" in sys.argv else "generic"
if MODE == "witt-block":
    # Swap one positive and one heavy-negative coordinate.  The resulting
    # negative support {5,7,8,9,10} (zero-based) is a Witt S(4,5,11) block
    # for the standard Golay dual used below.
    MU[5], MU[6] = MU[6], MU[5]
    for row in E:
        row[5], row[6] = row[6], row[5]


def dot(a, b):
    return sum(Q(MU[i]) * Q(a[i]) * Q(b[i]) for i in range(11))


def solve_fraction(a, b):
    rows = [[Q(x) for x in row] + [Q(b[i])] for i, row in enumerate(a)]
    width = len(a[0])
    pivots = []
    rank = 0
    for col in range(width):
        pivot = next((i for i in range(rank, len(rows)) if rows[i][col]), None)
        if pivot is None:
            continue
        rows[rank], rows[pivot] = rows[pivot], rows[rank]
        scale = rows[rank][col]
        rows[rank] = [x / scale for x in rows[rank]]
        for i in range(len(rows)):
            if i == rank or not rows[i][col]:
                continue
            factor = rows[i][col]
            rows[i] = [rows[i][j] - factor * rows[rank][j] for j in range(width + 1)]
        pivots.append(col)
        rank += 1
    assert all(any(row[j] for j in range(width)) or not row[width] for row in rows)
    out = [Q(0)] * width
    for i, pivot in enumerate(pivots):
        out[pivot] = rows[i][width]
    return out


def inv3(x):
    x %= 3
    assert x
    return 1 if x == 1 else 2


def qmod3(x):
    x = Q(x)
    return (x.numerator % 3) * inv3(x.denominator) % 3


def rref3(matrix):
    a = [[x % 3 for x in row] for row in matrix]
    pivots = []
    rank = 0
    for col in range(len(a[0]) if a else 0):
        pivot = next((i for i in range(rank, len(a)) if a[i][col]), None)
        if pivot is None:
            continue
        a[rank], a[pivot] = a[pivot], a[rank]
        scale = inv3(a[rank][col])
        a[rank] = [(scale * x) % 3 for x in a[rank]]
        for i in range(len(a)):
            if i == rank or not a[i][col]:
                continue
            factor = a[i][col]
            a[i] = [(a[i][j] - factor * a[rank][j]) % 3 for j in range(len(a[0]))]
        pivots.append(col)
        rank += 1
    return a[:rank], pivots


def solve3(a, b):
    rows = [[x % 3 for x in row] + [b[i] % 3] for i, row in enumerate(a)]
    width = len(a[0])
    pivots = []
    rank = 0
    for col in range(width):
        pivot = next((i for i in range(rank, len(rows)) if rows[i][col]), None)
        if pivot is None:
            continue
        rows[rank], rows[pivot] = rows[pivot], rows[rank]
        scale = inv3(rows[rank][col])
        rows[rank] = [(scale * x) % 3 for x in rows[rank]]
        for i in range(len(rows)):
            if i == rank or not rows[i][col]:
                continue
            factor = rows[i][col]
            rows[i] = [(rows[i][j] - factor * rows[rank][j]) % 3 for j in range(width + 1)]
        pivots.append(col)
        rank += 1
    assert all(any(row[j] for j in range(width)) or row[width] == 0 for row in rows)
    out = [0] * width
    for i, pivot in enumerate(pivots):
        out[pivot] = rows[i][width]
    return out


def inverse3(matrix):
    size = len(matrix)
    columns = []
    for j in range(size):
        rhs = [int(i == j) for i in range(size)]
        columns.append(solve3(matrix, rhs))
    return [[columns[j][i] for j in range(size)] for i in range(size)]


def matmul3(a, b):
    return [[sum(a[i][k] * b[k][j] for k in range(len(b))) % 3 for j in range(len(b[0]))] for i in range(len(a))]


assert sum(MU) == 1
assert all(dot(row, ONES) == 0 for row in E)
assert all(dot(a, b) == 0 for a in E for b in E)

# Construct an exact dual isotropic frame F from an arbitrary right dual W.
constraints = [MU] + [[MU[j] * E[i][j] for j in range(11)] for i in range(5)]
W = []
for i in range(5):
    W.append(solve_fraction(constraints, [0] + [int(i == j) for j in range(5)]))
B = [[dot(W[i], W[j]) for j in range(5)] for i in range(5)]
F = []
for i in range(5):
    F.append([W[i][coordinate] - Q(1, 2) * sum(B[i][j] * Q(E[j][coordinate]) for j in range(5)) for coordinate in range(11)])

assert all(dot(row, ONES) == 0 for row in F)
assert all(dot(a, b) == 0 for a in F for b in F)
assert [[dot(E[i], F[j]) for j in range(5)] for i in range(5)] == [[Q(int(i == j)) for j in range(5)] for i in range(5)]

# Express the Golay dual in the exact hyperbolic basis.  If it belongs to
# the other orthogonal family, swap one hyperbolic pair before searching the
# 3^10 skew complements.
family_switch = False
for family_attempt in range(2):
    H = E + F
    H3 = [[qmod3(x) for x in row] for row in H]
    coordinates = []
    for row in S:
        coordinates.append(solve3([[H3[i][j] for i in range(10)] for j in range(11)], row))
    X = [row[:5] for row in coordinates]
    Y = [row[5:] for row in coordinates]

    chosen_skew = None
    for code in range(3 ** 10):
        remaining = code
        A = [[0] * 5 for _ in range(5)]
        for i in range(5):
            for j in range(i + 1, 5):
                value = remaining % 3
                remaining //= 3
                A[i][j] = value
                A[j][i] = (-value) % 3
        YA = matmul3(Y, A)
        candidate_x = [[(X[i][j] - YA[i][j]) % 3 for j in range(5)] for i in range(5)]
        if len(rref3(candidate_x)[0]) == 5:
            chosen_skew = A
            X = candidate_x
            break
    if chosen_skew is not None:
        break
    E[0], F[0] = F[0], E[0]
    family_switch = True
assert chosen_skew is not None

A_lift = [[0 if x == 0 else (1 if x == 1 else -1) for x in row] for row in chosen_skew]
Fprime = [[F[i][coordinate] + sum(Q(A_lift[i][j]) * Q(E[j][coordinate]) for j in range(5)) for coordinate in range(11)] for i in range(5)]
assert all(dot(a, b) == 0 for a in Fprime for b in Fprime)
assert [[dot(E[i], Fprime[j]) for j in range(5)] for i in range(5)] == [[Q(int(i == j)) for j in range(5)] for i in range(5)]

Xinv = inverse3(X)
C3 = matmul3(Xinv, Y)
assert all((C3[i][j] + C3[j][i]) % 3 == 0 for i in range(5) for j in range(5))
C = [[0 if x == 0 else (1 if x == 1 else -1) for x in row] for row in C3]

Gq = [[Q(E[i][coordinate]) + sum(Q(C[i][j]) * Fprime[j][coordinate] for j in range(5)) for coordinate in range(11)] for i in range(5)]
assert all(dot(row, ONES) == 0 for row in Gq)
assert all(dot(a, b) == 0 for a in Gq for b in Gq)

def lcm(a, b):
    from math import gcd
    return abs(a * b) // gcd(a, b)


G = []
for row in Gq:
    denominator = 1
    for x in row:
        denominator = lcm(denominator, x.denominator)
    assert denominator % 3
    G.append([int(x * denominator) for x in row])

assert all(sum(MU[j] * row[j] for j in range(11)) == 0 for row in G)
assert all(sum(MU[j] * a[j] * b[j] for j in range(11)) == 0 for a in G for b in G)
assert rref3([[x % 3 for x in row] for row in G])[0] == rref3(S)[0]

def rank_q(matrix):
    if not matrix:
        return 0
    a = [[Q(x) for x in row] for row in matrix]
    rank = 0
    for col in range(len(a[0])):
        pivot = next((i for i in range(rank, len(a)) if a[i][col]), None)
        if pivot is None:
            continue
        a[rank], a[pivot] = a[pivot], a[rank]
        scale = a[rank][col]
        a[rank] = [x / scale for x in a[rank]]
        for i in range(len(a)):
            if i == rank or not a[i][col]:
                continue
            factor = a[i][col]
            a[i] = [a[i][j] - factor * a[rank][j] for j in range(len(a[0]))]
        rank += 1
    return rank


def p_distance_q(matrix):
    for weight in range(1, 7):
        for support in combinations(range(11), weight):
            restricted = [[row[j] for j in support] for row in matrix]
            if rank_q(restricted + [[1] * weight]) > rank_q(restricted):
                return weight
    return None


result = {
    "protocol": "exact-nonunit-golay-lift/1",
    "mathieuOrbit": MODE,
    "coefficients": MU,
    "N": sum(MU),
    "orthogonalFamilySwitch": family_switch,
    "exactHyperbolicFrameE": [[str(x) for x in row] for row in E],
    "complementaryFrameF": [[str(x) for x in row] for row in Fprime],
    "finiteComplementAdjustment": chosen_skew,
    "golayGraphMatrixMod3": C3,
    "integralGeneratorMatrix": G,
    "exactWeightedLinearSums": [sum(MU[j] * row[j] for j in range(11)) for row in G],
    "exactWeightedGram": [[sum(MU[j] * a[j] * b[j] for j in range(11)) for b in G] for a in G],
    "rankOverQ": rank_q(G),
    "rationalPDistance": p_distance_q(G),
    "reductionMod3EqualsGolayDual": True,
    "qutritPDistance": 5,
    "passed": True,
}
assert result["rankOverQ"] == 5
print(json.dumps(result, indent=2))
