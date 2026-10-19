# The Weak-Center Incidence Twist Acts as Overall Minus on Every Dirac Response and Cannot Supply the Missing Lepton–Color Sign

**Date:** 17 October 2026  
**Branches:** weak-center local coefficients, Furey incidence, Dirac bilinears, paired mediator, and $A_2$ selector  
**Claim status:** exact character-level no-go; the weak-center role in the first-order incidence seam remains intact  
**Certificate:** [prove_the_weak_center_incidence_twist_cannot_supply_the_missing_lepton_color_relative_sign.mjs](scripts/prove_the_weak_center_incidence_twist_cannot_supply_the_missing_lepton_color_relative_sign.mjs)

## Executive result

The first proposed repair of document 899 fails for a simple representation-theoretic reason.

The weak center

\[
z_L=-I\in SU(2)_L
\]

acts by $-1$ on every left-handed weak doublet and by $+1$ on every weak singlet. Hence every Dirac bilinear pairs one singlet with one doublet and has character

\[
\chi_{z_L}(f^cf)
=
(+1)(-1)
=-1.
\]

This applies equally to

\[
\nu^c\nu,quad e^ce,quad u_i^cu_i,quad d_i^cd_i.
\]

After color contraction, the induced action on the lepton/color response pair is therefore

\[
-I_2=
\begin{pmatrix}-1&0\\0&-1\end{pmatrix},
\]

not the required sector-relative sign

\[
D=
\begin{pmatrix}1&0\\0&-1\end{pmatrix}.
\]

Thus the weak-center-twisted incidence system cannot turn the two projectively identical minimal-$\mathbf{10}$ Clebsch directions into the two distinct $A_2$ root directions.

This does **not** invalidate document 889. Weak-center parity still explains the Furey incidence pattern $(+,-,-,+)$ exactly and remains a credible first-order orientation line. It simply acts on weak representation parity rather than on the lepton-versus-color distinction needed here.

## 1. Field characters

For the Standard-Model fields written as left-handed Weyl fields:

\[
\chi_{z_L}(u_i)
=\chi_{z_L}(d_i)
=\chi_{z_L}(\nu)
=\chi_{z_L}(e)
=-1,
\]

while

\[
\chi_{z_L}(u_i^c)
=\chi_{z_L}(d_i^c)
=\chi_{z_L}(\nu^c)
=\chi_{z_L}(e^c)
=+1.
\]

Therefore all eight Dirac-pair types have character $-1$.

The certificate checks every color component individually.

## 2. Recovery of the Furey incidence signs

On each ordered quartet

\[
(d_i^c,u_i,d_i,u_i^c),
\]

the field character is

\[
(+,-,-,+),
\]

exactly as proved in document 889.

But regrouping the same quartet into its two Dirac bilinears gives

\[
\chi_{z_L}(u_i^cu_i)=-1,
\qquad
\chi_{z_L}(d_i^cd_i)=-1.
\]

The twist distinguishes singlet legs from doublet legs inside the incidence boundary. It does not distinguish the two completed response sectors after those legs are paired.

## 3. Why contraction cannot repair it

Let

\[
B_\ell=f_\ell^cf_\ell,
\qquad
B_q=\sum_i s_i f_i^cf_i
\]

for any fixed color contraction coefficients $s_i$. Since every summand has weak-center character $-1$,

\[
z_L:(B_\ell,B_q)\mapsto(-B_\ell,-B_q).
\]

Changing the color orientation $s_i$ does not alter this conclusion. Nor does dimension-normalized trace, Hilbert normalization, or saturation of the color lattice: these operations are linear within the color sector and commute with the scalar weak-center action.

The missing $D$ must therefore involve data that sees lepton versus color, not merely weak doublet versus singlet.

## 4. Consequence for the branch graph

The route

\[
\text{minimal }16\,16\,10
+z_L\text{ local coefficient}
\longrightarrow
D
\]

is closed negatively.

The surviving routes are now narrower:

1. a genuinely color-relative incidence or boundary local system;
2. a nonminimal $120$ or $126$ mediator Clebsch structure;
3. an $SO(10)$-breaking threshold or holonomy that distinguishes the two composite sectors;
4. a different origin for $R$ unrelated to paired vector-mediator reflections.

The no-go also prevents overloading one sign with two incompatible jobs. Weak-center parity supplies the first-order weak seam; another datum must supply lepton/color relative orientation.

## 5. Stop-everything and falsification criteria

**Color-local-system trigger:** a derived Furey or boundary coefficient acts trivially on the lepton determinant line and by minus one on the normalized color relationship line.

**Nonminimal trigger:** an explicit $120$ or $126$ Clebsch map gives a second projective lepton/color direction at the $A_2$ angle.

**Negative continuation:** every gauge-compatible local coefficient factors only through weak representation parity. Then none can supply $D$.

**Falsifier:** any Standard-Model Dirac pair has weak-center character different from $-1$, or color contraction changes a scalar weak-center character into a relative sector sign. The exact character calculation excludes both.

## 6. Verdict

| Question | Verdict |
|---|---|
| Does weak-center parity reproduce $(+,-,-,+)$ on the Furey quartet? | **yes** |
| What is its character on each Dirac bilinear? | **$-1$** |
| What does it induce on the lepton/color response pair? | **$-I_2$** |
| Is that the required $D=\operatorname{diag}(1,-1)$? | **no** |
| Does this damage the first-order weak-seam result? | **no** |

## 7. Position in the corpus

- [weak-center-twisted Furey incidence](889_the_furey_incidence_quartet_is_a_weak_center_twist_of_an_exact_spin10_neutral_relation_not_one_of_the_25_minimum_code_logicals.md)
- [conditional paired-reflection $A_2$ theorem](898_color_multiplicity_and_an_oriented_weak_sign_turn_the_paired_so10_mediator_reflections_into_the_exact_a2_coxeter_generator.md)
- [minimal vector Clebsch sign no-go](899_the_explicit_spin10_16_16_10_clebsch_map_gives_only_an_overall_weak_sign_so_the_minimal_paired_mediator_c3_route_closes_negatively.md)
