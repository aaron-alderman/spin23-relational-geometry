# The Rule-60/Golay Kernel Supplies the Unique TM23–Leech Affine Seam Torsor

**Date:** 23 October 2026  
**Status:** exact finite provenance; physical seam realization remains open  
**Certificate:** [Rule-60/Golay seam-torsor verifier](../../../verification/verify/verify_rule60_golay_kernel_supplies_the_leech_seam_torsor.mjs)

## Result

On the binary Golay code $G_{23}$, the compressed Rule-60 map is

\[
T=1+\sigma,
\qquad
\ker(T|_{G_{23}})=\{0,\mathbf1\}.
\]

Its image has dimension eleven, and every image word has exactly two antecedents $c$ and $c+\mathbf1$. Hence

\[
G_{23}\longrightarrow \operatorname{im}T
\]

is canonically a two-sheeted affine fibre system with deck action $c\mapsto c+\mathbf1$. It has no canonical section, exactly as required for an orientation bit that is relational rather than an absolute binary label.

The TM23 genus-two marking independently selects a nonzero vector $v\in L$. Both

\[
\ker T\cong\mathbb F_2
\qquad\text{and}\qquad
\langle v\rangle\cong\mathbb F_2
\]

are one-dimensional. There is exactly one nonzero linear isomorphism between them:

\[
\mathbf1\longmapsto v.
\]

Combining this unique identification with the affine-orientation construction of claim 1790 makes the Golay deck exchange toggle the seam bit and shift the binary quadratic refinement by the machine-selected direction, while summand reversal negates the ternary hyperbolic form.

## Boundary

This closes the finite provenance part of the Leech seam gate: neither the bit nor its direction is freely selected once the Rule-60 quotient and TM23 marking are both retained. It does not identify the two-sheeted Golay fibre with a physical interface, fermion orientation line, or laboratory degree of freedom. Those are part of the provenance inputs classified in claim 1792.

