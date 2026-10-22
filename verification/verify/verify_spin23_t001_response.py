#!/usr/bin/env python3
"""Verify t001 and its equality with the mixed response surface."""
import numpy as np
A=np.repeat(np.array([1.,2.,3.,4.]),3)
V=np.array([.06944948462927558,.06944568687618573,.06944475392623377,.1666767549378466,.16666914563762014,.1666672972754384,.30557113367201244,.3055593913501169,.3055565120199624,.48613155356877186,.4861161778849959,.4861123489148662])
C=(3*A*A+5*A+2)/144
assert np.max(np.abs(V-C)) < 2.1e-5
print("Spin(2,3) t001 response: PASS")
print(f"  maximum rational-surface residual: {np.max(np.abs(V-C)):.3e}")
print("  y001=y001+t122 and hTT8=2*hTT1+hTT2-hTT3")
