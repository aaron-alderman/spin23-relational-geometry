# Frontier Parallel 5: Freudenthal Inverse Pairs Form Orbits, Not a Selector

**Date:** 18 October 2026  
**Status:** exact orbit-and-stabilizer theorem on the positive paired (H_2(\mathbb R)) carrier  
**Decision:** retain Freudenthal geometry as a classifier and Gaussian critical-locus language; close it as an intrinsic selector of scale, embedding, or orientation

## Result

For (A,C\in H_2(\mathbb R)_+), the restricted Freudenthal quartic and triple vanish precisely on inverse-matched pairs

\[
C=\lambda A^{-1},\qquad \lambda>0.
\]

But these pairs form a one-parameter family of dual-(GL(2)) orbits. At fixed (lambda), (GL(2)) removes every shape and overall scale of (A). The remaining orbit label is

\[
\lambda=\frac12\operatorname{tr}(AC)
=\sqrt{\det A\det C}.
\]

The equations (q=0) and (mathcal T=0) hold for every positive (lambda), so they cannot select it. Norm symmetry of the octonionic link coordinate likewise moves the embedding line and contains its sign reversal. Therefore the Freudenthal invariant classifies inverse pairing but selects none of the programme's unresolved data.

## 1. Restricted invariant

On the paired real face, write

\[
s=\operatorname{tr}(AC),\qquad
p=\det A\det C.
\]

The restricted quartic is

\[
q(A,C)=-2(s^2-4p).
\]

The associated cubic map, in the programme's normalization, is

\[
\mathcal T(A,C)=
\left(
-sA+2\det(A)C^\#,
sC-2\det(C)A^\#
\right).
\]

For positive matrices,

\[
q=0\iff \mathcal T=0\iff C=\lambda A^{-1}.
\]

This is genuine structure. Freudenthal systems do combine a quartic invariant with a skew pairing; the exceptional case and its stabilizers are constructed directly in [Helenius](https://arxiv.org/abs/1005.1275). Exceptional orbit classifications using Jordan and Freudenthal ranks appear in [Ferrara and Günaydin](https://arxiv.org/abs/hep-th/9708025). Neither source implies that an invariant orbit condition chooses a physical representative.

## 2. Fixed-(\lambda) transitivity theorem

The natural dual action is

\[
(A,C)\mapsto
(GAG^T,G^{-T}CG^{-1}).
\]

It preserves (AC) up to similarity and hence preserves (lambda). Given any (A>0), choose (G=A^{-1/2}). Then

\[
(A,\lambda A^{-1})mapsto(I,\lambda I).
\]

Consequently every inverse pair with fixed (lambda) belongs to one orbit. Shape, eigenbasis, condition number, and the overall scale of (A) are coordinates along that orbit rather than predictions.

Conversely, different (lambda) are distinguished by the dual invariant

\[
\frac12\operatorname{tr}(AC)=\lambda.
\]

The critical-null locus therefore has quotient

\[
\mathcal N_+/GL(2)\cong\mathbb R_{>0}.
\]

The quartic and triple vanish on all of this quotient. They do not supply a preferred point.

## 3. Embedding-line degeneracy

Embedding (H_2(\mathbb R)) in an octonionic (H_2) face requires a real link line (\mathbb Ru\subset\mathbb O). The determinant depends only on

\[
|xu|^2=x^2|u|^2.
\]

The frame-stabilizing norm symmetry acts transitively on unit link directions. In particular,

\[
\operatorname{diag}(-1,-1,1,1,1,1,1,1)\in SO(8)
\]

maps one chosen unit line orientation (u) to (-u) while preserving the norm. Applied consistently to the paired face, it preserves (s), (p), (q), and (mathcal T=0).

Thus:

\[
\boxed{
\text{Freudenthal invariance cannot choose the link line or its orientation.}
}
\]

The scalar line versus a Furey-imaginary line, and the sign of the channel-to-flux assignment, remain external data.

## 4. Scale is selected only by non-Freudenthal input

The existing Gaussian/log-determinant action

\[
\Gamma_{A,\kappa}(C)
=\operatorname{tr}(AC)-\kappa\log\det C
\]

has the unique stationary point

\[
C=\kappa A^{-1}.
\]

Here (kappa) is supplied by temperature, quantization convention, or another normalization. A pure action (F(q)) cannot do this: on the entire inverse locus, (q=0) and (dq=0), so every (lambda) is stationary whenever the variational expression is defined.

This fixes the explanatory direction:

\[
\text{Gaussian state/action}
\Longrightarrow
\lambda
\Longrightarrow
\text{Freudenthal critical-null representative},
\]

not the reverse.

## 5. Selection ledger

| datum | effect of Freudenthal equations | verdict |
|---|---|---|
| inverse relation (C\propto A^{-1}) | fixed | selected as a shape relation |
| shape/eigenbasis of (A) | one (GL(2)) orbit | not selected |
| overall scale of (A) | one (GL(2)) orbit | not selected |
| proportionality (lambda) | residual positive orbit label | not selected |
| octonionic link line | norm-symmetry orbit | not selected |
| orientation (u\leftrightarrow-u) | same symmetry orbit | not selected |
| physical (H_2(\mathbb R)) face | requires external intertwiner | not selected |
| (E_7) versus (E_8) ontology | not implied by restricted invariant | not selected |

## 6. What remains fruitful

The branch stays useful in three narrower roles:

1. classify whether a microscopic source/dual-response pair lies on the inverse orbit;
2. measure departures from inverse matching through the discriminant (s^2-4p);
3. test which contact terms, Ward reductions, or causal continuations preserve the orbit.

The branch should be reopened as a selector only if an independent Standard-Model or boundary action produces a nonconstant potential on the quotient (mathbb R_{>0}) and simultaneously fixes the physical embedding map.

## 7. Falsifiers and promotion rule

- **Orbit theorem falsifier:** two positive inverse pairs with equal (lambda) that cannot be related by the declared dual (GL(2)) action.
- **Scale no-go falsifier:** a Freudenthal-invariant scalar whose restriction varies with (lambda) while retaining the stated quartic/triple symmetry and no added scale.
- **Embedding no-go falsifier:** a term internal to the same invariant that distinguishes two norm-related link lines.
- **Promotion criterion:** an independently derived action fixes (lambda), the face, and the orientation, followed by a normalized observable not used as an input.
- **Stop-everything positive:** the selected representative also supplies the missing Furey-source intertwiner and survives Ward/contact renormalization.

## 8. Reproduction

```powershell
node scripts/verify_frontier_freudenthal_inverse_orbit_no_selector.mjs
```

The certificate gives an exact determinant-one orbit witness, checks two distinct positive (lambda) values with identical quartic/triple vanishing, recovers (lambda) as the residual invariant, and constructs an orientation reversal inside (SO(8)).

## Dependencies

- [Freudenthal paired-face decision memo](freudenthal_parallel_synthesis_decision_memo.md)
- [Action mechanism and no-go](freudenthal_action_synthesis_mechanism_and_no_go.md)
- [Earlier homogenized-corner closure](833_the_freudenthal_quartic_can_homogenize_the_h2r_determinant_but_does_not_select_the_embedding_orientation_or_e8_parent.md)
- [Programme maximal no-go atlas](programme_closure_07_maximal_no_go_and_underdetermination_atlas.md)

