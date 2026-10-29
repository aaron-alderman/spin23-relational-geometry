# The Torus-Knot Rogers–Ramanujan Theorem Is a Typed Three-Face Arithmetic Programme, Not Yet a Physics Bridge

**Date:** 29 October 2026

**Status:** source theorem admitted; classical \((2,3)\) specialization
independently checked; Monster, \(Sp(4,\mathbb Z)\), \(Spin(2,3)\), dynamics
and physical realization not implied

**Source post:** [J. D. Redding](https://x.com/JDRedding/status/2115792713857765527)

**Primary theorem:** Y. Huang, K. Lau and K. Ono,
[*Rogers–Ramanujan identities from the geometry of \(X^a=Y^b\)*](https://arxiv.org/abs/2609.20567)

**Geometric source:** Y. Huang, R. Jiang and A. Oblomkov,
[*Quot scheme of points on torus knot singularities*](https://arxiv.org/abs/2608.16086)

**Depends on:** [the Moonshine program–lattice lane](../../programmes/moonshine-program-lattice/README.md),
[the programme-algebra parallel lane](../../programmes/programme-algebra/README.md),
[the braid/modular branch](../0000-0099/57_braid_central_twist_to_sp4z_branch.md),
and [the typed reconstruction gate](../../programmes/frontier/wave-7/frontier_wave7_228_typed_self_description_and_monster_reconstruction_gate.md)

**Evidence:** [typed three-face record](../../../evidence/data/torus-knot-rogers-ramanujan-three-face-v1.json)
and [classical specialization verifier](../../../verification/verify/verify_torus_knot_rogers_ramanujan_three_face.mjs)

## Result

For coprime integers \(1<a<b\), Huang, Lau and Ono prove the conjecture of
Huang, Jiang and Oblomkov that joins three presentations of the same graded
arithmetic object:

\[
\prod_{m\geq1}(1-q^{-m})
\sum_{n\geq0}
\frac{|\mathcal{NC}^{a,b}_n(\mathbb F_q)|}
{|GL_n(\mathbb F_q)|}
=Z_{a,b}(q^{-1})
=P_{a,b}(q^{-1}).
\]

Here \(\mathcal{NC}^{a,b}_n(\mathbb F_q)\) is the set of commuting nilpotent
matrix pairs \((A,B)\) satisfying \(A^a=B^b\); \(Z_{a,b}\) is a constrained
quadratic \(q\)-series built from the gaps of the numerical semigroup
\(\langle a,b\rangle\); and \(P_{a,b}\) is an explicit infinite product whose
exponents are periodic modulo \(a+b\). The product is modular up to a rational
power of \(q\).

This is a rigorous example of a recurring corpus target:

\[
\boxed{
\text{one typed source object}
\longrightarrow
\begin{cases}
\text{finite-field/groupoid count},\\
\text{quadratic relational sum},\\
\text{modular product law}.
\end{cases}}
\]

The equality is stronger than a numerical coincidence. The source papers
identify the common geometry, the maps into each presentation and a common
proof mechanism through finite identities, cylindric partitions and a
\(q\)-difference equation.

## The carrier and its three readings

The most conservative carrier is not the displayed formula. It is the
torus-knot singularity

\[
R=\Bbbk[[T^a,T^b]]
\]

together with its finite-module or Quot-scheme geometry. The three readings
are:

| reading | retained object | what is measured |
|---|---|---|
| arithmetic/geometric | finite \(R\)-modules, equivalently commuting nilpotent pairs with \(A^a=B^b\) | groupoid-weighted point count over \(\mathbb F_q\) |
| combinatorial | ordered gap vectors of \(\langle a,b\rangle\), their kernel \(K\), quadratic form \(Q\) and Pochhammer weight | coefficientwise graded sum \(Z_{a,b}\) |
| modular/product | periodic exponent profile \(\rho_{a,b}(m)\) | Euler product \(P_{a,b}\) and its modular transformation class |

This fits the corpus grammar only after the common source and translations are
declared. Three equal scalar outputs alone would not identify their carriers.

## The classical \((2,3)\) face

For \((a,b)=(2,3)\), the singularity is the trefoil torus-knot singularity,
the numerical semigroup has one gap \(G=\{1\}\), and the product exponent has
period five:

\[
(\rho_{2,3}(1),\ldots,\rho_{2,3}(5))=(1,0,0,1,0).
\]

Therefore

\[
\sum_{n\geq0}\frac{q^{n^2}}{(q;q)_n}
=\frac{1}{(q;q^5)_\infty(q^4;q^5)_\infty},
\]

the first Rogers–Ramanujan identity. The local certificate compares both sides
coefficientwise through degree 80 and checks the residue profile directly. It
does not attempt to replace the paper's proof of the general theorem or its
finite-field geometric input.

## What this contributes to the corpus

### 1. A real programme-formula exemplar

The Moonshine lane distinguishes update rule, compositional algebra, graded
trace and generative integrity law. This theorem adds a clean external model
of the fourth type: the product is a compressed generative law for a graded
object whose expanded states are described by the sum and whose geometric
origin is independently known.

### 2. A typed compiler rather than a metaphor

The programme-algebra lane asks whether one source can be projected into
different forms without losing type, evidence or authority. This theorem gives
a mature mathematical benchmark: geometry, gap-poset combinatorics and modular
product are distinct profiles connected by proved translations.

### 3. A reconstruction and loss test

The product exponent profile is highly compressed. The new corpus question is
not merely whether it reproduces \(Z_{a,b}\), which the theorem answers, but
which parts of \((a,b)\), the gap poset, the module category and the torus-knot
orientation can be reconstructed from it. That is the appropriate typed
self-description test.

### 4. A control for the Moonshine search

This family shows what a successful formula-to-geometry bridge looks like
before invoking the Monster: a carrier, finite presentations, an equality
theorem and an explicit loss audit. It is therefore a positive control for
future denominator, character and sewing claims.

## Boundaries and non-identifications

1. The pair \((a,b)=(2,3)\) names the torus knot \(T(2,3)\). It is not the
   corpus's three-strand braid group \(B_3\), even though torus knots admit
   braid closures and both routes meet modular mathematics.
2. A genus-one modular function of level \(a+b\) is not a genus-two Siegel
   modular form and does not supply an \(Sp(4,\mathbb Z)\) action.
3. The theorem does not produce a Monster module, McKay–Thompson series,
   Borcherds denominator, twined amplitude or sewing law.
4. The finite-field sum is a groupoid volume. It is not automatically a
   thermodynamic partition function, Hilbert-space trace or detector record.
5. No map to \(H_2(\mathbb R)\), \(Spin_0(2,3)\), a physical clock, Hamiltonian,
   preparation or measurement channel is supplied.
6. The existing J. D. Redding Maxwell bridge is linked by provenance only;
   the present theorem does not derive Maxwell dynamics or RDG–MFE–Q.

The Monster and physics branches therefore remain closed under their existing
promotion rules. What changes is the quality of their comparison class: the
corpus now has a proved, non-Monster example of a lattice-like formula carrying
three faithful mathematical readings.

## New research gates

- **Reconstruction gate:** determine whether \(\rho_{a,b}\) or \(P_{a,b}\)
  determines the unordered pair \(\{a,b\}\), the numerical-semigroup gap
  poset, or only a quotient of that data.
- **Orientation gate:** identify what knot or singularity orientation data are
  erased by the scalar product and what vector-valued or categorified record
  restores them.
- **Categorical gate:** make the passage from finite-module category to scalar
  groupoid volume explicit enough to measure information loss.
- **Modular gate:** type the precise congruence subgroup, multiplier and divisor
  data of \(P_{a,b}\); do not promote scalar modularity to genus two.
- **Corpus-comparison gate:** compare this compiler with the Monster
  denominator/Hecke compiler using the same carrier–encoding–reconstruction
  schema.
- **Physics gate:** require a declared state space, dynamics and detector before
  calling any of the three readings a physical partition function.

## Sources

- Y. Huang, K. Lau and K. Ono, [*Rogers–Ramanujan identities from the geometry of \(X^a=Y^b\)*](https://arxiv.org/abs/2609.20567).
- Y. Huang, R. Jiang and A. Oblomkov, [*Quot scheme of points on torus knot singularities*](https://arxiv.org/abs/2608.16086).
- Y. Huang, K. Lau, K. Ono and P. Paule, [*Algebraic geometric framework of Rogers–Ramanujan identities*](https://arxiv.org/abs/2608.15219).
- K. Lau and K. Ono, [*Modularity of Point Counts for the Curves \(X^a=Y^b\): New Rogers–Ramanujan Identities*](https://arxiv.org/abs/2608.05480).

## Reproduction

~~~powershell
node verification/verify/verify_torus_knot_rogers_ramanujan_three_face.mjs
~~~
