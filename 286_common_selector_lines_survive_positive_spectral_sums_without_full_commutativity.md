# Common Selector Lines Survive Positive Spectral Sums Without Full Commutativity

**Date:** 17 October 2026  
**Branches:** B01, B02, B03, B04, B06, B07, B08 and B11  
**Claim status:** exact finite-dimensional common-projector and gap theorem; a shared physical triplet/intertwiner across sectors remains open

## 1. The common-selector criterion

Suppose several real symmetric sector matrices \(K_a\) act on the same real triplet and one rank-one projector \(P=nn^T\) satisfies

\[
\boxed{[K_a,P]=0\quad\text{for every }a.}
\]

Then \(n\) is an eigenvector of every \(K_a\). In the selector basis,

\[
K_a=
\begin{pmatrix}
\kappa_a&0\\
0&B_a
\end{pmatrix},
\]

where \(B_a\) is a real symmetric \(2\times2\) plane block.

The \(B_a\) matrices need not commute with one another. Full pairwise simultaneous diagonalization is stronger than necessary. A common selector requires only one common invariant line and its complementary plane.

## 2. Positive spectral sums preserve the line

For nonnegative weights \(w_a\),

\[
K=\sum_aw_aK_a
=
\begin{pmatrix}
\sum_aw_a\kappa_a&0\\
0&\sum_aw_aB_a
\end{pmatrix}
\]

also commutes with \(P\).

Assume the selected line is the isolated top eigenspace of every sector, with gaps

\[
\delta_a=\kappa_a-\lambda_{\max}(B_a)>0.
\]

Using convexity of the largest eigenvalue,

\[
\lambda_{\max}\!\left(\sum_aw_aB_a\right)
\leq
\sum_aw_a\lambda_{\max}(B_a),
\]

so the summed gap obeys

\[
\boxed{\delta_{\rm sum}\geq\sum_aw_a\delta_a>0.}
\]

Thus positive spectral integration strengthens rather than destroys a genuinely common isolated selector line.

## 3. Why pairwise commutativity is unnecessary

The dynamics inside the negative/relationship plane may differ by sector:

\[
[B_a,B_b]\neq0.
\]

The sector matrices then fail to commute fully, but all preserve the same time line and split metric. This permits nontrivial plane mixing while retaining one global selector.

The exact architecture is

\[
\mathbb R n\oplus n^\perp
\]

shared across sectors, not a common eigenbasis for every relationship direction.

## 4. Pointwise versus integrated closure

A spectral moment may accidentally commute with \(P\) even when its density does not:

\[
\int ds\,w(s)[\rho(s),P]=0
\]

can result from cancellation of positive- and negative-valued off-block matrix entries. Changing the weight function can destroy the cancellation.

The robust condition is

\[
[\rho(s),P]=0
\quad\text{for almost every }s,
\]

or a symmetry/Ward identity enforcing the integrated relation for an entire class of weights.

One commuting moment is weak evidence. A common projector for the full spectral family is strong evidence.

## 5. Cross-sector comparison still needs intertwiners

Sterile flavor, stress probes and Furey linking sectors do not initially act on the same vector space. Writing one \(P\) for all of them already assumes maps

\[
I_a:V_a\longrightarrow V_{\rm response}.
\]

The proper condition is

\[
[I_aK_aI_a^{-1},P]=0
\]

on one common response carrier. Arbitrary isomorphisms can always manufacture a shared eigenline; only source-, symmetry- or action-derived intertwiners count.

This is the same orientation issue found for the four Yukawa Gram channels, now stated at the selector-projector level.

## 6. Failure modes

### Time--plane mixing

Any nonzero block \(v_a\) in

\[
K_a=\begin{pmatrix}\kappa_a&v_a^T\\v_a&B_a\end{pmatrix}
\]

rotates the sector's eigenline away from \(P\). Small mixing is controlled by \(\|v_a\|/\delta_a\); large mixing destroys common selection.

### Ordering reversal

Even if \(P\) is a common eigenprojector, it is not the selected top line if one sector has \(\delta_a<0\). Positive sums may then undergo an eigenvalue crossing as weights vary.

### Degenerate plane contact

When \(\delta_a=0\), the selected line merges with the plane and ceases to be isolated. The spectral projector becomes nonanalytic.

## 7. Consequence for a universal Jordan selector

A credible shared selector across sterile, stress and Furey sectors requires:

1. derived embeddings into one real triplet;
2. pointwise or symmetry-protected common-projector closure;
3. positive gaps with consistent eigenvalue ordering;
4. stability under the physical spectral weights and renormalization flow.

If these hold, every positive sector sum retains the same \((1,2)\) metric selector even though relationship-plane dynamics differ.

## 8. Stop-everything and falsification gates

**Stop-everything trigger:** source-derived intertwiners place independent sterile, stress and Furey spectral densities on one triplet and all commute pointwise with the same isolated \(P\).

**Sum-rule trigger:** multiple independently chosen positive spectral moments recover the same projector and additive gap.

**Mixing falsifier:** an unavoidable sector has time--plane mixing not removable by the derived intertwiner.

**Cancellation falsifier:** only one specially weighted integral commutes with \(P\), while nearby weights do not.

**Ordering falsifier:** the common eigenline changes from top to plane across physical sector weights.

## 9. Certificate

The [common-selector spectral-sum certificate](scripts/verify_common_selector_positive_spectral_sums.mjs) verifies preservation and additive gap for noncommuting plane blocks, eigenline rotation under mixing and the fragility of accidental integrated cancellation.

## Companion documents

- [Spectral-projector Jordan selector](282_an_isolated_real_neutrino_eigenline_gives_a_covariant_stable_jordan_selector.md)
- [Fixed-selector response commutant](283_exact_selector_preservation_reduces_the_response_group_to_scale_times_rotation.md)
- [Four-channel stress-weight obstruction](265_shared_field_incidence_obstructs_naive_stress_derived_yukawa_weights.md)
- [Channel aggregation and Schur covariance](267_matrix_interior_schur_covariance_needs_no_commutativity.md)
