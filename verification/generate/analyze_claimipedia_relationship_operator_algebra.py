#!/usr/bin/env python3
from __future__ import annotations

import json
from collections import Counter, defaultdict
from fractions import Fraction
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
SOURCE = ROOT / "corpus/programmes/frontier/wave-7/claimipedia_relationship_operator_source_v1.json"


class RationalSpan:
    """Incremental exact row reduction for sparse column vectors."""

    def __init__(self) -> None:
        self.pivots: dict[int, dict[int, Fraction]] = {}

    def add(self, candidate: dict[int, int | Fraction]) -> bool:
        vector = {key: Fraction(value) for key, value in candidate.items() if value}
        while vector:
            pivot = min(vector)
            if pivot not in self.pivots:
                scale = vector[pivot]
                self.pivots[pivot] = {key: value / scale for key, value in vector.items()}
                return True
            scale = vector[pivot]
            for key, value in self.pivots[pivot].items():
                replacement = vector.get(key, Fraction(0)) - scale * value
                if replacement:
                    vector[key] = replacement
                else:
                    vector.pop(key, None)
        return False

    @property
    def rank(self) -> int:
        return len(self.pivots)


Matrix = dict[tuple[int, int], int]


def identity(size: int) -> Matrix:
    return {(i, i): 1 for i in range(size)}


def multiply(left: Matrix, right: Matrix) -> Matrix:
    right_rows: dict[int, list[tuple[int, int]]] = defaultdict(list)
    for (row, column), value in right.items():
        right_rows[row].append((column, value))
    out: dict[tuple[int, int], int] = defaultdict(int)
    for (row, middle), left_value in left.items():
        for column, right_value in right_rows.get(middle, []):
            out[(row, column)] += left_value * right_value
    return {key: value for key, value in out.items() if value}


def subtract(left: Matrix, right: Matrix) -> Matrix:
    out = defaultdict(int, left)
    for key, value in right.items():
        out[key] -= value
    return {key: value for key, value in out.items() if value}


def vectorize(matrix: Matrix, size: int, offset: int = 0) -> dict[int, int]:
    return {offset + row * size + column: value for (row, column), value in matrix.items()}


def matrix_rank(matrix: Matrix, size: int) -> int:
    span = RationalSpan()
    columns: dict[int, dict[int, int]] = defaultdict(dict)
    for (row, column), value in matrix.items():
        columns[column][row] = value
    for column in range(size):
        span.add(columns.get(column, {}))
    return span.rank


def main() -> None:
    source = json.loads(SOURCE.read_text(encoding="utf-8"))
    edges = source["edges"]
    assert len(edges) == source["relationshipCount"]
    nodes = sorted({value for edge in edges for value in edge[:2]})
    relation_types = sorted({edge[2] for edge in edges})
    index = {node: i for i, node in enumerate(nodes)}
    size = len(nodes)

    generators: dict[str, Matrix] = {name: {} for name in relation_types}
    for relation_type in relation_types:
        matrix: dict[tuple[int, int], int] = defaultdict(int)
        for source_node, target_node, edge_type in edges:
            if edge_type == relation_type:
                matrix[(index[target_node], index[source_node])] += 1
        generators[relation_type] = dict(matrix)

    algebra_span = RationalSpan()
    basis: list[Matrix] = []
    labels: list[str] = []

    def append_basis(matrix: Matrix, label: str) -> bool:
        if algebra_span.add(vectorize(matrix, size)):
            basis.append(matrix)
            labels.append(label)
            return True
        return False

    append_basis(identity(size), "I")
    cursor = 0
    while cursor < len(basis):
        word = basis[cursor]
        word_label = labels[cursor]
        cursor += 1
        for relation_type, generator in generators.items():
            append_basis(multiply(generator, word), f"{relation_type}*({word_label})")

    generator_commutators = {}
    for i, left_name in enumerate(relation_types):
        for right_name in relation_types[i + 1:]:
            commutator = subtract(
                multiply(generators[left_name], generators[right_name]),
                multiply(generators[right_name], generators[left_name]),
            )
            generator_commutators[f"[{left_name},{right_name}]"] = {
                "rank": matrix_rank(commutator, size),
                "nonzeroEntries": len(commutator),
                "entries": [
                    {
                        "target": nodes[row],
                        "source": nodes[column],
                        "coefficient": value,
                    }
                    for (row, column), value in sorted(commutator.items())
                ],
            }

    commutator_span = RationalSpan()
    for left in basis:
        for right in basis:
            commutator = subtract(multiply(left, right), multiply(right, left))
            commutator_span.add(vectorize(commutator, size))

    center_span = RationalSpan()
    for item in basis:
        combined = {}
        for generator_index, generator in enumerate(generators.values()):
            commutator = subtract(multiply(item, generator), multiply(generator, item))
            combined.update(vectorize(commutator, size, generator_index * size * size))
        center_span.add(combined)
    center_dimension = len(basis) - center_span.rank

    nilpotent_generators = {}
    for name, generator in generators.items():
        power = identity(size)
        nilpotency_index = None
        for exponent in range(1, size + 2):
            power = multiply(generator, power)
            if not power:
                nilpotency_index = exponent
                break
        nilpotent_generators[name] = nilpotency_index

    spin_temple = {
        "claim.grandThesis.spin-2-3",
        "claim.grandThesis.temple-sourcery",
    }
    naive_hidden_to_visible = [
        edge for edge in edges if edge[0] not in spin_temple and edge[1] in spin_temple
    ]
    predecessor_closure = set(spin_temple)
    changed = True
    while changed:
        changed = False
        for source_node, target_node, _ in edges:
            if target_node in predecessor_closure and source_node not in predecessor_closure:
                predecessor_closure.add(source_node)
                changed = True

    result = {
        "schema": "claimipedia-relationship-operator-algebra-analysis/1",
        "sourceHash": source["sourceHash"],
        "nodeCount": size,
        "relationshipCount": len(edges),
        "distinctEdgeCount": len(set(tuple(edge) for edge in edges)),
        "relationTypeCounts": dict(sorted(Counter(edge[2] for edge in edges).items())),
        "relationTypes": relation_types,
        "operatorConvention": "A_r[target,source] counts directed r-relationships; products compose rightmost first",
        "generatedUnitalAlgebraDimension": len(basis),
        "centerDimension": center_dimension,
        "commutatorSubspaceDimension": commutator_span.rank,
        "commutative": all(item["rank"] == 0 for item in generator_commutators.values()),
        "generatorRanks": {name: matrix_rank(matrix, size) for name, matrix in generators.items()},
        "generatorCommutators": generator_commutators,
        "nilpotencyIndexByGenerator": nilpotent_generators,
        "spinTempleProjection": {
            "seedNodes": sorted(spin_temple),
            "kernelInvariant": not naive_hidden_to_visible,
            "hiddenToVisibleEdges": naive_hidden_to_visible,
            "minimalPredecessorClosedNodeCount": len(predecessor_closure),
            "minimalPredecessorClosedNodes": sorted(predecessor_closure),
        },
        "basisWordWitnesses": labels,
        "boundary": "This is the exact image algebra of four aggregated relation-type adjacency operators on the captured finite claim-node module. It is not a Hecke algebra, a symmetry commutant, or a Wedderburn decomposition; duplicate relationship records contribute integer edge multiplicity."
    }
    print(json.dumps(result, indent=2))


if __name__ == "__main__":
    main()
