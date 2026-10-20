# The Minimal Ward Completion Is a Parallel Master-Source Bundle, but No Sourced Typed Intertwiner Realizes It

**Date:** 20 October 2026

**Gates:** A2, A5 and A6

**Status:** exact source-module and threshold theorem; sourced Spin(2,3)/Pati--Salam realization UNSAT within the present typed carrier; a new normalized intertwiner remains the reopening datum

**Depends on:** [the portal-label fixed-line minimum](1528_the_minimal_portal_label_symmetry_is_a_Z2_fixed_line_but_its_metric_and_physical_lift_remain_new_data.md), [the source-versus-Ward no-go](1531_the_portal_label_Z2_is_a_source_projection_not_a_Ward_symmetry_without_a_typed_operator_exchange.md), [the RG tangency theorem](1530_the_common_coefficient_line_is_RG_invariant_only_under_universal_projective_flow_and_a_fixed_ratio_requires_a_Ward_eigenline.md), [the branch-projector/transporter boundary](1544_breaking_projectors_can_select_the_shared126_masks_but_only_a_rank_one_family_partial_isometry_can_make_their_coefficient_common.md), and [the anchored partial-isometry classification](1546_the_Majorana_anchor_contains_the_P_to_N_partial_isometry_line_but_not_a_canonical_transporter.md)

**Evidence:** [Ward/intertwiner ledger](../../../evidence/data/spin23-ward-counterterm-intertwiner-no-go.json) and [deterministic verifier](../../../verification/verify/verify_spin23_ward_counterterm_intertwiner_no_go.mjs)

## Result

There is a unique minimal abstract completion of the common portal line as a
one-dimensional counterterm module.  It is not merely a relation between two
numbers.  It is a one-dimensional master-source bundle \(\ell\), an isometric
embedding into the normalized completed-operator source space,

\[
 \iota:\ell\longrightarrow E=\mathbb C\mathcal O_D\oplus
 \mathbb C\mathcal O_M,
 \qquad
 \iota(1)=c_+=\frac1{\sqrt2}(1,1)^T,
\]

and the reflection

\[
 W=2\iota\iota^\dagger-1
 =\begin{pmatrix}0&1\\1&0\end{pmatrix}.
\]

The line is a renormalized submodule exactly when the RG connection, every
additive pole and every threshold map preserve \(\operatorname{im}\iota\).
For a counterterm matrix and a threshold matrix

\[
 A=\begin{pmatrix}a&b\\q&d\end{pmatrix},
 \qquad
 T=\begin{pmatrix}\alpha&\beta\\\gamma&\delta\end{pmatrix},
\]

the two local tests are

\[
 \boxed{q+d-a-b=0},
 \qquad
 \boxed{\gamma+\delta-\alpha-\beta=0}.
\]

These are the beta-function tangency and threshold-intertwining equations.
They must hold at every scale and every matching surface; a cancellation
only after multiplying several threshold maps is not a local Ward law.

An exact non-anomalous exchange symmetry would enforce this package.  But it
must exchange the two **typed completed operators**, not just their source
coordinates.  The sourced Spin(2,3)/Pati--Salam model has no such
intertwiner.  Its physical symmetries preserve the Dirac
particle--particle/bidoublet complex and the Majorana
particle--conjugate/singlet-or-triplet complex as distinct summands.  On the
two operator labels this is a typing observable

\[
 K=\operatorname{diag}(1,-1).
\]

Every sourced typing-preserving action commutes with \(K\), whereas

\[
 WKW=-K.
\]

Therefore no such action induces \(W\).  Spin(2,3), ordinary Pati--Salam
parity, CP and \(J\) do not repair the obstruction.  A new off-diagonal
spurion can write the required intertwiner, but then its orientation,
normalization, RG equation and threshold transport are precisely the new
data to be explained.

Hence

\[
\boxed{
\begin{array}{ll}
\text{minimal abstract Ward module:}&\mathrm{SAT},\\
\text{sourced typed operator exchange:}&\mathrm{UNSAT},\\
\text{spurion completion:}&\mathrm{CONDITIONAL\ INPUT}.
\end{array}}
\]

## 1. The exact one-dimensional module

Let \(L=\operatorname{span}(c_+)\) and let
\(c_-=(1,-1)^T\) represent the quotient \(E/L\).  A local multiplicative
counterterm preserves \(L\) iff

\[
 A c_+\in L
 \quad\Longleftrightarrow\quad
 \det(c_+,Ac_+)=q+d-a-b=0.
\]

Every additive pole \(s\) must separately obey

\[
 \det(c_+,s)=0.
\]

This is the missing quotient condition: the component of the beta vector in
\(E/L\) must vanish.  In bundle language, \(L\subset E\) must be a parallel
line subbundle of theory space.

The reflection \(W=2\Pi_L-1\) is unique once the Hermitian metric and the
normalized line are fixed.  Its fixed space is exactly \(L\).  If every
counterterm respects the Ward action, then

\[
 [A,W]=0
 \quad\Longrightarrow\quad
 A=\begin{pmatrix}u&v\\v&u\end{pmatrix},
\]

and both exchange eigenspaces are invariant.  Restricting sources to the
Ward-invariant sector removes \(c_-\), leaving one counterterm generator.
This is the precise positive mechanism anticipated but not supplied in
claim 1530.

Commutation is sufficient, not necessary, for tangency.  In the bounded
integer audit, 19 of 81 matrices preserve \(L\), while only 9 commute with
\(W\).  A Ward identity is stronger than an accidental tangent beta
function because it also controls insertions and additive poles.

## 2. Thresholds are part of the same theorem

Let \(\iota_+\) and \(\iota_-\) be the source embeddings immediately above
and below a threshold.  Matching preserves a one-dimensional module iff

\[
 T\iota_+=\iota_-\tau
\]

for some scalar matching coefficient \(\tau\).  If the same canonical
equal line is used on both sides, this becomes

\[
 \det(c_+,Tc_+)=\gamma+\delta-\alpha-\beta=0.
\]

In the physically common diagonal case,

\[
 T=\operatorname{diag}(t_D,t_M),
\]

the criterion reduces to

\[
 \boxed{t_D=t_M}.
\]

Thus equality at a parent scale is not enough.  Distinct Clebsch factors,
wave-function residues, vacuum normalizations or decoupling corrections
rotate the line unless they obey the same intertwining equation.  Allowing
the line itself to change replaces a fixed prediction by a transported
spurion profile.

## 3. What a physical exchange would require

Write the typed operator complexes as \(C_D\) and \(C_M\).  A genuine
exchange needs an invertible map

\[
 U:C_D\longrightarrow C_M
\]

that respects gauge action, kinetic pairing, grading, \(J\), CP and all
threshold identifications.  It would induce

\[
 W_U=
 \begin{pmatrix}
 0&U^{-1}\\U&0
 \end{pmatrix},
 \qquad W_U^2=1.
\]

On one-dimensional normalized label lines this is the weighted reflection

\[
 W_u=\begin{pmatrix}0&u^{-1}\\u&0\end{pmatrix},
 \qquad
 \operatorname{Fix}(W_u)=\operatorname{span}(1,u)^T.
\]

It is unitary only after the relative operator metric and \(|u|\) have been
fixed.  The equal line is the special case \(u=1\).

The source action must be contragredient to this operator action, as proved
in claim 1531.  An exchange acting on numerical couplings alone supplies no
Ward identity.  The required \(U\) is therefore not an abstract map between
two gauge-contracted scalar expressions.  It must be a lift through their
constituent field complexes.

## 4. Typed-intertwiner no-go

The current carrier has a central physical distinction between the two
complexes:

| datum | \(C_D\) | \(C_M\) |
|---|---|---|
| scalar branch | Pati--Salam bidoublet | singlet or right triplet |
| finite support | particle--particle arrow | particle--conjugate defect |
| family dressing | Dirac marked branch | \(-3\)-dressed Majorana branch |
| vacuum/threshold | \(v_H,Z_D\) | \(v_S,Z_M\) |

Encode the two typed summands by \(K=\operatorname{diag}(1,-1)\).  Any
symmetry that preserves the sourced gauge representation, finite grading
and anchor typing obeys

\[
 [G,K]=0,
\]

so its action on \(E\) is block diagonal.  The desired reflection instead
obeys \(WKW=-K\).  It exchanges the types rather than preserving them.

The deterministic audit makes the finite core explicit.  Among the six
signed-permutation involutions on two labels, four preserve \(K\).  None of
those four has a one-dimensional fixed space supported on both labels.  The
two exchange involutions do have mixed fixed lines, but fail the typing
test.

This is the precise dichotomy:

\[
\boxed{
\begin{array}{ll}
\text{forget typing:}&C_D,C_M\text{ are two scalar lines, but no line is
canonically selected},\\
\text{retain typing:}&\operatorname{Hom}_{\rm typed}(C_D,C_M)=0.
\end{array}}
\]

Neither side derives the common line.

## 5. Candidate enforcement mechanisms

### Spin(2,3)

After complete contraction, both interactions are scalar operators.  A
Spin(2,3) action blind to their multiplicity acts trivially on two copies
and leaves the whole two-dimensional source space.  If the relation sheets,
anchors and constituent representations are retained, it preserves the
typing \(K\) and has no off-diagonal Hom.  Spin(2,3) therefore organizes the
support distinction but supplies neither an exchange nor a preferred mixed
line.

### Pati--Salam parity

Left--right parity exchanges left and right gauge branches.  It may relate
right- and left-Majorana operators and acts within the bidoublet sector.  It
does not exchange the bidoublet Dirac monomial with the right-Majorana
monomial.  Its action on \((\mathcal O_D,\mathcal O_M)\) is block diagonal,
so two invariant coefficients remain.

### CP and \(J\)

Ordinary conjugation fixes \(\mathbb R^2\subset\mathbb C^2\), a real plane,
not the equal line.  Even the antiunitary map

\[
 z\longmapsto W\bar z
\]

has fixed set \(\{(z,\bar z):z\in\mathbb C\}\), again of real dimension
two.  Imposing both ordinary CP and exchange-CP leaves the real equal line,
but the exchange \(W\) is then an independent assumption.  The same
argument applies to \(J\): reality relates conjugate orientations without
creating the missing typed exchange.

### Spurion

A normalized spurion \(U\in\operatorname{Hom}(C_D,C_M)\) can define
\(W_U\).  This is a valid conditional completion, but a free spurion does
not derive its own direction.  Under diagonal anomalous flow it obeys

\[
 \beta_U=(\gamma_M-\gamma_D)U
\]

before vertex terms.  Covariant constancy therefore requires
\(\gamma_D=\gamma_M\), with the corresponding vertex and threshold
equalities in the full theory.  This is exactly the Ward eigenline problem
in another notation.  A spurion is explanatory only if a parent symmetry or
dynamics independently fixes its normalized orbit and makes it parallel.

## 6. Minimal reopening datum

The shortest admissible positive construction is now fully specified.  It
must provide:

1. a normalized typed intertwiner \(U:C_D\to C_M\), including its \(J\) and
   CP partners;
2. a non-anomalous Ward identity whose invariant source space is
   \(\operatorname{Fix}(W_U)\);
3. vanishing of every transverse additive source in the quotient \(E/L\);
4. RG parallelism \(A(\mu)L(\mu)\subseteq L(\mu)\) at every scale; and
5. threshold intertwiners \(T_jL_{j,+}\subseteq L_{j,-}\) at every matching
   surface.

This is one joined datum, not five unrelated tunings: a parallel
master-source line in the bundle of normalized completed operators.  The
existing Majorana anchor supplies only the family partial-isometry **line**
inside one branch.  It does not supply the cross-complex \(U\), its norm or
the Ward action.

## Verdict

The one-dimensional counterterm module is mathematically minimal and
explicit.  Its reflection is the claim-1528 exchange, and its RG/threshold
tests are finite.  But the reflection becomes a physical Ward law only after
lifting it to a typed operator intertwiner.  The sourced data forbid that
lift while their typing is preserved.

Therefore the portal common line is not presently protected by Spin(2,3),
Pati--Salam parity, CP, \(J\), or an ungoverned spurion.  The exact reopening
datum is a new normalized typed intertwiner whose source line is parallel
under both renormalization and threshold matching.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_ward_counterterm_intertwiner_no_go.mjs
node verification/verify/verify_spin23_common_coefficient_line_rg_invariance.mjs
node verification/verify/verify_spin23_portal_z2_ward_identity_audit.mjs
~~~
