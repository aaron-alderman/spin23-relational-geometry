# Sequence operators: carrier, selector, relation, memory and detector

## Result

Modern sequence models fit the corpus grammar precisely when they are kept at
their actual level of authority. They are typed computational systems:

| Corpus term | Sequence-model realization |
|---|---|
| carrier/thing | token or feature vectors, plus any recurrent state |
| dual face/selector | query acting on keys, gate acting on state, or learned readout |
| relation/detector | compatibility score and normalized relation weights |
| transport | weighted value map or state recurrence |
| memory | explicit key/value set, kernel sufficient statistics, or recurrent state |
| clock | token index/layer, not physical time unless separately realized |
| detector | output logits, probes or task record |

“Triality relations = detector” is therefore productive but needs one
qualification: the relation weights are an internal detector-like record. They
become an empirical detector only when linked to a measurement protocol and
validated against interventions.

## Softmax attention

For queries `q_i`, keys `k_j` and values `v_j`,

\[
a_{ij}=\frac{\exp(q_i^T k_j/\sqrt d)}
{\sum_l\exp(q_i^T k_l/\sqrt d)},\qquad
y_i=\sum_j a_{ij}v_j.
\]

The query is the selector, key compatibility supplies a relation, softmax
normalizes it, and values are the transported carrier. Algebraically the row
weights are Gibbs probabilities after setting an effective logit equal to
minus energy over temperature. Physically, however, there is ordinarily no
bath, energy unit, partition-function ontology or equilibrium claim.

Softmax also has a quotient scar: adding the same constant to every logit in a
row changes nothing. The normalized detector loses the absolute logit offset.

## RoPE and the quarter turn

Rotary position embedding represents paired real coordinates by planar
rotations. If `R_m` is the block rotation for position `m`, then

\[
(R_m q)^T(R_n k)=q^T R_{n-m}k.
\]

This is an exact representation identity and a genuine instance of the
corpus's quarter-turn grammar: complex multiplication packages oriented
two-plane rotation. The retained invariant is the inner product under a common
rotation; the detected relation depends on relative position. The refusal is
equally exact: token position is not Wick rotation, proper time or internal
spin merely because all use a complex phase.

## Linear attention as sufficient-state closure

If the similarity kernel factorizes as
`K(q,k)=phi(q)^T phi(k)`, causal attention can maintain

\[
S_i=\sum_{j\le i}\phi(k_j)v_j^T,\qquad
z_i=\sum_{j\le i}\phi(k_j),
\]

and read

\[
y_i=\frac{\phi(q_i)^T S_i}{\phi(q_i)^Tz_i}.
\]

Associativity turns a quadratic relation table into a recurrent sufficient
state. This is exact for the selected kernel and normalization, but it is not
exact softmax attention unless the feature map realizes the exponential kernel
at the required accuracy. The discarded pairwise table is the quotient; the
sufficient statistics are the scar retained for future reads.

## Mamba and selective state space

A fixed linear time-invariant state-space model can be unrolled into a
convolution. Mamba makes selected state-space parameters input dependent so
that the recurrence can choose what to retain or forget. That selectivity is
why a single fixed convolution kernel generally no longer represents the
system. The apparent triangle

\[
\text{state space}\leftrightarrow\text{recurrence}\leftrightarrow\text{convolution}
\]

commutes for the fixed linear system and breaks for an input-dependent one.
This is not a defect: the noncommutation is the computational capability.

## Exact contacts with the corpus

- RoPE contacts the complex-exponential and quarter-turn lanes at the level of
  a real representation of planar phase.
- Linear attention contacts low-rank factorization, sufficient statistics and
  quotient scars.
- Fixed state-space models contact causal response, matrix exponentials,
  convolution, poles and detector readout.
- Selective state-space models contact history-dependent selectors and
  controlled forgetting.
- Attention contacts relation algebra because its basic object is a typed
  source--target compatibility followed by value transport.

None of these contacts establishes neural implementation in brains, gauge
fields, quantum measurement or fundamental spacetime. Such a promotion would
need a sourced carrier, units, constitutive dynamics and intervention-level
detector equivalence.

## Research frontier

The useful question is not whether physics “is attention.” It is which
physical or mathematical systems admit a finite sufficient state for a family
of relational reads, and what quotient scar certifies the compression. This
can be tested in the corpus's response matrices, braided-channel models and
finite-mode emulators without asserting an ontological identity.
