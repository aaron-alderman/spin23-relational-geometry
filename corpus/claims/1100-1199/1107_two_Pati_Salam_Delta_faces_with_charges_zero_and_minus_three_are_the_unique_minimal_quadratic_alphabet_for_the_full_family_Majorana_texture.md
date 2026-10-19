# Two Pati–Salam \(\Delta\) Faces with Charges \(0\) and \(-3\) Are the Unique Minimal Quadratic Alphabet for the Full Family Majorana Texture

**Date:** 18 October 2026  
**Branches:** family \(B-3L_i\), Pati–Salam \(\Delta\Delta\) composite, scalar-copy multiplicity, Majorana texture, represented one-forms  
**Claim status:** exact charge-support and minimality theorem; no claim that the published finite calculus supplies two \(\Delta\) copies  
**Certificate:** [prove_two_Delta_charge_faces_generate_full_Majorana_texture.mjs](../../../verification/prove/prove_two_Delta_charge_faces_generate_full_Majorana_texture.mjs)

## Executive result

The sourced Pati–Salam nonlinear mechanism gives

\[
H=\Delta\Delta
\]

on the right-neutrino Majorana block. The family symmetry

\[
X_i=B-3L_i
\]

assigns the right-handed antineutrino charges

\[
q(\nu_i^c)=3,
\qquad
q(\nu_j^c)=q(\nu_k^c)=0.
\]

Therefore a symmetric Majorana matrix requires scalar charges

\[
\begin{pmatrix}
-6&-3&-3\\
-3&0&0\\
-3&0&0
\end{pmatrix}.
\]

There is a unique minimal integral quadratic alphabet whose pair sums generate
all three required charges:

\[
\boxed{
q(\Delta_1)=-3,
\qquad
q(\Delta_0)=0.
}
\]

Its products give

\[
\Delta_1\Delta_1:\ -6,
\qquad
\Delta_1\Delta_0:\ -3,
\qquad
\Delta_0\Delta_0:\ 0.
\]

Thus two Pati–Salam \((2_R,1_L,4)\) faces are sufficient at charge-support
level to generate the complete \(1\oplus2\) family Majorana texture.

They are also necessary: one fundamental charge has only one self-sum and
cannot cover three distinct sectors.

## 1. Majorana charge matrix

Let the selected family be labelled \(0\), with the two unselected families
\(1,2\). On the left-chiral conjugate neutrinos,

\[
\mathbf q_{\nu^c}=(3,0,0).
\]

A scalar coefficient multiplying

\[
\nu_a^c\nu_b^c
\]

must carry

\[
q(H_{ab})=-(q_a+q_b).
\]

Hence

\[
Q_H=
\begin{pmatrix}
-6&-3&-3\\
-3&0&0\\
-3&0&0
\end{pmatrix}.
\]

This has exactly three charge sectors:

\[
\{-6,-3,0\}.
\]

The multiplicities among the six independent symmetric entries are

\[
1+2+3=6.
\]

## 2. Minimal quadratic alphabet

Suppose the fundamental Pati–Salam fields have charges

\[
q_1,\ldots,q_m.
\]

Their quadratic composites have charges

\[
q_r+q_s,\qquad r\le s.
\]

For \(m=1\), only \(2q_1\) occurs. Therefore \(m\ge2\).

For two integral charges \(a\le b\), require

\[
\{2a,a+b,2b\}=\{-6,-3,0\}.
\]

The endpoints force

\[
2a=-6,\qquad2b=0,
\]

so

\[
a=-3,\qquad b=0,
\]

and then \(a+b=-3\) automatically.

Thus:

\[
\boxed{
\{-3,0\}
\text{ is the unique minimal integral charge set.}
}
\]

The executable certificate also exhausts all integer pairs in
\([-6,6]\).

## 3. Exact texture factorization

Let

\[
\Delta_-:=\Delta_{-3},
\qquad
\Delta_0:=\Delta_{0}.
\]

Then the most general charge-compatible symmetric Majorana block has the
schematic form

\[
M_R=
\begin{pmatrix}
c_{00}\Delta_-\Delta_-&
c_{01}\Delta_-\Delta_0&
c_{02}\Delta_-\Delta_0\\
c_{01}\Delta_-\Delta_0&
c_{11}\Delta_0\Delta_0&
c_{12}\Delta_0\Delta_0\\
c_{02}\Delta_-\Delta_0&
c_{12}\Delta_0\Delta_0&
c_{22}\Delta_0\Delta_0
\end{pmatrix}.
\]

Charge support alone leaves six independent symmetric coefficients:

- one in the \(-6\) sector;
- two in the \(-3\) sector;
- three in the neutral sector.

No Majorana matrix entry is forced to vanish merely by the \(B-3L_i\)
grading once both fundamental faces are present.

## 4. Relation to the sourced \(A_{(2)}\)

For each pair of fundamental \(\Delta\) faces, the Pati–Salam tensor product
still has

\[
(2_R,4)\otimes_{\rm sym}(2_R,4)
\supset
(3_R,10)\oplus(1_R,6).
\]

The family charge is an additional copy/normalizer label. It does not alter
the gauge decomposition:

\[
\begin{array}{c|c|c}
\text{composite}&\text{family charge}&\text{Pati--Salam sectors}\\ \hline
\Delta_-\Delta_-&-6&(3_R,10)\oplus(1_R,6)\\
\Delta_-\Delta_0&-3&(3_R,10)\oplus(1_R,6)\\
\Delta_0\Delta_0&0&(3_R,10)\oplus(1_R,6).
\end{array}
\]

This is a clean tensor separation:

\[
\text{gauge representation}
\otimes
\text{family charge face}.
\]

## 5. Why this is not yet an NCG construction

The published spectral Pati–Salam calculation contains one fundamental field

\[
\Delta_{\dot aJ}
\]

with no family label. Its coefficient \(k^{\nu_R}\) is a generation matrix,
but that does not create two independently charged one-form copies.

The two-face proposal requires the represented calculus to contain at least

\[
\Omega_D^1(\mathcal A)_{(2_R,4)}
\supset
\mathbb C\,\Delta_0
\oplus
\mathbb C\,\Delta_- .
\]

Coarse arrow incidence cannot determine this multiplicity. Document 1077
already proved that the same coarse finite diagram can realize different
one-form ranks.

The branch is therefore pinned at:

\[
\boxed{
\text{compute the gauge-isotypic multiplicity of }(2_R,4)
\text{ in the family-extended represented one-forms.}
}
\]

## 6. Unbroken Pati–Salam compatibility warning

\(B-3L_i\) is not a generator commuting with colour--lepton \(SU(4)\) on an
entire family four-plet. Its quark and lepton values differ inside the
\(\mathbf4\).

Accordingly, the charge label on \(\Delta_-\) cannot simply be appended as an
independent central \(U(1)\) while leaving the unbroken Pati–Salam
representation untouched. A valid ultraviolet implementation must be one of:

- a gauge-dressed family module phase;
- a normalizer acting jointly with the \(SU(4)\) \(B-L\) direction;
- a symmetry appearing only after Pati–Salam breaking;
- a finite-calculus selection rule rather than an additional continuous
  gauge group.

This is the same conceptual distinction encountered in the order-nine
baryon-triality lift: elementary-field representatives and gauge-quotient
actions are not identical.

## 7. Dirac-Yukawa compatibility

At the low-energy \(B-3L_i\) level, the ordinary Dirac Yukawa couplings are
neutral with an uncharged Standard-Model Higgs:

\[
L_aH\nu_a^c,\qquad
L_aH^\dagger e_a^c,
\]

because the selected-family charges cancel and the unselected-family charges
vanish.

Off-diagonal lepton Yukawa entries have charge \(\pm3\) and can be restored
by one \(\Delta_-\)-type family insertion, while the selected Majorana
diagonal uses two. This reproduces the previously derived first-order versus
second-order hierarchy at charge-support level.

It does not show that the Pati–Salam \(\Delta\) field is the low-energy
flavon; the gauge indices and breaking scale must still be reduced explicitly.

## 8. Stop-everything and falsification criteria

**Multiplicity stop:** do not infer two \(\Delta\) copies from the existence
of two charge labels; calculate the represented one-form rank.

**Central-\(U(1)\) stop:** do not append \(B-3L_i\) as a commuting
Pati–Salam factor without checking its joint action with \(SU(4)\).

**Coefficient stop:** independent entries of \(k^{\nu_R}\) are not
independent scalar copies.

**Scale stop:** a Pati–Salam-breaking \((2_R,4)\) field is not automatically
the low-energy singlet flavon.

**Positive trigger:** the full family-extended calculus contains exactly two
\((2_R,4)\) one-form copies with charges \(0,-3\), and their generalized
quadratic fluctuation spans the three Majorana charge sectors without extra
gauge or anomaly obstructions.

## 9. Verdict

The minimal charge architecture is now exact:

\[
\boxed{
\{\Delta_0,\Delta_{-3}\}
\xrightarrow{\operatorname{Sym}^2}
\{H_0,H_{-3},H_{-6}\}.
}
\]

This is the smallest possible quadratic carrier of the complete
\(B-3L_i\)-graded Majorana matrix and a concrete candidate for the user's
“one carrier, two faces, three relationships” intuition.

What remains open is precisely whether the finite geometry supplies those
two faces.

## Position in the corpus

- [Pati–Salam Majorana \(\Delta^2\) gauge/family separation](1106_the_Pati_Salam_Majorana_block_is_a_genuine_diagonal_A2_defect_but_its_Delta_square_is_gauge_not_family_structure.md)
- [general \(A_{(2)}\) support theorem](1105_the_generalized_quadratic_inner_fluctuation_is_a_first_order_defect_dressing_not_the_square_of_the_charge_three_family_edge.md)
- [coarse arrows cannot determine one-form multiplicity](../1000-1099/1077_coarse_Furey_arrow_incidence_cannot_determine_the_represented_one_form_or_S1_copy_number.md)
- [minimal two-point family algebra](1100_the_minimal_two_point_family_algebra_produces_the_A2_vertex_by_unimodularity_and_a_charge_three_one_form_but_its_full_NCG_embedding_remains_open.md)
- [naïve tensor-family multiplicity obstruction](1108_the_naive_Pati_Salam_tensor_family_algebra_generically_gives_three_Delta_directions_not_the_two_face_carrier.md)
