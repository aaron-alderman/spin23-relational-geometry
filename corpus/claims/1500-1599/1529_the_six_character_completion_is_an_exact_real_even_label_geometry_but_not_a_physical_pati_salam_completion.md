# The Six-Character Completion Is an Exact Real-Even Label Geometry, but Not a Physical Pati--Salam Completion

**Date:** 20 October 2026

**Gates:** A2, A5 and A6

**Status:** exhaustive twelve-sector finite-representation construction; ordinary label geometry SAT, sourced Pati--Salam embedding UNSAT, physical descent underdetermined

**Depends on:** [the six-character lower bound](1526_the_graded_spectator_chain_has_no_sourced_pati_salam_bimodule_lift_and_an_ordinary_completion_requires_six_characters.md), [the categorical chain repair](1523_one_intermediate_real_pair_is_the_minimal_categorical_repair_of_the_spectator_connector_no_go.md), [the physical carrier census](1517_the_sourced_pati_salam_skeleton_has_four_relational_lifts_but_physical_SAT_is_underdetermined_by_two_rows.md), [the unreduced character obstruction](../1100-1199/1122_the_unreduced_Pati_Salam_algebra_has_no_character_for_S_so_the_null_mask_splits_into_reduced_first_order_and_generalized_branches.md), and [the two-slot obstruction](../1100-1199/1124_the_exact_four_direct_sum_has_a_two_sided_slot_obstruction_to_decorating_physical_SM_fermions.md)

**Evidence:** [explicit finite-representation ledger](../../../evidence/data/spin23-six-character-ordinary-correspondence-completion.json) and [deterministic axiom, spectrum and texture verifier](../../../verification/verify/verify_spin23_six_character_ordinary_correspondence_completion.mjs)

## Result

The six-character completion proposed in claim 1526 can be promoted from an
intersection-matrix witness to a complete ordinary finite label geometry.
Take

\[
\mathcal A_6=\mathbb C_P\oplus\mathbb C_I\oplus\mathbb C_N
\oplus\mathbb C_S\oplus\mathbb C_T\oplus\mathbb C_U
\]

on the twelve one-dimensional bimodule sectors

\[
PN,NP,IN,NI,IP,PI,PS,SP,TP,PT,TU,UT.
\]

Left and right characters give the represented and opposite actions,
respectively. The real structure exchanges the two slots and conjugates
coefficients. The listed KO-6 grading reverses under \(J\). This representation
satisfies order zero, orientability, nondegenerate Poincare duality, and the
first-order condition.

The finite-Dirac support is stronger than merely consistent. Of all
\(\binom{12}{2}=66\) unordered sector pairs, imposing

1. opposite KO-6 chirality,
2. equal relation parity, and
3. a common left or right character,

leaves exactly ten edges. They are precisely the five required edge orbits
and their \(J\)-partners. Thus the support is unique within the declared model.

However, that exact support has a forced four-dimensional kernel. Each of its
two \(J\)-related six-state components has characteristic polynomial

\[
\lambda^2\left[\lambda^4-
(a^2+b^2+c^2+d^2+e^2)\lambda^2+
a^2c^2+a^2d^2+a^2e^2+b^2d^2+b^2e^2\right].
\]

The cofactor-protecting five-state Weyl matrix remains invertible, with

\[
\operatorname{cof}_{PP}=0,
\qquad
\det M_5=D y^2h^2,
\]

but this is a coefficient-level projection, not the spectrum of the explicit
twelve-state finite Dirac operator. A physical identification of the two
therefore still requires a new correspondence or descent functor.

Finally, the completion does not embed the sourced Pati--Salam carrier. The
new sectors (TP/PT) and (TU/UT) are two new real fermion orbits, while the
sourced carrier contains no independent sterile singlet fermions. The
unreduced Pati--Salam algebra has no one-dimensional character, and treating
\(\mathcal A_6\) as a commuting family algebra retains the two-slot
obstruction.

Hence

\[
\boxed{
\begin{array}{rcl}
\text{ordinary six-character label geometry}&:&\mathrm{SAT},\\
\text{sourced Pati--Salam embedding}&:&\mathrm{UNSAT},\\
\text{single physical-Dirac descent}&:&\mathrm{UNDERDETERMINED}.
\end{array}}
\]

## 1. Explicit finite representation

For a sector \(e_{ab}\), define

\[
\pi(z)e_{ab}=z_a e_{ab},
\qquad
\pi^o(z)e_{ab}=z_b e_{ab},
\qquad
Je_{ab}=e_{ba},
\]

where \(J\) is antilinear. The sector data are

| orbit | sectors and KO-6 signs | relation signs | provenance |
|---|---|---|---|
| physical path 1 | (PN_+),(NP_-) | (+,-) | existing |
| physical path 2 | (IN_-),(NI_+) | (+,-) | existing |
| null orbit | (IP_+),(PI_-) | (+,-) | existing |
| spectator orbit | (PS_-),(SP_+) | (-,+) | reassigned in claim 1523 |
| intermediate orbit | (TP_-),(PT_+) | (+,-) | new (Z/JZ) |
| duality orbit | (TU_+),(UT_-) | (+,-) | new |

Therefore

\[
J^2=1,
\qquad J\gamma=-\gamma J.
\]

The left and right actions are diagonal, so

\[
[\pi(a),\pi^o(b)]=0.
\]

Because every sector is off diagonal, its signed minimal left-right projector
is available. Summing those projectors with the displayed signs represents
the grading, so orientability holds for this label geometry.

## 2. Intersection form

The intersection form computed directly from

\[
\cap_{ij}=\operatorname{Tr}
\bigl(\gamma\pi(e_i)\pi^o(e_j)\bigr)
\]

is, in the order \((P,I,N,S,T,U)\),

\[
\cap_6=
\begin{pmatrix}
0&-1&1&-1&1&0\\
1&0&-1&0&0&0\\
-1&1&0&0&0&0\\
1&0&0&0&0&0\\
-1&0&0&0&0&1\\
0&0&0&0&-1&0
\end{pmatrix},
\qquad
\boxed{\det\cap_6=1}.
\]

This independently reproduces the label-level matrix of claim 1526 from an
actual representation, rather than taking it as input.

## 3. Exhaustive Dirac-support search

For commutative direct-sum algebras the first-order condition on an edge

\[
e_{ab}\longleftrightarrow e_{cd}
\]

is equivalent to

\[
a=c\quad\hbox{or}\quad b=d.
\]

The exhaustive counts are

| filter | surviving unordered pairs |
|---|---:|
| all sector pairs | 66 |
| KO-6 odd | 36 |
| relation even | 30 |
| both KO-6 odd and relation even | 16 |
| also first order | 10 |

The ten survivors are

\[
\begin{split}
&PN-IN,\quad NP-NI,\\
&IN-IP,\quad NI-PI,\\
&IP-TP,\quad PI-PT,\\
&SP-TP,\quad PS-PT,\\
&TP-TU,\quad PT-UT.
\end{split}
\]

They form five \(J\)-orbits. The first two are the retained selected physical
path, the middle two implement the subdivided (N-Z-X) coefficient chain, and
the last connects the duality-repair orbit. Direct matrix evaluation verifies

\[
\{D,\gamma\}=0,
\qquad [D,\Gamma_{\rm rel}]=0,
\qquad [D,J]=0,
\qquad [[D,\pi(a)],\pi^o(b)]=0.
\]

There are no further edges satisfying all three selection rules. The
character graph is connected, although the doubled state graph has two
\(J\)-related components, as expected for this real completion.

## 4. Exact finite-Dirac spectrum

One state component is the tree

\[
PN-IN-IP-TP
\]

with the two further leaves (SP) and (TU) attached to (TP). Give its five
edges real weights (a,b,c,d,e) in that order. Its exact characteristic
polynomial is

\[
\chi_6(\lambda)=
\lambda^2\left[
\lambda^4-(a^2+b^2+c^2+d^2+e^2)\lambda^2
+a^2c^2+a^2d^2+a^2e^2+b^2d^2+b^2e^2
\right].
\]

Thus each component has two structural zero modes and the full real
completion has four. For unit weights,

\[
\chi_{12}(\lambda)=
\left[\lambda^2(\lambda^4-5\lambda^2+5)\right]^2,
\]

with spectrum

\[
0^{\times4},
\quad
\left(\pm\sqrt{\frac{5+\sqrt5}{2}}\right)^{\times2},
\quad
\left(\pm\sqrt{\frac{5-\sqrt5}{2}}\right)^{\times2}.
\]

The kernel is not caused by a tuned coefficient. The support tree has no
perfect matching, and the prefactor \(\lambda^2\) persists for arbitrary
nonzero edge weights.

## 5. Schur texture and its precise limit

On the Weyl-coefficient basis \((P,I,N,Z,X)\), retain

\[
M_5=
\begin{pmatrix}
A&x&y&0&0\\
x&D&0&0&0\\
y&0&0&g&0\\
0&0&g&0&h\\
0&0&0&h&0
\end{pmatrix}.
\]

The complementary block has null vector

\[
(I,N,Z,X)=(0,h,0,-g),
\]

and therefore

\[
\operatorname{cof}_{PP}(M_5)=0.
\]

Nevertheless,

\[
\det M_5=D y^2h^2,
\]

so the matrix is invertible for the required nonzero (D,y,h). The verifier
checks both identities over all \(4^6=4096\) assignments of
\((A,x,y,D,g,h)\) from \((-2,-1,1,2)\).

The protected texture and the categorical connector therefore coexist
exactly at coefficient level. They have not yet been shown to be the same
finite operator: the explicit twelve-state \(D\) has four zero modes while
\(M_5\) is invertible. Calling the construction a physical solution would
silently assume the missing descent map.

## 6. Physical spectrum and Pati--Salam admission

Relative to the four-character relation carrier, the ordinary completion
adds

\[
TP,PT,TU,UT.
\]

These are four complex label states arranged in two real fermion orbits, not
auxiliary entries that disappear from the Hilbert space. It also adds the
two algebra characters (T,U), hence new central unitary directions before a
gauge-kernel quotient.

No such independent sterile fermions occur in the sourced Pati--Salam
inventory, which contains only \((2,1,4)\) and \((1,2,4)\) per generation and
their conjugates. Nor can these one-dimensional sectors be modules of the
unchanged unreduced algebra

\[
\mathbb H_R\oplus\mathbb H_L\oplus M_4(\mathbb C),
\]

because it has no one-dimensional complex character. Treating
\(\mathcal A_6\) as an additional commuting family algebra does not solve the
problem: a mixed physical Pati--Salam bimodule already occupies its two
ordinary algebra slots.

Thus the six-character construction necessarily adds matter if read as an
ordinary spectral triple. If instead its sectors are only relational
correspondences acting on sourced matter, the action and physical descent
are new data not contained in the corpus.

## Verdict

The smallest ordinary completion exists and is mathematically sharp:

\[
\boxed{
\mathcal A_6,\mathcal H_{12},J,\gamma,D
\text{ satisfy the finite label axioms and }\det\cap_6=1.}
\]

But it is not the desired physical completion:

\[
\boxed{
\text{two new real matter orbits}+
\text{four forced Dirac zero modes}+
\text{no sourced Pati--Salam embedding}.}
\]

The minimal unresolved datum is now singular and explicit: a
correspondence/descent functor must map the twelve relation sectors to the
five-state physical coefficient matrix while preserving first order,
relation parity, the cofactor zero and the sourced carrier multiplicities.
Absent that datum, the formal geometry is SAT, the sourced embedding is
UNSAT, and the physical realization remains underdetermined.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_six_character_ordinary_correspondence_completion.mjs
node verification/verify/verify_spin23_pati_salam_graded_chain_physical_lift.mjs
node verification/verify/verify_spin23_spectator_connector_minimal_repair_exhaustion.mjs
node verification/prove/prove_unreduced_Pati_Salam_has_no_character_for_the_spectator_S.mjs
node verification/prove/prove_direct_sum_family_two_sided_slot_obstruction.mjs
~~~
