# The Qutrit Character Algebra Maps Canonically to the Selector POVM, but Transports the Protected Group Law Only Losslessly

**Date:** 17 October 2026  
**Branches:** Prakash–Ramya qutrit phase, three-character dilation, unital completely positive maps, reflection covariance, multiplicative domains, and anomaly-to-holonomy typing  
**Claim status:** exact observable-algebra intertwiner; microscopic/source-derived response map remains open  
**Certificate:** [intertwine_the_qutrit_character_algebra_with_the_passive_selector_povm.mjs](../../../verification/intertwine/intertwine_the_qutrit_character_algebra_with_the_passive_selector_povm.mjs)

## Executive result

The proposed map from the qutrit phase characters to the selector dilation does exist canonically at the observable-algebra level.

Let

\[
\mathcal A_3=\mathbb CE_0\oplus\mathbb CE_1\oplus\mathbb CE_2\cong\mathbb C^3
\]

be the diagonal qutrit algebra, and let \(P_0,P_1,P_2\) be the positive barycentric effects of the passive selector cycle. There is a unique unital completely positive map

\[
\Phi:\mathcal A_3\longrightarrow M_2(\mathbb C),
\qquad
\Phi(E_k)=P_k.
\]

For the cubed Prakash–Ramya phase

\[
U^3=E_0+\omega E_1+\omega^2E_2,
\]

one has exactly

\[
\boxed{\Phi(U^3)=C_{\rm loss}.}
\]

The map also intertwines logical negation \(E_1\leftrightarrow E_2\) with the established target reflection \(D=h\chi\):

\[
D\Phi(a)D=\Phi(Xa).
\]

This closes existence, uniqueness and reflection covariance of the character-to-response map. It does **not** yet derive the map from Standard-Model dynamics.

The decisive boundary is multiplicativity. At zero loss, \(P_0=0\) and \(P_1,P_2\) are orthogonal spectral projectors, so \(\Phi\) descends to a genuine representation of the two-character quotient and transports the protected group law. Under strict loss, \(\Phi\) remains completely positive but ceases to be multiplicative. Therefore anomaly protection does not automatically survive compression into the dissipative two-port response.

## 1. Why the map is canonical

Every linear map from \(\mathbb C^3\) is determined by the images of its three primitive idempotents. Such a map is unital and completely positive precisely when

\[
P_k\succeq0,
\qquad
P_0+P_1+P_2=I.
\]

Document 939 proves these conditions throughout the full passive silver-loss quadrant. Hence the character map exists globally.

Conversely, the three matrices \(I,C,C^*\) determine the \(P_k\) by the inverse three-point Fourier transform. Thus \(\Phi\) is the unique unital linear map satisfying

\[
\Phi(1)=I,
\qquad
\Phi(U^3)=C,
\qquad
\Phi(U^{-3})=C^*.
\]

This is not an arbitrary fitted Kraus rotation. It is the operator-valued Fourier transform already implicit in the Naimark dilation.

## 2. Reflection covariance

Let the source reflection be

\[
X(E_0)=E_0,
\qquad
X(E_1)=E_2,
\qquad
X(E_2)=E_1.
\]

It sends \(U^3\mapsto U^{-3}\). On the response plane, take

\[
D=\operatorname{diag}(1,-1).
\]

For the passive silver family, \(P_0\) is diagonal and the other two effects obey

\[
DP_0D=P_0,
\qquad
DP_1D=P_2.
\]

Therefore

\[
\boxed{\operatorname{Ad}_D\circ\Phi=\Phi\circ X.}
\]

The logical orientation reversal and the \(h\chi\) response reflection are exactly compatible at the observable level.

## 3. Lossless multiplicative quotient

At \((\ell_n,\ell_t)=(0,0)\),

\[
\operatorname{rank}(P_0,P_1,P_2)=(0,1,1),
\]

with \(P_1P_2=0\) and \(P_1+P_2=I\). Thus \(E_0\) lies in the kernel and

\[
\Phi:\mathbb C^3/(\mathbb CE_0)\cong\mathbb C^2\longrightarrow M_2(\mathbb C)
\]

is a faithful *-representation onto the diagonal algebra in the cycle eigenbasis.

The ninth-root phase also descends:

\[
W=\Phi(U)=\zeta_9P_1+\zeta_9^{-1}P_2,
\]

and satisfies

\[
W^3=C,
\qquad
W^9=I.
\]

So the lossless complex active plane admits an exact order-nine root of the Coxeter phase. This root is not an element of the integral real selector group; it lives in the complex spectral completion.

## 4. Strict loss and the multiplicative-domain obstruction

For a unital completely positive map, an element \(a\) lies in its multiplicative domain only if

\[
\Phi(a^*a)=\Phi(a)^*\Phi(a).
\]

Since \(U^3\) is unitary in the source algebra,

\[
\Phi((U^3)^*U^3)-\Phi(U^3)^*\Phi(U^3)
=I-C^*C.
\]

Strict passive loss gives

\[
I-C^*C\neq0.
\]

Therefore \(U^3\) leaves the multiplicative domain immediately under loss. In particular, for

\[
W_{\rm loss}=\Phi(U),
\]

one generically has

\[
W_{\rm loss}^3\neq C_{\rm loss},
\qquad
W_{\rm loss}^9\neq I.
\]

The anomaly-protected group law survives in the coherent character dilation, not in its lossy two-dimensional compression.

## 5. Relation to the Naimark network

The minimal dilation supplies an isometry

\[
V\psi=(\sqrt{P_0}\psi,\sqrt{P_1}\psi,\sqrt{P_2}\psi)
\]

and a representation

\[
\pi(E_k)=\text{projection onto character sector }k.
\]

Then

\[
\Phi(a)=V^*\pi(a)V.
\]

Thus the logical-character map and the previously constructed environment-character network are the same Stinespring architecture. The qutrit source provides a possible arithmetic interpretation of the character algebra; the response calculation provides its operator-valued compression.

What remains absent is a derivation that identifies the qutrit logical algebra with the physical boundary-field algebra before \(\Phi\) is reconstructed from the desired response.

## 6. What is now closed

- A unique UCP map sends the three qutrit characters to the three selector effects.
- It sends the protected cubed phase exactly to the passive selector cycle.
- Logical negation and \(h\chi\) reflection are exactly intertwined.
- The lossless map becomes a representation after quotienting the absent trivial character.
- The strict-loss failure of group-law transport is exactly the Kadison defect \(I-C^*C\).
- The Naimark dilation is the Stinespring dilation of this map.

## 7. What remains open

- deriving \(\Phi\) from Furey/Standard-Model boundary couplings rather than from \(C\);
- identifying what physical operation realizes the qutrit logical algebra;
- preserving the full unpunctured neutrino pair during the construction;
- connecting the anomaly cubic to the causal response action;
- determining whether the ninth-root lift has an integral or metaplectic meaning on the full four-carrier;
- adjoining the independent commuting color \(C_3\) to recover \(C_3\times S_3\).

## 8. Stop-everything and falsification criteria

**Microscopic-intertwiner trigger:** the boundary action derives the three effects as images of source-native logical character projectors.

**Quantization trigger:** gauge/anomaly integrality fixes the physical response holonomy to \(\Phi(U^3)\) without fitting pole ratios or pulse areas.

**Coherent-protection trigger:** the complete six-port environment carries the source logical representation with a physically fixed isometry \(V\).

**Typing falsifier:** the logical reflection cannot be identified with the same weak/Pfaffian reflection acting on the bilocal response.

**Dynamics falsifier:** every source-derived map differs from the unique POVM map or violates complete positivity, gauge invariance or causality.

**Overclaim warning:** the existence of the canonical UCP map is a structural theorem, not evidence that Standard-Model matter dynamically implements a quantum error-correction channel.

## 9. Verdict

| Question | Verdict |
|---|---|
| Does a canonical qutrit-character to selector-effect map exist? | **yes, uniquely as a UCP map** |
| Does it map \(U^3\) to the selector cycle? | **yes, exactly** |
| Does it preserve reflection orientation? | **yes** |
| Does it transport multiplication at zero loss? | **yes, on the two-character quotient** |
| Does it transport the protected group law after lossy compression? | **no** |
| Is the map microscopically derived from the Standard Model/Furey action? | **not yet** |

## 10. Position in the corpus

- [qutrit anomaly phase versus selector group](940_the_prakash_ramya_qutrit_anomaly_gate_contains_a_protected_c3_phase_but_its_order18_extension_is_not_the_selector_group.md)
- [global passive POVM theorem](939_the_full_passive_silver_loss_family_has_positive_c3_barycentric_effects_and_exact_six_port_dilations.md)
- [minimal three-label boundary network](933_a_minimal_three_label_boundary_network_is_orbit_local_character_diagonal_and_activates_the_common_mode_exactly_with_loss.md)
- [strict-loss reduced finite-order no-go](928_strict_passive_loss_destroys_exact_finite_order_in_the_reduced_selector_network.md)
- [full twelve-port selector dilation](930_the_lossy_four_channel_selector_is_the_compression_of_an_exact_twelve_port_order18_unitary_representation.md)

**Subsequent resolution:** document [942](942_the_order18_selector_is_the_cubed_shadow_of_a_cyclotomic_order162_ninth_root_extension_but_the_root_is_not_integral.md) classifies the lossless ninth-root lift on the full handle-paired carrier. It generates $(C_9\times C_9)\rtimes C_2$ of order 162, whose cubed subgroup is exactly $C_3\times S_3$. The root exists over the real cubic field $\mathbb Q(2\cos(2\pi/9))$ but cannot be rational or integral in four dimensions.
