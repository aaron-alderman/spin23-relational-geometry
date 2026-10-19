# The CSS Asymmetry Selects the Puncture Polarization, but the Native Transversal Phase Cannot Supply the Mutual Seam Shear

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B06, B07, B09, B10, B12 and B14  
**Claim status:** exact qutrit CSS polarization and factorization obstruction; continuum interpretation remains open

## 1. The remaining Fourier question

Particle incidence maps the two puncture coordinates to the two sewn matter seams, but it does not by itself choose whether the puncture-evaluation plane is represented by seam meridians or by dual longitudes.

The actual \([[14,2,2]]_3\) CSS presentation is not Fourier symmetric. It contains

\[
\dim S_X=3,
\qquad
\dim S_Z=9.
\]

A uniform physical Fourier transform exchanges \(X\) and \(Z\), hence exchanges these dimensions. It maps this code presentation to its dual CSS presentation rather than preserving the stabilizer.

Therefore the source construction distinguishes a polarization.

## 2. Support spectra distinguish the two logical halves

The puncture evaluations construct the logical \(X\)-coordinate plane. Exact coset minimization gives

| logical plane | minimum-support distribution over 8 nonzero classes |
|---|---:|
| puncture-evaluation \(X\) plane | four of weight 6, four of weight 7 |
| dual \(Z\) plane | four of weight 2, four of weight 3 |

No support-preserving code automorphism can exchange these two planes. The asymmetry is not merely a choice of notation inside this physical-coordinate presentation.

Combining this with the incidence map selects

\[
\overline X_{e^c},\overline X_{\nu^c}
\longleftrightarrow
a_C,a_D,
\]

and consequently

\[
\overline Z_{e^c},\overline Z_{\nu^c}
\longleftrightarrow
b_C,b_D
\]

up to the intersection-sign convention.

The opposite assignment exists after Fourier-dualizing the entire code, but it is not an automorphism of the given anomaly-code presentation.

## 3. The transversal anomaly phase reinforces the choice

The triorthogonal construction supplies a coordinatewise diagonal non-Clifford phase. Diagonal operations preserve the physical \(Z\) algebra and act nontrivially on the \(X\) translations. Its source-derived form therefore distinguishes the same computational/CSS polarization.

This resolves the finite-code polarization gate more strongly than the abstract symplectic module could: the anomaly code, not \(Sp(4,\mathbb F_3)\) alone, chooses which Lagrangian half is the puncture-evaluation half.

## 4. Why the same phase does not generate the cross gate

For the two removed coordinates, the native transversal phase acts as a product of equal inverse logical phases. Its logical phase function has the form

\[
f(x_C,x_D)=\phi(x_C)+\phi(x_D).
\]

The mixed finite difference is identically zero:

\[
\Delta_C\Delta_D f=0.
\]

Equivalently, its discrete Hessian is diagonal. It can distinguish the polarization and supply independent one-port phase structure, but it has no off-diagonal coefficient corresponding to

\[
K_{\mathrm{mut}}=
\begin{pmatrix}0&2\\2&0\end{pmatrix}.
\]

The mutual seam shear still requires a genuinely relational operation: sum-cycle Dehn twist, code surgery, measurement coupling or a nonfactorizing transfer kernel.

## 5. Revised exact bridge

The chain is now

\[
\begin{aligned}
\text{puncture labels}
&\longrightarrow \text{matter seams},\\
\text{CSS check asymmetry}
&\longrightarrow \text{meridian/longitude polarization},\\
\text{transversal anomaly phase}
&\longrightarrow \text{factorized local phase data},\\
\text{sewing or sum-cycle operation}
&\longrightarrow \text{mutual phase still required}.
\end{aligned}
\]

Thus one formerly open choice is closed, while the relational generator is isolated more sharply.

## 6. Limit of the conclusion

The selected polarization belongs to the qutrit stabilizer presentation. It does not yet prove that a continuum Furey boundary, an \(A_2\) Chern–Simons theory or the real \(Spin_0(2,3)\) carrier must use the same physical position/momentum convention.

That stronger statement requires an operation that intertwines:

- physical code \(X/Z\) observables;
- seam meridian/longitude Wilson operators;
- the positive real Jordan response.

## 7. Claim ledger

- **Exact:** the qutrit CSS code has \((\dim S_X,\dim S_Z)=(3,9)\).
- **Exact:** uniform Fourier is not an automorphism of this CSS presentation.
- **Exact:** the nonzero logical \(X\) plane has minimum supports \(6,7\), while the logical \(Z\) plane has minimum supports \(2,3\).
- **Exact:** the puncture evaluations lie in the logical \(X\) half.
- **Exact:** a factorized two-logical phase has vanishing mixed finite difference.
- **Exact source obstruction:** the native transversal phase cannot supply the mutual shear.
- **Candidate bridge:** code \(X\) coordinates are seam meridians and code \(Z\) coordinates are closing-arc longitudes.
- **Open:** a physical code-surgery realization and positive-real continuation.

## 8. Stop-everything and falsification gates

**Stop-everything trigger:** a source-derived measurement or surgery couples the two logical coordinates and produces the off-diagonal symmetric shear while preserving the CSS stabilizer.

**Continuum trigger:** the same operation has a positive transfer-kernel lift whose boundary canonical variables reduce to the selected seam polarization.

**Fourier falsifier:** uniform physical Fourier is called a code automorphism despite exchanging check spaces of dimensions three and nine.

**Mutual-phase falsifier:** a factorized phase \(\phi(x_C)+\phi(x_D)\) is claimed to contain a nonzero mixed Hessian.

**Scope falsifier:** finite CSS polarization is asserted to select the real causal \(Spin(2,3)\) polarization without a positive continuation.

## 9. Certificate

The [CSS polarization certificate](scripts/verify_css_asymmetry_selects_puncture_polarization_but_factorized_phase_has_no_mutual_shear.mjs) reconstructs the code, checks the \(3/9\) check-rank asymmetry, exhausts both logical Lagrangian support spectra and verifies the vanishing mixed difference of every factorized logical phase.

## Companion documents

- [Puncture-to-seam incidence](481_the_puncture_labels_select_the_two_furey_seams_but_not_the_meridian_longitude_polarization.md)
- [Sewn-meridian Clifford framing](480_the_sewn_furey_matter_pairs_select_a_lagrangian_plane_and_the_remaining_framing_is_exactly_the_clifford_phase_sector.md)
- [Full nonlocal logical Clifford lift](452_the_two_puncture_qutrit_code_has_a_full_nonlocal_clifford_sp4_lift_but_no_source_derived_mixing_yet.md)
- [Logical-support transversal obstruction](453_logical_weight_stratification_proves_full_sp4_cannot_be_a_support_preserving_transversal_symmetry.md)
