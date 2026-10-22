import importlib.util
import json
import sys


def load(path, name):
    spec = importlib.util.spec_from_file_location(name, path)
    module = importlib.util.module_from_spec(spec)
    sys.modules[name] = module
    spec.loader.exec_module(module)
    return module


m = load('.scratch_spin23_frustrated_carrier_quartic_census.py', 'm')
c, s = m.c, m.s


def cycle_rank(edges):
    vertices = {vertex for edge in edges for vertex in (edge['u'], edge['v'])}
    parent = {vertex: vertex for vertex in vertices}

    def find(vertex):
        while parent[vertex] != vertex:
            parent[vertex] = parent[parent[vertex]]
            vertex = parent[vertex]
        return vertex

    for edge in edges:
        left, right = find(edge['u']), find(edge['v'])
        if left != right:
            parent[left] = right
    return len(edges) - len(vertices) + len({find(vertex) for vertex in vertices}) if vertices else 0


if __name__ == '__main__':
    carriers = [item for item in c.strong_carriers() if (s.tw(item['op'], 5), s.tw(item['op'], 10)) == (8, 4)]
    rows = []
    all_frustrated = 0
    for index, carrier in enumerate(carriers):
        for row in m.analyze(carrier):
            all_frustrated += 1
            labels = {tuple(label) for label in row['activeOrbits']}
            edges = [edge for edge in carrier['graph']['edges'] if tuple(edge['orbit']) in labels]
            rank = cycle_rank(edges)
            if rank <= 0:
                continue
            row.update({
                'carrierIndex': index,
                'lpair': carrier['lpair'],
                'rpair': carrier['rpair'],
                'activeCycleRank': rank,
                'activeEdges': len(edges),
            })
            rows.append(row)
    rows.sort(key=lambda row: (-row['minimumRadialQuarticEigenvalue'], -row['activeCycleRank'], row['carrierIndex'], row['orbit']))
    positive = [row for row in rows if row['negativeInertia'] == 0 and row['zeroInertia'] == 0]
    nonnegative = [row for row in rows if row['negativeInertia'] == 0]
    summary = {
        'carriers': len(carriers),
        'allFrustratedExtensions': all_frustrated,
        'frustratedCyclicExtensions': len(rows),
        'positiveDefiniteFrustratedCyclicExtensions': len(positive),
        'nonnegativeFrustratedCyclicExtensions': len(nonnegative),
        'bestMinimumEigenvalue': positive[0]['minimumRadialQuarticEigenvalue'] if positive else None,
    }
    print(json.dumps({'protocol': 'spin23-frustrated-cyclic-positive-census/1', 'summary': summary, 'bestRows': positive[:24]}, indent=2, default=list))
