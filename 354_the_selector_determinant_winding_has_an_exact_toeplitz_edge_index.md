# The Selector Determinant Winding Has an Exact Toeplitz Edge Index

**Date:** 17 October 2026  
**Branches:** B01, B03, B05, B06, B08, B09 and B11  
**Claim status:** exact AIII/Toeplitz Fredholm index and chiral boundary-kernel parity; identification with a physical Majorana class-D operator remains open

## 1. The operator-level question

The selector deck calculation proved that a nonsingular, antipodally odd
\(N\)-flavor mass family satisfies

\[
w[\det M]\equiv N\pmod2.
\]

That was a theorem about maps into \(GL(N,\mathbb C)\), not yet a theorem about
states. We now ask for an operator whose analytic index is exactly this winding.

There is a canonical answer: the matrix Toeplitz operator on Hardy space.

## 2. Hardy compression

Let

\[
\mathcal H_+=H^2(S^1)\otimes\mathbb C^N
\]

be the nonnegative-Fourier-mode subspace of
\(L^2(S^1)\otimes\mathbb C^N\), and let \(P_+\) be the Hardy projection. For a
continuous invertible matrix symbol

\[
M:S^1\longrightarrow GL(N,\mathbb C),
\]

define

\[
T_M=P_+M P_+\big|_{\mathcal H_+}.
\]

The matrix Gohberg--Krein Toeplitz index theorem gives

\[
\boxed{\operatorname{Ind}T_M
=\dim\ker T_M-\dim\ker T_M^\dagger
=-w[\det M].}
\]

Invertibility of the bulk symbol makes \(T_M\) Fredholm. The index is unchanged
under norm-continuous deformations that keep \(M(\theta)\) invertible.

This is the exact analytic bridge that the previous cycle lacked.

## 3. The chiral edge Hamiltonian

Form the self-adjoint operator

\[
H_{\partial}=
\begin{pmatrix}
0&T_M^\dagger\\
T_M&0
\end{pmatrix},
\qquad
\Gamma=
\begin{pmatrix}
I&0\\0&-I
\end{pmatrix},
\qquad
\{H_{\partial},\Gamma\}=0.
\]

Its zero space is

\[
\ker H_{\partial}
=\ker T_M\oplus\ker T_M^\dagger.
\]

Therefore

\[
\dim\ker H_{\partial}
\equiv
\dim\ker T_M-\dim\ker T_M^\dagger
\equiv w[\det M]\pmod2,
\]

because sum and difference agree modulo two. More strongly, the net chiral
zero-mode count is

\[
\boxed{n_+-n_-=-w[\det M]}
\]

with the displayed sign fixed by the convention for \(P_+\).

## 4. Minimal three-flavor selector

For

\[
M(z)=zM_0,
\qquad z=e^{i\theta},
\]

with \(M_0\) invertible and three dimensional,

\[
\det M(z)=z^3\det M_0.
\]

The Toeplitz operator is a constant invertible flavor transformation times
three copies of the unilateral shift. Hence

\[
\operatorname{Ind}T_M=-3,
\]

and \(H_\partial\) has three protected zero modes of one chirality in the
minimal representative.

For the explicit checkpoint \(\det M_0=339+4i\), the constant complex factor
does not change the index.

## 5. Why arbitrary channel mixing does not destroy the result

The theorem is stated directly for a matrix-valued symbol. It does not require
simultaneous diagonalization of \(M(\theta)\). Flavor mixing can redistribute
individual edge states and create opposite-chirality pairs, but it cannot alter

\[
\dim\ker T_M-\dim\ker T_M^\dagger
\]

without loss of Fredholmness, which here means a zero of \(\det M\) somewhere
on the bulk circle.

Consequently, an odd selector winding guarantees an odd total boundary-kernel
parity within this chiral Toeplitz realization.

## 6. Relation to the antipodal selector

The deck condition

\[
M(\theta+\pi)=-M(\theta)
\]

forces

\[
w[\det M]\equiv N\pmod2.
\]

Combining it with the Toeplitz theorem gives

\[
\boxed{
\dim\ker H_\partial
\equiv N\pmod2.}
\]

Thus the earlier sequence now closes mathematically:

\[
\text{antipodal selector sewing}
\Longrightarrow
\text{determinant-winding parity}
\Longrightarrow
\text{Toeplitz Fredholm index}
\Longrightarrow
\text{AIII boundary-kernel parity}.
\]

For three flavors, the parity is nontrivial.

## 7. What has genuinely advanced

The previous document left the branch pinned at an operator-level index map.
That dependency is now resolved for the chiral/complex AIII realization. The
zero modes are not inferred by analogy; they are the kernel and cokernel counted
by a Fredholm index theorem.

This is a real advance, but it does not resolve every physical identification.

## 8. The Majorana/BdG gate remains

The Toeplitz Hamiltonian above has chiral symmetry. It is naturally in complex
class AIII unless additional antiunitary structure is supplied. A physical
neutral Majorana system instead requires a particle-hole operation \(C\) with a
specified square and sewing law.

The following statements are therefore **not yet proved**:

1. the Hardy polarization is the polarization selected by Furey's CAR module;
2. the selector angle is a physical momentum or defect coordinate;
3. \(H_\partial\) admits the required gauge-compatible particle-hole symmetry;
4. the three complex AIII zero modes reduce to three Majorana modes rather than
   a redundantly doubled description;
5. electroweak interactions preserve the needed gap and sewing condition.

The correct conclusion is an exact AIII index theorem and a highly specific
Majorana-realization problem.

## 9. The Furey bridge is now more sharply posed

Furey's minimal-left-ideal construction already supplies a fermionic Fock/CAR
polarization. The new question is no longer merely whether a CAR basis exists.
It is whether that polarization realizes the Hardy split

\[
L^2(S^1)=\mathcal H_+\oplus\mathcal H_-
\]

or an equivalent Toeplitz extension, and whether Furey's conjugation exchanges
the two halves in the way required for a Majorana condition.

This is an explicit intertwiner problem:

\[
\boxed{
\mathcal I_{\rm Furey}\,P_{\rm CAR}\,\mathcal I_{\rm Furey}^{-1}=P_+,
\qquad
\mathcal I_{\rm Furey} C_{\rm CAR}\mathcal I_{\rm Furey}^{-1}=C_{\rm BdG}.}
\]

Failure of either identity would keep the Toeplitz result as an external
effective model rather than an internal derivation.

## 10. Stop-everything and falsification gates

**Stop-everything trigger:** the Furey/CAR polarization and selector deck action
produce this Toeplitz extension together with a gauge-compatible particle-hole
operator. The odd three-flavor kernel would then be algebraically forced.

**Index falsifier:** a nonsingular continuous symbol is used while the Toeplitz
operator is claimed to change Fredholm index under an allowed continuous
deformation.

**Boundary falsifier:** a finite square shift is used without accounting for its
spurious second boundary. The certificate instead uses rectangular truncations
of the semi-infinite kernel/cokernel calculation.

**Majorana falsifier:** the AIII chiral kernel is called a physical Majorana
kernel before an antiunitary particle-hole structure is constructed.

**Coordinate falsifier:** selector space is silently identified with physical
momentum space without a dynamical map.

## 11. Pinned dependency and next branches

The analytic-index dependency is resolved in class AIII. Pin the remaining
Majorana claim at the antiunitary/Furey intertwiner and continue along:

1. construct a doubled Toeplitz BdG Hamiltonian with explicit \(C^2=+1\);
2. test whether its class-D invariant is the AIII winding modulo two;
3. derive the Hardy projection from a causal or CAR polarization;
4. determine whether selector locality permits the required half-space
   compression;
5. compare the resulting three-flavor zero sector with the seesaw mass matrix.

## 12. Certificate

The [selector Toeplitz-index and chiral-edge-parity certificate](scripts/verify_selector_toeplitz_index_and_chiral_edge_parity.mjs) constructs exact rectangular unilateral-shift representatives, verifies \(\operatorname{Ind}T_{z^m}=-m\), checks direct-sum matrix symbols, obtains three minimal zero modes for three flavors, and verifies kernel parity under odd-channel winding changes.

## 13. Sources

- [Zhou and Wan, *Proof of bulk-edge correspondence for band topology by Toeplitz algebra*](https://arxiv.org/abs/2410.19539)
- [Cedzich et al., *Bulk-edge correspondence of one-dimensional quantum walks*](https://arxiv.org/abs/1502.02592)
- [Mesland, notes stating the Gohberg--Krein Toeplitz index theorem](https://www.noncommutativegeometry.nl/wp-content/uploads/2024/02/Mesland-Unbounded_KK-theory.pdf)

## Companion documents

- [Selector determinant-winding parity](353_selector_deck_gluing_turns_complex_mass_sign_into_determinant_winding_parity.md)
- [Neutral Majorana Pfaffian reality gate](352_the_neutral_majorana_pfaffian_is_det_m_but_cp_makes_it_complex_and_removes_the_sign.md)
- [Pfaffian selector parity](347_particle_hole_symmetry_upgrades_selector_parity_to_a_pfaffian_zero_mode_invariant.md)
- [Furey endomorphism-sector inventory](73_furey_endomorphism_sector_inventory.md)
