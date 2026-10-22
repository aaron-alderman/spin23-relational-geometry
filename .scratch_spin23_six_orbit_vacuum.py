from itertools import combinations

import numpy as np


names = ("B", "C", "H", "G", "P", "M")
a = np.array([24.0, 120.0, 104.0, 40.0, 8.0, 16.0])
matrix = np.diag([48.0, 528.0, 496.0, 112.0, 16.0, 64.0])
cross = {
    ("B", "C"): 48.0,
    ("C", "H"): 1056.0,
    ("C", "G"): 48.0,
    ("H", "G"): 176.0,
    ("H", "P"): 16.0,
    ("G", "M"): 64.0,
}
for (left, right), value in cross.items():
    i, j = names.index(left), names.index(right)
    matrix[i, j] = matrix[j, i] = value

candidates = []
for size in range(1, len(names) + 1):
    for active_tuple in combinations(range(len(names)), size):
        active = np.array(active_tuple, dtype=int)
        inactive = np.array([i for i in range(len(names)) if i not in active_tuple])
        sub = matrix[np.ix_(active, active)]
        try:
            x_active = np.linalg.solve(sub, a[active])
        except np.linalg.LinAlgError:
            continue
        if np.min(x_active) <= 1e-10:
            continue
        x = np.zeros(len(names))
        x[active] = x_active
        gradient = matrix @ x - a
        if inactive.size and np.min(gradient[inactive]) < -1e-9:
            continue
        eigenvalues = np.linalg.eigvalsh(sub)
        if np.min(eigenvalues) <= 1e-9:
            continue
        energy = -0.5 * float(a @ x)
        candidates.append(
            {
                "active": [names[i] for i in active],
                "x": {names[i]: float(x[i]) for i in active},
                "inactive_gradients": {names[i]: float(gradient[i]) for i in inactive},
                "submatrix_eigenvalues": [float(v) for v in eigenvalues],
                "energy": energy,
            }
        )

candidates.sort(key=lambda item: item["energy"])
print("PROTOCOL spin23-736d-six-orbit-radial-vacuum/1")
for candidate in candidates:
    print(candidate)
assert candidates
