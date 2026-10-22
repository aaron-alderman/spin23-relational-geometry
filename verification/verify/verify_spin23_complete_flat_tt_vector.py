#!/usr/bin/env python3
"""Exact rational closure of all nine flat derivative-torsion poles."""

from fractions import Fraction as F

M = [
    [6,-6,0,0,0,0,0,0,0],
    [6,-6,0,2,-2,2,-2,0,0],
    [2,1,1,1,0,2,1,1,0],
    [2,1,1,1,1,0,0,0,1],
    [2,0,0,1,0,0,0,0,0],
    [2,0,0,0,0,2,0,0,0],
    [2,1,1,0,0,0,0,0,0],
    [2,0,0,0,0,0,0,0,0],
    [4,2,0,1,0,2,1,0,0],
]

def h(a):
    return [
        F(18*a*a+3*a-7,4608),
        F(9*a*a+89*a+64,4608),
        -F(5*a*a+11*a+6,1536),
        -F(21*a*a+27*a+10,1152),
        -F(33*a*a+100*a+59,2304),
        F(3*a*a+42*a+31,4608),
        -F(3*a*a+78*a+59,2304),
        F(15*a*a+32*a+17,1152),
        -F(99*a*a+196*a+113,2304),
    ]

def expected(a):
    return [
        F(9*a*a-86*a-71,768),
        F(9*a*a+16*a+7,1152),
        F(3*a*a+5*a+2,2304),
        -F(159*a*a+319*a+176,2304),
        -F(8*a*a+17*a+9,768),
        F(7*a*a+15*a+8,768),
        F(15*a*a+31*a+16,2304),
        F(18*a*a+3*a-7,2304),
        F(3*a*a+5*a+2,2304),
    ]

for a in range(5):
    vector = h(a)
    reconstructed = [sum(F(mij)*hj for mij,hj in zip(row,vector)) for row in M]
    assert reconstructed == expected(a)

print("Spin(2,3) complete flat TT response vector: PASS")
for index, value in enumerate(h(2), 1):
    print(f"  hTT{index}(a1=2)={value}/(pi^2*epsilon)")
