#!/usr/bin/env python3
"""Parallel exploratory scan of the regular t132 pole coupling function."""

from __future__ import annotations

import concurrent.futures
import importlib.util
import json
import math
import os
from pathlib import Path

import numpy as np


ROOT = Path(__file__).resolve().parents[2]
ENGINE = ROOT / "verification" / "verify" / "verify_spin23_t132_pole_trace.py"
RADII = (8.0, 12.0, 16.0, 24.0, 32.0, 48.0, 64.0)
FINE_WITNESS = os.environ.get("SPIN23_SCAN_FINE_WITNESS") == "1"
FINE_GRID = os.environ.get("SPIN23_SCAN_FINE_GRID") == "1"
DELTA = 0.0625 if (FINE_WITNESS or FINE_GRID) else 0.125
COUPLINGS = ((2.0, 1.0, 1.0),) if FINE_WITNESS else tuple(
    (float(a1), float(bx), 1.0) for a1 in (1, 2, 3, 4) for bx in (0.5, 1, 2)
)


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


def evaluate(task):
    direction, radius, q0 = task
    engine = load_engine()
    rows = engine.calculate_traces(
        p=momentum(direction, radius), q=(q0, 0.0, 0.0, 0.0), couplings=COUPLINGS
    )
    return direction, radius, q0, [float(row["total"].real) for row in rows]


def main():
    tasks = []
    for direction in range(4):
        qs = ((0.0, DELTA, 2 * DELTA) if direction in (0, 2)
              else (0.0, DELTA, -DELTA, 2 * DELTA, -2 * DELTA))
        tasks.extend((direction, radius, q0) for radius in RADII for q0 in qs)
    with concurrent.futures.ProcessPoolExecutor(max_workers=10) as pool:
        evaluated = list(pool.map(evaluate, tasks))
    table = {(d, r, q): np.asarray(values) for d, r, q, values in evaluated}

    directional = np.zeros((4, len(COUPLINGS)))
    z = 1.0 / np.square(np.asarray(RADII))
    for direction in range(4):
        radial_coefficients = []
        for delta in (DELTA, 2 * DELTA):
            q2_rows = []
            for radius in RADII:
                f0 = table[(direction, radius, 0.0)]
                fp = table[(direction, radius, delta)]
                fm = fp if direction in (0, 2) else table[(direction, radius, -delta)]
                q2_rows.append((fp + fm - 2.0 * f0) / (2.0 * delta**2))
            q2_rows = np.asarray(q2_rows)
            radial_coefficients.append([
                np.polynomial.polynomial.polyfit(z, q2_rows[:, coupling_index], 3)[2]
                for coupling_index in range(len(COUPLINGS))
            ])
        directional[direction] = (4.0 * np.asarray(radial_coefficients[0])
                                  - np.asarray(radial_coefficients[1])) / 3.0

    # Exact for every polynomial quadratic in x=n0^2 and y=n3^2.
    weights = np.asarray((1.0 / 6.0, 1.0 / 3.0, 1.0 / 3.0, 1.0 / 6.0))
    averages = weights @ directional
    result = {
        "couplingOrder": [{"a1": a1, "B": bx} for a1, bx, _ in COUPLINGS],
        "angularAverages": averages.tolist(),
        "hTT1PoleCoefficients": (averages / (32.0 * math.pi**2)).tolist(),
        "directionalQ2OverR4": directional.T.tolist(),
    }
    print(json.dumps(result, indent=2))


if __name__ == "__main__":
    main()
