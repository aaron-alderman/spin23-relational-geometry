# Orientation-Complete Walk Response Restores the (Spin(2,4)) Parent

**Date:** 17 October 2026  
**Branches:** B01, B04, B07, B08 and B13  
**Claim status:** exact finite-walk response comparison plus established conformal-domain identifications; the physical selector remains open

## 1. The problem with the cosine response

The self-adjoint walk variable

\[
K=\frac{U+U^T}{2}
\]

produces a symmetric Siegel response and hence the (Sp(4,\mathbb R)\cong Spin_0(2,3)) domain. But on an eigenphase (e^{-iω}),

\[
K\mapsto\cos ω.
\]

It identifies (ω) and (-ω). The very real/symmetric reduction that reveals (Spin(2,3)) loses quasienergy orientation.

An orientation-sensitive comparison is therefore mandatory.

## 2. Cayley self-adjoint variable

Away from eigenvalue (U=I), define

\[
\boxed{
H_C=i(I+U)(I-U)^{-1}.
}

For unitary (U), (H_C) is Hermitian. On an eigenphase,

\[
e^{-iω}
\longmapsto
\cot\frac{ω}{2}.
\]

This map is odd:

\[
\cot(-ω/2)=-\cot(ω/2),
\]

so it retains quasienergy orientation. It is rational and branch-free, but singular at \(ω=0\).

If the finite walk has an eigenvalue at one, the Cayley transform requires either a different quasienergy origin or a complementary Cayley chart. The certificate uses an explicit origin shift together with nonuniform oriented phases. That chart choice is another physical datum; it cannot be hidden as a harmless algebraic convention.

The alternative principal logarithm

\[
H_{\log}=i\log U
\]

maps to (ω) directly on the chosen branch, but is discontinuous at the Floquet branch cut (ω=\pm π) and generally nonlocal as a lattice operator.

## 3. Orientation-complete boundary response

For (operatorname{Im}ζ>0), compress the Cayley resolvent to two ports:

\[
Z_C(ζ)=P^\dagger(H_C-ζI)^{-1}P.
\]

It obeys

\[
\frac{Z_C-Z_C^\dagger}{2i}>0.
\]

Thus it is a matrix-valued Herglotz response.

For a generic oriented walk with nontrivial link or substep phases, however,

\[
Z_C^T\ne Z_C.
\]

The response is causal and positive in the Hermitian sense but not a point of the symmetric genus-two Siegel space.

## 4. The parent domain

A general two-channel causal response decomposes as

\[
Z=A+iB,
\qquad A=A^\dagger,quad B=B^\dagger>0.
\]

Its real carrier is (H_2(\mathbb C)), the four-real-dimensional Hermitian Jordan algebra. The corresponding tube domain has conformal group

\[
SU(2,2),
\]

locally isomorphic to

\[
Spin_0(2,4).
\]

This is precisely the complex parent already identified elsewhere in the programme.

By contrast, imposing transpose symmetry and the compatible real structure restricts the carrier to

\[
H_2(\mathbb R)=\operatorname{Sym}_2(\mathbb R),
\]

whose tube domain is the genus-two Siegel upper half-space with conformal group

\[
Sp(4,\mathbb R)
\cong Spin_0(2,3).
\]

The dimension split is the familiar

\[
15=10+5.
\]

## 5. A new concrete reading of the selector

The response calculation suggests a precise physical interpretation:

> The (Spin(2,4)\to Spin(2,3)) selector may be a reciprocity, time-reversal or real-structure condition that turns an orientation-complete Hermitian two-port response into a transpose-symmetric response.

This is stronger than selecting a coordinate by hand. It associates the missing five conformal directions with operations that require the complex/oriented response sector.

But there is a tension:

- quasienergy orientation is needed for chiral and Floquet information;
- transpose symmetry yields the real Jordan carrier;
- simply replacing (U) by ((U+U^T)/2) achieves the slice by discarding orientation rather than explaining how it survives elsewhere.

The desired synthesis must place orientation in flavor, particle/antiparticle or another factor while keeping the external two-port response real.

## 6. Three response choices

| choice | eigenphase map | advantage | obstruction |
|---|---|---|---|
| cosine (K=(U+U^T)/2) | (cos ω) | bounded, real symmetric, Siegel (Sp(4)) domain | loses (ω\leftrightarrow-ω) |
| Cayley (H_C) | (cot(ω/2)) | orientation sensitive, rational, Hermitian | pole at (ω=0); generic response not symmetric |
| principal log (i\log U) | (ω) | direct oriented quasienergy | branch cut at (π); generally nonlocal |

No option is currently canonical for the complete physical theory.

## 7. Relation to Furey and flavor CP

The programme already learned that the external face carrier may be real while flavor remains complex. The new response comparison makes that architecture more plausible:

\[
H_2(\mathbb R)_{\rm external}
\otimes
\operatorname{Herm}_3(\mathbb C)_{\rm flavor}.
\]

Quasienergy orientation and CP phase need not be stored as the forbidden fourth coordinate of the external two-port carrier. They may reside in the internal/Fock factor, provided the combined response remains causal and gauge covariant.

This is a candidate architecture, not a derivation.

## 8. Stop-everything and falsification gates

**Selector success:** derive a reciprocity or antiunitary condition from the walk/Furey action that enforces (Z^T=Z) externally while preserving chiral orientation internally.

**Parent restoration:** show that gauge or CP effects necessarily make the physical external response nonsymmetric, forcing the full (H_2(\mathbb C)) and (Spin(2,4)) parent.

**Canonical response:** a measurement protocol or reflection-positive construction uniquely selects cosine, Cayley, logarithmic or another response map.

**No-go:** every orientation-preserving causal response leaves the symmetric Siegel subdomain, so (Spin(2,3)) cannot carry chiral dynamics without an auxiliary factor.

**Demotion:** if the real slice is obtained only by manually symmetrizing away physical information, treat \(Spin(2,3)\) as a lossy effective response geometry.

## 9. Certificate

The [orientation/parent-domain certificate](scripts/verify_cayley_orientation_parent_domain.mjs) verifies Cayley self-adjointness, positive Hermitian response, generic failure of transpose symmetry, symmetric cosine response, odd versus even phase maps and the \(15=10+5\) domain split.

## Companion documents

- [Walk Siegel resolvent](159_walk_siegel_resolvent_and_sp4_domain.md)
- [The \(H_2(\mathbb C)\to H_2(\mathbb R)\) fallback](129_h2c_fallback_restores_spin24_parent.md)
- [Spectral phase alignment theorem](133_symmetric_phase_dressed_carrier_options.md)
- [Real carrier with complex flavor CP](120_real_face_carrier_complex_flavor_cp.md)
