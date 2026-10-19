# A Primitive Jordan State Selects the (16) Conditionally, but (E_6) Does Not Select the State

**Date:** 17 October 2026  
**Scope:** exceptional/Furey selector test  
**Claim status:** exact Peirce projector and representation-theoretic obstruction

## Result in plain language

The exceptional (27) does contain a natural mechanism that points to the matter (16), but it is conditional on choosing a state.

A useful everyday picture is a crystal and a compass. Once a direction in the crystal is marked, the crystal itself tells you which plane is perpendicular to it. But the geometry of an unmarked crystal does not choose the initial compass direction.

Here the marked direction is a primitive rank-one idempotent (p). Once (p) is supplied, Jordan multiplication canonically splits the (27) into

\[
\boxed{27=1\oplus16\oplus10.}
\]

The (16) is selected without an arbitrary (27\times27) projector. However, all primitive choices lie on one (E_6) orbit. No (E_6)-invariant low-degree scalar distinguishes one of them.

## 1. Exact Peirce selector

Let

\[
L_p(x)=p\circ x
\]

be Jordan multiplication by a primitive idempotent (p\), so (p\circ p=p). In the complex exceptional Jordan algebra, (L_p) has Peirce eigenvalues

\[
1,\qquad\frac12,\qquad0
\]

with complex multiplicities

\[
\boxed{1,16,10.}
\]

For the coordinate choice

\[
p=\operatorname{diag}(0,0,1),
\]

these spaces are visible directly:

- the selected diagonal entry has eigenvalue (1) and dimension (1);
- the two octonionic entries touching that diagonal slot have eigenvalue (1/2) and total dimension (8+8=16);
- the complementary (2\times2) Hermitian-octonionic block has eigenvalue (0) and dimension (2+8=10).

Lagrange interpolation on these three eigenvalues gives exact intrinsic projectors:

\[
P_1=2L_p^2-L_p,
\]

\[
\boxed{P_{16}=4L_p(1-L_p),}
\]

\[
P_{10}=1-3L_p+2L_p^2.
\]

Thus, given (p), the (16) is not inserted by hand. It is the Peirce-(1/2) space and, geometrically, the tangent space at the selected point of the complex octonionic projective plane.

[Boyle’s construction](https://arxiv.org/abs/2006.16265) states precisely that the complex Cayley plane is

\[
E_6\big/\bigl([U(1)\times Spin(10)]/\mathbb Z_4\bigr),
\]

that the stabilizer fixes the rank-one idempotent up to phase, and that its tangent space is the (16) of (Spin(10)).

## 2. Stabilizer and orbit data

For compact (E_6):

- the exact vector (p) has stabilizer (Spin(10));
- its projective line has stabilizer
  \[
  [Spin(10)\times U(1)]/\mathbb Z_4;
  \]
- the projective orbit has real dimension
  \[
  78-(45+1)=32=2\times16.
  \]

The (16) is therefore the tangent representation of the orbit. This is stronger than merely finding a (16) in a branching table.

It also shows the limitation: selecting the (16) is equivalent to selecting a point on a continuous 32-real-dimensional homogeneous space.

## 3. Why the state is not selected by unbroken (E_6)

The complex (27) is irreducible under (E_6). By Schur’s lemma,

\[
\operatorname{End}_{E_6}(27)=\mathbb C.
\]

Every state-independent (E_6)-equivariant linear operator is therefore (\lambda I). If it is a projector, (\lambda^2=\lambda), so its rank is either (0) or (27), never (16).

Hence:

\[
\boxed{
\text{there is no state-independent (E_6)-equivariant rank-16 projector.}
}
\]

The determinant and other invariant scalars can distinguish rank strata or support a potential whose minima lie on the rank-one orbit. They cannot distinguish two points on the same orbit. A vacuum may therefore select (p) spontaneously, but the invariant alone cannot specify which (p).

There is a constructive positive result here. Compact (E_6) preserves both the Hermitian norm and the exceptional cubic. Using the norm to define the quadratic adjoint (x^\#), the quartic potential

\[
\boxed{
V(x)=\lambda(\lVert x\rVert^2-v^2)^2
+\kappa\lVert x^\#\rVert^2,
\qquad \lambda,\kappa>0,
}
\]

is intrinsic and nonnegative. Its zero set satisfies

\[
\lVert x\rVert=v,
\qquad
x^\#=0.
\]

For nonzero exceptional-Jordan elements, (x^\#=0) is the rank-one condition. Thus a low-degree (E_6)-invariant potential can select the **rank-one vacuum orbit** without inserting (P_{16}) manually. On the diagonal subalgebra this is elementary:

\[
x=\operatorname{diag}(a,b,c),
\qquad
x^\#=\operatorname{diag}(bc,ca,ab),
\]

so (x^\#=0) means at most one entry is nonzero.

What the potential cannot do is select a unique point or phase on that orbit. Every vacuum is symmetry-related. Strictly, it selects a normalized complex rank-one vector; turning that vector into an idempotent satisfying \(p\circ p=p\) also chooses a compatible phase/reality convention. The projective tangent \(16\) is already determined by the line, while the displayed polynomial \(P_{16}(p)\) uses the idempotent representative. After that representative is chosen, its Peirce projector is canonical. This is spontaneous selection, not absolute selection by an invariant number.

If \(x\) is a physical scalar vacuum, this spontaneous selection has an immediate cost. Fixing the exact vector leaves \(Spin(10)\), so a global compact \(E_6\) model has

\[
78-45=33
\]

broken directions. They would be Goldstone modes absent explicit breaking; in a gauged model they instead feed 33 massive gauge fields. If \(x\) is only a geometric reference state rather than a propagating field, this counting is not a particle prediction—but then the programme still needs a rule explaining why that reference state is physically used.

The idempotent equation itself has the same boundary. It identifies the admissible orbit; it does not choose a member of it.

## 4. Three coordinate choices are not three generations

A Jordan frame contains three mutually orthogonal coordinate idempotents. All have

\[
(\operatorname{Tr}p,\operatorname{Tr}p^2,\det p,\operatorname{rank}p)
=(1,1,0,1).
\]

Each selects a 16-dimensional Peirce-(1/2) space. But the three spaces overlap pairwise in one octonionic block:

\[
\dim(V_i\cap V_j)=8.
\]

Their union spans the 24 off-diagonal directions, not (3\times16=48) independent directions. Triality can permute these choices, but they are overlapping views of the same (27), not three independent matter generations.

## 5. Go/no-go verdict

| Question | Verdict |
|---|---|
| Does a primitive Jordan state canonically determine a (16)? | **Yes** |
| Is the projector an arbitrary matrix once (p) is given? | **No; it is (4L_p(1-L_p))** |
| Does unbroken (E_6) choose (p)? | **No** |
| Can an (E_6)-equivariant constant projector have rank (16)? | **No** |
| Can a low-degree invariant potential select the rank-one orbit? | **Yes; an explicit quartic does** |
| Can invariant values select one point within that orbit? | **No** |
| Do the three coordinate idempotents give three independent generations? | **No** |

The exact status is therefore:

> The exceptional geometry converts one chosen vacuum direction into a non-arbitrary matter projector. It does not remove the need to choose or dynamically break into that vacuum.

## 6. Consequence for the “crystal” reading

The crystal reading survives in a precise, limited form. The (27) contains a family of equivalent (16)-dimensional tangent views. Once a face or point is selected, its matter module is geometrically fixed.

What does not survive is the stronger claim that the unmarked exceptional object uniquely identifies our matter embedding. The “view” is relational to a selected point. A physical theory still owes:

- a vacuum-selection mechanism;
- control of the resulting Goldstone/gauge directions;
- an explanation of why one tangent copy is realized;
- a statistics-compatible interpretation of the other Peirce spaces.

## 7. Certificate

```powershell
node scripts/verify_representation_trunk_peirce_16_selector_and_orbit.mjs
```

The certificate verifies the (1,16,10) Peirce multiplicities, all three projector polynomials, stabilizer/orbit dimension bookkeeping, the Schur-projector obstruction, and the overlap of the three coordinate (16)s.

## Related results

- [Furey generation inside the exceptional (27)](representation_trunk_a_the_furey_generation_embeds_in_the_complex_exceptional_27_but_is_not_equivalent_to_the_jordan_module.md)
- [Three triality choices are overlapping](322_triality_gives_three_overlapping_generation_choices_not_three_independent_generations.md)
- [Common exceptional/oscillator flag ambiguity](419_the_common_exceptional_and_oscillator_3plus2_flag_has_a_two_scalar_intertwiner_ambiguity.md)
