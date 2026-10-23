# The Minimal Lorentz Vector Supermultiplet Has an Unavoidable Three-Plus-Three Kinetic Signature

**Date:** 23 October 2026

**Status:** exact algebraic obstruction to the minimal new four-gate parent

**Depends on:** [the known independent-connection exhaustion](1782_known_locally_supersymmetric_independent_connection_parents_are_exhausted_at_a_new_vacuum_and_spectrum.md)

**Evidence:** [Lorentz-supermultiplet ledger](../../../evidence/data/spin23-lorentz_vector_supermultiplet_kinetic_audit-v1.json) and [verifier](../../../verification/verify/verify_spin23_lorentz_vector_supermultiplet_kinetic_audit.mjs)

## Minimal construction attempt

The most economical new parent would treat the independent Lorentz connection
as an ordinary (N=1) Yang--Mills vector supermultiplet.  This would provide a
connection, a gaugino partner and local supersymmetry without first inventing a
large gravitational tensor calculus.

The proposal fails at the free kinetic level because (SO(1,3)) is noncompact.
In a rotation/boost basis ((J_i,K_i)),

\[
 [J_i,J_j]=\epsilon_{ijk}J_k,qquad
 [J_i,K_j]=\epsilon_{ijk}K_k,qquad
 [K_i,K_j]=-\epsilon_{ijk}J_k.
\]

Direct contraction of the structure constants gives

\[
 B_{AB}=f_{AC}{}^D f_{BD}{}^C
 =\operatorname{diag}(-4,-4,-4,+4,+4,+4).
\]

Thus the ordinary adjoint Yang--Mills kinetic form assigns opposite signs to
the three rotation and three boost directions.

## The second invariant does not help

Allowing the second real Lorentz-invariant bilinear produces, for each spatial
index, the general block

\[
 4\begin{pmatrix}-a&b\\ b&a\end{pmatrix}.
\]

Its eigenvalues are

\[
 \lambda_\pm=\pm4\sqrt{a^2+b^2}.
\]

Every nonzero invariant real symmetric kinetic form therefore has signature
((3,3)).  No choice of the ordinary gauge kinetic function makes all six
connection directions positive.

Supersymmetry does not repair this sign.  It uses the same gauge-index kinetic
metric for the vector, gaugino and auxiliary components, pairing negative-sign
directions into supermultiplets rather than projecting them out.

## Why the escapes are not the minimal model

A nonlinear realization can use a field-dependent positive metric after
breaking to a compact subgroup, but then new Higgs/coset fields and a chosen
vacuum enter.  Tetrad-dependent PGT contractions avoid pure Yang--Mills form,
but return to the special invariant and nonlinear-constraint problem already
audited.  A complex self-dual connection introduces reality conditions, and
odd-dimensional Chern--Simons supergravity changes the dimension and requires
a reduction.

These remain possible enlarged constructions.  They do not rescue the
ordinary Lorentz vector-supermultiplet proposal.

## Sources

- B. Julia and J.-F. Luciani, [*Nonlinear realizations of compact and noncompact gauge groups*](https://doi.org/10.1016/0370-2693(80)90739-X), for positive Hamiltonians obtained only after nonlinear realization and reduction to a compact linearly realized subgroup.
- F. Ferrari, [*Extended N=1 super Yang--Mills theory*](https://arxiv.org/abs/0709.0472), for the (N=1) gauge-kinetic superfield structure.
- M. Chiodaroli et al., [*Non-compact gauge groups, tensor fields and Yang--Mills--Einstein amplitudes*](https://arxiv.org/abs/2312.17212), for the distinction between nonviable ordinary noncompact Yang--Mills groups and noncompact supergravity gaugings broken to compact subgroups around perturbative vacua.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_lorentz_vector_supermultiplet_kinetic_audit.mjs
~~~
