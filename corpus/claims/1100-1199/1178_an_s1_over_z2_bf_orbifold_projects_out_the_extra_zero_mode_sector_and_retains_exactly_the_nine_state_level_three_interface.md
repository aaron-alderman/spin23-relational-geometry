# An \(S^1/\mathbb Z_2\) BF Orbifold Projects Out the Extra Zero-Mode Sector and Retains Exactly the Nine-State Level-Three Interface

> **Global-form and twist qualification:** this construction applies to the physical split \(\mathbb Z_3\) quotient fields after the fieldwise \(\mathbb Z_9\)/colour-centre reduction of documents 1180–1181. Its two-qutrit interpretation further requires the untwisted class classified in document 1182.

**Date:** 19 October 2026  
**Branches:** boundary/defect realization, four-dimensional BF theory, orbifold parity, zero-mode projection, nine-state carrier  
**Claim status:** exact topological zero-mode construction; microscopic origin and physical torus remain open  
**Certificate:** [verify_orbifold_parity_projects_4d_bf_to_only_the_3d_nine_state_sector.mjs](../../../verification/verify/verify_orbifold_parity_projects_4d_bf_to_only_the_3d_nine_state_sector.mjs)

## Executive result

The unwanted compactification sector in document 1169 can be removed by a local reflection projection rather than discarded by assertion.

Start with four-dimensional level-three BF theory on

\[
M_3\times S^1:
\qquad
S=\frac3{2\pi}\int b_2\wedge da_1.
\]

Pass to the orbifold interval \(S^1/\mathbb Z_2\), with reflection \(y\mapsto-y\). Assign parity as differential forms:

\[
r^\ast a=+a,
\qquad
r^\ast b=-b.
\]

Because \(dy\) is odd, the component parities are

\[
\begin{array}{c|cccc}
&a_\mu&a_y&b_{\mu\nu}&b_{\mu y}\\ \hline
\mathbb Z_2&+&-&-&+
\end{array}
\]

and therefore the zero modes are exactly

\[
a_\mu^{(3)},\qquad c_\mu=b_{\mu y}^{(3)}.
\]

The unwanted pair

\[
\phi=a_y,\qquad b_{\mu\nu}^{(3)}
\]

has no zero mode. The reduced topological action is consequently

\[
\boxed{
S_{\rm zero}
=
\frac3{2\pi}\int_{M_3}c_1\wedge da_1
}
\]

with no \(b_2\wedge d\phi\) factor.

On spatial \(T^2\), this theory has nine ground states and four Wilson-loop exponents in \(\mathbb F_3^4\). Thus the boundary-condition gap identified in document 1169 has an exact solution.

What remains unproved is why the physical Standard-Model/Jordan system should contain this orbifold interval or an equivalent reflection boundary condition, and what physical geometry supplies the spatial \(T^2\).

## 1. Component decomposition

Write

\[
a=a_\mu dx^\mu+a_y\,dy,
\]

\[
b=\frac12b_{\mu\nu}dx^\mu\wedge dx^\nu
+b_{\mu y}dx^\mu\wedge dy.
\]

Under \(y\mapsto-y\),

\[
dy\mapsto-dy.
\]

For an even one-form \(a\),

\[
a_\mu(x,-y)=+a_\mu(x,y),
\qquad
a_y(x,-y)=-a_y(x,y).
\]

For an odd two-form \(b\),

\[
b_{\mu\nu}(x,-y)=-b_{\mu\nu}(x,y),
\qquad
b_{\mu y}(x,-y)=+b_{\mu y}(x,y).
\]

Only even fields admit constant Kaluza–Klein modes. Hence the projection is exact at the zero-mode level.

## 2. Why the desired term survives

Before projection, reduction gives

\[
\frac3{2\pi}\int_{M_3}
\left(c_1\wedge da_1+b_2\wedge d\phi\right).
\]

The first term is built from the even zero modes \(c_\mu=b_{\mu y}\) and \(a_\mu\). The second needs both odd fields \(b_{\mu\nu}\) and \(\phi=a_y\), neither of which has a zero mode.

Both combinations can have higher Kaluza–Klein excitations, because odd modes occur in sine towers. But these modes are massive at the inverse interval scale. The infrared topological zero-mode theory contains only \(c\,da\).

## 3. Boundary gauge invariance

Let

\[
a\mapsto a+d\lambda,
\qquad
b\mapsto b+d\Lambda.
\]

Choose

\[
r^\ast\lambda=+\lambda,
\qquad
r^\ast\Lambda=-\Lambda.
\]

Then

\[
\Lambda_\mu\text{ is odd},\qquad\Lambda_y\text{ is even}.
\]

At each orbifold fixed plane, the tangential pullback of \(\Lambda\) vanishes. The possible boundary variation

\[
\delta_\Lambda S
=
\frac3{2\pi}\int_{\partial M_4}\Lambda\wedge da
\]

therefore vanishes under the orbifold boundary condition.

This gives a consistent topological boundary projection without adding compensating edge modes at this stage. Alternative boundary conditions may deliberately retain edge modes, but they are not required for the nine-state zero-mode sector.

## 4. Quantization

The remaining three-dimensional action has

\[
K=3H=
\begin{pmatrix}0&3\\3&0\end{pmatrix}.
\]

On spatial \(T^2\),

\[
\dim\mathcal H(T^2)=|\det K|=9.
\]

The four primitive loop operators are

\[
W_a(\alpha),\quad W_a(\beta),\quad
W_c(\alpha),\quad W_c(\beta),
\]

with the level-three finite Heisenberg commutators already certified in documents 465 and 1169.

No extra scalar/two-form topological tensor factor remains in the zero-mode Hilbert space.

## 5. Physical interpretations of the interval

The orbifold interval can be read in several ways:

1. an actual compact extra direction with two fixed planes;
2. the doubled description of a finite slab or domain wall;
3. a folding construction for two sides of an interface;
4. a bookkeeping device for a reflection-graded defect sector.

Only the fourth is minimally required by the effective theory. The construction does not force a literal macroscopic fifth dimension.

The two fixed planes naturally resemble the two faces of the relational carrier, but identifying them with the Jordan/stress faces requires a typed source map.

## 6. Relation to the rank-split family symmetry

If the compact \(U(1)_X\) is Higgsed by \(S_{q=3}\), its infrared gauge sector is four-dimensional level-three BF. The orbifold parity then selects the interface zero modes without changing the level.

This yields the conditional chain

\[
U(1)_{B-3L_i}
\xrightarrow{\langle S_3\rangle}
\mathbb Z_3\ {\rm BF}_{4d}
\xrightarrow{S^1/\mathbb Z_2}
K=3H\ {\rm BF}_{3d}
\xrightarrow{T^2}
\mathbb C^9.
\]

Every mathematical arrow is now explicit. The physical inputs are the gauged family symmetry, condensate, reflection defect and compact two-cycle.

## 7. Claim ledger

- **Exact:** the declared orbifold parities preserve \(a_\mu,b_{\mu y}\) zero modes.
- **Exact:** they project out \(a_y,b_{\mu\nu}\) zero modes.
- **Exact:** the zero-mode action is only \(3(2\pi)^{-1}\int c\,da\).
- **Exact:** the tangential two-form gauge parameter vanishes at the fixed planes.
- **Exact:** the torus Hilbert space has dimension nine.
- **Conditional:** higher Kaluza–Klein modes are separated by a large interval scale.
- **Open:** microscopic origin of the reflection grading.
- **Open:** physical realization of the compact spatial \(T^2\).
- **Open:** coupling of loop operators to Jordan/stress observables.

## 8. Stop-everything and positive gates

**Projection stop:** do not merely omit \(b_2\,d\phi\); specify a constraint or parity removing both zero modes.

**KK stop:** the projection removes zero modes, not the entire massive tower.

**Geometry stop:** an orbifold effective description does not prove a literal extra dimension.

**Torus stop:** the nine-state count requires a compact genus-one spatial surface or an equivalent cycle lattice.

**Positive microscopic trigger:** derive the reflection grading from a domain wall, two-face folding symmetry or Jordan involution already present in the programme.

**Positive port trigger:** identify the four Wilson exponents with two gauge-invariant relational conjugate pairs.

## 9. Verdict

\[
\boxed{
(r^\ast a,r^\ast b)=(+a,-b)
\quad\Longrightarrow\quad
(a_\mu,b_{\mu y})_0\text{ only}
\quad\Longrightarrow\quad
\mathcal H(T^2)=\mathbb C^9.
}
\]

The extra-zero-mode objection is resolved conditionally and exactly. The boundary branch is now viable at the topological field-theory level. Its remaining burdens are microscopic origin, physical cycle geometry and relational-port identification.

## Corpus position

- [minimal one-third-response BF completion](1169_the_minimal_dynamical_completion_of_one_third_transport_is_level_three_bf_and_reduces_to_the_nine_state_carrier.md)
- [fermion central lift and outer gauging boundary](1177_the_existing_fermion_module_supplies_a_faithful_and_conditionally_unique_central_lift_but_not_the_local_gauge_principle.md)
- [Jordan central-kernel theorem](1176_the_jordan_peirce_derivation_generates_the_charge_three_relation_but_quotients_out_the_residual_z3_so_a_fermionic_central_lift_is_essential.md)
