# The Full Twice-Punctured Qutrit Automorphism Group Has No Accidental Root Exchange

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B07, B09, B10, B13 and B14  
**Claim status:** exhaustive computer-assisted projective-automorphism theorem; direct binary phase-action identification is closed

## 1. Result

The fourteen retained columns after deleting \(\nu^c\) and \(e^c\) form a projective point configuration in \(PG(4,3)\). Exhaustive enumeration of all projective linear transformations preserving this configuration gives

\[
\boxed{
|\operatorname{Aut}_{\rm proj}(\mathcal C_{14})|=24.}
\]

Every one of the 24 automorphisms also preserves the missing unordered pair. The group is therefore exactly the projective image of the ambient unordered-puncture stabilizer already found inside \(W(D_5)\); twice puncturing creates no accidental projective symmetry.

On the two deleted coordinates, the induced monomial actions are exactly

\[
\boxed{\{\pm I,\pm P\}.}
\]

There are no actions with a relative puncture sign. Hence the \(D_2\) root exchange remains absent even in the full twice-punctured qutrit code automorphism group.

## 2. Exhaustive method

The sixteen projective spinor weights may be normalized as

\[
[1,\epsilon_2,\epsilon_3,\epsilon_4,\epsilon_5],
\qquad
\epsilon_i\in\{\pm1\}\subset\mathbb F_3.
\]

Delete

\[
[1,1,1,1,1],
\qquad
[1,1,1,-1,-1].
\]

To enumerate projective automorphisms:

1. choose five retained points forming a basis;
2. choose a sixth frame point having no zero coordinate in that basis;
3. enumerate all ordered target bases;
4. use the sixth point to determine the five relative projective scalars;
5. construct the unique candidate \(PGL(5,3)\) transformation;
6. retain it only if it permutes all fourteen points.

The sixth frame point removes the otherwise independent \(2^4\) relative-scalar ambiguity. Candidate matrices are normalized by global projective scalar and deduplicated.

The result is 24 transformations, not merely a lower bound.

## 3. Comparison with the ambient Weyl group

The previous ambient calculation found

\[
|\operatorname{Stab}_{W(D_5)}\{\nu^c,e^c\}|=24.
\]

Every ambient stabilizer element acts projectively on the retained columns. Since the full projective automorphism group also has order 24,

\[
\boxed{
\operatorname{Aut}_{\rm proj}(\mathcal C_{14})
=
\operatorname{Stab}_{W(D_5)}\{\nu^c,e^c\}_{\rm proj}.}
\]

Adding the global scalar negation gives the expected central monomial doubling, but it changes both puncture signs together and cannot create a relative sign.

## 4. Consequence

All currently available symmetry repairs have now failed:

- ambient Weyl enlargement: absent;
- accidental twice-punctured qutrit automorphism: absent;
- Tor shear: insufficient;
- integral/Fourier conjugacy: obstructed at two;
- central metaplectic phase: cannot alter the quotient action.

Therefore the proposed equality between the support weak swap and the two-puncture code exchange should be treated as **falsified for this construction**, not merely pinned.

What survives is the exact quadratic-module match

\[
(D_{\rm supp},q)
\cong
\operatorname{Tor}\oplus A_{-D_2}.
\]

The matching phase modules need not carry the same distinguished symmetry. This is a useful separation of structure from action.

## 5. Remaining branches

1. Treat the Furey support swap and puncture exchange as distinct operations and look for a larger doubled Dirac carrier containing both.
2. Continue the odd-prime branch, where coordinate and root exchange are conjugate.
3. Investigate whether the order-four \(M/I\) direction carries an orientation character independent of puncture exchange.
4. Preserve the phase-module isometry while dropping the failed equivariance demand.

## 6. Stop-everything and falsification gates

### Stop-everything

1. A full doubled carrier realizes both nonconjugate involutions as restrictions of one larger action.
2. A physical observable distinguishes which involution acts in the binary sector.
3. The order-four extension couples the two actions through dynamics rather than conjugacy.

### Falsifiers now established

- The full twice-punctured qutrit projective automorphism group has no root exchange.
- No relative puncture sign occurs.
- Puncturing does not enlarge the projective group beyond the ambient order-24 stabilizer.

## Certificate and companions

- [Full projective automorphism enumeration](scripts/compute_full_twice_punctured_qutrit_projective_automorphism_group.mjs)
- [Ambient Weyl-stabilizer audit](534_the_ambient_d5_weyl_stabilizer_does_not_supply_the_required_d2_root_exchange.md)
- [Tor-shear no-go](533_tor_shears_cannot_hide_the_binary_exchange_mismatch.md)

