# The 1024 continuing sections are translates of one fixed ten-plane

## Executive result

The stable count

\[
1024=2^{10}
\]

in the binary shell-lifting tower has an exact linear-geometric explanation.

At every tested level from modulus 16 through modulus \(2^{16}\), the set of sections that continue one level higher is an affine ten-dimensional subspace

\[
\boxed{\mathcal C_n=s_n+U\subset\mathbb F_2^{17},}
\]

where:

- \(s_n\) is a level-dependent offset;
- \(U\) is a fixed ten-dimensional linear subspace;
- the same \(U\) occurs exactly at every tested level.

Thus

\[
|\mathcal C_n|=|U|=2^{10}=1024
\]

for a structural reason.

At the same time, the full pulled-back quadratic compatibility polynomials do **not** repeat exactly. The simple stationary-polynomial hypothesis is falsified. Stability lives in the common affine direction space, not in literal equality of the equations or offsets.

This is the strongest finite evidence so far for an inductive two-adic section, but it is not yet an all-level theorem.

## 1. The 17-bit section family

At each lifting stage, the three wreath-product generators receive binary matrix corrections

\[
X_a,\quad X_b,\quad X_t\in M_5(\mathbb F_2).
\]

The combined orthogonality and presentation system has:

\[
75\text{ variables},
\qquad
\operatorname{rank}=58.
\]

Hence its solution set is an affine space of dimension

\[
75-58=17.
\]

After choosing a consistent coordinate system, every section at that level is labelled by

\[
x\in\mathbb F_2^{17}.
\]

The question “does this section lift one level higher?” becomes a Boolean compatibility system on \(x\).

## 2. Quadratic compatibility equations

The next-level defects include carry terms. Consequently the compatibility functions are not generally affine in the 17 free bits.

The certificate reconstructs their exact algebraic normal form:

\[
F_n(x)
=c_n+L_n(x)+Q_n(x),
\]

where:

- \(c_n\) is constant;
- \(L_n\) is linear;
- \(Q_n\) is quadratic.

The degree-two bound is checked by:

1. evaluating all inputs of weights zero, one and two;
2. reconstructing \(c_n,L_n,Q_n\);
3. verifying the result on every input of weight three.

The continuing set is

\[
\mathcal C_n=\{x\in\mathbb F_2^{17}:F_n(x)=0\}.
\]

## 3. The naïve stationary hypothesis fails

One possible explanation for the repeated count was that the same quadratic system reappeared at every level.

The certificate compares the complete coefficient signatures of \(F_n\). They do not agree:

\[
F_n\ne F_{n+1}
\]

in the fixed 17-bit coordinates.

The lexicographically first compatible masks also vary:

\[
32768,\ 4098,\ 4610,\ 36866,\ 36864,\ 37378,\ldots
\]

Therefore there is no literal fixed correction mask or repeated full compatibility polynomial in the selected coordinates.

This closes the simplest proposed induction.

## 4. Every solution set is affine

For each level, choose one solution \(s_n\in\mathcal C_n\) and form the difference set

\[
D_n=\{x+s_n:x\in\mathcal C_n\}.
\]

The certificate computes the binary rank of \(D_n\). At every tested level:

\[
\operatorname{rank}(D_n)=10
\]

and

\[
|D_n|=1024=2^{10}.
\]

A subset containing zero, spanning a ten-dimensional space and containing all \(2^{10}\) elements of that span is exactly that linear space. Hence

\[
D_n=U_n
\]

is a ten-dimensional subspace and

\[
\mathcal C_n=s_n+U_n.
\]

So the apparently quadratic compatibility variety collapses to an affine plane on the actual 17-dimensional solution family.

## 5. The direction subspace is exactly stationary

The complete sets \(U_n\) are compared in the same fixed coordinate system. They agree element by element:

\[
\boxed{U_n=U}
\]

at every tested rung.

Only the affine offset changes:

\[
\mathcal C_n=s_n+U.
\]

This is stronger than stability of dimension or cardinality. The ten freely continuing directions are exactly the same binary correction directions throughout the computed tower.

Equivalently, the seven-dimensional quotient

\[
\mathbb F_2^{17}/U
\]

contains the level-dependent obstruction value. Continuation requires the 17-bit correction to land in one specified coset of \(U\).

## 6. Relation to the seven-dimensional correction module

The quotient dimension is

\[
17-10=7.
\]

Cycle 473 independently found a seven-dimensional congruence correction module

\[
W.
\]

The persistent affine geometry therefore has the exact dimensional pattern

\[
0\longrightarrow U
\longrightarrow\mathbb F_2^{17}
\longrightarrow W
\longrightarrow0.
\]

The present calculation establishes dimensions and stationary subspaces, but it has not yet constructed a canonical isomorphism

\[
\mathbb F_2^{17}/U\overset{?}{\cong}W.
\]

Constructing that quotient map is now the natural route to an inductive proof.

## 7. Toward an all-level induction

The observed recursion has the form:

\[
\text{choose }x_n\in s_n+U,
\]

then compute the next offset \(s_{n+1}\).

An all-level proof would follow from either of two results.

### Quotient-surjectivity proof

Show that the seven obstruction coordinates at level \(n+1\) can always be cancelled by the quotient

\[
\mathbb F_2^{17}/U.
\]

### Cohomological proof

Identify the seven-dimensional quotient with the correction module \(W\) and prove the relevant obstruction class vanishes uniformly at every congruence depth.

The stable affine direction makes both routes plausible. Neither has yet been completed.

## 8. Meaning for the local/global problem

The binary tower is not surviving by isolated accidents. It has:

- constant equation rank;
- constant free dimension;
- constant continuing dimension;
- one fixed continuing direction subspace.

The only moving datum is an affine offset that has always landed in a nonempty coset through \(2^{16}\).

This strengthens the conjecture

\[
G\hookrightarrow O(H_J,\mathbb Z_2).
\]

If proved, the programme would have a clean local/global contrast:

\[
\begin{aligned}
G&\hookrightarrow O(H_J,\mathbb Z_2),\\
G&\not\hookrightarrow O(H_J,\mathbb R)\text{ with signature }(2,3),\\
G&\not\hookrightarrow O(H_J,\mathbb Z)
\text{ as a reduction section}.
\end{aligned}
\]

The finite shell symmetry would then be genuinely two-adic but not globally Lorentzian-integral.

## 9. Claim status

### Established computationally through \(2^{16}\)

- the full compatibility polynomial changes with level;
- every continuing set contains exactly 1024 points;
- every continuing set is an affine ten-plane;
- the ten-dimensional direction subspace is exactly the same at every tested level;
- only the affine offset changes;
- the quotient dimension is seven.

### Candidate theorem

- the fixed quotient \(\mathbb F_2^{17}/U\) is canonically the seven-dimensional correction module;
- every offset can be cancelled at every depth;
- the shell group embeds in \(O(H_J,\mathbb Z_2)\);
- integral nonsplitting is purely global/archimedean.

### Falsified

- literal repetition of one compatibility polynomial;
- one stationary correction mask in the chosen coordinates;
- treating the repeated cardinality alone as sufficient evidence of induction.

### Not established

- the canonical seven-dimensional quotient map;
- an all-level offset recurrence;
- a proof that every future compatibility coset is nonempty;
- a closed form for the two-adic generators.

## 10. Stop-everything and falsification gates

### Stop-everything results reached

1. The 1024 continuing sections are affine, not an arbitrary quadratic variety.
2. Their direction space is exactly stationary through every tested level.
3. The full quadratic systems themselves are not stationary.

### Next stop-everything gates

1. Identify \(\mathbb F_2^{17}/U\) canonically with the correction module \(W\).
2. Prove the affine offset recurrence always has a solution.
3. Construct the inverse-limit \(\mathbb Z_2\)-representation.
4. Relate the seven obstruction coordinates to theta, Clifford or real-place data.

### Falsification boundaries

1. Stationary direction through \(2^{16}\) is not an all-level proof.
2. The dimensional match with \(W\) is not yet a canonical identification.
3. A two-adic section would not imply an integral or real section.

## 11. Next calculations

1. Compute an explicit basis for \(U\) and the seven quotient functionals.
2. Match those functionals to the first congruence correction basis.
3. Derive the offset transition map in quotient coordinates.
4. Test whether the transition is affine-linear, periodic or cohomologically trivial.

## Certificate and companions

> **Cycle 477 strengthening.** Explicit bases for the ten-plane and its seven quotient functionals have been extracted. The quotient offsets span exactly five dimensions, leaving two stationary directions—the same \(5+2\) filtration independently found in the correction module. See [The binary lift offsets reproduce the \(5+2\) filtration of the correction module](561_the_binary_lift_offsets_reproduce_the_five_plus_two_filtration_of_the_correction_module.md).

- [Affine compatibility-plane certificate](scripts/compute_five_bit_shell_lift_cocycle_first_congruence_layer.mjs)
- [Stable lifting through \(2^{16}\)](559_compatible_shell_sections_lift_through_2_to_the_16_with_a_stable_1024_way_recursion.md)
- [First congruence module](557_the_shell_lift_cocycle_is_trivial_modulo_four_and_the_nonsplitting_may_be_archimedean.md)

