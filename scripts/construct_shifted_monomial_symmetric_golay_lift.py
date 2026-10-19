from fractions import Fraction as Q
from math import gcd
from itertools import product, combinations
import json
import sys


P = 3
MU = [2, 2, 2, 2, 2, 2, -4, -4, -1, -1, -1]
ONES = [1] * 11
S = [
    [1, 2, 2, 2, 1, 0, 1, 0, 0, 0, 0],
    [0, 1, 2, 2, 2, 1, 0, 1, 0, 0, 0],
    [2, 1, 2, 0, 1, 2, 0, 0, 1, 0, 0],
    [1, 1, 0, 1, 1, 1, 0, 0, 0, 1, 0],
    [2, 2, 2, 1, 0, 1, 0, 0, 0, 0, 1],
]
MODE = "witt-block" if "--witt-block" in sys.argv else "generic"
PERMUTATION = [5, 1, 3, 2, 4, 0, 7, 6, 9, 8, 10]
SIGNS = [1, -1, 1, 1, -1, 1, 1, 1, -1, -1, -1]
if MODE == "witt-block":
    MU = [2, 2, 2, 2, 2, -4, 2, -4, -1, -1, -1]
    PERMUTATION = [3, 1, 6, 0, 4, 7, 2, 5, 8, 10, 9]
    SIGNS = [1, -1, 1, 1, -1, 1, 1, 1, -1, -1, -1]


def lcm(a, b):
    return abs(a * b) // gcd(a, b)


def rref_q(matrix):
    a = [[Q(x) for x in row] for row in matrix]
    pivots = []
    rank = 0
    width = len(a[0]) if a else 0
    for col in range(width):
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
            a[i] = [a[i][j] - factor * a[rank][j] for j in range(width)]
        pivots.append(col)
        rank += 1
    return a[:rank], pivots


def nullspace_q(matrix):
    rows, pivots = rref_q(matrix)
    width = len(matrix[0])
    free = [j for j in range(width) if j not in pivots]
    out = []
    for free_col in free:
        v = [Q(0)] * width
        v[free_col] = Q(1)
        for i, pivot in enumerate(pivots):
            v[pivot] = -rows[i][free_col]
        denominator = 1
        for x in v:
            denominator = lcm(denominator, x.denominator)
        out.append([int(x * denominator) for x in v])
    return out


def inv3(x):
    x %= 3
    assert x
    return 1 if x == 1 else 2


def rref3(matrix):
    a = [[x % 3 for x in row] for row in matrix]
    pivots = []
    rank = 0
    width = len(a[0]) if a else 0
    for col in range(width):
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
            a[i] = [(a[i][j] - factor * a[rank][j]) % 3 for j in range(width)]
        pivots.append(col)
        rank += 1
    return a[:rank], pivots


def nullspace3(matrix):
    rows, pivots = rref3(matrix)
    width = len(matrix[0])
    out = []
    for free_col in [j for j in range(width) if j not in pivots]:
        v = [0] * width
        v[free_col] = 1
        for i, pivot in enumerate(pivots):
            v[pivot] = (-rows[i][free_col]) % 3
        out.append(v)
    return out


def solve_q(a, b):
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
    columns = [solve3(matrix, [int(i == j) for i in range(len(matrix))])
               for j in range(len(matrix))]
    return [[columns[j][i] for j in range(len(matrix))] for i in range(len(matrix))]


def matmul3(a, b):
    return [[sum(a[i][k] * b[k][j] for k in range(len(b))) % 3
             for j in range(len(b[0]))] for i in range(len(a))]


def qmod3(x):
    x = Q(x)
    return (x.numerator % 3) * inv3(x.denominator) % 3


def dot(a, b):
    return sum(MU[i] * Q(a[i]) * Q(b[i]) for i in range(11))


def apply_h(v):
    out = [0] * 11
    for j in range(11):
        out[PERMUTATION[j]] = SIGNS[j] * v[j]
    return out


def linear_combination(coefficients, basis, modulus=None):
    out = [0] * len(basis[0])
    for coefficient, row in zip(coefficients, basis):
        for j in range(len(out)):
            out[j] += coefficient * row[j]
            if modulus:
                out[j] %= modulus
    return out


H = [[0] * 11 for _ in range(11)]
for j in range(11):
    H[PERMUTATION[j]][j] = SIGNS[j]
assert apply_h(apply_h(ONES)) == ONES
assert all(sum(MU[i] * H[i][j] * H[i][k] for i in range(11)) == (MU[j] if j == k else 0)
           for j in range(11) for k in range(11))

sector_bases = {}
for eigenvalue in [1, -1]:
    equations = [[H[i][j] - (eigenvalue if i == j else 0) for j in range(11)] for i in range(11)]
    equations.append(MU)
    sector_bases[eigenvalue] = nullspace_q(equations)

assert [len(sector_bases[1]), len(sector_bases[-1])] == [3, 6]

# Finite eigenspaces inside the Golay dual.
finite_sector_rows = {}
for eigenvalue in [1, -1]:
    action_on_s = []
    for row in S:
        transformed = apply_h(row)
        action_on_s.append([(transformed[j] - eigenvalue * row[j]) % 3 for j in range(11)])
    # Coefficients c with c*(h-eigenvalue)=0.
    coefficient_kernel = nullspace3([[action_on_s[row][col] for row in range(5)] for col in range(11)])
    finite_sector_rows[eigenvalue] = [
        linear_combination(coefficients, S, 3) for coefficients in coefficient_kernel
    ]

assert [len(finite_sector_rows[1]), len(finite_sector_rows[-1])] == [2, 3]


def coordinates3(vector, basis):
    return solve3([[basis[row][col] % 3 for row in range(len(basis))]
                   for col in range(len(vector))], vector)


def gram_dot_coordinates(a, b, gram):
    return sum(Q(a[i]) * Q(gram[i][j]) * Q(b[j])
               for i in range(len(a)) for j in range(len(b)))


def ambient_from_coordinates(coordinates, basis):
    return [sum(Q(coordinates[i]) * Q(basis[i][j]) for i in range(len(basis)))
            for j in range(11)]


def same_space3(a, b):
    return len(rref3(a + b)[0]) == len(rref3(a)[0]) == len(rref3(b)[0])


# Find the required exact two-dimensional isotropic plane in the +1 sector,
# constrained to reduce to the finite Golay +1 eigenspace.
plus_basis = sector_bases[1]
plus_gram = [[dot(x, y) for y in plus_basis] for x in plus_basis]
plus_null_vectors = []
for vector in product(range(-12, 13), repeat=3):
    if not any(vector):
        continue
    common = 0
    for x in vector:
        common = gcd(common, abs(x))
    if common != 1:
        continue
    if next(x for x in vector if x) < 0:
        continue
    if gram_dot_coordinates(vector, vector, plus_gram) == 0:
        plus_null_vectors.append(list(vector))
plus_lagrangian_coordinates = None
for i, first in enumerate(plus_null_vectors):
    for second in plus_null_vectors[i + 1:]:
        if gram_dot_coordinates(first, second, plus_gram):
            continue
        if len(rref_q([first, second])[0]) < 2:
            continue
        candidate = [first, second]
        if same_space3(
            [[qmod3(x) for x in ambient_from_coordinates(row, plus_basis)]
             for row in candidate],
            finite_sector_rows[1],
        ):
            plus_lagrangian_coordinates = candidate
            break
    if plus_lagrangian_coordinates:
        break
assert plus_lagrangian_coordinates is not None
assert all(gram_dot_coordinates(a, b,
    plus_gram) == 0
    for a in plus_lagrangian_coordinates for b in plus_lagrangian_coordinates)
plus_lagrangian = [ambient_from_coordinates(row, plus_basis)
                   for row in plus_lagrangian_coordinates]


# Find a small exact maximal isotropic three-plane in the split -1 sector.
minus_basis = sector_bases[-1]
minus_gram = [[dot(a, b) for b in minus_basis] for a in minus_basis]
isotropic_vectors = []
for vector in product(range(-4, 5), repeat=6):
    if not any(vector):
        continue
    common = 0
    for x in vector:
        common = gcd(common, abs(x))
    if common != 1:
        continue
    first = next(x for x in vector if x)
    if first < 0:
        continue
    if gram_dot_coordinates(vector, vector, minus_gram) == 0:
        isotropic_vectors.append(list(vector))

minus_E = None
for i, first in enumerate(isotropic_vectors):
    orthogonal_second = [second for second in isotropic_vectors[i + 1:]
                         if gram_dot_coordinates(first, second, minus_gram) == 0]
    for j, second in enumerate(orthogonal_second):
        for third in orthogonal_second[j + 1:]:
            if gram_dot_coordinates(first, third, minus_gram):
                continue
            if gram_dot_coordinates(second, third, minus_gram):
                continue
            if len(rref_q([first, second, third])[0]) == 3:
                minus_E = [[Q(x) for x in row] for row in [first, second, third]]
                break
        if minus_E:
            break
    if minus_E:
        break
assert minus_E is not None

# Complete E to an exact hyperbolic frame (E,F).
constraints = []
for e in minus_E:
    constraints.append([
        sum(Q(e[i]) * Q(minus_gram[i][j]) for i in range(6))
        for j in range(6)
    ])
minus_W = [solve_q(constraints, [int(i == j) for i in range(3)]) for j in range(3)]
minus_W_gram = [[gram_dot_coordinates(a, b, minus_gram) for b in minus_W]
                for a in minus_W]
minus_F = []
for i in range(3):
    minus_F.append([
        minus_W[i][coordinate]
        - Q(1, 2) * sum(minus_W_gram[i][j] * minus_E[j][coordinate]
                        for j in range(3))
        for coordinate in range(6)
    ])
assert [[gram_dot_coordinates(minus_E[i], minus_F[j], minus_gram)
         for j in range(3)] for i in range(3)] == [
             [Q(int(i == j)) for j in range(3)] for i in range(3)]
assert all(gram_dot_coordinates(a, b, minus_gram) == 0
           for a in minus_F for b in minus_F)

# Express the finite Golay -1 eigenspace in the hyperbolic frame and make it
# transverse by a finite skew change of the complementary Lagrangian.
minus_target_coordinates = [coordinates3(row, minus_basis)
                            for row in finite_sector_rows[-1]]
family_switch = False
chosen_skew = None
for family_attempt in range(2):
    hyperbolic = minus_E + minus_F
    hyperbolic3 = [[qmod3(x) for x in row] for row in hyperbolic]
    coordinates = [solve3(
        [[hyperbolic3[row][col] for row in range(6)] for col in range(6)],
        target,
    ) for target in minus_target_coordinates]
    X = [row[:3] for row in coordinates]
    Y = [row[3:] for row in coordinates]
    for code in range(3 ** 3):
        remaining = code
        skew = [[0] * 3 for _ in range(3)]
        for i in range(3):
            for j in range(i + 1, 3):
                value = remaining % 3
                remaining //= 3
                skew[i][j] = value
                skew[j][i] = (-value) % 3
        YA = matmul3(Y, skew)
        candidate_x = [[(X[i][j] - YA[i][j]) % 3 for j in range(3)]
                       for i in range(3)]
        if len(rref3(candidate_x)[0]) == 3:
            chosen_skew = skew
            X = candidate_x
            break
    if chosen_skew is not None:
        break
    minus_E[0], minus_F[0] = minus_F[0], minus_E[0]
    family_switch = True
assert chosen_skew is not None

skew_lift = [[0 if x == 0 else (1 if x == 1 else -1) for x in row]
             for row in chosen_skew]
minus_F_prime = [[
    minus_F[i][coordinate]
    + sum(Q(skew_lift[i][j]) * minus_E[j][coordinate] for j in range(3))
    for coordinate in range(6)
] for i in range(3)]
X_inverse = inverse3(X)
C3 = matmul3(X_inverse, Y)
assert all((C3[i][j] + C3[j][i]) % 3 == 0
           for i in range(3) for j in range(3))
C = [[0 if x == 0 else (1 if x == 1 else -1) for x in row] for row in C3]
minus_lagrangian_coordinates = [[
    minus_E[i][coordinate]
    + sum(Q(C[i][j]) * minus_F_prime[j][coordinate] for j in range(3))
    for coordinate in range(6)
] for i in range(3)]
minus_lagrangian = [ambient_from_coordinates(row, minus_basis)
                    for row in minus_lagrangian_coordinates]

Gq = plus_lagrangian + minus_lagrangian
assert all(dot(a, b) == 0 for a in Gq for b in Gq)
assert all(dot(row, ONES) == 0 for row in Gq)
assert all(apply_h(row) == row for row in plus_lagrangian)
assert all(apply_h(row) == [-x for x in row] for row in minus_lagrangian)

G = []
for row in Gq:
    denominator = 1
    for x in row:
        denominator = lcm(denominator, x.denominator)
    assert denominator % 3
    G.append([int(x * denominator) for x in row])
assert same_space3([[x % 3 for x in row] for row in G], S)


def rank_q(matrix):
    return len(rref_q(matrix)[0])


def p_distance_q(matrix):
    for weight in range(1, 7):
        for support in combinations(range(11), weight):
            restricted = [[row[j] for j in support] for row in matrix]
            if rank_q(restricted + [[1] * weight]) > rank_q(restricted):
                return weight
    return None


distance_q = p_distance_q(G)
assert distance_q == 5
assert len(rref_q(G)[0]) == 5

result = {
    "protocol": "shifted-monomial-symmetric-golay-lift/1",
    "coefficientOrbit": MODE,
    "coefficients": MU,
    "monomialInvolution": {
        "permutation": PERMUTATION,
        "signs": SIGNS,
        "weightedPairingWithOne": sum(MU[i] * apply_h(ONES)[i] for i in range(11)),
    },
    "rationalSectors": {
        str(eigenvalue): {
            "basis": sector_bases[eigenvalue],
            "gram": [[str(dot(a, b)) for b in sector_bases[eigenvalue]]
                     for a in sector_bases[eigenvalue]],
        }
        for eigenvalue in [1, -1]
    },
    "finiteGolaySectors": {
        str(eigenvalue): finite_sector_rows[eigenvalue] for eigenvalue in [1, -1]
    },
    "construction": {
        "plusLagrangianCoordinates": plus_lagrangian_coordinates,
        "minusStartingIsotropicFrame": [[str(x) for x in row] for row in minus_E],
        "minusFamilySwitch": family_switch,
        "minusFiniteSkewAdjustment": chosen_skew,
        "minusGolayGraphMatrixMod3": C3,
        "integralGeneratorMatrix": G,
        "rankOverQ": rank_q(G),
        "rationalPDistance": distance_q,
        "qutritPDistance": 5,
        "reductionMod3EqualsGolayDual": True,
        "exactMonomialInvariant": True,
        "exactWeightedLinearSums": [
            sum(MU[j] * row[j] for j in range(11)) for row in G
        ],
        "exactWeightedGram": [
            [sum(MU[j] * a[j] * b[j] for j in range(11)) for b in G]
            for a in G
        ],
    },
    "passed": True,
}
print(json.dumps(result, indent=2))
