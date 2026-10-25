# Frontier Wave 7.152: Minimal-Vector Zero Modes on the 98304-State Twisted Sector

**Date:** 25 October 2026

**Status:** exact source-normalized zero-mode family; oscillator-bilinear family and full Griess reconstruction remain open

**Evidence:** [zero-mode compiler](../../../../evidence/data/moonshine-minimal-vector-twisted-weight2-zero-mode-v1.json)

**Certificate:** [executable verifier](../../../../verification/verify/verify_moonshine_minimal_vector_twisted_weight2_zero_mode.mjs)

## The missing operator is explicit

Bakalov and Kac give the twisted lattice vertex operator

\[
Y^T(e^\alpha,z)=z^{b_\alpha}U_\alpha E_\alpha(z).
\]

For inversion \(\sigma=-1\) and a norm-four Leech vector,
\(\alpha_0=0\) and \(b_\alpha=-2\). Acting on the first half-mode excitation
and extracting the zero mode gives

\[
 h(-\tfrac12)\longmapsto
 h(-\tfrac12)-2(\alpha,h)\alpha(-\tfrac12).
\]

In the standard normalized central extension,
\(U_\alpha=2^{-\alpha^2}P_{[\alpha]}=P_{[\alpha]}/16\), and the invariant
pair \(e^\alpha+e^{-\alpha}\) doubles it. Consequently its exact action on
the retained twisted weight-two sector is

\[
 \boxed{O_\alpha={1\over8}
 \left(I-2\alpha(\alpha^TK)\right)\otimes P_{[\alpha]}}.
\]

This is the step that cannot be replaced by the symmetry action
\(I_{24}\otimes P_{[\alpha]}\): the twisted Heisenberg exponential supplies
the rank-one 24-channel factor.

## Quantitative fingerprint

For every norm-four \(\alpha\), the channel numerator has eigenvalue \(-7\)
along \(\alpha\) and eigenvalue \(1\) on its 23-dimensional orthogonal
complement. Since the noncentral Pauli has equally many positive and negative
eigenvalues, the complete spectrum is

| eigenvalue | multiplicity |
|---:|---:|
| \(+7/8\) | 2048 |
| \(-7/8\) | 2048 |
| \(+1/8\) | 47104 |
| \(-1/8\) | 47104 |

The phase-insensitive moments are therefore

\[
 \operatorname{Tr}O_\alpha=0,\qquad
 \operatorname{Tr}O_\alpha^2=4608,\qquad
 \operatorname{Tr}O_\alpha^4=2424,
\]

with spectral radius \(7/8\). These are direct spectroscopy or randomized
trace-estimation targets, and they distinguish the true vertex zero mode from
the bare Pauli impostor, whose squared trace would be 98304.

## Executable covariance

The 24 explicit Gram-basis minimal vectors have been compiled. For both
published Leech generators \(A=G^T\), the verifier checks all 48 identities

\[
 A R_\alpha=R_{A\alpha}A.
\]

Together with Clifford covariance of \(P_{[\alpha]}\), this proves covariance
of the full zero-mode family. The same closed formula applies to all 98280
antipodal minimal-vector pairs, although the remaining 98256 have not yet
been emitted as a hardware table.

## New frontier

The minimal-vector half of the non-universal \(U\to\operatorname{End}(T)\)
action is now source-normalized. [Wave 7.153](frontier_wave7_153_moonshine_oscillator_bilinear_twisted_zero_modes.md)
subsequently closes all 300 symmetric oscillator-bilinear zero modes. With
both families present,
invariance of the Griess form can transpose that action into the full
\(T\times T\to U\) product and expose held-out Norton--Sakuma tests on the
same carrier.

## Sources and corpus links

- Bakalov and Kac, [*Twisted Modules over Lattice Vertex Algebras*, equations 4.26–4.28 and 4.38](https://arxiv.org/abs/math/0402315).
- Yamauchi, [Leech twisted-module construction, Section 6.2](https://www.math.twcu.ac.jp/~yamauchi/math/phd/myphd.pdf).
- [Semidirect symmetry lift](frontier_wave7_151_moonshine_2b_centralizer_semidirect_trace_protocol.md)
- [Minimal-pair/Pauli ground bridge](frontier_wave7_149_leech_minimal_pair_to_pauli_cross_sector_action.md)
- [Oscillator-bilinear twisted zero modes](frontier_wave7_153_moonshine_oscillator_bilinear_twisted_zero_modes.md)
