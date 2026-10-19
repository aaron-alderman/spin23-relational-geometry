# The Gaussian Arrow Condition Reduces Four Deformation Classes to an Affine Pair

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B07, B09, B10, B11, B12, B13 and B14  
**Claim status:** exact cohomological classification conditional on the Gaussian deformation landing in the certified tensor arrow; the final choice inside the pair remains open

## Executive result

The previous cycle showed that naive dual-number scalar extension leaves four nilpotent cohomology directions. The existing source computation already contains more structure than that dimension count suggested.

The four named residual classes

\[
u,qquad e_1,qquad e_0,qquad e_4
\]

form a genuine basis of

\[
H^1(G,\mathfrak o)cong\mathbb F_2^4.
\]

Universal abelianized evaluation sends them to

\[
u\mapsto E_{11},
\qquad
e_1\mapsto E_{11},
\qquad
e_0\mapsto E_{12},
\qquad
e_4\mapsto E_{22}.
\]

Its kernel in cohomology is exactly

\[
\boxed{\langle k\rangle,qquad k=u+e_1.}
\]

Therefore the preimage of the tensor arrow \(E_{12}\) is not the full four-space. It is the affine pair

\[
\boxed{
\mathcal A_{12}
=e_0+\langle k\rangle
=\{e_0,\ e_0+u+e_1\}.}
\]

If the Gaussian first-order quadrature is required to deform the certified relation arrow rather than a face, these are the only two cohomology candidates.

The ambiguity is not gauge: \(k\ne0\) in \(H^1\). It is invisible only to universal tensor evaluation. A higher ramified, quartic or pre-coinvariant selector must decide between the two.

## 1. From presentation lifts to deformation cohomology

The homogeneous presentation-lift calculation gives

\[
\dim Z^1=17,
\qquad
\dim B^1=13,
\qquad
\dim H^1=4.
\]

Here:

- \(Z^1\) is the space of infinitesimal orthogonal representation deformations;
- \(B^1\) consists of infinitesimal conjugations;
- \(H^1\) records inequivalent first-order deformations.

The stable ten-plane contributes one nonzero cohomology class \(u\). The quotient beyond \(B^1+U\) contributes three further classes, represented by

\[
e_1,e_0,e_4.
\]

Exact reduction modulo the 13-dimensional coboundary space confirms that all sixteen sums of

\[
u,e_1,e_0,e_4
\]

represent distinct cohomology classes. Thus these four elements are a basis of \(H^1\).

## 2. Universal evaluation on cohomology

The two abelianized group channels and two tangent coinvariant channels form

\[
G_{\rm ab}^*\otimes\mathfrak o_G.
\]

In the certified ordered bases, the four cohomology basis vectors evaluate as

\[
\begin{array}{c|c|c}
\text{class}&\text{binary tensor}&\text{matrix corner}\\
\hline
u&1000&E_{11}\\
e_1&1000&E_{11}\\
e_0&0100&E_{12}\\
e_4&0001&E_{22}
\end{array}
\]

The image has rank three. Exhaustion of all sixteen cohomology classes gives the zero preimages

\[
0,qquad u+e_1.
\]

Hence

\[
\ker\mathcal E_{H^1}
=\langle u+e_1\rangle.
\]

This is a nonzero cohomology kernel, not a coboundary kernel.

## 3. Preimages of the three occupied corners

Every occupied tensor corner has exactly two cohomology preimages:

\[
\mathcal E^{-1}(E_{11})
=\{u,e_1\},
\]

\[
\mathcal E^{-1}(E_{12})
=\{e_0,e_0+u+e_1\},
\]

\[
\mathcal E^{-1}(E_{22})
=\{e_4,e_4+u+e_1\}.
\]

Each pair is a coset of the same invisible line \(\langle k\rangle\).

The exact mask output in the basis \((u,e_1,e_0,e_4)\) is:

\[
\begin{array}{c|c}
\text{target}&\text{masks}\\
\hline
0&0,3\\
E_{11}&1,2\\
E_{12}&4,7\\
E_{22}&8,11
\end{array}
\]

This complete fiber classification is stronger than saying evaluation has rank three.

## 4. Why \(e_0\) is now special—but not uniquely selected

The earlier \(4+1+2\) flag identified:

- \(e_1\) as the unique non-gauge moving line;
- \(e_0,e_4\) as the stationary plane.

Clean group evaluation detected only \(e_4\), while \(e_0\) appeared only in the contaminated local-reflection channel. Universal evaluation later placed \(e_0\) in the off-diagonal tensor corner.

The Gaussian arithmetic branch asks for a nilpotent deformation of the relationship arrow. Under that condition, \(e_0\) is the distinguished named representative.

However,

\[
e_0+k=e_0+u+e_1
\]

has the same tensor image. Since \(k\) is nonzero in cohomology, choosing \(e_0\) rather than \(e_0+k\) requires real additional information.

This recasts the old “contamination” as a precise extension ambiguity:

\[
\text{stationary arrow deformation}
\quad+\quad
\text{evaluation-invisible carrier/moving relation}.
\]

## 5. Candidate selectors for the affine pair

Several existing structures could distinguish the two candidates.

### Ramified lift to \((1+i)^3\)

One candidate may lift to a genuine order-four Gaussian action while the other fails the presentation or orthogonality relations.

### Quartic orientation character

The independent \(\mathbb Z_4\) character may evaluate differently on the invisible class \(k\), selecting one coset representative.

### Opposite glue face

The dual discriminant face may pair nontrivially with \(k\), even though universal coinvariant evaluation kills it.

### Furey conjugation

A pre-coinvariant pullback of dagger or survivor exchange may distinguish a pure stationary arrow from one shifted by the carrier/moving extension.

### Higher compatibility obstruction

The two candidates may have different obstruction classes at the next non-linear lift level, even though their first tensor evaluations coincide.

None has yet been computed.

## 6. Dependency graph

\[
\begin{array}{c}
H^1(G,\mathfrak o)\cong\mathbb F_2^4\\
\downarrow\ \mathcal E\\
\langle E_{11},E_{12},E_{22}\rangle\\
\downarrow\ \text{require Gaussian arrow target}\\
\mathcal A_{12}=\{e_0,e_0+k\}\\
\downarrow\\
\begin{array}{c}
\text{quartic / ramified / glue / Furey selector}\\
\text{not yet constructed}
\end{array}
\end{array}
\]

The naive four-dimensional deformation search has therefore been reduced to a two-point obstruction problem.

## 7. Claim ledger

### Established

- \(u,e_1,e_0,e_4\) form a basis of \(H^1\);
- their sixteen sums remain distinct modulo \(B^1\);
- universal evaluation has rank three on this cohomology basis;
- its kernel is exactly the nonzero line \(\langle u+e_1\rangle\);
- every occupied tensor corner has exactly two cohomology preimages;
- the arrow preimage is \(\{e_0,e_0+u+e_1\}\);
- these two candidates are not gauge-equivalent.

### Conditional bridge

- the Gaussian nilpotent quadrature must evaluate to the same \(E_{12}\) corner as the certified finite relationship arrow;
- one member of the affine pair extends to the charged Gaussian/Furey arrow.

### Not established

- which member of the pair is Gaussian-liftable;
- whether the quartic character detects \(k\);
- whether \(k\) has an opposite-glue pairing;
- whether either candidate preserves the full source orthogonal form over the ramified tower;
- a physical interpretation of \(k\).

## 8. Stop-everything and falsification gates

### Stop-everything positive

Exactly one of

\[
e_0,qquad e_0+u+e_1
\]

lifts through \(\mathbb Z[i]/(1+i)^3\), carries the quartic phase as multiplication by \(i\), and maps to the charged Furey Peirce arrow. That would provide a source-selected complex relationship direction.

### Falsifiers

- neither member admits a source-compatible ramified lift;
- both lift with identical higher invariants and no available source selector;
- the quartic and glue data annihilate \(k\) at every relevant level;
- a lift exists but maps to a diagonal face rather than the relationship corner.

## 9. Next executable tests

1. Evaluate the quartic orientation character on representatives of \(k=u+e_1\).
2. Construct the obstruction equations for each affine candidate at the \((1+i)^3\) rung.
3. Pair both candidates with the opposite glue-face quotient before taking coinvariants.
4. Test whether Furey exchange sends one candidate to its dagger reverse and mixes the other with a diagonal class.

## Certificate and companions

- [Strengthened five-bit cocycle certificate](../../../verification/compute/compute_five_bit_shell_lift_cocycle_first_congruence_layer.mjs)
- [Dual-number scalar-extension no-go](573_naive_dual_number_extension_doubles_the_entire_cocycle_flag_and_cannot_select_the_gaussian_quadrature.md)
- [Gaussian arithmetic lift](572_the_real_and_gaussian_tro_lifts_have_the_same_binary_arrow_and_split_at_the_ramified_first_order.md)
- [Universal three-corner quotient](566_universal_abelianized_evaluation_recovers_an_exact_one_carrier_two_face_quotient.md)
- [Diagonalized \(4+1+2\) flag](563_the_four_plus_one_plus_two_flag_diagonalizes_but_theta_and_clifford_identifications_remain_pinned.md)
