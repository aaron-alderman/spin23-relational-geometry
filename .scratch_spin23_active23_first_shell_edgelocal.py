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
t = load('.scratch_spin23_closure_tangent_orbit_completion.py', 't')


def analyze(carrier):
    e, q, r = x.e, x.q, x.r
    _, audit, parent, _, closure_coefficients, closure, _ = e.construct(carrier)
    factor_coefficients = [q.intersection_basis(closure_coefficients, space)[0] for space in audit['_spaces']]
    full_factors = [q.matrices(parent, coefficients) for coefficients in factor_coefficients]
    ideals = k.build_ideals(full_factors)
    active_ideals = [ideals[0], ideals[1], ideals[3]]
    active_names = ['so4_A', 'so6', 'u1_squared']
    robust_labels, _, _, _, _ = r.radial_data(carrier, closure)
    source_fields, _ = f.build_fields(carrier, robust_labels)
    source_data = [a.sparse_data(field) for field in source_fields]
    target_fields, target_metadata = t.edge_local_fields(carrier)
    target_data = [a.sparse_data(field) for field in target_fields]
    target_norms = np.array([np.vdot(field, field).real for field in target_fields])
    gram = np.array([[a.sparse_inner(left, right) for right in target_fields] for left in target_data])
    off_diagonal = gram - np.diag(np.diag(gram))

    nonzero_actions = 0
    captured_actions = 0
    maximum_residual = 0.0
    maximum_relative = 0.0
    by_ideal = []
    edge_energy = {}
    for ideal_name, ideal in zip(active_names, active_ideals):
        ideal_nonzero = 0
        ideal_captured = 0
        ideal_maximum = 0.0
        ideal_relative = 0.0
        for generator in ideal:
            for data in source_data:
                commutator = a.commutator_with_sparse_field(generator, data)
                norm = float(np.linalg.norm(commutator))
                if norm <= 1e-12:
                    continue
                nonzero_actions += 1
                ideal_nonzero += 1
                overlaps = np.array([a.sparse_inner(target, commutator) for target in target_data])
                projected_squared = float(np.sum(overlaps ** 2 / target_norms))
                residual = float(np.sqrt(max(0, norm ** 2 - projected_squared)))
                relative = residual / norm
                if residual <= 1e-8 * max(1.0, norm):
                    captured_actions += 1
                    ideal_captured += 1
                maximum_residual = max(maximum_residual, residual)
                maximum_relative = max(maximum_relative, relative)
                ideal_maximum = max(ideal_maximum, residual)
                ideal_relative = max(ideal_relative, relative)
                for edge_index in sorted({item['edgeIndex'] for item in target_metadata}):
                    indices = [i for i, item in enumerate(target_metadata) if item['edgeIndex'] == edge_index]
                    value = float(np.sum(overlaps[indices] ** 2 / target_norms[indices]))
                    if value > 1e-10:
                        key = str(edge_index)
                        edge_energy[key] = edge_energy.get(key, 0.0) + value
        by_ideal.append({
            'ideal': ideal_name,
            'nonzeroActions': ideal_nonzero,
            'actionsCapturedByEdgeLocalSpan': ideal_captured,
            'maximumResidualNorm': ideal_maximum,
            'maximumRelativeResidual': ideal_relative,
        })
    return {
        'lpair': carrier['lpair'],
        'rpair': carrier['rpair'],
        'sourceCoordinateDimension': len(source_fields),
        'targetCoordinateDimension': len(target_fields),
        'maximumTargetGramOffDiagonal': float(np.max(np.abs(off_diagonal))),
        'nonzeroActions': nonzero_actions,
        'actionsCapturedByEdgeLocalSpan': captured_actions,
        'maximumResidualNorm': maximum_residual,
        'maximumRelativeResidual': maximum_relative,
        'byIdeal': by_ideal,
        'nonzeroTargetEdgeCount': len(edge_energy),
        'targetEdgeProjectionEnergy': edge_energy,
    }


if __name__ == '__main__':
    carrier = next(
        item for item in c.strong_carriers()
        if (s.tw(item['op'], 5), s.tw(item['op'], 10)) == (8, 4)
        and item['lpair'] == ((8, 10), (10, 1))
        and item['rpair'] == ((10, 2), (7, 5))
    )
    print(json.dumps({'protocol': 'spin23-active23-first-shell-edgelocal/1', 'row': analyze(carrier)}, indent=2, default=list))
