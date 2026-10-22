from itertools import product
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


if __name__ == '__main__':
    carriers = [item for item in c.strong_carriers() if (s.tw(item['op'], 5), s.tw(item['op'], 10)) == (8, 4)]
    carrier = carriers[13]
    _, _, response, labels, _, _, _, _, _ = g.generic_preserving_basis(carrier)
    weights = [0.05521353245782003, 0.0, 0.0, 0.007286467542179783, 0.0, 0.0, 0.03125000000000003]
    amplitudes = {(2, 6): 0.5, (2, 9): 0.25, (4, 8): 0.125, (5, 10): 0.25, (6, 7): 0.125}
    builder = x.complex_field_builder(carrier)
    fields = []
    for label in labels:
        nr, nc = c.DIMS[label[1]], c.DIMS[label[0]]
        for row, column in product(range(nr), range(nc)):
            seed = np.zeros((nr, nc), dtype=complex)
            seed[row, column] = 1
            fields.extend([builder(label, seed), builder(label, 1j * seed)])
    field_flat = np.stack([field.ravel() for field in fields])

    def vacuum(seed48, angle):
        cosine, sine = np.cos(angle), np.sin(angle)
        seeds = {label: x.h.canonical(label).astype(complex) for label in amplitudes}
        seeds[(4, 8)] = seed48
        seeds[(2, 6)] = np.array([[cosine, -1j * sine]])
        seeds[(2, 9)] = np.array([[cosine, 1j * sine], [1j * sine, cosine]])
        return sum(np.sqrt(amplitudes[label]) * builder(label, seeds[label]) for label in amplitudes)

    def hessian(matrix):
        matrix2 = matrix @ matrix
        answer = np.zeros((len(fields), len(fields)))
        for j, right in enumerate(fields):
            image = -2 * right + 4 * (matrix2 @ right + matrix @ right @ matrix + right @ matrix2)
            for weight, generator in zip(weights, response):
                if weight == 0:
                    continue
                commutator = generator @ right - right @ generator
                image += 2 * weight * (generator.conj().T @ commutator - commutator @ generator.conj().T)
            answer[:, j] = np.real(field_flat.conj() @ image.ravel())
        return np.linalg.eigvalsh((answer + answer.T) / 2)

    rng = np.random.default_rng(230599)
    points = [(np.eye(2), 0.0)] + [(random_unitary(2, rng), rng.uniform(0, 2 * np.pi)) for _ in range(3)]
    spectra = [hessian(vacuum(seed, angle)) for seed, angle in points]
    tolerance = 1e-8 * max(1.0, float(np.max(np.abs(spectra[0]))))
    rows = []
    for values in spectra:
        rows.append({
            'negative': int(np.sum(values < -tolerance)),
            'zero': int(np.sum(np.abs(values) <= tolerance)),
            'positive': int(np.sum(values > tolerance)),
            'minimum': float(values[0]),
            'firstPositive': float(values[np.where(values > tolerance)[0][0]]),
            'spectrumDeviationFromCanonical': float(np.max(np.abs(values - spectra[0]))),
        })
    print(json.dumps({'protocol': 'spin23-candidate48-joint-hessian/1', 'row': {'tolerance': tolerance, 'points': rows}}, indent=2))
