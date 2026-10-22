#!/usr/bin/env python3
"""Verify t112 and the extracted hTT2+hTT3 pole."""
import math
import numpy as np
A=np.repeat(np.array([1.,2.,3.,4.]),3)
V=np.array([.43055942263566127,.43055650301083187,.43055570167541984,.9583393998757795,.9583348394746541,.958333754646136,1.694450331772514,1.6944459348251757,1.6944448420119607,2.6388900868143286,2.6388893400753637,2.638889005345451])
C=(15*A*A+31*A+16)/144
assert np.max(np.abs(V-C)) < 6.1e-6
h1=(18*A*A+3*A-7)/(4608*math.pi**2)
s23=C/(16*math.pi**2)-2*h1
candidate=(-3*A*A+28*A+23)/(2304*math.pi**2)
assert np.max(np.abs(s23-candidate)) < 1e-15
print("Spin(2,3) t112 response: PASS")
print(f"  maximum rational-surface residual: {np.max(np.abs(V-C)):.3e}")
print("  hTT2+hTT3=(-3*a1^2+28*a1+23)/(2304*pi^2*epsilon)")
