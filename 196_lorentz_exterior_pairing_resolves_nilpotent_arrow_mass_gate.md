# Lorentz Exterior Pairing Resolves the Nilpotent-Arrow Mass Gate

**Date:** 17 October 2026  
**Branches:** B03, B05 and B11  
**Claim status:** exact Grassmann/Lorentz versus internal-product separation; source-derived action pairing remains open

## 1. The apparent contradiction

The selected sterile arrow satisfies

\[
n_A^2=0
\]

as an internal matrix unit. Yet an ordinary left-handed Weyl field \(N_\alpha\) admits the nonzero Lorentz scalar

\[
NN
:=
\epsilon^{\alpha\beta}N_\alpha N_\beta.
\]

There is no contradiction. These products live in different algebras:

- \(n_A^2\) is composition in the finite internal block algebra;
- \(N_\alpha N_\beta\) is multiplication in the Grassmann exterior algebra of field components;
- the action must combine the Lorentz exterior product with a pairing on the internal matter module, not with naive internal arrow multiplication.

## 2. One Weyl field squares nontrivially as a Lorentz scalar

Let the two spin components be independent Grassmann generators \(N_1,N_2\). Then

\[
N_1N_2=-N_2N_1,
\qquad
N_1^2=N_2^2=0.
\]

With \(\epsilon^{12}=1\),

\[
\epsilon^{\alpha\beta}N_\alpha N_\beta
=N_1N_2-N_2N_1
=2N_1N_2
\ne0.
\]

Thus “a Grassmann field anticommutes” does not make its Majorana bilinear vanish. The antisymmetric spinor tensor compensates the antisymmetric field product.

## 3. Grassmann-valued internal field

Represent the sterile field schematically as

\[
\mathsf N_\alpha(x)=N_\alpha(x)n_A.
\]

Naive associative multiplication gives

\[
\mathsf N_\alpha\mathsf N_\beta
=N_\alpha N_\beta n_A^2
=0.
\]

Therefore ordinary block multiplication cannot be the complete interaction rule for chiral matter coefficients. This is not a failure of the Majorana mass; it is a failure of the proposed internal multiplication rule.

## 4. The correct structural form

A quadratic matter action uses a bilinear pairing \(B\) on internal supports:

\[
S_M
\supset
-\frac12
\int d^4x\,
M\,
\epsilon^{\alpha\beta}
N_\alpha N_\beta
B(n_A,n_A)
+\text{h.c.}
\]

For the normalized one-dimensional support, one may use the adjoint dual to define

\[
B(n_A,n_A)
:=
\operatorname{Tr}(n_A^\dagger n_A)
=1.
\]

Here \(n_A^\dagger\) is part of the fixed dual/observable structure. It does not carry a second independent Grassmann coefficient. The holomorphic field factor remains \(N_\alpha N_\beta\).

This is analogous to using an inner product to contract representation indices without declaring the dual basis vector to be another particle species.

## 5. Dirac/Yukawa term

For two distinct Weyl fields \(\nu_\alpha\) and \(N_\alpha\),

\[
\epsilon^{\alpha\beta}\nu_\alpha N_\beta
=\nu_1N_2-\nu_2N_1
\ne0.
\]

The Furey neutrino Yukawa triangle selects the compatible internal supports and Higgs incidence. The Lorentz contraction and internal cyclic contraction perform different jobs:

- the block cycle enforces gauge/incidence compatibility;
- \(\epsilon^{\alpha\beta}\) creates the Lorentz scalar;
- Grassmann multiplication supplies fermionic statistics.

No one of these layers can replace the others.

## 6. Minimal local neutral action

With one active and one sterile Weyl field, the local action is

\[
\mathcal L
=
i\nu^\dagger\bar\sigma^\mu D_\mu\nu
+iN^\dagger\bar\sigma^\mu\partial_\mu N
-m_D\nu N
-\frac12M_RNN
+\text{h.c.}
\]

Only \(\nu\) and \(N\) are independent left-handed field generators. Their adjoints appear because the action is Hermitian, not because a mirror pair has been added.

The internal data support:

- \(m_D\) through the neutrino Yukawa triangle;
- \(M_R\) through a bilinear pairing on the neutral arrow support;
- the Nambu operator through \(n_A\) and \(n_A^\dagger\) in the observable star algebra.

## 7. Consequence for the quadratic-cycle claim

The earlier statement that one oriented survivor cannot form a nonzero **internal holomorphic trace** from \(n_A n_A\) remains true. Its physical interpretation must be narrowed:

\[
n_A^2=0
\quad\not\Longrightarrow\quad
NN=0.
\]

A reverse-arrow two-cycle is one way to represent Hermitian/Nambu operator structure, but it is not required as a second matter arrow for the existence of the physical Majorana bilinear.

Therefore a universal rule that every fermion mass must be an ordinary cyclic product of matter arrows is falsified by the standard Weyl construction unless that rule is enlarged to include Lorentz exterior products and module pairings.

## 8. What the source algebra must still provide

The pairing \(B\) cannot simply be inserted without scrutiny. A successful Furey/Jordan action should derive:

1. the appropriate dual or real structure on the matter TRO;
2. why the sterile support admits a symmetric Majorana coefficient;
3. why charged representations do not acquire forbidden gauge-violating self-pairings;
4. compatibility with family flavor tensors;
5. locality, Hermiticity and the chosen CAR representation.

Gauge invariance already distinguishes the neutral singlet, but it does not fix \(M_R\), its flavor matrix or its phase.

## 9. Stop-everything and falsification gates

**Action success:** a source-derived bilinear pairing reproduces all allowed Weyl, Dirac and Majorana terms with their correct gauge selection rules.

**No-doubling success:** the pairing uses the dual arrow without an independent Grassmann integration variable and preserves the dimension-16 matter count.

**Flavor success:** the same pairing principle constrains the multi-generation Majorana and exceptional tensors rather than admitting arbitrary spurions.

**Cyclic-rule failure:** if the theory insists on ordinary internal multiplication alone, the sterile Majorana mass vanishes despite being allowed by Lorentz and gauge symmetry.

**Overpairing failure:** an unrestricted bilinear pairs charged matter with itself and generates gauge-forbidden masses.

## 10. Certificate

The [Lorentz-exterior pairing certificate](scripts/verify_lorentz_exterior_pairing_mass_gate.mjs) implements the four-generator Grassmann exterior algebra, proves the nonzero Weyl self-contraction and Dirac contraction, verifies nilpotence of the internal arrow and confirms that the normalized adjoint pairing is nonzero without adding a second field coefficient.

## Companion documents

- [Local CAR realization and matter-TRO enlargement](195_local_car_realization_and_matter_tro_enlargement_gate.md)
- [Neutral Fock action and response separation](171_neutral_fock_action_and_positive_response_separation.md)
- [Exchange-paired neutrino two-cycle](170_exchange_paired_neutrino_two_cycle_and_majorana_gate.md)
- [Dagger versus independent mirrors](151_dagger_antiparticle_vs_mirror_distinction.md)
