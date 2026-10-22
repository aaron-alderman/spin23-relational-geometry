import importlib.util
import json
import sys


def load(path, name):
    spec = importlib.util.spec_from_file_location(name, path)
    module = importlib.util.module_from_spec(spec)
    sys.modules[name] = module
    spec.loader.exec_module(module)
    return module


p = load('.scratch_spin23_frustrated_cyclic_positive_census.py', 'p')
g = load('.scratch_spin23_candidate48_u14_kkt.py', 'g')
c, s, x = g.c, g.s, g.x


if __name__ == '__main__':
    carriers = [item for item in c.strong_carriers() if (s.tw(item['op'], 5), s.tw(item['op'], 10)) == (8, 4)]
    rows = []
    for carrier_index in [6, 9, 11, 37, 40, 42]:
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
            candidates.append(item)
        rows.append({
            'carrierIndex': carrier_index,
            'preservingDimension': len(preserving),
            'positiveRadialCyclicCandidates': candidates,
        })
    print(json.dumps({'protocol': 'spin23-three-twist-kkt-census/1', 'rows': rows}, indent=2, default=list))
