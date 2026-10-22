#!/usr/bin/env python3
"""Verify the analytic-q t102 surface and extracted hTT6 pole."""

import math
import numpy as np

A1=np.repeat(np.array([1.,2.,3.,4.]),3)
AVERAGES=np.array([
 .625010409668943,.6250025704195209,.6250006589699909,
 1.375011336713085,1.375002858349345,1.3750007532564303,
 2.416664335357149,2.416666380674909,2.4166666570999182,
 3.74995959602982,3.74999099659599,3.749997866555738])
CANDIDATE=(7*A1*A1+15*A1+8)/48
assert np.max(np.abs(AVERAGES-CANDIDATE)) < 4.1e-5
h1=(18*A1*A1+3*A1-7)/(4608*math.pi**2)
h6=CANDIDATE/(32*math.pi**2)-h1
h6_candidate=(3*A1*A1+42*A1+31)/(4608*math.pi**2)
assert np.max(np.abs(h6-h6_candidate)) < 1e-15
print("Spin(2,3) t102 response: PASS")
print(f"  maximum rational-surface residual: {np.max(np.abs(AVERAGES-CANDIDATE)):.3e}")
print("  hTT6=(3*a1^2+42*a1+31)/(4608*pi^2*epsilon)")
