# No Third Furey Singlet Extends the Neutral (M_2) to (M_3), So the Holonomy Port Must Be a Composite Response

**Date:** 17 October 2026  
**Branches:** B01, B02, B03, B04, B05, B06, B08, B09, B11 and B13  
**Claim status:** exact gauge-commutant and Schur-lemma obstruction; composite-current response route remains open dynamically

## 1. The third-port question

Schur reduction converts a three-port loop holonomy into the two (O/R)
relationship spurions required by the Pin phase. The corrected Furey neutral
inventory contains three additional trace directions, suggesting that one
might enlarge

\[
\operatorname{End}(O\oplus R)\cong M_2(\mathbb C)
\]

to an internal (M_3(\mathbb C)).

That enlargement is impossible while preserving the Standard-Model gauge
action.

## 2. Carrier representations

The five carrier blocks are

\[
\begin{array}{c|c}
O&(\mathbf1,\mathbf1)_0\\
R&(\mathbf1,\mathbf1)_0\\
O_2&(\mathbf3,\mathbf1)_{1/3}\\
H&(\mathbf1,\mathbf2)_{1/2}\\
C&(\mathbf1,\mathbf1)_1.
\end{array}
\]

Only (O) and (R) are equivalent irreducible gauge modules. The remaining
three are mutually inequivalent and inequivalent to the trivial module.

By Schur's lemma, the complex gauge commutant is

\[
\boxed{
\operatorname{End}_{G_{SM}}(V)
\cong M_2(\mathbb C)
\oplus\mathbb C\oplus\mathbb C\oplus\mathbb C.}
\]

Its complex dimension is seven.

## 3. Why the trace directions are not third matrix-unit ports

The identity on each nontrivial block is gauge invariant:

\[
P_{O_2},\qquad P_H,\qquad P_C.
\]

But an internal (M_3) containing (O,R,X) also requires gauge-invariant
off-diagonal units

\[
E_{OX},E_{XO},E_{RX},E_{XR}.
\]

For (X=O_2,H,C), these maps transform respectively as color triplets,
weak doublets or hypercharged singlets and their conjugates. None is a full
gauge singlet.

Therefore

\[
\boxed{
M_2(\mathbb C)\oplus\mathbb C
\not\supset M_3(\mathbb C)
\text{ as a gauge-commuting internal block}.}
\]

The numerical count (4+1=5) already differs from the nine complex matrix
units an (M_3) would require; the missing four are exactly the charged
off-diagonal maps.

## 4. The response-space escape

A three-port response matrix need not be an internal matrix algebra. Let

\[
J_O,\qquad J_R,\qquad J_X
\]

be three gauge-invariant composite operators. Their retarded correlator

\[
G_{ij}(z)
=-i\int_0^\infty e^{izt}
\langle[J_i(t),J_j(0)]\rangle,dt
\]

is a (3\times3) matrix in **source space**. Off-diagonal entries are
cross-correlators, not internal maps (E_{ij}).

Thus a positive (H_3(\mathbb C)) response can exist even though the internal
gauge commutant has no (M_3) factor. Gauge invariance is enforced on each
composite current rather than on fictitious off-diagonal carrier matrix units.

This is the only viable route for the third port among the current candidates.

## 5. Candidate composite trace currents

The three trace directions suggest number-, density- or stress-like currents:

\[
J_{O_2}\sim\operatorname{tr}_{\mathbf3}(\bar\psi_{O_2}\Gamma\psi_{O_2}),
\]

\[
J_H\sim\operatorname{tr}_{\mathbf2}(\bar\psi_H\Gamma\psi_H),
\qquad
J_C\sim\bar\psi_C\Gamma\psi_C,
\]

or the corresponding contributions to the stress tensor. Each can be gauge
neutral after contraction.

But the algebra does not choose:

- the Lorentz structure (Gamma);
- whether the current is conserved, scalar, vector or stress-like;
- the state producing a positive spectral measure;
- couplings generating nonzero correlations with both (J_O) and (J_R).

These are dynamical data.

## 6. Cross-correlators require an interaction path

If the action is block diagonal between the neutral singlets and (X), then

\[
G_{OX}=G_{RX}=0
\]

after subtraction of disconnected pieces. The loop product and Schur area
vanish.

Nonzero holonomy needs interaction paths coupling (X) to both neutral ports.
Possible mechanisms include:

- neutrino/Higgs Yukawa interactions for a weak-sector composite port;
- a common stress insertion with interacting loops;
- a boundary or survivor scattering network;
- exceptional/triality composite couplings;
- a sterile-sector portal.

Gauge invariance permits such composite correlations but does not force them.

## 7. Candidate ranking

### Weak trace (P_H)

This is the leading Standard-Model candidate if one neutral line is identified
with a sterile neutrino and an actual neutrino/Higgs Yukawa supplies both
interaction paths. The identification and second path remain underived.

### Charged-singlet trace (P_C)

Charged-lepton Yukawa interactions can connect it indirectly to weak-neutral
currents, but electromagnetic charge forbids treating the underlying carrier
line itself as the neutral port. Only the contracted composite current is
eligible.

### Color trace (P_{O_2})

It has the weakest direct neutral-sector connection. Gauge and stress loops can
produce correlations, but no current corpus result singles it out.

This ranking is dynamical and provisional, not an algebraic theorem selecting
(P_H).

## 8. Stress--energy significance

Stress tensor components provide a universal family of gauge-invariant
composite probes. In an interacting theory, cross spectral densities between
sector-resolved stress contributions can be nonzero while the total stress
tensor remains conserved.

This is a concrete place where the original “(A X B) with stress tensors”
intuition can re-enter correctly:

- (A,B) are named sector-resolved currents or stress insertions;
- (X) is the causal three-port response/Schur kernel;
- the internal (M_2) supplies the (O/R) relationship basis;
- no forbidden internal (M_3) is asserted.

The necessary Ward identities and contact-term subtractions remain to be
worked out.

## 9. Stop-everything and falsification gates

**Stop-everything trigger:** one named composite current has positive spectral
density, nonzero causal cross-correlators with both neutral currents, and a
loop holonomy whose Schur area lands in a continuum-stable Pin phase.

**Internal-(M_3) falsifier:** a trace direction is appended to (O,R) while
the four gauge-charged cross-block matrix units are silently treated as
singlets.

**Response/algebra falsifier:** source-space cross-correlators are described as
internal endomorphism multiplication.

**Disconnected falsifier:** products of one-point functions are counted as the
connected interaction paths generating holonomy.

**Stress falsifier:** sector-resolved stress correlators are used without Ward
identities, improvements and contact terms.

## 10. Pinned dependency and continuation

Close the internal-(M_3) route. Continue the third-port branch only in
composite response space.

The next calculation should construct a minimal positive spectral model with
three gauge-invariant currents, determine exactly when both cross paths are
nonzero, and keep the Schur direct/indirect decomposition observable.

## 11. Certificate

The [third-port commutant obstruction certificate](../../../verification/verify/verify_no_neutral_furey_m3_third_port.mjs)
reconstructs the representation multiplicities, seven-dimensional commutant,
absence of every required neutral cross-block unit and the distinction between
internal matrix units and composite source-space responses.

## Companion documents

- [Schur holonomy to Pin orientation](386_schur_reduction_turns_three_port_holonomy_into_exactly_the_two_or_spurions_needed_by_the_pin_phase.md)
- [Corrected neutral endomorphism inventory](362_the_furey_neutral_endomorphism_sector_has_seven_not_eleven_copies_and_no_canonical_pairing_mediator.md)
- [Neutral matrix-unit causal carrier](368_the_neutral_matrix_units_support_an_exact_exchange_real_causal_carrier_but_are_not_yet_spacetime_operators.md)
- [Standard Model as stress--energy](../0000-0099/01_standard_model_as_stress_energy_full_analysis.md)
