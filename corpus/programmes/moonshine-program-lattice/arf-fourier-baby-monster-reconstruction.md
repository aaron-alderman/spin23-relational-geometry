# The Arf transform is the lightning route to the Baby-Monster seam

**Date:** 25 October 2026

**Status:** exact finite reconstruction map certified; its sixteen order-23-twined Monster background amplitudes remain source-gated

**Evidence:** [machine-readable Arf-transform ledger](../../../evidence/data/moonshine-arf-fourier-baby-monster-reconstruction-v1.json)

**Certificate:** [finite Fourier verifier](../../../verification/verify/verify_moonshine_arf_fourier_baby_monster_reconstruction.mjs)

## Result

The Baby-Monster genus-two vector does not have to be constructed only by
sewing (VB^\natural) directly. Fermionization gives an exact alternative
that starts on the Monster rail.

For a genus-(g) bosonic theory with a non-anomalous (\mathbb Z_2)
symmetry, Lin and Shao write the fermionic partition functions as an
Arf-weighted finite Fourier transform of bosonic amplitudes with flat
(\mathbb Z_2) backgrounds. At genus two, choose an even reference spin
structure (\rho). For (S,t\in H^1(\Sigma_2,\mathbb F_2)\cong\mathbb F_2^4),

\[
Z_F[S+\rho]
=\frac14\sum_t Z_M[t]
(-1)^{\operatorname{Arf}(t+\rho)+\operatorname{Arf}(\rho)+\langle t,S\rangle}.
\]

The coefficient matrix is a signed Walsh--Hadamard matrix (A/4). The
certificate checks exactly that

\[
AA^T=16I_{16}.
\]

The transform is therefore invertible: no information is lost between the
sixteen (2A)-background amplitudes and the sixteen fermionic spin
amplitudes.

## 1. Add the order-23 rail

Let (z\in2A) and let (b\in23AB\) commute with it. The order-46 junction
provides precisely such a pair:

\[
b=h^2,\qquad z=h^{23},\qquad h\in46C\text{ or }46D.
\]

Because the Arf kernel depends only on the (z)-background and spin
structure, an order-23 insertion may be carried as a spectator label:

\[
Z_{F,b}[S+\rho]
=\frac14\sum_t Z_{M,b}[t]
(-1)^{\operatorname{Arf}(t+\rho)+\operatorname{Arf}(\rho)+\langle t,S\rangle}.
\]

Thus the exact cross-rail input is a sixteen-component bosonic vector:
the genus-two Monster amplitude twined by (b), with every flat (2A)
background (t\in\mathbb F_2^4).

## 2. Extract the Baby-Monster factor

The fermionized theory factorizes pointwise on the shared spin structure:

\[
Z_{F,b}[\delta]
=Z_{\mathrm{free}}[\delta]\,Z_{VB,b}[\delta].
\]

The six odd-spin free-Majorana amplitudes vanish by the zero mode. Therefore
the transformed Monster vector must obey six exact zero constraints. On each
of the ten even spin structures the free amplitude is nonzero, so

\[
\boxed{
Z_{VB,b}[\delta]
=\frac{Z_{F,b}[\delta]}{Z_{\mathrm{free}}[\delta]},
\qquad \delta\text{ even}.
}
\]

This reconstructs exactly the ten-component Baby-Monster vector required by
the relation-defect calculation. It also supplies six null tests before any
division is attempted.

## 3. Relation to the explicit defect word

The mapping class acts on both sides of the finite transform. Once the
sixteen bosonic functions are supplied with compatible multiplier
conventions, apply the explicit word

\[
K=S^2R^{-11}
\]

either before or after the Arf transform. The resulting ten even-sector
Baby action can then be multiplied edgewise by the already-certified free
action. Its invariant comparison data are the three closed-cycle holonomies
and the fixed odd--odd eigenvalue.

This route joins rather than juxtaposes the rails:

```text
46C/D root h
   -> commuting pair (b=h^2 in 23AB, z=h^23 in 2A)
   -> 16 b-twined Monster amplitudes with flat z backgrounds
   -> invertible Arf/Fourier transform
   -> 16 fermionic spin amplitudes
   -> 6 odd-sector zero tests + 10 even sectors
   -> divide by known free Majorana
   -> Baby-Monster K operator
   -> combine with the certified free K operator
```

## 4. What is and is not reduced

The transform does not conjure the sixteen bosonic amplitudes from the five
genus-one centralizer traces. It changes the construction problem into one
that is native to the existing Monster/order-46 branch. The remaining source
object is now one of two equivalent packets:

- direct: twined Baby-Monster sewing data;
- reconstructed: the sixteen genus-two Monster amplitudes with simultaneous
  order-23 insertion and all flat (2A) backgrounds.

The second packet has two advantages: it is tied to the certified (46C/D)
commuting pair, and it carries six exact odd-spin null tests.

## Boundary

The finite Arf transform is exact. The twined Monster background vector is
not yet constructed. Genus-one McKay--Thompson series do not determine it,
and a formal invertible transform is not evidence that the resulting seam is
realized physically.

## Sources and corpus links

- Lin and Shao, [*Duality Defect of the Monster CFT*](https://arxiv.org/abs/1911.00042), especially the genus-(g) fermionization formula
- [Baby-Monster genus-two source gate](baby-monster-genus-two-source-gate.md)
- [Free-Majorana relation-defect multiplier](relation-defect-free-majorana-multiplier.md)
- [Joined order-46 bridge](joined-bridge-map.md)
- [Order-46 observable ladder](order-46-observable-ladder.md)
