"""Test simple SO(2,3)-invariant quartics for aligning two vector compensators."""

import json

import numpy as np


eta = np.diag([-1.0, 1.0, 1.0, 1.0, -1.0])
lam = 1.0
kappa = 1.0
scale2 = 1.0


def invariants(state):
    first, second = state[:5], state[5:]
    x = float(first @ eta @ first)
    y = float(second @ eta @ second)
    z = float(first @ eta @ second)
    return x, y, z


def potential(state, sign):
    x, y, z = invariants(state)
    # sign=+1 uses z^2-xy; sign=-1 uses xy-z^2.
    gram_alignment = sign * (z * z - x * y)
    return lam * ((x + scale2) ** 2 + (y + scale2) ** 2) + kappa * gram_alignment


def hessian(function, point, step=1e-5):
    count = len(point)
    result = np.zeros((count, count))
    f0 = function(point)
    for i in range(count):
        ei = np.zeros(count); ei[i] = step
        result[i, i] = (function(point + ei) - 2 * f0 + function(point - ei)) / step ** 2
        for j in range(i):
            ej = np.zeros(count); ej[j] = step
            value = (function(point + ei + ej) - function(point + ei - ej) - function(point - ei + ej) + function(point - ei - ej)) / (4 * step ** 2)
            result[i, j] = result[j, i] = value
    return (result + result.T) / 2


timelike = np.array([0.0, 0.0, 0.0, 0.0, 1.0])
aligned = np.concatenate([timelike, timelike])
orthogonal_timelike = np.concatenate([
    np.array([np.sqrt(2.0), 0.0, 0.0, 0.0, 0.0]),
    np.array([0.0, 0.0, 0.0, 0.0, np.sqrt(2.0)]),
])

rows = []
for sign, name in [(1, 'bounded-sign z2-minus-xy'), (-1, 'alignment-sign xy-minus-z2')]:
    matrix = hessian(lambda state: potential(state, sign), aligned)
    values = np.linalg.eigvalsh(matrix)
    rows.append({
        'name': name,
        'alignedPotential': potential(aligned, sign),
        'alignedHessianEigenvalues': values.tolist(),
        'alignedNegativeModes': int(np.sum(values < -1e-6)),
        'alignedZeroModes': int(np.sum(abs(values) <= 1e-6)),
        'orthogonalTimelikePotential': potential(orthogonal_timelike, sign),
    })

# Exact runaway for the sign that locally favors alignment: two null vectors
# with an arbitrarily large mutual product.
runaway = []
for amplitude in [1.0, 2.0, 4.0, 8.0]:
    first = amplitude * np.array([1.0, 1.0, 0.0, 0.0, 0.0])
    second = amplitude * np.array([1.0, -1.0, 0.0, 0.0, 0.0])
    state = np.concatenate([first, second])
    runaway.append({'amplitude': amplitude, 'invariants': invariants(state), 'alignmentSignPotential': potential(state, -1)})

# Sample the quartic homogeneous part of the bounded sign.
rng = np.random.default_rng(230656)
quartic_samples = []
for _ in range(20000):
    state = rng.normal(size=10); state /= np.linalg.norm(state)
    x, y, z = invariants(state)
    quartic_samples.append(lam * (x * x + y * y) + kappa * (z * z - x * y))

print(json.dumps({
    'protocol': 'spin23-two-vector-alignment-potential/1',
    'potentialFamily': 'lambda[(V1^2+v^2)^2+(V2^2+v^2)^2] +/- kappa[(V1.V2)^2-V1^2 V2^2]',
    'parameters': {'lambda': lam, 'kappa': kappa, 'vSquared': scale2},
    'signAudits': rows,
    'alignmentSignNullRunaway': runaway,
    'boundedSignQuarticSample': {'directions': len(quartic_samples), 'minimum': min(quartic_samples), 'maximum': max(quartic_samples)},
    'conclusion': 'With signature (2,3), the sign whose quartic is bounded makes the parallel timelike point unstable toward the second timelike direction; the sign that favors parallel alignment is unbounded along pairs of null vectors. A simple invariant Gram quartic cannot both guarantee global boundedness and derive the desired aligned compensator vacuum.',
}, indent=2))
