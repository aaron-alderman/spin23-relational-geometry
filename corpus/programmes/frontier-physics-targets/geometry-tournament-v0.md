# Geometry tournament v0 reduces hypotheses before they touch data

## Purpose

The fourth-dimensional question is underdetermined: displacement, tilt, bending, saddles, creases, thickness, defects and twist can produce different signatures, while the same geometry can be invisible to one reader and obvious to another. Fitting every combination directly to astronomical data would reward flexibility rather than understanding.

This spike implements a deterministic pre-data tournament. Its rule is:

> retire or merge observational aliases first; admit a new reader only when it separates a preregistered equivalence class.

## Typed primitive grammar

Version 0 contains ten geometry primitives:

\[
\{\text{flat, displacement, tilt, bend, saddle, crease, thickness, graded thickness, defect, twist}\},
\]

and seven coupling-reader kernels:

\[
\{\text{projection, attenuation, signed response, phase, mixing, decoherence, holonomy}\}.
\]

Twenty bounded composites exercise the grammar. The probe laboratory samples a fixed spatial grid and records gain, phase quadratures, signed response, channel mixing, distribution width and loop response. This is an instrumentation and identifiability test, not a physical model of M44.

## Automatic equivalence reduction

Under an uncalibrated aggregate projection reader, the twenty composites collapse to only five signature classes. The declared specialized readers produce eighteen classes. Two exact aliases remain:

- flat and constantly displaced sheets under translation-invariant projection;
- bowl and saddle geometries under a projection that reads only slope magnitude.

The first says absolute extra-dimensional position has no meaning without a reference-sensitive coupling. The second says curvature sign cannot be recovered from unsigned foreshortening.

A full separating reader bundle resolves the ten underlying geometry primitives, although multiple reader-labelled models of the same geometry correctly collapse to one geometry class.

## Synthetic recovery

Each of the sixteen unique declared-reader classes was injected one hundred times with deterministic Gaussian noise of standard deviation 0.01. Recovery was restricted to candidates using the same declared reader. All 1,600 trials recovered the generating class, with no confusion.

This result is intentionally modest. It proves that the initial probes and canonicalization behave coherently at the benchmark scale. It does not show that the hypotheses occur in nature, nor that recovery survives nuisance processes or free parameter ranges.

## Admission boundaries

- Displacement requires an absolute, distance-sensitive or signed reader.
- Thickness requires a distribution-sensitive reader.
- Twist requires a loop or parallel-transport reader.
- A geometry-reader class that aliases an ordinary nuisance is merged or retired before real-data fitting.
- Synthetic recovery never promotes a physical claim.

The next version must separate coupling from reader as its own typed layer, canonicalize low-word-length compositions, introduce ordinary nuisance generators, and run cross-class confusion tests before any class is admitted to astronomical data.
