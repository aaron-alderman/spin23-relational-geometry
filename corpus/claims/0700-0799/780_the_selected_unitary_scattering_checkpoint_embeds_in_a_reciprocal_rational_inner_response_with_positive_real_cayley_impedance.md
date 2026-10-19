# The Selected Unitary Scattering Checkpoint Embeds in a Reciprocal Rational Inner Response with Positive-Real Cayley Impedance

## Claim

The unitary symmetric scattering matrix \(S_0\) associated with the fully hyperbolic \(Sp(4)\) word can be embedded at a prescribed real frequency \(\omega_0\) in an analytic reciprocal passive response.

Choose the upper-half-plane Blaschke factor

\[
b(z)=\frac{z-i\gamma}{z+i\gamma},
\qquad \gamma>0,
\]

and normalize it at \(\omega_0\):

\[
f(z)=\frac{b(z)}{b(\omega_0)}.
\]

Then

\[
S(z)=f(z)S_0
\]

is analytic and strictly contractive for \(\operatorname{Im}z>0\), unitary on the real axis, symmetric at every frequency, and satisfies

\[
S(\omega_0)=S_0.
\]

Its Cayley transform

\[
F(z)=(I+S(z))(I-S(z))^{-1}
\]

has positive Hermitian part in the upper half-plane. Therefore no generic analyticity, reciprocity or passivity obstruction prevents the selected transfer/scattering checkpoint from lying on a causal response family.

## 1. Why the construction works

The pole of \(b(z)\) lies at \(-i\gamma\), below the physical upper half-plane. For real \(\omega\),

\[
|b(\omega)|=1,
\]

while for \(\operatorname{Im}z>0\),

\[
|b(z)|<1.
\]

The normalization by the boundary phase \(b(\omega_0)\) preserves both properties and makes \(f(\omega_0)=1\).

Since \(S_0\) is unitary,

\[
S(z)^\dagger S(z)=|f(z)|^2I.
\]

Hence the Schur defect is exactly

\[
I-S(z)^\dagger S(z)=\left(1-|f(z)|^2\right)I>0
\]

inside the upper half-plane.

## 2. Positive-real Cayley response

The Hermitian part of the Cayley transform obeys

\[
\frac{F+F^\dagger}{2}
=(I-S^\dagger)^{-1}(I-S^\dagger S)(I-S)^{-1}.
\]

The middle factor is strictly positive in the upper half-plane, so \(F\) is a matrix positive-real function. Multiplying by \(i\), with the corresponding sign convention, gives a matrix Herglotz function.

This supplies the analytic structure missing from the fixed-matrix calculation:

- poles occur outside the physical analytic half-plane;
- boundary scattering is lossless and unitary;
- interior continuation is contractive;
- reciprocity \(S^T=S\) holds identically; and
- the target integral-carrier checkpoint occurs at finite real frequency.

## 3. What this does not derive

The construction is an existence proof, not yet the physical model.

### Free scale

The pole scale \(\gamma\) is arbitrary. Nothing presently relates it to a Standard Model mass, Furey threshold, Planck scale or sewn-handle modulus.

### Scalar dressing

All matrix structure resides in the constant \(S_0\); the frequency dependence is a common scalar all-pass factor. A source-derived response should generally have channel-dependent poles and residues.

### Complex-envelope reality

The construction is valid for analytic complex channel amplitudes. A real time-domain field also requires the negative-frequency relation

\[
S(-\omega)=\overline{S(\omega)}
\]

in an appropriate basis. That constraint has not yet been imposed on the fixed complex checkpoint.

### No matter spectral measure

The positive-real Cayley function has not been decomposed into residues labeled by the typed \(u,d,e,\nu\) or survivor sectors. It therefore does not yet connect the analytic poles to Furey matter.

## 4. Research consequence

The causality branch does not stop at a generic no-go. The next question is more selective:

\[
\boxed{
\text{Can typed Furey thresholds and positive residues produce the same }S_0
\text{ without arbitrary matrix insertion?}
}
\]

This can be attacked by a matrix Nevanlinna/Pick interpolation problem with prescribed residue subspaces and the survivor/propagation real structure.

If no positive residue decomposition respecting the field supports exists, the analytic embedding remains formal and the physical branch is pinned. If one exists with unique or low-dimensional data, it becomes a concrete response derivation of the carrier word.

## 5. Stop-everything and falsification criteria

**Positive trigger:** a finite positive spectral measure built from typed Furey thresholds interpolates \(S_0\) and induces the selected integral transfer matrix.

**Predictive trigger:** the field masses, charges or sewing data determine \(\gamma\) and the residue matrices rather than leaving them as fit parameters.

**Reality falsifier:** no negative-frequency completion preserves reciprocity, gauge typing and the checkpoint simultaneously.

**Residue falsifier:** every interpolation requires an indefinite or negative spectral residue.

**Triviality warning:** a scalar all-pass dressing proves existence but supplies no explanation for the specific arithmetic matrix.

## 6. Executable certificate

```powershell
node verification/embed/embed_selected_unitary_scattering_checkpoint_in_a_reciprocal_rational_inner_positive_real_response.mjs
```

The certificate verifies checkpoint recovery, real-axis unitarity, reciprocity, upper-half-plane contractivity and positivity of the Cayley response at several interior points using the exact rational checkpoint matrix.

## Companion documents

- [Pseudo-unitary transfer and unitary scattering](777_complex_polarization_turns_the_hyperbolic_symplectic_word_into_pseudo_unitary_transfer_and_unitary_scattering_but_the_spatial_real_structure_is_the_gate.md)
- [Furey survivor exchange as spatial flux reversal](778_the_furey_survivor_exchange_has_exactly_the_spatial_flux_reversal_real_structure_but_preserves_the_sewn_meridian_plane.md)
