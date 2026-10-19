# Three Relationship Rays Have a Minimal Self-Adjoint Memory Realization but No Adaptive Couplings

**Date:** 19 October 2026  
**Branches:** stress-response realization, matrix Herglotz functions, conservative memory, relationship rays, adaptive dynamics  
**Claim status:** exact finite-dimensional model realization; identification with the Standard-Model stress kernel remains open  
**Certificate:** [build_three_ray_h2_herglotz_conservative_realization.mjs](../../../verification/build/build_three_ray_h2_herglotz_conservative_realization.mjs)

## Executive result

The positive relationship rays used in documents 1141 and 1142 admit an exact finite-dimensional conservative realization.

This is a specialization of the general finite rational positive-response realization theorem already proved in document 666, not a replacement for or independent rediscovery of that theorem. The new content here is the insertion of the specific tensor/vector/scalar ray frame, the exact strict-positivity condition inherited from their pairwise areas, and the audit of whether the resulting internal memory supplies adaptive dynamics.

Let

\[
Q_i=b_ib_i^T\succeq0,
\qquad
w_i>0,
\qquad
m_i\in\mathbb R,
\]

and define

\[
\boxed{
R(z)=\sum_{i=1}^3\frac{w_iQ_i}{m_i-z}.
}
\]

For \(z=x+iy\) with \(y>0\),

\[
\operatorname{Im}R(z)
=\sum_i
\frac{w_i y}{(m_i-x)^2+y^2}Q_i
\succeq0.
\]

If the active \(b_i\) span \(\mathbb R^2\), the imaginary part is positive definite. Thus \(R\) is a matrix Herglotz function with the exact positive relationship rays as its spectral weights.

Let

\[
B=\begin{pmatrix}\sqrt{w_1}b_1&\sqrt{w_2}b_2&\sqrt{w_3}b_3\end{pmatrix},
\qquad
M=\operatorname{diag}(m_1,m_2,m_3).
\]

Then

\[
\boxed{
R(z)=B(M-zI)^{-1}B^T.
}
\]

This is the compression of a self-adjoint three-mode resolvent. It supplies exactly the conservative linear memory requested by the previous frontier.

For distinct poles and nonzero rank-one residues, its pole-preserving realization degree is three: each residue contributes one internal direction.

But the construction also exposes the next obstruction. \(M\) and \(B\) are fixed. The bath remembers earlier input through its state, but its poles, rays and coupling strengths do not change in response to that state. This is memory without adaptation.

\[
\boxed{
\text{conservative memory: derived;}
\qquad
\text{state-dependent couplings: not derived.}
}
\]

## 1. The three-ray rational response

Use the canonical relationship vectors

\[
b_T=\begin{pmatrix}1\\0\end{pmatrix},
\qquad
b_V=\begin{pmatrix}0\\1\end{pmatrix},
\qquad
b_S=\begin{pmatrix}1\\1\end{pmatrix}.
\]

Their Gram rays are the thermal tensor, vector and scalar matrices

\[
Q_T=b_Tb_T^T,
\qquad
Q_V=b_Vb_V^T,
\qquad
Q_S=b_Sb_S^T.
\]

Assign a positive spectral weight \(w_i\) and a real pole \(m_i\) to each channel. The resulting response is

\[
R(z)
=\frac{w_TQ_T}{m_T-z}
+\frac{w_VQ_V}{m_V-z}
+\frac{w_SQ_S}{m_S-z}.
\]

This is not asserted to be the actual Standard-Model stress correlator. It is the minimal rational model retaining all three established positive ray directions.

## 2. Exact Herglotz positivity

For \(z=x+iy\),

\[
\operatorname{Im}\frac1{m_i-z}
=\frac{y}{(m_i-x)^2+y^2}>0
\]

in the upper half-plane. Hence

\[
u^T\operatorname{Im}R(z)u
=\sum_i
\frac{w_i y}{|m_i-z|^2}
(b_i^Tu)^2
\ge0.
\]

Equality for a nonzero \(u\) occurs only if \(u\) is orthogonal to every active \(b_i\). Therefore

\[
\operatorname{Im}R(z)>0
\]

whenever the active ray vectors span the two-face space.

The same Cauchy--Binet identity derived in document 1141 gives

\[
\det\operatorname{Im}R(z)
=\sum_{i<j}
\alpha_i(z)\alpha_j(z)
\det(b_i,b_j)^2,
\]

where

\[
\alpha_i(z)=\frac{w_i\operatorname{Im}z}{|m_i-z|^2}>0.
\]

Thus strict matrix Herglotz positivity is exactly the same pairwise-area condition as positivity of the static third graph.

## 3. Self-adjoint realization

Introduce an internal three-dimensional space with self-adjoint operator

\[
M=\operatorname{diag}(m_T,m_V,m_S)
\]

and coupling

\[
B=
\begin{pmatrix}
\sqrt{w_T}&0&\sqrt{w_S}\\
0&\sqrt{w_V}&\sqrt{w_S}
\end{pmatrix}.
\]

For an observed source \(q\), solve the internal resolvent equation

\[
(M-zI)\xi=B^Tq.
\]

The returned observed response is

\[
r=B\xi
=B(M-zI)^{-1}B^Tq
=R(z)q.
\]

Equivalently, \(R(z)\) is the Schur/Feshbach term produced by eliminating the internal state from a larger self-adjoint block problem.

This is the exact mathematical content of conservative memory here: the compressed response is dispersive because internal degrees of freedom have been retained and then eliminated.

## 4. Minimality for distinct simple poles

At a distinct pole \(m_i\), the Herglotz measure weight is

\[
W_i=w_i b_ib_i^T,
\qquad
\operatorname{rank}W_i=1.
\]

Any pole-preserving finite realization must provide at least \(\operatorname{rank}W_i\) internal dimensions at that pole. Therefore

\[
\dim E
\ge\sum_i\operatorname{rank}W_i=3.
\]

The diagonal realization above has dimension three and saturates the bound.

This minimality is conditional on retaining three distinct simple poles. Coincident poles or algebraically constrained residues may compress the realization, while higher-rank or repeated-pole data may enlarge it.

## 5. Static positive region and the Legendre completion

For real \(x<\min_i m_i\), every denominator is positive:

\[
R(x)=\sum_i\frac{w_i}{m_i-x}Q_i>0
\]

whenever at least two nonparallel rays are active.

In that region, document 1142's Legendre construction applies:

\[
\mathcal S[R(x)]
=\begin{pmatrix}
R(x)&0\\
0&R(x)^{-1}
\end{pmatrix}>0.
\]

Thus the chain is now explicit in a model:

\[
\text{three positive residues}
\longrightarrow
\text{self-adjoint bath}
\longrightarrow
\text{matrix Herglotz response}
\longrightarrow
\text{static positive graph}
\longrightarrow
\text{Legendre-dual symplectic Hessian}.
\]

## 6. Why this is still fixed transport

The internal state \(\xi\) carries memory. In time-domain language, the present output depends on the prior excitation of the bath modes. But the realization data

\[
M,\qquad B
\]

remain constant.

Eliminating a fixed linear bath produces a nonlocal linear kernel. Retaining the bath produces a larger local linear system. Neither operation makes the returned state alter the poles or residues of the next passage.

Adaptive feedback would require, for example,

\[
M\longmapsto M(\xi,q,p),
\qquad
B\longmapsto B(\xi,q,p),
\]

or a nonlinear bath equation whose state changes the effective observed coupling. No such law follows from Herglotz positivity or self-adjoint realization alone.

This separates two notions that were previously close in the narrative:

- **memory:** hidden state affects later output under a fixed law;
- **adaptation:** hidden or observed state changes the later law itself.

The present realization supplies the first and not the second.

## 7. Relation to the Redheffer branch

The Redheffer selector construction is a fixed lossless scattering realization; the present model is a fixed self-adjoint resolvent realization. Both are conservative enlargements of compressed response functions.

They are not yet the same network:

- the selector model has its own pole positions, sideband structure and order-three checkpoint;
- the three-ray model is organized by tensor, vector and scalar stress directions;
- no intertwiner identifies their environment modes or residues.

A successful identification would have to match the full matrix-valued rational function, not only its dimension or positivity.

## 8. Relation to the earlier Feshbach/Jordan theorem

Document 666 already proves that every finite rational matrix Herglotz response with positive residues and positive ultraviolet carrier metric has a finite real symmetric relational-carrier realization. The present construction is its three-residue, two-observed-coordinate specialization without an added ultraviolet slope term.

Document 668 further proves

\[
\{A,G,C\}
=\frac12\left[\Sigma_G(A+C)-\Sigma_G(A)-\Sigma_G(C)\right],
\qquad
\Sigma_G(X)=XGX.
\]

Thus the same Feshbach elimination that creates the three-ray memory kernel also supplies the quadratic map whose polarization is the Jordan triple. This strengthens the algebraic continuity of the programme:

\[
\text{positive ray residues}
\longrightarrow
\text{Feshbach memory}
\longrightarrow
\text{polarized Jordan triple}
\longrightarrow
\mathfrak{sp}_4.
\]

It does not change the dynamical verdict. Polarization extracts cross-response from a fixed quadratic law; it does not make the internal Hamiltonian or coupling matrix state-dependent.

## 9. Stop-everything tests

**Stress-fit trigger:** calculate a controlled Standard-Model thermal or finite-density stress correlator and fit or derive three nonzero rank-one channel residues with the required two-probe orientations.

**Realization trigger:** identify the internal bath modes with physical stress, hydrodynamic or matter excitations and recover \(M\) and \(B\) from the microscopic action.

**Selector-intertwiner trigger:** prove that the selector's conservative dilation and the stress-ray resolvent are two realizations of the same matrix response.

**Adaptive trigger:** derive a nonlinear equation in which bath occupation, stress or returned graph changes \(M\), \(B\) or the next traversal time.

**Linear-memory stop:** do not describe a fixed self-adjoint bath as adaptive merely because its compressed response is frequency-dependent or remembers past input.

## 10. Verdict

| Question | Verdict |
|---|---|
| Do three positive relationship rays admit a causal/Herglotz rational response? | **yes** |
| Does it have a finite self-adjoint realization? | **yes** |
| Is three internal dimensions minimal for three distinct nonzero rank-one poles? | **yes** |
| Can its static positive region seed the Legendre symplectic completion? | **yes** |
| Does the model already equal the Standard-Model stress kernel? | **no** |
| Does its internal state provide memory? | **yes** |
| Does it change its own poles or couplings? | **no** |
| Is endogenous nonlinear feedback derived? | **no** |

The frontier is now narrower:

\[
\boxed{
\text{the missing ingredient is not memory itself; it is backreaction on the realization data.}
}
\]

## 11. Dependencies

- [Legendre-dual response completion](1142_legendre_duality_derives_the_inverse_response_block_but_not_the_physical_clock_or_feedback.md)
- [stress rays building the positive graph](1141_PIN_is_not_a_positive_lagrangian_triple_but_stress_rays_build_the_missing_third_face.md)
- [thermal stress channels](../0200-0299/211_thermal_stress_channels_can_span_full_h2.md)
- [three relationship rays](../0200-0299/272_three_relationship_rays_span_the_two_face_jordan_space.md)
- [general finite rational positive-response realization theorem](../0600-0699/666_every_finite_rational_positive_matrix_response_has_a_finite_relational_carrier_realization.md)
- [Jordan triple as polarized Feshbach self-energy](../0600-0699/668_the_jordan_triple_is_the_polarization_of_feshbach_relational_self_energy.md)
- [global Redheffer/Herglotz realization](../0800-0899/836_the_selector_redheffer_orbit_is_a_lossless_feedback_cascade_with_global_schur_and_positive_residue_control.md)
