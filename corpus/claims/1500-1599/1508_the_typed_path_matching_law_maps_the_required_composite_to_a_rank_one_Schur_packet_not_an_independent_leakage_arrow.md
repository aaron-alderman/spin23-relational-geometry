# The Typed-Path Matching Law Maps the Required Composite to a Rank-One Schur Packet, Not an Independent Leakage Arrow

**Date:** 20 October 2026

**Gates:** A2, A5 and A6

**Status:** exact minimal categorical matching construction and transverse-leakage theorem; loop and multi-mediator closure remain open

**Depends on:** [the ordinary field-parity no-go](1507_any_ordinary_Z2_preserving_the_required_Dirac_and_Majorana_vertices_also_allows_the_composite_leakage.md), [the sequential-seesaw cancellation](../1400-1499/1497_the_selected_heavy_neutrino_bridge_generates_an_apparent_Dirac_leakage_but_its_complete_Schur_package_preserves_the_texture_zero.md), and [the three tree-bridge topology census](../1400-1499/1496_exactly_three_single_mediator_tree_bridges_generate_the_dimension_five_Dirac_leakage_and_each_requires_two_incidence_portals.md)

**Evidence:** [typed-path Schur ledger](../../../evidence/data/spin23-typed-path-Schur-packet.json) and [exact verifier](../../../verification/verify/verify_spin23_typed_path_Schur_packet.mjs)

## Result

There is a smallest explicit categorical middle that preserves the required
vertices without promoting their composite to an independent leakage arrow.

Use three objects

\[
L,qquad P,qquad N
\]

and two primitive arrows

\[
d:L\to P,
\qquad
y:P\to N.
\]

The path \(y\circ d:L\to P\to N\) exists, but it is a reducible length-two
path with remembered factorization through \(P\), not a new primitive
generator \(r:L\to N\).

Eliminating a mass \(a\) at \(P\) sends the path to the complete Schur packet

\[
\boxed{
(c,p,s)=-\frac1a(d^2,dy,y^2),}
\]

where \(c\) is the light contact, \(p\) the apparent \(L-N\) coupling and
\(s\) the shifted null-state mass. The packet obeys

\[
\boxed{cs-p^2=0.}
\]

An independent leakage coefficient changes \(p\) without the correlated
changes in \(c\) and \(s\), moves off this rank-one cone and lifts the light
zero generically at first order.

## 1. Schur matching as a composition law

Start with the symmetric three-state matrix

\[
M=
\begin{pmatrix}
0&d&0\\
d&a&y\\
0&y&0
\end{pmatrix}.
\]

Eliminating the middle state \(P\) gives the effective \((L,N)\) matrix

\[
M_{LN}^{\rm eff}
=-rac1a
\begin{pmatrix}
d^2&dy\\
dy&y^2
\end{pmatrix}.
\]

This is an outer product and therefore has rank one. Writing it as

\[
\begin{pmatrix}c&p\\p&s\end{pmatrix},
\]

one has \(cs-p^2=0\). Eliminating \(N\) then gives

\[
m_L=c-\frac{p^2}{s}=0.
\]

The apparent leakage entry is real, but it cannot be varied independently
inside the image of the matching map.

## 2. Primitive versus composite

An endpoint-only EFT records an \(L-N\) operator and may forget whether it is:

- the composite path \(L\to P\to N\), or
- an independent primitive arrow \(L\to N\).

The typed path category keeps those objects distinct. Its matching functor
maps the composite not to \(p\) alone but to the entire determinantal packet
\((c,p,s)\).

This is the missing information in the ordinary field-parity analysis.
Symmetry correctly allows the composite operator, while categorical
provenance prevents its coefficient from being treated as free.

## 3. Independent leakage is transverse

Add a primitive leakage coefficient \(r\) only to the middle entry:

\[
p\longmapsto p+r.
\]

Then

\[
cs-(p+r)^2=-2pr-r^2.
\]

The light mass becomes

\[
\boxed{
m_L
=c-\frac{(p+r)^2}{s}
=-\frac{2d}{y}r+\frac{a}{y^2}r^2.}
\]

Its derivative at the protected branch is

\[
\left.\frac{\partial m_L}{\partial r}\right|_{r=0}
=-\frac{2d}{y},
\]

recovering the linear sensitivity identified in claims 1495 and 1497.

There is a second algebraic zero at \(r=-2p\), corresponding to a finite
sign flip of the matched middle entry. It is disconnected from the small
leakage branch and supplies no perturbative protection.

## 4. Exhaustive coefficient audit

The verifier checks all \(6^3=216\) nonzero integer triples

\[
a,d,y\in\{-3,-2,-1,1,2,3\}.
\]

Every matched packet satisfies the exact integer numerator identity

\[
(-d^2)(-y^2)-(-dy)^2=0.
\]

It also verifies the transverse deformation formula and a numerical physical
witness. No tuning or floating-point root search is used for the rank-one
result.

## 5. Fan downward: Wilson-coefficient provenance

The EFT basis should carry a provenance label:

\[
C_5=C_5^{\rm Schur}+C_5^{\rm primitive}.
\]

The first belongs to a rank-one packet and preserves the cofactor after all
matched terms are included. The second is transverse to that packet and lifts
the texture.

This classification is more informative than simply calling the operator
allowed or forbidden. It turns radiative protection into the question of
whether loops generate a primitive transverse component.

## 6. Fan upward: the categorical middle

The minimal structure has four ingredients:

1. typed objects \(L,P,N\);
2. primitive arrows \(d,y\);
3. path composition retaining the intermediate object \(P\);
4. a matching functor sending a reducible path to its complete Schur packet.

An endpoint quotient that identifies \(y\circ d\) with a free primitive arrow
destroys the determinantal relation and reintroduces leakage.

The next closure test is precise: apply the same provenance-aware matching to
all three mediator topologies, then to loops, and ask whether every generated
\(L-N\) term remains tangent to a protected matching ideal or produces a
transverse primitive component.

## 7. Spin(2,3) joining interpretation

The relational wheel does not merely label endpoints. It remembers the
middle of a composition. The selected heavy state is the typed hinge joining
the Dirac and Majorana relations, and the rank-one Schur cone is the algebraic
image of that hinged path.

This realizes the user's convergence procedure literally:

\[
\boxed{
\text{top-down typed composition}
\longleftrightarrow
\text{rank-one Schur middle}
\longleftrightarrow
\text{bottom-up protected cofactor}.}
\]

## Boundaries

**Loop boundary:** generic loop matching need not remain on the rank-one cone.

**Multi-mediator boundary:** sums of rank-one packets can have higher rank and
must be tracked with separate provenance labels.

**Functor boundary:** no complete spectral/Jordan/correspondence functor has
yet been shown to implement this matching rule automatically.

**Renormalization boundary:** operator mixing may create a transverse
primitive coefficient even if tree matching does not.

## Verdict

The first categorical construction succeeds:

\[
\boxed{
y\circ d\text{ is retained as a factored path and matches to }
(c,p,s)\text{ with }cs=p^2,
}
\]

whereas independent leakage is a transverse deformation. Claim 1509 extends
the ideal to sums and proves that same-sign packets preserve the protected
cofactor exactly when every mediator coupling vector shares one projective
ray; packet-wise correlation alone is not enough.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_typed_path_Schur_packet.mjs
node verification/verify/verify_spin23_sequential_seesaw_bridge_cancellation.mjs
node verification/verify/verify_spin23_ordinary_Z2_cannot_forbid_composite_Dirac_leakage.mjs
~~~
