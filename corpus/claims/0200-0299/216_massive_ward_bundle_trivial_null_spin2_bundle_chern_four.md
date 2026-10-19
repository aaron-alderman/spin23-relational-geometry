# The Massive Ward Bundle Is Trivial, but the Null Spin-Two Bundle Has Chern Number Four

**Date:** 17 October 2026  
**Branches:** B01, B02, B04, B06, B07, B09 and B11  
**Claim status:** standard bundle topology plus an exact clutching calculation; identification with the project’s two-face carrier remains a candidate bridge

> **Scope:** the Chern-four result applies to a genuine null helicity-two carrier, not automatically to the five-component spin-two projector in a timelike stress spectral continuum. See [the stress spectral/helicity scope audit](225_null_helicity_topology_is_not_generic_stress_spectral_topology.md).

## 1. Why support-bundle topology matters

The analytic Ward sewing theorem works on constant-rank momentum patches. A global fixed \(H_2(\mathbb R)\) coordinate system additionally requires a global frame for the physical source bundle, or transition functions that can be absorbed consistently.

The answer differs sharply between non-null and null momentum.

## 2. Euclidean nonzero momentum: no topological obstruction

Normalize Euclidean momentum to \(q\in S^3\subset\mathbb R^4\). Conservation restricts a symmetric source to

\[
\operatorname{Sym}^2(q^\perp).
\]

But \(q^\perp\cong T_qS^3\), and \(S^3\) is parallelizable. Writing \(q\) as a unit quaternion, left multiplication by the three imaginary quaternion units gives a global orthonormal tangent frame.

Consequently,

\[
TS^3\cong S^3\times\mathbb R^3,
\]

and therefore both

\[
\operatorname{Sym}^2(TS^3)
\quad\text{and}\quad
\operatorname{Sym}^2_0(TS^3)
\]

are trivial bundles. The rank-five transverse traceless sector and rank-one transverse trace sector admit global frames.

The positive timelike Lorentzian mass shell is hyperbolic three-space and is contractible, so it likewise carries no bundle-topology obstruction.

## 3. Null directions: the screen bundle

For a future null momentum, quotient the transverse space by the null ray itself:

\[
\mathcal E_q=q^\perp/\langle q\rangle.
\]

After removing the positive energy scale, null directions form the celestial sphere \(S^2\), and the screen bundle \(\mathcal E\) is naturally the oriented tangent bundle \(TS^2\).

Its Euler class is

\[
e(TS^2)=2u,
\]

where \(u\) generates \(H^2(S^2,\mathbb Z)\).

## 4. Spin two doubles the frame angle

The real transverse-traceless polarization bundle is

\[
\operatorname{Sym}^2_0(\mathcal E).
\]

If a screen frame rotates by \(\theta\), a traceless symmetric tensor rotates by \(2\theta\). Thus the associated oriented rank-two bundle has

\[
e\!\left(\operatorname{Sym}^2_0\mathcal E\right)
=2e(\mathcal E)
=4u.
\]

Equivalently, its circular-helicity complex lines have first Chern numbers

\[
c_1(L_{+2})=\pm4u,
\qquad
c_1(L_{-2})=\mp4u,
\]

with sign fixed by helicity/orientation convention. This agrees with the general massless relation \(C=-2h\) and with the explicit graviton-bundle result that the two helicity lines have Chern numbers \(\mp4\): [Palmerduca and Qin, *Helicity is a topological invariant of massless particles*](https://arxiv.org/abs/2407.03494) and [*Graviton topology*](https://arxiv.org/abs/2404.11696).

No globally smooth nonvanishing section exists for either single-helicity line.

## 5. The combined pair and the real carrier

The two opposite helicity lines have cancelling first Chern classes. Their direct sum can be topologically trivial even though the helicity splitting is not. This distinction mirrors an important programme theme:

- the full two-face carrier may admit a global frame;
- choosing one orientation/helicity face globally may be obstructed;
- transition functions retain physical phase/holonomy information.

This is a mathematically concrete way for a globally trivial pair to contain individually twisted faces.

## 6. Hopf interpretation—with the winding counted correctly

Let \(H\to S^2\) denote the primitive Hopf line bundle with \(c_1(H)=u\). A helicity-
\(h\) line is topologically a \((-2h)\)-th tensor power of this primitive line, up to convention:

\[
L_h\simeq H^{-2h}.
\]

For spin two,

\[
L_{+2}\simeq H^{-4}.
\]

Therefore “one twist” can consistently refer to the primitive Hopf carrier, but the null stress/helicity-two response sees its fourth tensor power. Treating the stress polarization itself as a single-winding bundle would be false.

## 7. Relation to \(Spin(2,3)\) and the relational carrier

The Chern-four result does not derive \(Spin(2,3)\). It supplies a nontrivial global datum absent in the massive/vacuum plane analysis:

\[
\text{local positive response}
+\text{null-direction patching}
+\text{helicity holonomy}.
\]

To connect it to the two-face \(H_2(\mathbb R)\) carrier, one must construct an explicit intertwiner from the opposite-helicity pair to the carrier faces and show how the off-diagonal relationship coordinate transforms on patch overlaps.

## 8. Stop-everything and falsification gates

**Carrier-intertwiner success:** the two faces are identified with opposite helicity lines and their cross term descends globally with the predicted fourth-power transition function.

**Primitive-Hopf success:** the Furey/internal construction supplies a canonical Hopf line whose fourth tensor power is the stress-helicity bundle.

**Twist falsifier:** any proposal assigning Chern number one directly to a helicity-two stress polarization contradicts the clutching calculation.

**Massive-sector falsifier:** a claimed unavoidable momentum-space twist is based only on non-null directions; the \(S^3\) and timelike support bundles are trivial.

**Physical gate:** demonstrate an observable Berry phase, patch transition or polarization transport effect rather than inferring new dynamics from the characteristic class alone.

## 9. Certificate

The [Ward-bundle topology certificate](../../../verification/verify/verify_ward_bundle_topology_spin2.mjs) constructs a global quaternionic tangent frame on sample points of \(S^3\) and verifies that the spin-two clutching phase has winding four around the equator.

## Companion documents

- [Constant-kernel Ward Herglotz sewing](215_constant_kernel_ward_herglotz_pseudoinverse_sewing.md)
- [Helicity Hopf bundle real-carrier obstruction](../0100-0199/122_helicity_hopf_bundle_real_carrier_obstruction.md)
- [Hopf phase descent and carrier correction](../0100-0199/123_hopf_phase_descent_and_carrier_correction.md)
- [Conserved-stress Ward quotient](206_conserved_stress_spectral_quotient_to_h2_response.md)
