# A Second Kinetic Direction Forces a Choice Between Chiral Descent and Orientation Reversal

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B05, B06, B08, B09 and B11  
**Claim status:** exact (Cl_5) extension and uniqueness theorem; physical Pin/domain realization remains open

## 1. Why the one-momentum model was incomplete

The previous primitive Hamiltonian used one kinetic generator. That is enough
to classify a local wall symbol, but a vortex lives in two spatial directions.
The second kinetic generator is not cosmetic: it tests whether the deck repair
is compatible with an oriented spatial Clifford frame.

Take

\[
\alpha_x=\sigma_x\otimes I,qquad
\alpha_y=\sigma_y\otimes I,
\]

\[
\beta_1=\sigma_z\otimes\sigma_x,qquad
\beta_2=\sigma_z\otimes\sigma_z,
\]

and

\[
\Gamma=\sigma_z\otimes\sigma_y.
\]

These are five mutually anticommuting Hermitian involutions. The oriented
two-dimensional chiral Dirac symbol is

\[
H(\mathbf k,\varphi)
=k_x\alpha_x+k_y\alpha_y
+\cos\frac\varphi2\,\beta_1
+\sin\frac\varphi2\,\beta_2,
\qquad \{H,\Gamma\}=0.
\]

## 2. The oriented internal repair is unique

An internal deck repair on an oriented plane must satisfy

\[
[D,\alpha_x]=[D,\alpha_y]=0,
\qquad
\{D,\beta_1\}=\{D,\beta_2\}=0.
\]

Commuting with both kinetic Pauli matrices forces

\[
D=I\otimes d
\]

in this irreducible representation. Anticommuting with both
\(\sigma_x\) and \(\sigma_z\) then forces

\[
d\propto\sigma_y.
\]

After imposing a Hermitian involution, the only choices are

\[
\boxed{D_{\rm or}=\pm I\otimes\sigma_y.}
\]

They sew the mass sign:

\[
D_{\rm or}H(\mathbf k,\varphi+2\pi)D_{\rm or}^{-1}
=H(\mathbf k,\varphi).
\]

But they commute with the chiral grading:

\[
\boxed{[D_{\rm or},\Gamma]=0.}
\]

Therefore an entirely internal, orientation-preserving primitive deck lift
does **not** produce the desired loss of the integer grading.

## 3. The grading-reversing repair flips the transverse frame

The one-momentum repair was

\[
D_{\rm Pin}=\alpha_x.
\]

It obeys

\[
D_{\rm Pin}\alpha_xD_{\rm Pin}^{-1}=\alpha_x,
\quad
D_{\rm Pin}\alpha_yD_{\rm Pin}^{-1}=-\alpha_y,
\]

\[
D_{\rm Pin}\beta_aD_{\rm Pin}^{-1}=-\beta_a,
\quad
D_{\rm Pin}\Gamma D_{\rm Pin}^{-1}=-\Gamma.
\]

Consequently it sews the full symbol only if the deck transition also sends

\[
k_y\longmapsto-k_y.
\]

Equivalently,

\[
D_{\rm Pin}H(k_x,-k_y,\varphi+2\pi)D_{\rm Pin}^{-1}
=H(k_x,k_y,\varphi).
\]

The grading-reversing lift is therefore a reflection of one spatial Clifford
direction. It is Pin-like rather than an internal Spin lift over a fixed
oriented frame.

## 4. The exact fork

The minimal two-dimensional model admits two conceptually different repairs:

\[
\begin{array}{c|c|c|c}
\text{repair}&\text{spatial frame}&\Gamma&\text{consequence}\\ \hline
D_{\rm or}=I\otimes\sigma_y&\text{preserved}&\text{preserved}
&\text{integer grading descends}\\
D_{\rm Pin}=\alpha_x&k_y\mapsto-k_y&\text{reversed}
&\text{only ungraded/real structure descends}
\end{array}
\]

This is not a basis accident. The uniqueness result in the oriented column
shows that there is no other internal (4\times4) involution that preserves
both kinetic generators, flips both masses and reverses \(\Gamma\).

## 5. Consequence for the odd cover index

An orientation-preserving internal deck that commutes with \(\Gamma\) returns
the programme to the covering-index obstruction: an ordinary free degree-two
quotient cannot pull back to an odd complex index three.

The grading-reversing construction avoids that contradiction only by changing
the geometric category. At least one of the following must be true:

- the selector transition reverses a transverse frame and the operator lives
  on a Pin-type bundle;
- the defect is a boundary/cross-cap/domain construction rather than an
  ordinary vortex on an oriented punctured plane;
- the deck action is projective or antiunitary in a way not represented by a
  purely internal unitary sewing;
- the proposed odd primitive parity is absent.

If the frame-reflecting lift is an exact symmetry of the full oriented-double
Fredholm operator, it also exchanges its two chiral kernels and forces the
ordinary complex cover index to zero. A Pin mod-two index may still exist, but
it cannot be the reduction of the conventional index-three vortex for that
same operator.

Thus the odd-cover obstruction and the second-kinetic-direction calculation
converge on the same conclusion: the primitive object is not an ordinary
oriented quotient vortex.

## 6. Particle--hole reality changes branch

For the two-dimensional symbol, the antiunitary

\[
C=\alpha_xK
\]

still obeys

\[
C^2=+1,
\qquad
CH(\mathbf k,\varphi)C^{-1}=-H(-\mathbf k,\varphi).
\]

However the oriented repair (D_{\rm or}) is imaginary, so

\[
CD_{\rm or}C^{-1}=-D_{\rm or}.
\]

The second kinetic direction therefore moves the oriented construction into a
different reality-character branch of the abstract deck table. This confirms
that the signs left open in the Furey audit are physically consequential.

## 7. Relation to selector geometry

The result gives a precise possible meaning to the intuition that the
primitive selector is a one-twist carrier. The twist cannot live solely in an
internal mass vector if it is to reverse the chiral grading. It must also act
on the transverse frame, spinor domain or real structure.

That makes the phrase “one carrier, two faces” mathematically sharper:

- the two faces are exchanged by a mass-sign transition;
- retaining the odd grading obstruction requires the transition to reverse a
  frame orientation or its operator-theoretic equivalent;
- the resulting object is closer to a Möbius/Pin defect than to an ordinary
  complex Higgs vortex.

This is a candidate interpretation, not yet a Standard-Model derivation.

## 8. Repair paths

### Path A — Pin Dirac operator

Construct the operator on a Möbius strip, cross-cap neighborhood or doubled
cylinder with reflection sewing. Specify Pin\(^+\) or Pin\(^-\) by the square
of the lifted reflection and compute its mod-two kernel.

### Path B — boundary self-adjoint extension

Keep the bulk oriented but encode the reflection in the boundary domain. Test
whether the extension is CAR compatible, gauge covariant and Fredholm.

### Path C — antiunitary internal sewing

Classify antiunitary repairs that preserve the two-dimensional principal
symbol. Determine whether Furey conjugation supplies one without creating an
independent mirror carrier.

### Path D — accept chiral descent

Use (D_{\rm or}), retain the integer grading and conclude that the index-three
cover cannot be an ordinary pullback. This branch then needs a different
primitive geometry or must abandon the claimed quotient.

## 9. Stop-everything and falsification gates

**Stop-everything trigger:** a physically derived Pin deck action on the Furey
neutral carrier has an odd real kernel and its oriented double has complex
index three.

**Orientation falsifier:** \(D=\alpha_x\) is called an internal repair of the
two-dimensional symbol while its sign flip of \(\alpha_y\) is omitted.

**Uniqueness falsifier:** a different oriented internal repair is proposed in
the minimal module without violating at least one of the four commutation
conditions.

**Index falsifier:** the orientation-preserving (D_{\rm or}) is used to
explain loss of the chiral integer even though it commutes with \(\Gamma\).

**Geometry falsifier:** a Pin/reflection transition is introduced but the
physical base, domain and lift square are never specified.

## 10. Pinned dependency and next calculation

Pin the primitive parity at the geometric category of the defect. The next
decisive calculation is not another internal mass matrix: it is a Pin
self-adjoint Dirac problem with explicit reflection sewing and a computable
kernel.

In parallel, test whether Furey's neutral real structure chooses
(D_{\rm or}), (D_{\rm Pin}), or neither when the two spatial kinetic
generators are represented on the same carrier.

## 11. Certificate

The [two-dimensional deck fork certificate](scripts/verify_2d_selector_deck_orientation_fork.mjs)
checks the (Cl_5) algebra, the unique oriented repair, its preservation of
the chiral grading, the transverse reflection required by the grading-reversing
repair, and the particle--hole reality character.

## Companion documents

- [Finite-family parity audit](375_the_minimal_deck_model_loses_the_integer_grading_but_does_not_yet_prove_odd_fermion_parity.md)
- [Minimal one-momentum deck model](374_a_minimal_four_component_dirac_model_descends_the_hamiltonian_but_reverses_the_chiral_grading.md)
- [Abstract deck-lift branches](373_minimal_selector_deck_lifts_form_four_clifford_branches_not_one_furey_selected_operator.md)
- [Odd-cover obstruction](372_the_odd_double_cover_index_proves_the_primitive_selector_operator_is_twisted_not_an_ordinary_quotient.md)
