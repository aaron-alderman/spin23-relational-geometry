#!/usr/bin/env python3
"""Verify the complete quadratic running envelope and EFT scales."""

from fractions import Fraction as F
import math


def coefficients(a):
    return {
        "cC": F(11,960),
        "cR": F(5,576),
        "hTT1": F(18*a*a+3*a-7,4608),
        "hTT2": F(9*a*a+89*a+64,4608),
        "hTT3": -F(5*a*a+11*a+6,1536),
        "hTT4": -F(21*a*a+27*a+10,1152),
        "hTT5": -F(33*a*a+100*a+59,2304),
        "hTT6": F(3*a*a+42*a+31,4608),
        "hTT7": -F(3*a*a+78*a+59,2304),
        "hTT8": F(15*a*a+32*a+17,1152),
        "hTT9": -F(99*a*a+196*a+113,2304),
        "hRT3": F(3*(a+1),256),
        "hRT5": -F(459*a+491,13824),
    }


samples = {
    1:(0.01794229293666398,7.4655365927652095),
    2:(0.03962256356846629,5.023758043893513),
    3:(0.070010123419532,3.7793714530952145),
    4:(0.10910497248986112,3.0274552189628547),
}
for a,(expected_beta,expected_scale) in samples.items():
    values=coefficients(a)
    largest=max(values,key=lambda key:abs(values[key]))
    assert largest == "hTT9"
    exact=F(99*a*a+196*a+113,2304)
    assert abs(values[largest]) == exact
    beta=float(exact)/math.pi**2
    scale=1/math.sqrt(beta)
    assert abs(beta-expected_beta)<1e-15
    assert abs(scale-expected_scale)<1e-12

# For all a>=0, hTT9 dominates coefficient-by-coefficient.  If every
# coefficient of target +/- candidate is nonnegative, target>=|candidate|
# on the nonnegative half-line.
raw_polynomials = {
    "cC":(0,0,F(11,960)), "cR":(0,0,F(5,576)),
    "hTT1":(F(18,4608),F(3,4608),F(-7,4608)),
    "hTT2":(F(9,4608),F(89,4608),F(64,4608)),
    "hTT3":(-F(5,1536),-F(11,1536),-F(6,1536)),
    "hTT4":(-F(21,1152),-F(27,1152),-F(10,1152)),
    "hTT5":(-F(33,2304),-F(100,2304),-F(59,2304)),
    "hTT6":(F(3,4608),F(42,4608),F(31,4608)),
    "hTT7":(-F(3,2304),-F(78,2304),-F(59,2304)),
    "hTT8":(F(15,1152),F(32,1152),F(17,1152)),
    "hRT3":(0,F(3,256),F(3,256)),
    "hRT5":(0,-F(459,13824),-F(491,13824)),
}
target=(F(99,2304),F(196,2304),F(113,2304))
for polynomial in raw_polynomials.values():
    assert all(t-p >= 0 for t,p in zip(target,polynomial))
    assert all(t+p >= 0 for t,p in zip(target,polynomial))

strict_ten_percent_a4=math.sqrt(0.1/samples[4][0])
assert abs(strict_ten_percent_a4-0.9573654006086405)<1e-12

print("Spin(2,3) torsion-inclusive EFT envelope: PASS")
print("  dominant quadratic coefficient for a1>=0: |hTT9|")
print("  a1=2: beta_max=901/(2304*pi^2), Lambda_turn=5.02376 M_Pl")
print("  a1=4: strict 10% one-log cutoff=0.95737 M_Pl")
