# The Prakash–Ramya Cubic Lattice Fixes a Primitive Meridian Plane, but Not Its Symplectic Duals

**Date:** 17 October 2026  
**Primary source:** Shiroman Prakash and K. L. Ramya, [“One generation of the Standard Model as a quantum error-correcting code,” arXiv:2610.21879v1](https://arxiv.org/abs/2610.21879v1)  
**Reproducibility source:** [spdei/standard-model-code, version 1.0](https://github.com/spdei/standard-model-code)  
**Branches:** B01, B03, B04, B05, B07, B09, B10, B11 and B14  
**Claim status:** exact integral existence and classification theorem; the source-derived choice of symplectic duals remains open

## 1. Executive result

The new source is unusually close to the programme's arithmetic core. It proves that the five-bit \(SO(10)\) weight system of one generation is an **integral cubic charge lattice** whose anomaly-cancellation equation becomes triorthogonality modulo every prime. Puncturing \(\nu^c\) gives a \([[15,1,3]]_p\) code; the binary shadow is the Bravyi–Kitaev code, and the ternary shadow is the unique shortest distance-three triorthogonal qutrit code.

However, the source does **not** identify its cubic lattice with a rank-four symplectic lattice. Three objects must be kept distinct:

1. the five-dimensional \(SO(10)\) Cartan charge space;
2. the quotient of five selected field coordinates by their one primitive charge relation;
3. the logical Pauli phase space of a punctured CSS code.

The previous cycle found that the selected Furey support fields present

\[
V_{\rm supp}=\mathbb Z^5/\langle(1,2,-1,1,1)\rangle\cong\mathbb Z^4.
\]

This cycle proves the strongest statement currently justified:

\[
\boxed{\langle[Z_D],[Z_C]\rangle\subset V_{\rm supp}
\text{ is a primitive rank-two plane and therefore admits integral
unimodular symplectic completions.}}
\]

One explicit completion and alternating form can be written down. But neither the cubic anomaly form nor the restricted physical Dirac pairing selects that completion. The source fixes the meridians; it has not yet fixed their longitudes.

## 2. What the paper establishes

The sixteen fields of one \(SO(10)\) spinor are labelled by the even-parity sign vectors

\[
q\in\{\pm1\}^5.
\]

For charge words \(x,y,z\), the anomaly form is

\[
\tau(x,y,z)=\sum_{\ell=1}^{16}x_\ell y_\ell z_\ell.
\]

Its vanishing on the integral charge lattice is simultaneously:

- cancellation of all cubic Cartan anomalies;
- an integral triorthogonality identity;
- after reduction modulo \(p\), the condition enabling the transversal non-Clifford gate of the punctured code.

The paper further identifies doubling with physical Dirac pairing: right-handed fields and their Dirac partners furnish the two copies, while weak isospin is the chiral linking row. This is a genuine structural bridge, not a numerical resemblance.

It is still a bridge between a **symmetric cubic form** and a code. A symplectic commutator is an **alternating bilinear form**. No polarization identity turns the former canonically into the latter.

## 3. Quotient coordinates and the exact sum-axis relation

Use field order

\[
(u^c_1,d_1,e,\nu,d^c_1)
\]

and eliminate \(e\) with the source relation

\[
e=u^c_1+2d_1+\nu+d^c_1.
\]

In the quotient basis

\[
(u^c_1,d_1,\nu,d^c_1),
\]

the three transvection axes are

\[
\begin{aligned}
z_D&=(0,-1,-1,-1),\\
z_C&=(-1,-1,-1,0),\\
z_{C+D}&=(-1,-2,-2,-1).
\end{aligned}
\]

Hence

\[
\boxed{z_{C+D}=z_D+z_C.}
\]

The six \(2\times2\) minors of the \(4\times2\) matrix \((z_D\ z_C)\) have greatest common divisor one. Therefore

\[
L=\langle z_D,z_C\rangle
\]

is a primitive direct summand of \(V_{\rm supp}\). This is stronger than linear independence over \(\mathbb Q\): the quotient \(V_{\rm supp}/L\) is torsion-free.

## 4. An explicit integral symplectic completion

The four columns

\[
P=(z_D,z_C,\nu,d^c_1)
=
\begin{pmatrix}
0&-1&0&0\\
-1&-1&0&0\\
-1&-1&1&0\\
-1&0&0&1
\end{pmatrix}
\]

have determinant \(-1\), so they form an integral basis.

Declare this basis symplectic by

\[
\Omega(z_D,\nu)=1,
\qquad
\Omega(z_C,d^c_1)=1,
\]

with all other elementary pairings fixed by alternation and the requirement that both displayed planes are isotropic. In the quotient basis this gives

\[
\boxed{
\Omega=
\begin{pmatrix}
0&0&1&-1\\
0&0&-1&0\\
-1&1&0&0\\
1&0&0&0
\end{pmatrix},
\qquad \det\Omega=1.}
\]

Thus the required integral symplectic structure exists, and \(L\) is Lagrangian.

This is an existence proof, not a source derivation. The particular duals \((\nu,d^c_1)\) were chosen because they complete the lattice integrally, not because the anomaly code proves they are conjugate momenta.

## 5. Complete classification with the meridian plane fixed

In any basis beginning with \((z_D,z_C)\), an alternating form for which \(L\) is isotropic has block form

\[
\Omega_{A,b}=
\begin{pmatrix}
0&A\\
-A^T&b\varepsilon
\end{pmatrix},
\qquad
\varepsilon=
\begin{pmatrix}0&1\\-1&0\end{pmatrix}.
\]

Its determinant is

\[
\det\Omega_{A,b}=(\det A)^2.
\]

It is therefore unimodular exactly when

\[
A\in GL(2,\mathbb Z),\qquad b\in\mathbb Z.
\]

After choosing ordered duals one may normalize \(A=I_2\), and an integral shear removes \(b\). Consequently all such forms are abstractly symplectically standard. What is missing is not an isomorphism class; it is a **canonical source-selected identification**.

For one fixed \(\Omega\), its Lagrangian complements are

\[
X_S=X_0+LS,
\qquad S=S^T\in\operatorname{Sym}_2(\mathbb Z).
\]

This is an affine three-parameter family. Those three integers are exactly the two self-framings and one mutual framing expected for the two-handle carrier. The previously encountered framing freedom is therefore not accidental; it is the universal ambiguity in choosing a Lagrangian complement.

## 6. Why Dirac doubling does not yet choose the dual plane

The paper's doubling theorem pairs

\[
u^c_i\leftrightarrow u_i,\qquad
d^c_i\leftrightarrow d_i,\qquad
e^c\leftrightarrow e,\qquad
\nu^c\leftrightarrow\nu.
\]

Inside the selected five-field support, only

\[
d_1\leftrightarrow d^c_1
\]

is a closed Dirac pair. The partners \(u_1,e^c,\nu^c\) of the other selected fields lie outside the support. Hence restriction of the physical Dirac pairing to this support has rank at most two and cannot be the required nondegenerate rank-four alternating form.

This is a productive obstruction. It says the missing dual plane must come from one of three places:

1. enlarge the support to the full doubled one-generation carrier;
2. use the dual-character sector of the two-puncture CSS code;
3. obtain the longitudes from the external Jordan/response carrier and prove compatibility with every prime shadow.

## 7. The exact interface still to be constructed

For a two-logical-qudit CSS code, the logical Pauli exponents have the canonical phase space

\[
\mathcal P_p=L_{X,p}\oplus L_{X,p}^{\!*}\cong\mathbb F_p^4
\]

with its commutator pairing. The desired bridge is now a precise arithmetic map, not a verbal analogy:

\[
\Phi:\bigl(V_{\rm supp},\Omega\bigr)
\longrightarrow
\mathcal P_{\mathbb Z}
\]

such that for \(p=2\) and \(p=3\):

1. \(\Phi\bmod p\) equals the independently computed puncture-label/dual-character map;
2. \(z_D,z_C,z_D+z_C\) map to the three certified transvection axes;
3. the integral word \(T_{z_D+z_C}^2T_{z_D}T_{z_C}\) reduces to the known binary and qutrit logical phases;
4. \(\Lambda_0^2\Phi\) carries the selector complement to the index-six \(Spin(2,3)\) lattice already constructed.

If one \(\Phi\) satisfies all four conditions without a fitted basis, the central programme advances sharply. It would turn the finite code shadows into reductions of the same integral symplectic carrier.

## 8. What the paper changes in the research tree

### Established

- the one-generation charge lattice is integral and cubic-triorthogonal;
- its prime reductions are a compatible family rather than unrelated codes;
- puncturing \(\nu^c\) is physically distinguished by gauge neutrality;
- doubling has the concrete meaning of Dirac pairing plus a weak-isospin link;
- the binary and ternary constructions retain different integral phase refinements.

### Newly established here

- the Furey support quotient contains a primitive meridian plane;
- integral unimodular symplectic completions exist;
- all such completions have the block classification above;
- for fixed \(\Omega\), the complement ambiguity is exactly \(\operatorname{Sym}_2(\mathbb Z)\);
- the restricted Dirac pairing is degenerate and cannot choose the completion.

### Still open

- a canonical integral dual-character lattice before reduction modulo \(p\);
- a source-derived map from selected field relations to logical Pauli characters;
- a proof that the same map works at \(p=2\), \(p=3\) and over \(\mathbb Z\);
- a physical reason for the second puncture or relational port;
- an invariant passage from the cubic anomaly tensor to the external Jordan triple.

## 9. Stop-everything and falsification gates

### Stop-everything triggers

1. The two-puncture parity-check complex produces an integral \(\Phi\) satisfying all four compatibility tests.
2. Furey's ternary/linking operators select one Lagrangian complement \(X_S\) equivariantly.
3. Stress-energy bilinears land in the corresponding primitive two-forms and reproduce the selector without a chosen basis.
4. The full Dirac-doubled support induces the same \(\Omega\) after symplectic reduction.

### Falsifiers

- Rank four by itself is not evidence for \(Sp(4)\).
- The symmetric cubic anomaly tensor is not the alternating commutator form.
- An arbitrarily chosen integral completion is not a physical derivation.
- The restricted one-pair Dirac form cannot be called nondegenerate.
- A prime-by-prime identification that has no common integral lift does not establish the continuous carrier.

## 10. Next executable branch

Construct the two-puncture CSS chain complex over \(\mathbb Z\), not merely over \(\mathbb F_2\) or \(\mathbb F_3\), and compute:

1. its Smith normal form;
2. integral representatives for logical \(X\) words and dual \(Z\) characters;
3. the pullback of the commutator pairing to \(V_{\rm supp}\);
4. whether the resulting \(\Omega\) is independent of stabilizer lifts;
5. whether its two prime reductions reproduce the already certified phases.

## Certificate and companions

- [Symplectic-form classification certificate](../../../verification/classify/classify_symplectic_forms_on_furey_support_quotient.mjs)
- [Rank-four Furey support quotient](517_the_five_furey_support_weights_present_a_rank_four_spinor_quotient_not_a_rank_five_vector_basis.md)
- [Original Prakash–Ramya source audit](../0400-0499/410_standard_model_triorthogonal_code_bridge_and_golay_integrality_gate.md)
- [Integral cubic-to-prime-shadow assessment](../0400-0499/496_the_standard_model_code_supplies_an_integral_cubic_to_prime_shadow_architecture_but_not_yet_the_spin23_map.md)
- [Two-puncture finite symplectic shadow](../0400-0499/450_two_punctures_produce_an_exact_finite_sp4_shadow_but_do_not_select_the_spin23_real_carrier.md)
- [Primitive wedge-square dictionary](509_the_index_six_spin23_lattice_has_an_explicit_primitive_wedge_square_and_lorentz_selector_dictionary.md)
