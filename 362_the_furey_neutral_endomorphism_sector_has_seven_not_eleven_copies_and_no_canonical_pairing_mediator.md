# The Furey Neutral Endomorphism Sector Has Seven, Not Eleven, Copies—and No Canonical Pairing Mediator

**Date:** 17 October 2026  
**Branches:** B01, B03, B05, B06, B08, B11 and B13  
**Claim status:** exact correction of the endomorphism inventory and conditional tree-level mediator theorem; statistics, \(B-L\), kinetic terms and source selection remain underived

## 1. Corpus correction

The earlier endomorphism document displayed

\[
11(\mathbf1,\mathbf1)_0.
\]

Its executable certificate actually gives

\[
7(\mathbf1,\mathbf1)_0,
\qquad
2(\mathbf1,\mathbf1)_{+1},
\qquad
2(\mathbf1,\mathbf1)_{-1}.
\]

Eleven counts every \(SU(3)\times SU(2)\) singlet before hypercharge is
imposed. Four are hypercharged and are not Standard-Model gauge singlets.
Therefore

\[
\boxed{N_{SU(3)\times SU(2)\times U(1)_Y\text{ singlets}}=7.}
\]

This is a corpus error, not a convention change.

## 2. Exact origin of the seven

The two neutral one-dimensional carrier blocks are \(O_1\) and \(R\). Hence

\[
\operatorname{End}(O_1\oplus R)\cong M_2(\mathbb C)
\]

provides four copies. The trace directions in \(\operatorname{End}(O_2)\),
\(\operatorname{End}(H)\), and \(\operatorname{End}(C)\) provide three more:

\[
\boxed{\mathcal A_0\cong
M_2(\mathbb C)\oplus\mathbb C\oplus\mathbb C\oplus\mathbb C.}
\]

Its Hermitian part has real dimension \(4+1+1+1=7\).

## 3. Representation copies are not scalar fields

The inventory classifies internal gauge representations. It does not determine
whether a copy is a boson, fermion, auxiliary variable, observable, generator,
or propagating mode with positive kinetic term. It also assigns no \(B-L\).

For

\[
B_{ab}=\nu^c_a\nu^c_b,
\qquad B-L(B)=+2,
\]

a linear invariant \(S^{ab}B_{ab}\) requires \(B-L(S)=-2\). Hypercharge zero
does not imply this charge. Assigning it by hand would merely hide the new
charge-two scalar behind an endomorphism label.

## 4. Conditional exchange theorem

Suppose \(m\) complex scalar mediators have a positive mass matrix \(K\) and
couple to the six pair components through

\[
J_i=Y_{iA}B_A,
\qquad A=1,\ldots,6.
\]

For

\[
\mathcal L_S=-S^\dagger KS+S^\dagger J+J^\dagger S,
\]

eliminating \(S\) gives

\[
\boxed{\mathcal L_{\rm eff}=B^\dagger Y^\dagger K^{-1}YB.}
\]

Thus

\[
G=Y^\dagger K^{-1}Y\succeq0,
\qquad \operatorname{rank}G\leq m
\]

in this convention. A full \(U(3)\)-invariant kernel is proportional to the
identity on the six-dimensional irreducible space
\(\operatorname{Sym}^2(\mathbb C^3)\), so a componentwise exchange realization
requires at least six independent complex mediator directions.

Seven labels are numerically sufficient after arbitrary assignments. The
endomorphism algebra does not supply those assignments canonically.

## 5. Why the tempting \(7=1+5+1\) fails

One could arrange seven real directions as \(\mathbf1\oplus\mathbf5\oplus
\mathbf1\) and declare the middle five to be the sterile or relationship
fiveplet. The native algebra says otherwise. Under the inner \(SU(2)\) action,

\[
\operatorname{Herm}_2(\mathbb C)=\mathbf1\oplus\mathbf3,
\]

while the remaining trace directions are singlets. The canonical split is

\[
\boxed{\mathbf3\oplus\mathbf1\oplus\mathbf1\oplus\mathbf1\oplus\mathbf1,}
\]

not \(\mathbf5\oplus\mathbf1\oplus\mathbf1\). A fiveplet requires a new action
mixing inequivalent direct summands.

## 6. Flavor covariance is also missing

The sterile order parameter transforms as

\[
B\mapsto UBU^T,
\qquad U\in U(3).
\]

The seven copies belong to a one-generation internal carrier and have no
derived sterile-family \(U(3)\) action. Tensoring them with a chosen generation
space permits arbitrary flavor tensors but selects neither the symmetric six
nor its isotropic metric.

Three structures are independently absent:

1. bosonic statistics and a positive kinetic term;
2. \(B-L=-2\);
3. the \(\overline{\mathbf6}\) flavor action and source map.

Without all three, none of the seven copies is a derived Majorana mediator.

## 7. What the sign calculation does establish

If a charge-two scalar multiplet with positive \(K\) and linear Yukawa coupling
is independently derived, tree-level elimination fixes a semidefinite pairing
kernel. The sign problem then reduces to the mediator quadratic form, source
map, and normalization connecting the exchange convention to the regulated gap
equation.

This is still not a condensation theorem: the induced strength can be
subcritical, flavor-rank deficient, or beaten by a competing channel.

## 8. Programme consequence

The next valid question is not “which of eleven singlets is the scalar?” It is:

> Can a source-derived grading turn six of the seven neutral directions into
> complex charge-two bosonic mediators transforming as
> \(\operatorname{Sym}^2(\overline{\mathbf3})\), while leaving the seventh as a
> trace or constraint mode?

The native direct-sum algebra does not do this, but the question is now a finite
intertwiner problem.

## 9. Stop-everything and falsification gates

**Stop-everything trigger:** a Furey-derived grading, real structure and
generation action select six neutral directions as a positive-kinetic
\(B-L=-2\) flavor \(\overline{\mathbf6}\), whose exchange induces the isotropic
pairing kernel above criticality.

**Counting falsifier:** all eleven weak/color singlets are called full gauge
singlets without resolving hypercharge.

**Statistics falsifier:** an endomorphism representation is treated as an
elementary scalar merely because it is neutral.

**Charge falsifier:** hypercharge zero is used as evidence for \(B-L=-2\).

**Fiveplet falsifier:** \(7=1+5+1\) is imposed despite the native
\(3+1+1+1+1\) action.

**Dynamics falsifier:** positivity of conditional exchange is called proof of a
supercritical coupling.

## 10. Pinned dependency and continuation

Pin direct endomorphism mediation at the absent statistics/charge/flavor
intertwiner. Continue by testing whether bilinears of the neutral sector produce
a natural symmetric-six module, and whether exceptional triality supplies the
missing generation action or only three permutation sheets.

## 11. Certificate

The [neutral-endomorphism mediator gate](scripts/verify_furey_neutral_endomorphism_mediator_gate.mjs) reconstructs all eleven weak/color singlets, proves only seven have zero hypercharge, identifies the neutral \(*\)-algebra and its native Hermitian split, and constructs the conditional rank-six positive exchange kernel without inventing statistics or \(B-L\).

## Companion documents

- [Corrected endomorphism inventory](73_furey_endomorphism_sector_inventory.md)
- [Sterile pairing channel](361_three_flavors_open_a_nonvanishing_sterile_pairing_channel_but_no_interaction_fixes_its_sign.md)
- [Sterile composite topology](360_no_existing_elementary_bminusl_two_singlet_but_the_sterile_symmetric_composite_has_u3_over_o3_topology.md)
- [Generation commutant no-go](192_generation_commutant_no_go_for_automatic_seesaw_alignment.md)
