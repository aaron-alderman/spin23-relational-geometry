# The authored rail grading closes the local Clifford cell but opens a co-incidence channel

**Date:** 26 October 2026
**Status:** exact source-native rail closure and doubled-response consequence on the 304-dimensional Claimipedia carrier; the current-source global semantic adjoint is exhausted negatively, while physical action remains open
**Parents:** [typed two-rail lift](admissibility_126_typed_two_rail_positive_lift_preserves_the_mirror_face.md), [local Clifford comparator](admissibility_130_quarter_turn_and_mirror_generate_the_dual_seam.md)
**Evidence:** [source-native rail closure](../../../evidence/data/claimipedia-source-native-clifford-rail-closure-v1.json)
**Verifier:** [executable rail certificate](../../../verification/admissibility/verify_claimipedia_source_native_clifford_rail_closure.mjs)

## The missing operator was already typed

The free Claimipedia carrier is

\[
\mathcal H_{\rm rel}
=\mathbb R^V\otimes\mathbb R^{\{S,T\}}
\otimes\mathbb R^{\mathcal T}.
\]

AZ-126 treated the source/target exchange

\[
J=\begin{pmatrix}0&1\\1&0\end{pmatrix}
\]

as the only source-native rail operator. But authored source and target roles
also define a grading, without reference to any desired symmetry:

\[
G=\begin{pmatrix}-1&0\\0&1\end{pmatrix}.
\]

The sign is not imported after the fact. It is the same signed distinction
already used by every incidence ray

\[
d_{u\to v,t}=|v,T,t\rangle-|u,S,t\rangle.
\]

The two authored operators obey

\[
G^2=J^2=1,
\qquad GJ=-JG.
\]

Their product is therefore a canonical quarter-turn on every node-by-type
rail fibre:

\[
I=GJ=\begin{pmatrix}0&-1\\1&0\end{pmatrix},
\qquad I^2=-1,
\qquad IJ=-JI.
\]

Thus the AZ-130 source-native algebraic gate passes:

\[
\boxed{\operatorname{alg}_{\mathbb R}(I,J)
=Cl(1,1)\cong M_2(\mathbb R)}.
\]

Globally this is the same local algebra acting on each of the 152
node-by-relation-type fibres. It is not 152 independent physical symmetries;
the node and type coordinates are spectators until the source supplies a
composition law or action that couples them.

## The dual rungs are source and target transfers

The two null mixtures are

\[
N_+=\frac{J+I}{2}=|T\rangle\langle S|,
\qquad
N_-=\frac{J-I}{2}=|S\rangle\langle T|.
\]

They satisfy

\[
N_\pm^2=0,
\qquad
N_+N_-+N_-N_+=1,
\qquad
[N_+,N_-]=G.
\]

This gives the ladder language an exact Claimipedia meaning. The rungs are
within-fibre transfers between authored source and target roles. Applied to an
edge ray they isolate its endpoints:

\[
N_+d_{u\to v,t}=-|u,T,t\rangle,
\qquad
N_-d_{u\to v,t}=|v,S,t\rangle.
\]

They are not yet graph paths. A path moves between named nodes through
authored relations; a rail rung moves the role label of one endpoint while
holding its node and relation type fixed.

## The surprise is the second kernel

Define the unsigned co-incidence ray

\[
c_{u\to v,t}=|v,T,t\rangle+|u,S,t\rangle
\]

and its positive kernel

\[
K_+=\sum_e c_ec_e^T.
\]

The original AZ-126 relation kernel is the signed incidence kernel

\[
K_-=\sum_e d_ed_e^T.
\]

The authored grading and quarter-turn do not preserve (K_-). Instead,

\[
Gd_{u\to v,t}=c_{u\to v,t},
\qquad
Id_{u\to v,t}=-c_{v\to u,t},
\]

so that

\[
GK_-(\Gamma)G^T=K_+(\Gamma),
\qquad
IK_-(\Gamma)I^T=K_+(\Gamma^{\rm rev}).
\]

The quarter-turn is therefore real and source-native, but it is an
**inter-channel operator**: it rotates relational difference into relational
co-presence. This is the precise version of the intuition that the second
rail resembles a configuration channel. The signed channel records “what
changes across the relation”; the unsigned channel records “which two typed
roles jointly participate.” Both are positive Gram constructions, but only
the first reconstructs the authored directed adjacency through its negative
source-target block.

## Why the scalar quotient cannot see it

Let (C=(1\;1)) identify the two rails. Its kernel is the anti-diagonal rail
direction. The quarter-turn sends that direction to the diagonal:

\[
I(1,-1)^T=(1,1)^T.
\]

Therefore (I) does not preserve \(\ker C\) and cannot descend to an operator
on the scalar support quotient. The mirror (J) does descend, but becomes
trivial after the two roles are identified. The ordinary Laplacian is not a
compressed copy of the local Clifford cell; it is the quotient that erases
the cell.

## What closes and what remains open

The corpus can now close four questions:

1. A negative-square partner exists on the live typed carrier.
2. It is derived from authored source/target grading and mirror exchange.
3. It anticommutes with the mirror and derives both dual-number rungs.
4. The rungs and quarter-turn are destroyed by the scalar rail quotient.

Four stronger claims are not supplied by this local closure:

1. (I) is not an endomorphism of the original positive incidence kernel;
   it opens the complementary co-incidence channel.
2. No authored path product says that a within-fibre rung is time evolution,
   causal propagation or a semantic reverse relation.
3. AZ-134 subsequently proves that no global relation-type adjoint pairs
   Supports, Challenges, DependsOn and Qualifies on the current source.
4. No action, scale, detector or held-out observation makes the local
   (Cl(1,1)) cell physical.

This corrects the earlier statement that the live carrier did not supply a
negative-square operator. It does. What it does not supply is invariance of
the selected response kernel under that operator.

## Subsequent closure and remaining gate

Form the doubled response

\[
\mathcal K=K_-\oplus K_+
\]

and ask whether the authored path algebra supplies a product and semantic
adjoint that exchange the two blocks consistently with (I,J,G,N_+,N_-).
The test must reserve an orientation-sensitive relation record before fitting.
A pass would close the graph-to-two-channel operator bridge. A failure would
leave the local Clifford cell as exact role geometry rather than dynamics.

AZ-133 constructs the doubled response and proves that its scalar shadows
detect odd-cycle topology. AZ-134 then exhausts every involution of the four
relation types and finds no global semantic adjoint: only the two-record
Spin--Temple cell reverses, while 41 records remain unmatched. The
current-source path-star route is therefore negatively complete. Reopening
requires new authored reverse semantics, an external contravariant functor or
a device dictionary with held-out reverse-path predictions.
