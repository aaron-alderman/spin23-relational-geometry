# The Leech Seam Needs One Affine Orientation Bit to Intertwine Sign and Theta Shift

**Date:** 23 October 2026  
**Status:** exact finite intertwiner, exact bare-reversal obstruction, and exact finite Golay provenance via Claim 1793; physical seam realization remains open  
**Certificate:** [Leech seam affine-orientation verifier](../../../verification/verify/verify_leech_seam_affine_orientation_intertwiner.mjs)

## Result

For the orientation-twisted determinant-fifteen double

\[
K=L_{15}\oplus L_{15}(-1),
\]

exchanging the two summands sends the discriminant form $Q$ to $-Q$. On the ternary primary part, with $u=a-b$ and $v=a+b$, it acts as

\[
(u,v)\longmapsto(-u,v),
\qquad uv\longmapsto-uv.
\]

This is the required orientation reversal. It cannot, by itself, produce the selected affine theta shift. Modulo two, the sign of the lattice form disappears, so the induced norm refinement

\[
q_0(a,b,c,d)=ab+cd
\]

is fixed by the same summand exchange. More generally, an integral isometry preserves its norm refinement; a bare lattice reversal cannot turn $q_0$ into a distinct quadratic refinement.

The minimal finite repair is one seam-orientation bit $\epsilon\in\mathbb F_2$. Let

\[
w=(1,1,1,1),
\qquad
q_\epsilon(x)=q_0(x)+\epsilon\langle w,x\rangle.
\]

The augmented reversal

\[
\widehat R:(x,\epsilon)\longmapsto(Rx,\epsilon+1)
\]

simultaneously reverses the ternary hyperbolic form and changes the binary refinement by

\[
q_{\epsilon+1}(Rx)-q_\epsilon(x)=\langle w,x\rangle.
\]

Thus the lattice sign and affine theta shift can be intertwined, but only after the orientation line is retained as an affine torsor rather than collapsed to a lattice automorphism.

## Boundary

This closes the algebraic existence part of the Leech-seam gate and rules out the unaugmented construction. [Claim 1793](1793_the_rule60_golay_kernel_supplies_the_unique_tm23_leech_affine_seam_torsor.md) closes the finite provenance step: the kernel $\{0,\mathbf1\}$ of Rule 60 on $G_{23}$ supplies the two-sheeted affine torsor, and there is a unique nonzero map $\mathbf1\mapsto v$ to the machine-selected line. Only physical realization of that finite seam remains open.

## Consequence for Spin(2,3)

The construction is compatible with both finite reductions of the same integral arithmetic carrier: its ternary component reverses the split two-qutrit form, while its binary component moves between affine genus-two theta refinements. Through $Sp(4,\mathbb Z)\subset Sp(4,\mathbb R)\cong Spin_0(2,3)$, this is a precise arithmetic seam. It is not yet a microscopic or physical Spin(2,3) interaction.

