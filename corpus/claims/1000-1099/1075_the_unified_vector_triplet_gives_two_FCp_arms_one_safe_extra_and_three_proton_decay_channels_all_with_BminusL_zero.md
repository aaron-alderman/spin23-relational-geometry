# The Unified Vector Triplet Gives Two \(F_Cp\) Arms, One Safe Extra and Three Proton-Decay Channels, All with \(B-L=0\)

**Date:** 18 October 2026  
**Branches:** \(Spin(10)\) vector mediator, Pati–Salam colored triplet, \(F_Cp\) completion, proton decay, finite-one-form boundary  
**Claim status:** exact charge, representation and mediator-incidence census; contractions, flavor tensors, masses and decay rates remain open  
**Certificate:** [enumerate_the_spin10_vector_triplet_exchange_and_proton_decay_channels.mjs](../../../verification/enumerate/enumerate_the_spin10_vector_triplet_exchange_and_proton_decay_channels.mjs)

## Executive result

The \(16_F16_F10_H\) invariant fixes the desired two-arm \(F_Cp\) sign, but its colored triplet exchange cannot be restricted to those two arms by \(B-L\), matter parity or the unified tensor itself.

Under

\[
\mathbf{10}_H\to T\oplus\bar T\oplus H_u\oplus H_d,
\]

the complete colored currents are

\[
J_T=\{QQ,\ u^ce^c,\ d^c\nu^c\},
\]

\[
J_{\bar T}=\{QL,\ u^cd^c\}.
\]

Tree exchange through the \(T\)-\(\bar T\) mass pairing produces the complete Cartesian product

\[
J_T\times J_{\bar T},
\]

containing exactly six four-fermion channels:

\[
\boxed{
6=2\text{ desired }F_Cp
+1\text{ additional }(B,L)\text{-conserving}
+3\text{ proton-decay channels}.}
\]

The three dangerous channels have

\[
\Delta B=\Delta L=\pm1,
\qquad
\Delta(B-L)=0.
\]

All six channels conserve \(B-L\). Consequently neither continuous \(B-L\) nor its matter-parity remnant can distinguish the desired two arms from the proton-decay partners.

The proton-safe isolated \(S_1\) branch and the unified Clebsch-protected branch are therefore genuinely different theories, not two descriptions of the same interaction set.

## 1. The five colored currents

The Standard-Model decomposition of one \(Spin(10)\) vector contains a color triplet and antitriplet,

\[
T=(\mathbf3,\mathbf1)_{-1/3},
\qquad
\bar T=(\bar{\mathbf3},\mathbf1)_{+1/3}.
\]

The unique symmetric \(16_F16_F10_H\) tensor permits three bilinears at the \(T\) orientation:

\[
QQ,
\qquad
u^ce^c,
\qquad
d^c\nu^c,
\]

and two at the conjugate orientation:

\[
QL,
\qquad
u^cd^c.
\]

The minimal doubled-Furey first-order rule retained the three leptoquark slots

\[
QL,
\qquad u^ce^c,
\qquad d^c\nu^c,
\]

but excluded the two diquark slots \(QQ\) and \(u^cd^c\). Full \(Spin(10)\) covariance restores them. This is the exact point at which the Furey incidence restriction and the irreducible unified tensor diverge.

## 2. Complete exchange table

Pair every \(T\)-current with every \(\bar T\)-current:

| Effective channel | \(B\) | \(L\) | \(B-L\) | Classification |
|---|---:|---:|---:|---|
| \((QQ)(QL)\) | \(+1\) | \(+1\) | \(0\) | proton decay |
| \((QQ)(u^cd^c)\) | \(0\) | \(0\) | \(0\) | additional four-quark channel |
| \((u^ce^c)(QL)\) | \(0\) | \(0\) | \(0\) | desired \(F_Cp\) arm |
| \((u^ce^c)(u^cd^c)\) | \(-1\) | \(-1\) | \(0\) | proton decay |
| \((d^c\nu^c)(QL)\) | \(0\) | \(0\) | \(0\) | desired \(F_Cp\) arm |
| \((d^c\nu^c)(u^cd^c)\) | \(-1\) | \(-1\) | \(0\) | proton decay |

The two desired entries are exactly

\[
\mathcal Q_{ue}=(QL)(u^ce^c),
\qquad
\mathcal Q_{\nu d}=(QL)(d^c\nu^c).
\]

The first dangerous entry has the familiar \(QQQL\) charge structure. The other two are its all-left-Weyl conjugate-sector relatives, including a sterile-neutrino channel.

## 3. Why \(B-L\) cannot protect the branch

Every current coupled to \(T\) has the same compensating \(B-L\) charge, and every current coupled to \(\bar T\) has the opposite one. Their products are therefore all neutral:

\[
\Delta(B-L)=0.
\]

The dangerous operators violate \(B+L\), not \(B-L\). Hence:

- unbroken continuous \(B-L\) permits all six;
- matter parity, being a subgroup of \(B-L\), also permits all six;
- the anomaly-code logical grading does not by itself remove the diquark vertices;
- a proton-safety mechanism must preserve baryon and lepton number separately, project out the diquark incidence, or make the triplet sufficiently heavy.

This is a useful negative result because continuous \(B-L\) successfully removed the three optional colored links in the earlier low-energy finite-Dirac classification. Once the full unified tensor is restored, the same charge no longer separates safe from dangerous exchange products.

## 4. Coefficient correlation

In a single unified \(\mathbf{10}_H\), the five currents are components of one invariant tensor. Their flavor coefficients are not five unrelated free parameters: the \(\mathbf{10}_H\) Yukawa tensor is symmetric in generation space.

At charge-support level, therefore, turning on the unified coupling needed for the desired arms also turns on the diquark currents unless an additional projection or splitting acts on the component tensor.

The exact numerical relation among the six effective operators depends on:

- the normalized \(Spin(10)\) Clebsches;
- color and weak contractions;
- the symmetric generation Yukawa matrix;
- the triplet mass and mixing matrix;
- symmetry-breaking thresholds.

Document 1073 fixes the relative right-isospin sign. The present certificate classifies the complete operator support and global charges, not the decay rates.

## 5. The finite-one-form branch is now pinned precisely

The doubled Furey endpoint construction contains three colored **coupling slots**. It does not yet specify a scalar kinetic Hilbert space, the quotient of represented universal one-forms, or the inner-product/mass operator on an \(S_1\) isotypic component.

Therefore its current data do not determine whether the colored fluctuation module contains:

- one shared complex \(S_1\);
- several independent fields with the same gauge representation;
- no propagating colored scalar after color-linearity is imposed;
- or a boundary response rather than a bulk particle.

Incidence alone admits all of these completions. The two-copy \(D\)-twisted repair of document 1074 cannot be credited to the Furey geometry until the full represented one-form space is constructed and its \(S_1\) isotypic multiplicity is at least two.

This dependency is now pinned rather than guessed:

\[
\boxed{
\text{compute }\Omega_D^1(\mathcal A_F)
\text{ and its gauge-isotypic kinetic form}.}
\]

## 6. Viable branches after the census

### A. Isolated proton-safe \(S_1\)

Retain only the three Furey-compatible leptoquark currents and impose exact separate \(B\) and \(L\). This removes the diquark currents but abandons full \(Spin(10)\) protection of the Clebsch relation unless another low-energy symmetry reproduces it.

### B. Heavy unified triplet

Keep the complete tensor but place \(T,\bar T\) at a sufficiently high scale. The desired \(F_Cp\) response is then suppressed by the same scale as proton decay, so any phenomenologically relevant pulse needs a carefully quantified hierarchy.

### C. Missing-partner or component projection

Construct a GUT-breaking sector that removes or decouples the diquark-coupled triplet combination while retaining an effective leptoquark combination with the same oriented residue. This requires more than ordinary doublet–triplet splitting because both safe and dangerous currents use the same colored component.

### D. Boundary/nonpropagating response

Realize the two arms as a boundary Schur response rather than exchange of a bulk scalar multiplet. Positivity, anomaly inflow and locality then replace ordinary mediator constraints.

### E. Accept the complete closed network

Treat the extra channels as part of the ultraviolet relational closure, with low-energy suppression rather than exact deletion. This aligns with the recurring result that attempts to isolate the open star regenerate a loop.

## 7. Stop-everything and falsification criteria

**Charge falsifier:** claim that \(B-L\) forbids \(QQQL\) or its conjugate-sector partners. All have \(B-L=0\).

**Unified-safety falsifier:** retain the full \(16_F16_F10_H\) tensor while deleting \(QQ\) and \(u^cd^c\) without an explicit \(Spin(10)\)-breaking projector.

**One-form trigger:** compute the represented finite one-form space and find a protected two-dimensional \(S_1\) isotypic kinetic module carrying the split involution of document 1074.

**Proton-safe residue trigger:** construct a symmetry-breaking projector whose effective Schur complement keeps the two desired arms and their relative Clebsch sign while annihilating all three \(\Delta B=\Delta L\) products.

**Strong negative result:** prove that any projector preserving the two desired vector-current components necessarily preserves at least one diquark current by irreducibility or radiative closure. Then the unified bulk-mediator route is phenomenologically closed.

**Rate gate:** before claiming exclusion or viability, supply mediator masses, flavor tensors, running and hadronic matrix elements. The present census alone gives no lifetime.

## 8. Verdict

| Question | Answer |
|---|---|
| How many triplet-exchange channels accompany the unified tensor? | 6 |
| Desired \(F_Cp\) arms | 2 |
| Additional \(B,L\)-conserving channel | 1 |
| \(\Delta B=\Delta L\) proton-decay channels | 3 |
| Can \(B-L\) distinguish them? | no; all six have \(B-L=0\) |
| Does current Furey incidence derive the required two-copy module? | no; the one-form/kinetic module is absent |

The unified tensor solves the orientation problem by completing the relationship network. Proton safety asks whether that completion can be punctured a second time without erasing the desired residue.

## Position in the corpus

- [unified Clebsch-sign theorem](1073_the_spin10_16_16_10_Clebsch_tensor_supplies_the_FCp_relative_minus_but_also_restores_the_third_edge_and_diquark_channels.md)
- [identical-copy no-go and twisted repair](1074_positive_Spin10_Clebsch_preserving_copies_can_never_remove_the_third_edge_but_a_twisted_two_copy_involution_can.md)
- [exact proton-safe source projector and its symmetry cost](1076_the_proton_safe_current_projector_exists_only_after_breaking_the_pati_salam_colour_lepton_roots.md)
- [formal one-form multiplicity underdetermination theorem](1077_coarse_Furey_arrow_incidence_cannot_determine_the_represented_one_form_or_S1_copy_number.md)
- [gauge dressing of doubled Furey links](../../programmes/foundations/programme_foundations_parallel_03_gauge_dressing_turns_the_three_extra_furey_links_into_s1_s3_leptoquark_channels.md)
- [earlier full \(Spin(10)\) vector/Furey-link crossing certificate](../../../verification/cross/cross_spin10_ten_cubic_with_doubled_furey_links.mjs)
