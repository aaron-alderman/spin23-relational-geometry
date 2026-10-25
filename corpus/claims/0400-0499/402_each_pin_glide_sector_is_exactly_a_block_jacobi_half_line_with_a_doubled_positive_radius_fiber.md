# Each Pin Glide Sector Is Exactly a Block-Jacobi Half-Line with a Doubled Positive-Radius Fiber

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B05, B06, B08, B09 and B11  
**Claim status:** exact finite quotient reduction and localizer-basis equivalence; equality with the continuum Pin point-defect index remains open

## 1. From quotient intuition to an explicit basis

The glide acts freely on sites:

\[
g(x,y)=(x+L,-y).
\]

Choose one representative of every orbit by restricting \(0\le x<L\). For an
internal Majorana vector \(v\), define the deck-sector state

\[
|x,y,v\rangle_s
=\frac1{\sqrt2}\left(
|x,y,v\rangle+sU_g|x,y,v\rangle
\right),
\qquad s=\pm1.
\]

Because the glide has no fixed sites, these vectors form an orthonormal basis of
the full \(s\)-sector.

The executable construction verifies orthonormality and glide eigenvalue to
errors below \(10^{-15}\).

## 2. Exact dimension and fibers

The sector dimension is

\[
8L(2M+1).
\]

Group the representative states by radius

\[
\rho=|y|\in\{0,1,\ldots,M\}.
\]

At \(\rho=0\), there is one signed row, so

\[
\dim\mathcal F_0=8L.
\]

For every \(\rho>0\), both \(y=+\rho\) and \(y=-\rho\) occur as distinct
quotient orbit representatives, so

\[
\boxed{\dim\mathcal F_\rho=16L\quad(\rho>0).}
\]

The quotient is therefore a half-line whose positive-radius fiber is doubled
relative to its endpoint fiber.

## 3. The radius descends exactly

In the explicit orbit basis,

\[
Q_s^T|Y|Q_s
=\operatorname{diag}(|y_1|,\ldots,|y_N|)
\]

to errors below \(10^{-15}\). No internal orientation factor is required. The
radius is an ordinary scalar observable on the quotient.

By contrast, the signed coordinate has zero sector compression. The half-line
radius is not an arbitrary workaround; it is the coordinate that actually
descends through the glide orbit space.

## 4. The Hamiltonian is block Jacobi in radius

The parent lattice Hamiltonian couples only equal or neighboring \(y\)-rows.
After orbit reduction and radial grouping, both reference and defect matrices
satisfy

\[
H_{\rho\rho'}=0
\qquad\text{whenever}\qquad
|\rho-\rho'|>1.
\]

The executable audit finds these longer-range blocks exactly zero. Hence each
deck sector is a finite restriction of a nearest-neighbor block-Jacobi operator
on

\[
\mathcal F_0\oplus\mathcal F_1\oplus\cdots\oplus\mathcal F_M.
\]

This is the required half-line architecture, including its endpoint fiber.

## 5. Agreement with the previous sector construction

The earlier sector basis was produced by numerical orthonormalization of the
glide projector. The new orbit basis is canonical up to:

- the choice of one representative per orbit;
- the ordering and orientation of basis vectors inside each fiber.

For multiple sizes, boundary masses and both deck sectors, the two bases give:

- identical radial-localizer determinant signs;
- determinant log-magnitudes agreeing within \(10^{-10}\);
- reference sign \(+1\) and defect sign \(-1\).

The radial result is therefore not an artifact of the numerical projector basis.

## 6. Relative normalization

A basis orientation can change a Pfaffian sign, but a determinant transforms as

\[
\det(O^TBO)=\det(O)^2\det(B)=\det(B).
\]

The reduced determinant is basis invariant. For additional physical discipline,
define the relative radial marker

\[
\mathcal Z_{\rm rad}^{\rm rel}
=\operatorname{sign}\det B_{\rm ref}
\operatorname{sign}\det B_{\rm def}.
\]

It equals \(-1\) in both deck sectors for all tested half-line systems and
cancels any shared convention in the reference normalization.

## 7. What this establishes

The following are now exact finite statements:

1. one glide sector is a half-line system;
2. the quotient radius is its diagonal position operator;
3. the Hamiltonian is finite range in that radius;
4. the class-D reduced localizer is a real finite matrix on that half-line;
5. its determinant sign is basis independent;
6. the tested reference/defect relative sign is nontrivial in both deck sectors.

This is substantially stronger than saying that \(|Y|\) happened to work
numerically.

## 8. What remains open

The exact finite reduction does not by itself prove that the half-line
localizer pairing equals the continuum mod-two index of a point defect on the
nonorientable surface.

Still required:

- specify the infinite half-line operator and its asymptotic fibers;
- prove the localizer bounds uniformly as \(M\to\infty\);
- identify the real symmetry-class degree of the endpoint problem;
- compare its determinant sign with mod-two spectral flow through the localized
  defect crossing;
- show regulator independence or controlled stabilization.

## 9. Relation to the relational carrier

The quotient itself performs the crucial composition:

- the signed carrier \(Y\) does not descend;
- the relation identifying \((x,y)\) with \((x+L,-y)\) converts it into the
  scalar radius \(|Y|\);
- the positive-radius fiber remembers both faces \(y=\pm\rho\);
- the endpoint fiber merges them at the defect row.

This is a literal mathematical realization of a carrier whose two faces are
retained as relationship multiplicity away from the endpoint.

## 10. Stop-everything and falsification gates

**Stop-everything trigger:** prove that the infinite block-Jacobi half-line
pairing is the Pin point-defect mod-two index and that the source-normalized
coefficient lies in its nontrivial local phase.

**Half-line falsifier:** claim the quotient is merely analogous to a half-line
after the exact orbit basis and zero long-range blocks have been constructed.

**Index falsifier:** claim the continuum point-defect theorem solely from the
finite block-Jacobi architecture.

**Fiber falsifier:** replace the positive-radius doubled fiber by a constant
fiber without proving a stable equivalence that preserves the endpoint index.

**Normalization falsifier:** ignore the reference factor when comparing
different regulator or asymptotic conventions.

## 11. Pinned dependency and continuation

The half-line existence problem is closed. Pin the continuum-index equality at
uniform localizer bounds, asymptotic stabilization and mod-two spectral-flow
comparison.

The next executable calculation should track the relative radial marker across
the localized defect crossing in \(\delta\), while separately recording the
half-line localizer gap and the physical Hamiltonian gap.

## 12. Certificate and exploration

The [exact half-line certificate](../../../verification/verify/verify_pin_glide_sector_is_exact_radial_half_line.mjs)
checks orbit-basis orthonormality, sector membership, radius diagonalization,
fiber multiplicities, block-Jacobi range and agreement with the numerical sector
basis.

The [half-line exploration script](../../../verification/explore/explore_pin_half_line_quotient.mjs)
constructs the explicit quotient.

## Companion documents

- [Local radial normalization and width stability](401_local_radial_normalization_not_remote_edge_normalization_controls_the_pin_localizer_limit.md)
- [Open radial center-scale phase](../0300-0399/399_the_radial_pin_localizer_has_an_open_center_scale_phase_not_a_tuned_negative_point.md)
- [Signed-coordinate descent obstruction](../0300-0399/396_the_signed_class_d_localizer_does_not_descend_but_a_radial_pin_localizer_survives_the_boundary_test.md)
