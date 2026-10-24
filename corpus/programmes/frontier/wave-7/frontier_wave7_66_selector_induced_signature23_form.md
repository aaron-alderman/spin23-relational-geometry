# Frontier Wave 7.66: The Selector Package Induces the Signature-(2,3) Form

**Date:** 25 October 2026
**Status:** exact conditional derivation from independently prior corpus objects
**Ledger:** [Q-provenance audit](q_provenance_audit_v1.json)
**Certificate:** [selector-induced Q verifier](../../../../verification/verify/verify_selector_induced_primitive_q.mjs)

## Result

The form used conditionally in Wave 7.61 is not absent from the corpus. A
source-native construction of it was already latent in the finite-selector
branch.

Let the four-real selector carrier carry the symplectic form \(J\) and the
positive metric \(G_0\) established in claims 895 and 913. Their compatible
complex structure is

\[
\mathcal I=\sqrt3\,G_0^{-1}J,
\qquad \mathcal I^2=-1.
\]

Pass to the five-dimensional primitive-form module

\[
W=\Lambda^2_0V^*
=\{\alpha:\alpha\wedge J=0\}.
\]

The pullback

\[
\kappa_{\mathcal I}(\alpha)(u,v)
=\alpha(\mathcal Iu,\mathcal Iv)
\]

is an involution on \(W\). Its eigenspaces have dimensions

\[
\dim W_-=2,
\qquad
\dim W_+=3.
\]

The wedge pairing is negative on \(W_-\) and positive on \(W_+\) after one
overall orientation choice. Consequently its normal form in an adapted
orthonormal basis is

\[
\boxed{Q\sim\operatorname{diag}(-I_2,+I_3).}
\]

This is exactly the form inserted in Wave 7.61.

## Why this is not retrofit

The relevant source documents were dated 17 October 2026:

- the primitive-form \(Spin(2,3)\) module in claim 745;
- the unique symplectic selector line in claim 770;
- the integral selector carrier in claim 895; and
- the unique positive selector metric and compatible complex structure in
  claim 913.

The rectangular involutive reduction was written on 25 October 2026. The
antecedent package therefore predates the target closure and was not selected
from a search over forms after seeing the desired answer.

## Exact dependency chain

\[
\begin{aligned}
\text{full selector symmetry}
&\Longrightarrow (J,G_0)\text{ unique up to common scale},\\
(J,G_0)
&\Longrightarrow \mathcal I,\\
(J,\mathcal I)
&\Longrightarrow W_2^-\oplus W_3^+,\\
W=\Lambda^2_0V^*
&\Longrightarrow Q\text{ of signature }(2,3),\\
Sp(V,J)
&\Longrightarrow SO_0(W,Q).
\end{aligned}
\]

The two-plus-three split is therefore the real Hodge-type split of primitive
two-forms selected by the compatible complex structure. It is not merely a
dimension partition.

## What is conditional

The derivation is only as physical as its first line. The corpus has not yet
shown that the complete finite selector is an exact Ward symmetry of one
microscopic response action. Nor has it identified the primitive eigenspaces
\(W_-\) and \(W_+\) with the source and target spaces of the rectangular
partial-sewing channel.

Thus the correct upgrade is:

\[
\boxed{Q\text{ is source-derived on the selector module, conditionally};}
\]

not yet:

\[
\boxed{Q\text{ is the physical metric of the measured rectangular ports}.}
\]

## Implication

The frontier moves from inventing an indefinite form to constructing one
typed transport. If the same response quotient carries both the selector
package and the rectangular ports, the sign pattern and five-dimensional
quadratic module are already fixed.
