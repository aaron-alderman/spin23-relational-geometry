# The Unique Charged-Matter-Free Spectator Is a Delta-Coupled Singlet, but Any Primitive Null Connector Destroys the Texture

**Date:** 20 October 2026

**Gates:** A2, A5 and A6

**Status:** exact small-representation classification and primitive-connector no-go; categorical and complete Schur-correlated connectors remain open

**Depends on:** [the physical carrier search](1517_the_sourced_pati_salam_skeleton_has_four_relational_lifts_but_physical_SAT_is_underdetermined_by_two_rows.md), [the connected four-character completion](../1100-1199/1121_the_orientable_null_mask_is_an_A2_triangle_and_one_spectator_real_edge_pair_repairs_both_duality_and_connectedness.md), [the unreduced spectator-character obstruction](../1100-1199/1122_the_unreduced_Pati_Salam_algebra_has_no_character_for_S_so_the_null_mask_splits_into_reduced_first_order_and_generalized_branches.md), and [the typed Schur matching law](1508_the_typed_path_matching_law_maps_the_required_composite_to_a_rank_one_Schur_packet_not_an_independent_leakage_arrow.md)

**Primary-source boundary:** the locally sourced spectral Pati--Salam inventory provides \(R=(2,1,4)\), \(\Delta=(2,1,4)\), \(H_1=(2,2,1)\), \(\Sigma=(1,1,1\oplus15)\), and conditionally \(H_{15}=(2,2,15)\). It does not provide a new spectator fermion.

**Evidence:** [spectator-connector classification](../../../evidence/data/spin23-pati-salam-spectator-connector-classification.json) and [executable verifier](../../../verification/verify/verify_spin23_pati_salam_spectator_connector_classification.mjs)

## Result

Row B of claim 1517 has a unique smallest answer at the Pati--Salam gauge
representation level.

The null right carrier and its real partner are

\[
R_N=(2,1,4),
\qquad
JR_N=(2,1,\overline4).
\]

Using the sourced

\[
\Delta=(2,1,4),
\]

the exact product is

\[
(2,1,\overline4)\otimes(2,1,4)
=
(1,1,1)\oplus(3,1,1)\oplus(1,1,15)\oplus(3,1,15).
\]

Therefore

\[
\boxed{X=(1,1,1)}
\]

is the unique dimension-one connector target and the unique smallest target
with no charged Pati--Salam components. The invariant connector is

\[
JR_N\,\Delta\,X
\]

together with its (J)-partner

\[
R_N\,\overline\Delta\,JX.
\]

It is compatible with (J), KO-6 grading, relation-sheet parity and graph
connectedness.

But it fails twice as a direct physical completion.

First, the unchanged unreduced Pati--Salam algebra has no one-dimensional
complex character, so the isolated singlet is not an ordinary finite-algebra
module.

Second, and more decisively, any nonzero primitive mass connector from the
Majorana null state to a spectator fills the complementary heavy block. With
basis \((P,I,N,X)\),

\[
M_4=
\begin{pmatrix}
a&x&y&0\\
x&d&0&0\\
y&0&0&m\\
0&0&m&M_X
\end{pmatrix}.
\]

The cofactor controlling the selected inverse entry is

\[
\boxed{
\operatorname{cof}_{PP}(M_4)=-d\,m^2.
}
\]

Thus (d\ne0) and connector (m\ne0) imply

\[
(M_4^{-1})_{PP}\ne0
\]

whenever (M_4) is invertible. The edge that repairs finite-metric
connectedness destroys the cofactor zero responsible for the protected light
texture. This conclusion is independent of the representation chosen for
(X).

The direct physical Row B realization is therefore a no-go. A surviving
connector must be categorical, junk-trivial, absent in the physical vacuum,
or part of a larger complete Schur package with compensating contact terms.

## 1. Exact small-representation census

Suppressing the inert (SU(2)_L) factor for the Delta channel,

\[
2\otimes2=1\oplus3,
\qquad
\overline4\otimes4=1\oplus15.
\]

The four Delta-connected targets and their dimensions are

\[
\begin{array}{c|c}
X&\dim_{\mathbb C}X\\ \hline
(1,1,1)&1\\
(3,1,1)&3\\
(1,1,15)&15\\
(3,1,15)&45.
\end{array}
\]

The dimension identity is

\[
1+3+15+45=64=8\cdot8.
\]

Other locally sourced channels begin no lower:

- \(H_1=(2,2,1)\) gives \(X=(1,2,4)\) or \((3,2,4)\), of dimensions 8 and
  24;
- a direct or \(\Sigma_1\)-assisted connector gives \(X=(2,1,4)\), of
  dimension 8;
- conditional \(H_{15}\) again has a smallest \(X=(1,2,4)\) channel of
  dimension 8.

Consequently the singlet is not merely one plausible guess. It is the unique
minimum across the sourced connector alphabet.

## 2. Charged-matter audit

The small alternatives are worse phenomenologically:

| candidate | new nontrivial components | bounded mass option |
|---|---|---|
| \((3,1,1)\) | \(SU(2)_R\) triplet with \(Q=+1,0,-1\) after breaking | real-representation mass |
| \((1,2,4)\) | weak and colour charged multiplet | vectorlike mass with \(JX\) |
| \((2,1,4)\) | another complete right multiplet | vectorlike mass with \(JX\) |
| \((1,1,15)\) | colour-adjoint and leptoquark-like components | real-representation mass |

These states can be made heavy only by adding mass data not present in the
minimal fermion inventory. The extra (R) or (L) choices also reopen the
mediator census of claim 1512.

The singlet alone introduces no charged component. After
\(\langle\Delta\rangle\) selects the neutrino direction, its connector can
make the sterile state heavy without coupling it to charged components. That
is why it wins the gauge-EFT classification.

## 3. (J), grading and relation-sheet checks

Use the claim-1517 witness

\[
JR_N=IP,
\quad X=SP,
\qquad
R_N=PI,
\quad JX=PS.
\]

The KO-6 chirality signs on these four states are

\[
(+,-;- ,+),
\]

so both connector edges are chirality odd:

\[
\gamma(IP)\gamma(SP)=-1,
\qquad
\gamma(PI)\gamma(PS)=-1.
\]

Their relation-sheet signs are

\[
(+,+;-,-),
\]

so both edges are (Gamma_{\rm rel})-even. Reality exchanges the two edges.
Adding them completes the last edge of each relation path and provides the
connectedness required by the toy finite metric.

There is therefore no (J), chirality or relation-parity obstruction to the
connector itself.

## 4. The finite-algebra obstruction

Gauge invariance alone is weaker than a finite-spectral representation.
Claim 1122 proved

\[
\operatorname{Hom}_{\mathrm{unital}*}
(\mathbb H_R\oplus\mathbb H_L\oplus M_4(\mathbb C),\mathbb C)
=\varnothing.
\]

Hence the gauge singlet cannot be installed as an isolated one-dimensional
ordinary module of the unchanged unreduced algebra. A diagonal higher
dimensional bimodule can contain a gauge singlet component, but it also brings
the rest of that bimodule; it does not realize the charged-matter-free
candidate.

The smallest gauge answer is therefore already outside the simplest
associative spectral embedding.

## 5. The texture obstruction

The representation obstruction might have been bypassed by a generalized
module. The cofactor calculation shows that this alone is insufficient.

Before adding (X), the heavy matrix is

\[
M_3=
\begin{pmatrix}
a&x&y\\
x&d&0\\
y&0&0
\end{pmatrix}.
\]

Deleting the selected row and column leaves

\[
\begin{pmatrix}d&0\\0&0\end{pmatrix},
\]

whose determinant is zero. This is the protected identity
\((M_3^{-1})_{PP}=0\).

A physical connector (m) and any spectator self-mass (M_X) give

\[
M_4=
\begin{pmatrix}
a&x&y&0\\
x&d&0&0\\
y&0&0&m\\
0&0&m&M_X
\end{pmatrix}.
\]

The complementary determinant is

\[
\det
\begin{pmatrix}
d&0&0\\
0&0&m\\
0&m&M_X
\end{pmatrix}
=-d m^2.
\]

The full determinant is

\[
\det M_4
=-ad m^2+x^2m^2-dM_Xy^2.
\]

Therefore

\[
(M_4^{-1})_{PP}
=
\frac{-dm^2}{-ad m^2+x^2m^2-dM_Xy^2}.
\]

The numerator is independent of (a,x,y,M_X). It cannot be repaired by
tuning the spectator self-mass. The inclusion-minimal incompatible set is

\[
\boxed{
d\ne0,
\qquad m\ne0,
\qquad \operatorname{cof}_{PP}=0.
}
\]

Setting (m=0) restores the texture but disconnects Row B. Setting (d=0)
removes the required complementary image mass. This is a direct no-go for a
primitive physical mass connector.

## 6. Why a heavy singlet does not evade the no-go

It is tempting to argue that the singlet can simply be heavy. But the
cofactor obstruction is present for every (M_X), including arbitrarily
large (M_X). Integrating out (X) generates a nonzero (N-N) entry
proportional to (-m^2/M_X), which is precisely what fills the complementary
null line.

The absence of extra light charged matter and preservation of the texture are
different tests. The singlet passes the first and fails the second.

## 7. Surviving interpretations

The no-go applies when the connector is a primitive nonzero entry of the
physical heavy-neutrino mass matrix. It leaves four narrower possibilities:

1. the spectator edge is categorical provenance data, not a physical mass
   matrix element;
2. it is removed by the represented junk quotient while connectedness is
   supplied elsewhere;
3. its physical vacuum value is zero and another edge repairs the Dirac
   commutant;
4. it belongs to a larger complete Schur packet whose simultaneously induced
   contact terms cancel the cofactor shift.

The fourth option must be matched as a complete packet. Adding only another
matrix entry is not enough.

## Verdict

Row B is now closed for direct primitive physical connectors:

\[
\boxed{
\begin{array}{rcl}
\text{smallest gauge candidate}&=&X=(1,1,1)\text{ via }\Delta,\\
\text{ordinary unreduced algebra lift}&=&\mathrm{UNSAT},\\
\text{nonzero primitive connector + texture zero}&=&\mathrm{UNSAT}.
\end{array}
}
\]

The most economical candidate is beautiful but not viable in the direct
interpretation. The physical completion must decouple finite-metric
connectedness from a primitive null-neutrino mass or supply a complete
correlated matching mechanism.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_pati_salam_spectator_connector_classification.mjs
node verification/prove/prove_unreduced_Pati_Salam_has_no_character_for_the_spectator_S.mjs
node verification/verify/verify_spin23_physical_carrier_bounded_embedding_search.mjs
~~~
