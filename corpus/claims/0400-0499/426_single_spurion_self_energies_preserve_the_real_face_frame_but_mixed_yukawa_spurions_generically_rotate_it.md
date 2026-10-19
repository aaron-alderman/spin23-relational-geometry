# Single-Spurion Self-Energies Preserve the Real Face Frame, but Mixed Yukawa Spurions Generically Rotate It

**Date:** 17 October 2026  
**Branches:** B02, B03, B06, B08 and B11  
**Claim status:** exact algebraic protection/obstruction theorem; application to full Standard-Model spectral densities remains open

## 1. The interacting question

The free multiflavor Dirac family is realified by one fixed singular-value frame. The next question is whether radiative corrections preserve that frame.

There are two sharply different cases:

1. corrections generated from one mass/Yukawa spurion and flavor scalars;
2. corrections containing a second, noncommuting weak-partner Yukawa spurion.

The first preserves the frame. The second generically rotates it.

## 2. Single-spurion functional calculus is protected

Let

\[
M=U_LDU_R^\dagger,
\qquad D=\operatorname{diag}(m_i),\quad m_i\ge0.
\]

Consider a chirality-flipping spectral block of the form

\[
C(s)=M f_s(M^\dagger M),
\]

where \(f_s\) is real-valued on the nonnegative spectrum. Functional calculus gives

\[
C(s)=U_LD f_s(D^2)U_R^\dagger.
\]

Thus the same \(U_L,U_R\) work for every spectral parameter \(s\). If

\[
d_i(s)=m_i f_s(m_i^2)
\]

do not change sign, the family is simultaneously singular-value diagonalized with nonnegative entries. If signs change, a fixed real diagonal frame still exists, with only discrete sign data.

The result extends to finite or convergent real sums

\[
C(s)=\sum_r a_r(s),M(M^\dagger M)^r,
\qquad a_r(s)\in\mathbb R.
\]

Flavor-blind gauge factors and trace invariants multiply these terms by scalars and do not rotate the frame.

## 3. Mixed spurions provide the minimal obstruction

Now let \(N\) be the Yukawa/mass spurion of the weak partner sharing the same left-handed multiplet. A symmetry-allowed left insertion has the form

\[
C_\varepsilon=(I+\varepsilon NN^\dagger)M.
\]

Choose the singular frame of \(M\), so that \(M=D\). Define

\[
H_M=MM^\dagger=D^2,
\qquad
H_N=NN^\dagger.
\]

To first order,

\[
C_\varepsilon C_\varepsilon^\dagger
=D^2+\varepsilon(H_ND^2+D^2H_N)+O(\varepsilon^2).
\]

If

\[
[H_M,H_N]\ne0,
\]

then, for nondegenerate generic \(D\),

\[
[D^2,C_\varepsilon C_\varepsilon^\dagger]\ne0.
\]

Therefore the uncorrected and corrected blocks cannot share one left singular basis. The real face frame rotates with scale or spectral parameter.

This is not loss of positivity: each block still has an SVD at each scale. It is loss of one **fixed** real slice across the interacting family.

## 4. Standard-Model relevance

The one-loop Standard-Model Yukawa flow contains precisely this kind of cross-sector data. For example, the evolution of charged-lepton Yukawa invariants contains mixed terms involving \(Y_\nu^\dagger Y_\nu\), and the quark sectors analogously couple the up and down Yukawa structures. Gesteau’s matrix reformulation displays the mixed term explicitly in the one-loop evolution of \(\operatorname{Tr}(Y_e^\dagger Y_e)^n\) and identifies it with the charged-Higgs/weak-partner contribution.

Primary source: [Elliott Gesteau, *Renormalizing Yukawa interactions in the Standard Model with matrices and Noncommutative Geometry*](https://arxiv.org/abs/1906.02297), especially equations (12)–(14) and the discussion of the twisted/charged-Higgs term.

The exact coefficient is not needed for the present obstruction. What matters is the noncommuting matrix word.

## 5. Relation to CKM and PMNS data

In the up-mass basis,

\[
H_u=D_u^2,
\qquad
H_d=VD_d^2V^\dagger.
\]

For nondegenerate masses and nontrivial mixing,

\[
[H_u,H_d]\ne0.
\]

The same noncommutativity that makes the relative flavor frame physical therefore obstructs a scale-independent singular frame for both sectors once mixed-spurion corrections are included.

This produces a useful tension rather than a contradiction:

- nonzero flavor mixing/CP lives in relative singular frames;
- mixed radiative corrections make those frames run;
- a real two-face carrier may survive locally at each scale;
- a globally fixed real carrier requires a connection and holonomy, not one constant basis.

## 6. The emerging bundle interpretation

Let \(U_L(s),U_R(s)\) be scale- or energy-dependent singular frames. Their frame connections are

\[
\mathcal A_L=U_L^\dagger dU_L,
\qquad
\mathcal A_R=U_R^\dagger dU_R.
\]

The correct interacting object may therefore be a bundle of real \(H_2(\mathbb R)\) slices over spectral/renormalization parameter space rather than one fixed embedded slice.

This reopens an earlier branch productively: flavor CP and Berry/holonomy data may be the obstruction to globally trivializing the real carrier, while local \(Spin_0(2,3)\) response geometry remains valid fiberwise.

No claim is made yet that this connection is a physical gauge field or that its holonomy predicts CKM/PMNS phases.

## 7. Exact finite witness

Take

\[
D=\operatorname{diag}(1,2,4)
\]

and a nontrivially mixed partner

\[
H_N=V\operatorname{diag}(1,3,7)V^\dagger.
\]

The certificate verifies:

- every real polynomial \(D f_s(D^2)\) commutes with \(D^2\) and retains the frame;
- \([D^2,H_N]\ne0\);
- for \(C_\varepsilon=(I+\varepsilon H_N)D\), one has
  \([D^2,C_\varepsilon C_\varepsilon^\dagger]\ne0\);
- the corrected positive product remains positive, so the failure is frame alignment rather than spectral positivity.

## 8. Branch decision

- **Closed:** real single-spurion functional calculus preserves one common singular frame.
- **Closed:** flavor-blind scalar and gauge factors do not rotate that frame.
- **Closed:** a noncommuting mixed left spurion generically destroys fixed-frame alignment.
- **Supported by primary literature:** Standard-Model one-loop Yukawa evolution contains mixed weak-partner matrix data.
- **Open:** whether the complete gauge-invariant spectral response can be organized as a covariant bundle of local real slices.
- **Open:** whether its frame holonomy has a controlled relation to physical flavor CP.

## 9. Stop-everything and falsification gates

**Stop-everything trigger:** derive a canonical connection on the bundle of local \(H_2(\mathbb R)\) response slices and show that its holonomy equals a measured CKM/PMNS invariant or supplies the exceptional/Furey sewing phase.

**Protection trigger:** prove that all physical chirality-flipping spectral corrections reduce to real single-spurion functional calculus after Ward identities and field renormalization.

**Fixed-frame falsifier:** exhibit one nonzero commutator

\[
[C(s)C(s)^\dagger,C(t)C(t)^\dagger].
\]

**Overclaim falsifier:** infer destruction of local \(H_2(\mathbb R)\) geometry merely from rotation of its embedding.

**RG-to-spectrum warning:** Yukawa beta functions establish allowed/running matrix structures; they are not by themselves a complete Källén–Lehmann spectral calculation.

## 10. Certificate

The [single- versus mixed-spurion frame certificate](../../../verification/verify/verify_single_spurion_preserves_and_mixed_spurion_rotates_real_face_frame.mjs) verifies exact single-spurion alignment, mixed-spurion noncommutativity, positive corrected spectral products and the absence of one common left frame.

## Companion documents

- [Multiflavor free spectral alignment](425_a_fixed_mass_matrix_aligns_the_full_free_multiflavor_spectrum_while_relative_singular_frames_retain_cp.md)
- [Antiunitary and common-spurion alignment criteria](../0100-0199/130_antiunitary_and_common_spurion_alignment_criteria.md)
- [Helicity Hopf-bundle obstruction](../0100-0199/122_helicity_hopf_bundle_real_carrier_obstruction.md)
- [Spectral phase-alignment real-carrier gate](../0100-0199/128_spectral_phase_alignment_real_carrier_gate.md)
