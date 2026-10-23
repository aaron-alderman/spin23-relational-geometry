# Leech pair-Gram geometry reaches \(Spin(2,3)\), but needs an orientation twist and affine theta shift

**Date:** 19 October 2026  
**Status:** exact lattice/Jordan bridge with an explicit arithmetic certificate; physical interpretation and seam selection remain conditional  
**Role in the corpus:** connects the geometrical theory of communication, Golay/Leech arithmetic, genus-two theta geometry, and the established \(H_2(\mathbb R)\)-\(Sp(4,\mathbb R)\)-\(Spin_0(2,3)\) spine

## Result in one sentence

The canonical Gram matrix of a pair of Leech vectors lands exactly in the positive Jordan cone \(H_2(\mathbb R)_+\), whose conformal group is \(Sp(4,\mathbb R)\cong Spin_0(2,3)\), and genus-two Leech theta series supplies its integral \(Sp(4,\mathbb Z)\) arithmetic; however, the minimal-pair lattice naturally gives the zero-characteristic binary refinement and two positive copies give the wrong ternary type, so the corpus's selected affine characteristic requires an additional orientation-sensitive seam.

## 1. The exact geometric bridge

For \(x,y\) in the Leech lattice \(\Lambda\), define

\[
G(x,y)=
\begin{pmatrix}
(x,x)&(x,y)\\
(x,y)&(y,y)
\end{pmatrix},
\qquad
\Gamma(x,y)=\frac12G(x,y).
\]

Every real Gram matrix is positive semidefinite, hence

\[
\Gamma:\Lambda^2\longrightarrow H_2(\mathbb R)_+.
\]

Moreover,

\[
\det G(x,y)=(x,x)(y,y)-(x,y)^2
\]

is the squared area of the parallelogram spanned by \(x,y\). Rank-one matrices are precisely the collinear boundary configurations. This is the rigorous meeting point with the geometric-bit construction in *A Geometrical Theory of Communication*: its circle of rays is naturally a projective rank-one boundary of the same positive \(2\times2\) Jordan cone. The proposed semantic interpretation of the off-diagonal entry remains a model choice; the Gram/Jordan statement does not.

The previously established conformal completion then applies without alteration:

\[
\operatorname{Conf}\bigl(H_2(\mathbb R)\bigr)
\simeq Sp(4,\mathbb R)
\simeq Spin_0(2,3).
\]

This is a kinematic equivalence. The finite Conway automorphism group of \(\Lambda\) is not thereby promoted to a continuous \(Spin(2,3)\) action.

## 2. The minimal Leech shell gives four pair strata

Let \(x\) be a fixed minimal Leech vector, so \((x,x)=4\). For minimal \(y\), the standard inner-product distribution is

\[
\begin{array}{c|rrrrrrr}
k=(x,y)&4&2&1&0&-1&-2&-4\\ \hline
\#y&1&4600&47104&93150&47104&4600&1.
\end{array}
\]

The counts sum to \(196560\). Modulo the antipodal identification \(y\sim-y\), the relation classes relative to the line \([x]\) have sizes

\[
1,\quad 4600,\quad 47104,\quad 46575.
\]

For each stratum,

\[
G_k=\begin{pmatrix}4&k\\k&4\end{pmatrix},
\qquad
\det G_k=16-k^2.
\]

Thus \(|k|=4,2,1,0\) give determinants \(0,12,15,16\). The determinant is not merely a shell norm: it is a relational invariant of an ordered pair, and \(|k|=4\) is exactly the rank-one boundary.

## 3. Genus two is the natural arithmetic level

The degree-two theta series

\[
\Theta_\Lambda^{(2)}(\Omega)
=\sum_{x,y\in\Lambda}
\exp\!\left(\pi i\,\operatorname{tr}\bigl(G(x,y)\Omega\bigr)\right),
\qquad \Omega\in\mathfrak H_2,
\]

packages the multiplicity of every pair-Gram matrix. Because \(\Lambda\) is even unimodular of rank \(24\), this is a scalar genus-two Siegel modular form of weight \(12\) for \(Sp(4,\mathbb Z)\). Hence the discrete and continuous sides line up at the correct groups:

\[
\text{Leech pair data}
\longrightarrow H_2(\mathbb R)_+
\longrightarrow \mathfrak H_2,
\qquad
Sp(4,\mathbb Z)\subset Sp(4,\mathbb R)\cong Spin_0(2,3).
\]

This does not mean that a Leech vector is a spacetime event or that its norm is an energy. A physical map to observables is still required.

## 4. Binary and ternary shadows

For \(k\) odd,

\[
G_k\bmod2=\begin{pmatrix}0&1\\1&0\end{pmatrix},
\]

the standard nondegenerate alternating plane. For \(k\) even the reduction is zero. Modulo three, the diagonal is \(1\); \(k=0\) gives full rank while \(k\ne0\pmod3\) gives rank one. Thus the minimal shell already separates a binary symplectic relation from a ternary rank stratification inside the equal-diagonal slice of \(\operatorname{Sym}_2(\mathbb F_3)\).

The tempting identification with the corpus's selected quadratic refinement is nevertheless too strong. For

\[
L_{15}=\begin{pmatrix}4&1\\1&4\end{pmatrix},
\]

the even-lattice norm refinement modulo two is

\[
q_0(a,b)=ab,
\]

not

\[
q_-(a,b)=ab+a+b.
\]

Two copies of \(q_-\) and two copies of \(q_0\) lie in the same total even-Arf orbit, but this does not canonically identify representatives or characteristics. The Leech pair therefore does **not** select the already named corpus characteristic \((1,1,1,1)\).

## 5. The determinant-fifteen lattice and the minimal repair

The Smith normal form of \(L_{15}\) is \(\operatorname{diag}(1,15)\), so its discriminant group is \(\mathbb Z/15\). With the standard even-lattice convention, a generator has discriminant value

\[
q(1)=\frac{2}{15}\pmod1.
\]

Its primary restrictions may be represented by

\[
q_3(a)=\frac{a^2}{3},
\qquad
q_5(a)=\frac{a^2}{5}.
\]

Two positive copies give \(a^2+b^2\) at the ternary prime, which is anisotropic and therefore is not the required hyperbolic two-qutrit form. The minimal arithmetic repair is the orientation-twisted double

\[
L_{15}\oplus L_{15}(-1),
\]

whose discriminant form is

\[
q(a,b)=\frac{2(a^2-b^2)}{15}.
\]

On the order-three subgroup, put \(u=a-b\), \(v=a+b\). Then

\[
a^2-b^2=uv,
\]

so the ternary primary form is hyperbolic, represented by \(uv/3\) up to multiplication by a unit. The same calculation makes the five-primary part hyperbolic. This yields

\[
A_{L_{15}\oplus L_{15}(-1)}
\cong (\mathbb Z/15)^2
\cong (\mathbb Z/3)^2\oplus(\mathbb Z/5)^2.
\]

The sign reversal is therefore structural, not cosmetic: it is what changes the finite quadratic module to the split type needed by the two-qutrit carrier.

## 6. What is established, conditional, and ruled out

### Established

- The pair-Gram map lands canonically in \(H_2(\mathbb R)_+\).
- Minimal Leech pairs have the four determinant strata above.
- Degree-two theta data is naturally \(Sp(4,\mathbb Z)\)-modular.
- The odd-inner-product plane is symplectic modulo two.
- \(L_{15}\) has discriminant group \(\mathbb Z/15\) and the twisted double has split three- and five-primary parts.

### Candidate bridge

- Interpret \(G(x,y)\) as a two-object communication or response state.
- Use a fermionic Pfaffian/determinant line, ordered seam, or equivalent orientation datum to supply the sign-reversed copy.
- Use an affine characteristic shift
  \[
  q_w(z)=q_0(z)+\langle w,z\rangle
  \]
  to select the named nonzero theta characteristic.
- Test whether the five-primary factor is the corpus's discriminant-five selector rather than an arithmetic by-product.

### Ruled out by the calculation

- Golay/Leech data alone does not canonically select \(q_-\) or the characteristic \((1,1,1,1)\).
- Two positive determinant-fifteen pair lattices do not produce the hyperbolic ternary carrier.
- Conway symmetry and \(Spin(2,3)\) are not the same symmetry; the bridge is through Gram geometry and genus-two arithmetic, not a direct group identification.

## 7. Decisive next gate

[Claim 1790](../1700-1799/1790_the_leech_seam_needs_one_affine_orientation_bit_to_intertwine_sign_and_theta_shift.md) closes the algebraic part and sharpens the obstruction. Bare summand reversal sends the ternary discriminant form to its negative but fixes the mod-two norm refinement, so it cannot also create a nonzero affine theta shift. Retaining one orientation bit as an affine torsor gives an exact augmented reversal that does both. [Claim 1793](../1700-1799/1793_the_rule60_golay_kernel_supplies_the_unique_tm23_leech_affine_seam_torsor.md) supplies its finite provenance: the Rule-60 kernel is the unique two-sheeted Golay deck line, and its unique nonzero map to the machine-selected line sends $\mathbf1$ to $v$. The remaining gate is physical realization of this finite seam.

## Sources and certificate

- [Faltz, *A Geometrical Theory of Communication*](https://faltz009.github.io/geometrical-theory-of-communication/)
- [Paper source and construction notes](https://github.com/faltz009/geometrical-theory-of-communication)
- [Minimal Leech-vector inner-product distribution](https://mathoverflow.net/questions/335645/edges-of-the-contact-polytope-of-the-leech-lattice/374818)
- [Nagaoka and Takemori, theta series attached to the Leech lattice](https://arxiv.org/abs/1412.7606)
- [The established Jordan-to-\(Sp(4,\mathbb R)\) determination](../0000-0099/42_jordan_triple_to_sp4r_determination.md)
- [The global \(Sp(4,\mathbb R)\)-\(Spin_0(2,3)\) isomorphism](../0000-0099/47_global_group_isomorphism_sp4r_spin023.md)
- [The exact two-qutrit genus-two carrier](../0400-0499/478_the_genus_two_a2_weil_representation_is_exactly_the_two_qutrit_clifford_carrier_and_derives_the_cross_gate_from_a_sum_cycle_twist.md)
- [Arithmetic verification script](../../../verification/verify/verify_leech_pair_gram_spin23_bridge.mjs)
- [Affine-orientation seam verifier](../../../verification/verify/verify_leech_seam_affine_orientation_intertwiner.mjs)
- [Rule-60/Golay seam-torsor verifier](../../../verification/verify/verify_rule60_golay_kernel_supplies_the_leech_seam_torsor.mjs)

