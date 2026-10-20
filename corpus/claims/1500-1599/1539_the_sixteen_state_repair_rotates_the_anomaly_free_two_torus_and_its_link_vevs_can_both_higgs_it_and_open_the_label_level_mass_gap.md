# The Sixteen-State Repair Rotates the Anomaly-Free Two-Torus, and Its Link VEVs Can Both Higgs It and Open the Label-Level Mass Gap

**Date:** 20 October 2026

**Gates:** A2, A5 and A6

**Status:** exact central-kernel, perturbative-anomaly, link-lattice, Higgs-stabilizer and Dirac-rank audit of claim 1533's multiplicity-one \(SI/IS+NU/UN\) repair

**Depends on:** [the minimum sixteen-state rank repair](1533_the_four_zero_modes_require_exactly_four_new_real_completed_dimensions_and_no_edge_only_repair_exists.md), [the twelve-state anomaly audit](1532_the_six_character_center_has_five_effective_directions_but_only_a_maximal_two_dimensional_subalgebra_is_perturbatively_anomaly_free.md), and [the twelve-state Higgs-link obstruction](1536_the_anomaly_free_two_torus_requires_charged_links_on_all_five_edge_orbits_and_generic_vevs_break_it_completely_without_opening_a_mass_gap.md)

**Evidence:** [sixteen-state gauge/Higgs/mass ledger](../../../evidence/data/spin23-six-character-sixteen-state-gauge-higgs-mass-audit.json) and [deterministic verifier](../../../verification/verify/verify_spin23_six_character_sixteen_state_gauge_higgs_mass_audit.mjs)

## Result

Adding the chiral orbits \(SI/IS\) and \(NU/UN\) does not change the central
gauge-kernel rank. The character graph remains connected, so the common
diagonal is the only continuous kernel and the effective central algebra is
still \(\mathfrak u(1)^5\).

It does change the anomalies. The mixed gravitational covector becomes

\[
G=(0,1,-1,0,0,0),
\qquad \mathcal A_{\rm grav}=I-N.
\]

The old anomaly-free plane of claim 1532 is therefore no longer a plane of
the repaired theory; only a one-dimensional intersection survives. A new
maximal anomaly-free two-torus is

\[
\boxed{I=N=U,\qquad S=T}
\]

modulo the common diagonal. Thus the added chiral matter rotates rather than
enlarges the maximum anomaly-free gauge algebra: its dimension remains two.

On the new torus, one of the seven required \(J\)-edge orbits is neutral and
can carry a bare invariant coefficient. The other six need charged link
fields. Their charges generate the full rank-two lattice, so generic nonzero
VEVs completely break the faithful \(U(1)^2\).

Unlike the twelve-state model, those same relation-even link-supported edges
can give a mass gap. The unit-weight sixteen-state Dirac determinant is one;
hence full rank holds on a generic open set of link VEVs and Yukawa
coefficients.

The bounded decision is

\[
\boxed{
\begin{array}{rcl}
\dim\mathfrak g_{\rm anomaly\mbox{-}free}^{\max}&=&2\quad\text{(unchanged)},\\
\text{bare / charged edge orbits}&=&1/6,\\
\text{generic residual faithful gauge group}&=&1,\\
\text{generic sixteen-state mass gap}&=&\mathrm{SAT},\\
\text{sourced Pati--Salam completion}&=&\mathrm{UNSAT}.
\end{array}}
\]

This is a genuine improvement at the finite-label rank gate, but it is not a
physical Pati--Salam completion: both new fermion orbits and the link/Higgs
data remain unsourced.

## 1. Gauge kernel and unimodularity

Every sector \(e_{ab}\) has central charge \(e_a-e_b\). The original twelve
states already generated the incidence space of a connected six-character
graph; adding \(SI,IS,NU,UN\) cannot enlarge its one-dimensional kernel.
Thus

\[
\ker Q=\mathbb R(1,1,1,1,1,1),
\qquad \operatorname{rank}Q=5.
\]

The left-character multiplicities on the sixteen states are

\[
(4,3,3,2,2,2)
\]

in order \((P,I,N,S,T,U)\). Full-representation unimodularity is therefore

\[
4P+3I+3N+2S+2T+2U=0.
\]

Its value on the diagonal is sixteen, so it again chooses one representative
of each effective charge class rather than removing an additional gauge
direction.

## 2. Complete perturbative abelian anomaly

The eight \(\gamma=+1\) representatives are

\[
PN,\ NI,\ IP,\ SP,\ PT,\ TU,\ IS,\ UN.
\]

Their cubic anomaly polynomial is

\[
\begin{split}
\mathcal A_3={}&(P-N)^3+(N-I)^3+(I-P)^3\\
&+(S-P)^3+(P-T)^3+(T-U)^3\\
&+(I-S)^3+(U-N)^3.
\end{split}
\]

The nonzero sorted components of the complete symmetric tensor are

\[
\begin{array}{c|rrrrrrrrr}
abc&PPI&PPN&PPS&PPT&PII&PNN&PSS&PTT&III\\ \hline
T_{abc}&1&-1&1&-1&-1&1&-1&1&1
\end{array}
\]

and

\[
\begin{array}{c|rrrrrrrrr}
abc&IIN&IIS&INN&ISS&NNN&NNU&NUU&TTU&TUU\\ \hline
T_{abc}&1&-1&-1&1&-1&1&-1&-1&1.
\end{array}
\]

Both the gravitational covector and cubic tensor are nonzero, so the full
\(U(1)^5\) remains anomalous.

## 3. Maximal anomaly-free two-torus

Impose the gravitational condition \(I=N\). The first three triangle terms
then cancel, and the remaining cubic is

\[
(S-P)^3+(P-T)^3+(T-U)^3+(N-S)^3+(U-N)^3.
\]

These are the five oriented edge differences around the cycle

\[
N\longrightarrow S\longrightarrow P\longrightarrow T
\longrightarrow U\longrightarrow N,
\]

so their sum is zero. The relations \(U=N\) and \(T=S\) pair the five
charges as two opposite pairs plus zero. They leave a two-dimensional
quotient parametrized by \(p=P-N\) and \(s=S-N\), and all cubic, mixed cubic
and gravitational anomalies vanish.

This dimension is maximal. On the four-dimensional gravitational quotient,
the cubic is \(\sum_{i=1}^5x_i^3\) subject to \(\sum_i x_i=0\). At a
projective critical point all \(x_i^2\) would be equal. Five signs of one
nonzero magnitude cannot sum to zero, so the projective cubic surface is
smooth. It contains no projective plane; hence no three-dimensional vector
subspace can annihilate the full cubic tensor.

Claim 1532's old plane obeyed \(S=U=N\) and
\(T=P+N-I\). Intersecting it with the new gravitational condition \(I=N\)
forces \(T=P\), leaving only one effective parameter. The maximum dimension
is unchanged, but the actual anomaly-free gauge directions are different.

## 4. State and edge charges

Use primitive quotient cocharacters

\[
p=(1,0,0,0,0,0),
\qquad s=(0,0,0,1,1,0),
\]

with \(I=N=U=0\) fixed by the diagonal. The state charges are

\[
\begin{array}{c|rrrrrrrrrrrrrrrr}
&PN&NP&IN&NI&IP&PI&PS&SP&TP&PT&TU&UT&SI&IS&NU&UN\\ \hline
q_p&1&-1&0&0&-1&1&1&-1&-1&1&0&0&0&0&0&0\\
q_s&0&0&0&0&0&0&-1&1&1&-1&1&-1&1&-1&0&0
\end{array}
\]

The seven representative edge-orbit charges are

\[
\begin{array}{c|rrrrrrr}
\text{edge}&PN\!\leftarrow\!IN&IN\!\leftarrow\!IP&IP\!\leftarrow\!TP&SP\!\leftarrow\!TP&TP\!\leftarrow\!TU&SP\!\leftarrow\!SI&TU\!\leftarrow\!NU\\ \hline
q_p&1&1&0&0&-1&-1&0\\
q_s&0&0&-1&0&0&0&1
\end{array}
\]

Only \(SP\!\leftrightarrow\!TP\), with its \(J\)-partner
\(PS\!\leftrightarrow\!PT\), is neutral. The other six edge orbits require
charged links.

Their Smith invariant factors are \((1,1)\). In particular, the link set
contains primitive \((1,0)\) and \((0,1)\) charges, so generic nonzero VEVs
have a trivial faithful stabilizer.

## 5. The same link vacuum can open the mass gap

All fourteen allowed edges preserve relation parity. On one relation sheet,
the link-supported perfect matching

\[
PN-IN,\qquad IP-TP,\qquad SP-SI,\qquad TU-NU
\]

covers all eight states. Its \(J\)-image covers the other sheet. Therefore a
full-rank relation-even Dirac operator is possible using precisely the
charged-link support already needed by gauge covariance.

More strongly, setting every allowed edge coefficient to one gives

\[
\det D_{16}=1.
\]

The determinant is a polynomial in the neutral coefficient, link VEVs and
Yukawa couplings. One nonzero point proves that full rank holds generically.
The same generic vacuum both completely Higgses the two-torus and removes
the four label-level zero modes.

## 6. Texture and physical boundary

The original N--Z--X coefficient texture remains an exact principal
projection because every new primitive edge has a new endpoint. This is not
a proof of full Schur protection: integrating out \(SI/IS\) and \(NU/UN\)
can induce effective entries. A physical descent/correspondence law remains
necessary.

Nor are the new sectors sourced Pati--Salam fermions. They are additional
one-dimensional label/correspondence orbits, and the calculation supplies
no nonabelian representation, family weight, kinetic normalization, scalar
potential or Yukawa map. Those missing weights could also change the anomaly
audit.

The minimal reopening datum is therefore a physical correspondence assigning
all sixteen label states and six charged link orbits to Pati--Salam
representations, together with anomaly weights, relation-even Yukawa maps and
a scalar potential whose vacuum realizes the determinant-one support without
spoiling the protected physical Schur relation.

## Verdict

The \(SI/IS+NU/UN\) repair succeeds at a point where the twelve-state model
could not: its link-supported, relation-even Dirac operator is generically
invertible. It does not enlarge the anomaly-free gauge algebra, and it
invalidates the old anomaly-free plane before exposing a rotated one.

Thus the formal label-level package—anomaly-free \(U(1)^2\), complete
Higgsing and a mass gap—is mutually compatible. Promoting that package to a
physical Pati--Salam model remains new, unsourced work.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_six_character_sixteen_state_gauge_higgs_mass_audit.mjs
node verification/verify/verify_spin23_six_character_zero_mode_repair_exhaustion.mjs
node verification/verify/verify_spin23_six_character_gauge_kernel_unimodularity_anomalies.mjs
~~~
