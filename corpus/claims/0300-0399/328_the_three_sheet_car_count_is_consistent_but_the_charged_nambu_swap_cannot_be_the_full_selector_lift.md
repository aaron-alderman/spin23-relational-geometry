# The Three-Sheet CAR Count Is Consistent, but the Charged Nambu Swap Cannot Be the Full-Selector Lift

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B06, B08, B09 and B11  
**Claim status:** exact independent-mode count and gauge-equivariance audit; a full-selector lift for all charged generations remains open

## 1. Quantize the triality sheets without overlap

After replacing overlapping exceptional tangent choices by the associated orbit carrier, the completed particle space is

\[
K=V_{16}\otimes\mathbb C^3,
\qquad
\dim_{\mathbb C}K=48.
\]

Its self-dual CAR carrier is

\[
\mathcal K=K\oplus\bar K,
\qquad
\dim_{\mathbb C}\mathcal K=96,
\]

with

\[
\Gamma_{\rm CAR}=\tau_xK_0.
\]

A basis projection has rank \(48\). Thus there are

\[
\boxed{48\text{ independent annihilation modes}}
\]

and a finite-mode Fock dimension \(2^{48}\), not \(2^{96}\).

For the uncompleted \(15\)-state sheets, the corresponding numbers are \(45\) independent modes in a \(90\)-complex-dimensional self-dual carrier.

The three-sheet construction therefore does not inherently recreate mirror doubling.

## 2. Triality permutations are compatible with CAR

The sheet permutation matrices are real. Their extension

\[
U_\pi
=P_\pi\otimes I_{16}
\]

acts identically on particles and conjugate particles, and commutes with the self-dual CAR involution after the natural conjugate extension.

Thus the \(S_3\to S_2\to1\) flavor structure can coexist with one CAR reality condition.

The important count is:

\[
3\times16\text{ particles}
\quad+\quad
\text{their CAR adjoints},
\]

not six independent generations.

## 3. The tempting full-selector identification

The full-\(\mathbb{RP}^2\) selector lift previously used

\[
G=\tau_x\otimes I
\]

on a doubled mass carrier. Since the CAR space already has a Nambu factor, it is tempting to identify this \(G\) with the unitary part of \(\Gamma_{\rm CAR}\).

For charged matter, this fails.

The gauge action on a particle plus its conjugate is

\[
U(h)=
\begin{pmatrix}
\rho(h)&0\\
0&\bar\rho(h)
\end{pmatrix}.
\]

Unitary Nambu exchange gives

\[
\tau_xU(h)\tau_x
=
\begin{pmatrix}
\bar\rho(h)&0\\
0&\rho(h)
\end{pmatrix},
\]

which differs from \(U(h)\) for a genuinely complex charged representation.

Therefore

\[
\boxed{
\tau_x\text{ alone is not a gauge-equivariant selector deck lift on charged CAR sectors}.}
\]

## 4. Why the antiunitary CAR map does work—and is still different

The full CAR involution includes coefficient conjugation:

\[
\Gamma_{\rm CAR}=\tau_xK_0.
\]

Then

\[
\Gamma_{\rm CAR}U(h)\Gamma_{\rm CAR}^{-1}=U(h).
\]

But the selector mass-gluing equation was a unitary relation

\[
GM(n)G^{-1}=-M(n).
\]

Replacing \(G\) by an antiunitary changes complex coefficients and can alter the mass action. Gauge equivariance of \(\Gamma_{\rm CAR}\) therefore does not automatically solve the unitary selector-lift problem.

The two operations may coincide only on a real or gauge-neutral sector with a compatible mass convention.

## 5. Neutral-sector escape

On a gauge-trivial right-handed-neutrino or Majorana-real sector,

\[
\rho=\bar\rho,
\]

so the unitary Nambu swap can commute with gauge transport. The full-selector doubled lift may therefore be realizable on the sterile/neutrino sector even when it fails on charged quarks and leptons.

This is consistent with several earlier branches in which the neutrino corner is the unique gauge-neutral home for a real Jordan carrier or complex structure.

It does not yet provide a universal selector lift for the complete generation.

## 6. Identical triality sheets provide a unitary pair

Two generation sheets carry identical gauge representations. Their unitary exchange

\[
\sigma_x^{\rm sheet}
\]

commutes with all Standard-Model gauge transformations.

Thus the residual \(S_2\) pair selected by the nested flag can supply the two-level factor needed for a gauge-equivariant selector lift without using the charged Nambu swap.

However, three is odd. Every involution of three sheets has a fixed sheet. The decomposition is necessarily

\[
\mathbf3\downarrow S_2
=\mathbf2_{\rm exchanged}\oplus\mathbf1_{\rm fixed}.
\]

The sheet-pair lift therefore covers two generations and leaves the third unpaired.

## 7. Odd-sheet obstruction

More generally, any involutive grading on a three-dimensional flavor space has unequal eigenspace dimensions, such as \(2+1\). An invertible operator anticommuting with that grading cannot exist; rank-nullity forces an unmatched mode.

This is the flavor analogue of the earlier odd-dimensional zero-mode theorem.

It creates an intriguing but unproved possibility:

\[
\text{triality sheet pair}
\quad+\quad
\text{one fixed sheet}
\]

could underlie a two-light/one-distinguished family structure. But no observed mass hierarchy follows without a dynamical operator and sector-specific Yukawa calculation.

## 8. Current consistent architecture

The least contradictory architecture is:

\[
\begin{array}{ccl}
\Gamma_{\rm CAR}=\tau_xK_0
&:&\text{particle/adjoint reality for all charged modes},\\
\sigma_x^{\rm sheet}
&:&\text{unitary selector lift on the residual identical sheet pair},\\
\text{neutral Nambu }\tau_x
&:&\text{possible full-selector lift in sterile sectors},\\
\Delta(c)
&:&\text{final complex triality-breaking flavor operator}.
\end{array}
\]

These maps act on different factors and must not be silently identified.

## 9. Stop-everything and falsification gates

**Stop-everything trigger:** one common completed carrier realizes CAR reality, sheet-pair selector lift and \(\Delta(c)\) with correct gauge covariance and no additional independent matter.

**Neutral-lift trigger:** the sterile-neutrino Nambu factor realizes the full \(\mathbb{RP}^2\) lift and controls the three \(\nu^c\) masses.

**Odd-sheet trigger:** the fixed triality sheet is calculably identified with a distinguished observed generation and predicts a hierarchy.

**Counting falsifier:** the \(96\)-complex self-dual carrier is counted as \(96\) independent particles rather than \(48\) modes plus adjoints.

**Gauge falsifier:** unitary Nambu \(\tau_x\) is claimed to commute with a charged \(R\oplus\bar R\) action.

**Antiunitary falsifier:** gauge equivariance of \(\tau_xK\) is used to prove the distinct unitary mass-gluing equation.

**Pairing falsifier:** all three triality sheets are claimed to be exchanged in disjoint pairs by one involution.

## 10. Certificate

The [three-sheet CAR/full-selector gauge-gate certificate](../../../verification/verify/verify_three_sheet_car_and_full_selector_gauge_gate.mjs) checks the independent-mode counts, charged unitary-swap obstruction, antiunitary CAR repair, identical-sheet equivariance and odd-sheet fixed-point theorem.

## Companion documents

- [Polarized exceptional determinant sign projection](327_the_polarized_exceptional_determinant_projects_canonically_onto_the_triality_sign_cubic.md)
- [Triality-orbit flavor carrier](323_quantizing_the_triality_orbit_gives_three_flavor_sheets_but_exact_s3_or_s2_forbids_observed_mixing.md)
- [Selector bundle-lift classification](317_the_selector_great_circle_has_a_unique_exchange_bundle_lift_but_full_rp2_requires_doubling.md)
- [Response selector versus CAR adjoint](307_the_response_selector_and_the_car_adjoint_are_two_distinct_antiunitaries.md)
- [Common carrier without independent overcounting](310_tensoring_the_selector_pair_with_the_nambu_pair_overcounts_the_generation.md)
