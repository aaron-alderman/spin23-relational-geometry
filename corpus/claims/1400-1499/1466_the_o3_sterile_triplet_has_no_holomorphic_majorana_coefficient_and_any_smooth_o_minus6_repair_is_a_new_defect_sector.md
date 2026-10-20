# The 𝑜(3) sterile triplet has no holomorphic Majorana coefficient, and any smooth 𝑜(−6) repair is a new defect sector

**Date:** 20 October 2026

**Gates:** A5 and A6

**Status:** exact line-bundle and cohomology obstruction; smooth defect-bearing repair classified conditionally

**Depends on:** [the index-three local parent](1450_the_o3_twisted_cp1_operator_has_exactly_three_universal_chiral_zero_modes_but_its_minimal_local_six_dimensional_parent_is_anomalous.md), [the anomaly-free zero-index spectators](1457_opposite_chirality_o0_spectators_cancel_the_o3_parent_anomalies_without_restoring_massless_mirrors.md), and [their unique line-bundle origin boundary](1458_o0_is_the_unique_zero_index_cp1_spectator_but_no_single_ordinary_dirac_or_real_structure_generates_the_flux_split.md)

**Evidence:** [machine-readable certificate](../../../evidence/data/spin23-a6-o3-sterile-majorana-bundle-obstruction.json) and [executable verifier](../../../verification/verify/verify_spin23_a6_o3_sterile_majorana_bundle_obstruction.mjs)

## Result

Two sterile parent fields twisted by (mathcal O(3)) have a local bilinear valued in

\[
 \mathcal O(3)\otimes\mathcal O(3)=\mathcal O(6).
\]

A bundle-invariant Majorana coefficient must therefore lie in (mathcal O(-6)). On (mathbb{CP}^1),

\[
 H^0(\mathbb{CP}^1,\mathcal O(-6))=0.
\]

Hence the declared holomorphic (Spin(2,3)\to\mathbb{CP}^1\to\mathcal O(3)) chain cannot generate a nonzero regular Majorana coefficient.

A smooth section is possible only with zeros whose total index is

\[
 c_1(\mathcal O(-6))=-6.
\]

It cannot be everywhere nonzero. A smooth repair is therefore not a constant parameter hidden in the existing geometry: it is a new charged field/background with a defect ledger, kinetic and potential data, and a phase-selection problem.

## 1. Exact holomorphic obstruction

For line bundles on (mathbb{CP}^1),

\[
 \dim H^0(\mathcal O(n))=\max(n+1,0),
\]

and

\[
 \dim H^1(\mathcal O(n))=\max(-n-1,0).
\]

At (n=-6),

\[
 h^0=0,
 \qquad
 h^1=5.
\]

Thus no nonzero holomorphic or covariantly constant coefficient exists. A nonzero meromorphic section necessarily has divisor degree (-6), so it must contain poles; it is not a regular local coupling on the compact sphere.

This is stronger than saying that no nowhere-vanishing section exists. In the holomorphic category the only regular coefficient is identically zero.

## 2. Smooth repair and defect count

For a generic smooth section (X_{-6}) of (mathcal O(-6)), the signed number of isolated zeros equals its first Chern number:

\[
 \sum_{p:X_{-6}(p)=0}\operatorname{ind}_p(X_{-6})=-6.
\]

Orientation conventions can reverse every sign, but the absolute topological charge is six. Consequently a dynamical (X_{-6}) condensate must be described together with its gauge connection, zeros/vortices, energy and boundary conditions. Treating it as a uniform nonzero spurion would trivialize a nontrivial line bundle and is forbidden.

The local term

\[
 X_{-6}\,NN+\text{h.c.}
\]

is bundle invariant when (X_{-6}) is supplied. Its three-by-three four-dimensional Majorana matrix is then an overlap integral of the three zero-mode wavefunctions with this nonholomorphic profile. The topology alone does not fix that matrix or guarantee its rank.

## 3. Why the 𝑜(0) spectators do not solve it

The anomaly-cancelling spectator lies in (mathcal O(0)). Pairing a selected (mathcal O(3)) field with that spectator requires a coefficient in

\[
 \operatorname{Hom}(\mathcal O(3),\mathcal O(0))
 =\mathcal O(-3),
\]

and again

\[
 H^0(\mathcal O(-3))=0.
\]

A smooth (mathcal O(-3)) mixing field is possible, but it creates a Dirac/spectator mixing sector and carries its own three-unit defect ledger. It is not a Majorana pairing supplied by the anomaly cancellation itself.

The combined conclusions are therefore:

- the (mathcal O(0)) spectator cancels the restricted parent anomaly without a mirror kernel;
- it does not provide the (mathcal O(-6)) sterile-pair coefficient;
- neither the selected--spectator mixing nor the selected Majorana pairing exists holomorphically with the declared fields.

## 4. Relation to the A5 phase problem

After dimensional reduction, a nonzero (X_{-6}) profile can induce a complex Majorana tensor and thereby furnish an (R_2)-type phase reference. It does so only because a new charged field/background and its state have been added. Its phase is not selected by the (mathcal O(3)) index, and a CP-even potential still leaves a continuous orbit or conjugate vacua unless another interaction or preparation condition fixes it.

Thus one new sector could address parts of A5 and A6 together, but it must pass both ledgers:

1. bundle degree and six-unit defect consistency on (mathbb{CP}^1);
2. a noncircular phase-selection and charged-TRO locking mechanism in four dimensions.

## 5. Minimal reopen packet

The sterile-pair route reopens only with:

1. an explicit smooth field or background (X_{-6}\in\Gamma(\mathcal O(-6)));
2. its connection, kinetic operator, potential and defect boundary conditions;
3. the solved profile and the full zero-mode overlap matrix;
4. a proof that the induced matrix has the desired rank and no unwanted light defect modes;
5. anomaly and BRST accounting for the new charged sector;
6. a physical phase reference and operator-level lock to the A5 charged carrier.

## 6. Path back to (Spin(2,3))

The derived chain remains

\[
 Spin_0(2,3)
 \to\mathbb{CP}^1
 \to\mathcal O(3)
 \to\operatorname{index}3.
\]

The Majorana step would require the additional arrow

\[
 \mathcal O(3)^{\otimes2}
 \otimes\mathcal O(-6)
 \to\mathcal O(0).
\]

The first three arrows do not produce the (mathcal O(-6)) factor. It is the precise missing graded datum.

## 7. Verdict

\[
\boxed{
\begin{array}{ll}
\text{holomorphic Majorana coefficient:}&\textbf{zero},\\
\text{uniform smooth nonzero coefficient:}&\textbf{topologically impossible},\\
\text{smooth defect-bearing repair:}&\textbf{possible only as a new sector},\\
\text{Majorana matrix and phase:}&\textbf{not derived},\\
\text{A5/A6 physical admission:}&\textbf{false}.
\end{array}}
\]

## Reproduction

~~~powershell
node verification/verify/verify_spin23_a6_o3_sterile_majorana_bundle_obstruction.mjs
~~~
