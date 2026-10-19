# Seesaw Spectral Mixing Moves the Neutral Response into the Interior of \(H_2(\mathbb R)_+\)

**Date:** 17 October 2026  
**Branches:** B02, B04, B06, B08 and B11  
**Claim status:** exact free one-family spectral theorem; interacting and multi-flavor extensions remain open

## 1. From the Fock action to a positive carrier

The raw seesaw mass matrix is not positive and should not be treated as a Jordan response. Positivity reappears in the spectral representation of the two-point function.

For a fixed helicity and a positive physical mass \(m_i\), define

\[
h_i(k)=k\sigma_z+m_i\sigma_x,
\qquad
\omega_i=\sqrt{k^2+m_i^2}.
\]

The positive-energy residue is

\[
P_i(k)
=\frac12\left(I+\frac{h_i(k)}{\omega_i}\right)
=\frac12
\begin{pmatrix}
1+k/\omega_i&m_i/\omega_i\\
m_i/\omega_i&1-k/\omega_i
\end{pmatrix}.
\]

Each \(P_i\) is a real rank-one positive projector:

\[
P_i^2=P_i,
\qquad
\operatorname{tr}P_i=1,
\qquad
\det P_i=0.
\]

Thus every mass eigenmode lies on the boundary of the \(H_2(\mathbb R)\) Lorentz cone.

## 2. Active-neutrino spectral residue

Let the active neutrino be a mixture of light and heavy mass eigenfields. Ignoring an overall wave-function normalization, its positive spectral residue is

\[
R_{\rm act}(k)
=wP_{\rm light}(k)+(1-w)P_{\rm heavy}(k),
\qquad 0\le w\le1.
\]

In the one-family seesaw,

\[
w=\cos^2\theta,
\qquad
1-w=\sin^2\theta,
\]

with

\[
\tan2\theta=\frac{2m_D}{M_R}.
\]

Because the positive cone is convex,

\[
R_{\rm act}(k)\in H_2(\mathbb R)_+.
\]

This is a legitimate observable/spectral Jordan carrier derived from the Fock action.

## 3. Exact determinant formula

Write

\[
P_i=\frac12(I+\mathbf n_i\cdot\boldsymbol\sigma),
\qquad
\mathbf n_i=left(\frac{m_i}{\omega_i},0,\frac{k}{\omega_i}\right),
\qquad
|\mathbf n_i|=1.
\]

Then

\[
R_{\rm act}
=\frac12(I+\mathbf r\cdot\boldsymbol\sigma),
\qquad
\mathbf r=w\mathbf n_l+(1-w)\mathbf n_h.
\]

Its determinant is

\[
\boxed{
\det R_{\rm act}
=\frac{w(1-w)}{2}
\left(1-\mathbf n_l\cdot\mathbf n_h\right).
}
\]

Equivalently,

\[
\det R_{\rm act}
=\frac{w(1-w)}{2}
\left[
1-
\frac{k^2+m_lm_h}
{\sqrt{k^2+m_l^2}\sqrt{k^2+m_h^2}}
\right].
\]

For

\[
0<w<1,
\qquad
k\ne0,
\qquad
m_l\ne m_h,
\]

the determinant is strictly positive. The unresolved active response lies in the **interior** of the Lorentz cone even though each resolved mass pole lies on a boundary ray.

## 4. Meaning of the interior coordinate

For one pole, the normalized Bloch/Lorentz vector has unit length. Mixing shortens it:

\[
|\mathbf r|<1.
\]

The Lorentz determinant therefore measures unresolved relational multiplicity:

\[
\det R_{\rm act}>0
\quad\Longleftrightarrow\quad
\text{more than one distinct positive spectral ray contributes}.
\]

This gives a concrete interpretation to an interior Jordan state. It need not represent fundamental stochasticity or spacetime discreteness; it can arise by coarse-graining over perfectly unitary mass eigenchannels.

## 5. Limiting cases

The response returns to the boundary when:

- \(w=0\) or \(w=1\): no mixing;
- \(m_l=m_h\): the two residues coincide;
- \(k=0\) with both masses represented by the same positive rest-frame projector.

In the seesaw limit \(M_R\gg m_D\), the active heavy weight is small,

\[
1-w\simeq\frac{m_D^2}{M_R^2},
\]

so the determinant is suppressed but nonzero away from rest momentum.

## 6. Reflection positivity

For positive Euclidean times \(t_a,t_b\), each pole contributes

\[
K_i(t_a,t_b)
=e^{-\omega_i(t_a+t_b)}P_i(k).
\]

Each term is a positive Gram kernel. Multiplying by the nonnegative spectral weights \(w_i\) and summing preserves positivity:

\[
K_{\rm act}
=wK_l+(1-w)K_h\ge0.
\]

Thus the mixed interior response passes the free Osterwalder--Schrader test without treating the indefinite Majorana mass matrix as positive.

## 7. Relation to the Schur response

The spectral mixture and charged-channel Schur complement are two different reductions:

- Schur elimination removes an internal variable at the kernel level;
- spectral mixing sums positive pole residues seen by one external field.

They agree in their categorical output—a positive \(H_2\) response—but generally not entry by entry. A full action must show how both reductions arise from the same propagator before they may be identified.

## 8. Multi-flavor warning

For three families, diagonal active-flavor residues still contain nonnegative weights \(|U_{\alpha i}|^2\). Off-diagonal flavor correlators contain

\[
U_{\alpha i}\overline{U_{\beta i}},
\]

and retain Dirac and Majorana phases. The carrier then becomes matrix-valued over flavor space rather than a single real \(H_2\).

A real external face factor can coexist with this complex flavor algebra, but projecting the flavor factor to real matrices would erase physical CP data.

## 9. Stop-everything and falsification gates

**Stop-everything positive:** the full three-family spectral measure factorizes into a real positive two-face response tensored with the observed complex PMNS flavor density, and its determinant or symplectic invariant predicts a neutrino observable.

**Response success:** charged-channel Schur elimination and pole-residue summation are shown to be two factorizations of one causal Green function with identical boundary data.

**Phase failure:** enforcing the external real slice also makes the PMNS spectral density real and removes allowed leptonic CP violation.

**Interaction failure:** gauge or many-particle cuts introduce spectral components that cannot be organized as a positive matrix-valued \(H_2\) measure.

## 10. Certificate

The [seesaw spectral-mixture certificate](scripts/verify_seesaw_spectral_h2_interior.mjs) constructs the exact seesaw masses and mixing weight, verifies both rank-one residues, proves positivity and the determinant formula, confirms strict interiority at nonzero momentum, and builds a positive multi-time Euclidean Gram kernel.

### Later typing clarification

This carrier acts on the fixed-helicity chiral/Nambu propagator index. It is unitarily isomorphic to, but not automatically identical with, the later Furey \(A/B\) topology-face carrier. See [document 638](638_the_seesaw_h2r_carrier_and_the_furey_topology_h2r_carrier_are_isomorphic_but_differently_typed.md). Transferring seesaw interiority to the topology response requires an explicit locking intertwiner.

## Companion documents

- [Neutral Fock action and response separation](171_neutral_fock_action_and_positive_response_separation.md)
- [Free Dirac OS carrier](121_free_dirac_chiral_os_h2_carrier.md)
- [Charged-channel Schur response](169_charged_channel_schur_elimination_to_neutrino_h2_response.md)
- [Real carrier with complex flavor CP](120_real_face_carrier_complex_flavor_cp.md)

