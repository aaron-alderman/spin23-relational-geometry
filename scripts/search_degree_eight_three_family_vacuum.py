#!/usr/bin/env python

import json
import numpy as np

A = np.diag([1.0, 4.0, 9.0])
D_B = np.diag([2.0, 7.0, 11.0])
TARGET = np.array([0.59, 0.84, 0.15, 1.20])


def pmns(x):
    t12, t23, t13, delta = x
    c12, s12 = np.cos(t12), np.sin(t12)
    c23, s23 = np.cos(t23), np.sin(t23)
    c13, s13 = np.cos(t13), np.sin(t13)
    em, ep = np.exp(-1j * delta), np.exp(1j * delta)
    return np.array([
        [c12 * c13, s12 * c13, s13 * em],
        [-s12 * c23 - c12 * s23 * s13 * ep,
         c12 * c23 - s12 * s23 * s13 * ep,
         s23 * c13],
        [s12 * s23 - c12 * c23 * s13 * ep,
         -c12 * s23 - s12 * c23 * s13 * ep,
         c23 * c13],
    ], dtype=complex)


def features(x):
    u = pmns(x)
    b = u @ D_B @ u.conj().T
    ab = np.trace(A @ b).real
    return np.array([
        ab,
        np.trace(A @ A @ b).real,
        np.trace(A @ b @ b).real,
        np.trace(A @ A @ b @ b).real,
        ab * ab,
        np.trace(A @ b @ A @ b).real,
    ])


def gradient_vector(fn, x, h=2e-5):
    out = []
    for i in range(len(x)):
        xp, xm = x.copy(), x.copy()
        xp[i] += h
        xm[i] -= h
        out.append((fn(xp) - fn(xm)) / (2 * h))
    return np.stack(out)


def hessian_scalar(fn, x, h=2e-4):
    n = len(x)
    hess = np.zeros((n, n))
    f0 = fn(x)
    for i in range(n):
        xp, xm = x.copy(), x.copy()
        xp[i] += h
        xm[i] -= h
        hess[i, i] = (fn(xp) - 2 * f0 + fn(xm)) / (h * h)
        for j in range(i + 1, n):
            xpp, xpm, xmp, xmm = x.copy(), x.copy(), x.copy(), x.copy()
            xpp[i] += h; xpp[j] += h
            xpm[i] += h; xpm[j] -= h
            xmp[i] -= h; xmp[j] += h
            xmm[i] -= h; xmm[j] -= h
            value = (fn(xpp) - fn(xpm) - fn(xmp) + fn(xmm)) / (4 * h * h)
            hess[i, j] = hess[j, i] = value
    return hess


jacobian = gradient_vector(features, TARGET)
_, singular_values, vh = np.linalg.svd(jacobian)
null_basis = vh[-2:].T
feature_hessians = [hessian_scalar(lambda x, k=k: features(x)[k], TARGET) for k in range(6)]

# Use the four Birkhoff-linear features as local coordinates.  For each
# nonlinear generator, solve for the unique linear counterterm that makes the
# chosen full-mixing point stationary.
j_linear = jacobian[:, :4]
stationary_basis = []
for nonlinear_index in (4, 5):
    coeff = np.zeros(6)
    coeff[nonlinear_index] = 1.0
    coeff[:4] = np.linalg.solve(j_linear, -jacobian[:, nonlinear_index])
    stationary_basis.append(coeff)

best = None
for phi in np.linspace(0, 2 * np.pi, 20001):
    coeff = stationary_basis[0] * np.cos(phi) + stationary_basis[1] * np.sin(phi)
    coeff = coeff / np.linalg.norm(coeff)
    hess = sum(coeff[k] * feature_hessians[k] for k in range(6))
    eig = np.linalg.eigvalsh((hess + hess.T) / 2)
    score = eig.min()
    if best is None or score > best[0]:
        best = (score, phi, coeff, eig, hess)

score, phi, coeff, eig, hess = best
stationarity = jacobian @ coeff

result = {
    "protocol": "degree-eight-three-family-stationarity-search/1",
    "spectra": {"A": np.diag(A).tolist(), "B": np.diag(D_B).tolist()},
    "target": {"theta12": TARGET[0], "theta23": TARGET[1], "theta13": TARGET[2], "delta": TARGET[3]},
    "featureOrder": ["TrAB", "TrA2B", "TrAB2", "TrA2B2", "(TrAB)^2", "TrABAB"],
    "jacobianSingularValues": singular_values.tolist(),
    "nullity": int(null_basis.shape[1]),
    "stationaryBasis": [value.tolist() for value in stationary_basis],
    "stationaryBasisHessianEigenvalues": [
        np.linalg.eigvalsh(sum(value[k] * feature_hessians[k] for k in range(6))).tolist()
        for value in stationary_basis
    ],
    "bestPhi": float(phi),
    "coefficients": coeff.tolist(),
    "stationarityResidual": stationarity.tolist(),
    "hessianEigenvalues": eig.tolist(),
    "strictLocalMinimum": bool(score > 1e-4 and np.linalg.norm(stationarity) < 1e-5),
}

# Test the fixed-spectrum 3x3 trace identity numerically on Haar-random
# relative frames: Tr(ABAB) lies in the affine span of the four linear mixed
# traces and (TrAB)^2.
rng = np.random.default_rng(20261019)
design, target_values = [], []
for _ in range(200):
    raw = rng.normal(size=(3, 3)) + 1j * rng.normal(size=(3, 3))
    q, r = np.linalg.qr(raw)
    phases = np.diag(r)
    q = q @ np.diag(np.where(np.abs(phases) > 0, phases.conj() / np.abs(phases), 1.0))
    b = q @ D_B @ q.conj().T
    ab = np.trace(A @ b).real
    row = [
        1.0,
        ab,
        np.trace(A @ A @ b).real,
        np.trace(A @ b @ b).real,
        np.trace(A @ A @ b @ b).real,
        ab * ab,
    ]
    design.append(row)
    target_values.append(np.trace(A @ b @ A @ b).real)
identity_coefficients, *_ = np.linalg.lstsq(np.array(design), np.array(target_values), rcond=None)
identity_residual = np.max(np.abs(np.array(design) @ identity_coefficients - np.array(target_values)))
result["fixedSpectrumTraceIdentity"] = {
    "basis": ["1", "TrAB", "TrA2B", "TrAB2", "TrA2B2", "(TrAB)^2"],
    "coefficients": identity_coefficients.tolist(),
    "maximumResidualAcross200HaarFrames": float(identity_residual),
}

general_identity_residual = 0.0
for _ in range(200):
    x = rng.normal(size=(3, 3)) + 1j * rng.normal(size=(3, 3))
    y = rng.normal(size=(3, 3)) + 1j * rng.normal(size=(3, 3))
    a = (x + x.conj().T) / 2
    b = (y + y.conj().T) / 2
    lhs = np.trace(a @ b @ a @ b)
    rhs = (
        np.trace(a @ b) ** 2
        - 2 * np.trace(a @ a @ b @ b)
        + 2 * np.trace(b) * np.trace(a @ a @ b)
        + 2 * np.trace(a) * np.trace(a @ b @ b)
        - 2 * np.trace(a) * np.trace(b) * np.trace(a @ b)
        + 0.5 * (np.trace(a) ** 2 - np.trace(a @ a))
        * (np.trace(b) ** 2 - np.trace(b @ b))
    )
    general_identity_residual = max(general_identity_residual, abs(lhs - rhs))
result["generalThreeByThreeTraceIdentityMaximumResidual"] = float(general_identity_residual)
print(json.dumps(result, indent=2))

