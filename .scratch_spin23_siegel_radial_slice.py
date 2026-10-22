"""Numerical checks for the locked-radial W=rK slice of the degree-two Siegel disk."""

import json
import numpy as np


def random_unitary(rng):
    z = rng.normal(size=(2, 2)) + 1j * rng.normal(size=(2, 2))
    q, r = np.linalg.qr(z)
    phases = np.diag(r)
    phases = phases / np.abs(phases)
    return q @ np.diag(np.conj(phases))


def trial(rng):
    b = random_unitary(rng)
    k = b.T @ b
    h0 = rng.normal(size=(2, 2)) + 1j * rng.normal(size=(2, 2))
    h = (h0 + h0.conj().T) / 2
    db = 1j * h @ b
    dk = db.T @ b + b.T @ db
    r = rng.uniform(0.02, 0.98)
    dr = rng.normal()
    w = r * k
    dw = dr * k + r * dk
    left = np.linalg.inv(np.eye(2) - w @ w.conj())
    right = np.linalg.inv(np.eye(2) - w.conj() @ w)
    direct = 4 * np.real(np.trace(left @ dw @ right @ dw.conj()))
    reduced = 4 / (1 - r * r) ** 2 * (
        2 * dr * dr + r * r * np.real(np.trace(dk @ dk.conj()))
    )
    cross = np.real(np.trace(k @ dk.conj() + dk @ k.conj()))
    return {
        "unitarity_error": float(np.linalg.norm(k @ k.conj() - np.eye(2))),
        "scalar_denominator_error": float(
            np.linalg.norm(w @ w.conj() - r * r * np.eye(2))
        ),
        "cross_term": float(abs(cross)),
        "metric_relative_error": float(abs(direct - reduced) / max(1.0, abs(direct))),
    }


rng = np.random.default_rng(20261022)
results = [trial(rng) for _ in range(64)]
print(json.dumps({key: max(row[key] for row in results) for key in results[0]}, indent=2))
