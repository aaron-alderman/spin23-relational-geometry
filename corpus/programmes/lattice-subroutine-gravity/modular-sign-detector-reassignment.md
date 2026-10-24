# The modular sign selects parity interferometry, not chiral loop flux

**Date:** 24 October 2026

**Status:** exact detector-assignment obstruction; beyond-sign fermionic multiplier remains open

**Evidence:** [machine-readable gate](../../../evidence/data/lattice-subroutine-modular-sign-detector-reassignment-v1.json)

**Certificate:** [detector reassignment verifier](../../../verification/verify/verify_lattice_subroutine_modular_sign_detector_reassignment.mjs)

## Question

Can the nontrivial character of the oriented genus-two line predict the flux used by the three-mode directional-transfer experiment without adding a fitted phase?

The answer is **no for the sign character alone**. The negative result does not destroy the experiment. It assigns two different mathematical data to two different detectors.

## The source supplies a binary holonomy

After the weight-five automorphy factor has been separated, the character of \(\chi_5\) takes values

\[
\sigma(\gamma)\in\{+1,-1\}.
\]

Embedding that character in a \(U(1)\) loop gives

\[
e^{i\Phi_\gamma}=\sigma(\gamma),
\qquad
\Phi_\gamma\in\{0,\pi\}\pmod{2\pi}.
\]

This is a genuine \(\mathbb Z_2\) holonomy. It is not a source-derived continuous flux. In particular, it does not choose \(+\pi/2\) rather than \(-\pi/2\).

The distinction matters because orientation reversal sends \(\Phi\mapsto-\Phi\), but

\[
-0=0,
\qquad
-\pi\equiv\pi\pmod{2\pi}.
\]

Both character values are fixed points of flux reversal.

## Consequence for the three-mode ring

For equal edge magnitude \(g\), the ring determinant contains

\[
2g^3\cos\Phi.
\]

The spectrum can therefore distinguish the trivial and nontrivial character sectors: \(\cos 0=1\) while \(\cos\pi=-1\). But at both values the Hamiltonian can be represented by real couplings. Its reciprocal resolvent satisfies

\[
G_{21}=G_{12},
\]

so the directional records

\[
G_{21}-G_{12}
\quad\text{and}\quad
|G_{21}|^2-|G_{12}|^2
\]

vanish. The \(\chi_5\) sign can select **loop parity**, but it cannot by itself drive the ring's orientation-odd channel.

This closes a possible over-reading of the three-mode preflight:

> the existence of a modular sign character does not predict a chiral synthetic flux.

## Where the sign is observable

A sign becomes physical relative to a second amplitude. If

\[
A_\sigma=A_{\rm ref}+\sigma A_{\rm seam},
\]

then

\[
|A_+|^2-|A_-|^2
=4\operatorname{Re}(A_{\rm ref}^*A_{\rm seam}).
\]

The record is linear in the seam amplitude and disappears when the reference is removed. This is exactly the role of the two-quadrature homodyne protocol: its pump and local oscillator provide the independently declared datum against which the binary sign can be read.

The two experimental carriers therefore have different jobs:

| datum | correct detector | record |
|---|---|---|
| \(\chi_5\) character \(\sigma=\pm1\) | referenced two-quadrature interferometer | sign-odd interference |
| continuous intrinsic \(U(1)\) flux | closed three-mode ring | directional transfer odd under \(\Phi\mapsto-\Phi\) |
| binary ring sector \(0\) versus \(\pi\) | three-mode ring spectrum | reciprocal spectral parity |

## What remains open

The full fermionic sewing amplitude carries more than the finite sign: theta multipliers, the weight factor, sewing-coordinate dependence and the anomaly/determinant line all enter. Tuite and Zuevsky give explicit genus-two fermionic partition functions, theta-function expressions and multiplier systems on sewing domains. Those data are not automatically a flat device phase.

The next exact question is therefore narrower:

> after choosing a source-derived trivialization or connection, does the sewn Monster \(2A\) fermionization carry a canonically transportable \(U(1)\) phase beyond the \(\mathbb Z_2\) character?

If not, the three-mode directional channel remains an engineering detector of intrinsic flux but exits the direct \(\chi_5\)-binding route. The referenced two-quadrature channel remains the correct landing point for the modular sign.

## Authority boundary

This result assigns detector type. It does not derive a laboratory coupling from the Monster CFT, identify a modular loop with physical time evolution, or establish a Leech/Monster effect in a resonator. A no-refit physical bridge still needs a map from a declared modular path and trivialization to a calibrated amplitude, coupling or transfer record.

## Sources

- Tuite and Zuevsky, [*Genus Two Partition and Correlation Functions for Fermionic Vertex Operator Superalgebras I*](https://arxiv.org/abs/1007.5203)
- Tuite and Zuevsky, [Part II](https://arxiv.org/abs/1308.2441)
- Lin and Shao, [*Duality Defect of the Monster CFT*](https://arxiv.org/abs/1911.00042)
- [Oriented seam modular-line result](oriented-seam-modular-line.md)
- [Two-quadrature seam experiment](two-quadrature-seam-experiment.md)
- [Three-mode loop seam preflight](three-mode-loop-seam-preflight.md)
