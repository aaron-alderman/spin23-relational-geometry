# Result 34: three parallel trunks converge on organisation without unique physical selection

## Executive result

Three independent workstreams tested whether dynamics, larger representation theory or spectral geometry supplies the missing unique physical selector. All three produced useful structure. None supplied uniqueness by symmetry alone.

This convergence is informative because the obstructions occur at different levels:

| trunk | structure obtained | freedom that remains |
|---|---|---|
| physical source | action-derived current metric and canonical removal of \(B-L\) shear | sterile-neutrino kernel and incidence normalization |
| representation | exact embedding of the completed Furey generation in the exceptional \(27\) | selection of the \(16\), conjugation closure and response normalization |
| spectral geometry | doubled arrow geometry admitting all desired Dirac links | three extra links and a Majorana/orientability fork |

The common lesson is not merely that "more dynamics is needed." Each route now identifies the particular datum that an action or physical quotient must supply.

## 1. Physical-source trunk

The free completed-Standard-Model fermion determinant gives the positive sector metric

\[
D=\operatorname{diag}(6,3,3,2,1,1).
\]

It is full rank and therefore cannot generate the sterile-neutrino kernel of the incidence equations. Within the declared incidence/\(B-L\) plane it does canonically remove the shear:

\[
\lambda_d^\perp=\lambda_d-\frac{3}{16}q_{B-L},
\qquad
\lambda_m^\perp=\lambda_m-\frac{5}{16}q_{B-L}.
\]

The leading absorptive divergence block has rank one because \(B-L\) is conserved. Consequently \(B-L\) shear is not a physical nuisance in the derivative-ALP quotient, but the deduplicated-versus-multiplicity lepton fork remains.

## 2. Representation trunk

The direct exceptional flag complement has complex dimension nine and contains

\[
(3,2)_{1/6}\oplus(3,1)_{-1/3}.
\]

It is not a completed Furey generation: its dimension and the chirality/color typing of the down sector fail.

The complex exceptional \(27\), however, branches as

\[
27=16_1\oplus10_{-2}\oplus1_4.
\]

After choosing \(Spin(10)\times U(1)\), the completed Furey generation embeds uniquely as the \(16_1\), preserving Standard-Model charges, chirality, anomaly cancellation and \(\nu^c\). The channel \(16_1\,16_1\,10_{-2}\) is Yukawa-compatible.

This is an embedding, not an equivalence. Eleven extra complex directions remain, the full exceptional action does not preserve the selected \(16\), the Furey ternary product is not the Jordan product, and physical conjugation requires at least the obvious \(27\oplus\overline{27}\) completion.

Connected \(SU(2)_L\times SU(2)_R\) also fails to select one response normalization. In the minimal complex alternating problem it leaves two coefficients; an additional left-right parity reduces them to one. On the full realified carrier it leaves six invariant two-forms, and block-swap parity still leaves three. A typed quotient or dynamical intertwiner is therefore indispensable.

## 3. Foundations trunk

A conventional support proof now replaces a central certificate-only step in the Tier-A Furey TRO manuscript.

The minimal doubled Furey-arrow spectral geometry repairs the naïve first-order failure and permits the four desired Dirac links

\[
Q-u^c,\quad Q-d^c,\quad L-e^c,\quad L-\nu^c.
\]

But the same axioms also permit

\[
Q-L,\quad u^c-e^c,\quad d^c-\nu^c,
\]

leaving seven complex Dirac moduli in total. Distinct neutral endpoints preserve zero-cycle orientability but forbid a sterile Majorana term. Collapsing the endpoints permits Majorana, raises the count to ten and obstructs orientability.

The next question is therefore whether the actual noncommutative Standard-Model/Furey representation forbids the three extra links by gauge typing or interprets them as additional scalar multiplets.

## Combined decision tree

1. Complete the gauge-typed seven-current mixing calculation. If its quotient remains generic, the physical-source route becomes an effective response theory rather than a selector derivation.
2. Calculate the stabilizer and orbit of the selected \(16\subset27\). If no invariant or vacuum isolates it without mirror/exotic residue, exceptional structure remains a host rather than an explanation.
3. Dress the seven spectral links with their full gauge representations. If exactly the three extra links are forbidden, the doubled Furey geometry becomes a serious action candidate; if they require new scalars, compare those scalars with experiment.
4. Treat left-right parity as additional physical input unless a bidoublet vacuum or intertwiner derives it.

## Verdict

The parallel investigation supports a restrained version of the user's crystal picture: several larger structures genuinely accommodate the same completed generation and relational patterns. What is still missing is the physical cleavage plane—the action, state or quotient that selects one embedded module and one normalized response from the larger crystal.

## Reproduction

- `verification/verify/verify_programme_action_derived_two_current_block.mjs`
- `verification/verify/verify_representation_trunk_furey_exceptional_module_test.mjs`
- `verification/verify/verify_representation_trunk_left_right_response_coefficients.mjs`
- `verification/classify/classify_minimal_doubled_furey_arrow_spectral_geometry.mjs`

All four certificates pass.
