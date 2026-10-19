# Programme Closure 03: A Controlled Standard-Model External-Source Action Exists but Does Not Fix the Frame

**Date:** 17 October 2026  
**Status:** controlled local generating-functional construction conditional on the source plane; finite renormalization, real-slice selection and operational coupling remain open  
**Certificate:** [verify_programme_controlled_external_source_action.mjs](scripts/verify_programme_controlled_external_source_action.mjs)

## Executive result

The programme does not need a new propagating two-face field in order to define the incidence/\(B-L\) response. A controlled effective action exists inside the completed Standard Model with \(\nu_R\): couple two nondynamical background probes to the two composite vector insertions.

Let

\[
J_\lambda^\mu
=\sum_r\lambda_r\,
\psi_r^\dagger\bar\sigma^\mu\psi_r,
\qquad
J_q^\mu
=\sum_rq_r\,
\psi_r^\dagger\bar\sigma^\mu\psi_r,
\]

with

\[
\lambda=(5,5,1,1,1,0),
\qquad
q=3(B-L)=(1,-1,-1,-3,3,3).
\]

Introduce external real vector sources \(a_\mu,b_\mu\):

\[
\boxed{
S_{\rm src}
=\int d^4x\,
\left(a_\mu J_\lambda^\mu+b_\mu J_q^\mu\right).
}
\]

The renormalized generating functional

\[
W[a,b]=-i\log
\int D\Phi\,
\exp i\left(
S_{\rm SM+\nu_R}+S_{\rm src}+S_{\rm ct}[a,b]
\right)
\]

generates the full matrix response by second differentiation.

This closes the action-existence part of gate G02 at the level of a controlled source-coupled quantum field theory. It does not fix the source frame, subtraction tensor or \(H_2(\mathbb R)\) real structure.

## 1. Why the coupling is legal

Each bilinear

\[
\psi_r^\dagger\bar\sigma^\mu\psi_r
\]

is a Standard-Model gauge singlet. Both \(J_\lambda^\mu\) and \(J_q^\mu\) are therefore gauge-invariant local composite operators.

Their engineering dimension is three. Assigning dimension one to \(a_\mu,b_\mu\) makes the source coupling dimension four and local.

The backgrounds are bookkeeping and measurement fields, not additional asymptotic particles. The construction does not introduce mirror fermions or a new gauge boson.

## 2. The two sources have different symmetry status

Before Majorana breaking, \(J_q^\mu\) is the fully anomaly-free \(B-L\) current in the \(\nu_R\)-completed theory:

\[
\partial_\mu J_q^\mu=0.
\]

The generating functional can therefore obey a background Abelian Ward identity in the \(b_\mu\) direction.

The incidence insertion obeys instead

\[
\partial_\mu J_\lambda^\mu
\propto
10y_u\mathcal O_u
+6y_d\mathcal O_d
+2y_e\mathcal O_e
+y_\nu\mathcal O_\nu
+\text{h.c.}
\]

up to convention-dependent factors. There is no background gauge symmetry for \(a_\mu\). It is an ordinary source for a nonconserved composite operator.

The action therefore derives an asymmetric two-port system:

\[
\boxed{
\text{one Ward-protected port}
+\text{ one renormalized composite port}.
}
\]

## 3. Matrix response

Define

\[
\Pi_{ij}^{\mu\nu}(x-y)
=\left.
\frac{\delta^2W}
{\delta s_{i,\mu}(x)\delta s_{j,\nu}(y)}
\right|_{a=b=0},
\qquad
(s_1,s_2)=(a,b).
\]

After Fourier transform, the \(B-L\) index obeys its Ward identity, subject to the standard local contact terms:

\[
q_\nu\Pi_{i2}^{\mu\nu}(q)=0.
\]

The incidence/incidence component has no such protection.

For any physical polarization and positive-energy spectral cut, insert a complete set of states:

\[
\rho_{ij}
=\sum_n w_n
\langle0|J_i|n\rangle
\langle n|J_j|0\rangle,
\qquad w_n\ge0.
\]

For every complex source vector \(c\),

\[
c^\dagger\rho c
=\sum_nw_n
\left|\sum_i c_i^*
\langle0|J_i|n\rangle\right|^2
\ge0.
\]

Thus

\[
\rho\in H_2(\mathbb C)_+.
\]

The positive two-channel spectral carrier follows from Hilbert-space positivity, not from an assumed Jordan cone.

## 4. Why \(H_2(\mathbb R)\) is not automatic

Positivity gives a complex Hermitian matrix. A real reciprocal slice requires an antiunitary or time-reversal/CP condition making the off-diagonal spectral amplitude real in one common frame.

The Standard Model contains physical CKM and possibly PMNS phases. They need not destroy every CP-even two-point subspace, but they forbid assuming a global real structure merely because the source coefficients \(\lambda,q\) are real.

Therefore the controlled action establishes

\[
H_2(\mathbb C)_+
\]

before the selector, and reaches

\[
H_2(\mathbb R)_+
\]

only after the separate real-structure gate G05 passes.

This is a useful correction to any chain that writes the real Jordan carrier directly at the action level.

## 5. Renormalization and contact terms

Because \(J_\lambda^\mu\) is not conserved, it can mix with all gauge-invariant dimension-three vector operators having the same exact quantum numbers, plus equation-of-motion or BRST-trivial operators in an off-shell treatment.

The source counterterm functional contains local quadratic terms schematically of the form

\[
S_{\rm ct}[a,b]
=\frac12\int
\left(
aQ_{aa}a+2aQ_{ab}b+bQ_{bb}b
\right)
+\text{derivative terms}.
\]

They shift the real polynomial/contact part of \(\Pi\) but not its nonlocal positive spectral cut.

Hence the action determines:

- which correlators exist;
- their Ward typing;
- their spectral positivity;
- their causal analytic class after standard continuation.

It does not determine without calculation:

- the finite source-frame shear;
- the subtraction tensor;
- the incidence anomalous dimension;
- the full real part from absorptive data alone;
- the real \(H_2(\mathbb R)\) selector.

## 6. Compatibility with the affine source torsor

Under

\[
J_\lambda\mapsto aJ_\lambda+bJ_q,
\qquad
J_q\mapsto J_q,
\]

the source variables transform contragrediently and the response by congruence. The generating functional describes the same two-dimensional operator span in a different renormalized frame.

This proves that the affine freedom found in the finite Gram calculation is not merely a coordinate accident. It is exactly the allowed finite operator-mixing freedom compatible with the one protected current.

## 7. Majorana fork

A Majorana mass for \(\nu_R\) breaks continuous \(B-L\). Then:

- the \(b_\mu\) background Ward identity is lost;
- both ports become ordinary composite insertions;
- the protected source axis disappears;
- matter parity does not replace the missing continuous-current normalization.

The controlled action still exists as a generating functional, but its strongest source-selection feature is gone. Dirac and Majorana neutrino branches must therefore remain separate worlds in the closure graph.

## 8. Locality, unitarity and anomaly audit

| Requirement | Result |
|---|---|
| Standard-Model gauge invariance | both composite insertions are singlets |
| locality | source couplings are local dimension-four terms |
| new propagating ghosts | none; sources are nondynamical |
| chiral matter content | inherited from the completed Furey/SM module |
| \(B-L\) anomaly freedom | passes only with \(\nu_R\) |
| \(B-L\) Ward identity | passes before Majorana breaking |
| incidence conservation | fails exactly |
| spectral positivity | follows from the Gram/Källén--Lehmann form |
| real reciprocity | not automatic |
| renormalization closure | requires a declared composite-operator basis and counterterms |

## 9. Programme consequence

Gate G02 can be upgraded:

> Given the candidate source plane, a controlled gauge-invariant external-source action exists and generates a causal positive matrix response.

But this does not yet give the requested closed theory, because:

1. G01 still lacks a unique renormalized frame and operational coupling;
2. G05 still lacks a derived real selector;
3. G06 still lacks fixed contact and UV normalization;
4. G07 still lacks an orientation-selecting boundary condition;
5. no new dimensionless observable follows merely from the generating functional.

## 10. Smallest decisive next calculation

Compute the renormalized two-point matrix

\[
\Pi_{ij}^{\mu\nu}(q)
\]

to the first nontrivial order in the Yukawa couplings, including the mixing and contact matrix, in a fixed scheme.

The key outputs are:

- whether \(J_\lambda\) renormalizes multiplicatively;
- whether a scale-dependent \(B-L\) shear is generated;
- whether the transverse spectral matrix is full rank;
- whether its off-diagonal absorptive part has a common real structure;
- whether any ratio survives field normalization and subtraction choices.

## References

- [Collins and Scalise, renormalization and mixing of gauge-invariant composite operators](https://arxiv.org/abs/hep-ph/9403231)
- [Freire and Wetterich, background-field dependence and Ward identities](https://arxiv.org/abs/hep-th/9601081)
- [Capri et al., explicit mixing of gauge-invariant vector composite operators](https://arxiv.org/abs/2007.01770)

## Stop conditions

Do not call \(a_\mu\) a gauge field or \(J_\lambda\) a conserved current. Do not infer a real Jordan carrier directly from complex spectral positivity. Do not treat source counterterms as predicted observables.

## Companion documents

- [Canonical source plane and affine frame torsor](programme_closure_02_the_source_subspace_is_canonical_but_its_frame_is_an_affine_torsor.md)
- [Unique anomaly-free \(B-L\) current](633_the_only_fully_anomaly_free_current_extending_the_lepton_selector_is_b_minus_l_with_nuc.md)
- [Incidence conservation obstruction](656_the_incidence_current_cannot_be_repaired_into_a_conserved_current.md)
- [KMS--Herglotz sewing](213_fixed_temperature_kms_herglotz_schur_sewing.md)
