# The Exact Feshbach Kernel Induces the Wrong Diagonals, and the Protected Resolvent Zeros Hold Only at Zero Energy, Not on an Interval

**Date:** 20 October 2026

**Gates:** A2, A5 and A6

**Status:** exact spectral-parameter Feshbach and projected-resolvent audit of the multiplicity-one sixteen-state repair; label-level operator result, not a physical propagator

**Depends on:** [the sixteen-state rank repair](1533_the_four_zero_modes_require_exactly_four_new_real_completed_dimensions_and_no_edge_only_repair_exists.md), [the five-role descent no-go](1537_neither_minimal_rank_repair_has_a_natural_linear_descent_to_the_invertible_five_role_texture.md), and [the selected-return candidate](1540_selected_length_two_returns_recover_the_protected_texture_but_require_a_new_endpoint_projector_and_do_not_select_the_common_ray.md)

**Evidence:** [Feshbach/resolvent ledger](../../../evidence/data/spin23-sixteen-state-five-role-feshbach-resolvent.json) and [deterministic verifier](../../../verification/verify/verify_spin23_sixteen_state_five_role_feshbach_resolvent.mjs)

## Result

On one relation sheet, order the repaired source as

\[
(PN,IN,IP,TP,SP,TU,SI,NU)
\]

and assign real edge weights

\[
x,y,g,h,u,v,w
\]

to

\[
PN-IN-IP-TP-SP,\qquad TP-TU,\qquad SP-SI,\qquad TU-NU,
\]

respectively. Retain the first five sectors as roles

\[
(I,P,N,Z,X)
\]

and eliminate \((TU,SI,NU)\).

The component graph is a tree, so independent basis rephasings remove all
seven edge phases. Taking the weights real therefore loses no spectral
generality for this isolated label component; complex-oriented formulas are
recovered by inserting the corresponding conjugates.

The auxiliary Dirac block is singular at zero energy, but its resolvent is
well defined for spectral parameter \(z\notin\{0,\pm w\}\). Exact Feshbach
elimination induces only

\[
\Sigma_{ZZ}(z)=\frac{u^2z}{z^2-w^2},
\qquad
\Sigma_{XX}(z)=\frac{v^2}{z}.
\]

Every induced off-diagonal entry is zero. Thus the mechanism generates
diagonals at the wrong endpoints: it supplies neither the desired \(P\)
diagonal nor the desired \(I\) diagonal, while adding energy-dependent
\(Z\) and \(X\) self-energies.

The projected resolvent is nevertheless generically dense. Its forbidden
\(I-N\) entry is

\[
G_{IN}(z)=\frac{xy\,\phi_4(z)}{\Delta(z)},
\]

and the selected resolvent diagonal is

\[
G_{PP}(z)=\frac{z\,\phi_3(z)}{\Delta(z)}.
\]

Neither vanishes on an open energy interval for nonzero required chain
edges. Both vanish in the controlled \(z\to0\) limit when the full repaired
operator is invertible. The zero-energy protection is therefore a pointwise
inverse identity, not an interval-stable propagator texture.

The exact verdict is

\[
\boxed{
\begin{array}{rcl}
\text{desired }P,I\text{ diagonals from Feshbach}&=&\mathrm{NO},\\
\text{primitive induced }I-N\text{ edge}&=&0,\\
\text{projected-resolvent }I-N\text{ on an interval}&\ne&0,\\
G_{PP}(0)=G_{IN}(0)&=&0,\\
\text{interval protection with all chain masses nonzero}&=&\mathrm{UNSAT}.
\end{array}}
\]

## 1. Full component and exact Feshbach kernel

The eight-state matrix is

\[
D_8=\begin{pmatrix}
0&x&0&0&0&0&0&0\\
x&0&y&0&0&0&0&0\\
0&y&0&g&0&0&0&0\\
0&0&g&0&h&u&0&0\\
0&0&0&h&0&0&v&0\\
0&0&0&u&0&0&0&w\\
0&0&0&0&v&0&0&0\\
0&0&0&0&0&w&0&0
\end{pmatrix}.
\]

Its determinant is

\[
\det D_8=x^2g^2v^2w^2.
\]

Partition \(D_8\) into retained and auxiliary blocks. In auxiliary order
\((TU,SI,NU)\),

\[
D_A=\begin{pmatrix}0&0&w\\0&0&0\\w&0&0\end{pmatrix},
\]

so

\[
(z-D_A)^{-1}=
\begin{pmatrix}
\dfrac{z}{z^2-w^2}&0&\dfrac{w}{z^2-w^2}\\
0&\dfrac1z&0\\
\dfrac{w}{z^2-w^2}&0&\dfrac{z}{z^2-w^2}
\end{pmatrix}.
\]

Only \(Z=TP\) couples to \(TU\), and only \(X=SP\) couples to \(SI\).
There is no auxiliary path between those attachment states. Hence

\[
D_{\rm eff}(z)=
\begin{pmatrix}
0&x&0&0&0\\
x&0&y&0&0\\
0&y&0&g&0\\
0&0&g&\alpha&h\\
0&0&0&h&\beta
\end{pmatrix},
\quad
\alpha=\frac{u^2z}{z^2-w^2},
\quad
\beta=\frac{v^2}{z}.
\]

This proves the complete induced-support statement: two diagonals and no
off-diagonal self-energy.

## 2. Exact projected resolvent

Write

\[
A=z-\alpha,
\qquad B=z-\beta,
\]

and define the forward continuants

\[
\begin{aligned}
\theta_2&=z^2-x^2,\\
\theta_3&=z(z^2-x^2-y^2),\\
\theta_4&=A\theta_3-g^2\theta_2,\\
\Delta&=B\theta_4-h^2\theta_3,
\end{aligned}
\]

and backward continuants

\[
\phi_4=AB-h^2,
\qquad
\phi_3=z\phi_4-g^2B,
\qquad
\phi_2=z\phi_3-y^2\phi_4.
\]

Then \(G_R(z)=P(z-D_8)^{-1}P\) is the symmetric matrix whose upper triangle
in \((I,P,N,Z,X)\) order is

\[
\frac1\Delta
\begin{pmatrix}
\phi_2&x\phi_3&xy\phi_4&xygB&xygh\\
&z\phi_3&yz\phi_4&ygzB&yghz\\
&&\theta_2\phi_4&g\theta_2B&gh\theta_2\\
&&&\theta_3B&h\theta_3\\
&&&&\theta_4
\end{pmatrix}.
\]

This displays every induced propagator channel. Even though the Feshbach
operator has no new off-diagonal edge, its inverse generically connects every
retained pair.

## 3. Forbidden support and interval identities

The primitive effective operator retains a zero \(I-N\) entry. The projected
resolvent does not. Clearing denominators in \(\phi_4\) gives, with
\(t=z^2\),

\[
F_4(t)=(t-w^2-u^2)(t-v^2)-h^2(t-w^2).
\]

This is monic of degree two. It cannot vanish identically for any finite
choice of edge weights. Therefore \(G_{IN}\) can vanish throughout an open
spectral interval only if

\[
xy=0.
\]

That deletes a required \(I-P\) or \(P-N\) mass edge. With all physical chain
edges nonzero, \(I-N\) may vanish only at isolated roots of \(F_4\).

There are two notions of selected cofactor that must not be conflated.
Deleting \(P\) from \(D_{\rm eff}(z)\) isolates the zero-diagonal \(I\) row,
so its mass-matrix cofactor is identically zero. But the actual spectral
kernel is \(z-D_{\rm eff}(z)\), whose selected cofactor is

\[
\operatorname{cof}_{PP}(z-D_{\rm eff})=z\phi_3.
\]

Equivalently, \(G_{PP}=z\phi_3/\Delta\). After clearing denominators, the
nontrivial factor is

\[
H_3(t)=tF_4(t)-g^2(t-v^2)(t-w^2).
\]

It is monic of degree three, so no finite edge relation makes it vanish on an
interval. The algebraic cofactor of the energy-dependent effective mass
matrix survives only in a tautological sense; the resolvent-zero analogue
does not.

## 4. Controlled zero-energy limit

The Feshbach self-energy is singular at \(z=0\), but the full matrix is
invertible whenever

\[
xgvw\ne0.
\]

The full resolvent is then regular, and the apparent pole cancels in the
projected expression. Directly taking the rational limit gives

\[
\lim_{z\to0}G_R(z)=
\begin{pmatrix}
0&-x^{-1}&0&\dfrac{y}{xg}&0\\
-x^{-1}&0&0&0&0\\
0&0&0&-g^{-1}&0\\
\dfrac{y}{xg}&0&-g^{-1}&0&0\\
0&0&0&0&0
\end{pmatrix}.
\]

Thus both

\[
G_{PP}(0)=0,
\qquad G_{IN}(0)=0,
\]

but a new nonlocal \(I-Z\) entry \(y/(xg)\) remains. The result is independent
of \(h,u,v,w\) after imposing their nonzero invertibility conditions where
needed; this is an inverse-tree matching identity, not the target five-role
mass matrix.

## 5. Required relations and physical boundary

No relation among nonzero \((x,y,g,h,u,v,w)\) moves the induced self-energies
from \((Z,X)\) to \((P,I)\). Achieving the desired diagonals requires new
auxiliary couplings at the desired endpoints or the external endpoint
projector already isolated in claim 1540.

Likewise, interval removal of the forbidden \(I-N\) resolvent channel requires
\(x=0\) or \(y=0\), destroying the retained physical chain. Isolated-energy
cancellations satisfy \(F_4(z^2)=0\); selected-diagonal cancellations satisfy
\(H_3(z^2)=0\). Neither is a structural texture law.

This calculation uses a coordinate projection of the label-level finite
operator. Without a physical lift specifying external states, kinetic terms,
normalization and an \(i\epsilon\) prescription, \(G_R\) is not asserted to be
a physical propagator.

## Verdict

Energy-dependent Feshbach elimination is exact and finite after controlled
continuation through the singular auxiliary point, but it does not supply the
missing physical texture. It induces the wrong diagonals, and its projected
resolvent develops the forbidden \(I-N\) channel at generic nonzero energy.

The protected selected zero and absent \(I-N\) entry survive only at the
isolated zero-energy inverse. Turning them into interval identities would
require deleting a necessary mass edge or adding the endpoint-selection data
that the earlier path audit already found missing.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_sixteen_state_five_role_feshbach_resolvent.mjs
node verification/verify/verify_spin23_five_role_correspondence_descent_no_go.mjs
node verification/verify/verify_spin23_six_character_zero_mode_repair_exhaustion.mjs
~~~
