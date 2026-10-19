# The Full Matrix Vortex Has Index Three, but the Primitive \(\mathbb{RP}^2\) Defect Is Twisted

**Date:** 17 October 2026  
**Branches:** B01, B02, B03, B04, B05, B06, B08, B09 and B11  
**Claim status:** exact conventional matrix-vortex index representative and explicit normalizable channel modes; the primitive selector defect requires an equivariant/twisted index theorem

## 1. The conventional matrix vortex

Let \(x=(r,\varphi)\in\mathbb R^2\), and take a symmetric three-flavor mass

\[
M(r,\varphi)=f(r)e^{i\varphi}M_0,
\]

where

\[
f(0)=0,
\qquad
f(r)\longrightarrow v>0,
\qquad
\det M_0\ne0.
\]

At spatial infinity,

\[
\det M_\infty(\varphi)
=v^3e^{3i\varphi}\det M_0.
\]

Therefore

\[
\boxed{w[\det M_\infty]=3.}
\]

For the existing checkpoint, \(\det M_0=339+4i\); its constant phase does not
alter the winding.

## 2. The appropriate index theorem

For a two-dimensional chiral Dirac/BdG operator with a smooth matrix mass that
is invertible outside a compact set, the Weinberg/Jackiw--Rossi boundary index
is, with orientation convention fixed,

\[
\boxed{
\operatorname{Ind}\mathcal D_M
=\frac{1}{2\pi i}
\oint_{S^1_\infty}\operatorname{tr}(M^{-1}dM)
=w[\det M_\infty].}
\]

The equality follows from

\[
d\log\det M=\operatorname{tr}(M^{-1}dM).
\]

The theorem requires more than a loop drawn in mass space:

1. a Dirac-type elliptic operator on \(\mathbb R^2\);
2. exact chiral symmetry for the integer index;
3. a smooth mass and compatible gauge connection;
4. invertibility of the asymptotic mass;
5. sufficient approach to the asymptotic vacuum for Fredholmness;
6. an \(L^2\) domain and regular core boundary conditions.

Under these hypotheses, the full matrix vortex has index three.

## 3. Explicit representative with three zero modes

Takagi-reduce the constant symmetric matrix to

\[
M_0=U\operatorname{diag}(d_1,d_2,d_3)U^T,
\qquad d_a>0.
\]

Because \(U\) is constant, it does not change the spatial index. The problem
becomes three scalar unit-vortex Jackiw--Rossi channels.

For the illustrative smooth profile

\[
f(r)=\tanh r,
\]

the decaying radial envelope in channel \(a\) is

\[
u_a(r)=
\exp\left[-d_a\int_0^r\tanh s\,ds\right]
=(\cosh r)^{-d_a}.
\]

It obeys

\[
u_a'(r)+d_a\tanh r\,u_a(r)=0
\]

and

\[
2\pi\int_0^\infty r|u_a(r)|^2dr<\infty.
\]

Thus the diagonal representative explicitly contains one normalizable channel
mode per flavor, matching index three. Constant flavor mixing reconstructs the
original complex symmetric \(M_0\) without changing the count.

## 4. Breaking chirality leaves parity

Particle-hole-preserving perturbations may break the chiral symmetry used by
the integer theorem. They can pair two of the three modes and shift them away
from zero, but an odd class-D parity remains while the asymptotic gap stays open:

\[
3\longmapsto1\pmod2.
\]

This is the defect counterpart of the previously verified BDI-to-D reduction.

## 5. Why this looks like the selector

The full vortex mass satisfies

\[
M(\varphi+\pi)=-M(\varphi).
\]

It therefore obeys the same antipodal oddness used in the selector sewing law.
At first sight this appears to identify the selector loop with a physical
vortex.

That conclusion is too fast.

## 6. The selector's primitive loop is only half of this vortex

The selector order-parameter space is

\[
\mathcal M_{\rm selector}=\mathbb{RP}^2,
\qquad
\pi_1(\mathbb{RP}^2)=\mathbb Z_2.
\]

A primitive nontrivial selector circuit lifts from \(n\) to \(-n\), not from
\(n\) back to \(n\). If the mass is odd under this deck action, then after one
physical circuit

\[
M\longmapsto-M.
\]

For three flavors the lifted determinant phase changes by

\[
3\pi,
\]

which would be \(3/2\) turns if incorrectly treated as an ordinary closed map
to \(\mathbb C^*\).

It is not such a map. It is a section of a bundle whose endpoint is closed by
the selector/fermion deck transition.

Only after two primitive circuits does the lift close conventionally:

\[
2(3\pi)=6\pi,
\qquad w=3.
\]

## 7. The crucial non-equivalence

The ordinary unit vortex \(e^{i\varphi}\) over \(0\leq\varphi\leq2\pi\) traverses
the selector's primitive \(\mathbb Z_2\) loop twice. Its projection into
\(\mathbb{RP}^2\) is therefore trivial as a selector loop, even though its mass
phase has nonzero \(U(1)\) winding.

Conversely, the primitive \(\mathbb{RP}^2\) defect is nontrivial as a selector
configuration but does not define an ordinary integer determinant winding on
one circuit.

Thus

\[
\boxed{
\text{ordinary }U(1)\text{ vortex}
\ne
\text{primitive }\mathbb{RP}^2\text{ selector defect}.}
\]

They agree only after passing to the double cover, and the physical quotient may
retain only parity.

## 8. What theorem is still needed

The primitive selector defect requires an equivariant or twisted version of the
two-dimensional Dirac index:

\[
\operatorname{Ind}_{\rm twisted}(\mathcal D)
\quad\text{for}\quad
M(2\pi)=G,M(0),G^{-1}\text{ or }-M(0),
\]

with the fermion bundle transition \(G\) included in the domain.

The double-cover index is odd, strongly suggesting a nontrivial quotient parity,
but that parity must be proved from the equivariant kernel rather than inferred
solely from the lifted winding.

## 9. Energetic gate

Even the conventional vortex requires an order-parameter action. A local
finite-energy vortex normally needs a gauged phase and compensating flux; a
global phase vortex has logarithmically divergent energy per length in an
infinite system.

The current programme has not yet derived a complex scalar whose vacuum circle
multiplies the entire neutral Majorana matrix. Nor has it shown that the
\(\mathbb{RP}^2\) director defect has finite tension in the proposed Jordan
locking action.

The index theorem counts modes on an admitted defect; it does not prove that the
defect is dynamically present or stable.

## 10. Stop-everything and falsification gates

**Full-vortex trigger:** an existing Jordan/Furey scalar multiplies the three-
flavor Majorana mass, has a derived \(U(1)\) vortex, and preserves the asymptotic
gap. The index-three chiral sector would then be physical.

**Primitive-selector trigger:** an equivariant Jackiw--Rossi theorem proves that
the nontrivial \(\mathbb{RP}^2\) loop carries odd class-D kernel parity on the
physical quotient.

**Index falsifier:** \(w[\det M]\) is applied while \(M\) is singular at spatial
infinity or the operator is not Fredholm.

**Cover falsifier:** the full \(U(1)\) vortex is identified with the primitive
\(\mathbb{RP}^2\) loop rather than its double traversal.

**Energy falsifier:** a prescribed mass phase is called a stable vortex without
an order-parameter action, boundary conditions and finite-tension audit.

**Symmetry falsifier:** the integer index is retained after chiral symmetry is
broken; only its class-D parity is generally protected.

## 11. Pinned dependency and continuation

The full-vortex operator branch is solved conditionally and has an explicit
three-mode representative. Pin its physical realization at the scalar/action
gate.

The primitive selector branch is pinned at the twisted/equivariant index. The
next productive cross-check is whether the existing sterile-neutrino \(B-L\)
structure supplies a genuine complex scalar vortex, or whether the
\(\mathbb{RP}^2\) director must be treated directly.

## 12. Certificate

The [three-flavor matrix-vortex and RP2 gate certificate](../../../verification/verify/verify_three_flavor_matrix_vortex_index_representative_and_rp2_gate.mjs) verifies determinant winding three, constructs three normalizable radial channel envelopes, checks antipodal oddness, and proves that one primitive selector circuit has a twisted \(3\pi\) determinant phase while the double circuit recovers integer winding three.

## 13. Sources

- [Jackiw and Rossi, *Zero modes of the vortex-fermion system*](https://osiris.df.unipi.it/~rossi/NuclPhys190_1.pdf)
- [Weinberg, *Index calculations for the fermion-vortex system*](https://doi.org/10.1103/PhysRevD.24.2669)
- [Fujiwara and Fukui, *Generalized index theorem for topological superconductors with Yang--Mills--Higgs couplings*](https://arxiv.org/abs/1204.0988)

## Companion documents

- [Finite-range selector winding](357_odd_selector_winding_has_a_finite_range_lattice_representative_but_no_derived_coordinate.md)
- [Furey CAR reality versus flavor CP](356_furey_conjugation_supplies_car_particle_hole_reality_not_an_exact_flavor_cp.md)
- [Dynamical RP2 selector](../0200-0299/297_a_dynamical_real_form_selector_has_rp2_order_parameter_and_two_orientation_modes.md)
- [Yukawa zeros as selector defects](../0200-0299/235_one_generation_yukawa_portal_locally_selects_real_axis_but_zeros_are_defects.md)
