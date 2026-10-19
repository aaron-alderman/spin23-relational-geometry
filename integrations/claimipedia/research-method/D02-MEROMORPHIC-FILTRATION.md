# D-02 coordinate-free meromorphic filtration

## Result

The valuation rule extends beyond diagonal or equal-order crossings without choosing eigenlines.

For finite-dimensional analytic one-parameter germs, with `D_s` invertible for `s != 0`, define the full contracted Schur correction

`C_s = B_s D_s^-1 B_s^T`.

Because `D_s^-1 = adj(D_s)/det(D_s)`, `C_s` is meromorphic in `s`. This gives a coordinate-free dichotomy:

1. If `C_s` has no negative Laurent coefficients, its puncture is removable. Its limiting value is unique and may be glued.
2. If `C_s` has a pole, elimination must retain the interior or refuse the crossing.
3. A finite-part value in the pole case is meaningful only relative to an explicitly retained normal coordinate and subtraction scheme. It is not a property of the undecorated singular family.

This criterion is invariant under every analytic invertible interior-frame germ. If

`D'_s = T_s^T D_s T_s` and `B'_s = B_s T_s`,

then the frame factors cancel in the full correction. This is stronger than diagonalizing mode by mode: it covers non-diagonal mixing and unequal vanishing orders while never treating a transient eigenbasis as intrinsic.

## Unequal-order mixed fixture

The executable witness starts from

`D_s = diag(s^2 z, s^4 (z+1))`, `B_s = (s b_1, s^2 b_2)`

and mixes it with the non-orthogonal analytic frame

`T_s = [[1,s],[0,1+s]]`.

Both critical residues remain finite, and direct evaluation confirms

`B'_s (D'_s)^-1 (B'_s)^T = b_1^2/z + b_2^2/(z+1)`

at every tested nonzero `s`. The effective response remains in the upper half-plane for the passive fixture.

## Strongest fixed-decoration counterexample

Suppose the correction contains `1/s^2`. Even after recording pole order, leading coefficient and approach direction, a nonlinear regular coordinate change

`s = r + a r^2`

gives

`1/s^2 = r^-2 - 2 a r^-1 + 3 a^2 + O(r)`.

The apparent finite part is therefore `3 a^2`; it changes with the second jet of the coordinate. No finite-part prescription is canonical under the declared reparameterization symmetry. Adding a normal coordinate and subtraction rule can define a scheme-relative value, but that is a new decorated object, not a recovered invariant of the old one.

## Boundary

This closes finite-dimensional analytic and polynomial one-parameter germs at the value level. It does not cover smooth flat germs, infinite-dimensional essential-spectrum crossings, or manufacture scheme-independent values for genuine poles. Those are separate research programmes rather than hidden exceptions to this result.
