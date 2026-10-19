# The Free Dirac Kernel Realizes the Finite Faces but Makes the Arrow Sign a Chiral-Basis Choice

**Date:** 17 October 2026  
**Branches:** B01, B02, B03, B04, B05, B06, B08, B11 and B14  
**Claim status:** exact free fixed-helicity response theorem and face-preserving sign equivalence; interacting and multi-cycle relative orientation remain open

## Executive result

The existing free-Dirac Osterwalder–Schrader kernel provides the physical two-face response sought in the electron branch. For one fixed-helicity momentum sector,

\[
h(k,m)=k\sigma_z+m\sigma_x,
\qquad
\omega=\sqrt{k^2+m^2},
\]

and the positive-energy residue direction is

\[
P_+(k,m)=\frac12\left(I+\frac{h(k,m)}{\omega}\right)
=\frac12
\begin{pmatrix}
1+k/\omega&m/\omega\\
m/\omega&1-k/\omega
\end{pmatrix}.
\]

This realizes the finite Peirce interpretation exactly:

\[
p\leftrightarrow\text{left population},
\qquad
q\leftrightarrow\text{right population},
\qquad
E_{12}+E_{21}\leftrightarrow\text{Dirac mass relation}.
\]

But the face-preserving chiral transformation \(\sigma_z\) gives

\[
\boxed{
\sigma_zP_+(k,m)\sigma_z=P_+(k,-m).}
\]

It fixes both diagonal projectors and flips both arrow orientations. Thus the two signs counted in the neutral Gram branch are unitarily equivalent for one free Dirac channel.

The normalized projector fixes only the shape of a spectral ray. A physical pole residue is

\[
ZP_+(k,m),
\qquad Z>0,
\]

and \(Z\) remains undetermined. The free kernel therefore closes the kinematic positivity gate but does not predict the mass sign, mass magnitude or response normalization.

## 1. Exact Jordan coordinates

Write

\[
P_+=
\begin{pmatrix}
t+x&y\\
y&t-x
\end{pmatrix}.
\]

Then

\[
t=\frac12,
\qquad
x=\frac{k}{2\omega},
\qquad
y=\frac{m}{2\omega}.
\]

The determinant vanishes:

\[
t^2-x^2-y^2=0.
\]

Hence each one-particle pole lies on a boundary ray of the \(H_2(\mathbb R)_+\) Lorentz cone.

The scale-free ratios are

\[
\frac{x}{t}=\frac{k}{\omega},
\qquad
\frac{y}{t}=\frac{m}{\omega},
\]

with

\[
\left(\frac{x}{t}\right)^2
+\left(\frac{y}{t}\right)^2=1.
\]

These are kinematic direction cosines. They contain the measured mass-to-energy ratio; they do not determine \(m\).

## 2. Face-preserving arrow reversal

Let

\[
p=E_{11},
\qquad
q=E_{22},
\qquad
a=E_{12}.
\]

Conjugation by \(\sigma_z\) gives

\[
\sigma_zp\sigma_z=p,
\qquad
\sigma_zq\sigma_z=q,
\]

but

\[
\sigma_za\sigma_z=-a,
\qquad
\sigma_za^T\sigma_z=-a^T.
\]

Therefore

\[
\sigma_z(E_{12}+E_{21})\sigma_z
=-(E_{12}+E_{21}).
\]

Since the free mass term multiplies this symmetric arrow, \(m\mapsto-m\). This is exactly the \(\pm E_{12}\) ambiguity found in the abstract real TRO embeddings.

The two descriptions are not merely analogous: the free chiral basis transformation implements the algebra automorphism explicitly.

## 3. Reflection-positive kernel

For positive Euclidean times,

\[
K_{ia,jb}
=e^{-\omega(t_i+t_j)}P_+(k,m)_{ab}.
\]

Because \(P_+=uu^T\) for a normalized real spinor \(u\),

\[
K=(q\otimes u)(q\otimes u)^T,
\qquad q_i=e^{-\omega t_i}.
\]

Thus the kernel is positive and the two-face carrier is dynamically realized in this free sector. The sign equivalence preserves positivity because it is unitary conjugation.

## 4. Projector normalization versus physical residue

The equations

\[
P_+^2=P_+,
\qquad
\operatorname{tr}P_+=1
\]

normalize a spectral **direction**. A general physical two-point function has a residue

\[
R=ZP_+,
\]

where \(Z\) is a wave-function or operator-overlap factor.

Then

\[
\operatorname{tr}R=Z.
\]

Neither the Peirce relations nor the projector identity fixes \(Z\). In an interacting theory it becomes scale- and scheme-dependent until a Ward identity or canonical source normalization is specified.

Similarly,

\[
|m|=\frac{|y_e|v}{\sqrt2}
\]

contains the electron Yukawa magnitude. Incidence and cyclic topology do not determine it.

## 5. Consequence for the finite-arrow interpretation

The free kernel strengthens three claims:

1. the finite diagonal faces can genuinely represent chiral spectral populations;
2. the symmetric completed arrow can genuinely represent a Dirac mass relation;
3. the resulting kernel lies in the positive \(H_2(\mathbb R)\) cone.

It simultaneously closes two attempted predictions:

1. the arrow sign is not observable in one isolated Dirac channel;
2. normalized matrix units do not determine the pole residue or Yukawa magnitude.

The physically meaningful data begin with:

- \(|m|\);
- relative signs/phases between several coupled mass cycles;
- flavor invariants;
- momentum-dependent spectral weights;
- transport holonomy across changing chiral bases.

## 6. Relation to the coherent-face branch

At rest, \(k=0\),

\[
P_+(0,m)
=\frac12
\begin{pmatrix}
1&\operatorname{sgn}m\\
\operatorname{sgn}m&1
\end{pmatrix}
=\frac12(I+\operatorname{sgn}m\,\sigma_x).
\]

The positive-energy state is a coherent primitive projector with equal chiral populations. Momentum adds the population-difference coordinate \(\sigma_z\).

This clarifies the earlier real-form fork:

- the full free \((k,m)\) family naturally uses the entrywise-real carrier \(\{I,\sigma_x,\sigma_z\}\);
- the rest-frame ray lies in the equal-population coherent subspace;
- continuous charged phase covariance still requires the full complex relationship plane or a neutral response interpretation.

## 7. Claim ledger

### Established

- the fixed-helicity free Dirac projector lies in \(H_2(\mathbb R)_+\);
- its diagonal coordinates are chiral populations;
- its symmetric off-diagonal coordinate is \(m/(2\omega)\);
- conjugation by \(\sigma_z\) fixes both faces and sends \(m\to-m\);
- the two real arrow orientations are unitarily equivalent for one channel;
- the Euclidean reflected kernel remains positive under this equivalence;
- projector normalization fixes the ray shape but not a physical residue \(Z\);
- the scale-free carrier direction records \(k/\omega,m/\omega\) but does not predict \(m\).

### Candidate bridge

- relative arrow orientations among several Furey/Yukawa cycles encode physical flavor or CP data;
- stress or boundary transport fixes the pole normalization;
- the finite arrow is the universal mod-two shadow of the Dirac mass relation.

### Not established

- the interacting electron spectral kernel in the full Standard Model;
- a Ward identity fixing \(Z\) for the dressed composite faces;
- a source-derived electron Yukawa magnitude;
- global real-basis transport across all momenta and helicities;
- the relation between arrow orientation and multi-generation CP invariants.

## 8. Stop-everything and falsification gates

### Stop-everything positive

A multi-channel or multi-generation calculation produces a basis-invariant relative arrow holonomy, fixed by the Furey cycles and surviving Ward normalization, whose value controls a measured mixing or CP observable.

### Falsifiers

- the one-generation mass sign is presented as physical despite the explicit \(\sigma_z\) equivalence;
- trace-one projector normalization is used as a prediction for an interacting pole residue;
- a free fixed-helicity kernel is promoted to the full Standard-Model response without gauge, contact and renormalization terms;
- the finite arrow is identified with \(|m|\) without a scale-setting equation.

## 9. Pinned branch and continuation

The one-channel sign and normalization questions are closed as prediction routes. The surviving physical branch is relative orientation among several coupled cycles or a normalized interacting spectral kernel.

## Certificate and companions

- [Free Dirac sign-equivalence certificate](scripts/verify_free_dirac_face_fixed_mass_sign_equivalence.mjs)
- [Free Dirac OS carrier](121_free_dirac_chiral_os_h2_carrier.md)
- [Electron channel selection boundary](577_the_unique_electron_cycle_selects_the_neutral_response_channel_but_not_its_sign_phase_or_normalization.md)
- [Dressed spectral positivity](119_dressed_chiral_spectral_positivity.md)
- [Binary Peirce/Yukawa response embeddings](576_the_binary_peirce_carrier_embeds_in_neutral_yukawa_gram_responses_but_channel_orientation_remains_unselected.md)
