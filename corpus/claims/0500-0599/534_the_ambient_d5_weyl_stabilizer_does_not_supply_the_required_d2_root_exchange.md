# The Ambient \(D_5\) Weyl Stabilizer Does Not Supply the Required \(D_2\) Root Exchange

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B07, B09, B10, B13 and B14  
**Claim status:** exact ambient-Weyl stabilizer theorem; the full accidental automorphism group of the twice-punctured code remains to be computed

## 1. Result

Take the two puncture weights

\[
q_N=(1,1,1,1,1),
\qquad
q_E=(1,1,1,-1,-1).
\]

Exhaustive enumeration of the even signed permutations \(W(D_5)\) gives

\[
\boxed{
|\operatorname{Stab}_{W(D_5)}\{q_N,q_E\}|=24.}
\]

Its pointwise stabilizer has order 12, and 12 further elements exchange the punctures. Abstractly the pointwise part is the evident \(S_3\times S_2\) preserving the three equal and two unequal oscillator positions.

On puncture-evaluation coordinates, the induced actions are only

\[
I
\quad\text{and}\quad
P=\begin{pmatrix}0&1\\1&0\end{pmatrix}.
\]

Including the global monomial negation identified in the Prakash–Ramya qutrit automorphism group enlarges this to

\[
\boxed{\{\pm I,\pm P\}.}
\]

None is the single-puncture sign reversal

\[
\begin{pmatrix}1&0\\0&-1\end{pmatrix},
\]

which is the operation inducing \(D_2\) root exchange.

## 2. Action on the \(D_2\) phase module

In the \(D_2\) basis

\[
x_1=(1,1),\qquad x_2=(1,-1),
\]

puncture exchange becomes

\[
x_1\mapsto x_1,\qquad x_2\mapsto-x_2.
\]

The four ambient actions \(\pm I,\pm P\) therefore become diagonal sign changes. Since

\[
A_{D_2}\cong(\mathbb Z_2)^2,
\]

all signs disappear:

\[
\boxed{
\operatorname{Stab}_{W(D_5)}\{q_N,q_E\}
\text{ acts trivially on }A_{D_2}.}
\]

The required exchange

\[
\bar y_1\leftrightarrow\bar y_2
\]

is absent.

## 3. Consequence

The hoped-for rescue

\[
\text{support weak swap}
=
\text{ambient }SO(10)\text{ Weyl action on the two-puncture phase}
\]

fails.

Combined with the previous cycles:

- integral conjugacy cannot repair it;
- a metaplectic central phase cannot repair it;
- Tor shears cannot repair it;
- the ambient \(D_5\) Weyl stabilizer does not contain the needed lift.

The direct symmetry identification is therefore pinned, not merely unresolved.

## 4. Remaining possibilities

Three branches remain credible:

1. **Accidental twice-punctured automorphism.** Puncturing two coordinates may enlarge the monomial automorphism group beyond the ambient Weyl stabilizer.
2. **Additional physical sign.** Charge flow, chirality, Furey edge orientation or a Dirac-pairing convention may supply the single-puncture sign reversal.
3. **Distinct symmetries.** The Furey support swap and code puncture exchange may be different operations that coincide only in odd-prime or unlabelled shadows.

The third option is now the conservative default.

## 5. Stop-everything and falsification gates

### Stop-everything

1. A complete automorphism calculation of the twice-punctured code finds a root-exchange element outside \(W(D_5)\times\{\pm1\}\).
2. A source-derived oriented operator assigns the missing sign to exactly one puncture.
3. The full doubled Dirac carrier realizes both actions as different restrictions of one larger symmetry.

### Falsifiers

- No element of the ambient pair stabilizer supplies root exchange.
- Global negation does not help.
- An odd-prime equivalence cannot be imported into the binary integral lattice.

## 6. Next branches

1. Compute the full monomial automorphism group of the twice-punctured qutrit code.
2. Test the full doubled Dirac carrier for a common parent action.
3. Continue the odd-prime phase map independently.
4. Examine the \(\mathbb Z_4\) direction of \(M/I\) for an oriented sign character, without identifying it with coordinate exchange.

## Certificate and companions

- [Two-puncture Weyl-stabilizer certificate](../../../verification/enumerate/enumerate_two_puncture_d5_weyl_stabilizer_and_logical_actions.mjs)
- [Tor-shear no-go](533_tor_shears_cannot_hide_the_binary_exchange_mismatch.md)
- [Localization at two](532_coordinate_exchange_and_d2_root_exchange_are_conjugate_away_from_two_but_not_integrally.md)

