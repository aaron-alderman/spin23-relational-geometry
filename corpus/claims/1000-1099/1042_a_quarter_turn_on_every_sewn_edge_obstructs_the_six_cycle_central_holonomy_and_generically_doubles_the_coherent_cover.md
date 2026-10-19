# A Quarter-Turn on Every Sewn Edge Obstructs the Six-Cycle Central Holonomy and Generically Doubles the Coherent Cover

**Date:** 18 October 2026  
**Branches:** projected oscillator, local channel sewing, placement cover, holonomy, parity obstruction  
**Claim status:** exact no-go for the naive identical-edge cascade  
**Certificate:** [classify_six_edge_compositions_of_channel_sewing_and_passive_tkk_quarter_turns.mjs](../../../verification/classify/classify_six_edge_compositions_of_channel_sewing_and_passive_tkk_quarter_turns.mjs)

## Executive result

Documents 997 and 1040 provide two distinct local canonical operations:

\[
E=I_{\rm phase}\otimes\varepsilon_{\rm channel}
\]

for channel sewing, and

\[
S_-^{(\sigma)}=I\otimes e_++\sigma J\otimes e_-,
\qquad \sigma=\pm1,
\]

for either orientation of the passive negative-face quarter-turn.

The obvious proposal—put one sewing and one quarter-turn on every edge of the six-cycle—does not preserve the established central six-edge holonomy. For either ordering, and for every assignment of the two quarter-turn orientations to the six edges, the six-edge product is noncentral.

For identical positive orientation,

\[
M=ES_-
\quad\text{or}\quad
M=S_-E
\]

satisfies

\[
M^2=-J\otimes I,
\qquad
M^4=-I,
\qquad
M^6=J\otimes I,
\qquad
M^8=I.
\]

Thus the naive composite edge has order eight, not the order compatible with the earlier $C_{12}\to C_6\to C_3$ transport. Its uniform twelve-edge product is $-I$, and it becomes periodic only after twenty-four edges.

This is a useful obstruction: the controlled TKK quarter-turn cannot simply be appended to every placement-sewing edge without changing the holonomy tower.

## 1. Why every orientation schedule fails at six edges

The sewing matrix exchanges the two Jordan faces. Along six sewn edges, an initial carrier therefore visits each face three times. If every edge contains one face-controlled quarter-turn, then each transported component accumulates exactly three angles chosen from $+\pi/2$ and $-\pi/2$.

The sum of three odd quarter-turns is always an odd multiple of $\pi/2$:

\[
\frac\pi2(\sigma_1+\sigma_2+\sigma_3),
\qquad
\sigma_i\in\{+1,-1\}.
\]

It can therefore produce $+J$ or $-J$, but never $+I$ or $-I$. The six-edge phase action remains a quarter-turn on each returned face and cannot be central.

Exhaustive enumeration of all $2^6=64$ orientation words confirms:

| Edge ordering | $+I$ words | $-I$ words | noncentral words |
|---|---:|---:|---:|
| sewing then turn | 0 | 0 | 64 |
| turn then sewing | 0 | 0 | 64 |

The obstruction is parity, not a poor choice of signs.

## 2. The uniform cascade

Conjugation by sewing exchanges the controlled face without reversing phase orientation:

\[
E S_- E^{-1}=S_+.
\]

Since $E^2=-I$ and $S_+S_-=J\otimes I$,

\[
(ES_-)^2=-J\otimes I.
\]

The same square holds for the reverse ordering $S_-E$. The powers quoted above follow immediately.

The contrast with the realified antiunitary is important. The antiunitary includes phase conjugation and sends $S_-$ to $S_+^{-1}$; bare real sewing sends it to $S_+$. Omitting that orientation reversal changes the holonomy class.

## 3. What the no-go permits

The result excludes only the identical architecture “one quarter-turn plus one sewing on every edge.” It leaves several paths open:

1. place the TKK quarter-turn at one distinguished seam rather than every placement edge;
2. insert turns in pairs so each transported face receives an even number;
3. use an antiunitary/retarded-advanced reversal that changes the complementary orientation;
4. accept a genuinely enlarged $24\to12\to6\to3$ cover and seek independent evidence for it;
5. let the quarter-turn act in an internal boundary layer that is completed before the placement step is counted.

These alternatives are inequivalent and should be tested separately.

## 4. Stop-everything implications

**Architecture trigger:** a microscopic construction places $S_-$ on every placement edge. Then the previously established twelve-step periodicity must be revised; the real symplectic cascade instead has a twenty-four-step period in the uniform branch.

**Antiunitary trigger:** the actual edge law contains the phase-orientation reversal missing from $E$. Then the parity calculation must be redone in the semilinear category rather than treated as bare symplectic sewing.

**Seam trigger:** the TKK transformation occurs only at a global cut or defect. Then it should not be multiplied six times, and the present obstruction disappears.

**Falsifier:** a six-edge word containing one $\pm\pi/2$ face turn on every sewn edge is claimed to have central holonomy. The exhaustive classification rules this out.

**Boundary warning:** do not identify the order-eight composite edge with the earlier order-twelve placement transport; they act on different factors and have different powers.

## Verdict

| Question | Verdict |
|---|---|
| Can $S_-$ be naively appended to every real sewing edge? | **Not while retaining central six-edge holonomy** |
| Can orientation signs repair the six-edge product? | **No** |
| Does the uniform composite have order twelve? | **No; it has order eight** |
| Does the uniform composite close after twenty-four edge applications? | **Yes** |
| Is a distinguished-seam or semilinear repair still open? | **Yes** |

## Position in the corpus

- [passive square-root angle](1041_passivity_and_the_square_root_of_D_quantize_the_projected_oscillator_action_to_a_quarter_turn_modulo_orientation.md)
- [projected-oscillator boundary action](1040_a_positive_projected_oscillator_generates_the_controlled_fourier_tkk_intertwiner_as_a_passive_quarter_period_boundary_flow.md)
- [local conservative interface network](../0900-0999/997_a_local_conservative_real_interface_network_realizes_the_nested_c12_transport_as_antiperiodic_six_cycle_holonomy.md)
- [controlled-Fourier/antiunitary distinction](1039_the_split_tkk_intertwiner_is_a_channel_controlled_fourier_quarter_turn_whose_square_is_D_not_the_realified_furey_antiunitary.md)
