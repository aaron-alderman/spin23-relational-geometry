# The SO(10) Vector Mediator Forces a Lepton–Color Cross Kernel but Generates the Handle Only After a Normalization and Phase Gate

**Date:** 17 October 2026  
**Primary source:** Shiroman Prakash and K. L. Ramya, *One generation of the Standard Model as a quantum error-correcting code*, arXiv:2610.21879v1  
**Branches:** vector-$\mathbf{10}$ exchange, Dirac bilinears, Schur/Feshbach response, bilocal carrier, handle dynamics, and $Spin(2,3)$  
**Claim status:** exact weight-channel and two-mode kernel theorem; equal physical normalization and pulse quantization remain conditional  
**Certificate:** [derive_so10_vector_mediator_kernel_on_lepton_color_dirac_responses.mjs](scripts/derive_so10_vector_mediator_kernel_on_lepton_color_dirac_responses.mjs)  
**Source locations:** [four-fermion interpretation and vector-$\mathbf{10}$ exchange](https://arxiv.org/html/2610.21879v1)

## Executive result

The missing handle problem advances from “is lepton–color mixing even available?” to a precise two-condition gate.

In the doubled $Spin(10)$ weight normalization, two spinor weights can couple through the vector $\mathbf{10}$ exactly when their sum is one of

\[
\pm2e_i,qquad i=1,\ldots,5.
\]

The certificate enumerates all such pairs and finds four spinor pairs for every signed vector weight. In particular,

\[
\begin{aligned}
+2e_4:quad &\nu^c\nu, u_1^cu_1, u_2^cu_2, u_3^cu_3,\\
-2e_4:quad &e^ce, d_1^cd_1, d_2^cd_2, d_3^cd_3.
\end{aligned}
\]

Thus a single neutral weak component of the $SO(10)$ vector couples simultaneously to one leptonic Dirac bilinear and the color-singlet sum of three quark bilinears. If that component has a nonzero Yukawa coupling and is integrated out, the effective response necessarily contains an off-diagonal lepton–color term.

This is the first direct $SO(10)$ mechanism in the corpus that supplies the *kind* of cross kernel needed by the selector handle.

It does not automatically supply the exact handle. In raw integral sum coordinates the coupling direction is $(1,1)$, and a relative-$\pi$ rank-one pulse gives $-H$. In canonically normalized Hilbert coordinates the color sum carries norm $\sqrt3$, so the direction is $(1,\sqrt3)$ and the same pulse gives a different Householder reflection. Exact $H$ therefore requires:

\[
\boxed{
|g_\ell|=|g_q|
\quad\text{in the physical canonical response metric}
\quad\text{and}\quad
\Delta\theta=\pi\pmod{2\pi}.
}
\]

The vector-$\mathbf{10}$ exchange proves the cross kernel is available. The normalized residue and phase/holonomy gates remain the frontier.

## 1. Exact vector-weight channel

The positive-chirality spinor weights are the sixteen even-parity sign vectors

\[
q\in\{\pm1\}^5.
\]

For two such weights $q,q'$, their sum is a vector-$\mathbf{10}$ weight precisely when they agree in one coordinate and are opposite in the other four:

\[
q+q'=\pm2e_i.
\]

The executable enumeration gives:

- 40 unordered spinor pairs landing in the vector representation;
- four pairs for each of the ten signed vector weights;
- the exact neutral up/neutrino and down/electron quartets displayed above.

The scalar field appearing at a local invariant vertex carries the dual weight to the pair sum. The label $\pm2e_i$ here identifies the fermion-bilinear channel; this sign convention does not affect the two-channel kernel.

Coordinates $4$ and $5$ are the weak directions in the Standard-Model $3+2$ split, so these are Higgs-doublet channels rather than the colored-triplet channels associated with coordinates $1,2,3$.

## 2. Schematic ultraviolet interaction

Define

\[
B_\nu=\nu^c\nu,
\qquad
B_u=\sum_{a=1}^3u_a^cu_a.
\]

Up to basis phases and the Lorentz contraction suppressed here, the unique vector-channel coupling has the schematic form

\[
\mathcal L_{+4}
=
y\Phi_{-4}(B_\nu+B_u)+\text{h.c.}
+M_4^2|\Phi_{-4}|^2.
\]

The common coefficient is an unbroken-$SO(10)$, per-weight statement. It does not yet say that the two composite sums have equal two-point-function norm.

Eliminating the heavy scalar gives

\[
\mathcal L_{\rm eff}
\supset
-\frac{|y|^2}{M_4^2}
|B_\nu+B_u|^2.
\]

The cross terms

\[
-\frac{|y|^2}{M_4^2}
(B_\nu^\dagger B_u+B_u^\dagger B_\nu)
\]

are nonzero whenever the parent Yukawa coupling is nonzero. Gauge invariance is not an obstacle because both completed bilinears are Standard-Model singlets after the required Higgs/phase convention is included.

The analogous $-2e_4$ channel replaces $(B_\nu,B_u)$ with

\[
B_e=e^ce,
\qquad
B_d=\sum_a d_a^cd_a.
\]

## 3. Raw integral coordinates versus canonical response coordinates

In the raw sum basis

\[
O_{\rm raw}=(B_\nu,B_u)^T,
\]

the common mediator direction is

\[
g_{\rm raw}=(1,1)^T,
\]

and its Schur correction is proportional to

\[
g_{\rm raw}g_{\rm raw}^T
=
\begin{pmatrix}1&1\\1&1\end{pmatrix}.
\]

This is the primitive integral equal-coefficient direction suggested by the code and by the normalized lattice sewing of document 895.

If the three color components are orthonormal microscopic bilinears, however,

\[
\|B_u\|^2=3\|B_\nu\|^2
\]

at the equal-per-component free benchmark. The unit color-singlet mode is

\[
b_u=\frac1{\sqrt3}B_u,
\]

so the same interaction becomes

\[
B_\nu+B_u=B_\nu+\sqrt3,b_u.
\]

Its canonical coupling direction is therefore

\[
g_{\rm can}=(1,\sqrt3)^T.
\]

This is not a contradiction. It is the distinction already isolated in documents 847–850:

- integral coefficient normalization;
- equal per-component normalization;
- total spectral normalization;

are different structures.

## 4. Exact pulse criterion

For a rank-one Hermitian two-mode Hamiltonian

\[
h=\kappa gg^\dagger,
\]

the evolution is

\[
U(t)
=I+
\left(e^{-i\kappa\|g\|^2t}-1\right)P_g,
\qquad
P_g=\frac{gg^\dagger}{\|g\|^2}.
\]

At relative phase $\pi$ this becomes the Householder reflection

\[
U_\pi=I-2P_g.
\]

For $g=(1,1)$,

\[
U_\pi
=
\begin{pmatrix}0&-1\\-1&0\end{pmatrix}
=-H.
\]

A common phase pulse converts $-H$ to $H$. Equivalently, one may assign phase $0$ to the symmetric mode and phase $\pi$ to the antisymmetric mode, as in document 858.

For the canonically normalized free-multiplicity direction $g=(1,\sqrt3)$,

\[
U_\pi
=
\begin{pmatrix}
\frac12&-\frac{\sqrt3}{2}\\
-\frac{\sqrt3}{2}&-\frac12
\end{pmatrix},
\]

which is a healthy passive involution but not the channel exchange.

More generally, for two nonzero real coupling magnitudes, $I-2P_g$ has zero diagonal—and hence equals the exchange up to phases—if and only if

\[
|g_\ell|=|g_q|.
\]

The certificate verifies this criterion and both displayed matrices.

## 5. What the paper changes

Before this calculation, a common mediator was only an abstract mechanism. The Prakash–Ramya weight system now identifies the mediator and the exact Standard-Model bilinears it joins:

\[
\boxed{
\text{neutral component of }\mathbf{10}
\longleftrightarrow
\left(\nu^c\nu,\sum_a u_a^cu_a\right)
}
\]

and similarly for the electron/down channel.

Therefore:

1. the two independent legs of document 896 are not merely adjacent—they share an exact $SO(10)$ vector channel;
2. a nonzero off-diagonal response kernel is symmetry allowed and is generated by ordinary tree-level elimination;
3. the remaining normalization problem is observable and calculable;
4. the remaining finite-order problem is exactly the pulse-area/holonomy problem of documents 858 and 862.

This is substantial convergence. It still does not identify a low-energy exact symmetry exchanging a lepton with a color aggregate.

## 6. Symmetry-breaking boundary

The clean common coefficient belongs to an unbroken or matched $SO(10)$ description. Realistic low-energy physics can alter it through:

- multiple Higgs representations such as $\mathbf{10}$, $\mathbf{120}$ or $\overline{\mathbf{126}}$;
- doublet mixing and threshold corrections;
- Yukawa matrices and flavor rotations;
- different quark and lepton spectral densities;
- confinement and running in the color channel;
- electroweak vacuum selection.

Accordingly, the present result is best read as a UV boundary condition plus an exact channel-selection theorem. The equal-row-sum RG and matching criterion of document 854 determines whether the candidate handle direction survives below the breaking scale.

## 7. Consequence for the Jordan/$Spin(2,3)$ chain

The refined chain is now

\[
\begin{aligned}
Spin(10)\text{ weight geometry}
&\longrightarrow
\text{shared vector-}\mathbf{10}\text{ bilinear channel}\\
&\longrightarrow
\text{rank-one Schur/Feshbach cross kernel}\\
&\longrightarrow
\text{two-mode Householder/Bogoliubov map}\\
&\xrightarrow[
\text{equal canonical residues}
]{
\text{protected }\pi\text{ phase}
}
H\in Sp(4,\mathbb R).
\end{aligned}
\]

The Schur step is the same relational operation whose polarization was identified with the Jordan triple in document 668. This gives the mediator calculation a direct place in the Jordan-triple programme rather than treating it as an unrelated GUT observation.

The continuous group $Sp(4,\mathbb R)\cong Spin_0(2,3)$ remains the canonical group of the four-real response carrier. The new result supplies one physically named rank-one generator direction inside that carrier, not the whole Lie group.

## 8. Stop-everything and falsification criteria

**Normalized-handle trigger:** an explicit spectral or transfer calculation gives $|g_\ell|=|g_q|$ in the same canonical metric as the sewn $J_0$.

**Holonomy trigger:** the mediator/boundary evolution quantizes the relative eigenphase to $\pi$, so the resulting canonical map is exactly $H$ rather than a continuously tunable mixing.

**Strong synthesis trigger:** the same effective action supplies the order-three active generator $R$ and the handle $H$, with their finite relations protected by one common topology or Ward identity.

**UV-only outcome:** equality holds at the $SO(10)$ matching scale but fails the row-sum RG criterion below it. Then the selector is an ultraviolet boundary structure with computable infrared defect.

**Negative normalization trigger:** the physical canonical ratio remains rigidly $1:\sqrt3$ with no normalized contraction or Ward identity that changes it. Then vector-$\mathbf{10}$ exchange generates mixing but not the selector handle.

**Falsifiers:**

- the listed Dirac pairs fail the vector-weight sum test;
- the common mediator has a nonzero coupling to both channels but produces no off-diagonal Schur term;
- a rank-one $\pi$ pulse with unequal canonical coupling magnitudes is claimed to equal the exchange matrix.

The executable certificate excludes all three algebraic errors.

## 9. Verdict

| Question | Verdict |
|---|---|
| Do lepton and color Dirac bilinears share one vector-$\mathbf{10}$ component? | **yes, exactly at weight level** |
| Does integrating it out produce a cross kernel? | **yes, if its Yukawa coupling is nonzero** |
| Is the raw integral coupling direction primitive $(1,1)$? | **yes** |
| Is the free canonically normalized direction also $(1,1)$? | **no; it is $(1,\sqrt3)$** |
| Can a rank-one mediator pulse generate $H$? | **yes, iff canonical magnitudes are equal and the relative phase is $\pi$** |
| Are those two conditions derived dynamically? | **not yet** |

## 10. Position in the corpus

- [all 25 logicals factor through the vector $\mathbf{10}$](446_all_25_code_logicals_factor_through_the_so10_vector_10_but_12_require_colored_mediators.md)
- [common-mediator normalization theorem](847_a_common_schur_or_stress_mediator_transmits_but_does_not_select_the_singlet_triplet_symplectic_ratio.md)
- [conditional free color-multiplicity benchmark](849_free_uv_color_multiplicity_conditionally_gives_a_three_to_one_stress_weight_but_not_the_symplectic_pencil_ratio.md)
- [positive Hamiltonian realization of the selector](858_positive_quadratic_hamiltonian_pulses_generate_the_exact_bilocal_selector_without_finite_dimensional_instability.md)
- [pulse areas are not automatically protected](862_positive_quadratic_dynamics_does_not_protect_the_selector_pulse_areas_or_its_finite_order.md)
- [normalized lattice sewing](895_normalized_color_contraction_produces_the_primitive_relationship_area_and_the_ordered_neutrino_pair_completes_the_exact_selector_lattice.md)
- [Dirac doubling supplies the independent modes but not their exchange](896_prakash_ramya_dirac_doubling_supplies_independent_bilocal_legs_but_not_the_selector_handle.md)
