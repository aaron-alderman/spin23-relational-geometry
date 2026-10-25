# The free-Majorana relation-defect operator is fixed

**Date:** 25 October 2026

**Status:** complete for the reduced free-Majorana characteristic action and eta normalization; fermionic Baby-Monster factor remains source-gated

**Evidence:** [machine-readable multiplier ledger](../../../evidence/data/moonshine-relation-defect-free-majorana-multiplier-v1.json)

**Certificate:** [word-composition verifier](../../../verification/verify/verify_moonshine_relation_defect_free_majorana_multiplier.mjs)

## Result

The corpus's existing first-handle \(T_1/S_1\) phase rules are sufficient to
compute the free-Majorana part of the relation-defect operator. The explicit
integral lift has the word

\[
R=S\,T^{-5}S\,T^{-3}S\,T^{-2}S^3T^4,
\]

and

\[
K=S^2R^{-11}.
\]

Composing the certified reduced theta-characteristic actions gives the
following result on each of the three 3-cycles:

\[
\text{edge exponents }(3,6,1)\pmod8,
\qquad
\text{cycle product } \zeta_8^{10}=\zeta_8^2=i.
\]

The fixed odd--odd characteristic has reduced eigenphase
\(\zeta_8^2=i\) as well.

The common Dedekind eta multiplier contributes
\(v_\eta(K)=i=\zeta_8^2\) to every sector. With that normalization, each
3-cycle has total product

\[
i\cdot i^3=1,
\]

while the fixed odd--odd sector has eigenvalue

\[
i\cdot i=-1.
\]

Thus the eta-normalized free-Majorana operator has the exact spectral form

\[
\boxed{
\rho_{\mathrm{free}}(K):
\quad 3\text{ cycles with product }1,
\quad 1\text{ fixed sector with eigenvalue }-1.
}
\]

Its determinant on the ten even-characteristic sectors is \(-1\).

## 1. Exact monomial action

Using the characteristic ordering in the seam-permutation audit, the reduced
action is

| source | target | exponent of \(\zeta_8\) |
|---|---|---:|
| \(00\mid00\) | \(00\mid10\) | 3 |
| \(00\mid10\) | \(10\mid00\) | 6 |
| \(10\mid00\) | \(00\mid00\) | 1 |
| \(00\mid01\) | \(00\mid11\) | 3 |
| \(00\mid11\) | \(10\mid01\) | 6 |
| \(10\mid01\) | \(00\mid01\) | 1 |
| \(01\mid00\) | \(01\mid10\) | 3 |
| \(01\mid10\) | \(11\mid00\) | 6 |
| \(11\mid00\) | \(01\mid00\) | 1 |
| \(11\mid11\) | \(11\mid11\) | 2 |

Adding the common eta exponent \(2\) produces normalized edge exponents
\((5,0,3)\) on each 3-cycle and exponent \(4\) on the fixed sector.

This is invariantly summarized by the closed-cycle products and fixed-sector
eigenvalue; diagonal rephasings of individual sectors cannot change them.

## 2. Why this is more than the permutation

The bare permutation has sign \(+1\), so the determinant quotient misses
\(K\). The reduced phase matrix also has determinant \(+1\): its total
exponent is zero modulo eight. The eta normalization changes the ten-sector
determinant to

\[
i^{10}=-1.
\]

The lost sign is therefore restored only after retaining the metaplectic
anomaly line. This is a literal example of the corpus's admissibility rule:
the label permutation and phase extension are separately insufficient, while
their joined operator has a new invariant.

## 3. The remaining Monster gate

The \(2A\) fermionization splits into a free Majorana--Weyl factor and a
fermionic Baby-Monster factor. This calculation completes only the free
factor. Let the unknown Baby-Monster action on the same cycles be
\(\rho_{\mathrm{Baby}}(K)\). The complete \(2A\) seam requires

\[
\rho_{2A}(K)
=\rho_{\mathrm{free}}(K)\otimes\rho_{\mathrm{Baby}}(K)
\]

with compatible anomaly trivialization and separating degeneration.

The next source object is therefore sharply specified: genus-two fermionic
Baby-Monster spin-sector amplitudes, or an equivalent sewn defect module,
evaluated on \(K\). More manipulation of the free theta characteristics
cannot supply it.

## Boundary

The result is exact for the reduced free-Majorana \(T_1/S_1\) conventions and
the declared eta normalization. It is not yet the full Monster \(2A\)
multiplier, a \(2B\) Leech-seam result, or a physical detector prediction.

## Sources and corpus links

- Tuite and Zuevsky, [*Genus Two Partition and Correlation Functions for Fermionic Vertex Operator Superalgebras I*](https://arxiv.org/abs/1007.5203)
- Tuite and Zuevsky, [Part II](https://arxiv.org/abs/1308.2441)
- Lin and Shao, [*Duality Defect of the Monster CFT*](https://arxiv.org/abs/1911.00042)
- [Existing \(T_1/S_1\) boundary](../lattice-subroutine-gravity/metaplectic-t1-s1-boundary.md)
- [Relation-defect seam permutation](relation-defect-seam-permutation.md)
- [Dedekind eta relation phase](dedekind-eta-relation-phase.md)
