# Fixed UV and Ward Data Remove the Heisenberg Twist from One Normalized Theory

**Date:** 17 October 2026  
**Branches:** B04, B07, B08, B11 and the normalized-holonomy branch  
**Claim status:** exact intersection and connection consequence; inter-theory holonomy remains open  
**Certificate:** [verify_fixed_uv_collapses_ward_heisenberg_connection_to_abelian_contacts.mjs](../../../verification/verify/verify_fixed_uv_collapses_ward_heisenberg_connection_to_abelian_contacts.mjs)

## Executive result

The Ward-compatible source connection has the non-Abelian structure

\[
\mathbb RD\ltimes\mathfrak h_3(N,V,U),
\qquad
[N,V]=2U.
\]

Fixing a positive ultraviolet slope forces the two noncontact coefficients to vanish:

\[
a=b=0.
\]

The surviving algebra is only

\[
\boxed{
\operatorname{span}\{U,V\},
\qquad
[U,V]=0,
}
\]

the two Abelian contact translations already identified in document 658.

Therefore the Heisenberg curvature term

\[
2b\wedge v
\]

vanishes in a fixed-UV theory. If the subtraction scheme is fixed as well, no continuous source connection remains.

## 1. Connection collapse

Before UV fixing,

\[
\omega=aD+bN+uU+vV
\]

and

\[
\mathcal F_U=du+2a\wedge u+2b\wedge v.
\]

After fixing the positive UV coefficient \(M\),

\[
a=b=0,
\]

so

\[
\boxed{
\omega_{\rm fixed\ UV}=uU+vV,
\qquad
\mathcal F_{\rm fixed\ UV}=du\,U+dv\,V.
}
\]

No commutator contribution survives. Any remaining curvature is purely Abelian contact curvature.

With a fixed subtraction prescription,

\[
u=v=0
\]

as allowed connection directions, and the within-theory source holonomy is trivial.

## 2. Consequence for the loop-and-twist picture

The proposed twist cannot simultaneously be:

- a non-Abelian incidence/\(B-L\) source holonomy;
- inside one theory;
- compatible with fixed continuous \(B-L\);
- compatible with fixed positive UV normalization;
- independent of subtraction scheme.

At least one condition must be relaxed.

The remaining credible locations are:

1. flavor-graph holonomy from noncommuting Yukawa matrices;
2. a duality between theories whose UV tensors transform;
3. a family over Ward/spurion moduli rather than one fixed theory;
4. a Majorana-broken regime where continuous \(B-L\) no longer fixes the row;
5. a boundary/contact observable with an operationally calibrated subtraction.

## 3. Spectral versus contact holonomy

Contact translations alter real local polynomial data but do not by themselves change the absorptive spectral measure. A loop living only in \(U,V\) is therefore not automatically a spectral or scattering effect.

To become physical it must influence:

- a calibrated relative subtraction;
- a boundary phase measurable against a reference;
- a dispersion relation with fixed contact data;
- or an interference observable sensitive to the real response.

Without such an operational bridge, contact holonomy is scheme geometry.

## 4. Cross-branch verdict

This result closes one uncomfortable path:

\[
\boxed{
\text{the normalized two-source Standard-Model response does not retain a non-Abelian Heisenberg twist.}
}
\]

It simultaneously redirects the programme toward the flavor graph, transformed-theory moduli, or \(B-L\)-breaking sectors.

The full \(Sp(4,\mathbb R)\) remains exact as:

- the TKK completion of the carrier;
- the automorphism group of the response domain;
- a spectrum-generating fractional action;
- a possible inter-theory duality group.

It is not recovered as a continuous holonomy group of one fully normalized fixed-current response.

## 5. Stop-everything criteria

Stop claiming a non-Abelian within-theory source twist if:

1. \(B-L\), the UV slope and contacts are all fixed;
2. the only surviving generators are \(U,V\);
3. the claimed curvature uses the removed shear \(N\);
4. contact variation is not operationally measurable;
5. UV or Ward data change around the loop without being included as moduli.

## 6. Next gates

1. Compute flavor-graph curvature from three-generation Yukawa matrices.
2. Classify the enlarged connection after Majorana \(B-L\) breaking.
3. Treat UV and Ward tensors as moduli and compute inter-theory holonomy.
4. Search for a scheme-independent scattering phase associated with calibrated contacts.
5. Keep the fixed-theory symmetry claim reduced to the verified stabilizer.

## Reproducibility

    node scripts\verify_fixed_uv_collapses_ward_heisenberg_connection_to_abelian_contacts.mjs
