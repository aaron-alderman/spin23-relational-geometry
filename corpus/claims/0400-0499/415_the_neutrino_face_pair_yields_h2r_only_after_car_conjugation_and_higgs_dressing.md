# The Neutrino Face Pair Yields \(H_2(\mathbb R)\) Only After CAR Conjugation and Higgs Dressing

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B07, B08 and B11  
**Claim status:** exact charge and real-form gate; physical response derivation remains open

## 1. Why the internal face exchange is not yet the carrier

The completed Furey TRO has an exact internal Weyl involution pairing

\[
\nu^c\leftrightarrow\nu.
\]

It is tempting to declare this pair a two-port carrier and impose exchange reciprocity to obtain \(H_2(\mathbb R)\). That shortcut fails in the all-left-handed basis.

The charges are

\[
B-L(\nu)=-1,
\qquad
B-L(\nu^c)=+1.
\]

For a Hermitian response \(f^\dagger Kf\), an off-diagonal entry is gauge invariant only if the two channels have the same charge. Therefore unbroken \(B-L\) forbids the \(\nu/\nu^c\) Hermitian cross term.

If exchange symmetry is also imposed, only a scalar response survives.

## 2. The all-left collapse

Let

\[
f_{\rm left}=
\begin{pmatrix}\nu\\ \nu^c\end{pmatrix},
\qquad
K=
\begin{pmatrix}a&z\\\bar z&d\end{pmatrix}.
\]

\(B-L\) invariance forces

\[
z=0.
\]

Exchange reciprocity then forces

\[
a=d.
\]

Hence

\[
K=aI.
\]

The internal Weyl face pair alone does not supply a three-dimensional Jordan carrier.

## 3. CAR conjugation changes the physical pair

The right-handed neutrino field is

\[
N_R=(\nu^c)^\dagger
\]

at the representation level. The Dirac pair is therefore

\[
f_D=
\begin{pmatrix}\nu_L\\N_R\end{pmatrix},
\]

not \((\nu,\nu^c)\) as two independent all-left response channels.

Now

\[
B-L(\nu_L)=B-L(N_R)=-1,
\qquad
Q_{\rm em}(\nu_L)=Q_{\rm em}(N_R)=0.
\]

The Hermitian cross response is no longer forbidden by these unbroken charges.

Before electroweak symmetry breaking, the interaction still requires the Higgs-dressed gauge invariant

\[
L\,H\,\nu^c,
\]

whose doubled hypercharges satisfy

\[
-1+1+0=0.
\]

Thus both CAR conjugation and Higgs dressing are structural inputs.

## 4. Exchange-real response

On the CAR-dressed Dirac pair, define the antiunitary exchange

\[
J=\sigma_x\mathcal K,
\qquad J^2=1,
\]

where \(\mathcal K\) complex-conjugates coefficients. The fixed Hermitian responses satisfy

\[
K=\sigma_x\bar K\sigma_x.
\]

They have the form

\[
K(a,x,y)=
\begin{pmatrix}
a&x+iy\\
x-iy&a
\end{pmatrix}.
\]

This is three-real-dimensional. Its determinant is

\[
\det K=a^2-x^2-y^2.
\]

A quarter-turn about the \(\sigma_x\) axis sends this slice to

\[
\begin{pmatrix}
a-y&x\\
x&a+y
\end{pmatrix}
\in H_2(\mathbb R).
\]

Therefore

\[
\boxed{
\operatorname{Herm}(2,\mathbb C)^J
\cong H_2(\mathbb R)
}
\]

as Euclidean Jordan algebras and positive cones.

Positivity is the Lorentz-cone condition

\[
a>\sqrt{x^2+y^2}.
\]

## 5. The recovered \(Spin(2,3)\) route

Once the physical response really lies in this cone, the established Jordan result applies:

\[
H_2(\mathbb R)
\Longrightarrow
\operatorname{Co}(H_2(\mathbb R))
\cong Sp(4,\mathbb R)
\cong Spin_0(2,3).
\]

This is the cleanest current route from the newly explicit matter/code intertwiner to the \(Spin(2,3)\) carrier:

\[
\begin{aligned}
\text{unique }\nu^c\text{ TRO completion}
&\longrightarrow \text{internal Dirac face exchange}\\
&\xrightarrow{\text{CAR + Higgs}}
(\nu_L,N_R)\text{ response}\\
&\xrightarrow{\text{exchange reciprocity}}
H_2(\mathbb R)\\
&\longrightarrow Spin_0(2,3).
\end{aligned}
\]

Every arrow except the last algebraic implication still needs its stated physical derivation. The chain is now explicit enough to test.

## 6. Relation to the lost \(M_2\) factor

Completing the fifteen-state matter TRO with \(\nu^c\) removed the special \(M_2\) factor from its linking algebra. The present construction offers a possible replacement:

- the carrier need not be a direct summand of the completed linking algebra;
- it may be the exchange-real response of the physically dressed Dirac neutrino pair.

This resolves the dimension tradeoff only conditionally. A response-space \(H_2(\mathbb R)\) is not the same object as an internal \(M_2\) linking factor.

## 7. What must now be derived

1. Construct the CAR conjugation on the completed Furey module explicitly.
2. Derive a matrix-valued causal response for the Higgs-dressed pair.
3. Prove spectral positivity and the exchange-real condition.
4. Show that flavor mixing does not enlarge the face algebra or erase CP violation.
5. Determine whether the real-form selector is exact, emergent, or state dependent.

## 8. Stop-everything criteria

**Positive trigger:** the Furey/CAR action and Higgs-dressed spectral kernel force the exchange-real \(H_2(\mathbb R)\) response without an arbitrary portal or basis choice.

**Flavor trigger:** the same two-face real form survives three complex families while CKM/PMNS-type CP invariants remain nonzero.

**Negative trigger:** the physical kernel is generically all of \(H_2(\mathbb C)\), with no source-derived reciprocity selecting the real slice.

**Charge trigger:** the proposed off-diagonal response violates an unbroken gauge or global superselection rule.

## 9. Falsification gates

**All-left falsifier:** build a Hermitian \(\nu/\nu^c\) cross response while ignoring their opposite \(B-L\) charges.

**CAR falsifier:** identify the linear Weyl exchange with anti-linear particle-hole conjugation.

**Higgs falsifier:** use the weak-doublet neutrino as a gauge singlet before dressing.

**Internal-factor falsifier:** equate the response Jordan algebra with a missing direct linking-algebra summand.

**Spin falsifier:** claim \(Spin(2,3)\) before the response real form and positivity are physically derived.

## 10. Certificate

The [neutrino \(H_2(\mathbb R)\) gate certificate](../../../verification/verify/verify_neutrino_dirac_pair_h2r_requires_car_conjugation.mjs) checks the all-left charge obstruction, scalar collapse, CAR-dressed equal charges, Higgs hypercharge cancellation, exchange-real dimension and determinant-preserving equivalence to \(H_2(\mathbb R)\).

## Companion documents

- [Dirac doubling versus charge conjugation](414_dirac_doubling_is_an_internal_weyl_face_exchange_while_charge_conjugation_requires_the_opposite_spinor.md)
- [Unique right-handed-neutrino completion](../0100-0199/167_unique_right_handed_neutrino_tro_completion_and_spin23_tradeoff.md)
- [Unbroken \(B-L\) Nambu collapse](../0300-0399/369_unbroken_bminusl_collapses_a_nambu_two_face_response_while_car_sews_opposite_frequencies.md)
- [Free Dirac chiral OS carrier](../0100-0199/121_free_dirac_chiral_os_h2_carrier.md)
- [Exact Jordan triple to \(Sp(4,\mathbb R)\)](../0000-0099/42_jordan_triple_to_sp4r_determination.md)
