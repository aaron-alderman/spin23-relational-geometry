# The Jordan Triple Is the Polarization of Feshbach Relational Self-Energy

**Date:** 17 October 2026  
**Branches:** B01, B04, B05, B07, B08, B11 and the Jordan-triple recursion branch  
**Claim status:** exact algebraic bridge; physical closure under all required relation maps remains conditional  
**Certificate:** [verify_jordan_triple_as_polarized_feshbach_self_energy.mjs](../../../verification/verify/verify_jordan_triple_as_polarized_feshbach_self_energy.mjs)

## Executive result

For symmetric carrier relation maps, the Jordan triple

\[
\{A,G,C\}=\frac12(AGC+CGA)
\]

is exactly the polarization of the quadratic Feshbach self-energy

\[
\Sigma_G(X)=XGX.
\]

Explicitly,

\[
\boxed{
\{A,G,C\}
=\frac12\left[
\Sigma_G(A+C)-\Sigma_G(A)-\Sigma_G(C)
\right].
}
\]

This supplies a precise answer to what “Jordan-triple recursion” can mean physically:

\[
\boxed{
\text{two-sided relational elimination}
+\text{polarization}
=\text{Jordan triple}.
}
\]

For the two-face carrier \(J=H_2(\mathbb R)\), the Tits--Kantor--Koecher completion of this triple is

\[
\mathfrak{sp}(4,\mathbb R)\cong\mathfrak{so}(2,3).
\]

The missing implication is therefore no longer purely formal. It is conditional on the physical response family supplying the full symmetric carrier and enough independently variable relation maps for the polarization to be operational rather than only algebraic.

## 1. Schur-complement origin

Consider a carrier coupled symmetrically to an internal block whose Green matrix is \(G\). If the two-sided coupling is \(X\), eliminating the internal block produces a carrier correction of the form

\[
\Sigma_G(X)=XGX.
\]

Now excite two relation directions \(A\) and \(C\) simultaneously. The cross-response is

\[
\begin{aligned}
\Sigma_G(A+C)-\Sigma_G(A)-\Sigma_G(C)
&=(A+C)G(A+C)-AGA-CGC\\
&=AGC+CGA.
\end{aligned}
\]

Dividing by two gives the special Jordan triple exactly.

The symmetrization is not decorative. It is what keeps the effective carrier kernel symmetric when the ordering of the two outer relation maps matters.

## 2. The original \(A\,X\,B\) intuition

The user's starting form was an operator \(X\) nested between stress-response components \(A\) and \(B\). The typed version is:

\[
\text{outer relation}
\;\circ\;
\text{internal propagator}
\;\circ\;
\text{outer relation}.
\]

There are three related operations:

1. \(AGC\): an ordered passage from one carrier relation through the internal propagator to another;
2. \((AGC+CGA)/2\): the symmetric observable response;
3. \(XGX\): the coincident-relation quadratic response whose polarization recovers the second operation.

In established language these belong to Schur-complement/Feshbach realization theory, quadratic Jordan representations, and Jordan triple systems. The research-specific contribution is the proposal that the physically selected carrier is the two-face response space \(H_2(\mathbb R)\).

## 3. Positive physics versus full algebraic completion

For a passive internal system, \(G\) is positive in the relevant Euclidean or spectral domain. This initially gives triples only with a positive middle argument.

That is enough to linearly generate every symmetric middle direction. For arbitrary \(B=B^T\), choose \(\alpha\) large enough that

\[
B_+=B+\alpha I>0,
\qquad
B_-=\alpha I>0.
\]

Then

\[
B=B_+-B_-,
\]

and by linearity,

\[
\{A,B,C\}
=\{A,B_+,C\}-\{A,B_-,C\}.
\]

Thus the passive cone supplies the physical generating region, while its linear span supplies the complete Jordan triple. This does not mean that an indefinite propagator is itself physical.

## 4. The same quadratic map is the symplectic Riccati wing

The infinitesimal fractional action of \(\mathfrak{sp}(4,\mathbb R)\) on a symmetric carrier \(Z\) is

\[
\delta Z
=B_0+AZ+ZA^T-ZCZ.
\]

The special-conformal term is

\[
-ZCZ=-\Sigma_C(Z).
\]

Polarizing this nonlinear Riccati term gives

\[
-\frac12(XCY+YCX)=-\{X,C,Y\}.
\]

Therefore the three structures previously treated as neighboring analogies are the same operation at different levels:

- Feshbach elimination gives the quadratic self-energy;
- polarization gives the Jordan triple;
- exponentiating the Riccati vector fields gives the fractional \(Sp(4,\mathbb R)\) action.

This is the cleanest mathematical route currently available from relational composition to the \(Spin_0(2,3)\) response geometry.

## 5. Conditional implication chain

The defensible implication is now

\[
\begin{aligned}
&\text{positive two-face response kernel}\\
&+\text{two-sided symmetric relation maps}\\
&+\text{Feshbach elimination}\\
&+\text{operational polarization}\\
&+\text{full span of }H_2(\mathbb R)\\
&\Longrightarrow
\text{Jordan triple on }H_2(\mathbb R)\\
&\Longrightarrow
\mathfrak{tkk}(H_2(\mathbb R))
=\mathfrak{sp}(4,\mathbb R)
\cong\mathfrak{so}(2,3).
\end{aligned}
\]

At group level, after choosing the connected covers described in document 47,

\[
Sp(4,\mathbb R)\cong Spin_0(2,3).
\]

The first five lines are physical hypotheses or constructions. The last two arrows are exact mathematics.

## 6. What document 667 contributes

The broken-phase incidence/\(B-L\) construction supplies:

- a positive two-face response;
- an explicit relation map built from chiral source vectors;
- four full-rank spectral residues;
- a response family spanning all of \(H_2(\mathbb R)\);
- an exact Feshbach realization.

What it does not yet supply is independent laboratory control of arbitrary symmetric outer maps \(A,C\). Its Jordan closure is therefore an algebra generated by the response family, not yet a demonstrated symmetry or set of physically executable operations.

## 7. Stop-everything criteria

Stop claiming a physical Jordan-triple recursion if:

1. only one fixed coupling map exists and polarization cannot be operationally or parametrically defined;
2. the source family spans only a commuting two-dimensional subalgebra;
3. eliminating the internal sector produces nonsymmetric or indefinite physical kernels after the correct quotient;
4. the quadratic self-energy is confused with a symmetry transformation of one fixed Hamiltonian;
5. algebraic subtraction of two positive experiments is treated as a negative-probability experiment.

## 8. Next gates

1. Identify the physical parameters whose mixed second response performs the polarization.
2. Express the document-667 coupling family as derivatives with respect to source strengths or Yukawa spurions.
3. Test whether the mixed second derivative closes on the same renormalized operator basis.
4. Determine the Ward-compatible sub-triple when the \(B-L\) source is fixed.
5. Lift the finite identity to continuum Green operators and establish its domain conditions.

## Reproducibility

    node scripts\verify_jordan_triple_as_polarized_feshbach_self_energy.mjs
