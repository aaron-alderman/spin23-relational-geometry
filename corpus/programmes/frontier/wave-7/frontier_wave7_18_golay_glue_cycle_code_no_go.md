# Frontier Wave 7.18: The Canonical 24-Coordinate Cycle Code Is Not Golay Glue

**Date:** 24 October 2026  
**Status:** exact binary-code construction and direct Golay-glue no-go

## The canonical Golay test

The extended binary Golay code is a doubly-even self-dual \([24,12,8]\) code. The quotient-scar graph independently has a 24-edge backbone and a 12-dimensional binary cycle space, so the dimensions define a canonical comparison.

Write the full edge set as \(E=S\sqcup B\), where \(S\) contains the three `shares_action_not_carrier` edges and \(B\) is the 24-edge backbone. Project the full binary cycle space onto the backbone coordinates:

\[
\pi_B:Z_1(G;\mathbb F_2)\longrightarrow\mathbb F_2^{24}.
\]

The special three-edge subgraph is a forest. A full cycle whose backbone coordinates vanish must therefore vanish, so \(\pi_B\) is injective. Its image is a canonically derived code

\[
\boxed{
\mathcal C_{\rm graph}=\pi_BZ_1(G;\mathbb F_2)
\subset\mathbb F_2^{24},
\qquad \dim\mathcal C_{\rm graph}=12.
}
\]

Thus the graph genuinely derives a binary \([24,12]\) code without choosing a cycle basis or a bijection to an external coordinate set.

## Exact enumerator

Enumeration of all \(4096\) words gives

\[
\begin{aligned}
W_{\mathcal C}(y)={}&1+2y^2+16y^3+26y^4+49y^5+139y^6+273y^7\\
&+404y^8+531y^9+615y^{10}+615y^{11}+526y^{12}\\
&+383y^{13}+257y^{14}+151y^{15}+67y^{16}+29y^{17}\\
&+11y^{18}+y^{19}.
\end{aligned}
\]

Therefore

\[
\boxed{d_{\min}(\mathcal C_{\rm graph})=2.}
\]

The two weight-two backbone words lift to full four-cycles:

\[
\{\mathrm{QR\!-!010},\mathrm{QR\!-!011}\}
\cup
\{\mathrm{QR\!-!004},\mathrm{QR\!-!013}\},
\]

and

\[
\{\mathrm{QR\!-!007},\mathrm{QR\!-!012}\}
\cup
\{\mathrm{QR\!-!002},\mathrm{QR\!-!013}\}.
\]

These are short semantic return paths through the triality-comparison star.

## Golay comparison

The extended Golay weight enumerator is

\[
W_{G_{24}}(y)=1+759y^8+2576y^{12}+759y^{16}+y^{24}.
\]

It is self-dual, doubly even and has minimum distance eight. The graph code has odd-weight words, is not self-orthogonal and has minimum distance two. These properties and the weight enumerator are invariant under coordinate permutations. Hence no relabelling of the 24 relations can produce \(G_{24}\):

\[
\boxed{
\mathcal C_{\rm graph}=[24,12,2]\neq[24,12,8]=G_{24}.
}
\]

## Consequence for glue

In binary Construction A, self-duality supplies unimodularity and double evenness supplies the required evenness. The graph code has neither property, so direct Construction-A or ordinary Golay glue does not produce the Leech lattice.

This is independent of the wave-7.17 determinant obstruction. The incidence-derived lattice fails unimodularity with a nonsquare determinant, while the cycle-derived code fails Golay distance and orthogonality. Metric and code routes therefore close separately.

The calculation also explains the failure: ordinary graph closure preserves short triality-mediated cycles, while Golay admissibility must remove every nonzero word of weights below eight and force all weights to be divisible by four.

## Reopen gates

The Golay route can reopen only if a different, source-derived code \(\mathcal G\subset\mathbb F_2^{24}\) satisfies:

1. dimension 12 and self-duality;
2. all weights divisible by four;
3. minimum distance eight;
4. a coordinate action on the 24 relations selected by a corpus operation rather than an arbitrary bijection;
5. compatibility with the three Jordan/frame coordinates and a cubic composition law.

The existing Rule-60/Golay seam supplies a canonical one-dimensional deck line and affine orientation bit. It does not yet supply the missing 12-dimensional Golay action on this relation carrier.

## Verdict

The graph lands exactly on the Golay headline dimensions but fails its defining invariants. Direct Golay glue is ruled out for the canonical projected cycle code. A successful Leech bridge now requires a new nonlocal code or pairing imported through an explicit intertwiner from the corpus's genuine Golay arithmetic; it cannot arise from ordinary graph cycles by relabelling.

