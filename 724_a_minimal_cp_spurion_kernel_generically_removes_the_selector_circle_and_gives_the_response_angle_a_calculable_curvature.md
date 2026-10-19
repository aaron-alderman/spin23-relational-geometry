# A Minimal CP-Spurion Kernel Generically Removes the Selector Circle and Gives the Response Angle a Calculable Curvature

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B05, B06, B08, B09, B11, B13, B14 and the coupled-stabilizer branch  
**Claim status:** exact stabilizer and quadratic-curvature theorem for the minimal two-axis kernel; microscopic coefficients remain uncomputed  
**Certificate:** [verify_minimal_cp_spurion_response_kernel_stabilizer_and_angle_mass.mjs](scripts/verify_minimal_cp_spurion_response_kernel_stabilizer_and_angle_mass.mjs)

## Executive result

Let the even/odd response vector be

\[
r=\begin{pmatrix}r_e\\r_o\end{pmatrix},
\]

and let (s) be a CP-odd weak-basis scalar such as (I_2). The minimal CP-covariant quadratic kernel is

\[
K(s)=
\begin{pmatrix}
\alpha&cs\\
cs&\beta
\end{pmatrix}.
\]

With response CP reflection

\[
C=\operatorname{diag}(1,-1),
\]

the family obeys

\[
CK(s)C=K(-s).
\]

The connected selector-rotation stabilizer has dimension one only when

\[
\boxed{
\alpha=\beta,
\qquad
cs=0.
}
\]

Every other real choice has a nonzero eigenvalue gap

\[
\boxed{
\Delta
=\sqrt{(\alpha-\beta)^2+4c^2s^2}
}
\]

and a zero-dimensional connected stabilizer. For a projective response line the generic residual ({+I,-I}) is physically trivial.

Thus a fixed nonzero CP spurion generically removes the selector circle. It does not conflict with CP covariance: CP relates the parameter backgrounds (s) and (-s), rather than leaving one fixed nonzero-(s) background invariant.

## 1. Exact continuous-stabilizer calculation

The infinitesimal generator of the embedding-selector rotation is

\[
J=
\begin{pmatrix}
0&-1\\
1&0
\end{pmatrix}.
\]

A continuous rotation stabilizes the quadratic kernel only if

\[
[K(s),J]=0.
\]

Directly,

\[
[K,J]
=
\begin{pmatrix}
2cs&\beta-\alpha\\
\beta-\alpha&-2cs
\end{pmatrix}.
\]

It vanishes precisely at the double degeneracy above.

There is therefore no generic continuous diagonal matter-response selector rotation when the source sector contributes only a fixed scalar (s).

## 2. Selected angle

The eigenline angle satisfies

\[
\tan2\theta
=\frac{2cs}{\alpha-\beta}.
\]

Changing (s\to-s) sends

\[
\theta\to-\theta
\]

up to the projective eigenline conventions. The eigenvalues and gap remain unchanged.

This is the exact quadratic realization of the projective CP order parameter developed earlier.

## 3. Angular curvature and pseudo-Goldstone scale

Write

\[
r=\rho
\begin{pmatrix}
\cos\theta\\
\sin\theta
\end{pmatrix}.
\]

At fixed radial amplitude, the quadratic potential is

\[
V_2(\theta)
=\frac{\rho^2}{2}
\left[
\frac{\alpha+\beta}{2}
+\frac{\alpha-\beta}{2}\cos2\theta
+cs\sin2\theta
\right].
\]

At its minimum,

\[
\boxed{
\frac{\partial^2V_2}{\partial\theta^2}
=\rho^2\Delta.
}
\]

For a canonical Cartesian kinetic term (rac12(partial r)^2), the angular field is locally (a=ho,delta	heta), so

\[
\boxed{m_a^2=\Delta.}
\]

This is a pseudo-Goldstone interpretation only if the isotropic selector circle was a physical global symmetry before the anisotropy was introduced. If it was merely an embedding degeneracy, (Delta) is simply the response-line stiffness.

## 4. The anisotropy is a weight-two object

Define

\[
\delta=\frac{\alpha-\beta}{2},
\qquad
\xi=cs.
\]

Under a selector rotation by (arphi), the pair

\[
(\delta,\xi)
\]

rotates by (2\varphi). This is the familiar spin-two transformation of a real symmetric traceless (2\times2) tensor.

Therefore a continuous diagonal selector symmetry could survive only if the matter sector supplied a complete weight-two source doublet that rotates with the response anisotropy. A lone scalar (I_2) does not do so.

This refines the “Higgs charged-doublet” possibility: the required compensator is not an ordinary response vector but a weight-two symmetric-traceless source.

## 5. CP symmetry versus a CP-odd background

The equation

\[
CK(s)C=K(-s)
\]

is a spurionic covariance statement. If (s) is a fixed measured coupling or vacuum datum with (s\ne0), ordinary CP maps the theory to the opposite background.

Three cases must be distinguished:

1. (s) is an explicit CP-violating coupling: CP is not a symmetry of the fixed theory;
2. (s) is a spontaneous order parameter: the two signs label CP-related vacua;
3. (s) is a bookkeeping spurion: the family is covariant, but no new dynamical field follows.

The Standard-Model weak-basis invariant (I_2) usually belongs to the first description once masses and couplings are fixed.

## 6. Consequence for the (Spin(2,3)) carrier

The selected line still generates a Jordan algebra isomorphic to (H_2(\mathbb R)), regardless of (	heta). Hence the conformal algebra remains

\[
\mathfrak{conf}(H_2(\mathbb R))
\cong\mathfrak{sp}(4,\mathbb R)
\cong\mathfrak{so}(2,3).
\]

Flavor CP can orient the embedding without changing the abstract carrier type. What changes is the physical sewing between the carrier and matter observables.

This is a clean instance of the programme's “one carrier, two faces, three relationships” intuition: the carrier type is stable, while relational data select its embedding.

## 7. Branch tree

### Path A — explicit flavor anisotropy

The measured flavor spurions select a unique projective response line with stiffness (Delta). No Goldstone mode is implied.

### Path B — spontaneous CP source

The signs (s) and (-s) give CP-related response orientations. Domain walls or defects may occur if the full vacuum quotient makes them distinct.

### Path C — weight-two matter compensator

A two-component anisotropy source may restore a diagonal selector symmetry. Its Standard-Model representation and dynamics must be derived.

### Path D — vanishing matching coefficient

If (c=0), CP-odd flavor data do not orient the response at quadratic order. The diagonal splitting (alpha-eta) may still select an even or odd axis.

## 8. Stop-everything criteria

Stop claiming a continuous selector stabilizer for a generic nondegenerate real response kernel.

Stop calling spurionic covariance (K(s)\leftrightarrow K(-s)) an unbroken CP symmetry of one fixed nonzero-(s) background.

Stop introducing a Goldstone particle unless the selector circle is established as a physical global symmetry with a kinetic term.

Stop using an ordinary response doublet as the required compensator; quadratic anisotropy transforms with weight two.

Stop the flavor-orientation branch if microscopic matching gives (c=0) for every independent CP-odd invariant.

## 9. Highest-value next calculations

1. Classify Standard-Model gauge-invariant weight-two source pairs capable of transforming with ((\delta,\xi)).
2. Compute the first nonzero matching contribution to (c) or prove its vanishing at a specified loop order.
3. Derive the diagonal splitting (alpha-eta) from even matter response.
4. Determine whether the response coordinate has a physical kinetic term and normalization.
5. In a spontaneous-CP completion, compute the vacuum quotient and defect classification.

## Companion documents

- [Two distinct response rotations](723_the_fixed_carrier_spin2_and_the_response_embedding_selector_spin2_are_distinct_and_furey_conjugation_breaks_only_the_latter.md)
- [CP-equivariant odd-source Hom space](722_cp_equivariance_uniquely_sends_one_odd_flavor_scalar_to_the_odd_response_axis_but_unbroken_response_spin2_forces_the_map_to_zero.md)
- [Projective response-line invariant](712_a_mixed_clifford_response_line_has_a_projective_cp_odd_invariant_and_requires_an_odd_cross_kernel.md)
