# D-02 operator Herglotz–Harnack invariance

## Result

Let `D(z)` be a bounded operator-valued Herglotz function. For every vector `x`,

`u_x(z)=<x, Im(D(z)) x>`

is a nonnegative harmonic function. The maximum principle makes `ker Im(D(z))` independent of `z`. Harnack inequalities strengthen this on compact frequency sets to

`c Im(D(z0)) <= Im(D(z)) <= C Im(D(z0))`.

The constants depend on the compact frequency geometry, not on `x`. Douglas factorization applied in both directions then gives

`range(Im(D(z))^(1/2)) = range(Im(D(z0))^(1/2))`.

This remains true when the range is dense and non-closed. Consequently the dissipative support and the bounded square-root coupling class can be determined at one base frequency; they do not require a new census at every `z`.

## What it does not prove

The imaginary-part scale controls passivity and the coupling range gate. It does not automatically imply a factorization of the full complex operator

`D(z)=T^(1/2) Dhat(z) T^(1/2)`.

That stronger complementability statement remains an explicit hypothesis of the factorized Schur theorem. Collapsing these two layers would confuse dissipation geometry with invertibility of the full response.

## Executable witness

The diagonal family combines a linear Herglotz term with positive point-mass resolvents. Its imaginary entries decay like `1/n`, so the range is non-closed. Numerical sampling over 50,000 modes verifies uniform two-sided ratios at four frequencies and equivalent weighted norms while retaining the vanishing spectral gap.
