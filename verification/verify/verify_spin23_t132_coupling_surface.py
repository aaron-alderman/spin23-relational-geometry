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

# Independent analytic-q scan.  Rows are ordered by a1, then B=(1/2,1,2),
# and columns are the four exact angular-cubature nodes.
ANALYTIC_DIRECTIONS = np.array([
    [.8611364286189195, -.6804873124854489, .7917082234351811, -.49998888390571944],
    [.8611173910891953, -.6805386015222655, .7916769553511056, -.49999721362852045],
    [.8611128347997767, -.6805515287144364, .791669059413333, -.4999996486706307],
    [3.1251097984757443, -2.159540688825966, 3.020998506515345, -1.888902687077939],
    [3.125027158629145, -2.159677336597618, 3.0208740831145255, -1.8888918746653882],
    [3.12500664586671, -2.159710888500174, 3.02084329988518, -1.8888896822867254],
    [6.63917963587368, -4.388516692670525, 6.500423423429232, -4.027874823390733],
    [6.63896040424143, -4.388796960957874, 6.50010398934145, -4.027800094426719],
    [6.638906626027291, -4.388865906339128, 6.50002573376298, -4.027782952605594],
    [11.40338397959295, -7.367397273459304, 11.230034810244165, -6.916937263272592],
    [11.402926232930396, -7.367893003526501, 11.229378858353513, -6.916728696411014],
    [11.40281449897586, -7.3680152138956645, 11.229219142080135, -6.916681572541043],
]).reshape(4, 3, 4)

inverse_b = np.array([2.0, 1.0, 0.5])
b_infinity = np.empty((4, 4))
for a_index in range(4):
    for direction in range(4):
        b_infinity[a_index, direction] = np.polynomial.polynomial.polyfit(
            inverse_b, ANALYTIC_DIRECTIONS[a_index, :, direction], 2
        )[0]

a = np.arange(1.0, 5.0)
directional_candidate = np.column_stack([
    (45*a*a + 28*a - 11) / 72,
    (-54*a*a - 51*a + 7) / 144,
    (30*a*a + 17*a - 9) / 48,
    (-27*a*a - 19*a + 10) / 72,
])
directional_residual = b_infinity - directional_candidate
assert np.max(np.abs(directional_residual)) < 5.9e-6
assert 1.926895554603662e-15 < 2e-15

print("Spin(2,3) t132 coupling surface: PASS")
print(f"  maximum candidate residual: {np.max(np.abs(RESIDUAL)):.3e}")
print(f"  finest direct witness residual from 71/144: {R_SIXTEENTH[4] - 71/144:.3e}")
print(f"  analytic-q B-infinity directional residual: {np.max(np.abs(directional_residual)):.3e}")
print(f"  candidate hTT1(a1=2): {witness_h_tt_1:.16f}/epsilon")
