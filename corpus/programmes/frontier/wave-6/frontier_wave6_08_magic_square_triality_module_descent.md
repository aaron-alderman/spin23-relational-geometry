# Frontier Wave 6.8: Magic-Square Triality Module Descent

**Date:** 24 October 2026  
**Status:** exact module-index descent; physical action remains open  
**Certificate:** [verify_magic_square_triality_module_descent.mjs](../../../../verification/verify/verify_magic_square_triality_module_descent.mjs)

## Result

Apply the quotient analysis to the actual magic-square module pattern of [claim 322](../../../claims/0300-0399/322_triality_gives_three_overlapping_generation_choices_not_three_independent_generations.md):

\[
W=A\oplus B\oplus C,
\qquad
\dim_{\mathbb R}A=\dim_{\mathbb R}B=\dim_{\mathbb R}C=16.
\]

Let \(P\) implement the oriented triality cycle

\[
A\to B\to C\to A,
\qquad P^3=1.
\]

Relative to this action, the 48-real-dimensional carrier decomposes as

\[
\boxed{
W=W_{\rm sing}\oplus W_{\rm tri},
\qquad
\dim W_{\rm sing}=16,
\qquad
\dim W_{\rm tri}=32.
}
\]

The cyclic invariant space and coinvariant quotient both have dimension 16. The two-dimensional sheet-standard representation tensored with the 16-dimensional module supplies the 32-dimensional triality-difference sector.

## Fate of the three tangent-generation choices

The three tangents are

\[
T_A=B\oplus C,\qquad
T_B=C\oplus A,\qquad
T_C=A\oplus B.
\]

Each has dimension 32. Under the coinvariant quotient

\[
q(a,b,c)=a+b+c
\]

after using the declared triality maps to identify the three module fibers, every tangent maps surjectively onto the same 16-dimensional quotient:

\[
q(T_A)=q(T_B)=q(T_C)=W_{C_3}.
\]

Each restricted map has a 16-dimensional anti-diagonal kernel.

Therefore folding does not turn the three overlapping tangent choices into three independent generations. It does the opposite: it identifies all three choices as one quotient module.

This strengthens the existing obstruction:

\[
\text{three tangent choices}
\not\Rightarrow
\text{three generation fibers},
\]

and now also

\[
\text{triality folding}
\Rightarrow
\text{one common 16-dimensional quotient}.
\]

## A canonical complex structure on the discarded sector

The oriented cycle contains more information than the unoriented quotient. Define

\[
\boxed{
J_{\rm tri}
=\frac{P-P^2}{\sqrt3}.
}
\]

Let

\[
\Pi_{\rm sing}=\frac13(1+P+P^2),
\qquad
\Pi_{\rm tri}=1-\Pi_{\rm sing}.
\]

Then

\[
J_{\rm tri}\Pi_{\rm sing}=0,
\qquad
J_{\rm tri}^2=-\Pi_{\rm tri}.
\]

Thus \(J_{\rm tri}\) is a canonical complex structure on the 32-dimensional triality-difference sector. A sheet reflection \(R\) obeys

\[
R J_{\rm tri}R^{-1}=-J_{\rm tri}.
\]

The complex orientation is therefore selected by the orientation of the \(C_3\) cycle and reversed by the residual transposition.

This is a precise realization of the corpus's recurring “quarter-turn” motif, but on a restricted carrier:

- it acts on the triality doublet, not the singlet;
- it follows from an oriented cycle, not from the triple bond alone;
- it supplies kinematic complex structure, not dynamics;
- reversing sheet orientation complex-conjugates it.

## Bilinear-form boundary

Triality symmetry does not fix a unique metric on all of \(W\). An \(S_3\)-invariant symmetric sheet bilinear has two independent coefficients:

\[
g=\lambda_{\rm sing}\Pi_{\rm sing}
+\lambda_{\rm tri}\Pi_{\rm tri}.
\]

Hence the relative normalization of the singlet and complex triality sector remains free. The ambient direct-sum metric chooses one ratio, but that is inherited input rather than a prediction of triality.

This mirrors the earlier triple-bond warning: orbit size fixes the relative root metric only after a parent metric and normalization rule are declared.

## Relation to the sign cubic

The Vandermonde/sign cubic lives entirely on the triality-difference sector and vanishes on \(W_{\rm sing}\). Its sign is reversed by the same reflection that sends

\[
J_{\rm tri}\mapsto-J_{\rm tri}.
\]

Thus the sign cubic and complex orientation are compatible pieces of one oriented \(C_3\) structure. This does not yet select the physical CP doublet because an intertwiner from this module-index complex structure to the Furey matter complex structure is still absent.

The precise next map is

\[
(W_{\rm tri},J_{\rm tri})
\longrightarrow
(V_{\rm Furey},J_{\rm Furey})
\]

with Standard-Model equivariance, CAR compatibility and a fixed normalization.

## Branch verdict

The actual magic-square module descent is now exhausted at the linear level:

- fixed module: 16 real dimensions;
- coinvariant module: 16 real dimensions;
- discarded/oriented module: 32 real dimensions with canonical \(J_{\rm tri}\);
- all three tangent choices have the same quotient image;
- symmetry leaves two metric normalizations.

The fold supplies neither three generations nor their mixing. Its new positive contribution is the canonical complex structure on the triality-difference sector. The next admissible branch is the intertwiner classification to existing Furey, Clifford and response complex structures.

