# Furey’s Weak Jordan Block and the \(Spin(2,3)\) Middle Rung

**Date:** 16 October 2026  
**Branches:** B01, B03, B04 and B11  
**Claim status:** source-level block structure established; \(H_2(\mathbb R)\) intermediate is exact mathematics but its physical selection is a new conjecture

## 1. Why the primary-source audit changes the branch

The 2026 nested-embedding paper uses the centralizer algebra

\[
\Delta_{\rm SM}
=\mathbb C\oplus M_3(\mathbb C)\oplus M_2(\mathbb C)
\oplus\mathbb C\oplus\mathbb R
\]

before electroweak symmetry breaking, and

\[
\Delta_{\rm LE}
=\mathbb C\oplus M_3(\mathbb C)\oplus\mathbb C\oplus
\mathbb C\oplus\mathbb C\oplus\mathbb R
\]

after the second quaternionic centralizer restriction. The precise replacement is

\[
M_2(\mathbb C)\longmapsto\mathbb C\oplus\mathbb C.
\]

The paper equips these matrix algebras with their natural blockwise anti-involution \(\dagger\), then separates anti-Hermitian Lie generators from Hermitian Jordan observables. This is explicit in Sections VI–VII of [Furey’s v3 paper](https://arxiv.org/html/2607.18450v3#S6).

This corrects the programme’s earlier framing. The exact involution of this 2026 construction is not an unspecified swap between the two minimal \(Cl(6)\) ideals. It is matrix \(\dagger\) on the centralizer blocks. The swap-conjugation model remains a valid calculation for the older ideal-plus-conjugate representation, but it is not the missing definition in this newer model.

## 2. The source already speaks Jordan language

For any centralizer block algebra \(\Delta\), define

\[
\mathcal L_\Delta=\{u:u^\dagger=-u\},
\qquad
\mathcal H_\Delta=\{h:h^\dagger=h\}.
\]

The source uses

\[
m(a,b)=ab+ba^\dagger.
\]

On Hermitian elements this is the Jordan anticommutator, while on anti-Hermitian elements it is the Lie commutator. Furey interprets \(\mathcal L_\Delta\) as symmetries and \(\mathcal H_\Delta\) as observables, with positive trace-one Hermitian elements as states.

The full Hermitian dimensions are

\[
\dim_{\mathbb R}\mathcal H_{\Delta_{\rm SM}}=1+9+4+1+1=16,
\]

and

\[
\dim_{\mathbb R}\mathcal H_{\Delta_{\rm LE}}=1+9+1+1+1+1=14.
\]

The corresponding anti-Hermitian dimensions before imposing the source’s highest-grade and trace conditions are \(15\) and \(13\).

## 3. The exact weak-sector ladder

The Hermitian part of the pre-Higgs weak block is

\[
H_2(\mathbb C).
\]

The Hermitian part of the post-Higgs replacement is

\[
\mathbb R\oplus\mathbb R,
\]

the diagonal Hermitian \(2\times2\) matrices. Between them lies the canonical real-symmetric Jordan algebra:

\[
\boxed{
H_2(\mathbb C)
\supset
H_2(\mathbb R)
\supset
\mathbb R\oplus\mathbb R.
}
\]

All inclusions preserve the Jordan product. Their real dimensions are

\[
4\supset3\supset2.
\]

In matrix coordinates,

\[
\begin{pmatrix}a&x+iy\\x-iy&b\end{pmatrix}
\longmapsto
\begin{pmatrix}a&x\\x&b\end{pmatrix}
\longmapsto
\begin{pmatrix}a&0\\0&b\end{pmatrix}.
\]

The first restriction removes the imaginary off-diagonal observable. The second removes the remaining real off-diagonal mixing.

## 4. The conformal-algebra ladder

The determinant forms have signatures

\[
\begin{array}{c|c|c}
J&\operatorname{sig}(\det)&\mathfrak{co}(J)\\ \hline
H_2(\mathbb C)&(1,3)&\mathfrak{so}(2,4)\\
H_2(\mathbb R)&(1,2)&\mathfrak{so}(2,3)\\
\mathbb R\oplus\mathbb R&(1,1)&\mathfrak{so}(2,2)
\end{array}
\]

and therefore

\[
\boxed{
\mathfrak{so}(2,4)
\supset
\mathfrak{so}(2,3)
\supset
\mathfrak{so}(2,2).
}
\]

At group level, using identity components and the appropriate covers,

\[
Spin_0(2,4)
\supset
Spin_0(2,3)
\supset
Spin_0(2,2).
\]

This is the strongest exact meeting found so far between the current \(Spin(2,3)\) programme and Furey’s newest Jordan structure. The middle group is not attached by a dimension coincidence: it is the conformal group of the unique obvious real Jordan algebra strictly between the source’s pre- and post-Higgs weak observable blocks.

## 5. What is established and what is new

### Established by the source

- the centralizer blocks \(\Delta_{\rm SM}\) and \(\Delta_{\rm LE}\);
- the replacement \(M_2(\mathbb C)\to\mathbb C\oplus\mathbb C\);
- the natural matrix anti-involution \(\dagger\);
- Lie–Jordan splitting;
- extraction of \(\mathfrak{su}(3)\oplus\mathfrak{su}(2)\oplus\mathfrak u(1)\) and \(\mathfrak{su}(3)\oplus\mathfrak u(1)\) using highest-grade stabilizers and trace conditions;
- the hypercharge and charge weights.

### Established mathematics added here

- the nested Jordan subalgebra chain;
- the determinant-signature chain;
- the corresponding conformal Lie-algebra chain;
- exact dimension and closure checks.

### Candidate physical bridge

The new hypothesis is that a physical real structure selects \(H_2(\mathbb R)\) as an intermediate weak observable algebra before full diagonalization. Furey’s paper does not make this selection and does not derive \(Spin(2,3)\).

## 6. Why the middle rung is potentially decisive

The programme had previously found \(H_2(\mathbb R)\) from relational response, phase space and boundary data. The Furey construction now supplies \(H_2(\mathbb C)\) independently as a weak-sector observable block and \(\mathbb R\oplus\mathbb R\) as its low-energy diagonal descendant.

If one physical involution both:

1. removes the imaginary off-diagonal weak observable, and
2. defines the real external response carrier,

then \(Spin_0(2,3)\) would genuinely mediate between internal weak mixing and external relational geometry. That would be a stop-everything result because the same selector would have arisen independently on both sides of the proposed interface.

But the middle rung could also be merely available rather than selected. Every complex matrix algebra has a real form; availability alone is not physics.

## 7. Relation to electroweak symmetry breaking

The chain should not be called the Higgs mechanism without further work. In the source, the algebraic replacement follows from a second quaternionic centralizer restriction. In the Standard Model, electroweak breaking is dynamical and controlled by a Higgs doublet vacuum expectation value.

The essential next comparison is an intertwiner calculation:

- identify how the Higgs representation sits in the endomorphism model;
- determine whether the real off-diagonal coordinate of \(H_2(\mathbb R)\) is a gauge choice, a radial Higgs observable, a CP-even mixing coordinate or none of these;
- verify that the complex off-diagonal direction removed at the first step is related covariantly to CP or charge conjugation rather than a chosen matrix basis;
- recover the correct (W^\pm\), (Z\) and photon mass pattern from dynamics.

Until then, the ladder is a structural bridge, not a derivation of electroweak phenomenology.

## 8. Correction to the commutant pin

There are now two distinct Furey tracks:

1. **Minimal-ideal track:** the encoded \(Cl(6)\) ideal and its conjugate, where an explicit particle-level anti-linear conjugation and full weak/chiral action remain needed.
2. **2026 endomorphic track:** the centralizer algebra, whose anti-involution is already the natural blockwise \(\dagger\), but whose full particle module, chirality, Yukawa structure and dynamical Higgs interpretation remain incomplete.

Conflating them would manufacture a missing involution in one track and import it without proof into the other.

## 9. Stop-everything and falsification tests

**Stop-everything positive:** a basis-independent physical involution on Furey’s weak block fixes \(H_2(\mathbb R)\), agrees with the external interface involution, and leaves the observed hypercharge/chiral module intact.

**Stop-everything negative:** every such real form is basis-equivalent and physically arbitrary, or the restriction eliminates the complex structure required for weak charge, CP violation or chirality.

**Current status:** the middle rung is exact and newly exposed; its physical selector is open.

## 10. Certificate

[`scripts/verify-furey-weak-jordan-ladder.mjs`](scripts/verify-furey-weak-jordan-ladder.mjs) verifies the three nested Jordan subspaces, their closure, determinant signatures, centralizer Hermitian/anti-Hermitian dimensions and the source’s (3/8) mean charge trace using explicit block ranks.

## Primary source

- N. Furey, [*Standard Model Symmetries and the Nested Embeddings of \(\mathbb R\subset\mathbb C\subset\mathbb H\subset\mathbb O\)*, v3](https://arxiv.org/html/2607.18450v3), especially Sections V–VIII.

## Companion documents

- [Furey comprehensive review](02_furey_comprehensive_research_review.md)
- [Furey technical guide](03_furey_technical_algebraic_guide.md)
- [Exact Jordan–(Sp(4,\mathbb R)) determination](42_jordan_triple_to_sp4r_determination.md)
- [Jordan selection and conformal descent](44_jordan_selection_axioms_and_spin24_to_spin23_descent.md)
- [Canonical conjugate-pair real structure](65_canonical_real_structure_commutant_model.md)
- [Weak real-form stabilizer obstruction](71_weak_real_form_stabilizer_obstruction.md)
- [Furey-track intertwiner dimension trap](72_furey_track_intertwiner_dimension_trap.md)
