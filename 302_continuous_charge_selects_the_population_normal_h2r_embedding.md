# Continuous Charge Selects the Population-Normal \(H_2(\mathbb R)\) Embedding

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B06, B08 and B11  
**Claim status:** exact classification of \(U(1)\)-invariant real-form embeddings; physical adequacy of the equal-population carrier remains open

## 1. Revisiting the charged-real-slice no-go

The established theorem says that a nonzero-charge complex line has no fixed real one-dimensional subspace under continuous \(U(1)\). Therefore the entrywise-real slice

\[
J_y=\operatorname{span}_{\mathbb R}\{I,\sigma_x,\sigma_z\}
\]

is not preserved when the charged off-diagonal coordinate rotates through the \((\sigma_x,\sigma_y)\) plane.

That theorem is correct. What was not previously tested was the full \(\mathbb{RP}^2\) family of real forms inside \(H_2(\mathbb C)\).

## 2. Unique \(U(1)\)-compatible director

Relative face phase acts on the Bloch vector as rotations about the population axis:

\[
R_z(\phi):(x,y,z)\mapsto
(x\cos\phi-y\sin\phi,
x\sin\phi+y\cos\phi,z).
\]

A real-form selector is an unoriented normal \([n]\in\mathbb{RP}^2\). Its fixed plane is preserved by every \(R_z(\phi)\) precisely when the normal line is preserved.

The unique solution is

\[
\boxed{[n]=[e_z].}
\]

Thus continuous charge does not forbid every \(H_2(\mathbb R)\) real form. It selects one particular embedding.

## 3. The population-normal fixed algebra

The corresponding antiunitary is

\[
\Theta=\sigma_xK,
\qquad \Theta^2=+1,
\]

where \(K\) is standard complex conjugation. Acting on Hermitian matrices,

\[
\Theta(X)=\sigma_x\overline X\sigma_x.
\]

Its fixed points are

\[
\boxed{
J_z=left\{
\begin{pmatrix}t&z\\\bar z&t\end{pmatrix}:
t\in\mathbb R,\ z\in\mathbb C
\right\}
=\operatorname{span}_{\mathbb R}\{I,\sigma_x,\sigma_y\}.}
\]

Writing \(z=x-iy\),

\[
\det X=t^2-x^2-y^2.
\]

Hence \(J_z\cong H_2(\mathbb R)\) as a Euclidean Jordan algebra, with the same Lorentz cone and conformal group \(Sp(4,\mathbb R)\cong Spin_0(2,3)\).

## 4. Why charge is now harmless

Under the relative \(U(1)\),

\[
z\mapsto e^{iq\phi}z.
\]

The full complex relationship plane is retained inside \(J_z\). The group rotates \((x,y)\) as the ordinary \(SO(2)\) automorphism of the rank-two spin factor and preserves

\[
t^2-|z|^2.
\]

No charged real line is selected. Therefore the fixed-line no-go is evaded without gauge fixing, Higgs phase locking or a rotating real subbundle.

## 5. The exact price: population difference disappears

Every element of \(J_z\) has equal diagonal entries. The \(\sigma_z\) population-difference coordinate is the excluded direction.

This changes the interpretation of the carrier:

- **entrywise-real form \(J_y\):** two independent face populations plus one real relationship;
- **charge-compatible form \(J_z\):** one common population plus the two quadratures of a complex relationship.

Both are abstractly \(H_2(\mathbb R)\), but they are not physically interchangeable once “population” and “relationship” are tied to measured probes.

The charge-compatible form is especially close to the narrative

\[
\text{one carrier intensity}
+\text{two relationship quadratures}.
\]

It does not realize two independently variable face populations.

## 6. Compatibility with exchange antiunitarity

The selector \(\Theta=\sigma_xK\) is conjugation combined with face exchange. It commutes with the relative \(U(1)\) action on observables:

\[
\Theta\circ\operatorname{Ad}_{U(\phi)}
=\operatorname{Ad}_{U(\phi)}\circ\Theta.
\]

This connects the newly classified embedding to the earlier exchange/reciprocity antiunitary branch. That branch should now be re-read as a candidate for the population-normal real form, not only as a disguised entrywise-real selector.

## 7. Consequence for the central narrative

There are now two physically distinct routes to \(Spin(2,3)\):

\[
\begin{array}{ll}
J_y:& \text{retain population difference, remove relationship phase;}\\
J_z:& \text{retain charged relationship phase, remove population difference.}
\end{array}
\]

The first needs neutral dressing or broken/covariant phase selection. The second is exactly compatible with continuous charge but needs a reason that equal face populations are the correct observable restriction.

This is a real branch split, not a basis convention.

## 8. Stop-everything and falsification gates

**Stop-everything trigger:** the measured or derived external response has equal diagonal face populations while its charged complex relationship supplies the two spacelike Jordan coordinates.

**Exchange trigger:** Furey’s source-derived antiunitary is exactly face exchange plus conjugation and fixes the same \(J_z\) response algebra.

**Population falsifier:** independent diagonal population imbalance is an unavoidable physical carrier coordinate that cannot be moved into another sector.

**No-go overreach falsifier:** absence of a fixed real line in the charged relationship plane is cited as absence of every \(U(1)\)-invariant \(H_2(\mathbb R)\) embedding.

**Abstract-isomorphism falsifier:** \(J_y\) and \(J_z\) are treated as physically equivalent solely because both are abstractly \(H_2(\mathbb R)\).

## 9. Certificate

The [\(U(1)\)-compatible population-normal real-form certificate](scripts/verify_u1_compatible_population_normal_h2r_real_form.mjs) verifies uniqueness of the invariant director modulo sign, failure of the entrywise-real normal, preservation of the charged relationship plane and the \((1,2)\) determinant.

## Companion documents

- [Charged real-slice \(U(1)\) no-go](117_charged_real_slice_u1_no_go.md)
- [Rephasing-invariant positive spectra](301_rephasing_invariant_positive_spectra_can_select_only_the_population_axis.md)
- [Antiunitary reciprocity selector](161_antiunitary_reciprocity_selector_and_five_directions.md)
- [Furey survivor exchange antiunitary candidate](162_furey_survivor_exchange_antiunitary_candidate.md)
