"""Compute the symmetry intersection of a positive Cartan metric and a Lorentz compensator."""

import json
from itertools import combinations

import numpy as np


eta = np.diag([-1.0, 1.0, 1.0, 1.0, -1.0])
positive_metric = np.eye(5)


def generator(a, b):
    matrix = np.zeros((5, 5))
    for c in range(5):
        for d in range(5):
            matrix[c, d] = (1.0 if c == a else 0.0) * eta[b, d] - (1.0 if c == b else 0.0) * eta[a, d]
    return matrix


labels = list(combinations(range(5), 2))
generators = [generator(a, b) for a, b in labels]


def kernel_subalgebra(constraint_columns, tolerance=1e-9):
    matrix = np.stack(constraint_columns, axis=1)
    _, singular, vh = np.linalg.svd(matrix, full_matrices=True)
    rank = int(np.sum(singular > tolerance * max(1.0, float(singular[0]))))
    coefficients = vh[rank:, :]
    return [sum(row[i] * generators[i] for i in range(10)) for row in coefficients], singular


metric_constraints = [(g.T @ positive_metric + positive_metric @ g).ravel() for g in generators]
compact, metric_singular = kernel_subalgebra(metric_constraints)

compensator = np.array([0.0, 0.0, 0.0, 0.0, 1.0])
vector_constraints = [g @ compensator for g in generators]
lorentz, vector_singular = kernel_subalgebra(vector_constraints)

joint_constraints = [
    np.concatenate([(g.T @ positive_metric + positive_metric @ g).ravel(), g @ compensator])
    for g in generators
]
joint, joint_singular = kernel_subalgebra(joint_constraints)


def killing_signature(subalgebra):
    columns = np.stack([item.ravel() for item in subalgebra], axis=1)
    adjoint = []
    closure_residual = 0.0
    for left in subalgebra:
        reps = []
        for right in subalgebra:
            bracket = left @ right - right @ left
            coeff, _, _, _ = np.linalg.lstsq(columns, bracket.ravel(), rcond=None)
            reps.append(coeff)
            closure_residual = max(closure_residual, float(np.linalg.norm(bracket.ravel() - columns @ coeff)))
        adjoint.append(np.stack(reps, axis=1))
    killing = np.array([[np.trace(a @ b) for b in adjoint] for a in adjoint])
    values = np.linalg.eigvalsh((killing + killing.T) / 2)
    return values, closure_residual


compact_killing, compact_residual = killing_signature(compact)
lorentz_killing, lorentz_residual = killing_signature(lorentz)
joint_killing, joint_residual = killing_signature(joint)

print(json.dumps({
    'protocol': 'spin23-cartan-metric-compensator-intersection/1',
    'positiveCartanMetric': {
        'subalgebraDimension': len(compact),
        'killingEigenvalues': compact_killing.tolist(),
        'identification': 'so(2) + so(3)',
        'closureResidual': compact_residual,
    },
    'timelikeCompensator': {
        'norm': float(compensator @ eta @ compensator),
        'subalgebraDimension': len(lorentz),
        'killingEigenvalues': lorentz_killing.tolist(),
        'identification': 'so(1,3)',
        'closureResidual': lorentz_residual,
    },
    'jointBackground': {
        'subalgebraDimension': len(joint),
        'killingEigenvalues': joint_killing.tolist(),
        'identification': 'so(3)',
        'closureResidual': joint_residual,
    },
    'geometricReason': 'A positive Cartan metric selects both timelike directions, while one compensator selects one of them. Together they distinguish the full time plane and one axis inside it, leaving only rotations of the three spacelike directions.',
    'consequence': 'A fixed positive Cartan metric cannot be used to stabilize the compensator potential while simultaneously claiming an unbroken local SO(1,3); the common stabilizer is only SO(3).',
}, indent=2))
