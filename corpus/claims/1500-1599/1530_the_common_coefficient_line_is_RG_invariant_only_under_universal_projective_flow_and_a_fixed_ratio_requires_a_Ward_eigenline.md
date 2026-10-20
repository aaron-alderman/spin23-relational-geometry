# The Common Coefficient Line Is RG Invariant Only under Universal Projective Flow, and a Fixed Ratio Requires a Ward Eigenline

**Date:** 20 October 2026

**Gates:** A2, A5 and A6

**Status:** exact counterterm-module theorem and deterministic spurion proxy; the physical Pati--Salam anomalous-dimension matrix remains unsupplied

**Depends on:** [the formal coefficient-line equalizer](1521_no_carrier_operator_can_safely_sew_the_typed_wheels_but_one_coefficient_line_can.md), [the physical source audit](1525_no_sourced_scalar_supplies_the_common_portal_line_so_the_minimal_new_datum_is_an_enforced_dimension_zero_coupling_object.md), [the minimal formal portal-label exchange](1528_the_minimal_portal_label_symmetry_is_a_Z2_fixed_line_but_its_metric_and_physical_lift_remain_new_data.md), [the one-loop Schur tangency proxy](1514_a_single_mediator_bubble_leaves_the_rank_one_Schur_cone_unless_its_loop_portal_shares_the_tree_coupling_ray.md), and [functional loop tangency](1519_momentum_dependent_Schur_protection_is_a_functional_rank_condition_and_a_zero_at_one_momentum_is_not_stable.md)

**Evidence:** [RG-invariance ledger](../../../evidence/data/spin23-common-coefficient-line-rg-invariance.json) and [deterministic verifier](../../../verification/verify/verify_spin23_common_coefficient_line_rg_invariance.mjs)

## Result

The tree-level common coefficient law

\[
(k_D,k_M)=\Lambda(c_D,c_M)
\]

is not generically RG invariant. There are two distinct questions.

1. Do all mediator or matching copies remain on one common projective ray,
   even if that ray runs?
2. Does the particular fixed ratio \(c_M/c_D\) remain unchanged?

The first requires a universal **projective** counterterm action across all
copies. The second is strictly stronger: the selected line must be a common
eigenline of the complete anomalous-dimension and vertex-counterterm action,
and every additive counterterm must have no transverse component.

Thus

\[
\boxed{
\text{common tree symbol}
\not\Rightarrow
\text{RG-invariant common line}
\not\Rightarrow
\text{RG-invariant fixed ratio}.}
\]

A non-anomalous Ward identity can protect the construction, but only if it
closes the full source/counterterm module on the selected line. Equality of
two bare names or canonical dimensions is insufficient.

## 1. Exact projective-minor evolution

Let each active mediator or matching copy carry a two-label coefficient
column

\[
k_i=\begin{pmatrix}k_{Di}\\k_{Mi}\end{pmatrix},
\qquad
\Delta_{ij}=\det(k_i,k_j).
\]

At the common-line locus,

\[
k_i=\Lambda_i c,
\qquad
c=\begin{pmatrix}c_D\\c_M\end{pmatrix}\ne0.
\]

The most general local one-loop source flow evaluated on that locus can be
written

\[
\dot k_i=A_i k_i+s_i,
\]

where \(A_i\) contains wave-function, vertex and operator-label mixing, while
\(s_i\) is additive counterterm support not proportional to \(k_i\).
Differentiating the projective minor gives the exact identity

\[
\boxed{
\dot\Delta_{ij}\big|_{\operatorname{rank}1}
=
\Lambda_i\Lambda_j\det\!\left(c,(A_j-A_i)c\right)
-\Lambda_j\det(c,s_i)
+\Lambda_i\det(c,s_j).}
\]

Consequently the rank-one coefficient variety is tangent to the RG vector
field exactly when the right-hand side vanishes for every active pair.

For homogeneous running, \(s_i=0\), this reduces to

\[
\boxed{(A_i-A_j)c\in\operatorname{span}(c)
\quad\text{for all }i,j.}
\]

A useful sufficient condition is

\[
A_i=A+\alpha_i I.
\]

All copies then experience the same projective matrix \(A\); the scalar
\(\alpha_i\) only rescales \(\Lambda_i\). This preserves rank one even when
the common ray itself rotates.

## 2. Fixed-ratio evolution with anomalous mixing

On the patch \(k_D\ne0\), define

\[
r=\frac{k_M}{k_D},
\qquad
A=\begin{pmatrix}a&b\\q&d\end{pmatrix}.
\]

For homogeneous flow,

\[
\beta_D=ak_D+bk_M,
\qquad
\beta_M=qk_D+dk_M,
\]

and therefore

\[
\boxed{
\dot r=q+(d-a)r-br^2.}
\]

The fixed ratio \(r_*=c_M/c_D\) is invariant precisely when this Riccati
beta function vanishes at \(r_*\). Equivalently,

\[
Ac\in\operatorname{span}(c).
\]

For several copies, the same fixed line must be an eigenline of every
\(A_i\), after including any allowed additive term divided by \(\Lambda_i\).

In the no-mixing case,

\[
A=\operatorname{diag}(\gamma_D,\gamma_M),
\qquad
\boxed{\dot{\log r}=\gamma_M-\gamma_D.}
\]

Thus a nonzero fixed Dirac--Majorana ratio requires
\(\gamma_D=\gamma_M\). The two completed operators contain inequivalent
field and vertex content, so that equality is not supplied by power counting.

## 3. What the anomalous dimensions contain

For the completed invariant operators

\[
\mathcal O_D=L_PH\nu_P^c,
\qquad
\mathcal O_M=S_{-3}\nu_P^c\nu_N^c,
\]

the diagonal entries schematically contain different sums:

\[
\gamma_D=\gamma_{L_P}+\gamma_H+\gamma_{\nu_P^c}
+\gamma_{D,\mathrm{vertex}},
\]

\[
\gamma_M=\gamma_{S_{-3}}+\gamma_{\nu_P^c}+\gamma_{\nu_N^c}
+\gamma_{M,\mathrm{vertex}}.
\]

The normalization convention for the individual field anomalous dimensions
can move factors of two between terms; their difference and the projective
criterion are convention independent. Off-diagonal entries \(b,q\) encode
operator-label mixing when the completed invariant source sector admits it.

Existing Pati--Salam and marked-family Ward identities distinguish the two
operators: their scalar dressings and family charges are inequivalent. They
can forbid mixing, making \(A\) diagonal, but they do not force the two
diagonal anomalous dimensions to agree. Protection therefore requires new
structure acting on the **completed invariant operator labels**, not a claim
that the underlying Higgs and Majorana scalars are the same field.

## 4. Minimal exact counterterm/spurion proxy

Freeze the source renormalization in minimal subtraction as

\[
k_i^{0}=\mu^{p\epsilon}
\left[k_i+\frac{1}{16\pi^2\epsilon}(A_i k_i+s_i)\right].
\]

The overall sign and \(16\pi^2\) normalization do not affect projective
tangency. The pole residues supply four exact tests.

### Transverse counterexample

Take

\[
c=(1,1)^T,quad
(\Lambda_1,\Lambda_2)=(1,2),quad
A_1=\begin{pmatrix}1&0\\0&2\end{pmatrix},quad
A_2=\begin{pmatrix}1&0\\0&3\end{pmatrix}.
\]

Although \(\Delta_{12}=0\) initially,

\[
\boxed{\dot\Delta_{12}=2.}
\]

Different Majorana-label anomalous dimensions immediately split the two
projective columns.

### Universal running ray

Let both copies share

\[
A=\begin{pmatrix}1&2\\3&4\end{pmatrix}
\]

up to scalar identity shifts. Then \(\dot\Delta_{12}=0\), but at \(r=1\),

\[
\dot r=3+(4-1)-2=4.
\]

The columns remain aligned while their common ratio runs.

### Ward eigenline

Instead take

\[
A=\begin{pmatrix}2&1\\1&2\end{pmatrix},
\qquad
A(1,1)^T=3(1,1)^T.
\]

Arbitrary copy-dependent scalar identity shifts preserve both
\(\Delta_{12}=0\) and \(r=1\). This is the minimal algebraic model of a
multiplicatively renormalized Ward source.

### Additive-pole failure

Even with \(A_1=A_2=0\), choosing

\[
s_1=0,\qquad s_2=(0,1)^T
\]

gives \(\dot\Delta_{12}=1\). A multiplicative eigenline theorem is therefore
incomplete unless the Ward identity also forbids transverse additive poles.

## 5. Exact Ward conditions

For a fixed line, a sufficient all-counterterm statement is:

\[
\boxed{
Z_i c=z_i c,
\qquad
P_\perp s_i=0
\quad\text{for every pole order, copy and threshold}.}
\]

Here \(P_\perp\) is the quotient projection onto
\(\mathbb C^2/\operatorname{span}(c)\). In physical terms:

1. the quantum effective action obeys a non-anomalous Ward identity;
2. the allowed portal source/counterterm module has one invariant generator;
3. the orthogonal completed operator combination is forbidden, redundant or
   Ward exact;
4. canonical normalization and threshold matching use the same embedded
   line; and
5. no anomaly or symmetry-breaking spurion produces a transverse source.

If only rank-one alignment is required, the selected ray may run. The weaker
condition is equality of projective velocities across copies, not a common
eigenvector.

The formal exchange \(\mathbb Z_2\) of claim 1528 is the minimal positive
Ward proxy. With

\[
P=\begin{pmatrix}0&1\\1&0\end{pmatrix},
\qquad [A,P]=0,
\]

every allowed counterterm matrix has the form

\[
A=\begin{pmatrix}u&v\\v&u\end{pmatrix}.
\]

Its two eigenlines are \((1,1)\) and \((1,-1)\). If the additive pole is
also exchange invariant, it lies on the selected fixed line. Hence an exact,
non-anomalous exchange Ward identity protects \(r=+1\) (or the signed
exchange protects \(r=-1\)) to the tested counterterm order. Claim 1528
constructs this action only on normalized operator labels; it does not prove
that the inequivalent physical fields, regulator or threshold maps realize
the symmetry.

This is also the linear reduction-of-couplings equation. For
\(k_M=r_*k_D\), RG invariance demands

\[
\boxed{\beta_M-r_*\beta_D=0}
\]

on the proposed line. Writing the equality at one scale without this beta
identity is tuning, not technical naturalness.

## 6. Deterministic audit

The verifier enumerates all 81 integer \(2\times2\) anomalous matrices with
entries in \(\{-1,0,1\}\). On the test ray \(c=(1,1)^T\):

- 19 matrices preserve the fixed line;
- among 6,561 ordered matrix pairs, 1,107 have equal projective velocity;
- 5,454 pairs are transverse; and
- every pair satisfies the exact minor-beta identity, including nonzero
  additive test poles.

It also verifies the Riccati ratio equation for every matrix and four exact
ratios, then checks the four counterterm proxies above. No floating-point
sampling is used.

## 7. Consequence for the Spin(2,3) programme

Claim 1525 isolated the missing dimension-zero portal-label object. The
present result specifies what that object must do quantum mechanically. It
cannot merely set a boundary condition
\(k_M/k_D=c_M/c_D\) at one matching scale. It must define a submodule of the
complete renormalized source space.

The physical test is now finite and sharp:

1. compute the \((\mathcal O_D,\mathcal O_M)\) anomalous-dimension and vertex
   mixing matrix in a fully specified carrier;
2. enumerate additive counterterms and threshold matchings;
3. test whether the proposed vector \(c\) is a common eigenline, or at least
   whether every mediator copy has the same projective velocity; and
4. identify the non-anomalous Ward identity that removes the transverse
   quotient source.

No sourced Spin(2,3), Jordan or Pati--Salam datum currently supplies that
identity. The positive branch is exact but conditional.

## Boundaries

**QFT boundary:** the pole-residue proxy is an exact local source and
counterterm calculation, not the beta function of a completed Pati--Salam
Lagrangian.

**Mixing boundary:** off-diagonal anomalous mixing is included algebraically;
whether it is physically allowed depends on the completed operator quantum
numbers and spurions.

**Loop-order boundary:** the displayed theorem is exact for a beta vector
field of the stated form. All-orders protection requires the Ward closure at
every pole order.

**Threshold boundary:** a common eigenline above one threshold can be rotated
by matching below it; threshold maps belong to the same closure test.

**Naturalness boundary:** a numerical equality
\(\gamma_D=\gamma_M\) without a non-anomalous symmetry is an accidental
one-loop cancellation, not a protection theorem.

## Verdict

\[
\boxed{
\begin{array}{ll}
\text{running common ray:}&
(A_i-A_j)c\in\operatorname{span}(c)
\text{ plus compatible additive poles},\\[1mm]
\text{fixed common ratio:}&
A_i c\in\operatorname{span}(c)
\text{ and no transverse additive pole}.
\end{array}}
\]

The tree-level coefficient equalizer is therefore not generically stable.
Its technically natural completion is precisely a Ward-invariant
one-dimensional counterterm submodule. The sourced physical model has not
yet supplied one.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_common_coefficient_line_rg_invariance.mjs
node verification/verify/verify_spin23_common_coefficient_line_physical_source_audit.mjs
node verification/verify/verify_spin23_one_loop_Schur_tangency_toy.mjs
~~~
