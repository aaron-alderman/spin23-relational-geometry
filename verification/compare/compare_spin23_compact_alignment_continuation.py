"""Compare stable SO(5) two-vector alignment with its SO(2,3) continuation."""

import json

import numpy as np


def invariants(state, metric):
    first, second = state[:5], state[5:]
    return float(first @ metric @ first), float(second @ metric @ second), float(first @ metric @ second)


def compact_potential(state, lam=1.0, kappa=1.0, scale2=1.0):
    x, y, z = invariants(state, np.eye(5))
    return lam * ((x - scale2) ** 2 + (y - scale2) ** 2) + kappa * (x * y - z * z)


def hessian(function, point, step=1e-5):
    count = len(point); result = np.zeros((count, count)); f0 = function(point)
    for i in range(count):
        ei = np.zeros(count); ei[i] = step
        result[i, i] = (function(point + ei) - 2 * f0 + function(point - ei)) / step ** 2
        for j in range(i):
            ej = np.zeros(count); ej[j] = step
            value = (function(point + ei + ej) - function(point + ei - ej) - function(point - ei + ej) + function(point - ei - ej)) / (4 * step ** 2)
            result[i, j] = result[j, i] = value
    return (result + result.T) / 2


axis = np.array([0.0, 0.0, 0.0, 0.0, 1.0])
aligned = np.concatenate([axis, axis])
compact_hessian = hessian(compact_potential, aligned)
compact_values = np.linalg.eigvalsh(compact_hessian)

rng = np.random.default_rng(230657)
values = []
gram_determinants = []
for _ in range(20000):
    state = rng.normal(size=10)
    state /= np.linalg.norm(state)
    x, y, z = invariants(state, np.eye(5))
    gram_determinants.append(x * y - z * z)
    values.append(compact_potential(state))

print(json.dumps({
    'protocol': 'spin23-compact-alignment-then-continuation/1',
    'compactSO5': {
        'potential': 'lambda[(V1^2-v^2)^2+(V2^2-v^2)^2]+kappa[V1^2 V2^2-(V1.V2)^2]',
        'alignedPotential': compact_potential(aligned),
        'alignedHessianEigenvalues': compact_values.tolist(),
        'negativeModes': int(np.sum(compact_values < -1e-6)),
        'zeroModes': int(np.sum(abs(compact_values) <= 1e-6)),
        'positiveModes': int(np.sum(compact_values > 1e-6)),
        'sampledGramDeterminantMinimum': min(gram_determinants),
        'sampledPotentialMinimumOnUnitSphere': min(values),
        'vacuumManifold': 'parallel or antiparallel unit vectors; stabilizer SO(4)',
    },
    'continuationAudit': {
        'algebraicStep': 'Continue a selected compact SO(5) aligned direction to a timelike Spin(2,3) compensator direction.',
        'retained': 'rank-one multiplicity alignment and a six-dimensional stabilizer, continued from SO(4) to SO(1,3)',
        'lost': 'the Euclidean Cauchy-Schwarz positivity that made the Gram determinant a nonnegative alignment penalty',
        'dynamicalWarning': 'The compact potential is not Spin(2,3)-invariant after continuation. Replacing its metric by the (2,3) invariant metric reproduces the v656 instabilities.',
        'researchUse': 'Compact-first alignment is a consistent vacuum-selection prescription only if the Cartan involution/real-form choice is itself physical and its symmetry cost is included.'
    },
}, indent=2))
