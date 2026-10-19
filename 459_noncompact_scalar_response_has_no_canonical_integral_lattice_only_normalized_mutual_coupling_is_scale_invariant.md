# Noncompact Scalar Response Has No Canonical Integral Lattice; Only Normalized Mutual Coupling Is Scale-Invariant

**Date:** 17 October 2026  
**Branches:** B01, B04, B07, B08, B09, B10, B12 and B14  
**Claim status:** exact canonical-rescaling no-go; compact/charge-lattice completions remain open

## 1. Why the normalization audit is necessary

The matrix

\[
X=
\begin{pmatrix}2&-1\\-1&2\end{pmatrix}
\]

is simultaneously:

- a positive scalar Dirichlet-to-Neumann response;
- an integral symmetric matrix;
- a generator of an integral symplectic shear.

But an integral matrix is meaningful only after a lattice and units have been selected. A noncompact scalar field has a continuous normalization freedom. The question is whether the scalar action itself canonically fixes the integral lattice.

It does not.

## 2. Canonical field rescaling

For boundary variables \(q\) and conjugate fluxes \(p\), perform

\[
q'=\lambda q,
\qquad
p'=\lambda^{-1}p.
\]

This preserves the symplectic form:

\[
dp'^T\wedge dq'=dp^T\wedge dq.
\]

The response law

\[
p=Xq
\]

becomes

\[
p'=X'q',
\qquad
X'=\lambda^{-2}X.
\]

Equivalently, the symplectic shear is conjugated by a real symplectic scaling:

\[
\begin{pmatrix}\lambda I&0\\0&\lambda^{-1}I\end{pmatrix}
\mathcal S_X
\begin{pmatrix}\lambda^{-1} I&0\\0&\lambda I\end{pmatrix}
=
\mathcal S_{X/\lambda^2}.
\]

## 3. Integrality disappears without changing the physics encoded by positivity

Choose \(\lambda=\sqrt2\). Then

\[
X'=
\begin{pmatrix}
1&-\tfrac12\\
-\tfrac12&1
\end{pmatrix},
\]

which is positive but no longer integral.

Choose \(\lambda=\pi\). Then every nonzero entry becomes irrational. The transformation remains canonical and the matrix remains positive.

Therefore

\[
\boxed{
\text{integrality of a noncompact scalar response is not invariant under canonical field normalization.}
}

The scalar interval selects a positive ray in response space, not a preferred primitive integer point on that ray.

## 4. Independent port-unit changes

More generally, with a positive diagonal unit matrix

\[
D=\operatorname{diag}(\lambda_1,\lambda_2),
\]

the canonical transformation

\[
q'=Dq,
\qquad
p'=D^{-T}p
\]

sends

\[
X\longmapsto X'=D^{-T}XD^{-1}.
\]

This can alter each diagonal and the mutual entry independently while preserving positivity and the canonical phase-space structure.

## 5. What is scale-invariant

The normalized mutual response

\[
r(X)=\frac{X_{12}}{\sqrt{X_{11}X_{22}}}
\]

is invariant under positive independent rescalings of the two ports. For the integral example,

\[
\boxed{r(X)=-\frac12.}
\]

This correlation coefficient, together with suitable eigenvalue ratios or cross ratios, is intrinsic to the response up to port units. Raw integer entries are not.

The arithmetic programme should therefore distinguish:

- **response-shape invariants**, which survive continuous normalization;
- **lattice data**, which require a separate quantization principle.

## 6. Consequence for the (Sp(4,mathbb Z)) bridge

The earlier integral generator theorem remains mathematically correct once the lattice \(\mathbb Z^4\) is declared. What fails is the claim that the free noncompact scalar alone canonically declares it.

The correct statement is conditional:

\[
\text{positive scalar response}
+
\text{chosen integral boundary lattice}
+
\text{Legendre duality}
\Longrightarrow
Sp(4,\mathbb Z).
\]

Without the middle datum, the natural group is real symplectic and related responses are connected by continuous canonical rescalings.

## 7. Credible sources of a canonical lattice

### 7.1 Compact phase variables

If \(q_i\) are angular variables with fixed periods, their momentum spectra are quantized and the value/flux phase space carries a natural lattice. A globally quadratic action must then be periodicized or understood locally; ordinary \(q^TXq\) is not globally single-valued on a torus.

### 7.2 Gauge holonomies and charge quantization

Boundary Wilson-line phases paired with quantized electric or magnetic fluxes give a canonical integral symplectic pairing. This is especially relevant to Standard-Model Cartan charges and the code lattice.

### 7.3 Code logical Pauli lattice

The finite logical systems come with canonical discrete exponent lattices. A compatible inverse/arithmetic limit could fix the real normalization, but such a lift must be constructed rather than assumed.

### 7.4 Topological action levels

Chern–Simons, BF or related topological terms can quantize coefficients. A boundary response descending from a quantized level would have arithmetic meaning absent from the free scalar kinetic term.

### 7.5 Surface homology

If the two-port phase space is identified with integral first homology of a genus-two surface, the intersection form supplies \(Sp(4,\mathbb Z)\) canonically. The physical map from fields to cycles remains required.

## 8. Branch decision

- **Closed:** noncompact canonical rescaling sends \(X\to X/\lambda^2\).
- **Closed:** positivity and symplectic structure survive while integrality can become fractional or irrational.
- **Closed:** normalized mutual response \(X_{12}/\sqrt{X_{11}X_{22}}\) survives independent positive port rescaling.
- **Closed:** the free noncompact scalar does not canonically select \(Sp(4,\mathbb Z)\).
- **Open:** compact-phase or gauge-holonomy realization.
- **Open:** topological level quantization.
- **Open:** code-to-real inverse limit fixing normalization.
- **Open:** genus-two homological interpretation.

## 9. Stop-everything and falsification gates

**Stop-everything trigger:** the boundary variables are derived as compact Standard-Model/Furey phases paired with quantized fluxes, fixing the same integral shear lattice without arbitrary rescaling.

**Normalization falsifier:** integer entries are treated as predictions while \(q\to\lambda q\) remains an allowed unbroken field redefinition.

**Compactness falsifier:** a globally quadratic nonperiodic action is assigned directly to an angular variable without branches or periodic completion.

**Invariant trigger:** the scale-free value \(r=-1/2\) emerges independently from code, Furey or stress-response data.

## 10. Certificate

The [normalization no-go certificate](scripts/verify_noncompact_scalar_rescaling_erases_integrality_but_preserves_mutual_correlation.mjs) checks the canonical rescaling, symplectic conjugation, preservation of positivity and invariance of the normalized mutual response under common and independent port-unit changes.

## Companion documents

- [Conditional integral generator completion](458_positive_response_unit_self_shears_and_boundary_legendre_duality_supply_the_standard_sp4z_generators.md)
- [Positive integral scalar response](457_a_positive_integral_scalar_boundary_response_supplies_the_missing_cross_shear_in_sp4z_and_modulo_every_prime.md)
- [Scalar boundary displacement kernel](67_scalar_boundary_displacement_kernel.md)
- [Braid/integral symplectic branch](57_braid_central_twist_to_sp4z_branch.md)
- [Walk/Siegel resolvent and the \(Sp(4)\) domain](159_walk_siegel_resolvent_and_sp4_domain.md)
