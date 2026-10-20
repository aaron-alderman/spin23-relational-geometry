# The Minimal Oriented Correspondence Algebra Realizes Both Selectors but Does Not Unify Them

**Date:** 20 October 2026

**Gates:** A2, A5 and A6

**Status:** exact finite-dimensional construction, generated-algebra and commutant classification; selector-independence theorem

**Depends on:** [the selected-return corner audit](1543_the_diagonal_expectation_is_canonical_but_the_selected_PI_return_corner_is_new_marked_projector_data.md), [the breaking-projector transporter](1544_breaking_projectors_can_select_the_shared126_masks_but_only_a_rank_one_family_partial_isometry_can_make_their_coefficient_common.md), and [the relational partial-isometry classification](1546_the_Majorana_anchor_contains_the_P_to_N_partial_isometry_line_but_not_a_canonical_transporter.md)

**Evidence:** [minimal oriented correspondence algebra ledger](../../../evidence/data/spin23-minimal-oriented-correspondence-algebra.json) and [executable verifier](../../../verification/verify/verify_spin23_minimal_oriented_correspondence_algebra.mjs)

## Result

There is a minimal finite-dimensional oriented groupoid algebra in which the
two proposed mechanisms coexist safely.

Let (B=\{D,M\}), let (R=\{I,P,N,Z,X\}), and let

\[
H=\mathbb C^{B\times R}.
\]

Write (e_{br}) for the ten rank-one object idempotents,

\[
b_D=\sum_r e_{Dr},\qquad b_M=\sum_r e_{Mr},
\qquad p_r=e_{Dr}+e_{Mr}.
\]

Add one oriented arrow

\[
t=e_{MN,MP},
\qquad
t^*t=e_{MP},
\qquad
tt^*=e_{MN}.
\]

There is no corresponding (D_P\to D_N) arrow.  The selected-return corner is

\[
q=p_I+p_P.
\]

The generated C*-algebra in its faithful defining representation is

\[
\boxed{
\mathcal A
\cong
\mathbb C_D^5
\oplus
(\mathbb C_{M,I}\oplus M_2(\mathbb C)_{M,P/N}
\oplus\mathbb C_{M,Z}\oplus\mathbb C_{M,X})
\cong\mathbb C^8\oplus M_2(\mathbb C).}
\]

It has complex dimension (12), center dimension (9), and commutant

\[
\boxed{\mathcal A'=\mathbb C_D^5\oplus
(\mathbb C,1_{M,P/N}\oplus\mathbb C_{M,I}
\oplus\mathbb C_{M,Z}\oplus\mathbb C_{M,X})}
\]

of dimension (9).

This algebra safely **accommodates** both requested jobs:

1. the branch-conditioned linear map built from (t) transports a single
   (PP) coefficient into the symmetric Majorana (PN) slot, while
   (b_D\mathcal A b_D) remains diagonal and contains no Dirac (PN) matrix
   unit; and
2. (qE_{\rm diag}(-)q) retains the (P/I) closed returns, while centrality of
   (b_D,b_M) prevents every mixed (D\)-(M) carrier product.

But the two selectors are independent.  The arrow determines only its source
and range projections (e_{MP}) and (e_{MN}); it cannot determine (p_I),
and hence cannot determine (q).  Conversely the diagonal projection (q)
contains no off-diagonal matrix unit and cannot determine (t).  Once all
marked role idempotents are declared, (q=p_I+p_P) is of course already an
element of the diagonal algebra.  What remains new is the instruction to use
that particular element as the return selector.

The algebra by itself does not force the common coefficient: (e_{DP}) and
(t+t^T) are linearly independent elements, so their unrestricted
coefficient space is two-dimensional.  The displayed one-parameter portal
is the coefficient-line equalizer/natural transformation already isolated
in claims 1521 and 1546.

Therefore the construction is a compatibility theorem, not a derivation of
one datum from the other or of the common line.

## 1. Groupoid presentation and minimality

Take ten objects (D_r,M_r), one for every branch-role pair.  Besides the
identity arrow at each object, introduce only

\[
\tau:M_P\longrightarrow M_N,
\qquad
\tau^{-1}:M_N\longrightarrow M_P.
\]

The finite groupoid algebra has relations

\[
e_xe_y=\delta_{xy}e_x,
\quad
\sum_xe_x=1,
\quad
t=e_{MN}te_{MP},
\quad
t^*t=e_{MP},
\quad
tt^*=e_{MN}.
\]

The connected two-object component gives (M_2(\mathbb C)).  The other eight
objects are isolated and give eight scalar summands.  This proves the direct
sum above and shows minimality: removing (t) loses transport, while adding
any cross-branch arrow joins a (D) and an (M) component and is precisely
the mixed-carrier sewing excluded by claim 1521.

The faithful matrix representation is

\[
e_x\mapsto E_{xx},
\qquad
t\mapsto E_{MN,MP}
\]

on the ordered basis

\[
(D_I,D_P,D_N,D_Z,D_X,M_I,M_P,M_N,M_Z,M_X).
\]

The twelve matrix units

\[
E_{xx}\ (10\text{ units}),
\qquad E_{MN,MP},\ E_{MP,MN}
\]

are linearly independent and closed under multiplication and adjoint.

## 2. Generated algebra and commutant

Because every object idempotent belongs to (\mathcal A), a commuting matrix
must first be diagonal.  Commutation with (t) then imposes one equality:

\[
z_{MP}=z_{MN}.
\]

There are ten diagonal entries and one constraint, so

\[
\dim_{\mathbb C}\mathcal A'=9.
\]

The same nine connected components give the center: eight isolated objects
plus the identity of the (M_P/M_N) block.  In particular (b_D) and (b_M)
are central.  Every word in the generators is branch diagonal, and

\[
b_D\mathcal A b_M=b_M\mathcal A b_D=0.
\]

No mixed carrier can be generated indirectly by multiplication.

## 3. Portal coefficient transport

Let (\Lambda) be one coefficient and choose a normalized representative

\[
t_\phi=e^{i\phi}t.
\]

The branch-conditioned portal insertion is

\[
W(\Lambda,\phi)
=\Lambda e_{DP}
+\Lambda(t_\phi+t_\phi^T).
\]

It has

\[
W_{D,PP}=\Lambda,
\qquad
W_{M,PN}=W_{M,NP}=\Lambda e^{i\phi},
\qquad
W_{D,PN}=0.
\]

Thus one coefficient is transported once a representative of the arrow line
and the coefficient-line embedding are chosen.  This is the algebraic
construction of claim 1544 with the exact phase boundary of claim 1546
exposed.  It is not a consequence of C*-algebra closure: the general supported
portal element is

\[
\Lambda_D e_{DP}+\Lambda_M(t_\phi+t_\phi^T),
\]

with two independent coefficients.  Selecting
(\Lambda_D=\Lambda_M) is an additional one-dimensional equalizer law.

In the abstract groupoid algebra the phase of (t) is removable by a diagonal
unitary rephasing of (M_N).  Hence the isolated two-object component has no
gauge-invariant continuous phase.  A relative (U(1)) phase becomes physical
only after another independently normalized path closes a cycle through the
same objects.  CP permits a real presentation (t=E_{MN,MP}), leaving at most
a sign convention until such a cycle is present.

The normalization equations fix the arrow's magnitude.  They do not fix the
overall physical portal coefficient (\Lambda).

## 4. Selected returns live in a correspondence, not a larger carrier algebra

Let (X) be the oriented primitive-path correspondence over the diagonal
object algebra.  Its degree-two tensors contain return paths.  The canonical
diagonal expectation followed by the declared corner gives

\[
F_q(a)=qE_{\rm diag}(a)q
=p_Iap_I+p_Pap_P.
\]

This retains only the selected (I/P) returns.  Its physical dimension-one
normalization is the independent inverse-mass parameter (\kappa) isolated
in claim 1540.

It is essential not to adjoin every oriented primitive path to the carrier
C*-algebra.  On a connected five-role chain those paths generate all of
(M_5(\mathbb C)), as claim 1543 proves.  The bounded safe construction keeps
the paths in a correspondence and applies (F_q) at degree two.  The carrier
algebra remains the block-diagonal (\mathcal A) above.

Since (q) is diagonal and (b_D,b_M) are central, the return map does not
create (D\)-(M) blocks.  Since it is a diagonal expectation, it also deletes
open degree-two paths rather than turning them into new primitive carriers.

## 5. Real structure, CP and relation grading

The real completion acts on

\[
H_{\mathbb R}=H\oplus\overline H
\]

with

\[
J(\xi,\bar\eta)=(\eta,\bar\xi)
\]

and the representation

\[
\rho_{\mathbb R}(a)=\rho(a)\oplus\overline{\rho(a)}.
\]

Thus (J\rho_{\mathbb R}(a)J^{-1}=\rho_{\mathbb R}(a)) for CP-real (a), and
the arrow appears with its conjugate orientation in the real completion.

Choose the relation signs required by the typed mask,

\[
g(D_P)=+1,
\quad g(D_N)=-1,
\quad g(M_P)=g(M_N)=+1,
\]

and arbitrary declared signs on unused isolated objects.  On the real
completion set

\[
\Gamma_{\rm rel}=\operatorname{diag}(g,-g).
\]

Then (J\Gamma_{\rm rel}=-\Gamma_{\rm rel}J).  The Majorana arrow (t) and
the selected corner (q) are relation-even.  A hypothetical Dirac (PN)
arrow is relation-odd and is absent from the algebra.

## 6. Parameter and independence count

The minimal presentation separates structural from physical freedom:

| datum | freedom | status |
|---|---:|---|
| normalized arrow (t) | one representational (U(1)), gauge on the acyclic two-object component | becomes relative only after another path closes a cycle |
| CP-real arrow | at most one sign convention | not fixed by the declared anchors |
| common portal coefficient (\Lambda) | one physical complex scale, or real under CP, after imposing the equalizer | the unrestricted algebra has two independent portal coefficients |
| return coefficient (\kappa) | one independent real inverse-mass scale | not fixed by (t) or (q) |
| return projection (q) | discrete marked-corner choice | compatible, not derived |

There is no relation in the generated algebra tying (\kappa) to
(\Lambda).  There is likewise no relation selecting (q) from (t):

\[
t^*t=e_{MP},\qquad tt^*=e_{MN}
\]

recover only the two Majorana endpoint projections and never (p_I).
Conversely a polynomial in diagonal projections, including (q), remains
diagonal and cannot produce (t).

## Verdict

The smallest safe unified presentation is

\[
\boxed{\mathcal A=\mathbb C^8\oplus M_2(\mathbb C)}
\]

together with a primitive-path correspondence, the external portal equalizer
and the external degree-two map (\kappa F_q).  It provides an exact safe
simultaneous realization of common-coefficient transport and selected returns
without Dirac (PN) leakage or mixed-carrier sewing.  The carrier algebra
alone permits, but does not select, that common coefficient line.

It does **not** reduce the number of new physical laws.  The Majorana arrow
line and the (P/I) return corner are mutually compatible but logically
independent.  A genuine unification would require one sourced functorial law
that simultaneously selects (q), fixes the relative portal phase and fixes
or relates (\kappa); none follows from this finite algebra.

## Reproduction

Run:

```bash
node verification/verify/verify_spin23_minimal_oriented_correspondence_algebra.mjs
```

The verifier closes the matrix generators, computes the algebra and
commutant dimensions, checks the center and branch centrality, verifies the
portal and selected-return supports, and confirms that neither selector is
generated from the other.
