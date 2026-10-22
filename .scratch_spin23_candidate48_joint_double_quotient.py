"""Gauge intersection with the full U(2) x S1 candidate-48 joint moduli family."""

import importlib.util
import json
import sys
import numpy as np


def load(path, name):
    spec = importlib.util.spec_from_file_location(name, path)
    module = importlib.util.module_from_spec(spec)
    sys.modules[name] = module
    spec.loader.exec_module(module)
    return module


c = load('.scratch_spin23_connectors.py', 'c')
s = load('.scratch_spin23_all_robust_supports_fast.py', 's')
x = load('.scratch_spin23_exception_factor_complex_hessian.py', 'x')
g = load('.scratch_spin23_candidate48_u14_kkt.py', 'g')
gs = load('.scratch_spin23_candidate48_gauge_split.py', 'gs')

carrier = [item for item in c.strong_carriers() if (s.tw(item['op'], 5), s.tw(item['op'], 10)) == (8, 4)][13]
_, _, _, labels, _, _, _, _, _ = g.generic_preserving_basis(carrier)
generators, _ = gs.admissible_factor_generators(carrier, labels)
builder = x.complex_field_builder(carrier)
amplitudes = {(2, 6): 0.5, (2, 9): 0.25, (4, 8): 0.125, (5, 10): 0.25, (6, 7): 0.125}
base_seeds = {label: x.h.canonical(label).astype(complex) for label in amplitudes}

fields = []
for label in amplitudes:
    nr, nc = c.DIMS[label[1]], c.DIMS[label[0]]
    for row in range(nr):
        for col in range(nc):
            seed = np.zeros((nr, nc), dtype=complex)
            seed[row, col] = 1
            fields.extend([builder(label, seed), builder(label, 1j * seed)])
norms = np.array([np.vdot(field, field).real for field in fields])

I = np.eye(2, dtype=complex)
sx = np.array([[0, 1], [1, 0]], dtype=complex)
sy = np.array([[0, -1j], [1j, 0]], dtype=complex)
sz = np.array([[1, 0], [0, -1]], dtype=complex)


def coordinates(matrix):
    return np.array([np.vdot(field, matrix).real / norms[i] for i, field in enumerate(fields)])


def analyze(unitary, angle):
    cosine, sine = np.cos(angle), np.sin(angle)
    seeds = dict(base_seeds)
    seeds[(4, 8)] = unitary
    seeds[(2, 6)] = np.array([[cosine, -1j * sine]])
    seeds[(2, 9)] = np.array([[cosine, 1j * sine], [1j * sine, cosine]])
    vacuum = sum(np.sqrt(amplitudes[label]) * builder(label, seeds[label]) for label in amplitudes)
    gauge = np.stack([coordinates(generator @ vacuum - vacuum @ generator) for generator in generators], axis=1)

    tangents = [np.sqrt(amplitudes[(4, 8)]) * builder((4, 8), 1j * h @ unitary) for h in (I, sx, sy, sz)]
    d26 = np.array([[-sine, -1j * cosine]])
    d29 = np.array([[-sine, 1j * cosine], [1j * cosine, -sine]])
    mixed = np.sqrt(amplitudes[(2, 6)]) * builder((2, 6), d26) + np.sqrt(amplitudes[(2, 9)]) * builder((2, 9), d29)
    tangents.append(mixed)
    moduli = np.stack([coordinates(item) for item in tangents], axis=1)
    q, _ = np.linalg.qr(moduli)
    leakage = gauge - q @ (q.T @ gauge)
    _, singular, vh = np.linalg.svd(leakage, full_matrices=True)
    tolerance = 1e-8 * max(1.0, singular[0])
    rank = int(np.sum(singular > tolerance))
    kernel = vh[rank:, :].T
    image = np.linalg.lstsq(moduli, gauge @ kernel, rcond=None)[0]
    image_singular = np.linalg.svd(image, compute_uv=False)
    image_rank = int(np.sum(image_singular > 1e-8 * max(1.0, image_singular[0])))
    image_basis = np.linalg.svd(image, full_matrices=False)[0][:, :image_rank]
    mixed_projection = float(np.linalg.norm(image_basis[4, :])) if image_rank else 0.0
    return {
        'gaugeIntersectionRank': image_rank,
        'intersectionSingularValues': image_singular[:5].tolist(),
        'mixedCoordinateProjectionNorm': mixed_projection,
        'physicalDimension': 5-image_rank,
    }


rng = np.random.default_rng(230621)
points = [(np.eye(2), 0.0)]
for _ in range(8):
    raw = rng.normal(size=(2, 2)) + 1j * rng.normal(size=(2, 2))
    unitary, triangular = np.linalg.qr(raw)
    phase = np.diag(triangular)
    unitary = unitary @ np.diag(np.conj(phase) / np.abs(phase))
    points.append((unitary, rng.uniform(-np.pi, np.pi)))
rows = [analyze(unitary, angle) for unitary, angle in points]
print(json.dumps({
    'protocol':'spin23-candidate48-joint-double-quotient/1',
    'canonical': rows[0],
    'generic': rows[1:],
    'genericIntersectionRanks': sorted(set(row['gaugeIntersectionRank'] for row in rows[1:])),
    'genericPhysicalDimensions': sorted(set(row['physicalDimension'] for row in rows[1:])),
    'maximumGenericMixedProjectionNorm': max(row['mixedCoordinateProjectionNorm'] for row in rows[1:]),
}, indent=2))
