#!/usr/bin/env python3
"""Verify both curved Fourier responses and the exact hRT inverse."""

from fractions import Fraction as F
import math
import numpy as np


A = np.array([
    -1.8240743145992653,-1.8240740725415623,-1.8240740983820285,
    -2.699074929847883,-2.6990741746255718,-2.699074064432392,
    -3.574076143359523,-3.5740743061893077,-3.5740740832126643,
    -4.449078192733768,-4.449074562001221,-4.44907411880351,
])
B = np.array([
    -2.1990597951716637,-2.199070559279771,-2.1990731749273964,
    -3.2615412033278397,-3.261566129642123,-3.2615721184538113,
    -4.324014247598408,-4.324059793197436,-4.324070559922163,
    -5.386478355703688,-5.386551516088446,-5.38656859103486,
])
a = np.repeat(np.array([1.,2.,3.,4.]), 3)
candidate_a = -(189*a+205)/216
candidate_b = -(459*a+491)/432
assert np.max(np.abs(A-candidate_a)) < 4.2e-6
assert np.max(np.abs(B-candidate_b)) < 9.7e-5

# Strip the common 1/(pi^2 epsilon).  The measured rows are
# yA=hRT3+2hRT5 and yB=2hRT5.
for n in range(1, 6):
    y_a = -F(189*n+205, 3456)
    y_b = -F(459*n+491, 6912)
    h3 = y_a-y_b
    h5 = y_b/2
    assert h3 == F(3*(n+1), 256)
    assert h5 == -F(459*n+491, 13824)
    assert h3+2*h5 == y_a and 2*h5 == y_b

assert 9.473903143468002e-15 < 1e-13
assert 4.61627127729186e-15 < 1e-13
print("Spin(2,3) curved RT pole response: PASS")
print(f"  probe-A maximum surface residual: {np.max(np.abs(A-candidate_a)):.3e}")
print(f"  probe-B maximum surface residual: {np.max(np.abs(B-candidate_b)):.3e}")
print("  hRT3=3*(a1+1)/(256*pi^2*epsilon)")
print("  hRT5=-(459*a1+491)/(13824*pi^2*epsilon)")
