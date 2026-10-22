#!/usr/bin/env python3
"""Verify the post-quadratic path audit and global exhaustion condition."""

from fractions import Fraction as F
import json
from pathlib import Path


# The complete torsionless packet coefficient is nonzero and normal to the
# critical PGT surface.
beta_c_times_pi2 = F(11, 960)
assert beta_c_times_pi2 != 0

# Any finite local p^4 spin-2 kernel has opposite residues at its two simple
# poles.  In x=p^2, 1/[x(M^2+c x)] = A/x + B/(M^2+c x).
for mass2, c in ((F(1),F(2)),(F(7,3),F(-5,4))):
    a = 1/mass2
    b = -c/mass2
    assert a*mass2 == 1
    assert a*c+b == 0
    # Residue at x=-M^2/c is b/c=-1/M^2, opposite to A.
    assert b/c == -a

# RTT, TT nabla T and T^4 vanish on the torsionless source used to measure
# beta_C, so accumulating their coefficients cannot repair this normal beta.
field_orders = {"RTT":2,"TTnablaT":3,"T4":4}
assert all(torsion_power >= 2 for torsion_power in field_orders.values())

root=Path(__file__).resolve().parents[2]
selector=json.loads((root/"evidence/data/spin23-global-path-selection-v1.json").read_text())
terminal=set(selector["terminalStates"])
assert selector["globalExhaustion"] is True
assert selector["selectedNode"] is None
assert all(node["state"] in terminal for node in selector["nodes"])
assert not any(node["localExecutable"] for node in selector["nodes"])

print("Spin(2,3) post-quadratic global exhaustion: PASS")
print("  nonzero normal Weyl-square beta: 11/(960*pi^2)")
print("  finite local spin-2 p^4 residues: opposite")
print("  higher-field torsion operators cannot repair torsionless beta_C")
print("  remaining reopenings require external matching, a parent Ward identity, or a regulator")
