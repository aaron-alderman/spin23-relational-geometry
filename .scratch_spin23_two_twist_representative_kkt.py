import importlib.util
import json
import sys

from itertools import combinations
import numpy as np


def load(path, name):
    spec = importlib.util.spec_from_file_location(name, path)
    module = importlib.util.module_from_spec(spec)
    sys.modules[name] = module
    spec.loader.exec_module(module)
    return module


p = load('.scratch_spin23_frustrated_cyclic_positive_census.py', 'p')
g = load('.scratch_spin23_candidate48_u14_kkt.py', 'g')
c, s, x = g.c, g.s, g.x


def farkas_certificate(constraints, dimension):
    best = None
    for chosen in combinations(range(len(constraints)), dimension + 1):
        slopes = np.stack([constraints[i][2] for i in chosen])
        if np.linalg.matrix_rank(slopes, 1e-9) < dimension:
            continue
        _, singular, vh = np.linalg.svd(slopes.T, full_matrices=True)
        vector = vh[-1]
        if np.max(vector) <= 1e-9:
            vector = -vector
        if np.min(vector) < -1e-8:
            continue
        vector = np.maximum(vector, 0)
        vector /= np.sum(vector)
        intercept = sum(vector[j] * constraints[i][1] for j, i in enumerate(chosen))
        if intercept < -1e-9 and (best is None or intercept < best['combinedIntercept']):
            best = {
                'combinedIntercept': float(intercept),
                'slopeResidual': float(np.linalg.norm(vector @ slopes)),
                'terms': [
                    {'name': constraints[i][0], 'coefficient': float(vector[j]), 'intercept': float(constraints[i][1])}
                    for j, i in enumerate(chosen) if vector[j] > 1e-8
                ],
            }
    return best


if __name__ == '__main__':
    carriers = [item for item in c.strong_carriers() if (s.tw(item['op'], 5), s.tw(item['op'], 10)) == (8, 4)]
    rows = []
    for carrier_index in [4, 35]:
        carrier = carriers[carrier_index]
        _, _, preserving, labels, canonical, linear, quartic, _, _ = g.generic_preserving_basis(carrier)
        factors = [[generator] for generator in preserving]
        casimirs = [x.q.factor_casimir(linear, canonical, factor) for factor in factors]
        candidates = []
        for radial in p.m.analyze(carrier):
            desired = {tuple(label) for label in radial['activeOrbits']}
            active_edges = [edge for edge in carrier['graph']['edges'] if tuple(edge['orbit']) in desired]
            if p.cycle_rank(active_edges) <= 0 or radial['negativeInertia'] != 0 or radial['zeroInertia'] != 0:
                continue
            constraints = x.q.kkt_constraints(labels, linear, quartic, casimirs, desired)
            vertices = x.q.feasible_vertices(constraints, len(factors))
            margin = x.q.maximum_uniform_physical_margin(constraints, len(factors))
            item = {
                'addedOrbit': radial['orbit'],
                'minimumRadialQuarticEigenvalue': radial['minimumRadialQuarticEigenvalue'],
                'feasibleVertexCount': len(vertices),
                'maximumUniformPhysicalMarginVertex': margin,
            }
            if vertices:
                objective, weights, slacks, chosen = vertices[0]
                item['minimumWeightSumVertex'] = {
                    'weights': weights.tolist(),
                    'weightSum': objective,
                    'minimumSlack': float(min(slacks)),
                }
            else:
                item['farkasCertificate'] = farkas_certificate(constraints, len(factors))
            candidates.append(item)
        rows.append({'carrierIndex': carrier_index, 'preservingDimension': len(preserving), 'candidates': candidates})
    print(json.dumps({'protocol': 'spin23-two-twist-representative-kkt/1', 'rows': rows}, indent=2, default=list))
