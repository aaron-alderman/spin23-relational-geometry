# The Minimal Continuous Lift Is Hypercharge-Dressed \(B-3L_i\), and Its Three Family Choices Form an \(A_2\) Orbit That Generation-Blind NCG Cannot Select

**Date:** 18 October 2026  
**Branches:** literature identification, family \(U(1)\), \(A_2\) flavor geometry, NCG generation obstruction, charge-three breaking  
**Claim status:** source-backed identification plus exact charge-orbit theorem; no claim that \(B-3L_i\) is new  
**Certificate:** [prove_the_B_minus_3Li_identification_and_A2_family_orbit.mjs](../../../verification/prove/prove_the_B_minus_3Li_identification_and_A2_family_orbit.mjs)  
**Primary sources:** [Salvioni–Strumia–Villadoro–Zwirner, arXiv:0911.1450](https://arxiv.org/abs/0911.1450); [Bauer–Foldenauer–Mosny, arXiv:2011.12973](https://arxiv.org/abs/2011.12973)

## Executive result

The minimal continuous lift found in document 1096 is not a new abelian gauge
symmetry. If family \(i\) is exceptional, its exact generator is

\[
\boxed{
X_i=B-2Y-3L_i.
}
\]

Since hypercharge is already gauged, the new direction modulo the existing
gauge algebra is

\[
\boxed{
[X_i]=[B-3L_i]\quad\text{mod }Y.
}
\]

The three \(U(1)_{B-3L_i}\) models are established anomaly-free
family-dependent extensions of the Standard Model with right-handed neutrinos.
The literature also establishes that their neutrino sector requires Majorana
structure or additional operators if observed PMNS mixing is to be reproduced.

The programme's genuinely new contribution is narrower:

1. the hypercharge-dressed representative \(X_i\) is the unique
   minimum-charge integral representative compatible with the selected
   baryon-triality residues under the one-Higgs contract;
2. its charge-three breaking field preserves precisely the discrete triality
   required by the companion-protection branch;
3. the three choices \(i=e,\mu,\tau\) form an exact \(A_2\) orbit around the
   family-universal centroid.

Writing

\[
L=L_e+L_\mu+L_\tau,
\qquad
\bar X=B-L-2Y,
\]

gives

\[
X_i=\bar X+\delta_i,
\qquad
\delta_i=L-3L_i.
\]

In the family basis \((L_e,L_\mu,L_\tau)\),

\[
\delta_e=(-2,1,1),
\quad
\delta_\mu=(1,-2,1),
\quad
\delta_\tau=(1,1,-2).
\]

They satisfy

\[
\delta_e+\delta_\mu+\delta_\tau=0
\]

and

\[
\delta_i\cdot\delta_j=
\begin{cases}
6,&i=j,\\
-3,&i\ne j.
\end{cases}
\]

Thus they form an equilateral three-point orbit in the two-dimensional
augmentation plane:

\[
\boxed{
\operatorname{Gram}(\delta_i)=
\begin{pmatrix}
6&-3&-3\\
-3&6&-3\\
-3&-3&6
\end{pmatrix},
\qquad
\operatorname{spec}=(9,9,0).
}
\]

This is the weight-triangle geometry of \(A_2\), with family permutations acting
as its Weyl group \(S_3\).

The obstruction is equally exact: a generation-blind finite algebra acts as
\(a\otimes I_3\) and commutes with the full \(U(3)_F\). It can see the centroid
\(\bar X\), but it cannot select one of the three vertices \(\delta_i\) without
additional family-sensitive data.

## 1. Exact identification of the charge table

Use left-handed Weyl conventions. Three times baryon number is

\[
3B=(1,-1,-1,0,0,0)
\]

and integer hypercharge is

\[
6Y=(1,-4,2,-3,6,0)
\]

on

\[
(Q,u^c,d^c,L,e^c,\nu^c).
\]

For the selected family \(i\), lepton number is

\[
L_i=(0,0,0,1,-1,-1),
\]

and is zero on the other two families. Therefore

\[
3X_i=3B-6Y-9L_i.
\]

On the exceptional family,

\[
X_i=(0,1,-1,-2,1,3),
\]

while on each unselected family,

\[
X_i=(0,1,-1,1,-2,0).
\]

The Higgs has

\[
X_i(H)=-2Y(H)=-1.
\]

These are exactly the minimal rows found by the exhaustive certificate in
document 1096.

## 2. Literature status

Salvioni, Strumia, Villadoro and Zwirner classify non-universal minimal
\(Z'\) models whose generators are anomaly-free combinations of hypercharge,
baryon number and partial lepton numbers. They identify the span of
\(B-3L_e\), \(B-3L_\mu\), and \(B-3L_\tau\), and show that suitable
renormalizable Higgs sectors can reproduce fermion masses and mixing.

Bauer, Foldenauer and Mosny give a systematic flavor analysis with three
right-handed neutrinos. Their conclusions relevant here are:

- \(U(1)_{B-3L_i}\) belongs to the minimal anomaly-free family-specific set;
- full PMNS structure excludes a purely Dirac, one-Higgs realization except
  for family-universal \(B-L\);
- Majorana masses or higher operators supply the necessary flavor connection;
- non-universal neutrino charges generically yield flavor-changing neutrino
  couplings in the mass basis.

Accordingly:

\[
\boxed{
\text{the gauge symmetry is known; its integration into the present }
\mathbb Z_9/\text{NCG/Jordan chain is the new question.}
}
\]

## 3. Hypercharge dressing and integral minimality

The familiar generator \(B-3L_i\) has quark charges in thirds. Adding the
already-gauged generator \(-2Y\) produces the integral charge table \(X_i\).

This dressing does three jobs:

1. it leaves the physical new gauge direction unchanged modulo hypercharge;
2. it reduces modulo three to the baryon-triality residues used in documents
   1092–1096;
3. it minimizes the absolute integer charges under the one-Higgs convention.

Changing \(X_i\to X_i+k(6Y)\) changes the displayed elementary charges and
kinetic-mixing basis, but not the two-dimensional gauge algebra spanned by
\(Y\) and \(X_i\). The minimal representative is therefore a preferred lattice
basis, not a new Lie-algebra direction.

## 4. The \(A_2\) family orbit

The centroid of the three generators is

\[
\frac13(X_e+X_\mu+X_\tau)
=B-L-2Y=\bar X.
\]

Their deviations are

\[
\delta_i=X_i-\bar X=L-3L_i.
\]

The coefficient vectors of the \(\delta_i\) lie in

\[
\{(x_e,x_\mu,x_\tau):x_e+x_\mu+x_\tau=0\},
\]

the real augmentation representation of \(S_3\).

The differences are

\[
X_i-X_j=-3(L_i-L_j),
\]

so the roots are the familiar anomaly-free lepton-family differences. The
three vertices are the Weyl orbit of a fundamental \(A_2\) weight, scaled by
three in the conventional root lattice.

This supplies an exact bridge to the corpus's repeated \(A_2\) structures:

- three choices related by \(S_3\);
- a two-dimensional augmentation plane;
- a universal centroid plus a traceless relational displacement;
- charge-three steps between vertices.

It does **not** identify this flavor \(A_2\) with the carrier, Wilson,
sideband, or code \(A_2\) objects elsewhere in the corpus. A typed intertwiner
is still required.

## 5. What a generation-blind finite geometry can and cannot do

In the minimal three-generation replication of a one-generation finite
spectral triple, every internal operator has the form

\[
a\otimes I_{F},
\qquad
F\cong\mathbb C^3.
\]

Such operators commute with the full flavor group

\[
I\otimes U(3)_F.
\]

The family-universal centroid \(\bar X\) is compatible with this commutant.
Each \(\delta_i\), however, is a noncentral traceless diagonal operator on
\(F\). No generation-blind algebra element can select it.

Therefore \(B-3L_i\) can enter the NCG branch only through one of:

1. an enlarged finite algebra acting nontrivially on family space;
2. a finite Dirac/Yukawa spurion whose stabilizer selects a family projector;
3. a boundary, monodromy or exceptional construction that derives the
   \(A_2\) flavor orbit;
4. an external gauged flavor symmetry added to, rather than derived from, the
   minimal finite triple.

This is a genuine structural obstruction, not merely a missing numerical fit.

## 6. Relation to the charge-three flavon

For an SM-singlet scalar, hypercharge vanishes, so its charge is the same under
\(X_i\) and \(B-3L_i\). A scalar of charge three therefore:

- connects adjacent vertices in the family charge lattice;
- breaks the continuous \(U(1)\) while preserving its \(\mathbb Z_3\)
  subgroup;
- supplies exactly the first-order off-block Yukawa insertions found in
  document 1096.

The exceptional Majorana diagonal has charge six and consequently requires two
insertions in the one-flavon effective theory. This is not an arbitrary
Froggatt–Nielsen choice; it is the distance-two point in the same charge-three
lattice.

## 7. Phenomenological fork

The three vertices are mathematically equivalent under abstract family
permutation, but they are physically inequivalent once the observed charged
leptons are labelled:

- \(B-3L_e\) is electron-specific;
- \(B-3L_\mu\) is muon-specific;
- \(B-3L_\tau\) is tau-specific.

Existing phenomenology treats these as distinct \(Z'\) models. Current
experimental bounds are time-dependent and are not reproduced here without a
dedicated up-to-date analysis.

The source literature identifies neutrino flavor-changing interactions in the
mass basis as a characteristic discriminator from \(B-L\). That supplies a
possible observable branch, but the present programme must first determine the
gauge-boson mass, coupling, kinetic mixing and scalar sector.

## 8. Stop-everything criteria

**Novelty stop:** do not present the minimal continuous generator as a newly
discovered anomaly-free \(U(1)\). It is hypercharge-dressed \(B-3L_i\).

**Equivalence stop:** do not confuse equivalence modulo a gauged hypercharge
basis change with equality of displayed charge tables or of kinetic-mixing
parameters.

**\(A_2\) stop:** the exact family \(A_2\) orbit is not automatically the same
object as any other \(A_2\) in the programme.

**NCG stop:** a generation-blind algebra cannot produce a selected
\(B-3L_i\) generator by inner fluctuations alone.

**Flavor stop:** choosing one vertex explicitly breaks family permutation.
The selection mechanism must be derived or admitted as a spurion.

**Phenomenology stop:** the mathematical existence of the symmetry does not
evade \(Z'\), neutrino-scattering, electroweak, meson-decay or cosmological
bounds.

## 9. Positive triggers

1. Construct a typed intertwiner between this family augmentation plane and a
   previously derived \(A_2\) carrier/code/response plane.
2. Derive a family projector from the finite Dirac operator whose stabilizer is
   exactly one \(B-3L_i\) vertex.
3. Identify the charge-three scalar as an existing NCG composite or prove that
   the minimal scalar inventory excludes it.
4. Perform a current-data fit for all three family choices and determine which
   vertex, if any, remains viable.

## 10. Verdict

The continuous branch has become both less novel and more structurally useful:

\[
\boxed{
X_i=B-2Y-3L_i
\quad\text{is the integral baryon-triality basis of }B-3L_i.
}
\]

The three choices form an exact \(A_2\) orbit whose centroid is the
family-universal \(B-L-2Y\) direction. This provides a clean mathematical place
for a family-selection mechanism to act.

But the current NCG/Furey construction is generation blind. Until an explicit
family-sensitive operator selects one vertex, \(B-3L_i\) is a compatible
external completion—not a derived consequence of the Jordan/\(Spin(2,3)\)
programme.

## Position in the corpus

- [exact family-to-placement \(A_2\) intertwiner and six-choice label torsor](1098_the_family_B_minus_3Li_orbit_is_exactly_the_trace_zero_placement_A2_module_but_the_intertwiner_is_a_six_choice_label_torsor.md)
- [minimal continuous lift and flavon texture](1096_three_families_admit_a_minimal_anomaly_free_continuous_baryon_triality_lift_but_it_forces_a_one_plus_two_lepton_texture_repaired_by_a_charge_three_flavon.md)
- [generation-blind topology does not select three](../0300-0399/321_selector_topology_anomalies_and_the_aiii_index_do_not_by_themselves_select_three_generations.md)
- [generation-blind Furey conjugation leaves the flavor real structure noncanonical](../0400-0499/443_generation_blind_furey_car_conjugation_cannot_canonically_fix_the_flavor_real_structure_or_its_phase_torus.md)

