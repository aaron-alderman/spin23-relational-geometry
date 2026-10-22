from collections import defaultdict
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
m, c, s = p.m, p.c, p.s


def occurrence_components(carrier, edges):
    vertices = {vertex for edge in edges for vertex in (edge['u'], edge['v'])}
    adjacency = {vertex: set() for vertex in vertices}
    for edge in edges:
        adjacency[edge['u']].add(edge['v'])
        adjacency[edge['v']].add(edge['u'])
    components = []
    while vertices:
        stack = [vertices.pop()]
        component = set(stack)
        while stack:
            vertex = stack.pop()
            for neighbor in adjacency[vertex]:
                if neighbor in vertices:
                    vertices.remove(neighbor)
                    component.add(neighbor)
                    stack.append(neighbor)
        components.append(component)
    return components


def orientation(carrier, edge):
    label = tuple(edge['orbit'])
    p_vertex, q_vertex = carrier['op'][edge['u']], carrier['op'][edge['v']]
    horizontal = p_vertex[1] == q_vertex[0] and p_vertex[0] != q_vertex[1]
    a, b = (p_vertex[0], q_vertex[1]) if horizontal else (p_vertex[1], q_vertex[0])
    return 'D' if (a, b) == label else 'T'


if __name__ == '__main__':
    carriers = [item for item in c.strong_carriers() if (s.tw(item['op'], 5), s.tw(item['op'], 10)) == (8, 4)]
    rows = []
    for index, carrier in enumerate(carriers):
        by_label = defaultdict(list)
        for edge in carrier['graph']['edges']:
            by_label[tuple(edge['orbit'])].append(edge)
        disconnected = []
        twisted = []
        for label, edges in sorted(by_label.items()):
            components = occurrence_components(carrier, edges)
            if len(components) <= 1:
                continue
            profiles = []
            for component in components:
                profiles.append(''.join(sorted(orientation(carrier, edge) for edge in edges if edge['u'] in component)))
            item = {'label': label, 'components': len(components), 'profiles': profiles}
            disconnected.append(item)
            if len({orientation(carrier, edge) for edge in edges}) > 1:
                twisted.append(item)
        positive_cyclic = []
        for candidate in m.analyze(carrier):
            labels = {tuple(label) for label in candidate['activeOrbits']}
            active_edges = [edge for edge in carrier['graph']['edges'] if tuple(edge['orbit']) in labels]
            if p.cycle_rank(active_edges) > 0 and candidate['negativeInertia'] == 0 and candidate['zeroInertia'] == 0:
                positive_cyclic.append(tuple(candidate['orbit']))
        rows.append({
            'carrierIndex': index,
            'twistedDisconnectedCount': len(twisted),
            'twistedDisconnected': twisted,
            'disconnectedCount': len(disconnected),
            'positiveCyclicExtensionCount': len(positive_cyclic),
            'positiveCyclicAddedOrbits': positive_cyclic,
        })
    contingency = defaultdict(lambda: {'carriers': 0, 'withPositiveCyclic': 0, 'positiveCyclicExtensions': 0})
    for row in rows:
        key = str(row['twistedDisconnectedCount'])
        contingency[key]['carriers'] += 1
        contingency[key]['withPositiveCyclic'] += int(row['positiveCyclicExtensionCount'] > 0)
        contingency[key]['positiveCyclicExtensions'] += row['positiveCyclicExtensionCount']
    print(json.dumps({
        'protocol': 'spin23-twisted-tying-census/1',
        'summary': {'carriers': len(rows), 'contingencyByTwistedDisconnectedCount': contingency},
        'rowsWithPositiveCyclic': [row for row in rows if row['positiveCyclicExtensionCount'] > 0],
    }, indent=2, default=list))
