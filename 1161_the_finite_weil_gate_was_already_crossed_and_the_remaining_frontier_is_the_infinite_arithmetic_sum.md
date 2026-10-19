# The Finite Weil Gate Was Already Crossed; the Remaining Frontier Is the Infinite Arithmetic Sum

**Date:** 19 October 2026  
**Branches:** corpus reconciliation, genus-two \(A_2\) Weil representation, congruence shadow, automorphic completion, physical observable map  
**Claim status:** exact reconciliation of existing results; proposed vector-valued Eisenstein construction remains to be executed

## Executive result

Document 1160 offered two next routes:

1. construct a physically selected finite Weil representation;
2. construct an arithmetic parabolic-coset sum.

The corpus audit shows that route 1 has already been completed mathematically.

The genus-two \(A_2\) discriminant construction supplies

\[
\mathcal H_{A_2}(\Sigma_2)
=\mathbb C[(A_2^*/A_2)^2]
\cong\mathbb C[(\mathbb Z/3)^2]
\cong\mathbb C^3\otimes\mathbb C^3,
\]

with Heisenberg phase space

\[
H_1(\Sigma_2,\mathbb Z/3)
\cong(\mathbb F_3)^4.
\]

Local handle Fourier moves and self twists generate the order-\(576\) local Clifford subgroup. The twist around the primitive sum cycle supplies the missing mutual phase, and together the gates generate

\[
\boxed{Sp(4,\mathbb F_3),\qquad |Sp(4,mathbb F_3)|=51840.}
\]

The representation has an explicit integral source:

\[
\operatorname{MCG}(\Sigma_2)
\longrightarrow Sp(4,\mathbb Z)
\longrightarrow Sp(4,\mathbb F_3).
\]

Therefore the current programme does **not** need another abstract finite Weil model. It needs two things the finite model cannot provide:

- a physical identification of its handle/discriminant labels with the Standard-Model/Furey response channels;
- an infinite arithmetic sum or spectral construction whose constant term generates the completed-zeta factors.

## 1. Exact finite carrier already present

Let

\[
D=A_2^*/A_2\cong\mathbb Z/3,
\qquad
q(a)=\frac{a^2}{3}\pmod1.
\]

The genus-two state basis is \(|a,b\rangle\), with \(a,b\in\mathbb Z/3\). The handle twists act by

\[
T_a|a,b\rangle=\omega^{a^2}|a,b\rangle,
\qquad
T_b|a,b\rangle=\omega^{b^2}|a,b\rangle,
\qquad
\omega=e^{2\pi i/3}.
\]

The primitive sum-cycle twist gives

\[
T_{a+b}|a,b\rangle=\omega^{(a+b)^2}|a,b\rangle.
\]

Removing the two local phases leaves

\[
T_{a+b}T_a^{-1}T_b^{-1}|a,b\rangle
=\omega^{2ab}|a,b\rangle,
\]

the nonzero mutual controlled phase. This is the exact finite realization of the third relationship that direct doubling of two one-qutrit Weil modules lacked.

The finite route therefore contains all three symmetric relationship coordinates:

\[
\operatorname{Sym}_2(\mathbb F_3)
=
\left\{
\begin{pmatrix}
u&w\\w&v
\end{pmatrix}
:u,v,w\in\mathbb F_3
\right\}.
\]

The two diagonal entries are the self phases; the off-diagonal entry is the mutual phase.

## 2. What “level three” means here

Three is not inserted only because a qutrit was desired. It is selected within this mathematical branch by

\[
\det(A_2)=3,
\qquad
A_2^*/A_2\cong\mathbb Z/3.
\]

The corresponding Weil data see the integral symplectic action through its reduction modulo three. Schematically,

\[
Mp(4,\mathbb Z)
\longrightarrow
\widetilde{Sp}(4,mathbb F_3)
\longrightarrow
U(\mathcal H_{A_2}(\Sigma_2)),
\]

with the metaplectic/framing phase retained as required.

This makes level three canonical **conditional on choosing the \(A_2\) discriminant carrier**. It does not yet prove that the Standard Model dynamically selects that carrier. The physical selector remains the color-root/Furey/genus-two observable map.

## 3. Why the finite representation cannot produce zeta

The finite Weil representation identifies integral symplectic transformations that have the same reduction modulo three. In particular, it is insensitive to the infinite congruence kernel

\[
\Gamma(3)
=\ker\!\left(
Sp(4,\mathbb Z)\to Sp(4,\mathbb F_3)
\right).
\]

Completed-zeta factors in Eisenstein scattering arise from an infinite arithmetic process: summing lattice images, unfolding parabolic cosets, and evaluating the resulting local/global integrals. A finite quotient cannot retain the sizes, divisibility strata and infinitely many primitive representatives required for the Euler product.

This gives a clean separation:

\[
\begin{array}{c|c}
\text{finite Weil layer}&\text{automorphic layer}\\ \hline
\text{polarization transport}&\text{sum over arithmetic images}\\
\text{Clifford/metaplectic phases}&\text{spectral-parameter-dependent intertwiners}\\
Sp(4,\mathbb F_3)&Sp(4,\mathbb Z)\text{ and its cusps}\\
\text{finite Gauss sums}&\text{Euler products and completed }L\text{-factors}
\end{array}
\]

The finite layer supplies the correct vector bundle or multiplier system. It does not supply the Eisenstein coefficient.

## 4. Reconciliation with the metaplectic braid

Document 1160 proved in the continuous Schrödinger realization that

\[
\widetilde P\widetilde S\widetilde P\widetilde S
=
\widetilde S\widetilde P\widetilde S\widetilde P.
\]

The genus-two \(A_2\) theory supplies a finite counterpart:

- handle exchange realizes the short-root reflection;
- a handle Fourier move realizes the controlled long-root reflection;
- their Weil operators transport the finite polarizations;
- the sum-cycle twist supplies the shear sector needed for full group completion;
- metaplectic/framing data linearize the otherwise projective action.

Thus the continuous and finite branches are not competing models. They are the real and congruence realizations of the same integral symplectic architecture.

## 5. The exact remaining mathematical object

Let \(P_S\subset Sp(4)\) be the Siegel parabolic preserving the selected source polarization. Let \(\rho_3\) denote the level-three Weil representation on the nine-dimensional state space, and let \(v\) be a seed response-state vector in one parabolic chart.

The next candidate is a vector-valued Eisenstein/Poincaré sum of the form

\[
\mathcal E(Z,s;v)
=
\sum_{\gamma\in P_S(\mathbb Z)\backslash Sp(4,\mathbb Z)}
\Phi_s(\gamma\cdot Z)\,
\rho_3(\widetilde\gamma)^{-1}v,
\]

where:

- \(Z\in\mathfrak H_2\) is the Jordan-tube coordinate;
- \(\Phi_s\) is a declared seed section carrying the spectral parameter;
- \(\widetilde\gamma\) is a coherent metaplectic lift;
- \(\rho_3\) transports the nine finite polarization components.

This formula makes the division of labor explicit:

\[
\rho_3(\widetilde\gamma)^{-1}
\quad\text{carries finite polarization/framing data,}
\]

while

\[
\sum_{P_S(\mathbb Z)\backslash Sp(4,\mathbb Z)}
\quad\text{carries the infinite arithmetic information.}
\]

The constant term of \(\mathcal E\) is the place where Weyl intertwiners and completed-zeta ratios can arise.

## 6. The physical map remains the real bottleneck

The finite carrier has several mathematically equivalent descriptions:

- two genus-two \(A_2\) handle labels;
- two qutrits;
- a level-three BF discriminant sector;
- the mod-three reduction of the rank-four symplectic lattice;
- a finite bundle over the 40 Lagrangian polarizations.

But a physical identification requires an intertwiner that says what \(|a,b\rangle\) measures. At minimum it must map:

\[
\begin{aligned}
\text{handle meridians}&\longleftrightarrow\text{two physical source/charge observables},\\
\text{handle longitudes}&\longleftrightarrow\text{their conjugate response/flux observables},\\
\text{sum-cycle twist}&\longleftrightarrow\text{a gauge-invariant mutual interaction},\\
\text{Fourier moves}&\longleftrightarrow\text{implementable source--response quarter-turns}.
\end{aligned}
\]

The corpus has candidates—Furey matter pairs, Higgs-augmented genus-two ribbons, punctured anomaly-code qutrits and compact phase/flux ports—but no unique field-labelled intertwiner has yet survived all symmetry tests.

## 7. What is now closed

The following searches should be considered closed unless new contradictory evidence appears:

1. **Existence of a nine-state finite Weil carrier:** established.
2. **Existence of local Fourier and phase operations:** established.
3. **Existence of the mutual entangling relationship:** established by the sum-cycle twist.
4. **Closure of the full finite symplectic group:** established, order \(51840\).
5. **Existence of an integral genus-two lift:** established.
6. **Coherent continuous metaplectic braid:** established in document 1160.

Repeating those constructions under new terminology will not advance the programme.

## 8. What remains open

Three nonredundant gates remain:

### Gate A — physical intertwiner

Derive the two handle coordinates and the mutual twist from gauge-invariant Standard-Model/Furey observables rather than matching dimensions after the fact.

### Gate B — infinite automorphic completion

Specify \(\Phi_s\), form the parabolic coset sum, and compute its constant term and Weyl intertwiners.

### Gate C — physical analyticity

Map \(s\) to a physical frequency/energy variable and prove that the normalized response has the required Schur or matrix-Herglotz property in the declared domain.

The logical order is

\[
\boxed{
\text{physical seed}
\longrightarrow
\text{arithmetic sum}
\longrightarrow
\text{zeta normalization}
\longrightarrow
\text{passivity test}.
}
\]

## 9. Stop-everything triggers

The branch should become a priority if any one of the following is achieved:

- a Standard-Model/Furey observable pair canonically realizes the two \(A_2\) discriminant coordinates;
- a gauge-invariant interaction realizes the sum-cycle phase \(\omega^{2ab}\);
- the physical response seed has a canonical \(Sp(4,\mathbb Z)\) orbit sum;
- the constant term of that sum produces the exact \(C_2\) root-factor product anticipated by the Weyl analysis;
- the resulting scattering matrix becomes Schur and its Cayley transform matrix Herglotz in the physical half-plane.

## 10. Falsifiers

This synthesis fails if:

- the physical source labels cannot be transported by the finite Weil action without mixing inequivalent gauge sectors;
- the Furey/Higgs ribbon is forced to remain planar and cannot support the selected genus-two handle structure;
- the level-three module is only an abstract dimension match and no observable intertwiner exists;
- the vector-valued coset sum is ill-defined for the proposed multiplier or seed;
- its constant term has arithmetic factors incompatible with the physical response poles/cuts;
- the physical frequency map violates causality or positivity.

## 11. Verification status

The pre-existing certificate

[`scripts/verify_genus_two_a2_weil_dehn_twists_equal_two_qutrit_clifford_generators.mjs`](scripts/verify_genus_two_a2_weil_dehn_twists_equal_two_qutrit_clifford_generators.mjs)

has been rerun in the present cycle. It confirms:

- the \(A_2\) quadratic handle phases;
- the sum-cycle extraction of the unique nonzero cross phase;
- the order-\(576\) local subgroup;
- closure of all \(51840\) elements of \(Sp(4,\mathbb F_3)\);
- identification with the mod-three genus-two mapping-class Weil action.

## Conclusion

The finite arithmetic carrier is no longer a hypothesis waiting to be built. It is an established part of the corpus.

\[
\boxed{
\text{finite Weil covariance: solved mathematically;}
\quad
\text{physical intertwiner and infinite automorphic sum: open.}
}
\]

This prevents a loop in the research programme. The next useful calculation is not another finite gate closure. It is the constant term of a vector-valued Siegel-parabolic sum whose nine-component multiplier is the already derived genus-two \(A_2\) Weil representation.
