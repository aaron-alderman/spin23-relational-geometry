# Majorana Matter Parity Cannot Replace the \(B-L\) Current in the Relational Carrier

**Date:** 17 October 2026  
**Branches:** B03, B04, B05, B07, B08, B11 and the Majorana/relational-carrier branch  
**Claim status:** exact residual-charge and category audit; broken-phase enlarged response remains open  
**Certificate:** [test_majorana_remnant_cannot_replace_bl_current.mjs](scripts/test_majorana_remnant_cannot_replace_bl_current.mjs)

## Executive result

A right-handed-neutrino Majorana operator has

\[
3(B-L)[\nu^c\nu^c]=6.
\]

It breaks continuous \(B-L\) to a finite remnant. The independent low-energy matter parity assigns the same odd class to all six matter sectors:

\[
P_M=(1,1,1,1,1,1)\pmod2.
\]

This finite label cannot replace \(J_{B-L}^\mu\) in the relational current carrier. A finite group has zero-dimensional Lie algebra and no associated local Noether-current direction.

Therefore:

\[
\boxed{
\text{Majorana breaking removes the Ward restriction by removing the current,}
\text{ not by restoring full }Sp(4,\mathbb R)\text{ symmetry.}
}
\]

## 1. The tempting but invalid parity Gram

Treating the parity classes as ordinary real numbers would give

\[
G_{\Lambda,P}
=\begin{pmatrix}
231&51\\
51&16
\end{pmatrix},
\qquad
\det G_{\Lambda,P}=1095>0.
\]

Algebraically this is a positive two-vector Gram. Physically it is not a current covariance:

- the entries \(0,1\) are representatives of classes modulo two;
- changing a representative changes the real Gram while preserving parity;
- there is no infinitesimal parity charge;
- no local source couples to a \(\mathbb Z_2\) Noether current;
- Ward-normalized current spectral functions are unavailable.

This is a useful explicit example of a mathematically positive matrix that fails operator typing.

## 2. What survives after breaking

The finite remnant still constrains:

- allowed local operators;
- decay and mixing selection rules;
- line and defect operators;
- possible topological sectors;
- stability of the lightest parity-odd state in suitable extensions.

It does not supply the continuous response coordinate previously represented by \(J_{B-L}^\mu\).

The residual group can act discretely on a carrier already constructed by other means. It cannot generate the missing continuous source wing.

## 3. Correct broken-phase completion

Below the Majorana scale, the current equation contains the breaking operator schematically as

\[
\partial_\mu J_{B-L}^\mu
\propto
6M_R\nu^c\nu^c+\text{h.c.}
\]

If \(B-L\) was global and spontaneously broken, the order-parameter phase or Majoron channel participates. If it was gauged, the longitudinal massive vector and Higgs sector participate. Explicit breaking likewise introduces its spurion.

The correct response space is therefore enlarged to include some combination of:

\[
J_{B-L}^\mu,
\qquad
\arg\Phi_{B-L},
\qquad
|\Phi_{B-L}|,
\qquad
\nu^c\nu^c.
\]

It is not obtained by substituting a parity bit into the old two-current matrix.

## 4. Consequence for the symmetry ladder

Above the breaking scale:

\[
(J_\Lambda,J_{B-L})
\]

defines the relational source pair, with the Ward and UV reductions already classified.

Below the scale:

- the old second source is nonconserved;
- the four-dimensional Ward-compatible algebra no longer applies;
- the full \(Sp(4,\mathbb R)\) is not thereby restored;
- the two-source truncation is generally not closed;
- a new TKK analysis must begin only after the enlarged broken-phase response is typed.

## 5. Stop-everything criteria

Stop replacing \(B-L\) by matter parity if:

1. a modulo-two class is inserted as an ordinary real charge;
2. a finite symmetry is assigned a local Noether current;
3. the longitudinal or order-parameter response is omitted;
4. disappearance of a Ward identity is called symmetry enhancement;
5. the two-source carrier is kept after its second source ceases to define a closed spectral sector.

## 6. Pinned branch

The low-energy Majorana relational carrier is pinned pending a concrete breaking model specifying:

- global versus gauged \(B-L\);
- spontaneous versus explicit breaking;
- the order-parameter field and charge;
- the longitudinal spectral Ward identity;
- which two- or higher-dimensional source subspace is dynamically closed.

The ultraviolet relational carrier remains valid in the regime where continuous \(B-L\) is a meaningful probe.

## Revisit after the connection classification

The projected two-source stabilizer can nevertheless be classified conditionally after removing the continuous Ward row while retaining one fixed positive UV slope. It is

\[
\mathfrak{so}(2)\ltimes Sym_2(\mathbb R)_{\rm contact}
\cong
\mathbb R\oplus\mathfrak e(2),
\]

not full \(\mathfrak{sp}(4,\mathbb R)\). Fixed contacts leave only one compact source rotation, and two generic fixed UV tensors remove that rotation. This does not unpin the physical branch because the projected two-source response is still not demonstrably closed. See [the Majorana-broken fixed-UV classification](678_majorana_breaking_removes_the_ward_restriction_but_does_not_restore_full_sp4.md).

## Reproducibility

```powershell
node scripts\test_majorana_remnant_cannot_replace_bl_current.mjs
```
