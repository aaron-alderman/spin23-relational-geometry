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
k = load('.scratch_spin23_even_ideal_complex_hessian.py', 'k')


def sparse_data(matrix, tolerance=1e-14):
    rows, columns = np.where(np.abs(matrix) > tolerance)
    return rows, columns, matrix[rows, columns]


def commutator_with_sparse_field(generator, field_data):
    rows, columns, values = field_data
    left_transpose = np.zeros_like(generator.T, dtype=complex)
    right = np.zeros_like(generator, dtype=complex)
    np.add.at(left_transpose, columns, values[:, None] * generator[:, rows].T)
    np.add.at(right, rows, values[:, None] * generator[columns, :])
    return left_transpose.T - right


def sparse_inner(field_data, matrix):
    rows, columns, values = field_data
    return np.sum(np.conj(values) * matrix[rows, columns]).real


def analyze(carrier):
    e, q, r = x.e, x.q, x.r
    _, audit, parent, _, closure_coefficients, closure, _ = e.construct(carrier)
    factor_coefficients = [q.intersection_basis(closure_coefficients, space)[0] for space in audit['_spaces']]
    full_factors = [q.matrices(parent, coefficients) for coefficients in factor_coefficients]
    ideals = k.build_ideals(full_factors)
    active_ideals = [ideals[0], ideals[1], ideals[3]]
    active_names = ['so4_A', 'so6', 'u1_squared']

    labels, _, _, _, _ = r.radial_data(carrier, closure)
    field_matrix = x.complex_field_builder(carrier)
    fields = []
    field_labels = []
    for label in labels:
        nr, nc = c.DIMS[label[1]], c.DIMS[label[0]]
        for row, column in product(range(nr), range(nc)):
            seed = np.zeros((nr, nc), dtype=complex)
            seed[row, column] = 1
            fields.append(field_matrix(label, seed)); field_labels.append(label)
            fields.append(field_matrix(label, 1j * seed)); field_labels.append(label)
    field_data = [sparse_data(field) for field in fields]
    norms = np.array([np.vdot(field, field).real for field in fields])
    gram = np.array([[sparse_inner(left, right) for right in fields] for left in field_data])
    off_diagonal = gram - np.diag(np.diag(gram))
    support_mask = np.zeros((184, 184), dtype=bool)
    for rows, columns, _ in field_data:
        support_mask[rows, columns] = True

    rows = []
    maximum_residual = 0.0
    maximum_relative_residual = 0.0
    maximum_outside_support = 0.0
    nonzero_actions = 0
    closed_actions = 0
    by_source_orbit = {}
    for ideal_name, ideal in zip(active_names, active_ideals):
        ideal_maximum = 0.0
        ideal_relative = 0.0
        for generator in ideal:
            for source_index, source_data in enumerate(field_data):
                commutator = commutator_with_sparse_field(generator, source_data)
                norm = float(np.linalg.norm(commutator))
                if norm <= 1e-12:
                    continue
                nonzero_actions += 1
                overlaps = np.array([sparse_inner(target_data, commutator) for target_data in field_data])
                projected_squared = float(np.sum(overlaps ** 2 / norms))
                residual = float(np.sqrt(max(0, norm ** 2 - projected_squared)))
                relative = residual / norm
                outside = float(np.linalg.norm(commutator[~support_mask]))
                if residual <= 1e-8 * max(1.0, norm):
                    closed_actions += 1
                maximum_residual = max(maximum_residual, residual)
                maximum_relative_residual = max(maximum_relative_residual, relative)
                maximum_outside_support = max(maximum_outside_support, outside)
                ideal_maximum = max(ideal_maximum, residual)
                ideal_relative = max(ideal_relative, relative)
                key = str(field_labels[source_index])
                item = by_source_orbit.setdefault(key, {'maximumResidualNorm': 0.0, 'maximumRelativeResidual': 0.0})
                item['maximumResidualNorm'] = max(item['maximumResidualNorm'], residual)
                item['maximumRelativeResidual'] = max(item['maximumRelativeResidual'], relative)
        rows.append({'ideal': ideal_name, 'dimension': len(ideal), 'maximumResidualNorm': ideal_maximum, 'maximumRelativeResidual': ideal_relative})
    return {
        'lpair': carrier['lpair'],
        'rpair': carrier['rpair'],
        'scalarCoordinateDimension': len(fields),
        'activeAlgebraDimension': sum(len(ideal) for ideal in active_ideals),
        'maximumFieldGramOffDiagonal': float(np.max(np.abs(off_diagonal))),
        'minimumFieldNorm': float(np.min(norms)),
        'nonzeroGeneratorFieldActions': nonzero_actions,
        'actionsClosedWithinScalarSpan': closed_actions,
        'maximumResidualNorm': maximum_residual,
        'maximumRelativeResidual': maximum_relative_residual,
        'maximumOutsideUnionSupportNorm': maximum_outside_support,
        'byIdeal': rows,
        'bySourceOrbit': by_source_orbit,
    }


if __name__ == '__main__':
    carrier = next(
        item for item in c.strong_carriers()
        if (s.tw(item['op'], 5), s.tw(item['op'], 10)) == (8, 4)
        and item['lpair'] == ((8, 10), (10, 1))
        and item['rpair'] == ((10, 2), (7, 5))
    )
    print(json.dumps({'protocol': 'spin23-active23-scalar-module-audit/1', 'row': analyze(carrier)}, indent=2, default=list))
