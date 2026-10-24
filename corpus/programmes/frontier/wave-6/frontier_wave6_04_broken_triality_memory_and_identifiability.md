# Frontier Wave 6.4: Broken Triality, Memory and Identifiability

**Date:** 24 October 2026  
**Status:** exact waiting-time and local-identifiability result  
**Certificate:** [verify_broken_triality_lumping_memory_and_identifiability.mjs](../../../../verification/verify/verify_broken_triality_lumping_memory_and_identifiability.mjs)

## Result

Weakly breaking the threefold symmetry does not generically appear at first order in the lumped two-state dynamics.

Let the three center--outer rates be

[
k_i=k+delta_i,qquad
delta_1+delta_2+delta_3=0.
]

The total center escape rate remains

[
sum_i k_i=3k.
]

If the detector records an outer state but not which one, its outer waiting-time survival law is

[
S_{m out}(t)
=rac13sum_{i=1}^3e^{-k_it}.
]

This is exponential only when the rates are equal. Expanding about exact triality gives

[
S_{m out}(t)
=e^{-kt}
left[
1+rac{t^2}{6}sum_idelta_i^2
-rac{t^3}{18}sum_idelta_i^3+cdots
ight].
]

The associated hazard

[
h(t)=-rac{d}{dt}log S_{m out}(t)
]

obeys

[
h(0)=k,qquad
h'(0)=-rac13sum_idelta_i^2.
]

The first quotient-visible signature of the broken symmetry is therefore the **variance of the hidden rates**, not the oriented breaking vector.

## Collapsed direction, surviving magnitude

Parameterize the contrast plane by

[
(delta_1,delta_2,delta_3)=(a,b,-a-b).
]

At (a=b=0), the derivative of the unlabeled waiting-time density with respect to either (a) or (b) vanishes for every (t). Hence the ordinary first-order Fisher information of the lumped waiting-time record for the symmetry-breaking direction is zero.

The quotient has killed the tangent direction. At second order it recovers only

[
delta_1^2+delta_2^2+delta_3^2,
]

the radial magnitude in the contrast plane. At third order it can access

[
delta_1^3+delta_2^3+delta_3^3
=3delta_1delta_2delta_3,
]

which is sensitive to the threefold angular structure.

This is the dynamical analogue of invariant theory on a triality doublet: the linear orientation disappears, while quadratic and cubic invariants survive.

## Restoring the lost information

If the outer-state label is retained, the two independent contrast parameters have Fisher matrix

[
mathcal I_{m resolved}
=rac{1}{3k^2}
egin{pmatrix}
2&1\
1&2
end{pmatrix},
]

whose determinant is

[
detmathcal I_{m resolved}=rac{1}{3k^4}>0.
]

Thus the hidden breaking is locally identifiable with resolved records. Two independent detector contrasts, for example

[
(1,-1,0),qquad(1,1,-2),
]

are necessary and sufficient to span the sum-zero outer plane.

## Connection to the collapsed-(Z_3) vacuum result

The pattern now matches [claim 1582](../../../claims/1500-1599/1582_the_electroweak_gauge_quotient_makes_z3_breaking_depend_on_two_doublet_support.md) more closely:

| Vacuum quotient | Dynamical lumping |
|---|---|
| one-doublet phase is gauge-compensated | linear rate contrast is detector-quotiented |
| two-doublet composite detects genuine breaking | two resolved detector contrasts recover the hidden plane |
| (cos3	heta) distinguishes three locked phases | cubic contrast (3delta_1delta_2delta_3) retains threefold angular data |
| wall conclusion requires disconnected physical vacua | memory conclusion requires a non-exponential observable record |

The common principle is that a quotient may destroy the order parameter as a linear observable while retaining nonlinear invariants of the broken orbit.

## Implications

1. **Metastability:** unresolved slow channels make the macro hazard decrease with time as survivors become enriched in the slowest hidden state.
2. **Hysteresis:** a sweep that changes the (delta_i) can show history dependence even when the instantaneous mean rate remains fixed.
3. **Detector design:** optimizing only average relaxation is guaranteed to miss first-order triality breaking.
4. **False symmetry:** an apparently exact two-state Markov fit over short times can hide broken microscopic symmetry.
5. **Invariant hierarchy:** quadratic data measure breaking magnitude; cubic data can encode the residual threefold orientation.

## Closure boundary

The finite stochastic branch is now solved through weak breaking:

- exact folding gives a (3{:}1) channel multiplicity;
- exact lumping deletes two rate-one modes;
- weak breaking first appears as second-order memory;
- resolved labels restore rank-two local information.

What remains is carrier assignment. A physical application must identify:

1. the three microscopic channels;
2. the operation that makes them experimentally indistinguishable;
3. the record that measures waiting-time memory;
4. the two additional faces capable of resolving the contrast plane; and
5. a reason the rates transform under the same triality used in the (D_4/G_2) fold.

Without item 5, this is a universal quotient-dynamics model rather than evidence for exceptional physics.

