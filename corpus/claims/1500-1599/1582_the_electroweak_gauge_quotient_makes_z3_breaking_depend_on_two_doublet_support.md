# The Electroweak Gauge Quotient Makes Z3 Breaking Depend on Two-Doublet Support

**Date:** 20 October 2026

**Gates:** A4, A5 and A8

**Status:** exact gauge-orbit refinement of the domain-wall gate

**Depends on:** [the Z3 orbit and domain-wall gate](1577_the_exact_global_z3_portal_protection_produces_three_electroweak_vacua_and_a_domain_wall_gate.md)

**Evidence:** [electroweak gauge-quotient ledger](../../../evidence/data/spin23-z3-electroweak-gauge-quotient.json) and [deterministic verifier](../../../verification/verify/verify_spin23_z3_electroweak_gauge_quotient.mjs)

**Subsequent refinement:** [claim 1586](1586_elitzur_and_goldstone_force_gauge_invariant_selector_data_and_a_portal_phase_fork.md) applies Elitzur's theorem to the order parameter and separates an accidental-U(1) Goldstone branch from Z3 phase locking and its candidate wall vacua.

## Result

The three-point field orbit of claim 1577 is not automatically a
three-point orbit in the gauge-quotiented vacuum. The answer depends on
which electroweak doublets condense.

Let the portal bidoublet contain

\[
H_u\sim(2,+1/2),
\qquad H_d\sim(2,-1/2),
\]

and let the family Z3 act with the same phase

\[
H_u\mapsto qH_u,
\qquad H_d\mapsto qH_d,
\qquad q=\omega^2.
\]

If only \(H_u\) is nonzero, a hypercharge rotation can reproduce the phase
\(q\); likewise for \(H_d\) alone. The three field representatives are then
gauge equivalent on that one-doublet support.

If both are nonzero, compensation would require simultaneously

\[
e^{i\alpha/2}=q,
\qquad e^{-i\alpha/2}=q,
\]

and hence \(q=q^{-1}\), which is false for a primitive cube root. The
gauge-invariant bilinear

\[
\mathcal O=H_u^Ti\sigma_2H_d
\]

transforms as

\[
\mathcal O\mapsto q^2\mathcal O=\omega\mathcal O.
\]

Thus \(\langle\mathcal O\rangle\ne0\) detects genuine global Z3 breaking
after quotienting by electroweak gauge transformations.

## Topological refinement

The wall decision tree is now:

\[
\boxed{
\begin{array}{rcl}
\text{one-doublet support}&:&\text{Z3 phase can be gauge-compensated},\\
\text{two-doublet support with }\langle\mathcal O\rangle\ne0&:&\text{Z3 is genuinely broken},\\
\text{three isolated phase minima}&:&\text{stable global-Z3 walls},\\
\text{connected accidental phase orbit}&:&\text{no Z3 wall conclusion}.
\end{array}}
\]

The first pure phase-locking power of \(\mathcal O\) allowed by Z3 is

\[
\mathcal O^3+\overline{\mathcal O}^{,3},
\]

which has mass dimension six in four dimensions. Therefore the
renormalizable low-energy doublet potential can possess an accidental
continuous phase symmetry unless E6 thresholds or additional fields
supply lower-dimensional phase-sensitive terms. The coefficient and origin
of this dimension-six operator are now part of the domain-wall calculation.

## Programme consequence

The full E6 scalar audit must determine not just whether \(S_1\) condenses,
but whether the light spectrum is effectively one- or two-doublet, whether
\(\langle H_uH_d\rangle\) is nonzero, and which threshold operators lock
its phase. This ties the topology question directly to the same light
bidoublet spectrum already required by claim 1581.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_z3_electroweak_gauge_quotient.mjs
~~~
