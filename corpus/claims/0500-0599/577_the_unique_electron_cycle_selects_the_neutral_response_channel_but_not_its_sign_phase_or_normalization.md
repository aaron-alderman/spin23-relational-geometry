# The Unique Electron Cycle Selects the Neutral Response Channel but Not Its Sign, Phase or Normalization

**Date:** 17 October 2026  
**Branches:** B01, B02, B03, B04, B06, B08, B11 and B14  
**Claim status:** exact selection/no-go theorem under the cyclic trace rule; a physical response kernel remains required

## Executive result

The strongest 15-state selector combines:

1. the unique \(M_2(\mathbb C)\) linking factor from the \(e^c\) edge;
2. the unique charged-lepton cycle
   \[
   C\xrightarrow{e^c}E
   \xrightarrow{L}H
   \xrightarrow{h_C^\dagger}C;
   \]
3. the gauge-neutral dressed response faces
   \[
   \widetilde\chi_L=\frac{\sqrt2}{v}H^\dagger L,
   \qquad
   \widetilde\chi_R=e^{c\dagger}.
   \]

Together these data distinguish the electron response from the six channel/sign maps available in the 15-state branch.

However, the cyclic rule used so far is only

\[
\operatorname{Tr}(e^cLh_C^\dagger)\neq0.
\]

This predicate is invariant under arbitrary nonzero rescaling of every edge and under every sign choice. It selects incidence, not metric data. Even after TRO normalization fixes individual edge moduli, one cycle \(U(1)\) holonomy remains.

Therefore:

\[
\boxed{
\text{unique }M_2+\text{cyclic electron incidence}
\Longrightarrow
\text{electron channel},
}
\]

but it does not determine the neutral Gram arrow's sign, phase, magnitude or spectral normalization.

The electron channel is selected conditionally; the physical electron Yukawa and response kernel are not predicted.

## 1. Weighted triangle model

Let the three one-dimensional block arrows carry nonzero complex weights

\[
\alpha:C\to E,
\qquad
\beta:E\to H,
\qquad
\gamma:H\to C.
\]

The cyclic trace is proportional to

\[
P=\alpha\beta\gamma.
\]

The topology rule tests only

\[
P\neq0.
\]

For arbitrary nonzero scalars \(r_\alpha,r_\beta,r_\gamma\), rescaling the three arrows preserves this predicate. Therefore the rule cannot fix any individual modulus or the product modulus.

Likewise, all eight edge-sign assignments preserve nonvanishing. An odd number of sign flips changes

\[
P\mapsto-P
\]

without changing whether the cycle exists.

## 2. Vertex rephasing and cycle holonomy

Assign phases \(\theta_C,\theta_E,\theta_H\) to the three block bases. Edge weights transform as

\[
\alpha\mapsto e^{i(\theta_E-\theta_C)}\alpha,
\]

\[
\beta\mapsto e^{i(\theta_H-\theta_E)}\beta,
\]

\[
\gamma\mapsto e^{i(\theta_C-\theta_H)}\gamma.
\]

Their product is invariant because the phase differences telescope:

\[
P\mapsto P.
\]

The three edge phases minus the two independent vertex-phase differences leave one gauge-invariant cycle holonomy \(\arg P\). The mere condition \(P\neq0\) places no restriction on that holonomy.

## 3. TRO normalization does not finish the job

If each one-dimensional arrow is normalized as a TRO partial isometry, then

\[
|\alpha|=|\beta|=|\gamma|=1.
\]

This removes three modulus choices inside the abstract block algebra, but

\[
P\in U(1)
\]

remains arbitrary. More importantly, physical fields and Yukawa coefficients multiply the normalized matrix units by independent dimensionful and dimensionless couplings.

TRO normalization is therefore not a prediction of the electron Yukawa magnitude or of a response residue.

## 4. Neutral Gram arrow

The electron response is

\[
G_e=
\begin{pmatrix}
\langle\widetilde\chi_L,\widetilde\chi_L\rangle&Z_e\\
\bar Z_e&\langle\widetilde\chi_R,\widetilde\chi_R\rangle
\end{pmatrix},
\]

with

\[
Z_e=\langle\widetilde\chi_L,\widetilde\chi_R\rangle.
\]

The real finite arrow maps to \(\operatorname{Re}Z_e\). An independent right-face rephasing

\[
\widetilde\chi_R\mapsto e^{i\delta}\widetilde\chi_R
\]

rotates \(Z_e\). The one-generation Yukawa coefficient transforms oppositely, so the physical product is unchanged:

\[
y_e\mapsto e^{-i\delta}y_e,
\qquad
Z_e\mapsto e^{i\delta}Z_e,
\qquad
y_eZ_e\mapsto y_eZ_e.
\]

Choosing \(y_e>0\) is always possible for one generation. It is a field convention, not a derived arrow orientation.

## 5. What is genuinely selected

The conjunction of the unique linking factor and cyclic topology establishes:

- the charged-lepton internal component;
- the endpoint incidence \(C\to E\to H\to C\);
- the unique renormalizable Higgs dressing involving \(e^c\);
- the response faces \(H^\dagger L\) and \(e^{c\dagger}\);
- a gauge-neutral positive \(H_2\) response codomain.

This reduces the 15-state channel ambiguity from \(u,d,e\) to the electron channel, conditional on requiring compatibility with the unique internal \(M_2\) factor.

It does not establish an absolute phase or sign of \(Z_e\), the value of \(|y_e|\), a two-point residue, a Ward normalization, or a momentum-dependent response kernel.

## 6. Relation to flavor

With several generations, not all Yukawa phases are removable simultaneously once neutrino and quark mixing are included. Relative cycle holonomies can then carry physical CP information.

But the face Jordan carrier must remain real while flavor matrices remain complex. A successful extension would have the form

\[
H_2(\mathbb R)_{\rm face}
\widehat\otimes
\operatorname{Herm}_3(\mathbb C)_{\rm flavor}.
\]

The single electron triangle cannot determine the multi-cycle flavor holonomies by itself.

## 7. Dependency graph

\[
\begin{array}{c}
\text{unique 15-state }M_2(\mathbb C)\\
\downarrow\\
\text{charged-lepton edge }e^c\\
\downarrow\ \text{cyclic trace rule}\\
C\to E\to H\to C\\
\downarrow\ \text{Higgs dressing}\\
(H^\dagger L,e^{c\dagger})\\
\downarrow\ \text{Gram contraction}\\
H_2(\mathbb R)_+\\
\downarrow\\
\text{channel selected; sign/scale/kernel still free}.
\end{array}
\]

The missing final selector must come from dynamics or a normalized source, not incidence alone.

## 8. Claim ledger

### Established

- the 15-state linking algebra has one \(M_2(\mathbb C)\) factor;
- it is the charged-lepton factor;
- the cyclic rule selects the charged-lepton topology and Higgs dressing;
- the corresponding dressed response is gauge neutral and positive;
- all eight edge-sign choices preserve the nonzero-cycle predicate;
- arbitrary nonzero edge rescalings preserve the predicate;
- vertex-basis phases leave the cycle product invariant;
- TRO normalization leaves one cycle phase;
- a one-generation field rephasing rotates the Gram arrow while the compensating Yukawa coefficient leaves physical amplitudes invariant.

### Conditional selection

- compatibility with the unique internal \(M_2\) factor selects the electron neutral response rather than the up or down response.

### Not established

- why the action contains only cyclic block traces;
- the electron Yukawa magnitude;
- the response arrow sign or phase;
- a Ward-normalized two-point kernel;
- stress-energy normalization;
- multi-generation relative holonomies.

## 9. Stop-everything and falsification gates

### Stop-everything positive

Derive from one covariant action a Ward-normalized charged-lepton spectral kernel whose off-diagonal residue has a fixed orientation relative to the finite arrow and whose normalization is tied to another measured or arithmetic invariant rather than fitted independently.

### Falsifiers

- cyclic nonvanishing is claimed to fix a coefficient magnitude;
- a basis-removable one-generation sign is advertised as a prediction;
- normalized internal matrix units are identified with physical Yukawa couplings;
- the electron response fails spectral positivity or Ward identities once spinor and contact terms are restored;
- compatibility with the unique \(M_2\) factor does not survive the physical Furey-to-response functor.

## 10. Pinned branch and continuation

The unique-factor/cyclic-incidence selector succeeds at choosing the electron channel and stops there. The sign, phase and normalization branch is pinned pending a physical kernel.

The next productive direction is a Ward-normalized or Källén–Lehmann calculation for the dressed electron face pair, or an independent common stress source aligning several channel responses.

## Certificate and companions

- [Electron cycle orientation certificate](../../../verification/verify/verify_electron_cycle_selects_channel_not_gram_orientation.mjs)
- [Cyclic Yukawa topology](../0100-0199/111_furey_cyclic_yukawa_topology_selection.md)
- [Dressed charged-lepton response](../0100-0199/118_dressed_charged_lepton_h2_response.md)
- [Binary Peirce/Yukawa Gram embeddings](576_the_binary_peirce_carrier_embeds_in_neutral_yukawa_gram_responses_but_channel_orientation_remains_unselected.md)
- [Unique \(M_2\) linking factor](../0100-0199/116_unique_m2_linking_factor_to_h2r_spin23.md)
