# Action-metric audit: positive selection and ((2,3)) causal geometry occupy different layers

**Date:** 24 October 2026  
**Status:** bounded action audit and exact local Hessian theorem  
**Parent:** [Five-dimensional link carrier](admissibility_16_five_dimensional_link_span_and_spin23_quadratic_envelope.md)  
**Evidence:** [Action-metric ledger](../../../evidence/data/admissibility-link-action-metric-audit-v1.json)  
**Verifier:** [Restricted-Hessian certificate](../../../verification/admissibility/verify_link_action_metric_audit.mjs)

## Result

The nearest explicit actions in the corpus do **not** select the new ((2,3)) form as their stable vacuum Hessian. They select positive or semidefinite forms.

For the relative-frame potential

\[
V_\kappa(X)
=\sum_{ij}x_{ij}^2(1-x_{ij})^2
+\kappa\sum_i(r_i-1)^2
+\kappa\sum_j(c_j-1)^2,
\]

restrict a perturbation around a permutation vacuum to

\[
\delta X\in W
\cong
\mathbb R\oplus\operatorname{End}(A_2).
\]

In orthonormal adapted coordinates ((a,R_{00},R_{01},R_{10},R_{11})), the Hessian eigenvalues are exactly

\[
\boxed{
2+12\kappa,;2,;2,;2,;2.
}
\]

For (\kappa>0), the signature is ((5,0)). The action isolates the six vacua, but its local stiffness is the positive Frobenius geometry, not

\[
Q(a,R)=\det R-a^2
\]

of signature ((2,3)).

## The same pattern elsewhere in the corpus

The bounded audit gives a consistent result:

| Functional | Local geometry | What it accomplishes |
|---|---|---|
| (-\kappa\cos6\phi) | positive curvature (36\kappa) | locks the Hopf circle to six marks |
| minimum family variance | sum of squared commutators | aligns a projector relative to supplied tensors |
| cross-Peirce norm potential | radial positive, directional flats | completes a frame but leaves (\mathbb{CP}^1) before response |
| Gaussian log-det action | strictly convex | selects inverse covariance on a positive cone |
| Schur boundary action | positive after Ward quotient | produces a stable boundary response |
| relative-frame matrix wells | positive definite | isolates six permutation vacua |

None supplies the determinant-minus-singlet Hessian.

This agrees with an earlier corpus warning: equality of dimensions or representations does not transport a metric. A positive Walsh, Gaussian or Frobenius norm cannot become an indefinite Jordan/(Spin(2,3)) metric through an invertible real relabeling; Sylvester inertia is an admission invariant.

## The correct two-layer interpretation

The result does not kill the ((2,3)) carrier. It types it more carefully:

\[
\boxed{
\begin{array}{ll}
\text{selection layer:}&\text{positive Hessian stabilizes an admissible vacuum},\\[2mm]
\text{causal layer:}&Q\text{ classifies relational null, timelike and spacelike directions}.
\end{array}
}
\]

This is familiar physics architecture. A Euclidean effective action should be bounded below around a stable state. A Lorentzian or causal metric is indefinite for a different reason: it separates propagation and causal classes, not energetic stability directions.

Trying to use (Q) directly as an unconstrained Euclidean potential Hessian would make the putative vacuum a saddle with two positive and three negative directions. Trying to use it as an ordinary internal scalar kinetic metric would introduce wrong-sign modes unless gauge constraints, analytic continuation or another removal mechanism is explicitly demonstrated.

Therefore the admissible route is not

\[
\text{stable potential Hessian}=Q.
\]

It is

\[
\text{positive selector}
\quad+\quad
\text{separately derived Lorentzian/causal evolution preserving }Q.
\]

## Dynamics after the split

A genuine (Spin(2,3))-type dynamics on the carrier would require an evolution generator (G) satisfying

\[
G^T\eta+\eta G=0,
\]

where (\eta) represents (Q). Such flow preserves the quadratic classes. It is structurally different from gradient descent in the positive selector potential.

This clarifies the role of the mixed six-step Hopf/link operation. It alternates between the null even vacua and the timelike odd vacua, so it does not preserve (Q). It is better treated as one of:

- a defect or interface transition;
- a discrete operation acting before the orientation-correlated metric emerges;
- a map between causal strata;
- or evidence that (Q) must be modified or lifted in the full dynamics.

It cannot simultaneously be declared an exact (Spin(2,3)) time evolution without additional structure.

## Filled and unfilled regions

Filled:

- exact five-dimensional carrier;
- exact positive Hessian of the six-well selector;
- exact ((2,3)) algebraic form;
- exact mismatch of their inertias;
- exact causal classes of the six vacua.

Unfilled:

- a Lorentzian or Hamiltonian action preserving (Q);
- an admissible Euclidean-to-Lorentzian continuation;
- constraint or gauge analysis excluding wrong-sign physical modes;
- a measured null cone, dispersion relation or hyperbolic response;
- the status of the parity-changing six-step transition.

## Next gate

Search the corpus for antisymmetric, symplectic, retarded or first-order response generators on the five-dimensional carrier, rather than another positive potential. The decisive test is whether any sourced generator lies in

\[
\mathfrak{so}(2,3)
=\{G:G^T\eta+\eta G=0\}
\]

and has a detector-facing causal or spectral interpretation. That is the appropriate route from a (Spin(2,3))-type shape to (Spin(2,3))-type dynamics.
