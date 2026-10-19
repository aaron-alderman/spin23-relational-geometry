# The Electroweak and Flavon Vacua Leave a Fieldwise \(\mathbb Z_9\) Whose Gauge Quotient Is the Split \(\mathbb Z_3\), so Level-Three BF Requires the Full Global Form

**Date:** 19 October 2026  
**Branches:** electroweak Higgsing, family \(U(1)\), Smith normal form, \(\mathbb Z_9\) lift, colour-centre quotient, BF level  
**Claim status:** exact correction and global-form synthesis; gauging of the split component remains conditional  
**Certificate:** [verify_electroweak_and_charge_three_vacua_leave_z9_before_the_sm_gauge_quotient.mjs](scripts/verify_electroweak_and_charge_three_vacua_leave_z9_before_the_sm_gauge_quotient.mjs)

## Executive result

The simple statement

\[
S_{q=3}\text{ condenses}
\quad\Longrightarrow\quad
U(1)_X\to\mathbb Z_3
\]

is incomplete in the integral \(X=B-2Y-3L_i\) basis because the electroweak Higgs also carries \(X\)-charge.

Use the compact integer basis

\[
y=6Y,
\qquad
X=B-2Y-3L_i.
\]

The electroweak Higgs and singlet flavon have charge rows

\[
q(H)=(3,-1),
\qquad
q(S)=(0,3).
\]

The vacuum charge matrix is

\[
Q_{\rm vac}=
\begin{pmatrix}
3&-1\\
0&3
\end{pmatrix}.
\]

Its Smith normal form is

\[
\operatorname{SNF}(Q_{\rm vac})=\operatorname{diag}(1,9).
\]

Therefore the raw Abelian fieldwise remnant is

\[
\boxed{\mathbb Z_9,}
\]

not \(\mathbb Z_3\).

But this is not the final physical group. The cube of the order-nine lift is the \(SU(3)_C\) centre, hence a connected gauge transformation in the faithful Standard-Model quotient. After quotienting the Standard-Model gauge group, the vacuum stabilizer splits as

\[
\boxed{
G_{\rm vac}\cong G_{\rm SM}\times\mathbb Z_3^{B_3}.
}
\]

Thus the level-three BF route survives, but with a corrected meaning:

\[
\boxed{
\text{level-three BF describes the gauged split }\mathbb Z_3\text{ component on gauge orbits, not the raw unquotiented Abelian Higgs lattice.}
}
\]

The distinction is essential. Before the gauge quotient the natural Abelian discrete theory is a \(\mathbb Z_9\) lift; after the quotient the physical disconnected component is \(\mathbb Z_3\). Any BF derivation must incorporate the colour/hypercharge global form rather than dualize \(S\) in isolation.

## 1. Why the earlier one-field argument fails

In the integral representative used throughout the family-algebra calculation,

\[
q_X(H)=-1.
\]

Therefore the electroweak Higgs vacuum already participates in breaking the two Abelian directions \(U(1)_y\times U(1)_X\). One cannot freeze hypercharge and analyze only the \(X\)-charge of \(S\).

The continuous direction left by \(H\) is proportional at Lie-algebra level to

\[
X+2Y=B-3L_i.
\]

But \(B-3L_i\) has fractional quark charges in the conventional normalization. Returning to a primitive compact integral lattice restores the order-nine lift.

## 2. Smith-normal-form calculation

For two compact \(U(1)\) gauge factors Higgsed by two scalars, the finite Abelian remnant is determined by the cokernel of the integer charge matrix.

Here

\[
\det Q_{\rm vac}=9
\]

and the greatest common divisor of all entries is one. Hence the Smith invariants are

\[
d_1=1,\qquad d_2=9.
\]

The finite remnant is

\[
\mathbb Z_{d_1}\times\mathbb Z_{d_2}
\cong\mathbb Z_9.
\]

This matches the independent order-nine Pati–Salam and baryon-triality analyses in documents 1088–1095.

## 3. Why the physical component is nevertheless \(\mathbb Z_3\)

Let \(t\) denote the order-nine fieldwise lift. The exact global calculation of document 1094 proves

\[
t^3=\zeta_3\in Z(SU(3)_C).
\]

Thus \(t\) has order three on gauge equivalence classes. Hypercharge dressing constructs an exact order-three complement \(\tau\) satisfying

\[
\tau^3=1,
\]

and the full stabilizer splits:

\[
G_{\rm vac}=G_{\rm SM}\times\langle\tau\rangle_3.
\]

On coloured elementary fields, different representatives differ by the colour centre. On gauge-invariant observables they give the same baryon-triality action.

The family-specific term \(-3L_i\) does not change this mod-three component: it is divisible by three and controls the continuous/flavon texture while the residual quotient is the baryon-triality component.

## 4. Correct topological theories before and after quotient

If one dualizes the two Abelian Higgs phases before imposing the Standard-Model gauge quotient, the natural four-dimensional topological action is multi-component:

\[
S_{\rm raw}
=
\frac1{2\pi}\int b_I(Q_{\rm vac})_{IJ}\,da_J.
\]

Its discrete group is \(\mathbb Z_9\). A circle reduction of the raw theory would carry a \(\mathbb Z_9\) rather than a two-qutrit \(\mathbb Z_3\) carrier.

The desired level-three theory arises only after taking the faithful gauge quotient and isolating or gauging the split component:

\[
S_{\rm quotient}
=
\frac3{2\pi}\int b\wedge da.
\]

This passage is not automatic Gaussian elimination. It uses the global relation identifying the cube of the lift with colour centre.

## 5. Consequences for documents 1170–1179

The following results remain valid:

- anomaly freedom of the continuous family direction;
- charge-three cross-Peirce relation;
- generic mixing leaving a central mod-three action;
- Jordan derivation and its central kernel;
- the abstract level-three BF carrier;
- orbifold projection and electric/flux port quantization once a split \(\mathbb Z_3\) BF sector is present.

The following statement is superseded:

> the charge-three singlet alone, in the displayed integral \(X\) basis, directly Higgses the complete compact gauge group to \(\mathbb Z_3\).

The corrected statement is:

> the joint electroweak/flavon vacuum has a fieldwise \(\mathbb Z_9\) lift; the faithful Standard-Model gauge quotient converts it into a split physical \(\mathbb Z_3\) component.

## 6. Impact on the nine-state carrier

The correction makes the global-form gate stricter but more coherent.

If the split \(\mathbb Z_3\) component is gauged and gapped, its three-dimensional torus Hilbert space still has nine states. The \(\mathbb Z_9\) fieldwise presentation does not imply an 81-state physical component after gauge-equivalent colour-centre sectors are identified.

However, the quotient must be implemented at the topological-field-theory level. Otherwise a raw \(\mathbb Z_9\) BF calculation would overcount states and use ninth-root rather than cube-root linking phases.

## 7. Claim ledger

- **Exact:** \(q(H)=(3,-1)\) and \(q(S)=(0,3)\) in the \((y,X)\) basis.
- **Exact:** the vacuum charge matrix has Smith invariants \((1,9)\).
- **Exact:** the raw fieldwise discrete remnant is \(\mathbb Z_9\).
- **Exact from the established global-group calculation:** the cube of its generator is colour centre.
- **Exact:** the physical vacuum stabilizer has a split \(\mathbb Z_3\) component after the faithful SM gauge quotient.
- **Correction:** charge-three Higgs duality alone does not derive isolated level-three BF in the integral basis.
- **Conditional:** gauging the split component produces a standalone level-three BF sector.
- **Open:** explicit topological quotient/coupling to the colour-centre gauge sector.
- **Open:** gap and defect realization.

## 8. Stop-everything and positive gates

**Single-\(U(1)\) stop:** do not ignore the electroweak Higgs charge under \(X\).

**Normalization stop:** do not rescale fractional \(B-3L_i\) charges without tracking the compact charge lattice.

**\(\mathbb Z_9/\mathbb Z_3\) stop:** distinguish the fieldwise lift from the action on gauge equivalence classes.

**BF stop:** do not assign \(K=3H\) before implementing the colour/hypercharge quotient that produces the split component.

**Positive quotient trigger:** construct the coupled discrete TQFT and prove that quotienting the gauged colour-centre relation leaves the isolated \(3BF\) sector with nine torus states.

## 9. Verdict

\[
\boxed{
\operatorname{SNF}
\begin{pmatrix}3&-1\\0&3\end{pmatrix}
=(1,9)
\quad\stackrel{t^3=\zeta_3}{\Longrightarrow}\quad
G_{\rm vac}/G_{\rm SM}\cong\mathbb Z_3.
}
\]

The level-three synthesis remains live, but only through the full global gauge quotient. This correction replaces a too-simple Higgs argument with an exact bridge among the electroweak vacuum, the \(\mathbb Z_9\) lift, colour centre, baryon triality and the proposed BF interface.

## Corpus position

- [exact Majorana-vacuum stabilizer and split baryon triality](1094_the_Majorana_vacuum_stabilizer_is_the_Z6_quotiented_standard_model_times_a_split_baryon_triality_with_the_Z9_lift_cubing_to_colour_centre.md)
- [\(\mathbb Z_9\) lift and Dai–Freed class](1092_the_Z9_extension_not_its_naive_mod3_reduction_realizes_baryon_triality_and_matches_the_Dai_Freed_mod9_anomaly.md)
- [conditional charge-three Higgs/BF route](1170_the_anomaly_free_b_minus_3li_charge_three_flavon_is_a_direct_dynamical_origin_of_level_three_bf_if_the_family_algebra_embeds.md)
- [orbifold BF interface](1178_an_s1_over_z2_bf_orbifold_projects_out_the_extra_zero_mode_sector_and_retains_exactly_the_nine_state_level_three_interface.md)
