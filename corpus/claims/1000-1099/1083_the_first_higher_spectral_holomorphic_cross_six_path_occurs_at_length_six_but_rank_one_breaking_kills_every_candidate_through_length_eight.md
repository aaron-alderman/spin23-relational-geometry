# The First Higher-Spectral Holomorphic Cross-Six Path Occurs at Length Six, but Rank-One Breaking Kills Every Candidate Through Length Eight

**Date:** 18 October 2026  
**Branches:** higher spectral action, finite-Dirac closed paths, rank-one vacuum, proton safety  
**Claim status:** exhaustive graph and spectral-word component theorem through length eight; no all-orders or loop claim  
**Certificate:** [find_first_higher_spectral_path_for_holomorphic_cross_six_mixing.mjs](../../../verification/find/find_first_higher_spectral_path_for_holomorphic_cross_six_mixing.mjs)  
**Primary structural source:** [Chamseddine–Connes–van Suijlekom 2015](https://arxiv.org/abs/1507.08161)

## Executive result

Document 1082 proved that the renormalizable length-four spectral square cannot generate holomorphic \(H_LH_R\) mixing. Extending the same exact graph enumeration gives a sharper answer:

| path length | closed walks | holomorphic-bilinear candidates | cyclic candidate classes |
|---:|---:|---:|---:|
| 2 | 8 | 0 | 0 |
| 4 | 32 | 0 | 0 |
| 6 | 128 | 6 | 1 |
| 8 | 512 | 40 | 5 |

The first graph-theoretic escape is the length-six word

\[
H_L\,\bar\Sigma\,H_R^\dagger H_RH_R^\dagger\Sigma^\dagger,
\]

up to cyclic rotation. Choosing \(H_L\) and the middle \(H_R\) as the two six fields, and replacing the two \(H_R^\dagger\) factors by conjugate ten-plet breaking VEVs, leaves a phase-neutral holomorphic cross-six bilinear.

However, for the rank-one neutrino spurion

\[
S=vv^T
\]

and a colour-preserving diagonal \(\Sigma\) background, the corresponding \(SU(4)\) matrix trace vanishes. All five independent length-eight candidate classes vanish for the same reason. A generic higher-rank symmetric spurion makes every displayed class nonzero in the explicit witness.

Thus:

\[
\boxed{
\text{graph protection ends at length six, but rank-one component protection survives through length eight.}
}

## 1. Candidate definition

Model C requires the left ten-plet to have zero VEV while the right ten-plet supplies the symmetry-breaking neutrino VEV. A closed path can therefore reduce to a holomorphic \(H_LH_R\) six bilinear only if its field word contains:

- exactly one undaggered \(H_L\);
- no \(H_L^\dagger\), because there is no left same-chirality VEV to absorb it;
- at least one undaggered \(H_R\), one occurrence of which is retained as the right six;
- any remaining \(H_R,H_R^\dagger\) factors replaceable by right-ten VEVs;
- \(\Sigma\)-type factors replaceable by neutral colour-preserving vacua.

The Hermitian-conjugate definition gives the antiholomorphic candidates. The certificate scans both and obtains identical counts.

## 2. Why length six is minimal

The primitive reverse traversal of the finite square is

\[
H_L\,\bar\Sigma\,H_R^\dagger\Sigma^\dagger.
\]

It contains the wrong right-Higgs orientation for a holomorphic cross bilinear. Inserting one immediate right-sector backtrack

\[
H_RH_R^\dagger
\]

changes the word to

\[
H_L\,\bar\Sigma\,H_R^\dagger
\underbrace{H_RH_R^\dagger}_{\text{right backtrack}}
\Sigma^\dagger.
\]

It now contains one \(H_L\), one selectable \(H_R\), and two \(H_R^\dagger\) VEV slots. Its common-H phase charge is

\[
2+2-2-2=0.
\]

No shorter closed path has this field content. The graph obstruction of 1082 is therefore exact but order bounded.

In four-dimensional spectral-action language, a six-field word belongs first to the \(a_6/\Lambda^2\) part of the asymptotic expansion rather than the renormalizable \(a_4\) scalar potential. It is an irrelevant high-scale correction, but it is conceptually decisive because it tests whether protection is exact or merely leading order.

## 3. Rank-one annihilation of the length-six word

Suppressing weak indices, the relevant \(SU(4)\) factor has the matrix form

\[
\operatorname{tr}\!left(
A_LD S^*A_R S^*D
\right),
\]

where

\[
A_L^T=-A_L,
\qquad
A_R^T=-A_R,
\qquad
S^*=\bar v\bar v^T,
\qquad
D=\operatorname{diag}(a,a,a,b).
\]

The middle sandwich is

\[
S^*A_RS^*
=
\bar v\left(\bar v^TA_R\bar v\right)\bar v^T
=0
\]

because an antisymmetric form vanishes on two copies of the same vector. Therefore the complete trace is zero independently of \(A_L\) and of the diagonal entries of \(D\).

For a generic symmetric \(S\), the sandwich \(SA_RS\) need not vanish. The certificate supplies an explicit integer witness with nonzero trace \(6476\). The zero is genuinely a rank-one-vacuum theorem.

## 4. Exhaustion through length eight

At length eight there are 512 closed walks and 40 candidates in each holomorphic orientation. Cyclic reduction leaves five classes. They arise by:

- adding a \(\Sigma\)-backtrack to the length-six word;
- moving the \(\Sigma\)-backtrack inside the right-sector segment;
- adding a second right-Higgs backtrack;
- adding a conjugate-\(\Sigma\) backtrack on either side.

For every class, and for every possible choice of which undaggered \(H_R\) occurrence is retained as the six, the rank-one component trace is zero. The explicit generic symmetric spurion gives nonzero values in every class.

The result is stronger than a phase argument and weaker than an all-orders proof:

\[
\boxed{
\text{all spectral matrix-word candidates through }\Phi^8
\text{ vanish on the rank-one/diagonal vacuum.}
}

## 5. Toward an all-orders statement

The observed mechanism suggests a combinatorial factorization. With one \(H_L\), no \(H_L^\dagger\), and only right-sector same-chirality VEVs, a closed path has reverse winding around the square. Any inserted undaggered \(H_R\) six must be balanced by additional daggered right-Higgs crossings. In the reduced matrix word it becomes trapped between rank-one projectors transported by \(D\).

Because a colour-preserving diagonal \(D\) preserves the neutrino line,

\[
Dv\propto v,
\]

every such sandwich is expected to reduce to

\[
v^TA_Rv=0.
\]

This is now the leading all-orders conjecture. It should be proved as a normal-form theorem for closed walks decorated by rank-one projectors, rather than inferred from scans at successively larger lengths.

## 6. Boundaries

The present theorem does not include:

- independent contractions not generated by the ordered spectral matrix word;
- a \(\Sigma\) vacuum that rotates the neutrino line instead of preserving it;
- a nonzero left-ten VEV;
- multiple independent right-ten VEV directions;
- higher-rank breaking backgrounds;
- fermion-loop counterterms after symmetry breaking;
- nonminimal finite-Dirac edges;
- numerical suppression from \(a_6/\Lambda^2\).

The weak-index factor was not needed to prove the zeros because the \(SU(4)\) factor already vanishes. A nonzero \(SU(4)\) result for a more general vacuum would still require the weak contraction to be audited.

## 7. Stop-everything and reopening criteria

**All-orders graph stop:** graph topology alone no longer excludes the dangerous bilinear at length six.

**Length-six danger stop:** the existence of the path does not imply nonzero mixing; its rank-one component contraction vanishes exactly.

**Finite-scan stop:** length-eight exhaustion is evidence for an all-orders normal form, not a proof of it.

**Positive reopening trigger:** prove that every admissible holomorphic residual word contains a transported rank-one sandwich \(P_vA_RP_v=0\).

**Negative trigger:** find one closed spectral word, physical vacuum assignment and complete weak/colour contraction with nonzero \(H_{3L}H_{\bar3R}\) or \(H_{3L}H_{\bar3L}\) coefficient.

**Quantum trigger:** construct a broken-phase loop counterterm that is not constrained to the same spectral word algebra.

## 8. Verdict

The hierarchy of protection is now explicit:

\[
\begin{array}{c|c}
\text{layer} & \text{result}\\ \hline
SU(4)\text{ representation theory} & \text{Pfaffian mixing allowed}\\
\text{length-four spectral graph} & \text{cross Pfaffian absent}\\
\text{length-six graph} & \text{first candidate appears}\\
\text{rank-one vacuum contraction} & \text{candidate vanishes}\\
\text{generic higher-rank vacuum} & \text{candidate reappears}
\end{array}
\]

This is a genuine research-frontier result: protection is neither a generic gauge theorem nor an arbitrary zero. It is tied to the singular rank-one geometry of the breaking vacuum and to the restricted word algebra of the finite spectral triple.

## Position in the corpus

- [minimal length-four spectral square](1082_the_minimal_spectral_Pati_Salam_block_graph_forces_cross_six_mixing_to_be_Hermitian_at_quartic_order.md)
- [rank-one breaking-spurion audit](1081_the_common_H_phase_is_broken_by_the_Pati_Salam_ten_vev_but_a_rank_one_neutrino_spurion_annihilates_the_direct_six_Pfaffian_quartic.md)
- [complex-six Pfaffian mixing gate](1080_the_complex_Pati_Salam_six_has_a_gauge_invariant_Pfaffian_that_reconnects_leptoquark_and_diquark_sources_unless_a_phase_grading_forbids_it.md)
- [all-orders rank-one bridge theorem](1084_the_minimal_spectral_graph_has_an_all_orders_rank_one_bridge_normal_form_that_forbids_holomorphic_cross_six_mixing.md)
