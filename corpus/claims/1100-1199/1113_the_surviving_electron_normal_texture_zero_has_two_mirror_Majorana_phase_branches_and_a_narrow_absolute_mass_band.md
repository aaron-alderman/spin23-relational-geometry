# The Surviving Electron/Normal Texture Zero Has Two Mirror Majorana-Phase Branches and a Narrow Absolute-Mass Band

**Date:** 18 October 2026  
**Branch:** B-SELECTED-FLAVOUR-TEXTURE-ZERO-NUFIT-SPLIT  
**Claim status:** exact triangle reconstruction at the recorded NuFIT 6.0 listed best fit; correlated likelihood inference remains open  
**Certificate:** [solve_electron_normal_texture_zero_phase_branches.mjs](../../../verification/solve/solve_electron_normal_texture_zero_phase_branches.mjs)

## Executive result

The surviving exact electron-selected branch is not merely an interval for the lightest mass. At every interior point it has two discrete Majorana-phase solutions related by complex conjugation. Using the same listed NuFIT 6.0 normal-ordering best fit as [1112](1112_the_selected_flavour_texture_zero_keeps_electron_normal_ordering_open_excludes_electron_inverted_ordering_and_leaves_mu_tau_branches_parameter_dependent.md),

\[
2.34857\text{ meV}\le m_1\le6.46174\text{ meV}.
\]

Across this interval,

\[
61.50\text{ meV}\lesssim\sum_i m_i\lesssim67.81\text{ meV},
\]

and

\[
9.15\text{ meV}\lesssim m_\beta\lesssim10.95\text{ meV}.
\]

The standard light-neutrino Majorana amplitude is exactly

\[
m_{\beta\beta}=|(m_\nu)_{ee}|=0
\]

by construction, while the kinematic beta-decay mass remains nonzero.

## 1. Phase convention

Write

\[
(m_\nu)_{ee}
=A+B e^{i\alpha_{21}}+C e^{i\beta_{\rm eff}},
\]

where

\[
A=m_1c_{12}^2c_{13}^2,
\qquad
B=m_2s_{12}^2c_{13}^2,
\qquad
C=m_3s_{13}^2,
\]

and

\[
\beta_{\rm eff}=\alpha_{31}-2\delta_{CP}.
\]

Only this effective combination enters (m_{ee}). Quoting (alpha_{31}) separately therefore requires the Dirac-phase convention to be stated.

## 2. Exact reconstruction

Triangle closure gives

\[
|A+B e^{i\alpha_{21}}|=C,
\]

so

\[
\boxed{
\cos\alpha_{21}
=\frac{C^2-A^2-B^2}{2AB}.
}
\]

For every interior mass there are two solutions,

\[
\alpha_{21}^{(\pm)}
=\pm\arccos\!\left(
\frac{C^2-A^2-B^2}{2AB}
\right),
\]

and then

\[
\boxed{
\beta_{\rm eff}^{(\pm)}
=\arg\!\left[-\left(A+B e^{i\alpha_{21}^{(\pm)}}\right)\right].
}
\]

The two branches are mirror triangles:

\[
(\alpha_{21},\beta_{\rm eff})
\longleftrightarrow
(-\alpha_{21},-\beta_{\rm eff}).
\]

This is a discrete ambiguity, not a continuous fitted phase freedom once (m_1) and the oscillation parameters are fixed.

## 3. Endpoint geometry

At the lower endpoint,

\[
B=A+C.
\]

The triangle degenerates with

\[
\alpha_{21}=180^\circ,
\qquad
\beta_{\rm eff}=0^\circ.
\]

At the upper endpoint,

\[
A=B+C,
\]

and

\[
\alpha_{21}=180^\circ,
\qquad
\beta_{\rm eff}=180^\circ.
\]

The two mirror solutions coalesce at both endpoints. The branch is therefore a closed two-sheeted arc with branch points at the degenerate triangles.

## 4. Representative interior point

At the arithmetic midpoint

\[
m_1=4.40516\text{ meV},
\]

the two solutions are approximately

\[
(\alpha_{21},\beta_{\rm eff})
=(158.268^\circ,256.302^\circ)
\]

and

\[
(201.732^\circ,103.698^\circ).
\]

Using the listed (delta_{CP}=212^\circ), these become

\[
\alpha_{31}=320.302^\circ
\quad\text{or}\quad
167.698^\circ
\pmod{360^\circ}.
\]

The certificate reconstructs the complex sum at each sample point with residual below (2\times10^{-18}) eV.

## 5. Absolute-mass observables

The kinematic beta-decay mass is

\[
m_\beta^2=\sum_i|U_{ei}|^2m_i^2.
\]

At the two texture endpoints the recorded values are

\[
m_\beta=9.1508\text{ meV}
\quad\text{and}\quad
10.9533\text{ meV}.
\]

The corresponding mass sums are

\[
\sum_i m_i=61.5009\text{ meV}
\quad\text{and}\quad
67.8070\text{ meV}.
\]

These are consequences of the texture plus the listed-best-fit oscillation inputs. They are not claimed as likelihood intervals.

## 6. Relation to the Jordan selector

The phase triangle is the low-energy shadow of a much earlier algebraic distinction:

- one neutral selected face;
- one neutral complementary face;
- one charged cross relation;
- a rank-one complementary quartic gate;
- an aligned seesaw cofactor zero.

The three complex mass contributions are not literally the three Jordan basis elements. The connection is compositional: the Jordan selector constrains the heavy cofactor, seesaw transports that constraint, and PMNS diagonalization expresses it as a three-vector closure condition.

This distinction prevents a seductive but invalid identification of the Majorana triangle with the original (H_2(\mathbb R)) determinant cone.

## 7. Stop-everything criteria

**Phase trigger:** if an independent microscopic calculation fixes either Majorana phase, its curve must intersect one of the two reconstructed sheets. Failure closes the exact aligned electron branch.

**Mass trigger:** a robust determination of normal ordering and a lightest mass inside the narrow interval would make this branch substantially more interesting, but would not by itself establish the Jordan origin.

**Mass stop:** a model-independent lower bound on (m_1) above the upper endpoint, or an upper bound below the lower endpoint, closes the exact branch at the stated oscillation point.

**Mechanism stop:** observation of neutrinoless double-beta decay would not automatically falsify the texture unless the signal is established to arise dominantly from standard light-neutrino exchange.

**Statistics boundary:** a correlated NuFIT 6.1 likelihood scan must replace the listed-best-fit curve before any confidence statement is made.

**NuFIT 6.1 update:** [Claim 1490](../1400-1499/1490_nufit_61_preserves_the_electron_normal_texture_window_and_tightens_its_sampled_envelope.md) moves the listed-best-fit mass interval to (2.34901)--(6.53630) meV and the endpoint mass-sum range to (61.5077)--(67.9377) meV. The two-sheeted phase geometry is unchanged; a correlated likelihood treatment remains open.

## 8. Verdict

The electron/normal branch has become a one-parameter curve with a two-sheeted phase lift:

\[
\boxed{
m_1
\longmapsto
\left\{
(\alpha_{21}^{(+)},\alpha_{31}^{(+)}),
(\alpha_{21}^{(-)},\alpha_{31}^{(-)})
\right\}.
}
\]

Its endpoints, absolute-mass range and phase geometry are fixed once the oscillation inputs are fixed. The next microscopic question is whether the Dirac sector preserves the selected/complementary flag exactly or only approximately.

## Corpus position

- [selected-flavour NuFIT split](1112_the_selected_flavour_texture_zero_keeps_electron_normal_ordering_open_excludes_electron_inverted_ordering_and_leaves_mu_tau_branches_parameter_dependent.md)
- [rank-one seesaw theorem](1111_a_rank_one_complementary_Majorana_block_can_give_three_heavy_masses_but_block_preserving_seesaw_forces_a_selected_flavour_texture_zero.md)
- [Dirac-misalignment lifting theorem](1114_Dirac_misalignment_lifts_the_selected_texture_zero_linearly_only_toward_the_complementary_Majorana_null_line.md)
