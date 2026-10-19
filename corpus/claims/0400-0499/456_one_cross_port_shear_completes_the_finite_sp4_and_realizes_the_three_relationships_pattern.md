# One Cross-Port Shear Completes the Finite (Sp(4)) and Realizes the Three-Relationships Pattern

**Date:** 17 October 2026  
**Branches:** B01, B04, B07, B08, B09, B10, B12 and B14  
**Claim status:** exact finite-group generation theorem; source derivation and positive real lift remain open

## 1. The sharpened question

The two-puncture code supplies two logical ports. Source-derived diagonal phase profiles give independent self-shears on each port but no cross coupling. Suppose local Fourier operations were also available so that each port carried its full one-port symplectic group.

What single additional relation is needed to obtain the full two-port \(Sp(4,\mathbb F_3)\)?

The answer is exact:

\[
\boxed{
\text{one symmetric off-diagonal cross-port shear.}
}
\]

## 2. Two independent one-port groups

For each logical port, a phase shear and Fourier transform generate

\[
Sp(2,\mathbb F_3)=SL(2,\mathbb F_3),
\]

of order 24. Acting independently on two ports gives

\[
SL(2,\mathbb F_3)\times SL(2,\mathbb F_3),
\]

of order

\[
24^2=576.
\]

Adding the port swap produces the imprimitive wreath-type subgroup

\[
\bigl(SL(2,\mathbb F_3)\times SL(2,\mathbb F_3)\bigr)\rtimes S_2
\]

of order

\[
2\cdot24^2=1152.
\]

This group can transform either face and exchange them, but it preserves the decomposition into two one-port symplectic planes.

## 3. It is far smaller than the full group

The full two-port symplectic group has order

\[
|Sp(4,\mathbb F_3)|=51840.
\]

Therefore the independent-port-plus-swap subgroup has index

\[
\frac{51840}{1152}=45.
\]

Two complete local theories plus exchange symmetry are not close to full relational closure.

## 4. The single completing generator

Write logical phase-space coordinates as

\[
(x_1,x_2,z_1,z_2).
\]

For a symmetric matrix \(K\), a lower symplectic shear is

\[
\begin{pmatrix}x\\z\end{pmatrix}
\longmapsto
\begin{pmatrix}x\\z+Kx\end{pmatrix}.
\]

The source-derived diagonal profiles supply

\[
K=
\begin{pmatrix}a&0\\0&b\end{pmatrix}.
\]

Add the single cross shear

\[
K_{\times}=
\begin{pmatrix}0&1\\1&0\end{pmatrix},
\]

which acts as

\[
z_1\mapsto z_1+x_2,
\qquad
z_2\mapsto z_2+x_1.
\]

This is the symplectic action of a two-qutrit controlled-phase coupling. The certificate proves

\[
\boxed{
\left\langle
SL(2,mathbb F_3)^2, S_2, K_\times
\right\rangle
=Sp(4,mathbb F_3).
}
\]

No larger family of cross couplings is needed.

## 5. Exact Jordan interpretation

The translation/shear parameters form

\[
\operatorname{Sym}_2(\mathbb F_3)
=
\left\{
\begin{pmatrix}a&c\\c&b\end{pmatrix}
:a,b,c\in\mathbb F_3
\right\}.

This space has three independent coordinates:

1. \(a\): self-relation of face 1;
2. \(b\): self-relation of face 2;
3. \(c\): mutual relation between the faces.

The charge-word phases already supply \(a\) and \(b\). The single missing off-diagonal shear supplies \(c\).

Thus the finite calculation realizes the pattern

\[
\boxed{
1\text{ carrier},
\quad2\text{ faces},
\quad3\text{ symmetric relationships}.
}

It is not metaphorical: the three relationships are exactly the three coordinates of the rank-two symmetric Jordan algebra.

## 6. Relation to the real (H_2(mathbb R)) carrier

Over the reals,

\[
H_2(\mathbb R)=\operatorname{Sym}_2(\mathbb R)
\]

has the same diagonal-plus-mutual decomposition. Its positive cone and fractional-linear conformal action lead to

\[
Sp(4,\mathbb R)\cong Spin_0(2,3).
\]

The finite result therefore identifies the precise algebraic coordinate absent from the code-side construction:

\[
\text{finite cross shear }c
\quad\leftrightarrow\quad
\text{real mutual-response entry of }H_2(\mathbb R).
\]

This is the strongest code/Jordan structural convergence so far.

## 7. What remains missing

The result is a generation theorem, not a source derivation. The code data currently provide:

- diagonal charge-word shears;
- puncture swap;
- a uniform higher-level non-Clifford phase.

They do not provide:

- local logical Fourier transforms;
- the controlled cross shear;
- a prime-compatible integral form of those operations;
- positivity selecting the real Jordan cone;
- a physical transfer or mediator mechanism for the mutual response.

## 8. Where the cross shear might come from

The cross term must couple the two logical ports. Credible sources include:

1. a two-boundary Dirichlet-to-Neumann kernel with nonzero mutual admittance;
2. a mediator exchanged between the two puncture sectors;
3. measurement-based controlled phase or gauge fixing;
4. a braid/linking operation acting on both boundary components;
5. an off-diagonal block in the Furey linking algebra;
6. a Jordan triple \(\{e_1,x,e_2\}\) relating the two primitive faces.

Each proposal must reproduce the symmetric action on both conjugate momenta, not merely correlate classical labels.

## 9. Branch decision

- **Closed:** independent local one-port groups have order 576.
- **Closed:** adding port swap gives the order-1152 imprimitive subgroup.
- **Closed:** this subgroup has index 45 in \(Sp(4,\mathbb F_3)\).
- **Closed:** one symmetric cross shear completes the full order-51840 group.
- **Closed:** the three shear parameters form \(\operatorname{Sym}_2(\mathbb F_3)\), exactly matching two self-relations plus one mutual relation.
- **Open:** source derivation of local Fourier and cross shear.
- **Open:** integral lift and real positivity.
- **Open:** physical identification of the mutual entry with response, mediator or triple composition.

## 10. Stop-everything and falsification gates

**Stop-everything trigger:** the same Furey/Jordan/transfer construction that supplies the real off-diagonal response also reduces modulo primes to the certified cross shear.

**Minimal-completion trigger:** a source-derived controlled-phase operation plus source-derived local dualities generates the full logical \(Sp(4,\mathbb F_p)\) for multiple primes.

**Decomposition falsifier:** independent face transformations plus swap are claimed to equal full \(Sp(4)\) despite the exact index 45.

**Jordan-name falsifier:** an arbitrary two-port correlation is called the missing Jordan coordinate without inducing the symmetric cross shear.

**Continuum falsifier:** completion over \(\mathbb F_3\) is claimed to supply positivity or Lorentzian real form by itself.

## 11. Certificate

The [cross-port completion certificate](../../../verification/verify/verify_one_cross_port_shear_completes_local_two_port_group_to_sp4_f3.mjs) generates the local product, wreath subgroup and completed symplectic group exactly and verifies their orders and index.

## Companion documents

- [Charge-word diagonal shears](455_transversal_css_dualities_fail_while_charge_word_phases_give_only_two_independent_logical_shears.md)
- [Finite two-puncture \(Sp(4)\) shadow](450_two_punctures_produce_an_exact_finite_sp4_shadow_but_do_not_select_the_spin23_real_carrier.md)
- [Relational carrier and Jordan-triple composition](../0000-0099/41_relational_carrier_jordan_triple_composition.md)
- [Scalar interval two-port response](../0000-0099/64_scalar_interval_dirichlet_to_neumann_branch.md)
- [Two-sided interface realization](../0000-0099/61_two_sided_interface_three_relations_branch.md)
