# Local CAR Realization and the Matter-TRO Enlargement Gate

**Date:** 17 October 2026  
**Branches:** B03, B05 and B11  
**Claim status:** exact finite-carrier CAR and ternary-closure result; Lorentz/Fock Majorana interpretation remains open

## 1. The category distinction

The exchanged neutral arrows are

\[
n_A:O_1\to R,
\qquad
n_B:R\to O_1.
\]

On the completed complex carrier, both neutral blocks are one dimensional. Therefore

\[
n_B=n_A^\dagger
\]

as matrix units after choosing normalized block bases.

This fact can be used in two inequivalent ways:

1. regard \(n_B\) as the adjoint operator of one matter generator \(n_A\);
2. adjoin \(n_B\) as a second independent vector in the chiral matter TRO.

The first is ordinary CAR bookkeeping. The second enlarges the matter module. They must not be conflated.

## 2. Exact one-mode CAR on the neutral plane

Let

\[
a:=n_A=|R\rangle\langle O_1|,
\qquad
a^\dagger:=n_B=|O_1\rangle\langle R|.
\]

Then

\[
a^2=(a^\dagger)^2=0,
\]

and

\[
aa^\dagger+a^\dagger a
=p_R+p_{O_1}
=1_{\rm neutral}.
\]

Thus the two reverse arrows realize the one-mode CAR algebra exactly on the neutral two-plane. The generated unital star algebra is

\[
C^*(a,a^\dagger)\cong M_2(\mathbb C).
\]

This is stronger than the earlier quadratic-cycle statement: there is no local finite-dimensional obstruction to interpreting the pair as annihilation and creation presentations of one mode.

## 3. The completed matter TRO remains sixteen dimensional

For survivor \(A\), adjoining the relationally selected arrow \(n_A:D\to E\) gives

\[
\dim_\mathbb C\operatorname{TRO}(\mathcal M_A+n_A)=16.
\]

The adjoint \(n_A^\dagger\) already belongs to the surrounding operator algebra \(B(\mathcal H)\). It need not be counted as another left-handed matter vector, just as the adjoint in a Weyl kinetic term is not a second independent Weyl field.

This realizes the desired bookkeeping possibility:

\[
16\text{ complex matter amplitudes}
\quad\text{with a star-closed observable algebra}.
\]

## 4. Adjoining the reverse arrow as matter enlarges the TRO

If instead both orientations are inserted as independent matter arrows, ternary closure gives

\[
\dim_\mathbb C
\operatorname{TRO}(\mathcal M_A+n_A+n_B)
=24.
\]

The reverse orientation by itself gives the previously computed dimension-23 canonical extension,

\[
\dim_\mathbb C
\operatorname{TRO}(\mathcal M_A+n_B)
=23,
\]

but that closure does not contain the forward arrow. Adding both orientations creates one further independent direction and gives dimension 24.

Therefore the sterile-Dirac reading is not simply “the same sixteen states with another notation.” In the existing block-incidence category it activates seven further complex directions under ternary closure.

This supplies an algebraic discriminator:

- **CAR adjoint reading:** one independent neutral matter arrow; adjoint lives in the operator algebra; matter TRO dimension 16;
- **reverse arrow replacing the selected completion:** ternary closure dimension 23;
- **both orientations as independent matter arrows:** ternary closure dimension 24.

## 5. Why dagger does not require survivor exchange

The full neutral-label exchange maps survivor \(A\) to survivor \(B\), but ordinary Hilbert-space adjunction already maps

\[
n_A\mapsto n_A^\dagger=n_B
\]

inside \(B(\mathcal H)\). It does not require the native division-algebra source to possess an \(O_1\leftrightarrow R\) automorphism.

This resolves one finite-carrier issue while respecting the earlier real-form obstruction:

- neutral adjunction is canonical on the completed complex carrier;
- exchanging the entire charged matter topology is a different, stronger operation and is not source-derived.

## 6. What remains physically unresolved

Every matrix unit has an adjoint. That alone does not prove a Majorana field interpretation. A physical CAR/Fock construction must still establish:

1. which block amplitude is an annihilation generator;
2. how Lorentz charge conjugation acts on its Weyl spinor index;
3. that the adjoint is not independently integrated as another left-handed field;
4. locality and positive-energy quantization;
5. compatibility with the neutrino Yukawa cycle and flavor mixing;
6. descent of the Nambu pole area to a gauge-invariant response.

The result is therefore a category-level advance, not a completed field theory.

## 7. Relation to the Majorana pole area

If the physical steps succeed, the exact CAR pair supplies the two particle--hole faces used in

\[
\mathcal N_i^{(\alpha)}
\propto
\begin{pmatrix}
|U_{\alpha i}|^2&U_{\alpha i}^2\\
\overline{U_{\alpha i}}^2&|U_{\alpha i}|^2
\end{pmatrix}.
\]

The phase comparison between distinct poles then becomes an observable of one neutral CAR mode across flavor/mass support, rather than a comparison of two independent sterile fields.

## 8. Stop-everything and falsification gates

**Fock success:** construct the second-quantized field with one independent neutral Weyl generator and show that the block adjoint implements its CAR conjugate.

**Lorentz success:** charge conjugation and chirality map the block arrow exactly as required for a Majorana mass term.

**Action success:** the same star representation makes the neutrino Yukawa and Majorana quadratic terms local and Hermitian without activating the dimension-23 matter closure.

**Independent-field failure:** the path integral requires both arrow coefficients as independent Grassmann variables. Then the correct matter closure is the enlarged 24-dimensional TRO.

**Source failure:** no source-derived rule chooses which arrow is the matter generator and which is its adjoint presentation.

## 9. Certificate

The [local-CAR/TRO certificate](../../../verification/verify/verify_local_car_and_tro_enlargement.mjs) verifies the one-mode CAR identities, generation of \(M_2(\mathbb C)\), the sixteen-dimensional forward completion, the twenty-three-dimensional reverse-only closure and the twenty-four-dimensional closure obtained when both orientations are independent matter arrows.

## Companion documents

- [Exchange-paired neutrino two-cycle](170_exchange_paired_neutrino_two_cycle_and_majorana_gate.md)
- [Majorana Nambu pole area](194_majorana_nambu_pole_area_and_car_identification_gate.md)
- [Unique right-handed-neutrino TRO completion](167_unique_right_handed_neutrino_tro_completion_and_spin23_tradeoff.md)
- [Dagger versus independent mirror bookkeeping](151_dagger_antiparticle_vs_mirror_distinction.md)
