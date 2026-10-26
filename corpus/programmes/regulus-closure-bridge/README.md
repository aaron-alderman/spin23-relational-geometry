# Regulus closure bridge

**Opened:** 26 October 2026

**Status:** exact finite incidence pass; physical interpretation open

## Result

A regulus is not merely a visual analogy for the corpus's two-face grammar.
It is an exact local closure object connecting four structures already present
in the corpus:

\[
 \text{line incidence}
 \longrightarrow
 \text{Klein quadric }Spin(3,3)
 \xrightarrow{\text{symplectic slice}}
 \text{Lagrangian quadric }Spin(2,3)
 \longrightarrow
 \text{finite }E_6\text{ incidence}.
\]

The executable calculation over \(\mathbb F_3\) finds:

- 40 Lagrangian points and 40 four-point pencil lines in \(Q(4,3)\);
- 45 hyperbolic 16-point sections;
- two opposite four-line reguli in every hyperbolic section;
- exact three-line closure onto the opposite four-line regulus;
- a 45-vertex section graph with parameters
  \(\operatorname{SRG}(45,12,3,3)\);
- exactly 27 maximal five-cliques, reconstructing the incidence counts of the
  27 lines and 45 tritangent planes on a cubic surface;
- 36 elliptic sections whose stabilizers split the 27 lines as \(12+15\),
  with each 12 forming \(K_{6,6}\) minus a perfect matching: the 36 classical
  double-sixes;
- the same 36 elliptic sections as ten-plane symplectic spreads, hence as 36
  labelled complete stabilizer-MUB frames for the two-qutrit carrier;
- an exact measurement-frame overlap algebra: 270 pairs share four bases and
  360 pairs share one, matching the syzygetic/azygetic double-six split;
- an explicit construction of all 360 rank-one two-qutrit stabilizer
  projectors and all 36 complete MUB frames;
- a three-dimensional invariant frame-noise algebra with spectral sectors
  \(1+15+20\), plus an exact proof that symmetric linear noise mixes rather
  than selects a frame;
- a weighted Clifford compiler in which calibrated control costs select
  cheapest frames in hardware-dependent chambers without making any frame
  intrinsically preferred;
- maximal-clique recovery of the 120 azygetic closures, all 216 skew
  cubic-line pairs and all 45 tritangents from measurement-frame overlaps;
- a no-section theorem: the finite carrier is a quotient of the
  integral/real symplectic carrier, not a canonically embedded finite copy;
- 120 Steiner trihedral pairs and 40 Steiner triads, equivariantly identified
  with the 40 Lagrangian points;
- an anti-symplectic outer involution completing the finite action to the full
  order-51,840 \(W(E_6)\) symmetry;
- a 432-point double-six/line flag carrier exactly equal to
  \(W(E_6)/S_5\), with commutant dimension 26;
- transitive \(PSp_4(3)\) actions on the reconstructed 27 lines, 36
  double-sixes and 45 tritangent planes.

This supplies a new finite-geometric route from the corpus's 40 qutrit
polarizations to its even-\(E_6\) symmetry. It does not supply dynamics, a
physical carrier or an \(E_8\) root identification.

## Executable artifacts

- [Analysis](../../../scripts/analyze-regulus-spin23-bridge.mjs)
- [Machine evidence](../../../evidence/data/regulus-spin23-bridge-v1.json)
- [Independent verifier](../../../verification/verify/verify_regulus_spin23_bridge.mjs)
- [Two-qutrit operator and selector analysis](../../../scripts/analyze-regulus-mub-selector-dynamics.mjs)
- [Operator/selector machine evidence](../../../evidence/data/regulus-mub-selector-dynamics-v1.json)
- [Operator/selector verifier](../../../verification/verify/verify_regulus_mub_selector_dynamics.mjs)
- [Frame-channel fitter](../../../scripts/fit-regulus-frame-channel.mjs)

Run:

```powershell
node scripts/analyze-regulus-spin23-bridge.mjs --write
node verification/verify/verify_regulus_spin23_bridge.mjs
node scripts/analyze-regulus-mub-selector-dynamics.mjs --write
node verification/verify/verify_regulus_mub_selector_dynamics.mjs
```

## Detailed finding

See [Regulus closure, the symplectic slice and the finite E₆ incidence
layer](01_regulus_closure_symplectic_slice_and_e6_incidence.md).

Continue through:

- [Full E₆ completion, the 432-point Hecke carrier and the 240-object boundary](02_full_e6_completion_hecke_carrier_and_240_boundary.md)
- [Real positive-domain, dynamics and detector boundary](03_real_positive_domain_dynamics_and_detector_boundary.md)
- [Regulus programme exhaustion ledger](04_regulus_exhaustion_ledger.md)
- [Double-sixes, symplectic spreads and complete two-qutrit measurements](05_double_sixes_symplectic_spreads_and_two_qutrit_mubs.md)
- [Two-qutrit operator, noise and selector completion](06_two_qutrit_operator_noise_and_selector_completion.md)
- [Integral, real and experimental resolution](07_integral_real_and_experimental_resolution.md)

## Authority boundary

The finite incidence structure is exact. Its identification with the abstract
Schläfli \(27\)-line/\(36\)-double-six/\(45\)-tritangent configuration is an incidence and group-
action result, not the construction of a particular cubic surface in physical
space. No incidence count establishes a field equation, interaction,
spacetime ontology or exceptional unification.

