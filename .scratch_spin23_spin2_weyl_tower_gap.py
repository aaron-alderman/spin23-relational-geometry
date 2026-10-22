"""Count the linearized AdS spin-2 Weyl module and compare it with finite scalar descendants."""

import json
from itertools import product

import numpy as np


dimension = 4
eta = np.diag([-1.0, 1.0, 1.0, 1.0])
indices = list(product(range(dimension), repeat=4))
position = {index: i for i, index in enumerate(indices)}


def row(terms):
    result = np.zeros(len(indices))
    for coefficient, index in terms:
        result[position[index]] += coefficient
    return result


riemann_constraints = []
for a, b, c, d in indices:
    riemann_constraints.append(row([(1, (a, b, c, d)), (1, (b, a, c, d))]))
    riemann_constraints.append(row([(1, (a, b, c, d)), (1, (a, b, d, c))]))
    riemann_constraints.append(row([(1, (a, b, c, d)), (-1, (c, d, a, b))]))
    riemann_constraints.append(row([(1, (a, b, c, d)), (1, (a, c, d, b)), (1, (a, d, b, c))]))


def nullity(rows, tolerance=1e-9):
    matrix = np.stack(rows)
    singular = np.linalg.svd(matrix, compute_uv=False)
    rank = int(np.sum(singular > tolerance * singular[0]))
    return len(indices) - rank, rank


riemann_nullity, riemann_rank = nullity(riemann_constraints)
weyl_constraints = list(riemann_constraints)
for a in range(dimension):
    for c in range(dimension):
        terms = []
        for b in range(dimension):
            for d in range(dimension):
                if eta[b, d] != 0:
                    terms.append((eta[b, d], (a, b, c, d)))
        weyl_constraints.append(row(terms))
weyl_nullity, weyl_rank = nullity(weyl_constraints)

# Four-dimensional massless spin-2 unfolded Weyl zero-forms:
# C_{alpha(4+k),dot(alpha)(k)} plus its conjugate.
levels = []
cumulative = 0
for level in range(9):
    chiral_complex_dimension = (level + 5) * (level + 1)
    real_dimension = 2 * chiral_complex_dimension
    cumulative += real_dimension
    levels.append({
        'level': level,
        'spinorType': [level + 4, level],
        'chiralComplexDimension': chiral_complex_dimension,
        'realDimensionIncludingConjugate': real_dimension,
        'cumulativeRealDimension': cumulative,
    })

candidate_completed = {
    'scalarMultiplicity': 105,
    'lorentzVectorMultiplicity': 12,
    'lorentzBivectorMultiplicity': 1,
    'symmetricTracelessRank2Multiplicity': 1,
    'totalDimension': 168,
}

print(json.dumps({
    'protocol': 'spin23-spin2-weyl-tower-gap/1',
    'linearizedCurvatureCount': {
        'ambientRank4TensorDimension': len(indices),
        'riemannConstraintRank': riemann_rank,
        'riemannTensorDimension': riemann_nullity,
        'ricciFlatConstraintRankTotal': weyl_rank,
        'weylTensorDimension': weyl_nullity,
    },
    'candidateCompletedScalarModule': candidate_completed,
    'representationMismatch': {
        'candidateAdjoint10LorentzBranching': 'bivector 6 + vector 4',
        'spin2Weyl10LorentzRole': 'Ricci-free Riemann tensor; equivalently chiral rank-4 spinor 5 plus conjugate 5',
        'sameDimensionImpliesSameRepresentation': False,
        'formDegreeWarning': 'The SO(2,3) adjoint is a gauge connection only when carried by a one-form. Candidate 48 supplies adjoint-valued scalar descendants (zero-forms).',
    },
    'firstWeylTowerLevels': levels,
    'finiteTruncationWarning': 'AdS translations map a Weyl level to neighboring derivative levels. Setting a highest next level to zero imposes extra differential constraints and leaves finite-type/Killing data rather than generic waves.',
    'minimalDynamicalExtension': {
        'oneForm': 'a = 1/2 delta(omega)^{ab} J_ab + ell^{-1} h^a P_a',
        'torsionEquation': 'Dbar h^a + delta(omega)^a_b wedge ebar^b = 0',
        'curvatureEquation': 'Dbar delta(omega)^{ab} + ell^{-2}(ebar^a wedge h^b - ebar^b wedge h^a) = ebar_c wedge ebar_d C^{ab,cd}',
        'zeroFormTower': 'C^{ab,cd} and all on-shell covariant derivatives',
    },
}, indent=2))
