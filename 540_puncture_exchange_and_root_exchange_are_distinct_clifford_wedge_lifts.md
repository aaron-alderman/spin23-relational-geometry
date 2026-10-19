# Puncture exchange and root exchange are distinct Clifford–wedge lifts

## Status

**Exact integral, binary and primitive-wedge comparison.**

Two involutions that coincide away from the prime two have now been tracked through all three relevant layers:

| involution | integral \(D_2\) matrix | binary action | primitive-wedge effect |
|---|---:|---:|---|
| source puncture exchange | \(A=\operatorname{diag}(1,-1)\) | identity | fixes the index-six fiber |
| \(D_2\) root exchange | \(R=\begin{psmallmatrix}0&1\\1&0\end{psmallmatrix}\) | qubit SWAP | transports to the adjacent index-six fiber |

The earlier symmetry ambiguity is therefore resolved structurally. These are different integral lifts whose odd-prime shadows are conjugate but whose two-primary shadows are not.

## 1. Integral symplectic lifts

On \(D_2\oplus D_2^*\), both involutions lift symplectically:

\[
S_A=\operatorname{diag}(A,A),
\qquad
S_R=\operatorname{diag}(R,R).
\]

They satisfy

\[
S_A^TJS_A=J,
\qquad
S_R^TJS_R=J.
\]

But modulo two,

\[
\boxed{A\equiv I\pmod2},
\qquad
\boxed{R\not\equiv I\pmod2}.
\]

Thus the finite binary Heisenberg group forgets the sign carried by source puncture exchange. No calculation internal to that binary group can reconstruct the missing integral sign without extra lift data.

## 2. Binary Clifford actions

The reduction of \(S_A\) acts trivially on

\[
L\oplus L^*.
\]

Any Clifford operator covering it is therefore determined only up to a Pauli operator and central phase. The source lattice does not select such a residual binary operator merely from reduction.

By contrast, \(S_R\) is represented by the two-qubit SWAP operator:

\[
\mathsf{SWAP}|x_1,x_2\rangle=|x_2,x_1\rangle.
\]

It acts by

\[
X_1\leftrightarrow X_2,
\qquad
Z_1\leftrightarrow Z_2.
\]

For

\[
q(x_1,x_2)=3x_1+3x_2\pmod4,
\]

one has

\[
q(Rx)=q(x).
\]

Hence

\[
\boxed{[\mathsf{SWAP},U_q]=0},
\qquad
U_q=S^\dagger\otimes S^\dagger.
\]

On the embedded quartic extension,

\[
\mathsf{SWAP}:\quad
-iX_1\longleftrightarrow-iX_2.
\]

Root exchange therefore supplies the nontrivial binary exchange symmetry that puncture exchange cannot supply.

## 3. Primitive-wedge actions

In the primitive basis

\[
(E_1,F_1,E_2,F_2,R_0),
\]

source puncture exchange acts as

\[
W_A=\operatorname{diag}(-1,-1,-1,-1,1).
\]

For the index-six basis

\[
v=E_1+F_1,\quad
w=E_1-F_1,\quad
r=R_0,\quad
s=E_2,\quad
t=-3F_2,
\]

this gives

\[
(v,w,r,s,t)\mapsto(-v,-w,r,-s,-t).
\]

It therefore preserves the lattice \(M\).

Root exchange acts as

\[
E_1\mapsto-E_1,\quad
F_1\mapsto-F_1,\quad
E_2\mapsto-F_2,\quad
F_2\mapsto-E_2,\quad
R_0\mapsto-R_0.
\]

Consequently,

\[
s\mapsto-F_2=\frac{t}{3},
\qquad
t\mapsto3E_2=3s.
\]

It does not preserve \(M\); it transports \(M\) to the adjacent fiber in which the level-three restriction lies on the other null leg.

## 4. The resolved dictionary

The correct three-level statement is now:

1. **integral charge lattice:** puncture exchange is the diagonal sign \(A\);
2. **binary Heisenberg shadow:** that sign disappears, while root exchange remains as SWAP;
3. **primitive \(Spin(2,3)\) wedge:** puncture exchange fixes the selected fiber, while root exchange transports it.

This explains why the support weak-class swap could match the \(D_2\) root exchange but not source puncture exchange. The matching is a match to a distinct symmetry, not an equivariant realization of the original puncture permutation.

## 5. Consequences for the programme

### Strengthened

- the binary Heisenberg completion now carries an exact nontrivial root-exchange Clifford operator;
- that operator preserves the quartic phase;
- the two possible null-leg orientations are exchanged by its integral primitive-wedge lift;
- the earlier two-primary obstruction has a complete layer-by-layer interpretation.

### Pinned

- source puncture exchange has no distinguished nontrivial binary Clifford shadow;
- root exchange is absent from the computed two-puncture code automorphism group as a relative puncture sign;
- therefore SWAP cannot yet be identified with a physical code automorphism merely because it preserves the phase.

## 6. Stop-everything and falsification gates

### Stop-everything

1. A larger code or doubled Dirac carrier realizes \(R\) while restricting to the observed twice-punctured phase.
2. A Jordan/Furey orientation variable distinguishes the two integral lifts and selects the root-exchange fiber transport.
3. The adjacent fibers become two local charts or two faces of one \(Spin(2,3)\) carrier with an observable transition.

### Boundaries

- binary reduction cannot see the integral puncture sign;
- a Clifford lift of the binary identity is not canonical;
- root SWAP preserves the phase but is not presently a symmetry of the source punctured code;
- odd-prime conjugacy does not erase the integral or binary distinction.

## Certificate and companions

- [Puncture/root Clifford–wedge certificate](scripts/separate_puncture_and_root_exchange_clifford_wedge_lifts.mjs)
- [Binary Heisenberg and quartic Clifford embedding](539_the_quartic_extension_embeds_in_the_binary_heisenberg_group_and_its_phase_is_a_clifford_shear.md)
- [Two-primary conjugacy obstruction](532_coordinate_exchange_and_d2_root_exchange_are_conjugate_away_from_two_but_not_integrally.md)
- [Source-derived \(D_2\) fiber stabilizer](530_the_two_puncture_d2_lattice_supplies_the_missing_binary_phase_and_fixes_the_index_six_fiber.md)
