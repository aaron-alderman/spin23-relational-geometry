# Final-wave red-team audit finds two substantive errors and preserves four independent stopping boundaries

**Date:** 20 October 2026  
**Status:** hostile-referee audit; correction ledger, not physical admission  
**Scope:** documents 1228--1233, 1235, 1290--1292 and 1390--1397  
**Evidence:** [machine-actionable audit](../../../evidence/data/spin23-final-wave-red-team-audit.json) and [executable checklist](../../../verification/verify/verify_spin23_final_wave_red_team_audit.mjs)

## Referee verdict

The recent wave contains real progress, but it is not clean enough to cite without a correction ledger.

Two claims require substantive correction:

1. Document 1291 assigns the wrong parity to the sterile Majorana pseudoscalar under an **antiunitary** exchange. Document 1391 correctly repairs it: conjugate-linearity flips \(i\), so if \(A=NN\mapsto A^\dagger\), both \(A+A^\dagger\) and \(i(A-A^\dagger)\) are even in the displayed plus convention.
2. Document 1394 proves a theorem about finite **square** maps but advertises it as a theorem about all finite four-dimensional operators. A rectangular finite complex can have nonzero index by dimension imbalance, and a symmetry-protected finite kernel is not excluded. The honest conclusion is epistemic: the current inventory does not derive three without inserting an imbalance, degeneracy or new protected datum.

Neither correction rescues physical admission. They narrow the claims and make the remaining blockers clearer.

## Required corrections

| ID | Document(s) | Referee finding | Required wording/status |
|---|---:|---|---|
| RT-01 | 1291, 1391 | Antiunitarity makes the claimed pseudoscalar even, not odd | Mark the 1291 parity conclusion superseded by 1391; retain its endpoint-blind no-go |
| RT-02 | 1394 | Rank--nullity covers square maps, not all finite operators | Replace the headline no-go by a finite-square-index theorem plus a current-inventory statement |
| RT-03 | 1394, 1397 | Index three does not by itself choose a chiral higher-dimensional parent | Keep the exact bundle bridge; require a 6D Weyl/spectral polarization, domain and anomaly audit before calling it a physical family operator |
| RT-04 | 1292 | The tanh wall is exact on \(\mathbb R\), not at finite endpoints; the KK gap depends on unspecified boundary conditions | Call the slab solution exponentially accurate and declare the self-adjoint domain before quoting its gap |
| RT-05 | 1290 | “Fully healthy” exceeds the bosonic tree-level scope | Use “healthy scoped bosonic tree-level benchmark” |
| RT-06 | 1230 | “Laboratory-ready” lacks effect size, noise, tolerances and power analysis | Use “simulation-ready experiment design” |
| RT-07 | 1393, 1396 | \(\xi_\chi\) is both an improvement parameter and a matched Wilson coupling; the zero shown is integrated | Say “independent within the displayed improvement family”; restrict cancellation to the integrated statistic |
| RT-08 | 1231 | The graph mixes logical and workflow dependencies | Type every edge; call it a candidate-action workflow DAG |

The first, second and fourth rows are mathematical corrections. The others are status or scope corrections.

## Important qualifications that do not invalidate the core calculation

- **1228:** the computed object is a finite-regulator gradient/strain occupation covariance, not a complete Hilbert-stress susceptibility. Its numerical rank calculation is substantive within that toy.
- **1229:** the same-parity degeneracy and mixed-parity counterexample are valid in the declared finite fixture. They do not solve A5, exactly as the document says.
- **1232:** this is a useful classical term ledger, not a derivation of the renormalized stress operator. Its status is already appropriately conditional.
- **1233:** the BF coefficient is exact after declaring compact-field conventions. “Exact BF” should otherwise mean a strict-IR topological EFT, not a finite-energy microscopic identity. The source also contains the typesetting errors *left[* and *3,da*.
- **1235:** the construction is a complete selector **tuple** or decision rule, not yet a local field-theory model, because \(\epsilon(T)\) remains an externally supplied topology label.
- **1390:** the zero mirror count is an input from the unconstructed CAR/selector interpretation. One benchmark plus continuity proves a nonempty open neighbourhood, not an unquantified “wide” region.
- **1391:** the CAR and parity calculation is a genuine repair. Its loop result is a symmetry/counterterm classification, not a computed one-loop coefficient or beta function.
- **1392:** the real-time spectral sums are nontrivial and correctly scoped to a free, finite-mode, gradient-vertex reader. “Exact” refers to that regulator and operator, not to physical stress.
- **1395:** the phase-circle equivariance theorem is sound under the declared sterile rephasing. The executable potential comparison checks CP symmetry at \(\theta\) and \(-\theta\); it does not by itself prove those points are stationary vacua.
- **1397:** the restriction \(j_P^*K_{\mathbb{CP}^2}^{-1}=\mathcal O(3)\) and its index are a genuine typed bridge. The document correctly stops before claiming a physical fermion coupling.

## What the verifiers actually certify

The word “verifier” hides three different evidential strengths.

1. **Substantive recomputation.** The scripts for 1228, 1229, 1233, 1290, 1292, 1391--1394, 1396 and 1397 recompute spectra, matrices, signs, ranks, degrees or kernels from lower-level fixture data. They establish conditional mathematical consistency.
2. **Mixed calculation and ledger.** The scripts for 1230, 1235, 1390 and 1395 combine real calculations with assertions that an authored label, interpretation or checklist entry is present. Those labels are not independently discovered.
3. **Ledger/graph certificates.** The scripts for 1231 and 1232 chiefly prove completeness and internal consistency of an input graph or term classification. They do not prove that the scientific dependency edges or classifications are uniquely correct.

The 1291 antiunitary subcheck is the important exception: it failed to encode conjugate-linearity and therefore certified the wrong parity label. The accompanying verifier for this audit explicitly demonstrates the corrected sign.

## Exactness policy

Future claims should attach “exact” to one of four types:

- **theorem exact:** follows from stated hypotheses, such as rank--nullity for a square map;
- **fixture exact:** exact for a finite regulator, chosen coefficients and declared boundary domain;
- **conditional EFT exact:** exact normalization inside an effective action after global conventions are fixed;
- **physical/empirical:** requires matched operators, calibrated ports and uncertainties.

Several reviewed documents move correctly between the first three types, but their titles sometimes erase the qualifier. None reaches the fourth.

## Why the stopping boundaries remain independent

The audit does not collapse the programme to one vague missing ingredient. Four different interfaces remain open:

| Gate | Missing object | Why another lane cannot silently supply it |
|---|---|---|
| A5 | physical phase/orientation reference plus a local exchange-odd portal | anomaly cancellation, CP-even dynamics, residual \(\mathbb Z_3\), and an index do not select a point on the sterile phase circle |
| A6 | physical family Dirac coupling/polarization with anomaly control | an \(\mathcal O(3)\) bundle has index three but does not make SM fermions propagate on the completion space |
| A7 | matched curved-space stress operator and normalized probes | BF normalization and a flat-space gradient covariance do not fix improvement, displacement contacts or ports |
| A11 | device-specific preparation, port map, effect size and noise/power budget | a synthetic \(U(1)\) phase and a finite toy rank do not establish protected \(\mathbb Z_3\) holonomy or laboratory detectability |

These are independent in the operational sense: supplying any one leaves concrete countermodels in which the other three remain absent.

## Final status

The strongest charitable reading survives:

- the A5 obstruction is sharper after the antiunitary correction;
- the A6 bundle-level bridge is real and nontrivial;
- the A7/A11 traceless threshold is a robust conditional toy observable;
- the programme has executable fixtures rather than only analogies.

The appropriate overall status remains

\[
\boxed{
\text{mathematically productive conditional programme; physical admission false.}
}
\]

No theological conclusion follows from these failures. Symmetric data being unable to select a non-fixed orientation is an equivariance theorem. Reading that underdetermination as providence, purpose or an epistemic limit is an interpretation outside the theorem.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_final_wave_red_team_audit.mjs
~~~
