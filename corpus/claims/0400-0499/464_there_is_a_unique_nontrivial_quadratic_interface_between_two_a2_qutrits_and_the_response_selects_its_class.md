# There Is a Unique Nontrivial Quadratic Interface Between Two \(A_2\) Qutrits, and the Response Selects Its Class

**Date:** 17 October 2026  
**Branches:** B01, B04, B07, B08, B09, B10, B12 and B14  
**Claim status:** exact finite interface classification; dynamical insertion remains open

## 1. From gluing by quotient to gluing by an invertible interface

Maximal isotropic lattice gluing was too destructive: it removed the finite discriminant sector. The appropriate alternative is an invertible phase interface acting on

\[
\mathbb C[D\oplus D]\cong\mathbb C^3\otimes\mathbb C^3.
\]

Such an interface preserves all nine states while coupling the two discriminant labels.

At qutrit level, every quadratic phase may be written

\[
U_{u,v,c}|a,b\rangle
=
\omega^{u a^2+v b^2+c ab}|a,b\rangle,
\qquad
u,v,c\in\mathbb F_3.
\]

The coefficients \(u\) and \(v\) are local self-phases. The coefficient \(c\) is the mutual interface.

## 2. Exact classification modulo local operations

Quotienting by the two local quadratic phases leaves

\[
c\in\mathbb F_3.
\]

Independent relabellings

\[
a\mapsto\lambda a,
\qquad
b\mapsto\mu b,
\qquad
\lambda,\mu\in\mathbb F_3^\times
\]

send \(c\mapsto\lambda\mu c\). Hence \(c=1\) and \(c=2=-1\) are equivalent, whereas \(c=0\) remains separate.

Therefore

\[
\boxed{
\text{there is exactly one nontrivial two-face quadratic interface class.}
}
\]

This is a scarcity result: once two qutrit faces and local Clifford phases are given, the mutual quadratic relationship has no further discrete model choice beyond being trivial or nontrivial.

## 3. Its exact symplectic action

Choose the representative

\[
U_{12}|a,b\rangle=\omega^{ab}|a,b\rangle.
\]

For qutrit shift and clock operators it obeys

\[
U_{12}X_1U_{12}^{-1}=X_1Z_2,
\qquad
U_{12}X_2U_{12}^{-1}=Z_1X_2,
\]

while preserving \(Z_1,Z_2\). Its exponent-space action is the symmetric shear

\[
\begin{pmatrix}q\\p\end{pmatrix}
\longmapsto
\begin{pmatrix}I&0\\K_{12}&I\end{pmatrix}
\begin{pmatrix}q\\p\end{pmatrix},
\qquad
K_{12}=\begin{pmatrix}0&1\\1&0\end{pmatrix}.
\]

This is precisely the generator previously proved sufficient to enlarge the local two-port subgroup to all of \(Sp(4,\mathbb F_3)\).

## 4. The positive \(A_2\) response selects the same nontrivial class

Modulo three,

\[
X=\begin{pmatrix}2&-1\\-1&2\end{pmatrix}
\equiv
\begin{pmatrix}2&2\\2&2\end{pmatrix}.
\]

Remove the two available local self-shears:

\[
X-2E_{11}-2E_{22}
\equiv
\begin{pmatrix}0&2\\2&0\end{pmatrix}.
\]

Its mutual coefficient \(c=2\) lies in the unique nonzero orbit. Thus the integral positive response, after local terms are factored out, selects exactly the unique nontrivial qutrit interface class.

This is stronger than matching dimensions. It identifies the same equivalence class of finite symplectic operation.

## 5. What this does and does not derive

The following chain is now exact:

\[
A_2\text{ response}
\longrightarrow
\text{two }A_2\text{ discriminant qutrits}
\longrightarrow
[c\neq0]
\longrightarrow
\text{cross shear}
\longrightarrow
Sp(4,\mathbb F_3).
\]

But one step remains conditional in physics: the positive Euclidean response does not automatically insert the unitary phase \(\omega^{ab}\). A quantized real-time boundary term, topological interface, measurement-induced gate or equivalent gluing rule must produce it.

The classification says that if such a nontrivial quadratic interface is produced, its finite action is forced. It does not prove that the Standard Model or Furey linking dynamics produces the interface.

## 6. Why this is better than isotropic lattice gluing

The interface is diagonal and unitary on all nine basis states. It changes phases but does not identify or quotient states. Hence it preserves the two-qutrit carrier while supplying their mutual relation.

This resolves the mathematical tradeoff seen in maximal opposite-sign gluing:

- lattice extension can destroy the discriminant sector;
- an invertible bicharacter interface couples the sectors without changing their dimension.

The remaining question is which physical action realizes the latter.

## 7. Candidate source terms

The minimal source has the finite form

\[
S_{\mathrm{int}}(a,b)=\frac{2\pi c}{3}ab\pmod{2\pi}.
\]

Continuum ancestors could include:

- a level-three BF-type boundary pairing;
- a quantized mixed Chern–Simons interface;
- a bilinear holonomy/flux defect;
- a measurement-and-feedforward realization in the punctured code;
- a Higgs/Furey mediator whose integrated phase reduces to the same bicharacter.

These are distinct dynamical branches. The finite classification does not choose among them.

## 8. Claim ledger

- **Exact:** quadratic two-qutrit interfaces have coefficients \((u,v,c)\in\mathbb F_3^3\).
- **Exact:** quotient by local self-phases leaves \(c\in\mathbb F_3\).
- **Exact:** the two nonzero values of \(c\) form one orbit under face relabelling.
- **Exact:** the unique nontrivial class is the controlled phase/off-diagonal shear.
- **Exact:** the reduced positive \(A_2\) response lies in that class after local self terms are removed.
- **Exact:** the interface preserves the nine-dimensional carrier rather than quotienting it.
- **Open:** a source-derived quantized boundary action inserting this phase.
- **Not established:** that Furey or Standard-Model dynamics chooses the nontrivial rather than trivial class.

## 9. Stop-everything and falsification gates

**Stop-everything trigger:** a derived Furey, Higgs, stress or topological boundary term reduces to \(2\pi ab/3\) with the two labels already identified as physical ports.

**Rigidity trigger:** the same derivation fixes level three from anomaly or charge data rather than importing it from the discriminant determinant.

**Interface falsifier:** a proposed coupling acts only by \(u a^2+v b^2\) and therefore remains removable by local face operations.

**Dynamics falsifier:** the Euclidean positive response is directly called a unitary controlled phase without a quantized oscillatory boundary prescription.

## 10. Certificate

The [two-\(A_2\) interface certificate](../../../verification/verify/verify_unique_nontrivial_two_a2_qutrit_interface_is_the_cross_shear.mjs) enumerates all quadratic phases, classifies them modulo local self terms and face relabellings, verifies the Weyl conjugation and symplectic shear, and confirms that the reduced \(A_2\) response selects the unique nonzero class.

## Companion documents

- [\(A_2\) discriminant Weil representation](463_the_a2_discriminant_weil_representation_supplies_one_qutrit_but_doubling_does_not_supply_the_mutual_gate.md)
- [Villain–theta periodic completion](462_villain_theta_completion_restores_periodicity_and_poisson_duality_but_not_a_unitary_code_gate.md)
- [Finite cross-port completion](456_one_cross_port_shear_completes_the_finite_sp4_and_realizes_the_three_relationships_pattern.md)
- [Positive integral scalar response](457_a_positive_integral_scalar_boundary_response_supplies_the_missing_cross_shear_in_sp4z_and_modulo_every_prime.md)
- [Transversal obstruction and diagonal shears](455_transversal_css_dualities_fail_while_charge_word_phases_give_only_two_independent_logical_shears.md)
