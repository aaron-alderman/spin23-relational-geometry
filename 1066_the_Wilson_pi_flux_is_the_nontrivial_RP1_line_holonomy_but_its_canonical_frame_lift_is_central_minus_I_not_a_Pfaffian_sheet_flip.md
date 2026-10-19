# The Wilson \(\pi\) Flux Is the Nontrivial \(\mathbb{RP}^1\) Line Holonomy, but Its Canonical Frame Lift Is Central \(-I\), Not a Pfaffian-Sheet Flip

**Date:** 18 October 2026  
**Branches:** Wilson Bargmann phase, real projective line, tautological double cover, central \(-I\), response-root Pfaffian sheet, placement holonomy  
**Claim status:** exact geometric identification and exact no-go for the canonical Pfaffian-sheet map; microscopic carrier identification remains open  
**Certificate:** [lift_the_wilson_pi_flux_to_real_projective_holonomy_and_test_the_response_pfaffian_sheet.mjs](scripts/lift_the_wilson_pi_flux_to_real_projective_holonomy_and_test_the_response_pfaffian_sheet.mjs)

> **Forward result (document 1067).** The projective Wilson triangle becomes
> the exact integral \(A_2\) placement root system at the unique ratio
> \(\kappa/m^2=1\). At that point its inverse-mass metric is
> \(G_{A_2}/(3m^2)\), two ray reflections equal \(F\) and \(FA\), and their
> product is the placement cycle \(A\). The ratio is not dynamically derived.

## Executive result

The negative Wilson Bargmann invariant from document 1065 does have an exact geometric meaning.

After removing the vertex-conventional factors \(i\) and \(-i\), the three mediator directions are real rays in the two-dimensional copy space equipped with the positive inverse-mass metric

\[
\langle x,y\rangle_K=x^TKy.
\]

Whitening \(K=W^TW\) sends them to three unit rays in

\[
\mathbb{RP}^1.
\]

Their consecutive real overlaps have signs

\[
(+,-,+),
\]

so their product is negative. Parallel transport through shortest projective arcs lifts the closed ray loop to a unit vector path ending at the antipode:

\[
\boxed{r(1)=-r(0).}
\]

Thus

\[
\boxed{
\operatorname{sgn}\mathcal B=-1
}
\]

is exactly the nontrivial deck holonomy of the tautological double cover

\[
S^1\longrightarrow\mathbb{RP}^1.
\]

But the most natural completion of a ray to an oriented response frame is

\[
F(r)=(r,\;Jr).
\]

When \(r\mapsto-r\),

\[
F(r)\longmapsto F(-r)=-F(r).
\]

This is the central transformation \(-I_2\in SO(2)\). Since

\[
\det(-F)=\det F
\]

in two dimensions, the response-root Pfaffian coefficient

\[
\operatorname{Pf}(F^TJF)=\det F
\]

does **not** change sign.

Therefore:

\[
\boxed{
\text{Wilson }\pi\text{ flux}
\;\longrightarrow\;
\text{central }-I
\;\not\longrightarrow\;
\text{Pfaffian-sheet exchange}
}
\]

under the canonical oriented-frame lift.

This closes one proposed bridge negatively and strengthens another positively: the Wilson sign naturally matches the programme’s coherent central \(-I\) holonomy, while a response-Pfaffian sheet flip requires an additional reflection that reverses only one frame direction or reverses \(J\).

## 1. Realifying the Wilson triangle

The loop-corrected Wilson matrix has

\[
C_{Lu}=+iA,
\qquad
C_{Ld}=-iA,
\qquad
C_{ud}=B,
\qquad A,B>0.
\]

Rephase the \(u\) and \(d\) vertices so the underlying copy vectors become

\[
l=(1,1)^T,
\qquad
u=e_1,
\qquad
d=e_2.
\]

The inverse-mass metric has the form

\[
K=
\begin{pmatrix}
a&b\\
b&a
\end{pmatrix},
\qquad
a>|b|,
\qquad
b<0.
\]

Consequently

\[
\langle l,u\rangle_K=a+b>0,
\]

\[
\langle u,d\rangle_K=b<0,
\]

\[
\langle d,l\rangle_K=a+b>0.
\]

The product of normalized overlaps is negative. Its sign is exactly the real Bargmann invariant.

## 2. Projective parallel transport

A real ray forgets \(r\sim-r\). To lift a sequence of nonorthogonal rays, choose at each step the representative whose overlap with the previous representative is positive. The sign accumulated on closing the loop is

\[
h=
\prod_{\rm edges}
\operatorname{sgn}\langle r_i,r_{i+1}\rangle.
\]

For the Wilson triangle,

\[
h=(+)(-)(+)=-1.
\]

Equivalently, write the whitened unit vectors at angles \(\theta_i\) modulo \(\pi\). Choose every increment in

\[
\left(-\frac\pi2,\frac\pi2\right].
\]

The three shortest increments sum to

\[
\Delta\widetilde\theta=\pm\pi.
\]

The projective loop closes, while its unit-vector lift changes sign. This is the first Stiefel--Whitney holonomy of the real tautological line restricted to the loop.

## 3. Why this is not the response Pfaffian sign

The response root is a two-column matrix

\[
\Psi=(u\;v).
\]

Its normalized Pfaffian sheet is

\[
\eta(\Psi)
=
\frac{\det\Psi}{\sqrt{\det(\Psi^T\Psi)}}.
\]

Given one oriented unit ray \(r\), the canonical \(J\)-compatible frame is

\[
\Psi_r=(r\;Jr).
\]

The projective deck transformation acts simultaneously on both columns:

\[
\Psi_{-r}=(-r\;-Jr)=-\Psi_r.
\]

Because \(-I_2\) has determinant \(+1\),

\[
\eta(\Psi_{-r})=\eta(\Psi_r).
\]

The Wilson holonomy lives inside the orientation-preserving gauge group identified in document 1047. It is a central phase of the root, not an exchange of its two determinant sheets.

To reverse \(\eta\), one needs for example

\[
(r,Jr)\longmapsto(-r,Jr),
\]

which flips only one column. That operation has determinant \(-1\), but it is not produced by lifting the projective ray loop. It is precisely the extra orientation-odd structure that document 1065 found missing.

## 4. Corrected bridge diagram

\[
\begin{array}{ccccc}
\text{Wilson triangle}
&\longrightarrow&
\text{odd loop in }\mathbb{RP}^1
&\longrightarrow&
r\mapsto-r
\\[2mm]
&&&&\downarrow\;r\mapsto(r,Jr)
\\[2mm]
&&&&
\Psi\mapsto-\Psi
\\[2mm]
&&&&
\det\Psi\mapsto\det\Psi.
\end{array}
\]

The successful identification is

\[
\operatorname{sgn}\mathcal B
\leftrightarrow
\text{central root holonomy}.
\]

The failed identification is

\[
\operatorname{sgn}\mathcal B
\not\leftrightarrow
\operatorname{sgn}\det\Psi
\]

without another reflection.

## 5. Relation to the placement cover

The placement branch already contains a coherent central sign:

\[
\mathcal T^6=-I.
\]

Unlike the response determinant, a root vector or amplitude detects \(-I\). The Wilson projective holonomy has exactly this transformation type.

This is a representation-level match, not yet a microscopic equality. Establishing equality requires:

1. an isometry from the whitened \(S_1\)-copy plane to the relevant response-root plane;
2. a map from the three Wilson vertices to a closed placement path;
3. compatibility with the Furey grading and antiunitary;
4. preservation under the full renormalized dynamics.

The determinant/Pfaffian branch must remain separate until an additional reflection is derived.

## 6. Stop-everything criteria

**Projective trigger:** the physical mediator kernel remains real after allowed vertex rephasings and all three edge overlaps stay nonzero. Then the Bargmann sign is a genuine \(\mathbb{RP}^1\) line holonomy.

**Central-lift trigger:** a source-derived isometry carries the mediator unit-vector lift to the coherent response root. Then the Wilson sign and central \(-I\) holonomy are the same deck transformation.

**Pfaffian falsifier:** infer \(\det\Psi\mapsto-\det\Psi\) from \(\Psi\mapsto-\Psi\) in even dimension.

**Sheet-flip trigger:** derive an operation that reverses exactly one response-frame direction or reverses the physical \(J\). Only then can the Wilson loop feed the Pfaffian sheet.

**Degeneracy boundary:** if any Wilson overlap vanishes, the discrete Pancharatnam transport rule becomes singular and the loop class may change.

## Verdict

| Question | Verdict |
|---|---|
| Is the negative Bargmann sign an exact projective holonomy? | **Yes** |
| What cover detects it? | **\(S^1\to\mathbb{RP}^1\)** |
| What is its canonical two-frame lift? | **Central \(-I_2\in SO(2)\)** |
| Does that flip \(\det\Psi\)? | **No** |
| Does it naturally match coherent placement \(-I\)? | **At representation level, yes** |
| Is the microscopic isometry/path map known? | **No** |
| What is still required for the Pfaffian sheet? | **An independent reflection/orientation-odd datum** |

## Position in the corpus

- [Wilson-triangle \(\pi\)-flux theorem](1065_the_one_S1_triangle_has_trivial_Bargmann_holonomy_but_shared_leg_mixing_generates_a_rephasing_invariant_pi_flux.md)
- [oriented Gram-root double cover](1047_fixing_the_phase_symplectic_orientation_reduces_the_gram_root_gauge_to_SO2_and_turns_the_pfaffian_sign_into_a_rank_one_separated_Z2_sheet.md)
- [response-root Pfaffian identity](1046_the_oriented_area_is_exactly_the_pfaffian_line_of_the_response_root_but_its_microscopic_weak_higgs_identification_remains_open.md)
- [coherent placement cover](996_the_graded_sideband_antiunitary_lifts_the_six_cycle_to_a_nested_c12_to_c6_to_c3_transport.md)

