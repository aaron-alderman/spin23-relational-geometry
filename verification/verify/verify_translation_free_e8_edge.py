"""Exact and frozen-disorder checks for the translation-free E8 edge."""

from __future__ import annotations

import json
import numpy as np


K = np.array([
    [2,-1,0,0,0,0,0,0],
    [-1,2,-1,0,0,0,0,0],
    [0,-1,2,-1,0,0,0,-1],
    [0,0,-1,2,-1,0,0,0],
    [0,0,0,-1,2,-1,0,0],
    [0,0,0,0,-1,2,-1,0],
    [0,0,0,0,0,-1,2,0],
    [0,0,-1,0,0,0,0,2],
], dtype=float)

SEED = 8231
POSITIONS = 32
AMPLITUDES = (0.25, 0.5, 1.0, 2.0)

assert np.allclose(K, K.T)
assert round(np.linalg.det(K)) == 1
assert np.all(np.diag(K).astype(int) % 2 == 0)
assert np.min(np.linalg.eigvalsh(K)) > 0
kinv = np.linalg.inv(K)
assert np.max(np.abs(kinv - np.rint(kinv))) < 1e-12

rng = np.random.default_rng(SEED)
minimum_velocity = float("inf")
maximum_imaginary_part = 0.0
samples = 0
for amplitude in AMPLITUDES:
    for _ in range(POSITIONS):
        rotation_seed = rng.normal(size=(8, 8))
        q, _ = np.linalg.qr(rotation_seed)
        log_velocities = amplitude * rng.uniform(-1, 1, 8)
        v = q @ np.diag(np.exp(log_velocities)) @ q.T
        generalized = np.linalg.eigvals(np.linalg.solve(K, v))
        minimum_velocity = min(minimum_velocity, float(np.min(generalized.real)))
        maximum_imaginary_part = max(maximum_imaginary_part, float(np.max(np.abs(generalized.imag))))
        assert np.min(generalized.real) > 0
        assert np.max(np.abs(generalized.imag)) < 1e-10
        samples += 1

assert samples == 128

print(json.dumps({
    "status": "PASS",
    "rank": 8,
    "determinant": 1,
    "signature": 8,
    "chiralCentralCharge": 8,
    "anyonQuotientOrder": 1,
    "disorder": {
        "seed": SEED,
        "samples": samples,
        "amplitudes": AMPLITUDES,
        "minimumGeneralizedVelocity": minimum_velocity,
        "maximumImaginaryPart": maximum_imaginary_part,
    },
    "verdict": "positive spatially random interactions preserve the co-propagating E8 effective edge"
}, separators=(",", ":")))
