# Exact phasor bounds exclude one spectral witness and expose a false reversed-order join

**Date:** 20 October 2026

**Gates:** A5 and A6

**Status:** exact fixed-witness bound plus correction of an inadmissible ordering; global triangle family remains open

**Depends on:** [the centered-cubic spectral elimination](1480_the_centered_cubic_eliminates_holonomy_and_shows_the_mass_hierarchies_are_spectrally_feasible.md)

**Evidence:** [machine-readable correction](../../../evidence/data/spin23-triangle-phasor-vcb-falsifier.json), [executable verifier](../../../verification/verify/verify_spin23_triangle_phasor_vcb_falsifier.mjs), and [PDG 2025 CKM review](https://pdg.lbl.gov/2025/reviews/rpp2025-rev-ckm-matrix.pdf)

> **Correction.** The initially reported large-(b) near-fit reversed the down eigenvalue order while retaining the small sorted mass location. A negative affine slope sends (r) to (1-r); the near-fit therefore did not preserve the down-quark hierarchy. Its nominal held-out (V_{cb}) falsifier is withdrawn. The exact phasor bound below is unaffected.

## Exact phase interval

On the (delta=\pi) spectral surface, let the real orthogonal eigenvector matrices of (K_u) and the unoriented (K_d) be (A) and (B). The maximal degree-polynomial torus gives

\[
V=A^T\operatorname{diag}(1,e^{i\alpha},e^{i\beta})B.
\]

Every entry is a three-phasor sum (V_{ij}=\sum_k w_ke^{i\phi_k}), with (w_k=A_{ki}B_{kj}\in\mathbb R). Its exactly attainable magnitude interval is

\[
\boxed{
\max\left(2\max_k|w_k|-\sum_k|w_k|,0\right)
\le |V_{ij}|\le\sum_k|w_k|.
}
\]

For the extreme witness in claim 1480 this gives

\[
|V_{cs}|\le0.59196632,
\]

against the PDG central value (0.97349). Both increasing and decreasing affine orderings keep the middle eigenvector in the middle, so phases cannot repair this witness.

## Why the apparent near-fit fails

The numerical solve used

\[
(a,b,c,\eta)=(1.41649101465,49498.70035261,1,1.00067211881)
\]

and reversed the down eigenvectors. It formally fitted (|V_{us}|), (|V_{ub}|) and (J), giving (V_{cb}=0.05014123234). But for sorted eigenvalues

\[
r=\frac{\lambda_2-\lambda_1}{\lambda_3-\lambda_1},
\]

a negative affine slope reverses the physical order and yields (r_{\rm physical}=1-r).

The solve imposed (r_d=3.49738\times10^{-4}) before reversal. Its physical down location is therefore (0.9996502622), not the observed small hierarchy. The attractive CKM matrix came from spending an inadmissible family permutation.

Repeating the 581-solution (delta=\pi) scan with hierarchy-compatible increasing order gives a much poorer best recorded point:

\[
(|V_{us}|,|V_{cb}|,|V_{ub}|,|J|)
\simeq(0.4969,0.01838,0.03202,1.642\times10^{-5}).
\]

This is a bounded scan, not a global minimum.

## Scope and next gate

The correction strengthens the joining rule: eigenvalue permutations stop being free once the same labels must carry affine masses and CKM rows or columns. A global no-go is still absent because decreasing physical slopes require rooting the sorted location at (1-r), and general-(delta) branches remain.

The next calculation must enumerate all four hierarchy-correct slope-sign branches before applying interval branch-and-bound.

## Verdict

\[
\boxed{\text{claim-1480 witness: exactly excluded},\quad
\text{reversed-order near-fit: inadmissible},\quad
\text{global family: open}.}
\]

## Reproduction

~~~powershell
node verification/verify/verify_spin23_triangle_phasor_vcb_falsifier.mjs
~~~
