# The affine seam is not the Cartan compensator

**Date:** 24 October 2026  
**Status:** exact carrier and connected-orbit obstruction; marked defect role remains open  
**Evidence:** [machine-readable result](../../../evidence/data/lattice-subroutine-cartan-seam-gate-v1.json)  
**Certificate:** [Cartan seam-gate verifier](../../../verification/verify/verify_lattice_subroutine_cartan_seam_gate.mjs)

## Result

The affine orientation seam is a two-element \(\mathbb F_2\) torsor. It has no continuous tangent directions. A Stelle--West compensator is a normalized vector

\[
V^A V_A=-\ell^2
\]

on the homogeneous orbit

\[
Spin_0(2,3)/Spin_0(1,3).
\]

The parent has dimension ten, the Lorentz stabilizer dimension six, and the compensator orbit dimension four. The independent gravitational connection is additionally an \(\mathfrak{so}(2,3)\)-valued one-form with ten algebra directions.

No continuous equivariant identification can turn the two-point seam carrier into either object. A connected Lie group acts trivially on a finite discrete set unless extra discontinuous structure is introduced.

## The sign subtlety

It is tempting to identify the seam bit with \(V\leftrightarrow -V\). In signature \((-,-,+,+,+)\), however, the two negative directions admit an ordinary \(SO(2)\) rotation. A rotation by \(\pi\) sends

\[
V=(\ell,0,0,0,0)
\quad\longmapsto\quad
-V
\]

along a continuous path inside the orientation-preserving connected group. The two signs are on the same \(Spin_0(2,3)\) orbit.

After gauge fixing, \(V\) defines a Lorentz epsilon tensor in the MacDowell--Mansouri/Stelle--West action. But flipping the gauge-fixed representative without transforming the connection is not a gauge-invariant physical operation. Transforming both is gauge covariance, not a new binary sector.

## What survives

The seam still has a plausible job, just not the one initially hoped for. It can:

- orient a Pfaffian or determinant line;
- mark a spin structure, boundary or defect;
- reduce the allowed modular/gauge transformations to a stabilizer subgroup;
- transform under a disconnected parity/orientation extension;
- supply a discrete sign to a term after the action and continuous fields are independently defined.

It cannot:

- choose a point on the four-dimensional compensator orbit;
- produce the independent connection;
- set \(\ell\), \(M_{\rm Pl}\), the torsion coefficient or other continuous couplings;
- turn the finite theta seam into a propagating graviton.

## Consequence

The direct Cartan route is not reopened by the seam alone. Reopening still requires the input stated by the existing gravity closure: a new complete action or microscopic vacuum. The seam may be one piece of that input—as global orientation, defect or spin-structure data—but it is not its continuous gravitational carrier.

The next useful question is narrower: does a complete microscopic model produce the seam and the compensator **together**, with a term in the action that makes their relation gauge invariant? Without that joint construction, any seam-to-selector identification is a type error.

