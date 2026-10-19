# A Single Complex \(S_2\)-Odd Doublet Is the Minimal Triality-Breaking Source for Three-Family CP

**Date:** 17 October 2026  
**Branches:** B01, B03, B06, B08, B09, B11 and B13  
**Claim status:** exact residual-symmetry and Jarlskog-spurion classification; no derivation of the spurion from the exceptional cubic or arithmetic flag yet

## 1. From a no-go to a representation target

Quantizing the triality orbit gives a three-sheet flavor carrier. The nested \(H_2\) flag reduces the sheet symmetry from \(S_3\) to a residual swap \(S_2\).

Exact \(S_2\) is still too strong: all flavor operators preserve one common antisymmetric line, so the three-family Jarlskog invariant vanishes.

The next question is finite:

> What is the smallest \(S_2\)-breaking object capable of producing nonzero three-family CP?

## 2. Parity basis

Choose a basis adapted to the residual swap:

\[
\mathbb C^3
=E_+\oplus E_-,
\qquad
\dim E_+=2,\quad \dim E_-=1,
\]

with

\[
P=\operatorname{diag}(1,1,-1).
\]

An \(S_2\)-even Hermitian flavor operator has block form

\[
H_+=
\begin{pmatrix}
A_{2\times2}&0\\
0&c
\end{pmatrix}.
\]

An \(S_2\)-odd Hermitian operator must be

\[
\boxed{
\Delta(z)=
\begin{pmatrix}
0_{2\times2}&z\\
z^\dagger&0
\end{pmatrix},
\qquad z\in\mathbb C^2.}
\]

Thus the minimal breaking representation is one complex doublet, containing four real parameters before normalization and rephasings.

## 3. Exact CP formula

Diagonalize one Hermitian flavor square within the parity basis:

\[
H_u=\operatorname{diag}(u_1,u_2,u_3).
\]

Let the second be

\[
H_d=
\begin{pmatrix}
a&r&z_1\\
\bar r&b&z_2\\
\bar z_1&\bar z_2&c
\end{pmatrix}.
\]

The standard commutator identity gives

\[
\operatorname{Tr}[H_u,H_d]^3
=6i
(u_1-u_2)(u_2-u_3)(u_3-u_1)
\operatorname{Im}\!\left(rz_2\bar z_1\right).
\]

For an even-sector convention with \(r\in\mathbb R\),

\[
\boxed{
J_{\rm break}\propto
r\,\operatorname{Im}(z_2\bar z_1).}
\]

The CP source is the oriented area of the complex breaking doublet, multiplied by the misalignment inside the even flavor plane.

## 4. Minimality conditions

Nonzero three-family CP requires all of:

1. nondegenerate eigenvalues \(u_1,u_2,u_3\);
2. mixing \(r\ne0\) between the two \(S_2\)-even directions;
3. both components \(z_1,z_2\ne0\);
4. a nontrivial relative phase
   \[
   \operatorname{Im}(z_2\bar z_1)\ne0.
   \]

The invariant vanishes if:

- \(z=0\), restoring exact \(S_2\);
- only one component of \(z\) is present;
- \(z_1,z_2\) share a removable common phase;
- the even flavor blocks are aligned so \(r=0\);
- any relevant mass pair is degenerate.

This is a substantially smaller target than an arbitrary complex \(3\times3\) Yukawa matrix.

## 5. Explicit checkpoint

Take

\[
H_u=\operatorname{diag}(1,2,4),
\]

\[
H_d=
\begin{pmatrix}
10&1&1\\
1&11&i\\
1&-i&12
\end{pmatrix}.
\]

Then

\[
\operatorname{Im}(z_2\bar z_1)=1
\]

and

\[
\boxed{\operatorname{Tr}[H_u,H_d]^3=36i.}
\]

Removing the odd doublet, making it real, setting either component to zero or removing the even-plane mixing sends the cubic trace to zero.

## 6. Exceptional interpretation

The exceptional branch no longer needs to derive an unrestricted flavor matrix. It needs to supply:

\[
\boxed{
z\in E_+\otimes E_-^*
\quad\text{with}\quad
\operatorname{Im}(z_2\bar z_1)\ne0.}
\]

This object must be:

- odd under the corner-preserving sheet swap;
- complex under the retained flavor complex structure;
- compatible with the common Standard-Model gauge action;
- different in the up/down and lepton/neutrino sectors enough to produce observed mixing;
- constrained strongly enough to retain predictivity.

The oriented exceptional cubic is a plausible source because it supplies antiunitary-odd orientation data, but no map from that cubic to the required sheet doublet has yet been constructed.

## 7. Connection to the relational carrier

The scalar

\[
\operatorname{Im}(z_2\bar z_1)
\]

is the symplectic area of two complex relationship amplitudes. It has the same structural form as the retained complex-structure-graded CP invariant in the exchange-paired \(H_2(\mathbb R)\) carrier.

This suggests a concrete intertwiner target:

\[
\text{exceptional oriented cubic}
\longrightarrow
\text{complex }S_2\text{-odd sheet doublet}
\longrightarrow
\text{graded relational CP area}.
\]

The arrows are not yet derived, but every object and parity is now explicit.

## 8. Neutrino implications

If the three triality sheets each contain \(\nu^c\), the same odd doublet can act on their Majorana or Dirac mass matrix. It may therefore participate in both:

- breaking triality sheet symmetry to realistic flavor;
- choosing the neutrino completion/breaking pattern.

However, one common doublet for all fermion sectors may force unwanted alignment. The invariant-space calculation must determine whether the exceptional source supplies one universal \(z\) or several independent counterterms.

## 9. Stop-everything and falsification gates

**Stop-everything trigger:** the oriented exceptional flag produces a unique complex \(S_2\)-odd doublet whose induced quark and lepton invariants reproduce nonzero CKM and PMNS CP with a fixed relation.

**Minimal-breaking trigger:** one source-derived \(z\) plus even-sector data fits all nondegenerate masses and mixing without arbitrary full matrices.

**Relational trigger:** the same \(\operatorname{Im}(z_2\bar z_1)\) appears as a measurable phase-area response in the \(Spin(2,3)\) carrier.

**Exact-symmetry falsifier:** CP is claimed without breaking the residual \(S_2\).

**Phase falsifier:** a real or common-phase breaking doublet is claimed to generate a Jarlskog invariant.

**Rank-one falsifier:** one nonzero odd component is treated as sufficient for three-family CP.

**Predictivity falsifier:** the “minimal doublet” is supplemented by unrestricted independent matrices until all exceptional constraints disappear.

## 10. Certificate

The [minimal \(S_2\)-odd flavor-spurion certificate](../../../verification/verify/verify_minimal_s2_odd_flavor_spurion_generates_cp.mjs) verifies the parity decomposition, exact cubic commutator invariant and its vanishing under every minimality failure.

## Companion documents

- [Triality-orbit flavor carrier and commutants](323_quantizing_the_triality_orbit_gives_three_flavor_sheets_but_exact_s3_or_s2_forbids_observed_mixing.md)
- [Triality gives overlapping generation choices](322_triality_gives_three_overlapping_generation_choices_not_three_independent_generations.md)
- [Oriented exceptional cubic odd invariant](../0100-0199/185_oriented_exceptional_flag_unique_cubic_odd_invariant.md)
- [Three-family CP survives exchange pairing](305_three_family_cp_survives_furey_exchange_pairing_as_a_complex_structure_graded_invariant.md)
- [Population-normal carrier](302_continuous_charge_selects_the_population_normal_h2r_embedding.md)
