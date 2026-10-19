# D-02 boundary Schur continuity

## Positive theorem

Taking the Schur complement commutes with a norm boundary limit when `A_y`, `B_y`, and `D_y` converge in norm and the boundary interior `D_0` remains invertible.

There is also a strong version. It requires:

- strong convergence of `A_y` and `D_y`;
- strong convergence of both `B_y` and `B_y*`;
- invertibility of `D_0`;
- a uniform bound on `||D_y^-1||`.

Then

`A_y-B_y D_y^-1 B_y* -> A_0-B_0 D_0^-1 B_0*`

strongly. The inverse identity and uniform boundedness supply the proof.

At points where boundary densities exist in a compatible topology,

`W_eff = W_A + B D_0^(-*) W_D D_0^-1 B*`.

This is the boundary passive-density transport law.

## Three independent failures

Weak limits are not multiplicative. For the unilateral shift `S`, take `B_n=(S*)^n` and `D_n=I`. Both `B_n` and `B_n*` tend weakly to zero, but `B_n B_n*=I`.

One-sided strong convergence is insufficient: `B_n=(S*)^n` tends strongly to zero, while its adjoint does not, and the correction remains `I`.

A uniform inverse bound is also essential. Let `P_n` be the moving coordinate projection,

`D_n=I-(1-1/n)P_n`, `B_n=P_n`.

Then `D_n->I` and `B_n->0` strongly-*; nevertheless `D_n^-1` has norm `n` and the correction is `nP_n`, which has no bounded strong limit.

## Boundary zeros

For `D(z)=z-lambda` with constant real coupling `B`, the effective correction `-B^2/D(z)` has a positive Herglotz pole at `lambda`. Its boundary atom has mass `B^2`. Thus a zero of the eliminated boundary operator is not a finite boundary Schur value—it moves into the atomic measure layer.
