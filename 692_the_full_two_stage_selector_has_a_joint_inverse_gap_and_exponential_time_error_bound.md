# The Full Two-Stage Selector Has a Joint Inverse-Gap and Exponential-Time Error Bound

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B05, B07, B08, B11 and the quantitative selector branch  
**Claim status:** exact norm bound in the finite response model under explicit factorization assumptions; interacting covariant extension remains open  
**Certificate:** [verify_joint_gap_and_topology_time_selector_bound.mjs](scripts/verify_joint_gap_and_topology_time_selector_bound.mjs)

## Executive result

The energetic Peirce descent and dissipative topology descent can be composed with one explicit error budget.

Let

\[
H_\Delta=
\begin{pmatrix}
H_2&w\\
w^\dagger&\Delta
\end{pmatrix},
\qquad
R_0(z)=(zI_2-H_2)^{-1},
\]

and define the Feshbach self-energy

\[
\Sigma_\Delta(z)=\frac{ww^\dagger}{z-\Delta},
\qquad
R_\Delta(z)=(zI_2-H_2-\Sigma_\Delta)^{-1}.
\]

Encode the projected response in conjugate topology blocks and evolve it for time \(t\) under the topology Pauli Lindbladian of [document 691](691_the_topology_pauli_lindbladian_converges_exactly_to_the_cp_selector_but_depolarizes_the_topology_qubit.md). If

\[
\alpha_\Delta
=\|R_0\|_F\|\Sigma_\Delta\|_F<1,
\]

then the distance from the ideal doubled real rank-two response obeys

\[
\boxed{
\epsilon_{\rm total}
\le
\epsilon_{\rm pair}
+\sqrt2\,
\frac{\|R_0\|_F^2\|\Sigma_\Delta\|_F}
{1-\|R_0\|_F\|\Sigma_\Delta\|_F}
+\sqrt2\,e^{-2\gamma_x t}\|\operatorname{Im}R_0\|_F.
}
\]

The three terms have distinct meanings:

1. imperfect preparation or preservation of conjugate topology blocks;
2. virtual leakage through the heavy third face;
3. incomplete decay of the imaginary/unequal topology sector.

This is the first unified quantitative approximation statement for the full descent

\[
H_3(\mathbb C)
\longrightarrow H_2(\mathbb C)
\longrightarrow H_2(\mathbb R).
\]

## 1. The inverse-gap term

The resolvent identity gives

\[
R_\Delta-R_0
=(I-R_0\Sigma_\Delta)^{-1}R_0-R_0.
\]

Using the Frobenius norm and the Neumann condition \(\alpha_\Delta<1\),

\[
\|R_\Delta-R_0\|_F
\le
\frac{\|R_0\|_F^2\|\Sigma_\Delta\|_F}
{1-\|R_0\|_F\|\Sigma_\Delta\|_F}.
\]

Because

\[
\|\Sigma_\Delta\|_F
=\frac{\|ww^\dagger\|_F}{|z-\Delta|},
\]

this term is \(O(\|w\|^2/\Delta)\) away from the heavy pole.

The doubled encoding contributes the factor \(\sqrt2\).

## 2. The finite-time topology term

A conjugate-paired response has the form

\[
O_0=\operatorname{diag}(R_0,\bar R_0).
\]

Its difference between the two topology blocks lies entirely in the topology \(Z\) sector. Under

\[
\mathcal L
=\gamma_x(\operatorname{Ad}_S-I)
+\gamma_z(\operatorname{Ad}_Z-I),
\]

that sector decays at rate \(2\gamma_x\). Hence

\[
\|e^{t\mathcal L}O_0-\mathcal E(O_0)\|_F
=\sqrt2\,e^{-2\gamma_x t}
\|\operatorname{Im}R_0\|_F.
\]

The \(\gamma_z\) jump removes off-diagonal topology coherences, but a block-diagonal paired input has none. If imperfect preparation includes such coherences, their \(X\) and \(Y\) components add terms with rates \(2\gamma_z\) and \(2(\gamma_x+\gamma_z)\).

## 3. The pairing term

The Lindbladian does not create the relation

\[
B=\bar A
\quad\text{or, in the twisted case,}\quad
B=\Theta(A).
\]

Let \(O_{\rm actual}=O_{\rm paired}+\delta O\). Complete-positive trace-preserving evolution is contractive in trace norm, and the random-unitary channel is contractive in Frobenius norm. Therefore an additive preparation bound

\[
\|\delta O\|_F\le\epsilon_{\rm pair}
\]

remains an additive contribution to the final error.

This is not a nuisance parameter to hide. It is the quantitative location of the unresolved action-level origin of the two Furey/topology faces.

## 4. Why the two controls compose

In the finite model, the heavy-face Hamiltonian acts on the carrier factor while the Pauli jumps act on the topology factor. Their superoperators commute. Therefore there is no Trotter error and the two estimates combine by the triangle inequality.

This factorization is an assumption to test in the interacting theory. If gauge or Yukawa terms couple topology to the third-face coordinate, commutation fails and an additional Duhamel/commutator term is required.

## 5. A practical accuracy regime

Given a target tolerance \(\varepsilon\), a sufficient allocation is

\[
\epsilon_{\rm pair}\le\frac\varepsilon3,
\]

\[
\sqrt2\,
\frac{\|R_0\|_F^2\|\Sigma_\Delta\|_F}
{1-\|R_0\|_F\|\Sigma_\Delta\|_F}
\le\frac\varepsilon3,
\]

and

\[
t\ge
\frac{1}{2\gamma_x}
\log\left(
\frac{3\sqrt2\|\operatorname{Im}R_0\|_F}{\varepsilon}
\right).
\]

This makes the hierarchy of physical questions explicit: increasing \(\Delta\) cannot compensate for poor topology pairing, and waiting for topology decoherence cannot compensate for a nearby heavy pole.

## 6. Numerical certificate

The executable certificate uses a complex Hermitian \(H_2\), a complex coupling vector \(w\), four gaps and four evolution times. It verifies:

- the Neumann condition at every point;
- the resolvent-error bound;
- the joint bound on the topology-lifted response;
- monotonic decrease of the analytic gap term with \(\Delta\);
- monotonic decrease of the topology term with \(t\).

This is a finite mathematical certificate, not a fit to experimental data.

## 7. Stop-everything and falsification criteria

The bound must not be used if:

1. \(z\) approaches the heavy pole \(\Delta\);
2. \(\alpha_\Delta\ge1\), so the chosen Neumann regime fails;
3. topology and carrier dynamics do not approximately factor;
4. the paired-sector error is uncontrolled;
5. the reduced dynamics is not contractive in the norm being used;
6. a response-kernel bound is advertised as a particle-spectrum theorem.

A stop-everything positive result would derive \(\Delta,w,\gamma_x,\gamma_z\) and \(\epsilon_{\rm pair}\) from one covariant microscopic action and place the measured regime inside the certified domain.

## 8. Next gates

1. Compute the first commutator correction when topology and carrier couplings do not factor.
2. Insert Standard-Model gauge and Yukawa blocks and bound paired-sector leakage.
3. Replace the single heavy pole by a positive spectral measure and derive an integral bound.
4. Determine whether weak isospin supplies \(Z\) or merely labels its sectors.
5. Seek an observable whose deviation is controlled by the three-term error budget.

## Reproducibility

    node scripts\verify_joint_gap_and_topology_time_selector_bound.mjs

## Companion documents

- [Heavy third-face Peirce descent](685_a_heavy_third_face_dynamically_selects_the_rank_two_peirce_corner_but_not_its_real_slice.md)
- [Combined completely positive selector](688_the_combined_peirce_exchange_superselection_selector_is_completely_positive_on_the_doubled_carrier.md)
- [Topology Pauli Lindbladian](691_the_topology_pauli_lindbladian_converges_exactly_to_the_cp_selector_but_depolarizes_the_topology_qubit.md)

## Revisit after the Clifford typing audit

The commuting-factor error bound remains valid only when the topology duplicate, Clifford face and Clifford multiplicity are explicitly distinct. If topology is identified with the Clifford face, the limiting joint algebra is scalar rather than \(H_2(\mathbb R)\), so a small error bound would certify convergence to the wrong target. The corrected factor labels and both joint fixed algebras are in [the typed topology/Clifford audit](708_the_topology_face_and_clifford_carrier_must_be_separately_typed_or_the_joint_selector_collapses_to_scalars.md).
