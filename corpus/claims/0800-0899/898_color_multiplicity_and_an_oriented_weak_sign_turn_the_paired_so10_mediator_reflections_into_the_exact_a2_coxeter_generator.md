# Color Multiplicity and an Oriented Weak Sign Turn the Paired SO(10) Mediator Reflections into the Exact A2 Coxeter Generator

**Date:** 17 October 2026  
**Branches:** $SO(10)$ vector mediator, color multiplicity, weak Pfaffian orientation, $A_2$ Coxeter geometry, active selector, and $Spin(2,3)$  
**Claim status:** exact conditional theorem; physical weak-channel identification and pulse quantization remain open  
**Certificate:** [derive_paired_so10_mediator_reflections_as_the_a2_coxeter_generator.mjs](../../../verification/derive/derive_paired_so10_mediator_reflections_as_the_a2_coxeter_generator.mjs)

**Subsequent resolution:** document 899 constructs the minimal $16\,16\to10$ Clebsch map explicitly and finds that its two weak-partner channels differ only by an overall sign. The conditional theorem below remains exact, but the minimal vector-$\mathbf{10}$ plus ordinary weak Pfaffian does not satisfy its sector-relative-sign hypothesis.

## Executive result

The factor of $\sqrt3$ that prevented one vector-$\mathbf{10}$ mediator pulse from being the handle is not algebraic debris. Together with an oriented weak sign, it produces the exact order-three generator already present in the selector.

After canonical normalization, the up/neutrino mediator channel of document 897 has coupling normal

\[
g_+=(1,\sqrt3).
\]

If the weak-conjugate down/electron channel is transported to the same response plane with the opposite relative orientation,

\[
g_-=(1,-\sqrt3),
\]

then relative-$\pi$ mediator pulses produce two Householder reflections

\[
S_+=I-2P_{g_+},
\qquad
S_-=I-2P_{g_-}.
\]

Their ordered product is

\[
C=S_-S_+
=
\begin{pmatrix}
-\frac12&-\frac{\sqrt3}{2}\\
\frac{\sqrt3}{2}&-\frac12
\end{pmatrix},
\qquad
C^3=I.
\]

This is the Euclidean $120^\circ$ Coxeter rotation. More strongly, with

\[
P=
\begin{pmatrix}
1&-\frac12\\
0&\frac{\sqrt3}{2}
\end{pmatrix},
\]

one has

\[
CP=PA,
\qquad
A=
\begin{pmatrix}0&-1\\1&-1\end{pmatrix},
\]

where $A$ is exactly the integral active selector block found in documents 864–895. The same conjugator satisfies

\[
P^TP=\frac12
\begin{pmatrix}2&-1\\-1&2\end{pmatrix}
=\frac12G_{A_2}.
\]

Therefore the mediator-pulse geometry, the color $A_2$ metric and the integral $C_3$ augmentation-ideal action meet in one exact diagram.

The theorem is conditional at one crucial point: the two physical weak channels must be identified with the opposite relative sign. The Pfaffian weak orientation of document 892 is precisely typed to provide such a sign, but that identification has not yet been derived from the $16\,16\,10$ component action. Without it, the two reflections are identical and their product is the identity.

## 1. Why $\sqrt3$ appears

The neutral vector-$\mathbf{10}$ component couples to one leptonic Dirac bilinear and three equal color components:

\[
B_\ell,qquad B_{q,1},B_{q,2},B_{q,3}.
\]

The color-singlet sum is

\[
B_q=B_{q,1}+B_{q,2}+B_{q,3}.
\]

If the four microscopic bilinears have equal per-component norm, then

\[
b_q=\frac1{\sqrt3}B_q
\]

is the unit color-singlet mode. Equal per-component Yukawa coefficients therefore become

\[
B_\ell+B_q
=B_\ell+\sqrt3,b_q.
\]

The normalized mediator direction is not $(1,1)$ but $(1,\sqrt3)$.

This is the same distinction between per-component and total spectral normalization encountered in the stress-tensor branch. Here it has an exact geometric consequence.

## 2. The two reflections

For a unit-normalized direction $g$, a rank-one pulse with relative eigenphase $\pi$ acts as

\[
S_g=I-2\frac{gg^T}{g^Tg}.
\]

For the two oriented channels,

\[
S_+
=
\begin{pmatrix}
\frac12&-\frac{\sqrt3}{2}\\
-\frac{\sqrt3}{2}&-\frac12
\end{pmatrix},
\]

\[
S_-
=
\begin{pmatrix}
\frac12&\frac{\sqrt3}{2}\\
\frac{\sqrt3}{2}&-\frac12
\end{pmatrix}.
\]

Both satisfy

\[
S_\pm^2=I,
\qquad
\det S_\pm=-1.
\]

Their normals have inner product

\[
g_+\cdot g_-=1-3=-2,
\]

and equal squared norm $4$, so the angle between them has cosine $-1/2$. This is the rank-two $A_2$ root angle.

Accordingly,

\[
S_-S_+=C,
\qquad
S_+S_-=C^{-1},
\]

and both products have characteristic polynomial

\[
\lambda^2+\lambda+1.
\]

## 3. Exact integral conjugacy

Choose a Euclidean unit vector $v=(1,0)^T$. The columns of $P$ are

\[
P=(v,Cv).
\]

Since

\[
C^2v=-v-Cv,
\]

the action of $C$ in this orbit basis is

\[
A=
\begin{pmatrix}0&-1\\1&-1\end{pmatrix}.
\]

Thus

\[
CP=PA.
\]

The orbit basis is not orthonormal. Its Gram matrix is

\[
P^TP
=
\begin{pmatrix}1&-1/2\\-1/2&1\end{pmatrix}
=\frac12G_{A_2}.
\]

Consequently

\[
A^TG_{A_2}A=G_{A_2}.
\]

This reproduces all three structures previously obtained by separate routes:

1. the Euclidean $120^\circ$ rotation after whitening;
2. the $A_2$ metric before whitening;
3. the integral augmentation-ideal action $A$.

The conjugator $P$ is exactly the standard root-lattice geometry, not an arbitrary similarity fitted after the fact.

## 4. Relation to the selector

The typed four-real carrier has a fixed neutral plane and an active relationship plane. On the active plane the color/selector generator is

\[
R_{\rm act}=A.
\]

Therefore, if the paired mediator responses are physically identified with that active plane, the two-pulse sequence gives

\[
R=I_2\oplus A
\]

after adjoining the neutral fixed complement.

This is a more specific claim than merely observing that both objects have order three. The matrices are explicitly conjugate, and the conjugator pulls the Euclidean metric back to the same $A_2$ form already selected by color incidence.

The categorical caveat is equally specific: the mediator calculation initially lives on the real span of two canonically normalized composite responses. Identifying that plane with the incidence-selected relationship plane requires the Higgs/weak sewing map. That map is now the only missing representation-level arrow.

## 5. Why the weak sign matters

If both mediator channels are transported with the same relative sign, then

\[
g_-=g_+,
\qquad
S_-=S_+,
\]

and hence

\[
S_-S_+=I.
\]

No order-three action appears.

The sign must therefore be oriented data, not a disposable convention applied independently to each channel. A common rephasing of the whole two-mode plane changes neither conclusion; what matters is the relative identification between the up/neutrino and down/electron response fibers.

Document 892 found exactly two coherent weak lifts compatible with skew/Pfaffian typing:

\[
U=\pm\varepsilon.
\]

An alternating weak contraction changes sign under reversal of the ordered doublet legs. This makes it the natural candidate for transporting one weak component with the required opposite orientation.

But “natural candidate” is not yet a derivation. The actual $SO(10)$ Clebsch coefficients, Lorentz contraction, Higgs doublet ordering and Furey source arrows must be composed explicitly.

## 6. A changed interpretation of the multiplicity obstruction

Document 897 found that the $sqrt3$ multiplicity prevents one mediator reflection from being the handle $H$. The present result shows that the same factor is exactly what places the two oriented normals at the $A_2$ Coxeter angle.

Thus the two selector generators may have different physical origins:

- $H$ requires equal canonical response weights and exchanges two completed modes;
- $R$ may arise from the product of two unequal-multiplicity mediator reflections related by weak orientation.

This is preferable to forcing one mechanism to generate both operations. It also matches the established algebra, where $H$ is an exchange and $R$ is an order-three active-plane transformation.

## 7. Jordan-triple interpretation

Each mediator elimination is a rank-one Schur/Feshbach operation. Its polarization is part of the established Jordan-triple recursion. The ordered pair of eliminations therefore gives a concrete route

\[
\text{two oriented Jordan/Feshbach faces}
\longrightarrow
\text{two reflections}
\longrightarrow
\text{Coxeter }C_3.
\]

After adjoining the primitive neutral determinant plane and the symplectic sewing of document 895, this becomes a candidate physical origin for one finite subgroup generator inside

\[
Sp(4,\mathbb R)\cong Spin_0(2,3).
\]

It does not by itself generate the continuous group or prove the full Jordan-triple recursion theorem.

## 8. Stop-everything and falsification criteria

**Clebsch/Pfaffian trigger:** explicit component reduction of the $16\,16\,10$ invariant followed by the weak Pfaffian sewing produces the two normals $(1,\sqrt3)$ and $(1,-\sqrt3)$ in one common response frame.

**Pulse trigger:** the two mediator eigenphases are each quantized to $\pi$, making the operations exact reflections rather than generic continuous rotations.

**Identification trigger:** the resulting response plane maps equivariantly to the incidence-selected augmentation ideal with conjugator $P$ or its integral equivalent.

**Strong selector trigger:** the above construction and an independently derived handle $H$ satisfy the complete order-18 relations on the physically normalized four-carrier.

**Negative sign trigger:** the full component action transports both weak channels with the same relative orientation. Their reflection product is then the identity, and this route to $R$ closes negatively.

**Negative phase trigger:** the mediator phases are not protected at $\pi$. The exact $C_3$ relation is then fine tuning, as anticipated by document 862.

**Falsifiers:** failure of $C^3=I$, failure of $CP=PA$, or failure of $P^TP=G_{A_2}/2$. The executable certificate verifies all three.

## 9. Verdict

| Question | Verdict |
|---|---|
| Does color multiplicity give the normal $(1,\sqrt3)$? | **yes at the equal-per-component benchmark** |
| Do opposite weak orientations give two $A_2$ reflections? | **yes** |
| Is their product exactly order three? | **yes** |
| Is it conjugate to the integral active selector block? | **yes, explicitly** |
| Does the conjugator reproduce the $A_2$ metric? | **yes: $P^TP=G_{A_2}/2$** |
| Is the opposite physical weak orientation derived? | **not yet** |
| Are the two $\pi$ pulses protected? | **not yet** |

## 10. Position in the corpus

- [Pfaffian weak orientation](892_pfaffian_skewness_or_even_real_structure_collapses_the_higgs_hopf_phase_to_the_two_weak_symplectic_signs.md)
- [weak Pfaffian times the $A_2$ metric](893_the_weak_pfaffian_times_the_a2_color_metric_is_exactly_j0_over_the_reals_but_does_not_select_the_known_integral_completion_equivariantly.md)
- [typed carrier completion](895_normalized_color_contraction_produces_the_primitive_relationship_area_and_the_ordered_neutrino_pair_completes_the_exact_selector_lattice.md)
- [Dirac-doubled bilocal source](896_prakash_ramya_dirac_doubling_supplies_independent_bilocal_legs_but_not_the_selector_handle.md)
- [single-mediator cross kernel and handle criterion](897_the_so10_vector_mediator_forces_a_lepton_color_cross_kernel_but_generates_the_handle_only_after_a_normalization_and_phase_gate.md)
- [positive quadratic selector pulses](858_positive_quadratic_hamiltonian_pulses_generate_the_exact_bilocal_selector_without_finite_dimensional_instability.md)
- [pulse-area protection no-go](862_positive_quadratic_dynamics_does_not_protect_the_selector_pulse_areas_or_its_finite_order.md)
