# The Central Selector (C_3) Is Not the Primitive Mutual Shear Even Modulo Three and Cannot Yet Be Called Framing

## Claim status

Exact integral distinction and exhaustive (Sp(4,\mathbb F_3)) non-conjugacy theorem.

## 1. The tempting identification

The finite selector torsor contains the central order-three element

\[
Z=(HR)^2.
\]

The genus-two/qutrit branch independently contains the primitive mutual shear

\[
U=
\begin{pmatrix}
I_2&0\\
\begin{smallmatrix}0&1\\1&0\end{smallmatrix}&I_2
\end{pmatrix}.
\]

Because both become order three modulo three, it is tempting to identify the central torsor coordinate with mutual framing. That identification is false in the present representation.

## 2. They already differ integrally

Over the integers,

- (Z) has finite order three;
- (U) is a nontrivial unipotent of infinite order.

They therefore cannot be equal or integrally conjugate.

One might still hope that their reductions modulo three encode the same qutrit operation in different symplectic frames. The exhaustive finite calculation rules this out too.

## 3. Superficial finite invariants agree

In (Sp(4,\mathbb F_3)), both elements obey

\[
g^3=I,
\qquad
\operatorname{rank}(g-I)=2,
\qquad
(g-I)^2=0.
\]

Thus both have two size-two unipotent Jordan blocks. These shared invariants are not enough to determine a symplectic conjugacy class.

Their cyclic subgroups are already unequal:

\[
\langle Z\rangle\ne\langle U\rangle.
\]

## 4. Exhaustive conjugacy result

The certificate generates all

\[
|Sp(4,\mathbb F_3)|=51{,}840
\]

matrices and solves both intertwining equations

\[
gZ=Ug,
\qquad
gZ=U^{-1}g.
\]

It finds no solution in either case.

The centralizer orders expose the class split:

\[
|C(Z)|=216,
\qquad
|C(U)|=108.
\]

Hence their conjugacy classes have different sizes,

\[
|\mathcal C_Z|=240,
\qquad
|\mathcal C_U|=480,
\]

which independently proves that they cannot be conjugate. The same conclusion holds for (U^{-1}).

## 5. Consequence for the six-point candidate stratum

The surviving central coordinate in documents 788–789 must be called only a **central selector phase** or **central selector class**. It cannot currently be called:

- the primitive mutual shear;
- the qutrit cross phase;
- a mutual Dehn twist;
- a framing observable.

This narrows the six candidate points sharply. Their (C_3) coordinate is mathematically exact inside \(\langle R,H\rangle\), but it lacks the hoped-for identification with the independently derived third relationship (U\).

## 6. Open exits

The negative theorem does not show that (Z) is physically meaningless. It leaves several harder possibilities:

1. (Z) and (U) act in different representations connected by a non-invertible response map.
2. A quotient observable forgets the finite-field conjugacy-class invariant.
3. (Z) describes a local color/handle selector phase while (U) describes the genuinely mutual dynamical relationship.
4. The physical background fixes one (Z)-coordinate, leaving no threefold degeneracy.

The third option is currently the cleanest: keep the finite selector register and the mutual shear as distinct operations with distinct jobs.

## 7. Stop-everything tests

- **Positive bridge:** derive a typed response functor that sends both classes to the same physical observable while explaining why it is not an invertible symplectic intertwiner.
- **Quotient bridge:** identify an explicit quotient representation in which their images coincide and show that it preserves the needed Standard-Model data.
- **Selection trigger:** a Furey/Jordan source fixes one central selector coordinate, collapsing the six candidates to the handle-order pair.
- **Language stop:** no later document may call (Z) mutual framing solely because both (Z) and (U) have order three modulo three.

## 8. Executable certificate

```powershell
node verification/compare/compare_central_selector_phase_with_primitive_mutual_shear_modulo_three.mjs
```

The certificate constructs (Z) and (U), generates the full finite symplectic group, tests equality of cyclic subgroups, exhausts both conjugacy equations and computes the two centralizer and class orders.

## Companion documents

- [The exact three-register selector atlas](788_the_18_background_torsor_is_exactly_three_framed_matter_pairings_times_a_central_three_phase_but_the_physical_source_map_is_open.md)
- [The six-point typed candidate stratum](789_standard_model_typing_uniquely_selects_the_furey_double_transversal_pairing_and_leaves_at_most_a_six_point_selector_stratum.md)
- [The primitive mutual-shear coupled word](773_the_shortest_coupled_selector_word_uses_the_unique_qutrit_mutual_shear_and_has_an_irreducible_partially_hyperbolic_quartic.md)
