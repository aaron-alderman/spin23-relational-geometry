# A Passive Idler Dilation Cannot Cancel the Lossless Placement Cocycle Without Changing the Observed Edge Map

**Date:** 18 October 2026  
**Branches:** conservative dilation, outgoing ports, placement cocycle, local real interface, and lossless checkpoint  
**Claim status:** exact unitary-compression no-go  
**Certificate:** [prove_that_a_passive_idler_dilation_cannot_cancel_the_lossless_c12_cocycle.mjs](scripts/prove_that_a_passive_idler_dilation_cannot_cancel_the_lossless_c12_cocycle.mjs)

## Executive result

The outgoing-port and idler branches cannot erase the central placement twist at the lossless checkpoint while leaving the observed edge map unchanged.

Let a unitary edge dilation on observed plus environment space have block form

\[
U=\begin{pmatrix}A&B\\C&E\end{pmatrix}
\]

and suppose its observed compression is the exact lossless interface

\[
A=\varepsilon=DX,
\qquad
\varepsilon^T\varepsilon=I.
\]

Unitarity gives

\[
A^*A+C^*C=I.
\]

Because \(A\) is already unitary, \(C^*C=0\), so \(C=0\). The other unitary identity gives \(BB^*=0\), hence \(B=0\). Therefore

\[
\boxed{U=\varepsilon\oplus V}
\]

for some environment unitary \(V\). This is independent of environment dimension and applies separately to every lossless edge.

Consequently, after six placement-cover edges,

\[
P_OU_6\cdots U_1\vert_O
=\varepsilon^6
=-I_O.
\]

No passive idler action can turn this observed holonomy into \(+I_O\). The six-cycle remains antiperiodic; exact coherent closure remains twelve-step.

## 1. Why loss ports decouple at the checkpoint

For strict loss, the observed response is contractive and a conservative dilation needs outgoing channels. At zero loss its observed block becomes unitary. Saturation of the norm leaves no amplitude for an environment block: any nonzero leakage would violate unitarity.

This is the general reason that both the spectrally minimal six-port realization of document 950 and the stage-resolved ten-port realization of document 949 decouple their environments at the lossless silver checkpoint. Their ports remain useful away from the checkpoint, but they cannot supply a compensating central sign there.

## 2. Edge-dependent environments do not help

Fresh environments may differ from edge to edge. At the checkpoint each edge still has the form

\[
U_j=\varepsilon\oplus V_j.
\]

Their product restricts to \(\varepsilon^6=-I\) on the observed subspace regardless of the word \(V_6\cdots V_1\). A nontrivial environment cocycle may exist in its own block, but it cannot cancel a central operator acting on a reducing observed block.

This also separates two statements that had remained too close in the programme:

- the minimal outgoing pair carries the same \(A_2\) representation as the placement doublet;
- the outgoing pair cancels the coherent placement cocycle.

The first is established representation typing. The second is now excluded for an ordinary passive unitary dilation at the exact lossless edge.

## 3. What the environment can still do

The no-go does not make the outgoing sector irrelevant. It can:

- realize strict passive loss conservatively;
- carry the transported \(A_2\) face representation;
- restore global probability or flux when the observed corner is contractive;
- retain stage or Galois data not visible in the compressed response; and
- participate in a microscopic derivation away from the lossless checkpoint.

It simply cannot trivialize \(-I\) on the observed carrier without altering the observed edge action.

## 4. Escape routes

There are four clean possibilities:

1. accept projective or antiperiodic closure on the six-cycle;
2. use the twelve-step coherent cover, where \(\varepsilon^{12}=I\);
3. change the observed edge map so it is not exactly the unitary \(\varepsilon\); or
4. introduce a gauge identification, non-passive boundary operation, or other structure not described by an ordinary unitary dilation with fixed observed compression.

The first two are already realized by document 997. Document 999 additionally proves that the central sign is automatically invisible on the full even/quadratic observable algebra when both legs carry the same character. This gives an exact projective observable descent, not a dynamical idler cancellation or a microscopic gauge identification. The latter two escape routes remain genuinely different physical hypotheses and must not be hidden inside the word “idler.”

## 5. Stop-everything and falsification tests

**Passive-cancellation falsifier:** a proposed unitary dilation has observed compression \(\varepsilon\) but nonzero observed-environment coupling at the same lossless frequency.

**Holonomy falsifier:** six lossless edges are claimed to close as \(+I\) while each observed edge remains \(\varepsilon\).

**Environment trigger:** a microscopic model changes the physical equivalence relation so that the observed \(-I\) is gauge-trivial rather than dynamically cancelled.

**Beyond-passive trigger:** a non-unitary, active or constrained boundary construction supplies a consistent six-step closure and states its additional degrees of freedom and stability conditions.

## Verdict

| Question | Verdict |
|---|---|
| Can passive loss ports realize strict-loss dynamics? | **Yes** |
| Can they cancel the exact lossless observed \(-I\)? | **No** |
| Does increasing environment dimension help? | **No** |
| Does using fresh edge-dependent environments help? | **No** |
| What closes exactly without changing the edge? | **The twelve-step cover** |

## Position in the corpus

- [local conservative C12 network](997_a_local_conservative_real_interface_network_realizes_the_nested_c12_transport_as_antiperiodic_six_cycle_holonomy.md)
- [minimal six-port two-face dilation](950_spectral_factorization_compresses_each_squared_loss_channel_to_two_ports_and_the_full_two_face_cycle_to_six.md)
- [stage-resolved ten-port dilation](949_the_two_face_sideband_cycle_has_a_fixed_ten_port_conservative_dilation_while_reality_prevents_double_counting.md)
- [outgoing A2 doublet](963_the_minimal_outgoing_port_pair_is_canonically_the_a2_doublet_and_its_three_face_loss_orbit_is_globally_isotropic.md)
- [unitary-conjugation no-go](907_a_neutral_idler_swap_routes_but_cannot_generate_the_antiunitary_sideband_sewing.md)
- [central-sign descent to even Furey bilinears](999_the_central_sign_is_invisible_on_even_furey_bilinears_and_reduces_coherent_c12_to_observable_c6.md)
