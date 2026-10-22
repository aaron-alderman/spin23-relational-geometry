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
u = load('.scratch_spin23_u14_isotropic_kkt.py', 'u')
f = load('.scratch_spin23_u14_active_moduli_finite.py', 'f')

BASE_WEIGHTS = f.BASE_WEIGHTS


def polar_unitary(matrix):
    left, _, right = np.linalg.svd(matrix, full_matrices=False)
    return left @ right


def analyze(carrier, iterations=400):
    stationary, closure, preserving, labels, canonical, linear, quartic, _ = u.preserving_basis(carrier)
    casimirs = [x.q.factor_casimir(linear, canonical, [generator]) for generator in preserving]
    combined_casimir = sum(BASE_WEIGHTS[i] * casimirs[i] for i in range(4))
    desired = {tuple(label) for label in stationary['active']}
    active = [i for i, label in enumerate(labels) if tuple(label) in desired]
    amplitudes = np.linalg.solve(
        2 * quartic[np.ix_(active, active)],
        linear[active] * (1 - combined_casimir[active]),
    )
    builder = x.complex_field_builder(carrier)
    canonical_seeds = {tuple(label): x.h.canonical(label).astype(complex) for label in labels}
    rng = np.random.default_rng(230583)
    transformed_seeds = dict(canonical_seeds)
    for index in active:
        label = tuple(labels[index])
        transformed_seeds[label] = f.random_fixed_singular_seed(label, rng)

    def vacuum(seeds):
        return sum(
            np.sqrt(amplitudes[local]) * builder(labels[index], seeds[tuple(labels[index])])
            for local, index in enumerate(active)
        )

    baseline = vacuum(canonical_seeds)
    transformed = vacuum(transformed_seeds)
    op = carrier['op']
    dimensions = [c.DIMS[a] * c.DIMS[b] for a, b in op]
    offsets = np.cumsum([0] + dimensions[:-1]).tolist()
    active_edges = [edge for edge in carrier['graph']['edges'] if tuple(edge['orbit']) in desired]

    # Every Hermitian off-diagonal carrier edge supplies two independent oriented
    # blocks: P_u -> J_v and J_u -> P_v.  Their sector graph is the exact arena
    # for carrier-block-local conjugacy.
    edge_blocks = []
    for edge in active_edges:
        uu, vv = edge['u'], edge['v']
        pu, pv = offsets[uu], offsets[vv]
        du, dv = dimensions[uu], dimensions[vv]
        edge_blocks.append({
            'source': ('P', uu), 'target': ('J', vv),
            'baseline': baseline[92 + pv:92 + pv + dv, pu:pu + du],
            'transformed': transformed[92 + pv:92 + pv + dv, pu:pu + du],
            'orbit': tuple(edge['orbit']),
        })
        edge_blocks.append({
            'source': ('J', uu), 'target': ('P', vv),
            'baseline': baseline[pv:pv + dv, 92 + pu:92 + pu + du],
            'transformed': transformed[pv:pv + dv, 92 + pu:92 + pu + du],
            'orbit': tuple(edge['orbit']),
        })

    nodes = {(kind, index): dimensions[index] for kind in ('P', 'J') for index in range(len(op))}
    units = {node: np.eye(dim, dtype=complex) for node, dim in nodes.items()}
    history = []
    for iteration in range(iterations):
        for node, dim in nodes.items():
            accumulator = np.zeros((dim, dim), dtype=complex)
            incident = 0
            for edge in edge_blocks:
                if edge['target'] == node:
                    accumulator += edge['transformed'] @ units[edge['source']] @ edge['baseline'].conj().T
                    incident += 1
                elif edge['source'] == node:
                    accumulator += edge['transformed'].conj().T @ units[edge['target']] @ edge['baseline']
                    incident += 1
            if incident:
                units[node] = polar_unitary(accumulator)
        residuals = [
            np.linalg.norm(
                edge['transformed']
                - units[edge['target']] @ edge['baseline'] @ units[edge['source']].conj().T
            )
            for edge in edge_blocks
        ]
        history.append(float(max(residuals)))

    conjugator = np.zeros((184, 184), dtype=complex)
    for kind, base in (('P', 0), ('J', 92)):
        for index, offset in enumerate(offsets):
            dim = dimensions[index]
            conjugator[base + offset:base + offset + dim, base + offset:base + offset + dim] = units[(kind, index)]
    conjugated = conjugator @ baseline @ conjugator.conj().T
    active_vertices = sorted({edge['u'] for edge in active_edges} | {edge['v'] for edge in active_edges})
    adjacency = {v: set() for v in active_vertices}
    for edge in active_edges:
        adjacency[edge['u']].add(edge['v'])
        adjacency[edge['v']].add(edge['u'])
    components = []
    unseen = set(active_vertices)
    while unseen:
        root = min(unseen)
        stack = [root]
        component = set()
        while stack:
            vertex = stack.pop()
            if vertex in component:
                continue
            component.add(vertex)
            stack.extend(adjacency[vertex] - component)
        unseen -= component
        edge_count = sum(len(adjacency[v]) for v in component) // 2
        components.append({'vertices': sorted(component), 'edges': edge_count, 'isTree': edge_count == len(component) - 1})

    return {
        'activeOrbits': [tuple(labels[index]) for index in active],
        'activeCarrierEdges': len(active_edges),
        'sectorIntertwiningEdges': len(edge_blocks),
        'carrierComponents': components,
        'allComponentsTrees': all(row['isTree'] for row in components),
        'iterations': iterations,
        'initialMaximumBlockResidual': history[0],
        'finalMaximumBlockResidual': history[-1],
        'fullConjugationResidual': float(np.linalg.norm(transformed - conjugated)),
        'fullConjugationRelativeResidual': float(np.linalg.norm(transformed - conjugated) / np.linalg.norm(transformed)),
        'maximumUnitarityResidual': float(max(np.linalg.norm(value.conj().T @ value - np.eye(value.shape[0])) for value in units.values())),
        'historyTail': history[-10:],
    }


if __name__ == '__main__':
    carrier = next(
        item for item in c.strong_carriers()
        if (s.tw(item['op'], 5), s.tw(item['op'], 10)) == (8, 4)
        and item['lpair'] == ((8, 10), (10, 1))
        and item['rpair'] == ((10, 2), (7, 5))
    )
    print(json.dumps({'protocol': 'spin23-u14-block-local-intertwiner/1', 'row': analyze(carrier)}, indent=2, default=list))
