# Furey Complex Conjugation Supplies the Nambu Map—but Not the Neutral Exchange

**Date:** 17 October 2026  
**Branches:** B03 and B11  
**Claim status:** source-derived conjugate gauge/Lorentz map in the earlier Furey model; compatibility with the 2026 neutral exchange remains conditional

## 1. Result

The CAR audit showed that the bare survivor exchange cannot identify fields with adjoints because it preserves, rather than reverses, gauge charges. Furey's earlier division-algebra construction contains a different anti-linear operation that repairs exactly this defect.

The source-derived complex conjugation

\[
*:\ i\mapsto-i
\]

acts simultaneously on the complex-quaternionic Lorentz factor and complex-octonionic internal factor. It sends

\[
\Psi_L\longleftrightarrow\Psi_R
\]

and

\[
S^u\longleftrightarrow S^d.
\]

Consequently it reverses both Lorentz chirality and internal gauge representation:

\[
\boxed{
C_F:
(\tfrac12,0;R_y)
\longmapsto
(0,\tfrac12;\overline R_{-y}).
}
\]

This is the transformation type needed by a self-dual CAR or Nambu conjugation.

It is not the same operation as

\[
s:O_1\leftrightarrow R.
\]

## 2. Lorentz conjugation is internal to the complex-quaternion basis

In the ordinary column-vector description, conjugating a left-handed Weyl spinor requires coefficient conjugation followed by multiplication by \(-i\sigma_y\). In Furey's \(\mathbb C\otimes\mathbb H\) basis, complex conjugation acts on both coefficients and basis elements. The basis transformation already contains the \(-i\sigma_y\) operation, giving

\[
\Psi_L^*=\Psi_R^{\,c},
\qquad
(\Psi_L^*)^*=\Psi_L.
\]

Thus no separate basis-dependent epsilon tensor has to be inserted after the algebraic basis is chosen.

This provides a genuine source-level map between the two Weyl representations, rather than merely a dimension match.

## 3. Internal conjugation exchanges the two minimal ideals

For the complex-octonionic ladder system, complex conjugation changes

\[
\alpha_i\mapsto\alpha_i^*
\]

and exchanges the two primitive-idempotent ideals

\[
S^u=Cl(6)\,\omega\omega^\dagger,
\qquad
S^d=Cl(6)\,\omega^\dagger\omega.
\]

Their representation contents are conjugate:

\[
S^u:
\mathbf1_0\oplus\overline{\mathbf3}_{1/3}
\oplus\mathbf3_{2/3}\oplus\mathbf1_1,
\]

\[
S^d:
\mathbf1_0\oplus\mathbf3_{-1/3}
\oplus\overline{\mathbf3}_{-2/3}\oplus\mathbf1_{-1}.
\]

This is precisely the charge/color conjugation missing from the same-charge survivor exchange.

## 4. The conditional composite antiunitary

On a carrier supporting both structures, define

\[
\Gamma=s\,C_F,
\]

where

- \(C_F\) reverses Lorentz chirality and gauge representation;
- \(s\) exchanges the two neutral survivor labels;
- \(s\) is complex linear and gauge trivial;
- \(C_F\) is anti-linear and squares to one.

If \(s\) is real in the \(C_F\)-adapted basis, then

\[
[s,C_F]=0,
\qquad
\Gamma^2=1.
\]

Moreover,

\[
\Gamma\rho(g)\Gamma^{-1}=\overline{\rho(g)},
\]

so \(K\oplus\overline K\) can carry the ordinary gauge-equivariant self-dual CAR structure.

At the representation level, this closes the mathematical gap found in the previous cycle.

## 5. Why this is not yet a unified derivation

The two ingredients come from distinct constructions:

1. \(C_F\) is explicit in the 2016 tensor-product algebra
   \[
   \mathbb R\otimes\mathbb C\otimes\mathbb H\otimes\mathbb O;
   \]
2. \(s\) appears only after the 2026 direct-sum source
   \[
   \mathbb O\oplus\mathbb H\oplus\mathbb C\oplus\mathbb R
   \]
   is embedded linearly into a completed sixteen-real-dimensional carrier.

No source currently supplies an explicit intertwiner that identifies the 2016 minimal-ideal basis with the 2026 five-block carrier while preserving:

- the full Standard-Model action;
- the selected matter TRO;
- the Lorentz ideals;
- the inner product and CAR form;
- the Higgs/Yukawa cycles;
- the external reciprocal real structure.

The composite \(\Gamma=sC_F\) is therefore a mathematically valid conditional construction, not yet a canonical output of one algebra.

## 6. A useful factorization

The emerging antiunitary is not one mysterious operation. It factorizes into three conceptually distinct maps:

\[
\Gamma_{\rm total}
=
\underbrace{\kappa_{\rm ext}}_{\text{reciprocity/orientation}}
\otimes
\underbrace{C_F}_{\substack{\text{Lorentz chirality}\\\text{and gauge conjugation}}}
\circ
\underbrace{s}_{\text{neutral survivor exchange}}.
\]

This factorization is valuable even if the full synthesis fails, because it prevents three unrelated requirements from being hidden under the single word “conjugation.”

## 7. Branch decision

- **Closed:** the neutral exchange alone is a CAR adjoint.
- **Established:** Furey's complex conjugation supplies a source-derived gauge- and Lorentz-conjugate ideal pair.
- **Conditionally open:** \(sC_F\) defines the required Nambu involution on a common completed carrier.
- **Pinned:** a canonical intertwiner between the 2016 tensor-product ideals and the 2026 nested carrier.

The next calculation should not invent another antiunitary. It should attempt to construct this intertwiner explicitly or prove that the two module decompositions are incompatible.

## 8. Stop-everything and falsification gates

**Stop-everything positive:** a unique equivariant isometry embeds the 2016 one-generation ideal pair into the 2026 endomorphism carrier, carries \(C_F\) to the physical CAR adjoint, carries the residual neutral involution to \(s\), and agrees with external reciprocity on the common real form.

**Partial success:** the intertwiner exists but has a nontrivial commutant; additional boundary or Jordan data must select it.

**No-go:** the chirality, hypercharge or multiplication gradings of the two constructions are incompatible, so no intertwiner can preserve all required structures.

**Physical failure:** the resulting fixed CAR algebra has the wrong anomaly, an independent mirror spectrum or no local Lorentz-covariant kinetic term.

## 9. Certificate

The [Furey conjugation/Nambu certificate](../../../verification/verify/verify_furey_conjugation_nambu_repair.mjs) encodes the two minimal-ideal representation tables, verifies charge and color conjugation, verifies Weyl-chirality reversal, checks involutivity and confirms that composing with the neutral permutation does not alter the gauge-conjugation property.

## 10. Primary source

The conjugation actions are given in C. Furey, [*Standard model physics from an algebra?*](https://arxiv.org/abs/1611.09182), arXiv:1611.09182 (2016), especially sections 3.5.3, 6.5 and 6.6.

## Companion documents

- [Exchange-fixed CAR gauge-equivariance obstruction](165_exchange_fixed_car_gauge_equivariance_obstruction.md)
- [Furey conjugate-ideal extension](../0000-0099/63_furey_conjugate_ideal_extension.md)
- [Canonical real-structure commutant model](../0000-0099/65_canonical_real_structure_commutant_model.md)
- [Furey real-form obstruction and carrier escape](163_furey_real_form_obstruction_and_complex_carrier_escape.md)

