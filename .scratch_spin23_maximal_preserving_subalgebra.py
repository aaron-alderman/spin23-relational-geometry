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
k = load('.scratch_spin23_even_ideal_complex_hessian.py', 'k')
a = load('.scratch_spin23_active23_scalar_module_audit.py', 'a')
f = load('.scratch_spin23_active23_first_shell_allgraph.py', 'f')
z = load('.scratch_spin23_vacuum_centralizer_repair.py', 'z')


def kernel_dimension(matrix, tolerance=1e-8):
    values = np.linalg.eigvalsh(matrix)
    scale = max(1.0, float(values[-1]))
    return int(np.sum(values <= tolerance * scale)), values


def analyze(carrier):
    e, q, r = x.e, x.q, x.r
    _, audit, parent, _, closure_coefficients, closure, _ = e.construct(carrier)
    factor_coefficients = [q.intersection_basis(closure_coefficients, space)[0] for space in audit['_spaces']]
    full_factors = [q.matrices(parent, coefficients) for coefficients in factor_coefficients]
    ideals = k.build_ideals(full_factors)
    active_ideals = [ideals[0], ideals[1], ideals[3]]
    active_names = ['so4_A', 'so6', 'u1_squared']
    generators = [generator for ideal in active_ideals for generator in ideal]
    ideal_slices = []
    start = 0
    for name, ideal in zip(active_names, active_ideals):
        ideal_slices.append((name, slice(start, start + len(ideal))))
        start += len(ideal)

    robust_labels, _, _, _, _ = r.radial_data(carrier, closure)
    fields, _ = f.build_fields(carrier, robust_labels)
    field_data = [a.sparse_data(field) for field in fields]
    field_norms = np.array([np.vdot(field, field).real for field in fields])
    leakage_gram = np.zeros((len(generators), len(generators)))
    for source_data in field_data:
        commutators = [a.commutator_with_sparse_field(generator, source_data) for generator in generators]
        overlaps = np.array([
            [a.sparse_inner(target_data, commutator) for target_data in field_data]
            for commutator in commutators
        ])
        raw_gram = np.array([
            [np.vdot(left, right).real for right in commutators]
            for left in commutators
        ])
        leakage_gram += raw_gram - (overlaps / field_norms) @ overlaps.T

    values, vectors = np.linalg.eigh((leakage_gram + leakage_gram.T) / 2)
    tolerance = 1e-8 * max(1.0, float(values[-1]))
    keep = values <= tolerance
    preserving = [sum(vectors[i, j] * generators[i] for i in range(len(generators))) for j in np.where(keep)[0]]
    ideal_rows = []
    for name, selection in ideal_slices:
        dimension, ideal_values = kernel_dimension(leakage_gram[selection, selection])
        ideal_rows.append({
            'ideal': name,
            'idealDimension': selection.stop - selection.start,
            'preservingIntersectionDimension': dimension,
            'smallestLeakageEigenvalues': ideal_values[:min(8, len(ideal_values))].tolist(),
        })
    return {
        'lpair': carrier['lpair'],
        'rpair': carrier['rpair'],
        'activeAlgebraDimension': len(generators),
        'scalarCoordinateDimension': len(fields),
        'preservingKernelDimension': len(preserving),
        'leakageGramMinimumEigenvalue': float(values[0]),
        'leakageGramFirstPositiveEigenvalue': float(values[np.where(values > tolerance)[0][0]]) if np.any(values > tolerance) else None,
        'leakageGramMaximumEigenvalue': float(values[-1]),
        'preservingAlgebraInvariants': z.algebra_invariants(preserving) if preserving else None,
        'idealIntersections': ideal_rows,
        'smallestLeakageEigenvalues': values[:min(23, len(values))].tolist(),
    }


if __name__ == '__main__':
    carrier = next(
        item for item in c.strong_carriers()
        if (s.tw(item['op'], 5), s.tw(item['op'], 10)) == (8, 4)
        and item['lpair'] == ((8, 10), (10, 1))
        and item['rpair'] == ((10, 2), (7, 5))
    )
    print(json.dumps({'protocol': 'spin23-maximal-preserving-subalgebra/1', 'row': analyze(carrier)}, indent=2, default=list))
