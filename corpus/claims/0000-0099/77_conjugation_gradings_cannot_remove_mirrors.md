# Conjugation Gradings Cannot Remove Mirrors: Why One-Sided Structure Is Required

**Date:** 17 October 2026  
**Branches:** B03 and B11  
**Claim status:** exhaustive result for block-sign \(\mathbb Z_2\) conjugation gradings; more general Clifford projectors remain open

## 1. The next canonical candidate

After \(\dagger\) failed as a chiral projector, the next source-native possibility is a \(\mathbb Z_2\) grading induced by a volume element or block-sign involution

\[
\Gamma^2=1.
\]

If \(\Gamma\) commutes with the gauge block action, it can be assigned signs

\[
\gamma_a\in\{+1,-1\}
\]

on the five natural blocks. Its inner conjugation on endomorphisms is

\[
\mathcal C_\Gamma(X)=\Gamma X\Gamma^{-1}.
\]

For a block map \(X_{ab}:V_b\to V_a\),

\[
\mathcal C_\Gamma(X_{ab})
=\gamma_a\gamma_b X_{ab}.
\]

## 2. The mirror no-go

The adjoint mirror has reversed orientation:

\[
X_{ab}^\dagger:V_a\to V_b.
\]

But its conjugation grade is

\[
\gamma_b\gamma_a=\gamma_a\gamma_b.
\]

Therefore

\[
\boxed{
X_{ab}\text{ and }X_{ab}^\dagger
\text{ always lie in the same conjugation-grading eigenspace}.
}
\]

No \(+1\) or \(-1\) eigenspace of an inner block-sign grading can remove one orientation while retaining the other.

## 3. Exhaustive five-block check

There are

\[
2^5=32
\]

possible sign assignments on the five blocks. The executable certificate checks every assignment and verifies:

- both eigenspaces together always have complex dimension \(64\);
- each eigenspace is mirror-closed;
- no nontrivial assignment creates a particle-versus-mirror split.

Different assignments change the even/odd dimensions but not the obstruction.

## 4. Why one-sided actions are different

A left grading,

\[
\mathcal L_\Gamma(X)=\Gamma X,
\]

depends only on the target sign \(\gamma_a\), while a right grading depends only on the source sign. Such a choice can distinguish \(X_{ab}\) from \(X_{ba}^\dagger\).

This is mathematically important for the original relational-carrier intuition:

\[
A\,X\,B
\]

really does distinguish left and right actions. Chirality may require this asymmetry rather than inner conjugation.

But every nontrivial one-sided sign selection fails closure under \(\dagger\). It therefore needs a physical explanation:

- a complex polarization;
- a choice of incoming versus outgoing boundary;
- a minimal left ideal;
- an index orientation;
- or a causal arrow.

Merely choosing “left” by convention would reproduce the desired asymmetry without explaining it.

## 5. Scope of the no-go

The result covers gradings acting by inner conjugation with blockwise scalar signs. It does not rule out:

- noncentral Clifford volume elements mixing subspaces;
- left-ideal projectors;
- gradings that act differently on source and target factors;
- antiunitary or modular polarizations;
- dynamical mirror masses.

Those possibilities must be represented explicitly on the \(64\)-dimensional operator inventory.

There is also a quantization qualification. Here “mirror” means the dagger-reverse **block orientation**. The calculation proves that inner sign gradings do not select one orientation. It does not prove that the reverse block must be quantized as an independent same-chirality mirror fermion; it may instead be the adjoint operator of the selected Weyl field. That distinction requires Lorentz, Grassmann and Fock-space data. See [Dagger closure: antiparticles are not automatically mirror fermions](../0100-0199/151_dagger_antiparticle_vs_mirror_distinction.md).

## 6. Stop-everything and falsification tests

**Positive:** a canonically oriented one-sided or ideal projector selects one anomaly-free chiral generation and is fixed by causal, algebraic or index data.

**Negative:** every canonical volume-element action reduces to inner conjugation and therefore remains mirror-closed.

**Current result:** all \(32\) block-sign conjugation gradings fail the chirality gate.

## 7. Certificate

The [grading certificate](../../../verification/verify/verify-conjugation-grading-mirror-no-go.mjs) exhausts all five-block sign assignments, measures eigenspace dimensions, verifies mirror closure and contrasts the one-sided selection.

## Companion documents

- [Dagger does not select chirality](75_dagger_does_not_select_chirality.md)
- [Endomorphism-sector inventory](73_furey_endomorphism_sector_inventory.md)
- [Relational-carrier composition](41_relational_carrier_jordan_triple_composition.md)
