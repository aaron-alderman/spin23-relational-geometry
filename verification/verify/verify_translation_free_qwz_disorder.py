"""Finite real-space seed for the translation-free topology arm.

The verifier constructs the Qi-Wu-Zhang Chern-insulator Hamiltonian directly
in real space, removes translation symmetry with a frozen onsite-disorder
field, and computes the Bott index from the occupied projector.  It is a seed
model, not an amorphous-material calculation.
"""

from __future__ import annotations

import json
import numpy as np


L = 8
MASS = -1.0
SEED = 231

SX = np.array([[0, 1], [1, 0]], dtype=complex)
SY = np.array([[0, -1j], [1j, 0]], dtype=complex)
SZ = np.array([[1, 0], [0, -1]], dtype=complex)
I2 = np.eye(2, dtype=complex)


def site(x: int, y: int) -> int:
    return (y % L) * L + (x % L)


def add_block(matrix: np.ndarray, a: int, b: int, block: np.ndarray) -> None:
    matrix[2 * a : 2 * a + 2, 2 * b : 2 * b + 2] += block


def hamiltonian(disorder_strength: float, disorder: np.ndarray) -> np.ndarray:
    n = 2 * L * L
    h = np.zeros((n, n), dtype=complex)
    tx = (SZ - 1j * SX) / 2
    ty = (SZ - 1j * SY) / 2
    for y in range(L):
        for x in range(L):
            a = site(x, y)
            add_block(h, a, a, MASS * SZ + disorder_strength * disorder[a] * I2)
            for b, hop in ((site(x + 1, y), tx), (site(x, y + 1), ty)):
                add_block(h, b, a, hop)
                add_block(h, a, b, hop.conj().T)
    assert np.max(np.abs(h - h.conj().T)) < 1e-12
    return h


def polar_unitary(matrix: np.ndarray) -> np.ndarray:
    left, _, right = np.linalg.svd(matrix)
    return left @ right


def bott_record(h: np.ndarray) -> dict[str, float | int]:
    energies, states = np.linalg.eigh(h)
    occupied = states[:, energies < 0]
    p = occupied @ occupied.conj().T
    identity = np.eye(h.shape[0], dtype=complex)
    xphase = np.repeat(np.tile(np.arange(L), L), 2)
    yphase = np.repeat(np.repeat(np.arange(L), L), 2)
    ux = np.diag(np.exp(2j * np.pi * xphase / L))
    uy = np.diag(np.exp(2j * np.pi * yphase / L))
    u = polar_unitary(p @ ux @ p + identity - p)
    v = polar_unitary(p @ uy @ p + identity - p)
    loop = v @ u @ v.conj().T @ u.conj().T
    raw = float(np.sum(np.angle(np.linalg.eigvals(loop))) / (2 * np.pi))
    return {
        "occupied": int(occupied.shape[1]),
        "spectralGap": float(2 * np.min(np.abs(energies))),
        "bottRaw": raw,
        "bott": int(np.rint(raw)),
        "projectorError": float(np.linalg.norm(p @ p - p, ord=2)),
        "loopUnitarityError": float(np.linalg.norm(loop.conj().T @ loop - identity, ord=2)),
    }


rng = np.random.default_rng(SEED)
frozen_disorder = rng.uniform(-0.5, 0.5, L * L)
records = {str(w): bott_record(hamiltonian(w, frozen_disorder)) for w in (0.0, 0.5, 1.0, 2.0)}

indices = {record["bott"] for record in records.values()}
assert len(indices) == 1
assert abs(next(iter(indices))) == 1
for record in records.values():
    assert record["spectralGap"] > 0.35
    assert record["projectorError"] < 1e-12
    assert record["loopUnitarityError"] < 1e-11

print(json.dumps({
    "status": "PASS",
    "model": "real-space QWZ Chern insulator with frozen onsite disorder",
    "size": [L, L],
    "mass": MASS,
    "seed": SEED,
    "translationSymmetry": "broken for every nonzero disorder strength",
    "records": records,
    "verdict": "the Bott class remains nontrivial across the certified disorder interval"
}, separators=(",", ":")))
