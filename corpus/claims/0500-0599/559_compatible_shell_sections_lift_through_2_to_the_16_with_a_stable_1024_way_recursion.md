# Compatible shell sections lift through \(2^{16}\) with a stable 1024-way recursion

## Executive result

The order-72 shell group

\[
G=O(q_J)\cong S_3\wr C_2
\]

has now been lifted compatibly through every binary modulus

\[
2,\ 4,\ 8,\ 16,\ldots,65536=2^{16}.
\]

At every tested lifting stage from modulus \(2^n\) to \(2^{n+1}\):

- the presentation-lifting system has 75 binary variables;
- its rank is 58;
- its solution space has dimension 17;
- exactly
  \[
  1024=2^{10}
  \]
  of the \(2^{17}\) sections at that level admit a lift to the next level;
- at least one compatible choice generates exactly 72 orthogonal matrices and reduces bijectively to \(G\).

Thus a nested chain of sections has been constructed:

\[
\boxed{
G\hookrightarrow O(H_J,\mathbb Z/2^n)
\quad\text{compatibly for every }n\le16.}
\]

This is strong evidence for a two-adic section

\[
G\hookrightarrow O(H_J,\mathbb Z_2),
\]

but finite computation through \(2^{16}\) is not a proof of the infinite inverse-limit statement.

The integral nonsplitting therefore looks increasingly archimedean/global: the same group is coherent through deep binary precision but cannot preserve a real form of signature \((2,3)\) as a faithful five-dimensional finite subgroup.

## 1. Why one failed section is not an obstruction

Cycle 474 constructed one section modulo eight. The first arbitrary solution of the mod-eight equations failed to lift to modulus 16.

That failure did not prove that \(G\) itself failed to lift. The mod-eight solution system has

\[
75-58=17
\]

free binary parameters, hence

\[
2^{17}=131\,072
\]

distinct presentation-level sections above the fixed mod-four section.

Testing only one point in this family would confuse a poor section choice with a group obstruction.

## 2. Exact family compatibility test

Let \(R_g\) be generator lifts modulo \(2^n\), and write every lift to the next level as

\[
R'_g=R_g+2^nX_g,
\qquad
X_g\in M_5(\mathbb F_2),
\qquad
g\in\{a,b,t\}.
\]

The 75 entries of the three \(X_g\) satisfy:

- orthogonality equations;
- the eight defining relations of the wreath-product presentation.

The coefficient matrix has rank 58, leaving 17 free variables.

To determine which solutions continue one more level, the certificate computes the complete next-level defect. Pulling its 217 compatibility relations back to the 17-dimensional solution family gives Boolean functions of degree two.

The degree bound is verified exactly by reconstructing the algebraic normal form from all inputs of Hamming weights zero, one and two, and checking it on every weight-three input.

The resulting quadratic system is evaluated on all

\[
2^{17}=131\,072
\]

sections.

## 3. The modulus-16 result

For the first mod-eight family, exactly

\[
\boxed{1024}
\]

sections satisfy the modulus-16 compatibility conditions.

One is selected, explicitly lifted, and verified to:

- preserve \(H_J\) modulo 16;
- satisfy the full wreath-product presentation;
- generate exactly 72 matrices;
- reduce bijectively to \(O(q_J)\).

Therefore

\[
G\hookrightarrow O(H_J,\mathbb Z/16).
\]

The initial failed mod-eight choice and the successful choice coexist. The obstruction is section-dependent at this finite stage.

## 4. Stable recursion

The same complete family analysis is then repeated recursively.

\[
\begin{array}{c|c|c|c}
\text{lift}&\text{system rank}&\text{free bits}&\text{continuing sections}\\ \hline
8\to16&58&17&1024\\
16\to32&58&17&1024\\
32\to64&58&17&1024\\
64\to128&58&17&1024\\
128\to256&58&17&1024\\
256\to512&58&17&1024\\
512\to1024&58&17&1024\\
1024\to2048&58&17&1024\\
2048\to4096&58&17&1024\\
4096\to8192&58&17&1024\\
8192\to16384&58&17&1024\\
16384\to32768&58&17&1024\\
32768\to65536&58&17&1024
\end{array}
\]

At every stage the selected continuing section is independently checked for:

\[
R_g^TH_JR_g=H_J\pmod{2^{n+1}},
\]

the presentation relations, group order 72 and bijective reduction.

No binary obstruction appears through \(2^{16}\).

## 5. Interpretation of the number 1024

The continuing subset has size

\[
1024=2^{10}.
\]

Since the full solution family has size \(2^{17}\), the next-level condition removes seven effective binary degrees of freedom:

\[
17-10=7.
\]

This seven matches the dimension of the first congruence correction module found in Cycle 473:

\[
\dim W=7.
\]

The numerical equality is exact and persistent. It suggests that:

- ten directions parameterize freely continuing section choices;
- seven directions encode the correction module that must be retuned at each lift.

This is a structural clue, not yet a theorem identifying the two seven-dimensional objects canonically.

## 6. Evidence for a two-adic section

The compatible sections form a finitely branching tree:

- each level has finitely many sections;
- the computation constructs a node at every level through 16;
- each selected node has 1024 continuing children at the next tested level.

The stable rank and branching pattern strongly suggest a uniform lifting law. If one proves that every compatible node has at least one child at every level, compactness or inverse-limit arguments would produce

\[
G\hookrightarrow O(H_J,\mathbb Z_2).
\]

The computation alone does not establish the required statement for all levels. A finite tree can exhibit a stable initial pattern and later terminate.

Therefore the two-adic section remains a high-confidence conjecture rather than an established theorem.

## 7. The real/global mismatch

Cycle 472 proves that no integral section exists because any faithful five-dimensional real representation of

\[
S_3\wr C_2
\]

has irreducible structure \(4\oplus1\), whose invariant forms cannot have signature \((2,3)\).

The current result establishes a deep local contrast:

\[
\begin{array}{c|c}
\text{place or completion}&\text{status}\\ \hline
\mathbb Z/2^n,\ n\le16&\text{section exists}\\
\mathbb Z_2&\text{strongly suggested, unproved}\\
\mathbb Z&\text{no section}\\
\mathbb R\text{ with signature }(2,3)&\text{no faithful finite realization}
\end{array}
\]

This is an arithmetic local/global pattern: binary congruence data alone does not remember the real signature obstruction.

## 8. Relation to the programme

This result sharpens several branches.

### \(Spin(2,3)\) carrier

The finite shell symmetry is compatible with arbitrarily high tested binary precision inside the quadratic carrier, but not with a global integral finite subgroup.

### Theta and Clifford orientation

No failure of matrix lifting appears through \(2^{16}\). The theta or Clifford phase should therefore not be modeled as a low-order obstruction to lifting orthogonal matrices.

It may instead concern:

- a central lift of the state representation;
- a quadratic refinement;
- a multiplier system;
- compatibility with the real place;
- a global product formula.

### Standard-Model flag

The \(S_3\times S_2\) flag stabilizer splits already integrally. The larger shell group is locally coherent two-adically but globally incompatible. This makes the selected flag a possible meeting point between a global real structure and a larger local arithmetic symmetry.

## 9. Claim status

### Established computationally

- the complete \(2^{17}\)-member mod-eight section family has been tested for continuation;
- exactly 1024 sections lift to modulus 16;
- a compatible section exists at every modulus through \(2^{16}\);
- every lifting system has rank 58 and 17 free variables;
- every tested stage has exactly 1024 continuing sections;
- every selected modular group has order 72 and bijective reduction.

### Conjectured

- the stable recursion persists for all \(n\);
- a section exists over \(\mathbb Z_2\);
- the persistent seven compatibility conditions are canonically the seven-dimensional correction module;
- the failure over \(\mathbb Z\) is purely real/global.

### Not established

- an all-level inductive proof;
- explicit closed two-adic generator formulas;
- compatibility at odd primes in this same presentation;
- a global adelic obstruction or product formula;
- a theta/Clifford multiplier on the compatible inverse system.

## 10. Stop-everything and falsification gates

### Stop-everything results reached

1. The shell group lifts compatibly through modulus \(2^{16}\).
2. The stable lifting family has exactly 1024 continuing choices at every tested stage.
3. No low-depth two-primary obstruction explains integral nonsplitting.

### Next stop-everything gates

1. Prove the 1024-way recursion inductively for every \(n\).
2. Derive closed 2-adic limits for the three generator matrices.
3. Identify a real-place or global product obstruction preventing rational-integral descent.
4. Show that theta/Clifford phases measure the local/global mismatch rather than matrix-lift failure.

### Falsification boundaries

1. Finite verification through \(2^{16}\) is not an infinite proof.
2. A later binary obstruction remains logically possible.
3. A two-adic section would not itself select a physical flag or produce dynamics.

## 11. Next calculations

1. Compare successive correction masks and derive the stationary quadratic recursion.
2. Prove that the compatibility variety always has \(2^{10}\) points.
3. Recover convergent 2-adic generator entries from the compatible chain.
4. Test odd-prime and real-place analogues to formulate a local/global theorem.

## Certificate and companions

> **Cycle 476 refinement.** The full quadratic compatibility polynomials do not repeat. Nevertheless, every 1024-point continuing set is an affine ten-plane, and its ten-dimensional direction subspace is exactly the same at every tested level; only the affine offset changes. See [The 1024 continuing sections are translates of one fixed ten-plane](560_the_1024_continuing_sections_are_translates_of_one_fixed_ten_plane.md).

- [Recursive binary lifting certificate](../../../verification/compute/compute_five_bit_shell_lift_cocycle_first_congruence_layer.mjs)
- [Explicit mod-eight section](558_the_order_72_shell_quotient_splits_modulo_eight_despite_integral_nonsplitting.md)
- [First congruence cocycle](557_the_shell_lift_cocycle_is_trivial_modulo_four_and_the_nonsplitting_may_be_archimedean.md)
- [Integral nonsplitting theorem](556_the_order_72_shell_symmetry_lifts_elementwise_but_the_integral_extension_does_not_split.md)

