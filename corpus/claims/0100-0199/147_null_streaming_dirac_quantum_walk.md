# A Minimal Null-Streaming Dirac Quantum Walk

**Date:** 17 October 2026  
**Branches:** B07, B08, B11 and B13  
**Claim status:** exact (1+1)-dimensional unitary prototype; not a (3+1)-dimensional chiral Standard Model

## 1. Why construct this model

The higher-dimensional direction calculation showed that null links plus scalar averaging are insufficient. The smallest useful next question is therefore:

> Can exact null streaming and a local unitary coin produce a Dirac continuum limit, and what becomes of doubling?

In (1+1) dimensions the answer can be calculated completely.

## 2. Two directional components

Let

\[
\Psi_n=
\begin{pmatrix}
\psi_{R,n}\\
\psi_{L,n}
\end{pmatrix}.
\]

The conditional shift has momentum representation

\[
S(k)=e^{-ik\sigma_z}.
\]

In position space it moves (psi_R) one cell in one direction and (psi_L) one cell in the other. With

\[
\Delta t=\frac ac,
\]

both dependencies lie on exact null links.

Use the on-site mixing coin

\[
C(m)=e^{-im\sigma_x}.
\]

The dimensionless angle (m) becomes (m_{m phys}c^2\Delta t/\hbar) when units are restored.

## 3. Symmetric update

Choose the symmetric time frame

\[
\boxed{
U(k)=C(m/2)S(k)C(m/2).
}
\]

Every factor is unitary, so the evolution is exactly norm preserving. The symmetric placement of the half coins also gives

\[
\sigma_yU(k)\sigma_y=U(k)^\dagger.
\]

This is a precise discrete-time chiral symmetry of the walk. It should not be confused with having already constructed the chiral gauge content of the Standard Model.

## 4. Exact spectrum

Direct multiplication gives

\[
U(k)=
\cos m\cos k,I
-i\left(
\sin m\cos k,\sigma_x
+\sin k,\sigma_z
\right).
\]

Since (det U=1), its eigenvalues are (e^{\mp i\omega}), with

\[
\boxed{
\cos\omega=\cos k\cos m.
}
\]

The exact group velocity obeys

\[
\left|\frac{d\omega}{dk}\right|
=
\left|
\frac{\sin k\cos m}{\sin\omega}
\right|
\le1.
\]

Thus the coin changes internal direction without allowing propagation outside the microscopic light cone.

## 5. Dirac continuum limit

For (|k|,|m|\ll1),

\[
U(k)
=I-i(k\sigma_z+m\sigma_x)
+O(k^2,km,m^2),
\]

and

\[
\omega^2=k^2+m^2+O\bigl((k^2+m^2)^2\bigr).
\]

The effective generator is therefore the (1+1)-dimensional Dirac Hamiltonian

\[
H_{\rm eff}
\simeq
c p\,\sigma_z+m_{m phys}c^2\sigma_x.
\]

This is the first explicit realization in this programme in which “carrier plus local relation” produces a relativistic spinor dispersion rather than a scalar average.

## 6. What happens to doubling

At (m=0),

\[
\omega(k)=|k|
\]

on the principal quasienergy branch near (k=0). But the Brillouin-zone edge (k=\pi) has

\[
\omega=\pi.
\]

Expanding about (k=\pi+q) produces another linear cone, now around quasienergy (pi).

The extra sector is therefore not another zero-energy pole of the same static symbol. Discrete time has moved it to the Floquet-zone edge. It has not made the global ultraviolet sector disappear.

That distinction is important:

- a low-energy theory restricted near quasienergy zero sees one Dirac cone;
- a complete periodically updated microscopic theory also contains the (pi) cone;
- interactions, gauge fields and time-dependent perturbations must be checked for processes that mix the two sectors;
- the usual static-lattice no-go theorem is not literally the same statement, but its physical concerns reappear as quasienergy periodicity and anomaly accounting.

## 7. Topological datum

For (0<m<\pi), the chiral Bloch vector is

\[
(d_x,d_z)
=
(\sin m\cos k,\sin k).
\]

As (k) traverses the Brillouin zone it winds once around the origin. This verifies that the coin does more than add an arbitrary numerical mass: it selects a gapped chiral Floquet phase in the prototype.

No inference to generations, weak isospin or (Spin(2,3)) follows from this winding number alone.

## 8. Relation to the Jordan carrier

The walk has:

- one two-component carrier;
- two propagation faces, right and left;
- local coin-mediated relation between the faces;
- composition by repeated unitary steps.

This is structurally close to the “one carrier, two faces, three relationships” intuition, but it is not yet a Jordan-triple derivation. A genuine bridge would construct a positive two-boundary response from the walk and prove that its admissible response transformations close as (Sp(4,\mathbb R)).

## 9. Stop-everything and falsification gates

**Advance:** construct a (3+1)-dimensional local walk with the observed chiral module, controlled zero- and (pi)-quasienergy sectors, gauge covariance and correct anomaly flow.

**Boundary-response bridge:** integrate out a finite walk region and recover an (H_2(\mathbb R)) response with symplectic sewing, without choosing the real structure by hand.

**Floquet-mirror failure:** the (pi) sector necessarily supplies the mirror matter excluded by the Furey selector.

**Gauge failure:** local gauge coupling destroys exact unitarity, causal locality or anomaly cancellation.

**Demotion:** if the walk merely discretizes an ordinary Dirac field and never constrains the Jordan/Furey portals, retain it only as a regulator model rather than a foundational branch.

## 10. Certificate

The [null-streaming Dirac-walk certificate](../../../verification/verify/verify-null_streaming_dirac_walk.mjs) checks exact unitarity, chiral symmetry, determinant, Bloch-vector reconstruction, the dispersion relation, the velocity bound, the continuum limit, winding and the zero/(\pi) cones.

## Companion documents

- [Higher-dimensional null directions and the isotropy tradeoff](145_higher_dimensional_null_direction_tradeoff.md)
- [The lattice-fermion doubling gate](146_lattice_fermion_doubling_gate.md)
- [Null links and cellular causality](144_null_links_and_cellular_causality.md)
- [Free Dirac chiral OS carrier](121_free_dirac_chiral_os_h2_carrier.md)
