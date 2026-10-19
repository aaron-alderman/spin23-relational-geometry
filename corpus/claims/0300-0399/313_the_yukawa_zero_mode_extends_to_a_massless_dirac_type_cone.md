# The Yukawa Zero Mode Extends to a Massless Dirac-Type Cone

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B05, B06, B08 and B11  
**Claim status:** exact Clifford-symbol extension of the internal grading; complete chiral Standard-Model gauge and locality realization remains open

## 1. From a static mass zero to a propagating mode

The 15-state Yukawa analysis established an internal mass operator

\[
M_Y=
\begin{pmatrix}0&M_{8\times7}\\M^\dagger&0\end{pmatrix}
\]

and a grading

\[
W=\operatorname{diag}(I_8,-I_7)
\]

with

\[
\{W,M_Y\}=0.
\]

That result by itself concerns the zero-momentum mass matrix. A Lorentz/spin extension turns the unmatched vector into a massless propagating cone.

## 2. Clifford extension

Let Hermitian matrices \(\alpha_i\) and \(\beta\) obey

\[
\{\alpha_i,\alpha_j\}=2\delta_{ij},
\qquad
\{\alpha_i,\beta\}=0,
\qquad
\beta^2=I.
\]

Define the Dirac-type symbol

\[
\boxed{
H(p)=\sum_i\alpha_i p_i\otimes I_{15}
+\beta\otimes M_Y.}
\]

The extended grading is

\[
\boxed{S=\beta\otimes W.}
\]

Using both Clifford and internal anticommutation,

\[
\boxed{\{S,H(p)\}=0.}
\]

Thus the full symbol has a genuine chiral spectral symmetry, not merely an internal sign assignment.

## 3. The unmatched state becomes a massless cone

Let \(v_\nu\) be the unmatched internal vector,

\[
M_Yv_\nu=0.
\]

On the corresponding spinor subspace,

\[
H(p)=\alpha\cdot p,
\]

so

\[
\boxed{H(p)^2=|p|^2I,\qquad E(p)=\pm|p|.}
\]

The forced mass-matrix zero therefore extends to a protected massless Dirac-type dispersion.

For three generations, the three-dimensional internal kernel produces at least three such cones before neutrino-mass effects.

## 4. Massive charged modes

If \(M_Yv=m v\) in a paired charged sector, Clifford anticommutation gives

\[
H(p)^2=|p|^2+m^2
\]

on that mass eigenmode. The same symbol therefore contains the ordinary relativistic massive dispersion for paired doublet/singlet states and the massless dispersion for the unmatched neutrino.

## 5. Neutrino-mass forks revisited

### Dirac completion

Adding \(\nu^c\) balances the internal sectors and allows \(M_Y\) to become invertible while preserving \(\{W,M_Y\}=0\). The neutrino cone acquires a Dirac mass without breaking the extended grading.

### Majorana/Weinberg breaking

A same-sector Majorana block \(A_M\) gives

\[
M_M=
\begin{pmatrix}A_M&M\\M^\dagger&0\end{pmatrix},
\qquad
\{W,M_M\}\neq0.
\]

Then

\[
\{S,H_M(p)\}\neq0,
\]

and the previously massless cone can acquire

\[
E^2=|p|^2+m_M^2.
\]

Neutrino mass is therefore either grading-preserving sector completion or grading-breaking same-sector pairing.

## 6. What this does not yet prove

The construction is a Dirac-type symbol theorem. A full Standard-Model realization must still establish:

- the correct left-handed Weyl rather than vectorlike Dirac field content;
- gauge-covariant derivatives in each representation block;
- the Lorentz action of the Furey conjugation \(C_F\);
- locality and reflection/spectral positivity;
- compatibility with the CAR basis projection;
- absence of extra spinor or mirror degrees introduced by the Clifford representation;
- anomaly and boundary-mode matching.

The Clifford factor is a mathematical completion of the kinetic sign, not yet a derivation of spacetime spin from Furey’s internal algebra.

## 7. Relation to domain-wall and Floquet branches

The protected kernel can be interpreted in several still-open ways:

1. an ordinary continuum neutrino cone;
2. a domain-wall zero mode localized by a mass sign change;
3. a Floquet zero or \(\pi\) quasienergy mode;
4. a boundary response pole whose residue lands in the Jordan carrier.

These interpretations share the anticommuting symbol but differ physically. Boundary conditions and spectral flow must select among them.

## 8. Stop-everything and falsification gates

**Stop-everything trigger:** the Furey Lorentz factor supplies the required \(\alpha_i,\beta\), the internal \(W\), and a local gauge-covariant operator whose only unmatched cones are the observed neutrinos.

**Domain-wall trigger:** the same \(W\) controls a mass sign change and the survivor Gram residue of the localized zero mode.

**Mirror falsifier:** the Clifford extension doubles the physical chiral spectrum rather than merely representing its kinetic symbol.

**Gauge falsifier:** the \(\alpha_i,\beta\) completion mixes inequivalent gauge blocks outside Higgs-dressed mass terms.

**Locality falsifier:** the symmetry exists only through a nonlocal momentum-dependent transformation.

## 9. Certificate

The [Lorentz-Clifford Yukawa grading certificate](../../../verification/verify/verify_lorentz_clifford_extension_of_yukawa_grading.mjs) checks the full anticommutator, massless dispersion of the unmatched mode and grading-breaking Majorana gap.

## Companion documents

- [Fifteen-state Yukawa zero mode](312_the_fifteen_state_yukawa_grading_forces_one_neutrino_zero_mode_per_generation.md)
- [Second real structure parameterized by \(W\)](311_a_second_polarization_reversing_real_structure_is_parameterized_by_one_unitary.md)
- [Free Dirac chiral OS carrier](../0100-0199/121_free_dirac_chiral_os_h2_carrier.md)
- [Domain-wall Schur–Herglotz carrier](../0200-0299/229_finite_domain_wall_resolvent_is_a_schur_herglotz_carrier.md)
