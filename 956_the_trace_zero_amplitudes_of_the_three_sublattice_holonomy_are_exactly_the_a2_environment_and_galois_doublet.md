# The Trace-Zero Amplitudes of the Three-Sublattice Holonomy Are Exactly the A2 Environment and Galois Doublet

**Date:** 17 October 2026  
**Branches:** induced representation, three lattice placements, selector handle, \(S_3\), \(A_2\) environment, Galois trace-zero carrier, and common-mode channel  
**Claim status:** exact representation-level identification; microscopic placement amplitudes remain open  
**Certificate:** [identify_the_trace_zero_three_sublattice_orbit_with_the_a2_environment_and_galois_doublet.mjs](scripts/identify_the_trace_zero_three_sublattice_orbit_with_the_a2_environment_and_galois_doublet.mjs)

## Executive result

Document 955 replaced the false fixed-quotient bridge by an orbit of three index-four lattice placements

\[
(L_0,L_1,L_2).
\]

The selector \(C_3\) cycles them.  The realified handle fixes \(L_0\) and exchanges \(L_1,L_2\).  Therefore the placement space \(\mathbb R^3\) carries the standard permutation representation of

\[
S_3=C_3\rtimes C_2.
\]

It decomposes canonically as

\[
\mathbb R^3
=\mathbb R(1,1,1)
\oplus
\{(x_0,x_1,x_2):x_0+x_1+x_2=0\}.
\]

The trace-zero plane is exactly the real \(A_2\) standard representation.  After complexification it is

\[
\chi_1\oplus\chi_2,
\]

with reflection exchanging the two characters.

This is precisely the representation carried by:

- the unique minimal common-mode-activating environment of document 944;
- each Galois trace-zero plane of document 946;
- the active selector root plane.

Thus the correct bridge is now exact:

\[
\boxed{
\text{minimal }A_2\text{ environment}
=
\text{trace-zero amplitudes on the three lattice placements}
}
\]

at representation level.

## 1. Placement action

Use the ordered placement basis \((e_0,e_1,e_2)\).  The cycle and reflection are

\[
C_{m pl}=
\begin{pmatrix}
0&0&1\\1&0&0\\0&1&0
\end{pmatrix},
\qquad
F_{m pl}=
\begin{pmatrix}
1&0&0\\0&0&1\\0&1&0
\end{pmatrix}.
\]

They obey

\[
C_{m pl}^3=I,
\qquad
F_{m pl}^2=I,
\qquad
F_{m pl}C_{m pl}F_{m pl}=C_{m pl}^{-1}.
\]

The group generated is \(S_3\).

## 2. Trace and trace-zero sectors

The vector

\[
\mathbf1=(1,1,1)
\]

is fixed by both generators.  Its orthogonal complement is invariant.

Choose the integral \(A_2\) basis

\[
b_1=e_0-e_1,
\qquad
b_2=e_1-e_2.
\]

Then the restricted matrices are

\[
C_{A_2}=
\begin{pmatrix}0&-1\\1&-1\end{pmatrix},
\qquad
F_{A_2}=
\begin{pmatrix}1&0\\1&-1\end{pmatrix}.
\]

These obey the same dihedral relations.  Their characters are

| conjugacy class | permutation \(\mathbb R^3\) | trace line | trace-zero \(A_2\) |
|---|---:|---:|---:|
| identity | 3 | 1 | 2 |
| three-cycle | 0 | 1 | -1 |
| reflection | 1 | 1 | 0 |

This is the standard \(1\oplus2\) decomposition of the three-point permutation representation.

## 3. Resolution of the document-955 no-go

The fixed quotient \(L'/L_0\) does not carry \(C_3\), because \(C_3\) moves \(L_0\).  The **space of amplitudes on the orbit** does carry \(C_3\).  Removing its common trace amplitude leaves the desired doublet.

The environment is therefore not made from coordinates inside one quotient.  It records relational amplitude among three admissible lattice placements.

This is directly compatible with the user's relational-carrier language:

- one saturated carrier;
- three lattice placements related by the active rule;
- one common amplitude;
- two trace-zero relational amplitudes;
- the handle acting as reflection of the placement triangle.

## 4. Galois comparison

Document 946 decomposed each triple of ninth-root embeddings as

\[
\mathbb C^3
=\mathbb C\mathbf1
\oplus\mathbf1^\perp.
\]

The same decomposition now appears for lattice placements.  In both cases:

- \(C_3\) permutes three labels;
- the trace line is common mode;
- the trace-zero plane is \(A_2\);
- reflection exchanges conjugate characters.

The representation-level intertwiner is the identity on the abstract permutation module once the three placements are paired with the three Galois embeddings.

What is not yet canonical is that pairing of labels.  A source-native map must say which lattice placement corresponds to which embedding.

## 5. Relation to the minimal environment channel

Document 944 found that \(\chi_1\oplus\chi_2\) is the unique minimum environment that can activate the missing trivial/common character in the balanced selector channel.

The current theorem supplies a concrete origin for that doublet: fluctuations of placement amplitude with zero total sum.  The trace line supplies the common component, while the doublet records redistribution among placements.

This is an exact representation statement.  It does not yet reproduce the loss-dependent Kraus coefficients or prove that physical dissipation literally samples lattice placements.

## 6. What is closed and open

Closed:

- full \(S_3\) action on the three-placement orbit;
- canonical trace plus \(A_2\) decomposition;
- exact character match with the minimal environment and Galois trace-zero plane;
- resolution of why the environment is not the fixed quotient.

Open:

- canonical pairing of placements with Galois embeddings;
- physical amplitudes or probabilities on the placement orbit;
- derivation of the loss-dependent Kraus map from those amplitudes;
- relation of the placement trace line to the two discarded cyclotomic trace singlets;
- Jordan-triple origin of the three-placement orbit.

## 7. Stop-everything and falsification criteria

**Label-intertwiner trigger:** a Galois- and reflection-equivariant rule canonically pairs \(L_0,L_1,L_2\) with the three ninth-root embeddings.

**Kraus trigger:** placement-amplitude elimination produces the exact loss-dependent selector POVM or minimal spectral defect factor.

**Jordan trigger:** the triple product generates the three placements and their permutation action without inserting \(C_3\) by hand.

**Trace trigger:** the placement common line is identified with the physical common-mode response or cyclotomic trace singlet by a typed map.

**Module falsifier:** the trace-zero environment is identified with a fixed quotient rather than the orbit-amplitude plane.

**Physics overclaim:** representation equality is presented as a microscopic dissipative mechanism.

## 8. Verdict

| Question | Verdict |
|---|---|
| Do the three placements carry selector \(C_3\)? | **yes, by permutation** |
| Does the handle supply the reflection? | **yes, fixes one and swaps two** |
| What group acts? | **\(S_3\)** |
| What is the trace-zero sector? | **the standard real \(A_2\) doublet** |
| Does it match the minimal environment character? | **yes, exactly** |
| Does it match the Galois trace-zero character? | **yes, exactly** |
| Is a microscopic amplitude/Kraus mechanism derived? | **not yet** |

## 9. Position in the corpus

- [three-sublattice arithmetic holonomy](955_the_selector_c3_cycles_three_index_four_sublattices_so_the_common_mode_saturation_quotient_is_not_itself_the_a2_environment.md)
- [minimal A2 environment](944_a_unique_minimal_a2_doublet_environment_embeds_the_cyclotomic_source_into_the_balanced_selector_dilation.md)
- [Galois trace-zero carrier](946_galois_covariance_canonically_selects_the_trace_zero_four_plane_and_removes_the_handle_factorization_grassmannian.md)
- [primitive ninth-root trace traversal](947_the_primitive_ninth_root_traverses_the_galois_trace_mode_so_the_trace_zero_carrier_retains_only_its_cubic_shadow.md)
