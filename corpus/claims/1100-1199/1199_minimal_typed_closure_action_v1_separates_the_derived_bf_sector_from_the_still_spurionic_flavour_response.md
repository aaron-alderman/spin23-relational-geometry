# Minimal typed closure action v1 separates the derived BF sector from the still-spurionic flavour response

## Status

This is the smallest four-dimensional effective action presently known to combine:

- the rank-one lepton-family projector;
- the anomaly-free continuous lift;
- the determinant-neutral compact connection;
- charge-three flavon dressing of cross-Peirce Yukawa entries;
- the raw \(\mathbb Z_9\) vacuum lift and physical \(\mathbb Z_3\) quotient;
- autonomous level-three BF theory;
- the \(2+1\)-dimensional \(Spin(2,3)\) defect;
- and the projector return equation.

It closes the effective topological chain conditional on a projector and neutral Yukawa/relational maps. It does not yet derive those flavour data.

## 1. Typed fields

Let \(M_4\) be oriented spacetime with a possible defect \(\Sigma_3\).

| Symbol | Type and role |
|---|---|
| \(P\) | Hermitian rank-one projector on lepton family bundle \(V_L\) |
| \(Q=I-P\) | complementary rank-two projector |
| \(R,a\) | Hermitian line bundle and independent compact \(U(1)_X\) connection |
| \(s\) | section of \(R^3\), the charge-three scalar flavon |
| \(H\) | Standard Model Higgs, with \(q_X=-1\) |
| \(\Psi_r\) | Standard Model fermions plus three \(\nu_R\) |
| \(K_{PQ}^{(r)}\) | neutral maps in \(\operatorname{Hom}(PV_r,QV_r)\) |
| \(b\) | compact infrared two-form obtained by dualizing the phase of \(s\) |
| \(g\) | spacetime/causal geometry and stress source |

## 2. Full anomaly-free charge operator

For each Standard Model multiplet \(r\), define

\[
q_X^{(r)}(P)=B_r-2Y_r-3L_rP,
\]

where \(L_r=1\) for lepton multiplets and \(0\) for quarks. For \(P=P_i\), this is the integral representative

\[
X_i=B-2Y-3L_i
\]

of the anomaly-free \(B-3L_i\) direction modulo hypercharge.

The physical-field charges are:

| Field | \(q_X\) |
|---|---:|
| \(Q_L\) | \(0\) |
| \(u_R\) | \(-1\) |
| \(d_R\) | \(+1\) |
| selected \(L_L\) | \(-2\) |
| complementary \(L_L\) | \(+1\) |
| selected \(e_R\) | \(-1\) |
| complementary \(e_R\) | \(+2\) |
| selected \(\nu_R\) | \(-3\) |
| complementary \(\nu_R\) | \(0\) |
| \(H\) | \(-1\) |
| \(s\) | \(+3\) |

The lepton-doublet slice is exactly

\[
(-2,1,1)=I-3P.
\]

Species-dependent baryon and hypercharge shifts provide the complete anomaly-free representation. The line twist of document 1194 is the seed lepton-family geometry, not the full charge table for every Standard Model species.

## 3. Covariant derivatives

Write

\[
D_\mu\Psi_r
=\left(
\partial_\mu+\rho_r(A_{\mathrm{SM},\mu})
+ig_Xa_\mu q_X^{(r)}(P)
+\mathcal C_\mu(P)
\right)\Psi_r,
\]

where \(\mathcal C(P)\) is the induced connection required when the projector subbundles vary. In a trivial ambient family bundle it is locally represented on the seed bundle by

\[
\mathcal C(P)=[P,dP].
\]

For the scalars,

\[
DH=(d+\rho_H(A_{\mathrm{SM}})-ig_Xa)H,
\qquad
Ds=(d+3ig_Xa)s.
\]

## 4. Minimal action

The v1 action is

\[
\boxed{
\begin{aligned}
S_{\mathrm{v1}}=\int_{M_4}\sqrt{|g|}\,d^4x\Big[&
\mathcal L_{\mathrm{SM,gauge}}
-\frac1{4e_X^2}f_{\mu\nu}f^{\mu\nu}
-\frac{\chi}{2}f_{\mu\nu}B_Y^{\mu\nu}\\
&+\frac{f_P^2}{2}\operatorname{Tr}(D_\mu P D^\mu P)
+|D_\mu H|^2+|D_\mu s|^2\\
&-V(H,s,P)
+\sum_r\overline\Psi_r i\gamma^\mu D_\mu\Psi_r\\
&-\mathcal L_Y(P,s,K)
-\mathcal L_M(P,s,K_M)
\Big].
\end{aligned}
}
\]

The Abelian kinetic-mixing term \(\chi\) is allowed and generally requires phenomenological matching.

## 5. Typed Yukawa blocks

Write a family map in Peirce blocks:

\[
Y=PYP+PYQ+QYP+QYQ.
\]

The diagonal blocks are neutral. Each cross block has relative charge \(\pm3\). The ultraviolet covariant operator is schematically

\[
\boxed{
Y_{\mathrm{cov}}(P,s)
=PYP+QYQ
+\frac{s}{\Lambda}QK_+P
+\frac{s^\dagger}{\Lambda}PK_-Q.
}
\]

The precise conjugation depends on chirality conventions; every edge crossing the \(P|Q\) split requires exactly one charge-three insertion.

The lepton Yukawa terms are

\[
\mathcal L_Y
\supset
\overline L_L H\,Y_e^{\mathrm{cov}}e_R
+\overline L_L\widetilde H\,Y_\nu^{\mathrm{cov}}\nu_R
+\mathrm{h.c.}
\]

The neutral maps \(K_\pm\) carry the family direction and mixing data. Fixed \(K\) gives effective/spurionic closure; dynamical \(K\) is required for absolute flavour closure.

## 6. Majorana blocks

Right-handed-neutrino family charges are \((-3,0,0)\). Hence:

- \(QQ\) is neutral;
- \(PQ\) and \(QP\) require one flavon;
- \(PP\) has charge six in magnitude and requires two flavons.

Schematically,

\[
M_R^{\mathrm{cov}}
=QM_RQ
+\frac{s}{\Lambda}(QM_RP+PM_RQ)
+\frac{s^2}{\Lambda^2}PM_RP,
\]

with conjugations fixed by the adopted two-component-spinor convention.

## 7. Scalar and projector potential

Separate

\[
V=V_H(H)+V_s(s)+V_{Hs}(H,s)+V_{\mathrm{resp}}(P;H_a).
\]

The flavon sector may use

\[
V_s=-\mu_s^2|s|^2+\lambda_s|s|^4,
\qquad
V_{Hs}=\lambda_{Hs}|H|^2|s|^2.
\]

Projector orientation requires a second family tensor. A positive response form is

\[
V_{\mathrm{resp}}
=\sum_a\kappa_a\|[P,H_a]\|_{\mathrm{HS}}^2
-\sum_a\eta_a\operatorname{Tr}(PH_a)+\cdots.
\]

Without \(H_a\), every \(U(3)\)-invariant function of one rank-one projector is constant on \(\mathbb{CP}^2\).

## 8. Return equation

Define the effective action

\[
e^{-\Gamma[P]}
=\int\mathcal D(\text{all other fields})\,e^{-S_{\mathrm{v1}}}
\]

and response

\[
\mathcal R[P]=\frac{\delta\Gamma}{\delta P}.
\]

Constrained projector variation gives

\[
\boxed{[P,\mathcal R[P]]=0.}
\]

For a nondegenerate selected eigenvalue,

\[
P=\Pi_\lambda(\mathcal R[P]).
\]

The Hessian on the cross-Peirce tangent space determines stability and the masses of family-orientation modes.

## 9. Vacuum global form

With integral electroweak normalization \(y=6Y\), the electroweak Higgs and flavon vacuum charges under \((y,X)\) are

\[
Q_{\mathrm{vac}}
=\begin{pmatrix}
3&-1\\
0&3
\end{pmatrix}.
\]

Its Smith normal form is

\[
\operatorname{SNF}(Q_{\mathrm{vac}})=(1,9).
\]

The raw fieldwise residual group is \(\mathbb Z_9\). The cube of its order-nine generator is the colour-centre transformation, so the physical split remnant is

\[
\boxed{
\mathbb Z_9/\mathbb Z_3^{\mathrm{colour}}
\cong\mathbb Z_3^{\mathrm{split}}.
}
\]

The action must use the full Standard Model global gauge group; an isolated \(U(1)\) calculation misses the intermediate \(\mathbb Z_9\).

## 10. Autonomous BF theory

Deep in the flavon Higgs phase, write

\[
s=ve^{i\theta}.
\]

The phase action is

\[
\frac{v^2}{2}(d\theta-3a)\wedge*(d\theta-3a).
\]

Dualizing the compact phase gives

\[
\boxed{
S_{\mathrm{BF}}=\frac3{2\pi}\int_{M_4}b\wedge da
}
\]

plus irrelevant kinetic corrections. Since \(a\) is an independent connection on \(R\), all compact flux and flat-holonomy sectors are present.

## 11. Defect and (Spin(2,3))

On the established \(S^1/\mathbb Z_2\) reduction, take

\[
a_\mu:+,
\quad a_y:-,
\quad b_{\mu\nu}:-,
\quad b_{\mu y}:+.
\]

The surviving defect fields are

\[
a_\mu,
\qquad c_\mu=b_{\mu y},
\]

with

\[
\boxed{
S_{\Sigma_3}=\frac3{2\pi}\int_{\Sigma_3}c\wedge da.
}

On spatial \(T^2\), the untwisted gapped theory has a nine-dimensional Hilbert space.

The defect causal Jordan algebra is \(H_2(\mathbb R)\), and

\[
\operatorname{Conf}(H_2(\mathbb R))
\cong Sp(4,\mathbb R)
\cong Spin_0(2,3).
\]

Thus the typed bridge is

\[
H_3(\mathbb C)\text{ family selection in }M_4
\longrightarrow
\mathbb Z_3\text{ defect on }\Sigma_3
\longrightarrow
H_2(\mathbb R)/Spin(2,3)\text{ observable geometry}.
\]

## 12. Stress-response return

Varying with respect to geometry gives

\[
T_{\mu\nu}
=-\frac2{\sqrt{|g|}}
\frac{\delta S_{\mathrm{v1}}}{\delta g^{\mu\nu}}.
\]

The matter, link, and gauge terms depend on \(P\), so their stress correlations contribute to \(\Gamma[P]\) and \(\mathcal R[P]\). But universal stress-energy cannot independently manufacture the noncommuting family tensors \(H_a\); it can weight and feed back distinctions already carried by Yukawa, Majorana, link, or self-energy data.

The v1 return loop is

\[
P
\to q_X(P),Y_{\mathrm{cov}}(P,s)
\to\text{matter/stress response}
\to\mathcal R[P;H_a]
\to\Pi_\lambda(\mathcal R)=P.
\]

It is fully reflexive only when the \(H_a\) dynamics is supplied.

## 13. Consistency ledger

### Structurally passed

- Unique primitive determinant-neutral weights.
- Typed charge-three Yukawa dressing.
- Faithful central action on matter.
- Known anomaly-free continuous completion with three \(\nu_R\).
- Correct vacuum Smith form and colour-centre quotient.
- Autonomous level-three BF theory by compact Higgs duality.
- Correct \(2+1\)-dimensional placement of the \(Spin(2,3)\) causal geometry.
- Variational return equation.

### Still required

- Derive the projector response terms and their coefficients.
- Fix common family-space typing beyond the lepton branch.
- Establish a stable flavon vacuum compatible with experimental constraints.
- Calculate kinetic mixing and the heavy gauge-boson spectrum.
- Prove the discrete twist is zero after all massive matter is integrated out.
- Derive defect orientation and gap all charged defect matter.
- Replace the schematic stress sandwich by an explicit boundary source operator.

## 14. Closure verdict for v1

The effective topological chain is now represented by one conventional typed action:

\[
\boxed{
P
\Rightarrow q_X
\Rightarrow s_{q=3}
\Rightarrow\mathbb Z_9/\mathbb Z_3^{\mathrm{colour}}
\Rightarrow\mathbb Z_3
\Rightarrow3\text{-BF}
\Rightarrow\mathbb C^9.
}

Absolute reflexive closure remains open at one exposed point:

\[
\boxed{
\text{What dynamics generates the noncommuting family tensors that select }P\text{ and the neutral maps }K?
}

The next work should stress-test fermion loops, neutrino/Majorana dynamics, Furey/Jordan metrics, and defect self-energy as candidate sources rather than reopening the already closed charge-three/BF descent.

