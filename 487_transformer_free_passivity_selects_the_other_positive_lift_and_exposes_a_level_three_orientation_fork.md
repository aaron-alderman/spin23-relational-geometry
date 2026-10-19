# Transformer-Free Passivity Selects the Other Positive Lift and Exposes a Level-Three Orientation Fork

**Date:** 17 October 2026  
**Branches:** B01, B02, B04, B05, B06, B07, B09, B10, B12 and B14  
**Claim status:** exact passive-network realization and obstruction; physical port orientation remains open

## 1. Testing the positive lift against an actual passive network

The code-word lift

\[
K_+=\begin{pmatrix}3&2\\2&3\end{pmatrix}
\]

is positive definite. Positivity alone, however, is weaker than realization as the Dirichlet-to-Neumann response of a transformer-free scalar network.

For two boundary ports connected to ground with shunt conductances \(g_1,g_2\ge0\) and mutual conductance \(g_{12}\ge0\), the response is

\[
K(g_1,g_2,g_{12})=
\begin{pmatrix}
g_1+g_{12}&-g_{12}\\
-g_{12}&g_2+g_{12}
\end{pmatrix}.
\]

Every such response has nonpositive off-diagonal entries. Therefore \(K_+\) is not directly realizable in the same-sign port convention by an unsigned scalar graph.

## 2. The ordinary passive network selects \(K_-\)

The other trace-minimal positive lift is

\[
K_-=\begin{pmatrix}3&-1\\-1&3\end{pmatrix}.
\]

It has the exact realization

\[
g_1=2,
\qquad
g_2=2,
\qquad
g_{12}=1.
\]

Modulo three,

\[
K_-\equiv
\begin{pmatrix}0&2\\2&0\end{pmatrix}
=K_{\mathrm{mut}}.
\]

Exhausting nonnegative integer three-edge networks shows that \((2,2,1)\) is the unique realization with minimum total conductance

\[
g_1+g_2+g_{12}=5.
\]

Thus ordinary network minimality selects \(K_-\), not the nonnegative-exponent lift \(K_+\).

## 3. Port reversal realizes \(K_+\)

Let

\[
D=\operatorname{diag}(1,-1)
\]

reverse the orientation of the second boundary port. The ordinary passive response with

\[
(g_1,g_2,g_{12})=(1,1,2)
\]

is

\[
K_{mathrm{net}}=\begin{pmatrix}3&-2\\-2&3\end{pmatrix}.
\]

In the oriented port coordinates,

\[
DK_{mathrm{net}}D=K_+.
\]

Therefore \(K_+\) is passively realizable after one port orientation is reversed. Equivalently, without changing port orientation it requires a signed incidence/common-mode element, such as an ideal transformer or a mediator coupling to \(x_1+x_2\) rather than a voltage difference.

This connects directly to the unresolved determinant-line/ribbon sign: the sign needed to turn common mode into difference mode is precisely a relative port orientation.

## 4. The finite code cannot see the fork

The two lifts differ by

\[
K_+-K_-=
\begin{pmatrix}0&3\\3&0\end{pmatrix}.
\]

This is a level-three integral mutual shear. It lies in the kernel of reduction

\[
Sp(4,\mathbb Z)\longrightarrow Sp(4,\mathbb F_3).
\]

Consequently the qutrit code and its logical Clifford matrix cannot decide between \(K_+\) and \(K_-\). The distinction exists only in the integral/real completion.

## 5. What each selection principle prefers

| principle | preferred lift | extra datum |
|---|---|---|
| nonnegative transvection exponents \((1,1,2)\) | \(K_+\) | sum-current Gram channel |
| unsigned transformer-free scalar network | \(K_-\) | difference-current edge |
| reversed second port | \(K_+\) | relative orientation sign |
| reduction modulo three | neither | both give the same gate |

The fork is productive: it turns the previously abstract absolute-orientation problem into an experimentally meaningful choice of common-mode versus differential response.

## 6. Relation to the Jordan carrier

Both matrices lie in \(H_2(\mathbb R)_{>0}\) and both define integral symplectic shears. The Jordan/\(Spin_0(2,3)\) carrier therefore admits both. What distinguishes them is not the cone or group, but the chosen physical realization of the boundary relation.

A measured two-port response would separate them immediately:

- \(K_{12}>0\): same-sign/common-mode coupling in the declared orientation;
- \(K_{12}<0\): ordinary difference-mode passive coupling.

## 7. Claim ledger

- **Exact:** unsigned grounded scalar networks have nonpositive off-diagonal response.
- **Exact:** \(K_-\) is realized by conductances \((2,2,1)\).
- **Exact:** this is the unique minimum-total-conductance integer network reducing to the mutual qutrit gate.
- **Exact:** \(K_+\) is obtained from the \((1,1,2)\) network by reversing one port.
- **Exact:** \(K_+-K_-\) is a level-three shear invisible modulo three.
- **Open:** physical seam/port orientation and whether the mediator couples to sum or difference current.
- **Not established:** that the network is literal spacetime or that its conductances are fixed Standard-Model couplings.

## 8. Stop-everything and falsification gates

**Stop-everything trigger:** the determinant-line or Higgs polar data fixes the relative port orientation and independently selects the same lift as the microscopic weak-mediator calculation.

**Observable trigger:** a source-derived response observable distinguishes common-mode \(K_+\) from differential-mode \(K_-\).

**Network falsifier:** a transformer-free positive scalar graph is claimed to have positive off-diagonal Dirichlet-to-Neumann entries in a common port orientation.

**Finite-code falsifier:** mod-three logical data is claimed to distinguish matrices differing by three times an integral symmetric form.

**Orientation falsifier:** port reversal is treated as physically meaningful without an oriented determinant-line coupling.

## 9. Certificate

The [passive-network lift certificate](scripts/verify_transformer_free_passive_network_selects_Kminus_not_Kplus.mjs) derives the grounded two-port response, exhausts minimal integer networks, verifies the port-reversal realization and computes the level-three difference.

## Companion documents

- [Positive integral Jordan lift](486_the_three_transvection_word_has_a_positive_integral_jordan_lift_whose_level_three_self_terms_hide_modulo_three.md)
- [Scalar network sewing and invariants](66_scalar_network_subdivision_invariants.md)
- [Domain-wall relative orientation transport](475_domain_wall_pfaffian_spectral_flow_can_transport_the_ribbon_sign_but_cannot_supply_its_absolute_octonion_sewing.md)
- [Wilson–Takagi absolute-orientation obstruction](476_the_wilson_takagi_regulator_fixes_relative_pfaffians_but_leaves_the_absolute_majorana_orientation_free.md)
