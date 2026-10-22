"""A two-coordinate SO(2,3) coset toy for a composite Cartan connection."""

import json
from itertools import combinations

import numpy as np


def expm(matrix):
    values, vectors = np.linalg.eig(matrix.astype(complex))
    result = vectors @ np.diag(np.exp(values)) @ np.linalg.inv(vectors)
    return np.real_if_close(result, tol=1000).real


eta = np.diag([-1.0, 1.0, 1.0, 1.0, -1.0])


def generator(a, b):
    matrix = np.zeros((5, 5))
    for c in range(5):
        for d in range(5):
            matrix[c, d] = (1.0 if c == a else 0.0) * eta[b, d] - (1.0 if c == b else 0.0) * eta[a, d]
    return matrix


j_labels = list(combinations(range(4), 2))
j = [generator(a, b) for a, b in j_labels]
p = [generator(a, 4) for a in range(4)]
basis = j + p
columns = np.stack([item.ravel() for item in basis], axis=1)


def project(matrix):
    coefficients, _, _, _ = np.linalg.lstsq(columns, matrix.ravel(), rcond=None)
    residual = np.linalg.norm(matrix.ravel() - columns @ coefficients)
    return coefficients[:6], coefficients[6:], float(residual)


# Noncommuting coset chart g(x,y)=exp(x P0) exp(y P1).
x = 0.37
y = -0.22
ey = expm(y * p[1])
ey_inverse = expm(-y * p[1])
ax = ey_inverse @ p[0] @ ey
ay = p[1]
d_x_ay = np.zeros((5, 5))
d_y_ax = ax @ p[1] - p[1] @ ax
curvature = d_x_ay - d_y_ax + ax @ ay - ay @ ax

omega_x, e_x, projection_x = project(ax)
omega_y, e_y, projection_y = project(ay)
domega_x_dy, de_x_dy, derivative_projection = project(d_y_ax)

# Project the two-form coefficient of dA + A wedge A separately into h and m.
derivative_part = d_x_ay - d_y_ax
bracket_part = ax @ ay - ay @ ax
derivative_omega, derivative_e, _ = project(derivative_part)
bracket_omega, bracket_e, _ = project(bracket_part)
curvature_omega, curvature_e, curvature_projection = project(curvature)

# Verify that the order parameter q=g q0 remains on the AdS hyperboloid.
g = expm(x * p[0]) @ ey
q0 = np.array([0.0, 0.0, 0.0, 0.0, 1.0])
q = g @ q0
hyperboloid_value = float(q.T @ eta @ q)

print(json.dumps({
    'protocol': 'spin23-composite-cartan-connection/1',
    'chart': {'x': x, 'y': y, 'g': 'exp(x P0) exp(y P1)'},
    'orderParameter': {
        'referenceNorm': float(q0.T @ eta @ q0),
        'transportedNorm': hyperboloid_value,
        'normDeviation': abs(hyperboloid_value - float(q0.T @ eta @ q0)),
    },
    'connection': {
        'definition': 'A_mu = g^{-1} partial_mu g',
        'AxLorentzCoefficients': omega_x.tolist(),
        'AxVierbeinCoefficients': e_x.tolist(),
        'AyLorentzCoefficients': omega_y.tolist(),
        'AyVierbeinCoefficients': e_y.tolist(),
        'maximumProjectionResidual': max(projection_x, projection_y, derivative_projection),
    },
    'maurerCartanAudit': {
        'derivativeLorentzPart': derivative_omega.tolist(),
        'bracketLorentzPart': bracket_omega.tolist(),
        'derivativeTranslationPart': derivative_e.tolist(),
        'bracketTranslationPart': bracket_e.tolist(),
        'fullCurvatureFrobeniusNorm': float(np.linalg.norm(curvature)),
        'curvatureLorentzNorm': float(np.linalg.norm(curvature_omega)),
        'torsionTranslationNorm': float(np.linalg.norm(curvature_e)),
        'curvatureProjectionResidual': curvature_projection,
    },
    'interpretation': {
        'success': 'Differentiating a coset/order-parameter field produces an adjoint-valued one-form with Lorentz-connection and vierbein components.',
        'obstruction': 'When the one-form is exactly g^{-1}dg, its SO(2,3) curvature vanishes identically. The induced geometry is locally pure gauge and carries no independent gravitational waves.',
        'minimalEscape': 'Introduce an independent adjoint one-form deformation K so A=g^{-1}dg+K; then F=D_(g^{-1}dg)K+K wedge K, with its own gauge law and dynamics.',
    },
}, indent=2))
