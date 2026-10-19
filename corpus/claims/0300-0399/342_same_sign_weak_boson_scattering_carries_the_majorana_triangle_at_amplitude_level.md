# Same-Sign Weak-Boson Scattering Carries the Majorana Triangle at Amplitude Level

**Date:** 17 October 2026  
**Branches:** B03, B05, B06, B08 and B11  
**Claim status:** exact Majorana-exchange flavor kernel and deep-Euclidean triangle limit; experimentally coherent cross-channel phase tomography remains open

## 1. A concrete lepton-number-violating process

Majorana neutrino exchange permits the same-sign process

\[
W^-W^-\longrightarrow\ell^-_\alpha\ell^-_\beta.
\]

Suppressing common spinor, gauge and kinematic factors, its flavor kernel is

\[
\boxed{
F_{\alpha\beta}(q^2)
=\sum_i
U_{\alpha i}U_{\beta i}
\frac{m_i}{q^2-m_i^2}.}
\]

The numerator \(m_i\) is the chirality-flipping Majorana insertion. The two unconjugated mixing factors are what retain Majorana phases.

The kernel is complex symmetric:

\[
F_{\alpha\beta}=F_{\beta\alpha}.
\]

## 2. Charged-flavor covariance

Under a charged-lepton phase convention,

\[
U_{\alpha i}\mapsto e^{i\theta_\alpha}U_{\alpha i},
\]

the kernel transforms as

\[
F_{\alpha\beta}
\mapsto
e^{i(\theta_\alpha+\theta_\beta)}F_{\alpha\beta}.
\]

Therefore the closed six-amplitude quantity

\[
\boxed{
\mathcal I_F(q^2)
=\operatorname{Im}\!\left[
F_{e\mu}F_{\mu\tau}F_{\tau e}
F_{ee}^*F_{\mu\mu}^*F_{\tau\tau}^*
\right]}
\]

is invariant under every charged-flavor rephasing.

This is the amplitude-level counterpart of the weak-basis Majorana projector triangle.

## 3. Deep-Euclidean matching to the mass matrix

Use spacelike momentum

\[
q^2=-Q^2,
\qquad
Q^2>0.
\]

Then

\[
F_{\alpha\beta}(-Q^2)
=-\sum_iU_{\alpha i}U_{\beta i}
\frac{m_i}{Q^2+m_i^2}.
\]

For \(Q^2\gg m_i^2\),

\[
\begin{aligned}
F(-Q^2)
&=-\frac1{Q^2}U\,\operatorname{diag}(m_i)\,U^T
+O(Q^{-4})\\
&=-\frac1{Q^2}M_\nu^*
+O(Q^{-4}),
\end{aligned}
\]

using the convention

\[
M_\nu=U^*\operatorname{diag}(m_i)U^\dagger.
\]

Since the triangle contains six matrix entries,

\[
\boxed{
\mathcal I_F(-Q^2)
=-\frac{\mathcal I_{M_\nu}}{Q^{12}}
+O\!\left(\frac{m_{\max}^2}{Q^{14}}\right).}
\]

The sign follows from complex conjugation; it changes if the opposite amplitude convention is chosen. The oriented information is the same.

## 4. CP conjugation

The conjugate process

\[
W^+W^+\longrightarrow\ell^+_\alpha\ell^+_\beta
\]

has the conjugate flavor kernel when absorptive Standard-Model phases are neglected:

\[
F\longmapsto F^*.
\]

Thus

\[
\mathcal I_F\longmapsto-\mathcal I_F.
\]

But every isolated channel rate obeys

\[
|F_{\alpha\beta}|^2
=|F_{\alpha\beta}^*|^2.
\]

A single same-sign dilepton rate cannot reveal the loop orientation.

## 5. What must interfere

The invariant contains relative phases among six amplitudes:

\[
F_{e\mu},\quad
F_{\mu\tau},\quad
F_{\tau e},\quad
F_{ee},\quad
F_{\mu\mu},\quad
F_{\tau\tau}.
\]

To measure it, one needs a common coherent reference that compares different charged-flavor channels. Formally this can be supplied by:

- coherent preparation and analysis of charged-lepton flavor superpositions;
- an ancillary flavor-mixing network before detection;
- interference with calibrated LNV reference amplitudes;
- a quantum simulator realizing the same symmetric kernel.

Ordinary channel-by-channel cross sections do not suffice.

## 6. Connection to the three-port protocol

At a fixed spacelike momentum, \(F(-Q^2)\) is a symmetric three-port amplitude matrix. The preceding Schur and lock-in construction applies algebraically:

- one flavor-changing LNV amplitude is the direct path;
- a product of two others forms an indirect path through the third flavor;
- diagonal LNV amplitudes normalize the closed loop;
- a controlled phase reference extracts the sine quadrature.

This identifies a Standard-Model amplitude carrying the required phase, while leaving the coherent phase-control technology open.

## 7. Why neutrinoless double beta decay is insufficient by itself

Conventional neutrinoless double beta decay primarily probes

\[
F_{ee}\sim\sum_iU_{ei}^2m_i
\]

in the appropriate virtuality regime. It is sensitive to Majorana phases, but only through one diagonal entry and generally through a rate magnitude.

The full triangle needs flavor-changing and additional diagonal LNV channels. One \(ee\) measurement cannot reconstruct it.

## 8. Physical obstacles

The exact kernel does not imply a feasible experiment. Major obstacles include:

- extremely small light-neutrino mass insertions;
- inability to prepare long-lived coherent \(e,\mu,\tau\) superpositions;
- different charged-lepton masses and phase-space factors;
- crossed-channel and spinor structures that must be normalized consistently;
- absorptive phases that can mimic CP-odd amplitude phases;
- practical absence of intense on-shell weak-boson beams;
- possible dominance of heavy sterile states or other LNV operators.

These are physical dependencies, not algebraic ambiguities.

## 9. Stop-everything and falsification gates

**Stop-everything trigger:** a realistic LNV process or simulator reconstructs \(\mathcal I_F\) and its high-virtuality limit agrees with the weak-basis mass triangle.

**Heavy-state trigger:** sterile-neutrino resonances amplify the flavor kernel while retaining the exceptional phase relation.

**Rate falsifier:** channel magnitudes alone are claimed to determine the oriented triangle.

**Oscillation falsifier:** the kernel is replaced by a lepton-number-conserving oscillation amplitude in which Majorana phases cancel.

**Kinematic falsifier:** amplitudes evaluated at inequivalent momentum transfers are multiplied without removing their common and channel-dependent kinematic factors.

**CP falsifier:** absorptive final-state phases are interpreted as the Majorana weak phase without a conjugate-process or dispersive subtraction.

## 10. Pinned dependency

The programme now has an explicit Standard-Model LNV amplitude carrying the triangle. The remaining measurement dependency is coherent cross-flavor phase tomography or an equivalent common-interference process.

This is narrower than the earlier question of whether any physical amplitude exists.

## 11. Certificate

The [LNV Majorana-exchange triangle-kernel certificate](../../../verification/verify/verify_lnv_majorana_exchange_triangle_kernel.mjs) checks a nonzero spectral example, charged-flavor rephasing invariance, CP sign reversal, deep-Euclidean convergence to the mass triangle and orientation blindness of isolated channel rates.

## Companion documents

- [Weak-basis Majorana triangle invariant](330_the_exceptional_majorana_phase_has_a_weak_basis_three_projector_triangle_invariant.md)
- [Three-port Majorana holonomy](331_majorana_cp_is_the_holonomy_obstructing_three_local_spin23_edges_from_one_global_real_carrier.md)
- [Quadrature lock-in protocol](339_a_quadrature_lockin_protocol_measures_the_three_port_schur_holonomy.md)
- [Exceptional phase through the seesaw](333_the_exceptional_phase_crosses_the_aligned_seesaw_but_has_a_transmission_zero.md)
