"""Numerical audit of complete invariants for SO(2)\\U(2)/SO(2)."""

import json
import numpy as np


def random_unitary(rng):
    raw = rng.normal(size=(2, 2)) + 1j * rng.normal(size=(2, 2))
    q, r = np.linalg.qr(raw)
    phases = np.diag(r)
    return q @ np.diag(np.conj(phases) / np.abs(phases))


def rotation(angle):
    return np.array([[np.cos(angle), -np.sin(angle)], [np.sin(angle), np.cos(angle)]])


def invariants(unitary):
    determinant = np.linalg.det(unitary)
    cartan = np.trace(unitary.T @ unitary) / (2 * determinant)
    return determinant, cartan


rng = np.random.default_rng(230619)
rows = []
j = np.array([[0.0, -1.0], [1.0, 0.0]])
for _ in range(128):
    u = random_unitary(rng)
    transformed = rotation(rng.uniform(-np.pi, np.pi)) @ u @ rotation(rng.uniform(-np.pi, np.pi))
    z, value = invariants(u)
    z2, value2 = invariants(transformed)
    left, right = j @ u, u @ j
    gram = np.array([
        [np.vdot(left, left).real, np.vdot(left, right).real],
        [np.vdot(right, left).real, np.vdot(right, right).real],
    ])
    predicted = np.array([[2, 2 * value.real], [2 * value.real, 2]])
    transpose_lift = np.linalg.norm(u.T @ u - np.eye(2)) ** 2
    commutator_lift = np.linalg.norm(j @ u - u @ j) ** 2
    anticommutator_lift = np.linalg.norm(j @ u + u @ j) ** 2
    rows.append({
        'determinant_modulus_error': abs(abs(z) - 1),
        'cartan_imaginary_part': abs(value.imag),
        'cartan_range_excess': max(0.0, abs(value.real) - 1),
        'left_right_invariance_error': max(abs(z-z2), abs(value-value2)),
        'gauge_gram_error': np.linalg.norm(gram-predicted),
        'transpose_lift_error': abs(transpose_lift - 4 * (1 - value.real * z.real)),
        'commutator_lift_error': abs(commutator_lift - 4 * (1 - value.real)),
        'anticommutator_lift_error': abs(anticommutator_lift - 4 * (1 + value.real)),
    })

print(json.dumps({
    'protocol': 'spin23-u2-double-coset/1',
    'samples': len(rows),
    'maxima': {key: float(max(row[key] for row in rows)) for key in rows[0]},
}, indent=2))
