# Exact phasor bounds exclude one spectral witness and a rooted branch overpredicts Vcb

**Date:** 20 October 2026

**Gates:** A5 and A6

**Status:** exact fixed-witness bound and local held-out branch falsifier; global triangle family remains open

**Depends on:** [the centered-cubic spectral elimination](1480_the_centered_cubic_eliminates_holonomy_and_shows_the_mass_hierarchies_are_spectrally_feasible.md)

**Evidence:** [machine-readable branch test](../../../evidence/data/spin23-triangle-phasor-vcb-falsifier.json), [executable verifier](../../../verification/verify/verify_spin23_triangle_phasor_vcb_falsifier.mjs), and [PDG 2025 CKM review, Eqs. 12.27--12.28](https://pdg.lbl.gov/2025/reviews/rpp2025-rev-ckm-matrix.pdf)

## Exact phase interval

On the (delta=\pi) spectral surface, let the real orthogonal eigenvector matrices of (K_u) and the unoriented (K_d) be (A) and (B). The maximal degree-polynomial torus gives

\[
V=A^T\operatorname{diag}(1,e^{i\alpha},e^{i\beta})B.
\]

Every entry is therefore a three-phasor sum

\[
V_{ij}=w_1+w_2e^{i\alpha}+w_3e^{i\beta},
\qquad w_k=A_{ki}B_{kj}\in\mathbb R.
\]

Its exactly attainable magnitude interval is

\[
\boxed{
\max\left(2\max_k|w_k|-\sum_k|w_k|,0\right)
\le |V_{ij}|\le
\sum_k|w_k|.
}
\]

This converts each fixed spectral witness into a phase-independent CKM screen.

For the extreme witness in claim 1480, the middle--middle entry satisfies

\[
|V_{cs}|\le0.59196632,
\]

whereas the PDG central value is (0.97349). Both monotone orderings keep the middle eigenvector in the middle, so no diagonal phases or slope reversal can repair that witness.

## A second spectral branch nearly converges

The exact centered-cubic surface has other branches. Rooting the two mass ratios at (delta=\pi) and scanning 581 solutions found a large-(b) branch with substantially better mixing. After continuous refinement, its three remaining variables are one surface coordinate and two diagonal phases.

Fit the three observables

\[
|V_{us}|=0.22501,
\qquad |V_{ub}|=0.003732,
\qquad |J|=3.115\times10^{-5}
\]

while holding (|V_{cb}|) out. The rooted solution is

\[
(a,b,c,\eta)=(1.41649101465,49498.70035261,1,1.00067211881),
\]

with down eigenvalue order reversed and

\[
(\alpha,\beta)=(1.24796492943,1.26664616585).
\]

The three fitted quantities agree at approximately (10^{-11}) relative tolerance. The held-out result is

\[
\boxed{|V_{cb}|_{\rm triangle}=0.05014123234.}
\]

The 2025 PDG global fit gives

\[
|V_{cb}|=0.04183^{+0.00079}_{-0.00069}.
\]

Using the larger quoted uncertainty, the branch prediction is high by (10.52) standard deviations, or (19.87\%).

## Scope

This is stronger than the earlier optimizer residual because it is a held-out consequence after the two mass ratios and three mixing invariants are fixed. It is still not a global no-go:

- the spectral-elimination equation has multiple branches;
- the displayed solve uses (delta=\pi);
- other choices of three fitted invariants parameterize the same image differently;
- a certified bound over every allowed branch has not been proved.

The next decisive calculation is interval branch-and-bound on the centered-cubic surface, using the exact phasor intervals to prune boxes and either enclose a CKM solution or certify its absence.

## Verdict

\[
\boxed{\text{claim-1480 witness: exactly excluded},\quad
\text{large-}b\text{ rooted branch: held-out }V_{cb}\text{ excluded},\quad
\text{global family: open}.}
\]

## Reproduction

~~~powershell
node verification/verify/verify_spin23_triangle_phasor_vcb_falsifier.mjs
~~~
