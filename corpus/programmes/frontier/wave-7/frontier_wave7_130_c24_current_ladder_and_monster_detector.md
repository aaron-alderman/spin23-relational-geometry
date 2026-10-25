# Frontier Wave 7.130: The \(744\to24\to0\) Current Ladder and a Monster Detector

**Date:** 25 October 2026

**Status:** exact character-level discriminator; experimental readout hierarchy specified

**Evidence:** [current-ladder detector record](../../../../evidence/data/monster-c24-current-ladder-detector-v1.json)

**Certificate:** [current-count/orbifold-split verifier](../../../../verification/verify/verify_monster_c24_current_ladder_detector.mjs)

## Result

The most famous Moonshine coefficient is not the first measurement to make.
Three very different \(c=24\) theories have characters

\[
\begin{array}{c|c|c}
\text{carrier}&\dim V_1&\operatorname{ch}V\\ \hline
V_{E_8}^{\otimes3}&744&J+744=j\\
V_\Lambda&24&J+24\\
V^\natural&0&J .
\end{array}
\]

All three have the same coefficient 196884 at weight two. Consequently,
observing a 196884-fold level without resolving weight one does not distinguish
Monster from the two conventional lattice controls.

The weight-one ladder has a direct mechanism:

\[
744=(24\ {\rm Cartan})+(720\ E_8^3\ {\rm roots})
\longrightarrow24=(24\ {\rm oscillators})+(0\ {\rm Leech\ roots})
\longrightarrow0.
\]

Choosing the rootless Leech lattice removes the 720 root currents. The
inversion orbifold removes the remaining 24 oscillator currents.

## 1. The weight-two split is also measurable

The orbifold certificate separates the Monster weight-two space as

\[
196884=98580_{\rm\ untwisted}+98304_{\rm\ twisted}.
\]

The twisted sector begins before projection at conformal weight
\(24/16=3/2\) with raw degeneracy \(2^{12}=4096\). The projection combines
the two temporal boundary conditions, cancels half-integral powers in the
vacuum character and contributes the 98304 integer-weight states. This split
is a provenance measurement that the total 196884 count lacks.

[Wave 7.147](frontier_wave7_147_moonshine_weight2_sector_join_and_2b_trace.md)
derives the two terms as \(300+98280=98580\) untwisted and
\(4096\times24=98304\) twisted states. Their orbifold-sign difference gives
the independent \(2B\) trace target 276.

## 2. Explicit physical action

For a Leech Gram matrix \(K\), the continuum bulk/edge actions are

\[
S_{\rm bulk}={1\over4\pi}\int K_{IJ}a_I\wedge da_J,
\]

\[
S_{\rm edge}={1\over4\pi}\int
\left(K_{IJ}\partial_t\phi_I\partial_x\phi_J
-V_{IJ}\partial_x\phi_I\partial_x\phi_J\right)dt\,dx.
\]

A lattice vertex \(e^{i\ell\cdot\phi}\) has
\(h_\ell=\ell^TK^{-1}\ell/2\), and inversion sends
\(\phi\mapsto-\phi\). This is an ordinary dynamical field theory; the
Moonshine construction specifies its projection and twisted completion.

## 3. Detector order

1. Establish \(c_-=24\), equivalently
   \(\kappa_{xy}/T=24\pi^2k_B^2/(3h)\).
2. Count weight-one towers. Values 744 and 24 select the \(E_8^3\) and Leech
   controls; any nonzero result rejects \(V^\natural\).
3. Resolve the inversion-twisted onset at \(h=3/2\) and its projected
   integer spectrum.
4. Test the \(98580+98304\) decomposition of weight two.
5. Only then spend precision on a marked \(23AB\) or order-46 defect trace.

This changes the experimental emphasis from “find a huge special number” to
“verify a sequence of disappearing currents and a twisted-sector balance.”
The latter has controls at every stage and identifies the construction rather
than merely its final degeneracy.

## Corpus links

- [Leech-edge orbifold proof](frontier_wave7_129_leech_edge_orbifold_proves_formal_monster_physics.md)
- [Framed-Ising provenance route](frontier_wave7_126_framed_ising_route_to_a_physical_monster.md)
- [Order-46 connected benchmark](frontier_wave7_120_order46_connected_ratio_numerical_benchmark.md)
