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
a = load('.scratch_spin23_active23_scalar_module_audit.py', 'a')


def analyze(carrier):
    e, q = x.e, x.q
    _, audit, parent, _, closure_coefficients, _, _ = e.construct(carrier)
    factor_coefficients = [q.intersection_basis(closure_coefficients, space)[0] for space in audit['_spaces']]
    full_factors = [q.matrices(parent, coefficients) for coefficients in factor_coefficients]
    ideals = k.build_ideals(full_factors)
    active_ideals = [ideals[0], ideals[1], ideals[3]]
    active_names = ['so4_A', 'so6', 'u1_squared']

    labels = sorted({tuple(edge['orbit']) for edge in carrier['graph']['edges']})
    field_matrix = x.complex_field_builder(carrier)
    field_data = []
    field_labels = []
    support_mask = np.zeros((184, 184), dtype=bool)
    for label in labels:
        nr, nc = c.DIMS[label[1]], c.DIMS[label[0]]
        for row, column in product(range(nr), range(nc)):
            seed = np.zeros((nr, nc), dtype=complex)
            seed[row, column] = 1
            for phase in (1, 1j):
                data = a.sparse_data(field_matrix(label, phase * seed))
                field_data.append(data)
                field_labels.append(label)
                support_mask[data[0], data[1]] = True

    total_nonzero = 0
    outside_actions = 0
    maximum_outside = 0.0
    maximum_relative = 0.0
    by_ideal = []
    by_source = {}
    for ideal_name, ideal in zip(active_names, active_ideals):
        ideal_nonzero = 0
        ideal_outside = 0
        ideal_maximum = 0.0
        ideal_relative = 0.0
        for generator in ideal:
            for label, data in zip(field_labels, field_data):
                commutator = a.commutator_with_sparse_field(generator, data)
                norm = float(np.linalg.norm(commutator))
                if norm <= 1e-12:
                    continue
                total_nonzero += 1
                ideal_nonzero += 1
                outside = float(np.linalg.norm(commutator[~support_mask]))
                relative = outside / norm
                if outside > 1e-8 * max(1.0, norm):
                    outside_actions += 1
                    ideal_outside += 1
                maximum_outside = max(maximum_outside, outside)
                maximum_relative = max(maximum_relative, relative)
                ideal_maximum = max(ideal_maximum, outside)
                ideal_relative = max(ideal_relative, relative)
                item = by_source.setdefault(str(label), {'maximumOutsideSupportNorm': 0.0, 'maximumRelativeOutsideSupport': 0.0})
                item['maximumOutsideSupportNorm'] = max(item['maximumOutsideSupportNorm'], outside)
                item['maximumRelativeOutsideSupport'] = max(item['maximumRelativeOutsideSupport'], relative)
        by_ideal.append({
            'ideal': ideal_name,
            'dimension': len(ideal),
            'nonzeroActions': ideal_nonzero,
            'actionsLeavingUnionSupport': ideal_outside,
            'maximumOutsideSupportNorm': ideal_maximum,
            'maximumRelativeOutsideSupport': ideal_relative,
        })
    return {
        'lpair': carrier['lpair'],
        'rpair': carrier['rpair'],
        'graphOrbitCount': len(labels),
        'allGraphCoordinateDimension': len(field_data),
        'activeAlgebraDimension': sum(len(ideal) for ideal in active_ideals),
        'nonzeroActions': total_nonzero,
        'actionsLeavingUnionSupport': outside_actions,
        'maximumOutsideSupportNorm': maximum_outside,
        'maximumRelativeOutsideSupport': maximum_relative,
        'byIdeal': by_ideal,
        'bySourceOrbit': by_source,
    }


if __name__ == '__main__':
    carrier = next(
        item for item in c.strong_carriers()
        if (s.tw(item['op'], 5), s.tw(item['op'], 10)) == (8, 4)
        and item['lpair'] == ((8, 10), (10, 1))
        and item['rpair'] == ((10, 2), (7, 5))
    )
    print(json.dumps({'protocol': 'spin23-active23-allgraph-support-audit/1', 'row': analyze(carrier)}, indent=2, default=list))
