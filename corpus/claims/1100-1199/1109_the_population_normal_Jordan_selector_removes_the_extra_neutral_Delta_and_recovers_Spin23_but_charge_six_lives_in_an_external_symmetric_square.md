# The Population-Normal Jordan Selector Removes the Extra Neutral \(\Delta\) and Recovers \(Spin(2,3)\), but Charge Six Lives in an External Symmetric Square

**Date:** 18 October 2026  
**Branches:** two-\(\Delta\) family carrier, population-normal real form, Jordan algebra, \(H_2(\mathbb R)\), \(Sp(4,\mathbb R)\), generalized Majorana composite  
**Claim status:** exact cross-branch algebraic bridge; physical selector on the scalar-copy response remains open  
**Certificate:** [prove_population_normal_Delta_copy_Jordan_selector_and_external_square.mjs](../../../verification/prove/prove_population_normal_Delta_copy_Jordan_selector_and_external_square.mjs)

## Executive result

The naïve tensor-family extension produced the coarse Hermitian copy-space

\[
X=
\begin{pmatrix}
n_P&z\\
\bar z&n_Q
\end{pmatrix}.
\]

It contains:

- two neutral populations \(n_P,n_Q\);
- one complex charged relationship \(z\).

The unwanted third scalar direction is the population difference

\[
n_P-n_Q.
\]

Documents 302 and 622 already proved that continuous relative charge selects
a unique real Jordan form inside this two-face Hermitian space:

\[
\boxed{
J_z=
\left\{
\begin{pmatrix}
t&z\\
\bar z&t
\end{pmatrix}
:
t\in\mathbb R,\ z\in\mathbb C
\right\}
=\operatorname{span}_{\mathbb R}
\{I,\sigma_x,\sigma_y\}.
}
\]

Applied to the \(\Delta\)-copy problem, this does exactly what is required:

- it removes the neutral difference \(\sigma_z\);
- it retains one common neutral carrier \(t\);
- it retains both quadratures of the charge-three relationship \(z\).

Moreover,

\[
J_z\cong H_2(\mathbb R),
\qquad
\operatorname{Co}(J_z)_0
\cong Sp(4,\mathbb R)
\cong Spin_0(2,3).
\]

This is the first exact bridge from the family/Pati–Salam Majorana branch
back to the central \(Spin(2,3)\) pole.

## 1. Coarse copy-space dictionary

Compress the selected-family line \(P\) and rank-two complement \(Q\) to two
coarse labels. The scalar-copy response has coordinates

\[
\begin{array}{c|c}
\text{copy-space coordinate}&\text{family support}\\ \hline
n_P&PKP\\
n_Q&QKQ\\
z&PKQ\\
\bar z&QKP.
\end{array}
\]

The full Hermitian copy space is \(H_2(\mathbb C)\), real dimension four:

\[
H_2(\mathbb C)
=
\operatorname{span}_{\mathbb R}
\{I,\sigma_x,\sigma_y,\sigma_z\}.
\]

The naïve associative tensor-family algebra retains all four directions.

The desired two-field content—one real neutral field plus one complex charged
field—has three real directions. It is exactly \(J_z\).

## 2. Jordan closure versus associative closure

Use the Jordan product

\[
X\circ Y=\frac12(XY+YX).
\]

The Pauli relations give

\[
\begin{aligned}
I\circ X&=X,\\
\sigma_x\circ\sigma_x&=I,\\
\sigma_y\circ\sigma_y&=I,\\
\sigma_x\circ\sigma_y&=0.
\end{aligned}
\]

Therefore

\[
\boxed{
J_z\circ J_z\subseteq J_z.
}
\]

But the associative commutator is

\[
[\sigma_x,\sigma_y]=2i\sigma_z.
\]

Hence the associative envelope necessarily restores the excluded population
difference:

\[
\operatorname{Alg}_{\rm assoc}(J_z)=M_2(\mathbb C).
\]

This identifies the precise algebraic origin of document 1108's extra neutral
direction:

\[
\boxed{
\text{the unwanted neutral face is the Lie/associative completion,
not the Jordan closure.}
}
\]

## 3. Explicit isomorphism with \(H_2(\mathbb R)\)

Write

\[
X(t,x,y)=
\begin{pmatrix}
t&x-iy\\
x+iy&t
\end{pmatrix}.
\]

Then

\[
\det X=t^2-x^2-y^2.
\]

Compare

\[
\Phi(X)=
\begin{pmatrix}
t+x&y\\
y&t-x
\end{pmatrix}
\in H_2(\mathbb R),
\]

for which

\[
\det\Phi(X)=t^2-x^2-y^2.
\]

A fixed unitary quarter-turn implements the Jordan isomorphism. The positive
cone is the three-dimensional Lorentz cone

\[
t\ge\sqrt{x^2+y^2}.
\]

Its conformal/TKK algebra is

\[
\mathfrak{sp}(4,\mathbb R)
\cong\mathfrak{so}(2,3).
\]

## 4. Continuous family charge selects this real form

Let

\[
U(\theta)=
\begin{pmatrix}
e^{i\theta/2}&0\\
0&e^{-i\theta/2}
\end{pmatrix}.
\]

Conjugation gives

\[
z\longmapsto e^{i\theta}z,
\qquad
t\longmapsto t.
\]

After scaling the generator, this is the charge-three action

\[
z\longmapsto e^{-3i\alpha}z.
\]

The full relationship plane

\[
\operatorname{span}_{\mathbb R}\{\sigma_x,\sigma_y\}
\]

is preserved. The population-difference axis \(\sigma_z\) is fixed by the
phase action but removed by the exchange-conjugation real structure

\[
\Theta=\sigma_xK.
\]

Thus the charge and real-form selectors commute.

## 5. One carrier, two faces, three relationships

The construction gives a precise reading of the programme's phrase:

\[
\boxed{
\text{one common population }t
\quad+\quad
\text{two charged relationship quadratures }(x,y).
}
\]

The three real Jordan coordinates are not three independent particle
families. They are one neutral carrier coordinate and the two quadratures of
one complex relational field.

At the scalar-species level:

\[
t\leftrightarrow\Delta_0,
\qquad
z\leftrightarrow\Delta_{-3}.
\]

The \(SO(2)\) rotation of \((x,y)\) is the continuous charge action on the
complex \(\Delta_{-3}\) face.

## 6. Essential caveat: the internal Jordan square does not carry charge six

Complexify \(J_z\) and define charge eigenvectors

\[
E_+=\frac12(\sigma_x+i\sigma_y),
\qquad
E_-=\frac12(\sigma_x-i\sigma_y).
\]

They are the matrix units \(E_{12},E_{21}\), with opposite \(U(1)\) charges.
Internally,

\[
E_+\circ E_+=0,
\qquad
E_-\circ E_-=0.
\]

Therefore the charge-six Majorana composite is **not** the internal Jordan
square of the charged copy-space operator.

The nonzero object is the external symmetric tensor

\[
E_+\odot E_+
\in\operatorname{Sym}^2(J_z^{\mathbb C}),
\]

which retains doubled charge.

This matches the sourced Pati–Salam expression

\[
H_{\dot aI\dot bJ}
=\Delta_{\dot aJ}\Delta_{\dot bI},
\]

where the two \(\Delta\) factors occupy separate gauge-index slots. Their
product is an external tensor contraction, not multiplication of the same
nilpotent \(2\times2\) copy-space matrix.

## 7. Physical obstruction from the \(1+2\) family ranks

The antiunitary \(\sigma_xK\) exchanges two equal-dimensional copy-space
faces. It cannot directly exchange the underlying fermion subspaces

\[
\dim P\mathbb C^3=1,
\qquad
\dim Q\mathbb C^3=2.
\]

Therefore the Jordan selector cannot act as a unitary exchange of the raw
family Hilbert space.

It may act on:

- the two scalar one-form copies after gauge-isotypic reduction;
- a normalized two-channel response or Gram kernel;
- a Morita-stabilized/linking module with equal-dimensional endpoints;
- an auxiliary boundary/carrier index rather than the fermion multiplicity
  itself.

This typing restriction is mandatory.

## 8. Kinetic-metric gate

Even after reducing to two scalar copies, the spectral trace can assign
different kinetic weights:

\[
Z_P|\partial n_P|^2+Z_Q|\partial n_Q|^2.
\]

The population-normal condition must then be imposed in canonical
coordinates:

\[
\sqrt{Z_P}\,n_P
=
\sqrt{Z_Q}\,n_Q.
\]

A literal \(n_P=n_Q\) exchange is physical only if

\[
Z_P=Z_Q.
\]

Thus the next calculation is not another abstract Jordan identity. It is the
spectral one-form kinetic Gram matrix on the neutral \(P/P\) and \(Q/Q\)
copies.

## 9. Stop-everything and falsification criteria

**Typing stop:** do not let \(\sigma_xK\) exchange the rank-one and rank-two
fermion family subspaces directly.

**Associative stop:** adjoining the charged relation inside an ordinary
associative two-point algebra restores \(\sigma_z\).

**Square stop:** \(E_\pm\circ E_\pm=0\); the charge-six object must be an
external symmetric tensor or separately indexed product.

**Metric stop:** equal copy-space diagonals require equal or canonically
rescaled kinetic weights.

**Positive trigger:** the represented one-form calculation produces two
isomorphic \((2_R,4)\) scalar copies whose kinetic Gram form admits the
exchange-conjugation real structure, while the external Pati–Salam tensor
square retains the \(-6\) Majorana component.

## 10. Verdict

The extra neutral field of the naïve associative extension is removed
exactly by the already established population-normal Jordan selector:

\[
\boxed{
H_2(\mathbb C)
\xrightarrow{\operatorname{Fix}(\sigma_xK)}
J_z\cong H_2(\mathbb R)
\longrightarrow
Sp(4,\mathbb R)\cong Spin_0(2,3).
}
\]

This makes \(Spin(2,3)\) a mathematically exact organizing pole for the
two-\(\Delta\) family carrier.

What remains unproved is physical selection: the finite spectral calculus
must produce an exchange-compatible scalar-copy response with the correct
kinetic metric. The raw \(1+2\) family Hilbert space cannot supply that
exchange by itself.

## Position in the corpus

- [naïve tensor-family three-direction obstruction](1108_the_naive_Pati_Salam_tensor_family_algebra_generically_gives_three_Delta_directions_not_the_two_face_carrier.md)
- [unique two-\(\Delta\) charge alphabet](1107_two_Pati_Salam_Delta_faces_with_charges_zero_and_minus_three_are_the_unique_minimal_quadratic_alphabet_for_the_full_family_Majorana_texture.md)
- [continuous charge selects the population-normal \(H_2(\mathbb R)\) embedding](../0300-0399/302_continuous_charge_selects_the_population_normal_h2r_embedding.md)
- [exchange-fixed two-topology \(Spin(2,3)\) carrier](../0600-0699/622_exchange_fixed_two_topology_observables_are_the_h2r_spin23_carrier.md)
- [Pati–Salam Majorana \(\Delta^2\) separation](1106_the_Pati_Salam_Majorana_block_is_a_genuine_diagonal_A2_defect_but_its_Delta_square_is_gauge_not_family_structure.md)
- [kinetic normalization and quartic rank-one gate](1110_the_minimal_spectral_kinetic_metric_can_be_normalized_to_the_Jordan_face_but_quartic_exchange_forces_the_Q_Majorana_block_to_rank_one.md)
