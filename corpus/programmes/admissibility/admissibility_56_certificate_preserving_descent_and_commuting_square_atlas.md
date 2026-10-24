# Certificate-preserving descent and the commuting-square atlas

**Packet:** AZ-056  
**Date:** 24 October 2026  
**Status:** exact linear theorem and finite witnesses complete; cross-carrier physical functor remains gated  
**Parents:** [AZ-052 pole trajectories](admissibility_52_spectral_flow_pole_trajectories.md), [AZ-053 boundary compiler](admissibility_53_boundary_lift_to_casimir_thermoelectric_compiler.md), [AZ-054 detector ceiling](admissibility_54_transverse_joint_detector_symmetry_ceiling.md)  
**Evidence:** [certificate-preserving descent record](../../../evidence/data/admissibility-certificate-preserving-descent-v1.json)  
**Reproduction:** `node scripts/run-certificate-preserving-descent.mjs`  
**Verification:** [certificate](../../../verification/admissibility/verify_certificate_preserving_descent.mjs)

## Result

The common structure exposed by the five supplied research signposts is not a shared physical mechanism. It is a shared research operation: move from a richer source object to a reduced representation, identify a certificate that survives, and state what the reduction cannot see. The corpus can now express this operation exactly.

For a surjective linear map \(P:X\to Y\) and source dynamics \(F:X\to X\), a unique shadow dynamics \(f:Y\to Y\) satisfying

\[
PF=fP
\]

exists exactly when \(\ker P\) is invariant under \(F\). Thus admissibility is a property of arrows as well as objects. A state may be admissible at both ends while the proposed reduction is dynamically inadmissible because hidden directions leak back into visible ones.

AZ-052 supplies the horizontal axis of the resulting atlas: poles, phase, localization and response move with a control parameter. AZ-056 supplies the vertical axis: descriptions descend from resolved carriers to quotients, effective observables, protected sectors or certificates. A point in the atlas is meaningful only with both coordinates and their error budgets.

## 1. Exact, approximate and impossible descent

Choose a right inverse \(J:Y\to X\) with \(PJ=I_Y\), and define \(f=PFJ\). The failure of the square to commute is

\[
\Delta_P=PF-fP=PF(I_X-JP).
\]

The factor \(I-JP\) extracts the hidden component; \(PF\) asks whether its next step becomes visible. This yields three operational cases:

1. **Exact:** \(\Delta_P=0\). Every source state in a fibre has the same next shadow, so the quotient has autonomous dynamics.
2. **Approximate:** \(\|\Delta_P\|\leq\epsilon\). The quotient is predictive only with a leakage budget and a declared state norm.
3. **Impossible:** there are \(x\) and \(x+k\), \(k\in\ker P\), with equal initial shadows but unequal next shadows. No deterministic \(f\) on \(Y\) can repair this without adding memory or hidden state.

The executable witness uses \(P:\mathbb R^3\to\mathbb R^2\). Its exact dynamics has zero defect. A hidden-to-visible coupling of 0.02 gives defect norm 0.02. A coupling of 0.4 produces two states with the same initial shadow \((0,0)\) and next shadows \((0,0)\) and \((0.4,0)\), which is a finite no-go rather than a poor fit.

## 2. Descent composes, and so do its errors

For

\[
X\xrightarrow{P_1}Y\xrightarrow{P_2}Z,
\]

with \(\Delta_1=P_1F-f_1P_1\) and \(\Delta_2=P_2f_1-f_2P_2\), direct expansion gives

\[
\Delta_{21}=(P_2P_1)F-f_2(P_2P_1)=P_2\Delta_1+\Delta_2P_1.
\]

Consequently

\[
\|\Delta_{21}\|\leq \|P_2\|\,\|\Delta_1\|+\|\Delta_2\|\,\|P_1\|.
\]

The generated three-scale witness closes this identity exactly. This is the algebraic core of OT-019, but it does not close that topic: OT-019 requires source-native physical pushforwards and held-out substitutions, not chosen matrices.

### When the square fails, dynamics becomes memory

Write the source dynamics in visible/hidden blocks,

\[
F=\begin{bmatrix}A&B\\C&D\end{bmatrix},\qquad
y_{n+1}=Ay_n+Bh_n,\qquad h_{n+1}=Cy_n+Dh_n.
\]

Eliminating \(h\) exactly gives

\[
y_{n+1}=Ay_n+BD^nh_0+\sum_{j=0}^{n-1}BD^{n-1-j}Cy_j.
\]

The first extra term is initial slip; the sum is a memory kernel. Kernel invariance is precisely \(B=0\), the condition that removes both terms and permits an autonomous Markovian shadow. The executable two-visible/one-hidden witness reconstructs eight steps of the full visible trajectory from the memory equation with zero residual; its kernel coefficients begin 0.06, 0.03, 0.015 and decay geometrically.

This is the clean connection to bound dynamics. Coarse measurements may call a state “static” while eliminated phase, boundary or internal modes return as retardation, hysteresis, colored noise or resonance width. A failed memoryless descent is therefore not automatically failed physics; it is a demand to retain state or memory. What is inadmissible is silently dropping both.

This finite identity is the discrete linear edge of the Mori--Zwanzig picture: projection of microscopic dynamics generally produces deterministic drift, memory and an unresolved-force term. The corpus use is deliberately narrower than that full statistical formalism, but the literature confirms that non-Markovian terms are the normal consequence of under-resolution rather than an exotic exception.

## 3. Certificates and detector kernels

The AZ-053 theorem is the nonlinear companion: a certificate \(D:X\to Z\) factors through a coarse map \(P\) exactly when it is constant on every fibre of \(P\). For stacked linear detectors,

\[
\ker\begin{bmatrix}D_1\\D_2\end{bmatrix}=\ker D_1\cap\ker D_2.
\]

Adding detectors therefore intersects blind subspaces; it does not guarantee injectivity. If every detector is invariant under the same apparatus symmetry, that orbit remains invisible however many such detectors are stacked.

The corpus now contains a concrete resolution ladder:

| Carrier and detector | Resolved classes | Meaning |
|---|---:|---|
| AZ-053 bond inventory | 1 of 35 | placement is erased |
| AZ-053 symmetric Seebeck response | 19 of 35 | exactly reversal-blind |
| AZ-053 one-sided boundary functional | 35 of 35 | orientation lifts that quotient in this model |
| AZ-054 longitudinal + Nernst + symmetric boundary family | 21 of 35 | exactly saturates the apparatus's top--bottom reflection quotient |

The apparent fall from 35 back to 21 is not contradictory: AZ-054 changes the carrier and apparatus symmetry. Detector power is relative to a typed experimental map, not an intrinsic scalar ranking.

A two-state density-matrix witness makes the nonlinear point minimally. \(I/2\) and \((I+0.6X)/2\) have the same linear \(Z\) expectation, while their purities are 0.50 and 0.68. Purity splits this particular linear fibre; it does not establish tomography or global injectivity. That distinction is exactly the remaining OT-034 gate.

## 4. The five external signposts, typed

| Signpost | Source → map → shadow | Preserved certificate | Kernel / firewall |
|---|---|---|---|
| Fourth-post-Minkowskian gravitational Compton scattering | worldline-QFT amplitude → N-matrix → wave-scattering phase | agreement with black-hole perturbation theory at \(O(G^4)\) | order-restricted, nonspinning result; not an all-orders equivalence or Spin(2,3) bridge |
| K215 in Peano arithmetic | fixed machine plus coded proof system → arithmetization and checked proof → one halting equivalence | machine-checked theorem with declared axioms, hashes and receipt | proves neither that K215 halts nor that ZFC is inconsistent |
| QFT and four-manifolds | supersymmetric QFT → topological twist/protected sector → moduli-space invariants | protected correlators and intersection-theoretic counterparts | deliberately does not retain generic metric-dependent dynamics |
| Strong-to-weak SSB on a processor | dephased mixed states → channel-aware two-setting reconstruction → nonlinear correlators | finite-size crossings/scaling collapse in fidelity and Rényi-2 observables | linear records erase the order; finite-size evidence is not a thermodynamic-limit proof |
| Riemann/modular-forms post | introductory pointer → unspecified → unspecified | none supplied | signpost only; no theorem or artifact is imported |

The useful family resemblance is methodological: each case lives or dies by its map, certificate and trust boundary. It would be an error to infer that proof compilation, a topological twist, an N-matrix, mixed-state reconstruction and coarse-graining are instances of one physical interaction.

## 5. Cross-check against spectral dynamics

AZ-052 already contains a decisive collision. At control zero, the trivial and topological SSH rails each have two exterior bound states, yet their phase windings differ by about -1.931 and their scalar Casimir proxies differ by about -0.02004. Bound count therefore does not factor the richer spectral record. It is a valid certificate for one question and an insufficient quotient for two others.

This clarifies how dynamics fits the earlier “bound/static” discussion. Binding is a spectral relation, not absence of motion. Internal phases, probability currents, resonances, delay, radiation and parameter flow remain dynamical. Calling a bound configuration static is only admissible after declaring which coarse detector has forgotten those motions.

## 6. A corpus no-go becomes a general test

Suppose source generators \(A,B\) commute and a surjective \(P\) exactly intertwines them with target generators \(R,H\): \(PA=RP\), \(PB=HP\). Then

\[
[R,H]P=P[A,B]=0.
\]

Surjectivity forces \([R,H]=0\). The executable two-dimensional target uses a quarter-turn \(R\) and reflection \(H\); their commutator has rank two and Frobenius norm \(2\sqrt2\). No commuting microscopic pair can descend exactly to that target pair. This is the small model of the corpus's stronger rank-four obstruction: a visually suggestive target action cannot be obtained by quotienting an incompatible source action.

### Intertwiner and quotient inventory

The machine record now carries five representative corpus cases rather than treating “intertwiner” as one undifferentiated success label:

| Claim | Map | Disposition | Residual |
|---|---|---|---|
| [811](../../claims/0800-0899/811_the_completed_furey_matter_tro_has_no_proper_four_channel_ternary_quotient_so_the_bridge_must_use_higgs_dressed_pairing.md) | completed Furey matter TRO → proper four-channel ternary quotient | no-go | change the map type to paired/Gram data |
| [838](../../claims/0800-0899/838_commuting_microscopic_color_and_handle_exchange_cannot_descend_to_R_and_H_and_the_central_repair_loses_the_singlet_lines.md) | commuting microscopic generators → noncommuting \(R,H\) | no-go | dress the response or accept loss of fixed lines |
| [843](../../claims/0800-0899/843_a_color_equivariant_split_quotient_can_lift_the_quadratic_selector_but_is_highly_nonunique_and_not_yet_gauge_typed.md) | split \(\mathbb R^8\to\mathbb R^4\) quotient | exact quadratic descent, nonunique | select among fourteen intertwiner and eight section dimensions; add gauge typing |
| [528](../../claims/0500-0599/528_the_field_labelled_two_torsion_map_stops_at_two_intertwiners_and_needs_a_theta_extension.md) | labelled support → two-torsion shadow | two survivors, quadratic obstruction | add theta/metaplectic data or stop |
| [999](../../claims/0900-0999/999_the_central_sign_is_invisible_on_even_furey_bilinears_and_reduces_coherent_c12_to_observable_c6.md) | coherent \(C_{12}\) → even-observable \(C_6\) | exact observable descent | establish, rather than assume, microscopic gauge meaning |

The pattern is diagnostic. Failure may mean no map of the proposed type, success may still be nonunique, and a perfect observable quotient may intentionally erase coherent carrier information. These are different frontier states and must not be merged into “the shapes match.”

The generator also performs a corpus-wide lexical navigation census. Across 1,893 Markdown files, 1,408 mention at least one of the audited terms: 469 mention an intertwiner, 16 a commuting square, 578 a quotient, 270 descent, 600 a kernel, 47 coarse-graining, 134 a detector and 569 a no-go. These overlapping counts establish breadth, not truth. Semantic ownership remains with the AZ, Wave and residual gate audits plus the open-topic register; the five cases above are typed exemplars selected from that governed surface.

## 7. What this says—and does not say—about Spin(2,3)

The packet does not establish Spin(2,3) symmetry, its breaking, or an electron-binding mechanism. It identifies the minimum form of a claim that could be tested. A Spin(2,3) proposal must supply:

1. a typed source carrier and representation;
2. a source-derived action or dynamics \(F\);
3. a surjective or otherwise explicitly scoped observation map \(P\), with units, orientation and loss channels;
4. the target operation \(f\) and a zero or bounded commuting-square defect;
5. at least one certificate not already forced by a freely chosen basis; and
6. a detector record that distinguishes the proposal from its leading quotient-equivalent alternatives.

Representation resemblance, dimension matching, a quarter-turn, or the word “spin” supplies none of these arrows. The correct implication is narrower and more useful: the corpus now knows what evidence would turn a symmetry-shaped resemblance into transportable physical structure.

## 8. Filled and unfilled atlas

**Filled:** the exact kernel-invariance theorem; a section-independent criterion for autonomous quotient dynamics; exact/approximate/impossible witnesses; the three-scale defect identity and norm bound; the detector-kernel intersection law; the commutator no-go; the AZ-052/053/054 cross-checks; and typed assessments of all five signposts.

**Unfilled but sharply bounded:**

- **OT-019:** replace chosen matrices by one source-native three-scale carrier and compare direct with composed physical pushforwards on held-out inputs.
- **OT-027:** derive the operator, amplitude, irreversible loss and detector maps from one action.
- **OT-034:** prove finite nonlinear detector injectivity on a frozen model family or characterize its residual quotient.
- **OT-038:** build one provenance-bearing A2 commuting square preserving labels, units and orientation while accounting for losses.
- **OT-045:** define a genuine operator domain and verify Hecke or modular identities; the social modular-forms pointer does not advance this gate.

These are irreducible gates in the present corpus. More untyped examples do not move them.

## 9. Experimental and theoretical use

For every proposed bridge, record a six-column ledger: source, map, target, certificate, kernel/loss, detector. Then run two adversarial tests:

1. choose two source states in one fibre and ask whether their evolved shadows split;
2. choose two mechanisms with the same current detector record and add only a physically available detector that is not invariant under the same symmetry.

A zero defect supports autonomous effective dynamics. A small calibrated defect supports a controlled approximation. A fibre split forces memory, latent variables or rejection of the quotient. A residual apparatus orbit is a result, not a failure: it identifies the exact information the next experiment must break.

## Primary sources

- Brunello, Meo and Smith, [“Gravitational Compton scattering at the fourth post-Minkowskian order”](https://journals.aps.org/prd/abstract/10.1103/nbxl-68tz), *Physical Review D* 114, 085022 (2026).
- Glazer, [K215 halts iff ZFC is inconsistent (Metamath Zero, PA)](https://github.com/elliotglazer/k215-pa), repository and verification receipt (2026).
- Garner, Kool, Manschot and Tanaka, [“Quantum field theory and four-manifolds: Perspectives from physics and geometry”](https://arxiv.org/abs/2610.30288), arXiv:2610.30288 (2026).
- Wei et al., [“Strong-to-Weak Spontaneous Symmetry Breaking Transitions on a Quantum Processor”](https://arxiv.org/abs/2610.26229), arXiv:2610.26229 (2026).
- Chorin, Hald and Kupferman, [“Optimal prediction and the Mori--Zwanzig representation of irreversible processes”](https://www.pnas.org/doi/10.1073/pnas.97.7.2968), *PNAS* 97, 2968--2973 (2000).
- The supplied [Riemann-hypothesis/modular-forms post](https://x.com/cosminnegruseri/status/2113692628923584934) is retained only as an unresolved signpost.

## Stop rule

Do not infer a universal mechanism from the recurrence of descent diagrams. Advance a physical bridge only when its source, map, target, certificate, kernel/loss and detector are typed and its commuting defect is zero or bounded before the held-out comparison. Otherwise preserve the analogy as navigation and the failed square as a no-go.
