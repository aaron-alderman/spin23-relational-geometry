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


def preserving_basis(carrier):
    e, q, r = x.e, x.q, x.r
    stationary, audit, parent, _, closure_coefficients, closure, _ = e.construct(carrier)
    factor_coefficients = [q.intersection_basis(closure_coefficients, space)[0] for space in audit['_spaces']]
    full_factors = [q.matrices(parent, coefficients) for coefficients in factor_coefficients]
    ideals = k.build_ideals(full_factors)
    generators = [generator for ideal in [ideals[0], ideals[1], ideals[3]] for generator in ideal]
    robust_labels, canonical, linear, quartic, _ = r.radial_data(carrier, closure)
    fields, _ = f.build_fields(carrier, robust_labels)
    field_data = [a.sparse_data(field) for field in fields]
    field_norms = np.array([np.vdot(field, field).real for field in fields])
    leakage_gram = np.zeros((len(generators), len(generators)))
    for source_data in field_data:
        commutators = [a.commutator_with_sparse_field(generator, source_data) for generator in generators]
        overlaps = np.array([[a.sparse_inner(target, commutator) for target in field_data] for commutator in commutators])
        raw = np.array([[np.vdot(left, right).real for right in commutators] for left in commutators])
        leakage_gram += raw - (overlaps / field_norms) @ overlaps.T
    values, vectors = np.linalg.eigh((leakage_gram + leakage_gram.T) / 2)
    keep = values <= 1e-8 * max(1.0, float(values[-1]))
    preserving = [sum(vectors[i, j] * generators[i] for i in range(len(generators))) for j in np.where(keep)[0]]
    return stationary, closure, preserving, robust_labels, canonical, linear, quartic, values


def analyze(carrier):
    q, r = x.q, x.r
    stationary, closure, preserving, labels, canonical, linear, quartic, leakage_values = preserving_basis(carrier)
    casimir = q.factor_casimir(linear, canonical, preserving)
    desired = {tuple(label) for label in stationary['active']}
    constraints = q.kkt_constraints(labels, linear, quartic, [casimir], desired)
    vertices = q.feasible_vertices(constraints, 1)
    best = None
    if vertices:
        objective, weights, slacks, chosen = vertices[0]
        best = {'weight':float(weights[0]),'minimumSlack':float(np.min(slacks))}
    return {
        'lpair':carrier['lpair'],
        'rpair':carrier['rpair'],
        'preservingDimension':len(preserving),
        'leakageKernelEigenvalues':leakage_values[:4].tolist(),
        'isotropicCasimirByOrbit':{str(labels[i]):float(casimir[i]) for i in range(len(labels))},
        'intendedSupportKktFeasible':bool(vertices),
        'feasibleVertexCount':len(vertices),
        'minimumWeightVertex':best,
        'constraintRows':[{'name':name,'intercept':intercept,'slope':float(slope[0])} for name,intercept,slope in constraints],
    }


if __name__ == '__main__':
    carrier = next(
        item for item in c.strong_carriers()
        if (s.tw(item['op'],5),s.tw(item['op'],10))==(8,4)
        and item['lpair']==((8,10),(10,1))
        and item['rpair']==((10,2),(7,5))
    )
    print(json.dumps({'protocol':'spin23-u14-isotropic-kkt/1','row':analyze(carrier)},indent=2,default=list))
