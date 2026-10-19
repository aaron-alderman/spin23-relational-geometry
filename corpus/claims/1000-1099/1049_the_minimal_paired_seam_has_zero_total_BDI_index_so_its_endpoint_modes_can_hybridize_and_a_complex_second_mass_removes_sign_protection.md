# The Minimal Paired Seam Has Zero Total BDI Index, So Its Endpoint Modes Can Hybridize and a Complex Second Mass Removes Sign Protection

**Date:** 18 October 2026  
**Branches:** paired Pfaffian walls, BDI index cancellation, endpoint hybridization, complex-mass escape, finite interval  
**Claim status:** exact stability/no-go audit for the conditional Dirac witness  
**Certificate:** [audit_paired_pfaffian_wall_mode_hybridization_and_the_complex_second_mass_escape.mjs](../../../verification/audit/audit_paired_pfaffian_wall_mode_hybridization_and_the_complex_second_mass_escape.mjs)

## Executive result

Document 1048 established one exact zero mode for a single sign-changing response-Pfaffian mass. The holonomy-compatible interface of document 1043 contains a twist and an antitwist, hence two walls with opposite orientation.

Their BDI indices cancel:

\[
\nu_{\rm pair}=\nu_{\rm kink}+\nu_{\rm antikink}=+1-1=0.
\]

At large separation there is one localized mode near each endpoint, with opposite chiralities. At finite separation, BDI symmetry permits the effective Hamiltonian

\[
\boxed{
H_{\rm end}=
\begin{pmatrix}0&t\\t&0\end{pmatrix}}
\]

and energies

\[
E_\pm=\pm|t|.
\]

The pair therefore does not guarantee exact zero energy. Locality typically makes $t$ exponentially small,

\[
|E_+-E_-|
\sim2|t_0|e^{-L/\xi},
\]

but only infinite separation or an additional symmetry forces $t=0$.

A second mass component supplies a second, independent escape. For

\[
H(k)=k\sigma_2+a\sigma_1+b\sigma_3,
\]

the spectrum obeys

\[
H(k)^2=(k^2+a^2+b^2)I.
\]

The path $(a,b)=(\cos\theta,\sin\theta)$ connects $a=+1$ to $a=-1$ without closing the gap. It breaks the chiral symmetry protecting the real BDI sign.

Thus neither a finite paired seam nor a complexified mass generically carries an exact zero mode.

## 1. Index cancellation

For the real Dirac operator

\[
H=-i\sigma_2\partial_x+a(x)\sigma_1,
\]

a negative-to-positive wall supports the $\sigma_3=+1$ mode, while a positive-to-negative wall supports the opposite chirality.

A finite interval with positive mass inside and negative mass outside contains both:

\[
-\longrightarrow+\longrightarrow-.
\]

The asymptotic signs at $x=-\infty$ and $x=+\infty$ agree, so the global index is zero.

This matches the global topology of the paired seam: its relative holonomy returns to identity and its two Pfaffian twists cancel.

## 2. Symmetry-allowed hybridization

Let $|L\rangle$ and $|R\rangle$ denote the two localized endpoint modes, chosen as eigenstates of the chiral operator with opposite eigenvalues. In this subspace,

\[
S=\sigma_3.
\]

Chiral symmetry requires

\[
\{S,H_{\rm end}\}=0,
\]

but allows the off-diagonal coupling $t\sigma_1$. Therefore the two states split symmetrically about zero.

The overlap $t$ is generically nonzero because the localized wavefunctions have exponential tails. The precise coefficient depends on the mass profile and ultraviolet completion; the exponential law is a locality estimate, not a universal exact formula.

## 3. When an exact pair of zero modes survives

The two modes remain pinned separately only if an additional constraint forbids their mixing. Possible mechanisms include:

- infinite endpoint separation;
- a conserved channel charge assigning different quantum numbers;
- exact spatial reflection combined with a selection rule;
- Kramers structure with an appropriate square and representation;
- locality plus a strict superselection boundary;
- a crystalline or placement symmetry that forbids the off-diagonal matrix element.

The current seam construction supplies none of these automatically. The Real chirality of document 1044 labels interval orientation but does not by itself set $t=0$.

## 4. Complex second-mass escape

The real mass sign is topological only while the Hamiltonian is restricted to the $a\sigma_1$ axis. Adding $b\sigma_3$ gives

\[
E(k)^2=k^2+a^2+b^2.
\]

Along

\[
a=\cos\theta,\qquad b=\sin\theta,
\qquad0\le\theta\le\pi,
\]

the gap remains one while $a$ changes sign.

The second mass commutes with the old chiral operator rather than anticommutes with it, so it breaks the BDI chiral symmetry. This is the operator analogue of rotating a complex Pfaffian around zero rather than crossing it.

The CP-violating Majorana obstruction of document 352 is therefore directly relevant: complex phases may turn a real sign wall into a non-topological mass rotation.

## 5. Consequences for the paired-seam programme

The most defensible hierarchy is now:

1. the response-root orientation has a conditional $\mathbb Z_2$ sign;
2. one isolated real BDI wall has one exact zero mode;
3. the holonomy-compatible architecture necessarily introduces an opposite wall;
4. the pair has zero net index and generically produces a near-zero doublet, not exact zeros;
5. complex symmetry-breaking masses can remove even the isolated-wall protection.

This makes endpoint separation and symmetry selection experimentally relevant. A long defect interval could produce an exponentially small energy scale without a new exactly massless state.

## 6. Stop-everything and falsification tests

**No-mixing trigger:** a Furey, gauge or placement quantum number assigns the two endpoint modes distinct exact charges. Then $t=0$ and two exact zeros survive at finite separation.

**Splitting trigger:** a microscopic profile predicts $L/\xi$ and the overlap coefficient. Then the paired seam yields a quantitative near-zero energy.

**Complex-mass trigger:** CKM, Majorana or Higgs phases generate the second mass $b$. Then the real BDI sign protection must be downgraded or replaced by a winding invariant.

**Index falsifier:** a finite kink–antikink pair with identical asymptotic masses is claimed to have a nonzero net BDI index.

**Zero-mode overclaim:** each endpoint's isolated-wall solution is treated as an exact eigenstate of the finite paired system without evaluating their mixing.

**Exponential-law warning:** $e^{-L/\xi}$ is the generic locality scaling, not a derived coefficient for the present Furey interface.

## Verdict

| Question | Verdict |
|---|---|
| Net BDI index of a twist–antitwist pair | **Zero** |
| Are two exact endpoint zeros guaranteed at finite separation? | **No** |
| Is an exponentially small splitting natural? | **Yes, conditionally** |
| Can a second mass connect the two signs without gap closure? | **Yes** |
| Is such a second mass present microscopically? | **Open** |
| Does the paired seam still permit observable near-zero states? | **Yes, if sufficiently separated and weakly mixed** |

## Position in the corpus

- [single-wall conditional BDI zero mode](1048_if_the_response_pfaffian_is_a_BDI_dirac_mass_then_its_rank_one_wall_binds_one_exact_zero_mode_but_the_coupling_is_not_yet_derived.md)
- [oriented Gram-root sheets](1047_fixing_the_phase_symplectic_orientation_reduces_the_gram_root_gauge_to_SO2_and_turns_the_pfaffian_sign_into_a_rank_one_separated_Z2_sheet.md)
- [minimal paired seams](1043_semilinearity_does_not_repair_an_all_edge_quarter_turn_but_a_minimal_same_face_twist_antitwist_pair_preserves_the_six_cycle.md)
- [complex Majorana Pfaffian obstruction](../0300-0399/352_the_neutral_majorana_pfaffian_is_det_m_but_cp_makes_it_complex_and_removes_the_sign.md)
