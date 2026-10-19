# The Unique \(M_2(\mathbb C)\) Linking Factor Contains the \(H_2(\mathbb R)\) Carrier

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B08 and B11  
**Claim status:** exact algebraic bridge for the fifteen-state matter TRO, with a sharp hypercharge-real-slice obstruction; the unique factor disappears in the ternary-compatible sixteen-state neutrino completion

## 1. A unique simple factor

The linking algebra of either surviving one-generation matter TRO is

\[
\mathcal L(M)
\cong
M_5(\mathbb C)\oplus M_5(\mathbb C)
\oplus M_3(\mathbb C)\oplus M_2(\mathbb C).
\]

There is exactly one \(M_2(\mathbb C)\) simple ideal. It comes from the one-dimensional bipartite component

\[
C\xrightarrow{e^c}E,
\]

whose linking completion has:

- one scalar left face \(E\);
- one scalar right face \(C\);
- the complex relation \(e^c\);
- its dagger reverse.

As a matrix algebra this component is

\[
\begin{pmatrix}
\mathbb C_E&\operatorname{Hom}(C,E)\\
\operatorname{Hom}(E,C)&\mathbb C_C
\end{pmatrix}
\cong M_2(\mathbb C).
\]

The factor is selected abstractly by its unique matrix size; no choice among isomorphic factors is required.

## 2. Hermitian and real-fixed parts

The self-adjoint part is

\[
H_2(\mathbb C)
=
\left\{
\begin{pmatrix}
a&z\\
\bar z&d
\end{pmatrix}
:a,d\in\mathbb R,\ z\in\mathbb C
\right\},
\]

of real dimension four.

Entrywise complex conjugation fixes

\[
H_2(\mathbb R)
=
\left\{
\begin{pmatrix}
a&b\\
b&d
\end{pmatrix}
:a,b,d\in\mathbb R
\right\},
\]

of real dimension three.

Under the Jordan product

\[
A\circ B=\frac12(AB+BA),
\]

this fixed subspace is closed. It is exactly the rank-two Euclidean Jordan algebra used throughout the external carrier programme.

## 3. Positive projection

Define

\[
\mathbb E(A)
=
\frac12(A+\bar A)
=\operatorname{Re}A.
\]

For

\[
A=
\begin{pmatrix}
a&z\\
\bar z&d
\end{pmatrix}\ge0,
\]

positivity gives

\[
a,d\ge0,
\qquad
ad\ge |z|^2.
\]

Since

\[
|z|^2\ge(\operatorname{Re}z)^2,
\]

we have

\[
\mathbb E(A)=
\begin{pmatrix}
a&\operatorname{Re}z\\
\operatorname{Re}z&d
\end{pmatrix}\ge0.
\]

Therefore \(\mathbb E:H_2(\mathbb C)\to H_2(\mathbb R)\) is a positive unital surjection. Unlike the center map, it reaches the complete positive cone because every real positive matrix is already in its domain and fixed by \(\mathbb E\).

## 4. Exact Lorentz cone

Write

\[
t=\frac{a+d}{2},
\qquad
x=\frac{a-d}{2},
\qquad
y=b.
\]

Then

\[
\det
\begin{pmatrix}
a&b\\
b&d
\end{pmatrix}
=
t^2-x^2-y^2.
\]

The positive cone is

\[
t\ge0,
\qquad
t^2\ge x^2+y^2,
\]

the three-dimensional Lorentz cone. Its conformal group is the already established

\[
\operatorname{Conf}(H_2(\mathbb R))
\cong Sp(4,\mathbb R)
\cong Spin_0(2,3).
\]

This gives the exact algebraic chain

\[
\boxed{
\text{anomaly-free Furey matter TRO}
\Longrightarrow
\text{unique }M_2(\mathbb C)\text{ linking ideal}
\xrightarrow{\text{real fixed points}}
H_2(\mathbb R)
\Longrightarrow
Sp(4,\mathbb R)\cong Spin_0(2,3).
}
\]

The middle real-structure arrow is the only nonautomatic step in this chain.

This chain is specific to the fifteen-state branch. Adjoining the unique ternary-compatible neutral arrow \(\nu^c:D\to E\) enlarges the last bipartite component from \((1,1)\) to \((1,2)\), replacing this factor by \(M_3(\mathbb C)\). The completed linking algebra is

\[
M_5(\mathbb C)\oplus M_5(\mathbb C)
\oplus M_3(\mathbb C)\oplus M_3(\mathbb C).
\]

Thus a right-handed-neutrino completion and the simple-factor uniqueness of the internal \(H_2\) bridge cannot both be retained without an additional Peirce or boundary selector. See the [sixteen-state completion and Spin(2,3) tradeoff](167_unique_right_handed_neutrino_tro_completion_and_spin23_tradeoff.md).

## 5. One carrier, two faces, one relation

Inside this factor,

\[
\begin{pmatrix}
a&b\\
b&d
\end{pmatrix},
\]

the diagonal entries are the two face observables attached to \(E\) and \(C\), while \(b\) is their real relation. This realizes the remembered structure

\[
\text{one carrier},\qquad
\text{two faces},\qquad
\text{three Jordan coordinates}.
\]

The larger programme’s “three relationships” language must still distinguish the three independent symmetric entries from three pairwise relations among three objects; here the exact object is the former.

## 6. Hypercharge obstruction

The off-diagonal \(E\leftrightarrow C\) map is the charged-singlet matter representation \(e^c\), with nonzero hypercharge. Under the continuous \(U(1)\) action,

\[
z\longmapsto e^{i\theta}z.
\]

If \(z\) is real, a generic phase makes it complex. The real slice is preserved only for

\[
\theta=0,\pi\pmod{2\pi}.
\]

Thus

\[
\boxed{
H_2(\mathbb R)\subset H_2(\mathbb C)
\text{ is not invariant under the unbroken continuous hypercharge action.}
}
\]

Selecting this real form before electroweak symmetry breaking would reduce that \(U(1)\) action to a \(\mathbb Z_2\) stabilizer. It cannot simply be declared a gauge-invariant external carrier.

## 7. Possible resolutions

The obstruction leaves several distinct paths:

1. **Gauge-covariant real bundle:** the real line in each complex off-diagonal fiber rotates with the gauge frame rather than being a fixed global subspace.
2. **Antiunitary combination:** complex conjugation is accompanied by a gauge transformation or CP operation.
3. **Response rather than matter:** the \(M_2\) factor labels an observable response channel; its real projection is gauge invariant only after forming neutral composites or bilinears.
4. **External duplicate:** an independent gauge-neutral \(M_2(\mathbb C)\) factor is locked to this internal ideal without identifying their charged entries.

A fixed post-Higgs real slice is **not** a solution by itself: \(e^c\) retains electric charge \(+1\), so the surviving photon still rotates its complex line. See the [charged-real-slice no-go](117_charged_real_slice_u1_no_go.md).

Each route has different consequences for chirality, CP and the external/internal portal.

## 8. Programme consequence

This is stronger than a dimensional analogy:

- the \(M_2(\mathbb C)\) ideal is uniquely selected in the matter linking algebra;
- its Hermitian real form is exactly \(H_2(\mathbb R)\);
- its determinant is exactly the Lorentz norm;
- its conformal group is exactly \(Sp(4,\mathbb R)\cong Spin_0(2,3)\).

It is not yet the physical derivation because the natural real slice conflicts with continuous hypercharge before symmetry breaking.

The immediate research question is now extremely sharp:

> Does the Yukawa/bitriplet sector construct a neutral composite response with this same \(H_2(\mathbb R)\) Jordan structure, or force a lock to an external gauge-neutral copy?

## 9. Stop-everything and falsification criteria

**Stop-everything positive:** a neutral dressed observable, gauge-covariant bundle construction or external lock realizes this exact \(H_2(\mathbb R)\) algebra while preserving the photon and maps its Jordan conformal action to the external response carrier.

**Negative:** every gauge-consistent real structure is either basis-arbitrary, removes physical CP phases, or fails to intertwine the matter and external actions.

**Current status:** exact internal \(H_2(\mathbb R)\) occurrence established; pre-Higgs physical selection obstructed.

**Unsafe shortcut:** say that the Standard Model has derived \(Spin(2,3)\) merely because the unique \(M_2(\mathbb C)\) factor contains a real form.

## 10. Certificate

The [unique-\(M_2\) carrier certificate](scripts/verify-linking-m2-real-jordan-carrier.mjs) verifies unique factor size, dimension reduction, positive projection, Jordan closure, Lorentz determinant and failure of generic \(U(1)\) phases to preserve the real slice.

## Companion documents

- [Linking algebras of the surviving matter TROs](112_furey_surviving_tro_linking_algebras.md)
- [Center positive-compression obstruction](115_linking_center_positive_compression_obstruction.md)
- [Exact Jordan triple to \(Sp(4,\mathbb R)\)](42_jordan_triple_to_sp4r_determination.md)
- [Global \(Sp(4,\mathbb R)\)–\(Spin_0(2,3)\) isomorphism](47_global_group_isomorphism_sp4r_spin023.md)
- [Furey weak Jordan ladder](69_furey_weak_jordan_ladder_spin23.md)
- [Charged real-slice \(U(1)\) no-go](117_charged_real_slice_u1_no_go.md)

