# A Dynamical Real-Form Selector Has \(\mathbb{RP}^2\) Order Parameter and Two Orientation Modes

**Date:** 17 October 2026  
**Branches:** B01, B04, B05, B06, B07 and B11  
**Claim status:** exact local orbit, Hessian and gauge-spectrum analysis; whether the selector is a physical field, gauge choice or boundary datum remains open

## 1. From algebraic family to order parameter

Each real-type involution of \(H_2(\mathbb C)\) removes one Bloch direction and fixes a copy of \(H_2(\mathbb R)\). If the excluded unit normal is \(n\in S^2\), then \(n\) and \(-n\) define the same reflection plane and the same fixed Jordan algebra.

Therefore the selector space is

\[
\boxed{\mathcal M_{\rm selector}=S^2/(n\sim-n)=\mathbb{RP}^2.}
\]

This is the precise orbit behind the previously informal statement that a “next-rung” symmetry must choose the real \(Spin(2,3)\) form inside the complex \(Spin(2,4)\) carrier.

## 2. Isotropic potential gives two orientation zero modes

Represent the director temporarily by a vector field \(n\in\mathbb R^3\) with identification \(n\sim-n\), and take

\[
V_0(n)=\frac\lambda4(n^2-v^2)^2.
\]

At \(n_0=v\hat z\), the Hessian is

\[
\frac{\partial^2V_0}{\partial n_i\partial n_j}
=2\lambda n_{0i}n_{0j},
\]

with eigenvalues

\[
\boxed{0,\quad0,\quad2\lambda v^2.}
\]

The radial mode is massive and the two tangent directions are Goldstone modes for the local breaking

\[
SO(3)\longrightarrow SO(2).
\]

The discrete director identification changes global topology but not the local Goldstone count.

## 3. Gauged selector

If the selector rotations are gauged, the vector mass matrix is

\[
(M_A^2)_{ij}=g^2(v^2\delta_{ij}-n_{0i}n_{0j}).
\]

Its eigenvalues are

\[
\boxed{g^2v^2,\quad g^2v^2,\quad0.}
\]

Two gauge bosons eat the orientation modes and one local \(SO(2)\) gauge direction remains massless. This is structurally attractive but not yet a Standard-Model identification: the surviving \(SO(2)\) cannot simply be called electromagnetism without matching charges, anomalies and couplings.

## 4. Explicit or induced anisotropy

If the selector is not gauged, a preferred real form can be stabilized by

\[
V_{\rm aniso}=\frac\kappa2(n_x^2+n_y^2),
\qquad \kappa>0.
\]

The Hessian becomes

\[
\boxed{\kappa,\quad\kappa,\quad2\lambda v^2.}
\]

Both orientation modes are gapped. But \(\kappa\) is then the physical source of canonicity. The programme must derive it from stress response, Furey’s conjugations, gauge interactions, boundary conditions or radiative effects rather than insert a preferred axis by notation.

## 5. Global topology and defects

The selector manifold has

\[
\pi_1(\mathbb{RP}^2)=\mathbb Z_2,
\qquad
\pi_2(\mathbb{RP}^2)=\mathbb Z.
\]

If the selector is a genuine field established by symmetry breaking, this permits:

- \(\mathbb Z_2\) line defects associated with a nontrivial loop returning to the opposite representative \(-n\);
- integer point-defect sectors detected on surrounding two-spheres.

This gives a rigorous home for a “loop with one twist” motif, but it does **not** yet identify such a defect with a particle, braid, string or Standard-Model quantum number. Energetics and spacetime embedding must be calculated first.

## 6. Connection to the carrier narrative

The descent can now be stated dynamically:

\[
H_2(\mathbb C)
\xrightarrow{\text{choose }[n]\in\mathbb{RP}^2}
H_2(\mathbb R)_n
\xrightarrow{\mathrm{Conf}}
Sp(4,\mathbb R)\cong Spin_0(2,3).
\]

The two orientation modes are the local cost of choosing which real form is physical. This matches the qualitative “Goldstone modes on the next rung” idea, but now with a definite orbit, spectrum and set of alternatives:

1. global spontaneous selector: two Goldstones;
2. gauged selector: two eaten modes and one massless connection;
3. explicit anisotropy: two pseudo-Goldstones;
4. boundary/source selector: no bulk order-parameter field;
5. gauge redundancy only: no physical selector spectrum.

## 7. Stop-everything and falsification gates

**Stop-everything trigger:** an existing Furey/stress operator transforms as the selector director and its induced potential fixes the physical real form with the required spectrum.

**Defect trigger:** a finite-energy configuration realizes the nontrivial \(\mathbb Z_2\) loop and couples calculably to carrier or flavor observables.

**Goldstone falsifier:** a global isotropic selector is claimed while both tangent modes are absent and no gauging, explicit breaking or boundary restriction is supplied.

**Gauge falsifier:** the surviving \(SO(2)\) is identified with \(U(1)_{\rm em}\) without a charge and anomaly calculation.

**Topology falsifier:** \(\pi_1(\mathbb{RP}^2)=\mathbb Z_2\) is treated as proof of braid statistics or a physical cosmic string without a finite-energy field theory.

## 8. Certificate

The [\(\mathbb{RP}^2\) selector spectrum certificate](scripts/verify_rp2_selector_goldstone_and_gauge_spectrum.mjs) checks the isotropic Hessian, gauged vector masses, anisotropic pseudo-Goldstone masses and the director identification \(n\sim-n\).

## Companion documents

- [Reduced real-form selector and partial-transpose obstruction](296_the_real_form_selector_is_valid_after_reduction_but_not_as_face_only_partial_transpose.md)
- [Independent face/flavor envelope](295_independent_face_and_complex_flavor_close_naturally_on_h6c_not_h12r.md)
- [Metaplectic and Maslov correction branch](59_metaplectic_and_maslov_correction_branch.md)
- [Selector locking-field geometry](79_locking_tensor_orbits_and_selector_geometry.md)
