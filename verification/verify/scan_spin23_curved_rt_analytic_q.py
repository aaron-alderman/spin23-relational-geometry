#!/usr/bin/env python3
"""Analytic-q Fourier scan for the two curved R-div(T) pole responses."""

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
RADII = tuple(float(x) for x in os.environ.get(
    "SPIN23_RT_RADII", "8,12,16,24,32,48,64"
).split(","))
COUPLINGS = tuple(
    (float(a1), float(bx), 1.0)
    for a1 in os.environ.get("SPIN23_RT_A1", "1,2,3,4").split(",")
    for bx in os.environ.get("SPIN23_RT_BX", "0.5,1,2").split(",")
)
Q_NODES = (-3.0, -2.0, -1.0, 1.0, 2.0)
Q_CHECK = 3.0
DIRECTIONS = tuple(
    (i, j, 1.0)
    for i, j in itertools.combinations(range(4), 2)
)
PROBE = os.environ.get("SPIN23_RT_PROBE", "A")
if PROBE not in ("A", "B"):
    raise ValueError("SPIN23_RT_PROBE must be A or B")


def load_engine():
    spec = importlib.util.spec_from_file_location("spin23_curved_rt_trace", ENGINE)
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


def polynomial_coefficients(nodes, values, degree=4):
    shape = values[0].shape
    y = np.asarray(values).reshape(len(nodes), -1)
    vandermonde = np.polynomial.polynomial.polyvander(nodes, degree)
    coefficients = np.linalg.solve(vandermonde, y)
    return tuple(coefficients[n].reshape(shape) for n in range(degree + 1))


def build_primitive(task):
    direction, radius, q0 = task
    cache_root = os.environ.get("SPIN23_RT_CACHE")
    cache_path = None
    shared = None
    if cache_root:
        q_label = ("m" if q0 < 0 else "p") + str(abs(int(q0)))
        cache_path = Path(cache_root) / f"v1-{PROBE}-d{direction}-r{radius:g}-q{q_label}.npz"
        if cache_path.exists():
            with np.load(cache_path) as cached:
                primitive = tuple({key: cached[f"{prefix}_{key}"] for key in
                                   ("X0","T0","E0","X1","T1","E1","X2","T2","E2")}
                                  for prefix in ("combined","torsion","frame","zero"))
            return direction, radius, q0, primitive
        if PROBE == "B":
            shared_path = Path(cache_root) / f"v1-A-d{direction}-r{radius:g}-q{q_label}.npz"
            if shared_path.exists():
                with np.load(shared_path) as cached:
                    shared = tuple({key: cached[f"{prefix}_{key}"] for key in
                                    ("X0","T0","E0","X1","T1","E1","X2","T2","E2")}
                                   for prefix in ("torsion","zero"))
    engine = load_engine()
    p = momentum(direction, radius)
    contorsion = engine.torsion_to_contorsion({"011": 1.0})
    zero_contorsion = np.zeros_like(contorsion)
    frame = np.zeros((4, 4))
    frame[1 if PROBE == "A" else 2, 1 if PROBE == "A" else 2] = 1.0

    q = np.asarray((q0, 0.0, 0.0, 0.0))
    combined = engine.hessian_sectors(
        p, -p, q, source_pair=False, p_source=contorsion,
        f_source=frame, f_source_momentum=-q,
    )
    torsion_linear = shared[0] if shared is not None else engine.hessian_sectors(
        p, -p-q, q, source_pair=False, include_torsion=True, p_source=contorsion,
    )
    frame_reverse = engine.hessian_sectors(
        p+q, -p, q, source_pair=False, include_torsion=True,
        p_source=zero_contorsion, f_source=frame,
        f_source_momentum=-q,
    )
    shifted_zero = shared[1] if shared is not None else engine.hessian_sectors(
        p+q, -p-q, q*0, source_pair=False,
        p_source=zero_contorsion,
    )
    primitive = (combined, torsion_linear, frame_reverse, shifted_zero)
    if cache_path is not None:
        cache_path.parent.mkdir(parents=True, exist_ok=True)
        payload = {}
        for prefix, sectors in zip(("combined","torsion","frame","zero"), primitive):
            for key, value in sectors.items():
                payload[f"{prefix}_{key}"] = value
        temporary = cache_path.with_suffix(".partial.npz")
        np.savez_compressed(temporary, **payload)
        temporary.replace(cache_path)
    return direction, radius, q0, primitive


def analyze(direction, radius, primitives):
    engine = load_engine()
    p = momentum(direction, radius)

    q3_values = []
    maximum_residual = 0.0
    for a1, bx, kappa in COUPLINGS:
        def vertex(sectors, order):
            return (
                bx * sectors[f"X{order}"]
                + a1/(4*kappa) * sectors[f"T{order}"]
                + sectors[f"E{order}"]/(2*kappa)
            )

        h2_values = [vertex(x[0], 2) for x in primitives]
        hk_values = [vertex(x[1], 1) for x in primitives]
        hf_values = [vertex(x[2], 1) for x in primitives]
        m_values = [engine.packet_h0(x[3], p+np.asarray((q,0,0,0)), a1, bx, kappa)
                    for q, x in zip((*Q_NODES, Q_CHECK), primitives)]

        h2 = polynomial_coefficients(Q_NODES, h2_values[:-1])
        hk = polynomial_coefficients(Q_NODES, hk_values[:-1])
        hf = polynomial_coefficients(Q_NODES, hf_values[:-1])
        m = polynomial_coefficients(Q_NODES, m_values[:-1])
        residuals = {}
        for label, coefficients, checked in (
            ("H2",h2,h2_values[-1]), ("HK",hk,hk_values[-1]),
            ("HF",hf,hf_values[-1]), ("M",m,m_values[-1]),
        ):
            predicted = sum(c * Q_CHECK**n for n, c in enumerate(coefficients))
            scale = max(1.0, float(np.max(np.abs(checked))))
            residuals[label] = float(np.max(np.abs(predicted-checked))) / scale
            maximum_residual = max(maximum_residual, residuals[label])

        base = engine.packet_h0(primitives[0][0], p, a1, bx, kappa)
        gp = np.linalg.inv(base)
        gs = [gp]
        for n in range(1, 4):
            gs.append(-gp @ sum(m[k] @ gs[n-k] for k in range(1, n+1)))

        seagull = .5 * np.trace(gp @ h2[3])
        bubble = -.5 * sum(
            np.trace(gp @ hk[i] @ gs[j] @ hf[k])
            for i in range(4) for j in range(4-i) for k in (3-i-j,)
        )
        q3_values.append(float((seagull+bubble).imag))

    if maximum_residual > 2e-8:
        raise AssertionError({"maximum":maximum_residual,"byMatrix":residuals})
    return direction, radius, q3_values, maximum_residual


def main():
    direction_count = int(os.environ.get("SPIN23_RT_DIRECTIONS", str(len(DIRECTIONS))))
    base_tasks = [(d, r) for d in range(direction_count) for r in RADII]
    tasks = [(d, r, q) for d, r in base_tasks for q in (*Q_NODES, Q_CHECK)]
    workers = int(os.environ.get("SPIN23_RT_WORKERS", "10"))
    with concurrent.futures.ProcessPoolExecutor(max_workers=workers) as pool:
        primitive_rows = list(pool.map(build_primitive, tasks))
    grouped = {(d,r):{} for d,r in base_tasks}
    for d, r, q, primitive in primitive_rows:
        grouped[(d,r)][q] = primitive
    rows = [analyze(d, r, [grouped[(d,r)][q] for q in (*Q_NODES,Q_CHECK)])
            for d, r in base_tasks]
    table = {(d, r): np.asarray(v) for d, r, v, _ in rows}
    z = 1/np.square(np.asarray(RADII))
    directional = np.zeros((direction_count, len(COUPLINGS)))
    for d in range(direction_count):
        values = np.asarray([table[(d, r)] for r in RADII])
        for c in range(len(COUPLINGS)):
            directional[d, c] = np.polynomial.polynomial.polyfit(z, values[:, c], 3)[2]
    averages = np.mean(directional, axis=0)
    result = {
        "probe": PROBE,
        "responseRow": [1,2] if PROBE == "A" else [0,2],
        "couplingOrder": [{"a1":a1,"B":bx} for a1,bx,_ in COUPLINGS],
        "maximumQPolynomialResidual": max(x[3] for x in rows),
        "angularAverages": averages.tolist(),
        "poleResponseCoefficients": (averages/(16*math.pi**2)).tolist(),
        "directionalQ3OverR4": directional.T.tolist(),
    }
    rendered = json.dumps(result, indent=2)
    output_path = os.environ.get("SPIN23_RT_OUTPUT")
    if output_path:
        destination = Path(output_path)
        destination.parent.mkdir(parents=True, exist_ok=True)
        temporary = destination.with_suffix(destination.suffix + ".partial")
        temporary.write_text(rendered + "\n", encoding="utf-8")
        temporary.replace(destination)
    print(rendered)


if __name__ == "__main__":
    main()
