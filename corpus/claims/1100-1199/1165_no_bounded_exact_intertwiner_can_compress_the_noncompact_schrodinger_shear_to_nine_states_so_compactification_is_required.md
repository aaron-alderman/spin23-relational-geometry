# No Bounded Exact Intertwiner Can Compress the Noncompact Schrödinger Shear to Nine States, so Compactification Is Required

**Date:** 19 October 2026  
**Branches:** physical Schrödinger carrier, finite Weil module, theta intertwiner, compact phase/flux torus, level-three quantization  
**Claim status:** exact bounded-intertwiner no-go; compact torus is selected as the minimal exact finite replacement, while its physical derivation remains open

## Executive result

The most literal version of the theta-intertwiner proposed in document 1164 does not exist.

Let the physical two-channel carrier be

\[
\mathcal H_{\rm phys}=L^2(\mathbb R^2),
\]

and let a nonzero symmetric response matrix \(B\) generate the Schrödinger shear

\[
S_B:(q,p)\mapsto(q,p+Bq).
\]

Its metaplectic operator is, up to a harmless convention in the factor of two,

\[
(U_B\psi)(q)=e^{\pi i q^TBq}\psi(q).
\]

For every nonzero symmetric \(B\), this multiplication operator has no nonzero \(L^2\) eigenvectors. Consequently it has no nonzero finite-dimensional invariant subspace.

It follows that there is no nonzero bounded operator

\[
K:L^2(\mathbb R^2)\longrightarrow \mathbb C^9
\]

intertwining this physical shear with the corresponding unitary shear in the nine-state genus-two \(A_2\) Weil representation. Therefore there is certainly no bounded exact intertwiner for the complete gate set containing channel exchange, controlled Fourier and the mutual shear.

The obstruction is not a phase mismatch and not a failure of \(Sp(4)\). It is the spectral difference between:

- a noncompact Schrödinger multiplication operator with purely continuous spectral behaviour; and
- a finite unitary matrix, which necessarily has eigenvectors.

This no-go selects three mathematically distinct escape routes:

1. **compact phase-space quantization**, producing the nine states directly;
2. **distributional theta periodization**, using Dirac combs rather than a bounded \(L^2\) map;
3. **coarse-graining or projection**, which is not an exact unitary intertwiner.

Of these, the first is the cleanest exact bridge. Quantizing a two-degree-of-freedom symplectic torus at level three gives

\[
\dim\mathcal H_3=3^2=9,
\]

and converts the same integral shear into the finite quadratic-phase gate of the \(A_2\) Weil module.

## 1. The shear alone decides the question

The full proposed equation was

\[
K U_{\rm phys}(\widetilde g)
=
\rho_{A_2,2}(\widetilde g)K
\]

for all declared generators \(\widetilde g\). It is unnecessary to solve the complete system first. Any valid \(K\) must satisfy the equation for every individual generator, including a nonzero integral shear.

Choose

\[
B\in\operatorname{Sym}_2(\mathbb Z),
\qquad B\ne0.
\]

The physical operator is the chirp

\[
U_B=M_{f_B},
\qquad
f_B(q)=e^{\pi i q^TBq}.
\]

The mutual gate uses an off-diagonal \(B\), while the self gates use diagonal choices. The argument below applies to all nonzero symmetric choices.

## 2. The chirp has no nonzero \(L^2\) eigenvectors

Suppose

\[
U_B\psi=\lambda\psi,
\qquad |\lambda|=1.
\]

Then almost everywhere,

\[
\bigl(e^{\pi i q^TBq}-\lambda\bigr)\psi(q)=0.
\]

Hence \(\psi\) can be supported only on

\[
E_\lambda
=
\{q\in\mathbb R^2:e^{\pi i q^TBq}=\lambda\}.
\]

Writing \(\lambda=e^{\pi i c}\), this set is contained in the countable union

\[
E_\lambda
\subseteq
\bigcup_{n\in\mathbb Z}
\{q:q^TBq=c+2n\}.
\]

Because \(B\ne0\), the polynomial \(q^TBq\) is nonconstant. Every one of its level sets has two-dimensional Lebesgue measure zero. Their countable union also has measure zero. An \(L^2\) function supported there is zero as an \(L^2\) vector.

Therefore

\[
\boxed{U_B\text{ has no nonzero }L^2\text{ eigenvectors.}}
\]

This statement remains true when \(B\) is singular. For example, if the phase depends only on \(q_1\), each allowed level is a countable union of lines, still a null set in \(\mathbb R^2\).

## 3. No finite-dimensional invariant subspace

Assume a nonzero finite-dimensional subspace \(W\subset L^2(\mathbb R^2)\) is invariant under \(U_B\). Since \(U_B\) is unitary, its restriction to \(W\) is a finite-dimensional unitary operator. Every finite-dimensional complex unitary operator has an eigenvector.

That would give a nonzero \(L^2\) eigenvector of \(U_B\), contradicting the preceding section. Thus

\[
\boxed{
W\text{ finite-dimensional and }U_BW\subseteq W
\Longrightarrow W=0.
}
\]

This is stronger than showing that one convenient oscillator truncation leaks. It excludes every finite-dimensional \(L^2\) subspace, regardless of basis.

## 4. No nonzero bounded intertwiner to the nine-state module

Let \(V_B\) denote the unitary finite Weil shear on \(\mathbb C^9\), and suppose a bounded operator \(K\) obeys

\[
KU_B=V_BK.
\]

Taking adjoints and using unitarity gives the reverse intertwining relation

\[
U_BK^*=K^*V_B.
\]

Therefore \(\operatorname{ran}K^*\) is a finite-dimensional \(U_B\)-invariant subspace of \(L^2(\mathbb R^2)\). The previous theorem forces

\[
\operatorname{ran}K^*=0,
\]

so \(K^*=0\) and hence \(K=0\).

Thus

\[
\boxed{
KU_B=V_BK,\quad K\text{ bounded}
\Longrightarrow K=0.
}
\]

The no-go requires only one nonzero shear. Requiring the channel exchange and Fourier gates as well cannot repair it.

## 5. Why the Fourier/braid sector looked more promising

The Fourier and oscillator-rotation subgroup can preserve finite-dimensional Hermite shells. In two modes, the shell of total oscillator degree \(N\) has dimension

\[
N+1.
\]

The shell \(N=8\) therefore has dimension nine. Channel exchange and full oscillator rotations act within it, so a nine-dimensional shadow can appear before the shear is imposed.

But chirp multiplication is not an oscillator-number-preserving operation. Infinitesimally its quadratic generator raises and lowers oscillator degree, and its exponential has components at arbitrarily high degrees. More importantly, the theorem above shows that no change of finite basis can solve the problem: the full chirp has no finite invariant \(L^2\) sector at all.

This explains the pattern in the preceding documents:

- the finite Weyl/braid skeleton matches cleanly;
- coherent metaplectic phases can be chosen;
- the obstruction appears when the finite arithmetic shear is demanded as an exact operator on a finite physical sector.

## 6. The three surviving meanings of “theta intertwiner”

### 6.1 Compact geometric quantization

Replace noncompact phase space \(\mathbb R^4\) by the integral symplectic torus

\[
\mathcal A=\mathbb R^4/\mathbb Z^4
\]

with level-three prequantum curvature. For two degrees of freedom, geometric quantization gives

\[
\dim\mathcal H_N=N^2,
\]

so

\[
\dim\mathcal H_3=9.
\]

The integral Heisenberg translations reduce to \((\mathbb Z/3)^4\), and the integral symplectic action reduces to \(Sp(4,\mathbb F_3)\). The chirp is now a diagonal finite quadratic phase and does have eigenvectors. The spectral obstruction disappears because the representation space itself has changed.

This recovers the exact carrier in documents 460 and 478 rather than trying to extract it as an \(L^2(\mathbb R^2)\) subrepresentation.

### 6.2 Distributional theta periodization

Theta functions can be constructed by periodizing Schwartz functions over a lattice or pairing them with Dirac combs. Such combs are tempered distributions, not normalizable vectors of \(L^2(\mathbb R^2)\). A distributional map can therefore evade the eigenvector proof.

The price is precise: it is not a bounded Hilbert-space compression. Domains, rigged Hilbert spaces, lattice covariance and normalization must be stated explicitly. The theta/Heisenberg/Weil relation is standard in this language; see Jae-Hyun Yang's [*Heisenberg Groups, Theta Functions and the Weil Representation*](https://arxiv.org/abs/0905.1865) and Yuri Manin's [*Theta Functions, Quantum Tori and Heisenberg Groups*](https://arxiv.org/abs/math/0011197).

### 6.3 Coarse-grained or open-system reduction

A nine-outcome measurement, finite code projection or noisy channel may map noncompact states to nine effective labels. Such a map need not preserve products or unitary evolution exactly:

\[
K U_B\ne V_BK
\]

as an operator identity, even if selected expectation values agree approximately.

This may be physically useful, but it is a different claim. It cannot establish exact Weil equivalence.

## 7. What compactification does—and does not—mean physically

The selected torus route is mathematically exact, but it must not be silently identified with a Planck-scale spatial pixel lattice.

The quotient

\[
\mathbb R^4/\mathbb Z^4
\]

compactifies two conjugate phase/flux pairs. It may arise from holonomies, flux periodicity, a finite Heisenberg quotient, homology cycles or a topological boundary theory. None of those is automatically ordinary spacetime discreteness.

The correct physical question is now:

> What feature of the Furey/Standard-Model/stress-response construction makes both members of two conjugate pairs compact with primitive level three?

If that datum is derived, the nine-state module is no longer an analogy or arbitrary truncation. It is the quantization of the physical carrier.

## 8. Relation to the learning/consciousness branch

This result also sharpens the more speculative learner language without proving any consciousness claim.

The noncompact carrier can continuously revise its response realization. The finite nine-state carrier records an arithmetic quotient of those possibilities. There is no exact bounded operation that simply “compresses” the former into the latter while retaining the full mutual shear. A genuine finite memory therefore requires:

- compact/topological identification;
- a distributional encoding;
- or irreversible coarse-graining.

That trichotomy is mathematically meaningful. Calling any one of the three consciousness would be an additional interpretation, not a consequence.

## 9. Home-stretch assessment

### Arithmetic/metaplectic branch

This is a home-stretch result because it removes a major ambiguity. The nine-state arithmetic carrier should not be sought as a finite normalizable subspace of the noncompact physical Schrödinger carrier. The exact route must pass through compact quantization, while a theta lift is naturally distributional.

The remaining arithmetic tasks are comparatively narrow:

1. construct the level-three torus theta basis and its exact Weil action;
2. relate its multiplier to the odd-weight genus-two Eisenstein family;
3. continue the weight-three family and calculate the longest-Weyl intertwiner.

### Physical Standard-Model branch

This is not yet the home stretch. The decisive missing derivation is still why the physical observables form a compact, integrally normalized, level-three phase/flux torus. The existing Furey \(A_2\) lattice and qutrit code make level three credible, but do not yet prove that the continuous stress-response carrier is physically compactified in precisely this way.

## 10. Claim ledger

- **Exact:** every nonzero Schrödinger chirp \(e^{\pi i q^TBq}\) has no nonzero \(L^2(\mathbb R^2)\) eigenvectors.
- **Exact:** it has no nonzero finite-dimensional invariant \(L^2\) subspace.
- **Exact:** no nonzero bounded map to \(\mathbb C^9\) intertwines that chirp with a finite unitary shear.
- **Exact:** a two-degree-of-freedom level-three torus quantization has nine states and supports the finite Heisenberg/Weil action.
- **Viable but differently typed:** distributional theta periodization can evade the bounded-map no-go.
- **Viable but non-exact:** measurement/coarse-graining can yield a nine-label effective model.
- **Open:** physical derivation of compact conjugate variables and level three from the Furey/Standard-Model/stress system.
- **Not established:** that Planck-scale spacetime discreteness supplies this compact phase-space quotient.
- **Not established:** that the selected finite carrier is intrinsically conscious.

## 11. Stop-everything and falsification gates

**Compactification trigger:** derive two compact conjugate physical pairs with primitive symplectic flux three. This would give the nine-state module directly and close the representation-space mismatch.

**Distributional trigger:** exhibit an explicit lattice-comb theta kernel with a declared rigged Hilbert space that intertwines all three gate types and reproduces the prime-three/archimedean phase reciprocity.

**Bounded-intertwiner falsifier:** any proposed bounded \(L^2(\mathbb R^2)\to\mathbb C^9\) exact map that includes a nonzero chirp is zero.

**Truncation falsifier:** preservation by Fourier/channel exchange alone is insufficient; the mutual shear must also preserve the proposed sector.

**Physics falsifier:** the arithmetic torus is not physically derived merely because it has the desired dimension and group.

## 12. Certificate

The [noncompact-shear audit](../../../verification/verify/verify_no_finite_dimensional_l2_shear_intertwiner.mjs) checks the finite-dimensional linear-algebra implication, verifies leakage of every tested finite polynomial/Hermite cutoff under the mutual quadratic generator and records the measure-theoretic theorem assumptions used in the exact proof.

## Companion documents

- [Gauss/Maslov reciprocity and the intertwiner gate](1164_the_prime_three_gauss_and_maslov_phases_are_reciprocal_not_equal_and_require_a_theta_intertwiner.md)
- [Compact phase/flux lattice](../0400-0499/460_compact_phase_flux_variables_supply_a_canonical_sp4z_lattice_but_require_periodic_completion.md)
- [Genus-two \(A_2\) Weil module](../0400-0499/478_the_genus_two_a2_weil_representation_is_exactly_the_two_qutrit_clifford_carrier_and_derives_the_cross_gate_from_a_sum_cycle_twist.md)
- [Finite versus infinite arithmetic frontier](1161_the_finite_weil_gate_was_already_crossed_and_the_remaining_frontier_is_the_infinite_arithmetic_sum.md)

