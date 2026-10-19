# Binary Jordan Composition Selects the Trivial Cover while Odd Jordan-Triple Recursion Selects the Möbius Cover

**Date:** 18 October 2026  
**Branches:** Jordan algebra, Jordan triple system, KO-6 grading, Möbius holonomy, typed relational carrier  
**Claim status:** exact graded-operator theorem and conditional branch selector; physical identification with the finite one-form transport remains to be proved  
**Certificate:** [prove_Jordan_binary_even_triple_odd_Mobius_filter.mjs](../../../verification/prove/prove_Jordan_binary_even_triple_odd_Mobius_filter.mjs)

## Executive result

The trivial/Möbius fork is not an arbitrary topological decoration. It matches an exact algebraic distinction between binary and ternary Jordan composition.

Let (x,y,z) be grading-odd relationship operators:

\[
\gamma x=-x\gamma,
\qquad
\gamma y=-y\gamma,
\qquad
\gamma z=-z\gamma.
\]

Their binary Jordan product

\[
x\circ z=\frac12(xz+zx)
\]

is grading-even:

\[
[\gamma,x\circ z]=0.
\]

Their Jordan triple product

\[
\{x,y,z\}
=\frac12(xy^*z+zy^*x)
\]

is grading-odd:

\[
\gamma\{x,y,z\}=-\{x,y,z\}\gamma.
\]

Therefore, if operator degree is the \(\mathbb Z_2\) sheet-transport variable on the \(P-I-N\) triangle, then

\[
\boxed{
\text{binary Jordan composition}
\Longrightarrow C_3\sqcup C_3,
}
\]

whereas

\[
\boxed{
\text{Jordan-triple recursion}
\Longrightarrow C_6.
}
\]

This is conditional only at the bridge: the graded parity theorem is exact, while the physical model must still prove that its triangle edges are the corresponding homogeneous operators.

## 1. The parity theorem

For homogeneous operators, degrees add modulo two:

\[
|ab|=|a|+|b|\pmod2.
\]

Adjunction does not change degree, so

\[
|y^*|=|y|.
\]

For odd (x,z),

\[
|x\circ z|=1+1=0.
\]

For odd (x,y,z),

\[
|xy^*z|=1+1+1=1,
\]

and the second term has the same degree. Hence the symmetrized triple product remains odd.

The executable certificate verifies the statement with explicit nonzero matrices for

\[
\gamma=\operatorname{diag}(1,-1).
\]

This is not a numerical coincidence; it is the \(\mathbb Z_2\)-graded degree law.

## 2. Translation into sheet transport

Identify the two cover sheets with grading sign. An even transition preserves the sheet, while an odd transition exchanges it.

For a homogeneous triangle, [1131](1131_C3_covariance_and_homogeneous_grading_reduce_eight_holonomies_to_two_canonical_live_branches.md) gives

\[
h=3d=d\pmod2.
\]

Consequently:

| Composition law | Degree of derived relation | Triangle holonomy | Cover |
|---|---:|---:|---|
| binary Jordan (x\circ z) | (0) | (0) | (C_3\sqcup C_3) |
| Jordan triple ({x,y,z}) | (1) | (1) | connected (C_6) |

The two topological branches are therefore algebraically interpretable:

- the trivial cover is the even response/composite layer;
- the Möbius cover is the odd relationship/ternary-recursion layer.

## 3. Why both can coexist

This result need not force a choice of one universe and reject the other. The two covers may describe different levels of the same construction.

At the observable or response level, two odd transitions combine to an even operator. Binary Jordan closure therefore lives within a sheet and can produce the coarse \(H_3(\mathbb R)\) envelope.

At the typed relational level, ternary recursion remains odd. It moves between sheets and can retain the hidden orientation/type information that binary coarse-graining erases.

The resulting layered picture is

\[
\boxed{
\begin{aligned}
\text{typed odd relation layer}&:\quad C_6,\quad\text{Jordan triple},\\
\text{even observable response layer}&:\quad C_3\sqcup C_3,\quad\text{binary Jordan}.
\end{aligned}
}
\]

Thus the branches may be complementary rather than mutually exclusive.

## 4. Connection to the (Spin(2,3)) pole

Each typed two-face block remains

\[
H_2(\mathbb R),
\]

with conformal algebra

\[
\mathfrak{sp}_4(\mathbb R)\cong\mathfrak{spin}(2,3).
\]

Binary composition after forgetting the opposite anchor can generate the third coarse relation and the \(H_3(\mathbb R)/Sp(6,\mathbb R)\) envelope.

The ternary product instead acts naturally on typed operator spaces:

\[
\{x,y,z\}=\frac12(xy^*z+zy^*x).
\]

Because the middle adjoint records source/target compatibility, it is the better candidate for carrying the opposite-anchor memory through recursion. Its odd parity simultaneously supplies the nontrivial sheet transport required by the Möbius cover.

The same formal move therefore addresses two previously separate problems:

1. preserving relational type so that two local (Spin(2,3)) wheels do not automatically inflate to (Sp(6));
2. supplying odd holonomy so that two oriented (C_3) sheets become one (C_6) cycle.

This is the strongest convergence yet in the Ophanim/Jordan-triple branch.

## 5. The Real-linearity fork

There remains an important implementation distinction.

### 5.1 Complex-linear odd transport

A grading-odd represented one-form is complex-linear and maps (H^+) to (H^-). If all three physical edge lifts are of this kind, the Möbius class follows directly. The danger is that such an operator may mix the protected opposite-anchor blocks.

It survives only if its source and target typing respects the allowed Krajewski rectangles.

### 5.2 Antiunitary \(J\)-assisted transport

An odd number of \(J\) insertions makes a circuit anti-linear after one traversal and linear after two. This is appropriate for a Real double cover but is not an ordinary complex-linear Wilson loop.

This version can preserve anchor separation because \(J\) exchanges a sector with its conjugate rather than adding a new scalar one-form. It must be formulated as Real/groupoid transport, not silently inserted into \(\Omega_D^1\).

### 5.3 Even response transport

If only bilinears or quadratic responses are physical observables, the effective transport is even and the trivial cover survives. The Möbius structure may still exist one level below, in the odd relation system from which the observables are built.

## 6. Filtered branch ledger

| Candidate | Grading | Anchor risk | Current status |
|---|---|---|---|
| even binary Jordan response | passes as even | low while blocks remain orthogonal | live |
| odd typed one-form on every edge | passes as odd | must pass first-order rectangle test | live but constrained |
| odd \(J\)-assisted Real transport | passes as sheet reversal | avoids adding a scalar edge | live; requires Real/groupoid formulation |
| arbitrary single linear seam between (P_D,P_M) | can create odd parity | destroys the protected split | filtered out |
| nonuniform seam with no edge-distinguishing datum | breaks cyclic covariance | unjustified | filtered out |
| odd typed Jordan-triple recursion | passes as odd | middle type can preserve anchors | leading Möbius candidate |

## 7. The next decisive calculations

The two main branches now have separate tests.

### Branch E: even/binary

1. Construct the even response algebra generated by the allowed odd one-forms.
2. Determine whether its junk quotient is exactly the typed \(H_2\oplus H_2\) algebra or the coarse \(H_3\) envelope.
3. Test whether symmetry breaking introduces an anchor-forgetting conditional expectation.

### Branch O: odd/triple

1. Build a typed TRO/Jordan-pair model for the Dirac and Majorana rectangles.
2. Calculate whether ({x,y,z}) closes without generating the forbidden Dirac (P-N) arrow.
3. Compute its \(J\), \(\gamma\), and first-order covariance.
4. Decide whether its connected (C_6) holonomy is complex-linear or Real-semilinear.

### Shared physical gate

Embed both in the same finite particle/conjugate representation and compare their images in

\[
\Omega_D^1/\mathcal J
\quad\text{and}\quad
\Omega_D^2/\mathcal J.
\]

This comparison can show that one branch is junk, that both occupy different degrees, or that one violates the null mask.

## 8. Stop-everything criteria

**Parity stop:** a binary product of two odd relations cannot itself provide odd Möbius transport.

**Triple stop:** a triple product of three odd relations cannot be treated as grading-even without an additional odd coefficient or projection.

**Linearity stop:** an antiunitary \(J\)-holonomy is not an ordinary complex-linear one-form.

**Anchor stop:** reject any odd implementation whose block support directly identifies (P_D) and (P_M).

**Coexistence stop:** do not force the even and odd layers to be rival descriptions if one is the observable composite of the other.

**Positive trigger:** show that the physical typed relationship module is closed under the odd Jordan triple while its binary observable closure reproduces the established local \(H_2(\mathbb R)\) response geometry.

## 9. Verdict

The fork has sharpened into a graded composition law:

\[
\boxed{
\begin{array}{rcl}
\text{two odd relations}&\xrightarrow{\ \circ\ }&\text{even, untwisted response},\\[1mm]
\text{three odd relations}&\xrightarrow{\ \{\cdot,\cdot,\cdot\}\ }&\text{odd, Möbius-compatible relation}.
\end{array}
}
\]

The most productive hypothesis is now not that one cover must kill the other. It is that the programme contains both:

\[
\boxed{
\text{a Möbius odd relational carrier beneath an untwisted even observable algebra}.
}
\]

That hypothesis remains falsifiable at the typed triple-closure and junk-quotient gates.

## Corpus position

- [two canonical holonomy branches](1131_C3_covariance_and_homogeneous_grading_reduce_eight_holonomies_to_two_canonical_live_branches.md)
- [KO-6 reality underdetermination](1130_KO6_reality_supplies_the_sheet_involution_but_does_not_determine_Mobius_holonomy.md)
- [typed twin (Spin(2,3)) wheels](1127_opposite_anchor_typing_splits_the_Sp6_envelope_into_two_local_Spin23_relational_wheels.md)
- [nested-commutant Jordan-triple branch](1125_ophanim_wheels_within_wheels_as_a_nested_commutant_and_Jordan_triple_research_branch.md)
- [typed TRO mask theorem and third-odd-edge obstruction](1133_the_typed_TRO_preserves_the_null_mask_but_cannot_generate_the_third_odd_Mobius_edge.md)

