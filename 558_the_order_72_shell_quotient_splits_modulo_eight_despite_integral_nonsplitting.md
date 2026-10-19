# The order-72 shell quotient splits modulo eight despite integral nonsplitting

## Executive result

The finite shell symmetry

\[
G=O(q_J)\cong O^+(4,2)\cong S_3\wr C_2,
\qquad |G|=72,
\]

has explicit orthogonal sections modulo four and modulo eight:

\[
\boxed{
G\hookrightarrow O(H_J,\mathbb Z/4)
\quad\text{and}\quad
G\hookrightarrow O(H_J,\mathbb Z/8).}
\]

Both sections reduce bijectively to the original action on the five-bit discriminant module.

This coexists with the integral nonsplitting theorem:

\[
G\not\hookrightarrow O(H_J,\mathbb Z)
\]

through the required five-dimensional signature-\((2,3)\) representation.

Therefore the obstruction is not visible at the first two nontrivial binary lifting stages. It may occur at modulus \(16\) or higher, but the evidence now makes a genuinely global or archimedean obstruction increasingly plausible.

## 1. From cohomological existence to explicit matrices

Cycle 473 proved that the first-layer cocycle

\[
z\in Z^2(G,K(2)/K(4))
\]

is a twisted coboundary. The certificate now extracts an actual normalized cochain

\[
f:G\to W,
\qquad \dim W=7,
\]

from the 504-variable elimination system.

The system has rank

\[
495,
\]

leaving a nine-dimensional affine family of solutions. One selected solution takes 28 distinct values on the 72 group elements.

Correcting the original lifts by this cochain produces matrices \(R_A\) satisfying

\[
R_A\bmod2=A,
\]

\[
R_A^TH_JR_A\equiv H_J\pmod4,
\]

and

\[
R_AR_B\equiv R_{AB}\pmod4
\]

for all

\[
(A,B)\in G^2.
\]

The 72 corrected matrices remain distinct modulo four. Hence they form an explicit subgroup isomorphic to \(G\).

## 2. Explicit mod-four generators

A generating pair for the finite quotient is represented modulo four by

\[
R_1=
\begin{pmatrix}
1&0&0&0&0\\
0&1&0&0&0\\
0&0&1&0&0\\
0&0&0&0&3\\
0&0&0&3&0
\end{pmatrix}
\]

and

\[
R_2=
\begin{pmatrix}
0&1&0&0&2\\
1&2&0&2&1\\
0&0&3&0&0\\
2&3&0&3&2\\
0&2&0&0&3
\end{pmatrix}.
\]

Their generated matrix group has order 72 and is reduction-bijective onto \(O(q_J)\).

This is stronger than abstract vanishing of a cohomology class: the modular section is executable.

## 3. A three-generator wreath presentation

For the mod-eight step, choose generators

\[
a,\quad b,\quad t
\]

such that

\[
a^2=b^3=(ab)^2=t^2=1.
\]

The conjugates

\[
a'=tat,
\qquad
b'=tbt
\]

generate the second \(S_3\) factor and commute with the first:

\[
[a,a']=[a,b']=[b,a']=[b,b']=1.
\]

These relations present

\[
(S_3\times S_3)\rtimes C_2
\cong S_3\wr C_2.
\]

Working with this presentation reduces the next lifting problem to corrections of only three generator matrices.

## 4. The mod-eight lifting equations

Write a candidate lift of each corrected mod-four generator as

\[
\widetilde R_g=R_g+4X_g\pmod8,
\qquad
g\in\{a,b,t\},
\]

where each \(X_g\) is a \(5\times5\) binary matrix.

There are therefore

\[
3\cdot25=75
\]

binary variables.

Two families of linear conditions are imposed:

### Orthogonality

\[
\widetilde R_g^TH_J\widetilde R_g
\equiv H_J\pmod8.
\]

### Presentation relations

Every defining wreath-product word must evaluate to the identity modulo eight.

The combined exact binary system has rank

\[
58
\]

and is consistent. It therefore has a 17-dimensional affine solution space.

## 5. Explicit mod-eight section

One solution gives

\[
\widetilde R_a=
\begin{pmatrix}
5&0&0&0&0\\
0&5&0&0&0\\
0&0&5&0&0\\
0&0&0&4&7\\
0&0&0&7&4
\end{pmatrix},
\]

\[
\widetilde R_b=
\begin{pmatrix}
2&5&0&1&2\\
5&2&0&5&2\\
0&0&1&0&0\\
1&5&0&5&5\\
6&6&0&1&0
\end{pmatrix},
\]

and

\[
\widetilde R_t=
\begin{pmatrix}
1&2&0&2&1\\
0&1&0&4&2\\
0&0&7&0&0\\
6&7&0&7&2\\
4&6&0&0&7
\end{pmatrix}
\pmod8.
\]

The certificate independently verifies:

\[
\widetilde R_g^TH_J\widetilde R_g=H_J\pmod8
\]

for all three generators;

all eight defining presentation relations;

closure to exactly 72 distinct matrices;

and bijective reduction onto the 72 matrices of \(O(q_J)\).

Thus

\[
\boxed{G\hookrightarrow O(H_J,\mathbb Z/8).}
\]

## 6. The three levels now separated

The same finite group behaves differently at three levels.

### Discriminant level

\[
G=O(q_J)
\]

acts exactly on the five-bit shell.

### Finite binary congruence levels

\[
G\hookrightarrow O(H_J,\mathbb Z/4),
\qquad
G\hookrightarrow O(H_J,\mathbb Z/8).
\]

The symmetry is coherent and finite.

### Integral Lorentzian level

\[
G\not\hookrightarrow O(H_J,\mathbb Z)
\]

as a section of the reduction map, because a faithful real five-dimensional \(G\)-representation cannot preserve signature \((2,3)\).

Finite congruence coherence therefore does not imply an integral finite symmetry.

## 7. Archimedean versus deeper two-adic obstruction

The mod-eight section leaves two possibilities.

### Finite-depth failure

The lifting equations may become inconsistent at modulus

\[
16,\ 32,\ \ldots
\]

This would locate a genuine deeper two-primary obstruction.

### Compatible two-adic section

Sections may lift through every modulus \(2^n\), producing

\[
G\hookrightarrow O(H_J,\mathbb Z_2),
\]

while no integral section exists. In that case the obstruction is global/archimedean: the two-adic representation exists, but no rational-integral realization has the required real signature.

The present computation favors neither conclusion decisively, but it eliminates mod four and mod eight as obstruction levels.

## 8. Consequence for theta and quartic orientation

The old quartic theta line cannot be identified with:

- failure to lift from mod two to mod four;
- failure to lift from mod four to mod eight;
- either of the two first-layer coinvariant bits.

Any valid identification must use more structure:

- a quadratic refinement of the modular section;
- a spin, Clifford or metaplectic central extension;
- a multiplier associated with state transport rather than matrix lifting;
- a deeper congruence level;
- a global compatibility condition involving the real place.

The distinction matters: an orientation phase can remain nontrivial even when the underlying orthogonal matrices lift perfectly.

## 9. Claim status

### Established

- an explicit normalized cochain trivializes the first-layer cocycle;
- the corrected mod-four matrices form a 72-element subgroup;
- a 75-variable mod-eight lifting system is consistent with rank 58;
- the displayed three matrices are orthogonal modulo eight;
- they satisfy a presentation of \(S_3\wr C_2\);
- they generate exactly 72 matrices and reduce bijectively to \(O(q_J)\);
- the shell quotient splits modulo four and modulo eight.

### Candidate bridge

- a compatible two-adic shell symmetry may exist despite integral nonsplitting;
- the mismatch between two-adic and real realizations may be an arithmetic analogue of the programme's two-face structure;
- theta orientation may measure state-space lifting rather than orthogonal-matrix lifting.

### Not established

- lifting to modulus 16;
- compatible sections for all \(2^n\);
- an embedding into \(O(H_J,\mathbb Z_2)\);
- a relation between the modular sections and Furey operators;
- a theta or Clifford phase on these explicit generators.

## 10. Stop-everything and falsification gates

### Stop-everything results reached

1. The order-72 shell symmetry has an explicit mod-four section.
2. It also has an explicit mod-eight section.
3. Integral nonsplitting is not an early binary congruence obstruction.

### Next stop-everything gates

1. The mod-eight section fails to lift modulo 16.
2. It lifts successively to high powers with a stable smooth lifting law.
3. The explicit generators acquire the established theta multiplier or Clifford phase.
4. A real-place compatibility condition alone prevents global integral realization.

### Falsification boundaries

1. Mod-eight splitting does not prove a two-adic section.
2. Two-adic splitting would not contradict the real signature theorem.
3. Modular matrix lifting does not automatically lift quantum phases or state spaces.

## 11. Next calculations

1. Lift the three presentation generators from modulus eight to modulus 16.
2. Derive the general linearized lifting equation from \(2^n\) to \(2^{n+1}\).
3. Test whether ranks and free dimensions stabilize.
4. Evaluate theta/Clifford multipliers on the explicit \(a,b,t\) generators.

## Certificate and companions

> **Cycle 475 strengthening.** The mod-eight solution family has been exhausted: exactly 1024 of its \(2^{17}\) members lift to modulus 16. Repeating the full quadratic-family test gives the same 1024-way continuation at every stage through \(2^{16}\). See [Compatible shell sections lift through \(2^{16}\) with a stable 1024-way recursion](559_compatible_shell_sections_lift_through_2_to_the_16_with_a_stable_1024_way_recursion.md).

- [Explicit mod-four and mod-eight section certificate](scripts/compute_five_bit_shell_lift_cocycle_first_congruence_layer.mjs)
- [First-layer cocycle analysis](557_the_shell_lift_cocycle_is_trivial_modulo_four_and_the_nonsplitting_may_be_archimedean.md)
- [Integral nonsplitting theorem](556_the_order_72_shell_symmetry_lifts_elementwise_but_the_integral_extension_does_not_split.md)

