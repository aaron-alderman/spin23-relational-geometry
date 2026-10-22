"""Count physical modes of one and two constrained SO(2,3) vector compensators."""

import json
from itertools import combinations

import numpy as np


eta = np.diag([-1.0, 1.0, 1.0, 1.0, -1.0])


def generator(a, b):
    matrix = np.zeros((5, 5))
    for c in range(5):
        for d in range(5):
            matrix[c, d] = (1.0 if c == a else 0.0) * eta[b, d] - (1.0 if c == b else 0.0) * eta[a, d]
    return matrix


generators = [generator(a, b) for a, b in combinations(range(5), 2)]


def tangent_basis(vector):
    constraint = (vector @ eta)[None, :]
    _, _, vh = np.linalg.svd(constraint, full_matrices=True)
    return vh[1:, :].T


def gauge_rank(vectors, tolerance=1e-9):
    variations = np.stack([np.concatenate([generator @ vector for vector in vectors]) for generator in generators], axis=1)
    singular = np.linalg.svd(variations, compute_uv=False)
    rank = int(np.sum(singular > tolerance * max(1.0, float(singular[0]))))
    return rank, singular


v = np.array([0.0, 0.0, 0.0, 0.0, 1.0])
w_generic = np.array([1.0, 0.0, 0.0, 0.0, 0.0])
single_tangent = tangent_basis(v)
single_rank, single_singular = gauge_rank([v])

# Verify the broken-generator variations span the complete constraint tangent.
single_variations = np.stack([generator @ v for generator in generators], axis=1)
variation_u, variation_s, _ = np.linalg.svd(single_variations, full_matrices=False)
variation_basis = variation_u[:, :single_rank]
principal = np.linalg.svd(single_tangent.T @ variation_basis, compute_uv=False)

aligned_rank, aligned_singular = gauge_rank([v, v])
generic_rank, generic_singular = gauge_rank([v, w_generic])
pair_constraint_dimension = 2 * 4

print(json.dumps({
    'protocol': 'spin23-constrained-compensator-quotient/1',
    'singleVector': {
        'constraint': 'V^A V_A = -ell^2',
        'constraintSurfaceTangentDimension': single_tangent.shape[1],
        'gaugeOrbitRank': single_rank,
        'stabilizerDimension': 10 - single_rank,
        'tangentGaugePrincipalCosines': principal.tolist(),
        'physicalLocalCompensatorModes': int(single_tangent.shape[1] - single_rank),
        'interpretation': 'All four compensator tangents are broken SO(2,3)/SO(1,3) gauge directions and can be removed by unitary gauge.'
    },
    'twoVectorCopies': {
        'constraintSurfaceDimension': pair_constraint_dimension,
        'alignedGaugeOrbitRank': aligned_rank,
        'alignedStabilizerDimension': 10 - aligned_rank,
        'alignedQuotientDimension': pair_constraint_dimension - aligned_rank,
        'genericGaugeOrbitRank': generic_rank,
        'genericStabilizerDimension': 10 - generic_rank,
        'genericQuotientDimension': pair_constraint_dimension - generic_rank,
        'relativeInvariant': 'V1.V2 survives the common gauge action; two constrained vectors are not equivalent to one compensator.',
    },
    'minimalPrescription': 'Use one normalized vector combination as the gauge compensator and impose a multiplicity-space constraint eliminating or aligning the orthogonal vector copy. The norm constraint replaces the unstable noncompact radial potential, but the multiplicity constraint remains new input.',
}, indent=2))
