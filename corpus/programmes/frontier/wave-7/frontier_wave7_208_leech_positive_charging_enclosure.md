# Frontier Wave 7.208: Positive-Charging Spectral Enclosure

**Date:** 25 October 2026

**Status:** full-carrier cutoff-one gap enclosed; higher-cutoff lower bound quantified but not closed

**Evidence:** [enclosure record](../../../../evidence/data/leech-positive-charging-enclosure-v1.json)

**Executable:** [analytic enclosure](../../../../scripts/analyze-leech-positive-charging-enclosure.mjs)

**Certificate:** [enclosure verifier](../../../../verification/verify/verify_leech_positive_charging_enclosure.mjs)

## Exact lower operator

At charge cutoff \(N\), the joined-cell Hamiltonian is

\[
H_N={U\over2}q^TKq+\sum_{i=1}^{24}
\left[1-{S_i+S_i^T\over2}\right].
\]

The Leech Gram matrix is positive definite, so its inverse \(K\) is positive
definite. Therefore

\[
H_N\ge \sum_i V_{N,i},\qquad V_N=I-(S+S^T)/2.
\]

This is an operator inequality, not an extrapolation. The finite path
operator \(V_N\) has exact eigenvalues

\[
v_k=1-\cos {k\pi\over 2N+2}.
\]

The \(k=1\) eigenvector is inversion even and \(k=2\) is inversion odd. Thus
the global even-sector lower endpoint is \(24v_1\), while the global odd
endpoint is \(23v_1+v_2\).

## First genuine full-carrier gap interval

Combining these analytic lower endpoints with the exact-sector matrix-free
Ritz upper endpoints gives, at cutoff one,

\[
E_+\in[7.0294372515,7.3608776939],\qquad
E_-\in[7.7365440327,8.0418010733],
\]

and therefore

\[
\boxed{\Delta_{N=1}\in[0.3756663388,1.0123638218]}.
\]

The lower endpoint is positive. This certifies a finite-cutoff gap for the
full 24-channel joined carrier without treating a Ritz residual as a lower
bound and without assuming the DMRG state has the correct eigenvalue index.

## What fails at higher cutoff

The same valid but deliberately coarse bound does not close at \(N=2\) or
\(N=3\). At cutoff two, the analytic odd lower endpoint lies about \(0.292\)
below the even Ritz upper endpoint. At cutoff three, the deficit is about
\(0.727\). These are useful design numbers: the next enclosure need only
retain enough certified charging energy to recover those margins.

The result is not a continuum gap and does not establish cutoff convergence.
It is the first rigorously composed lower-and-upper gap interval on the full
joined 24-channel carrier, and it converts “find a lower bound” into a
quantified strengthening problem.

## Next fork

1. Wave 7.209 proves that no positive diagonal split can close cutoff two or
   cutoff three.
2. Use small correlation-preserving positive blocks or a validated
   shifted-inertia/Lehmann calculation.
3. Promote no continuum statement until positive intervals persist under
   increasing charge cutoff and tensor capacity.

## Corpus links

- [Spectral-enclosure admission](frontier_wave7_207_leech_spectral_enclosure_admission.md)
- [Cutoff-two bond 56](frontier_wave7_205_leech_z2_matrix_free_bond56.md)
- [Cutoff-three bond 32](frontier_wave7_206_leech_z2_cutoff_three_bond32.md)
- [Diagonal-enclosure no-go](frontier_wave7_209_leech_diagonal_enclosure_no_go.md)
