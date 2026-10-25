# The relation quotient contains a Jordan face, but the graph does not choose its positive order

**Date:** 25 October 2026

**Status:** exact local graph-to-Jordan construction closed; pre-quotient positivity later closed by AZ-125/126; face selection, composition and prediction remain gated

**Topic:** OT-026

**Evidence:** [Jordan-face boundary ledger](../../../evidence/data/relation-jordan-face-boundary-v1.json)

**Generator:** [exact face constructor](../../../scripts/run-relation-jordan-face-boundary.mjs)

**Verifier:** [Jordan-face certificate](../../../verification/admissibility/verify_relation_jordan_face_boundary.mjs)

> **26 October 2026 update.** The statement below that the authored graph did
> not supply a positive order was correct for the scalar quotient construction
> audited here, but is no longer the whole boundary. [AZ-125](admissibility_125_claimipedia_support_native_order_and_semantic_boundary.md)
> derives a counting-measure incidence order, and [AZ-126](admissibility_126_typed_two_rail_positive_lift_preserves_the_mirror_face.md)
> gives a positive pre-quotient carrier retaining direction and type. Neither
> result selects this particular transpose-fixed Jordan face, composes authored
> paths, or predicts a held-out record. Read “does not choose its positive
> order” below as “the scalar quotient does not intrinsically choose the
> semantically relevant cone.”

## Result

The relation algebra does more than resemble a Jordan carrier. The predecessor-closed Spin--Temple calculation already proved that its 35-dimensional associative algebra has a 30-dimensional path radical and semisimple quotient

\[
\mathcal A/J(\mathcal A)\cong \mathbb Q\oplus M_2(\mathbb Q).
\]

Inside the reversible matrix block, the two differently typed reverse arrows are the matrix units $q=E_{12}$ and $s=E_{21}$. Matrix transpose exchanges them. The transpose-fixed subspace is

\[
\operatorname{span}\{E_{11},E_{22},q+s\}=H_2(\mathbb Q).
\]

With the symmetrized relation product

\[
A\circ B=\frac{AB+BA}{2},
\]

this subspace is closed and is exactly the rank-two special Jordan algebra of symmetric $2\times2$ matrices. Extending scalars to the reals supplies the familiar determinant $ac-b^2$, matrix rank and positive-semidefinite cone. An exact 125-element coefficient grid checks 15,625 ordered pairs with zero Jordan-identity and transpose-closure residual.

The sequence can therefore be pictured without group jargon. The authored graph contains a reversible two-node channel surrounded by one-way histories. Removing those transient histories leaves a two-state matrix channel. Forgetting which of the two reverse relation labels supplied an off-diagonal step leaves their symmetric combination. That three-coordinate remainder is the same shape as an ordinary two-channel positive response matrix.

## The decisive boundary

This is not yet a graph-derived positive physics. Three operations did real work:

1. quotienting removed thirty dimensions of directed path history;
2. transpose identified the `Supports` and `Qualifies` arrows in the symmetric combination $q+s$;
3. positive-semidefinite order was supplied by the standard real matrix representation.

The full canonical symmetrization of the five-dimensional quotient is instead

\[
\mathbb Q\oplus M_2(\mathbb Q)^+.
\]

It has rank three and cubic norm $\lambda\det M$, but it is not the Euclidean rank-two response carrier: the nonzero arrow $E_{12}$ has zero Jordan square. The positive $H_2(\mathbb R)$ face appears only after the transpose-fixed restriction. The graph supplies the reversible block and named arrow exchange; it does not force the positive order, preserve the discarded radical, transport a physical observable or derive an exceptional cubic.

## Open and closed

Closed:

- an exact local Jordan product induced by relation-operator composition;
- a three-dimensional transpose-fixed $H_2$ face;
- determinant and matrix-rank structure on that face;
- the distinction between whole-quotient Jordanization and the Euclidean rank-two face;
- the exact information loss required to reach the face.

Open after AZ-125/126:

- a source-native reason that transpose and this Jordan face, rather than another involution or cone, are mandatory;
- a construction that retains or meaningfully transports the 30-dimensional path radical;
- a held-out relation identity predicted by the Jordan face rather than used to define it;
- a quantity-bearing observable carried through the same map;
- any exceptional cubic or physical $Spin(2,3)$ claim.

## Implication and look-here instruction

OT-026 remains gated, but “no Jordan product exists” is no longer accurate. A local product exists exactly. The missing content is selection: why this symmetric, positive face is the one that should carry meaning, and what it predicts that the original edge list did not already say.

The next useful test is therefore not another dimension match. Compose the AZ-126 typed two-rail carrier with the authored path algebra without identifying its rails, derive a semantic star from independent evidence, and withhold one composition. If the resulting $H_2$ product predicts that composition—or a calibrated observable—without inserting it into the construction, the bridge becomes explanatory. If the face is chosen only after inspecting the desired answer, the result remains a precise mathematical view of the graph, not a discovery about nature.

## Reproduction

~~~powershell
node scripts/run-relation-jordan-face-boundary.mjs --write
node verification/admissibility/verify_relation_jordan_face_boundary.mjs
~~~
