# The Hermitian Exchanged TRO Is State-Phase Blind and Can Transport (Z_2) Only Through a Separately Typed Complex Probe

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B05, B06, B08, B09, B11, B13, B14 and the complex-linearity gate  
**Claim status:** exact slot-linearity theorem for the existing response; physical admission of (Z_2) as a probe remains open  
**Certificate:** [verify_hermitian_exchanged_tro_is_state_phase_blind_but_probe_complex_linear.mjs](scripts/verify_hermitian_exchanged_tro_is_state_phase_blind_but_probe_complex_linear.mjs)

## Executive result

The existing Hermitian Furey response is

\[
R_x^{\rm H}(z)
=xS(x)^\dagger z+zS(x)^\dagger x,

\]

where (S) is the linear neutral-topology exchange.

Its two slots behave differently.

For a phase (|\lambda|=1),

\[
\boxed{
R_{\lambda x}^{\rm H}(z)
=R_x^{\rm H}(z).
}

\]

More generally,

\[
R_{\lambda x}^{\rm H}(z)
=|\lambda|^2R_x^{\rm H}(z).

\]

The repeated state slot is sesquilinear and phase blind.

By contrast,

\[
\boxed{
R_x^{\rm H}(\lambda z)
=\lambda R_x^{\rm H}(z).
}

\]

The probe slot is complex linear before any final Hermitian-observable projection.

Therefore the bare selector cannot remember a complex phase carried only by the repeated matter state (x). It can transport the complex weak-basis scalar (Z_2) only if (Z_2) is inserted through a separately typed complex source/probe slot.

## 1. Exact phase cancellation

Because (S) is complex linear,

\[
S(\lambda x)^\dagger
=\bar\lambda S(x)^\dagger.

\]

Hence

\[
(\lambda x)S(\lambda x)^\dagger
=|\lambda|^2xS(x)^\dagger.

\]

Both Jordan-symmetrized terms acquire the same real factor. For a unit phase it cancels completely.

This phase blindness is not a defect. It is what makes the response Hermitian and positive in the earlier selector calculation. It does mean that Hermitianization loses a phase unless that phase resides in a different typed slot.

## 2. Probe complex linearity

The probe appears once and without an adjoint:

\[
R_x^{\rm H}(z)
=A_xz+zB_x.

\]

Therefore the response is complex linear in (z).

This gives a possible route for the complex Majorana scalar:

\[
z=Z_2z_0.

\]

Then

\[
R_x^{\rm H}(Z_2z_0)
=Z_2R_x^{\rm H}(z_0).

\]

However, this expression is generally a complex operator. A physical Hermitian response must specify how it is paired with its adjoint or decomposed into the normalized (Q_E,Q_I) axes.

That final realification is exactly where the one- versus two-coefficient decision occurs.

## 3. Consequence for (Z_2)

There are now two inequivalent placements:

### (Z_2) encoded in the state construction

If the phase is represented only by (x\mapsto e^{i\phi}x), the Hermitian exchanged-TRO response removes it. This cannot produce the half-phase prediction.

### (Z_2) inserted as a linking-algebra probe

If the completed Nambu linking algebra supplies (Z_2) as an external scalar multiplying (z), the response preserves it complex linearly until the final Hermitian map. The common-coefficient ray is then available but still must be selected.

The second placement is consistent with document 721: (Z_2) is produced only after TRO generation, associative linking multiplication and trace. It is not a coefficient of one primitive Furey state arrow.

## 4. Why the existing selector does not enforce (g_E=g_I)

The complex probe output must eventually be mapped to real Hermitian observables. Both maps

\[
Z_2\longmapsto
g_EE_2Q_E+g_II_2Q_I

\]

and the special complex-linear case (g_E=g_I) are compatible with the slot calculation.

The exchanged-TRO identity therefore permits, but does not force, the canonical complex-linear ray.

An additional requirement is needed:

- preservation of the Furey (u)-complex structure;
- a completely positive complex-linear dilation;
- a source-normalized stress response;
- or a microscopic loop calculation.

## 5. Typed synthesis

The current chain is

\[
\text{Nambu TRO}
\longrightarrow
G_{\ell\nu}
\longrightarrow
Z_2\in\mathbb C
\longrightarrow
\text{complex probe slot}
\longrightarrow
\text{Hermitian response plane}.

\]

Every arrow is now typed. The unresolved step is the final one, not the construction of (Z_2) or the TRO response.

## 6. Stop-everything criteria

Stop claiming that the Hermitian state response transports a common matter phase; it is exactly phase blind.

Stop inserting (Z_2) into the probe slot without declaring that this is additional linking-algebra source data.

Stop inferring (g_E=g_I) merely from probe complex linearity; Hermitian realification can split the coefficients.

Stop the half-phase branch if every physically admissible Hermitian probe map separates (E_2) and (I_2).

## 7. Highest-value next calculations

1. Construct completely positive Hermitian realifications of the complex probe and classify their even/odd coefficients.
2. Test whether preservation of the Clifford conditional expectation forces the canonical isometry.
3. Add the CAR real structure and require compatibility with the complex probe insertion.
4. Determine whether a stress spectral kernel can accept the traced linking scalar as an external source.
5. If no such typed source exists, pin the complex-linear branch and retain only the two-real-coefficient EFT.

## Companion documents

- [CP-equivariant maps and the common-coefficient ray](726_cp_equivariance_allows_two_response_coefficients_while_the_furey_complex_structure_selects_a_canonical_common_coefficient_ray.md)
- [Hermitian exchanged-TRO response](617_the_hermitian_furey_selector_is_a_standard_exchanged_tro_response.md)
- [Nambu TRO compression and linking trace](721_the_majorana_weak_basis_word_is_one_nambu_tro_compression_but_not_an_internal_product_of_the_bare_furey_matter_tro.md)
