# The Pfaffian lines agree in parity but live over different spaces

**Date:** 24 October 2026
**Status:** exact type separation and corpus crosswalk; all physical intertwiners remain open
**Evidence:** [machine-readable audit](../../../evidence/data/lattice-subroutine-pfaffian-line-type-audit-v1.json)
**Certificate:** [type verifier](../../../verification/verify/verify_lattice_subroutine_pfaffian_line_type_audit.mjs)

## Result

The word *Pfaffian* currently names five related but non-identical objects in the corpus. Several carry the same one-dimensional sign representation. That is a necessary compatibility condition for a bridge, but it is not a map between them.

| Line | Base space | Fibre datum | What changes its sign or phase | Present status |
|---|---|---|---|---|
| genus-two modular line | spin curves or period matrices | \(\chi_5=\prod_{\delta\ {\rm even}}\theta[\delta]\) | the nontrivial modular character | exact mathematical line |
| fermionic functional line | metrics, spin structures and background fields | chiral Majorana Pfaffian | spectral flow, zero modes and determinant-line transport | source-derived in the \(2A\) fermionization; full genus-two multiplier open |
| response-root orientation line | nondegenerate real \(2\times2\) roots over \(H_2(\mathbb R)_+\) | \(\operatorname{sgn}\det\Psi\) | an orientation-reversing root transformation | exact response-level double cover |
| weak/Higgs algebraic line | weak alternating bilinears and field configurations | coefficient of the weak Pfaffian tensor | the declared \(h\chi\)-odd operation | matching representation exact; microscopic map open |
| flavour Majorana line | complex symmetric mass matrices modulo rephasing | \(\det M=\operatorname{Pf}(M\otimes\varepsilon)\) | generally a complex phase, not a canonical sign | cannot be identified without a compatible real structure |

## Why parity agreement is not enough

A one-dimensional sign representation records only how a fibre transforms. A line bundle also has a base, singular set, connection or transport law, and normalization. Two fibres can both transform by \(-1\) while belonging to unrelated parameter spaces.

The modular line becomes singular on the separating divisor. The response-root line changes sheet at \(\det\Psi=0\). The weak/Higgs line is defined through a microscopic alternating bilinear. The complex flavour determinant winds through \(U(1)\) phase rather than two real sheets. These loci cannot be equated by notation.

An actual identification must supply a map of bases and a nonzero fibre map:

\[
\begin{array}{ccc}
L_{\rm source} & \xrightarrow{\;\Phi\;} & L_{\rm target}\\
\downarrow && \downarrow\\
B_{\rm source} & \xrightarrow{\;f\;} & B_{\rm target}
\end{array}
\]

with \(\Phi\) respecting transport, zeros and the group action. Saying that both sides are “odd” supplies only the final condition.

## What the corpus already proves

The response-root identity is exact:

\[
\operatorname{Pf}(\Psi^T J\Psi)=\det\Psi,
\qquad
(\det\Psi)^2=\det(\Psi^T\Psi).
\]

Thus the Jordan Gram map forgets precisely one real orientation sign. The response-root and weak/Higgs coefficients transform in the same real sign representation, but claim 1046 explicitly leaves their microscopic identification open.

The modular calculation is also exact at its own level. The ten even characteristics have a nine-dimensional sum-zero seam carrier whose determinant is the nontrivial sign character of \(Sp(4,\mathbb F_2)\). The analytic \(\chi_5\) line has the corresponding full modular character and a linear zero at separation.

Monster \(2A\) fermionization now supplies the correct *kind* of functional line and the correct ten live even-spin labels. It does not yet identify its determinant line with \(\chi_5\), much less map a worldsheet separating divisor to the rank-one boundary \(\det\Psi=0\).

## The missing commuting square

The shortest proposed chain is

\[
L_{\chi_5}
\dashrightarrow
L_{\rm Majorana\ functional}
\dashrightarrow
L_{\rm response}
\dashrightarrow
L_{\rm weak/Higgs}.
\]

Every dashed arrow is a distinct gate:

1. **analytic lift:** compute the sewn Majorana--Baby-Monster amplitudes and their determinant-line multiplier;
2. **worldsheet-to-response map:** derive physical response coordinates from the CFT so that the separating divisor pulls back to the rank-one Jordan boundary;
3. **microscopic response map:** derive the Furey/Higgs alternating bilinear as the pullback \(\Psi^T J\Psi\);
4. **real-structure gate:** only then ask whether a complex flavour Majorana determinant restricts to the same real line.

The [canonical period-matrix gate](period-matrix-jordan-boundary-gate.md) now rules out the shortest version of the second arrow. Although \(\operatorname{Im}\Omega\) is naturally an element of \(H_2(\mathbb R)_+\), the separating divisor maps to a diagonal positive-definite matrix with nonzero determinant, not to the rank-one response boundary.

There is currently no complete path. In particular, transitivity cannot be claimed from pairwise equality of abstract \(\mathbb Z_2\) characters.

## A useful falsification test

The bridge becomes physically meaningful only if it predicts the same zero or sign-change event in two independently defined descriptions. For example:

- the CFT amplitude reaches the separating divisor;
- the derived response matrix simultaneously reaches \(\det\Psi=0\);
- a phase-sensitive detector records the corresponding orientation reversal;
- the microscopic weak/Higgs operator changes with the same protected parity.

If the modular line changes sign while every derived response observable remains nonsingular and orientation-even, the proposed pullback is false.

## Corpus links

- [response-root Pfaffian identity](../../claims/1000-1099/1046_the_oriented_area_is_exactly_the_pfaffian_line_of_the_response_root_but_its_microscopic_weak_higgs_identification_remains_open.md)
- [Wilson central sign is not a Pfaffian-sheet flip](../../claims/1000-1099/1066_the_Wilson_pi_flux_is_the_nontrivial_RP1_line_holonomy_but_its_canonical_frame_lift_is_central_minus_I_not_a_Pfaffian_sheet_flip.md)
- [weak Pfaffian parity](../../claims/0900-0999/938_the_weak_pfaffian_sign_has_exactly_the_right_odd_parity_to_pair_with_cycle_orientation_but_the_coupling_is_not_yet_derived.md)
- [complex Majorana boundary](../../claims/0300-0399/352_the_neutral_majorana_pfaffian_is_det_m_but_cp_makes_it_complex_and_removes_the_sign.md)
- [oriented modular seam](oriented-seam-modular-line.md)
- [Monster fermionization bridge](monster-fermionization-bridge.md)
