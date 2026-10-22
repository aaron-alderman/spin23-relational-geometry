#!/usr/bin/env python3
"""Verify the saved t132 q^2/r^4 angular reconstruction and pole map."""

from __future__ import annotations

import math
import numpy as np


# Columns are x=n_0^2, y=n_3^2, followed by the Richardson-extrapolated
# coefficient of q^2/r^4.  The residual SO(2) acts in the 1--2 plane.
SAMPLES = np.array([
    [1.0, 0.0, 2.2273734500577276],
    [0.0, 0.0, 3.1180846493069487],
    [0.0, 1.0, 2.9097906474186312],
    [0.5, 0.0, -2.169218079260121],
    [0.5, 0.5, -1.898427745351811],
    [1.0 / 3.0, 0.0, -1.482775441327192],
    [0.0, 1.0 / 3.0, 3.048653594980223],
    [0.25, 0.25, -0.6944053672187461],
    [0.0, 0.5, 3.013937835348234],
    [1.0 / 3.0, 1.0 / 3.0, -1.3855733189073696],
    [0.2, 0.3, -0.1314229223090777],
])


def dirichlet_moment(a: int, b: int) -> float:
    """E[x^a y^b] for squared S^3 coordinates (Dirichlet(1/2)^4)."""
    return (
        math.gamma(0.5 + a) / math.gamma(0.5)
        * math.gamma(0.5 + b) / math.gamma(0.5)
        * math.gamma(2.0) / math.gamma(2.0 + a + b)
    )


def fit(max_degree: int):
    monomials = [(a, total - a) for total in range(max_degree + 1) for a in range(total + 1)]
    design = np.array([
        [x**a * y**b for a, b in monomials]
        for x, y in SAMPLES[:, :2]
    ])
    coefficients, *_ = np.linalg.lstsq(design, SAMPLES[:, 2], rcond=None)
    residual = design @ coefficients - SAMPLES[:, 2]
    average = sum(c * dirichlet_moment(a, b) for c, (a, b) in zip(coefficients, monomials))
    return monomials, coefficients, residual, average, np.linalg.matrix_rank(design)


quadratic = fit(2)
cubic = fit(3)

assert quadratic[4] == 6
assert cubic[4] == 10
assert np.max(np.abs(quadratic[2])) < 1.0e-5
assert np.max(np.abs(cubic[2])) < 2.0e-6
assert abs(quadratic[3] - cubic[3]) < 1.0e-6

angular_average = cubic[3]
y132 = angular_average / (16.0 * math.pi**2)
h_tt_1 = y132 / 2.0

assert abs(angular_average - 0.48484593477810095) < 1.0e-12
assert abs(h_tt_1 - 0.0015351613748716528) < 1.0e-12

print("Spin(2,3) t132 pole projection (superseded coarse level): PASS")
print(f"  quadratic/cubic maximum residuals: {np.max(np.abs(quadratic[2])):.3e}, {np.max(np.abs(cubic[2])):.3e}")
print(f"  S3 angular average: {angular_average:.15f}")
print(f"  y132 pole coefficient: {y132:.15f}/epsilon")
print(f"  hTT1 pole coefficient: {h_tt_1:.15f}/epsilon")
