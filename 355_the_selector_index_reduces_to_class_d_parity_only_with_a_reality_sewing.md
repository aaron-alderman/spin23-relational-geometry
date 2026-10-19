# The Selector Index Reduces to Class-D Parity Only with a Reality Sewing

**Date:** 17 October 2026  
**Branches:** B01, B03, B05, B06, B08, B09 and B11  
**Claim status:** exact BDI-to-D reduction for a reflection-real parent symbol; physical identification remains conditional on exact CAR particle-hole self-duality and a selector-to-momentum map, while generalized flavor CP may be broken

> **Later correction (Document 378):** the one-dimensional BDI-to-D reduction
> is exact for the periodic symbol defined below. It must not be identified
> with a grading-reversing primitive vortex quotient without an explicit
> operator/domain bridge. The conventional vortex index three cannot belong to
> the same exact grading-reversing deck-symmetric Fredholm operator.

## 1. The question left by the Toeplitz theorem

The selector mass now has an exact complex chiral index:

\[
\operatorname{Ind}T_M=-w[\det M].
\]

But class AIII zero modes are complex chiral states. A physical Majorana mode
requires particle-hole symmetry. The key question is whether adding Nambu
structure preserves the odd winding as a \(\mathbb Z_2\) invariant or merely
doubles it into a trivial system.

The answer is precise:

> The integer winding reduces to class-D parity when the parent symbol admits
> the BDI reflection-reality sewing and the descendant retains exact CAR
> particle-hole self-duality. Arbitrary Nambu doubling is not enough.

## 2. A canonical BDI representative

For one channel with integer winding \(m\), define

\[
q_m(k)=e^{imk},
\]

and

\[
H_m(k)=\cos(mk)\tau_z+\sin(mk)\tau_y.
\]

It has three symmetries:

\[
C=\tau_xK,qquad C^2=+1,
\]

\[
C H_m(k)C^{-1}=-H_m(-k),
\]

\[
T=K,qquad T^2=+1,qquad T H_m(k)T^{-1}=H_m(-k),
\]

and the resulting chiral symmetry

\[
\Gamma=TC=\tau_x,qquad \{\Gamma,H_m\}=0.
\]

This is a one-dimensional BDI representative with integer invariant \(m\).

## 3. Forgetting the extra reality leaves class D

Allow perturbations that preserve \(C\) but break \(T\) and \(\Gamma\). The
classification reduces from the BDI integer to the class-D \(\mathbb Z_2\)
invariant.

At the particle-hole-invariant momenta \(k=0,\pi\),

\[
B(k)=H_m(k)\tau_x
\]

is real antisymmetric. Its two-dimensional Pfaffian is

\[
\operatorname{Pf}B(0)=1,
\qquad
\operatorname{Pf}B(\pi)=(-1)^m.
\]

Therefore

\[
\boxed{
\nu_D
=\operatorname{sgn}\!\left[
\operatorname{Pf}B(0)\operatorname{Pf}B(\pi)
\right]
=(-1)^m.}
\]

The convention \(\nu_D=-1\) denotes the nontrivial phase.

For multiple channels,

\[
\boxed{\nu_D=(-1)^{\sum_a m_a}=(-1)^{w[\det q]}.}
\]

Thus the Toeplitz winding really does reduce modulo two under the correct
particle-hole sewing.

## 4. Three selector-odd flavors

Antipodal oddness makes each diagonal canonical exponent odd. For three
channels,

\[
\sum_{a=1}^3m_a\equiv3\equiv1\pmod2,
\]

so

\[
\boxed{\nu_D=-1.}
\]

Within the BDI representative there are three same-chirality boundary modes in
the minimal case. Once BDI-breaking but particle-hole-preserving mixing is
allowed, two may pair and move away from zero, but one Majorana parity remains.

This is the exact mathematical content of the reduction

\[
\mathbb Z\longrightarrow\mathbb Z_2,
\qquad w\longmapsto w\bmod2.
\]

## 5. The required reality sewing

For a matrix symbol in the BDI parent, the canonical additional condition is

\[
\boxed{q(-k)=q(k)^*}
\]

in some fixed flavor basis, or its generalized form

\[
q(-k)=U_C q(k)^* U_C^T
\]

with a fixed unitary reality-sewing matrix \(U_C\). In this chiral parent it
encodes an extra time-reversal/generalized-reality lift; it is not the
always-present self-dual CAR operation \(J_0=\tau_xK\).

This condition is independent of the antipodal selector law

\[
q(k+\pi)=-q(k).
\]

Both are needed for the proposed chain:

- antipodal sewing fixes winding parity;
- reflection reality supplies the BDI integer representative, while exact CAR
  particle-hole self-duality lets its parity survive in class D.

Conflating the two would hide the main physical dependency.

## 6. The complex Majorana checkpoint and Takagi factorization

The checkpoint

\[
M_0=
\begin{pmatrix}
5&2&1\\
2&7&i\\
1&i&11
\end{pmatrix}
\]

is not real in the displayed flavor basis. Therefore

\[
q(k)=e^{ik}M_0
\]

does not obey \(q(-k)=q(k)^*\) there.

However, every complex symmetric matrix admits a Takagi factorization

\[
M_0=U D U^T,
\qquad D\geq0.
\]

For the isolated neutral mass block, a constant flavor transformation can put
the factorized family into the canonical reflection-real form

\[
q'(k)=e^{ik}D.
\]

This supplies a candidate generalized BDI reality sewing for that block.

The caveat is essential: physical flavor CP violation is relational. A Takagi
basis for the Majorana matrix need not simultaneously make the charged-lepton
Yukawa matrix, weak-current embedding and selector portal real. The integer BDI
refinement survives only if this additional generalized reality is compatible
with all couplings. Class-D parity instead needs the exact CAR particle-hole
operation and an open bulk gap, and may survive physical flavor-CP breaking.

## 7. Why naive Nambu doubling is insufficient

Starting from an arbitrary AIII Hamiltonian and adjoining an independent
particle-hole-conjugate copy automatically produces a formal BdG redundancy.
But it may produce two copies of every boundary mode, which is class-D even and
topologically trivial.

The nontrivial reduction above does something stronger: the original symbol is
itself constrained by the reflection-reality sewing. Particle and hole sectors
are not unrelated copies; they are sewn over opposite momenta.

This distinction prevents a false Majorana conclusion from mere matrix
doubling.

## 8. What is now proved

Conditional on treating selector angle as a one-dimensional bulk coordinate
and imposing the reflection-reality condition:

1. the selector determinant winding is the BDI integer;
2. the Toeplitz boundary index counts its chiral modes;
3. preserving only particle-hole symmetry reduces that integer modulo two;
4. three antipodally odd flavor channels are class-D nontrivial;
5. a boundary retains odd Majorana parity under class-D-allowed mixing.

This closes the abstract operator-theory chain.

## 9. What remains physical rather than abstract

The programme must still derive, rather than assume:

1. the map from selector space to momentum, a defect loop or an adiabatic
   parameter cycle;
2. the separation of exact Furey/CAR conjugation from the optional BDI or
   generalized-CP sewing matrix \(U_C\);
3. compatibility of the gapped class-D sector with hypercharge, weak currents
   and the charged-lepton basis;
4. locality of the corresponding half-space Hamiltonian;
5. stability when the exceptional cubic supplies a frequency-dependent complex
   mass rather than the factorized form \(e^{ik}M_0\).

## 10. Stop-everything and falsification gates

**Stop-everything trigger:** Furey CAR conjugation supplies exact particle-hole
self-duality, and the selector operator yields a local gapped symbol obeying
antipodal sewing. A reflection-real BDI representative may compute the
invariant even if flavor CP later breaks the extra reality. Then odd Majorana
boundary parity is forced rather than fitted.

**Reality falsifier:** generalized-CP breaking is incorrectly treated as loss
of the exact CAR particle-hole redundancy.

**Doubling falsifier:** an unconstrained Nambu copy is used to claim a
nontrivial class-D invariant without checking the Pfaffians at \(0\) and
\(\pi\).

**Gap falsifier:** the proposed interpolation makes either invariant-momentum
Pfaffian vanish.

**Coordinate falsifier:** the selector parameter has no physical realization
as a bulk or defect coordinate, leaving the construction as an auxiliary
topological model.

## 11. Pinned dependency

The BDI-to-D mathematics is complete. Intrinsic Furey/CAR conjugation and the
optional BDI reality must be kept distinct. Pin the physical Majorana claim at
the coordinate/locality problem

\[
\text{Furey CAR conjugation}
\leftrightarrow \tau_xK,
\qquad
\text{selector deck}
\leftrightarrow k\mapsto k+\pi,
\qquad
\text{optional BDI reversal}
\leftrightarrow k\mapsto-k.
\]

The next calculation should derive the selector-to-physical-coordinate map and
local operator rather than demand an exact flavor-CP symmetry that class D does
not require.

## 12. Certificate

The [BDI-to-class-D parity certificate](scripts/verify_bdi_winding_reduces_to_class_d_pfaffian_parity.mjs) verifies particle-hole, time-reversal and chiral symmetries of the canonical representatives, constructs the invariant-momentum antisymmetric forms, proves \(\nu_D=(-1)^w\), and checks the odd three-flavor stack.

## 13. Sources

- [Kitaev, *Unpaired Majorana fermions in quantum wires*](https://arxiv.org/abs/cond-mat/0010440)
- [Ryu, Schnyder, Furusaki and Ludwig, *Topological insulators and superconductors: ten-fold way and dimensional hierarchy*](https://arxiv.org/abs/0912.2157)
- [Schnyder, Ryu, Furusaki and Ludwig, *Classification of Topological Insulators and Superconductors*](https://arxiv.org/abs/0905.2029)

## Companion documents

- [Exact selector Toeplitz edge index](354_the_selector_determinant_winding_has_an_exact_toeplitz_edge_index.md)
- [Selector determinant-winding parity](353_selector_deck_gluing_turns_complex_mass_sign_into_determinant_winding_parity.md)
- [Neutral Majorana Pfaffian reality gate](352_the_neutral_majorana_pfaffian_is_det_m_but_cp_makes_it_complex_and_removes_the_sign.md)
- [Gauge-commutant antiunitary and CP](337_the_flag_antiunitary_lives_in_the_gauge_multiplicity_commutant_and_cp_breaks_it.md)
- [Furey CAR reality versus flavor CP](356_furey_conjugation_supplies_car_particle_hole_reality_not_an_exact_flavor_cp.md)
