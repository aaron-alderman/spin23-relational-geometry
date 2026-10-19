# Free Dirac Osterwalder–Schrader Checkpoint in the \(H_2(\mathbb R)\) Carrier

**Date:** 17 October 2026  
**Branches:** B03, B05, B08 and B11  
**Claim status:** exact free fixed-helicity Euclidean reflection kernel; interacting four-dimensional extension remains open

## 1. Chiral two-face Hamiltonian

For one fixed-helicity momentum sector, choose a real chiral basis in which the free Dirac Hamiltonian is

\[
h(k)=k\sigma_z+m\sigma_x
=
\begin{pmatrix}
k&m\\
m&-k
\end{pmatrix}.
\]

With \(\omega=\sqrt{k^2+m^2}\), one has \(h(k)^2=\omega^2I\). The positive-energy projector is

\[
P_+(k)
=
\frac12\left(I+\frac{h(k)}{\omega}\right)
=
\frac12
\begin{pmatrix}
1+k/\omega&m/\omega\\
m/\omega&1-k/\omega
\end{pmatrix}.
\]

It obeys

\[
P_+^2=P_+,
\qquad
\operatorname{tr}P_+=1,
\qquad
\det P_+=0.
\]

Therefore \(P_+(k)\in H_2(\mathbb R)_+\) and lies on a rank-one boundary ray.

## 2. Physical meaning of the three coordinates

Writing

\[
P_+=
\begin{pmatrix}
t+x&y\\
y&t-x
\end{pmatrix}
\]

gives

\[
t=\frac12,
\qquad
x=\frac{k}{2\omega},
\qquad
y=\frac{m}{2\omega}.
\]

The Lorentz determinant is

\[
t^2-x^2-y^2=0.
\]

The carrier coordinates now have an exact free-fermion interpretation:

- \(t\): total positive spectral weight;
- \(x\): left/right chiral imbalance set by momentum/helicity;
- \(y\): the mass relation coupling the two chiral faces.

At \(m=0\), \(y=0\) and chirality decouples. A nonzero Dirac mass is literally the off-diagonal relational coordinate.

## 3. Reflected Euclidean kernel

For positive Euclidean times \(t_i,t_j\), fermionic reflection reduces in this fixed-helicity sector to

\[
K_{ia,jb}
=
e^{-\omega(t_i+t_j)}
P_+(k)_{ab}.
\]

Since \(P_+=uu^T\) for a normalized real spinor \(u\), define \(q_i=e^{-\omega t_i}\). Then

\[
K=(q\otimes u)(q\otimes u)^T.
\]

Hence

\[
f^\dagger Kf\ge0
\]

for every test vector \(f\). This is the explicit Osterwalder–Schrader Gram factorization for the free sector.

The gamma-matrix reflection has not disappeared; it is what converts the Euclidean Dirac covariance into the positive-energy projector \(P_+\).

## 4. Relation to the dressed carrier

After the Higgs vacuum turns

\[
H^\dagger L\longrightarrow \frac{v}{\sqrt2}e_L,
\]

the dressed faces become the two chiral components of a massive charged lepton. The free reflected kernel therefore realizes the earlier formal response matrix dynamically:

\[
\begin{pmatrix}
\text{left face}&\text{mass relation}\\
\text{mass relation}&\text{right face}
\end{pmatrix}
\in H_2(\mathbb R)_+.
\]

The same rank-one cone geometry appeared independently in scalar-interval boundary residues, general dressed spectral residues and the free Dirac positive-energy projector. This is evidence for a common response category, though not yet a unique \(Spin(2,3)\) prediction.

## 5. Momentum reversal

Under \(k\mapsto-k\), the coordinate \(x\) changes sign while \(t\) and \(y\) remain fixed. The two diagonal chiral weights exchange, whereas the mass relation is unchanged:

\[
P_+(-k)=\sigma_xP_+(k)\sigma_x.
\]

## 6. Scope and remaining gates

The checkpoint does not yet cover:

- simultaneous helicities in four dimensions;
- arbitrary momentum directions with complex Pauli components;
- gauge interactions and Wilson-line dressing;
- wave-function renormalization;
- multiparticle spectral cuts;
- Grassmann contact terms;
- three-generation flavor matrices.

For a generic three-dimensional momentum, individual helicity blocks can still be diagonalized, but choosing a globally real spin basis may introduce Berry/holonomy data. That is a possible connection to the gauge-covariant-real-bundle branch.

## 7. Stop-everything and falsification criteria

**Positive:** the interacting dressed electron kernel retains an \(H_2(\mathbb R)\)-valued positive-energy residue in each helicity channel, with its transport governed by the same symplectic structure as the external carrier.

**Negative:** gauge interactions force irreducible negative face residues or a complex channel that cannot be separated without violating CP or rotational covariance.

**Current status:** full free fixed-helicity fermionic reflection checkpoint passed.

**Unsafe shortcut:** promote a single free helicity projector into a proof for the full interacting Standard Model.

## 8. Certificate

The [free Dirac OS certificate](../../../verification/verify/verify-free-dirac-chiral-os-carrier.mjs) verifies \(h^2=\omega^2I\), projector positivity and idempotence, the Lorentz determinant and the complete positive-time Gram kernel.

## Companion documents

- [Dressed charged-lepton response](118_dressed_charged_lepton_h2_response.md)
- [Dressed chiral spectral positivity](119_dressed_chiral_spectral_positivity.md)
- [Global \(Sp(4,\mathbb R)\)–\(Spin_0(2,3)\) isomorphism](../0000-0099/47_global_group_isomorphism_sp4r_spin023.md)
- [Lorentzian pole residues](../0000-0099/76_lorentzian_pole_residues_and_channel_positivity.md)
- [Helicity Hopf-bundle obstruction](122_helicity_hopf_bundle_real_carrier_obstruction.md)
