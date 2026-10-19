# A Finite Domain-Wall Resolvent Is a Schur--Herglotz Two-Face Carrier

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B07, B11 and B13  
**Claim status:** exact finite transverse-chain construction; extension to a 4+1-dimensional gauge-covariant Standard-Model wall remains open

## 1. Purpose

The domain-wall branch needs more than a localized chiral state. It needs a positive causal boundary response that participates in the same Schur/Jordan sewing law as the rest of the programme.

A finite supersymmetric transverse chain provides an exact prototype.

## 2. Discrete kink operator

Let \(Q:\mathbb R^{N+1}\to\mathbb R^N\) act by

\[
(Qf)_j=f_{j+1}-r_jf_j,
\qquad
r_j=e^{-a m_j},
\]

where \(m_j\) changes sign across the center. The kernel equation is

\[
f_{j+1}=r_jf_j.
\]

For negative mass on the left and positive mass on the right, the solution grows toward the wall and decays away from it. Because \(Q\) is rectangular, its kernel has at least one index-protected vector.

Define the Hermitian chiral Hamiltonian

\[
H=
\begin{pmatrix}
0&Q^T\\
Q&0
\end{pmatrix}.
\]

Then \((f,0)^T\) is an exact zero mode, and \(H\) anticommutes with the grading \(\Gamma=\operatorname{diag}(I,-I)\).

## 3. Two wall probes

Choose two real probe vectors supported on neighboring even-sector sites near the kink, and collect them in a projection \(P\). Define the projected resolvent

\[
G(z)=P(H-zI)^{-1}P^T,
\qquad \operatorname{Im}z>0.
\]

Since \(H\) is Hermitian,

\[
\operatorname{Im}(H-zI)^{-1}
=(\operatorname{Im}z)(H-\bar zI)^{-1}(H-zI)^{-1}
\succeq0.
\]

Therefore

\[
\boxed{\operatorname{Im}G(z)\succeq0.}
\]

The wall response is a \(2\times2\) matrix-valued Herglotz function, hence a causal positive two-face carrier.

## 4. Zero-mode residue

Near \(z=0\), the exact wall state contributes

\[
G(z)\sim-\frac{pp^T}{z}+G_{\rm regular}(z),
\qquad
p=Pf.
\]

The residue \(pp^T\) is positive semidefinite and rank one. Thus the chiral wall mode occupies a boundary ray of the Jordan cone, while massive transverse modes add further positive spectral residues and can move the response into the interior.

## 5. Exact Schur representation

Reorder the finite Hilbert space into probe coordinates and interior coordinates. Write

\[
H-zI=
\begin{pmatrix}
A(z)&B\\
B^T&D(z)
\end{pmatrix}.
\]

Block inversion gives

\[
G(z)
=\left[A(z)-BD(z)^{-1}B^T\right]^{-1}.
\]

The inverse boundary Green function is therefore exactly the Schur complement obtained by eliminating the gapped transverse bulk.

This realizes the desired chain:

\[
\text{domain-wall bulk}
\xrightarrow{\text{Schur elimination}}
\text{two-face Herglotz boundary carrier}.
\]

## 6. What the prototype establishes

It establishes simultaneously:

- an index-protected localized mode;
- a two-probe boundary response;
- positive spectral residues;
- upper-half-plane passivity;
- exact Schur-complement provenance;
- compatibility with recursive Jordan sewing.

It does not yet include:

- three physical spatial momenta;
- a Weyl rather than transverse chiral grading;
- Standard-Model gauge representations;
- a finite remote wall and mirror-gapping interaction;
- KMS/thermal structure;
- a derived \(Spin(2,3)\) dynamical action.

## 7. Relation to the real carrier

The prototype Hamiltonian and probes are real, so

\[
G(\bar z)=\overline{G(z)}
\]

and its spectral residues are real symmetric. It therefore lands naturally in the real two-face response class after taking spectral boundary data.

Complex gauge/Yukawa couplings will generally enlarge the parent response to \(H_2(\mathbb C)\); a real reduction must then satisfy the TRO/selector conditions already derived.

## 8. Stop-everything and falsification gates

**4+1 extension:** tensor the transverse chain with a 3+1-dimensional Weyl operator and retain exact locality, gauge covariance and wall spectral positivity.

**Furey loading:** place one anomaly-free Furey generation in the wall zero-mode sector and reproduce its Yukawa cycles.

**Mirror test:** add a finite antikink and demonstrate symmetry-safe suppression or gapping of the remote-wall sector.

**Jordan success:** the physical wall Green function reduces to the same selected \(H_2(\mathbb R)\) carrier and its composition agrees with network Schur sewing.

**Falsifier:** restoring gauge and spinor structure makes the projected spectral density indefinite or destroys the boundary/interior range condition.

## 9. Certificate

The [finite domain-wall Schur response certificate](scripts/verify_finite_domain_wall_schur_response.mjs) constructs the rectangular kink operator, verifies its exact localized zero mode and chiral grading, computes the two-probe complex resolvent, checks Herglotz positivity and verifies the block Schur identity numerically.

## Companion documents

- [Domain-wall localization and inflow](227_domain_wall_relocates_weyl_compensation_into_bulk_inflow.md)
- [One-generation boundary anomaly gate](228_one_standard_model_generation_passes_domain_wall_anomaly_gate.md)
- [KMS--Herglotz Schur sewing](213_fixed_temperature_kms_herglotz_schur_sewing.md)
- [Recursive Schur--Jordan descent](201_recursive_schur_jordan_descent_and_functorial_sewing.md)
