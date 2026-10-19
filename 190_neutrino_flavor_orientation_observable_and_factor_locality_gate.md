# Neutrino Flavor Orientation Observable and the Factor-Locality Gate

**Date:** 17 October 2026  
**Branches:** B03, B05, B06 and B11  
**Claim status:** exact free-propagation and mixing result; external-carrier identification is obstructed without an additional intertwiner

## 1. Candidate Standard-Model two-port

Take two charged-current flavor tags, \(a\) and \(b\), as the two readout channels of a neutrino propagator. With three mass eigenstates,

\[
\nu_\alpha=\sum_i U_{\alpha i}\nu_i,
\]

the residue at the \(i\)-th mass pole is the positive rank-one flavor matrix

\[
R_i=u_i u_i^\dagger,
\qquad
(R_i)_{\alpha\beta}=U_{\alpha i}\overline{U_{\beta i}}.
\]

Its \((a,b)\) principal minor is

\[
R_i^{(ab)}=
\begin{pmatrix}
|U_{ai}|^2&U_{ai}\overline{U_{bi}}\\
\overline{U_{ai}}U_{bi}&|U_{bi}|^2
\end{pmatrix}
\succeq0,
\qquad
\det R_i^{(ab)}=0.
\]

This supplies the simplest source-native Standard-Model realization of the positive two-port spectral data used in the preceding response branch.

## 2. Pole coherence

For nonzero \(U_{ai}\) and \(U_{bi}\), the normalized cross-pole coherence is

\[
c_i^{(ab)}
=
\frac{U_{ai}\overline{U_{bi}}}
{|U_{ai}|\,|U_{bi}|},
\qquad
|c_i^{(ab)}|=1.
\]

The two-pole oriented area is therefore

\[
\mathcal A_{ij}^{(ab)}
=
\operatorname{Im}
\left[c_i^{(ab)}\overline{c_j^{(ab)}}\right]
=
\frac{
\operatorname{Im}
\left(
U_{ai}U_{bj}\overline{U_{aj}}\overline{U_{bi}}
\right)}
{|U_{ai}U_{bi}U_{aj}U_{bj}|}.
\]

The numerator is the usual rephasing-invariant Jarlskog quartet. Thus the new normalized response observable does not invent a new leptonic invariant in this realization: it is the signed, unit-normalized area of an existing one.

For \((a,b;i,j)=(e,\mu;1,2)\),

\[
\mathcal A_{12}^{(e\mu)}
=
\frac{J_{\rm PMNS}}
{|U_{e1}U_{\mu1}U_{e2}U_{\mu2}|}.
\]

## 3. Exact invariances

Under charged-lepton flavor rephasing,

\[
U_{\alpha i}\mapsto e^{i\phi_\alpha}U_{\alpha i},
\]

all \(c_i^{(ab)}\) acquire the same phase \(e^{i(\phi_a-\phi_b)}\), which cancels from \(\mathcal A_{ij}^{(ab)}\).

Under neutrino-column rephasing,

\[
U_{\alpha i}\mapsto e^{i\psi_i}U_{\alpha i},
\]

each residue \(R_i\), and therefore every \(c_i\), is unchanged. Majorana column phases consequently cancel from this lepton-number-conserving observable.

Complex conjugation reverses its sign. If the mixing matrix can be made real, every area vanishes.

## 4. What a nonzero result actually proves

A nonzero \(\mathcal A_{ij}^{(ab)}\) proves that no single rephasing of the two selected **flavor channels** makes the residues at both mass poles real. It is a clean complex-orientation witness in flavor space.

It does **not** prove that the external relational carrier has left \(H_2(\mathbb R)\).

The programme already permits a factor-local structure

\[
\mathcal R(s)
=
\sum_i F_i^{\rm face}(s)\otimes R_i^{\rm flavor},
\qquad
F_i^{\rm face}(s)\in H_2(\mathbb R).
\]

The flavor minors can have nonzero oriented area while every external face matrix remains real. Tracing over flavor gives

\[
\operatorname{Tr}_{\rm flavor}\mathcal R(s)
=
\sum_i F_i^{\rm face}(s),
\]

because \(\operatorname{Tr}R_i=1\). No flavor phase survives in that marginal.

## 5. The factor-locality obstruction

The candidate calculation exposes an exact index-choice gate:

- if the two ports are flavor tags, \(\mathcal A\) is a normalized Jarlskog invariant;
- if the two ports are the external relational faces, ordinary free PMNS mixing leaves their response real;
- identifying these two meanings requires a source-derived intertwiner that mixes face and flavor indices;
- an arbitrary portal can always create such mixing, but then its coefficient and phase are new inputs.

Thus known flavor CP is not by itself the sought external orientation source. This protects the factor-local \(Spin(2,3)\) proposal from a false falsification, while making the missing bridge precise.

## 6. Possible bridge structures

A legitimate bridge would need at least one of the following:

1. a Furey linking operator whose two external corners act nontrivially on flavor residues;
2. a Jordan-triple response map that is not separable across face and flavor factors;
3. an anomalous lepton-number-violating correlator carrying Majorana rather than ordinary projector phases;
4. a stress-response vertex whose spectral discontinuity contains a fixed Jarlskog quartet;
5. an exceptional invariant that fixes the face--flavor contraction and forbids independent counterterms.

Merely tensoring a real face response with the PMNS flavor projectors does not meet this burden.

## 7. Consequence for the response programme

The simplest Standard-Model two-port calculation is therefore both a success and a pin:

- **success:** it realizes the dimensionless area exactly and identifies it with established weak-basis CP geometry;
- **pin:** it lives in the wrong factor for the external-carrier claim.

The next response calculation should not ask whether flavor CP exists. It should ask whether a specified source-native operator produces a nonseparable face--flavor spectral residue.

## 8. Stop-everything and falsification gates

**Source-native mixing:** a Standard-Model stress, boundary or Furey operator generates a nonseparable residue whose external-face marginal has nonzero oriented area with no discretionary portal. This would directly activate the complex parent.

**Exact factorization:** symmetry forces every admissible face--flavor spectral measure into a sum whose external coefficients share one real slice. Then flavor CP cannot select external orientation.

**Majorana escape:** an anomalous correlator produces a basis-invariant external area depending on Majorana phases and the already required neutrino completion.

**Portal arbitrariness:** every nonseparable construction admits independent Wilson coefficients. Then the bridge is ordinary EFT and does not explain the \(Spin(2,3)\) selector.

## 9. Certificate

The [neutrino flavor-orientation certificate](scripts/verify_neutrino_flavor_orientation_observable.mjs) constructs a unitary three-angle PMNS matrix, verifies positive rank-one residues, equates the normalized area with its Jarlskog quartet, checks row- and column-rephasing invariance, reverses the sign under conjugation and confirms vanishing in the real-mixing limit.

## Companion documents

- [Three-flavor real-face/complex-PMNS carrier](174_three_flavor_real_face_complex_pmns_spectral_carrier.md)
- [Dimensionless two-frequency orientation observable](189_dimensionless_two_frequency_orientation_observable.md)
- [Common orientation field and independent CP portals](183_common_orientation_field_independent_cp_portal_obstruction.md)
- [Majorana Nambu orientation obstruction](175_majorana_nambu_sigma_y_is_not_a_basis_invariant_orientation.md)
