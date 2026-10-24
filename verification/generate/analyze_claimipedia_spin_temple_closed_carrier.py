#!/usr/bin/env python3
from __future__ import annotations

import json
import sys
from collections import defaultdict
from pathlib import Path

from analyze_claimipedia_relationship_operator_algebra import (
    RationalSpan,
    identity,
    matrix_rank,
    multiply,
    subtract,
    vectorize,
)

ROOT = Path(__file__).resolve().parents[2]
SOURCE = ROOT / "corpus/programmes/frontier/wave-7/claimipedia_relationship_operator_source_v1.json"


def main() -> None:
    source = json.loads(SOURCE.read_text(encoding="utf-8"))
    edges = source["edges"]
    relation_types = sorted({edge[2] for edge in edges})
    full_graph = "--full" in sys.argv[1:]
    if full_graph:
        visible = {value for edge in edges for value in edge[:2]}
    else:
        visible = {
            "claim.grandThesis.spin-2-3",
            "claim.grandThesis.temple-sourcery",
        }
        changed = True
        while changed:
            changed = False
            for source_node, target_node, _ in edges:
                if target_node in visible and source_node not in visible:
                    visible.add(source_node)
                    changed = True

    nodes = sorted(visible)
    index = {node: i for i, node in enumerate(nodes)}
    size = len(nodes)
    retained_edges = [edge for edge in edges if edge[0] in visible and edge[1] in visible]
    hidden_to_visible = [edge for edge in edges if edge[0] not in visible and edge[1] in visible]
    assert not hidden_to_visible

    generators = {}
    for relation_type in relation_types:
        matrix = defaultdict(int)
        for source_node, target_node, edge_type in retained_edges:
            if edge_type == relation_type:
                matrix[(index[target_node], index[source_node])] += 1
        generators[relation_type] = dict(matrix)

    span = RationalSpan()
    basis = []
    labels = []

    def append(matrix, label):
        if span.add(vectorize(matrix, size)):
            basis.append(matrix)
            labels.append(label)
            return True
        return False

    append(identity(size), "I")
    cursor = 0
    while cursor < len(basis):
        word = basis[cursor]
        word_label = labels[cursor]
        cursor += 1
        for relation_type, generator in generators.items():
            append(multiply(generator, word), f"{relation_type}*({word_label})")

    commutators = RationalSpan()
    for left in basis:
        for right in basis:
            commutators.add(vectorize(subtract(multiply(left, right), multiply(right, left)), size))

    center_map = RationalSpan()
    for item in basis:
        combined = {}
        for generator_index, generator in enumerate(generators.values()):
            commutator = subtract(multiply(item, generator), multiply(generator, item))
            combined.update(vectorize(commutator, size, generator_index * size * size))
        center_map.add(combined)

    # Strongly connected components by exact finite reachability.
    adjacency = {node: set() for node in nodes}
    for source_node, target_node, _ in retained_edges:
        adjacency[source_node].add(target_node)
    reach = {node: {node} | set(adjacency[node]) for node in nodes}
    changed = True
    while changed:
        changed = False
        for node in nodes:
            expanded = set().union(*(reach[target] for target in list(reach[node])))
            if not expanded <= reach[node]:
                reach[node] |= expanded
                changed = True
    remaining = set(nodes)
    components = []
    while remaining:
        node = min(remaining)
        component = sorted(other for other in remaining if other in reach[node] and node in reach[other])
        components.append(component)
        remaining -= set(component)

    # Project every algebra basis element to its SCC diagonal blocks.
    diagonal_span = RationalSpan()
    block_offsets = []
    offset = 0
    for component in components:
        block_offsets.append(offset)
        offset += len(component) ** 2
    for item in basis:
        projected = {}
        for component_index, component in enumerate(components):
            for local_row, row_node in enumerate(component):
                for local_column, column_node in enumerate(component):
                    value = item.get((index[row_node], index[column_node]), 0)
                    if value:
                        projected[block_offsets[component_index] + local_row * len(component) + local_column] = value
        diagonal_span.add(projected)

    reverse_pairs = []
    for source_node, target_node, relation_type in retained_edges:
        for reverse_source, reverse_target, reverse_type in retained_edges:
            if source_node == reverse_target and target_node == reverse_source and relation_type != reverse_type:
                record = tuple(sorted(((source_node, target_node, relation_type), (reverse_source, reverse_target, reverse_type))))
                if record not in reverse_pairs:
                    reverse_pairs.append(record)

    result = {
        "schema": "claimipedia-full-scc-algebra-analysis/1" if full_graph else "claimipedia-spin-temple-closed-carrier-analysis/1",
        "sourceHash": source["sourceHash"],
        "nodeCount": size,
        "edgeCount": len(retained_edges),
        "kernelInvariant": not hidden_to_visible,
        "generatedUnitalAlgebraDimension": len(basis),
        "centerDimension": len(basis) - center_map.rank,
        "commutatorSubspaceDimension": commutators.rank,
        "stronglyConnectedComponents": components,
        "sccDiagonalImageDimension": diagonal_span.rank,
        "nilpotentOffDiagonalKernelDimension": len(basis) - diagonal_span.rank,
        "reverseTypedPairs": reverse_pairs,
        "generatorRanks": {name: matrix_rank(matrix, size) for name, matrix in generators.items()},
        "basisWordWitnesses": labels,
        "boundary": "The SCC-diagonal projection has nilpotent kernel. Identifying its image with Q plus M2(Q) additionally uses the computed singleton SCCs, unique two-node Spin--Temple SCC and full matrix-unit corner."
    }
    print(json.dumps(result, indent=2))


if __name__ == "__main__":
    main()
