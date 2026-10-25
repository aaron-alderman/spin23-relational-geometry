# The mixed-level 46 genus-two seam

**Date:** 25 October 2026

**Status:** exact torsion obstruction and finite congruence carrier; analytic sewing kernel open

**Evidence:** [mixed-level ledger](../../../evidence/data/moonshine-mixed-level46-seam-v1.json)  
**Certificate:** [torsion, CRT and carrier verifier](../../../verification/verify/verify_moonshine_mixed_level46_seam.mjs)

## Result

The order-23 orientation skeleton cannot act faithfully on the ordinary
genus-two spin carrier. The correct common ambient space is not the
ten-characteristic set by itself, but a mixed level-\(2\)/level-\(23\)
congruence carrier.

There are two independent obstructions. First,

\[
Sp(4,\mathbb F_2)\cong S_6,\qquad |Sp(4,\mathbb F_2)|=720,
\]

and \(11\nmid720\). Therefore the order-11 rotation in \(D_{11}\), and in
its sign-retaining lift \(\mathrm{Dic}_{11}\), cannot act nontrivially by
permuting the ten even theta characteristics.

Second, \(Sp(4,\mathbb Z)\) itself has no element of order 11. A nonidentity
integral matrix \(A\) of prime order 11 would have a primitive eleventh root
of unity as an eigenvalue. Its minimal polynomial would contain
\(\Phi_{11}\), of degree 10, which is impossible for a \(4\times4\) matrix.
Thus every homomorphism \(D_{11}\to Sp(4,\mathbb Z)\) kills \(C_{11}\) and
factors through at most the reflection quotient \(C_2\).

This is stronger than the earlier \(12\ne10\) counting warning: a labelwise
equivariant join is arithmetically impossible.

## 1. The CRT escape

Because \(46=2\cdot23\) is squarefree, the Chinese remainder theorem gives

\[
\mathbb Z/46\mathbb Z\cong\mathbb F_2\times\mathbb F_{23}
\]

and hence, entrywise,

\[
Sp(4,\mathbb Z/46\mathbb Z)
\cong Sp(4,\mathbb F_2)\times Sp(4,\mathbb F_{23}).
\]

The two established corpus carriers occupy different factors:

- the ten even genus-two characteristics are the \(Sp(4,\mathbb F_2)\)
  orbit;
- \(\mathrm{Dic}_{11}<SL(2,23)=Sp(2,23)\) embeds as a symplectic block in
  \(Sp(4,\mathbb F_{23})\).

Therefore

\[
Sp(4,\mathbb F_2)\times\mathrm{Dic}_{11}
<Sp(4,\mathbb Z/46\mathbb Z)
\]

is an exact finite ambient group for the joined label problem. It does not
embed \(\mathrm{Dic}_{11}\) as a finite subgroup of \(Sp(4,\mathbb Z)\);
rather, it makes the order-23 operation a deck/congruence action on
level-46 data.

## 2. What the mixed carrier retains

At label level there are three useful resolutions:

| carrier | size | retained datum |
|---|---:|---|
| ten even characteristics \(\times\mathbb F_{23}^2\) | \(10\cdot529=5290\) | zero label, twist, charge, scale and central sign |
| ten even characteristics \(\times(\mathbb F_{23}^2\setminus0)\) | \(10\cdot528=5280\) | all nonzero sign-retaining labels |
| ten even characteristics \(\times\mathbb P^1(\mathbb F_{23})\) | \(10\cdot24=240\) | projective direction but not scale or central sign |

The central element \(-I\) is especially diagnostic. It reduces to the
identity in characteristic two but remains \(-I\) in characteristic 23.
The sign therefore lives purely on the 23-primary factor of the CRT carrier.
Projectivizing that factor erases it and descends
\(\mathrm{Dic}_{11}\) to \(D_{11}\).

This is the exact version of a two-rail ladder: spin parity and order-23
orientation coexist without either being renamed as the other.

## 3. The required sewing object

CRT supplies a product carrier, not a coupling. A genuine bridge must be a
vector-valued genus-two object or defect kernel

\[
\mathcal K_{\delta,\lambda}(\Omega),
\qquad
\delta\in\{\text{10 even characteristics}\},
\quad
\lambda\in\mathbb F_{23}^2
\ \text{or}\ 
\mathbb P^1(\mathbb F_{23}),
\]

with four properties:

1. its level-2 action reproduces the known characteristic permutations and
   theta/Pfaffian multipliers;
2. its level-23 action reproduces the declared
   \(\mathrm{Dic}_{11}\) or \(D_{11}\) transition skeleton;
3. its separating degeneration lands on sourced cross-grade VOA
   composition data beyond the exhausted \(S_4\) graded characters; and
4. its scalar contractions recover the known \(T_{23}\), Leech theta and
   fermionic factorization limits without identifying their lost data.

The first nontrivial question is whether \(\mathcal K\) factorizes as a
tensor product of independent level-2 and level-23 pieces. If it does, CRT
has merely juxtaposed the carriers. The sought join requires a sourced
off-diagonal coupling or extension class that survives all degeneration
tests.

The [quarter-turn metaplectic gate](quarter-turn-metaplectic-gate.md)
classifies the one-dimensional coupling channels. At projective level the
unique nontrivial common quotient is \(C_2\), matching seam determinant sign
to dihedral reflection parity. It necessarily loses the dicyclic center.
Retaining that sign requires the order-four character
\(S\mapsto i,\ S^2=-I\mapsto-1\) from the metaplectic multiplier data.

## 4. Why “level 46” is not yet the analytic answer

The modulus 46 is exact for the finite label skeleton. Analytic theta
constants carry eighth-root multipliers and naturally require a metaplectic
cover and finer level such as the familiar \(\Gamma_2(4,8)\) setting.
Combining those phases with level 23 may therefore require level 92, 184 or a
metaplectic formulation rather than literal scalar level 46.

This separates the finite congruence carrier, the multiplier lift recording
square roots and anomaly lines, and the analytic form whose weight,
holomorphy and factorization must be constructed. Recent theory of
matrix-valued Siegel modular forms from Weil representations makes this a
standard kind of mathematical object, but no source located here constructs
the programme-specific Monster level-\(2\)/\(23\) kernel.

## 5. Relation to order 46 and to \(Spin(2,3)\)

The order-46 Monster diamond and the level-46 congruence carrier share the
same prime decomposition, but they are not the same object. The former is a
cyclic subgroup and power map inside \(\mathbb M\); the latter is a finite
quotient of the integral genus-two modular group. Their proposed relationship
is the degeneration condition on \(\mathcal K\), not the number 46 alone.

Likewise, \(Sp(4,\mathbb F_{23})\cong Spin(5,23)\) and
\(Sp(4,\mathbb R)\cong Spin_0(2,3)\) share type \(C_2/B_2\), but CRT does not
choose a real signature, positive cone, time orientation or Hamiltonian. It
supplies an arithmetic interface to the corpus's Spin spine, not a physical
symmetry derivation.

## 6. Exhaustion and next gate

The naive genus-two join is now exhausted:

- no bijection exists between the 12 order-23 inverse-pair objects and 10
  even characteristics;
- no faithful order-11 action exists on the level-2 characteristic carrier;
- no finite order-11 lift exists in \(Sp(4,\mathbb Z)\).

The remaining mathematical route is uniquely narrowed to mixed-level,
vector-valued or defect data. The next calculation should construct the
smallest candidate \(\mathcal K_{\delta,\lambda}\), beginning with the
240-component projective carrier, and test whether its separating boundary
can reproduce a non-scalar \(S_4\) relation after the complete scalar
one-insertion exhaustion. Failure of
that boundary test kills the present genus-two lightning path; success
identifies the precise multiplier line that must be lifted analytically.

## Sources and corpus links

- Cléry, van der Geer and Grushevsky, [*Siegel modular forms of genus 2 and level 2*](https://arxiv.org/abs/1306.6018)
- Freitag and Salvati Manni, [*Basic vector valued Siegel modular forms of genus two*](https://arxiv.org/abs/1312.6811)
- Wang, [*Siegel modular forms associated to Weil representations*](https://arxiv.org/abs/2501.12140)
- Gaberdiel, Persson and Volpato, [*Generalised Moonshine and Holomorphic Orbifolds*](https://arxiv.org/abs/1302.5425)
- [Order-46 Galois orientation gate](order-46-galois-orientation-gate.md)
- [Quarter-turn metaplectic coupling gate](quarter-turn-metaplectic-gate.md)
- [Genus-two seam closure](../lattice-subroutine-gravity/genus-two-seam-closure.md)
- [Oriented seam modular line](../lattice-subroutine-gravity/oriented-seam-modular-line.md)
- [Leech pair-Gram / Spin bridge](../../claims/1200-1299/1217_leech_pair_gram_geometry_reaches_spin23_but_needs_an_orientation_twist_and_affine_theta_shift.md)
