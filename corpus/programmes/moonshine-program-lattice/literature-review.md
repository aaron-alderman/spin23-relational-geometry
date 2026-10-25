# Literature review: the Monster order-23 programme channel

**Date:** 25 October 2026

**Scope:** primary literature bearing directly on the Golay cycle, Leech fixed
lattice, Monster \(23A/23B\) trace, Lorentzian grading plane, orbifold sectors,
defects and higher-genus completion

**Status:** literature and corpus synthesis; exact calculations are separately
certified by the [bridge verifier](../../../verification/verify/verify_moonshine_program_lattice_bridge.mjs)

## Review conclusion

The literature now supports an uninterrupted scalar chain

```text
Golay 23-cycle
 -> Leech order-23 fixed lattice
 -> discriminant -23 ideal theta series
 -> genus-zero 23+ theta/eta quotient
 -> Monster 23A/23B McKay-Thompson series
```

and a separate but compatible transition chain

```text
Monster 23AB symmetry
 -> anomaly-free cyclic orbifold
 -> 529 twist-charge sectors with q(a,b)=ab/23
 -> P(23) parafermion subalgebra
 -> finite Fourier transform and non-invertible duality defect.
```

The finite quadratic module in the second chain is the discriminant form of
\(U(23)\), so both chains meet the same hyperbolic plane that grades the
Monster Lie algebra and embeds diagonally in \(H_2(\mathbb R)\).  What remains
unknown is no longer whether a bridge exists.  It is whether a declared
orientation can be retained by defect data and genus-two sewing, and whether
any of this chiral two-dimensional structure has a source-derived
four-dimensional physical interpretation.

## Source-by-source findings

| source | established object/result | use here | hard boundary |
|---|---|---|---|
| Conway--Norton (1979) | Monster classes and genus-zero McKay--Thompson predictions | identifies the common \(23A/23B\) Hauptmodul and replication target | conjectural in the original paper; later proof uses VOA/Monster Lie algebra |
| Breuer--Magaard--Wilson (2026) | independently verifies Monster conjugacy classes, Sylow normalizers and power-map data; order 23 has two generator orbits and normalizer quotient of order 11 | grounds the QR/QNR and inversion interpretation of \(23A/23B\) | the A/B names still require a representative convention |
| Borcherds (1992) | Monster Lie algebra graded by \(II_{1,1}\), denominator product and Hecke recursion | makes “lattice-like formula” literal and supplies the integral hyperbolic carrier | does not identify \(II_{1,1}\) with spacetime or real-time evolution |
| Kondo--Tasaka (1986) | fixed Leech sublattice theta quotients for \(M_{24}\) automorphisms are genus-zero functions; cycle shape \(1\,23\) maps to \(23+\) | closes the order-23 Leech-theta/Hauptmodul bridge | a scalar function does not retain the oriented generator |
| Höhn--Mason (2016) and Lam--Shimakura | classification of Leech fixed lattices; order-23 fixed lattice has rank two and Gram \(\left(\begin{smallmatrix}4&1\\1&6\end{smallmatrix}\right)\); the two order-23 lattice classes generate conjugate cyclic subgroups | fixes the exact lattice, determinant and lift ambiguity | conjugate subgroups do not canonically label Monster \(23A\) versus \(23B\) |
| Beneish et al. (2024) | code--lattice fixed theta quotients, replicability and lift/order-doubling criteria | confirms that code automorphisms can generate replicable modular outputs through fixed sublattices | replicability alone is not a VOA isomorphism or dynamics |
| Akbary--Totani (2025), revisiting van der Blij | the three discriminant-\(-23\) forms and the exceptional identity \(\Theta_{[1,1,6]}-\Theta_{[2,1,3]}=2\eta\eta_{23}\) | supplies the exact principal/nonprincipal class arithmetic beneath the Leech quotient | inverse oriented classes have equal scalar theta series |
| Johnson-Freyd (2019) | the Moonshine anomaly has exact order \(24\) | proves by coprime-order restriction that the \(C_{23}\) channel is anomaly-free | absence of an anomaly does not construct the desired intertwiner |
| Carnahan (2017--2021) | generalized moonshine, Hecke-monicity and cyclic-orbifold duality | supplies the rigorous twisted-sector/Hecke language | the “51 constructions” Leech theorem assumes fixed-point-free automorphisms; the coordinate 23-cycle has a rank-two fixed lattice and is not covered by that theorem |
| Volpato (September 2026 preprint) | every Fricke non-anomalous Monster symmetry is self-orbifold; \(P(N)\) embeds; a Tambara--Yamagami duality defect exists; list includes \(23AB\) | supplies the current-frontier \(P(23)\), twist--charge and finite Fourier channel | commutant rationality and the full dual-pair property are not proved in general; physical spacetime meaning is absent |
| Honda--Kaidi--Orii (2026) | conditional parafermionic decomposition gives \(\operatorname{Rep}(\mathfrak{so}(3)_p)\) defects; nontrivial defect series have invariance group \(\Gamma_1(p+2)\) | at \(p=23\), predicts a 12-line refinement governed by positive-genus \(\Gamma_1(25)\) | the stronger rational-CFT decomposition is assumed for general \(p\), and explicit character tables are only given for \(p=3,5,7\) |
| Tuite; Mason--Tuite; Gilroy--Tuite | genus-two sewing for meromorphic, lattice, bosonic and VOA correlators | supplies the analytic machinery for the next order-23 sewing calculation | no sourced \(23AB\)-twined genus-two Monster amplitude was located |
| Gaberdiel--Volpato (2009) | for \(c\leq24\), genus one fixes untwined vacuum amplitudes through genus four; some theories first separate at genus five | proves that low-genus untwined partition functions are lossy program checksums | inserted, twined and defect data can still distinguish theories |
| Lin--Shao (2019) | \(2A\) fermionization and Monster duality defect via free Majorana times fermionic Baby Monster | supplies the separate ten-even-spin seam candidate | it is the \(2A\) branch, not the \(23AB\) branch; a junction is still missing |

## Exact synthesis with the corpus

### 1. Finite-field rail

The cyclic Golay generator and its reciprocal split the nontrivial
\(23\)-rd roots over \(\mathbb F_2\) into the quadratic-residue and
nonresidue orbits.  Multiplication by \(5\) exchanges the orbits.  Rule 60
\(T=1+\sigma\) has a genuine order-\(23\) component
\(T^{89}=\sigma^2\), but its order-\(89\) residue prevents \(T\) itself
from being a Monster group element.

### 2. Quadratic-field rail

The complex Gaussian periods of those two residue orbits satisfy

\[
\alpha+\bar\alpha=-1,\qquad
\alpha\bar\alpha=6,
\]

and therefore generate \(\mathbb Q(\sqrt{-23})\).  The Leech fixed
quadratic form is the normalized norm form of a nonprincipal norm-two ideal:

\[
Q_+(a,b)=2a^2+ab+3b^2
=\frac{N(2a-b\alpha)}2.
\]

The two nonprincipal oriented ideal classes are inverse.  Orientation reversal
identifies their ordinary theta series, exactly matching the loss of the
\(23A/23B\) label in the scalar McKay--Thompson series.

The relation is stronger than a matched pair.  The two degree-eleven factors
of \(\Phi_{23}\) over \(\mathbb F_2\) define the two residue-degree-eleven
primes over \(2\) in \(\mathbb Q(\zeta_{23})\).  The verifier reduces the QR
Gaussian period on the two factors and obtains \(0\) and \(1\).  Their
contractions to \(\mathbb Q(\sqrt{-23})\) are consequently
\((2,\alpha)\) and \((2,\alpha+1)\), the conjugate norm-two ideal classes.
This closes the oriented finite-field-to-ideal arrow relative to a declared
primitive root.  Only the final convention assigning the lifted generator to
the Monster name \(23A\) or \(23B\) remains.

The normalizer clarifies that this last residue is not a hidden invariant.  Its
order-11 action is the square subgroup of \(\mathbb F_{23}^{\times}\), so the
two Monster classes are the QR and QNR generator orbits.  Because \(-1\) is a
nonresidue modulo \(23\), inversion exchanges them.  An A/B assignment is
therefore an orientation convention on a generator, while the cyclic subgroup
and all inversion-invariant scalar traces necessarily forget it.

### 3. Modular-output rail

The fixed lattice and oscillator determinant give

\[
\frac{\Theta_{Q_+}}{\eta\eta_{23}}-1
=T_{23A}=T_{23B}.
\]

The verifier checks this through \(q^{30}\), the discriminant-\(-23\)
theta/eta identity through \(q^{40}\), and the second replication identity
through \(q^{15}\).  The published modular theorems promote the finite checks
to established analytic identities; the checks protect the corpus's chosen
normalizations and conventions.

### 4. Defect/transition rail

For the \(23AB\) Monster self-orbifold, the modules \(V_{a,b}\) carry

\[
q(a,b)=\frac{ab}{23}\pmod1,
\qquad
\(a,b\)\in\mathbb Z_{23}^2.
\]

This is the discriminant form of \(U(23)\).  The modular action contains the
quarter-turn \(S(a,b)=(b,-a)\); the duality defect exchanges the axes; and the
Fourier bicharacter \(e^{2\pi iak/23}\) maps twist sectors to charge sectors.
This is a genuine compositional/transition mechanism in the VOA, rather than
an analogy based only on matching numbers.

The two relevant transformations close exactly.  Orientation exchange acts by
\(D_5=\operatorname{diag}(5,5^{-1})\), while the modular quarter-turn is
\(S:(a,b)\mapsto(b,-a)\).  Their relations
\(D_5^{22}=1\), \(S^2=D_5^{11}=-I\), and
\(SD_5S^{-1}=D_5^{-1}\) generate \(\mathrm{Dic}_{11}\) of order 44 inside
\(SL(2,23)\).  This supplies an exact finite transition skeleton joining the
QR/QNR swap to the twist/charge rotation; its physical interpretation remains
open.

Projectivizing the nonzero sector labels removes the central \(-I\), so the
dicyclic group descends to \(D_{11}\) of order 22 on
\(\mathbb P^1(\mathbb F_{23})\).  The 24 directions split into the two-axis
orbit and one 22-direction mixed orbit.  This quotient is useful precisely
because it exposes the lost datum: the dicyclic lift distinguishes a central
sign that the dihedral/projective record cannot retain.

It also has a precise finite Spin adjacency:
\(SL(2,23)=Sp(2,23)\) embeds as a symplectic block in
\(Sp(4,23)\cong Spin(5,23)\).  The latter has the same algebraic
\(C_2/B_2\) type as \(Sp(4,\mathbb R)\cong Spin_0(2,3)\).  This does not
preserve or recover the real signature, cone or time orientation, so it is an
arithmetic bridge rather than a physical spacetime derivation.

### 4.1 The scalar Fourier refinement is exhausted

For a fixed order-23 generator, all nonidentity powers have the same scalar
trace \(T_{23A}=T_{23B}\).  The untwisted charge projections are consequently

\[
C_0=(J+22T_{23})/23,\qquad C_{b\ne0}=(J-T_{23})/23.
\]

The first terms are \(C_0=q^{-1}+8564q+934518q^2+\cdots\) and
\(C_{b\ne0}=8560q+934511q^2+\cdots\).  There are not twenty-three distinct
scalar outputs: there are only two.  This is an exact no-go for extracting the
quadratic-residue/nonresidue orientation by Fourier-projecting the already
known McKay--Thompson series.

The parafermionic route uses strictly more data.  Volpato's formulas first
Fourier-transform the full twisted--twining table, then recover commutant
characters from an \(su(2)_{23}\) character decomposition.  Honda--Kaidi--Orii
show that, under their stronger general-\(p\) decomposition, the associated
defect functions have invariance group \(\Gamma_1(25)\).  The modular curve
\(X_1(25)\) has genus \(12\), so a class-sensitive result should not be
expected to collapse to a single Hauptmodul.  At \(p=23\),

\[
c_{P(23)}=44/25,\qquad c_{\mathrm{Com}}=556/25,\qquad
\operatorname{rank}\operatorname{Rep}(\mathfrak{so}(3)_{23})=12.
\]

The genus \(12\) happens to equal the rank \(12\) of
\(\operatorname{Rep}(\mathfrak{so}(3)_{23})\).  This is an exact numerical
coincidence, not an established correspondence: the former counts
holomorphic differentials and the latter simple defect types.  This locates
the missing “program”: it is a vector of defect/commutant
characters assembled from the 529 twist--charge sectors, not another scalar
eta quotient.  The literature supplies the algorithm but not a published
explicit \(p=23\) table.

The 22 nonidentity powers of a chosen order-23 generator also form eleven
inverse pairs, transitively cycled by fifth power; adding the identity gives
another exact \(1+11=12\) decomposition.  This makes the count less arbitrary
without supplying the missing map from generator pairs to defect objects.

An exact survey over the odd Monster primes makes the coincidence sharper:
\(p=23\) is the unique member for which
\(g(X_1(p+2))=(p+1)/2\).  The genus lies below the defect rank for the smaller
Monster primes and above it for every larger one.  This is recorded as a
signpost only; no mathematical identification between those two 12-element or
12-dimensional structures is presently known.

### 5. Spin(2,3) relation

The unscaled lattice \(U=II_{1,1}\) embeds as the diagonal integral plane in
\(H_2(\mathbb R)\), whose conformal group is \(Sp(4,\mathbb R)\cong
Spin_0(2,3)\).  Scaling to \(U(23)\) and taking the discriminant group produces
the finite order-23 twist--charge plane.  Thus the continuous carrier, Monster
Lie grading and finite defect channel share one quadratic architecture:

\[
mn\quad\longrightarrow\quad \frac{ab}{23}\pmod1.
\]

This remains a kinematic/arithmetic descent.  No continuous Monster action,
four-dimensional field equation or physical clock follows.

## Frontier after the review

The literature search did not locate a completed \(23AB\)-twined genus-two
Monster amplitude, a published canonical identification of the two Golay
factors with the two oriented ideal/Monster classes, or a \(23AB\) defect
junction to the corpus's \(2A\) fermionic seam.  Those are the three live
mathematical targets.

The scalar specialization is exhausted by the two-character no-go above.  The
next calculation cannot proceed from \(J\) and \(T_{23}\) alone: it needs the
full \(T_{g^a,g^k}\) input or an equivalent explicit commutant-character table.
Once supplied, the prescribed test is to compute the twelve defect characters
and compare their Galois action under multiplication by \(5\).  A positive
result would be the first class-sensitive observable in this lane; a negative
result would force genus-two insertions.

## Primary sources

- Borcherds, [*Monstrous moonshine and monstrous Lie superalgebras*](https://math.berkeley.edu/~reb/papers/monster/monster.pdf)
- Conway and Norton, [*Monstrous Moonshine*](https://doi.org/10.1112/blms/11.3.308)
- Breuer, Magaard and Wilson, [*Verification of the conjugacy classes and ordinary character table of the Monster*](https://arxiv.org/abs/2412.12182)
- Kondo and Tasaka, [*The theta functions of sublattices of the Leech lattice*](https://doi.org/10.1017/S0027763000000374)
- Höhn and Mason, [*The 290 fixed-point sublattices of the Leech lattice*](https://arxiv.org/abs/1505.06420)
- Beneish et al., [*Replicable functions arising from code-lattice VOAs fixed by automorphisms*](https://arxiv.org/abs/2306.15402)
- Akbary and Totani, [*Binary quadratic forms of odd class number*](https://arxiv.org/abs/2408.00184)
- Johnson-Freyd, [*The Moonshine Anomaly*](https://arxiv.org/abs/1707.08388)
- Carnahan, [*Generalized Moonshine IV*](https://arxiv.org/abs/1208.6254) and [*51 constructions of the Moonshine module*](https://arxiv.org/abs/1707.02954)
- Volpato, [*Monstrous parafermionic defects and other non-invertible symmetries in chiral CFTs*](https://arxiv.org/abs/2609.03043)
- Honda, Kaidi and Orii, [*Parafermionizing the Monster*](https://arxiv.org/abs/2605.10902)
- Tuite, [*Genus Two Meromorphic Conformal Field Theory*](https://arxiv.org/abs/math/9910136)
- Gilroy and Tuite, [*Genus Two Zhu Theory for Vertex Operator Algebras*](https://arxiv.org/abs/1511.07664)
- Gaberdiel and Volpato, [*Higher genus partition functions of meromorphic conformal field theories*](https://arxiv.org/abs/0903.4107)
- Lin and Shao, [*Duality Defect of the Monster CFT*](https://arxiv.org/abs/1911.00042)
