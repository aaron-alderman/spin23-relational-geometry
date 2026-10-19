# A Walk Resolvent Reaches the Siegel Domain Preserved by (Sp(4,\mathbb R))

**Date:** 17 October 2026  
**Branches:** B04, B07, B08 and B13  
**Claim status:** exact finite resolvent construction; the choice of self-adjoint walk variable is not physically unique

## 1. Why complexify the response

The full symplectic conformal group does not preserve every point of the real positive cone. It does preserve the genus-two Siegel upper half-space

\[
\mathfrak H_2
=
\{Z=Z^T\in M_2(\mathbb C):\operatorname{Im}Z>0\}.
\]

This is also the natural form of a two-channel causal or Herglotz response. The relevant question is whether the walk supplies such a (Z) through a genuine resolvent rather than by formal complexification.

## 2. A self-adjoint variable from the walk

For a real orthogonal walk (U), define

\[
K=\frac{U+U^T}{2}.
\]

Then (K) is real symmetric with spectrum in ([-1,1]). If (U) has eigenphase (e^{-iω}), (K) records

\[
\cos ω.
\]

Choose a spectral parameter

\[
ζ=x+iy,
\qquad y>0,
\]

and two real boundary-port probes collected in (P). Define

\[
\boxed{
Z(ζ)=P^T(K-ζI)^{-1}P.
}
\]

Because (K) and (P) are real, (Z^T=Z).

## 3. Positive imaginary part

The spectral theorem gives

\[
\operatorname{Im}(K-ζI)^{-1}
=
y\bigl((K-xI)^2+y^2I\bigr)^{-1}>0.
\]

Therefore

\[
\boxed{
\operatorname{Im}Z(ζ)
=
yP^T\bigl((K-xI)^2+y^2I\bigr)^{-1}P>0
}
\]

whenever the two port probes are independent.

Thus

\[
Z(ζ)\in\mathfrak H_2.
\]

This is stronger than merely obtaining a real positive precision matrix: it supplies a causal analytic response domain.

## 4. Full symplectic action

For

\[
M=
\begin{pmatrix}A&B\\C&D\end{pmatrix}
\in Sp(4,\mathbb R),
\]

the action

\[
Z\mapsto(AZ+B)(CZ+D)^{-1}
\]

preserves (mathfrak H_2). More precisely,

\[
\operatorname{Im}(M\cdot Z)
=
(C\overline Z+D)^{-T}
\operatorname{Im}Z
(CZ+D)^{-1}.
\]

The certificate verifies the positive imaginary part under explicit congruence, upper-translation, lower-shear and Fourier generators.

This closes the mathematical domain gap found in the real-cone analysis.

## 5. The price: quasienergy orientation is lost

The choice

\[
K=(U+U^T)/2
\]

maps both (e^{-iω}) and (e^{+iω}) to (cos ω). It cannot distinguish:

- positive from negative quasienergy orientation;
- a band from its time-reversed partner;
- some zero/π-sector topology;
- phases stored in the antisymmetric part of (U).

Therefore the Siegel response is causal and positive but incomplete as a representation of the unitary walk.

Other self-adjoint choices exist, such as a branch-dependent effective Hamiltonian or Cayley transform. Each introduces its own branch cuts or singular points. No choice has yet been derived uniquely from the Jordan/Furey programme.

## 6. What has advanced

The chain is now explicit:

\[
\text{finite real walk}
\longrightarrow
\text{self-adjoint }K
\longrightarrow
Z(ζ)\in\mathfrak H_2
\longrightarrow
Sp(4,\mathbb R)\text{ fractional action}.
\]

This proves that the full symplectic action has a mathematically natural causal response domain generated from walk data.

It does not prove that every symplectic transformation is a physically realizable manipulation of the same walk. Domain covariance is weaker than dynamical symmetry.

## 7. Relation to (Spin(2,3))

The exact isomorphism

\[
Sp(4,\mathbb R)\cong Spin_0(2,3)
\]

can now be attached to a concrete analytic response space rather than only a formal Jordan completion. In this sense (Spin(2,3)) organizes the allowed fractional geometry of two-channel causal response.

The remaining physical claim is whether that geometry constrains Standard-Model dynamics, rather than serving as a universal language for any two-port passive system.

## 8. Stop-everything and falsification gates

**Canonical-response advance:** derive (K) or an alternative Herglotz response uniquely from the microscopic action, charge conjugation and boundary measurement protocol.

**Orientation recovery:** retain the full quasienergy orientation while remaining in a domain with a verified (Sp(4,\mathbb R)) action.

**Furey bridge:** show that all selected matter channels assemble into one matrix-valued Siegel response with nontrivial shared constraints.

**Genericity demotion:** if every arbitrary two-port self-adjoint system produces the same (mathfrak H_2) structure with no additional restriction, treat (Spin(2,3)) as response kinematics rather than fundamental dynamics.

**Failure:** the physically correct retarded walk response is nonsymmetric or belongs to a larger complex domain incompatible with (H_2(\mathbb R)).

## 9. Certificate

The [walk-Siegel response certificate](scripts/verify_walk_siegel_resolvent_sp4_action.mjs) verifies resolvent symmetry, the positive-imaginary-part identity and preservation under explicit (Sp(4,\mathbb R)) generators, while recording loss of quasienergy orientation.

## Companion documents

- [Boundary operations and the (Sp(4)) gap](158_boundary_response_operations_and_sp4_gap.md)
- [Lorentzian passivity and causal response](70_lorentzian_passivity_and_causal_response.md)
- [Finite-walk (H_2(\mathbb R)) response](156_walk_two_port_h2r_boundary_response.md)
- [Global (Sp(4,\mathbb R)\cong Spin_0(2,3))](47_global_group_isomorphism_sp4r_spin023.md)
