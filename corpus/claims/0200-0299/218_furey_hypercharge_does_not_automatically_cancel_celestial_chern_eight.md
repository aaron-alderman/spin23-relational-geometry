# Furey Hypercharge Does Not Automatically Cancel the Celestial Chern-Eight Obstruction

**Date:** 17 October 2026  
**Branches:** B03, B07, B09, B10 and B11  
**Claim status:** exact base-space and representation-weight obstruction; momentum/internal locking backgrounds remain an open escape

## 1. The compensator question

The opposite-helicity relationship coordinate is a section of a line bundle over the celestial sphere with

\[
c_1(\mathcal R)=8.
\]

A natural question is whether the Furey/internal \(U(1)\) structure supplies a canonical line of Chern number \(-8\).

The answer from the present data is **no**. Hypercharge weights and celestial Chern classes live in different constructions and cannot be equated without additional geometric locking data.

## 2. A charge is not a Chern number

For one left-handed Standard-Model generation, normalize hypercharge by

\[
X=6Y.
\]

The Weyl multiplet weights are

\[
X(Q)=1,
\quad X(u^c)=-4,
\quad X(d^c)=2,
\quad X(L)=-3,
\quad X(e^c)=6,
\quad X(N^c)=0,
\]

with \(X(H)=3\) for the Higgs doublet.

These integers specify representations of the internal \(U(1)\). They do not specify a line bundle over momentum-direction space. A Chern class appears only after choosing:

1. a principal \(U(1)\) bundle over a base;
2. its flux/first Chern class \(m\);
3. a representation of integer weight \(n\).

The associated line then has

\[
c_1(L_n)=nm.
\]

Furey's algebraic representation construction supplies \(n\)-type data. It does not by itself supply a celestial bundle, a flux \(m\), or a map from the celestial sphere into an internal gauge configuration.

## 3. Arithmetic does not solve geometry

No elementary Standard-Model multiplet has normalized hypercharge \(-8\). The tensor product \(u^c\otimes u^c\) has total weight \(-8\), but:

- it is not a color singlet;
- it is a composite operator, not a nowhere-vanishing background section;
- its internal charge does not cancel a celestial transition function unless internal and momentum-space bundles are locked;
- a charged vacuum expectation value would break gauge symmetry.

More generally, finding integers whose charges add to \(-8\) is only representation arithmetic. It does not construct a global nonzero section of a Chern-minus-eight celestial line.

## 4. Gauge neutrality makes the naive cancellation worse

The stress tensor and its helicity relationship are internal-gauge neutral. Multiplying by an internally charged field produces a gauge-charged object unless its gauge transition is identified with the inverse celestial transition.

But a gauge-invariant local composite has total internal \(U(1)\) weight zero. Therefore an ordinary gauge-singlet Furey/Standard-Model composite cannot cancel the celestial winding merely through hypercharge.

The required mechanism must be a **locking** or transgression:

\[
U(1)_{\rm celestial}
\longleftrightarrow
U(1)_{\rm internal},
\]

with a declared bundle map and compatible gauge transformation law.

## 5. What would make cancellation possible

An internal compensator can work only if the theory supplies all of the following:

1. a principal internal \(U(1)\) bundle pulled back to the celestial \(S^2\);
2. flux \(m\) and representation weight \(n\) satisfying \(nm=-8\);
3. a nowhere-vanishing section of the tensor product \(\mathcal R\otimes L_n\);
4. a locking interaction making the diagonal combination gauge invariant;
5. no unacceptable breaking of electromagnetism, color or weak symmetry.

The integer factorizations

\[
(n,m)\in\{(\pm1,\mp8),(\pm2,\mp4),(\pm4,\mp2),(\pm8,\mp1)\}
\]

show possible arithmetic normalizations, not a selected physical construction.

## 6. Consequence for the Furey bridge

Furey's division-algebraic machinery remains relevant because it can constrain internal weights, conjugations and bimodule arrows. But the current algebraic data do not cancel momentum-space helicity topology automatically.

This prevents a category error:

> matching the number eight in a hypercharge tensor product is not the same as trivializing a Chern-eight line bundle.

The bridge must be an explicit momentum-dependent intertwiner or locking field, not a numerical identification.

## 7. Stop-everything and falsification gates

**Locking success:** a Furey-derived field or projector defines a bundle map over celestial \(S^2\) with inverse winding eight while preserving the observed gauge group.

**Monopole/flux success:** a physical internal background supplies quantized flux \(m\) and an allowed weight \(n\) with \(nm=-8\).

**Automatic-cancellation falsifier:** a derivation uses only the list of hypercharges, with no base-space map, flux or transition functions.

**Gauge falsifier:** the compensator is charged under unbroken electromagnetism and requires a nonzero vacuum value.

**Composite gate:** any proposed weight-minus-eight composite must pass Lorentz statistics, color/weak singlet, nonvanishing-section and dynamical-condensation tests.

## 8. Certificate

The [hypercharge/Chern-eight audit](../../../verification/verify/verify_hypercharge_chern8_compensator_audit.mjs) verifies the normalized one-generation charge inventory, absence of an elementary weight \(-8\), existence but non-elementarity of arithmetic combinations, and the integer flux-weight factorizations required by a genuine associated line bundle.

## Companion documents

- [Opposite-helicity Chern-eight relationship](217_opposite_helicity_carrier_has_chern_eight_relationship_obstruction.md)
- [Furey comprehensive research review](../0000-0099/02_furey_comprehensive_research_review.md)
- [Furey technical algebraic guide](../0000-0099/03_furey_technical_algebraic_guide.md)
- [Charged real-slice U(1) no-go](../0100-0199/117_charged_real_slice_u1_no_go.md)
- [Locking gauge mixing and hypercharge gate](../0000-0099/82_locking_gauge_mixing_and_hypercharge_gate.md)
