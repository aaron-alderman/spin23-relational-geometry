# D-02 operator topology and path audit

## The missing operator strata

Finite-dimensional support data secretly contains a spectral gap. Infinite dimensions separate them. `I` and `diag(1/n)` both have zero kernel and support projection `I`, but only the first is bounded below and has closed range.

An operator stratum must therefore record at least:

1. support projection;
2. closed-range or spectral-gap class;
3. Douglas square-root coupling class;
4. convergence topology;
5. compact/Schatten ideal class;
6. approach and regularizer germ.

Kernel annihilation alone is insufficient. `T^alpha` annihilates the trivial kernel of `T=diag(1/n)` for every `alpha`, but the correction is unbounded when `alpha<1/2`.

## Noncommuting interior

The factorized theorem does not depend on simultaneous diagonalization. The executable fixture uses a diagonal `T` and a tridiagonal self-adjoint part of `Dhat=zI+H`. Direct Schur evaluation, factorized evaluation and a rotated-frame evaluation agree to numerical precision.

## Strongest endpoint-identical path obstruction

Let `T0` have a one-dimensional kernel and positive spectrum on its complement. For `delta>0`, define

`D_delta=z(T0+delta I)`,

`B_delta=sqrt(T0)+c sqrt(delta) P0`,

where `P0` projects onto the kernel. Every value of `c` gives the same norm limits `D_0=zT0` and `B_0=sqrt(T0)`, but the eliminated kernel correction tends to `c^2/z`. Even norm convergence of the original block data does not make Schur elimination continuous at a closing gap.

## Essential-spectrum topology obstruction

For injective `T=diag(1/n)`, compare:

- coherent transport: `D_delta=z(T+delta I)`, `B_delta=sqrt(T+delta I)`;
- frozen coupling: `D_delta=z(T+delta I)`, `B_delta=sqrt(T)`.

Both have the same strong limiting correction `I/z`. The coherent path is exactly norm stable. The frozen path never converges in norm because arbitrarily low spectral modes retain the full error. Thus the limiting response and the topology of obtaining it are independent pieces of information.

## Measure boundary

The critical residue `I` is a valid bounded positive operator-valued atom when evaluated through matrix elements. It is not trace class. Its scalar trace is infinite and it does not license a Fredholm determinant. Positive operator-valued measure, finite scalar measure and determinant data are three different layers.
