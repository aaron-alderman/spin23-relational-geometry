# A Local Conservative Real-Interface Network Realizes the Nested C12 Transport as Antiperiodic Six-Cycle Holonomy

**Date:** 18 October 2026  
**Branches:** local boundary action, real response fields, sideband routing, placement cover, quaternionic sewing, and twisted holonomy  
**Claim status:** exact effective-interface realization; microscopic Standard-Model origin remains open  
**Certificate:** [build_the_local_real_interface_network_for_the_c12_transport.mjs](scripts/build_the_local_real_interface_network_for_the_c12_transport.mjs)

## Executive result

Document 996 left one explicit conditional input: assign the graded antiunitary

\[
\Gamma=\varepsilon K
\]

to every elementary placement edge. Document 908 already supplied the required local variational mechanism for real response fields. Combining its (h\chi) grading with explicit sideband routing gives the real matching matrix

\[
\boxed{\varepsilon=DX=
\begin{pmatrix}0&1\\-1&0\end{pmatrix}.}
\]

On every oriented edge impose

\[
q_{n+1}=\varepsilon q_n,
\qquad
p_{n+1}=\varepsilon p_n.
\]

Because \(\varepsilon^T\varepsilon=I\), this is a local, conservative, variationally admissible interface. For real fields, Fourier reality turns it into

\[
q_{n+1}(-\omega)
=\varepsilon\overline{q_n(+\omega)}
=\Gamma q_n(+\omega).
\]

Thus the nested transport now has an explicit local effective-interface realization.

Around the six-cycle,

\[
\varepsilon^6=-I,
\]

so the field is antiperiodic. Around the twelve-step cover,

\[
\varepsilon^{12}=I.
\]

The coherent (C_{12}\to C_6\to C_3) hierarchy is therefore the holonomy hierarchy of a twisted real-response bundle.

## 1. Local variational consistency

For two oriented real-field patches, the on-shell boundary variation is

\[
\delta S_{\partial}
=-p_n^T\delta q_n
+p_{n+1}^T\delta q_{n+1}.
\]

Using

\[
q_{n+1}=\varepsilon q_n,
\qquad
p_{n+1}=\varepsilon p_n,
\qquad
\delta q_{n+1}=\varepsilon\delta q_n,
\]

gives

\[
\delta S_{\partial}
=-p_n^T\delta q_n
+p_n^T\varepsilon^T\varepsilon\delta q_n
=0.
\]

The canonical quadratic flux is likewise preserved:

\[
(\varepsilon p)^T(\varepsilon\dot q)
=p^T\dot q.
\]

No gain, loss or unstable one-mode Bogoliubov exchange is introduced at the interface.

## 2. Fourier antiunitarity arises from reality

The time-domain fields are real, so

\[
q_n(-\omega)=\overline{q_n(+\omega)}.
\]

The real local matching condition therefore becomes the anti-linear positive-to-negative-frequency sewing

\[
q_{n+1}(-\omega)=\varepsilon K q_n(+\omega).
\]

This respects the no-unitary-conjugation theorem of document 907. The interface does not dynamically manufacture complex conjugation; conjugation is the Fourier expression of real-field kinematics.

## 3. Six-step antiperiodicity

Since

\[
\varepsilon^2=-I,
\]

successive transport gives

\[
\varepsilon^3=-\varepsilon,
\qquad
\varepsilon^6=-I,
\qquad
\varepsilon^{12}=I.
\]

After six lifted placement steps, the same placement and sideband sheet are reached with a central minus sign. The field is a section of a twisted bundle with antiperiodic six-cycle boundary condition. Passing to the twelve-step cover trivializes that holonomy.

This is the local-field form of the relations

\[
\mathcal T^6=-I,
\qquad
\mathcal T^{12}=I

\]

from document 996.

## 4. What has now closed

At effective-field level, the following chain is complete:

\[
\begin{array}{c}
h\chi\text{ grading }D
+\text{ sideband routing }X\\[1mm]
\downarrow\\
\varepsilon=DX\\[1mm]
\downarrow\ \text{local real interface}\\
q_{n+1}=\varepsilon q_n,\quad
p_{n+1}=\varepsilon p_n\\[1mm]
\downarrow\ \text{Fourier reality}\\
\Gamma=\varepsilon K\\[1mm]
\downarrow\ \text{six placement-cover edges}\\
-I\text{ holonomy}\\[1mm]
\downarrow\ \text{double traversal}\\
I.
\end{array}
\]

The remaining gap is no longer existence of a local effective boundary action. It is microscopic derivation of the neutral real response fields and the \(\varepsilon=DX\) matching from Furey/Higgs/Standard-Model dynamics.

## 5. Why this is not a unitary-idler construction

The local network is boundary sewing on real fields. It does not claim a complex-linear unitary channel implements \(K\) on arbitrary quantum states.

A neutral idler dilation remains useful for a literal forward-time routing device, but it can only supply the swap/routing stage; it cannot generate conjugation from a fixed ancilla. The present construction instead uses the physically correct real-bundle interpretation.

## 6. Stop-everything and falsification tests

**Microscopic-field trigger:** derive the two-component neutral real response field from Higgs-dressed and color-contracted Furey bilinears.

**Boundary-term trigger:** integrating out a specified local sector yields the matching matrix \(DX=\varepsilon\) and its momentum condition.

**Holonomy trigger:** the full microscopic transfer around six placement edges produces \(-I\) without tuned continuous phases.

**Variational falsifier:** the proposed edge matching fails orthogonality or does not cancel the boundary variation.

**Periodicity falsifier:** a nonzero field is required to be simultaneously periodic after six steps and to retain \(\varepsilon^6=-I\); it must instead be antiperiodic or lifted to twelve steps.

**Unitary overclaim:** the real-field interface is described as a deterministic unitary conjugation channel.

## Verdict

| Question | Verdict |
|---|---|
| Is there a local edge interface producing \(\Gamma\)? | **Yes, effectively** |
| Is it variational and flux preserving? | **Yes** |
| What is the six-cycle holonomy? | **\(-I\)** |
| When does the coherent field close? | **After twelve steps** |
| Does this violate the antiunitary-channel no-go? | **No** |
| Is the interface microscopically derived? | **Not yet** |

## Position in the corpus

- [nested (C_{12}\to C_6\to C_3) transport](996_the_graded_sideband_antiunitary_lifts_the_six_cycle_to_a_nested_c12_to_c6_to_c3_transport.md)
- [local real (DK) interface](908_a_local_real_interface_supplies_the_antiunitary_sideband_twist_and_closes_the_boundary_monodromy_model.md)
- [graded quaternionic sideband interface](969_the_graded_sideband_interface_preserves_pfaffian_alignment_and_is_a_quaternionic_antiunitary_with_square_minus_identity.md)
- [no unitary conjugation dilation](907_a_neutral_idler_swap_routes_but_cannot_generate_the_antiunitary_sideband_sewing.md)
