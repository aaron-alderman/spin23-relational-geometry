# The prime \(691\) reaches the \(Spin(2,3)\) arithmetic carrier through the weight-twelve Klingen-Siegel tower

**Date:** 19 October 2026  
**Status:** exact modular-form and group-theoretic bridge; no physical parameter selection  
**Role in the corpus:** sharpens the Leech pair-Gram result by locating \(691\) directly on the genus-two \(Sp(4,\mathbb Z)\) arithmetic carrier and separating the \(691\)- and \(23\)-congruence mechanisms

## Result in one sentence

The Ramanujan prime \(691\) is not merely visible after restricting the genus-two Leech theta series to an elliptic boundary: the Klingen lift \([\Delta]\in M_{12}(Sp(4,\mathbb Z))\) lies directly on the arithmetic subgroup of \(Sp(4,\mathbb R)\cong Spin_0(2,3)\), and Nagaoka's degree-three congruence descends under the Siegel operator to

\[
[\Delta]\equiv \mathcal G_{12}^{(2)}\pmod{691}.
\]

## 1. The direct genus-two bridge

Write \(\Gamma_n=Sp(2n,\mathbb Z)\) in conventional matrix-size notation, and let

\[
\Phi:M_{12}(\Gamma_n)\longrightarrow M_{12}(\Gamma_{n-1})
\]

be the Siegel operator. Let \(\Delta\) be Ramanujan's normalized weight-twelve cusp form and \([\Delta]\in M_{12}(\Gamma_2)\) its degree-two Klingen Eisenstein lift, normalized by \(\Phi([\Delta])=\Delta\).

Nagaoka constructs a degree-three lift \([\Delta]^{(3)}\) satisfying

\[
\Phi([\Delta]^{(3)})=[\Delta]
\]

and proves

\[
[\Delta]^{(3)}\equiv \mathcal G_{12}^{(3)}\pmod{691},
\qquad
\mathcal G_{12}^{(n)}=-\frac{B_{12}}{24}E_{12}^{(n)}.
\]

Because \(\Phi(E_{12}^{(n)})=E_{12}^{(n-1)}\), applying \(\Phi\) gives

\[
\boxed{[\Delta]\equiv \mathcal G_{12}^{(2)}\pmod{691}}.
\]

Applying \(\Phi\) once more recovers \(\Delta\equiv \mathcal G_{12}^{(1)}\pmod{691}\), equivalently

\[
\tau(m)\equiv\sigma_{11}(m)\pmod{691}.
\]

The genus-two middle stage is the new point for this corpus. It is a modular form for \(Sp(4,\mathbb Z)\), the arithmetic subgroup of

\[
Sp(4,\mathbb R)\cong Spin_0(2,3).
\]

Thus \(691\) belongs to the arithmetic automorphic structure of the carrier. It is not a representation dimension, coupling constant, or evidence that the continuous group is a microscopic symmetry.

## 2. Why \(691\) appears

The origin is the numerator of

\[
B_{12}=-\frac{691}{2730}.
\]

For normalized elliptic Eisenstein series,

\[
691E_{12}=441E_4^3+250E_6^2,
\qquad
E_4^3-E_6^2=1728\Delta.
\]

Since \(441+250=691\), these identities give

\[
E_4^3=E_{12}+\frac{432000}{691}\Delta.
\]

The absence of roots in the Leech lattice fixes

\[
\Theta_{\mathcal L}^{(1)}=E_4^3-720\Delta
=E_{12}-\frac{65520}{691}\Delta,
\]

and hence

\[
\Theta_{\mathcal L}^{(1)}
=1+\sum_{m\ge1}\frac{65520}{691}
\bigl(\sigma_{11}(m)-\tau(m)\bigr)q^m.
\]

The denominator is a normalization trace of the weight-twelve Eisenstein/cusp split, not an independently fitted number.

## 3. The exact Leech boundary map

Nagaoka and Takemori give the integral Igusa-basis formula

\[
\Theta_{\mathcal L}^{(2)}
=X_4^3-720Y_{12}+43200X_{12},
\]

with

\[
\Phi(X_4)=E_4,
\qquad
\Phi(Y_{12})=\Delta,
\qquad
\Phi(X_{12})=0.
\]

Therefore

\[
\Phi\bigl(\Theta_{\mathcal L}^{(2)}\bigr)
=E_4^3-720\Delta
=E_{12}-\frac{65520}{691}\Delta.
\]

This explains why (691) is absent from the integral genus-two presentation yet appears after resolving the boundary into Eisenstein and cusp sectors. The (43200X_{12}) term is genuinely cuspidal genus-two information killed by \(\Phi\); boundary arithmetic cannot determine it.

## 4. The (23)-(691) nexus is one modular tower, not one modulus

The same Klingen-Siegel tower also carries exact mod-(23) statements. In degree two,

\[
\Theta([\Delta])\equiv0\pmod{23},
\]

where the theta operator weights a Fourier coefficient by the determinant of its index. In degree three, Nagaoka records

\[
E_{12}^{(3)}+7[\Delta]^{(3)}
\equiv\Theta_{\mathcal L}^{(3)}\pmod{23}.
\]

The correct synthesis is:

- (691) is the exceptional weight-twelve Eisenstein/Klingen congruence prime;
- (23) controls determinant-sensitive divisibility in the Leech and Klingen Fourier data;
- both occur on the same Siegel tower and meet at its genus-two (Sp(4)) stage;
- they are not interchangeable, and (691=30\cdot23+1) supplies no additional physical or representation-theoretic selection.

This is stronger than a numerical coincidence but weaker than a dynamical theory.

## 5. Independent group-theoretic confirmation

Bergström, Dummigan and Mégarbané formulate Ramanujan- and Harder-type Eisenstein congruences as successive cases of a general automorphic mechanism. Their special isomorphism

\[
SO(3,2)\simeq PGSp(4)
\]

is the adjoint form of \(Spin_0(2,3)\simeq Sp(4,\mathbb R)\). This independently places the genus-one/genus-two congruence mechanism on the same real group as the corpus carrier. It does not assert that every Harder congruence has modulus (691), nor that the Leech lattice realizes a continuous (Spin(2,3)) action.

## 6. Classification and stop conditions

### Established

- The Klingen lift \([\Delta]\) is a weight-twelve genus-two modular form for \(Sp(4,\mathbb Z)\).
- Nagaoka's degree-three mod-(691) congruence descends under \(\Phi\) to the displayed degree-two congruence.
- The genus-two Leech theta series has the stated integral Igusa decomposition and elliptic boundary.
- The same modular tower carries distinct mod-(23) determinant-divisibility statements.

### Candidate interpretation

- Regard the Siegel boundary as decomposable or externally visible response data and the kernel of \(\Phi\) as genuinely interior pair-correlation data.
- Test whether a physical two-current model supplies automorphic observables that distinguish the Klingen, Siegel-Eisenstein and cusp sectors.

### Not admitted

- (691) is not a derived physical constant, mass ratio, coupling, or state count.
- (691=30\cdot23+1), (60!\bmod691=573), and (573\cdot41\equiv-1\pmod{691}) are not structural links.
- Reduction modulo (691) does not identify the corpus's finite (Sp(4,\mathbb F_3)) carrier with (Sp(4,\mathbb F_{691})).
- The congruence does not select the orientation twist or affine theta characteristic left open by document 1217.

## 7. Decisive next gate

Compute a normalized genus-two Fourier-coefficient table for \(\Theta_{\mathcal L}^{(2)}\), \([\Delta]\), \(E_{12}^{(2)}\), and the weight-twelve cusp generator on the determinant strata (0,12,15,16). The gate passes only if it yields a basis-independent congruence or Hecke-eigenvalue statement that distinguishes the interior pair data from its elliptic boundary. A match of isolated integers is insufficient.

## Sources and certificate

- [Nagaoka, *On p-divisibility of Fourier coefficients of Siegel modular forms*](https://arxiv.org/abs/2212.00917)
- [Nagaoka and Takemori, *On theta series attached to the Leech lattice*](https://arxiv.org/abs/1412.7606)
- [Bergström, Dummigan and Mégarbané, *Eisenstein congruences for SO(4,3), SO(4,4), spinor and triple product L-values*](https://arxiv.org/abs/1605.00819)
- [Calegari, *Congruences between modular forms*](https://math.uchicago.edu/~fcale/papers/AWS.pdf)
- [The Leech pair-Gram bridge](1217_leech_pair_gram_geometry_reaches_spin23_but_needs_an_orientation_twist_and_affine_theta_shift.md)
- [The global (Sp(4,\mathbb R))-(Spin_0(2,3)) isomorphism](../0000-0099/47_global_group_isomorphism_sp4r_spin023.md)
- [Arithmetic verification certificate](../../../verification/verify/verify_691_klingen_siegel_spin23_bridge.mjs)

