#!/usr/bin/env python3
"""Verify the mixed t001+t122 response."""
import math
import numpy as np
A=np.repeat(np.array([1.,2.,3.,4.]),3)
V=np.array([.0695240737436093,.06946401654810601,.06944946444506062,.16684314071333797,.16670978792760874,.16667735127362374,.305864123710486,.30563039910478906,.30557402340253165,.4865845432892888,.4862251706205833,.48613905100259736])
C=(3*A*A+5*A+2)/144
assert np.max(np.abs(V-C)) < 4.8e-4
h1=(18*A*A+3*A-7)/(4608*math.pi**2)
h4=-(21*A*A+27*A+10)/(1152*math.pi**2)
h6=(3*A*A+42*A+31)/(4608*math.pi**2)
combo=C/(16*math.pi**2)-4*h1-h4-2*h6
candidate=(6*A*A+11*A+5)/(2304*math.pi**2)
assert np.max(np.abs(combo-candidate)) < 1e-15
print("Spin(2,3) t001+t122 response: PASS")
print(f"  maximum rational-surface residual: {np.max(np.abs(V-C)):.3e}")
print("  2*hTT2+hTT7=(6*a1^2+11*a1+5)/(2304*pi^2*epsilon)")
