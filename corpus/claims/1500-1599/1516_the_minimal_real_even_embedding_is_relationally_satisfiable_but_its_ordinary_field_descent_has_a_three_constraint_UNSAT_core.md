# The Minimal Real-Even Embedding Is Relationally Satisfiable, but Its Ordinary-Field Descent Has a Three-Constraint UNSAT Core

**Date:** 20 October 2026

**Gates:** A2, A5 and A6

**Status:** exact bounded constraint search; relational witness exists, ordinary field descent is impossible, full Pati--Salam embedding remains open

**Depends on:** [complete Schur composition](1515_complete_Schur_composition_is_associative_but_matrix_lowering_forgets_primitive_versus_composite_provenance.md), [the KO-6 relation-sheet reflection](1505_the_real_completed_two_path_geometry_uniquely_lifts_the_mask_reflection_as_J_odd_relation_sheet_parity.md), [the ordinary-field parity no-go](1507_any_ordinary_Z2_preserving_the_required_Dirac_and_Majorana_vertices_also_allows_the_composite_leakage.md), and [the local-Hom/global-rank obstruction](1510_one_dimensional_local_arrow_spaces_do_not_force_the_global_rank_one_Schur_alignment_ideal.md)

**Evidence:** [bounded embedding ledger](../../../evidence/data/spin23-minimal-real-even-bounded-embedding-search.json) and [exhaustive constraint verifier](../../../verification/verify/verify_spin23_minimal_real_even_bounded_embedding_search.mjs)

## Result

The first bounded embedding problem can be solved completely. Join three
finite constraints already required by the programme:

1. the eight-label KO-6 real completion and its relation-sheet reflection;
2. the primitive-versus-composite field-vertex constraints;
3. the three-mediator aggregate rank-one condition.

On the relational cover, the problem is satisfiable. Exactly two parity
assignments, differing by overall sign, preserve all allowed edges,
anticommute with \(J\), and make both dangerous orientable anchors odd. For
three nonzero sign-valued mediator columns, exactly 16 of 64 coupling
assignments satisfy every aggregate minor. The direct joined bounded model
therefore has

\[
\boxed{2\times16=32}
\]

relational witnesses.

Demanding descent to an ordinary parity of the five unduplicated fields makes
the model unsatisfiable. The UNSAT core has only three vertex constraints:

\[
\pi(L_PH\nu_P^c)=+1,
\qquad
\pi(S\nu_P^c\nu_N^c)=+1,
\qquad
\pi(SL_PH\nu_N^c)=-1.
\]

The first two multiply to the negation of the third requirement because
\(\pi(\nu_P^c)^2=1\). Removing any one of the three constraints restores eight
field-sign assignments, so this core is inclusion-minimal.

## 1. Constraint model

### Relational-cover variables

Assign a sign to each of

\[
PN,IN,IP,SP,NP,NI,PI,PS.
\]

Require:

- all six retained path edges are even;
- signs reverse under the four \(J\)-pairings;
- both possible forbidden Dirac anchors are odd.

The search checks all \(2^8=256\) assignments and returns the two expected
overall-sign partners.

### Aggregate-coupling variables

For three mediator copies, take nonzero sign couplings

\[
v_i=(d_i,y_i)^T,
\qquad d_i,y_i\in\{-1,+1\}.
\]

Require every minor \(d_i y_j-d_j y_i\) to vanish. Of \(2^6=64\)
assignments, 16 survive.

### Ordinary-field quotient variables

Assign signs independently to

\[
L_P,H,\nu_P^c,S,\nu_N^c.
\]

Require the standard Dirac and Majorana vertices to be even and the composite
leakage vertex to be odd. No assignment survives.

## 2. SAT witness on the relational cover

One witness is

\[
\Gamma_{\rm rel}=+1
\quad\hbox{on}\quad
\{PN,IN,IP,SP\},
\]

and \(-1\) on its \(J\)-paired sheet. Choose, for example,

\[
v_1=(1,1)^T,
\quad v_2=(-1,-1)^T,
\quad v_3=(1,1)^T.
\]

Every column lies on the same projective ray. The witness simultaneously
satisfies the bounded real, grading, support, dangerous-edge and aggregate-rank
constraints.

It is a witness for the typed relational model, not yet for the complete
physical Hilbert space.

## 3. Minimal ordinary-field obstruction

Let the five field signs be \(l,h,p,s,n\). The three vertex constraints are

\[
lhp=1,
\qquad spn=1,
\qquad slhn=-1.
\]

Multiplying the first two yields

\[
(lhp)(spn)=slhn\,p^2=slhn=1,
\]

contradicting the third constraint. The verifier then removes each constraint
in turn and finds eight solutions in all three reduced systems. Hence this is
an inclusion-minimal UNSAT core, not an artifact of extra field assumptions.

## 4. Why the relational witness does not finish the embedding

The bounded SAT result establishes logical compatibility of:

- KO-6 label reality;
- relation-sheet parity;
- the declared safe/dangerous support;
- a common three-mediator Schur ray.

But it obtains the last item by imposing the minors as constraints. It does
not derive them from the Pati--Salam or Spin(2,3) representation. Nor does it
show that every physical quark, lepton, scalar and conjugate vertex stays
within one relation sheet.

The search therefore prevents two opposite errors:

- the formal constraints are not mutually inconsistent on their natural
  relational carrier;
- their consistency cannot be pushed down to an ordinary field parity.

## 5. Required next search layer

The next bounded model must import the actual physical carrier census and
replace imposed minor equations by computed intertwiner multiplicity. Its
variables must include:

- every sourced Pati--Salam fermion and scalar representation;
- every required Yukawa and Majorana vertex plus its \(J\)-partner;
- primitive versus Schur-generated provenance;
- all physically admitted mediator columns;
- the aggregate Hom-space basis rather than free sign couplings.

A SAT witness at that layer would be a physical finite-carrier candidate. An
UNSAT result should report the smallest incompatible vertex or representation
subset.

## Verdict

The first bounded embedding search neither kills nor promotes the relational
mechanism:

\[
\boxed{\text{relational cover + imposed common ray: SAT (32 witnesses),}}
\]

but

\[
\boxed{\text{ordinary unduplicated field parity: UNSAT (minimal core 3).}}
\]

The physical aggregate-intertwiner census remains the decisive input for the
next layer.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_minimal_real_even_bounded_embedding_search.mjs
node verification/verify/verify_spin23_KO6_relation_sheet_reflection.mjs
node verification/verify/verify_spin23_ordinary_Z2_cannot_forbid_composite_Dirac_leakage.mjs
node verification/verify/verify_spin23_local_one_dimensional_arrows_do_not_force_global_Schur_alignment.mjs
~~~
