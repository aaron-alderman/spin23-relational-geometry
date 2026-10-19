# Frontier Wave 2 QFT 02: (z_L/z_R) is an interpolating-operator coordinate, not a standalone observable

**Date:** 18 October 2026  
**Status:** exact finite-renormalization no-go; tree equality isolated; EOM/CP/CPT/LSZ audit complete  
**Certificate:** [verify_frontier_wave2_qft_relative_overlap_no_go.mjs](scripts/verify_frontier_wave2_qft_relative_overlap_no_go.mjs)

## Result

Neither LSZ normalization, the Dirac equation, CP/CPT nor the renormalized Yukawa Ward identity fixes the interacting ratio

\[
\frac{z_L}{z_R}
=
\frac{\langle0|[(\sqrt2/v)H^\dagger L]_{\rm R}|e\rangle}
{\langle0|[e^{c\dagger}]_{\rm R}|e\rangle}
\]

without an operator-renormalization prescription.

At tree level with canonical fields,

\[
\frac{\sqrt2}{v}H^\dagger L\longrightarrow e_L,
\qquad e^{c\dagger}=e_R,
\]

and the rest-frame positive-energy Dirac equation gives

\[
z_L=z_R
\]

after the mass is made real and positive. This equality belongs to that canonical tree convention.

In the interacting theory an allowed finite operator redefinition

\[
O_L\mapsto aO_L,
\qquad O_R\mapsto bO_R,
\qquad a,b\ne0
\]

sends

\[
\frac{z_L}{z_R}\mapsto\frac{a}{b}\frac{z_L}{z_R}.
\]

The inverse source transformation leaves every complete generating functional and amplitude unchanged. Hence the bare overlap ratio and the corresponding trace-normalized pole ray are scheme coordinates, not observables.

The irreducible endpoint is:

\[
\boxed{
z_L/z_R\text{ can be fixed by a renormalization condition or inferred through calibrated source amplitudes, but it is not predicted by the existing algebra or Ward identities.}
}
\]

## 1. Tree-level equality

In unitary gauge around the Higgs vacuum,

\[
H=\frac1{\sqrt2}\binom{0}{v+h},
\]

so the normalized composite begins as

\[
O_L:=\frac{\sqrt2}{v}H^\dagger L
=e_L+\frac{h}{v}e_L+\cdots.
\]

The right face is

\[
O_R:=e^{c\dagger}=e_R.
\]

At free level only the first term in (O_L) has a vacuum-to-one-electron matrix element. In the electron rest frame the positive-energy Dirac equation identifies the two chiral spinors, giving the residue vector

\[
z_{\rm tree}\propto(1,1)^T
\]

and the normalized projector

\[
\frac{z_{\rm tree}z_{\rm tree}^\dagger}{z_{\rm tree}^\dagger z_{\rm tree}}
=\frac12\begin{pmatrix}1&1\\1&1\end{pmatrix}.
\]

This is exactly the result of wave-2 QFT document 01. It uses canonical kinetic normalization, the (v)-normalization of the composite and a real-positive mass convention.

## 2. LSZ fixes the state, not every interpolating operator

LSZ normalization fixes the normalization of the asymptotic one-electron state and, in a declared on-shell scheme, the residue assigned to a chosen elementary interpolating field. It does not require every local operator with an electron overlap to have the same matrix element.

For any pair of interpolators (O_i), the pole part has the factorized form

\[
G_{ij}(p)\sim
\frac{z_i z_j^*}{p^2-m_e^2+i0}
\times\text{spin numerator}.
\]

Changing (O_i) changes (z_i), while the normalized physical state is untouched. Composite-operator mixing and finite subtractions therefore survive ordinary LSZ normalization.

The exact Standard Model adds an infrared qualification: because the photon is massless, a charged electron is an infraparticle rather than a strict isolated Wigner particle. The sharp-pole language is perturbative or requires an infrared regulator/dressed-state prescription. Gauss-law analyses explain why a charged state need not have a sharp mass eigenvalue; see [Mund, Rehren and Schroer, *Gauss' Law and String-Localized Quantum Field Theory*](https://arxiv.org/abs/1906.09596). This does not rescue (z_L/z_R); it makes its nonperturbative standalone interpretation still less canonical.

## 3. Exact finite-renormalization proof

Write

\[
O=\binom{O_L}{O_R},
\qquad S_{\rm source}=\int(\eta^\dagger O+O^\dagger\eta).
\]

For any invertible diagonal finite matrix

\[
D=\operatorname{diag}(a,b),
\]

define

\[
O'=DO,
\qquad \eta'=D^{-\dagger}\eta.
\]

Then

\[
\eta'^\dagger O'=\eta^\dagger O.
\]

The pole vector and Gram residue transform as

\[
z'=Dz,
\qquad G'_{\rm pole}=DG_{\rm pole}D^\dagger.
\]

Consequently (z_L/z_R) can be moved to any nonzero value by choosing (a/b), while all amplitudes formed with the correspondingly transformed physical sources remain invariant.

This is a proof of non-observability, not merely a statement that a loop calculation has not yet been done.

## 4. Dirac-equation audit

The elementary on-shell spinor satisfies the renormalized Dirac equation. That fixes the kinematic relation between its left and right components. It does not identify the normalization of an arbitrary composite interpolator with the elementary left-handed field.

The renormalized (e^c) equation of motion schematically reads

\[
i\bar\sigma\!\cdot\!D,e^{c\dagger}
=y_e[H^\dagger L]_{\rm R}
+\sum_k c_k[O_k]_{\rm R}
+\text{contact terms}.
\]

The additional operators include gauge-field composites and scheme-dependent EOM representatives. One may use this equation as a **definition** of an EOM-normalized ([H^\dagger L]_{\rm R}). That fixes a scheme, but does not show that the initially chosen composite already has unit overlap.

Under the simultaneous finite redefinition

\[
[H^\dagger L]_{\rm R}\mapsto a[H^\dagger L]_{\rm R},
\qquad y_e\mapsto y_e/a,
\]

the physical EOM product is unchanged. The Dirac equation therefore constrains a product, not the separate overlap.

## 5. Yukawa Ward identity

The renormalized identity has the form

\[
\partial_\mu[J_x^\mu]_{\rm R}
=i,d_e(x)y_e[\mathcal O_e]_{\rm R}
+\mathrm{h.c.}+\mathcal A_x+\mathrm{EOM/contact}.
\]

It fixes the integer character (d_e(x)) and the renormalization of the full insertion (y_e[\mathcal O_e]_{\rm R}). It is invariant under

\[
[\mathcal O_e]_{\rm R}\mapsto c[\mathcal O_e]_{\rm R},
\qquad y_e\mapsto y_e/c.
\]

Thus the Ward identity cannot fix the isolated composite overlap. This is the same distinction found in document 08 between charge normalization and response normalization.

Composite operators generally require mixing and a declared subtraction scheme; an explicit gauge-theory treatment is [Collins and Scalise, *The Renormalization of Composite Operators in Yang–Mills Theories Using General Covariant Gauge*](https://arxiv.org/abs/hep-ph/9403231).

## 6. CP and CPT

For one generation, CP can be used to choose a common real convention for the mass and, when no irreducible spectral phase remains, for (z_L/z_R). It does not impose

\[
|z_L|=|z_R|.
\]

Every real positive vector

\[
z=(r,1)^T,
\qquad r>0,
\]

is CP-real. Equality (r=1) would require an actual parity or left-right exchange symmetry. The Standard Model weak interaction does not supply that symmetry.

CPT relates electron and positron matrix elements and pole data. It likewise does not exchange the two electron interpolators in a way that fixes their relative magnitude. CPT constrains the conjugate channel, not the finite operator basis within one charged channel.

Therefore:

- CP can reduce a phase ambiguity to a real sign or positive convention;
- CPT relates particle and antiparticle residues;
- neither removes the positive rescaling (a/b).

## 7. What is observable

Let calibrated external probes couple through

\[
g_LO_L+g_RO_R.
\]

The one-electron production amplitude depends on

\[
\mathcal M\propto g_Lz_L+g_Rz_R.
\]

Under (O_i\mapsto a_iO_i), the source coefficients transform as (g_i\mapsto g_i/a_i), and every product (g_iz_i) is unchanged. Observable interference can determine ratios such as

\[
\frac{g_Lz_L}{g_Rz_R}
\]

when (g_L/g_R) is independently calibrated. It cannot determine (z_L/z_R) without that convention.

Likewise, the trace-normalized pole matrix

\[
\widehat G(z)=\frac{zz^\dagger}{z^\dagger z}
\]

is invariant under a common rescaling of both operators but changes under an allowed relative rescaling. Its position in the (H_2) cone is therefore source-frame dependent.

The smallest genuine observable is a complete calibrated amplitude or rate, not the overlap ratio alone.

## 8. Final classification

| Candidate selector | What it fixes | Does it force (z_L/z_R=1)? |
|---|---|---:|
| tree canonical fields and (v)-normalization | free overlap convention | yes, at tree level |
| LSZ | state/chosen-field pole normalization | no |
| Dirac equation | elementary chiral kinematics; EOM products | no |
| CP | removable phase / real slice | no magnitude equality |
| CPT | particle–antiparticle relation | no |
| Yukawa Ward identity | (d_e) and (y_e\mathcal O_e) insertion | no |
| finite operator renormalization | can choose any nonzero ratio | proves scheme dependence |
| calibrated two-source experiment | invariant products (g_iz_i) | measures a complete amplitude |

The branch is pinned. A preferred ratio requires one of:

1. an explicit operator-renormalization condition, such as an EOM/on-shell composite scheme;
2. a genuine left-right symmetry absent from the Standard Model;
3. independently calibrated probes that turn (g_Lz_L/g_Rz_R) into an observable.

None is supplied by the existing Furey incidence, TRO or Ward-character data.

## 9. Dependencies

- [Normalized electron spectral projection](frontier_wave2_qft_01_normalized_electron_spectral_projection.md)
- [Electron action gate](frontier_parallel_qft_08_action_gate_for_the_dressed_electron_functor.md)
- [Exact electron contrast intertwiner](frontier_parallel_qft_07_furey_electron_contrast_intertwines_exactly_with_de.md)

