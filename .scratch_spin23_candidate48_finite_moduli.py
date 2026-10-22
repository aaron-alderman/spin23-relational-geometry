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


def random_unitary(n, rng):
    raw = rng.normal(size=(n, n)) + 1j * rng.normal(size=(n, n))
    q, r = np.linalg.qr(raw)
    diagonal = np.diag(r)
    return q @ np.diag(np.conj(diagonal) / np.abs(diagonal))


def polar_unitary(matrix):
    left, _, right = np.linalg.svd(matrix, full_matrices=False)
    return left @ right


if __name__ == '__main__':
    carriers = [item for item in c.strong_carriers() if (s.tw(item['op'], 5), s.tw(item['op'], 10)) == (8, 4)]
    carrier = carriers[13]
    _, _, response, labels, _, _, _, _, _ = g.generic_preserving_basis(carrier)
    weights = [0.05521353245782003, 0.0, 0.0, 0.007286467542179783, 0.0, 0.0, 0.03125000000000003]
    amplitudes = {(2, 6): 0.5, (2, 9): 0.25, (4, 8): 0.125, (5, 10): 0.25, (6, 7): 0.125}
    builder = x.complex_field_builder(carrier)

    def vacuum(seed48, mixed_angle=0.0):
        seeds = {label: x.h.canonical(label).astype(complex) for label in amplitudes}
        seeds[(4, 8)] = seed48
        cosine, sine = np.cos(mixed_angle), np.sin(mixed_angle)
        seeds[(2, 6)] = np.array([[cosine, -1j * sine]])
        seeds[(2, 9)] = np.array([[cosine, 1j * sine], [1j * sine, cosine]])
        return sum(np.sqrt(amplitudes[label]) * builder(label, seeds[label]) for label in amplitudes)

    def potential(matrix):
        matrix2 = matrix @ matrix
        value = -np.trace(matrix2).real + np.trace(matrix2 @ matrix2).real
        for weight, generator in zip(weights, response):
            commutator = generator @ matrix - matrix @ generator
            value += weight * np.vdot(commutator, commutator).real
        return float(value)

    op = carrier['op']
    dims = [c.DIMS[i] * c.DIMS[j] for i, j in op]
    offsets = np.cumsum([0] + dims[:-1]).tolist()

    def sector(kind, vertex):
        start = (0 if kind == 'P' else 92) + offsets[vertex]
        return slice(start, start + dims[vertex])

    cycle_path = [('P', 7), ('J', 13), ('P', 8), ('J', 9), ('P', 7)]

    def holonomy(matrix):
        product = np.eye(dims[7], dtype=complex)
        for source, target in zip(cycle_path, cycle_path[1:]):
            block = matrix[sector(*target), sector(*source)]
            product = polar_unitary(block) @ product
        return product

    baseline = vacuum(np.eye(2))
    baseline_energy = potential(baseline)
    baseline_spectrum = np.linalg.eigvalsh(baseline)
    rng = np.random.default_rng(230595)
    rows = []
    for _ in range(64):
        seed = random_unitary(2, rng)
        mixed_angle = rng.uniform(0, 2 * np.pi)
        matrix = vacuum(seed, mixed_angle)
        loop = holonomy(matrix)
        orientation = seed.conj().T @ seed.conj()
        rows.append({
            'energyDeviation': potential(matrix) - baseline_energy,
            'spectrumDeviation': float(np.max(np.abs(np.linalg.eigvalsh(matrix) - baseline_spectrum))),
            'cycleIdentityDeviation': float(np.linalg.norm(loop - np.eye(loop.shape[0]))),
            'orientationInvariantIdentityDeviation': float(np.linalg.norm(orientation - np.eye(2))),
            'orientationInvariantTrace': [float(np.trace(orientation).real), float(np.trace(orientation).imag)],
            'orientationInvariantDeterminantPhase': float(np.angle(np.linalg.det(orientation))),
            'mixedAngle': float(mixed_angle),
        })
    result = {
        'samples': len(rows),
        'baselinePotential': baseline_energy,
        'maximumAbsoluteEnergyDeviation': max(abs(row['energyDeviation']) for row in rows),
        'maximumSpectrumDeviation': max(row['spectrumDeviation'] for row in rows),
        'maximumCycleIdentityDeviation': max(row['cycleIdentityDeviation'] for row in rows),
        'orientationInvariantIdentityDeviationRange': [min(row['orientationInvariantIdentityDeviation'] for row in rows), max(row['orientationInvariantIdentityDeviation'] for row in rows)],
        'orientationInvariantTraceRanges': {
            'real': [min(row['orientationInvariantTrace'][0] for row in rows), max(row['orientationInvariantTrace'][0] for row in rows)],
            'imaginary': [min(row['orientationInvariantTrace'][1] for row in rows), max(row['orientationInvariantTrace'][1] for row in rows)],
        },
        'orientationInvariantDeterminantPhaseRange': [min(row['orientationInvariantDeterminantPhase'] for row in rows), max(row['orientationInvariantDeterminantPhase'] for row in rows)],
    }
    print(json.dumps({'protocol': 'spin23-candidate48-finite-moduli/1', 'row': result}, indent=2))
