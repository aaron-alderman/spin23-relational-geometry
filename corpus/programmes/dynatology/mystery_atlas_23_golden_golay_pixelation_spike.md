# Mystery Atlas 23: Golden Contraction and Golay Pixelation

**Date:** 28 October 2026

**Status:** exact arithmetic and perfect-code bridge; intrinsic 55-support ordering not established

**Machine record:** [golden--Golay pixelation record](golden_golay_pixelation_v1.json)

**Certificate:** [golden--Golay verifier](../../../verification/verify/verify_dynatology_golden_golay_pixelation.mjs)

## Result

The proposed “nearest-integer pixel” interpretation separates into two exact
operations:

1. the golden transformation produces an irrational stable-direction residue;
2. the ternary Golay code maps a finite noisy observation to one unique
   admissible codeword.

They fit together mathematically, but the encoder between their carriers is
still missing.

Let

\[
S=\begin{pmatrix}2&1\\1&1\end{pmatrix}.
\]

This is the integral Penrose/Fibonacci action already present in the corpus.
Its fifth iterate is

\[
S^5=\begin{pmatrix}89&55\\55&34\end{pmatrix},
\qquad
\operatorname{tr}(S^5)=123,
\qquad
\det(S^5)=1.
\]

The eigenvalues are \(\varphi^{10}\) and \(\varphi^{-10}\). The error made by
aliasing a golden turn to 21 steps on a 55-pixel circle is exactly

\[
\boxed{
\frac{55}{\varphi^2}-21
=34-\frac{55}{\varphi}
=\varphi^{-10}
=0.008130618755\ldots
}.
\]

Thus `0.00813` is not an unexplained numerical coincidence. It is the
contracting eigenvalue of the same integral transformation whose matrix
contains `34` and `55`.

## 1. The ternary Golay code is an exact finite pixelation

For the ternary Golay code

\[
C_{11}\subset\mathbb F_3^{11},
\qquad [11,6,5]_3,
\]

the radius-two Hamming ball contains

\[
1+11(3-1)+\binom{11}{2}(3-1)^2
=1+22+55\cdot4
=243=3^5
\]

vectors. Since \(|C_{11}|=3^6\),

\[
|C_{11}|\,|B_2|=3^6 3^5=3^{11}.
\]

The verifier checks more than this count. Using the corpus's five-row parity
check for the ternary Golay code, it enumerates all 243 errors of weight at
most two and proves that their syndromes are distinct. Every received vector
therefore has one unique nearest codeword. These radius-two balls are exact
finite “pixels”: no gaps and no overlaps.

The decoder is deterministic:

```text
received trit vector r in F3^11
  -> syndrome s = H r^T in F3^5
  -> unique weight-at-most-two error e(s)
  -> codeword c = r - e(s)
```

No language model is involved.

## 2. Where 55 meets both constructions

The same number has two declared roles:

\[
55=F_{10}=\binom{11}{2}.
\]

- In the golden lane it is the denominator of the convergent
  \(21/55\approx\varphi^{-2}\).
- In the Golay lane it counts the two-coordinate error supports and the 55
  secants of the Coxeter 11-cap.

The complement `34=55-21` gives the opposite orientation. Arithmetic modulo
55 adds a further exact structure:

\[
\mathbb Z_{55}\cong\mathbb Z_5\times\mathbb Z_{11},
\]

\[
21\mapsto(1,-1),
\qquad
34\mapsto(-1,1),
\]

so

\[
21^2\equiv34^2\equiv1,
\qquad
21\cdot34\equiv-1\pmod{55}.
\]

As additive steps, both traverse all 55 labels because they are coprime to
55. This supplies a reversible low-discrepancy scan order once a cyclic
labelling has been chosen.

## 3. The decisive no-go: the golden step is not selected by a bare 55-cycle

The translation \(x\mapsto x+21\) is conjugate to \(x\mapsto x+1\) under the
automorphism \(x\mapsto21x\), because \(21^{-1}=21\pmod{55}\). More generally,
all generators of the cyclic translation group are equivalent under
re-labelling.

Therefore neither `C55` nor the cardinality of the Golay secant set selects
step 21. A labelling of the 55 two-coordinate supports by \(\mathbb Z_{55}\)
can always be chosen to make almost any full traversal look like the golden
one. That is representation freedom, not evidence.

The native Golay symmetry strengthens this no-go. The sharply
four-transitive `M11` action is transitive on the 55 unordered pairs of its
eleven coordinates, so no `M11`-invariant scalar attached to one secant can
distinguish a starting point. Moreover, no permutation of eleven coordinates
has order 55: an order divisible by both 5 and 11 would require disjoint
5- and 11-cycles, already needing sixteen coordinates. The induced action on
coordinate pairs cannot have larger order than its coordinate permutation.
Hence a 55-step scan is not the orbit of one existing Golay coordinate
symmetry.

This does not prohibit a useful traversal. It says what extra object must
author it: a marked orientation, non-invariant metric, external clock,
extended carrier, or scheduler. Such an addition should be visible as added
structure rather than attributed retroactively to the perfect code.

The proposed bridge becomes intrinsic only if an independently specified
metric, orientation or transport law on the Golay supports makes the
`21/34` pair distinguished before the golden fit is inspected.

## 4. Continuous-to-integer interpretation

A continuous observation can be attached to the finite decoder through a
declared quantizer. One natural construction is

\[
\Lambda_C=
\{z\in\mathbb Z^{11}:z\bmod3\in C_{11}\}.
\]

The intended pipeline is

```text
continuous observation x in R^11
  -> declared integer/trit quantizer
  -> Golay syndrome correction
  -> admissible integer residue class in Lambda_C.
```

This justifies “practically rational up to \(\mathbb Z\)” only at a declared
resolution and metric. Hamming-nearest decoding of residues is not
automatically Euclidean-nearest lattice decoding. The quantizer, norm,
boundary convention and tie rule are part of the result, not implementation
details.

If the golden stable-coordinate error enters the quantizer with one-pixel
scale, its magnitude \(\varphi^{-10}<0.009\) is deeply inside a nominal unit
cell. But Golay's guarantee is about up to two corrupted trit coordinates,
not about an untyped scalar amplitude. An explicit eleven-channel encoder is
required before those robustness statements can be combined.

## 5. Next admissible test

The next test is deliberately capable of returning null:

1. use the established Coxeter-cap construction to enumerate its 55 secants;
2. derive candidate edge weights or orientations from projective incidence,
   the Golay trilinear tensor, or a declared physical measurement—not from a
   post-hoc cyclic label;
3. optimize cyclic traversals against that frozen geometry;
4. compare the golden `+21` traversal with the full coprime-step control set
   and with random Hamiltonian traversals;
5. hold out an invariant such as weighted transport cost, discrepancy,
   syndrome locality or response to the `M11` action;
6. promote the bridge only if the `21/34` orientation pair is distinguished
   without choosing the labels that make it so.

Possible outcomes are:

- **positive:** a source-native Golay metric selects a conjugacy class of
  traversals containing the golden pair;
- **useful engineering only:** golden order improves scan discrepancy but is
  not Golay-invariant and acts as an explicit scheduler;
- **null:** it performs like generic coprime steps once labels and controls are
  randomized.

The present result is already useful without promotion. It identifies an
exact golden contraction, an exact perfect-code pixelation and the precise
intertwiner that would be needed to claim they are one mechanism.

## 6. First executable use: a minimal-churn secant scheduler

The golden step can already be used honestly as an authored scheduler. The 55
two-coordinate supports are the edges of the complete graph `K11`. Since each
vertex has even degree ten, `K11` has an Euler circuit containing every edge
exactly once. Consecutive edges in that circuit share one coordinate.

The certificate constructs one deterministic Euler circuit and labels its
successive edges by

\[
\ell_n=21n\pmod{55}.
\]

Then adding 21 advances one support along the circuit, while adding
`34=-21 mod 55` traverses exactly the same schedule backwards. The compiled
schedule has:

- all 55 supports visited once;
- 55 out of 55 cyclic transitions sharing one coordinate;
- symmetric-difference size two at every transition, so only one of the two
  active coordinate positions is replaced;
- exact forward/reverse orientation supplied by the `21/34` pair.

A uniformly random cyclic ordering has expected shared-coordinate transitions

\[
55\frac{18}{54}=\frac{55}{3}\approx18.33,
\]

because a given edge of `K11` has 18 neighbours among the other 54 edges.
The compiled scheduler reaches the maximum 55. This is a real engineering
benefit: it minimizes support churn while scanning every double-error
position.

It is not evidence that Golay selects the golden angle. Any step coprime to 55
can be compiled onto the same Euler circuit by changing the labels. The
invariant content is the Eulerian minimal-churn schedule; the golden content
is its visible forward/reverse address convention and its separately derived
subpixel residual.

The next layer is the four nonzero value assignments on each support. It also
compiles exactly. For every oriented Euler edge `(a,b)`, use the ternary
nonzero-value Gray path

```text
(+,+) -> (+,-) -> (-,-) -> (-,+).
```

Inside each four-state block, exactly one trit changes. The last state has
value `+` on `b`, and the next block begins with value `+` on that same shared
coordinate. Consequently the boundary move removes one nonzero coordinate and
adds one new nonzero coordinate while retaining the shared trit.

The resulting cyclic schedule visits all

\[
55\times4=220
\]

weight-two error vectors exactly once. Its transition census is:

```text
165 within-support transitions at Hamming distance 1
 55 between-support transitions at Hamming distance 2
  0 transitions beyond the Golay correction radius
```

Every scheduled state has a distinct syndrome by the perfect-code
certificate. Reversing the schedule gives the `+34` orientation. This is now a
complete deterministic scan of the double-error shell, although it still does
not derive a physical eleven-channel encoder or select the golden address
convention from Golay symmetry.

## 7. The complete 243-pixel sphere also has a bounded-step cycle

The zero error and the 22 signed single-coordinate errors can be inserted into
the 220-state cycle deterministically. Starting from the signed double-error
cycle, process the 22 single errors in coordinate order and sign order, then
the zero vector. For each insertion, choose the current cyclic edge that
lexicographically minimizes:

1. the larger of the two new Hamming distances;
2. the increase in total transition distance relative to the replaced edge;
3. the first edge position in the current cycle.

The certificate reconstructs this rule rather than trusting a stored route.
It produces one 243-state cycle containing every radius-two error and every
syndrome exactly once, with transition census

```text
198 transitions at Hamming distance 1
 45 transitions at Hamming distance 2
  0 transitions beyond correction radius 2.
```

Thus the entire Golay decoding pixel is traversable without a jump larger than
the code can correct. The 55-support golden schedule remains visible as the
weight-two backbone; the 23 lower-weight states act as calibration insertions.
The particular insertion route is an authored deterministic compiler output,
not an `M11` invariant.

## 8. Exhaustion boundary: the continuous encoder is scale-underdetermined

The finite construction is complete, but the proposed continuous bridge is
not determined by \(\varphi^{-10}\) alone. A scalar residual becomes a trit
only after choosing a channel map, gain, thresholds and tie convention. Even
the one-channel family

\[
q_a(r)=\operatorname{round}(a r)\bmod3
\]

can send the same nonzero residual \(r=\varphi^{-10}\) to different trits as
the gain \(a\) changes. With unit gain and a nearest-integer cell of width one,
the residual lies safely in the zero cell because

\[
\varphi^{-10}<\frac12.
\]

That is a conditional robustness statement, not a canonical physical
encoding. Eleven channels add still more freedom: a frame or measurement map
must say how the scalar stable mode projects into \(\mathbb R^{11}\).

Accordingly this seam is exhausted at the present authority boundary. Further
work requires at least one independently supplied object:

- a physical eleven-channel response map and calibrated noise scale;
- a source-native metric or orientation on the Coxeter-cap secants;
- an `M11`-equivariant extended carrier whose extra state authors a traversal;
- or a real workload for which the scheduler can be benchmarked as an
  engineering choice.

Without one of these, further tuning would optimize an arbitrary encoder and
manufacture the desired relation.
