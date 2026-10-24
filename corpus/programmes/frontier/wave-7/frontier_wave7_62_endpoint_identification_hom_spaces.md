# Frontier Wave 7.62: Endpoint-Identification Hom-Spaces

**Date:** 25 October 2026  
**Status:** exact ambiguity classification; physical provenance remains absent  
**Ledger:** [endpoint Hom-space ledger](endpoint_identification_hom_space_v1.json)  
**Certificate:** [Hom-space verifier](../../../../verification/verify/verify_endpoint_identification_hom_space.mjs)

## Result

Representation type reduces the endpoint-identification problem to a small
and explicit ambiguity, but it does not select a canonical map.

## 1. The three-carrier endpoint

The partial-sewing environment carries

\[
\mathbf1\oplus A_2
\]

under (S_3). The ordinary three-point permutation representation has the
same decomposition:

\[
\mathbb R^3
=\mathbb R\mathbf1\oplus\ker(1,1,1).
\]

After a correspondence between the three labels is chosen, Schur rigidity
gives

\[
\operatorname{Hom}_{S_3}
(\mathbf1\oplus A_2,\mathbf1\oplus A_2)
=\mathbb RP_{\mathbf1}\oplus\mathbb RP_{A_2}.
\]

Hence the real equivariant Hom-space has dimension two:

\[
T=xP_{\mathbf1}+yP_{A_2}.
\]

Requiring an isometry reduces this to

\[
x,y\in\{+1,-1\},
\]

giving four real sign choices. Over the complex metric carrier the residual
freedom is (U(1)\times U(1)).

Before the three source and target labels are paired, there is additionally a
six-choice label torsor, exactly as in the corpus's family-to-placement
intertwiner.

## 2. Why the programme carrier is still not identified

The Program--Version--Example stage space supports the full (M_3) action,
so one may choose its permutation matrices and restrict to an (S_3)
subgroup. Algebraically this produces the required (1+A_2) decomposition.

But Program, Version and Example are authored as distinct ordered stages.
Their permutation matrices are elements of the generated matrix algebra, not
automorphisms of the typed schema. Consequently the (S_3) restriction is a
model choice. It is not evidence that the reference ray is the symmetric sum
of those stages or that the residual ports are their trace-zero plane.

## 3. The two-carrier endpoint

Once the normal--tangent doublet and the Spin--Temple cell are both treated as
standard irreducible (M_2)-modules,

\[
\dim\operatorname{Hom}_{M_2}(\mathbb C^2,\mathbb C^2)=1.
\]

Thus a full (M_2)-equivariant identification is unique up to one complex
scalar, or one phase after metric normalization.

Again, this is conditional. The relationship algebra does not say which of
its two basis nodes is the normal channel, which is tangent, or how its
Supports/Qualifies generators correspond to the response reflection and
translation operators.

## 4. Combined ambiguity

After chosen group actions and a label pairing, the continuous unitary freedom
is

\[
U(1)_{\rm two}
\times U(1)_{\rm singlet}
\times U(1)_{A_2}.
\]

Some phases may later become conventions, but they cannot be quotiented before
the cross-channel observable and real structure are specified. The discrete
ambiguity contains the six labelings and the real sign choices.

Therefore:

\[
\boxed{
\text{representation equivalence makes the bridge finite-dimensional, not canonical.}
}
\]

## 5. Exact provenance gate

One shared datum must fix:

1. the three-label correspondence;
2. the reference singlet versus residual plane normalization;
3. the two-channel basis correspondence; and
4. the relative phases relevant to (Q)-adjoint completion and coherent
   measurement.

A boundary operator, calibrated observable or authored evidence record could
do this. Dimension matching and abstract matrix-algebra isomorphism cannot.

[Wave 7.63](frontier_wave7_63_gram_disk_dynamics_and_causal_globalization.md)
then supplies the reduced selector dynamics and shows exactly which
coefficients and identifications remain physical rather than algebraic.

## Boundary

The Hom-space dimensions are exact after the stated representation choices.
The choice of an (S_3) restriction on the programme stage carrier is not
itself authored physical data, and no corpus record currently removes the
remaining torsor and phase freedom.
