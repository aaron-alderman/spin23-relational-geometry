# Frontier Wave 7.207: Joined-Cell Spectral-Enclosure Admission

**Date:** 25 October 2026

**Status:** enclosure logic executable; full-carrier lower bounds open

**Evidence:** [admission record](../../../../evidence/data/leech-spectral-enclosure-admission-v1.json)

**Executable:** [enclosure controls](../../../../scripts/analyze-leech-spectral-enclosure-admission.mjs)

**Certificate:** [admission verifier](../../../../verification/verify/verify_leech_spectral_enclosure_admission.mjs)

## Why residuals are not lower bounds

The executable includes the Hermitian matrix ${\rm diag}(0,1,10)$ and its
exact eigenvector $(0,0,1)$. Its Rayleigh quotient is 10 and its residual is
zero, yet it is not the ground state. Residual bounds locate some eigenvalue
near a Ritz value; without ordinal or separation information they do not say
which eigenvalue it is. This is the distinction formalized by Stewart's
[Hermitian residual bounds](https://doi.org/10.1137/0612016).

For ${\rm diag}(0,2,5)$, a controlled mixture of the ground and first excited
states has Rayleigh quotient 0.02 and residual norm
$0.1989974874$. Supplying the independently certified next-eigenvalue lower
bound $\beta=2$ makes the Temple expression

\[
 L=\rho-\frac{\lVert r\rVert^2}{\beta-\rho}=0
\]

recover the exact ground lower bound. The neighbouring-eigenvalue premise is
essential; Temple--Kato variants provide lower estimates only with the stated
separation information. See the operator formulation of
[Temple--Kato inequalities](https://arxiv.org/abs/math/0511408).

## Admission rule for the parity gap

At one declared cutoff and Hamiltonian, let the certified sector intervals be

\[
 E_+\in[L_+,U_+],\qquad E_-\in[L_-,U_-].
\]

Then and only then is

\[
 \Delta\in[L_- - U_+,\;U_- - L_+].
\]

A positive-gap certificate requires $L_->U_+$. Ritz energies provide the
upper endpoints. Lower endpoints require a validated theorem whose premises
are machine recorded.

The two selected routes are Lehmann bounds with an independently certified
separator—see Ovtchinnikov's [a posteriori Lehmann analysis](https://doi.org/10.1137/100793062)—or an eigenvalue count from a validated shifted inertia
calculation. LAPACK's symmetric eigensystem documentation describes the
shifted $LDL^T$/bisection machinery used for such counts
([Netlib](https://www.netlib.org/lapack/lug/node48.html)). Neither route is
silently inferred from a small scalar residual.

## Implementation fork

1. On reduced exact systems, construct two or more sector Ritz vectors and
   reproduce exact lower bounds with Temple--Kato and inertia controls.
2. On the full carrier, form a multi-vector MPS Ritz subspace and its residual
   block using the matrix-free MPO action.
3. Supply a separately validated separator by Lehmann or inertia machinery.
4. Compose even and odd intervals only at identical cutoff, coupling and
   channel order.
5. Stop unless the lower gap endpoint is positive and stable under bond and
   cutoff extension.

This packet closes the ambiguity about what “lower enclosure” means. It does
not claim that one has yet been computed for the full carrier.

## Corpus links

- [Cutoff-two bond 56](frontier_wave7_205_leech_z2_matrix_free_bond56.md)
- [Cutoff-three bond-32 audit](frontier_wave7_206_leech_z2_cutoff_three_bond32.md)
- [Original certificate architecture](frontier_wave7_191_leech_joined_cell_mpo_certificate_architecture.md)
