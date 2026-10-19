# The Twisted σᵧ Marker Fails the Remote-Boundary Test While the Radial Marker Survives

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B05, B06, B08, B09 and B11  
**Claim status:** explicit falsification of the present twisted determinant as a local defect invariant; radial candidate survives a wider locality test

## 1. The required test

A local invariant of the defect must not change when an allowed perturbation is
made only on remote outer rows while the defect-row Hamiltonian is fixed.

The preceding audit left

\[
J_{\rm or}=I\otimes\sigma_y\otimes\sigma_y
\]

as a plausible twisted-coordinate factor. Its small gap under boundary mass
\(b=0.3\) made a wider scan mandatory.

## 2. The twisted sign has two remote-boundary closures

At

\[
(L,M)=(4,2),\quad \delta=1.25,\quad \kappa=0.2,
\]

the twisted reference sign remains \(+1\), but the defect sign follows

\[
-1\ \longrightarrow\ +1\ \longrightarrow\ -1
\]

as the remote edge mass increases. Bisection gives approximate closures at

\[
b_1\approx0.3114,
\qquad
b_2\approx0.6555.
\]

Thus the twisted marker is trivial throughout the finite window

\[
\boxed{0.3114\lesssim b\lesssim0.6555}.
\]

At its midpoint \(b=0.5\), the defect reduced-localizer gap is approximately
\(0.00671\). The trivial sign is therefore stable at that point and is not a
floating-point ambiguity near a zero determinant.

## 3. The radial marker does not follow the edge

For the same Hamiltonians, the radial candidate at center \(r=1/2\) gives

\[
\zeta_{\rm rad}^{\rm ref}=+1,
\qquad
\zeta_{\rm rad}^{\rm def}=-1
\]

for every tested boundary mass from \(b=0.3\) through \(0.8\).

At \(b=0.5\), its reference and defect gaps are approximately

\[
0.2255,
\qquad
0.03547.
\]

The radial defect gap remains more than five times the simultaneously computed
twisted gap and retains the same sign on both sides of the twisted closures.

## 4. Falsification result

The present twisted determinant built from
\(Y(I\otimes\sigma_y\otimes\sigma_y)\) is not a local invariant of the defect.
It changes under a remote symmetry-preserving edge perturbation while the local
defect Hamiltonian is unchanged.

This does not falsify the matrix as an orientation-line representation. It
falsifies the stronger identification

\[
\operatorname{sign}\det B^{\rm twist}
=\text{intrinsic local defect parity}
\]

for the finite construction currently used.

## 5. What the σᵧ pair can still mean

The \(Iyy\) factor remains:

- the only tested kinetic-compatible Pauli factor that distinguishes reference
  and defect at both small and larger circumference;
- exactly real because it pairs two imaginary orientation factors;
- algebraically connected to the neutral Furey \(\sigma_y\) relationship;
- a possible ingredient of the correct skew localizer or orientation-line
  module.

It cannot by itself supply the local topological index. A normalization
Pfaffian, complementary Clifford block, or relative radial construction may be
missing.

## 6. Why the radial marker is stronger but still provisional

The radial marker has now survived:

1. the boundary perturbation that flips the global relative Pfaffian;
2. the boundary-mass interval that flips the twisted marker twice;
3. circumference enlargement from \(L=2\) to \(L=4\);
4. a finite range of localizer scales;
5. explicit nonzero gap checks.

It remains provisional because \(|Y|\) has not yet been proved to represent the
appropriate real Fredholm-module coordinate on the Pin quotient.

## 7. Revised branch ordering

The evidence now orders the candidates as follows:

1. **Radial marker:** strongest numerical local candidate; theorem pending.
2. **Twisted σᵧ factor:** useful representation clue; determinant
   interpretation falsified as local.
3. **Global relative Pfaffian:** valid finite global invariant; local
   interpretation falsified.
4. **Oriented-double signed marker:** theorem-backed but paired to triviality for
   the primitive quotient question.

## 8. Stop-everything and falsification gates

**Stop-everything trigger:** prove that the radial marker is the skew-localizer
pairing on a half-line/orientation local system, including its normalization
factor, and show its gap survives the large-size and regulator limits.

**Twisted falsifier:** continue calling the \(Iyy\) determinant local after its
remote-boundary-induced sign window has been resolved.

**Radial falsifier:** the radial sign changes under a farther boundary scan or
under admissible radial-coordinate homotopies without a localizer-gap closure.

**Representation falsifier:** discard the \(Iyy\) matrix entirely merely because
one determinant formula failed; its module role is a distinct claim.

## 9. Pinned dependency and continuation

Pin the twisted-determinant branch. Continue with:

1. radial-center and \(\kappa\) phase maps with localizer gaps;
2. homotopies from \(|Y|\) to other glide-even radial functions;
3. a half-line or local-coefficient real-index derivation;
4. the independent Furey/deck interpretation of the \(Iyy\) factor.

## 10. Certificate

The [remote-boundary comparison certificate](scripts/verify_twisted_marker_fails_remote_boundary_test_while_radial_survives.mjs)
checks the twisted sign window, its resolved midpoint gap, and survival of the
radial signs and gap over the same boundary samples.

## Companion documents

- [Orientation-line Pauli audit](397_the_orientation_line_pauli_audit_selects_a_relational_sigma_y_pair_but_its_twisted_gap_is_fragile.md)
- [Radial Pin localizer candidate](396_the_signed_class_d_localizer_does_not_descend_but_a_radial_pin_localizer_survives_the_boundary_test.md)
- [Remote edge-mass locality test](395_a_remote_edge_mass_moves_the_reference_root_fourteen_times_more_than_the_defect_root.md)
