#!/usr/bin/env python3
"""Verify t011 and the extracted hTT9 pole."""
import math
import numpy as np
A=np.repeat(np.array([1.,2.,3.,4.]),3)
V=np.array([-4.541630615740821,-4.54165776442858,-4.541664474276518,-10.069363731512109,-10.0694246266974,-10.069439557920054,-17.805412882238127,-17.805520703353746,-17.80554692830671,-27.749778522130374,-27.74994618456523,-27.74998674871347])
C=-(159*A*A+319*A+176)/144
assert np.max(np.abs(V-C)) < 2.3e-4
h1=(18*A*A+3*A-7)/(4608*math.pi**2)
s23=(-3*A*A+28*A+23)/(2304*math.pi**2)
h4=-(21*A*A+27*A+10)/(1152*math.pi**2)
h9=C/(16*math.pi**2)-2*h1-s23-h4
candidate=-(33*A*A+74*A+43)/(576*math.pi**2)
assert np.max(np.abs(h9-candidate)) < 1e-15
print("Spin(2,3) t011 response: PASS")
print(f"  maximum rational-surface residual: {np.max(np.abs(V-C)):.3e}")
print("  hTT9=-(33*a1^2+74*a1+43)/(576*pi^2*epsilon)")
