#!/usr/bin/env python3
"""Analytic-q pole scan for the t021 flat response profile."""

from __future__ import annotations

import concurrent.futures
import importlib.util
import itertools
import json
import math
import os
from pathlib import Path

import numpy as np


ROOT = Path(__file__).resolve().parents[2]
ENGINE = ROOT / "verification" / "verify" / "verify_spin23_t132_pole_trace.py"
RADII = (8.0, 12.0, 16.0, 24.0, 32.0, 48.0, 64.0)
COUPLINGS = tuple((float(a1), float(bx), 1.0) for a1 in (1, 2, 3, 4) for bx in (0.5, 1, 2))
Q_NODES = (-1.0, 0.0, 1.0, 2.0)
# Antipodal representatives of the 24 D4 roots.  Equal weights integrate
# every spherical polynomial through degree five on S^3.
SIGN_REDUCED = os.environ.get("SPIN23_SIGN_REDUCED") == "1"
DIRECTIONS = tuple((i, j, sign) for i, j in itertools.combinations(range(4), 2)
                   for sign in ((1.0,) if SIGN_REDUCED else (1.0, -1.0)))
PROFILE = os.environ.get("SPIN23_PROFILE", "t021")
PROFILE_ENTRIES = {"t021": {"021": 1.0}, "t102": {"102": 1.0}, "t112": {"112": 1.0},
                   "t011": {"011": 1.0}, "t001+t122": {"001": 1.0, "122": 1.0},
                   "t001": {"001": 1.0}}
RESPONSE_ROWS = {"t021": [2,0,0,1,0,0,0,0,0], "t102": [2,0,0,0,0,2,0,0,0],
                 "t112": [2,1,1,0,0,0,0,0,0], "t011": [2,1,1,1,0,0,0,0,1],
                 "t001+t122": [4,2,0,1,0,2,1,0,0],
                 "t001": [2,1,1,1,0,2,1,1,0]}
if PROFILE not in PROFILE_ENTRIES:
    raise ValueError(f"unsupported profile {PROFILE}")


def load_engine():
    spec = importlib.util.spec_from_file_location("spin23_t021_trace", ENGINE)
    module = importlib.util.module_from_spec(spec)
    assert spec.loader is not None
    spec.loader.exec_module(module)
    return module


def momentum(direction: int, radius: float):
    i, j, sign = DIRECTIONS[direction]
    p = np.zeros(4)
    p[i] = radius / math.sqrt(2.0)
    p[j] = sign * radius / math.sqrt(2.0)
    return p


def coefficients(values):
    minus, zero, plus, check = values
    c0 = zero
    c1 = (plus - minus) / 2.0
    c2 = (plus + minus) / 2.0 - zero
    predicted = c0 + 2.0*c1 + 4.0*c2
    scale = max(1.0, float(np.max(np.abs(check))))
    return (c0, c1, c2), float(np.max(np.abs(predicted-check))) / scale


def evaluate(task):
    direction, radius = task
    engine = load_engine()
    p = momentum(direction, radius)
    source = engine.torsion_to_contorsion(PROFILE_ENTRIES[PROFILE])
    primitives = []
    for q0 in Q_NODES:
        q = np.asarray((q0, 0.0, 0.0, 0.0))
        linear = engine.hessian_sectors(p, -p-q, q, source_pair=False, include_torsion=False, p_source=source)
        reverse = engine.hessian_sectors(p+q, -p, -q, source_pair=False, include_torsion=False, p_source=source)
        quadratic = engine.hessian_sectors(p, -p, q, source_pair=True, p_source=source)
        zero_q = engine.hessian_sectors(p+q, -p-q, q*0, source_pair=False)
        primitives.append((linear, reverse, quadratic, zero_q, p+q))

    q2_values, max_residual = [], 0.0
    for a1, bx, kappa in COUPLINGS:
        g = (a1+1)/(2*kappa)
        h1v, h1rv, h2v, mv, mpv = [], [], [], [], []
        for linear, reverse, quadratic, zero_q, pq in primitives:
            h1v.append(bx*linear["X1"] + g*linear["E1"])
            h1rv.append(bx*reverse["X1"] + g*reverse["E1"])
            h2v.append(bx*quadratic["X2"] + g*quadratic["E2"])
            mv.append(engine.packet_h0(zero_q, pq, a1, bx, kappa))
            mpv.append(engine.packet_h0(quadratic, p, a1, bx, kappa))
        h1, r1 = coefficients(h1v); h1r, r1r = coefficients(h1rv)
        h2, r2 = coefficients(h2v); m, rm = coefficients(mv)
        max_residual = max(max_residual, r1, r1r, r2, rm,
                           max(float(np.max(np.abs(x-mpv[1]))) for x in mpv))
        gp = np.linalg.inv(mpv[1]); g0 = np.linalg.inv(m[0])
        gs = (g0, -g0@m[1]@g0, g0@m[1]@g0@m[1]@g0-g0@m[2]@g0)
        q2 = .5*np.trace(gp@h2[2])
        q2 -= .25*sum(np.trace(gp@h1[i]@gs[j]@h1r[2-i-j])
                       for i in range(3) for j in range(3-i))
        q2_values.append(float(q2.real))
    if max_residual > 2e-9:
        raise AssertionError(max_residual)
    return direction, radius, q2_values, max_residual


def main():
    tasks = [(d, r) for d in range(len(DIRECTIONS)) for r in RADII]
    with concurrent.futures.ProcessPoolExecutor(max_workers=10) as pool:
        rows = list(pool.map(evaluate, tasks))
    table = {(d, r): np.asarray(v) for d, r, v, _ in rows}
    z = 1/np.square(np.asarray(RADII))
    directional = np.zeros((len(DIRECTIONS), len(COUPLINGS)))
    for d in range(len(DIRECTIONS)):
        values = np.asarray([table[(d, r)] for r in RADII])
        for c in range(len(COUPLINGS)):
            directional[d, c] = np.polynomial.polynomial.polyfit(z, values[:, c], 3)[2]
    averages = np.mean(directional, axis=0)
    result = {
        "profile": PROFILE,
        "responseRow": RESPONSE_ROWS[PROFILE],
        "couplingOrder": [{"a1":a1,"B":bx} for a1,bx,_ in COUPLINGS],
        "maximumQuadraticQReconstructionResidual": max(x[3] for x in rows),
        "angularAverages": averages.tolist(),
        "yProfilePoleCoefficients": (averages/(16*math.pi**2)).tolist(),
        "directionalQ2OverR4": directional.T.tolist(),
    }
    print(json.dumps(result, indent=2))


if __name__ == "__main__":
    main()
