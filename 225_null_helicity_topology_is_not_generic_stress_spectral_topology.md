# Null-Helicity Topology Is Not Generic Stress-Spectral Topology

**Date:** 17 October 2026  
**Branches:** B01, B02, B04, B07, B09 and B11  
**Claim status:** exact kinematic scope audit; null-boundary/gravitational realization remains open

## 1. Necessary correction of scope

The Chern-four helicity faces and Chern-eight relationship are mathematically correct for massless helicity-two line bundles over null momentum directions. They do **not** automatically describe the ordinary positive stress spectral density

\[
\rho_{\mu\nu,\rho\sigma}(q)
\]

at timelike invariant mass \(q^2=s>0\).

These are different representation problems.

## 2. Timelike stress spectral states

For \(q^2=s>0\), choose the rest frame

\[
q^\mu=(\sqrt s,0,0,0).
\]

The little group is \(SO(3)\). The transverse traceless stress channel is the five-dimensional spin-two representation of \(SO(3)\), while the trace channel is a scalar.

The positive-energy mass shell at fixed \(s\) is hyperbolic three-space

\[
\mathcal H_s^+
\cong SO_0(1,3)/SO(3),
\]

which is contractible. Its spin bundles and the Ward-support bundles can be globally trivialized.

Therefore the generic Källén--Lehmann stress continuum has no forced Chern-four helicity line over its timelike mass shell.

## 3. What “spin two” means in the stress correlator

The vacuum stress two-point function decomposes into spin-two and spin-zero projectors. Here “spin two” labels an \(SO(3)\) partial-wave representation at timelike total momentum. It does not assert the existence of an isolated massless helicity-
\(\pm2\) particle.

For a free or interacting matter QFT, the stress tensor generally creates multiparticle states. Their total angular momentum can be two even though no constituent or asymptotic one-particle state is a graviton.

Consequently, the tensor projector \(P_2\) used in the positive stress spectral branch cannot by itself be replaced by the pair of graviton helicity lines \(L_{+2}\oplus L_{-2}\).

## 4. Where the Chern topology does apply

The null-helicity bundle becomes relevant when the programme supplies an actual null/radiative carrier, for example:

1. an isolated massless spin-two pole;
2. dynamical gravitational radiation;
3. null-infinity news or boundary stress data;
4. on-shell helicity amplitudes with null external momentum;
5. a discrete null walk whose continuum modes carry helicity;
6. a deliberately selected null limit with a well-defined screen quotient.

On those bases, directions form \(S^2\), the screen bundle is \(TS^2\), and the Chern-four/eight results apply.

## 5. The \(s\to0\) limit is not automatic

A continuum threshold approaching \(s=0\) is not the same as an isolated massless pole. Branch cuts, collinear singularities, gauge constraints and distributional limits can prevent a smooth passage from the timelike \(SO(3)\) bundle to separate null helicity lines.

Any use of the topology must specify:

- whether the spectral support contains a pole, cut or boundary distribution;
- the base space on which polarizations are defined;
- how the timelike spin-two representation degenerates into null helicities;
- which modes remain physical after Ward/gauge quotienting.

## 6. Revised branch graph

The stress programme now splits:

\[
\begin{array}{ll}
\textbf{Timelike spectral branch:}
&H_2(\mathbb R)\text{ response, Herglotz/KMS sewing, no forced Chern twist};\\[2mm]
\textbf{Null helicity branch:}
&H_2(\mathbb C)\text{ twisted parent, Chern-eight relationship, selector defects}.
\end{array}
\]

They may meet through a massless pole, null boundary map or gravitational completion, but that interface must be derived.

## 7. Consequence for the fourth-power identity

The exact bundle identity

\[
\mathcal R_2\simeq\mathcal R_{1/2}^{\otimes4}
\]

remains valid on the null celestial base. It does not establish a fourth-power map for a generic timelike stress spectral continuum. The proposed Furey/Lorentz intertwiner must first land in an actual null helicity-two carrier.

## 8. Stop-everything and falsification gates

**Null-interface success:** derive an isolated pole or boundary map carrying the timelike stress response into the null helicity bundle with controlled residues.

**Gravity success:** the complete action contains a massless spin-two mode whose polarization bundle is the Chern-four pair and whose source is the constructed stress carrier.

**Falsifier:** a timelike spin-two projector is treated as two graviton helicity line bundles without a null limit or massless pole.

**Threshold gate:** analyze the \(s\to0\) spectral measure before assigning celestial characteristic classes.

**Branch independence:** failure of the null interface does not invalidate the timelike Herglotz/Jordan response results; it only disconnects the topology branch.

## 9. Certificate

The [stress spectral/helicity scope certificate](scripts/verify_stress_spectral_helicity_scope.mjs) checks timelike and null momentum classifications, the dimensions of the massive spin-two and null helicity sectors and the contractibility/topology flags used by the branch split.

## Companion documents

- [Conserved-stress spectral quotient](206_conserved_stress_spectral_quotient_to_h2_response.md)
- [Null spin-two Chern-four bundle](216_massive_ward_bundle_trivial_null_spin2_bundle_chern_four.md)
- [Stress relationship fourth power](224_stress_relationship_is_fourth_tensor_power_of_fermion_relationship.md)
- [Free conformal stress ray](209_free_conformal_field_stress_spectrum_is_one_jordan_ray.md)
