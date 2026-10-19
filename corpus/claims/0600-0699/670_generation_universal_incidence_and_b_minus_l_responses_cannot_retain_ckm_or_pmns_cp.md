# Generation-Universal Incidence and \(B-L\) Responses Cannot Retain CKM or PMNS CP

**Date:** 17 October 2026  
**Branches:** B03, B04, B05, B07, B08 and the three-generation flavor branch  
**Claim status:** exact flavor-basis no-go for neutral universal sources; charged-current extension remains open  
**Certificate:** [verify_flavor_universal_neutral_sources_erase_ckm_phase.mjs](../../../verification/verify/verify_flavor_universal_neutral_sources_erase_ckm_phase.mjs)

## Executive result

Simply copying the document-667 relation map across three generations cannot retain CKM or PMNS phases. Incidence and \(B-L\) charges are generation universal, so every neutral source matrix in flavor space is proportional to the identity:

\[
Q_{\rm neutral}=q\,I_3.
\]

For any unitary flavor rotation \(U\),

\[
\boxed{
U^\dagger(qI_3)U=qI_3.
}
\]

All relative flavor phases cancel. Consequently:

\[
\boxed{
\text{neutral incidence/\(B-L\) autocorrelations alone contain no CKM or PMNS phase.}
}
\]

Flavor CP must remain in a separate complex linking sector: charged currents, Yukawa spurions, or mixed words involving both up- and down-type mass operators.

## 1. Why generation replication loses the phase

Let \(f\) be a three-component generation vector. A neutral relational source has the form

\[
J_a^\mu=\bar f\gamma^\mu(q_a I_3)f.
\]

Under the mass-basis rotation \(f\mapsto U_f f\),

\[
q_aI_3\mapsto U_f^\dagger(q_aI_3)U_f=q_aI_3.
\]

The up, down, charged-lepton and neutrino sectors may acquire different masses and therefore different diagonal spectral functions, but a separate neutral correlator in each sector never compares the left-handed rotations of two different species.

The CKM matrix is precisely the relative rotation

\[
V_{\rm CKM}=U_{uL}^\dagger U_{dL},
\]

and PMNS is the analogous lepton relative rotation. They appear only in operators linking the two sectors.

## 2. The correct factorized extension

A neutral three-generation response can be organized as

\[
\mathcal K(z)
=\sum_f C_f\otimes\rho_f(z),
\]

where

- \(C_f\in H_2(\mathbb R)\) carries the real incidence/\(B-L\) face data;
- \(\rho_f(z)\in H_3(\mathbb C)\) carries positive flavor spectral data.

This preserves the useful separation:

\[
\text{real relational face}\otimes\text{complex flavor}.
\]

However, if every \(\rho_f\) is treated independently and only flavor traces are retained, all relative mixing information disappears.

## 3. What must be added

At least one linking observable is required, such as the charged weak current

\[
J_+^\mu=\bar u_L\gamma^\mu V_{\rm CKM}d_L
\]

or its leptonic analogue. Alternatively, retain the two Hermitian Yukawa combinations

\[
H_u=Y_uY_u^\dagger,
\qquad
H_d=Y_dY_d^\dagger
\]

in one common left-handed flavor frame. CP violation is then detected by a mixed invariant such as

\[
\operatorname{Im}\operatorname{tr}[H_u,H_d]^3,
\]

not by either neutral spectrum alone.

The real \(H_2(\mathbb R)\) face carrier need not become complex. The phase belongs to the linking/flavor factor, consistent with the earlier real-carrier/complex-flavor separation.

## 4. Consequence for the ten-state realization

The ten-state Hamiltonian of document 667 is a valid one-generation or flavor-summed rational realization. A faithful three-generation lift cannot be obtained merely by:

1. tripling each internal row;
2. inserting three masses per sector;
3. summing over generation.

That procedure gives richer thresholds but erases the relative unitary matrices. The minimal faithful lift must include cross-sector internal relations carrying \(V_{\rm CKM}\) and \(U_{\rm PMNS}\), or retain Yukawa spurions before diagonalization.

## 5. Stop-everything criteria

Stop claiming that the neutral relational carrier explains flavor CP if:

1. all flavor charges are proportional to \(I_3\);
2. up and down spectral functions are diagonalized independently before comparison;
3. only flavor traces or generation sums are retained;
4. no mixed up/down or charged-current observable appears;
5. a complex phase is inserted into the real face index instead of the flavor-linking sector.

## 6. Next gates

1. Construct the smallest positive block response containing both neutral face kernels and charged-current linking amplitudes.
2. Determine its minimal Hermitian dilation dimension.
3. Show explicitly where the Jarlskog invariant enters its spectral or Schur-complement data.
4. Test compatibility with the Furey three-generation construction and its complex structures.
5. Keep the \(Spin(2,3)\) action confined to the real face factor unless a derived intertwiner requires otherwise.

## Reproducibility

    node scripts\verify_flavor_universal_neutral_sources_erase_ckm_phase.mjs
