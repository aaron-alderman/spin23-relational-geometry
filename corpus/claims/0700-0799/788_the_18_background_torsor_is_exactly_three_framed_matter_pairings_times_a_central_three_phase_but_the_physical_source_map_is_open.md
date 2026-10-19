# The 18-Background Torsor Is Exactly Three Framed Matter Pairings Times a Central Three-Phase, but the Physical Source Map Is Open

## Claim status

Exact group-theoretic and combinatorial factorization; physical interpretation of the central phase and admissibility of all pairings remain open.

## 1. Why eighteen is no longer only a count

The selector group found in document 786 is

\[
G=\langle R,H\rangle\cong C_3\times S_3.
\]

Writing

\[
Z=(HR)^2,
\qquad
r=ZR,
\]

every element has a unique normal form

\[
g=Z^a r^iH^e,
\qquad
a,i\in\mathbb Z_3,quad e\in\mathbb Z_2.
\]

This gives more than the cardinality identity (18=3\cdot3\cdot2): the group action itself has an exact three-register model.

## 2. The three perfect matter pairings

The four labels \(\{u,d,e,\nu\}\) admit precisely three perfect matchings:

\[
\begin{aligned}
m_0&=((u,e),(d,\nu)),\\
m_1&=((u,d),(e,\nu)),\\
m_2&=((u,\nu),(d,e)).
\end{aligned}
\]

The sewn Furey handles are (m_0):

\[
C=(u,e),
\qquad
D=(d,\nu).
\]

Adding a bit (e\) that orders the two pairs produces six *framed pairings*. These six states carry the regular (S_3) action in the normal coordinates (r^iH^e):

\[
r:(i,e)\mapsto(i+1,e),
\qquad
H:(i,e)\mapsto(-i,1-e).
\]

The reflection has no fixed framed pairing because it reverses the handle-order bit. Consequently this is the regular, rather than the ordinary three-point, action of (S_3).

## 3. The independent central register

The central generator acts by

\[
Z:(a,i,e)\mapsto(a+1,i,e).
\]

Thus the complete torsor is exactly

\[
\mathcal O_N
\cong
\underbrace{\mathbb Z_3}_{\text{central selector phase}}
\times
\underbrace{\{m_0,m_1,m_2\}}_{\text{matter pairing}}
\times
\underbrace{\mathbb Z_2}_{\text{handle order}}.
\]

Conjugating the hyperbolic checkpoint by the corresponding eighteen matrices gives eighteen distinct response backgrounds. The same coordinates therefore label both the group elements and the checkpoint orbit.

## 4. What is exact and what is not

The following statements are exact:

- every selector matrix has one and only one triple ((a,i,e));
- the formulas above reproduce left multiplication by (Z,r,H);
- all eighteen checkpoint conjugates receive distinct triples;
- (m_0) is the actual sewn Furey matching already used in the programme.

The following stronger statements have **not** been established:

- that (Z) is the physical mutual-framing variable;
- that (m_1) and (m_2) are valid sewn Standard-Model backgrounds rather than formal relabellings;
- that handle order is a gauge-independent physical bit;
- that the eighteen backgrounds are degenerate vacua;
- that any of these labels count particles, colors or generations.

In particular, the central (C_3) arises here from (Z=(HR)^2), not directly from the primitive mutual shear (U\). Identifying it with a modulo-three framing class requires a source-derived intertwiner between those operations.

## 5. Relation to flux reversal

Flux reversal is absent from the three registers. Document 787 proves that adjoining it produces an infinite hyperbolic extension rather than a finite quotient. It must therefore remain an antiunitary real structure on the response fiber over each ((a,i,e)), not another coordinate of the finite base.

This also prevents three distinct binary notions from being collapsed:

- the handle-order bit (e);
- propagation/flux orientation;
- Nambu or gauge-conjugating reality.

## 6. Research fork

Two paths are now open.

### Path A — derive the labels

Construct the matter-to-carrier map and test whether:

1. the three perfect matchings are connected by actual admissible Furey/Jordan operations;
2. (Z) maps to a mutual-framing or qutrit phase observable;
3. the response kernel is covariant under the full regular action.

Success would turn the finite torsor into a derived discrete background space.

### Path B — symmetry breaking to the sewn point

If only (m_0) respects the channel/color typing, determine which subgroup preserves it and which spurions select its handle order and central phase. The eighteen-point set would then be a formal selector orbit whose physical theory occupies a smaller stratum.

## 7. Stop-everything tests

- **Positive trigger:** a source-level operation sends the three matter matchings and central phase exactly according to the certified action.
- **Quotient trigger:** a physical equivalence identifies a nontrivial subgroup orbit while preserving the response and all typed matter data.
- **Obstruction:** the alternate matchings violate gauge typing or CAR incidence in a way no neutral response compression can repair.
- **Anti-numerology stop:** no claim may use (18=3\times3\times2) without the explicit normal-form/action certificate.

## 8. Executable certificate

```powershell
node verification/identify/identify_the_18_selector_backgrounds_with_three_framed_pairings_times_a_central_three_phase.mjs
```

The certificate constructs all eighteen exact integral matrices, proves uniqueness of the normal form, verifies the generator action on the three registers and bijects the labels with the eighteen checkpoint conjugates.

## Companion documents

- [The finite (C_3\times S_3) selector torsor](786_oriented_color_and_handle_exchange_generate_c3_times_s3_and_the_hyperbolic_checkpoint_has_a_regular_18_background_spurion_orbit.md)
- [Flux reversal generates an infinite extension](787_flux_reversal_does_not_normalize_the_finite_selector_torsor_and_its_adjunction_generates_an_infinite_hyperbolic_extension.md)
- [The sewn Furey handle exchange is not Standard-Model typed](767_the_sewn_furey_ribbon_has_untyped_handle_exchange_but_no_standard_model_typed_exchange_between_c_and_d.md)
- [The primitive mutual-shear coupled word](773_the_shortest_coupled_selector_word_uses_the_unique_qutrit_mutual_shear_and_has_an_irreducible_partially_hyperbolic_quartic.md)
