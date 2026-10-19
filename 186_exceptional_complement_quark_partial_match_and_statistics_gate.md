# Exceptional Complement: Quark Partial Match and the Statistics Gate

**Date:** 17 October 2026  
**Branches:** B03, B06, B09 and B11  
**Claim status:** exact gauge-representation decomposition and Lorentz-statistics obstruction; scalar/flavon interpretation remains open

## 1. Decompose the complement under the nested flag

The oriented exceptional complement is

\[
Z\in M_3(\mathbb C),
\qquad
Z\mapsto hZg^\dagger,
\]

where \(h\in SU(3)_{\rm color}\) acts on rows and the nested flag restricts

\[
g\in S(U(2)\times U(1))\subset SU(3)
\]

on columns.

Choose the physical hypercharge parameterization

\[
g_Y(\alpha)
=\operatorname{diag}
\left(e^{-i\alpha/6},e^{-i\alpha/6},e^{i\alpha/3}\right).
\]

Then right multiplication by \(g_Y^\dagger\) gives column charges

\[
\left(\frac16,\frac16,-\frac13\right).
\]

Writing

\[
Z=(Q_1\;Q_2\;d),
\]

the two first columns form a weak doublet and the third a weak singlet. Therefore

\[
\boxed{
M_3(\mathbb C)
\downarrow G_{\rm SM}
=
(\mathbf3,\mathbf2)_{1/6}
\oplus
(\mathbf3,\mathbf1)_{-1/3}.
}
\]

The dimensions are \(6+3=9\) complex.

## 2. The match is quark-like but mixed in chirality

The first summand has exactly the gauge quantum numbers of the left-handed quark doublet \(Q_L\). The second has those of the ordinary right-handed down quark \(d_R\).

Furey's all-left one-generation TRO instead contains

\[
Q_L:(\mathbf3,\mathbf2)_{1/6},
\qquad
d_L^c:(\bar{\mathbf3},\mathbf1)_{1/3}.
\]

Thus the exceptional complement packages

\[
Q_L\oplus d_R,
\]

whereas the Furey TRO packages

\[
Q_L\oplus d_L^c.
\]

Complex conjugating all of \(Z\) gives

\[
(\bar{\mathbf3},\mathbf2)_{-1/6}
\oplus
(\bar{\mathbf3},\mathbf1)_{1/3}.
\]

This repairs the down singlet but simultaneously conjugates the quark doublet. No global choice between \(Z\) and \(\bar Z\) reproduces both Furey sectors in one all-left polarization.

This is the same structural issue encountered in the survivor-exchange CAR analysis: particle/antiparticle conjugation cannot be applied selectively to one charged block while remaining an ordinary gauge-equivariant antiunitary on the entire carrier.

## 3. The determinant is gauge invariant

The oriented cubic is

\[
\det Z
=\epsilon_{abc}Q_1^aQ_2^bd^c.
\]

It is a color singlet by \(\epsilon_{abc}\), a weak singlet by the antisymmetric contraction of the two doublet columns, and has total hypercharge

\[
\frac16+\frac16-\frac13=0.
\]

The gauge-invariance result is exact and explains why the determinant survives the nested Standard-Model stabilizer.

## 4. It is not a Standard-Model Yukawa cycle

The down-type Standard-Model Yukawa contains

\[
Q_L,\qquad d_R,\qquad H,
\]

with a colorless Higgs doublet. The determinant instead contains two entries from the \(Q\)-type columns and one \(d\)-type entry:

\[
QQd.
\]

There is no colorless Higgs slot. Hence \(\det Z\) is not the Furey down-type cyclic Yukawa invariant in disguise.

If the complement coordinates are assigned quark baryon number \(1/3\), the determinant carries baryon number one. Its presence as an ordinary scalar coupling would therefore require baryon-number violation or a different interpretation of the complement coordinates.

## 5. Four-dimensional Lorentz-statistics obstruction

If the entries of \(Z\) are fermionic Weyl fields, a cubic product contains three spinors. Three spin-\(1/2\) representations contain no Lorentz scalar:

\[
\frac12\otimes\frac12\otimes\frac12
=\frac32\oplus\frac12\oplus\frac12.
\]

The same conclusion holds for a mixed \(Q_LQ_Ld_R\) assignment: contracting the two left spinors leaves an unpaired right spinor.

Therefore

\[
\boxed{
\det Z\text{ is not a local bosonic Lagrangian term if }Z
\text{ consists directly of ordinary fermion fields.}
}
\]

Possible escapes are:

- \(Z\) is a bosonic flavon or scalar carrier;
- \(Z\) is a fermion bilinear/composite rather than a fundamental fermion;
- the determinant appears in a supersymmetric superpotential, with component interactions treated separately;
- an additional spinor or derivative enlarges the operator to even fermion number;
- the cubic is a state-space orientation invariant, not a local interaction.

Each escape changes the physical meaning of \(Z\).

## 6. Comparison with the Furey cycles

Furey's selected charged cycles use block incidence

\[
H\to O_2\to D\to H
\]

with separate matter and Higgs arrows. They are gauge-invariant internal traces only after the appropriate dagger orientation and Lorentz spinor contraction are supplied.

The exceptional determinant instead uses three columns of one bifundamental complement matrix. The shared “three-slot” structure is not enough to identify the two:

| property | exceptional \(\det Z\) | Furey down cycle |
|---|---|---|
| color content | three triplet slots | \(Q,d^c\) plus colorless Higgs |
| chirality convention | \(Q_L\oplus d_R\) | all-left \(Q_L\oplus d_L^c\) |
| Lorentz scalar if fermionic | no | yes, with Higgs and two spinors |
| antiunitary-odd imaginary part | yes | coefficient-dependent |
| source-derived coefficient | normalization only | Yukawa matrix unfixed |

The relation is therefore a partial representation overlap, not a completed embedding.

## 7. Multiple complement fields proliferate odd cubics

For \(n\) complement fields \(Z_A\), polarization of the determinant gives a symmetric trilinear form

\[
D(Z_A,Z_B,Z_C).
\]

The number of independent species-symmetric cubic coefficients is

\[
\boxed{
\dim\operatorname{Sym}^3(\mathbb C^n)
=\binom{n+2}{3}.
}

Thus the antiunitary-odd cubic space has dimensions

\[
1,4,10,20,\ldots
\]

for \(n=1,2,3,4,\ldots\), before further symmetries are imposed.

This quantifies the multiplicity problem: uniqueness for one complement field disappears rapidly when generations or separate sectors are introduced.

## 8. Branch verdict

**Established:** the exceptional complement contains the quark-like module \(Q_L\oplus d_R\) and a unique single-field gauge-invariant cubic orientation scalar.

**Obstructed:** direct identification with the all-left Furey TRO and direct fermionic use of the cubic in a four-dimensional action.

**Open:** a bosonic/composite complement whose determinant controls orientation and whose couplings generate the Furey Yukawa cycles after integration.

**Pinned:** claims that \(\det Z\) itself is the Standard-Model Yukawa interaction.

## 9. Stop-everything and falsification gates

**Composite success:** a canonical Furey bilinear maps into \(Z\), turns \(\operatorname{Im}\det Z\) into a Lorentz scalar and fixes a physical CP portal.

**Scalar-mediator success:** one selected colored scalar/flavon complement integrates out to the observed Yukawa support without unacceptable baryon violation.

**Polarization success:** the exceptional antiunitary supplies the required particle/antiparticle real structure while retaining one independent chiral generation.

**Statistics failure:** every covariant realization of \(Z\) either violates Lorentz statistics or introduces unobserved light colored scalars.

**Multiplicity failure:** generation structure produces the full \(\binom{n+2}{3}\) coefficient space with no selecting symmetry.

## 10. Certificate

The [exceptional-complement representation certificate](scripts/verify_exceptional_complement_quark_module.mjs) verifies the hypercharge embedding, the \(6+3\) decomposition, determinant gauge neutrality, failure of either global conjugation choice to match \(Q\oplus d^c\), absence of a three-Weyl Lorentz singlet and polarized-determinant multiplicities.

## Companion documents

- [Oriented exceptional cubic odd invariant](185_oriented_exceptional_flag_unique_cubic_odd_invariant.md)
- [Furey anomaly-free TROs](110_furey_anomaly_free_one_generation_tros.md)
- [Furey cyclic Yukawa selection](111_furey_cyclic_yukawa_topology_selection.md)
- [Exchange-fixed CAR obstruction](165_exchange_fixed_car_gauge_equivariance_obstruction.md)
