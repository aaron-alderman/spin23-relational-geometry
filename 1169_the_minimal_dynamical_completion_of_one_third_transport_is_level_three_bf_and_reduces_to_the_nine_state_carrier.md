# The Minimal Dynamical Completion of One-Third Transport Is Level-Three BF and Reduces to the Nine-State Carrier

**Date:** 19 October 2026  
**Branches:** Standard-Model fractional response, dynamical completion, four-dimensional BF theory, circle reduction, two-qutrit carrier  
**Claim status:** exact minimal topological completion and reduction; dynamical gauging/defect realization in the Standard Model remains open

## Executive result

Document 1168 supplied a real Standard-Model response with fractional coefficient \(\xi=\pm1/3\) on the \(\Gamma=\mathbb Z_2\) branch. The minimal integral hyperbolic topological theory whose inverse response contains \(1/3\) is

\[
K=3H
=
\begin{pmatrix}0&3\\3&0\end{pmatrix}.
\]

Indeed,

\[
K^{-1}
=
\begin{pmatrix}0&1/3\\1/3&0\end{pmatrix}.
\]

This is exactly the level-three BF theory already isolated abstractly in document 465. The new point is that its inverse coefficient is now supplied by a genuine Standard-Model mixed response rather than chosen solely to obtain qutrits.

In \(3+1\) dimensions the dynamical action is

\[
S_{4{\rm d}}
=
\frac3{2\pi}\int_{M_4}b_2\wedge da_1.
\]

Reducing on a circle,

\[
M_4=M_3\times S^1,
\]

produces the \(2+1\)-dimensional sector

\[
S_{3{\rm d}}
=
\frac3{2\pi}\int_{M_3}c_1\wedge da_1,
\]

whose \(K\)-matrix is \(3H\). On spatial \(T^2\), it has

\[
\dim\mathcal H(T^2)=|\det K|=9,
\]

and its four Wilson-loop exponents form

\[
\mathbb F_3^4.
\]

Thus the desired chain exists exactly:

\[
\boxed{
\text{one-third mixed response}
\xrightarrow{\text{minimal dynamical completion}}
4{\rm d}\ \mathbb Z_3\ {\rm BF}
\xrightarrow{S^1\text{ reduction}}
3{\rm d}\ K=3H
\xrightarrow{\text{quantize on }T^2}
\mathbb C^9.
}
\]

The remaining caveat is decisive. The Standard-Model response fields in the cited result are backgrounds. Promoting them to dynamical BF fields requires gauging, an emergent gapped phase or anomaly inflow onto a defect. The algebraic bridge is complete; its physical realization is not.

## 1. Response coefficient versus topological level

The apparent inversion between \(1/3\) and \(3\) is standard. In an Abelian topological theory with integral \(K\)-matrix, integrating out dynamical gauge fields produces an external response governed by \(K^{-1}\).

For a purely mutual rank-two theory, take

\[
K_N=
\begin{pmatrix}0&N\\N&0\end{pmatrix}.
\]

Then

\[
K_N^{-1}
=
\begin{pmatrix}0&1/N\\1/N&0\end{pmatrix}.
\]

Therefore an irreducible mutual denominator three selects \(N=3\) in the minimal hyperbolic completion.

“Minimal” matters. A larger topological theory or a level divisible by three with nonprimitive probe vectors could reproduce the same external fraction. The response alone selects a denominator-three sector, not uniqueness among all ultraviolet topological orders.

## 2. Four-dimensional BF completion

Let \(a_1\) be a compact one-form gauge field and \(b_2\) a compact two-form gauge field. The action

\[
S_{4{\rm d}}
=
\frac{N}{2\pi}\int b_2\wedge da_1
\]

describes \(\mathbb Z_N\) topological gauge theory. Its Wilson line and Wilson surface have mutual phase

\[
\exp\!\left(\frac{2\pi i}{N}\operatorname{Link}(C,\Sigma)\right).
\]

At \(N=3\), the elementary linked operators acquire \(\omega=e^{2\pi i/3}\). This is the dynamical finite pairing that a background response coefficient \(1/3\) suggests but does not itself create.

On a closed spatial three-manifold \(Y_3\), the Hilbert-space size depends on topology. For \(Y_3=T^3\), the ordinary \(\mathbb Z_3\) BF theory has \(3^3=27\) ground states. Therefore the unreduced four-dimensional theory is not itself the desired nine-state carrier.

## 3. Circle reduction

Write the zero modes on \(M_3\times S^1\) as

\[
a_1=a^{(3)}_1+\phi\,dy,
\qquad
b_2=b^{(3)}_2+c^{(3)}_1\wedge dy.
\]

Then

\[
\int_{M_3\times S^1}b_2\wedge da_1
=
\int_{M_3}
\left(
c_1^{(3)}\wedge da_1^{(3)}
+b_2^{(3)}\wedge d\phi
\right)
\]

up to the circle circumference absorbed into zero-mode normalization.

The first term is the \(2+1\)-dimensional BF sector

\[
\frac3{2\pi}\int c_1\wedge da_1.
\]

The second is an additional scalar/two-form topological sector whose treatment depends on boundary conditions and zero-mode constraints. The desired nine-state carrier is the first factor, not automatically the entire reduced theory.

This distinction prevents the reduction from being overclaimed.

## 4. Quantization on a spatial torus

Let \(\alpha,\beta\) be the two primitive cycles of \(T^2\). Define the four Wilson loops

\[
W_a(\alpha),\quad W_a(\beta),\quad
W_c(\alpha),\quad W_c(\beta).
\]

The intersection form gives

\[
W_a(\alpha)W_c(\beta)
=
\omega\,W_c(\beta)W_a(\alpha),
\]

\[
W_a(\beta)W_c(\alpha)
=
\omega^{-1}W_c(\alpha)W_a(\beta),
\]

while same-cycle/same-field pairs commute.

The exponent labels therefore form a four-dimensional symplectic vector space:

\[
(x_\alpha,x_\beta,z_\alpha,z_\beta)\in\mathbb F_3^4.
\]

Its unique irreducible Heisenberg representation has dimension

\[
\sqrt{|\mathbb F_3^4|}=3^2=9.
\]

This is exactly the finite carrier of documents 478 and 1166.

## 5. Quadratic refinement and mutual gate

For

\[
K=3H,
\qquad
K^{-1}=\frac13H,
\]

the anyon label \(\ell=(a,b)\in\mathbb Z_3^2\) has quadratic refinement

\[
q(\ell)
=
\frac12\ell^TK^{-1}\ell
=
\frac{ab}{3}\pmod1.
\]

The modular Dehn twist is

\[
T|a,b\rangle
=
e^{2\pi iab/3}|a,b\rangle
=
\omega^{ab}|a,b\rangle.
\]

The programme sometimes uses \(\omega^{2ab}\). These are inverse orientations:

\[
\omega^{2ab}=\omega^{-ab}.
\]

The finite interface class is the same up to orientation/conjugation. A physical boundary orientation must select which representative occurs.

The modular Fourier kernel is

\[
S_{(a,b),(c,d)}
=
\frac13\omega^{-(ad+bc)}.
\]

It supplies the hyperbolic discriminant pairing and agrees with the oppositely oriented \(A_2\) pair.

## 6. What has now converged

The following chain is no longer numerical coincidence:

1. Standard-Model quark fractionalization gives a \(\mathbb Z_3\) charge-selection rule.
2. The \(\Gamma=\mathbb Z_2\) global form permits a mixed response \(\xi=\pm1/3\).
3. The minimal integral mutual completion has \(K=3H\).
4. Its torus Hilbert space has nine states.
5. Its Wilson-loop algebra is \(\mathbb F_3^4\).
6. Its modular \(T\) is the required mutual qutrit phase.
7. Its finite quadratic module is the hyperbolic form of two oppositely oriented \(A_2\) discriminants.

This is the strongest physical-to-finite-carrier convergence yet obtained.

## 7. What remains additional structure

Four operations are still being separated:

### Background coupling

The Standard-Model result defines response to nondynamical \(A\) and \(B\).

### Gauging

Summing over one or both backgrounds promotes them to dynamical gauge fields and changes the theory.

### Gapping

A finite topological Hilbert space requires a gapped/topological sector. Gapless Standard-Model modes must be excluded, confined or factorized on the defect.

### Compactification/boundary condition

The nine-state sector appears after a topology and zero-mode sector are selected. It is not the Hilbert space of the Standard Model on ordinary \(\mathbb R^{3,1}\).

No claim of physical identity is valid until a concrete construction specifies all four.

## 8. Candidate physical realization

The cleanest candidate is a codimension-one interface with:

1. bulk Standard-Model global form \(\Gamma=\mathbb Z_2\);
2. fractionalization class giving \(\xi=\pm1/3\);
3. anomaly inflow or condensation that makes the relative \(B\!-\!L\)/one-form fields dynamical on the interface;
4. a compact spatial \(T^2\), genus-one handle pair or equivalent two-cycle lattice;
5. boundary conditions removing the extra \(b_2\,d\phi\) reduction sector;
6. local face operations supplied by the two relational/Jordan sectors.

Then the interface BF modular \(T\) supplies the mutual shear, while the two faces supply independent local Clifford actions:

\[
SL(2,3)^2+\text{cross BF phase}
\Longrightarrow
Sp(4,\mathbb F_3).
\]

## 9. Home-stretch assessment

### Algebraic/topological bridge: complete

The denominator-three response, \(K=3H\), nine torus states, \(\mathbb F_3^4\) loop algebra and mutual qutrit phase now form one exact chain.

### Standard-Model dynamical realization: sharply incomplete

The missing datum is no longer the finite mathematics. It is whether the background response is gauged or realized as a dynamical gapped interface sector, and whether nature selects \(\Gamma=\mathbb Z_2\).

This is a legitimate home-stretch gate because it is binary and physical:

\[
\text{Does such a defect phase exist in the declared theory, or not?}
\]

## 10. Claim ledger

- **Exact:** the minimal hyperbolic integral completion of mutual denominator \(1/3\) is \(K=3H\).
- **Exact:** \(K^{-1}\) has mutual entry \(1/3\).
- **Exact:** four-dimensional level-three BF reduces on \(S^1\) to a three-dimensional level-three BF factor plus an additional scalar/two-form sector.
- **Exact:** the three-dimensional BF factor has nine torus states.
- **Exact:** its four Wilson-loop exponents form \(\mathbb F_3^4\).
- **Exact:** its quadratic refinement gives \(\omega^{ab}\), equivalent by orientation to \(\omega^{2ab}\).
- **Conditional:** the Standard-Model \(\xi=\pm1/3\) response admits this minimal dynamical completion.
- **Open:** gauging/emergence of the BF fields.
- **Open:** removal or control of the extra reduction sector.
- **Open:** physical selection of \(\Gamma=\mathbb Z_2\).
- **Not established:** a nine-state Standard-Model ground-space sector in ordinary spacetime.

## 11. Stop-everything and falsification gates

**Dynamical trigger:** derive the interface BF action \(3(2\pi)^{-1}\int c\,da\) by anomaly inflow, gauging or integrating out declared massive fields.

**Topology trigger:** identify the physical two-cycle lattice on which the four Wilson loops live.

**Orientation trigger:** calculate whether the action produces \(\omega^{ab}\) or \(\omega^{2ab}\).

**Background falsifier:** the response remains purely nondynamical and no allowed gauging or emergent sector exists.

**Gap falsifier:** unavoidable gapless modes mix with the putative topological states and destroy the finite protected factor.

**Minimality falsifier:** the denominator \(1/3\) is claimed to uniquely prove \(K=3H\) without declaring the rank-two hyperbolic minimality assumption.

## 12. Certificate

The [one-third-response/BF-transgression certificate](scripts/verify_one_third_response_minimal_bf_completion_and_circle_reduction.mjs) checks \(K^{-1}_{12}=1/3\), determinant nine, Smith invariants \((3,3)\), the nine-state torus count, the order-81 Wilson exponent module, the finite Heisenberg commutator and the orientation relation between \(ab\) and \(2ab\).

## Companion documents

- [Standard-Model one-third response and global-form fork](1168_the_standard_model_has_a_real_one_third_topological_transport_bridge_but_the_maximal_z6_quotient_erases_its_fractional_part.md)
- [Original level-three BF construction](465_level_three_bf_theory_realizes_the_hyperbolic_two_qutrit_carrier_and_its_missing_mutual_phase.md)
- [Compact theta/\(A_2\) carrier](1166_level_three_torus_theta_quantization_is_exactly_the_nine_state_a2_weil_carrier_but_level_three_remains_physical_input.md)
- [Genus-two \(A_2\) Weil carrier](478_the_genus_two_a2_weil_representation_is_exactly_the_two_qutrit_clifford_carrier_and_derives_the_cross_gate_from_a_sum_cycle_twist.md)
