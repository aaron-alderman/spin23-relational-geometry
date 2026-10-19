# Oriented Color Intertwines Exactly at Transfer Level, but Not as an Ordinary Scattering or Four-Atom Action

**Date:** 17 October 2026  
**Branches:** Furey color, handle exchange, selector transfer, lossless scattering network, and the physical source map  
**Claim status:** exact positive intertwiner for the color generator plus two exact typing no-go theorems  
**Certificate:** [test_the_furey_color_and_handle_typing_of_the_fixed_selector_scattering_networks.mjs](scripts/test_the_furey_color_and_handle_typing_of_the_fixed_selector_scattering_networks.mjs)

## Executive result

The new lossless networks (K_R,K_H) do have a precise relation to the proposed Furey/Standard-Model operations, but only after three different notions of action are kept separate.

1. On the **real transfer carrier**, the oriented-color generator (R) is exactly intertwined with one fixed lepton line plus a three-color permutation.
2. The handle generator (H), expressed in that color basis, is not a permutation or monomial matter operation. Color and handle exchange are acting on different microscopic typings.
3. On the **scattering matrix**, (K_R) has order three under Redheffer cascade, but infinite order under ordinary matrix multiplication. It therefore cannot be the direct Hilbert-space action of a finite color cycle.

The exact positive result is

\[
\boxed{RX=XP_3,}

\]

where (P_3) fixes a lepton coordinate and cycles three color coordinates. The exact negative result is

\[
\boxed{K_R^3\ne I,
\qquad
K_R\star K_R\star K_R=K_{mathrm{id}}.}

\]

Thus a Furey origin for the selector is still viable, but the target must be a transfer/network category or a response compression—not ordinary multiplication of four field amplitudes by (K_R).

## 1. The transfer generator is exactly a color quartet

The real carrier generator is

\[
R=
\begin{pmatrix}
1&0&0&0\\
0&0&0&-1\\
0&0&1&0\\
0&1&0&-1
\end{pmatrix},
\qquad R^3=I.

\]

Its characteristic decomposition is

\[
\mathbf1\oplus\mathbf1\oplus V_{C_3},

\]

with two fixed real lines and the irreducible real two-plane of the color cycle.

Let (P_3) act on the matter basis

\[
(\ell,r,g,b)

\]

by fixing (ell) and cycling (r\to g\to b\to r):

\[
P_3=
\begin{pmatrix}
1&0&0&0\\
0&0&0&1\\
0&1&0&0\\
0&0&1&0
\end{pmatrix}.

\]

The certificate constructs the explicit rational intertwiner

\[
X=
\begin{pmatrix}
1&0&0&0\\
0&1&0&-1\\
0&\frac13&\frac13&\frac13\\
0&0&1&-1
\end{pmatrix}

\]

and verifies exactly

\[
RX=XP_3.

\]

This is the cleanest direct bridge yet between microscopic oriented color and the arithmetic transfer carrier. It is stronger than matching eigenvalues or dimensions.

The intertwiner is not orthogonal in the displayed Euclidean metrics. That is acceptable for a response/source map, but it means the matter norm cannot be silently identified with the carrier flux or response metric.

## 2. The handle operation does not live on the same four matter atoms

In the color basis selected by (X), the handle generator becomes

\[
X^{-1}HX=
\begin{pmatrix}
0&1&0&-1\\
\frac23&-\frac19&\frac89&-\frac{10}{9}\\
-\frac13&\frac29&\frac{11}{9}&-\frac79\\
-\frac13&-\frac19&\frac89&-\frac{10}{9}
\end{pmatrix}.

\]

Its rows contain respectively (2,4,4,4) nonzero entries. It is not monomial and therefore not a permutation with phases or signs of the color quartet.

This is the expected typing obstruction:

- (P_3) acts on the color/lepton fiber ((\ell,r,g,b)) for one species type;
- the Furey handle exchange acts on the crossed species pairing (C=(u,e)), (D=(d,\nu));
- these are not the same microscopic four-dimensional factor.

The carrier combines their shadows into one rank-four symplectic action. A physical construction must first represent them on their correctly typed tensor/product space and only then derive the common four-dimensional response quotient.

## 3. No faithful four-atom permutation model can carry both generators

The real matrices (R,H) generate a faithful group of order eighteen. If an invertible map carried both into permutations of four named atoms, that group would embed faithfully in (S_4).

But

\[
18\nmid|S_4|=24.

\]

By Lagrange's theorem, no subgroup of (S_4) has order eighteen. Therefore no invertible four-atom permutation intertwiner can realize the complete selector action.

This sharpens the earlier spectral-projector result. The failure is not caused only by the chosen hyperbolic checkpoint or by mixed eigenvectors; it is already present in the faithful finite group action.

A nonfaithful four-atom quotient may exist, but it necessarily discards selector information and cannot be inverted back to the carrier.

## 4. Scattering matrices compose in the wrong category for a direct field action

The Bogoliubov transfer image obeys ordinary composition:

\[
G_R^3=I.

\]

Its scattering realization is the unitary matrix

\[
K_R=
\begin{pmatrix}
0&0&1&0\\
0&\frac{1-2i}{5}&0&\frac{-2+4i}{5}\\
1&0&0&0\\
0&\frac{-2+4i}{5}&0&\frac{-1+2i}{5}
\end{pmatrix}.

\]

Although (K_R) is unitary, it does not have ordinary order three. The certificate finds

\[
\lVert K_R^3-I\rVert_{\max}\approx1.44222.

\]

On its nontrivial two-dimensional coordinate block (Q),

\[
Q^2=\mu I,
\qquad
\mu=\frac{-3-4i}{5}.

\]

If (K_R) had finite ordinary order, then (mu) would be a root of unity in (mathbb Q(i)). The only roots of unity in (mathbb Q(i)) are

\[
\{1,-1,i,-i\},

\]

and (mu) is none of these. Hence (K_R) has infinite order under ordinary matrix multiplication.

By contrast, under physical network cascade,

\[
K_R\star K_R\star K_R=K_{mathrm{id}}

\]

to numerical error (1.5\times10^{-16}).

Therefore no invertible field-amplitude intertwiner

\[
F U_R=K_RF

\]

can exist when (U_R^3=I): it would imply (K_R^3=I), contradicting the exact order test.

The correct target equation must instead be one of the typed forms

\[
F_{m tr}U_R=G_RF_{m tr}

\]

at transfer level, or

\[
\mathcal F(U_RU_R')
=\mathcal F(U_R)\star\mathcal F(U_R')

\]

for a functor into lossless networks.

## 5. The handle generator is a useful contrast

For the handle exchange, the scattering realization is simply

\[
K_H=
\begin{pmatrix}
0&0&0&1\\
0&0&1&0\\
0&1&0&0\\
1&0&0&0
\end{pmatrix},

\]

and it does satisfy

\[
K_H^2=I

\]

under ordinary multiplication. Thus (K_H) can look like a direct four-port permutation. That does not repair its Standard Model typing: the microscopic (C\leftrightarrow D) exchange still requires a left-right envelope or emergent response reciprocity.

The asymmetry between (K_R) and (K_H) is informative. One generator descends to a literal port swap; the other only retains its finite order under network composition.

## 6. Consequence for the physical source map

The viable architecture is now narrower:

\[
\begin{array}{c}
\text{Furey/SM matter with separate color and handle factors}\\
\downarrow\ \text{typed source/response construction}\\
\text{real symplectic transfer carrier }(R,H)\\
\downarrow\ \text{Bogoliubov polarization}\\
\text{lossless networks }(K_R,K_H)\\
\downarrow\ \star\text{-cascade around }S(z)\\
\text{globally passive selector response orbit}.
\end{array}

\]

The first arrow remains open. The second and third are now exact.

This also tells us what not to search for: a unitary (4\times4) matrix conjugacy between Furey field amplitudes and (K_R). That problem is type-invalid and algebraically impossible.

## 7. Branch verdict

| Claim | Verdict |
|---|---|
| Transfer (R) is equivalent to one lepton plus a color three-cycle | **proved with explicit (X)** |
| The same (X) makes (H) a typed matter permutation | **false** |
| Both selector generators act faithfully on four named matter atoms | **impossible** |
| (K_R) is an ordinary order-three unitary action | **false; ordinary order is infinite** |
| (K_R) has order three as a lossless network | **proved under Redheffer cascade** |
| (K_H) is an ordinary involutive port swap | **proved** |
| A transfer/network-level Furey source map remains possible | **open and now correctly typed** |

## 8. Stop-everything and falsification criteria

**Positive trigger:** construct a gauge-compatible source/response functor that carries the microscopic color cycle to (G_R), a left-right or emergent handle exchange to (G_H), and composition to transfer multiplication before scattering conversion.

**Negative trigger:** prove that no positive, local, anomaly-compatible rank-four response quotient can simultaneously receive the separately typed color and handle actions.

**Immediate falsifier of this certificate:** failure of (RX=XP_3), failure of the order-eighteen enumeration, or ordinary finite order of (K_R). All are directly checked.

## 9. Position in the corpus

- [the commuting-color/handle obstruction and central-generator fork](838_commuting_microscopic_color_and_handle_exchange_cannot_descend_to_R_and_H_and_the_central_repair_loses_the_singlet_lines.md)
- [the sewn Furey handle typing obstruction](767_the_sewn_furey_ribbon_has_untyped_handle_exchange_but_no_standard_model_typed_exchange_between_c_and_d.md)
- [the left-right handle envelope](768_left_right_symmetry_is_the_minimal_gauge_envelope_of_the_furey_handle_exchange_but_equal_area_requires_an_invariant_response_phase.md)
- [the regular eighteen-background torsor](788_the_18_background_torsor_is_exactly_three_framed_matter_pairings_times_a_central_three_phase_but_the_physical_source_map_is_open.md)
- [the fixed spectral quartet no-go](785_the_scattering_eigenchannel_quartet_is_not_an_equivariant_permutation_copy_of_the_furey_udenu_grid.md)
- [the global lossless-feedback theorem](836_the_selector_redheffer_orbit_is_a_lossless_feedback_cascade_with_global_schur_and_positive_residue_control.md)

