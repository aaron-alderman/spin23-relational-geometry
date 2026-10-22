from fractions import Fraction


def zeros(rows, cols):
    return [[Fraction(0) for _ in range(cols)] for _ in range(rows)]


def matmul(a, b):
    return [[sum(a[i][k] * b[k][j] for k in range(len(b)))
             for j in range(len(b[0]))] for i in range(len(a))]


def transpose(a):
    return [list(row) for row in zip(*a)]


def add(a, b):
    return [[a[i][j] + b[i][j] for j in range(len(a[0]))]
            for i in range(len(a))]


def rank(a):
    a = [row[:] for row in a]
    rows = len(a)
    cols = len(a[0]) if rows else 0
    r = 0
    for c in range(cols):
        pivot = next((i for i in range(r, rows) if a[i][c]), None)
        if pivot is None:
            continue
        a[r], a[pivot] = a[pivot], a[r]
        p = a[r][c]
        a[r] = [x / p for x in a[r]]
        for i in range(rows):
            if i != r and a[i][c]:
                q = a[i][c]
                a[i] = [a[i][j] - q * a[r][j] for j in range(cols)]
        r += 1
        if r == rows:
            break
    return r


I4 = [[Fraction(int(i == j)) for j in range(4)] for i in range(4)]
Z = [[Fraction(0), Fraction(0), Fraction(0), Fraction(0)],
     [Fraction(0), Fraction(0), Fraction(0), Fraction(0)],
     [Fraction(0), Fraction(0), Fraction(0), Fraction(0)],
     [Fraction(0), Fraction(0), Fraction(0), Fraction(0)]]
OMEGA = [[0, 0, 1, 0], [0, 0, 0, 1], [-1, 0, 0, 0], [0, -1, 0, 0]]
H1 = [[1, 0, 0, 0], [0, 2, 0, 0], [0, 0, -1, 0], [0, 0, 0, -2]]
H2 = [[0, 0, 1, 1], [0, 0, 1, 2], [1, 1, 0, 0], [1, 2, 0, 0]]
OMEGA = [[Fraction(x) for x in row] for row in OMEGA]
H1 = [[Fraction(x) for x in row] for row in H1]
H2 = [[Fraction(x) for x in row] for row in H2]


def is_hamiltonian(h):
    return add(matmul(transpose(h), OMEGA), matmul(OMEGA, h)) == Z


def edge_equations(nodes, edges):
    # An edge (u,v,T) imposes X_v T = T X_u on one 4x4 unknown X per node.
    pos = {node: k for k, node in enumerate(nodes)}
    nvars = 16 * len(nodes)
    equations = []
    for u, v, t in edges:
        for i in range(4):
            for j in range(4):
                row = [Fraction(0) for _ in range(nvars)]
                # (X_v T)_ij
                for k in range(4):
                    row[16 * pos[v] + 4 * i + k] += t[k][j]
                # -(T X_u)_ij
                for k in range(4):
                    row[16 * pos[u] + 4 * k + j] -= t[i][k]
                equations.append(row)
    r = rank(equations)
    return {"variables": nvars, "rank": r, "nullity": nvars - r}


tests = {
    "spin_pair_common_commutant": edge_equations([1, 8], [(1, 8, I4), (1, 8, H1), (1, 8, H2)]),
    "B_internal": edge_equations(
        [2, 3, 4, 7],
        [(2, 3, I4), (2, 3, H1), (2, 4, I4), (2, 4, H2), (2, 7, I4)],
    ),
    "A_and_B_disconnected": edge_equations(
        [1, 8, 2, 3, 4, 7],
        [(1, 8, I4), (1, 8, H1), (1, 8, H2),
         (2, 3, I4), (2, 3, H1), (2, 4, I4), (2, 4, H2), (2, 7, I4)],
    ),
    "A_and_B_linked": edge_equations(
        [1, 8, 2, 3, 4, 7],
        [(1, 8, I4), (1, 8, H1), (1, 8, H2),
         (2, 3, I4), (2, 3, H1), (2, 4, I4), (2, 4, H2), (2, 7, I4),
         (1, 2, I4)],
    ),
    "all_eight_nodes_linked": edge_equations(
        [1, 8, 2, 3, 4, 7, 5, 6],
        [(1, 8, I4), (1, 8, H1), (1, 8, H2),
         (2, 4, I4), (2, 4, H1), (4, 7, I4), (4, 7, H2), (3, 4, I4),
         (1, 3, I4), (2, 5, I4), (4, 6, I4)],
    ),
    "v312_color_safe_seven_nodes": edge_equations(
        [1, 8, 2, 3, 4, 7, 6],
        [(1, 8, I4), (1, 8, H1), (1, 8, H2),
         (4, 7, I4), (4, 7, H1), (3, 4, I4), (3, 4, H2), (2, 4, I4),
         (3, 8, I4), (4, 6, I4)],
    ),
    "v312_sector_safe_one_quark_map": edge_equations(
        list(range(11)),
        [(0, 8, I4),
         (1, 3, I4), (6, 7, I4), (1, 5, I4), (1, 7, I4),
         (2, 10, I4), (3, 6, H1), (1, 9, I4), (1, 10, I4),
         (2, 7, H2), (4, 7, I4), (5, 9, I4)],
    ),
    "v312_sector_safe_three_quark_maps": edge_equations(
        list(range(11)),
        [(0, 8, I4), (0, 8, H1), (0, 8, H2),
         (1, 3, I4), (6, 7, I4), (1, 5, I4), (1, 7, I4),
         (2, 10, I4), (3, 6, H1), (1, 9, I4), (1, 10, I4),
         (2, 7, H2), (4, 7, I4), (5, 9, I4)],
    ),
    "v318_colored_k33_two_holonomies": edge_equations(
        [0, 8, 11, 12, 13, 14],
        [(0, 8, I4), (0, 13, I4), (0, 14, I4),
         (11, 8, I4), (12, 8, I4),
         (11, 13, H1), (12, 13, H2),
         (11, 14, I4), (12, 14, I4)],
    ),
    "v318_full_sector_safe_floor": edge_equations(
        list(range(15)),
        [(0, 8, I4), (0, 13, I4), (0, 14, I4),
         (11, 8, I4), (12, 8, I4),
         (11, 13, H1), (12, 13, H2),
         (11, 14, I4), (12, 14, I4),
         (1, 3, I4), (6, 7, I4), (1, 5, I4), (1, 7, I4),
         (2, 10, I4), (3, 6, H1), (1, 9, I4), (1, 10, I4),
         (2, 7, H2), (4, 7, I4), (5, 9, I4)],
    ),
    "v322_unimodular_full_sector_safe_floor": edge_equations(
        list(range(15)),
        [(0, 1, I4), (0, 2, I4), (0, 3, I4), (1, 4, I4), (1, 5, I4),
         (2, 4, H1), (3, 4, H2), (2, 5, I4), (3, 5, I4),
         (6, 7, I4), (6, 8, I4), (6, 9, I4), (6, 12, I4),
         (7, 13, I4), (8, 10, I4), (8, 14, I4), (9, 11, I4),
         (8, 13, H1), (10, 14, H2), (12, 14, I4)],
    ),
    "v323_witten_safe_full_sector_floor": edge_equations(
        list(range(17)),
        [(0, 1, I4), (0, 3, I4), (0, 4, I4), (1, 2, I4), (1, 5, I4),
         (2, 3, H1), (2, 4, H2), (3, 5, I4), (4, 5, I4),
         (6, 10, I4), (6, 12, I4), (6, 14, I4), (7, 12, I4),
         (7, 15, I4), (8, 9, I4), (8, 11, I4), (8, 12, I4),
         (10, 13, I4), (11, 16, I4),
         (9, 15, H1), (13, 14, H2),
         (10, 12, I4), (11, 13, I4), (12, 16, I4),
         (13, 15, I4), (14, 15, I4), (15, 16, I4)],
    ),
    "v325_unimodular_witten_safe_full_sector_floor": edge_equations(
        list(range(18)),
        [(0, 2, I4), (0, 3, I4), (0, 4, I4), (1, 2, I4), (2, 5, I4),
         (1, 3, H1), (1, 4, H2), (3, 5, I4), (4, 5, I4),
         (6, 8, I4), (6, 12, I4), (6, 13, I4), (6, 15, I4),
         (7, 8, I4), (7, 10, I4), (7, 16, I4), (9, 11, I4),
         (9, 12, I4), (10, 17, I4), (12, 14, I4),
         (7, 13, H1), (11, 15, H2),
         (7, 15, I4), (8, 12, I4), (9, 16, I4), (11, 12, I4),
         (12, 17, I4), (13, 14, I4), (15, 16, I4), (16, 17, I4)],
    ),
}

print({"H1_hamiltonian": is_hamiltonian(H1),
       "H2_hamiltonian": is_hamiltonian(H2),
       "tests": tests})
