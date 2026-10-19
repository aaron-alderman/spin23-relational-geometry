# Majorana Reality Gives a Sterile Triplet, but a Selector Must Create Jordan Signature

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B05, B07, B08 and B11  
**Claim status:** exact flavor-representation and signature obstruction; dynamical selection of a flavor axis remains open

## 1. The complex antitriplet is not yet three real relationships

For three sterile flavors,

\[
\Lambda^2\mathbb C^3\cong\overline{\mathbf3}
\]

under \(SU(3)\). As a real vector space it has dimension six, not three.

To obtain three real relationship coordinates, the antitriplet would need an equivariant antilinear involution—a real structure—whose fixed space has real dimension three.

The \(SU(3)\) antitriplet is of complex type and admits no such structure.

## 2. Center proof of the real-structure obstruction

Let

\[
\omega=e^{2\pi i/3}
\]

generate the center of \(SU(3)\). On \(\overline{\mathbf3}\), it acts by \(\omega^2\).

Suppose an antilinear map \(J\) commuted with \(SU(3)\). Then

\[
J(\omega^2v)=\overline{\omega^2}Jv=\omega Jv,
\]

while equivariance requires

\[
J(\omega^2v)=\omega^2Jv.
\]

Because \(\omega\neq\omega^2\), every such \(J\) is zero. Therefore

\[
\boxed{\overline{\mathbf3}\text{ has no }SU(3)\text{-equivariant real form}.}
\]

Full sterile \(SU(3)\) flavor symmetry cannot canonically turn the three complex pair operators into three real Jordan axes.

## 3. A real Majorana metric reduces the symmetry

A nondegenerate real symmetric Majorana form \(M\propto I\) restricts unitary flavor transformations by

\[
U^TMU=M.
\]

Inside \(U(3)\), the stabilizer is \(O(3)\). The Majorana structure supplies conjugation and a real flavor space

\[
F_{\mathbb R}\cong\mathbb R^3.
\]

After choosing an orientation, the Euclidean Hodge star gives

\[
\boxed{
*:\Lambda^2\mathbb R^3\xrightarrow{\sim}\mathbb R^3,}
\]

with

\[
e_2\wedge e_3\mapsto e_1,
\quad
e_3\wedge e_1\mapsto e_2,
\quad
e_1\wedge e_2\mapsto e_3.
\]

This genuinely turns the three sterile pair operators into a real triplet.

## 4. Signature obstruction

The Majorana/Hodge triplet carries the positive Euclidean metric

\[
\delta(r,r)=r_1^2+r_2^2+r_3^2
\]

of signature \((3,0)\).

The Jordan carrier has determinant metric

\[
\det
\begin{pmatrix}
t+x&y\\y&t-x
\end{pmatrix}
=t^2-x^2-y^2,
\]

of signature \((1,2)\).

By Sylvester's law of inertia, no real invertible change of basis maps the Euclidean metric into the Jordan determinant metric.

Therefore Majorana reality solves the **dimension and conjugation problem**, but not the **Jordan-signature problem**.

## 5. Minimal selector axis

A unit flavor vector \(n\in\mathbb R^3\) defines

\[
\boxed{\eta_n=2nn^T-I.}
\]

It has eigenvalue \(+1\) along \(n\) and \(-1\) on the orthogonal plane, hence signature \((1,2)\). Choosing coordinates with \(n=e_1\),

\[
\eta_n=\operatorname{diag}(1,-1,-1).
\]

Then

\[
(t,x,y)
\longmapsto
\begin{pmatrix}t+x&y\\y&t-x\end{pmatrix}
\]

identifies \(\eta_n\) with the Jordan determinant.

The cost is symmetry breaking:

\[
O(3)\longrightarrow O(2).
\]

The selector is not optional. It is exactly the additional datum required to pass from a compact real triplet to the split Jordan carrier.

## 6. Possible physical selectors

### 6.1 Majorana mass hierarchy

For a real symmetric mass matrix with distinct eigenvalues, its eigenvectors define axes up to signs. Selecting the lightest or heaviest sterile direction could supply \(n\), but that rule is additional and becomes singular at eigenvalue degeneracy.

### 6.2 Yukawa vector

A normalized combination such as \(Y_\nu^\dagger Y_\nu\)'s distinguished eigenvector could select the time-like direction. This ties the Jordan signature to observable mixing data but introduces scale and radiative-stability questions.

### 6.3 Boundary or stress source

A common external probe may select one flavor-pair combination as population/time and the orthogonal pair as relationships/space. This is closest to the response-carrier interpretation.

### 6.4 Furey Peirce data

The neutrino Peirce corner may distinguish a real diagonal direction from two coherence directions. To succeed, its three-generation extension must act on flavor and produce the same \(n\) without arbitrary basis choice.

## 7. CP phases and generic masses

A generic complex symmetric Majorana matrix admits a Takagi factorization but does not preserve a pre-existing componentwise real structure in an arbitrary flavor basis. After diagonalization, phases and ordering conventions remain part of the identification.

With nondegenerate masses, continuous \(O(3)\) is broken to a discrete sign subgroup. This can fix axes more strongly but also removes the symmetry that made the Hodge triplet natural.

Thus the useful sequence is conditional:

\[
SU(3)
\xrightarrow{\text{Majorana real structure}}
O(3)
\xrightarrow{\text{selector }n}
O(2)
\quad\leadsto\quad
H_2(\mathbb R)\text{ signature}.
\]

## 8. Relation to compact/split real forms

This is a concrete instance of the programme's recurring compact-versus-split tension:

- compact flavor/custodial triplets naturally carry positive metrics;
- the Jordan causal carrier needs a Lorentzian determinant;
- an involution or selector must choose the split real form.

The selector must be dynamical, source-derived or algebraically forced. Analytic continuation alone does not explain which direction is physical time/population.

## 9. Stop-everything and falsification gates

**Stop-everything trigger:** the three-generation neutrino/Furey action derives a real Majorana metric and a unique stable selector \(n\), and the resulting spectral response has determinant \(t^2-x^2-y^2\).

**Mixing trigger:** measured neutrino parameters determine \(n\) and yield a normalization-independent response relation.

**Real-structure falsifier:** full unbroken \(SU(3)\) flavor symmetry is claimed to supply a three-real-dimensional antitriplet fixed space.

**Signature falsifier:** the positive Euclidean flavor norm is identified with the Lorentzian Jordan determinant by a real basis change.

**Selector falsifier:** a time-like flavor axis is chosen by convention and then presented as an algebraic prediction.

## 10. Certificate

The [sterile real-structure/signature certificate](../../../verification/verify/verify_sterile_real_structure_signature_gate.mjs) checks the central-phase obstruction, three-pair Hodge inventory, Euclidean/Jordan inertia mismatch and the selector formula \(\eta_n=2nn^T-I\).

## Companion documents

- [Three sterile spin-one pair operators](280_three_sterile_flavors_supply_three_nonzero_spin_one_pair_operators.md)
- [Real-selector flavor CP obstruction](../0000-0099/74_real_selector_cp_violation_obstruction.md)
- [Canonical real-structure commutant model](../0000-0099/65_canonical_real_structure_commutant_model.md)
- [Positive exchange/diagonal locking](253_positive_exchange_diagonal_locking_leaves_exactly_h2r.md)
