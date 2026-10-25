# Frontier Wave 7.134: A Normalized-Character Commissioning Curve

**Date:** 25 October 2026

**Status:** exact infrared discriminator; finite-size calibration open

**Evidence:** [normalized-character record](../../../../evidence/data/monster-c24-normalized-character-discriminator-v1.json)

**Certificate:** [character-difference verifier](../../../../verification/verify/verify_monster_c24_normalized_character_discriminator.mjs)

## Result

The first quantitative signal for a proposed Monster edge is much larger than
the order-46 connected trace. For \(\tau=iy\), set

\[
q=e^{-2\pi y},\qquad \widehat Z(y)=q\,\operatorname{ch}(iy).
\]

Because

\[
\operatorname{ch}V^\natural=J,\qquad
\operatorname{ch}V_\Lambda=J+24,\qquad
\operatorname{ch}V_{E_8^3}=J+744,
\]

the three differences are exact at every \(y\):

\[
\begin{aligned}
\widehat Z_\Lambda-\widehat Z_\natural&=24e^{-2\pi y},\\
\widehat Z_{E_8^3}-\widehat Z_\natural&=744e^{-2\pi y},\\
\widehat Z_{E_8^3}-\widehat Z_\Lambda&=720e^{-2\pi y}.
\end{aligned}
\]

No higher-level modelling enters these differences because all higher
character coefficients agree.

## Checkpoints

| \(y\) | \(q\) | Leech–Monster | \(E_8^3\)–Monster |
|---:|---:|---:|---:|
| 0.8 | 0.00656142 | 0.157474 | 4.88170 |
| 1.0 | 0.00186744 | 0.0448186 | 1.38938 |
| 1.2 | 0.000531492 | 0.0127558 | 0.395430 |
| 1.5 | 0.0000806995 | 0.00193679 | 0.0600404 |
| 2.0 | 0.00000348734 | 0.0000836962 | 0.00259458 |

The self-dual point already gives a 4.48-percent-of-vacuum Leech–Monster
separation in the normalized character. This is over an order of magnitude
larger than the \(46AB\) connected-ratio magnitude, and it tests the ambient
carrier before a delicate defect insertion is attempted.

## Finite-size spectroscopy

On a chiral edge of circumference \(L\),

\[
E_h-E_0={2\pi v\over L}h,\qquad y={v\beta\over L}.
\]

The relevant levels occur at

\[
\Delta E_{h=1}={2\pi v\over L},\quad
\Delta E_{h=3/2}={3\pi v\over L},\quad
\Delta E_{h=2}={4\pi v\over L}.
\]

Energy resolution strictly better than \(\pi v/L\) separates the current,
unprojected twist and weight-two onsets. Direct degeneracy counting avoids
absolute partition-function calibration; thermal trace estimation provides
the all-\(y\) curve.

## Decision order

1. Compare \(E_8^3\) and Leech controls to verify removal of 720 root currents.
2. Compare Leech and the candidate \(m\)-condensed boundary to verify removal
   of 24 oscillator currents.
3. Resolve the twisted/untwisted weight-two split.
4. Only after these pass, measure the order-46 and \(23AB\) defect records.

Finite-size corrections and irrelevant operators must be extrapolated rather
than absorbed into a refit of 24 or 744. The integers and exponential
\(y\)-dependence are frozen predictions.

## Corpus links

- [Current ladder](frontier_wave7_130_c24_current_ladder_and_monster_detector.md)
- [Condensation fork](frontier_wave7_132_leech_monster_toric_code_condensation_fork.md)
- [Order-46 benchmark](frontier_wave7_120_order46_connected_ratio_numerical_benchmark.md)
