# A Complex Probe Cannot Map Nontrivially and Completely Positively Directly to Hermitian Observables, but Its Minimal Two-Quadrature Lift Is (H_2(mathbb R))

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B05, B06, B08, B09, B11, B13, B14 and the positive-realification branch  
**Claim status:** exact no-go for direct complex-linear Hermitian output and exact minimal Lorentz-cone lift; microscopic response normalization remains open  
**Certificate:** [verify_complex_probe_requires_h2r_lorentz_cone_for_positive_hermitian_realification.mjs](../../../verification/verify/verify_complex_probe_requires_h2r_lorentz_cone_for_positive_hermitian_realification.mjs)

## Executive result

Document 727 left a complex linking scalar (Z_2=E_2+iI_2) in the probe slot. A physical observable must ultimately be Hermitian and positive where appropriate.

There is no nonzero complex-linear map

\[
\Phi:\mathbb C\longrightarrow M_n(\mathbb C)

\]

whose output is Hermitian for **every** (z\in\mathbb C). Since (Phi(z)=zA) with (A=Phi(1)), Hermiticity of both (A) and (iA) gives

\[
iA=(iA)^\dagger=-iA,

\]

so (A=0).

Taking the Hermitian part does not solve the problem:

\[
zA+(zA)^\dagger
=2\operatorname{Re}(z)A.

\]

It discards the CP-odd quadrature.

The minimal positive Hermitian realification that retains both quadratures introduces one real carrier coordinate (t):

\[
\boxed{
X(t,Z_2)=
\begin{pmatrix}
t+E_2&I_2\\
I_2&t-E_2
\end{pmatrix}
\in H_2(\mathbb R).
}

\]

Its eigenvalues are

\[
t\pm|Z_2|,

\]

so

\[
\boxed{
X(t,Z_2)\ge0
\quad\Longleftrightarrow\quad
t\ge|Z_2|.
}

\]

The minimal two-quadrature positive realification is therefore the (H_2(\mathbb R)) Lorentz cone itself.

## 1. Why complete positivity does not mean Hermitian output for complex inputs

A completely positive map between complex operator algebras is complex linear and *-preserving. It maps Hermitian inputs to Hermitian outputs. A generic complex number (z) is not Hermitian as an element of the scalar algebra unless (z\in\mathbb R).

Therefore a CP map may send

\[
z\mapsto zA

\]

with (A\ge0), but the output is non-Hermitian for nonreal (z). Requiring all complex inputs to produce observables is an additional condition, and it forces the direct map to vanish.

This prevents a category error: “complex linear and completely positive” does not by itself provide a Hermitian two-quadrature response.

## 2. The Lorentz-cone lift

Write

\[
Z_2=E_2+iI_2.

\]

The lift

\[
X=tI+E_2\sigma_z+I_2\sigma_x

\]

has

\[
\operatorname{Tr}X=2t,

\]

and

\[
\boxed{
\det X=t^2-E_2^2-I_2^2
=t^2-|Z_2|^2.
}

\]

This is exactly the rank-two real Jordan determinant. The carrier coordinate is not decorative: without (t), a nonzero traceless anisotropy has eigenvalues (pm|Z_2|) and cannot be positive.

## 3. CP action

On (H_2(\mathbb R)), let

\[
C=\operatorname{diag}(1,-1).

\]

Then

\[
CX(t,Z_2)C
=X(t,Z_2^*).

\]

Thus the Lorentz-cone lift retains the correct CP-even and CP-odd quadratures while remaining Hermitian.

## 4. Relation to the common-coefficient ray

The normalized lift uses equal coefficients for (E_2) and (I_2). More generally,

\[
X_{g_E,g_I}
=tI+g_EE_2\sigma_z+g_II_2\sigma_x

\]

is also Hermitian and can be positive for sufficiently large (t). Positivity alone therefore does not force (g_E=g_I).

What the canonical lift establishes is:

- equal scaling is the determinant-isometric embedding;
- unequal scaling deforms the circular section into an ellipse;
- CP allows both;
- preserving the (Z_2) modulus and selector complex structure selects equal magnitudes.

The half-phase prediction remains tied to determinant isometry, not positivity alone.

## 5. A new realization of “one carrier, two faces, three relationships”

The lift has:

- one carrier coordinate (t);
- two eigenvalue faces (t\pm|Z_2|);
- three real Jordan coordinates ((t,E_2,I_2)).

Its determinant measures the balance between the carrier and the two relational quadratures.

This does not prove the user's original phrase was intended as this formula. It does show that the current research chain has arrived at an exact mathematical object with precisely that counting.

## 6. Consequence for (Spin(2,3))

The positive cone of (H_2(\mathbb R)) is the future Lorentz cone in (2+1) dimensions. Its conformal algebra is

\[
\mathfrak{conf}(H_2(\mathbb R))
\cong\mathfrak{sp}(4,\mathbb R)
\cong\mathfrak{so}(2,3).

\]

Therefore the demand to retain both quadratures of a complex flavor invariant in a positive Hermitian carrier leads directly back to the programme's central rank-two Jordan system.

This is a structural implication:

\[
\text{complex relational datum}
+\text{Hermitian positivity}
+\text{minimal carrier coordinate}
\Longrightarrow
H_2(\mathbb R).

\]

It is not yet a derivation that the physical stress tensor uses this minimal lift.

## 7. Branch tree

### Path A — determinant-isometric lift

The canonical equal-scale embedding is physical. The (Z_2) modulus becomes the spatial radius of the response cone and the half-phase prediction survives.

### Path B — elliptically deformed lift

CP and positivity survive with unequal coefficients. The carrier remains a positive rank-two system after rescaling, but the direct identification with the normalized flavor modulus is lost.

### Path C — imaginary quadrature projected out

Naive Hermitianization keeps only (E_2). Majorana CP does not orient the response.

### Path D — no external complex probe

The linking scalar cannot enter the physical response at all. Pin the entire (Z_2\)-orientation branch.

## 8. Stop-everything criteria

Stop describing a generic complex CP-map output as an observable; only Hermitian inputs are guaranteed Hermitian outputs.

Stop using the naive Hermitian part if the goal is to retain (I_2); it deletes that quadrature.

Stop claiming positivity alone selects equal even/odd coefficients.

Stop the determinant-isometric branch if microscopic normalization produces an unavoidable elliptic deformation.

Stop the physical-carrier claim if no stress/source construction supplies the positive coordinate (t).

## 9. Highest-value next calculations

1. Identify the physical source of the carrier coordinate (t), preferably a positive spectral weight or stress response.
2. Test whether the Clifford conditional expectation preserves the determinant-isometric lift.
3. Classify elliptic deformations under source normalization and field redefinitions.
4. Build the CAR-compatible Nambu dilation of (X(t,Z_2)).
5. Compare the resulting cone boundary (t=|Z_2|) with bound/free or pure/mixed response states.

## Companion documents

- [Hermitian exchanged-TRO slot-linearity](727_the_hermitian_exchanged_tro_is_state_phase_blind_and_can_transport_z2_only_through_a_separately_typed_complex_probe.md)
- [CP-equivariant versus complex-linear maps](726_cp_equivariance_allows_two_response_coefficients_while_the_furey_complex_structure_selects_a_canonical_common_coefficient_ray.md)
- [Jordan-triple to Sp(4,R) determination](../0000-0099/42_jordan_triple_to_sp4r_determination.md)
