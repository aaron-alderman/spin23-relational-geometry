# Lithium niobate: a crystal that makes relations physical

**Date:** 26 October 2026

**Status:** reader-facing article; established lithium-niobate physics mapped to the corpus grammar, with speculative extensions explicitly excluded

**Parents:** [Xi genus-two and spectral record mechanisms](admissibility_147_xi_genus_two_weil_spectral_compression_and_hyperbolic_trace_gate.md), [three-resonator parity-switch detector](admissibility_142_a_three_resonator_parity_switch_turns_the_dual_face_into_a_detector.md), [integrated-photonic selector target](../frontier-physics-targets/open_topics_v1.md)

**Sources:** [Zhu *et al.*, integrated photonics on thin-film lithium niobate](https://arxiv.org/abs/2102.11956); [Veithen and Ghosez, dielectric and dynamical properties](https://doi.org/10.1103/PhysRevB.65.214302); [Holtz *et al.*, shift-current-induced strain waves](https://doi.org/10.1103/PhysRevB.94.104302); [Lyu *et al.*, synthetic frequency dimensions](https://doi.org/10.1038/s42005-024-01676-9); [Nehra *et al.*, integrated quantum phase sensor](https://doi.org/10.1038/s41467-023-38246-6); [Xu *et al.*, photorefractive and pyroelectric memory](https://doi.org/10.1038/s44310-024-00052-3)

## The useful claim

Lithium niobate does not reveal a new fundamental force. It does something
more immediately valuable: it makes several normally separated relations
controllable in one physical object. The same non-centrosymmetric
ferroelectric crystal can couple optical fields to optical fields, microwave
fields to optical phase, optical excitation to lattice motion and temperature
history to a persistent device response.

That makes lithium niobate an unusually complete workbench for the corpus's
ordinary-language grammar:

> **The carrier is the thing that can vary. The selector is the intervention
> that chooses which relation is effective. The detector is the surviving
> record that distinguishes the alternatives.**

The important point is not that the crystal has three ingredients. It is that
the experimenter can change a domain orientation, pump phase, modulation
frequency, boundary or poling period while keeping much of the carrier fixed,
and then ask which phase-sensitive output changes. The material turns a
relation into an engineering variable.

## One material, several real channels

At room temperature lithium niobate is a polar ferroelectric. Its broken
inversion symmetry permits a second-order optical susceptibility, a linear
electro-optic response and piezoelectric coupling. These are not three names
for one effect. They are different tensor contractions supported by the same
ordered crystal.

Its optical polarization may be expanded as

\[
P_i=\varepsilon_0\left(
\chi^{(1)}_{ij}E_j+
\chi^{(2)}_{ijk}E_jE_k+
\chi^{(3)}_{ijkl}E_jE_kE_l+\cdots
\right).
\]

The carrier is therefore not merely “light in a crystal.” Depending on the
experiment it includes optical modes, microwave modes, phonons, the
ferroelectric order parameter and their allowed tensor couplings. A claim
about one channel does not automatically transfer to the others.

First-principles work traces the ferroelectric instability to a zone-centre
polar mode and the balance between long-range dipolar and short-range forces.
This gives the domain orientation a material origin: it is a stable lattice
configuration, not an abstract sign inserted into an equation.

## The product really does create a sum and a difference

Suppose two real optical fields enter the quadratic polarization:

\[
E_1(t)=A_1\cos(\omega_1t+\phi_1),\qquad
E_2(t)=A_2\cos(\omega_2t+\phi_2).
\]

Their product is

\[
E_1E_2=\frac{A_1A_2}{2}
\left[
\cos((\omega_1-\omega_2)t+\phi_1-\phi_2)
+\cos((\omega_1+\omega_2)t+\phi_1+\phi_2)
\right].
\]

The quadratic material polarization can therefore source fields at the sum
and difference frequencies. Setting the two inputs equal gives a static term
and the second harmonic. With a strong pump, the reverse process supports
parametric amplification, squeezing and correlated photon-pair production.

This resolves an important ambiguity in the wider corpus:

- in thermodynamics, \(\log Z\) changes a product of partition functions into
  an additive free-energy quantity;
- in the Xi construction, \(\partial\log\) changes a conjugate analytic
  product into an additive response;
- in lithium niobate, a *bilinear field product* creates sum- and
  difference-frequency components.

These operations rhyme, but they are not the same map.

## Phase matching is an admissibility condition

Energy conservation is not sufficient for efficient conversion. The
generated contributions must also accumulate coherently along the device. For
sum-frequency generation the mismatch is conventionally written

\[
\Delta k=k_3-k_2-k_1,
\qquad \omega_3=\omega_2+\omega_1.
\]

If \(\Delta k\neq0\), contributions generated at different positions rotate
out of phase and cancel. Periodically poled lithium niobate deliberately
reverses the ferroelectric domains, and hence the sign of the effective
quadratic coefficient. A reciprocal vector supplied by the poling pattern
changes the condition to

\[
\Delta k-\frac{2\pi m}{\Lambda}\simeq0,
\]

for an appropriate integer \(m\) and domain period \(\Lambda\).

This is a particularly literal form of admissibility. The frequencies may be
energetically allowed and the local coupling may be nonzero, yet the global
geometry can forbid a large outgoing record through destructive accumulation.
The domain pattern does not add energy. It selects which locally generated
amplitudes are allowed to close coherently over the device.

| Corpus role | Lithium-niobate realization | What must remain distinct |
|---|---|---|
| carrier | guided optical, microwave or acoustic modes and the polar lattice | a mode is not its measured intensity |
| selector | crystal cut, polarization, pump phase, electrode drive, domain sign and poling period | an imposed selector is not spontaneous selection |
| dynamics | electro-optic modulation, three-wave mixing, phonon coupling and propagation | shared material does not make the mechanisms identical |
| detector | output spectrum, heterodyne quadrature, conversion efficiency, coincidence or squeezing record | a phase-blind power measurement erases part of the relation |
| memory | domains, trapped charge, photorefraction and pyroelectric history | drift is not automatically fundamental memory |

## The “dual face” is physically visible

Reversing a ferroelectric domain reverses the sign of selected odd-rank
response coefficients. The two domains are therefore not merely two labels
for the same laboratory configuration. They present opposite coupling faces
to the same field geometry.

But a sign flip is not yet a detector. If the measurement retains only output
power, some phase reversals can remain invisible or become confused with loss.
A reference phase, interferometric quadrature, closed conversion loop or
correlation measurement is needed to retain orientation. This is the same
discipline imposed by the corpus's three-resonator result: two local couplings
can often be rephased, while a closed loop can carry a gauge-resistant phase.

In a three-mode description the interaction has the schematic form

\[
H_{\mathrm{int}}=\hbar g\,
a_3^\dagger a_2a_1+
\hbar g^*a_3a_2^\dagger a_1^\dagger.
\]

The complex coupling \(g\) contains tensor overlap, domain sign and phase
matching. Local phase conventions can move phase among the three modal
amplitudes and \(g\); an experimentally closed sequence or external reference
is what makes a residual phase observable. The triangle is useful because it
forces the claimed relation to survive re-labelling.

## The Pockels channel is a controlled selector

In the linear electro-optic effect, an applied low-frequency electric field
changes the optical impermeability tensor:

\[
\Delta(n^{-2})_{ij}=r_{ijk}E_k^{\mathrm{drive}}.
\]

A static drive changes optical phase or resonance frequency. A time-dependent
drive creates sidebands and couples frequency modes. Integrated lithium-
niobate resonators have used this to build synthetic frequency lattices in
which resonator modes behave like lattice sites and the microwave modulation
sets the link amplitudes and phases.

This is close to the proposed relation-emulator hardware, but with a strict
boundary. A programmable frequency lattice demonstrates that the grammar can
be engineered. It does not show that the programmed graph is nature's
microscopic substrate or that its symmetry is fundamental.

## The lattice is not passive background

Lithium niobate also supports polar phonons, acoustic waves, piezoelectric
conversion and phonon-polaritons. Experiments have directly mapped strain
waves generated when a photoinduced shift current changes polarization and
the piezoelectric coupling drives the lattice. Here an optical intervention
becomes a mechanical record.

Temperature enters in a similarly concrete but non-gravitational way. It can
change refractive indices, phase mismatch, resonance positions, domain
kinetics and charge transport. Pyroelectric fields and photorefractive charge
redistribution can leave slow, history-dependent shifts in thin-film devices.
The device therefore has a genuine configuration state beyond the
instantaneous optical amplitudes.

That state is a useful model of memory, hysteresis and metastability. It is not
evidence that thermodynamics is a second time direction, that configuration
space generates gravity or that lithium niobate supplies an aether. Each of
those stronger claims would require an additional invariant prediction and a
measurement that excludes conventional material response.

## A practical experiment for the corpus

The best next use is a same-device relation-closure experiment rather than an
attempt to reproduce every known nonlinear-optical effect.

1. Fabricate or select a thin-film lithium-niobate ring with three resolved
   optical or synthetic-frequency modes.
2. Independently calibrate every pairwise electro-optic or quadratic coupling,
   including loss, detuning, dispersion and detector response.
3. Program two configurations with the same coupling magnitudes and opposite
   closed-loop phase
   \(\Phi=\phi_{12}+\phi_{23}+\phi_{31}\).
4. Retain a coherent reference and measure directional transfer, output
   quadratures and the full pole spectrum, not intensity alone.
5. Reverse domain orientation, pump phase and modulation order separately so
   that material parity, drive convention and detector labelling cannot mimic
   one another.
6. Predict a held-out closure record from the pairwise calibrations with one
   shared nuisance model.

The conventional payoff would already be substantial: a phase-stable
frequency converter, synthetic-frequency circuit or quantum transducer whose
orientation record is robust against gauge choice and drift. A new-physics
claim would require a reproducible residual that survives the complete
electro-optic, nonlinear, thermal, photorefractive, acoustic and detector
model, then repeats on an independent carrier.

## Regulus-frame extension

The completed regulus programme supplies a larger but still finite target for
frequency-bin hardware. Forty explicitly listed two-qutrit commuting classes
form 36 complete ten-basis MUB frames. Their frame-overlap algebra has only
two relations: pairs share either four bases or one. A frequency processor
with nine coherent modes can therefore be tested with a separate calibration
checklist:

| Calibration gate | Required record |
|---|---|
| commuting classes | compile and calibrate the 40 Weyl measurements |
| control costs | assign measured costs to the six logical Clifford generators and pre-register the cheapest predicted frame or tied set |
| MUB geometry | verify the ten-basis relations frame by frame |
| leakage | apply frame-preserving Clifford control noise and quantify probability outside the 36 frames |
| invariant channel | fit the conditional kernel to \(\operatorname{span}\{I,A_4,A_1\}\) |
| held-out prediction | predict one-overlap and four-overlap transitions |

The distinction between leakage and relation residual is essential. Generic
loss, dispersion or non-Clifford mode mixing need not map one full frame to
another; those effects must not be disguised as a failed exceptional
transition law. See [the operator/noise completion](../regulus-closure-bridge/06_two_qutrit_operator_noise_and_selector_completion.md)
and [the experimental resolution](../regulus-closure-bridge/07_integral_real_and_experimental_resolution.md).

## What the material changes

Lithium niobate does not change the equations of known physics. It changes
which combinations of known physics can be prepared, reversed and read out in
one place.

That matters for this corpus. “Carrier,” “selector” and “detector” no longer
need to remain metaphors attached to remote mathematical objects. In lithium
niobate they can be assigned to independently calibrated pieces of an actual
device. The crystal supplies a bridge from relation language to laboratory
grammar:

\[
\boxed{
\text{ordered material}
+\text{sourced selector}
+\text{coherent closure}
\longrightarrow
\text{phase-bearing record}.
}
\]

The scientific value lies precisely in the restraint. If ordinary nonlinear
and condensed-matter physics closes the record, the result is useful
technology and a validated experimental language. If it does not, the same
device provides the reversals, nuisance channels and independent records
needed to say exactly what failed.

