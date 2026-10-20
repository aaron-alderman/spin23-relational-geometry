# The Four-Dimensional Yang--Mills Mass Gap Is a Constructive-QFT Gate, Not a Group-Theory Corollary

**Date:** 20 October 2026

**Gates:** A1, A2, A3, A4, A6, A7 and A8

**Status:** exact problem boundary, finite diagnostic witnesses and an exhaustive tractable gate list; no claimed solution

**Depends on:** [the Sakharov/T/Yang--Mills/vacuum-energy separation](1587_sakharov_t_yang_mills_and_vacuum_energy_form_a_joint_cosmological_qft_closure_gate.md) and the programme's distinction between compact internal gauge factors and the noncompact Spin(2,3) spacetime connection

**Evidence:** [mass-gap gate ledger](../../../evidence/data/spin23-ym-mass-gap-gate.json) and [deterministic verifier](../../../verification/verify/verify_spin23_ym_mass_gap_gate.mjs)

## Result

The Clay problem is two problems joined by one quantifier. For every compact simple gauge group \(G\), construct a nontrivial quantum Yang--Mills theory on \(\mathbb R^4\) with axiomatic properties at least as strong as the cited Wightman and Osterwalder--Schrader frameworks, **and** prove that its physical Hamiltonian has a finite positive gap:

\[
\operatorname{spec}H\cap(0,\Delta)=\varnothing,
\qquad 0<\Delta<\infty,
\qquad H\Omega=0.
\]

This cannot follow from a Lie-algebra decomposition alone. Nor is it established by a finite lattice spectrum, a Higgs mass, perturbation theory, an area law in a strong-coupling truncation, or a numerical glueball fit. Those are useful witnesses below the actual constructive-QFT threshold.

## What existence requires

The intended local fields are gauge-invariant renormalized composites corresponding to polynomials in \(F\) and its covariant derivatives, not the gauge potential as an observable. Their short-distance correlations must agree with asymptotic freedom and perturbative renormalization, while the completed theory must supply:

- a positive Hilbert space;
- unitary Poincare covariance and positive energy;
- a unique invariant vacuum, up to phase;
- locality for spacelike-separated observables;
- a nontrivial gauge-invariant observable algebra; and
- sufficient distributional control to make these statements mathematical.

The Euclidean route does not evade these requirements. It moves them into Schwinger functions satisfying Euclidean covariance, symmetry, reflection positivity, regularity and clustering. Osterwalder--Schrader reconstruction must then produce the physical Hilbert space, Hamiltonian and local Minkowski theory. Reflection positivity is the hinge: without it, exponential Euclidean decay need not represent positive-norm physical states.

## Five statements that must remain separate

1. **Spectral gap:** no physical Hamiltonian spectrum occurs between the vacuum and \(\Delta>0\).
2. **Confinement:** colored asymptotic states are absent, or a specified Wilson/center criterion holds. This is related to but not definitionally identical with a mass gap.
3. **Higgs mass:** adding a scalar condensate can make vector excitations massive, but that is not pure Yang--Mills dimensional transmutation.
4. **Finite-lattice gap:** a regulator at finite volume can have a lowest excitation without a lower bound uniform in volume and lattice spacing.
5. **Glueball estimate:** a continuum-extrapolated numerical mass is strong physical evidence, not an axiomatic construction or proof.

The problem is especially hard because the ultraviolet and infrared requirements pull in opposite directions: asymptotic freedom controls short distances, while the desired gap is a nonperturbative long-distance statement.

## Calculable witness 1: dimensional transmutation

For pure \(SU(N)\) Yang--Mills at one loop,

\[
\mu{dg\over d\mu}=-b_0g^3+O(g^5),
\qquad b_0={11N\over48\pi^2},
\]

so

\[
\Lambda=\mu\exp\!\left[-{1\over2b_0g^2(\mu)}\right]
\]

is invariant at that order. For \(N=3\), \(g(100)=0.8\), running to \(\mu=1000\) gives

\[
g(1000)=0.728687946\ldots,
\qquad \Lambda=1.3464425\times10^{-3}
\]

from either scale. This demonstrates how a classically scale-free action can acquire an RG scale. It does **not** prove that a continuum measure exists or that the physical spectral gap is \(c\Lambda\) with \(c>0\).

## Calculable witness 2: strong-coupling lattice area law

For the four-dimensional \(SU(2)\) Wilson lattice action, the leading fundamental strong-coupling character term gives

\[
\langle W(R,T)\rangle\simeq\left({\beta\over4}\right)^{RT},
\qquad \sigma a^2=-\log(\beta/4).
\]

At \(\beta=0.8\), \(R=3\), \(T=4\),

\[
\langle W(3,4)\rangle\simeq0.2^{12}=4.096\times10^{-9},
\quad \sigma a^2=1.60944,
\quad aE(3)=4.82831.
\]

This is a genuine controlled calculation in the strong-coupling regime. It lies on the wrong side of the required continuum limit: four-dimensional asymptotic freedom takes the continuum trajectory toward weak bare coupling, where this leading expansion is invalid.

## Calculable witness 3: correlation decay and a supplied gap

For the positive toy spectral correlator

\[
C(t)=e^{-0.8t}+0.3e^{-1.7t},
\qquad m_{\rm eff}(t)=\log{C(t)\over C(t+1)},
\]

the verifier obtains

\[
m_{\rm eff}(1)=0.866688,
\qquad m_{\rm eff}(16)=0.8000001.
\]

Thus exponential decay recovers the lowest energy when a positive spectral representation is already supplied. The circularity is instructive: a fit cannot replace proof of reflection positivity, reconstruction, uniform limits and a nonzero continuum gap.

## The precise Spin(2,3) boundary

The Clay statement does not directly apply to \(Spin(2,3)\cong Sp(4,\mathbb R)\), because it is noncompact. Compact \(Spin(5)\) and \(Spin(2,3)\) are real forms of the same complex algebra,

\[
\mathfrak{spin}(5)\otimes\mathbb C
\cong
\mathfrak{spin}(2,3)\otimes\mathbb C
\cong\mathfrak{so}(5,\mathbb C),
\]

but this does not continue reflection positivity, the physical Hilbert space or the spectrum from one real form to the other.

There is also a physical obstruction to asking for the wrong gap. A viable gravitational phase needs a long-range massless spin-2 pole. A universal positive gap for the entire Spin(2,3) connection would remove that pole. The adjacent admissible question is instead

\[
\boxed{
\text{massless Einstein spin-2 sector}
\ +\ 
\text{gapped non-Einstein connection sectors}
\ +\ 
\text{separate compact internal Yang--Mills sector}.}
\]

A compact \(Spin(5)\) lattice model can be a sandbox. It becomes relevant to the intended theory only if a positivity-preserving bridge to the noncompact broken phase is proved. Shared notation or complexification is not that bridge.

## Exhaustive tractable next gates

The open problem cannot honestly be exhausted by computation, but the programme's presently actionable routes can be:

1. Write the exact regulated Euclidean measure and gauge-invariant observable algebra.
2. Prove reflection positivity or construct a positive transfer matrix.
3. Establish thermodynamic-limit Schwinger functions and clustering uniformly in volume.
4. Construct a continuum renormalization trajectory with the required asymptotically free ultraviolet behavior.
5. Bound a gauge-invariant correlation length uniformly in volume and cutoff.
6. Show that the gap in physical units stays nonzero along the continuum trajectory.
7. Establish nontriviality and regulator universality rather than a Gaussian or lattice-artifact limit.
8. Test mass gap, Wilson-loop confinement, center realization and glueball poles as distinct propositions.
9. For the Spin(2,3) action, compute the quadratic spectrum, constraints/BRST cohomology, residues and the massless spin-2 pole.
10. Test the compact \(Spin(5)\) proxy and require either an explicit positivity-preserving real-form bridge or a recorded no-go.
11. Derive rather than identify any relation among \(\Lambda_{\rm YM}\), the Spin(2,3)-breaking scale and the cosmological scale.

Failure at gates 1--7 blocks a Clay-type claim. Failure at gates 9--10 blocks the proposed Spin(2,3) adjacency but says nothing adverse about ordinary compact Yang--Mills. Passing finite witnesses 1--3 validates calculation plumbing only.

## Sources

- [Clay Mathematics Institute problem page](https://www.claymath.org/millennium/yang-mills-the-maths-gap/)
- [Jaffe and Witten, official problem description](https://www.claymath.org/wp-content/uploads/2022/06/yangmills.pdf)
- [Osterwalder and Schrader, Euclidean reconstruction axioms I](https://doi.org/10.1007/BF01645738)
- [Osterwalder and Schrader, Euclidean reconstruction axioms II](https://projecteuclid.org/journals/communications-in-mathematical-physics/volume-42/issue-3/Axioms-for-Euclidean-Greens-functions-II-with-an-Appendix-by/cmp/1103899050.pdf)
- [Gross and Wilczek, ultraviolet behavior of non-Abelian gauge theories](https://doi.org/10.1103/PhysRevLett.30.1343)
- [Politzer, reliable perturbative results for strong interactions](https://doi.org/10.1103/PhysRevLett.30.1346)
- [Wilson, lattice gauge theory and strong-coupling confinement](https://doi.org/10.1103/PhysRevD.10.2445)
- [Creutz, transfer matrix and confinement on a lattice](https://doi.org/10.1103/PhysRevD.15.1128)

## Reproduction

~~~powershell
node verification/verify/verify_spin23_ym_mass_gap_gate.mjs
~~~
