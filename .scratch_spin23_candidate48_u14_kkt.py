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


def generic_preserving_basis(carrier):
    e, q, r = x.e, x.q, x.r
    stationary, audit, parent, _, closure_coefficients, closure, _ = e.construct(carrier)
    factor_coefficients = [q.intersection_basis(closure_coefficients, space)[0] for space in audit['_spaces']]
    full_factors = [q.matrices(parent, coefficients) for coefficients in factor_coefficients]
    ideals = k.build_ideals(full_factors)
    generators = [generator for ideal in ideals for generator in ideal]
    labels, canonical, linear, quartic, _ = r.radial_data(carrier, closure)
    fields, _ = f.build_fields(carrier, labels)
    field_data = [a.sparse_data(field) for field in fields]
    field_norms = np.array([np.vdot(field, field).real for field in fields])
    leakage = np.zeros((len(generators), len(generators)))
    for source_data in field_data:
        commutators = [a.commutator_with_sparse_field(generator, source_data) for generator in generators]
        overlaps = np.array([[a.sparse_inner(target, commutator) for target in field_data] for commutator in commutators])
        raw = np.array([[np.vdot(left, right).real for right in commutators] for left in commutators])
        leakage += raw - (overlaps / field_norms) @ overlaps.T
    values, vectors = np.linalg.eigh((leakage + leakage.T) / 2)
    tolerance = 1e-8 * max(1.0, float(values[-1]))
    preserving = [sum(vectors[i, j] * generators[i] for i in range(len(generators))) for j in np.where(values <= tolerance)[0]]
    return stationary, closure, preserving, labels, canonical, linear, quartic, values, [len(ideal) for ideal in ideals]


def analyze(carrier):
    q = x.q
    _, _, preserving, labels, canonical, linear, quartic, leakage_values, ideal_dimensions = generic_preserving_basis(carrier)
    factors = [[generator] for generator in preserving]
    casimirs = [q.factor_casimir(linear, canonical, factor) for factor in factors]
    desired = {(2, 9), (5, 10), (2, 6), (6, 7), (4, 8)}
    constraints = q.kkt_constraints(labels, linear, quartic, casimirs, desired)
    vertices = q.feasible_vertices(constraints, len(factors))
    best = None
    if vertices:
        objective, weights, slacks, chosen = vertices[0]
        best = {
            'weights': weights.tolist(),
            'weightSum': objective,
            'minimumSlack': float(min(slacks)),
            'saturatedConstraints': [constraints[i][0] for i, value in enumerate(slacks) if abs(value) <= 1e-7],
            'vertexDefiningConstraints': [constraints[i][0] for i in chosen],
        }
    return {
        'preservingDimension': len(preserving),
        'evenIdealDimensions': ideal_dimensions,
        'leakageKernelEigenvalues': leakage_values[:4].tolist(),
        'desiredActiveOrbits': sorted(desired),
        'kktFeasible': bool(vertices),
        'feasibleVertexCount': len(vertices),
        'minimumWeightSumVertex': best,
        'maximumUniformPhysicalMarginVertex': q.maximum_uniform_physical_margin(constraints, len(factors)),
        'constraintRows': [
            {'name': name, 'intercept': intercept, 'slopes': slope.tolist()}
            for name, intercept, slope in constraints
        ],
    }


if __name__ == '__main__':
    carriers = [item for item in c.strong_carriers() if (s.tw(item['op'], 5), s.tw(item['op'], 10)) == (8, 4)]
    carrier = carriers[13]
    print(json.dumps({
        'protocol': 'spin23-candidate48-u14-kkt/1',
        'carrierIndex': 13,
        'lpair': carrier['lpair'],
        'rpair': carrier['rpair'],
        'row': analyze(carrier),
    }, indent=2, default=list))
