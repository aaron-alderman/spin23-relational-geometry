# Lorentzian Self-Duality Complexifies the Connection Rather Than Making Its Real Kinetic Form Positive

**Date:** 23 October 2026

**Status:** exact audit of the chiral escape from the Lorentz kinetic obstruction

**Depends on:** [the minimal Lorentz vector-supermultiplet obstruction](1784_the_minimal_new_supersymmetric_connection_parent_is_exhausted_before_dynamics.md)

**Evidence:** [self-dual reality ledger](../../../evidence/data/spin23-self-dual_connection_reality_audit-v1.json) and [verifier](../../../verification/verify/verify_spin23_self_dual_connection_reality_audit.mjs)

## Exact kinematics

On Lorentz bivectors, choose conventions

\[
 *J_i=K_i,\qquad *K_i=-J_i.
\]

Then \(*^2=-1\).  The eigenspaces therefore exist only after
complexification:

\[
 Z_i^+=J_i-iK_i,\quad *Z_i^+=iZ_i^+;\qquad
 Z_i^-=J_i+iK_i,\quad *Z_i^-=-iZ_i^-.
\]

There is no nonzero real self-dual Lorentz bivector.  For a real connection
\(A_i=j_iJ_i+k_iK_i\), its chiral coefficients obey

\[
 a_i^+=(j_i+ik_i)/2,\qquad a_i^-=(j_i-ik_i)/2
       =\overline{a_i^+}.
\]

Keeping only one sector therefore does not produce a smaller real connection;
it produces a complex connection whose physical Lorentzian interpretation
requires a reality condition.

## Projection is not positivity

For the Lorentz Killing form used in the preceding audit,

\[
 B(Z_i^+,Z_j^+)=-8\delta_{ij},\quad
 B(Z_i^-,Z_j^-)=-8\delta_{ij},\quad
 B(Z_i^+,Z_j^-)=0.
\]

The restriction is a complex bilinear form, not a positive real inner product.
For one coefficient \(a=x+iy\), adding the conjugate action gives a real form
proportional to \(-16(x^2-y^2)\), which is still indefinite.  Thus the chiral
projector alone does not cure the ordinary Yang--Mills kinetic problem.

This is not a no-go theorem for Ashtekar or Plebanski gravity.  Those theories
are specifically gravitational constrained systems: tetrads or two-forms,
simplicity constraints, diffeomorphism constraints and Lorentzian reality
conditions change the physical phase space.  Precisely those additions make
the route non-Yang--Mills and create a new constraint and positivity problem.

Supersymmetric self-dual formulations likewise exist, but supersymmetry does
not by itself derive a real Lorentzian involution, a positive physical
Hamiltonian, an independent massive \(0^-\) torsion pole or its normalized
fermion-current coupling.

## Sources

- G. A. Mena Marugan, [*Reality Conditions for Lorentzian and Euclidean Gravity in the Ashtekar Formulation*](https://arxiv.org/abs/gr-qc/9311020).
- J. F. Barbero, [*Reality Conditions and Ashtekar Variables: a Different Perspective*](https://arxiv.org/abs/gr-qc/9410013).
- S. Alexandrov, [*Reality conditions for Ashtekar gravity from Lorentz-covariant formulation*](https://arxiv.org/abs/gr-qc/0510050), which explicitly uses an extended phase space containing self-dual and anti-self-dual variables.
- S.-S. Feng and B. Wang, [*Superalgebra and Conservative Quantities in N=1 Self-dual Supergravity*](https://arxiv.org/abs/hep-th/9902082), for the existence and complex \(SL(2,\mathbb C)\) setting of the supersymmetric chiral formulation.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_self_dual_connection_reality_audit.mjs
~~~
