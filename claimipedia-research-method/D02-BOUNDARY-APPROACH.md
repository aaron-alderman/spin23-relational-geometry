# D-02 boundary approach geometry

The real-axis boundary theorem is nontangential and scalarized. It is not a theorem about every path approaching the same real point.

## Sparse-spike counterexample

Let `rho` be one on intervals of width `2^-3n` centred at `2^-n`, and zero elsewhere. Zero is a Lebesgue point with value zero: the mass in a radius-`r` neighbourhood is `O(r^3)`. Consequently the vertical Poisson integral at zero tends to zero.

Now approach zero through the centres of the intervals, at height equal to the square of their width. These points leave every Stolz cone, and the Poisson integral tends to `pi`, because each path point resolves the interior of one spike. Thus the same measure and boundary point have the expected vertical/nontangential value but a different tangential limit.

Approach geometry must therefore remain an arc decoration. A nontangential theorem cannot be promoted to an arbitrary-path gluing rule.

## Principal-value layer

At zero the fixture also has a finite real principal value, the convergent sum of `log(right_n/left_n)`. This value is nonlocal: the pointwise density value does not determine it. Even the pair “density plus principal value almost everywhere” does not recover atoms or singular-continuous mass without retaining the boundary measure.

The boundary record therefore keeps four distinct objects:

1. the positive operator-valued measure;
2. its absolutely continuous density where available;
3. its atomic limits, with convergence topology;
4. principal-value and approach-arc decorations.

A generic Herglotz boundary theorem is also not a uniform limiting-absorption principle. A LAP needs a specified operator scale or weighted space and a uniform estimate there.
