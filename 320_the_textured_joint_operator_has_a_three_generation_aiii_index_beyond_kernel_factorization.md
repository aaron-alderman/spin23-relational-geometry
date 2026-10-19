# The Textured Joint Operator Has a Three-Generation AIII Index Beyond Kernel Factorization

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B05, B06, B08 and B11  
**Claim status:** exact total-grading and finite-index theorem; continuum Fredholm completion is now proved under the explicit hypotheses in document 340, while derivation from the complete Furey action remains open

## 1. The apparent obstruction is not the end

Gauge/Higgs transport adds a term proportional to \(\nabla_xH_Y\) in the square of the joint wall–Yukawa operator. This invalidates the elementary identity

\[
\ker\mathcal D=\ker D_{\rm w}\otimes\ker H_Y
\]

when the Yukawa background varies.

But failure of kernel factorization is not failure of zero-mode protection. The textured operator retains a larger chiral grading.

## 2. Two gradings combine

The wall operator has

\[
\{C_{\rm w},D_{\rm w,A}\}=0.
\]

The uncompleted Standard-Model Yukawa operator has

\[
\{W,H_Y(x)\}=0,
\qquad
W=\operatorname{diag}(I_8,-I_7).
\]

Standard-Model gauge transport acts within the weak-doublet and singlet sectors, so

\[
[W,\nabla_x]=0.
\]

For

\[
\mathcal D_A
=D_{\rm w,A}\otimes I
+C_{\rm w}\otimes H_Y(x),
\]

define

\[
\boxed{\mathscr S=C_{\rm w}\otimes W.}
\]

Then, without requiring \(\nabla_xH_Y=0\),

\[
\boxed{\{\mathscr S,\mathcal D_A\}=0.}
\]

The covariant Yukawa-gradient term spoils the square factorization but not the total chiral symmetry.

## 3. Generic symmetry class is AIII

The total grading places the defect Hamiltonian in chiral class AIII when no additional antiunitary symmetry is imposed.

This is the generic Standard-Model case because complex three-family Yukawa matrices and nonzero CKM/PMNS phases obstruct a globally real basis. If all relevant couplings admitted a compatible real structure, the class could enhance to BDI, but that is not assumed and is not needed.

Class AIII in one spatial defect dimension carries an integer index. The relevant invariant is the difference between zero modes of positive and negative \(\mathscr S\)-chirality.

## 4. Product index

Let the sign wall have chiral index

\[
\nu_{\rm w}=1.
\]

The internal bipartite Yukawa complex has Euler imbalance

\[
\chi_Y
=\dim V_D-\dim V_S.
\]

For one generation without \(\nu^c\),

\[
\chi_Y=8-7=1.
\]

For \(N_g\) generations,

\[
\chi_Y=N_g.
\]

The graded product has

\[
\boxed{
\operatorname{ind}\mathcal D_A
=\nu_{\rm w}\chi_Y
=N_g.}
\]

Thus three generations give

\[
\boxed{\operatorname{ind}\mathcal D_A=3.}
\]

Nonzero-energy states pair across opposite total chirality, while at least three unpaired zero modes remain.

## 5. Finite-dimensional count

A finite chiral wall complex with grading dimensions \(2+1\) and a three-generation internal complex with dimensions \(6+3\) gives total sectors

\[
\begin{aligned}
\dim\mathcal K_+
&=2\cdot6+1\cdot3=15,\\
\dim\mathcal K_-
&=2\cdot3+1\cdot6=12.
\end{aligned}
\]

Any Hermitian operator odd under \(\mathscr S\) has block form

\[
\mathcal D=
\begin{pmatrix}
0&Q\\
Q^\dagger&0
\end{pmatrix},
\qquad
Q:\mathbb C^{12}\to\mathbb C^{15}.
\]

Rank-nullity alone forces

\[
\dim\ker\mathcal D\ge15-12=3.
\]

A generic odd operator has rank \(24\) and exactly three zeros. This remains true for nonseparable texture couplings that destroy the original tensor-product form.

## 6. What interactions preserve the index?

The index survives deformations satisfying:

\[
[W,\nabla_x]=0,
\qquad
\{W,H_Y(x)\}=0,
\qquad
\{C_{\rm w},D_{\rm w,A}\}=0,
\]

together with a maintained asymptotic bulk gap and Fredholm domain.

This includes:

- arbitrary complex Dirac Yukawa matrices;
- three-family flavor mixing and CP phases;
- gauge connections acting within the Standard-Model doublet/singlet representation blocks;
- Higgs textures whose Yukawa action remains off-diagonal in \(W\);
- nonfactorizing wall/internal couplings that remain odd under \(\mathscr S\).

The index does not require \(\nabla_xH_Y=0\).

## 7. What removes the protection?

### 7.1 Dirac completion

Adding one \(\nu^c\) per generation changes \(8+7\) to \(8+8\), so

\[
\chi_Y=0.
\]

The AIII index vanishes and a full Dirac gap is allowed without breaking the grading.

### 7.2 Majorana or Weinberg mass

A same-sector Majorana block gives

\[
\{W,H\}\ne0.
\]

It breaks \(\mathscr S\), so the three zeros can move away from zero and pair or gap.

### 7.3 Wall-grading breaking

A transverse two-component wall mass proportional to \(C_{\rm w}\) breaks the wall chiral symmetry. The quarter-turn interface is the minimal example: it retains a localized state but shifts it to \(|E|=m/\sqrt2\).

### 7.4 Gap or Fredholm failure

Even with formal anticommutation, an index is not defined if the asymptotic bulk gap closes or the defect operator ceases to be Fredholm.

## 8. Relation to observed neutrino masses

The index sharpens the two established neutrino forks:

\[
\begin{array}{ccl}
\text{Dirac mass}&:&8+8\text{ balances the index},\\
\text{Majorana mass}&:&\mathscr S\text{ is broken}.
\end{array}
\]

Observed nonzero neutrino masses therefore measure either completion of the internal grading or its controlled breaking. The defect picture does not predict which fork nature chooses, but it converts that choice into a precise topological distinction.

## 9. Continuum gate

The finite chiral-dimension theorem is exact. Its continuum interpretation additionally requires:

- a self-adjoint domain for \(\mathcal D_A\);
- asymptotically invertible bulk mass operators;
- compact or sufficiently decaying textured perturbations;
- no anomaly that invalidates the required grading;
- a demonstration that the wall factor is physical spacetime spin, not new internal matter.

Under those hypotheses, the integer is stable under continuous AIII-preserving deformations. [Document 340](340_the_textured_aiii_operator_is_fredholm_when_the_wall_mass_stays_gapped_at_infinity.md) now proves the conditional continuum theorem, including equal continuum fiber ranks, asymptotic symbol gaps, relative compactness and the analytic product index. Establishing that the complete Furey/Standard-Model action satisfies those hypotheses remains open.

## 10. Stop-everything and falsification gates

**Stop-everything trigger:** the full Furey-derived defect operator is Fredholm, has total grading \(\mathscr S\), and its analytic index is exactly the observed generation number.

**Texture trigger:** explicit nonparallel Higgs/gauge profiles preserve three normalizable zero modes as predicted by the AIII index.

**Generation trigger:** a structural argument derives \(N_g=3\) from the same index rather than inserting the observed family count.

**Factorization falsifier:** loss of the simple square identity is claimed to remove protection while the total AIII grading remains intact.

**AIII falsifier:** a same-sector Majorana block or transverse wall mass is included while the integer chiral index is still asserted.

**Continuum falsifier:** finite matrix imbalance is presented as a continuum defect theorem without Fredholm and asymptotic-gap checks.

**CP falsifier:** class BDI is assumed despite generic complex flavor data; AIII is the safe generic class.

## 11. Certificate

The [textured joint AIII-index certificate](scripts/verify_textured_joint_aIII_index.mjs) checks the total chiral anticommutator, \(15-12=3\) index, persistence under a generic nonfactorizing odd texture, lifting under grading breaking and disappearance after balanced Dirac completion.

## Companion documents

- [Gauge-covariant Yukawa-transport gate](319_gauge_covariance_preserves_the_deck_lift_but_yukawa_transport_controls_kernel_factorization.md)
- [Joint graded wall–Yukawa kernel](318_the_graded_wall_yukawa_sum_localizes_exactly_one_forced_zero_per_generation.md)
- [Three-family CP in the exchange-paired carrier](305_three_family_cp_survives_furey_exchange_pairing_as_a_complex_structure_graded_invariant.md)
- [Fifteen-state Yukawa neutrino zero](312_the_fifteen_state_yukawa_grading_forces_one_neutrino_zero_mode_per_generation.md)
- [Quarter-turn subgap versus half-turn zero](316_the_quarter_turn_binds_a_subgap_state_while_the_rp2_half_turn_can_bind_a_zero.md)
