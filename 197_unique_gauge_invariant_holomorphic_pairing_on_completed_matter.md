# The Unique Gauge-Invariant Holomorphic Pairing on the Completed Matter Module

**Date:** 17 October 2026  
**Branches:** B03, B05 and B11  
**Claim status:** exact one-generation Standard-Model representation classification; coefficient and family structure remain open

## 1. Pairing question

The Lorentz-exterior construction requires an internal bilinear pairing on matter supports. An unrestricted pairing would be unacceptable: it could generate gauge-violating masses for charged chiral fields.

The unbroken Standard-Model gauge group supplies a sharp selection rule. Use the completed all-left generation

\[
Q, u^c, d^c, L, e^c, N,
\]

with representations

\[
\begin{array}{c|c}
Q&(\mathbf3,\mathbf2)_{1/6}\\
u^c&(\overline{\mathbf3},\mathbf1)_{-2/3}\\
d^c&(\overline{\mathbf3},\mathbf1)_{1/3}\\
L&(\mathbf1,\mathbf2)_{-1/2}\\
e^c&(\mathbf1,\mathbf1)_{1}\\
N&(\mathbf1,\mathbf1)_{0}.
\end{array}
\]

We ask which holomorphic Lorentz scalars \(\psi_i\psi_j\) are also gauge singlets without inserting a Higgs field.

## 2. Exact classification

A bilinear requires simultaneously:

1. a color singlet in \(R_i^{(3)}\otimes R_j^{(3)}\);
2. a weak singlet in \(R_i^{(2)}\otimes R_j^{(2)}\);
3. \(Y_i+Y_j=0\).

Checking all 21 unordered pairs gives exactly one solution:

\[
\boxed{NN.}
\]

It is a color singlet, weak singlet and hypercharge neutral. Its Lorentz contraction is nonzero by the exterior-algebra calculation.

## 3. Why the other tempting pairs fail

- \(LL\) contains a weak singlet, but has hypercharge \(-1\).
- \(QQ\) contains a weak singlet, but \(\mathbf3\otimes\mathbf3\) has no color singlet and its hypercharge is nonzero.
- \(Qu^c\) and \(Qd^c\) can contract color, but remain weak doublets and carry nonzero hypercharge.
- \(u^cd^c\) and the same-species antiquark pairs have no color singlet.
- \(Le^c\) remains a weak doublet and is hypercharged.
- Any pair involving \(N\) and a charged multiplet inherits the other multiplet's nontrivial gauge representation.

Thus gauge invariance prevents the internal pairing from generating forbidden bare masses in every charged chiral sector.

## 4. Higgs dressing recovers the Yukawa channels

Let

\[
H\sim(\mathbf1,\mathbf2)_{1/2},
\qquad
H^\dagger\sim(\mathbf1,\mathbf2)_{-1/2}
\]

at the representation-counting level. Exhausting fermion-pair-plus-Higgs singlets gives the four familiar channels:

\[
Qu^cH,
\qquad
Qd^cH^\dagger,
\qquad
Le^cH^\dagger,
\qquad
LNH.
\]

Their hypercharge sums are respectively

\[
\frac16-\frac23+\frac12=0,
\quad
\frac16+\frac13-\frac12=0,
\quad
-\frac12+1-\frac12=0,
\quad
-\frac12+0+\frac12=0.
\]

This agrees with the four cyclic Yukawa triangles in the completed Furey support.

## 5. Active-neutrino Majorana mass requires two Higgs fields

The bare \(LL\) bilinear is forbidden. The lowest Standard-Model operator is instead the Weinberg structure

\[
(LH)(LH),
\]

whose total hypercharge vanishes. It has mass dimension five and arises from the seesaw after integrating out \(N\).

The distinction between \(NN\) and \((LH)(LH)\) is therefore forced by gauge symmetry, not by an arbitrary block convention.

## 6. Consequence for the internal pairing

On one completed generation, a gauge-equivariant holomorphic quadratic pairing has support only on the sterile singlet line. Up to normalization,

\[
\dim_\mathbb C
\operatorname{Hom}_{G_{\rm SM}}
\left(
\operatorname{Sym}^2\mathcal M_{16},
\mathbf1
\right)
=1
\]

for bare matter bilinears, with the Lorentz-statistics qualification understood.

This is precisely the uniqueness needed to avoid overpairing. It also gives a representation-theoretic reason that the selected neutral arrow is special beyond its ternary-closure dimension.

## 7. What uniqueness does not fix

For \(n\) generations, the sterile subspace is \(F_N\cong\mathbb C^n\). Gauge invariance permits the entire symmetric matrix space

\[
M\in\operatorname{Sym}^2(F_N^*),
\qquad
\dim_\mathbb C=\frac{n(n+1)}2.
\]

Therefore:

- the **species support** of the Majorana pairing is unique;
- the **generation tensor** is not;
- the mass scale and CP phases are not fixed;
- alignment with the exceptional coefficient remains subject to the generation-commutant no-go.

The one-generation uniqueness should not be overstated as a flavor prediction.

## 8. Linking-algebra interpretation

The linking algebra provides canonical source and target projectors and the adjoint dual arrow. Gauge equivariance then selects the neutral self-pair from all possible module pairings.

What has not yet been proved is that a unique source action functional built from the linking algebra produces this pairing with a nonzero coefficient. Representation theory says the term is unique if present, not that it must be present.

## 9. Stop-everything and falsification gates

**Action derivation:** the Furey/linking action produces the unique neutral pairing and all four Higgs-dressed Yukawa pairings with fixed relative normalization.

**No-overpairing theorem:** the full source construction proves that every charged bare self-pair vanishes by gauge equivariance, not by manual deletion.

**Flavor selection:** an intrinsic family algebra reduces the allowed symmetric sterile matrix to a predictive subspace.

**Coefficient failure:** the unique invariant exists but its coefficient remains an arbitrary relevant parameter, providing support without explanation.

**Broken-phase trap:** a construction imposed only after electroweak breaking admits extra electromagnetic-neutral pairings and loses the ultraviolet selection theorem.

## 10. Certificate

The [completed-matter pairing certificate](scripts/verify_unique_completed_matter_pairing.mjs) exhausts all unordered fermion pairs, proves \(NN\) is the unique bare gauge singlet, exhausts one-Higgs dressings to recover the four Yukawa channels and verifies the Weinberg operator's hypercharge cancellation.

## Companion documents

- [Lorentz exterior pairing and the nilpotent-arrow gate](196_lorentz_exterior_pairing_resolves_nilpotent_arrow_mass_gate.md)
- [Generation-commutant no-go](192_generation_commutant_no_go_for_automatic_seesaw_alignment.md)
- [Unique right-handed-neutrino TRO completion](167_unique_right_handed_neutrino_tro_completion_and_spin23_tradeoff.md)
- [Cyclic Yukawa topology selection](111_furey_cyclic_yukawa_topology_selection.md)
