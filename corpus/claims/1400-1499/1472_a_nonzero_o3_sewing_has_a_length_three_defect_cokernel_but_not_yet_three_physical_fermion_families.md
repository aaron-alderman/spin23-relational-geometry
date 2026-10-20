# A nonzero O(3) sewing has a length-three defect cokernel, but not yet three physical fermion families

**Date:** 20 October 2026

**Gate:** A6

**Status:** exact holomorphic defect-localization theorem; physical kernel interpretation open

**Depends on:** [the graded (3\beta) superconnection class](1471_the_a6_graded_module_is_the_virtual_class_three_beta_and_any_odd_sewing_has_three_units_of_defect.md) and [the index-three parent boundary](1450_the_o3_twisted_cp1_operator_has_exactly_three_universal_chiral_zero_modes_but_its_minimal_local_six_dimensional_parent_is_anomalous.md)

**Evidence:** [machine-readable certificate](../../../evidence/data/spin23-o3-sewing-length-three-defect-cokernel.json) and [executable verifier](../../../verification/verify/verify_spin23_o3_sewing_length_three_defect_cokernel.mjs)

## Result

Let (s) be any nonzero holomorphic odd sewing from the spectator line to the selected line,

\[
s:\mathcal O(0)\longrightarrow\mathcal O(3).
\]

It defines an exact sequence of sheaves

\[
\boxed{
0\longrightarrow\mathcal O(0)
\xrightarrow{\;s\;}\mathcal O(3)
\longrightarrow\mathcal O_Z(3)
\longrightarrow0,
}
\]

where (Z=(s=0)) is a zero-dimensional scheme of total length three. Thus the failure of the parent and spectator bundles to annihilate is not merely measured by a global integer: it has an exact defect-cokernel representative carrying three localized algebraic degrees of freedom.

For three simple zeros,

\[
\mathcal O_Z(3)\cong
\mathbb C_{p_1}\oplus\mathbb C_{p_2}\oplus\mathbb C_{p_3}.
\]

This is an exact localization result. It is not yet an identification of those fibers with physical fermion families.

## 1. Global dimension count

On (mathbb{CP}^1),

\[
h^0(\mathcal O(0))=1,
\qquad
h^0(\mathcal O(3))=4,
\qquad
h^1(\mathcal O(0))=0.
\]

Taking global sections of the exact sequence therefore gives

\[
0\longrightarrow\mathbb C
\xrightarrow{\;s\;}\mathbb C^4
\longrightarrow H^0(\mathcal O_Z(3))
\longrightarrow0,
\]

so

\[
\boxed{\dim H^0(\mathcal O_Z(3))=4-1=3.}
\]

In (K)-theory this is precisely

\[
[\mathcal O_Z(3)]
=[\mathcal O(3)]-[\mathcal O(0)]
=3\beta.
\]

The virtual residue in claim 1471 and the length-three defect are therefore the same object in two languages.

## 2. Explicit three-site representative

With homogeneous coordinates ([z_0:z_1]), choose

\[
s(z_0,z_1)=z_0z_1(z_0-z_1).
\]

Its zeros are

\[
[0:1],\qquad[1:0],\qquad[1:1],
\]

all simple. In the cubic basis

\[
(z_0^3,z_0^2z_1,z_0z_1^2,z_1^3),
\]

the section has coefficient vector ((0,1,-1,0)). Multiplication by it maps the one-dimensional (H^0(\mathcal O(0))) to one line in (H^0(\mathcal O(3))), leaving an exact three-dimensional cokernel.

The three units need not occupy distinct points. The possible multiplicity partitions are

\[
3=1+1+1=2+1=3.
\]

Coincident zeros produce a nonreduced length-three defect rather than changing the total count. This supplies a controlled geometric language for separated, partially merged and fully merged family-like configurations.

## 3. What has and has not been derived

The theorem derives:

- one species-independent length-three defect object;
- an explicit three-point representative;
- invariance of total algebraic multiplicity under motion and collision of the points;
- equality of the defect class with the earlier (3\beta) virtual bundle.

It does not derive:

- three admissible four-dimensional fermion zero modes of the coupled physical operator;
- Standard Model representations, chirality beyond the existing index, masses or mixing;
- the location or separation of the points;
- a reason that the auxiliary grading and section are dynamically selected.

Most importantly, the defect length and the twisted Dirac index are not independent counts. Both measure the same degree-three topology.

## 4. Next finite experiment

The explicit cubic removes the ambiguity from the next calculation. Construct the coupled Dirac--superconnection operator with

\[
s=z_0z_1(z_0-z_1)
\]

and compute:

1. kernel and adjoint-kernel dimensions;
2. localization profiles near the three zeros;
3. the first nonzero spectral gap;
4. the induced three-by-three overlap matrix;
5. whether coincident-zero limits create extra light modes.

The physical-family interpretation fails if the defect cokernel does not survive as exactly three admissible chiral modes or if unavoidable additional light states appear.

## 5. Path back to Spin(2,3)

The chain is now

\[
Spin_0(2,3)
\to\mathbb{CP}^1
\to\bigl[\mathcal O(3)-\mathcal O(0)\bigr]
\to\mathcal O_Z(3),
\qquad \operatorname{length}(Z)=3.
\]

The first two arrows come from the selected-projector completion and the conditional graded A6 module. The last arrow is exact once a nonzero sewing section is chosen. Selection of that section and its physical fermion operator remain the missing middle.

## Verdict

\[
\boxed{
\text{three localized algebraic defect fibers: exact},\qquad
\text{three physical fermion families: not yet derived}.}
\]

## Reproduction

~~~powershell
node verification/verify/verify_spin23_o3_sewing_length_three_defect_cokernel.mjs
~~~
