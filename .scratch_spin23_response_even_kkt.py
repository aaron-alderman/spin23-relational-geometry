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
e = load('.scratch_spin23_exception_stabilizer_extension_closure.py', 'e')
r = load('.scratch_spin23_exception_closure_radial_kkt.py', 'r')
q = load('.scratch_spin23_exception_factor_cone_kkt.py', 'q')
u = load('.scratch_spin23_response_even_subalgebra.py', 'u')


def analyze(carrier):
    stationary, audit, parent, stabilizer, closure_coefficients, closure, residual = e.construct(carrier)
    factor_coefficients = [q.intersection_basis(closure_coefficients, space)[0] for space in audit['_spaces']]
    factors = [q.matrices(parent, coefficients) for coefficients in factor_coefficients]
    grading = np.diag(np.concatenate([np.ones(92), -np.ones(92)]))
    even_factors = [u.parity_parts(factor, grading)[0] for factor in factors]
    labels, canonical, linear, quartic, _ = r.radial_data(carrier, closure)
    casimirs = [q.factor_casimir(linear, canonical, generators) for generators in even_factors]
    desired = {tuple(label) for label in stationary['active']}
    constraints = q.kkt_constraints(labels, linear, quartic, casimirs, desired)
    vertices = q.feasible_vertices(constraints, len(casimirs))
    best = None
    if vertices:
        objective, weights, slacks, chosen = vertices[0]
        best = {
            'weights': weights.tolist(),
            'weightSum': objective,
            'minimumSlack': float(np.min(slacks)),
            'saturatedConstraints': [constraints[i][0] for i, value in enumerate(slacks) if abs(value) <= 1e-7],
        }
    return {
        'lpair': carrier['lpair'],
        'rpair': carrier['rpair'],
        'evenGroupedFactorDimensions': [len(factor) for factor in even_factors],
        'casimirByFactorAndOrbit': [
            {str(labels[i]): float(casimir[i]) for i in range(len(labels))}
            for casimir in casimirs
        ],
        'intendedSupportKktFeasible': bool(vertices),
        'feasibleVertexCount': len(vertices),
        'minimumWeightSumVertex': best,
        'maximumUniformPhysicalMarginVertex': q.maximum_uniform_physical_margin(constraints, len(casimirs)),
        'constraintRows': [
            {'name': name, 'intercept': intercept, 'slopes': slope.tolist()}
            for name, intercept, slope in constraints
        ],
    }


if __name__ == '__main__':
    carrier = next(
        item for item in c.strong_carriers()
        if (s.tw(item['op'], 5), s.tw(item['op'], 10)) == (8, 4)
        and item['lpair'] == ((8, 10), (10, 1))
        and item['rpair'] == ((10, 2), (7, 5))
    )
    print(json.dumps({'protocol': 'spin23-response-even-kkt/1', 'row': analyze(carrier)}, indent=2, default=list))
