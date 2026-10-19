# Helicity, the Hopf Bundle, and the Global Real-Carrier Obstruction

**Date:** 17 October 2026  
**Branches:** B03, B08 and B09  
**Claim status:** exact one-particle topological theorem, with the carrier-level interpretation corrected by [the phase-descent analysis](123_hopf_phase_descent_and_carrier_correction.md)

> **Correction.** The Hopf class obstructs a global helicity eigenvector. It does not obstruct the globally defined helicity projector, and its common patch phase cancels from the free chiral \(H_2(\mathbb R)\) partial trace. Statements below that the response carrier itself must be twisted are retained as the motivating hypothesis but superseded by Document 123.

## 1. Local success versus global momentum space

For each fixed momentum direction, the positive-helicity Dirac/Weyl sector admits a local real chiral projector in \(H_2(\mathbb R)\). The remaining question is whether the helicity eigenvector can be chosen smoothly and real over the entire momentum sphere

\[
S^2_{\hat{\mathbf p}}.
\]

It cannot.

## 2. North and south helicity frames

For the \(+1\) eigenspace of

\[
\hat{\mathbf p}\cdot\boldsymbol\sigma,
\]

use spherical coordinates \((\theta,\phi)\). A north-patch eigenvector is

\[
u_N=
\begin{pmatrix}
\cos(\theta/2)\\
e^{i\phi}\sin(\theta/2)
\end{pmatrix},
\]

while a south-patch eigenvector is

\[
u_S=
\begin{pmatrix}
e^{-i\phi}\cos(\theta/2)\\
\sin(\theta/2)
\end{pmatrix}.
\]

On their overlap,

\[
\boxed{u_N=e^{i\phi}u_S.}
\]

The transition function winds once around \(U(1)\).

## 3. Berry connection and Chern number

With the convention

\[
A=-iu^\dagger du,
\]

the patch connections are

\[
A_N=\frac{1-\cos\theta}{2}\,d\phi,
\]

\[
A_S=-\frac{1+\cos\theta}{2}\,d\phi.
\]

Their difference is

\[
A_N-A_S=d\phi,
\]

as required by the transition \(e^{i\phi}\).

The curvature is

\[
F=dA=\frac12\sin\theta\,d\theta\wedge d\phi.
\]

Therefore

\[
c_1
=
\frac1{2\pi}\int_{S^2}F
=1.
\]

This is the Hopf line bundle

\[
S^3\longrightarrow S^2.
\]

## 4. No global real helicity line

A complex line bundle that admits a global reduction to a real one-dimensional subbundle over \(S^2\) must have vanishing first Chern class. Here

\[
c_1=1.
\]

Hence:

\[
\boxed{
\text{no globally smooth real positive-helicity basis exists over momentum directions}.
}
\]

The local helicity eigenvector must rotate between patches. Whether a derived \(H_2(\mathbb R)\) carrier inherits that rotation depends on its transformation law. For the free phase-neutral chiral density, the phase cancels and the carrier is globally real; see Document 123.

## 5. The one-twist holonomy

On the equator,

\[
A_N=\frac12\,d\phi.
\]

The Berry phase around one full circuit is

\[
\oint A_N=\pi,
\]

with holonomy

\[
e^{i\pi}=-1.
\]

This is the spinorial sign acquired by one circuit. It gives a precise realization of a “one twist” associated with the Hopf carrier.

It does not yet establish a physical three-strand braid or a Monster/Moonshine connection. It supplies a concrete topological datum that any such branch must reproduce rather than merely resemble.

## 6. Pairing helicities

Negative helicity has

\[
c_1=-1.
\]

For the full Dirac pair,

\[
c_1^{(+)}+c_1^{(-)}=0.
\]

The two-helicity rank-two complex bundle is therefore topologically trivial as a total bundle. A global Dirac spin frame can exist even though neither helicity line is separately trivial.

This creates a structural choice:

1. retain one helicity and treat the carrier as a nontrivial \(U(1)\)-twisted bundle;
2. combine both helicities into a globally trivial but larger carrier;
3. use local \(H_2(\mathbb R)\) fibers connected by Berry/symplectic transport.

The first option preserves chirality but requires holonomy. The second simplifies global reality but risks reintroducing mirror-like doubling if interpreted carelessly.

## 7. Relation to mass

The massive fixed-helicity projector still uses the same directional helicity eigenvectors. Mass supplies the local left/right relation

\[
y=\frac{m}{2\omega}
\]

but does not change the Chern class of the chosen helicity line.

Thus:

- mass repairs local chiral coupling;
- it does not trivialize the global helicity bundle;
- only combining opposite Chern sectors cancels the obstruction.

## 8. Relation to the external carrier

The external response programme treats the \(H_2(\mathbb R)\) carrier as one fixed real vector space. The helicity result initially suggested the refined object

\[
\mathcal J\longrightarrow S^2_{\hat{\mathbf p}},
\]

a bundle of local \(H_2(\mathbb R)\) response fibers with transition data inherited from the Hopf connection. The free factorized response does **not** require this refinement: its common Berry phase disappears after forming the density and tracing spin. A twisted carrier remains an interacting possibility only if transport acts nontrivially on face space.

The relevant global consistency questions become:

- does Jordan triple transport intertwine the Berry connection?
- is the induced transport symplectic in the \(Sp(4,\mathbb R)\) completion?
- does the \(-1\) equatorial holonomy match the metaplectic parity already found in the braid branch?
- can both helicities cancel topology without erasing chiral matter selection?

## 9. Stop-everything and falsification criteria

**Positive:** the Hopf/Berry transition of the dressed chiral carrier lifts canonically to the external \(Sp(4,\mathbb R)\) transport and reproduces its metaplectic sign or Maslov parity.

**Negative:** no gauge- and Lorentz-compatible bundle action preserves the local Jordan cone, or global consistency requires restoring unwanted mirror matter.

**Current status:** a global helicity eigenvector is topologically impossible; the phase-neutral free chiral \(H_2(\mathbb R)\) response nevertheless descends globally.

**Unsafe shortcut:** infer either a twisted or a trivial interacting carrier from the state-line Chern class without computing how the actual response observable transforms.

## 10. Certificate

The [helicity Hopf certificate](scripts/verify-helicity-hopf-real-bundle-obstruction.mjs) checks north/south transition functions, Berry connections, curvature integral, Chern number, equatorial \(-1\) holonomy and opposite-helicity cancellation.

## Companion documents

- [Free Dirac chiral OS carrier](121_free_dirac_chiral_os_h2_carrier.md)
- [Three-strand braid central twist](57_braid_central_twist_to_sp4z_branch.md)
- [Metaplectic lift and Maslov correction](59_metaplectic_and_maslov_correction_branch.md)
- [Canonical real-structure model](65_canonical_real_structure_commutant_model.md)

