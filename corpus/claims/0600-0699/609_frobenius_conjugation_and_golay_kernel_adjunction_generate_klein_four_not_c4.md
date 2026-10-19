# Frobenius Conjugation and Golay Kernel Adjunction Generate Klein Four, Not \(C_4\)

**Date:** 17 October 2026  
**Branches:** B03, B04, B07, B09, B10, B11, B12, B13 and B14  
**Claim status:** exact finite-field separation of arithmetic conjugation from relational adjunction  
**Certificate:** [analyze_golay_determinant_quintic_over_f9.mjs](../../../verification/analyze/analyze_golay_determinant_quintic_over_f9.mjs)

## Executive result

Over \(\mathbb F_9/\mathbb F_3\), two natural involutions act on the reciprocal Golay-quintic locus:

1. Frobenius conjugation
   \[
   F([s])=[s^3];
   \]
2. relational kernel adjunction
   \[
   \kappa([s])=[\ker\tau_\mu(s,-,-)].
   \]

They are not the same operation.

On the extension-only reciprocal \(M_{11}\)-orbit of size 220:

\[
F^2=\kappa^2=1,
\qquad
F\kappa=\kappa F,
\qquad
F\ne\kappa.
\]

Neither involution nor their product has a fixed point there. They generate a free action

\[
\boxed{\langle F,\kappa\rangle\cong C_2\times C_2}
\]

with

\[
220/4=55
\]

four-point packets.

Thus arithmetic conjugation and relational adjunction are rigorously distinct. Their combination does not supply a quartic \(C_4\) phase.

## 1. Fixed-point comparison

Frobenius fixes exactly the \(\mathbb F_3\)-rational projective points:

\[
|\operatorname{Fix}(F)|=|PG(4,3)|=121.
\]

Kernel adjunction has only the eleven Coxeter-cap fixed points:

\[
|\operatorname{Fix}(\kappa)|=11.
\]

Their common fixed locus is therefore the cap, but their individual fixed loci differ:

\[
\operatorname{Fix}(\kappa)
\subsetneq
\operatorname{Fix}(F).
\]

On the remaining 110 rational points, Frobenius is the identity while \(\kappa\) forms 55 transpositions.

## 2. The 220-point reciprocal orbit

The new \(\mathbb F_9\)-only reciprocal orbit has size 220 and stabilizer order 36. Both \(F\) and \(\kappa\) preserve it.

The certificate verifies at every point that

\[
\kappa(F(s))=F(\kappa(s)).
\]

It also verifies:

- \(F\) has no fixed point;
- \(\kappa\) has no fixed point;
- \(F\kappa\) has no fixed point;
- the generated orbit of each point has size four.

Hence the orbit decomposes into 55 free Klein-four packets

\[
\{s,F(s),\kappa(s),F\kappa(s)\}.
\]

## 3. Why commutation is expected

The tensor coefficients lie in \(\mathbb F_3\). Frobenius therefore commutes with forming the middle-action matrix:

\[
B_{F(s)}=F(B_s).
\]

Taking a one-dimensional kernel commutes with field conjugation, giving

\[
\ker B_{F(s)}
=F(\ker B_s).
\]

The commutation is structural rather than accidental.

Distinctness is the substantive result: the null partner selected by the tensor is not generally the arithmetic conjugate.

## 4. Furey-side consequence

The programme repeatedly encounters three operations that must remain typed:

- algebraic or field conjugation;
- Hermitian adjunction \(\dagger\);
- relational reversal or kernel pairing.

The finite Golay model proves that the first and third can commute without coinciding. This supports the existing Furey discipline:

\[
\boxed{
\text{conjugation is not automatically chirality, adjunction or relational reversal}.
}
\]

Any Furey/Golay intertwiner must specify which operation maps to which. Merely observing that both square to one is insufficient.

## 5. Quartic-phase boundary

Two commuting involutions generate

\[
C_2\times C_2,
\]

not \(C_4\). In particular,

\[
(F\kappa)^2=1.
\]

This finite extension-field branch cannot supply the missing fourth root previously sought in weak-spin, Gaussian and ribbon-orientation branches.

A genuine \(C_4\) requires a nonsplit lift, projective phase, central extension or ramified arithmetic layer. It does not arise by composing Frobenius with the Golay kernel involution.

## 6. Relation to “two faces plus one relation”

Each free packet has four typed points:

\[
s,\quad F(s),\quad\kappa(s),\quad F\kappa(s).
\]

One axis is arithmetic face conjugation; the other is relational null pairing. This gives an exact square rather than a loop with a quarter twist.

The square may be useful as a bookkeeping object for two faces and their reciprocal relations, but it supplies no orientation around the square. Choosing an oriented four-cycle would require extra data and would break the Klein-four symmetry.

## 7. Stop-everything boundary

The identification

\[
\text{Frobenius conjugate}=\text{kernel partner}
\]

is false outside the eleven cap points.

The proposal

\[
\langle F,\kappa\rangle\cong C_4
\]

is also false on the 220-point reciprocal orbit. The exact group is \(C_2\times C_2\).

## 8. Next branches

1. Compare the Klein-four packets with Furey particle, antiparticle, left and right sectors using an explicit module map.
2. Test whether an integral or Gaussian lift turns the split square into a nonsplit \(C_4\) extension.
3. Compute the quotient of the 220-orbit by \(F\), by \(\kappa\) and by the full Klein four group.
4. Determine whether the unique doubling linker selects one diagonal or orientation of the square.
5. Keep the finite involutions separate from physical time reversal and CPT until their actions are explicitly intertwined.

## 9. Reproduction

Run:

    node scripts\analyze_golay_determinant_quintic_over_f9.mjs

Required output:

    frobeniusFixedProjectivePoints: 121
    kernelFixedProjectivePointsOverF9: 11
    reciprocal220Orbit.commutingPoints: 220
    reciprocal220Orbit.productFixedPoints: 0
    reciprocal220Orbit.freeKleinFourPackets: 55
