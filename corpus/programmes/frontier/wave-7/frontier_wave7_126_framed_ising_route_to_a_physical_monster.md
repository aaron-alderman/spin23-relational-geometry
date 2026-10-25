# Frontier Wave 7.126: The Framed-Ising Route to a Physical Monster

**Date:** 25 October 2026

**Status:** exact mathematical sufficiency route; microscopic physical realization open

**Evidence:** [framed-Ising gate record](../../../../evidence/data/monster-framed-ising-physical-realization-gates-v1.json)

**Certificate:** [central-charge/permutation verifier](../../../../verification/verify/verify_monster_framed_ising_physical_realization_gates.mjs)

## Result

There is a much stronger target than matching isolated Moonshine numbers. The
Moonshine VOA has a Virasoro frame of 48 commuting Ising VOAs, each with
\(c=1/2\). More importantly, a characterization theorem says that a framed,
holomorphic VOA of central charge 24 with \(V_1=0\) is isomorphic to
\(V^\natural\). Thus the physical proof can be reduced to three structural
measurements plus a locality construction:

\[
 \boxed{\text{framed}+\text{holomorphic}+c=24+V_1=0
 \quad\Longrightarrow\quad V\cong V^\natural.}
\]

This is not a heuristic E8/Monster resemblance. It is an exact sufficient
condition, provided the scaling limit is genuinely a framed VOA.

## 1. Why 48 Ising components matter

Forty-eight critical Ising chiral sectors have total central charge 24. Their
bare tensor product is not the Monster: the Moonshine theory is a particular
code-controlled extension with a specific set of allowed \(0,1/2,1/16\)
sector words. The physical operation corresponding to that extension is a
correlated projection/gauging and completion by twisted sectors. Merely tuning
48 chains critical closes only the central-charge gate.

The first spectral certificate is

\[
 \operatorname{ch}V=q^{-1}\left(1+\dim(V_1)q+
 \dim(V_2)q^2+\cdots\right),
\]

with the Monster values \(\dim V_1=0\) and \(\dim V_2=196884\). The zero is more
discriminating than the famous 196884: it excludes continuous current
symmetries before a large degeneracy is celebrated.

For an ordinary one-dimensional lattice, left and right movers occur together.
The isolated chiral VOA therefore belongs on an edge with anomaly inflow, or
inside a doubled nonchiral realization whose chiral algebra can be separately
identified. This is a physical boundary condition, not bookkeeping.

## 2. Where 23 can enter—and where the argument stops

Forty-eight labels admit the permutation cycle type

\[
 23^2 1^2,
\]

which the certificate constructs explicitly and verifies has order 23. This is
the attractive two-rail geometry: two length-23 cycles and two fixed points.
But a permutation of frame labels is not automatically a symmetry of the
Moonshine extension. It must preserve both structure codes, lift to the VOA,
and then be identified with the marked \(23AB\) class. None of those three
steps follows from the cycle shape alone.

That finite algebra problem is now closed negatively for the distinguished
frame. Its seven-dimensional \(1/16\)-code admits no order-23 coordinate
automorphism: the smallest nontrivial binary representation of \(C_{23}\) has
dimension 11, while all 48 generator-matrix columns are distinct. The proof is
given in [Wave 7.127](frontier_wave7_127_moonshine_frame_order23_permutation_no_go.md).
Thus order 23 moves the frame or acts beyond a simple wire permutation.

## 3. The two lanes now have complementary strengths

| lane | already physical/exact | missing |
|---|---|---|
| root-of-unity XXZ | explicit lattice \(TY(\mathbb Z_{23})\) fusion MPO | \(c=24\), associator, Monster provenance |
| 48-Ising frame | exact theorem that would certify \(V^\natural\) | local code extension and explicit \(23AB\) defect |

Their junction is the credible lightning target: construct the \(23AB\) defect
on a physical realization of the Moonshine frame, then recover both the
order-46 connected-ratio curve and the independent TY recoupling matrix. One
lane supplies the defect engineering; the other supplies the provenance
theorem. Neither can substitute for the other.

## 4. Falsification ladder

1. **Frame:** show 48 commuting \(c=1/2\) stress tensors in the scaling limit.
2. **Extension:** recover the published Moonshine structure-code sectors.
3. **Character:** verify holomorphicity, \(c=24\), \(V_1=0\), and then the
   \(V_2\) count.
4. **Marked symmetry:** realize and classify the order-23 operation.
5. **Defect data:** reproduce the twined traces and TY associator without
   fitting them independently.

Failure at steps 1--3 kills Monster provenance. Failure at 4 permits the
Monster CFT but kills the proposed physical \(23AB\) dictionary. Failure at 5
kills the claimed defect implementation. That separation makes the programme
capable of being wrong in informative ways.

## Sources and corpus links

- Dong, Griess and Höhn, [*Framed vertex operator algebras, codes and the moonshine module*](https://arxiv.org/abs/q-alg/9707008).
- Lam and Yamauchi, [*A characterization of the moonshine vertex operator algebra by means of Virasoro frames*](https://arxiv.org/abs/math/0609718).
- Miyamoto, [*A new construction of the moonshine vertex operator algebra over the real number field*](https://doi.org/10.4007/annals.2004.159.535).
- [XXZ aspect-ratio protocol](frontier_wave7_125_xxz23_aspect_ratio_and_tensor_network_protocol.md)
- [Exact Monster TY recoupling](frontier_wave7_113_monster_z23_tambara_yamagami_recoupling.md)
