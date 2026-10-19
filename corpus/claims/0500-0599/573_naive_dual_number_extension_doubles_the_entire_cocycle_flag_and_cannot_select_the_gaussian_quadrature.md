# Naive Dual-Number Extension Doubles the Entire Cocycle Flag and Cannot Select the Gaussian Quadrature

**Date:** 17 October 2026  
**Branches:** B01, B04, B07, B09, B10, B12, B13 and B14  
**Claim status:** exact no-go for undeformed scalar extension; a deformed Gaussian action remains an open constructive branch

## Executive result

The new Gaussian target suggested lifting the presentation cocycle complex from

\[
\mathbb F_2
\]

to

\[
D=\mathbb F_2[\varepsilon]/(\varepsilon^2).
\]

The first possibility is naive scalar extension: keep every source action and every presentation matrix unchanged, and allow coefficients in \(D\).

The authoritative presentation calculation proves this does **not** select a missing quadrature. It simply makes a residue copy and a nilpotent copy of every old solution:

\[
\boxed{
Z^1_D
\cong
Z^1_{\mathbb F_2}
\oplus
\varepsilon Z^1_{\mathbb F_2}.}
\]

Numerically,

\[
\dim_{\mathbb F_2}Z^1_D=34,
\qquad
\dim_{\mathbb F_2}\ker(Z^1_D\to Z^1_{\mathbb F_2})=17.
\]

Likewise,

\[
\dim_{mathbb F_2}H^1_D=8,
\qquad
\dim_{mathbb F_2}\varepsilon H^1=4.
\]

The complete \(4+1+2\) flag is duplicated. No one class is distinguished as \(\varepsilon E_{12}\).

Therefore the Gaussian bridge requires a genuinely deformed source representation or cocycle equation,

\[
\rho_D(g)=\rho_0(g)+\varepsilon\rho_1(g),
\]

not merely a larger coefficient ring.

## 1. Why scalar extension splits

Let the binary presentation equations be

\[
A x=0,
\]

with \(A\) over \(\mathbb F_2\). A dual-number unknown has the unique form

\[
x=x_0+\varepsilon x_1.
\]

Because the matrix is undeformed,

\[
A(x_0+\varepsilon x_1)
=Ax_0+\varepsilon Ax_1.
\]

Hence

\[
Ax=0
\quad\Longleftrightarrow\quad
Ax_0=0
\quad\text{and}\quad
Ax_1=0.
\]

The residue and nilpotent coefficients satisfy identical independent systems. This is a theorem for every linear complex over \(\mathbb F_2\), not a peculiarity of the chosen basis.

## 2. Exact presentation counts

The certified homogeneous presentation-lift system has:

\[
75\text{ binary variables},
\qquad
\operatorname{rank}A=58,
\]

and therefore

\[
\dim Z^1=75-58=17.
\]

Under naive extension to \(D\), the same system becomes two independent binary blocks:

\[
150\text{ binary coefficient variables},
\qquad
\operatorname{rank}_{\mathbb F_2}=116,
\]

so

\[
\dim_{mathbb F_2}Z^1_D=150-116=34.
\]

Reduction

\[
Z^1_D\longrightarrow Z^1
\]

has kernel

\[
\varepsilon Z^1
\]

of dimension 17. Every old cocycle direction has a nilpotent partner.

## 3. Cohomology and gauge directions also duplicate

The established binary dimensions are

\[
\dim Z^1=17,
\qquad
\dim B^1=13,
\qquad
\dim H^1=4.
\]

Naive scalar extension gives

\[
\dim_{mathbb F_2}B^1_D=26,
\qquad
\dim_{mathbb F_2}H^1_D=8.
\]

The nilpotent reduction kernels have dimensions

\[
17,qquad13,qquad4
\]

for \(Z^1_D,B^1_D,H^1_D\), respectively.

Thus quotienting gauge directions does not rescue uniqueness. There are four nilpotent cohomology classes, not one selected complex quadrature.

## 4. The stable ten-plane and \(4+1+2\) flag

The compatible lift family had a fixed ten-dimensional direction space \(U\), whose image produced the exact quotient filtration

\[
4\text{ coboundary}
+1\text{ moving}
+2\text{ stationary}.
\]

Naive dual-number extension gives

\[
U_D=U\oplus\varepsilon U,
\]

of binary dimension 20, with a ten-dimensional nilpotent kernel.

Every graded piece acquires an indistinguishable \(\varepsilon\)-copy:

\[
(4+1+2)
\quad\longrightarrow\quad
(4+1+2)_{\rm residue}
\oplus
\varepsilon(4+1+2).
\]

It is therefore invalid to identify the nilpotent Gaussian quadrature with \(e_0\), \(e_4\), or the moving line merely because all live in small quotient spaces.

## 5. What a genuine Gaussian deformation requires

Let

\[
\rho_D(g)=\rho_0(g)+\varepsilon\rho_1(g).
\]

The representation law \(\rho_D(gh)=\rho_D(g)\rho_D(h)\) requires

\[
\rho_1(gh)
=\rho_1(g)\rho_0(h)
+\rho_0(g)\rho_1(h).
\]

Thus \(\rho_1\) is a twisted first-order deformation of the source action. With such a deformation, the cocycle equation for

\[
x=x_0+\varepsilon x_1
\]

contains inhomogeneous terms coupling \(x_0\) to \(x_1\). Only then can the nilpotent direction be constrained or uniquely selected.

Possible sources of \(\rho_1\) are:

1. a genuine Gaussian integral lift of the orthogonal generators;
2. the quartic orientation character acting on the arrow corner;
3. the opposite glue-face transport;
4. a Furey dagger/conjugation action pulled back before coinvariants;
5. a source-derived semilinear rather than linear action.

None is presently constructed.

## 6. Two ramified rungs have different jobs

Let

\[
\pi=1+i.
\]

The ramified tower begins

\[
\mathbb Z[i]/(\pi)
\longleftarrow
\mathbb Z[i]/(\pi^2)
\longleftarrow
\mathbb Z[i]/(\pi^3).
\]

These rungs separate three kinds of information:

### Residue rung

\[
\mathbb Z[i]/(\pi)\cong\mathbb F_2.
\]

Here \(i=1\); the two quadratures coincide.

### First-order rung

Since \((2)\) is associated to \(\pi^2\),

\[
\mathbb Z[i]/(\pi^2)
\cong
\mathbb F_2[\varepsilon]/(\varepsilon^2).
\]

Here \(i=1+\varepsilon\), so the infinitesimal quadrature is visible. But characteristic two makes \(-1=1\), and \(i\) has only order two at this rung.

### Quartic-orientation rung

In

\[
\mathbb Z[i]/(\pi^3),
\]

the element two is nonzero and \(i\) again has order four. This is the first ramified rung that can simultaneously see the infinitesimal split and retain a genuine \(\mu_4\) orientation.

Therefore the research problem separates into:

1. use \(\pi^2\) to detect the missing first-order arrow direction;
2. use \(\pi^3\) to test the quartic orientation action.

Attempting to prove both at the dual-number rung alone is impossible.

## 7. Claim ledger

### Established

- naive dual-number extension block-diagonalizes into residue and nilpotent copies;
- the presentation system has 150 binary coefficients, rank 116 and kernel dimension 34;
- its nilpotent cocycle kernel has dimension 17;
- \(B^1_D\) and \(H^1_D\) have binary dimensions 26 and 8;
- the nilpotent cohomology kernel has dimension four;
- the stable ten-plane and full \(4+1+2\) filtration duplicate;
- naive scalar extension selects no unique Gaussian quadrature;
- \(\pi^2\) detects the infinitesimal split but not a faithful fourth-root phase;
- \(\pi^3\) is the first ramified rung retaining \(i\) of order four.

### Candidate bridge

- a nontrivial \(\rho_1\) couples the existing inaccessible cocycle direction to \(\varepsilon E_{12}\);
- the quartic character supplies the \(\pi^3\) lift of that deformation;
- opposite glue or Furey conjugation determines \(\rho_1\).

### Not established

- any nonzero source-compatible \(\rho_1\);
- uniqueness of a Gaussian deformation;
- compatibility with the integral five-dimensional orthogonal form;
- an action of the quartic character on the deformed arrow;
- identification with a named Standard-Model observable.

## 8. Stop-everything and falsification gates

### Stop-everything positive

Construct \(\rho_1\ne0\) from existing source data and prove that the deformed presentation system leaves exactly one non-gauge nilpotent arrow direction, then extend it to \(\mathbb Z[i]/(\pi^3)\) with the established quartic character acting as \(i\).

### Falsifiers

- every source-compatible representation deformation \(\rho_1\) is cohomologically trivial;
- every nontrivial deformation violates the orthogonal form or presentation relations;
- the surviving nilpotent directions remain four-dimensional in cohomology with no invariant selector;
- no \(\pi^3\) lift realizes the quartic action consistently.

## 9. Pinned dependency and continuation

The naive dual-number branch is closed. The Gaussian programme must now search for a **deformation of the action**, not another scalar extension.

Meanwhile the external neutral response and coherent-face branches remain fully live and do not depend on this deformation.

## Certificate and companions

- [Strengthened five-bit cocycle certificate](../../../verification/compute/compute_five_bit_shell_lift_cocycle_first_congruence_layer.mjs)
- [Real/Gaussian lift fork](572_the_real_and_gaussian_tro_lifts_have_the_same_binary_arrow_and_split_at_the_ramified_first_order.md)
- [Quartic orientation line](536_the_quartic_M_over_I_character_is_an_independent_global_orientation_line.md)
- [Quartic Clifford realization](539_the_quartic_extension_embeds_in_the_binary_heisenberg_group_and_its_phase_is_a_clifford_shear.md)
- [Opposite glue face](546_the_two_bit_glue_obstruction_is_exactly_the_binary_heisenberg_commutator.md)
