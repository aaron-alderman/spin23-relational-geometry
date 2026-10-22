"""Resolve the candidate-48 B(4,8) Hessian into U(2), Siegel-normal, and fibre probes."""

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

carriers = [item for item in c.strong_carriers() if (s.tw(item['op'], 5), s.tw(item['op'], 10)) == (8, 4)]
carrier = carriers[13]
_, _, response, labels, _, _, _, _, _ = g.generic_preserving_basis(carrier)
weights = [0.05521353245782003, 0.0, 0.0, 0.007286467542179783, 0.0, 0.0, 0.03125000000000003]
amplitudes = {(2, 6): 0.5, (2, 9): 0.25, (4, 8): 0.125, (5, 10): 0.25, (6, 7): 0.125}
builder = x.complex_field_builder(carrier)
base_seeds = {label: x.h.canonical(label).astype(complex) for label in amplitudes}


def make_vacuum(unitary):
    seeds = dict(base_seeds)
    seeds[(4, 8)] = unitary
    return sum(np.sqrt(amplitudes[label]) * builder(label, seeds[label]) for label in amplitudes)


def image(vacuum, right):
    vacuum2 = vacuum @ vacuum
    answer = -2 * right + 4 * (vacuum2 @ right + vacuum @ right @ vacuum + right @ vacuum2)
    for weight, generator in zip(weights, response):
        if weight:
            commutator = generator @ right - right @ generator
            answer += 2 * weight * (generator.conj().T @ commutator - commutator @ generator.conj().T)
    return answer


I = np.eye(2, dtype=complex)
sx = np.array([[0, 1], [1, 0]], dtype=complex)
sy = np.array([[0, -1j], [1j, 0]], dtype=complex)
sz = np.array([[1, 0], [0, -1]], dtype=complex)
probes = {
    'unitary_iI': 1j * I,
    'unitary_isx': 1j * sx,
    'unitary_isy_O2_fibre': 1j * sy,
    'unitary_isz': 1j * sz,
    'radial_I': I,
    'siegel_normal_sx': sx,
    'nonSiegel_fibre_sy': sy,
    'siegel_normal_sz': sz,
}
def evaluate(unitary):
    vacuum = make_vacuum(unitary)
    transported = {name: builder((4, 8), unitary @ seed) for name, seed in probes.items()}
    names = list(transported)
    gram = np.array([[np.vdot(transported[a], transported[b]).real for b in names] for a in names])
    hessian = np.array([[np.vdot(transported[a], image(vacuum, transported[b])).real for b in names] for a in names])
    normalizers = np.sqrt(np.diag(gram))
    normalized = hessian / normalizers[:, None] / normalizers[None, :]
    return names, gram, normalized


names, gram, normalized = evaluate(I)
rng = np.random.default_rng(230617)
audits = []
for _ in range(8):
    raw = rng.normal(size=(2, 2)) + 1j * rng.normal(size=(2, 2))
    unitary, triangular = np.linalg.qr(raw)
    phase = np.diag(triangular)
    unitary = unitary @ np.diag(np.conj(phase) / np.abs(phase))
    _, _, moved = evaluate(unitary)
    audits.append(moved)

print(json.dumps({
    'protocol': 'spin23-candidate48-siegel-normal-modes/2',
    'probeOrder': names,
    'gramOffDiagonalMaximum': float(np.max(np.abs(gram - np.diag(np.diag(gram))))),
    'normalizedHessian': normalized.tolist(),
    'normalizedDiagonal': {name: float(normalized[i, i]) for i, name in enumerate(names)},
    'siegelNormalDoubletSplitting': float(abs(normalized[names.index('siegel_normal_sx'), names.index('siegel_normal_sx')] - normalized[names.index('siegel_normal_sz'), names.index('siegel_normal_sz')])),
    'siegelNormalMixing': float(abs(normalized[names.index('siegel_normal_sx'), names.index('siegel_normal_sz')])),
    'transportPoints': len(audits),
    'transportMaximumHessianDeviation': float(max(np.max(np.abs(item - normalized)) for item in audits)),
    'transportDiagonalRanges': {
        name: [float(min(item[i, i] for item in audits)), float(max(item[i, i] for item in audits))]
        for i, name in enumerate(names)
    },
    'transportMaximumOffDiagonal': float(max(np.max(np.abs(item - np.diag(np.diag(item)))) for item in audits)),
}, indent=2))
