# A Rule 30 Incidence in the Binary Golay Code

## Schur reduction, a 48-word locus, and cyclic symmetry breaking

**Author:** [Name for circulation]  
**Affiliation:** [Affiliation, if any]  
**Email:** [Email]  
**Version:** Circulation draft, 23 October 2026  
**Status:** Not submitted; comments and prior-art references are invited

## Abstract

Let \(G_{23}\subset\mathbb F_2^{23}\) be the binary Golay code in its
standard cyclic presentation, and let \(F_{30}\) be elementary cellular
automaton Rule 30 with periodic boundary conditions on 23 cells. We determine
exactly the codewords whose one-step Rule 30 images remain in \(G_{23}\).
Writing \(\sigma\) for cyclic shift and \(\odot\) for coordinatewise
multiplication, the nonlinear part of Rule 30 gives the reduction

$$
F_{30}(x)\in G_{23}
\quad\Longleftrightarrow\quad
x\odot\sigma^{-1}x\in G_{23}.
$$

The resulting locus has exactly 48 elements:

$$
\left|G_{23}\cap F_{30}^{-1}(G_{23})\right|
=1+23+23+1.
$$

They are the zero word, one cyclic orbit of 23 weight-eight codewords with
independent support in the 23-cycle, the 23 complementary weight-fifteen
words, and the all-one word. We prove the classification using the duality
and minimum distance of \(G_{23}\), then obtain the octad count intrinsically
from two moment identities in the Witt design \(S(5,8,24)\). The 23 selected
octads reconstruct an undirected 23-cycle through disjointness, but its
reflection does not extend to their point-block incidence. Their full
setwise coordinate stabilizer is therefore \(C_{23}\).

The locus is not dynamically closed: after three consecutive Rule 30
updates, only the trivial trajectory \(\mathbf1\mapsto0\mapsto0\) remains in
the code. A diagnostic on the first 200,000 bits of the infinite-line center
trace shows no enrichment by 23-bit Golay windows. Consequently the theorem
does not resolve any of the three Wolfram Rule 30 Prize problems. It is an
exact finite-ring incidence connecting Rule 30 to the
Golay--Witt--Leech--Conway chain, not a result about asymptotic
nonperiodicity, limiting frequency, computational lower bounds, or a
continuous \(Spin(2,3)\) action.

**Keywords:** Rule 30; binary Golay code; cellular automata; Schur product;
Witt design; Mathieu group; Conway group; cyclic code

**Suggested MSC 2020:** 94B15, 37B15, 05B05, 20B25

## 1. Introduction

Rule 30 is the elementary binary cellular automaton with local update table
encoded by \(30=00011110_2\). Despite its elementary definition, its
single-seed spacetime diagram exhibits irregular behavior, and basic
questions about its center column remain open. The Wolfram Rule 30 Prize
isolates three such questions: whether the center trace is always
nonperiodic, whether its two symbols have equal limiting frequency, and
whether computation of its \(n\)-th symbol requires at least linear effort.

The binary Golay code \(G_{23}\) is the cyclic perfect
\([23,12,7]\) code. Its parity extension \(G_{24}\) supports the Steiner
system \(S(5,8,24)\), has coordinate automorphism group \(M_{24}\), and enters
standard constructions of the Leech lattice and its Conway automorphism
group. These structures are individually classical.

The purpose of this note is narrower. We place Rule 30 on a 23-cell cycle and
ask:

> For which \(x\in G_{23}\) does one Rule 30 update again lie in \(G_{23}\)?

The answer is unexpectedly small and structured. Rule 30 does not preserve
the Golay code, but its one-step return locus is governed by a single
adjacent Schur product and consists of two nontrivial \(C_{23}\)-orbits
together with two constant words.

The proof separates three claims that should not be conflated:

1. the finite incidence theorem is exact;
2. its relation to Conway symmetry is indirect, through the standard
   Golay--Leech construction;
3. it has no presently demonstrated consequence for the infinite-line
   center trace or the Rule 30 Prize problems.

To the author's knowledge, the particular 48-word locus and its
Witt-design classification have not previously been reported. This is a
provisional novelty statement, not a substitute for a formal MathSciNet,
zbMATH, and citation-database review.

## 2. Preliminaries

### 2.1 The cyclic binary Golay code

Index coordinates by \(\mathbb Z/23\mathbb Z\). Let

$$
g(X)=X^{11}+X^9+X^7+X^6+X^5+X+1.
$$

The cyclic code

$$
G_{23}=(g(X))\subset
\mathbb F_2[X]/(X^{23}-1)
$$

has parameters \([23,12,7]\). Its weight distribution is

| Weight | 0 | 7 | 8 | 11 | 12 | 15 | 16 | 23 |
|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| Number | 1 | 253 | 506 | 1288 | 1288 | 506 | 253 | 1 |

The all-one word belongs to \(G_{23}\), so complementation pairs weights
\(w\) and \(23-w\). The even subcode has dimension 11 and equals
\(G_{23}^{\perp}\).

Let \(\sigma\) be cyclic shift, with

$$
(\sigma x)_i=x_{i-1}.
$$

Because \(G_{23}\) is cyclic, both \(\sigma x\) and
\(\sigma^{-1}x\) lie in \(G_{23}\) whenever \(x\) does.

### 2.2 Rule 30 over \(\mathbb F_2\)

For \(a,b,c\in\mathbb F_2\), the Rule 30 local function can be written

$$
f_{30}(a,b,c)
=a+(b\lor c)
=a+b+c+bc.
$$

Consequently its global update on the 23-cycle is

$$
F_{30}(x)
=\sigma x+x+\sigma^{-1}x+x\odot\sigma^{-1}x,
$$

where

$$
(x\odot y)_i=x_i y_i.
$$

Define the adjacent Schur term

$$
q(x)=x\odot\sigma^{-1}x
$$

and its weight

$$
e(x)=\operatorname{wt}(q(x)).
$$

If \(S=\operatorname{supp}(x)\), then \(e(x)\) is the number of directed
cycle edges whose two endpoints both lie in \(S\).

## 3. Schur reduction

### Lemma 3.1

For every \(x\in G_{23}\),

$$
F_{30}(x)\in G_{23}
\quad\Longleftrightarrow\quad
q(x)\in G_{23}.
$$

#### Proof

The three linear terms

$$
\sigma x+x+\sigma^{-1}x
$$

lie in \(G_{23}\) by linearity and cyclic invariance. Therefore adding those
terms cannot change whether the remaining term \(q(x)\) belongs to the code.
\(\square\)

This elementary observation turns a nonlinear cellular-automaton question
into a code-theoretic question about an adjacent Schur product.

### Lemma 3.2

Compatibility is invariant under complementation:

$$
q(x)\in G_{23}
\quad\Longleftrightarrow\quad
q(\mathbf1+x)\in G_{23}.
$$

#### Proof

Over \(\mathbb F_2\),

$$
q(\mathbf1+x)
=(\mathbf1+x)\odot(\mathbf1+\sigma^{-1}x)
=\mathbf1+x+\sigma^{-1}x+q(x).
$$

The first three terms lie in \(G_{23}\), proving the equivalence.
\(\square\)

It is therefore enough to classify compatible words of weights
\(0,7,8,11\).

## 4. Weight restrictions

### Lemma 4.1

For \(x\in G_{23}\),

$$
e(x)\equiv\operatorname{wt}(x)\pmod2.
$$

#### Proof

If \(x\) has even weight, then \(x\in G_{23}^{\perp}\). Since
\(\sigma^{-1}x\in G_{23}\),

$$
e(x)\equiv x\cdot\sigma^{-1}x=0\pmod2.
$$

If \(x\) has odd weight, write \(x=\mathbf1+y\), where \(y\) is even and
therefore lies in \(G_{23}^{\perp}\). Expanding
\((\mathbf1+y)\cdot(\mathbf1+\sigma^{-1}y)\), the mixed terms vanish because
\(y\) is even, the final term vanishes by duality, and
\(\mathbf1\cdot\mathbf1=23\equiv1\pmod2\).
\(\square\)

### Lemma 4.2

If \(x\in G_{23}\) is nonconstant and has weight \(w\), then

$$
2(w-e(x))\ge7.
$$

#### Proof

The word \(x+\sigma^{-1}x\) is a nonzero Golay codeword. Its support is the
symmetric difference of \(\operatorname{supp}(x)\) and its shift, so

$$
\operatorname{wt}(x+\sigma^{-1}x)=2(w-e(x)).
$$

The result follows from the minimum distance seven.
\(\square\)

### Proposition 4.3

Among codewords of weights \(0,7,8,11\), the compatible words are precisely
the zero word and the weight-eight words satisfying \(e(x)=0\).

#### Proof

- **Weight 0.** The zero word is compatible.

- **Weight 7.** Lemmas 4.1 and 4.2 give odd \(e(x)\le3\). Thus \(q(x)\) is a
  nonzero word of weight one or three and cannot lie in a code of minimum
  distance seven.

- **Weight 8.** The same lemmas give even \(e(x)\le4\). If \(q(x)\) lies in
  \(G_{23}\), minimum distance forces \(q(x)=0\). Conversely \(q(x)=0\)
  plainly gives compatibility.

- **Weight 11.** The lemmas give odd \(e(x)\le7\). If \(q(x)\in G_{23}\),
  it must have weight seven. Since
  \(\operatorname{supp}(q(x))\subset\operatorname{supp}(x)\), the Golay
  codeword \(x+q(x)\) would then have weight four, contradicting minimum
  distance.

Therefore compatibility below half weight is exactly independence of a
weight-eight support in the 23-cycle.
\(\square\)

By Lemma 3.2, the remaining nonconstant compatible words are the complements
of these independent octads.

## 5. Counting the independent octads

The 759 weight-eight words of \(G_{24}\) are the blocks of the Steiner system
\(S(5,8,24)\). Choose a coordinate \(\infty\) and puncture there. The octads
not containing \(\infty\) give the 506 weight-eight words of \(G_{23}\).

The shift \(C_{23}\) acts freely on these 506 octads. Indeed, a nontrivial
shift in a prime cycle can fix only the empty or full coordinate set.
Consequently the residual octads split into

$$
506/23=22
$$

cyclic orbits.

For a residual octad \(B\), let \(e(B)\) be the number of edges of the
23-cycle contained in \(B\). Lemma 4.1 and Lemma 4.2 show that

$$
e(B)\in\{0,2,4\}.
$$

Let \(n_j\) be the number of cyclic octad orbits with \(e(B)=j\).

In \(S(5,8,24)\), the number of blocks containing a fixed \(s\)-subset is

$$
\lambda_s=
\frac{\binom{24-s}{5-s}}{\binom{8-s}{5-s}},
\qquad 0\le s\le5.
$$

A fixed pair of residual points lies in

$$
\lambda_2-\lambda_3=77-21=56
$$

octads not containing \(\infty\). Summing over the 23 cycle edges gives

$$
\sum_B e(B)=23\cdot56.
$$

Next count unordered pairs of cycle edges contained in an octad. Two
adjacent edges have a three-point union and occur in

$$
\lambda_3-\lambda_4=21-5=16
$$

residual octads. Two disjoint edges have a four-point union and occur in

$$
\lambda_4-\lambda_5=5-1=4
$$

residual octads. There are 23 adjacent edge pairs and
\(\binom{23}{2}-23=230\) disjoint edge pairs. Hence

$$
\sum_B\binom{e(B)}2
=23\cdot16+230\cdot4
=23\cdot56.
$$

Dividing by the orbit size 23 gives

$$
\begin{aligned}
n_0+n_2+n_4&=22,\\
2n_2+4n_4&=56,\\
n_2+6n_4&=56.
\end{aligned}
$$

The unique solution is

$$
(n_0,n_2,n_4)=(1,14,7).
$$

We have proved:

### Theorem 5.1

The standard cyclic \(G_{23}\) contains exactly 23 weight-eight codewords
whose supports are independent sets in the coordinate 23-cycle. They form
one regular \(C_{23}\)-orbit.

A representative support is

$$
A=\{0,3,5,8,10,14,16,18\}.
$$

Its polynomial is

$$
\sum_{a\in A}X^a
=g(X)(1+X+X^2+X^7).
$$

For such an octad \(x\), the Schur term \(q(x)\) vanishes. For its complement
\(\mathbf1+x\),

$$
q(\mathbf1+x)=\mathbf1+x+\sigma^{-1}x
$$

is a weight-seven Golay word, hence a heptad of the punctured Witt design.

Combining Proposition 4.3, complementation, and Theorem 5.1 yields the main
result.

### Theorem 5.2

For Rule 30 on 23 periodic cells,

$$
\left|G_{23}\cap F_{30}^{-1}(G_{23})\right|=48.
$$

The locus has weight distribution

| Input weight | Number | Output weight |
|---:|---:|---:|
| 0 | 1 | 0 |
| 8 | 23 | 16 |
| 15 | 23 | 8 |
| 23 | 1 | 0 |

Thus it decomposes into two constant words and two regular
\(C_{23}\)-orbits.

## 6. Stabilizer of the selected octads

Write

$$
B_j=A+j,\qquad j\in\mathbb Z/23\mathbb Z.
$$

Directly from the displayed representative,

$$
B_i\cap B_j=\varnothing
\quad\Longleftrightarrow\quad
j-i=\pm1.
$$

The block-disjointness graph on the 23 selected octads is therefore the
undirected cycle \(C_{23}\). Any coordinate permutation preserving the
octad set induces an automorphism of this cycle, hence an element of the
dihedral group \(D_{46}\).

The action on blocks is faithful. The incidence signature of a point \(p\)
is supported on

$$
p-A=\{j:p\in B_j\}.
$$

These 23 signatures are distinct: equality
\(p-A=q-A\) would make the proper nonempty subset \(A\) invariant under a
nonzero translation of the prime cycle.

The abstract reflection of the block cycle would send a signature
\(p-A\) to its reflected set. Taking \(p=0\), an extending reflection would
therefore require a coordinate \(q\) satisfying

$$
q-A=A.
$$

For the displayed representative, direct calculation gives

$$
\max_{q\in\mathbb Z/23\mathbb Z}|A\cap(q-A)|=6<8.
$$

Thus \(A\) is not centrally symmetric about any coordinate and no block
reflection extends to the point-block incidence.

### Proposition 6.1

The full setwise coordinate stabilizer of the selected 23-octad family is
exactly \(C_{23}\).

In particular, the Rule 30 adjacency has selected the cyclic subgroup while
breaking both the dihedral reflection and the larger Mathieu symmetry.

## 7. Failure of dynamical closure

The main theorem concerns one update only. The compatible locus is not an
invariant Rule 30 subsystem.

Exhaustive iteration gives:

| Required consecutive Golay-valued updates | Initial codewords |
|---:|---:|
| 1 | 48 |
| 2 | 25 |
| 3 | 2 |

After three steps, the only surviving initial words are \(0\) and
\(\mathbf1\), with

$$
\mathbf1\mapsto0\mapsto0.
$$

The 48-word locus should therefore be described as a one-step incidence or
return locus, not as Golay-valued Rule 30 dynamics.

## 8. Does this answer a Rule 30 Prize question?

No. It answers none of the three challenge questions.

### 8.1 Challenge 1: nonperiodicity of the center column

The theorem concerns Rule 30 on a finite 23-cell ring with Golay-code initial
states. The challenge concerns the infinite line, a single occupied initial
cell, and the temporal sequence at the origin. Every finite deterministic
system is eventually periodic, and the single-cell seed is not in
\(G_{23}\). The finite incidence gives no proof that the infinite center
trace is nonperiodic.

### 8.2 Challenge 2: equal limiting frequency

The theorem counts codewords satisfying a one-step algebraic condition. It
does not determine the limiting density of zeros and ones in the center
trace.

As a diagnostic only, the accompanying verifier generated the first 200,000
center bits and tested all chronological 23-bit windows. It found:

| Cyclic Golay orientation | Observed windows | Uniform-density expectation |
|---|---:|---:|
| Standard | 86 | 97.6455 |
| Reciprocal | 103 | 97.6455 |

These overlapping-window counts are not a statistical proof, but they show
no evident Golay enrichment. They also say nothing by themselves about
single-bit limiting frequency.

### 8.3 Challenge 3: linear computational lower bound

The theorem supplies neither an algorithm for the \(n\)-th center bit nor a
lower bound against all such algorithms. A fixed length-23 incidence cannot
establish asymptotic computational complexity. In particular, the presence
of a structured finite quotient is compatible with either outcome of the
challenge.

### 8.4 Possible relevance

The result would become relevant to the challenge only if it extended to a
family of code or syndrome constraints controlling arbitrarily long windows
of the infinite center trace. No such family is presently known. The
isolated length-23 theorem is therefore a structural side result, not a
prize submission.

## 9. Conway and Leech interpretation

The standard downstream chain is

$$
G_{23}\longrightarrow G_{24}
\longrightarrow\Lambda_{\mathrm{Leech}}
\longrightarrow Co_0.
$$

The first step appends the parity coordinate. The extended binary Golay code
then enters a standard construction of the Leech lattice, whose full
automorphism group is \(Co_0\).

The present theorem adds an exact object at the beginning of that chain:

$$
\text{Rule 30 adjacent-Schur locus}
\longrightarrow G_{23}.
$$

It does **not** show that a Conway group acts on Rule 30, nor that Rule 30
preserves \(G_{24}\) or the Leech lattice. At the finite code level the
adjacency selects only \(C_{23}\). The Conway connection is thus real but
indirect: the selected words belong to the code from which the
Leech--Conway construction proceeds.

## 10. Relation to \(Spin(2,3)\)

No \(Spin(2,3)\) result is proved here. A separate arithmetic route can send
ordered Leech-vector pairs to positive \(2\times2\) Gram matrices:

$$
\Lambda_{\mathrm{Leech}}^2
\longrightarrow H_2(\mathbb R)_+.
$$

The conformal group of this rank-two real Jordan cone is

$$
Sp(4,\mathbb R)\cong Spin_0(2,3).
$$

That supplies a typed downstream carrier:

$$
\text{Rule 30 locus}
\to G_{23}
\to G_{24}
\to\Lambda_{\mathrm{Leech}}
\to H_2(\mathbb R)_+
\to Spin_0(2,3).
$$

However, no arrow transports Rule 30 time evolution into the continuous
symplectic action. No intertwiner, Hamiltonian, physical observable, scale,
or dynamical representation is derived. This route should be read as
arithmetic adjacency, not a physical unification claim.

## 11. Reproducibility

The complete finite calculation and the center-trace diagnostic are
implemented in:

~~~text
verification/verify/verify_rule30_binary_golay_schur_locus.mjs
~~~

From the repository root:

~~~powershell
node verification/verify/verify_rule30_binary_golay_schur_locus.mjs
~~~

The verifier:

1. constructs all 4096 words of cyclic \(G_{23}\);
2. checks the standard weight enumerator;
3. verifies the Schur reduction for every codeword;
4. verifies the 48-word classification and transition counts;
5. verifies the octad moment distribution
   \((n_0,n_2,n_4)=(1,14,7)\);
6. verifies the \(C_{23}\) stabilizer certificate;
7. checks the consecutive-survival counts \(48,25,2\); and
8. reproduces the 200,000-bit center-window diagnostic.

The finite classification uses exhaustive verification only as a certificate;
Sections 3--6 provide the mathematical proof.

## 12. Novelty and limitations

The individual ingredients of the proof are classical: Rule 30, cyclic
Golay codes, Schur products, the Witt design, and the Golay--Leech--Conway
construction. A targeted search found literature on cellular automata and
cyclic codes, and literature on Schur powers of cyclic and constacyclic
codes, but no prior statement of the particular adjacent-Schur locus

$$
\{x\in G_{23}:x\odot\sigma^{-1}x\in G_{23}\},
$$

its size 48, its independent-octad classification, or its exact
\(C_{23}\) stabilizer.

Accordingly, the appropriate present claim is:

> The result is an apparently novel finite theorem, supported by an
> intrinsic proof and an exhaustive certificate.

It should not yet be described as established new science. Before
publication, the novelty claim should be checked against MathSciNet, zbMATH,
Google Scholar, and specialist knowledge in coding theory and cellular
automata. Independent reproduction and peer review are also required.

## 13. Questions for readers

1. Has the adjacent-Schur locus of \(G_{23}\) appeared previously under
   different terminology?
2. Is there a representation-theoretic characterization of the selected
   octad orbit inside the \(23{:}11\) normalizer of a 23-cycle in \(M_{23}\)?
3. Do other nonlinear elementary cellular automata select comparably small
   loci in \(G_{23}\), and can those loci be classified uniformly?
4. Is there a family of cyclic codes for which
   \(x\odot\sigma x\in C\) has a design-theoretic classification?
5. Can any such family constrain arbitrarily long traces of Rule 30, rather
   than a single finite ring?

## References

1. E. R. Berlekamp, *Algebraic Coding Theory*, revised edition, World
   Scientific, 2015.
2. J. H. Conway and N. J. A. Sloane, *Sphere Packings, Lattices and Groups*,
   third edition, Springer, 1999.
3. B. Hemenway Falk, N. Heninger, and M. Rudow, “Properties of Constacyclic
   Codes Under the Schur Product,” arXiv:1810.07630, 2018.
4. T. Johnson-Freyd and D. Treumann,
   “\(H^4(Co_0;\mathbb Z)=\mathbb Z/24\),”
   *International Mathematics Research Notices* 2020, no. 21,
   7873--7907.
5. J. Kopra, “A Natural Class of Cellular Automata Containing Fractional
   Multiplication Automata, Rule 30, and Others,” arXiv:2202.13809, 2022.
6. F. J. MacWilliams and N. J. A. Sloane,
   *The Theory of Error-Correcting Codes*, North-Holland, 1977.
7. S. Wolfram, “Statistical Mechanics of Cellular Automata,”
   *Reviews of Modern Physics* 55 (1983), 601--644.
8. S. Wolfram, “Announcing the Rule 30 Prizes,” 2019,
   https://writings.stephenwolfram.com/2019/10/announcing-the-rule-30-prizes/
9. Wolfram Foundation, “The Wolfram Rule 30 Prizes,”
   https://rule30prize.org/

## Appendix A. Machine-readable result

The verifier returns:

~~~json
{
  "codeSize": 4096,
  "compatibleCount": 48,
  "compatibleWeights": {
    "0": 1,
    "8": 23,
    "15": 23,
    "23": 1
  },
  "transitionCounts": {
    "0->0": 1,
    "8->16": 23,
    "15->8": 23,
    "23->0": 1
  },
  "octadOrbitStabilizer": "C23",
  "consecutiveSurvivors": {
    "oneStep": 48,
    "twoSteps": 25,
    "threeSteps": 2
  },
  "centerTrace": {
    "bits": 200000,
    "windows": 199978,
    "uniformExpectationPerOrientation": 97.6455078125,
    "forwardHits": 86,
    "reciprocalHits": 103
  }
}
~~~

