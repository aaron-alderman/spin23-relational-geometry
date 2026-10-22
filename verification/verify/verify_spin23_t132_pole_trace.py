#!/usr/bin/env python3
"""Vectorized Fourier-jet engine for the critical-packet t132 trace."""

from __future__ import annotations

import itertools
import os
import numpy as np

N = 34
ZERO_MOMENTUM = (0.0, 0.0, 0.0, 0.0)


class Jet:
    __slots__ = ("v", "x", "y", "xy")

    def __init__(self):
        self.v = np.zeros(3, dtype=complex)
        self.x = np.zeros((3, N), dtype=complex)
        self.y = np.zeros((3, N), dtype=complex)
        self.xy = np.zeros((3, N, N), dtype=complex)

    def copy(self):
        out = Jet()
        out.v[:] = self.v
        out.x[:] = self.x
        out.y[:] = self.y
        out.xy[:] = self.xy
        return out


def jscale(a: Jet, c: complex) -> Jet:
    out = Jet()
    out.v = c * a.v
    out.x = c * a.x
    out.y = c * a.y
    out.xy = c * a.xy
    return out


def jadd(a: Jet, b: Jet) -> Jet:
    out = Jet()
    out.v = a.v + b.v
    out.x = a.x + b.x
    out.y = a.y + b.y
    out.xy = a.xy + b.xy
    return out


def jmul(a: Jet, b: Jet) -> Jet:
    out = Jet()
    for i in range(3):
        for j in range(3 - i):
            t = i + j
            out.v[t] += a.v[i] * b.v[j]
            out.x[t] += a.x[i] * b.v[j] + a.v[i] * b.x[j]
            out.y[t] += a.y[i] * b.v[j] + a.v[i] * b.y[j]
            out.xy[t] += a.xy[i] * b.v[j] + a.v[i] * b.xy[j]
            out.xy[t] += np.outer(a.x[i], b.y[j]) + np.outer(b.x[j], a.y[i])
    return out


Poly = dict[tuple[float, float, float, float], Jet]


def pclean(p: Poly) -> Poly:
    return {m: j for m, j in p.items() if np.any(j.v) or np.any(j.x) or np.any(j.y) or np.any(j.xy)}


def padd(*ps: Poly) -> Poly:
    out: Poly = {}
    for p in ps:
        for m, j in p.items():
            out[m] = j.copy() if m not in out else jadd(out[m], j)
    return pclean(out)


def pscale(p: Poly, c: complex) -> Poly:
    return pclean({m: jscale(v, c) for m, v in p.items()})


def pmul(a: Poly, b: Poly) -> Poly:
    out: Poly = {}
    for ma, ja in a.items():
        for mb, jb in b.items():
            m = tuple(round(ma[i] + mb[i], 12) for i in range(4))
            z = jmul(ja, jb)
            out[m] = z if m not in out else jadd(out[m], z)
    return pclean(out)


def pderiv(p: Poly, mu: int) -> Poly:
    return pclean({m: jscale(j, 1j * m[mu]) for m, j in p.items()})


def constant(value: complex = 0.0) -> Poly:
    if value == 0:
        return {}
    j = Jet()
    j.v[0] = value
    return {ZERO_MOMENTUM: j}


def source(value: complex, momentum, *, conjugate=False) -> Poly:
    out: Poly = {}
    reflected = tuple(-x for x in momentum)
    modes = [(momentum, np.sqrt(2) if conjugate and tuple(momentum) == reflected else 1)] if conjugate and tuple(momentum) == reflected else [(m, 1) for m in ([momentum, reflected] if conjugate else [momentum])]
    for m, multiplicity in modes:
        j = Jet()
        j.v[1] = multiplicity * value
        key = tuple(float(x) for x in m)
        out[key] = j if key not in out else jadd(out[key], j)
    return out


def quantum(value: complex, momentum, index: int, leg: str) -> Poly:
    if value == 0:
        return {}
    j = Jet()
    (j.x if leg == "x" else j.y)[0, index] = value
    return {tuple(float(x) for x in momentum): j}


def eps(a, b, c, d):
    x = [a, b, c, d]
    if len(set(x)) < 4:
        return 0
    inversions = sum(x[i] > x[j] for i in range(4) for j in range(i + 1, 4))
    return -1 if inversions % 2 else 1


F_DIRS = []
for a in range(4):
    for b in range(a, 4):
        f = np.zeros((4, 4))
        f[a, b] = f[b, a] = 1
        F_DIRS.append(f)

PAIRS = [(a, b) for a in range(4) for b in range(a + 1, 4)]
K_DIRS = []
for mu in range(4):
    for a, b in PAIRS:
        k = np.zeros((4, 4, 4))
        k[mu, a, b], k[mu, b, a] = 1, -1
        K_DIRS.append(k)

def torsion_to_contorsion(entries):
    """Map response torsion T_abc=-T_cba to packet K_a[bc]."""
    torsion = np.zeros((4, 4, 4))
    for label, value in entries.items():
        a, b, c = map(int, label)
        torsion[a, b, c] += value
        torsion[c, b, a] -= value
    contorsion = np.zeros((4, 4, 4))
    for a, b, c in itertools.product(range(4), repeat=3):
        contorsion[a, b, c] = (
            torsion[a, b, c] + torsion[b, c, a] - torsion[c, a, b]
        ) / 2.0
    return contorsion


P_SOURCE = torsion_to_contorsion({"132": 1.0})


def z2():
    return [[{} for _ in range(4)] for _ in range(4)]


def z3():
    return [[[{} for _ in range(4)] for _ in range(4)] for _ in range(4)]


def hessian_sectors(p, pp, q, *, source_pair, include_torsion=True, p_source=P_SOURCE,
                    f_source=None, f_source_momentum=None):
    """Return source-graded Hessian sectors.

    ``p_source`` is an independent contorsion wave at momentum ``q``.  The
    optional symmetric ``f_source`` is a coframe wave; its matching linear
    Levi-Civita connection is inserted automatically, so it changes the
    metric/curvature without introducing spurious torsion.  Supplying the
    two waves at opposite momenta makes the tau=2, zero-momentum coefficient
    their mixed curved response.
    """
    if f_source is None:
        f_source = np.zeros((4, 4))
    else:
        f_source = np.asarray(f_source, dtype=float)
    if f_source_momentum is None:
        f_source_momentum = np.asarray(q, dtype=float)
    else:
        f_source_momentum = np.asarray(f_source_momentum, dtype=float)

    f = z2()
    for a in range(4):
        for b in range(4):
            terms = []
            if f_source[a, b] != 0:
                terms.append(source(f_source[a, b], f_source_momentum))
            for i, direction in enumerate(F_DIRS):
                terms += [quantum(direction[a, b], p, i, "x"), quantum(direction[a, b], pp, i, "y")]
            f[a][b] = padd(*terms)

    e, ei = z2(), z2()
    for a in range(4):
        for r in range(4):
            f2 = {}
            for s in range(4):
                f2 = padd(f2, pmul(f[a][s], f[s][r]))
            e[a][r] = padd(constant(1 if a == r else 0), f[a][r], pscale(f2, .5))
            ei[a][r] = padd(constant(1 if a == r else 0), pscale(f[a][r], -1), pscale(f2, .5))

    tr = {}
    for a in range(4):
        tr = padd(tr, f[a][a])
    det = padd(constant(1), tr, pscale(pmul(tr, tr), .5))
    invdet = padd(constant(1), pscale(tr, -1), pscale(pmul(tr, tr), .5))

    K = z3()
    for mu, a, b in itertools.product(range(4), repeat=3):
        terms = [source(p_source[mu, a, b], q, conjugate=source_pair)]
        # For a symmetric exponential coframe wave f_ab(r), the linear
        # torsion-free spin connection is
        #   omega_{mu ab}=i(r_b f_{a mu}-r_a f_{b mu}).
        # It cancels de in T^a=de^a+omega^a_b wedge e^b.
        lc = 1j * (
            f_source_momentum[b] * f_source[a, mu]
            - f_source_momentum[a] * f_source[b, mu]
        )
        if lc != 0:
            terms.append(source(lc, f_source_momentum))
        for i, direction in enumerate(K_DIRS, start=10):
            terms += [quantum(direction[mu, a, b], p, i, "x"), quantum(direction[mu, a, b], pp, i, "y")]
        K[mu][a][b] = padd(*terms)

    torsion_action = {}
    if include_torsion:
        tor = z3()
        for c, m, n in itertools.product(range(4), repeat=3):
            value = padd(pderiv(e[c][n], m), pscale(pderiv(e[c][m], n), -1))
            for b in range(4):
                value = padd(value, pmul(K[m][c][b], e[b][n]), pscale(pmul(K[n][c][b], e[b][m]), -1))
            tor[c][m][n] = value
        U = z3()
        for a, b, c in itertools.product(range(4), repeat=3):
            value = {}
            for m, n in itertools.product(range(4), repeat=2):
                value = padd(value, pmul(pmul(ei[a][m], ei[b][n]), tor[c][m][n]))
            U[a][b][c] = value
        v, axial = [{} for _ in range(4)], [{} for _ in range(4)]
        for b in range(4):
            for a in range(4):
                v[b] = padd(v[b], U[a][b][a])
        for d in range(4):
            for a, b, c in itertools.product(range(4), repeat=3):
                if eps(d, a, b, c):
                    axial[d] = padd(axial[d], pscale(U[a][b][c], eps(d, a, b, c) / 6))
        nV = nA = nQ = {}
        for a, b, c in itertools.product(range(4), repeat=3):
            V = pscale(padd(v[b] if a == c else {}, pscale(v[a] if b == c else {}, -1)), 1 / 3)
            A = {}
            for d in range(4):
                if eps(a, b, c, d):
                    A = padd(A, pscale(axial[d], -eps(a, b, c, d)))
            Q = padd(U[a][b][c], pscale(V, -1), pscale(A, -1))
            nV, nA, nQ = padd(nV, pmul(V, V)), padd(nA, pmul(A, A)), padd(nQ, pmul(Q, Q))
        torsion_action = pmul(det, padd(nQ, pscale(nV, -2), pscale(nA, -.5)))

    xhat = eh = {}
    for m, n, a, b in itertools.product(range(4), repeat=4):
        R = padd(pderiv(K[n][a][b], m), pscale(pderiv(K[m][a][b], n), -1))
        for c in range(4):
            R = padd(R, pmul(K[m][a][c], K[n][c][b]), pscale(pmul(K[n][a][c], K[m][c][b]), -1))
        eh = padd(eh, pmul(pmul(pmul(det, ei[a][m]), ei[b][n]), R))
        for r, s in itertools.product(range(4), repeat=2):
            if eps(m, n, r, s):
                xhat = padd(xhat, pscale(pmul(pmul(R, e[a][r]), e[b][s]), eps(m, n, r, s) / 2))
    x_action = pscale(pmul(pmul(xhat, xhat), invdet), .5)

    def extract(poly, tau):
        jet = poly.get(ZERO_MOMENTUM)
        return np.zeros((N, N), dtype=complex) if jet is None else jet.xy[tau]

    return {"X0": extract(x_action, 0), "T0": extract(torsion_action, 0), "E0": extract(eh, 0),
            "X1": extract(x_action, 1), "T1": extract(torsion_action, 1), "E1": extract(eh, 1),
            "X2": extract(x_action, 2), "T2": extract(torsion_action, 2), "E2": extract(eh, 2)}


def gauge_hessian(p, kappa=1.0):
    L = np.zeros((4, 10))
    z = 0
    for a in range(4):
        for b in range(a, 4):
            for mu in range(4):
                if mu == a:
                    L[mu, z] += 2 * p[b]
                if b != a and mu == b:
                    L[mu, z] += 2 * p[a]
                if a == b:
                    L[mu, z] -= p[mu]
            z += 1
    out = np.zeros((N, N), dtype=complex)
    out[:10, :10] = -(L.T @ L) / (2 * kappa)
    return out


def packet_h0(sectors, p, a1=2.0, bx=1.0, kappa=1.0):
    return bx * sectors["X0"] + a1 / (4 * kappa) * sectors["T0"] + sectors["E0"] / (2 * kappa) + gauge_hessian(p, kappa)


def calculate_traces(p=(2, 3, 5, 7), q=(1, 0, 0, 0), couplings=((2.0, 1.0, 1.0),)):
    p, q = np.asarray(p, float), np.asarray(q, float)
    linear = hessian_sectors(p, -p - q, q, source_pair=False, include_torsion=False)
    reverse = hessian_sectors(p + q, -p, -q, source_pair=False, include_torsion=False)
    quadratic = hessian_sectors(p, -p, q, source_pair=True)
    zero_q = hessian_sectors(p + q, -p - q, q * 0, source_pair=False)
    results = []
    for a1, bx, kappa in couplings:
        g = (a1 + 1) / (2 * kappa)
        h1 = bx * linear["X1"] + g * linear["E1"]
        h1r = bx * reverse["X1"] + g * reverse["E1"]
        h2 = bx * quadratic["X2"] + g * quadratic["E2"]
        Gp = np.linalg.inv(packet_h0(quadratic, p, a1, bx, kappa))
        Gq = np.linalg.inv(packet_h0(zero_q, p + q, a1, bx, kappa))
        seagull = .5 * np.trace(Gp @ h2)
        bubble = -.25 * np.trace(Gp @ h1 @ Gq @ h1r)
        results.append({"seagull": seagull, "bubble": bubble, "total": seagull + bubble,
                        "rankH1": np.linalg.matrix_rank(h1), "rankH2": np.linalg.matrix_rank(h2),
                        "reverseResidual": np.max(np.abs(h1r - h1.T.conj()))})
    return results


def calculate_trace(p=(2, 3, 5, 7), q=(1, 0, 0, 0), a1=2.0, bx=1.0, kappa=1.0):
    return calculate_traces(p, q, ((a1, bx, kappa),))[0]


if __name__ == "__main__":
    p = tuple(map(float, os.environ.get("SPIN23_TRACE_P", "2,3,5,7").split(",")))
    q0 = float(os.environ.get("SPIN23_TRACE_Q", "1"))
    a1 = float(os.environ.get("SPIN23_TRACE_A1", "2"))
    bx = float(os.environ.get("SPIN23_TRACE_BX", "1"))
    kappa = float(os.environ.get("SPIN23_TRACE_KAPPA", "1"))
    if len(p) != 4:
        raise ValueError("SPIN23_TRACE_P must contain four comma-separated numbers")
    coupling_text = os.environ.get("SPIN23_TRACE_COUPLINGS")
    couplings = (
        [tuple(map(float, item.split(","))) for item in coupling_text.split(";")]
        if coupling_text else [(a1, bx, kappa)]
    )
    if any(len(c) != 3 for c in couplings):
        raise ValueError("SPIN23_TRACE_COUPLINGS entries must be a1,bX,kappa triples")
    results = calculate_traces(p=p, q=(q0, 0, 0, 0), couplings=couplings)
    result = results[0]
    assert os.environ.get("SPIN23_TRACE_P") is not None or (result["rankH1"] == 30 and result["rankH2"] == 7)
    assert all(r["reverseResidual"] < 1e-10 for r in results)
    assert all(np.isfinite(r["total"]) for r in results)
    if os.environ.get("SPIN23_TRACE_COMPACT") == "1":
        print(";".join(f"{row['total'].real:.17g}" for row in results))
        raise SystemExit(0)
    print("Spin(2,3) vectorized t132 Fourier trace: PASS")
    print(f"  H1/H2 ranks: {result['rankH1']}, {result['rankH2']}")
    print(f"  reverse-vertex Hermiticity residual: {result['reverseResidual']:.3e}")
    print(f"  seagull={result['seagull']}; bubble={result['bubble']}; total={result['total']}")
    for coupling, row in zip(couplings[1:], results[1:]):
        print(f"  coupling={coupling}; seagull={row['seagull']}; bubble={row['bubble']}; total={row['total']}")
