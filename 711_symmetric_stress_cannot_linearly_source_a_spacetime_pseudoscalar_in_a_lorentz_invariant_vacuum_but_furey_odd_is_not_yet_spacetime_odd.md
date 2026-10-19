# Symmetric Stress Cannot Linearly Source a Spacetime Pseudoscalar in a Lorentz-Invariant Vacuum, but Furey-Odd Is Not Yet Spacetime-Odd

**Date:** 17 October 2026  
**Branches:** B01, B02, B03, B04, B05, B06, B08, B09, B11, B14 and the stress-response parity branch  
**Claim status:** exact Lorentz-covariant two-point no-go under stated assumptions; Furey-to-spacetime parity intertwiner remains unproved  
**Certificate:** [verify_stress_pseudoscalar_two_point_has_no_lorentz_covariant_tensor.mjs](scripts/verify_stress_pseudoscalar_two_point_has_no_lorentz_covariant_tensor.mjs)

> **Cycle 634 scope clarification.** The theorem below assumes no parity/CP-odd background. A nonzero CP-odd weak-basis flavor invariant can act as such a spurion and multiply the ordinary transverse tensor. That conditionally reopens the kernel without constructing the still-missing Furey-to-spacetime parity map. See [the CP-spurion reopening audit](719_a_cp_odd_flavor_spurion_conditionally_reopens_the_vacuum_stress_odd_response_but_does_not_supply_the_furey_parity_intertwiner.md).

## Executive result

The even and odd Clifford selectors of documents 706 and 710 have identical Jordan positivity. The symmetric stress tensor nevertheless supplies a conditional way to distinguish them.

Let \(P\) be a genuine spacetime pseudoscalar. In a translation- and Lorentz-invariant vacuum, consider

\[
\Pi_{\mu\nu}(q)
=
\langle T_{\mu\nu}(q)P(-q)\rangle.
\]

If \(q_\mu\) is the only available four-vector and there is no parity-odd background, there is no nonzero Lorentz-covariant symmetric rank-two pseudotensor. The only apparent epsilon construction is

\[
\epsilon_{\mu\alpha\nu\beta}q^\alpha q^\beta,
\]

and it vanishes because \(q^\alpha q^\beta\) is symmetric while the epsilon tensor is antisymmetric.

Therefore:

\[
\boxed{
\langle T_{\mu\nu}(q)P(-q)\rangle=0
}
\]

under the stated assumptions.

This would exclude a linear odd-axis stress response **if**

\[
\text{Furey conjugation odd}
\quad\Longrightarrow\quad
\text{spacetime pseudoscalar}.
\]

That implication has not been proved. Furey conjugation acts on an internal complex-octonion structure, whereas Lorentz parity and CP act on spacetime spinors and fields. Conflating them would turn a valid conditional no-go into a false conclusion.

## 1. Standard-Model Hermitian bilinear classes

For a Dirac field, the familiar Hermitian bilinears are:

| bilinear | Lorentz type | parity behavior |
|---|---|---|
| \(\bar\psi\psi\) | scalar | even |
| \(i\bar\psi\gamma_5\psi\) | pseudoscalar | odd |
| \(\bar\psi\gamma^\mu\psi\) | vector | ordinary vector |
| \(\bar\psi\gamma^\mu\gamma_5\psi\) | axial vector | pseudovector |
| \(\bar\psi\sigma^{\mu\nu}\psi\) | tensor | mixed |

Gauge invariance further restricts which chiral bilinears exist before electroweak symmetry breaking. Scalar left-right bilinears require a Higgs insertion, for example

\[
\bar Q_L H d_R+\text{h.c.}
\]

or its up-type analogue.

The symmetric stress tensor is built from:

- gauge kinetic terms;
- Higgs kinetic and potential terms;
- symmetrized fermion derivative bilinears;
- and Hermitian Yukawa interactions.

Its standard local components transform as an ordinary symmetric tensor, not a pseudotensor.

## 2. Exact Lorentz tensor count

With one momentum \(q_\mu\), the ordinary symmetric rank-two basis is

\[
\eta_{\mu\nu},
\qquad
q_\mu q_\nu.
\]

To obtain a pseudotensor one must use \(\epsilon_{\mu\nu\rho\sigma}\). Leaving two free indices requires contracting the remaining two with available tensors.

Contracting them with two momenta gives

\[
\epsilon_{\mu\alpha\nu\beta}q^\alpha q^\beta=0.
\]

Contracting an epsilon pair with the symmetric metric also gives zero. Adding more copies of the same momentum does not help: at least two enter antisymmetrized slots and vanish.

Thus the pseudotensor basis has dimension zero.

The executable certificate evaluates the candidate for several generic four-vectors and verifies the metric contractions vanish identically.

## 3. Ward identities make the ordinary channel smaller, not the odd channel possible

Stress conservation gives

\[
q^\mu\Pi_{\mu\nu}=0.
\]

For an ordinary scalar response, this reduces the two ordinary structures to the transverse combination

\[
q_\mu q_\nu-q^2\eta_{\mu\nu}.
\]

For a pseudoscalar response, there was no nonzero structure before imposing conservation. The Ward identity cannot create one.

## 4. CP-odd Standard-Model operators do exist

The no-go does not say the Standard Model lacks pseudoscalars. Gauge-invariant examples include

\[
F_{\mu\nu}\widetilde F^{\mu\nu},
\qquad
G_{\mu\nu}^a\widetilde G^{a\mu\nu},
\]

and Higgs-dressed pseudoscalar fermion bilinears.

However:

- \(F\widetilde F\) is a total derivative for constant coefficient in ordinary four-dimensional gauge theory;
- the corresponding topological density is metric independent in its differential-form expression;
- it therefore does not produce an ordinary local bulk stress tensor by metric variation;
- and a two-point \(T\)-pseudoscalar kernel still has the Lorentz obstruction above.

CP-odd effects can enter with additional momenta, external states, boundaries, spacetime-dependent coefficients, curvature or a medium.

## 5. CKM CP violation does not automatically select the odd response

The Standard Model violates CP through flavor data. Basis-invariant CP violation requires noncommuting up- and down-type flavor structures, schematically

\[
\operatorname{ImTr}
\bigl([Y_uY_u^\dagger,Y_dY_d^\dagger]^3\bigr).
\]

This can generate CP-odd amplitudes at loop level. It does not by itself create a nonzero vacuum two-point pseudotensor with only one external momentum.

Any induced odd gravitational or stress response must specify:

- the external states or extra momenta;
- the loop order;
- the required chirality flips;
- the flavor invariant;
- and the operator into which it matches.

Without those data, “CKM CP sources the odd Clifford axis” is only a possibility.

## 6. The critical unresolved intertwiner

Furey’s conjugation \(\kappa_u\) acts on

\[
\mathbb C_u=\operatorname{span}_{\mathbb R}\{1,u\}
\]

by

\[
\kappa_u(1)=1,
\qquad
\kappa_u(u)=-u.
\]

This is an internal algebra involution. To use the Lorentz no-go, the programme needs an explicit map

\[
\Xi:
\text{Furey response parity}
\longrightarrow
\text{spacetime }P,\ CP,\ \text{or }CPT\text{ parity}.
\]

The map must be checked on:

- Weyl chirality;
- the Higgs-dressed Dirac exchange;
- gauge charge conjugation;
- Yukawa matrices;
- and the Hermitian stress-response kernel.

Until \(\Xi\) is constructed, “odd under \(\kappa_u\)” should not be called a spacetime pseudoscalar without qualification.

## 7. Conditional selection theorem

If all of the following hold:

1. the response is a vacuum two-point function;
2. its source is the symmetric conserved stress tensor;
3. the Furey-odd link maps to a spacetime pseudoscalar;
4. Lorentz invariance is unbroken;
5. no parity-odd background or boundary is present;

then the odd coefficient vanishes:

\[
R_{\rm odd}(q^2)=0.
\]

The surviving response axis is the even scalar line \(q=1\).

This is the first route that could dynamically favor the document-706 selector over the document-710 selector, but it is explicitly conditional on the missing parity intertwiner.

## 8. Where the odd axis remains open

The odd response can survive in:

- three-point and higher-point stress amplitudes with independent momenta;
- spinning or polarized states;
- thermal or finite-density media with a preferred four-velocity;
- boundaries and defects;
- curved backgrounds with Pontryagin density;
- spacetime-dependent axion-like coefficients;
- or an internal Furey-odd response that is nevertheless a spacetime scalar.

Thus the odd branch should be pinned for the vacuum linear stress kernel, not deleted from the programme.

## 9. Stop-everything criteria

Stop the odd **vacuum linear-stress** branch if the parity intertwiner proves that \(\Gamma_u\) is a spacetime pseudoscalar under the assumptions above.

Stop the even-axis uniqueness claim if:

- \(\Gamma_u\) maps to a spacetime scalar;
- Lorentz symmetry is broken by the relevant state;
- the response is fundamentally higher point;
- or an additional parity-odd background tensor is part of the theory.

Stop any argument that invokes CP violation without constructing a permitted Lorentz tensor and a gauge-invariant matching operator.

## 10. Highest-value next calculations

1. Compute the action of the completed Higgs-dressed antiunitary on the scalar and \(u\)-link Clifford generators.
2. Build the smallest gauge-invariant Hermitian Furey response kernel carrying each parity.
3. Determine whether \(\kappa_u\)-odd maps to Lorentz pseudoscalar, axial, or merely internal-odd scalar.
4. Classify the first nonzero higher-point stress amplitude that can source the odd line.
5. If the vacuum two-point channel is primary, promote the conditional even-axis theorem only after the parity map is certified.

## Companion documents

- [Furey stabilizer leaves a circle of response lines](709_fureys_su3_stabilizer_leaves_a_circle_of_clifford_response_lines_until_conjugation_parity_selects_an_axis.md)
- [Exact odd-axis Clifford selector](710_the_furey_odd_imaginary_axis_also_has_an_exact_cp_h2r_selector_so_positivity_does_not_choose_the_axis.md)
- [Higgs/Yukawa-polar dressed exchange](695_a_higgs_and_yukawa_polar_dressed_dirac_exchange_closes_the_pauli_algebra_without_erasing_ckm_cp.md)
- [Standard Model as stress–energy](01_standard_model_as_stress_energy_full_analysis.md)
