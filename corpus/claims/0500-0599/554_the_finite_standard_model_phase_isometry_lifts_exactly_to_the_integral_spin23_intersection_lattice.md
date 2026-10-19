# The finite Standard-Model phase isometry lifts exactly to the integral (Spin(2,3)) intersection lattice

## Executive result

The finite isometry found in Cycle 468,

\[
\Phi:(\mathbb F_2^5,q_{\rm SM})\longrightarrow(\mathbb F_2^5,q_J),
\]

is not merely a coincidence of discriminant forms. It has an explicit unimodular integral lift

\[
P:L_{\rm SM}^{\rm phase}\overset{\sim}{\longrightarrow}J,
\]

where

\[
L_{\rm SM}^{\rm phase}
=\langle-2\rangle^3\oplus\langle2\rangle^2
\]

and

\[
J=U(2)\oplus\langle-2\rangle\oplus U(-2).
\]

In suitable bases,

\[
\boxed{
P^TG_JP=G_{\rm SM},
\qquad
\det P=-1,
\qquad
P\bmod2=\Phi.}
\]

Thus the selected color/weak phase form is the discriminant shadow of an honest integral Lorentzian lattice isometric to the ambient five-dimensional intersection lattice.

This satisfies the integral-lift stop-everything gate. It does **not** identify the natural sixteen-field sign lattice with (J). The lift belongs to a newly isolated phase lattice whose derivation from Furey, the code, stress response or Jordan composition remains the central source-selection problem.

## 1. The correctly posed lifting problem

The original source quotient

\[
B/L_Q\cong(\mathbb Z_2)^5
\]

is totally isotropic under the natural sixteen-field pairing. Therefore it cannot be the discriminant module of (J), whose quadratic form is nondegenerate.

Cycle 468 introduced the additive refinement

\[
q_{\rm SM}(x)
=3(x_1+x_2+x_3)+x_4+x_5\pmod4.
\]

The minimal diagonal even lattice realizing this refinement is

\[
L_{\rm SM}^{\rm phase}
=\langle-2\rangle^3\oplus\langle2\rangle^2.
\]

Indeed, for a generator (e/2) of the discriminant group of (langle\pm2\rangle), the quarter-exponent is

\[
q_4(e/2)=\pm1\pmod4.
\]

Hence the three negative axes produce (3,3,3), while the two positive axes produce (1,1).

The lifting question is therefore:

> Does the specific finite isometry (Phi) arise as the discriminant reduction of an integral isometry (L_{\rm SM}^{\rm phase}\to J)?

This is stronger than asking whether the two lattices merely lie in the same genus.

## 2. Gram matrices

Write

\[
G_{\rm SM}
=2H_{\rm SM},
\qquad
H_{\rm SM}=\operatorname{diag}(-1,-1,-1,1,1).
\]

In the ordered basis of the ambient intersection lattice used in Cycle 465,

\[
G_J=2H_J,
\]

with

\[
H_J=
\begin{pmatrix}
0&1&0&0&0\\
1&0&0&0&0\\
0&0&-1&0&0\\
0&0&0&0&-1\\
0&0&0&-1&0
\end{pmatrix}.
\]

Both (H_{\rm SM}) and (H_J) are odd unimodular lattices of signature ((2,3)). Abstractly, the classification of indefinite odd unimodular lattices already implies

\[
H_{\rm SM}\cong H_J\cong I_{2,3}.
\]

But this does not yet show that the chosen isometry reduces to the particular matrix (Phi). That congruence condition is the content of the explicit lift below.

## 3. Explicit integral lift

Let the columns of (P), written in the ambient (J) basis, be

\[
\begin{aligned}
p_1&=(-1,0,-1,0,0)^T,\\
p_2&=(0,-1,-1,0,0)^T,\\
p_3&=(-1,-1,-1,-1,-1)^T,\\
p_4&=(-1,-1,-1,-1,0)^T,\\
p_5&=(-1,-1,-1,0,-1)^T.
\end{aligned}
\]

Equivalently,

\[
P=
\begin{pmatrix}
-1&0&-1&-1&-1\\
0&-1&-1&-1&-1\\
-1&-1&-1&-1&-1\\
0&0&-1&-1&0\\
0&0&-1&0&-1
\end{pmatrix}.
\]

Direct integer multiplication gives

\[
P^TH_JP=H_{\rm SM},
\]

and hence

\[
\boxed{P^TG_JP=G_{\rm SM}.}
\]

Moreover,

\[
\det P=-1.
\]

Therefore (P\in GL(5,\mathbb Z)), and the map is an integral lattice isomorphism rather than a finite-index embedding or rational correspondence.

## 4. Exact recovery of the finite map

Reducing the five columns modulo two gives

\[
\begin{aligned}
p_1&\mapsto(1,0,1,0,0),\\
p_2&\mapsto(0,1,1,0,0),\\
p_3&\mapsto(1,1,1,1,1),\\
p_4&\mapsto(1,1,1,1,0),\\
p_5&\mapsto(1,1,1,0,1).
\end{aligned}
\]

These are exactly the columns of the Cycle 468 matrix (Phi). Thus

\[
\boxed{P\bmod2=\Phi.}
\]

The induced map on discriminant groups consequently satisfies

\[
q_J(Px\bmod2)=q_{\rm SM}(x)
\]

for all 32 binary vectors (x).

The certificate verifies the Gram identity, determinant, congruence and all 32 discriminant values independently.

## 5. Why the lift exists so economically

The two lattices are scaled presentations of the same odd unimodular Lorentzian lattice:

\[
L_{\rm SM}^{\rm phase}=2I_{2,3},
\qquad
J=2\bigl(U\oplus\langle-1\rangle\oplus U(-1)\bigr).
\]

The explicit matrix (P) changes from a diagonal color/weak basis to a hyperbolic-pair-plus-selector basis.

This explains the non-coordinate nature of (Phi): the ambient hyperbolic planes are integral mixtures of the five signed source axes. The finite mixing is not an artifact introduced only modulo two; it is already present at the integral lattice level.

Because (P) is unimodular, there is no residual obstruction at the primes two or three and no denominator analogous to the rational Hadamard correspondence. Every localization is automatically an isomorphism.

## 6. Position in the (Spin(2,3)) lattice tower

The target

\[
J=N\cap W_HN

\]

is the index-four intersection of two determinant-two integral models of the standard (Spin(2,3)) quadratic space. Therefore (P) places the additive Standard-Model phase lattice directly in the already established integral carrier tower:

\[
L_{\rm SM}^{\rm phase}
\overset{P}{\cong}
J
\subset N, W_HN.
\]

This is an integral (O(2,3))-lattice statement. Passing to connected real spin groups still uses the established exceptional isomorphism

\[
Spin_0(2,3)\cong Sp(4,\mathbb R).
\]

The lift does not by itself specify a lift of every finite orthogonal automorphism to (Spin_0(2,3)), nor does it make the discrete lattice subgroup connected. Those are separate group-lifting questions.

## 7. What has changed

Before this calculation, three possibilities remained:

1. the finite isometry might fail to lift at the binary prime;
2. it might lift only rationally or after enlarging one lattice;
3. it might lift integrally and unimodularly.

The third possibility is correct.

The programme should therefore stop treating integral compatibility as the bottleneck. The bridge is exact at the lattice level. The new bottleneck is **source derivation**:

\[
\boxed{
\text{What physical or algebraic operation turns the isotropic source sign bits into }
L_{\rm SM}^{\rm phase}?}
\]

Candidate mechanisms already present in the programme are:

- the quartic theta extension;
- a Furey conjugation or oriented ternary product;
- the two-face Hadamard pairing;
- a stress-response Hessian;
- a Jordan determinant or cubic polarization;
- anomaly or determinant-line orientation.

## 8. Claim discipline

### Established

- (L_{\rm SM}^{\rm phase}) realizes (q_{\rm SM}).
- (L_{\rm SM}^{\rm phase}) and (J) have signature ((2,3)) and determinant (-32).
- the displayed (P) is unimodular;
- (P^TG_JP=G_{\rm SM});
- (P\bmod2=\Phi);
- the exact finite phase correspondence lifts integrally.

### Candidate bridge

- (L_{\rm SM}^{\rm phase}) may be a response, anomaly or orientation lattice derived from Standard-Model data;
- its three negative and two positive axes may encode more than the Weyl permutation shadow;
- the lift may be the arithmetic form of the proposed (3+2\) selector inside the (Spin(2,3)) carrier.

### Not established

- (L_{\rm SM}^{\rm phase}) is not yet derived from the natural field lattice (B) or charge lattice (L_Q);
- the signs ((-,-,-,+,+)) are not yet derived from Furey's operators;
- the six flag embeddings are not yet physically interpreted;
- no dynamics or observable follows from the lattice isometry alone.

## 9. Stop-everything result and new gates

### Stop-everything result reached

The Cycle 468/469 gate

> “the finite isometry (Phi) lifts to an integral Jordan/(Spin(2,3)) correspondence”

is satisfied at the level of the integral Lorentzian intersection lattice. The programme must re-root from lift existence to phase-lattice derivation.

### New stop-everything gates

1. A Furey or code operation produces the Gram form (2\operatorname{diag}(-1,-1,-1,1,1)) canonically on the five source axes.
2. The quartic theta orientation line fixes the sign of this form and the choice among the six flags.
3. The integral map (P) intertwines explicit source operators with an established arithmetic subgroup of the (Spin(2,3)) carrier.
4. A stress-response Hessian yields the same signed lattice without free portal coefficients.

### Falsification boundaries

1. If all source derivations require inserting the (3+2) signs by hand, the integral theorem remains arithmetic rather than physical.
2. If transported Furey generators fail to preserve any conjugate of this lattice, the Furey interface is not this phase lift.
3. If chirality or anomaly data select the complex-conjugate Brown phase instead, the orientation must be reversed or the present candidate rejected.

## 10. Next calculations

1. Conjugate the exact (S_3\times S_2) stabilizer by (P) and determine its integral action on (J).
2. Compute the image of the six flag embeddings as integral orthogonal decompositions of (J).
3. Test whether the quartic theta character is a spinor-norm, determinant or orientation character of these integral decompositions.
4. Search the explicit five-field Furey support operators for a canonical signed Hessian with Gram (G_{\rm SM}).

## Certificate and companions

> **Cycle 471 strengthening.** Every element of \(O(q_J)\), not only \(\Phi\), has an integral lift; all six finite flags lift to integral \(3+2\) decompositions. Determinant and spinor norm do not descend through the level-two kernel. See [All six Standard-Model flags lift integrally, but orientation does not descend](555_all_six_standard_model_flags_lift_integrally_but_orientation_does_not_descend.md).

- [Integral lifting certificate](../../../verification/lift/lift_sm_five_bit_isometry_to_integral_spin23_lattice.mjs)
- [Finite flag stabilizer](553_the_standard_model_flag_is_an_index_six_stabilizer_inside_the_ambient_five_bit_orthogonal_group.md)
- [Selected additive refinement](552_the_standard_model_3_plus_2_flag_plus_additivity_selects_an_ambient_five_bit_form.md)
- [Ambient intersection lattice](549_the_two_ambient_spin23_lattices_intersect_in_a_five_bit_quadratic_shell.md)
- [Natural source sign-lattice mismatch](550_the_source_five_sign_bits_are_totally_isotropic_and_do_not_equal_the_ambient_quadratic_shell.md)

