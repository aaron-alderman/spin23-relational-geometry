# Frontier Wave 7.58: Grassmannian Globalization of the Kenotic Channel

**Date:** 25 October 2026  
**Status:** exact global carrier geometry; physical identification remains open  
**Ledger:** [Grassmannian globalization](grassmannian_channel_globalization_v1.json)  
**Certificate:** [Grassmannian verifier](../../../../verification/verify/verify_grassmannian_channel_globalization.mjs)

## Result

The apparent direction mismatch between the parabolic envelope and the typed
partial-sewing map is the standard pairing of a parabolic with its opposite
big-cell coordinate.

Write

\[
V=\mathbb C^2\oplus\mathbb C^3.
\]

The parabolic stabilizing the reference two-plane
\(A_0=\mathbb C^2\oplus0\) has block form

\[
\mathfrak p_{2,3}=
\left\{
\begin{pmatrix}a&B\\0&d\end{pmatrix}:
\operatorname{tr}a+\operatorname{tr}d=0
\right\},
\]

whose nilradical is

\[
B\in\operatorname{Hom}(\mathbb C^3,\mathbb C^2).
\]

The observed channel has the reverse orientation,

\[
E\in\operatorname{Hom}(\mathbb C^2,\mathbb C^3).
\]

It belongs to the opposite nilradical and parameterizes the big affine cell of

\[
\boxed{\operatorname{Gr}(2,5)=SL_5/P_{2,3}.}
\]

## 1. A channel is the graph of a moving two-plane

Embed \(E\) as

\[
N_E=\begin{pmatrix}0&0\\E&0\end{pmatrix}.
\]

Then \(N_E^2=0\), so

\[
\exp N_E=I+N_E.
\]

Acting on the reference plane gives

\[
(I+N_E)A_0
=\Gamma_E
=\{(v,Ev):v\in\mathbb C^2\}.
\]

Thus the one-way square-zero map is not merely an isolated matrix. It is the
local displacement carrying one two-plane to another inside a compact global
space.

## 2. The two different boundaries

Inside the graph chart, the rank of \(E\) gives incidence strata:

- rank zero: \(\Gamma_E=A_0\);
- rank one: \(\Gamma_E\cap A_0\) is a line;
- rank two: \(\Gamma_E\cap A_0=0\).

The boundary of the graph chart is different. In Pluecker coordinates it is

\[
p_{12}=0,
\]

where projection of the two-plane back to the reference \(\mathbb C^2\) is no
longer invertible. Rank loss of \(E\) happens *inside* the chart; loss of
transversality leaves the chart. These must not be conflated.

The later [multilinear Kakeya gate](../../admissibility/admissibility_146_multilinear_kakeya_transversality_bounds_collective_carrier_concentration.md)
adds an analytic companion to this geometric distinction. A uniform exterior-
determinant bound controls collective concentration of transverse direction
families, whereas its degeneration marks loss of that control. This does not
identify Grassmannian planes with Kakeya tubes; it shows that transversality can
be both a chart condition and a quantitative overlap bound once the carrier and
detector are separately typed.

This gives the filled/unfilled map two precise meanings: determinantal strata
within one observational chart and genuinely missing chart coverage beyond
its transversality boundary.

## 3. Pluecker and metric completion

Represent the graph by the \(5\times2\) frame

\[
M_E=\begin{pmatrix}I_2\\E\end{pmatrix}.
\]

Its ten two-by-two minors satisfy the Grassmann--Pluecker relations. In the
big cell, \(p_{12}=1\), and the remaining six independent coordinates are the
entries of \(E\).

Cauchy--Binet gives

\[
\det(M_E^\dagger M_E)
=\det(I_2+E^\dagger E)
=\sum_{i<j}|p_{ij}|^2.
\]

Consequently

\[
\Phi(E)=\log\det(I_2+E^\dagger E)
\]

is the standard positive chart potential for the Grassmannian metric. It
supplies geometry, not a preferred channel: the homogeneous space remains
transitive until additional data break the symmetry.

## 4. Meaning of parabolic versus opposite direction

Wave 7.50 chose the upper-right radical because it is part of the stabilizer
of the reference plane. Wave 7.52 found the lower-left map because it moves the
reference plane. These are complementary roles:

\[
\text{parabolic radical: internal one-way stabilizer data},
\]

\[
\text{opposite radical: physical displacement coordinate}.
\]

Adjoining both directions and their commutators generates the full
\(\mathfrak{sl}_5\) envelope. Keeping only the opposite direction gives the
affine Grassmannian chart without claiming the entire envelope is physical.

## Implication

The channel now has a global mathematical home. The next question is no
longer how to assemble its six entries, but which metric functional selects a
plane and whether that selection is compatible with the earlier real locking
tensor and the causal Gram-centre construction.

[Wave 7.59](frontier_wave7_59_two_gram_selector_collision.md) answers the
first comparison: the full three-ray determinant and the two-column channel
determinant select different sewings whenever the reference overlap is
nonzero.

## Boundary

The Grassmannian is an exact completion of the carrier geometry. It does not
identify its planes with spacetime, particle generations, Claimipedia stages
or physical vacua. Such identifications remain typed maps requiring evidence.
