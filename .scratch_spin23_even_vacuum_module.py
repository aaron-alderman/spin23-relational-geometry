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
u = load('.scratch_spin23_response_even_subalgebra.py', 'u')

WEIGHTS = np.array([2.0041536863966773, 0.012461059190031154, 12.01246105919003])
GRADING = np.diag(np.concatenate([np.ones(92), -np.ones(92)]))


def orthogonalize(candidate, basis, passes=2):
    for _ in range(passes):
        for vector in basis:
            candidate -= np.vdot(vector, candidate).real * vector
    return candidate


def sparse_structure(matrix, tolerance=1e-14):
    rows, columns = np.where(np.abs(matrix) > tolerance)
    return rows, columns, matrix[rows, columns]


def sparse_commutator(structure, field):
    rows, columns, values = structure
    left = np.zeros_like(field)
    right_transpose = np.zeros_like(field.T)
    np.add.at(left, rows, values[:, None] * field[columns, :])
    np.add.at(right_transpose, columns, values[:, None] * field.T[rows, :])
    return left - right_transpose.T


def analyze(carrier, tolerance=1e-10, maximum_dimension=256):
    e, q, r = x.e, x.q, x.r
    stationary, audit, parent, _, closure_coefficients, closure, _ = e.construct(carrier)
    factor_coefficients = [q.intersection_basis(closure_coefficients, space)[0] for space in audit['_spaces']]
    full_factors = [q.matrices(parent, coefficients) for coefficients in factor_coefficients]
    even_factors = [u.parity_parts(factor, GRADING)[0] for factor in full_factors]
    generators = [generator for factor in even_factors for generator in factor]
    generator_structures = [sparse_structure(generator) for generator in generators]

    labels, canonical, linear, quartic, _ = r.radial_data(carrier, closure)
    casimirs = [q.factor_casimir(linear, canonical, generators_) for generators_ in even_factors]
    combined_casimir = sum(WEIGHTS[i] * casimirs[i] for i in range(len(even_factors)))
    desired = {tuple(label) for label in stationary['active']}
    active = [i for i, label in enumerate(labels) if tuple(label) in desired]
    amplitudes = np.linalg.solve(
        2 * quartic[np.ix_(active, active)],
        linear[active] * (1 - combined_casimir[active]),
    )
    vacuum = sum(np.sqrt(amplitudes[local]) * canonical[index] for local, index in enumerate(active))
    vacuum /= np.linalg.norm(vacuum)

    basis = [vacuum]
    frontier = [vacuum]
    iteration_rows = [{'iteration': 0, 'newDimension': 1, 'cumulativeDimension': 1}]
    truncated = False
    while frontier:
        new_vectors = []
        for field in frontier:
            for generator_structure in generator_structures:
                image = sparse_commutator(generator_structure, field)
                image = orthogonalize(image, basis + new_vectors)
                norm = np.linalg.norm(image)
                if norm > tolerance:
                    new_vectors.append(image / norm)
                    if len(basis) + len(new_vectors) >= maximum_dimension:
                        truncated = True
                        break
            if truncated:
                break
        basis.extend(new_vectors)
        iteration_rows.append({
            'iteration': len(iteration_rows),
            'newDimension': len(new_vectors),
            'cumulativeDimension': len(basis),
        })
        print(json.dumps({'progress': iteration_rows[-1], 'truncated': truncated}), flush=True)
        if truncated or not new_vectors:
            break
        frontier = new_vectors

    maximum_hermitian_residual = max(np.linalg.norm(field - field.conj().T) for field in basis)
    grading_parities = []
    for field in basis:
        even_norm = np.linalg.norm((field + GRADING @ field @ GRADING) / 2)
        odd_norm = np.linalg.norm((field - GRADING @ field @ GRADING) / 2)
        grading_parities.append((even_norm, odd_norm))
    return {
        'lpair': carrier['lpair'],
        'rpair': carrier['rpair'],
        'evenAlgebraDimension': len(generators),
        'moduleDimension': len(basis),
        'truncated': truncated,
        'iterationGrowth': iteration_rows,
        'maximumHermitianResidual': float(maximum_hermitian_residual),
        'basisParityCounts': {
            'even': sum(1 for even, odd in grading_parities if even > tolerance and odd <= tolerance),
            'odd': sum(1 for even, odd in grading_parities if odd > tolerance and even <= tolerance),
            'mixed': sum(1 for even, odd in grading_parities if even > tolerance and odd > tolerance),
        },
        'activeAmplitudes': {str(labels[index]): float(amplitudes[local]) for local, index in enumerate(active)},
    }


if __name__ == '__main__':
    carrier = next(
        item for item in c.strong_carriers()
        if (s.tw(item['op'], 5), s.tw(item['op'], 10)) == (8, 4)
        and item['lpair'] == ((8, 10), (10, 1))
        and item['rpair'] == ((10, 2), (7, 5))
    )
    print(json.dumps({'protocol': 'spin23-even-vacuum-module/1', 'row': analyze(carrier)}, indent=2, default=list))
