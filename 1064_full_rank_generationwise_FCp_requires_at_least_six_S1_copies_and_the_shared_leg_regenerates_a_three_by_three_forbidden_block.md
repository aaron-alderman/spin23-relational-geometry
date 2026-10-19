# Full-Rank Generationwise \(F_Cp\) Requires at Least Six \(S_1\) Copies, and the Shared Leg Regenerates a \(3\times3\) Forbidden Block

**Date:** 18 October 2026  
**Branches:** three generations, \(S_1\) mediation, block Gram rank, flavor alignment, radiative stability, collective versus generationwise response  
**Claim status:** exact finite-dimensional rank theorem and constructive saturation; physical flavor target and protected UV completion open  
**Certificate:** [derive_the_multigeneration_s1_block_gram_rank_bound_and_loop_obstruction.mjs](scripts/derive_the_multigeneration_s1_block_gram_rank_bound_and_loop_obstruction.mjs)

## Executive result

The two-copy repair of document 1062 is only the one-flavor answer. For \(g\) independent flavor directions, let

\[
\Lambda_L,\Lambda_u,\Lambda_d\in M_{N\times g}(\mathbb C)
\]

be the coupling matrices into an \(N\)-dimensional \(S_1\)-copy space, and let

\[
K=(M^2)^{-1}\succ0.
\]

Tree matching gives

\[
C_{Lu}=\Lambda_L^\dagger K\Lambda_u,
\qquad
C_{Ld}=\Lambda_L^\dagger K\Lambda_d,
\qquad
C_{ud}=\Lambda_u^\dagger K\Lambda_d.
\]

If the pure-star condition \(C_{ud}=0\) holds, then

\[
\boxed{
N\ge
\operatorname{rank}C_{Lu}
+
\operatorname{rank}C_{Ld}.
}
\]

For a generation-blind but generationwise full-rank target

\[
C_{Lu}=+ic\,I_3,
\qquad
C_{Ld}=-ic\,I_3,
\qquad
C_{ud}=0,
\]

both arm ranks are three. Therefore

\[
\boxed{N_{S_1}\ge6.}
\]

Six copies are sufficient algebraically. In \(\mathbb C^3\oplus\mathbb C^3\), choose

\[
\Lambda_L=
\begin{pmatrix}I_3\\I_3\end{pmatrix},
\qquad
\Lambda_u=
i\begin{pmatrix}I_3\\0\end{pmatrix},
\qquad
\Lambda_d=
-i\begin{pmatrix}0\\I_3\end{pmatrix}.
\]

This realizes the two identity arms and kills the right--right block.

The same loop obstruction also scales up. The shared left coupling generates

\[
\delta M^2\propto
\Lambda_L\Lambda_L^\dagger
=
\begin{pmatrix}
I_3&I_3\\
I_3&I_3
\end{pmatrix},
\]

which regenerates

\[
\boxed{
C_{ud}
=
\frac{\kappa}{m^2(m^2+2\kappa)}I_3
}
\]

when the starting mass is \(m^2I_6\).

Thus a literal \(F_Cp\otimes I_3\) bulk completion is much less economical than the one-generation response notation suggests. Two copies remain enough only if the physical pulse acts on one selected collective flavor direction.

## 1. Block-Gram theorem

Whiten mediator space with \(K^{1/2}\):

\[
\widetilde\Lambda_i=K^{1/2}\Lambda_i.
\]

Then

\[
C_{ud}=0
\quad\Longleftrightarrow\quad
\widetilde\Lambda_u^\dagger\widetilde\Lambda_d=0.
\]

The column spans

\[
U=\operatorname{im}\widetilde\Lambda_u,
\qquad
D=\operatorname{im}\widetilde\Lambda_d
\]

are orthogonal. Hence

\[
\dim U+\dim D\le N.
\]

Meanwhile

\[
\operatorname{rank}C_{Lu}
\le\operatorname{rank}\widetilde\Lambda_u
=\dim U,
\]

and similarly

\[
\operatorname{rank}C_{Ld}\le\dim D.
\]

Adding the inequalities proves

\[
N\ge
\operatorname{rank}C_{Lu}
+
\operatorname{rank}C_{Ld}.
\]

The theorem is independent of basis, mass eigenvalues, Fierz convention and the detailed entries of \(\Lambda_L\).

## 2. What “three generations” can mean

There are two inequivalent targets.

### Full generationwise action

The response generator acts as

\[
F_Cp\otimes I_3.
\]

Each arm has rank three, so a pure star needs at least six mediator directions. The displayed \(6\times3\) matrices saturate the bound.

### One collective flavor direction

The response first projects generation space onto one vector \(v\in\mathbb C^3\), then applies the one-generation carrier. Both arm matrices have rank one:

\[
C_{Lu}\propto vv^\dagger,
\qquad
C_{Ld}\propto vv^\dagger.
\]

The lower bound returns to two.

This branch is more economical, but it creates a new selector problem: why that flavor vector, how it relates to the observed Yukawa eigenbases, and why orthogonal generations do not participate.

The programme must no longer move silently between these two meanings.

## 3. The realistic bilinear space is even larger

A general \(S_1\) coupling has two flavor indices at each fermion bilinear. Flattening \(Q_iL_j\), \(u^c_ke^c_l\) and \(d^c_m\nu^c_n\) gives nine-dimensional bilinear spaces. If the target were a generic full-rank map on all such pair labels, the same theorem would give

\[
N\ge9+9=18.
\]

This is not the current target; \(F_Cp\otimes I_3\) selects three matched generation channels and therefore gives the smaller bound six. The number eighteen is a boundary warning against confusing a \(3\times3\) Yukawa matrix with one scalar-copy direction.

## 4. Flavor violation is the generic outcome

For arbitrary coupling matrices, the Wilson blocks are not proportional to \(I_3\). They contain cross-generation operators. The exact generationwise target requires simultaneously:

1. \(K\)-orthogonality of the entire up-like and down-like mediator subspaces;
2. rank three on each left-to-right arm;
3. equality of the three singular values if the action is exactly \(I_3\);
4. alignment with the physically selected quark and lepton flavor frames;
5. stability of all these statements under running.

Gauge representation theory provides none of these. A horizontal symmetry, minimal-flavor-violation spurion analysis or a source-derived Furey flavor module is required.

## 5. The shared-leg loop obstruction becomes a block

For the saturating construction, \(\Lambda_L\Lambda_L^\dagger\) has identity off-diagonal blocks. With

\[
M^2=m^2I_6+\kappa\Lambda_L\Lambda_L^\dagger,
\]

the rank-\(3\) version of the Sherman--Morrison--Woodbury identity yields

\[
\Lambda_u^\dagger(M^2)^{-1}\Lambda_d
=
\frac{\kappa}{m^2(m^2+2\kappa)}I_3
\]

after including the chosen endpoint phases.

The obstruction is not a small bookkeeping correction. It regenerates the entire forbidden generation-diagonal block. Generic flavor-nonuniversal loop weights would also create off-diagonal flavor structure.

## 6. Consequences for the Spin(2,3) claim

The Lie closure in documents 1058--1060 remains exact on its four-channel response carrier. This calculation changes the cost of realizing that carrier microscopically:

- **response-level closure:** one \(F_Cp\) generator;
- **one collective flavor mode:** at least two \(S_1\) mediator directions for a pure star;
- **three independent generation modes:** at least six;
- **generic nine-dimensional bilinear flavor map:** at least eighteen.

The most credible interpretation is presently that \(F_Cp\) acts on an aggregate response coordinate, not as a universal microscopic rotation on every flavor component. That interpretation still needs a derived projection and must be checked against observed flavor and CP data.

## 7. Stop-everything criteria

**Two-copy universality falsifier:** claim that the same two scalar copies realize \(F_Cp\otimes I_3\) with full-rank arms and zero \(u-d\) block.

**Rank-six trigger:** construct a genuine six-dimensional identical-\(S_1\) multiplicity space, with protected \(U\perp_KD\), and derive the identity-arm maps.

**Collective-mode trigger:** derive a unique rank-one flavor projector from the Furey/Jordan source and show that all orthogonal flavor modes consistently decouple.

**Flavor falsifier:** obtain generic off-diagonal Wilson blocks without a phenomenologically viable suppression scale.

**Loop-stability trigger:** prove that the full counterterm algebra preserves the orthogonal block decomposition, not merely the tree mass matrix.

## Verdict

| Target | Minimum \(S_1\) copy dimension |
|---|---:|
| one flavor or one collective flavor mode | \(2\) |
| \(g\) full-rank generationwise modes | \(2g\) |
| three generationwise modes | \(6\) |
| generic three-by-three bilinear-pair space | \(18\) |

The bound is exact. What remains unknown is which flavor target the Jordan/Furey response carrier physically represents.

## Position in the corpus

- [copy-metric and loop-stability audit](1063_the_doubled_furey_links_do_not_supply_two_S1_copies_and_the_shared_QL_leg_radiatively_breaks_the_naive_orthogonality.md)
- [tree-level one-flavor rank theorem](1062_one_S1_mediator_cannot_generate_a_pure_FCp_pulse_but_two_orthogonal_copies_realize_the_exact_oriented_star.md)
- [continuous response generator](1059_the_linear_furey_product_FCp_exponentiates_exactly_to_the_missing_continuous_sp4_channel_rotation_but_its_action_term_is_open.md)

