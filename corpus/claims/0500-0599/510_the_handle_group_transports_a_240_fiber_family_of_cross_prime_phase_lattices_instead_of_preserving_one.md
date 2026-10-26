# The Handle Group Transports a 240-Fiber Family of Cross-Prime Phase Lattices Instead of Preserving One

**Date:** 17 October 2026  
**Branches:** B01, B04, B07, B09, B10, B12, B13 and B14  
**Claim status:** exact primitive-wedge matrices, congruence-power tests and finite orbit enumeration; physical selection or summation over fibers remains open

## 1. Executive result

The integral handle generators do **not** preserve the single index-six lattice

\[
M=\langle2\rangle\oplus\langle-2\rangle^2\oplus U(-3)
\subset
N=2U\oplus\langle-2\rangle.
\]

Instead, their primitive wedge-square action transports \(M\) through an exact orbit of

\[
\boxed{240=3\times80}
\]

index-six sublattices.

The factors have intrinsic finite-geometric meanings:

- \(3\): the three nonzero covectors of a two-dimensional binary plane;
- \(80\): all nonzero isotropic covectors of the five-dimensional dual quadratic space over \(\mathbb F_3\), equivalently 40 projective null lines with two nonzero orientations.

Thus the correct dynamical object is a finite bundle or groupoid of phase lattices, not one globally fixed phase lattice.

## 2. Membership conditions for the selected fiber

Write a vector of the standard lattice \(N\) in the primitive wedge basis

\[
y=(y_{E_1},y_{F_1},y_{E_2},y_{F_2},y_R).
\]

The cross-prime sublattice \(M\) is characterized by two congruence conditions:

\[
\lambda_2(y)=y_{E_1}+y_{F_1}=0\pmod2,
\]

\[
\lambda_3(y)=y_{F_2}=0\pmod3.
\]

Hence one fiber is specified by the covector pair

\[
\lambda_2=(1,1,0,0,0)\in(\mathbb F_2^5)^*,
\qquad
\lambda_3=(0,0,0,1,0)\in(\mathbb F_3^5)^*.
\]

Their simultaneous kernel has index \(2\cdot3=6\).

## 3. Primitive wedge matrices of the generators

The two trace-three companions, positive mutual shear, forbidden shear and handle swap were transported from \(Sp(4,\mathbb Z)\) to the five-dimensional primitive wedge representation.

Every induced matrix preserves the Gram form

\[
2U\oplus\langle-2\rangle,
\]

but none of the two companions, \(K_+\), or the forbidden shear preserves \(M\). Handle swap preserves the selector line but exchanges the qutrit null directions without respecting the factor-three scaling.

This distinction is decisive:

\[
\boxed{
\text{preserving the ambient }Spin(2,3)\text{ lattice}
\ne
\text{preserving one cross-prime phase fiber}.}
\]

## 4. First stabilizing powers

The congruence calculation modulo six gives:

| generator | first positive power preserving \(M\) |
|---|---:|
| trace-three companion on handle 1 | \(6\) |
| trace-three companion on handle 2 | \(6\) |
| positive \(K_+\) lower shear | \(2\) |
| forbidden lower shear | \(2\) |
| handle swap | \(2\) |

The squares or sixth powers lie in the congruence stabilizer of the selected fiber even though the primitive generators do not.

No nontrivial companion or shear power through twelve preserves the positive selector line. Handle swap preserves that line already at power one, acting by sign.

This makes the two structures independent:

- fiber stabilization is a finite congruence condition;
- selector stabilization is a real orthogonal condition.

## 5. The binary orbit

Under the core generators \(C_1(3),C_2(3),S_{K_+}\), the binary covector has orbit

\[
\{
(1,1,0,0,0),
(1,0,1,1,0),
(0,1,1,1,0)
\}.
\]

These are the three nonzero vectors of the two-dimensional subspace they span. Their sum relation is

\[
(1,1,0,0,0)
+(1,0,1,1,0)
=(0,1,1,1,0)
\pmod2.
\]

This recovers another exact three-point binary geometry. It is structurally compatible with the three nonzero odd-spin directions on one handle, although an identification between these two three-point sets still requires an equivariant map.

## 6. The qutrit orbit

The qutrit covector orbit contains exactly 80 elements. Every one is nonzero and isotropic for the dual quadratic form:

\[
2x_1x_2+2x_3x_4+x_5^2=0\pmod3.
\]

In a nondegenerate five-dimensional quadratic space over \(\mathbb F_3\), the parabolic quadric \(Q(4,3)\) has

\[
(3+1)(3^2+1)=40
\]

projective points. Each projective point has two nonzero representatives, giving exactly

\[
2\cdot40=80
\]

oriented null covectors.

Thus the qutrit factor is not a numerical orbit accident: it is the complete oriented null cone of the dual \(Spin(2,3)\) quadratic carrier modulo three.

## 7. The full orbit

The joint pair orbit has size

\[
3\cdot80=240.
\]

Adding handle swap and the forbidden matched shear does not enlarge it. Therefore the core handle generators already reach the complete product of the binary three-point orbit and the qutrit oriented null cone.

By orbit-stabilizer, the subgroup preserving the selected index-six fiber has index 240 in this finite mod-six action.

The finite bundle can be written schematically as

\[
\mathcal F
\cong
\bigl(\mathbb F_2^2\setminus\{0\}\bigr)
\times
\bigl\{x\in\mathbb F_3^5\setminus\{0\}:Q^*(x)=0\bigr\}.
\]

## 8. Resolution of the phase-module symmetry puzzle

Document 507 found that the automorphism group of one fixed discriminant refinement is only

\[
O(A,q)\cong C_2^3.
\]

That did not contain the full handle dynamics. The present result shows where the missing dynamics went: it moves between 240 different fibers.

Therefore:

\[
\boxed{
\text{fixed-fiber orthogonal symmetry}
\subset
\text{carrier action on the fiber orbit}.}
\]

The correct global structure is a group action on a family of refinements, precisely the situation expected for a Weil representation or metaplectic groupoid.

## 9. Physical interpretations still open

Three interpretations remain mathematically compatible:

1. **Selected fiber:** a Furey/Jordan/stress-energy selector chooses one of the 240 lattices.
2. **Dynamical transport:** physical evolution carries the phase datum between fibers.
3. **Quantum sum:** the anomaly or theta object is a section over the 240-fiber orbit rather than a state in one fiber.

No present evidence chooses among them.

## 10. Stop-everything criteria

The programme should re-root if:

1. the Furey five-field tree selects one binary covector and one qutrit null line canonically;
2. the genus-two theta vector furnishes the 240-dimensional permutation/line bundle implied by this orbit;
3. a stress-energy selector has stabilizer equal to the computed fiber stabilizer;
4. the 240 fibers correspond to an independently known Standard-Model, spin-structure or arithmetic classification.

## 11. Falsification criteria

- A claim that the primitive handle generators preserve the single lattice \(M\) is false.
- The phase lattice must not be treated as the full invariant carrier.
- The number 240 is a finite mod-six orbit size, not a prediction of 240 particles or spacetime cells.
- The binary three-point orbit and odd-spin three-point set must not be identified without an intertwiner.
- The 80 qutrit vectors are oriented representatives of 40 null lines; confusing the two changes the orbit by a factor of two.

## 12. Next calculations

1. Construct the permutation and cocycle representation on the 240 fibers.
2. Compare the 40 qutrit null lines with genus-two characteristics and Lagrangian subspaces.
3. Determine the exact stabilizer order and presentation inside the finite mod-six handle image.
4. Search the Furey tree for a canonical point of the \(3\times80\) fiber space.

## 13. Subsequent 240-trihedra comparison

The [regulus closure programme](../../programmes/regulus-closure-bridge/README.md)
independently reconstructs 240 cubic-surface trihedra with the same typed
factorization

\[
 40\text{ Steiner triads}\times3\text{ Steiner pairs}\times2\text{ trihedra}.
\]

This is not the missing identification. \(PSp_4(3)\) is transitive on those
240 trihedra, whereas its action on the present phase fibers has three
80-element orbits, one for each retained binary decoration. The matching
\(40\times3\times2\) grammar is exact; the permutation representations are
inequivalent.

## Certificate and companions

- [Handle-generator wedge and 240-fiber orbit certificate](../../../verification/analyze/analyze_integral_handle_generators_on_index_six_wedge_lattice.mjs)
- [Primitive wedge-square dictionary](509_the_index_six_spin23_lattice_has_an_explicit_primitive_wedge_square_and_lorentz_selector_dictionary.md)
- [Fixed phase-module orthogonal group](507_the_cross_prime_phase_orthogonal_group_is_only_c2_cubed_and_does_not_contain_the_handle_dynamics.md)

