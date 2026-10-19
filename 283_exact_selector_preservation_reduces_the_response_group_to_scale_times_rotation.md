# Exact Selector Preservation Reduces the Response Group to Scale Times Rotation

**Date:** 17 October 2026  
**Branches:** B01, B02, B04, B05, B06, B07, B08 and B11  
**Claim status:** exact finite-dimensional commutant and stabilizer classification; whether the physical selector is fixed or covariantly transported remains open

## 1. The dynamical-closure question

Let \(P=nn^T\) select the time/population direction and let \(\eta=2P-I\). Exact preservation by a response operator \(R\) means

\[
[R,P]=0.
\]

Choose \(P=\operatorname{diag}(1,0,0)\) and \(\eta=\operatorname{diag}(1,-1,-1)\).

## 2. Symmetric response commutant

A real symmetric matrix commuting with \(P\) has the form

\[
R=\begin{pmatrix}a&0&0\\0&b&c\\0&c&d\end{pmatrix}.
\]

The full symmetric-matrix space has dimension six; the commutant has dimension four. The two removed directions are the time--plane mixings \(E_{01}+E_{10}\) and \(E_{02}+E_{20}\).

Positive commuting responses remain plentiful:

\[
a\geq0,
\qquad
\begin{pmatrix}b&c\\c&d\end{pmatrix}\succeq0.
\]

Exact closure is compatible with passivity, but it block-diagonalizes the selected direction from the relationship plane.

## 3. Lorentz stabilizer

The Lorentz algebra \(\mathfrak{so}(1,2)\) contains two boosts mixing the selected axis with the plane and one rotation within the plane. Commutation with \(P\) removes both boosts. Only \(\mathfrak{so}(2)\) survives. Adding conformal scaling gives

\[
\boxed{\mathbb R_+\times SO(2).}
\]

This is much smaller than the full Lorentz group of the Jordan determinant and smaller still than \(Sp(4,\mathbb R)\cong Spin_0(2,3)\).

## 4. Orbit consequence

Starting from a response ray aligned with \(n\), the fixed-selector stabilizer cannot move it into the plane. It therefore cannot generate an open cone orbit from one seed.

Independent sources may still inject arbitrary plane components, so physical response values need not lie on one ray. The exact conclusion is:

> Full cone exploration cannot arise solely as the symmetry orbit of one seed under transformations fixing the selector pointwise.

## 5. Three architectures

### Fixed selector plus independent sources

Keep \(P\) fixed and let sources populate time and plane sectors independently. Full span is then source kinematics, not symmetry orbit.

### Covariantly transported selector

Allow \(P\mapsto gPg^{-1}\) together with the response. Boosts can act, but the selector becomes a section of an orbit bundle.

### Spontaneous selector field

Promote \(P\) or \(n\) to a dynamical field. A vacuum chooses the stabilizer, and broken boost-like directions require a Goldstone, gauge or constrained-mode analysis.

## 6. Relation to earlier stress-plane results

The stress-plane branch similarly found that restricted spectral images preserve only a subgroup of the ambient Jordan geometry. The shared principle is

\[
\text{full carrier geometry}\neq\text{symmetry of a selected response family}.
\]

## 7. Consequence for \(Spin(2,3)\)

The fixed selector establishes the signature while hiding the boosts needed to traverse the Lorentz cone. A credible full-group role requires a covariant selector, multiple source sectors, a spectrum-generating interpretation or a gauge-redundant parent description.

The exact algebraic Jordan--\(Sp(4)\) theorem remains intact. What is reduced is the symmetry of the selected physical state or response family.

## 8. Stop-everything and falsification gates

**Stop-everything trigger:** a dynamical or gauge selector transforms covariantly under the full response group while observables remain positive and unitary.

**Source-span trigger:** normalized physical sources populate the two removed mixing directions and produce a locally open cone image.

**Goldstone trigger:** spontaneous selector breaking yields precisely the required healthy modes and no unobserved long-range sector.

**Fixed-orbit falsifier:** a fixed-selector \(SO(2)\) orbit is presented as the full \(Spin(2,3)\) cone action.

**Closure falsifier:** kernels claimed to preserve the selector have time--plane blocks with no transport law for \(P\).

## 9. Certificate

The [selector-commutant response certificate](scripts/verify_selector_commutant_response_reduction.mjs) verifies the four-dimensional symmetric commutant, removal of two mixing directions, the \(\mathfrak{so}(2)\) Lorentz stabilizer and the conformal scale generator.

## Companion documents

- [Spectral-projector Jordan selector](282_an_isolated_real_neutrino_eigenline_gives_a_covariant_stable_jordan_selector.md)
- [Stress-plane stabilizer is a \(Spin(2,2)\) subgeometry](210_stress_plane_stabilizer_is_spin22_inside_spin23.md)
- [UV normalization reduces abstract \(Sp(4)\)](214_uv_normalization_reduces_sp4_to_siegel_parabolic.md)
- [Locking-field gauge and scalar spectrum](80_locking_field_gauge_and_scalar_spectrum.md)
