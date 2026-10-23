# The 2-State 3-Symbol Universal Machine Selects a Finite Genus-Two Theta Seam but Not Spin(2,3) Dynamics

**Date:** 23 October 2026  
**Status:** exact finite symplectic, affine-theta, separating-normal-line, fixed-curve, Eisenstein-unitary, combined-selector full-$\mathfrak{spin}(2,3)$ Zariski closure, carrier-level quadratic flow, level-three BF gate protocol, rank-one reset-channel defect, Golay, and integral-lift calculations; a global physical Pfaffian line and microscopic control provenance remain open  
**Machine:** Wolfram machine 596440, proved universal by Alex Smith  
**Certificates:** [finite theta-seam and Rule-60/Golay verifier](../../../verification/verify/verify_tm23_genus_two_spin23_shadow.mjs); [odd-odd theta separating-normal verifier](../../../verification/verify/verify_tm23_odd_odd_theta_separating_normal_line.mjs); [Eisenstein transverse full-Spin closure verifier](../../../verification/verify/verify_tm23_eisenstein_transverse_spin23_closure.mjs); [repair-plus-reset open-channel verifier](../../../verification/verify/verify_tm23_repair_plus_rank_one_reset_channel.mjs); [Smith encoding-invariance verifier](../../../verification/verify/verify_tm23_smith_encoding_preserves_only_unmarked_six_point_type.mjs); [Leech affine-orientation verifier](../../../verification/verify/verify_leech_seam_affine_orientation_intertwiner.mjs); [Rule-60/Golay seam-torsor verifier](../../../verification/verify/verify_rule60_golay_kernel_supplies_the_leech_seam_torsor.mjs); [positive-cone causal-orientation verifier](../../../verification/verify/verify_h2_positive_cone_selects_spin23_time_orientation.mjs); [remaining-gates provenance verifier](../../../verification/verify/verify_tm23_remaining_gates_are_provenance_inputs.mjs)

## Result in one sentence

The six state-symbol inputs of the universal $2$-state $3$-symbol machine form, under the exceptional isomorphism $S_6\cong Sp(4,\mathbb F_2)$, a complete genus-two level-two marking: its state rows select an even theta characteristic $q$, its symbol columns select a $q$-singular Lagrangian $L$, and its direction mask selects a nonzero $v\in L$ with the exact affine shift $q_{\rm dir}=q+v$; its uniquely selected reversible repair lifts to an Eisenstein-unitary fixed disk inside $Sp(4,\mathbb R)\cong Spin_0(2,3)$, while the independently selected full equal-discriminant-five integral generator set has Zariski Lie algebra all of $\mathfrak{spin}(2,3)$, but the original irreversible update is not itself a continuous Spin(2,3) action.

## 1. The six-point machine alphabet

Write the local inputs as

\[
\begin{matrix}
A0&A1&A2\\
B0&B1&B2.
\end{matrix}
\]

The machine rule is

\[
\begin{array}{c|c}
\text{input}&(\text{new state},\text{written symbol},\text{move})\\ \hline
A2&(A,1,L)\\
A1&(A,2,L)\\
A0&(B,1,R)\\
B2&(A,0,R)\\
B1&(B,2,R)\\
B0&(A,2,L).
\end{array}
\]

Thus the left-moving set is

\[
D_L=\{B0,A1,A2\},
\]

while the first state row is $R_A=\{A0,A1,A2\}$. The two triples differ by the single transposition $(A0\ B0)$ along the symbol-zero column.

## 2. Exact genus-two interpretation

Let $V=\mathbb F_2^4$ with its standard symplectic form. Genus two has six odd and ten even theta characteristics, and

\[
Sp(4,\mathbb F_2)\cong S_6
\]

through the action on the six odd characteristics. Every even characteristic is the sum of three odd characteristics, with the complementary triple giving the same sum.

Choose any bijection between the six machine inputs and the six odd characteristics. Define

\[
q=A0+A1+A2=B0+B1+B2,
\]

and the three column differences

\[
v_i=Ai+Bi,
\qquad i=0,1,2.
\]

The executable census over all $6!=720$ bijections proves:

\[
\operatorname{Arf}(q)=0,
\]

\[
L=\{0,v_0,v_1,v_2\}
\]

is a two-dimensional Lagrangian subspace, and, more strongly,

\[
q|_L=0.
\]

The grid therefore does not merely choose an arbitrary even characteristic and an arbitrary Lagrangian. It chooses a compatible Göpel-type pair ((q,L)).

The exact census is

\[
10\ \text{even characteristics},\qquad
15\ \text{Lagrangians},\qquad
60\ \text{compatible pairs }(q,L).
\]

Distinguishing the symbol-zero column selects $v=v_0\ne0$ in $L$, giving

\[
180\ \text{triples }(q,L,v).
\]

Each triple has four labelled-grid representatives, so

\[
180\times4=720=|Sp(4,\mathbb F_2)|.
\]

Consequently the result is invariant up to symplectic isomorphism. It is not destroyed by changing the arbitrary initial bijection with a fixed coordinate model of (V).

There is also a direct modular-geometric interpretation. A partition of the six odd characteristics into three pairs labels one of the fifteen zero-dimensional cusps of the level-two genus-two Satake boundary. Its three pairs label the three one-dimensional boundary components meeting at that cusp. The machine's three symbol columns therefore select a genus-two cusp, while its distinguished symbol-zero column selects one boundary component through it. The full matching stabilizer has order

\[
2^3\,3!=48
\]

and is the mod-two Siegel-parabolic quotient underlying $\Gamma_0[2]$. Adding the compatible state characteristic reduces the stabilizer to order $12$, and distinguishing $v$ reduces it to order $4$.

## 3. The direction mask is the missing affine shift

The direction triple is obtained by replacing (A0) with (B0). Therefore

\[
q_{\rm dir}=B0+A1+A2
=q+(A0+B0)
=q+v.
\]

The census proves

\[
v\in L,\qquad q(v)=0,
\]

so $q_{\rm dir}$ is again even. Equivalently, the transposition $(A0\ B0)$ is the finite symplectic transvection associated with $v$, and its affine action carries the state characteristic to the direction characteristic.

This supplies exactly the *type* of affine theta datum left open in [the Leech pair-Gram bridge](../1200-1299/1217_leech_pair_gram_geometry_reaches_spin23_but_needs_an_orientation_twist_and_affine_theta_shift.md). It does not yet prove that the machine-selected $q$ is the same source-selected representative as the corpus characteristic $q_*=(1,1,1,1)$; only their common even orbit is coordinate invariant.

## 4. Direction reversal supplies an orientation line

Order each direction triple by symbol. Relative to the state order

\[
(A0,A1,A2\mid B0,B1,B2),
\]

the direction order

\[
(B0,A1,A2\mid A0,B1,B2)
\]

is odd. Reversing left and right exchanges two blocks of size three and hence changes orientation by

\[
(-1)^{3\cdot3}=-1.
\]

The machine therefore carries a genuine one-dimensional sign representation associated with seam reversal. This is a concrete candidate for the orientation-sensitive datum required to distinguish

\[
L_{15}\oplus L_{15}
\quad\text{from}\quad
L_{15}\oplus L_{15}(-1).
\]

The finite sign does not by itself prove that a Leech discriminant form changes sign. That requires an explicit intertwiner from the ordered machine seam to the determinant or Pfaffian line of the lattice construction.

### 4A. The orientation line has an analytic theta realization

The corpus selector $q_*=(1,1,1,1)$ decomposes on a separating genus-two surface as the odd characteristic on the first elliptic handle times the odd characteristic on the second. Put

\[
\Omega_\epsilon=
\begin{pmatrix}
\tau_1&\epsilon\\
\epsilon&\tau_2
\end{pmatrix}.
\]

At $\epsilon=0$, the corresponding theta constant factors into two vanishing odd theta constants:

\[
\theta[q_*](0\mid\Omega_0)
=\theta_1(0\mid\tau_1)\theta_1(0\mid\tau_2)=0.
\]

Expanding the defining theta series in the off-diagonal normal coordinate gives

\[
\theta[q_*](0\mid\Omega_\epsilon)
=\frac{\epsilon}{2\pi i}
\theta_1'(0\mid\tau_1)\theta_1'(0\mid\tau_2)
+O(\epsilon^3).
\]

Equivalently, in the sewing convention $\Omega_{12}=2\pi i t$, Jacobi's derivative formula gives

\[
\theta[q_*](0\mid\Omega_t)
=4\pi^2t\,\eta(\tau_1)^3\eta(\tau_2)^3+O(t^3),
\]

up to the characteristic-sign convention. The theta-null therefore vanishes simply along the separating divisor, and its normal line is the product of the two odd-spin derivative lines. Under independent modular transformations of the two handles, $t$ has weight $(-1,-1)$ while $\eta^3(\tau_1)\eta^3(\tau_2)$ has weight $(3/2,3/2)$, including its metaplectic multiplier. Their product has weight $(1/2,1/2)$, exactly the restriction of a genus-two theta constant. Moreover,

\[
\theta[q_*](0\mid\Omega_{-\epsilon})
=-\theta[q_*](0\mid\Omega_\epsilon).
\]

Thus the finite sign under left/right seam reversal is not merely a permutation sign: it is realized by the analytic normal coordinate to the separating theta divisor. This is the precise genus-two counterpart of the product orientation line $L_1\otimes L_2$ selected independently by the matched-handle branch.

The selected order-three repair also becomes handle-separated after one compatible marking:

\[
\widetilde M_3=
\begin{pmatrix}
-2&0&-3&0\\
0&-2&0&3\\
1&0&1&0\\
0&-1&0&1
\end{pmatrix}.
\]

In the handle order $(a_1,b_1)\oplus(a_2,b_2)$ its two blocks are

\[
\begin{pmatrix}-2&-3\\1&1\end{pmatrix},
\qquad
\begin{pmatrix}-2&3\\-1&1\end{pmatrix}.
\]

Both lie in $SL(2,\mathbb Z)$, have trace $-1$, and have exact order three. The unique finite repair selected in Section 5 is therefore literally a matched order-three action on the two elliptic handles. This closes the analytic *orientation* seam. It still does not globally identify the theta-normal line with an anomaly-free real Pfaffian line or derive a physical evolution law.

### 4B. What the fermionic interpretation does and does not close

Chiral bosonization identifies the spin-structure-dependent factor of a complex chiral-fermion determinant with the corresponding theta constant, up to determinant-line factors common to the spin structure. Here $q_*$ is even in genus two but degenerates to odd on each torus. Each odd elliptic spin structure has a zero mode, and plumbing the two handles couples those modes. The linear $t\theta_1'\theta_1'$ term is therefore the expected lifting of the odd-odd zero-mode pair.

Locally, two real zero modes have the skew coupling

\[
D_0(t)=
\begin{pmatrix}
0&t\\
-t&0
\end{pmatrix},
\qquad
\operatorname{Pf}D_0(t)=t,
\qquad
\det D_0(t)=t^2.
\]

Seam reversal $t\mapsto-t$ flips the Pfaffian but not its determinant. This explains why the machine's reversal sign has exactly the right local form to orient a fermionic zero-mode line. It upgrades the result from a bare permutation sign to a standard fermionic determinant-line mechanism.

The remaining qualification is decisive. Complex bosonization supplies a determinant section; a globally signed Majorana Pfaffian requires a real structure, an orientation of the Pfaffian line, and an anomaly check. None of those data follows from the six-state machine. Nor does this worldsheet construction select the noncompact real form $Spin_0(2,3)$ or make the machine update a physical time evolution. The result is therefore a valid local Pfaffian *model*, not yet the programme's physical Pfaffian.

### 4C. The selected order-three fixed fibre has no residual normal phase

The two handle blocks are related by the determinant-minus-one reflection $R=\operatorname{diag}(1,-1)$:

\[
M_2=RM_1R^{-1}.
\]

Their fixed points in the upper half-plane are

\[
\tau_1^*=\frac{-3+i\sqrt3}{2},
\qquad
\tau_2^*=\frac{3+i\sqrt3}{2}.
\]

At these points their modular automorphy factors are inverse:

\[
c_1\tau_1^*+d_1=e^{2\pi i/3},
\qquad
c_2\tau_2^*+d_2=e^{-2\pi i/3},
\]

so

\[
(c_1\tau_1^*+d_1)(c_2\tau_2^*+d_2)=1.
\]

The separating normal transforms to first order as

\[
t\longmapsto
\frac{t}{(c_1\tau_1+d_1)(c_2\tau_2+d_2)}.
\]

It therefore has eigenvalue $+1$ at the paired order-three fixed fibre. Since the odd-odd theta-normal derivative there is nonzero, its two metaplectic phases also cancel in the product: the selected cyclic action has no residual phase on this normal line. This is an exact local anomaly-cancellation result for the preferred repair. It is not a proof that the Pfaffian line is globally orientable away from this fibre or around every loop in moduli space.

### 4D. The invariant seam extends to an exact Siegel fixed curve

Write a general genus-two period matrix as

\[
\Omega=\begin{pmatrix}x&z\\z&y\end{pmatrix}.
\]

For the selected lift, the fixed-point equation

\[
\widetilde M_3\cdot\Omega=\Omega
\]

reduces exactly to

\[
x^2-z^2+3x+3=0,
\qquad
z(x-y+3)=0,
\qquad
z^2-y^2+3y-3=0.
\]

The component through the separating point is therefore the one-complex-dimensional curve

\[
y=x+3,
\qquad
z^2=x^2+3x+3.
\]

At $z=0$ it contains $(x,y)=(\tau_1^*,\tau_2^*)$. For sufficiently small $z$, the imaginary part of $\Omega$ remains positive definite, so this is an actual analytic curve inside the Siegel upper half-space, not only a formal tangent direction. The executable certificate substitutes several interior points into the full fractional-linear $Sp(4,\mathbb Z)$ action and obtains zero residual to numerical precision.

This materially strengthens the portal: the sewing coordinate is not merely preserved to first order. It deforms along an exact family of principally polarized abelian surfaces carrying the selected order-three symmetry. Fixed loci of finite group actions in Siegel space are the standard source of special subvarieties; Sections 4E–4F identify the continuous and integral centralizers of this component.

### 4E. The fixed curve is an exact rank-one Spin portal

Let the two handle blocks be $M_1$ and $M_2$. They satisfy

\[
M_i^2+M_i+I=0,
\qquad
M_2=RM_1R^{-1},
\qquad
R^TJR=-J,
\]

where $R=\operatorname{diag}(1,-1)$ and $J$ is the rank-two symplectic form. After using $R$ to identify the second handle representation with the first, the four-dimensional real symplectic space becomes two copies of the same complex order-three line, but their symplectic forms have opposite signs. The associated Hermitian multiplicity space consequently has signature $(1,1)$.

It follows that the real symplectic centralizer of the selected order-three element is

\[
U(1,1)\subset Sp(4,\mathbb R),
\]

with semisimple factor

\[
SU(1,1)\cong SL(2,\mathbb R)\cong Spin_0(2,1).
\]

Its symmetric domain is

\[
U(1,1)/(U(1)\times U(1))\cong\mathbb D,
\]

and is precisely the one-complex-dimensional fixed domain found in Section 4D. Therefore the selected repair determines the exact continuous chain

\[
C_3
\subset U(1,1)
\subset Sp(4,\mathbb R)
\cong Spin_0(2,3),
\]

whose noncompact dynamical factor is $Spin_0(2,1)$. This is substantially stronger than the generic $2\times3$ dimension match in Section 8: it is a source-selected rank-one noncompact subgroup and symmetric subdomain inside the desired ambient group.

By itself it selects only a rank-one portal, not all of $Spin_0(2,3)$. Section 4G supplies an independently selected transverse generator and proves full algebraic closure; the need for a physical reason to promote those arithmetic generators to dynamics remains.

### 4F. The integral fixed curve is Eisenstein-unitary

Let $\omega^2+\omega+1=0$. In the integral bases

\[
P_1=\begin{pmatrix}1&-2\\0&1\end{pmatrix},
\qquad
P_2=\begin{pmatrix}1&-2\\0&-1\end{pmatrix},
\]

both handle blocks become multiplication by $\omega$:

\[
M_iP_i=P_i
\begin{pmatrix}0&-1\\1&-1\end{pmatrix}.
\]

The determinants are $\det P_1=+1$ and $\det P_2=-1$. Hence the two integral symplectic planes become rank-one modules over the Eisenstein integers $\mathbb Z[\omega]$ with opposite Hermitian signs. The lattice is therefore the Eisenstein Hermitian module

\[
\bigl(\mathbb Z[\omega]^2,\operatorname{diag}(1,-1)\bigr).
\]

Consequently the integral centralizer is the arithmetic unitary group

\[
U\!\left(\operatorname{diag}(1,-1);\mathbb Z[\omega]\right)
\subset Sp(4,\mathbb Z).
\]

Because the Hermitian form represents zero—for example on $(1,1)$—the quotient of the fixed disk is noncompact. Thus the exact fixed curve descends to an Eisenstein unitary Shimura/modular curve with cusps. Determining its minimal conventional congruence-group name would be useful for tables and coordinates, but is not required for the exact arithmetic identification.

This supplies a considerably sharper chain:

\[
TM_{2,3}^{\rm repaired}
\rightsquigarrow C_3
\subset U(1,1;\mathbb Z[\omega])
\subset Sp(4,\mathbb Z)
\subset Sp(4,\mathbb R)
\cong Spin_0(2,3).
\]

The dashed first arrow remains essential: the original machine rule is irreversible, while $C_3$ is the uniquely selected one-arrow reversible completion.

### 4G. The continuous centralizer plus the arithmetic shear closes the full algebra

The equal-discriminant-five branch independently selected the integral mutual shear

\[
K=
\begin{pmatrix}
1&0&0&0\\
0&1&0&0\\
3&2&1&0\\
2&3&0&1
\end{pmatrix}.
\]

It is a generator of the order-$9216$ mod-four selector group used in Section 5 and preserves the same characteristic $q_*=(1,1,1,1)$. Since

\[
N=K-I,
\qquad N^2=0,
\qquad K=e^N,
\]

$N$ is a canonical integral nilpotent direction transverse to the Eisenstein centralizer.

The order-three repair also canonically determines the compact turn

\[
Z=2\widetilde M_3+I,
\qquad Z^2=-3I.
\]

Thus $Z/\sqrt3$ is a complex structure and generates the central $\mathfrak u(1)$ missing from the semisimple $\mathfrak{su}(1,1)$ factor. An exact matrix Lie-closure computation gives

\[
\dim\mathfrak z_{\mathfrak{sp}_4}(\widetilde M_3)=4,
\qquad
[\mathfrak z,\mathfrak z]\cong\mathfrak{su}(1,1),
\quad \dim=3,
\]

and

\[
\dim\operatorname{Lie}\langle
\mathfrak{su}(1,1),Z,N
\rangle=10.
\]

Because $\dim\mathfrak{sp}(4,\mathbb R)=10$, this proves

\[
\operatorname{Lie}\langle
\mathfrak{su}(1,1),Z,N
\rangle
=\mathfrak{sp}(4,\mathbb R)
\cong\mathfrak{spin}(2,3).
\]

The compact turn is essential: $\mathfrak{su}(1,1)$ plus $N$ alone closes to dimension six, not ten. Equivalently, the full closure is not obtained merely by naming the fixed disk and adding any transverse direction; it uses the phase/complex-structure datum encoded by the source-selected $C_3$.

This completes the *continuous-envelope* transverse-generator calculation using two independently selected arithmetic inputs:

1. the machine branch selects $\widetilde M_3$, hence its Eisenstein $\mathfrak u(1,1)$ centralizer and compact turn $Z$;
2. the equal-discriminant-five branch selects the characteristic-preserving shear $K$ and nilpotent direction $N$.

What it does **not** prove is equally important. Passing from a finite element $\widetilde M_3$ to its full $U(1,1)$ centralizer and the one-parameter flow generated by $Z$ is a continuous completion, and the machine does not execute $K$ as one of its transition rules. Indeed, the stricter discrete pair $\langle\widetilde M_3,K\rangle$ has only a six-dimensional Zariski Lie closure. The calculation above proves a full source-compatible continuous envelope, not that the two discrete matrices alone force the full group.

### 4H. The full arithmetic selector is Zariski-dense in the Spin(2,3) carrier

The equal-discriminant-five integral group contains, in addition to $K$, the same trace-three hyperbolic element on each handle. Its active block is

\[
h=\begin{pmatrix}0&-1\\1&3\end{pmatrix}.
\]

Because $\operatorname{tr}h=3$ and $\det h=1$, the connected real split torus containing $h$ has Lie direction proportional to

\[
x_h=2h-3I=
\begin{pmatrix}-3&-2\\2&3\end{pmatrix}.
\]

Embed this direction on the first and second handles to obtain $X_1$ and $X_2$. The executable calculation gives

\[
\operatorname{rank}\{X_1,X_2,N\}=3,
\]

but their iterated brackets satisfy

\[
\dim\operatorname{Lie}\langle X_1,X_2,N\rangle=10.
\]

Therefore

\[
\operatorname{Lie}\langle X_1,X_2,N\rangle
=\mathfrak{sp}(4,\mathbb R)
\cong\mathfrak{spin}(2,3),
\]

and the integral group generated by the two handle elements and mutual shear is Zariski-dense in $Sp(4,\mathbb R)$. This conclusion needs no continuous-centralizer assumption: the three Lie directions arise from the connected Zariski closures of actual infinite-order integral cyclic subgroups.

The comparison is now sharp:

\[
\dim\operatorname{Lie}\overline{\langle\widetilde M_3,K\rangle}^{\,Z}=6,
\]

whereas

\[
\dim\operatorname{Lie}\overline{\langle H_1,H_2,K\rangle}^{\,Z}=10.
\]

Thus the repaired machine element and one shear do **not** force full Spin(2,3); the complete independently selected arithmetic handle system does. The machine branch contributes a distinguished finite-order seam, fixed disk, theta characteristic, and orientation *inside* that already full arithmetic carrier. This is a stronger combined-programme result and a stricter limitation on claims of machine-only emergence.

### 4I. The arithmetic generators have an exact quadratic-Hamiltonian realization

In standard TKK coordinates, write

\[
X=\begin{pmatrix}A&B\\C&-A^T\end{pmatrix},
\qquad B=B^T,quad C=C^T.
\]

Let $T_i,H_i,K_i$ denote respectively the translation, structure/dilation and special-conformal generators in the two diagonal Peirce channels. The two trace-three logarithmic directions have the fixed decomposition

\[
X_i=2K_i-3H_i-2T_i,
\qquad i=1,2,
\]

while the mutual shear is the pure special-conformal channel

\[
N=K\!\left(\begin{pmatrix}3&2\\2&3\end{pmatrix}\right).
\]

These are precisely the channel types already present in the programme's Jordan/TKK response construction; no new kind of continuous generator has been added.

For the canonical symplectic matrix $J$, every such direction is generated by the symmetric quadratic Hamiltonian Hessian

\[
G_X=-JX,
\qquad
\mathcal H_X(\xi)=\frac12\xi^TG_X\xi.
\]

Writing $\xi=(q_1,q_2,p_1,p_2)$, the three Hamiltonians may be chosen as

\[
\mathcal H_1=-q_1^2-3q_1p_1-p_1^2,
\]

\[
\mathcal H_2=-q_2^2-3q_2p_2-p_2^2,
\]

and

\[
\mathcal H_N=-\frac12
\left(3q_1^2+4q_1q_2+3q_2^2\right).
\]

Their finite times are not fitted. Since the active handle direction $x_h$ satisfies $x_h^2=5I$,

\[
h=\exp(t_hx_h),
\qquad
t_h=\frac{\operatorname{arcosh}(3/2)}{\sqrt5}
\approx0.430408940964,
\]

while

\[
K=\exp(N)=I+N
\]

at unit time. A piecewise-constant quadratic Hamiltonian control system using these three channels therefore reproduces the exact integral arithmetic generators, and its Lie-algebra rank is ten. It is locally accessible on the full connected $Sp(4,\mathbb R)$ carrier; full controllability additionally requires that the channel amplitudes or durations can be reversed.

This closes the carrier-level action/flow construction. It does not close microscopic provenance. The face Hamiltonians are hyperbolic and indefinite, so they are not stable autonomous energies. They are legitimate response or driven-control generators, but a physical model must still derive their switching, signs and normalization from declared fields, boundary conditions, or an interface protocol.

### 4J. Reduction modulo three gives the exact nine-state BF gate protocol

The same three integral maps reduce modulo three without changing their roles. Each trace-three handle block becomes

\[
h\bmod3=
\begin{pmatrix}0&-1\\1&0\end{pmatrix},
\]

the order-four Fourier transformation on one finite symplectic handle. The mutual shear has order three and reduces to the cross-handle phase/shear supplied by the level-three BF theory.

An exhaustive finite closure gives

\[
\left\langle
h_1\bmod3,
h_2\bmod3,
K\bmod3
\right\rangle
=Sp(4,\mathbb F_3),
\]

with

\[
|Sp(4,\mathbb F_3)|=51840.
\]

On the irreducible Heisenberg representation of $\mathbb F_3^4$, this acts on a nine-dimensional Hilbert space. The generator orders and interpretations are

\[
(4,4,3)
=
(\text{handle-1 Fourier},
\text{handle-2 Fourier},
\text{mutual BF phase}).
\]

The repaired machine cycle itself reduces to

\[
\widetilde M_3\bmod3
=
\begin{pmatrix}
I&0\\
\operatorname{diag}(1,-1)&I
\end{pmatrix}.
\]

Its nilpotent part has rank two and square zero, so this order-three gate is exactly a pair of oppositely oriented local self shears. On the two-qutrit Hilbert space these are opposite local quadratic phase/Dehn-twist gates. The machine-selected seam therefore has a direct finite dynamical meaning inside the BF protocol; it is not merely known to belong abstractly to the generated group.

This is the exact finite protocol anticipated by the level-three BF branch: two local face operations plus one mutual relation generate the entire two-qutrit Clifford/symplectic carrier. It is also the finite reduction of the same integral maps whose logarithmic directions give the full real Spin(2,3) carrier.

The dynamical chain is therefore exact at carrier level:

\[
\begin{array}{ccc}
\text{quadratic Hamiltonian channels}
&\xrightarrow{\text{exact finite times}}&
H_1,H_2,K\subset Sp(4,\mathbb Z)\\[2mm]
&&\downarrow\bmod3\\[2mm]
&&Sp(4,\mathbb F_3)\curvearrowright\mathbb C^9.
\end{array}
\]

What remains conditional is the physical existence of the level-three topological sector. As established in claim 1169, it requires gauging, anomaly inflow, or an emergent gapped interface plus the relevant compact two-cycle sector. The finite protocol is exact if that sector exists; its realization in the declared microscopic theory remains open.

## 5. The local update is a one-arrow irreversible defect

Discarding the move direction, the state-symbol output map is

\[
A2\to A1,
\quad A1\to A2,
\quad A0\to B1,
\quad B2\to A0,
\quad B1\to B2,
\quad B0\to A2.
\]

It has five outputs: $A2$ has two preimages and $B0$ has none. Hence it is not a permutation of the six odd characteristics and cannot itself be an element of $Sp(4,\mathbb F_2)$, $Sp(4,\mathbb Z)$, or $Spin_0(2,3)$.

There are exactly two Hamming-distance-one reversible completions:

1. redirect $A1\to B0$, producing cycle type $(3)(3)$ and order $3$;
2. redirect $B0\to B0$, producing cycle type $(3)(2)(1)$ and order $6$.

Thus the actual machine rule is precisely one local arrow away from either of two finite symplectic permutations. This makes “symmetry-breaking defect” an exact finite statement, not yet a physical interpretation.

More strongly, the direction characteristic is dynamically invariant. The rule maps

\[
\{B0,A1,A2\}\longrightarrow\{B0,A1,A2\}
\]

and

\[
\{A0,B1,B2\}\longrightarrow\{A0,B1,B2\}.
\]

On the right triple it is a three-cycle. On the left triple it is the rank-defective map in which $A1$ and $B0$ collide at $A2$. Both reversible completions remain inside the same two triples. Consequently both completions fix $q_{\rm dir}$, while neither fixes the original state-row characteristic $q$.

### 5A. The actual rule is the selected gate followed by one reset defect

Let $U$ be the selected $(3)(3)$ completion, so its left cycle is

\[
A1\longrightarrow B0\longrightarrow A2\longrightarrow A1.
\]

Define the idempotent reset $R$ by

\[
R(B0)=A2,
\qquad
R(x)=x\quad(x\ne B0).
\]

Then the actual local state-symbol map factors exactly as

\[
P_{\rm actual}=R\,U.
\]

Here

\[
\operatorname{rank}U=6,
\qquad
\operatorname{rank}R
=\operatorname{rank}P_{\rm actual}=5,
\qquad
R^2=R.
\]

Thus the repaired dynamics consists of two disjoint $C_3$ cycles, while the actual rule consists of the surviving right $C_3$, a left $C_2$ attractor $A1\leftrightarrow A2$, and the depth-one transient $B0\to A2$. The single reset converts one order-three sector into an order-two attractor without destroying the direction partition or $q_{\rm dir}$.

There is a minimal Kraus-rank-two quantum-channel extension that preserves the five-dimensional complement coherently:

\[
K_0=I-|B0\rangle\langle B0|,
\qquad
K_1=|A2\rangle\langle B0|.
\]

It satisfies

\[
K_0^\dagger K_0+K_1^\dagger K_1=I
\]

and implements the classical reset on every basis state. Consequently the actual rule admits the exact open-system factorization

\[
\rho\longmapsto
\Phi_R(U\rho U^\dagger),
\]

where $\Phi_R$ transfers the $B0$ population to $A2$ and erases coherences involving $B0$. The channel is trace-preserving but nonunital.

This makes “symmetry-breaking defect” dynamically precise: it is one rank-one reset after the selected symplectic gate. The CPTP extension is not unique unless coherent preservation of the orthogonal complement is imposed; with that condition, its Kraus rank and minimal dilation are fixed as follows.

### 5B. The reset has a minimal qubit collision dilation, but not a finite-time damping realization

The two Kraus operators are linearly independent, so the channel's Choi rank is two. Hence every exact Stinespring realization needs an environment of dimension at least two, and a single qubit is sufficient. Initialize an environment qubit in $|0\rangle_E$ and let a joint unitary exchange

\[
|B0,0\rangle\longleftrightarrow |A2,1\rangle
\]

while fixing the other ten basis vectors of the six-by-two joint space. Tracing out the qubit gives exactly $K_0$ and $K_1$ above. Equivalently, on the exchanged two-plane one may use

\[
H_{\rm int}=\frac{\pi}{2}
\left(
 |A2,1\rangle\langle B0,0|
 +|B0,0\rangle\langle A2,1|
\right)
\]

for unit time. Its $-i$ exchange phases do not alter the reduced channel. Repeating the irreversible TM step requires a fresh qubit, or resetting the same qubit, at every step: the missing branch information has been exported to the environment rather than destroyed by the joint evolution.

This exact collision should not be confused with ordinary finite-rate amplitude damping. For the Lindblad jump

\[
L=|A2\rangle\langle B0|,
\]

the surviving $B0$ population at finite time is $e^{-\gamma t}$ times its initial value. It therefore equals the exact reset only in the singular limit $\gamma t\to\infty$, whereas the collision unitary realizes it at one finite discrete step. The microscopic identity of the qubit, the mechanism that refreshes it, and the coupling that synchronizes the collision with the TM update remain open physical inputs. This is a sharper falsification boundary: a proposed realization must supply a discrete collision/projective mechanism or explain an effective singular-rate limit; a generic finite-time Markov decay is insufficient.

### 5C. The defect exports one seam qubit and leaves a five-dimensional noiseless sector

As a superoperator on the $36$-dimensional operator space, $\Phi_R$ is idempotent. Its fixed image is the complete matrix algebra on the complement of $|B0\rangle$:

\[
\operatorname{im}\Phi_R\cong M_5,
\qquad
\dim\operatorname{im}\Phi_R=25,
\qquad
\dim\ker\Phi_R=11.
\]

It is therefore not an entanglement-breaking channel: it acts identically on a five-dimensional noiseless subsystem and preserves entanglement encoded there. The irreversibility is sharply localized to the $B0$ seam direction.

The complementary channel shows where that direction goes. On the two-plane spanned by $|A2\rangle$ and $|B0\rangle$, the collision sends

\[
\bigl(\alpha|A2\rangle+\beta|B0\rangle\bigr)|0\rangle_E
\longmapsto
|A2\rangle\bigl(\alpha|0\rangle_E+\beta|1\rangle_E\bigr),
\]

up to the removable exchange phase. The full seam qubit has moved into the environment. For superpositions of $|B0\rangle$ with any of the other four complement states, the same unitary stores the phase in system-environment correlations. Thus the reduced machine loses branch information, but the closed dilation conserves it. Genuine repeated erasure occurs only when the outgoing environment records are discarded or reinitialized; this identifies the fresh-ancilla supply, rather than the $Sp(4)$ gate, as the thermodynamic resource that a microscopic realization must explain.

The stabilizer of an even genus-two characteristic in $Sp(4,\mathbb F_2)$ has order $72$. Since every even characteristic lies in one symplectic orbit, a change of marking can identify the machine's $q_{\rm dir}$ with the discriminant-five characteristic $q_*=(1,1,1,1)$ from [claim 497](../0400-0499/497_the_equal_discriminant_five_mod_four_defect_selects_an_even_genus_two_theta_characteristic.md). Under that marking, both reversible completions lie in the same exact order-$72$ subgroup selected independently by the arithmetic branch.

This removes a group-theoretic mismatch but not the source-identification problem: a canonical intertwiner must still show that the machine seam and the discriminant-five construction choose the same marked characteristic, rather than two coordinates in the common even orbit.

The stronger matched-handle orientation law resolves the apparent ambiguity between the two reversible completions. Let

\[
H_{\rm match}=S_3\times_{\mathbb Z_2}S_3,
\qquad |H_{\rm match}|=18,
\]

be the independently derived binary image of the equal-discriminant-five branch. The certificate exhausts all $72$ symplectic markings carrying the machine's $q_{\rm dir}$ to $q_*$. It finds

\[
\begin{array}{c|c}
\text{completion}&\text{markings placing it in }H_{\rm match}\\ \hline
(3)(3)&72/72\\
(3)(2)(1)&0/72.
\end{array}
\]

Therefore the distinction is independent of the chosen identification of the two even characteristics. The matched-handle line uniquely selects

\[
A1\longrightarrow B0,
\]

which restores the left triple to the three-cycle

\[
A1\longrightarrow B0\longrightarrow A2\longrightarrow A1.
\]

The actual irreversible rule is obtained from this selected order-three symplectic completion by replacing the first arrow with $A1\to A2$. The alternative $B0\to B0$ repair violates the matched-handle orientation in every compatible marking.

The selection also survives the stronger mod-four gate. Lift each of the $72$ compatible binary markings by the certificate's canonical word in integral symplectic transvections, conjugate the exact order-three matrix $M_3$, and reduce modulo four. All $72$ resulting matrices lie in

\[
G_{(5,5)}(4),
\qquad |G_{(5,5)}(4)|=9{,}216.
\]

Thus the selected completion admits an exact finite-order integral realization in the kernel of the unique mod-four obstruction character whose infinitesimal restriction is $\ell$. The machine seam now passes all three existing algebraic layers:

\[
\begin{array}{ccl}
\text{even theta layer} &:& q_{\rm dir}\sim q_*,\\
\text{matched orientation layer} &:& (3)(3)\in H_{\rm match},\\
\text{first congruence layer} &:& M_3\bmod4\in G_{(5,5)}(4).
\end{array}
\]

This proves compatibility with the corpus's arithmetic character. Section 4A realizes its reversal sign on the analytic theta-normal line, but does not prove that this line is a physical Pfaffian line; that identification remains a gate.

## 6. Both reversible completions lift integrally

Using the standard affine action of $Sp(4,\mathbb Z)$ on genus-two theta characteristics, the certificate constructs explicit integral symplectic matrices whose reductions act as the two machine completions themselves.

For the $(3)(3)$ completion, one lift is

\[
M_3=
\begin{pmatrix}
1&0&-3&-3\\
2&-1&-3&-2\\
0&1&-2&-2\\
1&-1&0&0
\end{pmatrix},
\qquad
M_3^3=I.
\]

For the $(3)(2)(1)$ completion, one lift is

\[
M_{12}=
\begin{pmatrix}
7&6&-1&-3\\
45&36&-3&-22\\
102&81&-8&-48\\
75&61&-6&-36
\end{pmatrix},
\qquad
M_{12}^{12}=I,
\]

with no smaller positive power equal to the identity. Its mod-two action has order six. Thus this explicit integral lift doubles the finite order:

\[
6\longmapsto12.
\]

This order doubling is forced among finite-order lifts. If an order-six integral lift $N$ existed, then $N^3$ would be an integral symplectic involution. Modulo two, however, the cube of a $(3)(2)(1)$ permutation is a single transposition, hence a symplectic transvection with

\[
\operatorname{rank}_{\mathbb F_2}(N^3-I)=1.
\]

Every noncentral integral symplectic involution has the normal form

\[
\begin{pmatrix}
x&a&0&c\\
b&-x&-c&0\\
0&d&x&b\\
-d&0&a&-x
\end{pmatrix},
\qquad
ab-cd+x^2=1.
\]

Reducing all sixteen possible parity classes of this normal form gives only

\[
\operatorname{rank}_{\mathbb F_2}(N^3-I)\in\{0,2\},
\]

never rank one. Therefore no order-six integral lift exists. Since reduction cannot increase element order and an order-twelve lift has been exhibited, twelve is the minimum finite order.

The forced doubling is a concrete lift-sensitive sign phenomenon, but the matched-handle calculation rejects this completion as the preferred seam. It remains a useful negative control: the arithmetic orientation law chooses the undoubled order-three lift instead. For the selected repair, Section 4A now supplies the separating theta-normal transformation law; the stronger physical Pfaffian interpretation remains open.

## 7. Independent Rule-60/Golay route

The interior of the left-compressed evolution follows additive Rule 60. On a cyclic 23-bit word this is

\[
T=1+\sigma,
\]

where $\sigma$ is the cyclic shift. Since the binary Golay code $G_{23}$ is cyclic, $T$ preserves all $4096$ codewords.

The certificate computes

\[
\ker(T|_{G_{23}})=\{0,\mathbf1\},
\qquad
\dim\operatorname{im}(T|_{G_{23}})=11.
\]

On that image,

\[
\operatorname{ord}(T)=2047=2^{11}-1=23\cdot89.
\]

This is an exact closed Golay dynamics, unlike Rule 30's 48-word return locus. It yields the arithmetic chain

\[
TM_{2,3}^{\rm compressed}
\longrightarrow Rule\ 60\curvearrowright G_{23}
\longrightarrow G_{24}
\longrightarrow \text{Leech/Conway}
\longrightarrow \text{genus-two }Sp(4).
\]

The caution is equally exact: every linear cellular automaton that is a polynomial in the cyclic shift preserves every cyclic code. Golay preservation alone is not a unique fingerprint of this machine or of Spin(2,3). The maximal order (2047) is the more selective arithmetic fact.

## 8. Continuous Spin(2,3) shadow

For a $2+3$ splitting of a five-dimensional quadratic space,

\[
\mathbb R^{2,3}=U_2\oplus W_3,
\]

the adjoint representation decomposes as

\[
\mathfrak{so}(2,3)
\cong\Lambda^2U\oplus(U\otimes W)\oplus\Lambda^2W,
\]

with dimensions

\[
1+6+3=10.
\]

The six machine inputs have exactly the $2\times3$ incidence pattern of the mixed sector $U\otimes W$, and the mixed bivectors generate the full algebra under brackets. This dimension match alone is generic to a labelled $2\times3$ array. Sections 4E–4G replace it with the more discriminating result: the repaired machine selects an Eisenstein $U(1,1)$ centralizer and compact turn, while the independent mod-four branch supplies a characteristic-preserving transverse shear, and those data close to all ten generators.

The bounded portal is therefore

\[
TM_{2,3}
\longrightarrow(q,L,v,\operatorname{or})
\subset Sp(4,\mathbb F_2)
\longleftarrow Sp(4,\mathbb Z)
\subset Sp(4,\mathbb R)
\cong Spin_0(2,3).
\]

The left arrow, selected integral lift, separating theta-normal orientation, noncompact $U(1,1)$ real form, and full transverse $\mathfrak{sp}(4,\mathbb R)$ closure are now exact. Causal orientation, global Pfaffian data, and the promotion from arithmetic compatibility to physical dynamics remain open.

## 9. What universality does and does not add

Alex Smith's proof establishes universality by emulation of two-colour cyclic tag systems. Universality means the machine can emulate arbitrary computation after suitable encoding; it does not single out symplectic geometry, gravity, or this programme. The Spin(2,3) relevance comes from the machine's six-point level-two geometry, direction transvection, orientation sign, and Golay-preserving compressed subsystem—not from universality alone.

## 10. Decisive next gates

### A. Pfaffian-line identification

The preferred $(3)(3)$ repair now has an explicit integral lift, passes the mod-four selector, splits into matched order-three handle actions, and acts on the separating theta-normal line. Standard chiral bosonization supplies a complex determinant interpretation and the two-zero-mode model supplies the local Pfaffian sign. [Claim 1792](1792_the_remaining_tm23_spin23_gates_are_provenance_inputs_not_missing_carrier_algebra.md) identifies the remaining type boundary: a global Pfaffian line is not defined until a real skew-adjoint fermion family and parameter base are supplied. Its anomaly and orientation cannot be inferred from the finite theta multiplier alone.

### B. Leech seam intertwiner

The algebraic intertwiner is now explicit in [claim 1790](1790_the_leech_seam_needs_one_affine_orientation_bit_to_intertwine_sign_and_theta_shift.md). Bare reversal of

\[
L_{15}\oplus L_{15}(-1)
\]

changes the ternary lattice sign but fixes the binary norm refinement, so orientation alone cannot induce $q\mapsto q+v$. The minimal repair retains one affine orientation bit: reversal exchanges the summands and toggles that bit, simultaneously sending the hyperbolic ternary form to its negative and shifting the binary refinement by the selected linear functional. [Claim 1793](1793_the_rule60_golay_kernel_supplies_the_unique_tm23_leech_affine_seam_torsor.md) closes its finite provenance: every Rule-60 image word has the two antecedents $c,c+\mathbf1$, and the unique nonzero isomorphism from this kernel line to the machine-selected line sends $\mathbf1\mapsto v$. Only a physical interface realization remains open.

### C. Encoding invariance

The audit is now complete in [claim 1789](1789_smiths_tm23_compiler_preserves_the_unmarked_genus_two_type_but_not_the_marked_qlv_triple.md). A uniform $1\leftrightarrow2$ colour exchange stabilizes the selected $(q,L,v)$, but Smith's system-2/system-3 compiler applies that exchange only on one side of the active head and passes through nine-element three-state carriers. Hence no single globally marked six-point fibre descends through the published compiler. The unmarked genus-two type remains an exact property of every actual system-0 microstep; it is not a decoder-invariant semantic datum of arbitrary cyclic-tag computation. A seam-twisted local system with proved scan-cycle holonomy remains a possible new construction, not a consequence of universality.

### D. Causal real-form gate

Finite-field data alone do not distinguish compact $Spin(5)$ from $Spin_0(2,3)$, but the selected lift and shear close explicitly in the real algebra $\mathfrak{sp}(4,\mathbb R)\cong\mathfrak{spin}(2,3)$. [Claim 1791](1791_the_positive_h2_cone_selects_the_spin23_carrier_time_orientation.md) now closes the mathematical causal gate: under $X=\bigl(\begin{smallmatrix}t+x&y\\y&t-x\end{smallmatrix}\bigr)$, the positive Jordan cone is exactly $t>\sqrt{x^2+y^2}$, selecting the future component, and its connected conformal completion is $Spin_0(2,3)$. What remains is empirical interpretation—derive a source/clock map that identifies this Jordan order with measured physical time.

### E. Dynamical-provenance gate

The transverse-generator calculation is complete in two senses: the continuous Eisenstein centralizer plus the shear closes to $\mathfrak{sp}(4,\mathbb R)$, and the full integral selector group is independently Zariski-dense there. Section 4I supplies exact source-normalized quadratic Hamiltonians and finite times. Claim 1792 gives an explicit inverse-problem witness: distinct pulse shapes with the same time integral produce the same one-generator endpoint. Carrier algebra therefore cannot recover the switching protocol, signs, or channel amplitudes. A microscopic action or measured source protocol is a genuinely new required input.

### F. Level-three sector gate

The reductions of the two local trace-three gates and mutual shear generate all of $Sp(4,\mathbb F_3)$ and have an exact two-qutrit Heisenberg/BF interpretation. Claim 1792 classifies the remaining gate as realization, not representation theory: a physical completion must supply a gauged $\mathbb Z_3$ sector, compact two-cycles or a gapped interface, and anomaly cancellation or inflow. Without those new objects the mod-three result remains a conditional arithmetic carrier.

### G. Reset-resource gate

The irreversible machine step is exactly the selected reversible gate followed by a rank-one CPTP reset. Its minimal environment is one qubit, and the collision dilation transfers the seam qubit coherently into that environment while leaving a five-dimensional noiseless sector. A finite-rate homogeneous Lindblad decay cannot produce the exact reset at finite time. Claim 1792 closes the inference boundary: minimal Stinespring environments are unique only up to environment unitary, so the channel cannot identify its physical ancilla. The ancilla, preparation/refresh mechanism, coupling, and timing must come from a new resource model.

## 11. Sources

- [Wolfram machine 596440 technical details and transition table](https://www.wolframscience.com/prizes/tm23/technicaldetails.html)
- [Alex Smith's universality proof](https://www.wolframscience.com/prizes/tm23/TM23Proof.pdf)
- [Technical commentary on the cyclic-tag-system emulation](https://www.wolframscience.com/prizes/tm23/solution_technical.html)
- [Cléry, van der Geer and Grushevsky, genus-two level-two theta characteristics and (Sp(4,2)\cong S_6)](https://gerard.vdgeer.net/onlineversionlevel2art.pdf)
- [Yang and Yang, integral symplectic involution normal form and finite genus-two actions](https://journals.uwyo.edu/index.php/ela/article/download/1275/1275/1275)
- [Vandermeulen, genus-two theta constants in the separating degeneration, equation (3.3)](https://arxiv.org/abs/1902.02420)
- [Grant, Jacobi's derivative formula and the identity $\theta'_{\rm odd}(0,\tau)=-2\pi\eta(\tau)^3$](https://euclid.colorado.edu/~grant/publications/rosenhain.pdf)
- [Alvarez-Gaumé et al., chiral bosonization and fermion determinants on compact Riemann surfaces](https://doi.org/10.1016/0550-3213(87)90219-7)
- [D'Hoker and Phong, genus-two chiral measure, theta constants, modular action, and degeneration](https://arxiv.org/abs/hep-th/0111040)
- [NIST DLMF, modular transformation law for multidimensional theta functions](https://dlmf.nist.gov/21.5)
- [Rule 30/Golay comparison](1734_rule30_has_an_exact_48_word_binary_golay_schur_locus_but_no_closed_conway_or_spin23_dynamics.md)
- [Leech pair-Gram seam problem](../1200-1299/1217_leech_pair_gram_geometry_reaches_spin23_but_needs_an_orientation_twist_and_affine_theta_shift.md)
- [Finite (Sp(4)) shadow and real-form caution](../0400-0499/450_two_punctures_produce_an_exact_finite_sp4_shadow_but_do_not_select_the_spin23_real_carrier.md)
- [Even theta selector](../0400-0499/497_the_equal_discriminant_five_mod_four_defect_selects_an_even_genus_two_theta_characteristic.md)
- [Integral symplectic lattices versus physical quotient/dynamics](../1100-1199/1155_the_corpus_already_selects_integral_symplectic_lattices_but_not_yet_the_automorphic_quotient_principle.md)
- [Level-three BF dynamical completion and nine-state carrier](../1100-1199/1169_the_minimal_dynamical_completion_of_one_third_transport_is_level_three_bf_and_reduces_to_the_nine_state_carrier.md)
