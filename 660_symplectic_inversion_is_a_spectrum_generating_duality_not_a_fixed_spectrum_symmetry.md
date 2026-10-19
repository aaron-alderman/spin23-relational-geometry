# Symplectic Inversion Is a Spectrum-Generating Duality, Not a Fixed-Spectrum Symmetry

**Date:** 17 October 2026  
**Branches:** B01, B04, B05, B07, B08, B11 and the relational-response duality branch  
**Claim status:** exact rational matrix-Herglotz example; microscopic dual pair remains open  
**Certificate:** [verify_symplectic_inversion_as_spectrum_generating_duality.mjs](scripts/verify_symplectic_inversion_as_spectrum_generating_duality.mjs)

## Executive result

The symplectic Fourier generator acts on the response domain by

\[
F(z)\longmapsto-F(z)^{-1}.
\]

For the scalar-diagonal matrix-Herglotz response

\[
F(z)=z-\frac1z
=z+\frac1{0-z},
\]

the transformed function is

\[
-F(z)^{-1}
=-\frac{z}{z^2-1}
=\frac1{2(-1-z)}+\frac1{2(1-z)}.
\]

Thus

\[
\boxed{
\text{one pole plus a UV slope}
\longrightarrow
\text{two positive spectral poles and no UV slope}.
}
\]

Upper-half-plane positivity is preserved, but poles, zeros and ultraviolet growth change. This is an exact model of \(Sp(4,\mathbb R)\) as a spectrum-generating or inter-theory duality rather than a fixed-spectrum invariance.

## 1. Original spectral data

The original response can be written

\[
F(z)=\frac{z^2-1}{z}.
\]

It has:

- a positive Herglotz atom at \(s=0\);
- linear UV slope one;
- zeros at \(z=\pm1\).

For \(\operatorname{Im}z>0\), both \(z\) and \(-1/z\) have positive imaginary part, hence

\[
\operatorname{Im}F(z)>0.
\]

## 2. Dual spectral data

After inversion,

\[
F_D(z)=\frac{1/2}{-1-z}+\frac{1/2}{1-z}.
\]

It has two positive atoms:

\[
(s_1,R_1)=(-1,1/2),
\qquad
(s_2,R_2)=(1,1/2).
\]

Its UV behavior is

\[
F_D(z)\sim-\frac1z.
\]

The original pole at zero becomes a dual zero; the original zeros become the two dual poles.

The certificate verifies the partial-fraction identity and positive imaginary part at generic complex upper-half-plane points.

## 3. Matrix interpretation

Multiplying both responses by \(I_2\) embeds the example in the genus-two Siegel domain. More general matrix inversion acts on eigenchannels and can mix them when the response matrices do not commute across frequency.

The scalar-diagonal case is sufficient to establish the conceptual point: causal-domain automorphisms need not preserve the spectrum or UV normalization of a particular theory.

## 4. Relation to the stabilizer results

The earlier reductions found:

- fixed generic UV tensors eliminate continuous congruence symmetry;
- relative contacts obstruct a scheme-independent full-point lock;
- fixed \(B-L\) Ward normalization reduces the TKK algebra;
- fixing Ward, UV and contact data leaves no continuous stabilizer.

The inversion example explains what the missing generators still do. They move between different spectral presentations:

\[
\text{poles}\leftrightarrow\text{zeros},
\qquad
\text{UV slope}\leftrightarrow\text{spectral weight}.
\]

They are not empty formal directions; they are simply not symmetries of one fixed response.

## 5. Physical interpretations

The full group could describe:

1. a duality between theories with different elementary/composite assignments;
2. a spectrum-generating algebra relating bound-state and free-state descriptions;
3. a change between impedance-like and admittance-like response variables;
4. a Legendre transform exchanging sources and responses;
5. an ultraviolet/infrared reorganization of spectral data.

Each interpretation needs a microscopic map preserving observables or a declared duality dictionary.

## 6. Stop-everything criteria

Stop calling inversion a symmetry of one spectrum if:

1. physical poles move to zeros;
2. new poles appear at old response zeros;
3. the UV growth class changes;
4. source and response normalizations are not transformed;
5. no duality dictionary identifies observables across the two descriptions.

## 7. Next gates

1. Apply inversion to a noncommuting two-source rational response.
2. Determine whether its new poles retain positive matrix residues.
3. Search for a physical Legendre or boundary-duality operation realizing the transformation.
4. Compare the pole/zero exchange with bound/free-state and Eisenbud–Wigner time-delay language.

## Reproducibility

```powershell
node scripts\verify_symplectic_inversion_as_spectrum_generating_duality.mjs
```
