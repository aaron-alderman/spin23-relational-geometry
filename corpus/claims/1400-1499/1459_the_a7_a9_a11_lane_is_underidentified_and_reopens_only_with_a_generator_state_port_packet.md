# The A7/A9/A11 lane is underidentified and reopens only with a generator--state--port packet

**Date:** 20 October 2026

**Gates:** A7, A9 and A11

**Status:** exact underidentification theorem for current inputs; minimal physical-response packet identified

**Depends on:** [the scheme-invariant threshold](../1300-1399/1396_no_current_principle_predicts_the_reader_curvature_coupling_so_only_the_traceless_threshold_is_scheme_robust.md), [the preregistered endpoint](../1300-1399/1399_a11_should_preregister_the_traceless_spectral_support_shift_and_treat_the_third_matrix_direction_as_secondary.md), [the device gate](1452_the_scheme_invariant_a11_experiment_is_a_calibrated_spectral_pole_and_band_contrast_with_a_device_prediction_gate.md), and [the exact QWZ Lindblad control](1454_the_zenodo_chern_quadrature_reproduces_but_is_not_the_exact_sigma_z_lindblad_hall_response.md)

**Evidence:** [machine-readable certificate](../../../evidence/data/spin23-a7-a9-a11-generator-state-port-underidentification.json) and [executable verifier](../../../verification/verify/verify_spin23_a7_a9_a11_generator_state_port_underidentification.mjs)

## Result

The present corpus determines a scheme-robust **class** of internal observables, but it cannot determine a physical pole shift, residue, linewidth, port or device signal. This is not merely missing numerical work. Four explicit deformations preserve all declared structure while changing the desired outputs.

The irreducible datum required to reopen the lane is

\[
 \boxed{(\mathcal L_h,\rho_h;\mathcal V_{b,h},J_{a,h},D_{ab,h})},
\]

namely a sector-resolved generator, a stationary state or preparation rule, and calibrated physical input/output ports including direct contacts. With those objects, the response is

\[
 Y_{ab,h}(\omega)
 =D_{ab,h}
 +\operatorname{Tr}\!\left[
 J_{a,h}(i\omega-\mathcal L_h)^{-1}
 \mathcal V_{b,h}\rho_h
 \right].
\]

Without any one block, the corresponding physical quantity is undefined. No further manipulation of the existing response algebra can supply it.

## 1. What survives current ambiguities

For the scalar reader, the traceless stress channel

\[
 S=T_{xx}-T_{yy}
\]

has one-particle vertex

\[
 v_S(k)=\frac{K_x-K_y}{E_k}.
\]

The scalar improvement term is proportional to the trace/longitudinal structure and cancels from this difference. Local counterterms are polynomial contacts and cannot move separated-frequency spectral support. Thus the channel and its support are scheme robust within the declared model.

The frozen fixture has exact positive spectra, conjugate-sector degeneracy \(h=1=h=2\), and thresholds

\[
 \Omega_0=2.56124969,
 \qquad
 \Omega_{1,2}=1.74426461
\]

in model units. These remain synthetic fixture values. The following deformations prove that symmetry does not promote them to device predictions.

## 2. Symmetry leaves the pole contrast arbitrary

Let \(W\) generate the declared \(\mathbb Z_3\) sectors,

\[
 W|h\rangle=\omega^h|h\rangle.
\]

Exact \(CP\) and \(\mathbb Z_3\) permit

\[
 H_\lambda=H_0+\lambda(W+W^\dagger).
\]

The sector shifts are

\[
 \delta E_h=2\lambda\cos\frac{2\pi h}{3}
 =(2\lambda,-\lambda,-\lambda).
\]

Therefore the even sector contrast changes by

\[
 \delta\!\left(E_0-\frac{E_1+E_2}{2}\right)=3\lambda.
\]

The deformation preserves the conjugate-sector equality but makes the contrast arbitrary. Hence neither \(CP\), \(\mathbb Z_3\), nor ambient \(Spin(2,3)\) response geometry predicts the physical shift.

## 3. Port normalization leaves the residue arbitrary

For every allowed operator \(O_S\), the rescaling

\[
 O_S\longmapsto gO_S
\]

preserves its transformation law and all pole positions. A two-point residue transforms as

\[
 R\longmapsto g^2R.
\]

Moreover a physical port may be orthogonal to the mode, giving zero residue even when the internal pole exists. The action must therefore provide a normalized coupling to a named source or detector; representation matching alone cannot do so.

## 4. Coordinate covariance does not select a physical port

Let \(C\) be a two-channel response in the internal trace/traceless basis and let \(B\in GL(2,\mathbb R)\) be an unknown map from laboratory controls to that basis. Then

\[
 C\longmapsto BCB^T,
 \qquad
 s\longmapsto B^{-T}s
\]

preserves

\[
 s^TCs.
\]

This proves covariance under a **known** coordinate change. It does not determine the unknown physical \(B\) or source vector \(s\). A calibrated reference plane and dimensional source normalization are indispensable A7/A9 data.

## 5. A linewidth is not an open-system response

If

\[
 \mathcal L_h r_n=\lambda_n r_n,
\]

with left mode \(\ell_n\), the response residue is

\[
 R^{(n)}_{ab,h}
 =\operatorname{Tr}(J_{a,h}r_n)
 \;\ell_n^\dagger\mathcal V_{b,h}\rho_h.
\]

The pole depends on the generator, while its weight also depends on the stationary state and both ports. A symmetry-compatible bath can change \(\lambda_n\), \(\rho_h\), and the overlaps independently.

Document 1454 is the decisive control. Its phenomenological scalar width gives a value about \(0.9720664\) at the registered point, while the exact stationary state of the written \(L=\sigma_z\) Lindbladian is generically \(I/2\). The Hamiltonian Kubo source then vanishes and the exact stationary response is zero. A retarded linewidth without its state, noise and response superoperator is not a prediction.

## 6. Minimal reopen packet

The smallest response-complete input has three necessary blocks:

1. **Generator:** a dimensional sector-resolved \(\mathcal L_h[u]\), including Hamiltonian, boundary conditions, interactions and environment.
2. **State:** a stationary density operator \(\rho_h\) or a finite-time preparation rule.
3. **Ports:** physical \(\mathcal V_b\), \(J_a\) and \(D_{ab}\), with reference-plane calibration and units.

The packet is minimal in the following operational sense:

- without the generator there are no predicted poles or linewidths;
- without the state there are no populations or response forcing;
- without the ports there are no residues, measured channels or physical units.

Given a well-posed generator and renormalized ports, the packet is sufficient to calculate the linear response. It does not guarantee that the result matches nature.

An executable experiment additionally needs a preparation-confusion or poisoning matrix, calibration covariance and drift, and measured sector-resolved disorder/linewidth distributions. A fundamental protected-\(\mathbb Z_3\) claim separately needs \(W^3=I\), access to all three sectors, a validated sector increment, and decreasing local mixing with separation or code size.

## 7. Path back to \(Spin(2,3)\)

\[
\begin{aligned}
 Spin(2,3)
 &\to \text{typed curved action}\\
 &\to \text{localized charged reader and }W\\
 &\to (\mathcal L_h,\rho_h)\\
 &\to \text{matched physical ports}\\
 &\to Y_h(\omega)\\
 &\to \text{pole/band contrast}\\
 &\to \text{protected-sector experiment}.
\end{aligned}
\]

The corpus reaches the conditional reader and invariant analysis protocol. It does not contain a generator--state--port packet for a named device.

## 8. Exhaustion verdict

\[
\boxed{
\begin{array}{ll}
\text{scheme-robust internal channel/support:}&\textbf{derived},\\
\text{physical shift, residue, port and linewidth:}&\textbf{underidentified},\\
\text{current-input continuation:}&\textbf{exhausted},\\
\text{reopen datum:}&\textbf{generator+state+ports},\\
\text{physical admission:}&\textbf{false}.
\end{array}}
\]

## Reproduction

~~~powershell
node verification/verify/verify_spin23_a7_a9_a11_generator_state_port_underidentification.mjs
~~~
