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

GRADING = np.diag(np.concatenate([np.ones(92), -np.ones(92)]))


def killing_split(generators, tolerance=1e-8):
    dimension = len(generators)
    ads = [np.zeros((dimension, dimension)) for _ in range(dimension)]
    for i in range(dimension):
        for j in range(i):
            commutator = generators[i] @ generators[j] - generators[j] @ generators[i]
            coefficients = np.array([np.vdot(generator, commutator).real for generator in generators])
            ads[i][:, j] = coefficients
            ads[j][:, i] = -coefficients
    killing = np.array([[np.trace(ads[i] @ ads[j]) for j in range(dimension)] for i in range(dimension)])
    values, vectors = np.linalg.eigh(killing)
    groups = []
    start = 0
    while start < dimension:
        end = start + 1
        while end < dimension and abs(values[end] - values[start]) < tolerance:
            end += 1
        groups.append({
            'killingEigenvalue': float(values[start]),
            'generators': [sum(vectors[i, j] * generators[i] for i in range(dimension)) for j in range(start, end)],
        })
        start = end
    return groups


def analyze(carrier):
    e, q, r = x.e, x.q, x.r
    stationary, audit, parent, _, closure_coefficients, closure, _ = e.construct(carrier)
    factor_coefficients = [q.intersection_basis(closure_coefficients, space)[0] for space in audit['_spaces']]
    full_factors = [q.matrices(parent, coefficients) for coefficients in factor_coefficients]
    even_factors = [u.parity_parts(factor, GRADING)[0] for factor in full_factors]
    middle_ideals = killing_split(even_factors[1])
    response_factors = [even_factors[0]] + [row['generators'] for row in middle_ideals] + [even_factors[2]]
    factor_names = ['so4_from_so5'] + [
        'so6_from_so10' if len(row['generators']) == 15 else 'so4_from_so10'
        for row in middle_ideals
    ] + ['u1_squared_from_so4']

    labels, canonical, linear, quartic, _ = r.radial_data(carrier, closure)
    casimirs = [q.factor_casimir(linear, canonical, generators) for generators in response_factors]
    desired = {tuple(label) for label in stationary['active']}
    constraints = q.kkt_constraints(labels, linear, quartic, casimirs, desired)
    vertices = q.feasible_vertices(constraints, len(casimirs))
    best = None
    if vertices:
        objective, weights, slacks, chosen = vertices[0]
        best = {
            'weights': weights.tolist(),
            'weightSum': float(objective),
            'minimumSlack': float(np.min(slacks)),
            'saturatedConstraints': [constraints[i][0] for i, value in enumerate(slacks) if abs(value) <= 1e-7],
        }
    return {
        'lpair': carrier['lpair'],
        'rpair': carrier['rpair'],
        'factorNames': factor_names,
        'factorDimensions': [len(factor) for factor in response_factors],
        'middleKillingSplits': [
            {'eigenvalue': row['killingEigenvalue'], 'dimension': len(row['generators'])}
            for row in middle_ideals
        ],
        'intendedSupportKktFeasible': bool(vertices),
        'feasibleVertexCount': len(vertices),
        'minimumWeightSumVertex': best,
        'maximumUniformPhysicalMarginVertex': q.maximum_uniform_physical_margin(constraints, len(casimirs)),
        'casimirByFactorAndOrbit': [
            {str(labels[i]): float(casimir[i]) for i in range(len(labels))}
            for casimir in casimirs
        ],
    }


if __name__ == '__main__':
    carrier = next(
        item for item in c.strong_carriers()
        if (s.tw(item['op'], 5), s.tw(item['op'], 10)) == (8, 4)
        and item['lpair'] == ((8, 10), (10, 1))
        and item['rpair'] == ((10, 2), (7, 5))
    )
    print(json.dumps({'protocol': 'spin23-even-ideal-weight-kkt/1', 'row': analyze(carrier)}, indent=2, default=list))
