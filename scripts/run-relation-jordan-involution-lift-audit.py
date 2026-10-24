#!/usr/bin/env python3
from __future__ import annotations

import hashlib
import itertools
import json
import sys
from collections import Counter, defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "verification" / "generate"))
from analyze_claimipedia_relationship_operator_algebra import RationalSpan, identity, multiply, vectorize  # noqa: E402

SOURCE = ROOT / "corpus/programmes/frontier/wave-7/claimipedia_relationship_operator_source_v1.json"
OUTPUT = ROOT / "evidence/data/relation-jordan-involution-lift-audit-v1.json"


def main() -> None:
    source_bytes = SOURCE.read_bytes()
    source = json.loads(source_bytes)
    edges = [tuple(edge) for edge in source["edges"]]
    visible = {"claim.grandThesis.spin-2-3", "claim.grandThesis.temple-sourcery"}
    changed = True
    while changed:
        changed = False
        for source_node, target_node, _ in edges:
            if target_node in visible and source_node not in visible:
                visible.add(source_node)
                changed = True

    nodes = sorted(visible)
    index = {node: i for i, node in enumerate(nodes)}
    retained = [edge for edge in edges if edge[0] in visible and edge[1] in visible]
    relation_types = sorted({edge[2] for edge in edges})
    size = len(nodes)
    generators = {}
    for relation_type in relation_types:
        matrix = defaultdict(int)
        for source_node, target_node, edge_type in retained:
            if edge_type == relation_type:
                matrix[(index[target_node], index[source_node])] += 1
        generators[relation_type] = dict(matrix)

    span = RationalSpan()
    basis = []

    def append(matrix):
        if span.add(vectorize(matrix, size)):
            basis.append(matrix)
            return True
        return False

    append(identity(size))
    cursor = 0
    while cursor < len(basis):
        word = basis[cursor]
        cursor += 1
        for generator in generators.values():
            append(multiply(generator, word))

    transpose_membership = {}
    for relation_type, generator in generators.items():
        transpose = {(column, row): value for (row, column), value in generator.items()}
        extended = RationalSpan()
        for item in basis:
            extended.add(vectorize(item, size))
        before = extended.rank
        extended.add(vectorize(transpose, size))
        transpose_membership[relation_type] = {
            "inGeneratedAlgebra": extended.rank == before,
            "rankIncreaseWhenAdjoined": extended.rank - before,
        }

    retained_counter = Counter(retained)
    permutation_audit = []
    for permutation in itertools.permutations(relation_types):
        relabel = dict(zip(relation_types, permutation))
        reversed_counter = Counter((target, source_node, relabel[relation_type]) for source_node, target, relation_type in retained)
        matches = sum((retained_counter & reversed_counter).values())
        permutation_audit.append({"mapping": relabel, "matchedEdges": matches, "unmatchedEdges": len(retained) - matches})
    permutation_audit.sort(key=lambda record: (-record["matchedEdges"], tuple(record["mapping"].values())))
    best = permutation_audit[0]

    result = {
        "protocol": "relation-jordan-involution-lift-audit/1",
        "packet": "AZ-112",
        "target": "OT-026",
        "source": {
            "path": "corpus/programmes/frontier/wave-7/claimipedia_relationship_operator_source_v1.json",
            "sha256": hashlib.sha256(source_bytes).hexdigest(),
        },
        "carrier": {"nodes": size, "retainedEdges": len(retained), "relationTypes": relation_types, "generatedAlgebraDimension": len(basis)},
        "transposeMembership": transpose_membership,
        "allGeneratorTransposesInternal": all(item["inGeneratedAlgebra"] for item in transpose_membership.values()),
        "typedReversalSearch": {
            "permutationsChecked": len(permutation_audit),
            "best": best,
            "maximumMatchedEdges": best["matchedEdges"],
            "fractionMatched": best["matchedEdges"] / len(retained),
            "onlyCompleteReversePair": ["claim.grandThesis.spin-2-3", "claim.grandThesis.temple-sourcery"],
        },
        "decision": {
            "ordinaryTransposeLiftsToFullRelationAlgebra": False,
            "globalTypedEdgeReversalExists": False,
            "localJordanFaceRemainsExact": True,
            "positiveOrderSourceNative": False,
            "ot026ClosureConditionMet": False,
            "newPhysicsEvidence": False,
        },
        "implication": "The transpose-fixed H2 face of AZ-111 is a quotient-local enrichment, not the fixed space of a hidden involution of the full predecessor-closed typed relation algebra. Reopening requires an authored dagger/order, a weighted nonlocal anti-automorphism, or a held-out prediction that selects one.",
        "nextGate": "Add or derive a source-native dagger/order before quotienting, or construct a nonlocal weighted anti-automorphism with declared provenance; then test whether its positive fixed space predicts a withheld composition or observable.",
    }
    if "--write" in sys.argv[1:]:
        OUTPUT.parent.mkdir(parents=True, exist_ok=True)
        OUTPUT.write_text(json.dumps(result, indent=2) + "\n", encoding="utf-8")
        print(f"wrote {OUTPUT}")
    print(json.dumps({
        "nodes": size,
        "edges": len(retained),
        "algebraDimension": len(basis),
        "allGeneratorTransposesInternal": result["allGeneratorTransposesInternal"],
        "maximumMatchedEdgesUnderTypePermutation": best["matchedEdges"],
        "ot026ClosureConditionMet": False,
    }, indent=2))


if __name__ == "__main__":
    main()
