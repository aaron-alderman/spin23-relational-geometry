# A Degree-Eight Selector Produces Eight Local \(Spin(2,3)\) Defects

**Date:** 17 October 2026  
**Branches:** B01, B04, B07, B09 and B11  
**Claim status:** exact model of a real-plane selector in the Chern-eight relationship line; physical interpretation of the defects remains open

## 1. Explicit selector model

Identify the celestial sphere with \(\mathbb{CP}^1\). Model the relationship line by the holomorphic line bundle

\[
\mathcal R\cong\mathcal O(8),
\qquad c_1(\mathcal R)=8.
\]

On the finite coordinate patch \(z\in\mathbb C\), choose the section

\[
s_N(z)=z^8-1.
\]

On the patch at infinity, with \(w=1/z\), the degree-eight transition gives

\[
s_S(w)=w^8s_N(1/w)=1-w^8.
\]

This is regular and nonzero at \(w=0\), so the section has exactly eight simple zeros:

\[
z_k=e^{2\pi i k/8},
\qquad k=0,\ldots,7.
\]

## 2. Local real carrier away from the defects

Where \(s\ne0\), use \(s/|s|\) as the selected relationship phase. Every relationship section \(r\) can locally be written

\[
r=\xi s.
\]

The selected real slice is

\[
\xi\in\mathbb R.
\]

Together with the two global diagonal face intensities, this defines a local \(H_2(\mathbb R)\) carrier and hence the local conformal geometry

\[
Sp(4,\mathbb R)\cong Spin_0(2,3).
\]

At a zero of \(s\), the chosen phase is undefined and the real slice merges back into the complex parent \(H_2(\mathbb C)\).

## 3. Defect index

Near a simple root \(z_k\),

\[
s(z)\simeq 8z_k^7(z-z_k).
\]

On a small positively oriented loop around the root, \(\arg s\) winds once. Summing the eight local indices gives

\[
\sum_k\operatorname{ind}_{z_k}(s)=8=c_1(\mathcal R)[S^2].
\]

This is the explicit topological accounting required by the Chern-eight obstruction.

## 4. What the defects mean—and do not mean

The construction proves that a real-form selector can exist on the complement of eight points. It does not prove that nature contains eight new particles or spacetime defects. The zeros live initially in momentum-direction space.

Possible interpretations include:

- polarization vortices or singular directions;
- patch boundaries in an amplitude description;
- nodes of a dynamical locking field;
- topological charges that move and merge under deformation;
- evidence that the complex parent carrier is fundamental and the real reduction only local.

Only an action and observable map can decide among these.

## 5. Robust versus model-dependent content

The positions of the eight roots in \(z^8-1\) are a symmetric model choice. A generic section moves and splits the zeros. What is invariant is only the total signed multiplicity:

\[
\text{total selector index}=8.
\]

Zeros may coincide into higher-order defects, but they cannot all disappear unless another bundle supplies inverse Chern class or the real reduction is abandoned.

## 6. Sewing domains

On every defect-free patch, the real Jordan product and Schur recursion are valid. Across patch overlaps, selector phases relate the local \(H_2(\mathbb R)\) descriptions. A path encircling a defect returns with nontrivial selector winding.

Global sewing must therefore be formulated either:

1. in the parent twisted \(H_2(\mathbb C)\) bundle, where the Jordan operations glue automatically; or
2. in local real domains augmented by selector transition and defect data.

Ignoring the defects while using a single global real matrix loses topological information.

## 7. Stop-everything and falsification gates

**Eight-index signal:** a derived selector or polarization observable has total winding eight over the celestial sphere.

**Defect-free success:** an independently derived Chern-minus-eight field cancels the relationship bundle and removes all selector zeros.

**Falsifier:** a smooth everywhere-nonzero real selector is asserted on \(\mathcal O(8)\) without inverse bundle data.

**Physical gate:** determine whether the zeros coincide with measurable null directions or are gauge-dependent patch artifacts.

**Dynamics gate:** derive the selector section and its zero distribution from an action rather than choosing \(z^8-1\).

## 8. Certificate

The [degree-eight selector certificate](../../../verification/verify/verify_degree_eight_selector_defects.mjs) verifies all eight roots, their simplicity, unit local winding, regularity at infinity and total index eight.

## Companion documents

- [Twisted H2(C) parent carrier](219_twisted_helicity_carrier_glues_as_h2c_spin24_before_spin23_reduction.md)
- [Chern-eight relationship obstruction](217_opposite_helicity_carrier_has_chern_eight_relationship_obstruction.md)
- [Jordan selection axioms](../0000-0099/44_jordan_selection_axioms_and_spin24_to_spin23_descent.md)
