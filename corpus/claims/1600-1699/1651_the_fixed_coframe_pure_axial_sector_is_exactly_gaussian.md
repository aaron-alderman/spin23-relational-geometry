# The Fixed-Coframe Pure-Axial Sector Is Exactly Gaussian

**Date:** 22 October 2026

**Gates:** A1, A2, A4, A6, A7, A8 and A11

**Status:** exact finite-amplitude axial-subsector reduction; partial source-order advance

**Depends on:** [the torsionful source-order audit](1650_torsionless_determinants_do_not_determine_any_of_the_five_axial_loop_responses.md) and [quantization packet v1](../../programmes/closure/spin23-gravity-route/quantization-packet-v1.md)

**Evidence:** [pure-axial Gaussian ledger](../../../evidence/data/spin23-pure-axial-exact-gaussian-v1.json) and [verifier](../../../verification/verify/verify_spin23_pure_axial_exact_gaussian.mjs)

## Result

At fixed coframe, with trace and tensor torsion set to zero, the packet-v1
action is exactly quadratic in the axial torsion one-form. This statement is
valid at finite axial amplitude, not only in the linearized theory.

Therefore the axial-to-axial Hessian is independent of an axial background:

\[
{\delta H_{SS}\over\delta \bar S}=0,
\qquad
{\delta^2 H_{SS}\over\delta \bar S^2}=0.
\]

The isolated axial Gaussian determinant cannot generate any of the five
quadratic axial responses by itself. Those responses must arise from mixed
coframe/non-axial connection vertices, ghosts, the constrained measure, or
source-dependent Jacobians.

## Exact exterior-algebra identity

For pure axial torsion, the packet projector is

\[
T^a=-{1\over3}*\left(e^a\wedge p\right),
\qquad p=*(e_a\wedge T^a).
\]

Direct exterior algebra in four dimensions gives

\[
\boxed{T_a\wedge T^a=0}
\]

identically for every axial one-form \(p\). The verifier proves the
polynomial identity coefficient by coefficient in a Lorentzian orthonormal frame and
also checks that the projector reconstructs \(p\).

The Nieh--Yan identity then becomes

\[
R_{ab}\wedge e^a\wedge e^b
=-d(e_a\wedge T^a)
\]

on this subspace. Hence the packet pseudoscalar curvature \(\widehat X\) is
exactly linear in the axial field (a covariant divergence in the frozen
normalization), with no \(S^2\) term.

## Gaussian action

For a metric-compatible connection, the Einstein--Cartan scalar differs
from the Levi--Civita scalar by a boundary term plus terms quadratic in
torsion. The three explicit torsion invariants are already quadratic, and
the preceding identity makes \(\widehat X^2\) quadratic on the pure-axial
subspace. Thus at fixed coframe

\[
S_{\rm axial}[S]
=S_{\rm axial}[0]
+{1\over2}\langle S,(A I+B D^\dagger D)S\rangle
\]

with no cubic or quartic axial self-vertices.

Splitting \(S=\bar S+s\) changes only the term linear in \(s\); the
quadratic fluctuation operator remains \(A I+B D^\dagger D\). In the trace
formula of claim 1650, the pure axial self-block has

\[
H_{SS,1}=H_{SS,2}=0.
\]

## Scope boundary

This does not set the first two source variations of the complete bosonic
Hessian to zero. Varying the coframe, trace torsion, or tensor torsion around
an axial background exposes mixed vertices hidden by the fixed-coframe
restriction. The BRST operators and canonical measure can also depend on the
background.

The result instead removes one tempting but incorrect route: repeatedly
expanding the already-known minimal pseudoscalar determinant cannot produce
the missing torsion counterterms. The next calculation is the mixed-block
source expansion.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_pure_axial_exact_gaussian.mjs
~~~
