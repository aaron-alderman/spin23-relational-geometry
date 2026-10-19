# The Two Surviving Furey TROs Form an Antiunitary Exchange Pair

**Date:** 17 October 2026  
**Branches:** B03 and B11  
**Claim status:** exact block-incidence exchange; subsequently proved not to extend to the native real direct-sum algebra, while remaining exact on the completed complex carrier

## 1. The two survivors

After anomaly, ternary-closure and cyclic-Yukawa selection, two one-generation topologies remain. They share

\[
Q:H\to O_2,
\qquad
u^c:O_2\to C.
\]

Choose labels

\[
\mathcal M_A:
\quad
d^c:O_2\to O_1,
\quad
L:R\to H,
\quad
e^c:C\to R,
\]

and

\[
\mathcal M_B:
\quad
d^c:O_2\to R,
\quad
L:O_1\to H,
\quad
e^c:C\to O_1.
\]

Both have complex dimension fifteen.

## 2. Exact neutral-label exchange

Define the block-label permutation

\[
s:O_1\leftrightarrow R
\]

with (C,H,O_2) fixed. Then

\[
\boxed{
s(\mathcal M_A)=\mathcal M_B,
\qquad
s(\mathcal M_B)=\mathcal M_A.
}
\]

The exchange also maps the complete up, down and charged-lepton cycles of one topology to the cycles of the other.

This is exact at the directed block-incidence level.

## 3. Dagger is not the exchange

The natural dagger reverses every arrow:

\[
V_a\leftarrow V_b
\mapsto
V_b\leftarrow V_a.
\]

It maps neither (mathcal M_A) to itself nor (mathcal M_A) to (mathcal M_B). Therefore the required internal antiunitary cannot be “dagger alone.”

A candidate must combine coefficient conjugation with the neutral-label exchange and possibly the Lorentz charge-conjugation operation.

## 4. Exchange antiunitary

On the direct sum

\[
\mathcal M_A\oplus\mathcal M_B,
\]

define schematically

\[
Θ_{\rm ex}(v_A,v_B)
=
(\overline{v_B},\overline{v_A}).
\]

Then

\[
Θ_{\rm ex}^2=1.
\]

Its fixed vectors obey

\[
v_B=\overline{v_A}.
\]

Although the ambient direct sum has complex dimension thirty, the fixed space has real dimension thirty—the same number of real degrees of freedom as one complex fifteen-dimensional generation.

Therefore antiunitary exchange need not introduce an independent doubled generation. It resembles a real or Nambu presentation in which the second support is determined by the first.

## 5. Complex coefficients need not become real

If one topology carries a coefficient

\[
y=a+ib,
\]

the exchanged topology carries

\[
\overline y=a-ib.
\]

The fixed-pair condition does not require (b=0). It pairs complex coefficients rather than projecting each coefficient to its real part.

This is precisely the behavior needed if an antiunitary structure is to coexist with complex flavor data. It does not by itself prove that a nonzero Jarlskog invariant survives the complete action.

## 6. The major caveat

The two neutral blocks (O_1) and (R) have equal dimensions in the block inventory, and their exchange is an exact symmetry of the two surviving support patterns. But they arise from different positions in the nested division-algebra construction.

The source-level question has now been answered for the native real algebra. The exchange does **not** extend to an automorphism or anti-automorphism of

\[
\mathbb O\oplus\mathbb H\oplus\mathbb C\oplus\mathbb R
\]

because the octonionic complex line and terminal real summand have different real dimensions and belong to distinct source ideals. It remains true that the carrier exchange has not been shown to preserve every dynamical structure, including:

\[
O_1\leftrightarrow R
\]

extends to:

- a symmetry of Furey's gauge generators;
- a symmetry of the cyclic trace action;
- a Lorentz-compatible charge-conjugation operator;
- a symmetry of the Higgs locking terms.

On the completed eight-complex-dimensional carrier the two blocks are isomorphic trivial gauge modules, so the exchange is exact there. It is therefore a sharply defined emergent-carrier candidate, not a source-derived real-algebra symmetry. See the [real-form obstruction and carrier escape](163_furey_real_form_obstruction_and_complex_carrier_escape.md).

A later full-real-form audit identifies the induced observable fixed algebra exactly: on the survivor-pair index \(\Theta_{\rm ex}=\sigma_xK\), and its Hermitian fixed points are the charge-compatible population-normal copy of \(H_2(\mathbb R)\) with equal diagonal survivor weights and arbitrary complex relationship. See [Furey survivor exchange induces the charge-compatible population-normal real form](303_furey_survivor_exchange_induces_the_charge_compatible_population_normal_real_form.md).

## 7. Combined external/internal selector

The emerging candidate is

\[
Θ
=
κ_{\rm external}
\otimes
Θ_{\rm ex,internal}.
\]

Externally, (κ) fixes the reciprocal (H_2(\mathbb R)) response. Internally, (Θ_{\rm ex}) pairs the two Furey survivors without forcing each complex coefficient real.

The construction must still show that the fixed theory contains:

- one independent chiral generation rather than a hidden vectorlike pair;
- the correct adjoint/antiparticle interpretation;
- nonzero physical flavor CP violation;
- gauge-covariant Higgs coins;
- correct zero- and π-sector anomaly flow.

## 8. Stop-everything and falsification gates

**Source derivation:** falsified for automorphisms of the native real direct-sum algebra; replace it with the sharper question of whether the sixteen-real-dimensional carrier completion canonically forces the exchange.

**Physical real structure:** construct the Fock antiunitary and show its fixed CAR algebra contains fifteen—not thirty—independent chiral generators.

**CP success:** extend to three families and retain a nonzero basis-invariant Jarlskog quantity.

**No-go:** the neutral exchange fails to preserve multiplication, cyclic traces or gauge generators, leaving no canonical (Θ_{\rm internal}).

**Mirror failure:** the exchange-fixed Fock theory is actually vectorlike or contains an independent conjugate generation.

## 9. Certificate

The [Furey survivor-exchange certificate](scripts/verify_furey_survivor_exchange_antiunitary.mjs) verifies the support exchange, cyclic closure, dagger failure, fixed-space dimension and preservation of arbitrary complex coefficients as conjugate pairs.

## Companion documents

- [Four anomaly-free one-generation TROs](110_furey_anomaly_free_one_generation_tros.md)
- [Cyclic Yukawa topology selection](111_furey_cyclic_yukawa_topology_selection.md)
- [Antiunitary reciprocity selector](161_antiunitary_reciprocity_selector_and_five_directions.md)
- [Dagger closure: antiparticles versus mirrors](151_dagger_antiparticle_vs_mirror_distinction.md)
- [Real-form obstruction and complex-carrier escape](163_furey_real_form_obstruction_and_complex_carrier_escape.md)
