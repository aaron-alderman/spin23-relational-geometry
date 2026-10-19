# The Doubled Furey Links Do Not Supply Two \(S_1\) Copies, and the Shared \(QL\) Leg Radiatively Breaks the Naive Orthogonality

**Date:** 18 October 2026  
**Branches:** doubled Furey arrows, scalar multiplicity, \(S_1\) completion, inverse-mass metric, radiative stability, oriented phase  
**Claim status:** exact multiplicity and mass-metric audit of the current finite model; standard perturbative self-energy obstruction; a protected two-copy completion remains open  
**Certificate:** [audit_doubled_furey_s1_multiplicity_mass_metric_and_loop_stability.mjs](../../../verification/audit/audit_doubled_furey_s1_multiplicity_mass_metric_and_loop_stability.mjs)

## Executive result

The next stop-everything test is negative in the minimal doubled-arrow geometry.

The three colored links

\[
QL,
\qquad
u^ce^c,
\qquad
d^c\nu^c
\]

are three independent **coupling slots**. Gauge dressing shows that they can all use one complex scalar representation

\[
S_1=(\bar{\mathbf3},\mathbf1)_{1/3}.
\]

The first link uses \(S_1\); the other two use \(S_1^\dagger\). A field and its Hermitian conjugate are not two propagating copies. The minimal endpoint construction contains no scalar kinetic Hilbert space, copy index or scalar mass operator from which a multiplicity two could be derived.

Therefore

\[
\boxed{
\text{doubled arrows}\;\not\Rightarrow\;2\times S_1.
}
\]

Two copies remain a valid extension, but they are additional input at this stage.

There is a second, stronger obstruction. Even after adding two copies and choosing the tree-level vectors

\[
\lambda_L=(1,1)^T,
\qquad
\lambda_u=(i,0)^T,
\qquad
\lambda_d=(0,-i)^T,
\]

the common \(QL\) coupling generates a mediator self-energy proportional to

\[
\lambda_L\lambda_L^\dagger
=
\begin{pmatrix}1&1\\1&1\end{pmatrix}.
\]

It mixes the two copies. Starting from \(M^2=m^2I\), the corrected inverse propagator metric is

\[
\left(m^2I+\kappa\lambda_L\lambda_L^\dagger\right)^{-1},
\]

and the forbidden right--right coefficient becomes

\[
\boxed{
C_{ud}
=\lambda_u^\dagger
\left(m^2I+\kappa\lambda_L\lambda_L^\dagger\right)^{-1}
\lambda_d
=\frac{\kappa}{m^2(m^2+2\kappa)}\ne0.
}
\]

The rank-two construction in document 1062 is an exact tree-level witness, but it is not radiatively closed by the presently stated symmetries.

## 1. Incidence multiplicity is not field multiplicity

The minimal doubled Furey geometry proved that seven complex finite-Dirac coefficients survive first order. Three occupy the colored links. This counts entries of a coupling matrix; it does not count independent fluctuating scalar fields.

After gauge dressing, the singlet colored channels are

\[
\begin{array}{c|c}
\text{link}&\text{scalar orientation}\\ \hline
Q-L&S_1\\
u^c-e^c&S_1^\dagger\\
d^c-\nu^c&S_1^\dagger.
\end{array}
\]

One complex \(S_1\) field supports all three couplings. Its conjugate is fixed by complex conjugation and self-adjointness. Counting \(S_1\) and \(S_1^\dagger\) separately would double-count one complex degree of freedom.

To derive two physical copies, the finite construction would need at least one of the following:

1. a two-dimensional multiplicity space in the relevant gauge-equivariant scalar fluctuation module;
2. two independent kinetic poles with the same \(S_1\) quantum numbers;
3. a linking-algebra calculation whose identical-irrep intertwiner space has complex dimension two.

None is part of the commutative endpoint model used in Foundations Parallel 02--03. Its data stop at incidence and representation compatibility.

## 2. The invariant condition uses the full inverse mass matrix

For \(n\) identical mediators, let \(M^2\succ0\) be the Hermitian mass-squared matrix in copy space. Tree matching gives

\[
C_{ij}=\lambda_i^\dagger(M^2)^{-1}\lambda_j.
\]

The exact sparse-star conditions are therefore

\[
\lambda_u^\dagger(M^2)^{-1}\lambda_d=0,
\]

and, for the symmetric normalized \(F_Cp\) target,

\[
\left|\lambda_L^\dagger(M^2)^{-1}\lambda_u\right|
=
\left|\lambda_L^\dagger(M^2)^{-1}\lambda_d\right|.
\]

These equations are invariant under a unitary change of mediator basis. Coordinate orthogonality before the mass matrix is diagonalized has no physical force.

For two copies,

\[
M^2=
\begin{pmatrix}
a&z\\
\bar z&b
\end{pmatrix},
\qquad ab>|z|^2.
\]

With the displayed (u,d) vectors, the first condition holds exactly only when the off-diagonal inverse propagator vanishes, equivalently (z=0). If (z=0), equal arm magnitude additionally requires (a=b) for equal bare coupling magnitudes. Coupling tuning can compensate unequal masses, but then equality is not symmetry-derived.

## 3. Gauge symmetry and \(B,L\) do not protect the metric

Both copies have identical

\[
(SU(3)_c,SU(2)_L,Y;B,L)
=
(\bar{\mathbf3},\mathbf1,1/3;-1/3,-1).
\]

Consequently gauge symmetry and separate baryon and lepton number allow every positive Hermitian \(2\times2\) matrix \(M^2\). They distinguish neither the two axes nor their masses.

A copy parity

\[
P=\operatorname{diag}(1,-1)
\]

would forbid off-diagonal mixing. An independent copy exchange

\[
X=\begin{pmatrix}0&1\\1&0\end{pmatrix}
\]

would then force equal diagonal masses. Thus invariance under both (P) and (X) is a sufficient **mass-sector** condition for

\[
M^2=m^2I.
\]

It is not yet a symmetry of the full interaction. The shared vector \(\lambda_L=(1,1)\) is not an eigenvector of the copy parity \(P\). More generally, an unbroken Abelian charge cannot distinguish the copies while allowing the same single bilinear \(QL\) to couple to both: both interaction terms require the two mediators to carry the same compensating charge.

## 4. The shared leg regenerates the forbidden edge

The same coupling that makes the star connected destabilizes its orthogonality. A \(QL\) loop contributes to the scalar two-point function with copy-space tensor

\[
\delta M^2_{ab}\propto
(\lambda_L)_a(\lambda_L)_b^*.
\]

For the constructive vectors of document 1062 this is off diagonal. The exact rank-one inverse formula gives

\[
\left(m^2I+\kappa ll^\dagger\right)^{-1}
=\frac1{m^2}
\left(
I-\frac{\kappa}{m^2+\kappa\lVert l\rVert^2}ll^\dagger
\right),
\qquad l=(1,1)^T.
\]

Contracting with \(u=i e_1\) and \(d=-i e_2\) yields

\[
C_{ud}=\frac{\kappa}{m^2(m^2+2\kappa)}.
\]

The coefficient, sign and finite part of \(\kappa\) depend on the full quantum field theory and renormalization prescription. The tensor structure does not: whenever the same dynamical bilinear couples to both mediator copies, its two-point loop admits \(ll^\dagger\). An exact zero needs a symmetry-complete cancellation, an enlarged multiplet with compensating loops, or a nonperturbative selection rule.

This is the new stop-everything condition:

> A proposed two-copy completion must prove that the full renormalized inverse-mass metric preserves \(\lambda_u\perp_{M^{-2}}\lambda_d\), not merely arrange it at tree level.

## 5. The ±(i) star phase is not yet an observable

There are three bilinear vertices and only two nonzero cross edges. Their graph is a tree. Independent rephasings of the three bilinears remove both edge phases. The number of rephasing-invariant phases is the graph cycle rank

\[
E-V+1=2-3+1=0.
\]

Thus the assignments \(+i\) and \(-i\) are an exact match to the chosen \(F_Cp\) source convention, but are not by themselves physical CP data. Their orientation becomes meaningful only after another structure fixes the source frame—for example ordinary Yukawa matrices, a Furey antiunitary, or a third edge. If the forbidden \(u-d\) edge closes the triangle, the cycle rank becomes one and a Wilson-loop phase survives rephasing.

This corrects an ambiguity in documents 1061--1062: the open problem is not to derive two absolute numbers (+i,-i), but to derive the oriented star relative to the already fixed Jordan/Furey generator frame.

## 6. Open completion routes

### Route A — actual multiplicity-two fluctuation module

Replace the endpoint toy algebra by the full noncommutative finite module and compute the \(S_1\) isotypic multiplicity in the one-form space. A result of one is a direct no-go for the minimal source derivation. A result of at least two opens the mass audit but does not solve it.

### Route B — protected doubled mediator sector

Find a symmetry acting jointly on mediators and additional source bilinears so that the complete interaction is invariant, \(M^2\propto I\), and loop corrections remain scalar in copy space. One shared \(QL\) spurion is insufficient.

### Route C — accept the third edge

Retain one \(S_1\) and interpret \(B_u^\dagger B_d+\mathrm{h.c.}\) as part of a larger generator. This abandons the pure \(F_Cp\) pulse but may connect to the paired-wall or non-diagonal Jordan-cubic branches. Its rephasing-invariant triangle phase becomes a potentially physical orientation observable.

### Route D — threshold or boundary realization

If the conversion is a localized pulse rather than a propagating bulk scalar sector, derive the effective kernel directly. A boundary selection rule could impose the sparse Gram without inheriting an ordinary bulk scalar self-energy, but it must still satisfy positivity, unitarity and charge flow.

## 7. Falsifiers and triggers

**Multiplicity falsifier:** count \(S_1\) and \(S_1^\dagger\) as two copies of one complex field.

**Endpoint sufficiency falsifier:** infer scalar kinetic multiplicity from the number of allowed finite-Dirac coefficients without constructing the fluctuation module.

**Mass-metric falsifier:** test \(\lambda_u^\dagger\lambda_d=0\) while ignoring \(M^{-2}\).

**Radiative falsifier:** impose \(M^2=m^2I\) at one scale but provide no symmetry or cancellation protecting the off-diagonal two-point function.

**Protected-completion trigger:** exhibit a full field content and symmetry for which every allowed counterterm respects the sparse star.

**Alternative-generator trigger:** show that the regenerated (u-d) edge combines with the two crossed edges into a known Jordan/TKK or paired-wall generator rather than an arbitrary contaminant.

## Verdict

| Question | Verdict |
|---|---|
| Do three colored Furey links mean three scalar copies? | **No** |
| Does \(S_1^\dagger\) count as a second \(S_1\)? | **No** |
| Does the present endpoint geometry derive two \(S_1\) copies? | **No** |
| Are two added copies sufficient at tree level? | **Yes** |
| Do gauge symmetry and \(B,L\) protect their inverse-mass orthogonality? | **No** |
| Does the shared \(QL\) leg generically regenerate mixing? | **Yes** |
| Are the bare ±(i) phases invariant on the pure star? | **No; the graph has no cycle** |
| Is a protected two-copy completion excluded? | **No; it requires additional structure** |

## Position in the corpus

- [tree-level rank-two witness](1062_one_S1_mediator_cannot_generate_a_pure_FCp_pulse_but_two_orthogonal_copies_realize_the_exact_oriented_star.md)
- [gauge dressing of the doubled Furey links](../../programmes/foundations/programme_foundations_parallel_03_gauge_dressing_turns_the_three_extra_furey_links_into_s1_s3_leptoquark_channels.md)
- [minimal \(S_1\) operator completion](1061_the_minimal_sm_field_completion_of_the_furey_channel_pulse_is_a_pair_of_dimension_six_S1_exchange_operators_with_an_underived_relative_phase.md)

