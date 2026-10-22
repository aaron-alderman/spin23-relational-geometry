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
t = load('.scratch_spin23_u14_factor_tangent_hessian.py', 't')
gs = load('.scratch_spin23_candidate48_gauge_split.py', 'gs')
g = load('.scratch_spin23_candidate48_u14_kkt.py', 'g')


def restricted_builder(carrier, allowed_edges):
    op = carrier['op']
    block_dimensions = [c.DIMS[i] * c.DIMS[j] for i, j in op]
    offsets = np.cumsum([0] + block_dimensions[:-1]).tolist()
    allowed_edges = {tuple(edge) for edge in allowed_edges}

    def field_matrix(label, seed):
        matrix = np.zeros((184, 184), dtype=complex)
        for edge in carrier['graph']['edges']:
            if edge['orbit'] != label or (edge['u'], edge['v']) not in allowed_edges:
                continue
            u, v = edge['u'], edge['v']
            p, endpoint = op[u], op[v]
            horizontal = p[1] == endpoint[0] and p[0] != endpoint[1]
            vertical = p[0] == endpoint[1] and p[1] != endpoint[0]
            a, b = (p[0], endpoint[1]) if horizontal else (p[1], endpoint[0])
            field = seed if (a, b) == label else seed.T
            if horizontal:
                direct = np.kron(field, np.eye(c.DIMS[p[1]]))
                conjugate = np.kron(np.eye(c.DIMS[p[1]]), field)
            else:
                direct = np.kron(np.eye(c.DIMS[p[0]]), field)
                conjugate = np.kron(field, np.eye(c.DIMS[p[0]]))
            pu, jv, ju, pv = offsets[u], 92 + offsets[v], 92 + offsets[u], offsets[v]
            matrix[jv:jv + direct.shape[0], pu:pu + direct.shape[1]] += direct
            matrix[pu:pu + direct.shape[1], jv:jv + direct.shape[0]] += direct.conj().T
            matrix[pv:pv + conjugate.shape[0], ju:ju + conjugate.shape[1]] += conjugate
            matrix[ju:ju + conjugate.shape[1], pv:pv + conjugate.shape[0]] += conjugate.conj().T
        return matrix

    return field_matrix


def packed(matrix):
    return np.concatenate([matrix.real.ravel(), matrix.imag.ravel()])


if __name__ == '__main__':
    carrier = [item for item in c.strong_carriers() if (s.tw(item['op'], 5), s.tw(item['op'], 10)) == (8, 4)][13]
    active = [(2, 9), (5, 10), (2, 6), (6, 7), (4, 8)]
    _, _, _, robust_labels, _, _, _, _, _ = g.generic_preserving_basis(carrier)
    amplitudes = {(2, 6): 0.5, (2, 9): 0.25, (4, 8): 0.125, (5, 10): 0.25, (6, 7): 0.125}
    builder = x.complex_field_builder(carrier)
    vacuum = sum(np.sqrt(amplitudes[label]) * builder(label, x.h.canonical(label).astype(complex)) for label in amplitudes)
    sigma_x = np.array([[0, 1], [1, 0]], dtype=complex)
    mixed = np.sqrt(0.5) * builder((2, 6), np.array([[0, -1j]])) + 0.5 * builder((2, 9), 1j * sigma_x)

    active_generators, _ = gs.admissible_factor_generators(carrier, active)
    active_orbit = np.stack([packed(generator @ vacuum - vacuum @ generator) for generator in active_generators], axis=1)
    coefficients, _, _, _ = np.linalg.lstsq(active_orbit, packed(mixed), rcond=1e-10)
    mixed_generator = sum(coefficient * generator for coefficient, generator in zip(coefficients, active_generators))

    split_fields = []
    split_metadata = []
    for label in robust_labels:
        builders = [(str(tuple(label)), builder)]
        if tuple(label) == (1, 9):
            builders = [
                ('(1,9):clusterA', restricted_builder(carrier, [(0, 14), (1, 14)])),
                ('(1,9):clusterB', restricted_builder(carrier, [(15, 17)])),
            ]
        nr, nc = c.DIMS[label[1]], c.DIMS[label[0]]
        for component_name, component_builder in builders:
            for row, column in product(range(nr), range(nc)):
                seed = np.zeros((nr, nc), dtype=complex)
                seed[row, column] = 1
                split_fields.extend([component_builder(label, seed), component_builder(label, 1j * seed)])
                split_metadata.extend([component_name, component_name])
    split_data = [gs.a.sparse_data(field) for field in split_fields]
    split_norms = np.array([np.vdot(field, field).real for field in split_fields])
    rows = []
    for field_data, metadata in zip(split_data, split_metadata):
        commutator = gs.a.commutator_with_sparse_field(mixed_generator, field_data)
        raw = float(np.vdot(commutator, commutator).real)
        overlaps = np.array([gs.a.sparse_inner(target_data, commutator) for target_data in split_data])
        residual2 = max(0.0, raw - float(np.sum(overlaps ** 2 / split_norms)))
        rows.append({'source': metadata, 'raw': raw, 'residual2': residual2})
    active_residual = packed(mixed) - active_orbit @ coefficients
    result = {
        'originalRobustOrbitCount': len(robust_labels),
        'splitOrbitCount': len(robust_labels) + 1,
        'splitCoordinateCount': len(split_fields),
        'mixedTangentRelativeOrbitResidual': float(np.linalg.norm(active_residual) / np.linalg.norm(packed(mixed))),
        'maximumSplitSpaceClosureResidualNormSquared': max(row['residual2'] for row in rows),
        'totalSplitSpaceClosureResidualNormSquared': sum(row['residual2'] for row in rows),
        'closureResidualBySource': {
            source: sum(row['residual2'] for row in rows if row['source'] == source)
            for source in sorted({row['source'] for row in rows})
        },
    }
    print(json.dumps({'protocol': 'spin23-candidate48-split19-closure/1', 'row': result}, indent=2))
