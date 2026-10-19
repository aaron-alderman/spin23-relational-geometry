# The Bare Furey TRO Cannot Choose the Genus-One Ribbon Orientation

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B06, B07, B08, B09, B10, B11, B13 and B14  
**Claim status:** exact matrix-unit TRO automorphism and real-structure-constant no-go; the graded/fermionic orientation selector remains open

## Executive result

Cycle 496 showed that the completed Furey graph becomes either a once-punctured torus with a symplectic cycle pairing or a pair of pants with zero intersection form, depending on the relative cyclic order at \(O_2\) and \(E\).

The next question was whether the existing ternary operator structure already chooses that order. It does not.

The sixteen completed matter matrix units have exactly 80 nonzero products

\[
[x,y,z]=xy^\dagger z,
\]

and every nonzero matrix-unit structure constant is the real number \(+1\). Moreover, the ungraded TRO admits two independent automorphisms:

1. a left \(C\leftrightarrow D\) swap exchanging \(u^c\leftrightarrow d^c\) while fixing \(e^c,\nu^c\);
2. a right \(C\leftrightarrow D\) swap exchanging \(e^c\leftrightarrow\nu^c\) while fixing \(u^c,d^c\).

Either swap reverses the branch order at exactly one of the two trivalent vertices. It therefore exchanges the genus-one and genus-zero ribbon classes while preserving the entire ungraded TRO product.

Hence:

\[
\boxed{
\text{bare matrix-unit support and }xy^\dagger z
\text{ do not select the symplectic ribbon twist}.}
\]

## 1. The global matrix-unit realization

Use an eight-dimensional endpoint space

\[
O_2^{(3)}\oplus H^{(2)}\oplus C\oplus D\oplus E.
\]

The completed matter support consists of

\[
\begin{aligned}
Q &: E_{O_i,H_a} &&(6),\\
u^c &: E_{C,O_i} &&(3),\\
d^c &: E_{D,O_i} &&(3),\\
L &: E_{H_a,E} &&(2),\\
e^c &: E_{E,C} &&(1),\\
\nu^c &: E_{E,D} &&(1).
\end{aligned}
\]

This gives \(6+3+3+2+1+1=16\) matrix units. Direct exhaustion finds 80 nonzero supported triples, agreeing with the earlier five-bit Cartan–ternary certificate.

For matrix units,

\[
E_{ab}E_{cd}^\dagger E_{ef}
=\delta_{bd}\delta_{ce}E_{af}.
\]

Every nonzero coefficient is \(+1\). There is no sign, phase or imaginary orientation tensor hidden in the unweighted multiplication table.

## 2. Independent left and right branch swaps

Any map

\[
\Phi_{U,V}(X)=UXV^\dagger
\]

is a TRO automorphism because

\[
\Phi(xy^\dagger z)
=\Phi(x)\Phi(y)^\dagger\Phi(z).
\]

Choose \(U\) to swap the endpoint basis vectors \(C,D\) and take \(V=I\). On the matter support this produces

\[
u_i^c\leftrightarrow d_i^c,
\qquad
e^c\mapsto e^c,
\qquad
\nu^c\mapsto\nu^c.
\]

It reverses the \(C,D\) ordering only at the \(O_2\) branch vertex.

Conversely, take \(U=I\) and let \(V\) swap \(C,D\). Then

\[
e^c\leftrightarrow\nu^c,
\qquad
u_i^c\mapsto u_i^c,
\qquad
d_i^c\mapsto d_i^c.
\]

It reverses the branch order only at \(E\).

Cycle 496 proved that reversing exactly one of these orders exchanges

\[
(g,b)=(1,1)
\quad\longleftrightarrow\quad
(g,b)=(0,3).
\]

The two ribbon topology classes are therefore in the same orbit under the automorphism group of the bare TRO.

## 3. Why real trace words cannot repair the choice

All unweighted matrix units are real. Every closed supported path has a real integral trace, and entrywise complex conjugation fixes the complete multiplication table. In particular, orientation reversal cannot be detected by an imaginary cycle character constructed only from these bare units.

An orientation-sensitive selector requires at least one of:

- complex edge phases not removable by vertex rephasing;
- a fermionic/Koszul sign convention tied to ordered generators;
- an antisymmetric volume or Pfaffian line;
- a boundary/ribbon sewing orientation;
- a graded trace carrying more information than ordinary matrix trace.

## 4. What the five-bit grading changes

The easy left and right swaps are **not** symmetries of the fixed five-bit Cartan labelling:

- the left swap changes the weights of all six \(u^c,d^c\) matrix units;
- the right swap changes the weights of \(e^c,\nu^c\).

Thus the full Cartan-graded TRO is more rigid than its bare support. This is important, but it does not yet select a handed cyclic order. Diagonal charge labels name the branches; they do not automatically supply an antisymmetric orientation functional on the ordered triple

\[
(\text{shared},C,D).
\]

The remaining selector must combine the grading with genuinely orientation-sensitive data. Merely observing that the grading forbids the branch swap is insufficient to decide which of the two possible cyclic orders is physical.

## 5. Relation to Yukawa and flavour phases

Once complex normalized edge transports are included, the relative cycle holonomy

\[
R_{CD}=U_CU_D^{-1}
\]

can distinguish orientations through its phase or conjugacy class. But those transports are not part of the bare TRO: they arise from Yukawa/Higgs dynamics and generation mixing.

For one generation, each individual phase can still be shifted between a response arrow and its Yukawa coefficient. With two independent completed cycles, a relative holonomy survives vertex-frame rephasings, but its numerical value remains an input until the edge maps are derived.

The hierarchy is therefore:

\[
\begin{aligned}
\text{bare TRO}&:\quad\text{no ribbon selection},\\
\text{Cartan grading}&:\quad\text{branches distinguished, handedness still absent},\\
\text{complex/fermionic sewing datum}&:\quad\text{possible orientation selector},\\
\text{derived edge dynamics}&:\quad\text{potential physical relative phase}.
\end{aligned}
\]

## 6. Updated branch decision

- **Closed:** bare support and ternary composition do not distinguish the two ribbon topology classes.
- **Closed:** independent left and right \(C/D\) swaps are exact ungraded TRO automorphisms.
- **Closed:** all 80 nonzero matrix-unit structure constants are real \(+1\).
- **Closed:** the fixed five-bit grading breaks those simple swaps.
- **Open:** an orientation-odd invariant of the graded TRO.
- **Open:** a fermionic sign or conjugation rule selecting an aligned cyclic order.
- **Open:** derivation of the complex edge transports from the Higgs/Yukawa action.

## 7. Stop-everything and falsification gates

### Stop-everything

1. The five-bit grading and CAR ordering canonically produce a nonzero orientation line on both trivalent branch triples.
2. Furey conjugation relates those lines with the aligned sign required for the genus-one thickening.
3. The resulting surface intersection maps equivariantly to the glue discriminant pairing.

### Falsification boundaries

- A graph drawing is not a ribbon selector.
- Associative or ternary composability is not a cyclic order.
- Real \(+1\) matrix-unit structure constants cannot by themselves produce a CP-odd phase.
- Breaking the branch-swap symmetry by labels does not automatically choose a handedness.
- Arbitrarily assigning phases to edges does not derive the physical orientation.

## 8. Certificate

The [bare-TRO ribbon no-go certificate](scripts/verify_bare_furey_tro_cannot_select_ribbon_orientation.mjs) reconstructs the sixteen five-bit-labelled matrix units, exhausts all 80 nonzero ternary products, verifies the two independent left/right branch-swap TRO automorphisms, checks their five-bit grading violations, and confirms the absence of an orientation-odd bare trace.

## Companion documents

- [Cartan–ternary five-bit intertwiner](412_the_completed_furey_tro_carries_the_so10_five_bit_code_as_a_cartan_ternary_intertwiner.md)
- [Two-cycle ribbon-symplectic fork](580_the_two_furey_cycles_have_a_relative_holonomy_but_only_a_ribbon_twist_makes_them_symplectic.md)
- [Unique electron channel but no arrow phase](577_the_unique_electron_cycle_selects_the_neutral_response_channel_but_not_its_sign_phase_or_normalization.md)
- [Higgs-augmented four-cycle theorem](435_the_higgs_augmented_linking_graph_has_four_yukawa_cycles_and_the_two_matter_cycles_are_paired_composites.md)
