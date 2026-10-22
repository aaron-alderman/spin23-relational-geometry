import importlib.util
import json
import sys


def load(path, name):
    spec = importlib.util.spec_from_file_location(name, path)
    module = importlib.util.module_from_spec(spec)
    sys.modules[name] = module
    spec.loader.exec_module(module)
    return module


c = load('.scratch_spin23_connectors.py', 'c')
s = load('.scratch_spin23_all_robust_supports_fast.py', 's')


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
    components = len({find(vertex) for vertex in vertices})
    return len(edges) - len(vertices) + components if vertices else 0


if __name__ == '__main__':
    carrier = next(
        item for item in c.strong_carriers()
        if (s.tw(item['op'], 5), s.tw(item['op'], 10)) == (8, 4)
        and item['lpair'] == ((8, 10), (10, 1))
        and item['rpair'] == ((10, 2), (7, 5))
    )
    active = {(2, 6), (5, 10), (6, 7), (7, 9)}
    baseline = [edge for edge in carrier['graph']['edges'] if tuple(edge['orbit']) in active]
    labels = sorted({tuple(edge['orbit']) for edge in carrier['graph']['edges']})
    rows = []
    for label in labels:
        if label in active:
            continue
        added = [edge for edge in carrier['graph']['edges'] if tuple(edge['orbit']) == label]
        combined = baseline + added
        orientations = []
        for edge in added:
            p, endpoint = carrier['op'][edge['u']], carrier['op'][edge['v']]
            horizontal = p[1] == endpoint[0] and p[0] != endpoint[1]
            a, b = (p[0], endpoint[1]) if horizontal else (p[1], endpoint[0])
            orientations.append('direct' if (a, b) == label else 'transposed')
        rows.append({
            'orbit': label,
            'addedEdges': len(added),
            'cycleRankBefore': cycle_rank(baseline),
            'cycleRankAfter': cycle_rank(combined),
            'edges': [(edge['u'], edge['v']) for edge in added],
            'orientations': orientations,
            'orientationFrustrated': len(set(orientations)) > 1,
        })
    rows.sort(key=lambda row: (-row['cycleRankAfter'], row['addedEdges'], row['orbit']))
    print(json.dumps({'protocol': 'spin23-u14-cycle-extension-census/1', 'rows': rows}, indent=2, default=list))
