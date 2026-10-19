# The Stress Plane Stabilizer Is a \(Spin(2,2)\) Subgeometry Inside \(Spin(2,3)\)

**Date:** 17 October 2026  
**Branches:** B01, B02, B04, B06, B07 and B11  
**Claim status:** exact for a generic nondegenerate two-Gram-matrix plane and the standard Siegel realization; physical invariance of any particular Standard-Model spectrum remains unproved

## 1. Question

The vacuum stress spectrum seen by two fixed conserved probes has the form

\[
\rho(s)=\rho_2(s)G_2+\rho_0(s)G_0
\]

inside \(H_2(\mathbb R)_+\). What part of the ambient

\[
Sp(4,\mathbb R)\cong Spin_0(2,3)
\]

preserves this two-dimensional physical plane?

The answer is generically a rank-two diagonal subgeometry with connected conformal group

\[
SL(2,\mathbb R)\times SL(2,\mathbb R)
\cong Spin_0(2,2),
\]

plus the discrete exchange of the two diagonal factors. This is a proper subgroup of the ambient \(Spin_0(2,3)\).

The Siegel action convention used below is the standard fractional action; see, for example, the explicit definition in [Ha and Paugam, *Bost--Connes--Marcolli system for the Siegel modular variety*](https://arxiv.org/abs/2211.07778). The stabilizer calculation itself is derived here.

## 2. Canonical reduction of the two-Gram plane

Assume \(G_2\) is positive definite and \(G_0\) is symmetric, with

\[
G_0\notin\mathbb R G_2.
\]

Whiten \(G_2\) by \(W=G_2^{-1/2}\):

\[
WG_2W^T=I,
\qquad
WG_0W^T=Q\Lambda Q^T.
\]

After the orthogonal congruence \(Q^T\), the plane becomes

\[
\operatorname{span}\{I,\operatorname{diag}(\lambda_1,\lambda_2)\}.
\]

Linear independence forces \(\lambda_1\ne\lambda_2\), so this span is exactly

\[
\mathcal D
=\left\{\operatorname{diag}(x,y):x,y\in\mathbb R\right\}
\cong\mathbb R\oplus\mathbb R.
\]

The positive part is the quadrant \(x,y\ge0\). Thus every generic physical stress plane is congruent to the diagonal Jordan subalgebra.

## 3. Linear congruence stabilizer

Let

\[
S=\begin{pmatrix}a&b\\c&d\end{pmatrix}\in GL(2,\mathbb R).
\]

For \(X=\operatorname{diag}(x,y)\), the off-diagonal entry of \(SXS^T\) is

\[
ac\,x+bd\,y.
\]

It vanishes for all \(x,y\) exactly when

\[
ac=0,\qquad bd=0.
\]

Invertibility then forces \(S\) to be diagonal or anti-diagonal. Hence the effective automorphism group of the positive quadrant under congruence is

\[
(\mathbb R_{>0}\times\mathbb R_{>0})\rtimes S_2,
\]

with invisible sign kernels at the matrix level. Its connected determinant-one part is only the one-parameter relative scaling \(\operatorname{diag}(e^t,e^{-t})\).

This already proves that generic linear cone transformations do not preserve the stress plane.

## 4. Full conformal stabilizer in the Siegel realization

Complexify to the degree-two Siegel upper half-space

\[
\mathfrak H_2
=\{Z=Z^T\in M_2(\mathbb C):\operatorname{Im}Z>0\},
\]

on which \(Sp(4,\mathbb R)\) acts by

\[
Z\longmapsto(AZ+B)(CZ+D)^{-1}.
\]

The diagonal subdomain is

\[
\mathfrak H_1\times\mathfrak H_1
=\{\operatorname{diag}(z_1,z_2):\operatorname{Im}z_i>0\}.
\]

For an infinitesimal symplectic generator

\[
X=\begin{pmatrix}a&b\\c&-a^T\end{pmatrix},
\qquad b=b^T,\quad c=c^T,
\]

the infinitesimal action is

\[
\delta Z=aZ+Za^T+b-ZcZ.
\]

At diagonal \(Z\), its off-diagonal entry is

\[
b_{12}+a_{12}z_2+a_{21}z_1-c_{12}z_1z_2.
\]

Vanishing for every \((z_1,z_2)\) forces

\[
a_{12}=a_{21}=b_{12}=c_{12}=0.
\]

The remaining six generators are two independent copies of \(\mathfrak{sl}(2,\mathbb R)\), acting by separate Möbius transformations on \(z_1\) and \(z_2\). Therefore the connected stabilizer is

\[
SL(2,\mathbb R)\times SL(2,\mathbb R)
\cong Spin_0(2,2).
\]

The coordinate swap supplies a discrete \(S_2\) extension.

## 5. Interpretation

The hierarchy is now precise:

\[
\text{conformal free field}
\subset
\text{massive/nonconformal vacuum stress}
\subset
H_2(\mathbb R)_+,
\]

or geometrically,

\[
\text{one ray}
\subset
(\mathbb R_+)^2
\subset
\text{three-dimensional Lorentz cone}.
\]

Correspondingly:

- a single conformal ray has only a ray stabilizer as its physically relevant symmetry;
- the generic two-form-factor plane carries a \(Spin_0(2,2)\)-type conformal subgeometry;
- the full ambient cone carries \(Spin_0(2,3)\).

This is not a derivation of a physical \(Spin_0(2,2)\) invariance of the Standard Model. It is the exact maximal connected conformal geometry that preserves the generic stress plane as a set. The actual spectral functions \(\rho_2(s),\rho_0(s)\) will normally break it further.

## 6. The missing generator has a concrete meaning

The passage from the diagonal algebra \(\mathbb R\oplus\mathbb R\) to all of \(H_2(\mathbb R)\) requires the off-diagonal Jordan direction

\[
E_{12}+E_{21}.
\]

That direction is precisely a coherent relationship between the two diagonal eigenchannels. It cannot be synthesized by changing only the two scalar spectral weights multiplying fixed \(G_2\) and \(G_0\).

Thus the required “third direction” is not just another scalar form factor. It must make the eigenbasis itself physical and scale-dependent, or introduce a mixed response that is not simultaneously diagonalizable with the vacuum spin-two and spin-zero Gram matrices.

Candidate sources are:

1. a boundary normal or defect tensor;
2. a thermal or finite-density velocity;
3. a mixed stress/operator correlator;
4. a scale-dependent detector/probe family;
5. a parity- or time-reversal-sensitive background.

## 7. Stop-everything gates

**Third-direction success:** one declared action produces a positive spectral matrix with a nonzero off-diagonal component in the canonical generalized-eigenbasis of \((G_2,G_0)\).

**Plane closure:** all allowed states and backgrounds remain simultaneously diagonalizable with \((G_2,G_0)\). Then the stress branch naturally closes on \(Spin_0(2,2)\), not full \(Spin_0(2,3)\).

**Symmetry overclaim falsifier:** a proposed full \(Sp(4,\mathbb R)\) transformation changes the stress plane while being asserted to preserve the fixed-probe spectrum. That claim is false unless probes or background data transform as additional degrees of freedom.

**Physical subgroup gate:** calculate whether the actual pair of spectral functions is closed under any nontrivial part of the plane stabilizer. Set preservation alone is not dynamical symmetry.

## 8. Certificate

The [stress-plane stabilizer certificate](../../../verification/verify/verify_stress_plane_stabilizer_spin22.mjs) checks the exact monomial congruence condition, constructs the embedded \(SL(2,\mathbb R)^2\) symplectic subgroup, verifies separate Möbius action on the diagonal Siegel domain and exhibits an ambient symplectic generator that leaves the diagonal subdomain.

## Companion documents

- [Free conformal stress ray](209_free_conformal_field_stress_spectrum_is_one_jordan_ray.md)
- [Stress spectral-family dimension](208_stress_spectral_family_dimension_and_ambient_sp4_obstruction.md)
- [Stress spectral escape](207_stress_contact_counterterm_obstruction_and_spectral_escape.md)
- [Global \(Sp(4,\mathbb R)\)-\(Spin_0(2,3)\) isomorphism](../0000-0099/47_global_group_isomorphism_sp4r_spin023.md)
