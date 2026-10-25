# Frontier Wave 7.114: A Physical Carrier for TY(Z23), and the Monster Provenance Gap

**Date:** 25 October 2026

**Status:** current-research carrier map; executable promotion logic; laboratory protocol specified, Monster provenance still open

**Evidence:** [carrier and provenance record](../../../../evidence/data/monster-ty23-carrier-provenance-v1.json)

**Certificate:** [promotion-gate verifier](../../../../verification/verify/verify_monster_ty23_carrier_provenance.mjs)

## Result

Wave 7.113 fixes the Monster \(23AB\) defect's fusion and recoupling target.
Current research also removes the objection that such a category has no
ordinary many-body carrier:

- Wen, Inamura and Schafer-Nameki construct a QCA-refined lattice realization
  of every weakly integral fusion-category symmetry on a tensor-product
  Hilbert space, and give general Tambara--Yamagami categories explicitly as
  an application.
- Vernier, Miao and Yamazaki construct \(\mathbb Z_N\) Tambara--Yamagami fusion
  relations in the root-of-unity XXZ spin chain using matrix-product duality
  operators.
- Ren, Tantivasadakarn and Williamson give adaptive finite-depth preparation
  and string-operator procedures for solvable string-net phases; their worked
  Tambara--Yamagami example is \(\mathbb Z_3\), not \(\mathbb Z_{23}\).

Thus a physical \(\operatorname{TY}(\mathbb Z_{23})\) carrier is no longer a
conceptual impossibility. But realizing the same fusion category is not yet
realizing the Monster. The category is a subtheory shared by many systems.
The experiment must climb a provenance ladder.

## 1. Five witness levels

| Level | Required observation | What it establishes | What it does not |
|---|---|---|---|
| W0 | \(D^2=(\sum_{k=0}^{22}Z^k)T\), \(ZD=DZ=D\) | \(\mathbb Z_{23}\) TY-like fusion rules | bicharacter, sign, Monster |
| W1 | flat \(1/\sqrt{23}\) recoupling magnitudes and Fourier plaquette phase \(e^{-2\pi i/23}\) | the sourced \(\chi(a,b)=e^{2\pi iab/23}\) | FS sign, Monster |
| W2 | closed \(\nu_2(D)=\epsilon\) measurement | full spherical \(\operatorname{TY}(\mathbb Z_{23},\chi,\epsilon)\) | Monster provenance |
| W3 | the same defects embedded in a sector with \(c=24\), no weight-one currents and the \(23AB\) trace/commutant characters | Monster-CFT candidate subtheory | complete Monster action or uniqueness |
| W4 | compatible action/generators sufficient to identify \(V^\natural\), with defect/OPE sewing coherence | Monster provenance | selection by fundamental nature |

The verifier enforces the one-way logic: passing W2 never automatically passes
W3. This is the exact safeguard against saying “Monster observed” after seeing
a Fourier matrix that also occurs in a purpose-built simulator.

## 2. Shortest experimental protocol

The most economical first apparatus is the root-of-unity XXZ route because it
uses spin-\(1/2\) sites rather than a 24-dimensional local string-net label.
Set the anisotropy at a 23rd-root condition and implement or compile the
matrix-product duality operator \(D\). Then:

1. prepare translation-compatible chain lengths;
2. verify \(Z^{23}=1\) and the two operator fusion identities at W0;
3. create four duality endpoints and resolve their middle channel into the 23
   \(Z^a\) sectors;
4. interfere the two association orders;
5. reconstruct only rephasing-invariant plaquette ratios first;
6. test all adjacent ratios against \(e^{-2\pi i/23}\), then test distant
   plaquettes against the bilinear exponent;
7. close the defect network to measure \(\nu_2(D)\);
8. reject any Monster language unless an independent W3 witness is present.

The W0 relations are already sourced for the lattice model. Steps 3--7 are
the proposed extension needed to show that its associator is the specific
Monster one rather than merely a model with the same fusion ring.

## 3. What “physical realization” now means

There are three distinct, defensible claims:

1. **Theoretical physics realization -- established.** \(V^\natural\) is a
   consistent chiral CFT; heterotic string compactifications realize its BPS
   algebra; its \(23AB\) self-orbifold realizes a quantitative noninvertible
   defect category.
2. **Engineered realization of the Monster defect subtheory -- feasible, not
   completed.** General QCA constructions provide a tensor-product carrier,
   and XXZ supplies a particularly lean fusion-ring carrier. W1 and W2 remain
   to be measured for \(N=23\).
3. **Natural or complete Monster realization -- open.** Matching a shared TY
   category does not identify the ambient \(c=24\) VOA or show that nature
   selects it.

The proof strategy should therefore say: Monster is already physics at the
level of mathematically consistent QFT and string theory; the frontier is an
engineered, provenance-preserving realization. That statement is stronger
and more accurate than either “it is only mathematics” or “a \(\mathbb Z_{23}\)
Fourier experiment proves the Monster.”

## 4. Decision rule

For any claimed device, record the tuple

\[
(W0,W1,W2,W3,W4;\ \text{marked generator},\ \text{error bars}).
\]

The permitted label is the highest consecutively passed level. A W1 device
with excellent Fourier fidelity but no closed-sign measurement remains W1.
A W2 device with no \(c=24\)/character evidence is a verified TY simulator,
not a Monster simulator. A W3 claim also requires the TY measurements to be
made in the same carrier sector; combining unrelated devices does not preserve
provenance.

## Primary sources

- Wen, Inamura and Schafer-Nameki, [*Non-Invertible Symmetries on Tensor-Product Hilbert Spaces and Quantum Cellular Automata*](https://arxiv.org/abs/2605.15194).
- Vernier, Miao and Yamazaki, [*Lattice non-invertible symmetry from non-commuting transfer matrices*](https://arxiv.org/abs/2606.25660).
- Ren, Tantivasadakarn and Williamson, [*Efficient Preparation of Solvable Anyons with Adaptive Quantum Circuits*](https://arxiv.org/abs/2411.04985).
- Bartsch, Gai and Schafer-Nameki, [*Beyond Wigner: Non-Invertible Symmetries Preserve Probabilities*](https://arxiv.org/abs/2602.07110).
- Volpato, [*Monstrous parafermionic defects and other non-invertible symmetries in chiral CFTs*](https://arxiv.org/abs/2609.03043).

## Corpus links

- [Monster Z23 TY recoupling](frontier_wave7_113_monster_z23_tambara_yamagami_recoupling.md)
- [Monster physical-realization ladder](frontier_wave7_110_monster_physics_realization_ladder.md)
- [Moonshine programme](../../moonshine-program-lattice/README.md)
