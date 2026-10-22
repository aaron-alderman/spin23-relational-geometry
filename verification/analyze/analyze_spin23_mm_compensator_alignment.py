"""MacDowell-Mansouri compensator toy and the alignment condition for two vector-5 copies."""

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


labels = list(combinations(range(5), 2))
generators = [generator(a, b) for a, b in labels]


def stabilizer(vectors, tolerance=1e-9):
    action = np.concatenate([np.stack([item @ vector for item in generators], axis=1) for vector in vectors], axis=0)
    _, singular, vh = np.linalg.svd(action, full_matrices=True)
    rank = int(np.sum(singular > tolerance * max(1.0, float(singular[0]))))
    coefficient_basis = vh[rank:, :]
    matrices = [sum(coeff[i] * generators[i] for i in range(10)) for coeff in coefficient_basis]
    return rank, singular, matrices


def algebra_coordinates(matrix):
    columns = np.stack([item.ravel() for item in generators], axis=1)
    result, _, _, _ = np.linalg.lstsq(columns, matrix.ravel(), rcond=None)
    return result


def killing_signature(subalgebra):
    columns = np.stack([item.ravel() for item in subalgebra], axis=1)
    adjoint = []
    for left in subalgebra:
        representation = []
        for right in subalgebra:
            coefficients, _, _, _ = np.linalg.lstsq(columns, (left @ right - right @ left).ravel(), rcond=None)
            representation.append(coefficients)
        adjoint.append(np.stack(representation, axis=1))
    killing = np.array([[np.trace(left @ right) for right in adjoint] for left in adjoint])
    values = np.linalg.eigvalsh((killing + killing.T) / 2)
    return values, {'negative': int(np.sum(values < -1e-8)), 'zero': int(np.sum(abs(values) <= 1e-8)), 'positive': int(np.sum(values > 1e-8))}


v = np.array([0.0, 0.0, 0.0, 0.0, 1.0])
w_parallel = 2.0 * v
w_independent = np.array([0.0, 0.0, 0.0, 1.0, 0.0])
one_rank, one_singular, one_stabilizer = stabilizer([v])
parallel_rank, parallel_singular, _ = stabilizer([v, w_parallel])
independent_rank, independent_singular, independent_stabilizer = stabilizer([v, w_independent])
one_killing, one_signature = killing_signature(one_stabilizer)
independent_killing, independent_signature = killing_signature(independent_stabilizer)

rng = np.random.default_rng(230653)
generic_dimensions = []
for _ in range(64):
    first = rng.normal(size=5)
    second = rng.normal(size=5)
    rank, _, _ = stabilizer([first, second])
    generic_dimensions.append(10 - rank)

print(json.dumps({
    'protocol': 'spin23-mm-compensator-alignment/1',
    'singleCompensator': {
        'vectorNorm': float(v.T @ eta @ v),
        'orbitRank': one_rank,
        'stabilizerDimension': len(one_stabilizer),
        'stabilizerKillingEigenvalues': one_killing.tolist(),
        'stabilizerKillingSignature': one_signature,
        'identification': 'so(1,3)',
    },
    'twoVectorCopies': {
        'parallelPairOrbitRank': parallel_rank,
        'parallelPairStabilizerDimension': 10 - parallel_rank,
        'independentPairOrbitRank': independent_rank,
        'independentPairStabilizerDimension': len(independent_stabilizer),
        'independentPairStabilizerKillingEigenvalues': independent_killing.tolist(),
        'independentPairStabilizerKillingSignature': independent_signature,
        'genericSampleCount': len(generic_dimensions),
        'genericStabilizerDimensions': sorted(set(generic_dimensions)),
        'alignmentCondition': 'The two vector-5 expectation values must be rank one in multiplicity space (parallel in the SO(2,3) vector) to retain a six-dimensional Lorentz stabilizer.',
    },
    'macDowellMansouri': {
        'action': 'S proportional to integral epsilon_{ABCDE} V^E F^{AB} wedge F^{CD}',
        'gaugeFixedCompensator': 'V^A = ell delta^A_4',
        'curvatureSplit': 'F^{ab}=R^{ab}+ell^{-2} e^a wedge e^b; F^{a4}=ell^{-1} T^a',
        'expansion': [
            {'term': 'epsilon R wedge R', 'role': 'Euler/topological'},
            {'term': '2 ell^{-2} epsilon R wedge e wedge e', 'role': 'Einstein-Hilbert'},
            {'term': 'ell^{-4} epsilon e wedge e wedge e wedge e', 'role': 'cosmological'}
        ],
        'requiredIndependentField': 'An adjoint-valued one-form connection A; the compensator alone only selects the Lorentz subgroup.'
    },
}, indent=2))
