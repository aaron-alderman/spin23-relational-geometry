# Type-I Seesaw Decoupling Selects One Face and Cannot Be the Topology Twirl

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B05, B07, B08, B09, B11, B12 and the Majorana order-parameter branch  
**Claim status:** exact two-face Schur/eigenvector theorem; ultraviolet interpretation of exchange breaking remains open  
**Certificate:** [verify_type_i_seesaw_decoupling_is_not_topology_twirl.mjs](../../../verification/verify/verify_type_i_seesaw_decoupling_is_not_topology_twirl.mjs)

## Executive result

A conventional type-I seesaw does not dynamically approximate the completely positive topology selector.

For

\[
\mathcal M_I=
\begin{pmatrix}
0&m_D\\
m_D&M_R
\end{pmatrix},
\qquad M_R\gg m_D,
\]

integrating out the right face gives the familiar Schur mass

\[
m_{\rm light}\simeq-\frac{m_D^2}{M_R}.
\]

But the light eigenstate becomes localized on the left face. With

\[
Z_{\rm chir}=\operatorname{diag}(-1,+1),
\]

its exact parity expectation is

\[
\boxed{
\langle Z_{\rm chir}\rangle_{\rm light}
=-\frac{M_R}{\sqrt{M_R^2+4m_D^2}}
\longrightarrow-1.
}
\]

The topology Pauli twirl instead removes face information and has

\[
\langle X\rangle
=\langle Y\rangle
=\langle Z\rangle=0.
\]

Therefore:

\[
\boxed{
\text{heavy-face seesaw projection}
\ne
\text{topology depolarization/real-form selection}.}
\]

They are different dynamical mechanisms with opposite topology behavior.

## 1. Exact seesaw spectrum

The signed eigenvalues are

\[
\lambda_\pm
=\frac{M_R\pm\sqrt{M_R^2+4m_D^2}}2.
\]

The light value obeys

\[
\lambda_-
=-\frac{m_D^2}{M_R}
+O\left(\frac{m_D^4}{M_R^3}\right),
\]

while

\[
\lambda_+
=M_R+O\left(\frac{m_D^2}{M_R}\right).
\]

The Takagi masses are \(|\lambda_-|\) and \(|\lambda_+|\).

The certificate verifies convergence to the Schur value for five increasing gaps.

## 2. Face localization of the light state

Let \(\theta\) be the mixing angle with

\[
\tan2\theta=\frac{2m_D}{M_R}.
\]

The right-face probability of the light eigenstate is

\[
P_R
=\sin^2\theta
=\frac12\left(
1-\frac{M_R}{\sqrt{M_R^2+4m_D^2}}
\right)
=O\left(\frac{m_D^2}{M_R^2}\right).
\]

Hence the low-energy state becomes more purely left-faced as the seesaw improves.

Its topology Bloch components are

\[
\langle Z\rangle
=-\frac{M_R}{\sqrt{M_R^2+4m_D^2}},
\qquad
\langle S\rangle
=-\frac{2m_D}{\sqrt{M_R^2+4m_D^2}}.
\]

Their squared sum is one: the topology state remains pure. It approaches the south pole rather than the maximally mixed center.

## 3. Why this differs from Peirce plus topology descent

The heavy-third-face construction of document 685 removes a separate carrier direction while retaining a rank-two response corner. The topology Lindbladian of document 691 averages the two conjugate topology presentations of that retained response.

The seesaw instead makes one member of a physical left/right fermion pair heavy and retains the other. It reduces the Hilbert space by energetic chirality selection.

Consequently, identifying the heavy sterile neutrino directly with the selector's discarded topology face would reverse the meaning of the CP dilation:

- the seesaw leaves a definite face;
- the selector leaves only face-independent observables.

They may coexist in a tensor-product architecture, but they are not the same arrow.

## 4. Exchange-even and exchange-odd Majorana components

For the general two-face mass

\[
\mathcal M=
\begin{pmatrix}
m_L&m_D\\m_D&m_R
\end{pmatrix},
\]

write

\[
m_+=\frac{m_L+m_R}{2},
\qquad
m_-\equiv\frac{m_R-m_L}{2}.
\]

Then

\[
\mathcal M=m_+I+m_DS+m_-Z.
\]

Under face exchange,

\[
m_+\mapsto m_+,
\qquad
m_-\mapsto-m_-.
\]

Thus \(m_-\) is the exchange-breaking order parameter.

A right-only type-I mass \((m_L,m_R)=(0,M)\) contains equal even and odd components:

\[
m_+=m_-=\frac M2.
\]

It is not a purely odd perturbation of the Dirac theory.

## 5. The exchanged vacuum pair

At fixed \(m_+=M/2\), the two configurations

\[
(m_L,m_R)=(0,M)
\quad\text{and}\quad
(M,0)
\]

have

\[
m_-=pm\frac M2.
\]

They are exchanged by \(S\). If exchange is a global discrete symmetry and a potential selects one, the theory has two vacua and potentially domain walls. If exchange is a Weyl gauge redundancy of a larger group, the two presentations may be gauge equivalent and no physical wall follows.

That global-versus-gauge distinction must be fixed before discussing defects.

## 6. Balanced exchange-invariant Majorana mass

For

\[
m_L=m_R=M,
\]

the matrix is

\[
\mathcal M=MI+m_DS.
\]

Its exchange-even and exchange-odd eigenstates have masses

\[
|M+m_D|,
\qquad
|M-m_D|.
\]

Both states have equal face weight and \(\langle Z\rangle=0\). But a large \(M\) produces two masses of the same order, not a generic seesaw hierarchy. A light state requires tuning \(M\simeq m_D\) or additional structure.

Exact exchange and natural type-I hierarchy therefore pull in different directions.

## 7. Consequence for the unified selector error budget

The inverse-gap term in document 692 describes a carrier Feshbach correction compatible with a separate topology twirl. A seesaw correction can have the same algebraic Schur form while acting on a different tensor factor.

The equality of Schur formulas is not enough to identify the mechanisms. The factor typing and fixed algebra decide:

\[
\text{same rational function}
\not\Rightarrow
\text{same physical descent}.
\]

If the seesaw is included, its chirality leakage must be added as an internal-matter correction, not substituted for the topology-decoherence term.

## 8. Stop-everything and falsification criteria

Stop a proposed synthesis if:

1. it treats \(P_R\to0\) as topology depolarization;
2. it identifies a pure left-faced light neutrino with an exchange-fixed topology state;
3. it infers domain walls without deciding whether exchange is global or gauged;
4. it claims balanced Majorana masses give a natural type-I hierarchy without an additional mechanism;
5. it merges carrier and matter Schur complements because their formulas look alike.

A stop-everything positive result would derive both descents from one typed action and show explicitly that the seesaw acts on the neutrino matter factor while the CP selector acts on the neutral response/topology factor.

## 9. Next gates

1. Construct an exchange-invariant potential for \(m_+\) and \(m_-\) and classify global versus gauge vacua.
2. Add the seesaw matter correction to the three-term selector error budget without factor conflation.
3. Test a left-right ultraviolet model in which \(m_-\) is generated by a parity-breaking condensate.
4. Extend face-localization diagnostics to three-family complex Majorana matrices.
5. Compare the seesaw Schur complement with the Jordan cubic-residue branch by explicit typing.

## Reproducibility

    node scripts\verify_type_i_seesaw_decoupling_is_not_topology_twirl.mjs

## Companion documents

- [Majorana Takagi freedom versus topology exchange](698_a_majorana_mass_reduces_takagi_phase_freedom_but_a_type_i_seesaw_breaks_exact_topology_exchange.md)
- [Joint gap and topology-time selector bound](692_the_full_two_stage_selector_has_a_joint_inverse_gap_and_exponential_time_error_bound.md)
- [Topology Pauli Lindbladian](691_the_topology_pauli_lindbladian_converges_exactly_to_the_cp_selector_but_depolarizes_the_topology_qubit.md)
- [Heavy third-face Peirce descent](685_a_heavy_third_face_dynamically_selects_the_rank_two_peirce_corner_but_not_its_real_slice.md)
