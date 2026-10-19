# The Neutrino Peirce Corner Restores a Gauge-Neutral \(H_2(\mathbb R)\) Carrier

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B08 and B11  
**Claim status:** exact canonical Jordan-corner construction; dynamical isolation remains open

## 1. The apparent loss of capacity two

Adding the unique neutral arrow

\[
\nu^c:D\to E
\]

replaces the old linking factor \(M_2(\mathbb C)\) by \(M_3(\mathbb C)\). At the level of simple ideals, the unique capacity-two factor is gone.

However, the new \(M_3\) factor is not unstructured. It comes from the bipartite component

\[
\text{left face }E
\qquad\text{and}\qquad
\text{right faces }C\oplus D,
\]

with arrows

\[
e^c:C\to E,
\qquad
\nu^c:D\to E.
\]

In the ordered linking basis \((E,C,D)\), it is the full algebra

\[
M_3(\mathbb C).
\]

Its endpoint data canonically distinguishes two rank-two Peirce corners.

## 2. Charged and neutral corners

Define

\[
p_e=p_E+p_C,
\qquad
p_\nu=p_E+p_D.
\]

Then

\[
p_eM_3(\mathbb C)p_e\cong M_2(\mathbb C),
\qquad
p_\nu M_3(\mathbb C)p_\nu\cong M_2(\mathbb C).
\]

Their off-diagonal relations are different:

\[
p_e:\quad e^c:C\leftrightarrow E,
\]

\[
p_\nu:\quad \nu^c:D\leftrightarrow E.
\]

The first is the old charged-lepton corner. The second exists only after the sixteen-state completion.

## 3. Gauge neutrality selects the neutrino corner uniquely

The relevant carrier hypercharges are

\[
Y_E=0,
\qquad
Y_D=0,
\qquad
Y_C=1.
\]

On the three-dimensional linking component, a hypercharge rotation is represented by

\[
U(\theta)=\operatorname{diag}(1,e^{i\theta},1).
\]

Conjugation by \(U(\theta)\) acts trivially on the entire neutrino corner:

\[
U(\theta)XU(\theta)^\dagger=X
\qquad
\forall X\in p_\nu M_3p_\nu.
\]

It rotates the charged corner's off-diagonal coordinate:

\[
z_e\mapsto e^{-i\theta}z_e.
\]

Therefore, among the two endpoint-selected rank-two corners containing the common face \(E\), exactly one has equal gauge weights on both faces:

\[
\boxed{
p_\nu M_3p_\nu
\text{ is the unique gauge-trivial relational corner.}
}
\]

This replaces uniqueness by simple-factor size with uniqueness by charge-compatible Peirce data.

## 4. The real Jordan carrier

The self-adjoint part of the neutrino corner is

\[
H_2(\mathbb C)
=
\left\{
\begin{pmatrix}
a&z\\
\bar z&d
\end{pmatrix}
:a,d\in\mathbb R,\ z\in\mathbb C
\right\}.
\]

Entrywise conjugation fixes

\[
H_2(\mathbb R)
=
\left\{
\begin{pmatrix}
a&b\\
b&d
\end{pmatrix}
:a,b,d\in\mathbb R
\right\}.
\]

Because the gauge group acts trivially on both \(E\) and \(D\), it preserves not only the complex corner but also this real slice. The hypercharge obstruction of the charged-lepton \(E\oplus C\) corner is absent.

Writing

\[
t=\frac{a+d}{2},
\quad x=\frac{a-d}{2},
\quad y=b,
\]

gives

\[
\det X=t^2-x^2-y^2.
\]

Hence the positive cone is the three-dimensional Lorentz cone and

\[
\operatorname{Conf}(H_2(\mathbb R))
\cong Sp(4,\mathbb R)
\cong Spin_0(2,3).
\]

## 5. The revised internal bridge

The sixteen-state chain is now

\[
\boxed{
\begin{aligned}
&\text{cyclic fifteen-state matter TRO}\\
&\Longrightarrow
\text{unique ternary-compatible }\nu^c:D\to E\\
&\Longrightarrow
M_3(\mathbb C)_{(E;C,D)}\\
&\Longrightarrow
p_\nu M_3p_\nu\cong M_2(\mathbb C)\\
&\xrightarrow{\text{real fixed points}}
H_2(\mathbb R)\\
&\Longrightarrow
Sp(4,\mathbb R)\cong Spin_0(2,3).
\end{aligned}
}
\]

Every arrow before the choice of real fixed points is selected by matter incidence, ternary closure and gauge neutrality. The real structure and its physical interpretation remain separate gates.

## 6. Neutral-label exchange does not destroy the corner

The completed-carrier permutation exchanges the absolute labels \(O_1\leftrightarrow R\), but it maps relational roles as

\[
D_A\mapsto D_B,
\qquad
E_A\mapsto E_B.
\]

Therefore

\[
p_{\nu,A}=p_{E_A}+p_{D_A}
\longmapsto
p_{E_B}+p_{D_B}=p_{\nu,B}.
\]

The construction is covariant under the survivor exchange. It selects the neutral relational pair without deciding its absolute octonionic/terminal-real labeling.

## 7. The dynamical obstruction

The Peirce corner is a hereditary matrix corner and a Jordan subalgebra, but not a two-sided ideal of the full \(M_3\) factor. The charged arrow \(e^c:C\leftrightarrow E\) connects the common face \(E\) to the omitted direction \(C\).

Consequently generic full-linking dynamics can leak out of the neutrino corner. The compression

\[
\mathcal E_\nu(X)=p_\nu Xp_\nu
\]

is positive and completely positive, and is unital relative to the corner. A later commutant calculation sharpens this concern: an electromagnetism-invariant vacuum two-point kernel cannot contain neutral--charged off-diagonal entries at all, so the neutrino corner is a direct summand of the physical response algebra even though it is not an ideal of the full linking algebra. See [electromagnetic superselection](173_electromagnetic_superselection_protects_neutrino_h2_corner.md). Nontrivial leakage remains possible only in gauge-covariant source kernels, charged backgrounds or symmetry-breaking phases.

Possible mechanisms are:

- boundary access only to the neutral faces \(D,E\);
- a charge superselection rule followed by neutral response;
- Schur elimination of the charged \(C\) channel;
- an energy gap separating the charged-lepton direction;
- the external reciprocity antiunitary selecting the real fixed subcorner.

## 8. Strong synthesis consequence

The right-handed-neutrino extension does not merely coexist with the \(Spin(2,3)\) programme. It improves one of its weakest points.

The old internal \(H_2\) bridge used the charged \(e^c\) relation, so a continuous hypercharge rotation did not preserve its real slice. The new bridge uses the gauge-neutral \(\nu^c\) relation, so the real slice is gauge compatible.

The cost is shifted from gauge covariance to dynamical selection:

\[
\text{old branch: unique simple factor, charged real-slice obstruction},
\]

\[
\text{new branch: canonical neutral corner, non-ideal compression obstruction}.
\]

This is a better-posed problem.

## 9. Stop-everything and falsification gates

**Stop-everything positive:** integrating out the charged \(C\) channel produces exactly the positive causal two-port response on \(D\oplus E\), with the same Schur-composition law and antiunitary real slice as the external walk carrier.

**Gauge success:** the full Standard-Model gauge action, Higgs locking and neutrino Yukawa interaction preserve the induced real response after charged-channel elimination.

**Selection failure:** every positive compression onto \(D\oplus E\) depends on an arbitrary boundary choice unrelated to the matter action.

**Leakage failure:** radiative or unitary dynamics necessarily mixes the omitted \(C\) direction in a way that prevents a closed causal response on the neutral corner.

**Phenomenological failure:** the construction requires a Dirac neutrino spectrum or new neutral state inconsistent with neutrino data.

## 10. Certificate

The [neutrino Peirce-corner certificate](scripts/verify_neutrino_peirce_h2r.mjs) constructs both principal corners inside \(M_3(\mathbb C)\), verifies their matrix/Jordan closure, proves unique gauge triviality of the neutrino corner, checks preservation of its real slice, exhibits failure for the charged corner and verifies the Lorentz-cone determinant.

## Companion documents

- [Unique right-handed-neutrino TRO completion](167_unique_right_handed_neutrino_tro_completion_and_spin23_tradeoff.md)
- [Unique fifteen-state \(M_2\) linking factor](116_unique_m2_linking_factor_to_h2r_spin23.md)
- [Charged real-slice \(U(1)\) no-go](117_charged_real_slice_u1_no_go.md)
- [Walk two-port \(H_2(\mathbb R)\) response](156_walk_two_port_h2r_boundary_response.md)

