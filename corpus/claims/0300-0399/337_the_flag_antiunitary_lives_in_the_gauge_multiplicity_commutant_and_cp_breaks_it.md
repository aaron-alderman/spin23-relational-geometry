# The Flag Antiunitary Lives in the Gauge Multiplicity Commutant, and CP Breaks It

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B05, B06, B08 and B11  
**Claim status:** exact gauge-commutant and generalized-CP classification; dynamical origin of the selected multiplicity real structure remains open

## 1. Gauge-equivariant antiunitaries

Let a gauge group act on a complex representation \(V\) by \(\rho(g)\). An antiunitary

\[
J=UK
\]

commutes with the gauge action exactly when

\[
\boxed{
U\overline{\rho(g)}U^\dagger=\rho(g)
\quad\text{for all }g.}
\]

Thus \(U\) is an intertwiner from \(\bar V\) to \(V\). On an irreducible complex-type representation, no such antiunitary exists on \(V\) alone. This is why charged chiral matter needs the self-dual CAR completion \(V\oplus\bar V\).

## 2. The CAR completion supplies the first reality

On

\[
\mathcal K=V\oplus\bar V,
\qquad
\rho_{\rm CAR}(g)=
\begin{pmatrix}
\rho(g)&0\\
0&\bar\rho(g)
\end{pmatrix},
\]

the standard CAR antiunitary is

\[
J_0=
\begin{pmatrix}
0&I\\
I&0
\end{pmatrix}K.
\]

Coefficient conjugation exchanges \(\rho\) and \(\bar\rho\), and the unitary swap exchanges them back. Hence \(J_0\) is gauge equivariant even for charged complex representations.

## 3. A second reality is a unitary in the gauge commutant

Every second polarization-reversing antiunitary has the form

\[
J_W=
\begin{pmatrix}
0&W\\
W^T&0
\end{pmatrix}K.
\]

Gauge equivariance reduces to

\[
[W,\rho(g)]=0.
\]

The product is the relative linear symmetry

\[
\boxed{
J_WJ_0=
\begin{pmatrix}
W&0\\
0&W^T
\end{pmatrix}.}
\]

For an isotypic decomposition

\[
V=\bigoplus_\lambda R_\lambda\otimes\mathbb C^{m_\lambda},
\]

Schur’s lemma gives

\[
\operatorname{Comm}_G(V)
=\bigoplus_\lambda I_{R_\lambda}\otimes M_{m_\lambda}(\mathbb C).
\]

Nontrivial flag gradings therefore live in multiplicity spaces, not inside a lone complex gauge irrep.

## 4. Identical sheets solve the charged gauge obstruction

For two identical charged sheets,

\[
V=R\otimes\mathbb C^2,
\]

take

\[
W=\operatorname{diag}(1,-1)
\]

on the sheet factor. It commutes with every Standard-Model gauge transformation. The resulting \(J_W\) is a gauge-equivariant second antiunitary on the same CAR carrier, and

\[
J_WJ_0=W
\]

is the desired flag grading.

This resolves the existence question on an identical pair without using the forbidden unitary particle–antiparticle swap.

At multiplicity one, a Hermitian unitary is only \(W=\pm1\). It changes a sign convention but creates no nontrivial internal flag.

## 5. The sterile sector is the other admissible home

For gauge-neutral right-handed neutrinos,

\[
\rho(g)=I,
\]

so the full \(U(3)\) flavor algebra lies in the gauge commutant. Both \(K\) and a flag-twisted antiunitary \(WK\) are gauge equivariant directly, without CAR exchange.

Thus the second reality has two exact homes:

1. multiplicity spaces of identical charged representations;
2. gauge-neutral sterile flavor space.

The odd number of sheets still leaves one fixed direction under an involutive \(2+1\) flag.

## 6. Generic Yukawas destroy the nontrivial common commutant

Gauge covariance alone permits a family \(U(3)\) on each repeated Standard-Model irrep. Yukawa matrices correlate those family spaces.

Let

\[
H_u=Y_uY_u^\dagger,
\qquad
H_d=Y_dY_d^\dagger.
\]

A common exact family grading must satisfy

\[
[W,H_u]=[W,H_d]=0.
\]

If \(H_u\) has distinct eigenvalues, \(W\) is diagonal in its eigenbasis. If every off-diagonal entry of \(H_d\) is nonzero in that basis, the second commutator forces

\[
W=wI.
\]

Therefore a generic pair of nondegenerate, misaligned Yukawas reduces the common family commutant to central phases. A nontrivial exact flag grading would force block mixing zeros and is incompatible with generic observed three-family mixing.

The second reality can exist kinematically in the CAR multiplicity space, but it cannot remain an exact symmetry of a generic Yukawa sector.

## 7. Generalized CP conditions expose the required breaking

For a Majorana matrix \(M\), the antiunitary \(J_X=XK\) is an exact generalized CP symmetry when

\[
\boxed{X^T M X=M^*.}
\]

Use the exceptional texture

\[
M=
\begin{pmatrix}
S&r&\alpha\\
r&T&i\beta\\
\alpha&i\beta&O
\end{pmatrix}.
\]

Ordinary reality \(X_0=I\) requires

\[
\beta=0.
\]

The quarter-turned flag reality

\[
X_Q=\operatorname{diag}(1,-1,1)
\]

requires

\[
r=0.
\]

But the Majorana triangle is

\[
\mathcal I_\triangle\propto r\alpha\beta.
\]

Hence nonzero exceptional CP requires both exact realities to be broken in complementary directions:

\[
\boxed{
\beta\ne0\text{ breaks ordinary reality},
\qquad
r\ne0\text{ breaks quarter-turned reality}.}
\]

If both antiunitaries were imposed as exact mass symmetries, the CP triangle would vanish.

## 8. Revised architecture

The consistent architecture is now:

\[
\begin{array}{ccl}
J_0&:&\text{exact CAR reality},\\
J_W&:&\text{gauge-compatible kinematic reality on a multiplicity or neutral sector},\\
W=J_WJ_0&:&\text{flag grading},\\
r,\beta&:&\text{controlled mass/Yukawa breaking of the two realities},\\
r\alpha\beta&:&\text{closed three-edge CP orientation}.
\end{array}
\]

The second antiunitary need not be an exact symmetry of the full interacting Hamiltonian. Its value is as a reference real structure whose controlled breaking is measurable.

## 9. Stop-everything and falsification gates

**Stop-everything trigger:** the Furey/exceptional Yukawa construction derives a unique multiplicity-space \(W\), and its controlled breaking reproduces the observed flavor mixing and CP phase.

**Gauge falsifier:** \(W\) acts within a multiplicity-one complex irrep while being claimed to commute with the gauge group.

**Yukawa falsifier:** a nontrivial exact family grading is claimed together with generic nonzero mixing across its eigenspaces.

**CP falsifier:** both \(J_0\) and \(J_W\) are claimed to remain exact mass symmetries while \(r\alpha\beta\ne0\).

**Counting falsifier:** the second antiunitary is implemented by adding another independent matter copy rather than acting on the existing CAR/multiplicity carrier.

## 10. Pinned dependency

Existence is no longer the problem. Selection is.

The remaining dependency is a source-derived rule that picks one \(W\) from the gauge multiplicity commutant and fixes the allowed breaking operators \(r\) and \(\beta\). The exceptional sign gradient supplies a candidate direction, but no action yet fixes its magnitude or its alignment across all Standard-Model species.

## 11. Certificate

The [gauge-commutant flag antiunitary certificate](../../../verification/verify/verify_gauge_commutant_flag_antiunitary_and_cp_breaking.mjs) checks charged-CAR gauge equivariance, the multiplicity-two flag, the generic-Yukawa commutant collapse and the complementary generalized-CP breaking conditions.

## Companion documents

- [Jordan triple and paired realities](336_the_jordan_triple_cannot_choose_the_quarter_turn_but_two_real_structures_generate_the_flag.md)
- [Three-sheet CAR gauge gate](328_the_three_sheet_car_count_is_consistent_but_the_charged_nambu_swap_cannot_be_the_full_selector_lift.md)
- [Second polarization-reversing real structure](311_a_second_polarization_reversing_real_structure_is_parameterized_by_one_unitary.md)
- [Exceptional phase in the neutrino sector](329_the_exceptional_cubic_phase_splits_dirac_completion_from_majorana_index_breaking.md)
