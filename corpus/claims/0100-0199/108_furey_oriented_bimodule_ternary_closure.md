# Furey Orientation as an Exact Ternary Bimodule

**Date:** 17 October 2026  
**Branches:** B03, B08 and B11  
**Claim status:** finite block theorem and exhaustive certificate; physical source of the polarization remains open

## 1. The interaction-closure question

The sixteen successful orientation maps have the form

\[
\Phi(X)=LXR,
\qquad L^2=R^2=1,
\]

on the five Furey blocks

\[
\mathbb V=O_1\oplus O_2\oplus H\oplus C\oplus R.
\]

They put the three Higgs-like arrows in the (+1) eigenspace and their three lepton-like dagger reverses in the (-1) eigenspace. They are not algebra automorphisms. The useful replacement question is therefore:

> Is either eigenspace closed under the natural operator triple product (XY^\dagger Z)?

This is the minimal closure law for a concrete operator bimodule or ternary ring of operators.

## 2. Exact rectangle theorem

Write (E_{ts}\in\operatorname{Hom}(V_s,V_t)) for a matrix unit at the block level and let

\[
L|_{V_t}=l_t,
\qquad
R|_{V_s}=r_s,
\qquad l_t,r_s\in\{\pm1\}.
\]

Then

\[
\Phi(E_{ts})=l_t r_s E_{ts}.
\]

For either sign \(\epsilon\), the support of the eigenspace

\[
M_\epsilon=\{X:\Phi(X)=\epsilon X\}
\]

is a union of two complete source–target rectangles:

\[
\{t:l_t=+1\}\times\{s:r_s=\epsilon\}
\quad\cup\quad
\{t:l_t=-1\}\times\{s:r_s=-\epsilon\}.
\]

Now take three supported matrix units. The only nonzero case is

\[
E_{ab}E_{cb}^{\dagger}E_{cf}=E_{af}.
\]

The first and second arrows share a source, so their target signs agree; the second and third share a target, so their source signs agree. Consequently (l_a r_f=\epsilon), and (E_{af}\in M_\epsilon). Thus

\[
\boxed{M_\epsilon M_\epsilon^\dagger M_\epsilon\subseteq M_\epsilon.}
\]

This proof does not depend on the dimensions of the five blocks and applies to all sixteen orientation solutions.

## 3. Exhaustive result

The certificate finds:

\[
\begin{array}{c|cc}
&M_+&M_-\\ \hline
\text{ordinary multiplication closed}&0/16&0/16\\
\text{dagger closed}&0/16&0/16\\
XY^\dagger Z\text{ closed}&16/16&16/16.
\end{array}
\]

Depending on the sign assignment, the complex dimension split is one of

\[
44+20,quad 26+38,quad 32+32,quad 38+26,quad 20+44,
\]

always totaling \(\dim_{\mathbb C}\operatorname{End}(\mathbb V)=64\).

The first orientation solution, for example, has a 44-dimensional (M_+) and a 20-dimensional (M_-). Neither is an associative algebra, but both are ternary rings of operators.

## 4. The forced associative completion

For one chosen eigenspace (M), define

\[
A_L=\operatorname{span}(MM^\dagger),
\qquad
A_R=\operatorname{span}(M^\dagger M).
\]

Then

\[
A_LM\subseteq M,
\qquad
MA_R\subseteq M,
\qquad
MM^\dagger M\subseteq M.
\]

The natural dagger-closed associative object is the linking algebra

\[
\mathcal L(M)=
\begin{pmatrix}
A_L&M\\
M^\dagger&A_R
\end{pmatrix}.
\]

This makes the original (AXB) language precise. (A) and (B) act on two faces of a relational carrier; the carrier itself is the off-diagonal bimodule (M). Ordinary multiplication leaves (M), whereas a left action, right action, or ternary composition returns to it. A later stress audit sharpens the associated “left/right/cross triplet”: the three objects become one \(SO(3)\) triplet only after they are assembled as the traceless Pauli coefficients of a Hermitian \(2\times2\) linking matrix. See [Left, right and cross stress form a triplet only as the Pauli part of a face matrix](../0200-0299/299_left_right_and_cross_stress_form_a_triplet_only_as_the_pauli_part_of_a_face_matrix.md).

## 5. Jordan-triple meaning

Symmetrizing the operator triple product gives

\[
\{X,Y,Z\}
=\frac12\left(XY^\dagger Z+ZY^\dagger X\right),
\]

so every oriented eigenspace is also a concrete Hermitian Jordan triple system.

This is a real bridge to the programme’s central language:

\[
\boxed{
\text{two-sided orientation}
\Longrightarrow
\text{TRO/bimodule}
\Longrightarrow
\text{Hermitian Jordan triple closure}.
}
\]

It does **not** by itself imply

\[
Sp(4,\mathbb R)\cong Spin_0(2,3).
\]

That exact group follows for the specifically selected real rank-two Jordan carrier (H_2(\mathbb R)) and its conformal/Tits–Kantor–Koecher construction. The Furey-oriented TRO supplies the correct *category of composition*, but a source principle must still reduce or couple it to that four-dimensional carrier. This distinction prevents a categorical match from being promoted into a group-identification proof.

## 6. Which interactions close

The ternary law permits canonical positive and quartic structures such as

\[
\operatorname{Tr}(X^\dagger X),
\qquad
\operatorname{Tr}(X^\dagger X X^\dagger X),
\]

and equations of motion built from (XX^\dagger X). Gauge transformations that are block diagonal commute with (L) and (R), so they preserve the eigenspaces.

But the following do not follow automatically:

- a fermionic statistics assignment;
- an anomaly-free chiral subset;
- a unique Higgs copy;
- closure of every Standard-Model Yukawa term;
- a physical origin for (L) and (R);
- a reduction from the large TRO to the (H_2(\mathbb R)) carrier.

The linking algebra also restores (M^\dagger) as a companion corner. This is mathematically required for positivity, but it does not mean that both corners must be independent propagating chiral fermions. Their field-theoretic roles have to be stated explicitly.

## 7. Research decision

The oriented branch survives, but in a narrower and stronger form:

- **established:** every orientation solution is ternary closed;
- **falsified:** the selected space is an associative or dagger-closed particle algebra;
- **candidate bridge:** source and target boundary data select a TRO whose Jordan triple couples to the external (H_2(\mathbb R)) carrier;
- **next gate:** find a physical submodule/statistics rule whose interactions and anomalies close.

**Stop-everything positive:** a causal or boundary construction produces the same (L,R), the resulting linking action selects the Standard-Model matter subset, and the induced rank-two real response is the external Jordan carrier.

**Negative:** the only positive action requires both orientations as independent mirror fermions, reducing the construction to a vectorlike rewrite.

## 8. Certificate

The [ternary-closure certificate](../../../verification/verify/verify-furey-oriented-bimodule-closure.mjs) exhausts all sixteen sign solutions, checks ordinary, dagger and ternary closure on every supported block matrix unit, and records all dimension signatures.

## Companion documents

- [Two-sided Furey Higgs/lepton polarization](107_furey_two_sided_higgs_lepton_polarization.md)
- [Relational carrier and Jordan-triple composition](../0000-0099/41_relational_carrier_jordan_triple_composition.md)
- [Exact Jordan-triple to \(Sp(4,\mathbb R)\) determination](../0000-0099/42_jordan_triple_to_sp4r_determination.md)
- [Oriented-sector anomaly audit](109_furey_oriented_sector_anomaly_audit.md)

