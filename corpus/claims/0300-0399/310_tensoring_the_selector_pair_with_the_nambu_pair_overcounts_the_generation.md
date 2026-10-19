# Tensoring the Selector Pair with the Nambu Pair Overcounts the Generation

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B06, B08 and B11  
**Claim status:** exact self-dual kinetic construction and dimension obstruction; simultaneous realization of both antiunitaries on one Furey carrier remains open

## 1. Two doublings cannot be introduced independently

There are now two apparent pairs:

1. the two Furey survivor supports exchanged by \(\Theta_{\rm sel}\);
2. the particle/conjugate pair exchanged by \(\Gamma_{\rm CAR}\).

If these are treated as independent tensor factors, a one-generation space \(K\) of complex dimension 15 becomes

\[
\mathbb C^2_{\rm selector}
\otimes
(K\oplus\bar K)_{\rm Nambu},
\]

of complex dimension

\[
2\times30=60.
\]

The CAR basis projection halves only the Nambu factor, leaving

\[
30
\]

independent annihilation modes. That is two generations’ worth of modes, not one.

Therefore

\[
\boxed{
\text{selector exchange and Nambu conjugation must act on one common doubled carrier,}
}
\]

not on two independently tensored doublings.

## 2. Minimal self-dual kinetic operator

Let \(h=h^\dagger\) be the chiral one-particle kinetic operator on \(K\). On

\[
\mathcal K=K\oplus\bar K,
\]

define

\[
\boxed{
H_{\rm BdG}=\begin{pmatrix}h&0\\0&-\bar h\end{pmatrix}.}
\]

With

\[
\Gamma_{\rm CAR}(v,\bar w)=(w,\bar v),
\]

one has

\[
\boxed{
\Gamma_{\rm CAR}H_{\rm BdG}\Gamma_{\rm CAR}^{-1}
=-H_{\rm BdG}.}
\]

This is the correct self-dual generator condition: because \(\Gamma\) is antiunitary, it makes the induced time evolution commute with the CAR involution.

## 3. Basis projection and chiral modes

The particle projection

\[
P=\begin{pmatrix}I_K&0\\0&0\end{pmatrix}
\]

satisfies

\[
\Gamma_{\rm CAR}P\Gamma_{\rm CAR}=I-P,
\qquad
[H_{\rm BdG},P]=0
\]

in the no-pairing reference model.

Thus \(PK\) contains the 15 independent annihilation modes, the complement contains their adjoints, and the kinetic evolution preserves the chosen polarization.

Pairing or Majorana terms may make \([H,P]\neq0\), but then they must appear as a legitimate Bogoliubov transformation preserving the self-dual condition; they do not authorize a second independent basis projection.

## 4. Why fixing the selector antiunitary does not automatically halve modes

An antiunitary symmetry of the Hamiltonian is not generally a gauge redundancy. Restricting one-particle vectors to \(\Theta_{\rm sel}F=F\) can be appropriate for neutral Majorana degrees of freedom, but not for arbitrary charged chiral fields.

Therefore one cannot repair the 60-to-30 overcount by simply declaring the selector-fixed vectors physical. For charged matter, the independent-mode count must come from the CAR basis projection and conjugate representation structure.

## 5. The common-carrier equations

On one complex 30-dimensional carrier, the required data are:

\[
\Gamma_{\rm CAR}^2=1,
\qquad
\Gamma_{\rm CAR}P\Gamma_{\rm CAR}=I-P,
\]

\[
\Gamma_{\rm CAR}H\Gamma_{\rm CAR}^{-1}=-H,
\]

and a second antiunitary \(\Theta_{\rm sel}\) satisfying an explicitly chosen branch such as

\[
\Theta_{\rm sel}P\Theta_{\rm sel}^{-1}=P
\quad\text{or}\quad
I-P,
\]

\[
\Theta_{\rm sel}H\Theta_{\rm sel}^{-1}=H
\quad\text{or a stated momentum/gauge transform},
\]

together with the known Gram-response intertwining.

These matrix equations are now the target for the 2016-to-2026 Furey intertwiner.

## 6. Two physical branches for \(\Theta_{\rm sel}\)

### Polarization-preserving selector

If

\[
\Theta_{\rm sel}P\Theta_{\rm sel}^{-1}=P,
\]

then the selector acts within the independent chiral particle space. For charged sectors it must be CP twisted or accompanied by an internal automorphism; ordinary gauge commutation is obstructed.

### Polarization-reversing selector

If

\[
\Theta_{\rm sel}P\Theta_{\rm sel}^{-1}=I-P,
\]

then it overlaps the particle/adjoint exchange. Its product with \(\Gamma_{\rm CAR}\) becomes a linear operation within \(PK\), potentially the grading or complex structure classified in the previous branch.

The actual Furey construction must choose one branch. Treating both simultaneously without a common matrix realization risks double counting.

## 7. Consequence for the survivor-pair picture

The two survivor TROs cannot both be an independent selector doublet **and** each carry its own Nambu conjugate completion while still representing one generation. At least one of the following must occur:

1. the survivor pair is already the common self-dual pair after the correct \(C_F\) action is installed;
2. one survivor is a response label rather than an independently quantized one-particle sector;
3. a projection/intertwiner identifies a 30-dimensional common subspace inside the naive 60-dimensional tensor product;
4. the model genuinely predicts an extra generation or mirror sector.

This is the new dimension gate.

## 8. Stop-everything and falsification gates

**Stop-everything trigger:** an explicit 30-dimensional common carrier realizes \(P,H,\Gamma_{\rm CAR},\Theta_{\rm sel}\), the positive Gram map and the CP complex structure with all sign relations verified.

**Projection trigger:** a canonical rank-30 invariant subspace of the naive 60-dimensional tensor product is selected by Furey multiplication or the Jordan triple.

**Overcount falsifier:** independent selector and Nambu factors are tensored while the resulting 30 annihilation modes are still called one 15-mode generation.

**Kinetic falsifier:** the proposed CAR Hamiltonian fails \(\Gamma H\Gamma=-H\).

**Charged-fixed-point falsifier:** a selector-fixed real subspace is used to halve arbitrary charged Weyl modes without gauge analysis.

## 9. Certificate

The [common-carrier dimension/BdG certificate](../../../verification/verify/verify_common_carrier_dimension_trap_and_bdg_kinetic.mjs) checks the minimal self-dual kinetic equation, complementary basis projection, preserved no-pairing polarization and the 60-to-30 independent-factor overcount.

## Companion documents

- [Response selector versus CAR adjoint](307_the_response_selector_and_the_car_adjoint_are_two_distinct_antiunitaries.md)
- [Two real structures: grading or complex structure](308_two_real_structures_generate_either_a_grading_or_a_complex_structure.md)
- [Anomaly cancellation is mirror blind](309_anomaly_cancellation_cannot_distinguish_a_car_adjoint_from_an_independent_mirror_generation.md)
- [Furey conjugation supplies the Nambu map](../0100-0199/166_furey_complex_conjugation_repairs_nambu_but_not_neutral_exchange.md)
