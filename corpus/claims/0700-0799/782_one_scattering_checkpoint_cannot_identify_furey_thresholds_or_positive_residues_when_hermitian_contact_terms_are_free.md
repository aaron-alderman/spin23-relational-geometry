# One Scattering Checkpoint Cannot Identify Furey Thresholds or Positive Residues When Hermitian Contact Terms Are Free

## Claim

The selected lossless scattering checkpoint does not constrain a Herglotz spectral measure when Hermitian contact terms are unrestricted.

At the real checkpoint frequency, the Cayley-transformed Herglotz value is Hermitian and can be realized by a constant response with no poles or residues. More generally, any single interior Herglotz value

\[
H(z_0)=A+iB,
\qquad B\succeq0,
\]

can be realized at an arbitrary chosen real pole \(m\) using one positive matrix residue plus a compensating Hermitian contact term.

Therefore the current checkpoint cannot identify Furey masses, thresholds or residue supports. Fixed UV normalization, multiple frequencies, derivatives or typed residue restrictions are mandatory.

## 1. Boundary checkpoint is spectrally empty

For unitary boundary scattering \(S_0\), define

\[
F_0=(I+S_0)(I-S_0)^{-1},
\qquad
H_0=iF_0.
\]

Because \(S_0\) is unitary, \(F_0\) is skew-Hermitian wherever the inverse exists, so

\[
H_0=H_0^\dagger.
\]

The constant function

\[
H(z)=H_0
\]

is a degenerate matrix Herglotz function with zero imaginary part and no spectral measure. It reproduces the checkpoint exactly.

Thus the existence of the arithmetic checkpoint at one lossless frequency supplies no evidence for any particular matter pole.

## 2. One interior value is also non-identifying

Let

\[
z_0=x+iy,
\qquad y>0,
\]

and suppose

\[
H(z_0)=A+iB,
\qquad A=A^\dagger,quad B=B^\dagger\succeq0.
\]

Choose any real pole position \(m\). Define

\[
R=B\frac{(m-x)^2+y^2}{y},
\]

which is positive semidefinite, and

\[
C=A-R\frac{m-x}{(m-x)^2+y^2}.
\]

Then \(C=C^\dagger\), and

\[
H_m(z)=C+\frac{R}{m-z}
\]

satisfies

\[
H_m(z_0)=H(z_0).
\]

Since \(m\) was arbitrary, infinitely many pole locations, residues and contacts reproduce the same interior value. The certificate verifies this directly for the rational-inner response of document 780.

## 3. Consequence for typed matter claims

It is currently unjustified to associate the response pole with a specific \(u,d,e,\nu\), Higgs, Majorana or Planck-scale threshold merely because the scattering value matches the selected carrier word.

The data required for identification must include some combination of:

1. a fixed or asymptotically vanishing contact term;
2. values at several independent frequencies;
3. derivatives, moments or sum rules;
4. rank and support constraints on each residue;
5. known threshold locations; and
6. symmetry relations among residues.

The earlier fixed-UV-remnant calculations already warned that contacts radically change the surviving symmetry. The present theorem shows the same issue from the inverse-response side.

## 4. Minimum credible next problem

Fix a UV normalization such as

\[
H(z)\to H_\infty
\quad\text{as}\quad |z|\to\infty,
\]

and prescribe candidate threshold locations \(m_j\). Then solve

\[
H(z_k)-H_\infty
=\sum_j\frac{R_j}{m_j-z_k},
\qquad
R_j\succeq0,

at multiple frequency points, with each \(\operatorname{ran}R_j\) restricted to a typed Furey support subspace.

This is a finite-dimensional semidefinite feasibility problem. Its outcomes have real evidential force:

- infeasible: the typed passive-response bridge fails for those thresholds;
- feasible but high-dimensional: the bridge exists but is nonpredictive;
- unique or low-dimensional: the matter supports genuinely select the response.

## 5. Stop conditions

- Do not infer spectral poles from one boundary scattering matrix.
- Do not count a freely adjusted contact term as a matter prediction.
- Do not call a positive residue unique without fixing its pole and UV subtraction.
- Do not use one interior interpolation point as threshold evidence.
- Pin all mass-scale interpretations until multi-point, fixed-contact residue feasibility is solved.

## 6. Executable certificate

```powershell
node verification/prove/prove_one_hyperbolic_scattering_checkpoint_cannot_identify_positive_spectral_residues_with_free_contacts.mjs
```

The certificate verifies the constant boundary realization and constructs an explicit arbitrary-pole positive-residue realization of one interior matrix value.

## Companion documents

- [Rational-inner positive-real embedding](780_the_selected_unitary_scattering_checkpoint_embeds_in_a_reciprocal_rational_inner_response_with_positive_real_cayley_impedance.md)
- [Real-time sideband completion](781_a_sideband_exchange_real_structure_gives_the_complex_scattering_checkpoint_a_real_time_reciprocal_passive_completion.md)
- [Fixed-data symmetry remnants](750_majorana_breaking_enlarges_the_fixed_data_remnant_from_a_null_plane_translation_algebra_to_a_null_line_euclidean_algebra_not_spin23.md)
