# Moonshine branch exhaustion checkpoint

**Date:** 25 October 2026

**Status:** the no-new-source deduction programme is exhausted through genus one; the surviving work is higher-genus, cross-grade or physical and requires new mathematical input

**Evidence:** [machine-readable checkpoint](../../../evidence/data/moonshine-exhaustion-checkpoint-v1.json)

**Certificate:** [checkpoint verifier](../../../verification/verify/verify_moonshine_exhaustion_checkpoint.mjs)

## Result

The Monster/moonshine investigation has reached a useful stopping boundary.
This is not exhaustion of moonshine, the Monster or the possible physics. It
is exhaustion of what can be recovered from the present corpus by taking more
scalar genus-one traces, centralizer insertions, power maps or word traces.
Those routes have now been reduced to exact finite statements and closed.

The full joined chain is

```text
Golay / Rule 60
  -> Leech lattice and its order-23 fixed plane
  -> V_Lambda orbifold and V^natural
  -> order-23 and order-46 McKay--Thompson data
  -> complete C23 x S4 centralizer character table
  -> genus-one orientation no-go
  -> mixed level 2 x 23 carrier
  -> scalar metaplectic C4 no-go
  -> genuine eta phase on K
  -> sewn defect comparison, then vector-valued Weil gate if needed
  -> genus-two sewing or cross-grade VOA composition
  -> only then: a possible real Spin(2,3) / physical lift
```

The first five arrows are now internally closed. The next two specify a
finite mathematical target. The last arrow is not licensed by the arithmetic
data alone.

## Closed region

### Arithmetic and lattice layer

- On the eleven-dimensional Rule-60 Golay image,
  \((1+\sigma)^{89}=\sigma^2\). The order-23 component is therefore the
  genuine cyclic symmetry, while the order-89 residue rules out identifying
  the complete Rule-60 action with a Monster element.
- The rank-two order-23 Leech fixed lattice and its theta quotient reproduce
  the common scalar series \(T_{23A}=T_{23B}\).
- The Monster Lie algebra's \(II_{1,1}\) grading plane embeds exactly as the
  diagonal integral Jordan frame in \(H_2(\mathbb R)\). This is an exact
  lattice/form bridge, not a Monster action on the full Jordan cone.

### Genus-one observable layer

- The four order-46 classes form two involution-labelled scalar families:
  \(46A/B\) over \(2B\) and \(46C/D\) over \(2A\).
- The modular transport from \((1,h)\) to \((h^2,h^{23})\) is explicit, and
  both cyclic anomalies are trivial.
- Fifth power exchanges each A/B pair as a cyclotomic Galois operation; it is
  not inner Monster conjugacy.
- The noncyclic insertion quotients are completely bounded:
  \(Q_{46AB}\cong C_2^2\) and \(Q_{46CD}\cong C_2\).
- The complete centralizer is \(C_{\mathbb M}(g)\cong C_{23}\times S_4\).
  Its five insertion classes land in the Monster families
  \(23AB,46AB,46CD,69AB,92AB\), and every corresponding A/B scalar pair is
  equal.
- The possible abstract \(S_4\) Schur multiplier does not activate here.
  Coprimality of the order-23 twist and order-24 Monster anomaly makes the
  transgressed centralizer cocycle trivial. Hence the action is linearisable,
  and the five ordinary \(S_4\) class traces determine the full module.
- Word traces add no information: each is the character of the product's
  conjugacy class. Scalar, ordinary representation and projective
  representation orientation channels are therefore exhausted at genus one.

## Ruled-out shortcuts

The following should not be reopened without genuinely new input:

1. a direct Rule-60 = Monster-element identification;
2. recovery of A/B orientation from another scalar order-23 or order-46
   series, centralizer insertion or word trace;
3. interpretation of fifth-power exchange as inner Monster conjugation;
4. a faithful order-11 action on the ten even genus-two characteristics,
   since \(11\nmid |Sp(4,2)|=720\);
5. a finite order-11 lift inside \(Sp(4,\mathbb Z)\), since a primitive
   eleventh root has cyclotomic degree ten but the matrices have dimension
   four;
6. promotion of the finite inclusion
   \(\mathrm{Dic}_{11}<SL(2,23)<Sp(4,23)\cong Spin(5,23)\) directly to the
   physical real form \(Spin_0(2,3)\).

## The surviving mathematical corridor

Chinese remaindering gives the exact label ambient

\[
Sp(4,\mathbb Z/46)\cong Sp(4,2)\times Sp(4,23).
\]

It has three useful resolutions: 5,290 full labels, 5,280 nonzero
sign-retaining labels and 240 projective labels. This product is only an
ambient carrier; the missing object is a **non-factorized kernel** that couples
the level-2 seam label to the level-23 orientation data and has the correct
separating degeneration.

At the scalar boundary, the unique nontrivial surviving channel is the
\(C_2\) sign matching seam parity to dihedral reflection parity. The finite
dicyclic group also has the \(C_4\) character

\[
s\longmapsto i,
\qquad
s^2=-I\longmapsto -1,
\]

inside a metaplectic theta multiplier. This is the exact finite content of the
corpus's “quarter turn behaves like \(i\)” observation. It is not a physical
Wick rotation. The finite group does not lift as a finite subgroup of
\(Sp(4,\mathbb Z)\): its integral domain is instead the nonsplit congruence
extension

\[
1\longrightarrow\Gamma(23)\longrightarrow\widehat D
\longrightarrow\mathrm{Dic}_{11}\longrightarrow1.
\]

An explicit symmetric lift reduces the selected subgroup's congruence kernel
to \(\langle K\rangle\cong\mathbb Z\), where \(K=S^2R^{-11}\). It also rules
out the scalar promotion: a genuine metaplectic quarter-turn satisfies
\(\widetilde S^4=\varepsilon\), so its scalar value must be a primitive eighth
root when \(\varepsilon\mapsto-1\), never \(i\). The finite \(C_4\) character
and genuine metaplectic character therefore cannot be the same line. A
The canonical Dedekind eta line supplies the genuine scalar assignment
\(\widetilde S\mapsto\zeta_8\), lifted base center \(\mapsto i\),
metaplectic kernel \(\mapsto-1\), and \(K\mapsto i\). Modulo 2, \(K\)
permutes the ten even characteristics with cycle type \(3^3\,1\), while its
permutation determinant is \(+1\). The free-Majorana multiplier is now exact:
after eta normalization the three cycle products are \(1\), the fixed
odd--odd eigenvalue is \(-1\), and the ten-sector determinant is \(-1\).
The missing object is therefore the fermionic Baby-Monster spin-sector action
on \(K\), required to complete the sewn Monster operator.

## Open region and required new inputs

Only four fronts remain admissible:

| Front | Missing object | Decisive test |
|---|---|---|
| mixed-level genus two | the fermionic Baby-Monster spin-sector action on \(K\) | combine it with the exact eta-normalized free-Majorana operator, compare with the sewn defect action and test separating degeneration |
| cross-grade VOA structure | explicit fusion, intertwining or vertex-operator data | find an A/B-sensitive invariant not determined by graded characters |
| finite emulator | a provenance-preserving realization of the \(\mathrm{Dic}_{11}/D_{11}\) quotient | distinguish the 44-element sign-retaining closure from the 22-element projective closure |
| physical lift | a real carrier, action, scale and detector map | select signature, time orientation, positive energy and an observable response |

The first two are mathematical and need no new physical experiment, but they
do require source material not encoded by the present genus-one ledgers. The
emulator can test the information-loss geometry, not Monster provenance. The
physical lift is a separate frontier and must not be inferred from the finite
group coincidence.

## Stopping rule

Further work in this lane is admissible only if it supplies at least one of:

- an explicit order-23-twined genus-two sewing formula;
- a sewn defect/Pfaffian multiplier that can be compared with the eta phase
  \(v_\eta(K)=i\) on the explicit relation rail;
- cross-grade Monster-module fusion or intertwiner coefficients;
- a declared physical carrier together with dynamics and detector coupling.

Absent one of these inputs, computing more scalar \(q\)-coefficients, class
traces or centralizer words is repetition, not frontier progress.

## Corpus links

- [Main programme](README.md)
- [Joined bridge map](joined-bridge-map.md)
- [Frontier target crosswalk](frontier-target-crosswalk.md)
- [Order-23 centralizer exhaustion](order-23-centralizer-exhaustion.md)
- [Projective-centralizer no-go](order-23-projective-centralizer-no-go.md)
- [Mixed-level genus-two seam](mixed-level-46-genus-two-seam.md)
- [Quarter-turn metaplectic gate](quarter-turn-metaplectic-gate.md)
- [Metaplectic congruence-lift gate](metaplectic-congruence-lift-gate.md)
- [Integral relation rail and metaplectic scalar no-go](integral-relation-defect-metaplectic-no-go.md)
- [Dedekind eta relation phase](dedekind-eta-relation-phase.md)
- [Relation-defect seam permutation](relation-defect-seam-permutation.md)
- [Free-Majorana relation-defect multiplier](relation-defect-free-majorana-multiplier.md)
- [Admissibility synthesis](../../syntheses/the_admissibility_frontier_current_synthesis.md)
