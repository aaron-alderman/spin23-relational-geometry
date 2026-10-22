#!/usr/bin/env python3
"""Analytic external-q Taylor reduction of the t132 determinant trace."""

from __future__ import annotations

import concurrent.futures
import importlib.util
import json
import math
from pathlib import Path

import numpy as np


ROOT = Path(__file__).resolve().parents[2]
ENGINE = ROOT / "verification" / "verify" / "verify_spin23_t132_pole_trace.py"
RADII = (8.0, 12.0, 16.0, 24.0, 32.0, 48.0, 64.0)
COUPLINGS = tuple((float(a1), float(bx), 1.0) for a1 in (1, 2, 3, 4) for bx in (0.5, 1, 2))
Q_NODES = (-1.0, 0.0, 1.0, 2.0)


def load_engine():
    spec = importlib.util.spec_from_file_location("spin23_t132_trace", ENGINE)
    module = importlib.util.module_from_spec(spec)
    assert spec.loader is not None
    spec.loader.exec_module(module)
    return module


def momentum(direction: int, radius: float):
    s = radius / math.sqrt(2.0)
    return (
        (0.0, radius, 0.0, 0.0),
        (s, s, 0.0, 0.0),
        (0.0, s, 0.0, s),
        (s, 0.0, 0.0, s),
    )[direction]


def coefficients(values):
    minus, zero, plus, check = values
    c0 = zero
    c1 = (plus - minus) / 2.0
    c2 = (plus + minus) / 2.0 - zero
    predicted = c0 + 2.0 * c1 + 4.0 * c2
    scale = max(1.0, float(np.max(np.abs(check))))
    residual = float(np.max(np.abs(predicted - check))) / scale
    return (c0, c1, c2), residual


def evaluate(task):
    direction, radius = task
    engine = load_engine()
    p = np.asarray(momentum(direction, radius))
    primitive_rows = []
    for q0 in Q_NODES:
        q = np.asarray((q0, 0.0, 0.0, 0.0))
        linear = engine.hessian_sectors(p, -p - q, q, source_pair=False, include_torsion=False)
        reverse = engine.hessian_sectors(p + q, -p, -q, source_pair=False, include_torsion=False)
        quadratic = engine.hessian_sectors(p, -p, q, source_pair=True)
        zero_q = engine.hessian_sectors(p + q, -p - q, q * 0, source_pair=False)
        primitive_rows.append((linear, reverse, quadratic, zero_q, p + q))

    q2_values = []
    maximum_polynomial_residual = 0.0
    for a1, bx, kappa in COUPLINGS:
        g = (a1 + 1.0) / (2.0 * kappa)
        h1_values, h1r_values, h2_values, m_values, mp_values = [], [], [], [], []
        for linear, reverse, quadratic, zero_q, pq in primitive_rows:
            h1_values.append(bx * linear["X1"] + g * linear["E1"])
            h1r_values.append(bx * reverse["X1"] + g * reverse["E1"])
            h2_values.append(bx * quadratic["X2"] + g * quadratic["E2"])
            m_values.append(engine.packet_h0(zero_q, pq, a1, bx, kappa))
            mp_values.append(engine.packet_h0(quadratic, p, a1, bx, kappa))

        h1, r1 = coefficients(h1_values)
        h1r, r1r = coefficients(h1r_values)
        h2, r2 = coefficients(h2_values)
        m, rm = coefficients(m_values)
        maximum_polynomial_residual = max(maximum_polynomial_residual, r1, r1r, r2, rm)
        maximum_polynomial_residual = max(
            maximum_polynomial_residual,
            max(float(np.max(np.abs(mp - mp_values[1]))) for mp in mp_values),
        )

        gp = np.linalg.inv(mp_values[1])
        g0 = np.linalg.inv(m[0])
        g1 = -g0 @ m[1] @ g0
        g2 = g0 @ m[1] @ g0 @ m[1] @ g0 - g0 @ m[2] @ g0
        gseries = (g0, g1, g2)

        seagull_q2 = 0.5 * np.trace(gp @ h2[2])
        bubble_q2 = 0.0j
        for i in range(3):
            for j in range(3 - i):
                k = 2 - i - j
                bubble_q2 += np.trace(gp @ h1[i] @ gseries[j] @ h1r[k])
        bubble_q2 *= -0.25
        q2_values.append(float((seagull_q2 + bubble_q2).real))

    if maximum_polynomial_residual > 2e-9:
        raise AssertionError(f"quadratic q reconstruction residual {maximum_polynomial_residual}")
    return direction, radius, q2_values, maximum_polynomial_residual


def main():
    tasks = [(direction, radius) for direction in range(4) for radius in RADII]
    with concurrent.futures.ProcessPoolExecutor(max_workers=10) as pool:
        evaluated = list(pool.map(evaluate, tasks))
    table = {(d, r): np.asarray(values) for d, r, values, _ in evaluated}
    polynomial_residual = max(row[3] for row in evaluated)

    z = 1.0 / np.square(np.asarray(RADII))
    directional = np.zeros((4, len(COUPLINGS)))
    for direction in range(4):
        rows = np.asarray([table[(direction, radius)] for radius in RADII])
        for coupling_index in range(len(COUPLINGS)):
            directional[direction, coupling_index] = np.polynomial.polynomial.polyfit(
                z, rows[:, coupling_index], 3
            )[2]

    weights = np.asarray((1.0 / 6.0, 1.0 / 3.0, 1.0 / 3.0, 1.0 / 6.0))
    averages = weights @ directional
    result = {
        "couplingOrder": [{"a1": a1, "B": bx} for a1, bx, _ in COUPLINGS],
        "maximumQuadraticQReconstructionResidual": polynomial_residual,
        "angularAverages": averages.tolist(),
        "hTT1PoleCoefficients": (averages / (32.0 * math.pi**2)).tolist(),
        "directionalQ2OverR4": directional.T.tolist(),
    }
    print(json.dumps(result, indent=2))


if __name__ == "__main__":
    main()
