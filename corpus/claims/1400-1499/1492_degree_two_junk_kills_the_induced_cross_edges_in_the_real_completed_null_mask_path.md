# Degree-Two Junk Kills the Induced Cross-Edges in the Real-Completed Null-Mask Path

**Date:** 20 October 2026

**Gates:** A2, A5 and A6

**Status:** exact represented-calculus theorem for the canonical diagonal four-state path witness; full Standard-Model/Pati--Salam multiplicities and generalized fluctuations remain open

**Depends on:** [the sector-dependent null mask](../1100-1199/1120_a_sector_dependent_Krajewski_anchor_mask_allows_Majorana_null_sewing_while_forbidding_Dirac_null_leakage.md), [the real-even four-character completion](../1100-1199/1121_the_orientable_null_mask_is_an_A2_triangle_and_one_spectator_real_edge_pair_repairs_both_duality_and_connectedness.md), and [the opposite-anchor wheel split](../1100-1199/1127_opposite_anchor_typing_splits_the_Sp6_envelope_into_two_local_Spin23_relational_wheels.md)

**Evidence:** [machine-readable junk ledger](../../../evidence/data/spin23-null-mask-path-degree-two-junk.json) and [executable finite-calculus verifier](../../../verification/verify/verify_spin23_null_mask_path_degree_two_junk.mjs)

## Result

The first explicit junk calculation on the real-completed null-mask witness is
positive.

Closing the orientable three-character mask under reality and adding the
spectator connector gives two (J)-paired four-state chains. One sheet is

\[
PN\longleftrightarrow IN
\longleftrightarrow IP
\longleftrightarrow SP,
\]

and the other is

\[
NP\longleftrightarrow NI
\longleftrightarrow PI
\longleftrightarrow PS.
\]

If one ignores differential degree and takes unrestricted Jordan closure,
adjacent edge operators generate distance-two cross-relations. For example,

\[
(E_{01}+E_{10})\circ(E_{12}+E_{21})
=\frac12(E_{02}+E_{20}).
\]

But for the canonical diagonal finite spectral calculus on the four-state
path,

\[
\mathcal A=\mathbb C^4,
\qquad
D=A(P_4),
\]

every such distance-two matrix lies in

\[
\pi_D\bigl(d\ker(\pi_D|_{\Omega^1})\bigr),
\]

and therefore vanishes in the degree-two junk quotient:

\[
\boxed{
E_{02},E_{20},E_{13},E_{31}=0
\quad\text{in }\Omega_D^2(\mathbb C^4).
}
\]

The quotient retains only the four diagonal population directions. Thus the
two-step cross-relations that enlarged the untyped Jordan envelope are not
physical degree-two forms in this minimal witness.

## 1. Why reality produces two paths

Use the orientable anchor assignment from claim 1121. The retained edges and
their real partners are

\[
PN\leftrightarrow IN
\qquad\text{(Dirac)},
\]

\[
PI\leftrightarrow NI
\qquad\text{(Majorana)},
\]

\[
SP\leftrightarrow IP
\qquad\text{(spectator connector)},
\]

together with

\[
NP\leftrightarrow NI,
\quad
IP\leftrightarrow IN,
\quad
PS\leftrightarrow PI.
\]

The edge graph has exactly two connected components:

\[
\{PN,IN,IP,SP\},
\qquad
\{NP,NI,PI,PS\},
\]

which are exchanged by (J). The KO-6 grading alternates along each path.

This refines claim 1127. The oriented Dirac and Majorana wheels are
opposite-anchor separated, but their (J)-partners cross-link them inside
each real sheet. Bare matrix closure of one sheet is consequently larger
than one isolated (H_2(\mathbb R)) block. The physical question is whether
the represented differential quotient remembers degree and removes those
cross-links.

## 2. Canonical represented calculus

Let (e_i) be the four minimal idempotents of (\mathbb C^4), represented
diagonally on (\mathbb C^4). Let (D) be the symmetric adjacency matrix of
the path

\[
0-1-2-3.
\]

In normalized universal forms,

\[
\Omega^1_{\rm univ}(\mathbb C^4)
\cong
\mathbb C^4\otimes\overline{\mathbb C^4}
\]

has dimension (4(4-1)=12). Its representation is

\[
\pi_D(a_0\,da_1)=a_0[D,a_1].
\]

The verifier obtains

\[
\dim\pi_D(\Omega^1)=6,
\qquad
\dim\ker\pi_D|_{\Omega^1}=6.
\]

The six represented directions are precisely the two orientations of the
three path edges.

## 3. Degree two before and after junk

Before quotienting,

\[
\dim\pi_D(\Omega^2)=8.
\]

The eight matrix directions are:

- four diagonal length-two returns;
- four oriented distance-two paths,
  (E_{02},E_{20},E_{13},E_{31}).

The represented differential of the degree-one kernel has dimension four:

\[
\dim\pi_D(d\ker\pi_D|_{\Omega^1})=4.
\]

It is exactly the span of those four distance-two matrices. Therefore

\[
\boxed{
\dim\Omega_D^2
=8-4
=4,
}
\]

with basis represented by

\[
E_{00},E_{11},E_{22},E_{33}.
\]

No distance-two cross-edge survives.

For both (J)-paired sheets the dimensions simply double:

\[
\dim\Omega_D^1=12,
\qquad
\dim\Omega_D^2=8.
\]

## 4. Relation to the Spin(2,3) middle

Claims 1126 and 1127 distinguished two operations:

1. forgetting relationship type and taking unrestricted binary Jordan
   closure, which produces a larger symplectic envelope;
2. retaining opposite-anchor type, which leaves local
   (H_2(\mathbb R)) wheels and local (Spin(2,3)) actions.

The present calculation supplies a third, independent mechanism:

\[
\boxed{
\text{differential degree plus junk removes the first induced cross-edge.}
}

This is precisely the kind of convergence sought by the programme. The
opposite-anchor labels prevent inappropriate degree-one composition, while
the universal-calculus kernel removes the corresponding degree-two path
when it is nevertheless formed algebraically.

It does not prove that the full physical calculus is (Spin(2,3)). It shows
that the simplest explicit represented calculus does **not** automatically
promote the local wheels to the untyped larger envelope.

## 5. What this does and does not solve

Solved in the canonical diagonal path witness:

- the full real edge graph and its two (J)-paired sheets;
- the represented one-form rank;
- the complete degree-two represented-form rank;
- the complete degree-two junk space;
- removal of every distance-two induced relation;
- survival of four diagonal population directions per sheet.

Still open:

- matrix-valued Standard-Model and Pati--Salam summands;
- physical fermion multiplicities and KO-6 signs beyond the label witness;
- the Higgs/Yukawa identification of all path edges;
- higher-degree differential cohomology;
- the generalized (A_{(1)}+A_{(2)}) fluctuation in the unreduced branch;
- stability after symmetry breaking and radiative counterterms.

## 6. Stop and reopen criteria

**Bare-Jordan stop:** do not infer a physical (H_4) or (Sp(8)) envelope
from the path matrices before quotienting represented differential junk.

**Toy-model stop:** do not import the degree-two result into a matrix-valued
physical triple without recomputing its kernel and junk ideal.

**Positive physical trigger:** the full finite representation decomposes
into these (J)-paired path blocks and its degree-two junk continues to
contain every mixed Dirac/Majorana distance-two relation.

**Failure trigger:** physical multiplicities, a connector coefficient or
the generalized quadratic fluctuation makes one of the distance-two
relations non-junk.

**Next calculation:** tensor the path witness with the actual internal
bimodule multiplicities and determine whether the junk rank factorizes or
whether noncommuting internal coefficients rescue a mixed cross-edge.

That calculation is completed abstractly in [claim 1493](1493_matrix_multiplicity_enlarges_only_the_loop_sector_while_all_two_step_cross_edges_remain_junk.md). Arbitrary noncommuting edge blocks can enlarge the diagonal return-loop quotient from dimension four to six, but every distance-two product remains the differential of a represented-zero nonedge one-form and is therefore exact junk.

## Verdict

The plausible middle passes its first genuine differential-calculus test:

\[
\boxed{
\text{real-completed typed path}
\xrightarrow{\Omega_D^2/\text{junk}}
\text{populations only, with induced cross-edges removed}.
}
\]

This is a positive exact result at toy-model level and a sharply defined
template for the physical multiplicity calculation.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_null_mask_path_degree_two_junk.mjs
~~~
