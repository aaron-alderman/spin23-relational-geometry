# An undoubled Weyl reflection fold has no local covariant self-adjoint domain, but the full wall conditionally constructs A4

**Date:** 20 October 2026

**Gate:** A4, physical-state domain

**Status:** exhaustive quadratic-domain classification; reflection-fold class ruled out and boundaryless full-wall alternative conditionally constructed

**Depends on:** [the first A4 domain audit](../1200-1299/1220_the_a4_physical_state_gate_blocks_the_typed_action_but_rejects_only_the_naive_two_time_reading.md), [the healthy benchmark](../1200-1299/1290_s_v1_contains_a_fully_healthy_quadratic_benchmark_but_one_completion_cannot_discharge_the_global_a4_gate.md), and [the maximal frozen packet](1451_the_maximal_a4_action_freezes_all_bulk_poles_but_the_chiral_fold_has_no_declared_physical_state_domain.md)

**Evidence:** [machine-readable certificate](../../../evidence/data/spin23-a4-weyl-boundary-no-go-and-full-wall-completion.json) and [executable verifier](../../../verification/verify/verify_spin23_a4_weyl_boundary_no_go_and_full_wall_completion.mjs)

## Result

For an undoubled Weyl multiplet on a timelike boundary, no local domain can be simultaneously

- complex linear,
- self-adjoint,
- invariant under the tangential Lorentz group, and
- closed on the existing chiral Standard Model representation.

This turns the unresolved reflection-fold domain of document 1451 into a scoped no-go.

There is nevertheless a clean conditional construction: remove the reflection quotient and retain the full kink on

\[
 X=\mathbb R_t\times T^2\times\mathbb R_y.
\]

The boundary Green form disappears, the exact wall and reader fluctuation operators factor as nonnegative \(A^\dagger A\) systems, and all frozen bulk poles and residues from 1451 remain positive. A4 is therefore conditionally constructed at the frozen tree point for the full-wall ontology.

The cost is structural. The construction no longer inherits the fold's fixed-plane pinning or its BF parity projection. A2 and A11 must be reconstructed independently on the full wall.

## 1. Local Weyl boundary no-go

For a two-component Weyl field the integration-by-parts form is

\[
 \mathcal B(\psi,\phi)
 =-i\int_{\partial\Sigma}\psi^\dagger\sigma^n\phi.
\]

A local self-adjoint domain must select at every boundary point a maximal isotropic complex line

\[
 L\subset\mathbb C^2,
 \qquad
 u^\dagger\sigma^n v=0
 \quad (u,v\in L).
\]

For \(\sigma^n=\sigma_3\), such lines exist and are represented by

\[
 L_\theta=\operatorname{span}_{\mathbb C}(1,e^{i\theta}).
\]

Existence is not covariance. The boundary group \(Spin(1,2)\) acts irreducibly on \(\mathbb C^2\); equivalently, its noncommuting two-component generators have no common invariant line. Therefore no \(L_\theta\) is boundary-Lorentz invariant:

\[
 \boxed{
 \text{no local complex-linear self-adjoint Lorentz-covariant domain for one undoubled Weyl multiplet}.}
\]

The reflection identity

\[
 P_LS_n=S_nP_R
\]

is the fold-specific form of the same obstruction. Gauge covariance cannot create the absent opposite chirality in the same complex Standard Model representation.

## 2. Exhaustive quadratic-domain alternatives

The linear extension problem falls into the following classes.

1. **Local maximal-isotropic subbundle.** Ruled out above for one undoubled Weyl multiplet with full boundary Lorentz covariance.
2. **Enlarged boundary fiber.** Vectorlike bag conditions, charged Nambu pairing, or edge degrees of freedom can work, but add mirrors, a pairing spurion, or a new boundary theory.
3. **Nonlocal spectral domain.** APS/Calderón-type conditions require a Cauchy foliation, spectral projector, eta invariant and inflow data. They are new physical input, not a completion of the declared local fold. Lorentzian APS-type problems can be well posed while remaining spatially nonlocal, as shown by [Bär and Gehring](https://arxiv.org/abs/2210.15052).
4. **Endpoint unitary gluing.** A condition
   \[
   \psi(L)=U\psi(-L),\qquad U^\dagger\sigma^nU=\sigma^n
   \]
   is self-adjoint and chirality preserving, but constructs an orientation-preserving circle or twisted circle rather than the reflection fold.
5. **No boundary/full wall.** This is the minimal escape used below.

An absorbing boundary is not self-adjoint. Anomaly inflow controls determinant variation and global phase—see [Witten and Yonekura](https://arxiv.org/abs/1909.08775)—but does not make the Green form vanish. General Weyl-box boundary families likewise confirm that self-adjointness alone is weaker than the covariance required here; see [De Vincenzo](https://arxiv.org/abs/2007.06423).

## 3. Boundaryless full-wall completion

Use the ultraviolet scalar chart on

\[
 \mathbb R_t\times T^2\times\mathbb R_y
\]

with the frozen 1451 parameters. Put first-order fermion operators on the standard \(H^1\) domain and second-order bosonic operators on \(H^2\). There is no finite boundary and hence no boundary Green form to cancel.

For the neutral kink fluctuation,

\[
 A_2=\partial_y+2\tanh y,
\]

and

\[
 \mathcal O_\eta=A_2^\dagger A_2
 =-\partial_y^2+4-6\operatorname{sech}^2y\ge0.
\]

It has

\[
 m_{\rm translation}^2=0,
 \qquad
 m_{\rm shape}^2=3,
 \qquad
 m_{\rm continuum}^2\ge4.
\]

The reflection fold projected out the even translation mode. The full wall correctly restores it as the Goldstone coordinate of wall position.

For the charge-one reader,

\[
 A_1=\partial_y+\tanh y,
\]

and

\[
 \mathcal O_\Phi=A_1^\dagger A_1+0.64
 =-\partial_y^2+1.64-2\operatorname{sech}^2y\ge0.
\]

It retains one complex bound mode with \(m^2=0.64\) and continuum threshold \(1.64\). The localized bosonic ledger is therefore

\[
 1\text{ translation}+1\text{ shape}+2\text{ reader real modes}=4.
\]

All bulk Hessians and residues frozen in document 1451 remain positive. The fermion Hamiltonian is the standard complete-slice Weyl/Dirac operator plus bounded finite mass matrices, and the quadratic BRST domains close without a boundary complex.

## 4. What is and is not completed

At this frozen tree point,

\[
\boxed{
\begin{array}{ll}
\text{local undoubled reflection fold:}&\textbf{ruled out},\\
\text{full-wall quadratic A4:}&\textbf{conditionally constructed},\\
\text{global interacting/quantum A4:}&\textbf{not passed},\\
\text{physical admission:}&\textbf{false}.
\end{array}}
\]

The remaining checks are no longer about choosing a boundary domain. They are radiative stability, the omitted interaction/cross-coupling Hessian, and the compatibility of any independently reconstructed topological sector with the boundaryless wall.

Falsifiers are explicit: a negative eigenvalue after reinstating omitted cross-couplings; a non-nilpotent or anomalous BRST differential; failure of the localized spectrum; or proof that the desired BF mechanism intrinsically requires the quotient rather than the full wall.

## 5. Path back to \(Spin(2,3)\)

The valid path is now

\[
 \text{boundaryless Lorentzian EFT}
 \longrightarrow \text{positive physical spectral kernel}
 \longrightarrow H_2(\mathbb R)^+
 \longrightarrow Sp(4,\mathbb R)
 \cong Spin_0(2,3).
\]

This supports the response-geometry reading. It does not make \(Spin(2,3)\) a second spacetime-time symmetry.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_a4_weyl_boundary_no_go_and_full_wall_completion.mjs
~~~
