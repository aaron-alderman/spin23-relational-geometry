import math
import numpy as np
from fractions import Fraction

g2A = g2B = Fraction(1, 11)
g2Bp = Fraction(1, 3)
g2C = Fraction(1, 8)
g2Cp = Fraction(1, 4)


def spectrum(u):
    a, d, e = map(float, (g2A, g2B, g2Bp))
    b, c, r = 0.25 + u, 0.25 - u, 0.75 - u
    M = np.array([
        [a*u, -math.sqrt(a*d)*u, 0.0],
        [-math.sqrt(a*d)*u, d*(u+b+r), -math.sqrt(d*e)*b],
        [0.0, -math.sqrt(d*e)*b, e*b]
    ])
    weak = np.linalg.eigvalsh(M)
    color = c * float(g2C + g2Cp)
    return np.concatenate([np.repeat(weak, 3), np.repeat(color, 8)])


def tr_m4(u):
    masses = spectrum(u)
    return float(np.dot(masses, masses))


def cw(u, mu2):
    masses = spectrum(u)
    return sum(m*m*(math.log(m/mu2)-5/6) for m in masses if m > 1e-14)


grid = np.linspace(0, 0.25, 10001)
mref = max(spectrum(0.0))
print("PROTOCOL spin23-flat-gauge-cw-toy/1")
print("PARENT_G2", g2A, g2B, g2Bp, g2C, g2Cp)
print("TRM4_QUADRATIC", "A=5051/2904", "B=-1483/5808", "UMIN=1483/20204")
print("TRM4_GRID_MIN", grid[np.argmin([tr_m4(u) for u in grid])])
print("REFERENCE_M2", mref)
for factor in (0.1, 0.3, 1.0, 3.0, 10.0):
    mu2 = factor*mref
    values = [cw(u, mu2) for u in grid]
    index = int(np.argmin(values))
    print("CW_MIN", factor, grid[index], values[index], "DELTA_ENDPOINT", values[-1]-values[0])
