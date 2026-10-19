# The Domain-Wall Tensor Lift Has an Exact Weyl Cone and Passive Face Response

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B07, B11 and B13  
**Claim status:** exact finite free Hamiltonian construction; gauge covariance, finite mirror wall and Standard-Model loading remain open

## 1. Tensoring the transverse wall with physical momentum

Let \(Q:\mathbb R^{N+1}\to\mathbb R^N\) be the rectangular kink operator with normalized kernel vector \(f\). Introduce a two-component spinor and define

\[
H(\mathbf k)=
\begin{pmatrix}
I_{N+1}\otimes(\boldsymbol\sigma\cdot\mathbf k)
&Q^T\otimes I_2\\
Q\otimes I_2
&-I_N\otimes(\boldsymbol\sigma\cdot\mathbf k)
\end{pmatrix}.
\]

This is a finite free domain-wall Hamiltonian with three continuous wall momenta.

## 2. Exact square and bulk gap

The opposite signs of \(\boldsymbol\sigma\cdot\mathbf k\) make the cross terms cancel. Therefore

\[
H(\mathbf k)^2=
\begin{pmatrix}
Q^TQ\otimes I_2+|\mathbf k|^2I&0\\
0&QQ^T\otimes I_2+|\mathbf k|^2I
\end{pmatrix}.
\]

Every nonzero singular value \(s_n(Q)\) produces bulk energies

\[
E_{n,\pm}=\pm\sqrt{|\mathbf k|^2+s_n(Q)^2}.
\]

The transverse singular-value gap therefore remains a bulk mass gap.

## 3. Exact wall Weyl cone

For any two-spinor \(\chi\),

\[
H(\mathbf k)
\begin{pmatrix}f\otimes\chi\\0\end{pmatrix}
=
\begin{pmatrix}f\otimes(\boldsymbol\sigma\cdot\mathbf k)\chi\\0\end{pmatrix}.
\]

The index subspace is invariant and carries exactly

\[
H_{\rm wall}(\mathbf k)=\boldsymbol\sigma\cdot\mathbf k,
\]

with dispersion

\[
E_\pm=\pm|\mathbf k|.
\]

No continuum approximation is needed for the wall cone in this finite transverse prototype.

## 4. Face and spin factors

Choose two neighboring transverse probes near the wall. Retaining both spin components gives a four-dimensional projected Green function

\[
G_{\rm wall}(z,\mathbf k)
=P(H(\mathbf k)-zI)^{-1}P^\dagger.
\]

The zero-mode pole contribution factorizes into

\[
(pp^T)_{\rm face}
\otimes
(\boldsymbol\sigma\cdot\mathbf k-zI_2)^{-1}_{\rm spin},
\qquad p=P_\perp f.
\]

Thus the real two-face residue and the complex Weyl spinor dynamics occupy distinct tensor factors. This is the same structural separation previously required between a real carrier and complex flavor data.

## 5. Passivity

Because \(H(\mathbf k)\) is Hermitian,

\[
\operatorname{Im}G_{\rm wall}(z,\mathbf k)\succeq0
\qquad(\operatorname{Im}z>0).
\]

Any spinor compression \(I_{\rm face}\otimes\langle\eta|\) therefore yields a positive \(2\times2\) face Herglotz response. The Weyl lift preserves the causal Jordan carrier rather than competing with it.

## 6. What this advances

The finite prototype now contains, in one exact model:

- a transverse index mode;
- an exact three-momentum Weyl cone;
- a gapped transverse bulk;
- a two-face wall response;
- Herglotz positivity;
- face/spin factorization;
- Schur provenance from bulk elimination.

It still has only one abstract free species and an open transverse end. It is not yet a lattice-regularized chiral gauge theory.

## 7. Stop-everything and falsification gates

**Gauge loading:** replace \(\mathbf k\) by covariant wall links and show exact gauge covariance without destroying the transverse index.

**Generation loading:** tensor the wall spinor with the complete anomaly-free Furey representation and preserve the face commutant.

**Finite slab:** add the opposite wall, calculate pole splitting and demonstrate acceptable mirror suppression or symmetric mass generation.

**Walk realization:** replace continuous \(\boldsymbol\sigma\cdot\mathbf k\) by an exactly unitary discrete-time wall evolution with controlled zero/\(pi\) sectors.

**Falsifier:** spin/gauge loading mixes the face factor so strongly that no positive \(H_2\) compression or selector-compatible portal survives.

## 8. Certificate

The [domain-wall Weyl tensor-lift certificate](scripts/verify_domain_wall_weyl_tensor_lift.mjs) verifies Hermiticity, the exact squared-Hamiltonian identity, invariance of the zero-mode subspace, exact Weyl dispersion and positivity of a projected wall resolvent.

## Companion documents

- [Finite domain-wall Schur response](229_finite_domain_wall_resolvent_is_a_schur_herglotz_carrier.md)
- [One-generation anomaly gate](228_one_standard_model_generation_passes_domain_wall_anomaly_gate.md)
- [Weyl-walk local Hopf roots](226_weyl_walk_nodes_realize_local_hopf_roots_but_cancel_globally.md)
- [Real face with complex flavor](120_real_face_carrier_complex_flavor_cp.md)
