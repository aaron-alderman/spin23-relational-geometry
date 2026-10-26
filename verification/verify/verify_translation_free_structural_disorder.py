"""Structural-disorder cross-check for translation-free topology.

A square QWZ carrier is embedded as a jittered point set.  Hopping directions
are recomputed from the displaced coordinates, so both geometry and the local
Hamiltonian lose translation symmetry.  The periodic Bott index and an open-
boundary spectral-localizer index must agree up to the fixed sign convention.
"""

from __future__ import annotations

import json
import numpy as np


L = 8
MASS = -1.0
SEED = 231231
KAPPA = 0.22
JITTERS = (0.0, 0.10, 0.25, 0.40)

SX = np.array([[0, 1], [1, 0]], dtype=complex)
SY = np.array([[0, -1j], [1j, 0]], dtype=complex)
SZ = np.array([[1, 0], [0, -1]], dtype=complex)


def site(x: int, y: int) -> int:
    return y * L + x


def add_block(matrix: np.ndarray, a: int, b: int, block: np.ndarray) -> None:
    matrix[2*a:2*a+2, 2*b:2*b+2] += block


def displaced_positions(jitter: float, offsets: np.ndarray) -> np.ndarray:
    base = np.array([(x, y) for y in range(L) for x in range(L)], dtype=float)
    return base + jitter * offsets


def displacement(a: np.ndarray, b: np.ndarray, periodic: bool) -> np.ndarray:
    delta = b - a
    if periodic:
        delta -= L * np.rint(delta / L)
    return delta


def build_hamiltonian(positions: np.ndarray, periodic: bool) -> np.ndarray:
    h = np.zeros((2*L*L, 2*L*L), dtype=complex)
    for y in range(L):
        for x in range(L):
            a = site(x, y)
            add_block(h, a, a, MASS * SZ)
            neighbours = []
            if periodic or x + 1 < L:
                neighbours.append(site((x + 1) % L, y))
            if periodic or y + 1 < L:
                neighbours.append(site(x, (y + 1) % L))
            for b in neighbours:
                d = displacement(positions[a], positions[b], periodic)
                direction = d / np.linalg.norm(d)
                hop = (SZ - 1j * (direction[0] * SX + direction[1] * SY)) / 2
                add_block(h, b, a, hop)
                add_block(h, a, b, hop.conj().T)
    assert np.max(np.abs(h - h.conj().T)) < 1e-12
    return h


def projector(h: np.ndarray) -> tuple[np.ndarray, np.ndarray]:
    energies, vectors = np.linalg.eigh(h)
    occupied = vectors[:, energies < 0]
    return occupied @ occupied.conj().T, energies


def polar_unitary(matrix: np.ndarray) -> np.ndarray:
    left, _, right = np.linalg.svd(matrix)
    return left @ right


def bott_index(h: np.ndarray, positions: np.ndarray) -> tuple[int, float, float]:
    p, energies = projector(h)
    identity = np.eye(h.shape[0], dtype=complex)
    x = np.repeat(np.mod(positions[:, 0], L), 2)
    y = np.repeat(np.mod(positions[:, 1], L), 2)
    ux = np.diag(np.exp(2j*np.pi*x/L))
    uy = np.diag(np.exp(2j*np.pi*y/L))
    u = polar_unitary(p @ ux @ p + identity - p)
    v = polar_unitary(p @ uy @ p + identity - p)
    loop = v @ u @ v.conj().T @ u.conj().T
    raw = float(np.sum(np.angle(np.linalg.eigvals(loop))) / (2*np.pi))
    return int(np.rint(raw)), raw, float(2*np.min(np.abs(energies)))


def localizer_index(h: np.ndarray, positions: np.ndarray) -> tuple[int, float]:
    n = h.shape[0]
    x = np.repeat(positions[:, 0] - np.mean(positions[:, 0]), 2)
    y = np.repeat(positions[:, 1] - np.mean(positions[:, 1]), 2)
    z = KAPPA * (np.diag(x) - 1j*np.diag(y))
    localizer = np.block([[h, z], [z.conj().T, -h]])
    eigenvalues = np.linalg.eigvalsh(localizer)
    signature = int(np.count_nonzero(eigenvalues > 1e-9) - np.count_nonzero(eigenvalues < -1e-9))
    return signature // 2, float(np.min(np.abs(eigenvalues)))


rng = np.random.default_rng(SEED)
offsets = rng.uniform(-0.5, 0.5, (L*L, 2))
records = {}
for jitter in JITTERS:
    positions = displaced_positions(jitter, offsets)
    periodic = build_hamiltonian(positions, periodic=True)
    opened = build_hamiltonian(positions, periodic=False)
    bott, bott_raw, spectral_gap = bott_index(periodic, positions)
    localizer, localizer_gap = localizer_index(opened, positions)
    records[str(jitter)] = {
        "bott": bott,
        "bottRaw": bott_raw,
        "periodicSpectralGap": spectral_gap,
        "localizer": localizer,
        "localizerGap": localizer_gap,
    }

assert {record["bott"] for record in records.values()} == {1}
assert {record["localizer"] for record in records.values()} == {-1}
assert all(record["periodicSpectralGap"] > 0.5 for record in records.values())
assert all(record["localizerGap"] > 0.05 for record in records.values())

print(json.dumps({
    "status": "PASS",
    "model": "direction-recomputed QWZ model on a jittered point carrier",
    "size": [L, L],
    "mass": MASS,
    "seed": SEED,
    "kappa": KAPPA,
    "records": records,
    "convention": "Bott=+1 and localizer=-1 describe the same orientation under the implemented sign conventions",
    "verdict": "two independent real-space indices retain one nontrivial class across the certified structural-disorder interval"
}, separators=(",", ":")))
