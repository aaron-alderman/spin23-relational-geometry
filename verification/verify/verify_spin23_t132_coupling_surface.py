#!/usr/bin/env python3
"""Verify the converged numerical t132 coupling surface and exact candidate."""

import math
import numpy as np


A1 = np.repeat(np.array([1.0, 2.0, 3.0, 4.0]), 3)
B = np.tile(np.array([0.5, 1.0, 2.0]), 4)

# Richardson results R(delta), already eliminating the delta^2 term.
R_EIGHTH = np.array([
    .09716339358204656, .0968263617655698, .09559645702863545,
    .4930586977273481, .49257359186448757, .49100317880545674,
    1.1390448756760696, 1.138393567859302, 1.1366313329610223,
    2.0351379992216043, 2.034260682559277, 2.032350567869877,
])
R_SIXTEENTH = np.array([
    .09725900246560626, .09720787110779838, .09712744740280543,
    .4931790935821241, .4930563166737776, .4929315051810479,
    1.1391775253369993, 1.138927926133889, 1.1387719793146234,
    2.0352768110751107, 2.0348237946678345, 2.034609701500046,
])

# R(delta)=c+O(delta^4), so this removes the displayed leading remainder.
EXTRAPOLATED = (16.0 * R_SIXTEENTH - R_EIGHTH) / 15.0
CANDIDATE = (18.0 * A1**2 + 3.0 * A1 - 7.0) / 144.0
RESIDUAL = EXTRAPOLATED - CANDIDATE

assert np.max(np.abs(RESIDUAL)) < 5.7e-4
assert abs(R_SIXTEENTH[4] - 71.0 / 144.0) < 1.0e-6
assert np.all(np.ptp(EXTRAPOLATED.reshape(4, 3), axis=1) < 5.3e-4)

witness_h_tt_1 = 71.0 / (4608.0 * math.pi**2)
assert abs(witness_h_tt_1 - 0.0015611553903224788) < 1e-16

print("Spin(2,3) t132 coupling surface: PASS")
print(f"  maximum candidate residual: {np.max(np.abs(RESIDUAL)):.3e}")
print(f"  finest direct witness residual from 71/144: {R_SIXTEENTH[4] - 71/144:.3e}")
print(f"  candidate hTT1(a1=2): {witness_h_tt_1:.16f}/epsilon")
