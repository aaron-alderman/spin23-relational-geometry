# The triangle is physical only after its coordinate system is declared

**Date:** 25 October 2026

**Status:** basis-covariance boundary closed; signed ALP dictionary open

**Topics:** OT-047, OT-048

**Parent:** [AZ-074 one-family triangle](admissibility_74_one_family_triangle_and_global_positivity_gate.md)

**Evidence:** [basis-covariance ledger](../../../evidence/data/three-source-basis-covariance-gate-v1.json)

**Generator:** [congruence calculation](../../../scripts/run-three-source-basis-covariance-gate.mjs)

**Verifier:** [basis-boundary certificate](../../../verification/admissibility/verify_three_source_basis_covariance_gate.mjs)

## Result

AZ-074's cycle sign has a narrower authority than its determinant. Independent reversals of the three named nodes preserve the product of the three edge signs. A general effective-field-theory basis change can mix those nodes, however, and need not preserve that product or even the same edge-zero pattern.

For coefficients related by \(c_{\rm old}=M c_{\rm new}\), the response transforms by

\[
F_{\rm new}=M^T F_{\rm old}M.
\]

The executable witness applies the unit-determinant shear

\[
M=\begin{pmatrix}1&1/2&0\\0&1&0\\0&0&1\end{pmatrix}
\]

to AZ-074's positive kernel. Its determinant remains 288 and positivity is preserved, while the three-edge sign product changes from positive to negative. Thus rank, inertia and determinant sign are coordinate-covariant physical tests; the edge signs become interpretable only after the operator basis is frozen.

## Why the ALP case requires this firewall

The source-native fermion calculation defines \(c_t=-c_Q+c_u\) and \(c_b=-c_Q+c_d\) after axion-dependent chiral rotations. The paper explicitly notes that those rotations also alter anomalous gauge-boson couplings. Consequently, a fermionic \(c_t,c_b\) pair and an \(aW\widetilde W\) coefficient copied from another convention are not automatically three coordinates of one response.

This does not kill the one-family experiment. It tells us what must precede it: one complete gauge-invariant operator basis, the signed field redefinition and anomaly shifts, a scale and scheme, and the matrix transporting both coefficients and covariance. Only then may the 27-setting kernel be labelled by \((v_u,v_d,a_2)\).

## Open and closed

Closed:

- the exact congruence law for the response;
- preservation of positivity, rank and determinant sign under invertible basis changes;
- a counterexample proving that the edge-cycle sign is not invariant under general source mixing;
- the distinction between node rephasing and EFT basis translation.

Open:

- the complete signed chiral/anomaly dictionary joining the two cited ALP conventions;
- its RG and electroweak-threshold dependence;
- the map into the corpus five-coordinate quotient;
- the physical three-source response after that map is fixed.

## Implication

The practical invitation becomes more disciplined: do not begin by comparing three edge signs. Begin by publishing the operator dictionary. Then report the basis-covariant rank and positivity of the measured response, followed by edge signs in that declared basis. This is precisely the difference between transporting a physical space of possibilities and merely coordinating names.

Primary source for the field-redefinition boundary: [Arias-Aragón et al., *Production of Thermal Axions across the ElectroWeak Phase Transition*](https://arxiv.org/abs/2012.04736), especially Eqs. 3.1--3.4 and the accompanying anomaly statement.

## Reproduction

~~~powershell
node scripts/run-three-source-basis-covariance-gate.mjs --write
node verification/admissibility/verify_three_source_basis_covariance_gate.mjs
~~~
