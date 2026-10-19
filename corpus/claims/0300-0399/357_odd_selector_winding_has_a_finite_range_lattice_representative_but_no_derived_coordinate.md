# Odd Selector Winding Has a Finite-Range Lattice Representative, but No Derived Coordinate

**Date:** 17 October 2026  
**Branches:** B01, B02, B03, B04, B05, B06, B08, B09 and B11  
**Claim status:** exact finite-range one-dimensional BdG realization of every monomial selector winding; identification of selector angle with a physical coordinate remains open

## 1. Separate locality from interpretation

The previous cycles established an equivariant winding, a Toeplitz index and a
class-D parity. A possible objection is that the corresponding boundary
operator might be intrinsically nonlocal.

For the canonical representatives, that objection is false. The operator is
finite range. The unresolved question is not mathematical locality but the
physical meaning of the selector parameter.

## 2. Exact Fourier realization

For winding \(m\), take

\[
H_m(k)=\cos(mk)\tau_z+\sin(mk)\tau_y.
\]

Writing \(z=e^{ik}\),

\[
\cos(mk)=\frac{z^m+z^{-m}}2,
\qquad
\sin(mk)=\frac{z^m-z^{-m}}{2i}.
\]

Therefore

\[
H_m(k)=z^m h_m+z^{-m}h_{-m},
\]

with

\[
h_m=\frac12\tau_z-\frac{i}{2}\tau_y,
\qquad
h_{-m}=\frac12\tau_z+\frac{i}{2}\tau_y.
\]

In real space these are couplings only between sites separated by \(|m|\).
Thus

\[
\boxed{\text{winding }m\text{ has a range-}|m|\text{ lattice representative}.}
\]

The minimal three-flavor determinant winding \(w=3\) therefore has a
third-neighbour representative; it does not require a power-law or all-to-all
Hamiltonian.

## 3. The class-D deformation remains local

The BDI-breaking perturbation

\[
\delta H(k)=\lambda\sin k\,\tau_x
\]

has only first harmonics \(z^{\pm1}\). It is a nearest-neighbour term. The full
class-D representative has range

\[
\max(|m|,1)=|m|
\]

for nonzero integer \(m\).

It preserves the gap and exact CAR particle-hole symmetry while breaking the
extra BDI time reversal and chirality. Hence both the parent integer and its
parity descendant admit ordinary finite-range models.

## 4. Antipodal sewing is encoded locally

For odd \(m\),

\[
q_m(k)=e^{imk}
\]

satisfies

\[
q_m(k+\pi)=(-1)^m q_m(k)=-q_m(k).
\]

Thus the selector deck law is represented by odd lattice harmonics. The
three-flavor minimal winding is not obtained by a discontinuous sign function;
it is a smooth, gapped and finite-range Bloch symbol.

## 5. Four possible meanings of the selector angle

The remaining bridge branches into four inequivalent interpretations.

### 5.1 Crystal or quasiparticle momentum

Set selector angle equal to a one-dimensional momentum \(k\). Then the existing
Toeplitz and class-D bulk-boundary theorems apply directly.

The cost is substantial: the programme must identify a physical neutral band,
an actual or emergent lattice direction and a reason the internal Jordan
selector is transported around its Brillouin circle.

### 5.2 Defect azimuth

Interpret selector angle as the polar angle around a codimension-two defect.
Then \(\det M(\theta)\) is a vortex winding. This is geometrically natural for a
mass phase, but the correct operator is a two-dimensional transverse
Dirac/Jackiw--Rossi or Callias problem, not the one-dimensional Toeplitz chain.

The next required theorem would relate its kernel to

\[
w[\det M].
\]

### 5.3 Adiabatic parameter

Treat selector angle as a cyclic control parameter. The winding can classify a
pump or spectral flow. Boundary states then describe an adiabatic family, not
necessarily static particles. A dynamical law must make this parameter cycle
physical.

### 5.4 Frequency or response phase

Identify the circle through compactified frequency or a causal response phase.
This connects naturally to the Hilbert-transform branch, but a frequency-
dependent response is generally not an ordinary Hermitian Bloch Hamiltonian.
Zeros, poles and non-Hermitian winding must be audited before importing the
tenfold classification.

## 6. Decision table

| Candidate coordinate | Existing invariant applies directly? | Missing theorem or structure |
|---|---:|---|
| one-dimensional momentum | yes | derive the neutral band and selector-momentum identification |
| defect azimuth | no, but determinant winding remains relevant | Jackiw--Rossi/Callias index with the actual mass representation |
| adiabatic cycle | partially | spectral-flow or pump construction and physical driving law |
| causal frequency | not directly | analytic Green-function invariant with zeros and poles controlled |

The branches should not be merged by analogy. Each has a different operator
category and different failure modes.

## 7. What has been resolved

The claim

> selector winding can only be represented by a nonlocal operator

is false for the canonical monomial families. Finite-range representatives
exist for all integer windings, and the minimal three-flavor case requires only
range three.

Locality is therefore no longer the first obstruction.

## 8. What remains pinned

No current Jordan, Furey or stress-energy theorem identifies the selector angle
with physical momentum, defect azimuth, adiabatic time or compactified
frequency.

That map cannot be chosen merely because one target interpretation produces an
interesting topological phase. It must arise from the action, boundary
conditions or response kernel.

## 9. Stop-everything and falsification gates

**Momentum trigger:** the Jordan carrier action produces a translation
generator whose compact orbit is the selector circle. The class-D chain then
becomes a physical band model.

**Defect trigger:** the locking or exceptional scalar has an energetically
stable vortex with mass map equal to the selector deck family. The programme
must then switch to the transverse Dirac index.

**Response trigger:** the causal Green function has a quantized point-gap or
zero-frequency invariant equal to the selector winding without crossing a pole
or zero.

**Locality falsifier:** a monomial winding \(e^{imk}\) is described as requiring
infinite-range couplings.

**Category falsifier:** a frequency response or defect angle is treated as a
Bloch momentum without rebuilding the relevant index theorem.

**Interpretation falsifier:** selector angle is simply renamed \(k\) without a
derived translation, defect or pump structure.

## 10. Next branch

The most geometrically credible route is the defect interpretation because a
complex mass phase already lives naturally on a circle around a codimension-two
zero. The next calculation should construct the minimal matrix-valued vortex
and test the hypotheses of a Jackiw--Rossi/Callias index theorem.

In parallel, the causal branch should test whether the two-pole passive response
can realize the same winding without a Green-function zero.

## 11. Certificate

The [finite-range odd-selector BdG certificate](../../../verification/verify/verify_odd_selector_winding_has_finite_range_bdg_representative.mjs) reconstructs the Bloch Hamiltonians exactly from their finite Fourier blocks, verifies range \(|m|\), checks the nearest-neighbour class-D perturbation and confirms antipodal oddness for odd winding.

## Companion documents

- [Furey CAR reality versus flavor CP](356_furey_conjugation_supplies_car_particle_hole_reality_not_an_exact_flavor_cp.md)
- [BDI index to class-D parity](355_the_selector_index_reduces_to_class_d_parity_only_with_a_reality_sewing.md)
- [Exact selector Toeplitz edge index](354_the_selector_determinant_winding_has_an_exact_toeplitz_edge_index.md)
- [Causal exceptional complex structure](351_causal_dispersion_supplies_the_missing_exceptional_complex_structure_nonlocally.md)
