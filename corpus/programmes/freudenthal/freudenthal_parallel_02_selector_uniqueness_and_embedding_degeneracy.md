# Freudenthal Parallel Branch 02: Selector Uniqueness and Embedding Degeneracy

**Date:** 17 October 2026  
**Status:** exact restriction and obstruction theorem; physical origin of the selected link line remains open  
**Certificate:** [verify_freudenthal_selector_uniqueness_and_line_degeneracy.mjs](../../../verification/verify/verify_freudenthal_selector_uniqueness_and_line_degeneracy.mjs)

## Executive result

The first Freudenthal restriction produced two apparently competing facts:

1. the quartic is generically changed by the selector (H_2(\mathbb O)\to H_2(\mathbb R));
2. specially balanced imaginary source--response pairs can have zero defect.

This note separates accidental pairwise cancellation from preservation of a physical source--response family.

Relative to any chosen link line, requiring quartic preservation for independently variable sources and responses forces all transverse octonionic components to vanish. Thus the selected (H_2(\mathbb R)) slice is the unique factorwise quartic-preserving slice containing positive diagonal probes.

However, the Freudenthal quartic is identical on every unit octonionic link line. It cannot choose which copy of (H_2(\mathbb R)) is physical. The existing (\mathbb{RP}^7\), color-compatible circle and final two-axis degeneracies therefore survive unchanged.

## 1. Accidental zero-defect pairs

Write source and response links as

\[
z=r+u,
\qquad
w=s+v,
\qquad
u,v\in\mathbb R^7.
\]

Using

\[
U=|u|^2,
\quad V=|v|^2,
\quad D=u\cdot v,
\]

the previously derived defect is

\[
q_{\mathbb O}-q_{\mathbb R}
=-8\left[D^2+tD+A_0V+C_0U-UV\right].
\]

For fixed lengths and diagonal data, zero defect is possible when

\[
D=\frac{-t\pm\sqrt{t^2-4(A_0V+C_0U-UV)}}{2}
\]

is real and obeys the Cauchy bound (D^2\le UV). These are correlated, generally anti-aligned source--response pairs. They do not define preservation under independent variation.

## 2. Independent positive probes force the real slice

Set the response link to zero while keeping a positive diagonal response

\[
C=\begin{pmatrix}p&0\\0&q\end{pmatrix},
\qquad p,q>0.
\]

Then (V=D=0), (C_0=pq>0), and the defect becomes

\[
\boxed{
q_{\mathbb O}(A,C)-q_{\mathbb R}(EA,EC)
=-8pq\,|u|^2.
}
\]

It vanishes if and only if (u=0). Exchanging source and response gives the same result for (v).

Therefore any product family

\[
\mathcal S_{\rm source}\times\mathcal S_{\rm response}
\]

that:

- contains positive diagonal probes in both factors;
- permits independent source and response variation; and
- preserves the Freudenthal quartic under the declared conditional expectation

must lie entirely in the selected (H_2(\mathbb R)\) slice.

This makes the real slice canonical **conditional on the projection**. Fine-tuned cancellation between discarded source and response components is insufficient.

## 3. The quartic cannot select the projection itself

Fix the diagonal Peirce direction. Every unit octonion

\[
q\in S^7\subset\mathbb O
\]

defines a rank-two real Jordan subalgebra

\[
J_q=\left\{
\begin{pmatrix}a&cq\\c\bar q&b\end{pmatrix}:
a,b,c\in\mathbb R
\right\}
\cong H_2(\mathbb R).
\]

For source and response embedded along the same (q), norm multiplicativity gives

\[
|cq|^2=c^2,
\qquad
\operatorname{Re}\bigl((cq)\overline{(dq)}\bigr)=cd.
\]

Consequently the restricted Freudenthal quartic is independent of (q):

\[
q_{J_q}(A,C)
=-2\left[(\operatorname{tr}AC)^2-4\det A\det C\right]
\]

for every unit link line.

The raw embedding space remains

\[
S^7/\{q\sim-q\}\cong\mathbb{RP}^7.
\]

The Freudenthal invariant supplies no preference within it.

If source and response use different lines \(q,r\), their mixed quartic depends on

\[
\operatorname{Re}(q\bar r)=q\cdot r.
\]

The quartic can therefore measure relative alignment between two already chosen embeddings, but cannot provide an absolute choice.

## 4. Comparison with the established Furey degeneracy

The existing stabilizer calculation shows:

\[
\mathbb{RP}^7
\xrightarrow{SU(3)_u}
\mathbb{RP}^1
\xrightarrow{\kappa_u}
\{\mathbb R1,\mathbb Ru\}.
\]

The first reduction retains the circle of lines in

\[
\operatorname{span}_{\mathbb R}\{1,u\},
\]

while conjugation parity leaves the scalar and imaginary axes. Since the Freudenthal quartic is the same on both axes, it does not resolve the final parity choice.

Thus the division of labour is now exact:

- Freudenthal geometry tests source--response matching after a line is chosen;
- Furey color and conjugation data reduce the line degeneracy;
- an additional physical parity or dynamical selector is still required.

## 5. Consequence for the (E_8)-crystal reading

The exceptional parent is compatible with every response-line orientation and records their relative angles. That is appropriate for a surrounding configuration space or crystal, but insufficient for selecting the observed face.

The result supports:

\[
\text{exceptional parent architecture}
\longrightarrow
\text{family of admissible faces},
\]

not yet:

\[
\text{exceptional invariant}
\longrightarrow
\text{unique physical face}.
\]

## 6. Next gates

1. Compute the restricted Freudenthal triple product, not only its quartic, and test whether it distinguishes the scalar and Furey-imaginary axes.
2. Determine whether the orientation-odd Furey coherence has a nonzero embedding in the Freudenthal symplectic pairing.
3. Test whether Ward/UV normalization selects a link line or merely further reduces transformations after the line has been chosen.
4. Treat any pairwise zero-defect cancellation as physical only if a declared action forces the required source--response correlation.

## Stop conditions

Do not claim that the Freudenthal quartic selects (H_2(\mathbb R)) absolutely. It selects the real slice only relative to an already declared projection and independent positive probes.

Demote the exceptional parent to a nonselecting ambient geometry if neither its triple product nor its symplectic pairing distinguishes the remaining Furey-compatible axes or yields a new physical constraint.
