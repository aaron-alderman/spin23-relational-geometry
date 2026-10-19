# The Furey Ternary Product Preserves Standard-Model Roots but Breaks Colour–Weak \(SO(10)\) Roots

**Date:** 17 October 2026  
**Branches:** B03, B04, B10 and B11  
**Claim status:** exact finite root-derivation obstruction; full continuous ternary-stabilizer classification remains open

> **Refinement.** The full 45-generator calculation is now complete. The
> unpunctured stabilizer inside compact \(so(10)\) is
> \(\mathfrak u(3)\oplus\mathfrak{so}(4)\), not merely
> \(\mathfrak u(3)\oplus\mathfrak u(2)\). The additional two generators are
> weak pair creation/annihilation; both move \(\nu^c\). Fixing the puncture
> removes them and one Cartan direction, leaving exactly the Standard Model
> Lie algebra. See [the complete puncture-stabilizer theorem](417_the_puncture_neutral_ternary_stabilizer_inside_so10_is_exactly_the_standard_model_lie_algebra.md).

## 1. Representation versus symmetry

The completed Furey matter TRO carries all sixteen weights of one chiral \(SO(10)\) spinor. This does not imply that its ternary multiplication is \(SO(10)\)-invariant.

A Lie generator \(D\) preserves the TRO product only if

\[
D(xy^\dagger z)
=(Dx)y^\dagger z
+x(Dy)^\dagger z
+xy^\dagger(Dz)
\]

for every \(x,y,z\).

The explicit five-oscillator/Furey bijection makes this condition directly testable.

## 2. Standard Model roots pass

Use the compact real root generators

\[
D_{ij}=a_i^\dagger a_j-a_j^\dagger a_i.
\]

For the colour roots

\[
D_{12},\qquad D_{23}
\]

and weak root

\[
D_{45},
\]

the ternary derivation residual is exactly zero on every basis triple.

This agrees with their block action:

- colour acts on \(O_2\) target or source indices;
- weak isospin acts on \(H\) target or source indices;
- both are natural left/right linking-algebra derivations.

## 3. Colour–weak roots fail

The roots mixing a colour oscillator with a weak oscillator do not preserve the rectangular TRO decomposition.

Explicitly,

\[
D_{14},\qquad D_{15},\qquad D_{24}
\]

all have nonzero derivation residual one.

For \(D_{14}\), one witness is

\[
(x,y,z)=(\nu^c,\nu^c,u_1).
\]

The transformed right-hand side contains an \(e^c\) component with coefficient \(-1\), while the transformed ternary product on the left has no such component.

Hence

\[
\boxed{
D_{14}\notin\operatorname{Der}(M_{\rm TRO}).
}
\]

The same obstruction occurs for the other sampled colour–weak roots.

These are precisely the kinds of roots that join quark and lepton sectors in \(SU(5)\) or \(SO(10)\) unification.

## 4. Consequence

The current structure supports the following hierarchy:

\[
\begin{array}{c}
\text{sixteen-dimensional }SO(10)\text{ spinor representation}\\
\downarrow\ \text{choose Furey TRO product}\\
\text{block-preserving colour, weak and diagonal derivations}\\
\downarrow\\
\text{Standard-Model-like gauge algebra plus possible extra }U(1).
\end{array}
\]

Thus the \(SO(10)\) spinor is the representation envelope, while the ternary product is symmetry-breaking data.

This is conceptually important: the code’s five-bit organization need not imply a physical \(SO(10)\) grand-unified gauge symmetry or proton-decay mediators.

## 5. The extra-\(U(1)\) question

Within the number-preserving oscillator algebra, block-preserving roots and all diagonal generators suggest

\[
\mathfrak u(3)\oplus\mathfrak u(2)
\]

rather than immediately

\[
\mathfrak s(\mathfrak u(3)\oplus\mathfrak u(2))
\cong
\mathfrak{su}(3)\oplus\mathfrak{su}(2)\oplus\mathfrak u(1)_Y.
\]

The additional diagonal direction is related to the \(SO(10)\) logical charge such as \(\chi\) or \(B-L\). With \(\nu^c\) present it can be anomaly free.

Therefore the TRO multiplication alone has not yet selected whether this direction is:

- gauged;
- global;
- broken by the sterile/Higgs sector;
- the logical operation of the punctured code;
- removed by the determinant-one condition.

This becomes the next exact stabilizer question.

## 6. Relation to the anomaly code

The punctured code distinguishes two classes of charge directions:

- stabilizers, under which the removed \(\nu^c\) is neutral;
- the logical direction, under which it is charged.

This suggests a possible selection principle:

\[
\text{ternary derivations}
\cap
\text{puncture stabilizers}
=
\mathfrak g_{\rm SM}.
\]

That equality is plausible but not yet proved for the full continuous stabilizer.

If true, the Standard Model group would be selected jointly by:

1. the Furey ternary incidence structure;
2. the sterile-neutrino puncture/logical split;
3. determinant-one or anomaly constraints.

## 7. Stop-everything and falsification gates

**Stop-everything trigger:** classify the complete continuous automorphism algebra of the completed TRO with its five-bit grading and prove that imposing puncture neutrality leaves exactly \(\mathfrak g_{\rm SM}\).

**GUT trigger:** find a non-obvious realization of the broken colour–weak roots as ternary derivations after adding a uniquely required mediator sector.

**Proton-decay falsifier:** infer \(SO(10)\) leptoquark gauge bosons merely from the sixteen-state weight labeling.

**SM-selection falsifier:** identify the block-preserving algebra with the Standard Model without accounting for the extra diagonal \(U(1)\).

**Derivation falsifier:** call a root a physical symmetry because it maps the state vector space to itself while it fails the ternary Leibniz identity.

## 8. Certificate

The [ternary-root stabilizer certificate](scripts/verify_tro_ternary_product_breaks_so10_roots_to_sm_subalgebra.mjs) exhaustively checks the derivation identity over all basis triples for three Standard Model roots and three colour–weak roots and records explicit failure witnesses.

## Companion documents

- [Nonabelian gauge-root intertwiner](413_the_so10_fock_root_operators_close_exactly_on_the_completed_furey_matter_tro.md)
- [Cartan–ternary intertwiner](412_the_completed_furey_tro_carries_the_so10_five_bit_code_as_a_cartan_ternary_intertwiner.md)
- [Standard-Model anomaly code](410_standard_model_triorthogonal_code_bridge_and_golay_integrality_gate.md)
- [Jordan-algebra parallel research programme](31_jordan_algebra_parallel_research_program.md)
