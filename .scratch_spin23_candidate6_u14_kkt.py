import json

import numpy as np

import importlib.util
import sys


def load(path, name):
    spec = importlib.util.spec_from_file_location(name, path)
    module = importlib.util.module_from_spec(spec)
    sys.modules[name] = module
    spec.loader.exec_module(module)
    return module


g = load('.scratch_spin23_candidate48_u14_kkt.py', 'g')
c, s, x = g.c, g.s, g.x


if __name__ == '__main__':
    carrier = [item for item in c.strong_carriers() if (s.tw(item['op'], 5), s.tw(item['op'], 10)) == (8, 4)][6]
    _, _, preserving, labels, canonical, linear, quartic, leakage_values, ideal_dimensions = g.generic_preserving_basis(carrier)
    factors = [[generator] for generator in preserving]
    casimirs = [x.q.factor_casimir(linear, canonical, factor) for factor in factors]
    desired = {(3, 9), (5, 10), (2, 6), (6, 7), (3, 8)}
    constraints = x.q.kkt_constraints(labels, linear, quartic, casimirs, desired)
    vertices = x.q.feasible_vertices(constraints, len(factors))
    margin = x.q.maximum_uniform_physical_margin(constraints, len(factors))
    result = {
        'carrierIndex': 6,
        'lpair': carrier['lpair'],
        'rpair': carrier['rpair'],
        'preservingDimension': len(preserving),
        'idealDimensions': ideal_dimensions,
        'leakageFirstEigenvalues': leakage_values[:8].tolist(),
        'desired': sorted(desired),
        'feasibleVertexCount': len(vertices),
        'maximumUniformPhysicalMarginVertex': margin,
    }
    if vertices:
        objective, weights, slacks, chosen = vertices[0]
        result['minimumWeightSumVertex'] = {
            'weights': weights.tolist(),
            'weightSum': objective,
            'minimumSlack': float(min(slacks)),
            'saturatedConstraints': [constraints[i][0] for i, value in enumerate(slacks) if abs(value) <= 1e-7],
            'vertexDefiningConstraints': [constraints[i][0] for i in chosen],
        }
    print(json.dumps({'protocol': 'spin23-candidate6-u14-kkt/1', 'row': result}, indent=2, default=list))
