# Symmetric-Phase Options for the Dressed Carrier

**Date:** 17 October 2026  
**Branches:** B01, B03, B05 and B08  
**Claim status:** local Standard-Model option audit; no canonical symmetric-phase carrier found

## 1. The problem

The corrected broken-phase faces are

\[
\widetilde\chi_L=\frac{\sqrt2}{v}H^\dagger L,
\qquad
\widetilde\chi_R=e_R.
\]

They have equal gauge quantum numbers and engineering dimension, but the construction uses \(v\) and fails in the symmetric limit.

Can the normalization be replaced before electroweak symmetry breaking?

## 2. Divide by an external scale

For any dimension-one scale \(\mu\),

\[
\chi_L^{(\mu)}
=
\frac{H^\dagger L}{\mu},
\qquad
\chi_R=e_R
\]

is local, gauge covariant and dimensionally homogeneous.

But \(\mu\) is not selected by the operator algebra. Changing \(\mu\) rescales one face by a positive congruence. This preserves the sign of the determinant cone but changes response residues, portal coefficients and the physical normalization of the relation coordinate.

Thus this option preserves the geometry while losing a canonical physical scale.

## 3. Normalize by the Higgs norm

One can write

\[
\widehat\chi_L
=
\frac{H^\dagger L}{\sqrt{H^\dagger H}}.
\]

This is gauge invariant in its denominator and has dimension \(3/2\). It resembles a Higgs-direction or dressing-field construction.

However:

- it is nonpolynomial;
- it is singular at \(H^\dagger H=0\);
- it is not defined on the symmetric vacuum;
- its quantum definition requires composite-operator renormalization and a prescription through Higgs zeros.

It therefore encodes the broken-phase direction rather than solving the symmetric-phase problem.

## 4. Derivative dressing

The covariant derivative supplies the missing dimension:

\[
i\!\not\!\!D\,e_R
\]

has dimension \(5/2\), matching \(H^\dagger L\), and the derivative flips the relevant Weyl index structure.

But the charged-lepton equation of motion gives schematically

\[
i\!\not\!\!D\,e_R
=
y_e^*H^\dagger L.
\]

Hence the two proposed faces are equation-of-motion equivalent rather than independent channels. Away from separated on-shell matrix elements, contact terms and operator mixing remain, but the construction does not yield an independent relational pair.

## 5. No polynomial neutral scalar of dimension one

Within the minimal Standard Model, the elementary dimension-one matter scalar is the Higgs doublet. There is no local polynomial gauge-singlet scalar of dimension one by which to dress \(e_R\).

The first polynomial Higgs singlet is

\[
H^\dagger H,
\]

of dimension two. Multiplying \(e_R\) by it overshoots the target dimension; taking its square root returns to the nonpolynomial option.

This is not a theorem about all extensions or nonlocal observables. It is a local minimal-Standard-Model obstruction.

## 6. Consequence

The dressed \(H_2(\mathbb R)\) carrier currently has three honest interpretations:

1. a broken-phase carrier normalized by \(v\);
2. a scale-dependent response normalized by an external \(\mu\);
3. a nonlocal or nonpolynomial Higgs-direction carrier.

There is no canonical local polynomial symmetric-phase realization in the audited field content.

This reinforces the possibility that the \(Spin(2,3)\) carrier is emergent only after symmetry breaking or boundary selection, while the symmetric theory retains the larger \(H_2(\mathbb C)\)/\(Spin(2,4)\) structure.

## 7. Stop-everything criteria

**Advance:** derive the normalization scale from a stress tensor, boundary condition, condensate or spectral sum rule.

**Emergent-only conclusion:** prove that every local symmetric-phase construction is either EOM-redundant or noncanonical, while the \(v\)-normalized broken-phase kernel closes.

**Falsify the minimal carrier:** show that observables depend on the arbitrary normalization in a way that cannot be absorbed into an allowed congruence or measured coupling.

**Reopen with new physics:** a gauge-singlet dimension-one scalar or a canonical nonlocal dressing would evade the minimal-Standard-Model obstruction.

## 8. Certificate

The [symmetric-phase options certificate](../../../verification/verify/verify-symmetric-phase-dressed-face-options.mjs) checks dimensions and charges, the three candidate constructions, EOM redundancy and determinant scaling under arbitrary face normalization.

## Companion documents

- [Lorentz, dimension, and chiral-phase audit](132_lorentz_dimension_and_chiral_phase_audit.md)
- [Gauge-neutral dressed response](118_dressed_charged_lepton_h2_response.md)
- [Stress-energy reduction gate](../0000-0099/46_stress_energy_to_jordan_carrier_reduction_gate.md)
- [The \(H_2(\mathbb C)\) parent-restoration branch](129_h2c_fallback_restores_spin24_parent.md)
