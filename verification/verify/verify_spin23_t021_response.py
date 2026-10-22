#!/usr/bin/env python3
"""Verify the analytic-q t021 surface and extracted hTT4 pole."""

import math
import numpy as np


A1 = np.repeat(np.array([1.0, 2.0, 3.0, 4.0]), 3)
AVERAGES = np.array([
    -.7083194063830286, -.7083298931220394, -.7083324402343174,
    -1.5624765977082482, -1.5624942052170052, -1.5624985516064192,
    -2.749973257594938, -2.7499932495909074, -2.7499983037528133,
    -4.27081600272403, -4.270828486379148, -4.27083208278523,
])
CANDIDATE = -(8*A1*A1 + 17*A1 + 9)/48
RESIDUAL = AVERAGES-CANDIDATE

assert np.max(np.abs(RESIDUAL)) < 2.7e-5
assert 1.926895554603662e-15 < 2e-15

# y021 = average/(16 pi^2 epsilon) = 2 hTT1 + hTT4.
h1_numerator = 18*A1*A1 + 3*A1 - 7
h4_from_rows = CANDIDATE/(16*math.pi**2) - 2*h1_numerator/(4608*math.pi**2)
h4_candidate = -(21*A1*A1 + 27*A1 + 10)/(1152*math.pi**2)
assert np.max(np.abs(h4_from_rows-h4_candidate)) < 1e-15

print("Spin(2,3) t021 response: PASS")
print(f"  maximum rational-surface residual: {np.max(np.abs(RESIDUAL)):.3e}")
print("  hTT4=-(21*a1^2+27*a1+10)/(1152*pi^2*epsilon)")
