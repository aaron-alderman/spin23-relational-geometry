# The Binary Peirce Faces and Furey Charge-Compatible Carrier Are Isomorphic but Not Face-Preserving

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B06, B08, B09, B10, B11, B13 and B14  
**Claim status:** exact cross-branch compatibility/no-go theorem; the physical interpretation of the finite faces remains open

## Executive result

Cycle 485 showed that two normalized orthogonal binary faces uniquely select the contraction needed for the split lift

\[
T_2(\mathbb F_2)\longrightarrow M_2(\mathbb R)\longrightarrow H_2(\mathbb R).
\]

The most direct real form is the transpose/entrywise-real carrier

\[
J_y=\operatorname{span}_{\mathbb R}\{I,\sigma_x,\sigma_z\}.
\]

It contains the two individual Peirce projectors

\[
p=\frac{I+\sigma_z}{2},\qquad
q=\frac{I-\sigma_z}{2}.
\]

The independent Furey exchange branch selected the charge-compatible population-normal carrier

\[
J_z=\operatorname{span}_{\mathbb R}\{I,\sigma_x,\sigma_y\},
\]

fixed by \(\Theta=\sigma_xK\). It retains the complete charged complex relationship plane and is invariant under continuous relative \(U(1)\), but it excludes \(\sigma_z\). Therefore it contains \(p+q=I\), not \(p\) and \(q\) separately.

The exact conclusion is

\[
\boxed{
J_y\cong J_z\cong H_2(\mathbb R)
\quad\text{but no identification can simultaneously preserve}
\quad
\begin{cases}
\text{the named population faces }p,q,\\
\text{continuous relative }U(1).
\end{cases}}
\]

A quarter-turn unitarily maps \(J_y\) to \(J_z\), but sends \(p,q\) to coherent superposition projectors. Thus the two branches meet algebraically while disagreeing on which observables are the faces.

## 1. The two embeddings

Every Hermitian \(2\times2\) matrix has the Bloch decomposition

\[
X=tI+x\sigma_x+y\sigma_y+z\sigma_z.
\]

The entrywise-real form is

\[
J_y=\{tI+x\sigma_x+z\sigma_z\},
\]

with determinant

\[
\det X=t^2-x^2-z^2.
\]

This carrier keeps:

- the common population \(I\);
- the population difference \(\sigma_z\);
- one real relationship quadrature \(\sigma_x\).

The population-normal form is

\[
J_z=\{tI+x\sigma_x+y\sigma_y\},
\]

with determinant

\[
\det X=t^2-x^2-y^2.
\]

It keeps:

- the common population \(I\);
- both relationship quadratures \(\sigma_x,\sigma_y\);
- no population-difference coordinate.

Both are rank-two Euclidean Jordan algebras with the same Lorentz cone and conformal group. Their difference is operational, not abstract.

## 2. Continuous charge forces the fork

Relative face phase acts by

\[
U(\phi)=e^{-i\phi\sigma_z/2}.
\]

Conjugation fixes \(I\) and \(\sigma_z\), while rotating

\[
\begin{pmatrix}\sigma_x\\\sigma_y\end{pmatrix}
\mapsto
\begin{pmatrix}
\cos\phi&-\sin\phi\\
\sin\phi&\cos\phi
\end{pmatrix}
\begin{pmatrix}\sigma_x\\\sigma_y\end{pmatrix}.
\]

Consequently:

- \(J_z\) is invariant under the full continuous action;
- \(J_y\) is not invariant for generic \(\phi\);
- the real relationship line \(\mathbb R\sigma_x\) cannot be invariant under all rotations.

The representation decomposition is

\[
H_2(\mathbb C)
=\mathbb RI
\oplus\mathbb R\sigma_z
\oplus\operatorname{span}_{\mathbb R}\{\sigma_x,\sigma_y\}.
\]

The last summand is an irreducible real plane for continuous rotations. A three-dimensional invariant real subspace containing both \(I\) and \(\sigma_z\) would need a one-dimensional invariant subspace inside that plane. None exists.

Therefore:

\[
\boxed{
\text{no continuous-}U(1)\text{-invariant }H_2(\mathbb R)
\text{ embedding contains both independent population faces}.}
\]

## 3. The quarter-turn equivalence

Let

\[
V=e^{-i\pi\sigma_x/4}.
\]

Its adjoint action fixes \(\sigma_x\) and rotates \(\sigma_z\) into \(-\sigma_y\), up to the orientation convention. Hence

\[
VJ_yV^\dagger=J_z.
\]

The binary-selected projectors move to

\[
VpV^\dagger=\frac{I-\sigma_y}{2},
\qquad
VqV^\dagger=\frac{I+\sigma_y}{2}.
\]

These are still complementary primitive idempotents, but they are coherent projectors relative to the original population basis. They have equal diagonal entries.

This supplies an exact bridge only if the finite classes called “faces” are allowed to map to coherence eigenfaces rather than Furey’s population projectors.

## 4. Comparison with the Furey linking factor

The unique \(M_2(\mathbb C)\) factor in the fifteen-state Furey matter linking algebra already has:

- two scalar population corners;
- a charged complex relation and its dagger reverse;
- Furey survivor exchange inducing \(\Theta=\sigma_xK\);
- the fixed population-normal algebra \(J_z\).

The finite binary route supplies:

- two tensor classes provisionally interpreted as normalized faces;
- one oriented relation;
- a unique contraction conditional on that face interpretation;
- the transpose completion and entrywise-real form \(J_y\).

Thus there are two possible cross-branch dictionaries.

### Population-preserving dictionary

Map the binary \(p,q\) to the two Furey scalar population corners. This preserves the Peirce labels but selects \(J_y\), which is not invariant under the charged continuous \(U(1)\). It requires neutral dressing, a covariant real bundle or an external neutral copy.

### Charge-preserving dictionary

Apply the quarter-turn and map the binary faces to the coherent projectors \((I\mp\sigma_y)/2\). This lands in \(J_z\) and preserves the continuous charged relationship plane, but it does not preserve the interpretation of those classes as separate population corners.

Neither dictionary is presently forced by the source.

## 5. What survives both choices

Several structures are common and should not be discarded:

1. the complete associative envelope is \(M_2\);
2. the rank is two;
3. there are complementary primitive idempotents, though their physical basis changes;
4. the real Jordan dimension is three;
5. the determinant has signature \((1,2)\);
6. the TKK/conformal completion is \(Sp(4,\mathbb R)\cong Spin_0(2,3)\).

The disputed datum is not the \(Spin(2,3)\) algebra. It is the physical identification of the timelike and spacelike Jordan coordinates.

This is precisely the kind of branch point the programme was designed to preserve rather than flatten.

## 6. Claim ledger

### Established

- \(J_y\) contains \(p,q\) independently;
- \(J_y\) is not invariant under generic relative \(U(1)\);
- \(J_z\) is invariant under the full relative \(U(1)\);
- \(J_z\) contains only the common diagonal population, not \(p,q\) separately;
- no invariant three-plane can contain \(I,\sigma_z\) and only one relationship quadrature;
- a quarter-turn maps \(J_y\) isomorphically onto \(J_z\);
- under that map the named population faces become coherent primitive projectors.

### Candidate bridge

- the finite two faces are coherence eigenfaces in the Furey population-normal carrier;
- alternatively, the finite faces are true populations but live in a neutral response carrier rather than the charged matter factor.

### Not established

- which Furey observables the finite cocycle classes represent;
- whether the quarter-turn is generated dynamically or is merely a basis choice;
- a gauge-neutral stress/response probe measuring the coherent faces;
- a source-derived intertwiner from the finite tensor quotient to the Furey linking factor.

## 7. Stop-everything and falsification gates

### Stop-everything positive outcomes

1. A source-derived intertwiner sends the finite \(p,q\) exactly to the coherent Furey projectors and the finite arrow to the charged relationship plane.
2. A gauge-neutral response construction sends \(p,q\) to genuine population faces and makes the entrywise-real carrier physical without breaking electromagnetism.
3. A measured or derived stress observable distinguishes whether the carrier’s spacelike plane is population-plus-one-quadrature or two relationship quadratures.

### Falsification boundaries

- a claimed bridge preserves both population projectors and continuous charged \(U(1)\) inside one three-dimensional fixed real form;
- abstract isomorphism of \(J_y\) and \(J_z\) is used to erase their different probe content;
- the quarter-turn is called gauge-generated—it is a selector-orbit rotation, not the surviving relative \(U(1)\);
- the finite face labels are promoted to physical populations without an intertwiner.

## 8. Next executable problem

Construct all face/arrow-preserving real-linear intertwiners from the finite split lift into the unique Furey \(M_2(\mathbb C)\) factor under two alternative constraints:

\[
\text{population preservation}
\quad\text{versus}\quad
U(1)\text{ covariance}.
\]

The theorem above predicts that their intersection is empty if both named population faces must remain pointwise fixed. A nonempty solution must either rotate the faces, neutralize the relationship or enlarge the carrier.

## Certificates and companions

- [Binary/Furey real-form fork certificate](scripts/verify_binary_peirce_vs_furey_population_normal_fork.mjs)
- [Contraction selection and split lift](569_the_two_named_peirce_faces_uniquely_select_the_contraction_and_an_exact_split_jordan_lift.md)
- [Unique Furey \(M_2(\mathbb C)\) factor](116_unique_m2_linking_factor_to_h2r_spin23.md)
- [Population-normal real form](302_continuous_charge_selects_the_population_normal_h2r_embedding.md)
- [Furey exchange selector](303_furey_survivor_exchange_induces_the_charge_compatible_population_normal_real_form.md)
- [Quarter-turn equivalence](314_a_quarter_turn_maps_the_real_domain_wall_carrier_to_the_population_normal_furey_carrier.md)
