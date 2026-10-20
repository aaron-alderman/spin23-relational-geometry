# No Carrier Operator Can Safely Sew the Typed Wheels, but One Coefficient Line Can

**Date:** 20 October 2026

**Gates:** A2, A5 and A6

**Status:** exhaustive smallest-sector sewing classification; formal coefficient equalizer constructed, physical source not derived

**Depends on:** [the Jordan/Spin(2,3) multiplicity obstruction](1518_the_available_Jordan_Spin23_data_force_multiplicity_one_only_by_reopening_the_Sp6_mixed_relation.md), [the physical carrier underdetermination](1517_the_sourced_pati_salam_skeleton_has_four_relational_lifts_but_physical_SAT_is_underdetermined_by_two_rows.md), [the opposite-anchor split](../1100-1199/1127_opposite_anchor_typing_splits_the_Sp6_envelope_into_two_local_Spin23_relational_wheels.md), [the degree-two junk theorem](../1400-1499/1492_degree_two_junk_kills_the_induced_cross_edges_in_the_real_completed_null_mask_path.md), and [complete typed Schur composition](1515_complete_Schur_composition_is_associative_but_matrix_lowering_forgets_primitive_versus_composite_provenance.md)

**Evidence:** [cross-anchor sewing ledger](../../../evidence/data/spin23-cross-anchor-sewing-exhaustion.json) and [exhaustive verifier](../../../verification/verify/verify_spin23_cross_anchor_sewing_exhaustion.mjs)

## Result

The primary reopening datum of claim 1518 can be exhausted at the smallest
two-sector level.

Let

\[
V_D\cong\mathbb C^2,
\qquad
V_M\cong\mathbb C^2
\]

carry the two irreducible typed relation algebras

\[
A_0=M_2(\mathbb C)_D\oplus M_2(\mathbb C)_M.
\]

Their commutant is \(\mathbb C\oplus\mathbb C\). Consider every ordinary
linear cross-anchor sewing

\[
S:V_D\longrightarrow V_M
\]

and adjoin it with its reverse as a carrier operator. There are only three
rank classes.

1. \(S=0\) preserves noncomposability but leaves two scalars.
2. Every rank-one \(S\ne0\) equates the scalars but generates
   \(M_4(\mathbb C)\).
3. Every rank-two \(S\) does the same.

The reason is exact:

\[
\boxed{\operatorname{span}\!\bigl(M_2(\mathbb C)\,S\,M_2(\mathbb C)\bigr)=M_2(\mathbb C)
\quad\text{for every }S\ne0.}
\]

Once one cross block is present, the two local full matrix algebras move its
nonzero entry to every cross-block position. Together with its reverse, the
generated algebra is all of \(M_4(\mathbb C)\). In particular the mixed
\(I-N\) support becomes algebraically composable.

On the actual primitive relation-sector assignment, a direct \(D\)-to-\(M\)
block also crosses the unique relation sheets, so

\[
\boxed{\{\Gamma_{\rm rel},T_S\}=0.}
\]

It cannot be an allowed \(\Gamma_{\rm rel}\)-even carrier operator.

There is nevertheless a smallest formally viable sewing. It is not an
operator between the carriers. Introduce one common coefficient line \(L\)
and nonzero embeddings into the two local coupling lines:

\[
L\xrightarrow{\iota_D}L_D,
\qquad
L\xrightarrow{\iota_M}L_M.
\]

In bases this is simply

\[
\boxed{y=\kappa d,\qquad\kappa\ne0.}
\]

Every mediator packet then has

\[
(d_i,y_i)=\lambda_i(1,\kappa),
\]

so all packets share one projective Schur ray. Because the equalizer relates
coefficient functors and adds no carrier arrow, the two relation sectors
remain noncomposable and their mixed product remains zero.

This is an explicit minimal categorical middle. It is also exactly a
single-common-source or single-spurion axiom. The present physical carrier
does not derive the line \(L\) or its two embeddings.

## 1. Exhaustion of ordinary carrier sewings

Write the self-adjoint cross operator on \(V_D\oplus V_M\) as

\[
T_S=
\begin{pmatrix}
0&S\\
S^\dagger&0
\end{pmatrix}.
\]

Before sewing, every commuting endomorphism is

\[
K=\lambda_D I_D\oplus\lambda_M I_M.
\]

The equation \([K,T_S]=0\) is

\[
(\lambda_D-\lambda_M)S=0.
\]

Thus any nonzero \(S\) reduces the commutant to the diagonal scalar line.
This looks like the desired multiplicity-one result, but support closure
decides the test in the opposite direction.

Choose any nonzero entry \(S_{ab}\). Left and right multiplication by local
matrix units extracts it and moves it arbitrarily:

\[
E_{ia}^{(D)}S E_{bj}^{(M)}=S_{ab}E_{ij}^{(D,M)}.
\]

All \(D\)-to-\(M\) matrix units are generated. The reverse block supplies all
\(M\)-to-\(D\) units. Hence

\[
\operatorname{Alg}\langle A_0,T_S\rangle=M_4(\mathbb C).
\]

The result does not distinguish rank one from rank two. Even the apparently
minimal carrier-to-carrier map is enough to erase the type separation.

## 2. Finite exhaustive audit

The verifier enumerates every nonzero real \(2\times2\) matrix with entries
in \(\{-1,0,1\}\). Among the 80 candidates:

- 32 have rank one;
- 48 have rank two;
- 8 are chirality even;
- 8 are chirality odd;
- 64 mix the two KO-degree classes.

Every one of the 80 nonzero candidates:

- reduces the aggregate carrier commutant from dimension two to one;
- generates a 16-dimensional complex associative algebra, namely
  \(M_4(\mathbb C)\);
- contains the mixed \(I_D\)-to-\(N_M\) matrix unit in its closure;
- is odd under the primitive-sector relation parity.

The finite enumeration is not the proof of the general theorem; it checks
all rank and grading strata against the exact matrix-unit argument.

## 3. Reality, grading and Pati--Salam covariance do not rescue an operator

### Reality

Any complex \(S\) can be completed on the \(J\)-conjugate relation sheet by
\(\bar S\). The doubled operator is \(J\)-equivariant. Reality therefore does
not force \(S=0\).

### KO chirality

With the two-state grading \(\gamma_0=\operatorname{diag}(1,-1)\), diagonal
\(S\) are chirality even and off-diagonal \(S\) are chirality odd. Both
nonzero classes exist, and both generate the same full support algebra.
Chirality selects a subspace of candidates but does not select a safe one.

### Relation-sheet parity

The primitive Dirac sector and primitive Majorana sector of claim 1127 sit
on opposite \(\Gamma_{\rm rel}\) sheets; their \(J\)-partners reverse the
assignment. Every direct primitive-sector block is therefore relation-sheet
odd. Since the allowed finite support must commute with
\(\Gamma_{\rm rel}\), the only parity-preserving direct sewing is \(S=0\).

### Pati--Salam covariance

If the endpoint relation spaces multiply equivalent Pati--Salam carriers,
then \(S\otimes I_{PS}\) is a gauge scalar. The full-matrix closure theorem
is unchanged. If the carriers are inequivalent, Schur's lemma makes the
Pati--Salam-scalar Hom space zero. The dichotomy is therefore:

\[
\boxed{
\text{inequivalent carriers: no sewing};\qquad
\text{equivalent carriers: unsafe ordinary sewing}.}
\]

Gauge covariance alone supplies no third branch.

## 4. Junk qualification: a positive toy result that does not lift

There is one instructive qualification. Ignore the actual relation-sheet
assignment and restrict the cross operator to a single \(P_D-P_M\) edge.
The support graph becomes the four-state chain

\[
I_D-P_D-P_M-N_M.
\]

The mixed \(I_D-N_M\) endpoint is a length-three composite. Extending the
canonical diagonal-path calculation of claim 1492 gives

\[
\dim\pi_D(\Omega^3)=8,
\qquad
\dim\pi_D(d\ker\pi_D|_{\Omega^2})=8,
\]

and hence

\[
\boxed{\Omega_D^3(\mathbb C^4)=0.}
\]

The length-three endpoint is therefore junk in that toy differential
quotient.

This does not rescue the physical carrier sewing. The primitive
\(P_D-P_M\) edge is relation-sheet odd on the actual KO-6 labels. Moving it
onto one sheet requires a regraded or stabilized carrier, and the
matrix-valued physical junk quotient for that enlargement has not been
computed. The correct bounded conclusion is:

- ordinary sewing destroys noncomposability immediately;
- canonical path junk can remove the induced endpoint afterward;
- the actual parity forbids the primitive sewing before that rescue can be
  used.

## 5. The viable coefficient-line equalizer

Let \(L_D\) and \(L_M\) be the one-dimensional local coefficient spaces of
the two irreducible relation sectors. Define a common line \(L\) and two
nonzero maps

\[
\iota_D:L\to L_D,
\qquad
\iota_M:L\to L_M.
\]

After choosing bases,

\[
\iota_D(\lambda)=d_0\lambda,
\qquad
\iota_M(\lambda)=y_0\lambda,
\]

with \(d_0y_0\ne0\). The aggregate coupling space is the image

\[
L\longrightarrow L_D\oplus L_M,
\qquad
\lambda\longmapsto\lambda(d_0,y_0),
\]

and is exactly one-dimensional.

For several mediator copies,

\[
v_i=\lambda_i(d_0,y_0)^T,
\]

so every minor vanishes identically:

\[
d_i y_j-d_j y_i=0.
\]

This is the common-source factorization required by claims 1509, 1510 and
1515.

The compatible endomorphisms of the sewn coefficient diagram are pairs
\((\mu_D,\mu_M)\) satisfying

\[
\mu_M\iota_M=\iota_M\mu,
\qquad
\mu_D\iota_D=\iota_D\mu,
\]

and hence \(\mu_D=\mu_M=\mu\). Its aggregate coefficient commutant is one
complex dimension.

The distinction from an operator sewing must remain explicit:

\[
\boxed{
\begin{array}{l}
\text{sewn coefficient-diagram commutant: dimension }1,\\
\text{underlying typed carrier commutant: dimension }2.
\end{array}}
\]

The construction derives the common coupling ray conditional on the common
line. It does not turn the two carrier representations into one irreducible
representation.

## 6. Compatibility of the coefficient sewing

**Reality.** On the \(J\)-partner sheet use the conjugate embeddings. If the
ratio on one sheet is \(\kappa=y_0/d_0\), the partner ratio is
\(\bar\kappa\). This is exactly \(J\)-equivariant.

**Grading.** The equalizer is degree zero because it acts on coefficient
lines, not between chirality-graded carrier states.

**Relation parity.** It is sheet even: it relates the two coefficient
functors without inserting a cross-sheet matrix block.

**Pati--Salam covariance.** The coefficient lines multiply the already-fixed
Pati--Salam Clebsch intertwiners. Taking them as trivial gauge lines makes
both embeddings scalar covariants.

**Mixed support.** No new one-arrow is added. Therefore

\[
X_DX_M=X_MX_D=0
\]

remains exact on the typed carrier. The existing represented differential
calculus and junk ideal are unchanged.

Every nonzero map between two one-dimensional coefficient lines is
equivalent to this construction after changing bases. With fixed Hermitian
normalizations, the remaining ratio has a magnitude and phase; reality pairs
its phase with the conjugate sheet rather than fixing it by itself.

## 7. Minimality and physical meaning

Before sewing, compatible coefficient endomorphisms form
\(\mathbb C^2\). Reducing them to the diagonal \(\mathbb C\) requires one
independent compatibility equation. A single nonzero line equalizer supplies
exactly one equation and changes no carrier support. It is therefore the
smallest non-carrier enlargement.

Physically, however, it is not free. It says that the selected Dirac and
Majorana portal coefficients descend from one source:

\[
\boxed{\text{one common coefficient line}\equiv
\text{one common spurion/matching source}.}
\]

This is the single-spurion escape already isolated abstractly by the
generation-commutant no-go. The new result shows why it must be implemented
above the carrier-arrow level: an ordinary cross-anchor operator destroys
the very type separation it is meant to preserve.

## Exact reopening datum

To promote the formal equalizer, the physical theory must supply:

1. one source coefficient object \(L\), such as a correspondence-module
   map, boundary datum, normalizer spurion or universal matching object;
2. nonzero normalized embeddings into the actual selected Dirac and
   Majorana Pati--Salam Hom lines;
3. their complete \(J\)-partners without a \(\Gamma_{\rm rel}\)-odd carrier
   edge;
4. the family-anchor action and spectator connector rows left open by claim
   1517;
5. a physical junk calculation showing no independent mixed primitive;
6. loop tangency preserving the one-dimensional equalizer.

Two independent source lines falsify the construction immediately, as does
any implementation requiring a nonzero direct carrier sewing.

## Boundaries

**Bounded-sector boundary:** the operator theorem assumes each local relation
sector carries its full irreducible \(M_2(\mathbb C)\) envelope. This is the
smallest faithful complex carrier of the two H2 wheels.

**Coefficient-versus-carrier boundary:** dimension one for the sewn
coefficient diagram is not dimension one for the underlying Hilbert
commutant.

**Junk boundary:** the new degree-three result is exact for the canonical
diagonal \(\mathbb C^4\) path only. It cannot be imported into a physical
matrix-valued triple without recomputation.

**Dynamics boundary:** a common line is technically useful but is not
natural until an action or representation principle sources it and loops
preserve it.

**Phenomenology boundary:** the fixed ratio \(\kappa\) is not calculated by
this construction.

## Verdict

The smallest cross-anchor search ends with a construction/no-go pair:

\[
\boxed{
\begin{array}{ll}
\text{ordinary carrier sewing }S\ne0:&
\operatorname{Comm}=\mathbb C\text{ but }\operatorname{Alg}=M_4,
\text{ and }S\text{ is }\Gamma_{\rm rel}\text{-odd};\\[1mm]
\text{coefficient-line equalizer}:&
\dim L=1,\ \operatorname{rank}V=1,
\text{ and mixed carrier support remains absent}.
\end{array}}
\]

There is no viable ordinary carrier operator in the bounded model. There is
a unique minimal formal sewing type: one common coefficient line feeding the
two typed portal lines. This is now the precise object the physical
family-anchor or correspondence construction must derive.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_cross_anchor_sewing_exhaustion.mjs
node verification/verify/verify_spin23_jordan_aggregate_multiplicity_one_audit.mjs
node verification/verify/verify_spin23_null_mask_path_degree_two_junk.mjs
~~~
