# Vacuum Total Stress Has at Most Two Nonlocal Form-Factor Moments and Cannot Tomograph Four Relational Projector Channels

## Claim status

Exact Lorentz/Ward dimension bound combined with an explicit positive linear-algebra non-identifiability theorem. Medium, boundary and higher-point escapes remain open.

## 1. The new question created by the moment theorem

Document 794 reduced unknown-threshold recovery to projector-resolved moment sequences

\[
\mu_{j,k},
\qquad
j=1,\ldots,4.
\]

Can the total Standard-Model stress tensor supply those four sequences?

In a Lorentz-invariant vacuum, the nonlocal two-point function of a conserved symmetric tensor has the parity-even decomposition

\[
\langle TT\rangle_{\rm nonlocal}
=\rho_2(q^2)P_2(q)+\rho_0(q^2)P_0(q).
\]

There are at most two independent scalar spectral functions: spin two and spin zero. In a traceless conformal limit, only \(\rho_2\) survives.

## 2. Rank bound

Suppose a source map linearly aggregates four relational channel moments into total-stress form-factor moments:

\[
\begin{pmatrix}
\tau_{2,k}\\
\tau_{0,k}
\end{pmatrix}
=A
\begin{pmatrix}
\mu_{1,k}\\
\mu_{2,k}\\
\mu_{3,k}\\
\mu_{4,k}
\end{pmatrix}.
\]

Whatever the detailed entries of \(A\),

\[
\operatorname{rank}A\le2.
\]

Therefore

\[
\dim\ker A\ge2.
\]

At least two independent combinations of relational moments are invisible to the vacuum total-stress two-point function.

In the conformal traceless limit,

\[
\operatorname{rank}A\le1,
\qquad
\dim\ker A\ge3.
\]

## 3. Positivity does not repair the loss

The certificate uses the full-rank example

\[
A=
\begin{pmatrix}
1&1&1&1\\
1&2&3&4
\end{pmatrix}
\]

with null directions

\[
c_1=(1,-2,1,0),
\qquad
c_2=(2,-3,0,1).
\]

Starting from the strictly positive moment vector

\[
\mu=(5,5,5,5),
\]

small additions along either null direction remain positive while producing exactly the same two stress moments.

The invisible deformation can be chosen independently at several moment orders. Consequently an arbitrarily long list of total spin-two/spin-zero moments does not, by itself, recover four projector sequences when the aggregation map stays rank two.

## 4. Why universal gravitational coupling is not tomography

Universal coupling correctly identifies

\[
T_{\mu\nu}^{\rm total}
=-\frac2{\sqrt{-g}}\frac{\delta S}{\delta g^{\mu\nu}}
\]

as the conserved gravitational source. It does not provide four independent internal source labels. Interacting sector stresses exchange energy and are not separately conserved, so simply splitting

\[
T_{\rm total}=T_u+T_d+T_e+T_\nu+\cdots
\]

does not create four independent Ward-protected observables.

The total stress tensor can constrain aggregate scales and enforce Lorentz/Ward consistency. It cannot alone assign four separate threshold measures to the relational projectors.

## 5. Relation to earlier stress results

This theorem strengthens, rather than replaces, three earlier results:

- document 206 found the two vacuum Lorentz projectors;
- document 209 found the one-ray conformal limit;
- document 649 proved that total-stress conservation does not select a topology-face kernel.

The new statement connects those facts directly to the four-channel positive residue and moment programme of documents 792–794.

## 6. Open exits

Four credible exits remain.

### Additional neutral source operators

Gauge-neutral Yukawa Gram composites, conserved currents or scalar operators can provide extra source directions. They need not themselves be gravitational stresses.

### Mixed correlators

A matrix of correlators among total stress and several neutral composite probes may have sufficient source rank after Ward and contact quotients.

### Medium or boundary data

A thermal four-velocity or physical boundary splits stress response into tensor, shear and sound sectors. Document 211 showed that three stress sectors can span a full two-face \(H_2\), though four-projector tomography still requires a rank audit.

### Higher-point response

Three- and higher-point stress correlators possess additional invariant structures. They introduce harder contact, positivity and reconstruction problems and cannot be replaced by the two-point theorem.

## 7. Minimum source-rank criterion

To recover four independent projector moment sequences linearly, the physical probe algebra must yield an observation map of rank four:

\[
\boxed{\operatorname{rank}A_{\rm source}=4.}
\]

Total vacuum stress supplies rank at most two. Any proposed completion must identify the additional source operators and verify their gauge invariance, Ward behavior, contacts and spectral positivity.

## 8. Stop-everything tests

- **Stress-only falsifier:** four channel measures are claimed from only \(\rho_2\) and \(\rho_0\).
- **Sector-stress falsifier:** nonconserved interacting sector stresses are treated as independent gravitational sources.
- **Positive ambiguity test:** two distinct positive projector moment families reproduce all supplied total-stress form factors.
- **Source-rank success:** a named neutral probe set gives a contact-subtracted rank-four moment map.
- **Medium success:** a state-dependent stress decomposition reaches rank four without inserting arbitrary probe labels.

## 9. Executable certificate

    node scripts/prove_vacuum_total_stress_cannot_tomograph_four_relational_projector_moment_sequences.mjs

The certificate computes the rank/nullity bound, constructs distinct positive four-channel moment vectors with identical stress data and extends the invisible deformation across several moment orders.

## Companion documents

- [Conserved-stress spectral quotient](206_conserved_stress_spectral_quotient_to_h2_response.md)
- [Free conformal stress is one Jordan ray](209_free_conformal_field_stress_spectrum_is_one_jordan_ray.md)
- [Thermal stress channels can span \(H_2\)](211_thermal_stress_channels_can_span_full_h2.md)
- [Total stress does not select the face kernel](649_total_stress_conservation_does_not_select_the_topology_face_kernel.md)
- [Positive-threshold moment recovery](794_two_n_moments_generically_recover_n_positive_thresholds_and_weights_per_coherent_channel_while_two_n_minus_one_do_not.md)
