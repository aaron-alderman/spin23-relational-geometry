# D-02 continuation: the Schur normal cone

## Result

The rank-changing obstruction can be repaired at the level of the limiting effective response, but not by assigning one value directly to the original singular point. The correct bounded object is a blow-up of the singular locus carrying approach order, normal direction and leading interior/coupling symbols.

Call this decorated boundary object the **Schur normal cone**.

## One-parameter valuation law

Suppose on a finite crossing sector

\[
D_s(z)=s^m\bigl(D_m(z)+O(s)\bigr),
\qquad
B_s=s^n\bigl(B_n+O(s)\bigr),
\]

where `D_m(z)` is invertible and Herglotz on the crossing sector. Then

\[
B_sD_s^{-1}B_s^T
=s^{2n-m}\left(B_nD_m^{-1}B_n^T+O(s)\right).
\]

This gives an exact trichotomy:

| `2n-m` | Result | Handler |
|---:|---|---|
| positive | correction vanishes | descend to the base limit |
| zero | finite correction survives | attach a residue-decorated limit |
| negative | correction diverges | retain the crossing mode or refuse elimination |

For the critical case, the residue is invariant under regular reparameterizations and orthogonal/unitary crossing-frame changes when all leading data are transported.

## Why valuation alone is insufficient in several parameters

Let

\[
D_{x,y}(z)=(x^2+y^2)z,
\qquad
B_{x,y}=xb.
\]

Along `(x,y)=r(cos θ,sin θ)`,

\[
BD^{-1}B^T
=\frac{b^2\cos^2\theta}{z}.
\]

Every direction has the same radial order, but different directions produce different limits. Therefore the singular point must be replaced by its projective normal directions. The boundary symbol consists of:

- the normal direction;
- vanishing orders;
- the leading homogeneous interior pencil;
- the leading homogeneous coupling;
- support-frame and domain decorations.

The effective response descends back to a single value at the original singular point exactly when the resulting boundary correction is direction-independent.

## Groupoid structure

The useful groupoid has:

- regular-support objects;
- blown-up crossing objects carrying the boundary symbol;
- frame-change morphisms;
- regular reparameterization morphisms;
- overlap and normal-direction transition morphisms.

The Schur operation becomes a partial functor with three codomain forms:

```text
regular response
residue-decorated boundary response
retain/refuse receipt
```

This is enough to resolve the value-level ambiguity in the bounded leading-order class. It does not compress the entire analytic germ into finite metadata: higher output coefficients require higher input jets.

## Holonomy result

A crossing eigenline may return with a sign after a loop. The local coupling then changes sign, while its quadratic residue does not. Consequently:

- the passive carrier can descend through sign holonomy;
- oriented eigenvector, grading or index data do not automatically descend;
- those data remain a local-system decoration.

This explains in one calculation why the common response can be globally well-defined while a wall orientation or index still cannot be inferred from it.

## Updated disposition

- **Direct value at the unblown singular point:** no-go unless the boundary correction is direction-independent.
- **Schur normal-cone value:** retained for finite-dimensional leading-order crossings.
- **Full analytic-germ gluing from fixed finite metadata:** no-go across unbounded order classes.
- **Groupoid/measure-valued global law:** partially reopened; its bounded normal-cone skeleton now exists.
- **Physical decorations:** transported only when their transition law is included explicitly.

The next discriminant is the non-diagonal, unequal-order crossing. The question is whether an invariant filtration (rather than a chosen diagonal basis) supplies the normal symbol and whether its Schur residue remains independent of the chosen local reduction.

