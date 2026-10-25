# Arf conjugation fixes the Baby-Monster \(K\) multiplier

**Date:** 25 October 2026

**Status:** exact in the canonical Arf convention and the certified anomaly-free \(46C/D\) cyclic channel; amplitude sewing remains open

**Evidence:** [machine-readable multiplier ledger](../../../evidence/data/moonshine-arf-conjugated-baby-monster-k-multiplier-v1.json)

**Certificate:** [Arf-conjugation verifier](../../../verification/verify/verify_moonshine_arf_conjugated_baby_monster_k_multiplier.mjs)

## Result

The Baby-Monster relation-defect multiplier can be determined without first
evaluating the sixteen genus-two amplitudes. A modular multiplier is
representation data, while the amplitudes are vectors on which that
representation acts.

On the \(46C/D\) rail, \(b=h^2\) and \(z=h^{23}\) generate the same cyclic
order-46 group. The existing anomaly audit finds its Moonshine anomaly
restriction trivial. Since \(K\equiv I\pmod {23}\), it fixes the \(b\)-label;
on the sixteen flat \(z\)-backgrounds it acts only by the linear mod-2
permutation.

Let \(A/4\) be the certified genus-two Arf/Fourier transform and let \(P_K\)
be the inverse background permutation corresponding to the declared
characteristic-action convention. Direct conjugation gives

\[
\boxed{\frac1{16}A P_K A^T=P_{\mathrm{spin}}(K),}
\]

where every nonzero entry on the right is \(+1\). Its restriction to the ten
even spin structures is exactly the previously certified cycle decomposition
\(3^3\,1\). Thus the complete fermionized \(2A\) action has no residual edge
phase in this convention. The Baby-Monster edge phase is forced to be the
inverse of the eta-normalized free-Majorana edge phase.

## 1. Exact Baby-Monster phases

With \(\zeta_8=e^{i\pi/4}\):

| source | target | free exponent | Baby exponent | combined exponent |
|---|---|---:|---:|---:|
| \(00\mid00\) | \(00\mid10\) | 5 | 3 | 0 |
| \(00\mid10\) | \(10\mid00\) | 0 | 0 | 0 |
| \(10\mid00\) | \(00\mid00\) | 3 | 5 | 0 |
| \(00\mid01\) | \(00\mid11\) | 5 | 3 | 0 |
| \(00\mid11\) | \(10\mid01\) | 0 | 0 | 0 |
| \(10\mid01\) | \(00\mid01\) | 3 | 5 | 0 |
| \(01\mid00\) | \(01\mid10\) | 5 | 3 | 0 |
| \(01\mid10\) | \(11\mid00\) | 0 | 0 | 0 |
| \(11\mid00\) | \(01\mid00\) | 3 | 5 | 0 |
| \(11\mid11\) | \(11\mid11\) | 4 | 4 | 0 |

Consequently the Baby-Monster invariants are

\[
(1,1,1;-1),
\]

the same three trivial cycle holonomies and fixed-sector sign as the free
factor. Pointwise multiplication gives the full \(2A\) invariants

\[
(1,1,1;+1).
\]

## 2. The determinant lesson

The free monomial operator has determinant \(-1\). The reconstructed
Baby-Monster monomial operator also has determinant \(-1\). Their phase
products cancel in the pointwise fermionized amplitude, leaving the single
even-sector permutation, whose sign is \(+1\). Therefore

\[
\det\rho_{2A}(K)=+1.
\]

This rules out a tempting promotion: the free-factor determinant sign is not
a determinant sign of the complete \(2A\) Monster fermionization. What
survives is the nontrivial sector permutation itself. Any proposed bridge to
the \(\chi_5\) character line must obtain its sign elsewhere; it cannot import
the free-Majorana determinant unchanged.

## 3. What remains open

The multiplier gate is closed, but the amplitude gate is not. The sixteen
twined Monster background functions, or equivalent direct Baby-Monster
sewing data, are still required to:

- prove the relevant even-sector functions exist with the assumed
  normalizations;
- test the six odd-sector zero identities;
- verify separating degeneration to the order-23 genus-one traces;
- compare actual sewn functions, rather than only their mapping-class
  representation.

The next frontier is therefore no longer “find the Baby multiplier.” It is
“construct one amplitude vector carrying the now-fixed multiplier and test
its degeneration.”

## Boundary

The conclusion uses the canonical Arf fermionization convention, the existing
trivial-anomaly result for the cyclic \(46C/D\) channel, and the declared
one-block embedding of \(K\). A different basis may redistribute edge phases,
but cannot change the closed-cycle holonomies, fixed eigenvalue, or
determinant conclusions.

## Sources and corpus links

- Lin and Shao, [*Duality Defect of the Monster CFT*](https://arxiv.org/abs/1911.00042)
- [Arf/Fourier Baby-Monster reconstruction](arf-fourier-baby-monster-reconstruction.md)
- [Free-Majorana relation-defect multiplier](relation-defect-free-majorana-multiplier.md)
- [Order-46 observable ladder and anomaly audit](order-46-observable-ladder.md)
- [Relation-defect seam permutation](relation-defect-seam-permutation.md)
