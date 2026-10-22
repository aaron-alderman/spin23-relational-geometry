# Nieh--Yan Allows Only Axial--Trace and Tensor-Square Connection Mixings

**Date:** 22 October 2026

**Gates:** A1, A2, A4, A6, A7, A8 and A11

**Status:** exact finite-amplitude torsion decomposition and fixed-coframe mixed-Hessian vertices

**Depends on:** [the exact pure-axial Gaussian reduction](1651_the_fixed_coframe_pure_axial_sector_is_exactly_gaussian.md) and [the mixed-bosonic isolation](1654_ghosts_and_ultralocal_jacobians_are_axial_source_blind_leaving_only_the_mixed_bosonic_hessian.md)

**Evidence:** [Nieh--Yan mixing ledger](../../../evidence/data/spin23-nieh-yan-torsion-mixing-v1.json) and [verifier](../../../verification/verify/verify_spin23_nieh_yan_torsion_mixing.mjs)

## Result

The connection-only part of the missing bosonic source expansion can be
written exactly. With the packet decomposition

\[
T^a=V^a+A^a+Q^a,
\quad
V^a={1\over3}e^a\wedge t,
\quad
A^a=-{1\over3}*(e^a\wedge p),
\]

the parity-odd torsion square is

\[
\boxed{
*(T_a\wedge T^a)
={2\over3}t_\mu p^\mu+*(Q_a\wedge Q^a).
}
\]

All vector--tensor and axial--tensor cross terms vanish. The vector and
axial self-terms also vanish. Hence Nieh--Yan gives the exact finite-field
identity

\[
\boxed{
\widehat X=Dp+{2\over3}t\cdot p+*(Q_a\wedge Q^a),
}
\]

where \(Dp\equiv-*d(e_a\wedge T^a)\) is the packet-normalized divergence
term.

## Expansion about a pure axial background

Set

\[
p=\bar p+s,qquad t=v,qquad Q=q,qquad \bar X=D\bar p.
\]

Then

\[
\widehat X=\bar X+X_1+X_2,
\]

with

\[
X_1=Ds+{2\over3}v\cdot\bar p,
\qquad
X_2={2\over3}v\cdot s+*(q_a\wedge q^a).
\]

The quadratic fluctuation density from \(b_X\widehat X^2/2\) is therefore

\[
{b_X\over2}\left(X_1^2+2\bar X X_2\right).
\]

Expanded by background order, its source-dependent vertices are

\[
{b_X\over2}\left[
{4\over3}(Ds)(v\cdot\bar p)
+{4\over3}\bar X(v\cdot s)
+2\bar X*(q_a\wedge q^a)
+{4\over9}(v\cdot\bar p)^2
\right].
\]

The first three terms are linear in the axial background and comprise the
fixed-coframe connection contribution to \(H_{B,1}\). The last is quadratic
and comprises its connection contribution to \(H_{B,2}\).

## What has been excluded exactly

At fixed coframe there is:

- no axial--tensor term linear in \(q\);
- no trace self-pseudoscalar \(V_a\wedge V^a\);
- no axial self-pseudoscalar \(A_a\wedge A^a\); and
- no source dependence from the Einstein--Cartan or explicit torsion-square
  Hessians, because those terms are at most quadratic in contorsion.

Thus the connection-only source dependence is completely localized to the
four displayed vertices. The verifier constructs all 24 torsion basis
components, confirms the \(4+4+16\) projector ranks, and checks every
bilinear identity.

## Remaining bosonic boundary

This does not yet include coframe fluctuations. Varying the Hodge star,
volume form, covariant divergence, and the coframe hidden in the torsion
projectors supplies additional \(h\)-\(s,v,q\) vertices. Those vertices,
together with the four connection vertices above, must be Schur-reduced
against the torsionless propagators before the five heat-kernel responses can
be extracted.

The next irreducible calculation is therefore narrower than the full
34-component expansion: derive the coframe completion required by background
diffeomorphism covariance and combine it with this exact connection block.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_nieh_yan_torsion_mixing.mjs
~~~
