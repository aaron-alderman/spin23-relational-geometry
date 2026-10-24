# Frontier Wave 7.10: Two-Projector Invariants and the Oriented Feedback Boundary

**Date:** 24 October 2026  
**Status:** exact invariant classification and equilibrium orientation no-go

## Result

The wall-localized determinant in [wave 7.9](frontier_wave7_09_wall_localized_response_closes_the_first_toy_loop.md) is not accidentally blind to orientation. Every scalar depending on two real rank-one projectors and invariant under the full orthogonal group is a function of their overlap

\[
\boxed{t=\operatorname{Tr}(PY)=\cos^2\theta.}
\]

Consequently, an ordinary (O(2))-invariant equilibrium potential can select alignment or misalignment, but cannot distinguish (	heta) from (-	heta), a clockwise from an anticlockwise lift, or (J) from (J^{-1}).

This is the exact boundary between the two rails and the oriented crossbars.

## 1. Classification of an ordered pair of projector lines

Choose

\[
Y=\begin{pmatrix}1&0\\0&0\end{pmatrix},
\qquad
P(\theta)=
\begin{pmatrix}
\cos^2\theta&\cos\theta\sin\theta\\
\cos\theta\sin\theta&\sin^2\theta
\end{pmatrix}.
\]

Simultaneous orthogonal conjugation preserves (t=\operatorname{Tr}(PY)). Conversely, two ordered pairs of real rank-one projectors with the same (t) are related by an orthogonal transformation: reflection identifies the two signs of their relative angle.

Therefore the orbit space is the interval

\[
(P,Y)/O(2)\cong[0,1],
\]

and every invariant scalar has the form

\[
V(P,Y)=f\!\left(\operatorname{Tr}(PY)\right).
\]

At lowest analytic order,

\[
V=c_0+c_1\operatorname{Tr}(PY)+\cdots.
\]

The sign of (c_1) decides whether alignment or orthogonality is preferred. Symmetry fixes the coordinate, not the sign or magnitude of its dynamics.

## 2. The oriented lift

Choose an orientation tensor

\[
J=\begin{pmatrix}0&-1\\1&0\end{pmatrix}.
\]

Then the pseudoscalar

\[
\boxed{
\chi(P,Y)=\operatorname{Tr}\!\left(J^T[P,Y]\right)=\sin2\theta
}
\]

changes sign under reflection. It satisfies

\[
\boxed{
\chi^2=4t(1-t).
}
\]

Thus (t) is the unoriented base coordinate, while (chi) distinguishes the two oriented sheets away from alignment and orthogonality. Supplying (J) is exactly the extra orientation datum that the projector-only and director-only analyses demanded.

## 3. Why an equilibrium determinant still loses the sign

The most direct Hermitian chiral extension of the wave-7.9 kernel is

\[
A_h
=a(t)I+ih[P,Y],
\qquad
a(t)=m^2+g(1-t).
\]

Because (i[P,Y]) has eigenvalues (pm\sqrt{t(1-t)}),

\[
\det A_h
=a(t)^2-h^2t(1-t).
\]

The full equilibrium fluctuation determinant is again a function of (t) alone. The two oriented branches occur as a conjugate or paired spectrum, and their product erases the sign.

This gives a stronger no-go:

\[
\boxed{
\text{an unpolarized equilibrium determinant of a paired doublet cannot supply oriented feedback.}
}
\]

Adding (i[P,Y]) to the microscopic kernel is not enough if the observable multiplies both branches symmetrically.

## 4. What can retain orientation

At least one of the following must prevent paired cancellation:

- a coherent interferometric measurement of the transported frame;
- a polarized or selectively occupied branch;
- a source that couples to the pseudoscalar (chi);
- a chiral boundary condition or oriented wall normal;
- a nonequilibrium current odd under reversal;
- the phase of a determinant or Pfaffian when that phase is physically defined;
- a loop protocol whose reversal is independently recorded.

Each option adds a declared physical datum. None can be replaced by mode count or an unoriented free-energy minimum.

## 5. Selection and chirality are different bifurcations

The overlap potential can first select a line:

\[
P\sim Y.
\]

An oriented channel can then select a lift:

\[
(P,Y,J)
\longrightarrow
\operatorname{sign}\chi.
\]

At (chi=0), the two oriented sheets meet. This occurs at aligned or orthogonal projectors, exactly where the commutator vanishes. An oriented signal must therefore be probed on a noncommuting path, not only at the selected endpoint.

The experimental consequence is sharp: static equilibrium alignment measures (t); loop reversal, coherent phase or odd current measures (chi). Treating them as the same observable would erase the very datum needed to distinguish the lift.

## 6. Implication for the admissibility matrix

The minimal state-and-record packet now has a graded structure:

\[
\begin{array}{c|c|c}
\text{datum}&\text{symmetry level}&\text{role}\\ \hline
P,Y&O(2)\text{-covariant projectors}&\text{relational selection}\\
t=\operatorname{Tr}(PY)&O(2)\text{-invariant scalar}&\text{equilibrium potential/Hessian}\\
J&SO(2)\text{ orientation}&\text{choice of lift convention}\\
\chi&SO(2)\text{-invariant pseudoscalar}&\text{oriented response}\\
\operatorname{Hol}&\text{path-dependent lift}&\text{coherent accumulated rotation}
\end{array}
\]

This is a small but genuine piece of the “matrix to end all matrices”: the entries are not merely quantities, but quantities together with the transformation class that determines which experiments can see them.

## 7. Next finite target

The next executable target is a three-record experiment on one carrier:

1. an equilibrium channel measuring (t) and the selector Hessian;
2. a coherent or reversal-odd channel measuring (chi);
3. a population channel showing whether paired branches are equally occupied.

The discriminator is whether the odd channel vanishes when populations are symmetrized while the even selector potential remains. That is the cleanest separation of projective selection from oriented holonomy.

## Certificate

The companion [two-projector invariant certificate](../../../../verification/verify/verify_two_projector_oriented_invariant_boundary.mjs) verifies the overlap classification, reflection parity, the double-cover identity and paired-determinant sign erasure.

