# The Selector C3 Cycles Three Index-Four Sublattices, So the Common-Mode Saturation Quotient Is Not Itself the A2 Environment

**Date:** 17 October 2026  
**Branches:** saturated handle carrier, active \(C_3\), quotient equivariance, arithmetic holonomy, Galois traversal, and common-mode environment  
**Claim status:** exact quotient-intertwiner no-go and three-sublattice orbit theorem  
**Certificate:** [show_the_selector_c3_cycles_three_index_four_sublattices_instead_of_acting_on_one_saturation_quotient.mjs](scripts/show_the_selector_c3_cycles_three_index_four_sublattices_instead_of_acting_on_one_saturation_quotient.mjs)

## Executive result

Document 954 conditionally selected the unique common-mode saturation

\[
L\subset L',
\qquad L'/L\cong\mathbb F_2^2.
\]

It was tempting to identify that quotient directly with the \(A_2\) environment doublet of document 944.  The exact equivariance test closes that naïve identification negatively.

Transport the established selector \(C_3\) through the unimodular saturated handle isomorphism.  Its action \(A\) on \(L'\) is integral and satisfies

\[
A^3=I.
\]

But \(A\) does not preserve the original sideband lattice \(L\).  In the original basis its matrix has half-integral entries.  Therefore \(A\) does not induce an action on the fixed quotient \(L'/L\).

Instead,

\[
L_0=L,
\qquad L_1=AL,
\qquad L_2=A^2L
\]

are three distinct index-four sublattices cyclically permuted by \(A\).

Modulo \(2L'\), their three planes have trivial common intersection and together span all of \(L'/2L'\).  The active \(C_3\) is therefore an arithmetic holonomy among three lattice placements, not an internal action on one saturation quotient.

## 1. Integral action on the saturated carrier

In the saturated basis of document 953, the transported selector generator is

\[
A=
\begin{pmatrix}
1&1&0&-1\\
0&0&0&1\\
0&1&1&2\\
0&-1&0&-1
\end{pmatrix},
\qquad A^3=I.
\]

Thus the primitive handle carrier and active order-three action coexist integrally after saturation.

The original sideband lattice has basis matrix \(Q\) inside \(L'\) with determinant four.  Conjugating \(A\) back to that basis gives entries in \(\frac12\mathbb Z\), including genuine odd halves.  Hence

\[
A(L)\ne L.
\]

## 2. Three-sublattice orbit

The image of \(L/2L'\) in \(L'/2L'\cong\mathbb F_2^4\) is a two-plane \(S_0\).  Reducing \(A\) modulo two produces

\[
S_0\longmapsto S_1\longmapsto S_2\longmapsto S_0,
\]

with all three planes distinct.

The executable census verifies

\[
S_0\cap S_1\cap S_2=\{0\},
\qquad
\operatorname{span}(S_0\cup S_1\cup S_2)=\mathbb F_2^4.
\]

Thus the three placements collectively explore the whole saturated mod-two carrier.

## 3. Consequence for the A2 environment bridge

The quotient \(L'/L\) is two-dimensional, as is the minimal \(A_2\) environment.  Both are selected by common-mode criteria.  But dimensions and selection roles are insufficient:

- the environment doublet carries a fixed \(C_3\rtimes C_2\) representation;
- the quotient \(L'/L\) carries no selector \(C_3\) action because its denominator lattice moves.

Therefore no equivariant isomorphism can identify them as fixed modules in the current construction.

A viable bridge must instead use one of:

1. the full three-sublattice orbit as a groupoid/permutation object;
2. a larger module retaining the lattice placement label;
3. an invariant intersection or induced representation after adding further modes;
4. a different sublattice selected jointly by \(C_3\) and the handle;
5. a noninvertible channel rather than a module isomorphism.

## 4. Relation to Galois trace traversal

This result parallels document 947 without identifying the mechanisms:

- the primitive ninth root traverses the Galois trace mode while its cube preserves the trace-zero carrier;
- here the selector \(C_3\) traverses three lattice placements while acting integrally on the saturated carrier.

Both say that a smaller retained object may fail to carry the finer action even though the enlarged object does.  A common induced-representation description is now a credible research target.

## 5. What this closes and opens

Closed negatively:

- direct identification of \(L'/L\) with the fixed \(A_2\) environment module;
- any claim that the selector \(C_3\) descends to that quotient.

Opened positively:

- an exact order-three orbit of three index-four lattice placements;
- a finite arithmetic-holonomy object on which the selector acts;
- a possible induced/groupoid bridge to Galois traversal and character environments.

## 6. Stop-everything and falsification criteria

**Orbit-environment trigger:** the document-944 environment is intertwined with the permutation/induced representation of the three sublattices rather than one quotient.

**Invariant-lattice trigger:** a physically typed \(C_3\)-stable index-four sublattice is found and still satisfies the handle and common-mode constraints.

**Galois trigger:** the three lattice placements are mapped canonically to the three embeddings over a cubed character.

**Quotient falsifier:** a \(C_3\) action is written on \(L'/L\) without first proving \(A(L)=L\).

**Dimension overclaim:** two real or mod-two dimensions are used as evidence of module equality.

## 7. Verdict

| Question | Verdict |
|---|---|
| Is selector \(C_3\) integral on the saturated carrier? | **yes** |
| Does it preserve the original sideband lattice? | **no** |
| Does it act on the fixed quotient \(L'/L\)? | **no** |
| What does it act on arithmetically? | **a three-cycle of index-four sublattices** |
| Do their mod-two planes cover the saturated carrier? | **yes, in span; common intersection is zero** |
| Is the quotient itself the fixed \(A_2\) environment? | **no, not equivariantly** |

## 8. Position in the corpus

- [conditional common-mode saturation](954_fourier_locality_and_both_channel_common_mode_reduce_the_fifteen_handle_saturations_to_the_unique_p_induced_plane.md)
- [minimal A2 environment channel](944_a_unique_minimal_a2_doublet_environment_embeds_the_cyclotomic_source_into_the_balanced_selector_dilation.md)
- [ninth-root Galois trace traversal](947_the_primitive_ninth_root_traverses_the_galois_trace_mode_so_the_trace_zero_carrier_retains_only_its_cubic_shadow.md)
- [primitive saturated handle carrier](953_an_index_four_saturation_turns_the_realified_twist_into_the_primitive_selector_handle_but_fifteen_symplectic_saturations_compete.md)
