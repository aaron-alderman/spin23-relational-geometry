# Exact Flavor Degeneracy Enlarges the Conjugation Space to Products of (U(m)/O(m)) and Kills Static Jarlskog CP

**Date:** 17 October 2026  
**Branches:** B01, B03, B06, B08 and B11  
**Claim status:** exact finite-dimensional antiunitary classification and certified three-flavor consequence

## 1. Problem

For a nondegenerate Hermitian flavor spurion, the involutive antiunitaries fixing it form one phase circle for each eigenline. The previous result was a \(U(1)^3\) family.

At exact degeneracy there are no canonical eigenlines inside a degenerate eigenspace. The phase torus must therefore enlarge. The exact replacement is a product of compact symmetric spaces.

## 2. General classification

Let

\[
H=\bigoplus_a \lambda_a I_{m_a},
\qquad \lambda_a\ne\lambda_b\quad(a\ne b),
\]

and write an antiunitary as

\[
J=AK
\]

in this eigenbasis, where \(K\) is ordinary complex conjugation and \(A\) is unitary.

The two requirements are

\[
J^2=1,
\qquad
JHJ^{-1}=H.
\]

They imply

\[
A\bar A=I,
\qquad
[A,H]=0.
\]

For unitary \(A\), the first equation is equivalent to

\[
A=A^T.
\]

The second makes \(A\) block diagonal across distinct eigenvalues. Hence every block is a symmetric unitary matrix.

By Takagi factorization,

\[
A_a=U_aU_a^T.
\]

The representatives \(U_a\) and \(U_aO_a\), \(O_a\in O(m_a)\), give the same \(A_a\). Therefore

\[
\boxed{
\mathcal C(H)
\cong
\prod_a U(m_a)/O(m_a).
}
\]

Its real dimension is

\[
\dim\mathcal C(H)
=\sum_a \frac{m_a(m_a+1)}2.
\]

## 3. Important cases

### Nondegenerate spectrum

For multiplicities \(1+1+1\),

\[
\mathcal C(H)
\cong
\bigl(U(1)/O(1)\bigr)^3
\simeq U(1)^3.
\]

This recovers the earlier eigenline phase torus.

### One double degeneracy

For multiplicities \(2+1\),

\[
\mathcal C(H)
\cong
U(2)/O(2)\times U(1)/O(1).
\]

The ambiguity is no longer diagonal. It includes non-diagonal conjugations mixing the two-dimensional degenerate eigenspace.

### Complete degeneracy

For multiplicity \(3\),

\[
\mathcal C(H)
\cong U(3)/O(3).
\]

This is the same homogeneous space that appeared when classifying unconstrained flavor conjugations under generation-blind replication.

## 4. Canonical data at degeneracy

Rank-one eigenprojectors inside a degenerate block are basis choices, not observables. The canonical spectral datum is only the higher-rank projector

\[
P_a:\mathbb C^3\to E_{\lambda_a}.
\]

Consequently:

- eigenline phase choices enlarge to full unitary frame choices inside the block;
- rank-one projector quadrilaterals using an arbitrary basis of the block are not canonical;
- only invariants built from the block projector, or from a specified splitting perturbation, survive.

This is a stricter version of the phase-torus warning.

## 5. Exact degeneracy kills the static Jarlskog cubic

For three flavors,

\[
\operatorname{ImTr}[H_u,H_d]^3
\]

is proportional to the product of the two spectral Vandermonde factors and the mixing quartet:

\[
\operatorname{ImTr}[H_u,H_d]^3
\propto
\prod_{i<j}(u_i-u_j)
\prod_{k<\ell}(d_k-d_\ell)
J.
\]

An exact same-charge degeneracy in either sector makes this invariant vanish. The enlarged \(U(m)\) freedom inside the degenerate subspace makes the usual three-flavor phase unphysical.

The certificate verifies this directly for a complex partner spurion:

\[
H_u=\operatorname{diag}(1,1,3)
\quad\Longrightarrow\quad
\operatorname{ImTr}[H_u,H_d]^3=0,
\]

while a small splitting

\[
H_u=\operatorname{diag}(1,1.2,3)
\]

restores a nonzero commutator cubic.

## 6. What does not vanish automatically

The result concerns a static pair of three-flavor Hermitian spurions. A parameter-dependent degenerate eigenspace can carry a non-Abelian Wilczek–Zee connection and holonomy. That geometry requires:

1. a parameter space of dimension at least two for curvature;
2. a smoothly varying higher-rank spectral projector;
3. a declared physical loop or endpoint comparison.

It is not the ordinary static CKM/PMNS Jarlskog phase, and nonzero non-Abelian holonomy should not be mislabeled as CP violation without the appropriate transformation test.

## 7. Consequence for the Furey/(Spin(2,3)) synthesis

Exact degeneracy does not rescue a canonical flavor real structure. It enlarges the ambiguity from eigenline phases to unitary frames in degenerate blocks.

The external exchange-real \(H_2(\mathbb R)\) carrier remains compatible with a degenerate flavor factor, but it cannot select a basis inside that factor. Any proposal in which the internal algebra first generates degenerate generations must also supply a symmetry-breaking perturbation or a connection whose holonomy fixes the observed relative flags.

## 8. Branch decision

- **Closed:** conjugations fixing multiplicity pattern \((m_a)\) form \(\prod_aU(m_a)/O(m_a)\).
- **Closed:** exact degeneracy makes rank-one flags within the block noncanonical.
- **Closed:** exact same-charge degeneracy kills the static three-generation commutator cubic.
- **Open:** controlled splitting from a generation-sensitive Furey/exceptional operator.
- **Open:** non-Abelian degenerate-bundle holonomy over a physically specified parameter family.
- **Open:** whether a symmetry-breaking perturbation predicts rather than fits the observed mixing flags.

## 9. Stop-everything and falsification gates

**Stop-everything trigger:** a generation-sensitive algebra produces a degenerate multiplet, a unique allowed splitting direction and the observed relative projector invariants from one controlled perturbation.

**Canonicity falsifier:** any rank-one projector inside an exactly degenerate block is treated as physical without additional splitting data.

**CP falsifier:** nonzero static Jarlskog CP is claimed while either same-charge spectrum remains exactly degenerate.

**Holonomy falsifier:** a one-parameter path or unclosed frame evolution is called intrinsic non-Abelian curvature.

## 10. Certificate

The [degenerate-spurion conjugation certificate](scripts/verify_degenerate_spurion_conjugations_form_product_u_m_mod_o_m.mjs) constructs a non-diagonal symmetric-unitary conjugation of a double eigenspace, verifies the Takagi \(O(2)\) redundancy, and checks the disappearance and reappearance of the commutator cubic at degeneracy and after splitting.

## Companion documents

- [Sector real-structure phase torus](442_sector_real_structures_form_a_phase_torus_so_their_relative_product_is_not_a_canonical_flavor_observable.md)
- [Generation-blind Furey conjugation no-go](443_generation_blind_furey_car_conjugation_cannot_canonically_fix_the_flavor_real_structure_or_its_phase_torus.md)
- [Projector quadrilateral and rank-deficient transport](438_projector_quadrilateral_holonomy_recovers_the_jarlskog_quartet_without_extending_rank_deficient_polar_transport.md)
- [Two-parameter curvature is not automatically CP](428_two_parameter_frame_curvature_is_real_geometry_but_is_not_automatically_a_jarlskog_cp_invariant.md)
