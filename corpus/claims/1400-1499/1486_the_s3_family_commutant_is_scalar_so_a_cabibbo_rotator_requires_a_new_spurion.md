# The S3 family commutant is scalar, so a Cabibbo rotator requires a new spurion

**Date:** 20 October 2026

**Gates:** A5 and A6

**Status:** exact representation-theoretic obstruction and minimal symmetry-lowering fork

**Depends on:** [the sector-charge holonomy bound](1485_a_sector_charge_holonomy_repair_requires_at_least_a_twenty_threefold_flux_weight.md)

**Evidence:** [machine-readable representation audit](../../../evidence/data/spin23-s3-doublet-commutant-audit.json) and [executable verifier](../../../verification/verify/verify_spin23_s3_doublet_commutant_audit.mjs)

## Result

The noncentral light-family rotation requested by claims 1484--1485 cannot be
a fixed operator derived from the undecorated three-defect permutation
module.  If (V=A_2) is the real two-dimensional standard representation of
(S_3), then

\[
\boxed{\operatorname{End}_{S_3}(V)=\mathbb R\,I.}
\]

After complexification the statement is unchanged: the commuting complex
endomorphisms are scalar.  Thus any fixed Hermitian operator that rotates or
selects an axis in the light-family doublet imports symmetry-breaking data.

This is a representation obstruction, not a numerical fitting failure.

## Source and operator decompositions

Near the equilateral triangle, common edge scale is irrelevant.  The two
edge-shape perturbations transform as (A_2), while the oriented loop flux
changes sign under an odd permutation and transforms as the sign
representation (arepsilon).  Hence the linear geometric source is

\[
W=A_2\oplus\varepsilon.
\]

The Hermitian operators on the family doublet decompose under conjugation as

\[
\operatorname{Herm}(A_2)
=\mathbf1\oplus A_2\oplus\varepsilon.
\]

The identity is the centroid shift.  The real symmetric traceless operators
form (A_2), and (iJ), with (J) the oriented area form, spans
(arepsilon).  Therefore

\[
\operatorname{Herm}_0(A_2)=A_2\oplus\varepsilon\cong W.
\]

Schur orthogonality gives

\[
\dim\operatorname{Hom}_{S_3}
(W,\operatorname{Herm}_0(A_2))=2,
\]

with one scalar on (A_2) and one scalar on (arepsilon).  The cross maps
(A_2\leftrightarrowarepsilon) vanish.  This is exactly the edge/flux
block scaling exhausted in claims 1484--1485.  It is not a hidden rotation.

## Why orientation alone does not evade the result

The matrix (iJ) commutes with the even three-cycle but changes sign under a
reflection.  It becomes equivariant only when multiplied by an
orientation-odd source such as the loop flux.  That construction is already
the (arepsilon) channel above.  A constant (iJ) instead lowers (S_3)
to (A_3) and splits the democratic doublet even at zero flux.

Likewise, choosing a real symmetric traceless axis lowers (S_3) to the
(S_2) stabilizer of a marked defect.  It supplies a genuine new (A_2)
spurion: one of the three fibers has been distinguished before the mass or
mixing calculation.

The subgroup commutants make the cost explicit:

| retained symmetry | Hermitian commutant on (A_2) | new datum |
|---|---:|---|
| (S_3) | (mathbb R I) | none; no rotator |
| (A_3) | (operatorname{span}_{\mathbb R}\{I,iJ\}) | orientation/chirality |
| a point stabilizer (S_2) | (operatorname{span}_{\mathbb R}\{I,\sigma_z\}) | marked defect/axis |
| trivial subgroup | all Hermitian (2\times2) matrices | arbitrary family basis |

## Higher-order boundary

An analytic equivariant response can contain nonlinear terms, but they do
not generically repair the limiting obstruction.  The linear splitting is
(O(\epsilon)); quadratic covariants are (O(\epsilon^2)) and change its
eigendirection by only (O(\epsilon)).  An order-one Cabibbo rotation in the
hierarchy limit therefore requires one of:

- a new (A_2) or sign spurion;
- a response coefficient singular as (1/\epsilon);
- an exceptional branch on which the entire linear splitting vanishes and
  the hierarchy begins at higher order.

The last option is not excluded here, but it is a separate critical branch
and must reproduce both nonzero mass ratios without coefficient blow-up.

## Path back to Spin(2,3)

The length-three defect sheaf came from the (\mathcal O(3)-\mathcal O(0))
index residue, while the (1\oplus A_2) family module is its permutation
space.  Spin(2,3) acts on the spacetime/Jordan carrier but, in the declared
construction, supplies no map that marks one of these three defect fibers.
Any Spin(2,3)-equivariant operator acting trivially on family labels tensors
the family identity and lies in the scalar commutant.

The next admissible top-down calculation is therefore precise: search the
defect superconnection, Peirce action and boundary-orientation data for an
explicit covariant in (A_2) or (arepsilon), and prove its transformation
law.  The next bottom-up calculation should test the one-coefficient marked
axis or oriented-axis operator while holding one CKM invariant out.  An
arbitrary (2\times2) family matrix is not an admissible middle.  Physical
admission remains false.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_s3_doublet_commutant_audit.mjs
~~~
