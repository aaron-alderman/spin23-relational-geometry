# Frontier Wave 7.1: Hidden Elimination and the Quadratic Memory Theorem

**Date:** 24 October 2026  
**Status:** exact finite-dimensional linear theorem and triality application  
**Certificate:** [verify_quotient_memory_kernel_quadratic_onset.mjs](../../../../verification/verify/verify_quotient_memory_kernel_quadratic_onset.mjs)

## Exact theorem

Split a linear state into visible and hidden coordinates:

\[
\frac d{dt}
\begin{pmatrix}v\\h\end{pmatrix}
=
\begin{pmatrix}
A_{vv}&A_{vh}\\
A_{hv}&A_{hh}
\end{pmatrix}
\begin{pmatrix}v\\h\end{pmatrix}.
\]

Solving the hidden equation and substituting it into the visible one gives

\[
\dot v(t)=A_{vv}v(t)
+A_{vh}e^{A_{hh}t}h(0)
+\int_0^tK(t-s)v(s)\,ds,
\]

with the exact memory kernel

\[
\boxed{K(t)=A_{vh}e^{A_{hh}t}A_{hv}.}
\]

Thus an eliminated sector can survive dynamically even when it is absent from the visible state coordinates.

## Exact closure criterion

For a linear detector/quotient \(Q\), autonomous reduced dynamics \(\dot y=By\), \(y=Qx\), exists for every resolved state exactly when

\[
QA=BQ
\]

for some \(B\). Equivalently, \(\ker Q\) is invariant under \(A\). This is the linear form of exact lumpability.

The symmetric \(D_4\) star satisfies the criterion: its two outer-difference modes remain inside the detector kernel. They are dark but do not feed memory back into the bright macro-variable.

## Quadratic onset under weak symmetry breaking

Suppose exact symmetry block-diagonalizes visible and hidden sectors, while a centered perturbation \(\varepsilon V\) introduces both couplings:

\[
A_{vh}=\varepsilon B+O(\varepsilon^2),
\qquad
A_{hv}=\varepsilon C+O(\varepsilon^2).
\]

Then

\[
\boxed{
K(t)=\varepsilon^2B e^{A_{hh}^{(0)}t}C+O(\varepsilon^3).
}
\]

The first derivative of the effective memory with respect to the breaking direction vanishes at the symmetric point. The second derivative need not vanish.

This is the general dynamical reason behind the wave-6 result that an unresolved detector is linearly blind to centered triality breaking while its waiting-time law develops quadratic memory.

## Physical implications

1. A clean Markov fit at exact symmetry does not establish that the microscopic system has no hidden modes.
2. Weakly breaking the symmetry can reveal those modes first through memory rather than a shifted mean.
3. The quadratic onset is not specifically exceptional or \(G_2\); it follows from bidirectional visible--hidden coupling.
4. A linear onset is possible if the perturbation also changes the retained block directly or if only one side of the reduction has been centered.
5. Detector bandwidth can create an additional memory kernel and must be calibrated separately from physical hidden-state memory.

## Relation to familiar reductions

The same formula appears as:

- a Schur complement in frequency space;
- a Feshbach self-energy in resolvent language;
- a generalized Langevin/Mori--Zwanzig kernel in dynamical reduction; and
- a non-Markov effective channel after latent-state marginalization.

These are typed versions of one operation, not evidence that their microscopic carriers are identical.

## Experimental discriminator

Measure both the lumped channel and at least one resolved contrast channel while varying breaking amplitude through positive and negative values. A physical hidden-sector kernel predicts:

- an even leading memory amplitude in \(\varepsilon\);
- hidden-pole locations matching the contrast spectrum; and
- disappearance of the kernel when the visible--hidden couplings are independently nulled.

Failure of these relations points to detector filtering or a misspecified latent model rather than the quotient scar.
