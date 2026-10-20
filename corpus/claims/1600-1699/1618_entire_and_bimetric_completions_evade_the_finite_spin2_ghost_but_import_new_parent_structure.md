# Entire and Bimetric Completions Evade the Finite Spin-2 Ghost but Import New Parent Structure

**Date:** 21 October 2026

**Gates:** A1, A2, A4, A7, A8 and A11

**Status:** explicit propagator, pole, residue and finite-truncation comparison for the two principal metric spin-2 completion escapes

**Depends on:** [the local curvature-square ghost gate](../1500-1599/1599_the_minimal_propagating_spin23_extension_admits_gapped_scalars_but_local_weyl_square_forces_a_spin2_ghost.md), [the radiative closure failure](1607_the_gapped_0minus_torsion_mode_survives_ads_and_hyperbolicity_but_not_radiative_closure.md), and [the complete axial-torsion no-go](1615_the_complete_quadratic_axial_torsion_sector_cannot_make_its_spin1_and_spin0_poles_healthy_together.md).

**Evidence:** [completion ledger](../../../evidence/data/spin23-nonlocal-bimetric-spin2-completions.json) and [verifier](../../../verification/verify/verify_spin23_nonlocal_bimetric_spin2_completions.mjs)

## Result

The negative-residue pole of a finite local $C^2$ action is real, but it is not a theorem about every completion that produces curvature squares at low energy.

Two explicit counterexamples delimit the conclusion:

1. a zero-free entire form factor retains only the positive-residue massless Einstein pole and introduces no massive spin-2 state;
2. full Hassan--Rosen bimetric theory can carry both a healthy massless graviton and a healthy gapped Fierz--Pauli spin-2 particle because the two poles belong to two positive-kinetic field combinations.

Finite derivative truncations of either type can display extra ghost, tachyonic or complex poles absent from the full function or full two-field spectrum. The escape is therefore genuine at the free propagator level.

It is not free. The entire route imports an infinite nonlocal functional choice and unresolved prescription/causality/radiative questions. The bimetric route imports a second metric, five new degrees of freedom and the tuned nonlinear constraint structure. Neither structure has been derived from the programme's single broken $Spin(2,3)$ connection and selector, and neither repairs claim 1615's independent axial-torsion sign contradiction.

## Benchmark: the finite local ghost

Suppressing the positive Planck normalization and the transverse-traceless spin-2 projector, the local four-derivative propagator is

\[
D_4(p^2)=\frac1{p^2(1+p^2/M^2)}
=\frac1{p^2}-\frac1{p^2+M^2}.
\]

The Einstein pole at $p^2=0$ has residue $+1$. The massive pole at $p^2=-M^2$ has residue $-1$. Under ordinary Feynman quantization, this is the claim-1599 massive spin-2 ghost.

## Escape A: a zero-free entire form factor

Choose the Euclidean spin-2 inverse kernel

\[
K_\infty(p^2)=M_{\rm Pl}^2p^2e^{p^2/M^2}.
\]

Then

\[
D_\infty(p^2)=\frac{e^{-p^2/M^2}}{M_{\rm Pl}^2p^2}.
\]

The exponential is entire and never zero at finite complex argument. Consequently:

\[
\boxed{\text{one finite pole at }p^2=0,
\quad\operatorname{Res}D_\infty=M_{\rm Pl}^{-2}>0.}
\]

There is no additional massive pole, real or complex. This preserves the Einstein graviton but does not create a gapped spin-2 particle.

### Why finite Taylor actions mislead

Let

\[
P_N(x)=\sum_{k=0}^{N}\frac{x^k}{k!},
\qquad
D_N=\frac1{p^2P_N(p^2/M^2)}.
\]

Every nonconstant $P_N$ has $N$ complex zeros counting multiplicity, so every finite truncation has $N$ extra propagator poles. At first order,

\[
\frac1{x(1+x)}=\frac1x-\frac1{x+1},
\]

which is exactly the local ghost. At higher order the verifier finds complex-conjugate roots; odd orders through ten also retain one real negative root. The pole set moves with $N$ and does not converge to new finite zeros of $e^x$, because there are none.

The executable root sequence is:

| Taylor order | Extra poles | Real negative roots |
|---:|---:|---:|
| 1 | 1 | 1 |
| 2 | 2 | 0 |
| 3 | 3 | 1 |
| 4 | 4 | 0 |
| 5 | 5 | 1 |
| 6 | 6 | 0 |
| 7 | 7 | 1 |
| 8 | 8 | 0 |
| 9 | 9 | 1 |
| 10 | 10 | 0 |

Thus a ghost found by promoting a finite Taylor approximation to a fundamental propagator need not belong to the entire theory.

### Costs of the entire route

Pole counting is necessary, not sufficient. A predictive theory must also specify:

- the covariant operator ordering and the function space on which $e^{\Box/M^2}$ acts;
- the Lorentzian contour/analytic-continuation prescription;
- admissible initial data and whether the nonlinear equations define a well-posed evolution;
- microcausality or a precise weaker causal notion; and
- quantum stability of the zero-free form.

Loop self-energies generally contain logarithms and branch cuts, not just the chosen exponential. Without a protecting UV principle, the dressed inverse propagator need not remain zero-free. Absence of free extra poles alone does not establish reflection positivity, nonlinear stability or causal propagation.

## Escape B: the full bimetric series

At the linear transverse-traceless level, take two canonically normalized positive-kinetic fields with

\[
K=
\begin{pmatrix}
p^2+\mu^2&-\mu^2\\
-\mu^2&p^2+\mu^2
\end{pmatrix}.
\]

The orthogonal combinations

\[
h_+=\frac{h_g+h_f}{\sqrt2},
\qquad
h_-=\frac{h_g-h_f}{\sqrt2}
\]

have inverse propagators

\[
p^2,
\qquad p^2+2\mu^2.
\]

Writing $m_2^2=2\mu^2>0$, the metric-$g$ propagator is

\[
D_{gg}
=\frac{p^2+\mu^2}{p^2(p^2+2\mu^2)}
=\frac{1/2}{p^2}+\frac{1/2}{p^2+m_2^2}.
\]

Both residues are positive. The spectrum is

\[
\boxed{2\ \text{massless graviton degrees}
+5\ \text{gapped massive spin-2 degrees}.}
\]

The full Hassan--Rosen square-root potential supplies the nonlinear secondary constraint that removes the Boulware--Deser scalar. An arbitrary two-metric potential does not inherit this seven-degree count.

## How the bimetric derivative truncation invents a pole

Integrating the second linear field out exactly gives

\[
K_{\rm eff}(p^2)
=\frac{2p^2(p^2+m_2^2)}{2p^2+m_2^2}.
\]

At low momentum,

\[
K_{\rm eff}
=2p^2\left[
1-\frac{p^2}{m_2^2}
+2\frac{p^4}{m_2^4}
-4\frac{p^6}{m_2^6}+\cdots
\right].
\]

Keeping only the curvature-square-order term produces

\[
K_{\rm eff}^{(1)}=2p^2(1-p^2/m_2^2),
\]

with an extra zero at $p^2=+m_2^2$ that the exact kernel does not possess. The exact two-field poles are instead $p^2=0$ and $p^2=-m_2^2$, both with positive residue in $D_{gg}$.

This finite truncation is an EFT expansion below the massive scale. Resumming it outside that domain manufactures a ghost/tachyon conclusion about a pole that is not in the full bimetric spectrum. Hassan, Schmidt-May and von Strauss derive this structure from the nonlinear ghost-free bimetric action: eliminating one metric produces an infinite higher-curvature series, not a fundamental finite polynomial.

## Costs of the bimetric route

The positive spectrum depends on more than its quadratic matrix:

- a second vierbein/metric is physical, bringing five massive-spin-2 degrees;
- the interaction must have the Hassan--Rosen/dRGT square-root form;
- matter coupling must preserve the constraint at least below the EFT cutoff;
- the strong-coupling/Vainshtein scale must lie above the intended regime;
- Higuchi-type bounds, gradient stability and characteristic cones must be checked on non-Minkowski backgrounds; and
- the two metrics must admit compatible causal orientations and an acceptable initial-value formulation.

Generic composite couplings of matter to both metrics can reintroduce the Boulware--Deser mode above a cutoff. Radiative corrections must be treated as EFT corrections; they do not license replacing the tuned potential by an arbitrary one.

## Cost back to the Spin(2,3) parent

The current parent has one $Spin(2,3)$ connection, one broken vierbein and one selector.

The entire route would require an action such as

\[
F\,\mathcal E(D^2/M^2)\,F
\]

with an infinite covariant form factor, operator ordering and contour prescription. No finite MacDowell--Mansouri/Stelle--West polynomial fixes that function.

The bimetric route requires a second vierbein and Lorentz connection, or a derived composite field demonstrably equivalent to them, plus a derivation of the square-root potential and matter-coupling choice. None is supplied by the existing single-selector breaking.

Most importantly, both constructions repair a metric spin-2 completion problem. They do not alter the shared-$a$ sign contradiction between axial $1^+$ and $0^-$ torsion in claim 1615.

## Verdict

The finite local ghost is not universal:

\[
\boxed{
\begin{array}{ll}
\text{entire zero-free form:}&2\ \text{healthy massless degrees only},\\
\text{full ghost-free bimetric:}&2\ \text{massless}+5\ \text{healthy massive degrees}.
\end{array}}
\]

Both are genuine propagator-level escapes. Neither is presently a completion *of this programme* because its extra parent structure is unconstructed.

## Stop rules

1. Never interpret finite Taylor roots above the truncation scale as particles of the full entire function.
2. Do not call the exponential example a mass-gap mechanism; it adds no massive pole.
3. Demand the nonlinear Hassan--Rosen constraint before calling a bimetric action ghost-free.
4. Recheck the constraint after any nonminimal matter coupling.
5. Require an explicit second-metric or infinite-form-factor derivation before labeling either route $Spin(2,3)$.
6. Keep claim 1615 active: neither spin-2 route cures the axial-torsion no-go.

## Sources

- T. Biswas, E. Gerwick, T. Koivisto and A. Mazumdar, [*Towards Singularity- and Ghost-Free Theories of Gravity*](https://arxiv.org/abs/1110.5249), *Physical Review Letters* **108** (2012) 031101.
- S. F. Hassan and R. A. Rosen, [*Bimetric Gravity from Ghost-Free Massive Gravity*](https://arxiv.org/abs/1109.3515), *Journal of High Energy Physics* **02** (2012) 126.
- S. F. Hassan, A. Schmidt-May and M. von Strauss, [*Higher Derivative Gravity and Conformal Gravity From Bimetric and Partially Massless Bimetric Theory*](https://arxiv.org/abs/1303.6940), *Universe* **1** (2015) 92--122.
- C. de Rham, L. Heisenberg and R. H. Ribeiro, [*On Couplings to Matter in Massive (Bi-)Gravity*](https://arxiv.org/abs/1408.1678), *Classical and Quantum Gravity* **32** (2015) 035022.
- S. F. Hassan and M. Kocic, [*On the Local Structure of Spacetime in Ghost-Free Bimetric Theory and Massive Gravity*](https://arxiv.org/abs/1706.07806), *Journal of High Energy Physics* **05** (2018) 099.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_nonlocal_bimetric_spin2_completions.mjs
~~~
