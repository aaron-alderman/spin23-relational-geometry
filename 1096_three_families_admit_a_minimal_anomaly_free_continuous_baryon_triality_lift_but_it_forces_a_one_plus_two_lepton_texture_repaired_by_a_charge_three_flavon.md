# Three Families Admit a Minimal Anomaly-Free Continuous Baryon-Triality Lift, but It Forces a \(1+2\) Lepton Texture Repaired by a Charge-Three Flavon

**Date:** 18 October 2026  
**Branches:** continuous \(U(1)\) completion, generation-dependent charges, flavor texture, Majorana breaking, baryon triality  
**Claim status:** exact classification under one common Higgs and diagonal Dirac-Yukawa assumptions; bounded minimality is exhaustive and the general anomaly reduction is analytic  
**Certificate:** [prove_the_minimal_generation_dependent_u1_lift_and_its_flavon_texture.mjs](scripts/prove_the_minimal_generation_dependent_u1_lift_and_its_flavon_texture.mjs)

**Literature correction:** this minimal generator is not a new \(U(1)\).
For exceptional family \(i\), it is exactly
\(X_i=B-2Y-3L_i\), hence represents the established \(B-3L_i\) direction
modulo gauged hypercharge. What is new to this programme is the exact link to
the Majorana-compatible baryon-triality lift, the charge-minimal integral
representative and flavon-order texture, and the \(A_2\) orbit of the three
family choices. See [the identification and family-orbit audit](1097_the_minimal_continuous_lift_is_hypercharge_dressed_B_minus_3Li_and_its_three_family_choices_form_an_A2_orbit_that_generation_blind_NCG_cannot_select.md).

## Executive result

There is a minimal generation-dependent continuous \(U(1)_X\) lift of
baryon triality for three Standard-Model generations with right-handed
neutrinos.

Use left-handed Weyl fields

\[
(Q,u^c,d^c,L,e^c,\nu^c)
\]

and one Higgs \(H\). Require all charges to reduce modulo three to

\[
(0,1,-1,1,1,0),
\qquad
q_H=-1=2\pmod3.
\]

The minimal witness, up to family permutation and overall inversion convention,
is

\[
\begin{array}{c|rrrrrr}
&Q&u^c&d^c&L&e^c&\nu^c\\ \hline
\text{family 1}&0&1&-1&-2&1&3\\
\text{family 2}&0&1&-1&1&-2&0\\
\text{family 3}&0&1&-1&1&-2&0
\end{array}
\qquad
q_H=-1.
\]

Every continuous gauge, gravitational and cubic anomaly cancels exactly.
The largest absolute charge is three, and exhaustive enumeration proves that
no solution exists with all charges smaller than three in magnitude.

The price is flavor structure:

- both quark Yukawa matrices may be fully populated;
- charged-lepton and Dirac-neutrino Yukawas have an exact \(1\oplus2\) block;
- a flavon \(S\) with \(q_S=3\) or \(-3\) breaks \(U(1)_X\) to its
  \(\mathbb Z_3\) subgroup and fills every missing lepton cross-block with one
  insertion;
- the full right-neutrino Majorana matrix requires zero, one or two flavon
  insertions.

Thus the continuous-completion branch is open, but it predicts a specific
spurion hierarchy rather than permitting generic flavor at the unbroken level.

## 1. General charge solution with diagonal Dirac Yukawas

Let generation \(a\) carry charges

\[
q_a=q(Q_a),
\qquad
\ell_a=q(L_a),
\]

and let the common Higgs charge be \(h\). Diagonal Yukawa invariance gives

\[
u_a=-q_a-h,
\qquad
d_a=-q_a+h,
\]

\[
e_a=-\ell_a+h,
\qquad
n_a=-\ell_a-h.
\]

The baryon-triality residues force

\[
q_a=3A_a,
\qquad
\ell_a=1+3B_a,
\qquad
h=2+3H,
\]

for integers \(A_a,B_a,H\).

## 2. All six anomaly equations collapse to one

For each family,

\[
2q_a+u_a+d_a=0,
\]

so \(SU(3)^2U(1)_X\) cancels generation by generation.

The gravitational coefficient also cancels generation by generation:

\[
6q_a+3u_a+3d_a+2\ell_a+e_a+n_a=0.
\]

The remaining nontrivial non-Abelian coefficient is

\[
\mathcal A_{SU(2)^2X}
=
\sum_a(3q_a+\ell_a).
\]

Direct expansion gives the cubic identity

\[
\mathcal A_{X^3}
=
-6h^2\sum_a(3q_a+\ell_a).
\]

The two hypercharge-mixed anomalies are likewise proportional to the same
combination:

\[
\mathcal A_{Y^2X}\propto-\sum_a(3q_a+\ell_a),
\qquad
\mathcal A_{YX^2}\propto
h\sum_a(3q_a+\ell_a),
\]

with convention-dependent overall normalizations.

Therefore

\[
\boxed{
\text{all continuous anomalies cancel}
\iff
\sum_a(3q_a+\ell_a)=0.
}
\]

In integer parameters this becomes

\[
N_f+3\sum_a(3A_a+B_a)=0.
\]

An immediate theorem follows:

\[
\boxed{
\text{an integer lift of this form can exist only if }N_f=0\pmod3.
}
\]

For \(N_f=3\), the complete condition is

\[
\sum_{a=1}^3(3A_a+B_a)=-1.
\]

The number of generations is therefore not merely sufficient for this
continuous completion—it is an arithmetic necessity.

## 3. Minimal witness

Choose

\[
A=(0,0,0),
\qquad
B=(-1,0,0),
\qquad
H=-1.
\]

Then

\[
q=(0,0,0),
\qquad
\ell=(-2,1,1),
\qquad
h=-1,
\]

which produces the table in the executive result.

Its exact anomaly ledger is

\[
\mathcal A_{SU(3)^2X}
=
\mathcal A_{SU(2)^2X}
=
\mathcal A_{\mathrm{grav}^2X}
=
\mathcal A_{X^3}
=
\mathcal A_{Y^2X}
=
\mathcal A_{YX^2}
=0.
\]

The certificate exhausts

\[
A_a,B_a,H\in[-2,2].
\]

It finds 3825 solutions in that box. Ordering them first by maximum absolute
charge and then by total \(L^1\) charge gives:

\[
\min\|q\|_\infty=3,
\qquad
\min_{\|q\|_\infty=3}\|q\|_1=19.
\]

Exactly three solutions achieve both minima, corresponding to the choice of
which family is exceptional.

No solution with \(\|q\|_\infty\le2\) exists. This is a global statement, not
just a consequence of the search box: charges constrained to magnitude two
have only the finite residue-compatible values already exhausted by the
certificate.

## 4. Yukawa support

For an up-type entry \(Q_iHu^c_j\), invariance requires

\[
q_i+u_j+h=0.
\]

For a down-type entry \(Q_iH^\dagger d^c_j\),

\[
q_i+d_j-h=0.
\]

Because all quark-sector charges are universal in the minimal witness, both
quark Yukawa matrices have full \(3\times3\) support. Generic CKM mixing is
therefore compatible with the unbroken \(U(1)_X\).

The charged-lepton operator has charge

\[
C^e_{ij}=\ell_i+e_j-h,
\]

and the Dirac-neutrino operator has charge

\[
C^\nu_{ij}=\ell_i+n_j+h.
\]

For the minimal witness,

\[
C^e=
\begin{pmatrix}
0&-3&-3\\
3&0&0\\
3&0&0
\end{pmatrix},
\qquad
C^\nu=
\begin{pmatrix}
0&-3&-3\\
3&0&0\\
3&0&0
\end{pmatrix}.
\]

Hence both lepton matrices have exact \(1\oplus2\) support before breaking.
This reproduces, now constructively, the flavor-connectivity obstruction found
earlier for family parities.

## 5. Charge-three flavon repair

Introduce a Standard-Model-singlet flavon \(S\) with

\[
q_S=3
\]

and allow \(S^\dagger\) when the opposite sign is required. Its vacuum leaves
the baryon-triality \(\mathbb Z_3\) subgroup unbroken.

Every forbidden lepton cross-block has charge \(\pm3\), so one insertion of
\(S\) or \(S^\dagger\) makes it invariant:

\[
\frac{S}{\Lambda}\,LH^{(\dagger)}e^c,
\qquad
\frac{S}{\Lambda}\,LH^{(\dagger)}\nu^c.
\]

Thus CKM mixing may be unsuppressed while the PMNS cross-block entries are
controlled by

\[
\epsilon=\frac{\langle S\rangle}{\Lambda}.
\]

Whether this hierarchy resembles observed lepton mixing is a quantitative
phenomenology question, not settled by the charge theorem.

## 6. Majorana matrix

The right-neutrino charges are

\[
n=(3,0,0).
\]

Therefore the Majorana bilinear charge matrix is

\[
C^M_{ij}=n_i+n_j
=
\begin{pmatrix}
6&3&3\\
3&0&0\\
3&0&0
\end{pmatrix}.
\]

The lower \(2\times2\) block is allowed without a flavon. Cross entries require
one charge-three insertion, and the exceptional diagonal requires two.

Consequently a full Majorana matrix arises with operator orders

\[
\begin{pmatrix}
\epsilon^2&\epsilon&\epsilon\\
\epsilon&1&1\\
\epsilon&1&1
\end{pmatrix}
\]

up to independent coefficients and the choice of \(S\) versus \(S^\dagger\).
This is a concrete seesaw texture forced by the minimal continuous completion.

## 7. Generic-flavor no-go before breaking

If all entries of the charged-lepton and neutrino Dirac matrices are required
to be invariant under the unbroken \(U(1)_X\), their support graphs force all
\(\ell_a\) to be equal. Full quark connectivity similarly forces all \(q_a\)
to be equal.

Then anomaly cancellation gives

\[
3q+\ell=0.
\]

But the required residues are

\[
q=0\pmod3,
\qquad
\ell=1\pmod3,
\]

which contradict \(3q+\ell=0\). Therefore:

\[
\boxed{
\text{no generation-universal, fully connected one-Higgs }U(1)_X
\text{ lift exists.}
}
\]

Flavor breaking is not optional in this completion; it is the mechanism that
makes the anomaly-free lift possible.

## 8. Stop-everything criteria

**Universality stop:** do not claim a generation-universal continuous lift.
The residue and weak-anomaly equations exclude it.

**Flavor stop:** do not call the minimal \(U(1)_X\) compatible with generic
unbroken PMNS Yukawas. It enforces a \(1\oplus2\) lepton texture.

**Residual-symmetry stop:** a flavon whose charge is not divisible by three
would destroy baryon triality and close this branch.

**Renormalizability stop:** one charge-three scalar does not generate the
exceptional Majorana diagonal at renormalizable order; it first appears with
two insertions or additional heavy mediators.

**NCG stop:** the existence of an abstract anomaly-free \(U(1)_X\) does not
show that the finite spectral triple contains its generator, flavon or mediator
content.

**Phenomenology stop:** if the resulting charged-lepton/PMNS hierarchy cannot
fit data without order-one coefficients becoming parametrically unnatural,
the minimal witness is excluded even though its anomaly algebra is exact.

## 9. Positive triggers

1. Fit the induced charged-lepton, Dirac-neutrino and Majorana textures to
   masses and PMNS data.
2. Construct a minimal Froggatt–Nielsen mediator sector that generates the
   one- and two-flavon operators without regenerating the forbidden triplet
   companion mixing.
3. Search the NCG Pati–Salam scalar spectrum for a singlet or composite carrying
   charge three.
4. Classify all minimal-\(\ell_\infty\) witnesses modulo family permutation,
   hypercharge shifts and overall charge inversion.

## 10. Verdict

The continuous-completion branch survives:

\[
\boxed{
\text{three families}
\Longleftrightarrow
\text{existence of the one-Higgs integer lift under the stated contract}.
}
\]

Its minimal realization is not flavor blind. It singles out one lepton family,
leaves quark mixing unrestricted, and turns lepton mixing plus the exceptional
Majorana mass into controlled charge-three-flavon effects.

This is a genuine model-building candidate, not yet a derivation from
Jordan/Furey/\(Spin(2,3)\) structure.

## Position in the corpus

- [known \(B-3L_i\) identification, \(A_2\) family orbit and NCG selection obstruction](1097_the_minimal_continuous_lift_is_hypercharge_dressed_B_minus_3Li_and_its_three_family_choices_form_an_A2_orbit_that_generation_blind_NCG_cannot_select.md)
- [anomaly-polynomial shadow and torsion boundary](1095_the_anomaly_polynomial_tracks_the_mod3_shadow_of_the_Pati_Salam_descent_but_the_baryon_triality_mod9_class_is_genuinely_torsional.md)
- [exact Majorana-vacuum stabilizer](1094_the_Majorana_vacuum_stabilizer_is_the_Z6_quotiented_standard_model_times_a_split_baryon_triality_with_the_Z9_lift_cubing_to_colour_centre.md)
- [connected-Yukawa family-parity no-go](1087_connected_CKM_and_PMNS_Yukawa_graphs_force_any_exact_diagonal_family_Z2_back_to_the_universal_anomalous_class.md)

