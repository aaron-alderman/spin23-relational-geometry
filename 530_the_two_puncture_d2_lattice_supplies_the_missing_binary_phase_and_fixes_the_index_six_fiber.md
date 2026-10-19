# The Two-Puncture \(D_2\) Lattice Supplies the Missing Binary Phase and Fixes the Index-Six Fiber

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B07, B09, B10, B11, B13 and B14  
**Claim status:** exact source-derived lattice, discriminant-form and base-change theorem; the final map into \(M/I\) remains open

## 1. Executive result

Direct evaluation of the five \(SO(10)\) Cartan charges on the two punctures \((\nu^c,e^c)\) has image

\[
\boxed{
L_X=D_2=\{(a,b)\in\mathbb Z^2:a\equiv b\pmod2\}.}
\]

This corrects the naïve assumption \(L_X=\mathbb Z^2\). The correction is decisive:

1. the negative discriminant form of \(D_2\) is exactly the anisotropic binary phase
   \[
   q_4(10)=3,\qquad q_4(01)=3,\qquad q_4(11)=2;
   \]
2. reduction modulo two is non-flat and produces a canonical Tor line;
3. adjoining that Tor line to \(A_{D_2}\) gives exactly the degenerate three-bit phase module previously found on the Furey support defect;
4. completing \(D_2\) by \(D_2^*\) gives the required integral symplectic carrier;
5. in the source-derived \(D_2\) basis, puncture exchange fixes the index-six phase fiber.

The missing binary phase was therefore not supposed to descend from \(G=M/I\). It already lives in the discriminant form of the integral two-puncture logical \(X\)-lattice.

## 2. Derivation from the charge matrix

The two-puncture evaluation matrix is

\[
E=
\begin{pmatrix}
1&1&1&1&1\\
1&1&1&-1&-1
\end{pmatrix}.
\]

Its columns generate

\[
D_2=\langle x_1,x_2\rangle,
\qquad
x_1=(1,1),\quad x_2=(1,-1).
\]

The basis matrix

\[
B=
\begin{pmatrix}
1&1\\
1&-1
\end{pmatrix}
\]

has determinant \(-2\). Hence

\[
[\mathbb Z^2:D_2]=2.
\]

This index is precisely why independent puncture coordinates are not an integral logical basis.

With the Euclidean pairing,

\[
\operatorname{Gram}(x_1,x_2)=2I_2.
\]

The dual basis is

\[
y_1=\frac12(1,1),
\qquad
y_2=\frac12(1,-1).
\]

## 3. The exact binary phase

For negative \(D_2=\langle-2\rangle^2\),

\[
A_{D_2}=D_2^*/D_2\cong(\mathbb Z_2)^2.
\]

Its discriminant quadratic form is

\[
q(a\bar y_1+b\bar y_2)
=-\frac{a+b}{4}\pmod1.
\]

In quarter-turn exponents:

\[
\boxed{
q_4(a,b)=3a+3b\pmod4.}
\]

Therefore

\[
q_4(00)=0,\quad
q_4(10)=3,\quad
q_4(01)=3,\quad
q_4(11)=2.
\]

This is exactly the phase table pulled back independently to the weak quotient of the support Smith defect. Its Gauss sum is

\[
1-i-i-1=-2i,
\]

with Weil index \(-i\).

Thus the quadratic mismatch in Document 528 was diagnostic: it arose from trying to place the binary phase on the integral \(U(-3)\) plane. The correct phase carrier is \(A_{-D_2}\).

## 4. The Tor line from non-flat binary reduction

Reduce

\[
0\longrightarrow D_2
\longrightarrow\mathbb Z^2
\longrightarrow\mathbb Z_2
\longrightarrow0
\]

modulo two. Because tensoring with \(\mathbb F_2\) is not left exact, one obtains

\[
0\longrightarrow
\operatorname{Tor}_1^\mathbb Z(\mathbb Z_2,\mathbb F_2)
\longrightarrow
D_2/2D_2
\longrightarrow
\mathbb F_2^2.
\]

In the basis \(x_1,x_2\), both vectors reduce to the same puncture word:

\[
x_1\equiv x_2\equiv(1,1)\pmod2.
\]

The kernel is the line

\[
\boxed{
\tau=\langle x_1+x_2\rangle\cong\mathbb F_2.}
\]

This is the integral parity bit lost by naïve coordinatewise reduction.

Now form

\[
T=\langle\tau\rangle\oplus A_{D_2}.
\]

Extend \(q\) trivially on \(\tau\). Then

\[
\operatorname{rad}T=\langle\tau\rangle
\]

and the quarter-phase distribution is

\[
\boxed{0^2,\ 2^2,\ 3^4.}
\]

This is exactly the support-defect distribution, whose radical is the color line and whose quotient is the same anisotropic two-bit module.

The refined source dictionary is therefore

\[
\boxed{
\begin{aligned}
\ell_c&\longleftrightarrow\operatorname{Tor}_1(\mathbb Z_2,\mathbb F_2),\\
D_{\rm supp}/\ell_c
&\longleftrightarrow A_{-D_2}.
\end{aligned}}
\]

This is stronger than a dimension match: the radicals, quadratic tables and Gauss sums agree.

## 5. Symplectic completion

The canonical integral phase space is

\[
V=D_2\oplus D_2^*
\]

with evaluation pairing

\[
\Omega((x,\xi),(y,\eta))
=\eta(x)-\xi(y).
\]

In the mutually dual bases \((x_1,x_2,y_1,y_2)\), this is the standard unimodular symplectic lattice.

Puncture exchange acts on \(D_2\) by

\[
x_1\mapsto x_1,
\qquad
x_2\mapsto-x_2.
\]

Its inverse-transpose action on \(D_2^*\) is identical:

\[
y_1\mapsto y_1,
\qquad
y_2\mapsto-y_2.
\]

Hence

\[
S=\operatorname{diag}(1,-1,1,-1)
\in Sp(4,\mathbb Z),
\]

with \(2+2\) eigenspaces.

## 6. The index-six fiber is fixed

On the primitive wedge basis,

\[
(E_1,F_1,E_2,F_2,R),
\]

the induced action is

\[
\boxed{
(E_1,F_1,E_2,F_2,R)
\mapsto
(-E_1,-F_1,-E_2,-F_2,R).}
\]

Therefore it preserves

\[
M=\langle
E_1+F_1,\,
E_1-F_1,\,
R,\,
E_2,\,
-3F_2
\rangle.
\]

So the source-derived puncture exchange is an actual stabilizer of the index-six fiber.

This corrects the preferred interpretation of Document 529. In the naïve puncture-coordinate basis, exchange swaps the two null legs and transports the level-three restriction. But the change from that basis to \((x_1,x_2)\) has determinant two. It is not an integral change of logical basis. Once the true image lattice \(D_2\) is used, the action diagonalizes integrally and fixes \(M\).

Both calculations are correct for their respective lattices; only the \(D_2\) calculation is directly source-derived.

## 7. Consequences

### Established

- the two-puncture logical \(X\)-lattice is \(D_2\);
- its discriminant form is the required binary phase module;
- its mod-two base change contains a canonical Tor line;
- Tor plus discriminant reproduces the complete support-defect phase module;
- dual completion gives an integral rank-four symplectic carrier;
- puncture exchange preserves the index-six \(Spin(2,3)\) fiber.

### Still open

- an explicit field-labelled isomorphism
  \[
  D_{\rm supp}\cong
  \operatorname{Tor}_1(\mathbb Z_2,\mathbb F_2)\oplus A_{-D_2};
  \]
- the precise map from this phase module into the filtration of \(M/I\);
- the Heisenberg/metaplectic representation realizing the transversal \(T\) gate;
- the qutrit analogue and the origin of the level-three null restriction;
- physical selection of the two-puncture pair.

## 8. Stop-everything and falsification gates

### Stop-everything triggers

1. The field-labelled map sends the color radical to the Tor generator and the two oriented weak classes to \(\bar y_1,\bar y_2\).
2. The finite Heisenberg representation of \(D_2\oplus D_2^*\) reproduces the Prakash–Ramya logical \(T\) phase.
3. Its primitive wedge identifies the existing \(M/I\) quartic extension without a fitted basis.
4. The odd-prime reductions of the same integral carrier reproduce the qutrit mutual phase.

### Falsifiers

- \(G=M/I\) remains isotropic; it is not the source of the discriminant phase.
- The naïve \(\mathbb Z^2\) puncture lattice is not integrally equivalent to \(D_2\).
- The Tor line is a base-change defect, not automatically a physical color degree of freedom.
- Matching finite quadratic modules does not by itself identify their field labels.

## Certificate and companions

- [Two-puncture \(D_2\), Tor and phase certificate](scripts/derive_two_puncture_d2_dual_phase_and_tor_refinement.mjs)
- [Integral two-puncture Smith defect](519_the_two_puncture_smith_defect_makes_the_qubit_plane_a_discriminant_shadow.md)
- [Support phase pullback](521_the_binary_phase_descends_to_the_weak_handle_quotient_with_the_color_line_as_radical.md)
- [Field-labelled obstruction](528_the_field_labelled_two_torsion_map_stops_at_two_intertwiners_and_needs_a_theta_extension.md)
- [Naïve-coordinate fiber transport, retained as comparison](529_dual_character_completion_turns_puncture_exchange_into_symplectic_phase_fiber_transport.md)

