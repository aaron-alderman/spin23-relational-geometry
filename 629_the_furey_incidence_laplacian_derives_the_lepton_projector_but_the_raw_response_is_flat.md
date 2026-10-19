# The Furey Incidence Laplacian Derives the Lepton Projector, but the Raw Response Is Flat

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B05 and B11  
**Claim status:** exact on the declared fifteen-dimensional exchanged-TRO model; basis-independent action lift remains open  
**Certificate:** [derive_furey_incidence_laplacian_and_lepton_projector.mjs](scripts/derive_furey_incidence_laplacian_and_lepton_projector.mjs)

## Executive result

The Hermitian Furey incidence law contains two distinct objects that must not be conflated.

First, its raw quadratic response is completely independent of the lepton coordinates. Around any point \(\ell\in L\),

\[
R^{\rm H}_{\ell+\varepsilon n}=\varepsilon^2R^{\rm H}_{n},
\]

so its Jacobian vanishes and \(\|R^{\rm H}\|^2\) begins at fourth order in transverse fluctuations. The raw response is not a linear lepton source.

Second, the fourteen positive diagonal incidence equations define the exact quadratic form

\[
q(x)=\langle x,\Lambda x\rangle,
\]

where

\[
\boxed{
\Lambda=5(P_Q+P_{u^c})+(P_{d^c}+P_{e^c})+0P_L.
}
\]

Its spectral kernel is exactly \(L\), and the lepton projector is derived by polynomial functional calculus:

\[
\boxed{
P_L=\frac{(\Lambda-I)(\Lambda-5I)}5.
}
\]

This supplies an exact finite-dimensional mechanism selecting the lepton \(H_2(\mathbb R)\) source triplet from the five gauge-allowed triplets in [document 628](628_gauge_invariant_two_face_sources_form_five_h2r_multiplets_but_one_redundant_image_is_null.md).

## 1. Full response support

The certificate reconstructs every Jordan-symmetrized incidence equation directly from the five TRO arrows. The complete response support is

\[
Q\oplus u^c\oplus d^c\oplus e^c.
\]

Neither \(L_{11}\) nor \(L_{21}\) occurs in any response monomial. Since every monomial is homogeneous quadratic,

\[
R^{\rm H}(\ell+n)=R^{\rm H}(n)
\]

for \(\ell\in L\). Scaling the complement by \(\varepsilon\) gives the quadratic law in the executive result.

Consequently,

\[
D R^{\rm H}\big|_L=0,
\qquad
D^2\|R^{\rm H}\|^2\big|_L=0.
\]

A term \(\|R^{\rm H}\|^2\) is a quartic transverse constraint, not a quadratic susceptibility or mass selector.

## 2. The positive incidence form

Hermitianization turns fourteen diagonal equations into positive sums of coordinate norms. Summing their coefficients gives the coordinate weights

\[
\begin{array}{c|ccccc}
r&Q&u^c&d^c&L&e^c\\ \hline
\lambda_r&5&5&1&0&1.
\end{array}
\]

The weights are constant inside every irreducible Standard-Model sector. Therefore \(\Lambda\) commutes with the gauge action and belongs to the already classified commutant \(\mathbb C^5\).

It is positive semidefinite and has spectrum

\[
\operatorname{spec}\Lambda=\{0,1,5\},
\qquad
\ker\Lambda=L.
\]

This is the incidence analogue of a graph Laplacian: zero modes are precisely the arrows invisible to the exchanged ternary composition.

The displayed nonzero eigenvalues belong to the deduplicated-equation normalization. Preserving every response-component multiplicity changes the \(e^c\) eigenvalue from one to three but leaves the kernel and lepton projector unchanged. See [document 630](630_the_lepton_kernel_is_positive_weight_robust_but_incidence_eigenvalue_ratios_are_not_canonical.md).

## 3. Exact spectral projector

The polynomial

\[
p(t)=\frac{(t-1)(t-5)}5
\]

satisfies

\[
p(0)=1,\qquad p(1)=p(5)=0.
\]

Hence \(p(\Lambda)=P_L\) exactly. No arbitrary choice among the five commutant projectors is needed once \(\Lambda\) is admitted.

Applying this projector to the source classification gives

\[
P_L\left(\bigoplus_rH_2(\mathbb R)_r\right)P_L
\cong H_2(\mathbb R)_L.
\]

This closes the completed-module version of the lepton-source selection gate.

## 4. What has and has not unified

The following chain is now exact in the finite model:

\[
\text{exchanged TRO incidence}
\longrightarrow
q(x)=\langle x,\Lambda x\rangle
\longrightarrow
P_L=p(\Lambda)
\longrightarrow
H_2(\mathbb R)_L.
\]

But the raw response and the selected source are not literally the same tensor:

\[
R^{\rm H}\big|_L=0,
\qquad
P_L\big|_L=I_L.
\]

The incidence response supplies the positive Laplacian whose kernel defines the projector. The physical carrier must couple to the projector or to the kernel degrees of freedom, not directly to a nonzero value of \(R^{\rm H}\) on \(L\).

## 5. Action-level caveats

The present \(q\) is obtained by summing the unique positive diagonal coordinate equations with their displayed multiplicities. To become intrinsic physics, this operation must be rewritten as a basis-independent positive trace, frame operator or linking-algebra contraction.

Further, \(\Lambda\) acts on an internal chiral matter module. Inserting \(\psi^\dagger\Lambda\psi\) into a relativistic action does not automatically give a permitted Lorentz-scalar fermion mass term. The safe current interpretation is:

- \(\Lambda\) is an internal classifier or incidence Laplacian;
- \(P_L\) is a derived gauge-equivariant compression;
- an actual action must place these in a Lorentz- and chirality-compatible composite source.

## 6. Stop-everything criteria

Stop the claim that incidence dynamically selects the lepton carrier if:

1. the positive equation sum cannot be expressed independently of the chosen matrix-unit basis;
2. the source CAR/nested algebra changes the \(0,1,5\) spectrum or destroys gauge commutation;
3. the polynomial projector fails under the three-generation or interacting extension;
4. every Lorentz-compatible insertion of \(P_L\) requires a new arbitrary spurion;
5. radiative corrections mix the zero eigenspace with nonleptonic sectors without a protecting symmetry.

## 7. Next executable gate

Construct the positive analysis operator \(A\) whose component functionals are the fourteen diagonal incidence equations and test whether

\[
\Lambda=A^\dagger A
\]

is invariant under allowed unitary basis changes within the five TRO blocks. If its spectrum and projector are frame independent, the incidence sum becomes an intrinsic positive operator rather than a coordinate artifact.

## Reproducibility

```powershell
node scripts\derive_furey_incidence_laplacian_and_lepton_projector.mjs
```
