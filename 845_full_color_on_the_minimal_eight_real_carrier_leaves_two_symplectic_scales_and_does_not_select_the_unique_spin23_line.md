# Full Color on the Minimal Eight-Real Carrier Leaves Two Symplectic Scales and Does Not Select the Unique Spin(2,3) Line

**Date:** 17 October 2026  
**Branches:** full-color bilocal response, invariant bilinears, symplectic selection, and sector locking  
**Claim status:** exact invariant-space classification; dynamical singlet–triplet locking remains open  
**Certificate:** [classify_full_su3_invariant_bilinears_on_the_minimal_eight_real_singlet_triplet_carrier.mjs](scripts/classify_full_su3_invariant_bilinears_on_the_minimal_eight_real_singlet_triplet_carrier.mjs)

## Executive result

Passing to the minimal full-color eight-real carrier repairs the representation problem of document 844, but full \(SU(3)_c\) still does not select a unique symplectic form.

For

\[
V=(\mathbf1\oplus\mathbf3)_{\mathbb R},
\qquad \dim_{\mathbb R}V=8,
\]

the complete invariant alternating space has dimension two:

\[
(\Lambda^2V^*)^{SU(3)}
=
\mathbb R K_s\oplus\mathbb R K_t.
\]

Here \(K_s\) is the area form on the two-real-dimensional complex singlet plane and \(K_t\) is the imaginary Hermitian form on the six-real-dimensional triplet.

Every

\[
K_{a,b}=aK_s+bK_t
\]

with \(ab\ne0\) is nondegenerate. Color symmetry fixes neither \(b/a\) nor an overall scale.

Therefore

\[
\boxed{
SU(3)_c\text{ invariance}
\not\Longrightarrow
\text{a unique symplectic line on singlet plus triplet response}.
}
\]

The triplet alone has a unique invariant symplectic line, but discarding the singlet contradicts the programme's requirement to retain the lepton/singlet response.

## 1. Exact calculation

The certificate realifies the complex module \(\mathbf1\oplus\mathbf3\) and imposes

\[
g^TK+Kg=0
\]

on a general 28-parameter real alternating matrix, using compact real forms of two color Cartan generators and four simple-root generators.

The nullspace has dimension exactly two. Explicit generators have ranks

\[
\operatorname{rank}K_s=2,
\qquad
\operatorname{rank}K_t=6.
\]

Their sum is rank eight. No invariant cross-sector alternating bilinear exists.

This is the full Lie-algebra invariant space, not a sampled subgroup result.

## 2. Symmetric response space

The invariant real symmetric bilinear space has dimension four:

\[
\dim(\operatorname{Sym}^2V^*)^{SU(3)}=4.
\]

It consists of:

- three arbitrary symmetric forms on the pointwise-trivial two-real singlet plane;
- one scalar metric on the irreducible triplet realification;
- no singlet–triplet cross bilinear.

If an additional singlet phase symmetry is imposed, its three-dimensional symmetric freedom reduces to one metric, but the relative singlet/triplet normalization remains free.

Thus neither the positive response metric nor the alternating structure is unified by color alone.

## 3. Consequence for bilocal triplet–antitriplet contraction

The basic color-singlet bilocal contraction

\[
\mathbf3\otimes\bar{\mathbf3}\to\mathbf1
\]

is unique up to scale. It isotropically traces color; it does not leave three independent color-labelled relationship orientations. Alongside the singlet–singlet contraction, it produces two decoupled invariant sectors.

So the minimal full-color bilocal construction naturally gives

\[
\text{singlet response}\oplus\text{triplet-trace response},
\]

not the unique four-dimensional relationship carrier by itself.

The desired pole requires an extra relation locking these sectors. Candidates include:

- the neutral Furey topology exchange;
- a Higgs-dressed singlet–triplet response kernel;
- a Ward identity or ultraviolet sum rule fixing the relative normalization;
- a common stress-energy coupling;
- a source-derived Schur/Feshbach elimination relating the two sector forms.

## 4. Relation to the quadratic \(C_3\) selector

The three-leg \(C_3\) twirl of document 839 has a one-dimensional alternating fixed space on its four-real carrier. Full \(SU(3)\) averaging on the minimal upstream carrier instead has a two-dimensional alternating fixed space.

This means the three-leg selector is not simply the Haar color average written in a small basis. Some additional reduction or symmetry breaking must occur between the full-color bilocal theory and the four-real response.

The new dependency chain is

\[
SU(3)\text{ upstream carrier}
\Longrightarrow
K_s\oplus K_t
\xRightarrow{\text{sector lock}}
K_{a,b}
\xRightarrow{\text{response reduction}}
J_0.
\]

Both arrows after the first remain to be derived.

## 5. Stop-everything criteria

**Positive trigger:** an independently required Furey, Higgs, Ward or stress-energy relation fixes \(b/a\), and a typed reduction sends the resulting nondegenerate \(K_{a,b}\) to the unique \(J_0\) line.

**Negative trigger:** all admissible full-gauge bilocal kernels remain block diagonal with independently renormalized singlet and triplet coefficients. Then full color cannot explain the unique pole without an additional non-gauge selector.

**Falsifier:** a third independent invariant alternating form, an invariant singlet–triplet cross form, or uniqueness of \(K_{a,b}\) from color alone. The complete linear invariant calculation excludes all three.

## 6. Verdict

| Question | Verdict |
|---|---|
| Does the eight-real carrier support full color symplectically? | **yes** |
| How many invariant alternating directions survive? | **two** |
| Is there an invariant cross-sector pairing? | **no** |
| Does color fix the relative symplectic scale? | **no** |
| Does triplet-only color have a unique line? | **yes, but it loses the singlet** |
| Is an additional sector-locking mechanism required? | **yes** |

## 7. Position in the corpus

- [full color cannot live on the same real four-carrier](844_the_discrete_color_cycle_quotient_cannot_be_promoted_to_full_su3_on_the_same_real_symplectic_four_carrier.md)
- [the discrete quotient is feasible but nonunique](843_a_color_equivariant_split_quotient_can_lift_the_quadratic_selector_but_is_highly_nonunique_and_not_yet_gauge_typed.md)
- [the quadratic \(C_3\) selector](839_color_twirling_kills_the_linear_handle_but_its_quadratic_relationship_channel_selects_the_unique_symplectic_carrier.md)
- [Jordan–Lie scale remains dynamical](835_jordan_lie_compatibility_and_ward_positivity_do_not_fix_the_dynamical_bracket_scale.md)
- [the neutral exchange cannot lock the two sector scales](846_the_neutral_furey_exchange_cannot_lock_the_singlet_and_triplet_symplectic_scales.md)

