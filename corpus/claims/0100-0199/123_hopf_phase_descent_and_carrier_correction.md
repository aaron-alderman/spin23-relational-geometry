# Hopf Phase Descent and the Carrier Correction

**Date:** 17 October 2026  
**Branches:** B03, B08 and B09  
**Claim status:** exact free one-particle correction

## 1. The distinction that matters

The positive-helicity eigenline over momentum directions has first Chern class

\[
c_1=1.
\]

Therefore no globally smooth helicity **eigenvector** exists. This does not imply that every bilinear constructed from that eigenvector is topologically twisted.

The local chiral \(H_2(\mathbb R)\) carrier of the free Dirac checkpoint is a phase-neutral density matrix. The Hopf phase cancels from it.

## 2. Factorized fixed-helicity state

Write the positive-energy fixed-helicity state locally as

\[
\Psi_\alpha(\hat{\mathbf p})
=v\otimes u_\alpha(\hat{\mathbf p}),
\qquad
v=\begin{pmatrix}a\\b\end{pmatrix}\in\mathbb R^2,
\]

where \(\alpha=N,S\) labels the helicity patch and \(v\) contains the left/right chiral amplitudes. On an overlap,

\[
u_N=e^{i\phi}u_S,
\qquad
\Psi_N=e^{i\phi}\Psi_S.
\]

The state vector is patch-dependent, exactly as the Hopf theorem requires.

## 3. The projector descends

The full one-particle density is

\[
\rho_\alpha
=|\Psi_\alpha\rangle\langle\Psi_\alpha|
=(vv^T)\otimes(u_\alpha u_\alpha^\dagger).
\]

The transition phase cancels:

\[
\rho_N=\rho_S.
\]

Equivalently, the helicity projector is globally defined as

\[
P_h(\hat{\mathbf p})
=\frac12\bigl(I+h\hat{\mathbf p}\cdot\boldsymbol\sigma\bigr),
\]

even though no global normalized vector spanning its image exists.

## 4. The chiral Jordan response is globally real

Tracing over the helicity-spin factor gives

\[
\rho_{\rm chiral}
=\operatorname{Tr}_{\rm spin}\rho
=vv^T
=\begin{pmatrix}a^2&ab\\ab&b^2\end{pmatrix}
\in H_2(\mathbb R)_+.
\]

Therefore

\[
\boxed{
c_1(\text{helicity line})\ne0
\quad\not\Rightarrow\quad
\text{the phase-neutral chiral }H_2(\mathbb R)\text{ response is twisted}.
}
\]

This corrects the stronger interpretation in the first Hopf-obstruction note. The topology belongs to the state line and its connection; it need not be inherited by a bilinear response that quotients the common phase.

## 5. When the topology would reach the carrier

Berry transition data acts nontrivially on the two-face Jordan object only if at least one of the following occurs:

1. the two faces acquire different transition phases;
2. the observable retains phase-sensitive amplitudes rather than only bilinears;
3. interactions mix helicity sectors through a connection that does not factor as identity on chiral-face space;
4. transport around momentum space is itself an observable, so the connection rather than the pointwise density is measured.

The free factorized checkpoint satisfies none of these conditions.

## 6. Consequence for the metaplectic comparison

The equatorial helicity holonomy \(-1\) remains exact for transported state vectors. But a central sign acts trivially on density matrices:

\[
(-\Psi)(-\Psi)^\dagger=\Psi\Psi^\dagger.
\]

The same warning applies to the metaplectic central sign. A proposed Hopf–metaplectic bridge must specify a phase-sensitive state or interference observable. Equality of two invisible central signs at the projector level has no physical content by itself.

This is a stronger and cleaner gate than merely matching two minus signs.

## 7. Stop criteria

**Advance:** derive an interacting or transport observable in which the Berry clutching phase acts nontrivially on face relations and lifts canonically to \(Sp(4,\mathbb R)\) or \(Mp(4,\mathbb R)\).

**Pin:** if all admissible response observables are common-phase-neutral bilinears, keep the Hopf topology in the spin-state bundle and do not use it to motivate a twisted Jordan carrier.

**Falsify the stronger claim:** the explicit partial trace already falsifies the statement that \(c_1=1\) alone forces the free chiral \(H_2(\mathbb R)\) response to be only patchwise real.

## 8. Certificate

The [phase-descent certificate](../../../verification/verify/verify-hopf-phase-response-descent.mjs) checks the patch relation, cancellation in the full projector, and equality of the north/south real chiral partial traces.

## Companion documents

- [Helicity Hopf-bundle obstruction](122_helicity_hopf_bundle_real_carrier_obstruction.md)
- [Free Dirac chiral OS carrier](121_free_dirac_chiral_os_h2_carrier.md)
- [Metaplectic lift and Maslov correction](../0000-0099/59_metaplectic_and_maslov_correction_branch.md)
