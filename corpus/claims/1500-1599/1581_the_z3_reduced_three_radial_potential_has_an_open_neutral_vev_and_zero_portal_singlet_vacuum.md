# The Z3 Reduced Three-Radial Potential Has an Open Neutral-VEV and Zero-Portal-Singlet Vacuum

**Date:** 20 October 2026

**Gates:** A2, A5 and A6

**Status:** exact open reduced-vacuum theorem; full E6 non-singlet spectrum remains open

**Depends on:** [the two-singlet nonsupersymmetric vacuum](1567_a_nonsupersymmetric_E6_quartic_vacuum_restores_the_exotic_rank_but_no_residual_abelian_selector_protects_bidoublet_inertness.md) and [the Z3 three-family construction](1575_a_residual_Z3_family_cycle_realizes_the_two_copy_frame_and_protects_a_three_family_E6_portal.md)

**Evidence:** [three-radial vacuum ledger](../../../evidence/data/spin23-e6-z3-reduced-three-radial-vacuum.json) and [deterministic verifier](../../../verification/verify/verify_spin23_e6_z3_reduced_three_radial_vacuum.mjs)

## Result

The Z3 extension passes its first vacuum test on an open parameter set. Let

\[
x=|s_{27}|^2,
\qquad y=|s_0|^2,
\qquad z=|s_1|^2,
\]

where the first two fields are neutral high-scale singlets and the third is
the singlet in the charged portal copy. The general radial quartic has the
form

\[
\begin{aligned}
V={}&-ax-by+cz+\lambda_xx^2+\lambda_yy^2+\lambda_zz^2\\
&+\kappa_{xy}xy+\kappa_{xz}xz+\kappa_{yz}yz.
\end{aligned}
\]

The explicit witness

\[
(a,b,c)=(5,7,2),\quad
(\lambda_x,\lambda_y,\lambda_z)=(2,3,4),
\]

\[
(\kappa_{xy},\kappa_{xz},\kappa_{yz})=(1,1/2,-1/4)
\]

has the unique global minimum on \(x,y,z\ge0\)

\[
\boxed{(x_*,y_*,z_*)=(1,1,0)}.
\]

The quartic Hessian is

\[
H=\begin{pmatrix}
4&1&1/2\\
1&6&-1/4\\
1/2&-1/4&8
\end{pmatrix},
\]

with positive leading principal minors

\[
4,\qquad23,\qquad182.
\]

It is therefore strictly convex. At the boundary minimum,

\[
\partial_zV=2+{1\over2}-{1\over4}={9\over4}>0,
\]

so the charged-copy singlet is stable at zero. All inequalities are strict,
and the vacuum persists under sufficiently small parameter changes.

## Exact scope

This proves that the required high-scale pattern is not forbidden by the
radial potential:

\[
\langle27_H\rangle\ne0,
\qquad\langle S_0\rangle\ne0,
\qquad\langle S_1\rangle_{\rm singlet}=0.
\]

It does not prove that the complete E6 orbit is stable. The remaining
Hessian contains every non-singlet component and every inequivalent E6
quartic contraction. In particular, obtaining one light \(S_1\)
bidoublet while its singlet and coloured partners remain heavy requires
component-dependent splittings that are invisible in \((x,y,z)\).

The next exact calculation is the full \(S_1\) component mass map at this
background. The desired inequalities are

\[
m^2(S_{1,\rm singlet})>0,
\qquad
m^2(S_{1,\rm coloured})>0,
\qquad
m^2(S_{1,\rm bidoublet})\simeq0,
\]

with the last small eigenvalue protected rather than chosen by an isolated
determinant tuning.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_e6_z3_reduced_three_radial_vacuum.mjs
~~~
