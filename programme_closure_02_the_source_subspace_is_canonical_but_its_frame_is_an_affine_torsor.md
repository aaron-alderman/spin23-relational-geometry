# Programme Closure 02: The Source Subspace Is Canonical but Its Frame Is an Affine Torsor

**Date:** 17 October 2026  
**Status:** exact one-generation source-frame classification in the completed \(\nu_R\) branch; renormalized operator mixing remains open  
**Certificate:** [verify_programme_source_frame_affine_torsor.mjs](scripts/verify_programme_source_frame_affine_torsor.mjs)

## Executive result

The earliest open closure gate can be sharpened.

The completed Standard-Model/Furey module supplies two independently motivated source directions:

\[
\lambda=(5,5,1,1,1,0)
\]

from the incidence Laplacian, and

\[
q=3(B-L)=(1,-1,-1,-3,3,3)
\]

from the unique new fully anomaly-free current modulo hypercharge.

Their span is two-dimensional and their multiplicity-weighted Gram determinant is positive. This makes

\[
\boxed{
S_{\rm rel}=\operatorname{span}\{\lambda,q\}
}
\]

a canonical candidate source **subspace** in the declared sixteen-state construction.

But Ward protection fixes only the \(q\) axis. Every source frame

\[
\lambda_{a,b}=a\lambda+bq,
\qquad a\ne0,
\]

has the same nonconservation pattern up to the scale \(a\), spans the same plane with \(q\), and is equally compatible with the protected \(B-L\) direction. The surviving frame freedom is the affine group

\[
\mathbb R^\times\ltimes\mathbb R.
\]

Thus the programme has progressed beyond “arbitrary two ports,” but not to a unique normalized port basis.

## 1. The two source vectors

Use sector order

\[
(Q,u^c,d^c,L,e^c,\nu^c)
\]

and multiplicities

\[
d=(6,3,3,2,1,1).
\]

The weighted inner product is

\[
\langle x,y\rangle_d=\sum_r d_r x_r y_r.
\]

For the declared incidence normalization,

\[
\langle\lambda,\lambda\rangle_d=231,
\qquad
\langle\lambda,q\rangle_d=9,
\qquad
\langle q,q\rangle_d=48.
\]

Hence

\[
G(\lambda,q)=
\begin{pmatrix}
231&9\\
9&48
\end{pmatrix},
\qquad
\det G=11007>0.
\]

The two directions genuinely span an interior \(H_2(\mathbb R)\) Gram point.

## 2. Why \(q\) is distinguished

With \(\nu^c\), \(B-L\) is the unique new current direction modulo already gauged hypercharge satisfying the Yukawa, mixed-gauge, gravitational and cubic anomaly constraints.

The incidence insertion is different. Its Yukawa-violation vector is

\[
V(\lambda)=(10,6,2,1).
\]

Because

\[
V(q)=0,
\]

adding \(bq\) cannot repair or alter that failure:

\[
V(\lambda+bq)=V(\lambda).
\]

Thus one axis is protected and the other is intrinsically an unprotected composite insertion.

## 3. Exact affine frame freedom

Let

\[
\lambda_{a,b}=a\lambda+bq,
\qquad a\ne0.
\]

Then

\[
\operatorname{span}\{\lambda_{a,b},q\}
=\operatorname{span}\{\lambda,q\},
\]

and

\[
V(\lambda_{a,b})=aV(\lambda).
\]

The Gram matrix transforms by the upper-triangular congruence

\[
G_{a,b}
=M_{a,b}GM_{a,b}^T,
\qquad
M_{a,b}=
\begin{pmatrix}a&b\\0&1\end{pmatrix}.
\]

Consequently

\[
\boxed{
\det G_{a,b}=a^2\det G.
}
\]

The shear \(b\) leaves the determinant unchanged. A rescaling \(a\) changes only its units.

This is the finite source-space origin of the upper-triangular Ward-compatible transformations already found in the response algebra.

## 4. UV orthogonalization is available but not absolute

At the free ultraviolet Gram point, one can choose

\[
b_*=-\frac{\langle\lambda,q\rangle_d}
{\langle q,q\rangle_d}
=-\frac3{16}
\]

so that

\[
\lambda_\perp=\lambda-\frac3{16}q
\]

is orthogonal to \(q\). Its squared norm is

\[
\|\lambda_\perp\|_d^2
=\frac{\det G}{\langle q,q\rangle_d}
=\frac{3669}{16}.
\]

This is a canonical frame **relative to the chosen UV metric**. It is not absolute because:

- the incidence operator is not conserved;
- its finite normalization and mixing run;
- a different renormalized positive metric changes the orthogonal complement;
- Majorana mass breaks continuous \(B-L\);
- no operational source coupling has yet selected the UV Gram prescription.

Gram--Schmidt therefore transfers the open problem from basis choice to physical metric/renormalization choice; it does not remove it.

## 5. What is and is not selected

Current evidence supports:

\[
\text{completed matter module}
\longrightarrow
\text{candidate source plane }S_{\rm rel}
\longrightarrow
H_2(\mathbb R)_+\text{ Gram family}.
\]

It does not yet support:

\[
\text{completed matter module}
\longrightarrow
\text{unique calibrated physical port pair}.
\]

The distinction matters because poles and residues transform with the chosen source frame. A determinant or cone statement may be frame covariant while an assigned particle/source label is not.

## 6. Consequence for the closure manifest

Gate G01 should be read precisely as:

- **source subspace:** conditionally canonical in the \(\nu_R\)-completed, unweighted-incidence construction;
- **protected axis:** \(B-L\), before Majorana breaking;
- **second source:** incidence-derived but nonconserved;
- **frame:** an affine torsor under rescaling and \(B-L\) shear;
- **normalization:** deferred to G06;
- **operational coupling:** still missing from G02.

The first unresolved datum is therefore not merely “which two vectors?” It is:

\[
\boxed{
\text{What renormalization condition and physical coupling select one frame in }S_{\rm rel}?
}
\]

## 7. Smallest decisive calculation

Compute the anomalous-dimension and contact-mixing matrix of the incidence insertion and \(B-L\) current in the broken Standard Model with \(\nu_R\), in one declared subtraction scheme.

A closure success would show that:

1. the protected \(B-L\) axis remains fixed;
2. the incidence frame operator renormalizes multiplicatively or has a derived orthogonality condition;
3. the mixed correlator and contact tensor are then predicted rather than chosen.

A generic scale-dependent shear would prove that the source basis is a renormalization convention and that only subspace- or determinant-level observables can be fundamental.

## Stop conditions

Do not call the two-dimensional plane a unique port basis. Do not transfer Ward normalization from \(B-L\) to the incidence insertion. Do not use ultraviolet Gram orthogonality at finite scale without calculating operator mixing.

## Companion documents

- [Gauge-invariant two-face source classification](628_gauge_invariant_two_face_sources_form_five_h2r_multiplets_but_one_redundant_image_is_null.md)
- [Unique anomaly-free current extension](633_the_only_fully_anomaly_free_current_extending_the_lepton_selector_is_b_minus_l_with_nuc.md)
- [Full-rank incidence/\(B-L\) Gram carrier](650_incidence_and_b_minus_l_generate_a_full_rank_relational_current_carrier.md)
- [Incidence-current conservation obstruction](656_the_incidence_current_cannot_be_repaired_into_a_conserved_current.md)
- [Ward-compatible response algebra](657_bl_ward_normalization_reduces_the_generated_sp4_to_a_four_dimensional_solvable_subalgebra.md)
