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


def random_unitary(n, rng):
    raw = rng.normal(size=(n, n)) + 1j * rng.normal(size=(n, n))
    q, r = np.linalg.qr(raw)
    phase = np.diag(r)
    return q @ np.diag(np.conj(phase) / np.abs(phase))


def polar_unitary(matrix):
    left, _, right = np.linalg.svd(matrix)
    return left @ right


def analyze(carrier):
    builder = x.complex_field_builder(carrier)
    op = carrier['op']
    dimensions = [c.DIMS[i] * c.DIMS[j] for i, j in op]
    offsets = np.cumsum([0] + dimensions[:-1]).tolist()

    def sector(kind, vertex):
        start = (0 if kind == 'P' else 92) + offsets[vertex]
        return slice(start, start + dimensions[vertex])

    def path_holonomy(matrix, path):
        product = np.eye(dimensions[path[0][1]], dtype=complex)
        singular_deviations = []
        for source, target in zip(path, path[1:]):
            block = matrix[sector(*target), sector(*source)]
            unitary = polar_unitary(block)
            singular_deviations.append(float(np.max(np.abs(np.linalg.svd(block, compute_uv=False) - 1))))
            product = unitary @ product
        return product, singular_deviations

    rng = np.random.default_rng(230588)
    cases = []
    definitions = [
        {
            'addedOrbit': (1, 2),
            'path': [('P', 0), ('J', 17), ('P', 1), ('J', 3), ('P', 0)],
        },
        {
            'addedOrbit': (1, 9),
            'path': [('P', 0), ('J', 17), ('P', 15), ('J', 14), ('P', 0)],
        },
    ]
    for definition in definitions:
        deviations = []
        scalar_deviations = []
        phase_spreads = []
        traces = []
        formula_residuals = []
        for _ in range(32):
            seed510 = random_unitary(3, rng)
            added = random_unitary(2, rng)
            matrix = builder((5, 10), seed510) + builder(definition['addedOrbit'], added)
            holonomy, singular = path_holonomy(matrix, definition['path'])
            if definition['addedOrbit'] == (1, 9):
                predicted = np.kron(added.conj().T @ added.conj(), np.eye(3))
            else:
                predicted = np.eye(holonomy.shape[0])
            formula_residuals.append(float(np.linalg.norm(holonomy - predicted)))
            phase = np.angle(np.linalg.det(holonomy)) / holonomy.shape[0]
            scalar = np.exp(1j * phase) * np.eye(holonomy.shape[0])
            eigenphases = np.sort(np.angle(np.linalg.eigvals(holonomy) * np.exp(-1j * phase)))
            deviations.append(float(np.linalg.norm(holonomy - np.eye(holonomy.shape[0]))))
            scalar_deviations.append(float(np.linalg.norm(holonomy - scalar)))
            phase_spreads.append(float(eigenphases[-1] - eigenphases[0]))
            traces.append([float(np.trace(holonomy).real), float(np.trace(holonomy).imag)])
        cases.append({
            'addedOrbit': definition['addedOrbit'],
            'cyclePath': definition['path'],
            'samples': 32,
            'maximumIdentityDeviation': max(deviations),
            'minimumIdentityDeviation': min(deviations),
            'maximumScalarDeviation': max(scalar_deviations),
            'maximumEigenphaseSpread': max(phase_spreads),
            'maximumClosedFormResidual': max(formula_residuals),
            'traceRange': {
                'real': [min(row[0] for row in traces), max(row[0] for row in traces)],
                'imaginary': [min(row[1] for row in traces), max(row[1] for row in traces)],
            },
        })
    return {'cases': cases}


if __name__ == '__main__':
    carrier = next(
        item for item in c.strong_carriers()
        if (s.tw(item['op'], 5), s.tw(item['op'], 10)) == (8, 4)
        and item['lpair'] == ((8, 10), (10, 1))
        and item['rpair'] == ((10, 2), (7, 5))
    )
    print(json.dumps({'protocol': 'spin23-u14-cycle-holonomy/1', 'row': analyze(carrier)}, indent=2, default=list))
