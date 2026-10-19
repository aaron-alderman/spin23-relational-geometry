# D-02 bounded-operator extension

## The corrected theorem

Closed range is sufficient for the ordinary Moore–Penrose/support-Schur construction, but it is not necessary for a bounded effective response.

Let `T` be a bounded positive operator with fixed support `P`. Suppose

`D(z)=T^(1/2) Dhat(z) T^(1/2)` and `B=C T^(1/2)`,

where `C` is bounded and `Dhat(z)` is norm-holomorphic, boundedly invertible and Herglotz on `P H_i`. Define the factorized correction by

`Sigma(z)=C Dhat(z)^(-1) C*`.

Then `Sigma` is bounded and norm-holomorphic. Moreover,

`Im(-Dhat^-1)=Dhat^(-*) Im(Dhat) Dhat^-1 >= 0`,

so subtracting `Sigma` preserves Herglotz passivity under the same reciprocal-coupling assumptions as the finite-dimensional theorem.

The compatibility condition `B=C T^(1/2)` is the operator range-factorization gate. By the Douglas principle it is equivalent to an appropriate range inclusion/majorization condition. The factorized form is retained in the type; arbitrary regulator convergence is not silently assumed.

## Essential-spectrum witness

Take `T=diag(1/n)` on `l2`, `D(z)=zT`, and `B=T^alpha`. The operator `T` is positive, compact and injective, but its range is not closed and zero lies in its essential spectrum. Formally and through the factorized construction,

`Sigma_alpha(z)=diag((1/n)^(2 alpha-1))/z`.

This gives a spectral trichotomy:

- `alpha<1/2`: the correction is unbounded; refuse elimination.
- `alpha=1/2`: the correction is bounded but regularized inverses converge only strongly, not in norm.
- `alpha>1/2`: low-spectrum suppression makes the commuting regularization norm stable; the residue is compact.
- `alpha>1`: the residue is trace class, so a finite scalar trace measure becomes available.

At the critical exponent every regularized correction is compact, while the limit `I/z` is not. Consequently norm convergence is impossible even though vectorwise convergence holds. This is a structural obstruction, not a numerical defect.

## What the topology controls

Strong convergence licenses vectorwise response statements. It does not license uniform spectral conclusions, determinants, traces or trace-valued measures. Those require norm or Schatten-class decorations.

Thus “operator-valued Herglotz measure exists,” “finite scalar trace measure exists,” and “regularized Schur complements converge uniformly” are separate claims.

## Disposition

Retain three operator handlers: ordinary closed-range Schur elimination, factorized non-closed-range elimination with an explicit convergence topology, and refusal when the coupling fails the square-root range gate. Fredholmness is not necessary for the strong/factorized branch. Kernel coupling remains forbidden and produces regulator divergence.
