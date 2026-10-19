# The Completed Furey TRO Carries the \(SO(10)\) Five-Bit Code as a Cartan–Ternary Intertwiner

**Date:** 17 October 2026  
**Branches:** B03, B04, B09, B10, B11 and B14  
**Claim status:** exact finite-dimensional Cartan and ternary intertwiner; full nonabelian, Lorentz and antiunitary intertwiner remains open

## 1. Question

The anomaly-code result and the Furey block programme both singled out the same sixteenth state, \(\nu^c\). A dimension match is not enough. The decisive next question is:

> Can the sixteen completed Furey matter matrix units actually carry the sixteen five-sign \(SO(10)\) weights in a way compatible with their ternary product?

The answer is yes at Cartan level.

## 2. The completed matter TRO

Use the relational neutral blocks \(D\) and \(E\), with the unique completion \(D\to E\). In target-from-source notation the six matter blocks are

\[
\begin{aligned}
Q &: O_2\leftarrow H, &
u^c &: C\leftarrow O_2, &
d^c &: D\leftarrow O_2,\\
L &: H\leftarrow E, &
e^c &: E\leftarrow C, &
\nu^c &: E\leftarrow D.
\end{aligned}
\]

Their complex dimensions are

\[
6+3+3+2+1+1=16.
\]

The support is a direct sum of four rectangular TRO components:

\[
M_{3,2}\oplus M_{2,3}\oplus M_{2,1}\oplus M_{1,2}.
\]

## 3. Explicit five-bit labelling

Write a five-sign weight by the positions carrying a minus sign. The bijection is:

| field | Furey matrix unit | five-bit label |
|---|---|---|
| \(d_i\) | \(E_{O_{2,i},H_4}\) | minus at \(i,4\) |
| \(u_i\) | \(E_{O_{2,i},H_5}\) | minus at \(i,5\) |
| \(u^c_i\) | \(E_{C,O_{2,i}}\) | minus at the two colour positions other than \(i\) |
| \(d^c_i\) | \(E_{D,O_{2,i}}\) | plus only at \(i\) |
| \(\nu\) | \(E_{H_4,E}\) | plus only at \(4\) |
| \(e\) | \(E_{H_5,E}\) | plus only at \(5\) |
| \(e^c\) | \(E_{E,C}\) | minus at \(4,5\) |
| \(\nu^c\) | \(E_{E,D}\) | all plus |

This produces every even-parity vector in \(\{\pm1\}^5\) exactly once.

The map is not an arbitrary permutation of sixteen labels. It respects the rectangular block structure.

## 4. Five Cartan charges factor through the linking action

For each five-bit coordinate \(a=1,\dots,5\), there exist diagonal real potentials

\[
\lambda_a(\text{left index}),
\qquad
\rho_a(\text{right index})
\]

on each connected rectangular component such that every matter matrix unit satisfies

\[
\boxed{
q_a(E_{ts})=\lambda_a(t)-\rho_a(s).
}
\]

Equivalently, the infinitesimal Cartan action is

\[
\delta_a X=L_aX-XR_a
\]

with \(L_a\) and \(R_a\) diagonal in the linking algebras.

This is the required module statement: all five \(SO(10)\) Cartan weight coordinates are represented by the natural two-sided action on the completed TRO.

## 5. Ternary composition preserves the charge code

For matrix units,

\[
E_{ab}E_{cd}^\dagger E_{ef}
\]

is nonzero exactly when

\[
b=d,\qquad c=e,
\]

and then equals \(E_{af}\). Because the charge is left potential minus right potential,

\[
\begin{aligned}
q(E_{ab}E_{cd}^\dagger E_{ef})
&=q(E_{ab})-q(E_{cd})+q(E_{ef})\\
&=q(E_{af}).
\end{aligned}
\]

Thus

\[
\boxed{
q(xy^\dagger z)=q(x)-q(y)+q(z)
}
\]

for every nonzero matrix-unit triple in the matter TRO.

The certificate checks all 80 nonzero matrix-unit compositions. Every output remains in the completed support and carries exactly the predicted five-bit weight.

This is the first explicit bridge in the programme between:

- Furey-style relational block composition;
- a ternary operator system;
- the \(SO(10)\) five-bit charge lattice;
- the triorthogonal anomaly code.

## 6. The cubic anomaly becomes a pure puncture defect

On the full sixteen weights,

\[
\sum_{\text{fields}}q_iq_jq_k=0
\]

for every \(i,j,k\).

The unique all-plus weight is \(\nu^c\). Removing it leaves

\[
\boxed{
\sum_{\text{15 fields}}q_iq_jq_k=-1
}
\]

for every \(i,j,k\). In tensor notation the punctured cubic anomaly is

\[
-\mathbf1^{\otimes3},
\]

the negative pure cube of the removed logical weight.

This sharpens the earlier scalar statement \(\sum\chi^3=-125\). The entire five-dimensional Cartan anomaly tensor of the punctured generation is exactly the logical pure cube.

Restoring the Furey arrow

\[
\nu^c:E\leftarrow D
\]

therefore does two things simultaneously:

1. closes the matter TRO with the unique minimal neutral arrow;
2. cancels the rank-one cubic anomaly defect of the punctured code.

That coincidence is now an explicit representation theorem, not a dimension analogy.

## 7. What “intertwiner” means here

The established intertwiner preserves:

- the sixteen field labels;
- all five Cartan weights;
- the two-sided diagonal linking action;
- ternary matrix-unit composition;
- the complete cubic anomaly tensor;
- the puncture/restoration role of \(\nu^c\).

It does not yet preserve or derive:

- the raising and lowering operators of full \(SO(10)\);
- the precise \(SU(3)_c\times SU(2)_L\) nonabelian matrices in Furey’s latest model;
- Lorentz chirality and Grassmann parity;
- Furey’s conjugation as the code’s particle-hole operation;
- Yukawa values or generation mixing;
- the external \(H_2(\mathbb R)\) response carrier.

The correct name is therefore **Cartan–ternary intertwiner**, not a completed \(SO(10)\)-Furey equivalence.

## 8. Relation to Jordan-triple recursion

The product used here is the TRO product

\[
[x,y,z]_{\mathrm{TRO}}=xy^\dagger z.
\]

Symmetrizing the outer variables gives the associated Jordan triple:

\[
\{x,y,z\}
=\frac12(xy^\dagger z+zy^\dagger x).
\]

Because both terms have weight \(q(x)-q(y)+q(z)\), the five-bit charge grading also respects the Jordan triple.

This proves that anomaly-code labels are compatible with the same ternary composition language that generates the programme’s relational carrier. It does not yet prove that compression of this sixteen-state triple selects \(H_2(\mathbb R)\) or \(Sp(4,\mathbb R)\).

## 9. New branch structure

### Branch A — nonabelian extension

Construct the colour and weak raising/lowering operators on the sixteen matrix units and compare them with the standard \(SO(10)\) spinor action.

**Stop-everything result:** the full Standard Model gauge action is induced by the same left/right linking algebra without additional arbitrary representation choices.

### Branch B — conjugation and particle-hole sewing

Transport Furey conjugation through the explicit weight bijection and compare it with sign reversal, complement, Dirac pairing and code doubling.

**Stop-everything result:** one antiunitary simultaneously implements the Furey particle/antiparticle map, the doubled-code pairing and the real-form selector.

### Branch C — logical coordinate to two-face response

Compress the completed TRO along the puncture/restoration pair and ask whether the Schur response is a canonical positive \(2\times2\) real symmetric matrix.

**Stop-everything result:** the logical sterile coordinate produces the same \(H_2(\mathbb R)\) carrier whose conformal group is \(Sp(4,\mathbb R)\cong Spin_0(2,3)\).

### Branch D — cubic polarization

Compare the pure puncture cube and its three-generation sewing with polarized exceptional-Jordan cubic data.

**Stop-everything result:** an explicit integral map carries the anomaly tensor to a restriction of the exceptional determinant.

## 10. Falsification gates

**Nonabelian falsifier:** Cartan factorization fails to extend to the root operators without adding mirror states or leaving the completed TRO.

**Conjugation falsifier:** the Furey antiunitary sends the all-plus sterile coordinate to a state inconsistent with the doubled-code pairing.

**Triple falsifier:** any claimed extension violates \(q(xy^\dagger z)=q(x)-q(y)+q(z)\).

**Spin falsifier:** the logical pair yields only a generic complex response and no selected real \(H_2\) cone.

**Cubic falsifier:** no integral polarized map relates the anomaly tensor to the exceptional determinant.

**Scope falsifier:** promote the verified Cartan action to full \(SO(10)\) covariance without constructing root operators.

## 11. Certificate

The [Cartan–ternary intertwiner certificate](scripts/verify_furey_completed_tro_so10_cartan_intertwiner.mjs) checks:

- the field-to-weight bijection;
- all sixteen distinct even-parity weights;
- the \(6+3+3+2+1+1\) representation count;
- left-minus-right factorization of all five Cartan coordinates;
- all 80 nonzero matrix-unit ternary compositions;
- vanishing of the full cubic tensor;
- the punctured tensor \(-\mathbf1^{\otimes3}\);
- uniqueness of \(\nu^c\) as the all-plus coordinate.

## Companion documents

- [Standard-Model triorthogonal-code bridge](410_standard_model_triorthogonal_code_bridge_and_golay_integrality_gate.md)
- [Unique right-handed-neutrino TRO completion](167_unique_right_handed_neutrino_tro_completion_and_spin23_tradeoff.md)
- [Four anomaly-free one-generation TROs](110_furey_anomaly_free_one_generation_tros.md)
- [Furey \(Cl(6)\) minimal-ideal baseline](60_furey_cl6_minimal_ideal_encoding.md)
- [Relational-carrier Jordan-triple composition](41_relational_carrier_jordan_triple_composition.md)
