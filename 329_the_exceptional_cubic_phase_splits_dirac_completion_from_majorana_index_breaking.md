# The Exceptional Cubic Phase Splits Dirac Completion from Majorana Index Breaking

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B05, B06, B08, B09 and B11  
**Claim status:** exact three-sheet Dirac and Majorana spectral algebra; derivation of the even sterile background and low-energy neutrino fit remain open

## 1. Insert the exceptional coefficient into the neutrino sheets

The polarized exceptional determinant supplies one complex number

\[
c=\alpha+i\beta.
\]

The three triality sheets carry three right-handed-neutrino candidates. The coefficient \(c\) can enter their flavor structure in two physically different ways:

1. as part of a Dirac mass map between active and sterile sectors;
2. as a complex symmetric Majorana mass tensor within the sterile sector.

The matrix realization must respect the distinction between a general Dirac matrix and a symmetric Majorana tensor.

## 2. Dirac insertion

In the canonical \((s,t,o)\) sheet basis, use the Hermitian operator

\[
\Delta_D(c)=
\begin{pmatrix}
0&0&\alpha\\
0&0&i\beta\\
\alpha&-i\beta&0
\end{pmatrix}.
\]

It obeys

\[
\Delta_D^3=|c|^2\Delta_D,
\qquad
|c|^2=\alpha^2+\beta^2.
\]

Therefore its eigenvalues are

\[
\boxed{0,\quad+|c|,\quad-|c|.}
\]

Adding a universal Dirac background,

\[
M_D=m_D I+\Delta_D(c),
\]

gives eigenvalues

\[
m_D,\qquad m_D+|c|,\qquad m_D-|c|
\]

and

\[
\det M_D=m_D(m_D^2-|c|^2).
\]

For generic \(m_D\ne0,\pm|c|\), all three neutrinos can acquire Dirac masses.

## 3. Dirac completion removes the AIII imbalance

Adding one \(\nu^c\) per sheet changes each generation from

\[
8+7
\]

to

\[
8+8.
\]

Thus

\[
\chi_Y=0
\]

and the joint wall/Yukawa AIII index vanishes. A full Dirac gap is allowed without breaking the bipartite grading.

The exceptional \(16\)-state tangent naturally chooses this branch.

## 4. Majorana insertion must be symmetric

The Hermitian quadrature matrix used for Dirac flavor cannot be inserted unchanged as a Majorana mass. A right-handed Majorana tensor must satisfy

\[
M_R^T=M_R.
\]

The canonical odd symmetric insertion is

\[
\boxed{
M_-(c)=
\begin{pmatrix}
0&0&\alpha\\
0&0&i\beta\\
\alpha&i\beta&0
\end{pmatrix}.}
\]

It uses

\[
|s\rangle\langle o|+|o\rangle\langle s|
\]

and

\[
i(|t\rangle\langle o|+|o\rangle\langle t|).
\]

## 5. Odd Majorana insertion alone is rank deficient

The Takagi singular values of \(M_-(c)\) are

\[
\boxed{|c|,\quad|c|,\quad0.}
\]

Thus it gives:

- a degenerate massive sterile pair;
- one massless sterile combination;
- no realistic three-level spectrum by itself.

This is another odd-dimensional rank theorem. A purely odd map between a two-dimensional even sheet sector and a one-dimensional odd sector cannot be invertible.

## 6. Add the flag-even Majorana background

The general minimal real-even background can be written

\[
M_+=
\begin{pmatrix}
M_s&r&0\\
r&M_t&0\\
0&0&M_o
\end{pmatrix}.
\]

The total sterile mass is

\[
M_R=
\begin{pmatrix}
M_s&r&\alpha\\
r&M_t&i\beta\\
\alpha&i\beta&M_o
\end{pmatrix}.
\]

Its determinant is

\[
\boxed{
\det M_R
=M_sM_tM_o
+M_s\beta^2
-M_t\alpha^2
-M_or^2
+2ir\alpha\beta.}
\]

If

\[
r\alpha\beta\ne0,
\]

the imaginary part is nonzero, so \(M_R\) is automatically nonsingular. The same ingredients needed for CP remove the sterile zero.

Generic values also split the Takagi degeneracy.

## 7. A genuinely three-flavor Majorana invariant

In the charged-lepton mass frame, define

\[
\boxed{
I_\triangle
=\operatorname{Im}\left[
M_{st}M_{to}M_{os}
M_{ss}^*M_{tt}^*M_{oo}^*
\right].}
\]

Under residual rephasings

\[
M_{ij}\mapsto e^{i(\phi_i+\phi_j)}M_{ij},
\]

the phases cancel exactly. Hence \(I_\triangle\) is a valid charged-frame rephasing invariant and admits a weak-basis completion using charged-lepton spectral projectors.

For the displayed matrix,

\[
\boxed{
I_\triangle
=r\alpha\beta\,M_sM_tM_o.}
\]

This detects the same exceptional CP area

\[
\alpha\beta
=\operatorname{Re}c\,\operatorname{Im}c.
\]

## 8. Why pairwise Majorana invariants can miss it

The pairwise quartets

\[
\operatorname{Im}
\left[
M_{ii}M_{jj}(M_{ij}^*)^2
\right]
\]

all vanish in the real-even checkpoint:

- \(M_{st}=r\) is real;
- \(M_{so}=\alpha\) is real;
- \(M_{to}=i\beta\) squares to a real negative number.

Nevertheless \(I_\triangle\ne0\). The phase is irreducibly three-flavor: it lives on the closed flavor triangle and cannot be detected on any single edge.

This is exactly analogous to the need for three generations in Dirac-type Jarlskog CP, but it occurs directly in the symmetric Majorana tensor.

## 9. Effect on the AIII defect

The two neutrino branches now read:

\[
\begin{array}{ccl}
\text{Dirac }M_D&:&8+8,\ \chi_Y=0,\ \text{grading preserved},\\
\text{Majorana }M_R&:&\text{same-sector block},\ \mathscr S\text{ broken}.
\end{array}
\]

The Dirac route removes the topological index by balancing its two sectors. The Majorana route removes protection by breaking the grading.

Both can be controlled by the same exceptional coefficient \(c\), but through different matrix realizations.

## 10. Seesaw and alignment gate

For a type-I seesaw,

\[
m_\nu=-v^2Y_\nu M_R^{-1}Y_\nu^T.
\]

The phase of \(c\) propagates into the light-neutrino tensor unless:

- \(Y_\nu\) projects away the relevant sheet directions;
- the exceptional coefficient is aligned with a removable sterile basis phase;
- another symmetric spurion cancels the triangle invariant.

The earlier alignment no-go remains relevant: ordinary covariance does not force the exceptional coefficient tensor to align with \(M_R\). The present construction improves the situation by supplying one canonical \(c\)-dependent direction, but the even background and Dirac Yukawa still require source constraints.

## 11. Stop-everything and falsification gates

**Stop-everything trigger:** one source-derived \(c\), even sterile background and Dirac Yukawa reproduce the observed neutrino masses while correlating a Majorana phase with the quark-sector CP area.

**Triangle trigger:** a weak-basis completion of \(I_\triangle\) appears in the Furey/exceptional action with calculable coefficient.

**Index trigger:** the measured Dirac/Majorana nature of neutrinos selects respectively the balanced or grading-broken defect branch.

**Symmetry falsifier:** the Hermitian Dirac operator \(\Delta_D(c)\) is inserted directly as a Majorana mass despite failing transpose symmetry.

**Rank falsifier:** the odd Majorana insertion alone is claimed to give three nonzero sterile masses.

**Pairwise falsifier:** vanishing pairwise Majorana quartets is claimed to prove CP conservation despite nonzero \(I_\triangle\).

**Alignment falsifier:** one canonical odd direction is claimed to determine the full seesaw without fixing the even sterile matrix and \(Y_\nu\).

## 12. Certificate

The [exceptional-\(c\) neutrino Dirac/Majorana certificate](scripts/verify_exceptional_c_neutrino_dirac_majorana_spectra.mjs) checks the Dirac minimal polynomial and determinant, Majorana Takagi degeneracy, full symmetric determinant, rephasing-invariant triangle, pairwise-invariant blind spot and \(8+8\) versus \(8+7\) index count.

## Companion documents

- [Polarized exceptional determinant sign projection](327_the_polarized_exceptional_determinant_projects_canonically_onto_the_triality_sign_cubic.md)
- [Textured joint AIII index](320_the_textured_joint_operator_has_a_three_generation_aiii_index_beyond_kernel_factorization.md)
- [Weak-basis Majorana projector invariant](181_weak_basis_majorana_invariant_from_charged_lepton_projectors.md)
- [Low-degree polynomial Majorana invariant](182_low_degree_polynomial_majorana_cp_invariant.md)
- [Multi-flavor exceptional seesaw alignment](191_multiflavor_exceptional_seesaw_alignment_gate.md)
