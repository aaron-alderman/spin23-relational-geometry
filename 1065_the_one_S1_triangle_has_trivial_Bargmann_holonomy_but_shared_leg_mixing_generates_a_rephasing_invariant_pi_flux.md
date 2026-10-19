# The One-\(S_1\) Triangle Has Trivial Bargmann Holonomy, but Shared-Leg Mixing Generates a Rephasing-Invariant \(\pi\) Flux

**Date:** 18 October 2026  
**Branches:** accepted third Wilson edge, Bargmann invariant, loop phase, rank-two radiative mixing, Pfaffian sign, orientation boundary  
**Claim status:** exact finite Gram-phase classification for the current mediator ansätze; identification with the response Pfaffian remains conditional  
**Certificate:** [classify_the_s1_wilson_triangle_bargmann_phase_and_pfaffian_z2_boundary.mjs](scripts/classify_the_s1_wilson_triangle_bargmann_phase_and_pfaffian_z2_boundary.mjs)

> **Forward result (document 1066).** The \(\pi\) flux is exactly the
> nontrivial tautological-line holonomy of a real \(\mathbb{RP}^1\) mediator
> loop. Its canonical \(J\)-compatible two-frame lift is \(\Psi\mapsto-\Psi\),
> which has determinant \(+1\) and therefore does **not** exchange the
> response-Pfaffian sheets. It matches central \(-I\) transformation type;
> a separate reflection remains necessary for Pfaffian orientation.

## Executive result

Document 1063 left open the possibility that the “unwanted” \(u-d\) Wilson edge is actually the third relationship needed to close an oriented loop. The answer has two parts.

For one \(S_1\) mediator, the full three-vertex coefficient matrix is rank one:

\[
C_{ij}=\lambda_i^*\lambda_j.
\]

Its rephasing-invariant Bargmann loop is

\[
\mathcal B
=C_{Lu}C_{ud}C_{dL}
=|\lambda_L\lambda_u\lambda_d|^2
\ge0.
\]

Whenever all three edges are nonzero,

\[
\boxed{\arg\mathcal B=0.}
\]

Therefore the unavoidable one-mediator triangle has no nontrivial loop holonomy. Its apparently complex edge phases are vertex conventions.

The loop-corrected rank-two construction behaves differently. Starting from the pure-star vectors

\[
\lambda_L=(1,1)^T,
\qquad
\lambda_u=(i,0)^T,
\qquad
\lambda_d=(0,-i)^T
\]

and the shared-leg correction

\[
M^2=m^2I+\kappa\lambda_L\lambda_L^\dagger,
\qquad \kappa>0,
\]

one obtains

\[
C_{Lu}=\frac{i}{m^2+2\kappa},
\qquad
C_{Ld}=-\frac{i}{m^2+2\kappa},
\qquad
C_{ud}=\frac{\kappa}{m^2(m^2+2\kappa)}.
\]

Hence

\[
\boxed{
\mathcal B
=-\frac{\kappa}
{m^2(m^2+2\kappa)^3}
<0,
\qquad
\arg\mathcal B=\pi.
}
\]

The radiative obstruction creates a genuine rephasing-invariant \(\mathbb Z_2\) flux. But \(\pi=-\pi\pmod{2\pi}\), so complex conjugation leaves it fixed. It is a central sign, not an orientation-odd chirality.

## 1. Why the Bargmann product is the right invariant

Under independent bilinear rephasings

\[
B_i\longmapsto e^{i\theta_i}B_i,
\]

the Wilson coefficients transform as

\[
C_{ij}\longmapsto e^{-i\theta_i}C_{ij}e^{i\theta_j}.
\]

Every open-edge phase can be shifted. Around a closed triangle the vertex phases cancel:

\[
C_{Lu}C_{ud}C_{dL}
\longmapsto
C_{Lu}C_{ud}C_{dL}.
\]

Its argument is the unique phase invariant of a connected three-vertex graph with three edges. This is the finite Wilson/Bargmann holonomy of the coupling triangle.

## 2. Rank one forces zero loop phase

For a rank-one Gram matrix,

\[
C_{Lu}=\lambda_L^*\lambda_u,
\quad
C_{ud}=\lambda_u^*\lambda_d,
\quad
C_{dL}=\lambda_d^*\lambda_L.
\]

Multiplication cancels every phase:

\[
\mathcal B
=
\lambda_L^*\lambda_u
\lambda_u^*\lambda_d
\lambda_d^*\lambda_L
=
|\lambda_L|^2|\lambda_u|^2|\lambda_d|^2.
\]

This is a theorem, not a property of the example \((1,i,-i)\). No one-mediator positive Gram triangle can carry a nonzero geometric phase.

For that example,

\[
C_{Lu}=i,
\qquad
C_{Ld}=-i,
\qquad
C_{ud}=-1,
\]

but

\[
i(-1)i=+1.
\]

The edge phases look oriented only before quotienting by vertex rephasings.

## 3. Rank two permits a \(\pi\) loop

The shared-\(QL\) self-energy changes the inverse-mass metric to

\[
K=(M^2)^{-1}
=\frac1{m^2}
\left[
I-\frac{\kappa}{m^2+2\kappa}
\begin{pmatrix}1&1\\1&1\end{pmatrix}
\right].
\]

Its negative off-diagonal propagator entry becomes a positive \(u-d\) Wilson coefficient after the endpoint phases are contracted. The two imaginary arms then multiply it to a negative real Bargmann invariant.

This result survives arbitrary rephasing of \(B_L,B_u,B_d\). Unlike the open-star signs, the negative loop cannot be removed.

## 4. Relation to the Pfaffian and central-sign branches

The \(\pi\) flux has exactly the algebraic character of a central minus sign:

\[
e^{i\arg\mathcal B}=-1.
\]

That makes it a credible candidate bridge to:

- the \(-I\) sheet of the coherent placement cover;
- the response-root Pfaffian sign;
- antiperiodic transport around the six-cycle;
- a \(\mathbb Z_2\) obstruction in a closed relational loop.

It does **not** yet identify any of them. The spaces and transformations differ, and an intertwiner is required.

There is also a decisive limitation:

\[
\overline{\mathcal B}=\mathcal B<0.
\]

Reversing orientation sends a general loop phase \(\phi\) to \(-\phi\), but fixes both \(0\) and \(\pi\). The generated sign cannot distinguish clockwise from anticlockwise transport, twist from antitwist, or the two Pfaffian orientations. It can mark a nontrivial central sector, but not choose its orientation.

## 5. Revised interpretation of the “unwanted” edge

The third edge now has three sharply different readings:

1. **one-mediator edge:** compulsory but holonomically trivial;
2. **rank-two shared-loop edge:** radiatively generated and carries a protected rephasing-invariant \(\pi\) sign;
3. **general higher-rank edge:** may carry a continuous phase, but then its magnitude and phase require additional dynamics.

The second case is the interesting one. The same correction that spoils the exact sparse \(F_Cp\) generator creates a central topological datum. This does not rescue the pure-pulse construction; it redirects the correction into a possible Pfaffian/placement bridge.

## 6. Stop-everything criteria

**Rank-one phase falsifier:** infer nontrivial holonomy from complex entries of a rank-one positive Gram matrix.

**Pure-star phase falsifier:** call the open-star ±\(i\) assignment an observable without fixing the vertex phase frame.

**\(\pi\)-flux trigger:** derive the shared-leg mixing with \(\kappa>0\) in a complete model and preserve the negative Bargmann invariant under all additional contributions.

**Chirality falsifier:** identify the \(\pi\) sign alone with an orientation-odd observable; conjugation fixes it.

**Pfaffian bridge trigger:** construct an explicit map carrying \(\operatorname{sgn}\mathcal B\) to the response-root Pfaffian sheet while an independent odd datum distinguishes the two orientations.

## Verdict

| Triangle | Bargmann phase | Meaning |
|---|---:|---|
| one-mediator rank-one Gram | \(0\) | no loop holonomy |
| two-copy pure star | undefined | third edge vanishes |
| shared-leg-corrected rank-two Gram | \(\pi\) | rephasing-invariant \(\mathbb Z_2\) flux |

The regenerated edge cannot be dismissed as merely arbitrary, but neither can its central sign be promoted to chirality.

## Position in the corpus

- [copy-metric and shared-leg loop obstruction](1063_the_doubled_furey_links_do_not_supply_two_S1_copies_and_the_shared_QL_leg_radiatively_breaks_the_naive_orthogonality.md)
- [oriented Gram-root double cover](1047_fixing_the_phase_symplectic_orientation_reduces_the_gram_root_gauge_to_SO2_and_turns_the_pfaffian_sign_into_a_rank_one_separated_Z2_sheet.md)
- [response-root Pfaffian line](1046_the_oriented_area_is_exactly_the_pfaffian_line_of_the_response_root_but_its_microscopic_weak_higgs_identification_remains_open.md)

