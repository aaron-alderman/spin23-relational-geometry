# The 1528--1553 Programme Is Internally Consistent, but None of Its Label, EFT or Zero-Energy Results Closes the Physical Lift

**Date:** 20 October 2026

**Gates:** A2, A5 and A6

**Status:** independent red-team execution and scope audit of all 24 claims presently occupying IDs 1528--1553; internal consistency PASS, presentation repairs only, physical closure still UNSAT

**Depends on:** [the six-character finite geometry](1529_the_six_character_completion_is_an_exact_real_even_label_geometry_but_not_a_physical_pati_salam_completion.md), [the 16-state gauge/Higgs audit](1539_the_sixteen_state_repair_rotates_the_anomaly_free_two_torus_and_its_link_vevs_can_both_higgs_it_and_open_the_label_level_mass_gap.md), [the exact Feshbach audit](1547_the_exact_feshbach_kernel_induces_the_wrong_diagonals_and_the_protected_resolvent_zeros_hold_only_at_zero_energy_not_on_an_interval.md), [the minimum auxiliary-topology theorem](1550_two_disconnected_massive_leaves_are_minimal_for_independent_endpoint_self_energies_but_strict_grading_forbids_their_zero_energy_masses.md), and [the weighted anchor chamber](1553_the_anchor_cut_has_an_open_weight_chamber_but_the_stable_vacuum_does_not_enforce_its_ordering.md)

**Evidence:** [red-team audit ledger](../../../evidence/data/spin23-claims-1528-1553-red-team-audit.json) and [deterministic aggregate verifier](../../../verification/verify/verify_spin23_claims_1528_1553_red_team_audit.mjs)

## Result

All 24 claims presently in the requested range pass their own executable
verifiers and the aggregate cross-claim audit.  IDs 1541 and 1545 are unused
numbering slots, not missing dependencies.  Every local Markdown link and
every referenced reproduction script resolves.

No algebraic, graph-theoretic, anomaly, determinant, Schur-complement or
minimality contradiction was found.  Five claim files needed presentation-only
repairs: missing LaTeX backslashes in claims 1530, 1547, 1551 and 1553, and
malformed multiplication/inline-math typography in claim 1552.  The evidence,
theorems and verdicts were unchanged.

The surviving programme is sharp only when its logical layers remain
separate:

\[
\boxed{
\begin{array}{c}
\text{exact finite label geometry}
\ne
\text{sourced physical Pati--Salam finite triple},\\[2pt]
\text{exact effective-operator support/cofactor}
\ne
\text{projected-resolvent zero on an interval},\\[2pt]
\text{grading-even massive-leaf EFT}
\ne
\text{ordinary grading-odd finite Dirac repair},\\[2pt]
\text{coefficient equalizer}
\ne
\text{Ward-protected RG eigenline}.
\end{array}}
\]

## 1. Finite geometry, anomaly and mass audit

The numerical ledgers sew consistently:

| model | states | allowed edges | \(J\)-edge orbits | generic result |
|---|---:|---:|---:|---|
| six-character model | 12 | 10 | 5 | four zero modes |
| minimum new-sector repair | 16 | 14 | 7 | determinant one at unit weights |

Thus claim 1533's four-added-dimension lower bound agrees with both the
four-dimensional kernel of claim 1529 and the explicit invertible witness of
claim 1539.

Both chiral label spectra have a five-dimensional effective central algebra
and a maximal two-dimensional simultaneous perturbative anomaly-free linear
subalgebra.  The added states rotate that plane; they do not enlarge it.  This
is a cubic and mixed-gravitational **abelian label-spectrum** result.  It says
nothing by itself about nonabelian or global anomalies after physical colour,
weak and family multiplicities are supplied.

The Higgs/link conclusions also agree.  On \(H_{12}\), all five required
edge orbits are charged and generic link VEVs break the faithful two-torus,
but the grading imbalance retains four zero modes.  On \(H_{16}\), one orbit
is bare, six are charged, their charge lattice has rank two, and the same
generic nonzero support can both Higgs the torus and give a label-level mass
gap.  Claim 1542 supplies an open stable all-nonzero scalar vacuum, but claim
1553 correctly observes that its symmetric unit witness lies on the two
anchor-selection walls \(y=u=v\).  Vacuum stability does not imply the
ordering law needed for unique anchor selection.

## 2. Portal, selector and parent-symmetry scope

The coefficient-label exchange of claim 1528 has the common line as its fixed
space, while claim 1531 proves that the same source projection is not an
action-level Ward symmetry without a typed operator exchange.  Claim 1530
then gives the exact RG condition: the ray must be a common one-dimensional
counterterm submodule, and a fixed ratio requires a protected common
eigenline with no transverse additive pole or threshold rotation.

The selector sequence is likewise consistent:

1. degree-two returns can generate the desired diagonals only after a selected
   \(P/I\) corner is imposed;
2. the diagonal conditional expectation is canonical, but that corner is not;
3. it occurs as a nonminimal sector sum, not as a selected central projection;
4. an oriented correspondence algebra can contain both the corner and the
   Majorana transporter, but does not make either select the other; and
5. a genuinely composable single generator forces \(u^2\propto E_{NI}\) and
   closes to \(M_3(\mathbb C)\).

There is therefore no contradiction between the existence of exact selector
realizations and the repeated conclusion that their selection laws remain new
data.

The parent-group conclusions are also bounded.  Claim 1535 excludes only its
five enumerated standard candidates from providing the literal involutive
portal exchange.  Its Spin(10) shared-126 and \(E_6\) 351-prime channels are
single-tensor near misses, not proofs of a universal no-go over every compact
group and not completed physical models.

## 3. Schur, zero-energy and interval audit

The 16-state Feshbach calculation and the auxiliary-topology classification
answer different questions and agree exactly.

Eliminating the actual \(SI/IS+NU/UN\) repair induces rational diagonal terms
at \(Z\) and \(X\), not at the desired \(I\) and \(P\).  Its effective
operator retains a tautological selected cofactor zero, but the spectral
cofactor and projected resolvent do not vanish on an open energy interval.
The selected resolvent zero and absent \(I-N\) channel occur only in the
controlled \(z\to0\) limit; generic nonzero energy reopens the resolvent
channel.

Two disconnected grading-even massive leaves attached to \(I\) and \(P\)
are necessary and sufficient for independent diagonal-only self-energies
within the relaxed one/two-auxiliary topology class.  Their **support** and
effective cofactor are rational interval identities.  Their constant masses,
however, are only the low-energy expansion of

\[
\delta_r(z)=\frac{\lambda_r^2}{z-M_r}.
\]

Moreover, the all-finite-size strict theorem remains: for an invertible
grading-odd auxiliary block, the zero-energy inverse has zero same-chirality
blocks, so it cannot generate nonzero retained diagonal masses.  The relaxed
leaf model is an EFT reopening datum, not an ordinary finite-triple solution.

## 4. Exact minimality domains

The word “minimal” remains valid only inside each declared search domain:

- signed-permutation/two-label actions in claim 1528;
- the six-character unit-multiplicity completion in claim 1529;
- bounded old-sector multiplicities or multiplicity-one new \(J\)-orbits in
  claim 1533;
- fixed-Pati--Salam type-preserving mirror closure in claim 1534;
- degree-at-most-two paths in claim 1540 and degree-at-most-four scalar
  invariants in claim 1542;
- one- and two-auxiliary attachment topologies in claim 1550, supplemented by
  its separate all-size strict-grading theorem;
- diagonal rank-four two-orbit projections in claim 1551; and
- scalar positive edge norms in claim 1553, not matrix-valued family Yukawas.

None of those bounded exhaustions licenses an unqualified global minimality
claim over arbitrary categories, nonlocal dualities, parent groups, spectral
functionals or physical field contents.

## Verdict

\[
\boxed{
\begin{array}{rcl}
\text{internal executable consistency}&=&\mathrm{PASS},\\
\text{semantic corrections required}&=&0,\\
\text{presentation-only corrected files}&=&5,\\
\text{physical Pati--Salam closure}&=&\mathrm{UNSAT/UNDERDETERMINED},\\
\text{interval-protected projected-resolvent zero}&=&\mathrm{UNSAT}.
\end{array}}
\]

The programme has a coherent collection of exact finite and conditional
theorems.  It has not yet supplied the single datum that would join them into
a physical model: a sourced Pati--Salam descent with the full chiral
multiplicities, scalar representations and vacuum, a typed Ward identity,
threshold matching, and a counterterm module preserving the common ray.

## Boundary

This audit reruns and cross-checks the local executable certificates.  It is
not a new external-source review, a physical one-loop Pati--Salam
calculation, a nonabelian/global anomaly audit, or an experimental test.

## Reproduction

Run:

```powershell
node verification/verify/verify_spin23_claims_1528_1553_red_team_audit.mjs
```

The aggregate verifier locates all 24 present claims, resolves their local
links and reproduction targets, reruns every primary verifier, checks the
shared dimensions, graph counts, anomaly ranks, link ranks, vacuum and anchor
data, Feshbach/cofactor distinctions, strict-grading theorem, RG boundary and
the corrected mathematical notation.
