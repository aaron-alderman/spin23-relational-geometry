# Thermal Stress Channels Can Kinematically Span the Full \(H_2\) Carrier

**Date:** 17 October 2026  
**Branches:** B01, B02, B04, B06, B07 and B11  
**Claim status:** exact kinematic existence result after the Ward quotient; no claim that a particular thermal Standard-Model state realizes the required independent weights or a full \(Spin(2,3)\) symmetry

## 1. Why a medium changes the vacuum obstruction

In the Lorentz-invariant vacuum, a conserved stress two-point function has only the transverse spin-two and spin-zero structures. Two fixed probes therefore produce

\[
\rho(s)=\rho_2(s)G_2+\rho_0(s)G_0,
\]

which lies in a plane in \(H_2(\mathbb R)\).

A thermal or finite-density state supplies a timelike four-velocity \(u^\mu\). At nonzero spatial momentum, the residual little group separates stress fluctuations into tensor, shear/vector and sound/scalar channels. Thermal stress correlators and their shear/bulk spectral functions are standard objects; see, for example, [Meyer, *Energy-momentum tensor correlators and spectral functions*](https://arxiv.org/abs/0806.3914).

The extra datum \(u^\mu\) therefore evades the vacuum two-projector theorem without modifying the stress operator itself.

## 2. Ward quotient and channel decomposition

Choose the medium rest frame and momentum along the \(z\)-axis. Conservation

\[
q_\mu T^{\mu\nu}=0
\]

removes longitudinal gauge/Ward-null combinations. The surviving source-response space decomposes under rotations around \(z\) into mutually orthogonal helicity sectors:

\[
\mathcal V_{\rm phys}
=\mathcal V_{2}\oplus\mathcal V_{1}\oplus\mathcal V_{0}.
\]

Representative components are:

- tensor/helicity two: \(T^{xy}\) and \(T^{xx}-T^{yy}\);
- shear/helicity one: the conserved combinations built from \((T^{0x},T^{zx})\) and \((T^{0y},T^{zy})\);
- sound/helicity zero: conserved combinations of \(T^{00},T^{0z},T^{zz},T^{xx}+T^{yy}\).

Reflection positivity or positive-frequency Hilbert-space positivity makes the spectral operator positive on each physical channel.

## 3. Two probes and three positive Gram matrices

Let two conserved probes have channel-amplitude vectors

\[
t=(1,0)^T,
\qquad
v=(0,1)^T,
\qquad
s=(1,1)^T
\]

in one chosen tensor, vector and scalar direction. The corresponding two-probe Gram matrices are

\[
G_T=tt^T=
\begin{pmatrix}1&0\\0&0\end{pmatrix},
\quad
G_V=vv^T=
\begin{pmatrix}0&0\\0&1\end{pmatrix},
\quad
G_S=ss^T=
\begin{pmatrix}1&1\\1&1\end{pmatrix}.
\]

Each is positive semidefinite, and the three are linearly independent. Therefore

\[
\operatorname{span}\{G_T,G_V,G_S\}=H_2(\mathbb R).
\]

For nonnegative channel spectral weights,

\[
\rho
=aG_T+bG_V+cG_S
=\begin{pmatrix}a+c&c\\c&b+c\end{pmatrix}\succeq0.
\]

This proves that a medium can kinematically supply the missing off-diagonal Jordan direction using the same stress tensor and only two external probes.

## 4. What has and has not been achieved

The result closes a specific obstruction:

> The vacuum stress plane is not the largest stress-generated carrier once a physical state supplies an additional timelike vector.

But it does **not** establish:

- that all three channel spectral weights are nonzero in one theory and kinematic region;
- that they vary independently enough to explore an open subset of the cone;
- that the probes are selected canonically;
- that \(Sp(4,\mathbb R)\) maps the physical thermal family into itself;
- that the medium four-velocity is fundamental rather than state-dependent.

This is a full-span result, not a full-symmetry result.

## 5. Relation to the relational-carrier narrative

In the canonical stress-plane basis, the vacuum channels occupy the two diagonal coordinates. The medium scalar channel chosen above contributes

\[
G_S=E_{11}+E_{22}+E_{12}+E_{21}.
\]

Its new information is the coherent cross term \(E_{12}+E_{21}\). Thus the third Jordan coordinate is literally relational: it records a response shared coherently between the two probe faces.

The hierarchy becomes:

\[
\text{one carrier ray}
\longrightarrow
\text{two vacuum relationships}
\longrightarrow
\text{three-coordinate medium carrier}.
\]

This is the first direct stress-branch realization of “one carrier, two faces, three relationships” at the level of a positive spectral matrix. It remains basis- and probe-dependent until a physical selection rule fixes the two probes.

## 6. Open-cone criterion

Spanning \(H_2(\mathbb R)\) is necessary but not sufficient for exploring its interior. Define

\[
r(\omega,k)
=\bigl(a(\omega,k),b(\omega,k),c(\omega,k)\bigr).
\]

The spectral family reaches a locally three-dimensional subset only if the Jacobian of the independently controllable state/kinematic parameters has rank three. A one-parameter frequency scan still traces only a curve, even when its linear span is three-dimensional.

Candidate independent controls are \(\omega\), \(|\mathbf k|\), temperature \(T\), chemical potential \(\mu\), and probe orientation. The group claim must specify which of these transform and which are held fixed.

## 7. Falsification and stop-everything gates

**Kinematic falsifier:** the Ward-quotiented medium stress space has only two nonzero mutually independent channels for every allowed state. Then this escape fails.

**Dynamical falsifier:** one of the three chosen channel weights vanishes identically or is universally constrained to a fixed combination of the other two.

**Full-span success:** an explicit unitary field theory yields three nonzero spectral matrices whose coordinate determinant is nonzero for fixed probes.

**Open-cone success:** variation of physical controls gives rank three in \((a,b,c)\) while preserving spectral positivity.

**Stop-everything symmetry signal:** the thermal family is closed under a nontrivial action mixing all three Jordan coordinates, rather than merely occupying their span.

## 8. Certificate

The [thermal stress-channel span certificate](../../../verification/verify/verify_thermal_stress_channels_full_h2.mjs) verifies positivity and linear independence of the three channel Gram matrices, positivity of their nonnegative spectral sums and the distinction between full linear span and the dimension of a parameterized spectral image.

## Companion documents

- [Stress-plane \(Spin(2,2)\) stabilizer](210_stress_plane_stabilizer_is_spin22_inside_spin23.md)
- [Free conformal stress ray](209_free_conformal_field_stress_spectrum_is_one_jordan_ray.md)
- [Stress spectral-family dimension](208_stress_spectral_family_dimension_and_ambient_sp4_obstruction.md)
- [Conserved-stress Ward quotient](206_conserved_stress_spectral_quotient_to_h2_response.md)
