# Semilinearity Does Not Repair an All-Edge Quarter-Turn, but a Minimal Same-Face Twist–Antitwist Pair Preserves the Six-Cycle

**Date:** 18 October 2026  
**Branches:** semilinear interface, sparse TKK insertions, six-cycle holonomy, defect pairing, minimal seam architecture  
**Claim status:** exact finite classification of six-edge schedules  
**Certificate:** [classify_semilinear_and_sparse_quarter_turn_insertions_on_the_six_cycle.mjs](../../../verification/classify/classify_semilinear_and_sparse_quarter_turn_insertions_on_the_six_cycle.mjs)

## Executive result

Document 1042 showed that one controlled quarter-turn on every real sewing edge destroys central six-cycle holonomy. Two possible repairs were left open:

1. replace real sewing by the realified Furey antiunitary;
2. insert the quarter-turn only at selected seams.

The complete six-edge classification gives:

- semilinearity alone does **not** repair the all-edge construction;
- one isolated quarter-turn is never compatible with central six-edge holonomy;
- the minimal nonzero compatible architecture uses two insertions;
- those two turns must act on the same transported face and have opposite orientations;
- exactly 12 signed two-seam schedules satisfy this condition;
- every such pair preserves the original six-edge holonomy $-I$.

The minimal repair is therefore a twist–antitwist pair, not a single distinguished twist.

## 1. Schedule alphabet

At edge $n$, let

\[
\sigma_n\in\{-1,0,+1\},
\]

where $0$ means no controlled turn and $\pm1$ means $S_-^{(\pm)}$. The base interface is either

\[
E=I_{\rm phase}\otimes\varepsilon_{\rm channel}
\]

or the realification of the graded antiunitary,

\[
\Gamma_{\mathbb R}=K_{\rm phase}\otimes\varepsilon_{\rm channel}.
\]

Both local orderings were tested:

\[
B S_-^{(\sigma_n)}
\quad\text{and}\quad
S_-^{(\sigma_n)}B,
\qquad B\in\{E,\Gamma_{\mathbb R}\}.
\]

There are $3^6=729$ sparse schedules for each of these four cases.

## 2. Exact enumeration

All four cases have the same central-count table:

| Active turn edges | $+I$ schedules | $-I$ schedules | Noncentral schedules |
|---:|---:|---:|---:|
| 0 | 0 | 1 | 0 |
| 1 | 0 | 0 | 12 |
| 2 | 0 | 12 | 48 |
| 3 | 0 | 0 | 160 |
| 4 | 36 | 36 | 168 |
| 5 | 0 | 0 | 192 |
| 6 | 0 | 0 | 64 |

Consequently:

- every odd number of insertions is noncentral;
- six insertions remain noncentral even with the antiunitary;
- two insertions give the unique minimal nonzero central class;
- four insertions can either preserve or reverse the original central sign.

## 3. Classification of the minimal pair

Number the six edges cyclically by $0,\ldots,5$. Sewing alternates the transported face. Edges with the same parity address the same transported face.

A two-insertion schedule is central exactly when:

1. the two occupied edges have the same parity;
2. their turn orientations are opposite.

Equivalently, for occupied edges $i,j$,

\[
i-j=0\pmod2,
\qquad
\sigma_i+\sigma_j=0.
\]

There are

\[
2\binom32\times2=12
\]

such signed schedules: two edge-parity classes, three unordered pairs within each class, and two choices for which seam carries the positive orientation.

Each pair has net zero phase rotation on its transported face and leaves the base six-cycle holonomy

\[
B^6=-I
\]

unchanged.

## 4. Why semilinearity does not change the count

The realified antiunitary differs from bare sewing by phase conjugation. It reverses the orientation of a transported quarter-turn:

\[
\Gamma_{\mathbb R}S_-\Gamma_{\mathbb R}^{-1}=S_+^{-1}.
\]

However, six edges still distribute three candidate insertions to each transported face when every edge is active. A signed sum of three unit quarter-turns is odd, even after the conjugation-induced sign changes. It cannot become an integer multiple of $\pi$.

At the sparse level, conjugation changes which local sign is interpreted as positive after transport, but it does not change the combinatorial centrality counts. The real and semilinear schedule spaces are isomorphic by a sign relabelling.

## 5. Physical interpretation

The minimal compatible object is naturally read as a defect pair:

- the first seam creates the TKK carrier twist;
- propagation and sewing transport it around the placement cover;
- the second same-face seam applies the inverse twist;
- the global placement holonomy remains central.

This resembles a branch cut with two endpoints more than a uniform bulk connection. It supports the interpretation of $S_-$ as a local transition between carrier and relationship descriptions rather than an operation attached indiscriminately to every cell-to-cell edge.

The pair is globally trivial in total phase angle, but not necessarily physically empty. The interval between the seams carries a different local polarization, and observables supported between them can distinguish it. Establishing that requires an explicit spatial or causal boundary model.

## 6. Four-insertion branch

With four active edges, 72 of the 240 schedules are central:

- 36 have holonomy $+I$;
- 36 have holonomy $-I$.

This is the first sparse class capable of changing the central sign. It may represent two coupled twist pairs or a nontrivial global defect sector. No principle presently selects one of these 72 schedules, so the branch remains secondary to the minimal two-seam repair.

## 7. Stop-everything and falsification tests

**Defect-pair trigger:** a microscopic Furey/Higgs boundary produces two opposite controlled turns on the same transported face. Then the TKK intertwiner can coexist with the established $C_{12}\to C_6\to C_3$ placement tower without changing its global sign.

**Localization trigger:** an observable detects a polarization change only on the arc between the two seams. Then the globally cancelling pair has measurable local content.

**Four-seam trigger:** a source action naturally produces four insertion points and selects one of the 36 $+I$ schedules. Then the central sector changes without invoking a 24-step uniform cover.

**Falsifier:** one isolated $S_-$ seam is claimed to preserve central six-edge holonomy. All 12 signed one-seam cases are noncentral.

**Falsifier:** replacing $E$ by $\Gamma_{\mathbb R}$ is claimed by itself to make six all-edge turns central. All 64 all-edge semilinear schedules remain noncentral.

**Boundary warning:** global cancellation of the two turns is not yet a derivation of a local Standard-Model defect or a prediction of where the two seams occur.

## Verdict

| Question | Verdict |
|---|---|
| Does antiunitary sewing repair one turn on every edge? | **No** |
| Can a single distinguished turn preserve the old holonomy? | **No** |
| What is the minimal compatible nonzero insertion? | **Two inverse turns on the same transported face** |
| How many signed minimal schedules exist? | **12** |
| Can four turns change the central sector? | **Yes, conditionally** |
| Is the microscopic seam source derived? | **No** |

## Position in the corpus

- [all-edge holonomy obstruction](1042_a_quarter_turn_on_every_sewn_edge_obstructs_the_six_cycle_central_holonomy_and_generically_doubles_the_coherent_cover.md)
- [passive square-root angle](1041_passivity_and_the_square_root_of_D_quantize_the_projected_oscillator_action_to_a_quarter_turn_modulo_orientation.md)
- [projected-oscillator boundary action](1040_a_positive_projected_oscillator_generates_the_controlled_fourier_tkk_intertwiner_as_a_passive_quarter_period_boundary_flow.md)
- [local conservative interface network](../0900-0999/997_a_local_conservative_real_interface_network_realizes_the_nested_c12_transport_as_antiperiodic_six_cycle_holonomy.md)
