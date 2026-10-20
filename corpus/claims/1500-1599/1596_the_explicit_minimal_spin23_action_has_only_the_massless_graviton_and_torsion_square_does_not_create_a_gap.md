# The Explicit Minimal Spin(2,3) Action Has Only the Massless Graviton, and Torsion Square Does Not Create a Gap

**Date:** 20 October 2026

**Gates:** A1, A2, A4, A7 and A11

**Status:** exact action-level result for the fixed-norm, parity-even, two-derivative MacDowell--Mansouri/Stelle--West branch; this action class is exhausted

**Depends on:** [the sector-selective gravity gate](1591_spin23_requires_a_sector_selective_not_universal_gravitational_mass_gap.md), [the joined mass-gap synthesis](1594_the_joined_mass_gap_investigation_closes_every_shortcut_and_leaves_five_irreducible_proof_arms.md), and [the Lense--Thirring vector-sector gate](1589_lense_thirring_is_the_vector_sector_gravity_gate_beyond_the_scalar_geopotential.md)

**Evidence:** [explicit-action ledger](../../../evidence/data/spin23-explicit-macdowell-mansouri-spectrum.json) and [verifier](../../../verification/verify/verify_spin23_explicit_macdowell_mansouri_spectrum.mjs)

## Result

The first action-level calculation closes the gap left by the abstract projector witness. The minimal broken $Spin(2,3)$ MacDowell--Mansouri/Stelle--West action is exactly Einstein--Cartan gravity with negative cosmological constant plus the Euler invariant. After the algebraic connection equation is solved, its local vacuum spectrum contains only the two helicities of the massless graviton.

The smallest parity-even selector-covariant torsion-square deformation does **not** realize the previously imagined healthy massive auxiliary poles. It changes a 24-component algebraic Hessian but adds no momentum dependence. At generic coupling all torsion remains auxiliary; at three exceptional couplings a block becomes degenerate and triggers a strong-coupling/constraint stop. None of these outcomes is a torsion mass gap.

## Start from the action, not an abstract projector

Let $V^A$ be a fixed-norm Stelle--West selector,

\[
V^A V_A=\sigma\ell^2,
\]

and let $\mathcal A^{AB}$ be a $Spin(2,3)$ connection. In the unitary gauge $V^A=\ell\delta^A_4$, write

\[
\mathcal A^{ab}=\omega^{ab},\qquad
\mathcal A^{a4}=\ell^{-1}e^a,
\]

so that

\[
F^{ab}=R^{ab}+\ell^{-2}e^a\wedge e^b,
\qquad F^{a4}=\ell^{-1}T^a.
\]

With the conventions fixed in the evidence ledger, the covariant Stelle--West action and its unitary-gauge form are

\[
S_{\rm SW}=\frac{\ell}{8\kappa}
\int\epsilon_{ABCDE}V^E F^{AB}\wedge F^{CD},
\]

\[
S_{\rm MM}=\frac{\ell^2}{8\kappa}
\int\epsilon_{abcd}F^{ab}\wedge F^{cd}.
\]

This is the explicit broken action requested by the programme. It is not an ordinary Yang--Mills $\operatorname{tr}F\wedge *F$ theory and its ten connection components must not be counted as ten propagating vector bosons.

## Exact decomposition

Direct expansion gives

\[
\begin{aligned}
S_{\rm MM}={}&\frac{\ell^2}{8\kappa}
\int\epsilon_{abcd}R^{ab}\wedge R^{cd}\\
&+\frac{1}{4\kappa}
\int\epsilon_{abcd}e^a\wedge e^b\wedge R^{cd}\\
&+\frac{1}{8\kappa\ell^2}
\int\epsilon_{abcd}e^a\wedge e^b\wedge e^c\wedge e^d.
\end{aligned}
\]

The first line is the four-dimensional Euler term and carries no local bulk degree of freedom. The second and third lines are the Einstein--Cartan and cosmological terms because

\[
\Lambda=-\frac{3}{\ell^2},\qquad
\frac{1}{8\kappa\ell^2}=-\frac{\Lambda}{24\kappa}.
\]

Thus the relative Einstein and cosmological coefficients are not adjustable in the minimal branch; they follow from the single $Spin(2,3)$ curvature square.

## Minimal pole content

For an invertible coframe, variation with respect to $\omega^{ab}$ gives

\[
\epsilon_{abcd}e^c\wedge T^d=0
\quad\Longrightarrow\quad T^a=0.
\]

The connection is auxiliary and becomes the Levi--Civita spin connection. Linearization about the AdS vacuum gives, in transverse-traceless gauge,

\[
\left(\Box-\frac{2\Lambda}{3}\right)h^{\rm TT}_{\mu\nu}=0
\quad\Longleftrightarrow\quad
\left(\Box+\frac{2}{\ell^2}\right)h^{\rm TT}_{\mu\nu}=0.
\]

The curvature shift is the massless AdS spin-2 equation, not a Fierz--Pauli mass. The constraint count is the familiar exact one:

\[
10-2(4)=2
\]

metric configuration degrees of freedom. In the flat limit the conserved-source exchange has the massless denominator

\[
\frac{T_{\mu\nu}T^{\mu\nu}-\tfrac12T^2}{M_{\rm Pl}^2p^2}.
\]

For $M_{\rm Pl}^2>0$ this is the healthy graviton pole. There is no independent torsion pole and the fixed-norm selector supplies no radial pole:

\[
5\;\text{components}-1\;\text{norm constraint}-4\;\text{broken gauge directions}=0.
\]

## Smallest selector-covariant torsion deformation

Define the covariant two-form

\[
\mathcal T^A=F^{AB}V_B.
\]

In unitary gauge, $\mathcal T^a=\pm T^a$. The smallest local parity-even quadratic deformation that does not add curvature-squared derivatives is

\[
S_\lambda=S_{\rm SW}+\lambda M_{\rm Pl}^2
\int\mathcal T^A\wedge *\mathcal T_A.
\]

With the ledger's normalization, the non-topological component density is

\[
\frac{M_{\rm Pl}^2}{2}\sqrt{-g}
\left[R(\omega)+\lambda T_{\mu\nu\rho}T^{\mu\nu\rho}-2\Lambda\right].
\]

Decompose the 24 torsion components into trace vector, axial vector and traceless tensor pieces,

\[
T_{\mu\nu\rho}=\frac13
(T_\nu g_{\mu\rho}-T_\rho g_{\mu\nu})
-\frac16\epsilon_{\mu\nu\rho\sigma}S^\sigma
+q_{\mu\nu\rho},
\]

with dimensions $4+4+16=24$. Modulo a boundary divergence,

\[
R(\omega)=R(\mathring\omega)
-\frac43T^2+\frac1{24}S^2+\frac12q^2,
\]

and

\[
T_{\mu\nu\rho}T^{\mu\nu\rho}
=\frac23T^2-\frac16S^2+q^2.
\]

Therefore the exact algebraic block coefficients are

\[
c_T=\frac{2(\lambda-2)}3,
\qquad c_S=\frac{1-4\lambda}{24},
\qquad c_q=\lambda+\frac12,
\]

with multiplicities $4,4,16$. Up to nonzero basis factors, the full algebraic Hessian determinant is

\[
\det H_{\rm torsion}\propto
\left[\frac{2(\lambda-2)}3\right]^4
\left[\frac{1-4\lambda}{24}\right]^4
\left[\lambda+\frac12\right]^{16}.
\]

This is the finite symbolic witness the abstract projector model lacked.

## Pole and health verdict

For

\[
\lambda\notin\left\{-\frac12,\frac14,2\right\},
\]

the torsion Hessian has rank 24 and its vacuum solution is algebraically $T=S=q=0$. Its momentum degree is zero. No denominator of the form $Zp^2+m^2$ exists, so there is no torsion particle whose residue or mass could be called healthy, ghostly or tachyonic.

At the exceptional couplings the ranks are

\[
\operatorname{rank}H(-\tfrac12)=8,\qquad
\operatorname{rank}H(\tfrac14)=20,\qquad
\operatorname{rank}H(2)=20.
\]

These are algebraic flat directions. Without a new gauge symmetry and a controlled nonlinear constraint algebra they signal underdetermination or strong coupling, not propagating massless torsion. With spinful matter, the nondegenerate blocks can mediate algebraic contact interactions, but they still do not become vacuum poles.

## What this closes

The explicit calculation refines claim 1591:

- the minimal action does retain a healthy massless graviton and therefore passes the long-range Newtonian/Lense--Thirring admission gate;
- it contains no additional propagating sector to gap;
- $T^2$ alone cannot manufacture such a sector;
- a fixed-norm Stelle--West selector has no radial Higgs particle; and
- the healthy massive modes in the earlier finite projector witness were a consistency example, not a spectrum realized by this action.

To obtain propagating torsion one must leave this class by adding derivative-producing curvature invariants or an independently dynamical softened selector. That enlarged theory requires a fresh spin-parity projector, constraint and residue calculation. The result cannot be imported from the present algebraic Hessian.

## Stop rules

1. Stop the minimal branch if $M_{\rm Pl}^2\leq0$: the graviton residue is negative or vanishes.
2. Stop at $\lambda=-1/2,1/4,2$ until a nonlinear constraint analysis resolves the degenerate block.
3. Never label an algebraic Hessian coefficient a particle mass.
4. Never call generic auxiliary torsion a mass gap.
5. Any derivative enlargement must retain exactly two healthy massless graviton helicities, recover the Einstein and Lense--Thirring infrared coefficients, and reject every negative-residue or tachyonic physical pole.

## Sources

- S. W. MacDowell and F. Mansouri, [*Unified Geometric Theory of Gravity and Supergravity*](https://doi.org/10.1103/PhysRevLett.38.739), *Physical Review Letters* **38** (1977) 739; erratum 1376.
- K. S. Stelle and P. C. West, [*Spontaneously Broken de Sitter Symmetry and the Gravitational Holonomy Group*](https://doi.org/10.1103/PhysRevD.21.1466), *Physical Review D* **21** (1980) 1466.
- I. L. Shapiro, [*Physical Aspects of the Space-Time Torsion*](https://arxiv.org/abs/hep-th/0103093), *Physics Reports* **357** (2002) 113--213.
- W. Barker and S. Zell, [*Matter matters in Einstein-Cartan gravity*](https://doi.org/10.1103/PhysRevD.104.064036), *Physical Review D* **104** (2021) 064036.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_explicit_macdowell_mansouri_spectrum.mjs
~~~
