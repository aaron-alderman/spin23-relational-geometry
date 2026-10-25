# The Arf transform is the lightning route to the Baby-Monster seam

**Date:** 25 October 2026

**Status:** exact finite reconstruction map and conjugated \(K\) multiplier certified; its sixteen order-23-twined Monster background amplitudes remain source-gated

**Evidence:** [machine-readable Arf-transform ledger](../../../evidence/data/moonshine-arf-fourier-baby-monster-reconstruction-v1.json)

**Certificate:** [finite Fourier verifier](../../../verification/verify/verify_moonshine_arf_fourier_baby_monster_reconstruction.mjs)

## Result

The Baby-Monster genus-two vector need not be constructed only by sewing
\(VB^\natural\) directly. Fermionization gives an exact alternative starting
on the Monster rail.

For a genus-\(g\) bosonic theory with a non-anomalous \(\mathbb Z_2\)
symmetry, Lin and Shao write the fermionic partition functions as an
Arf-weighted finite Fourier transform of bosonic amplitudes with flat
\(\mathbb Z_2\) backgrounds. At genus two, choose an even reference spin
structure \(\rho\). For
\(S,t\in H^1(\Sigma_2,\mathbb F_2)\cong\mathbb F_2^4\),

\[
Z_F[S+\rho]
=\frac14\sum_t Z_M[t]\,
(-1)^{\operatorname{Arf}(t+\rho)+\operatorname{Arf}(\rho)+\langle t,S\rangle}.
\]

The coefficient matrix is a signed Walsh--Hadamard matrix \(A/4\). The
certificate checks exactly that

\[
AA^T=16I_{16}.
\]

The transform is invertible: no information is lost between the sixteen
\(2A\)-background amplitudes and the sixteen fermionic spin amplitudes.

## 1. Add the order-23 rail

Let \(z\in2A\) and let \(b\in23AB\) commute with it. The order-46 junction
provides precisely such a pair:

\[
b=h^2,\qquad z=h^{23},\qquad h\in46C\text{ or }46D.
\]

The Arf kernel depends only on the \(z\)-background and spin structure, so an
order-23 insertion is a spectator label:

\[
Z_{F,b}[S+\rho]
=\frac14\sum_t Z_{M,b}[t]\,
(-1)^{\operatorname{Arf}(t+\rho)+\operatorname{Arf}(\rho)+\langle t,S\rangle}.
\]

The exact cross-rail input is therefore a sixteen-component bosonic vector:
the genus-two Monster amplitude twined by \(b\), with every flat \(2A\)
background \(t\in\mathbb F_2^4\).

## 2. Extract the Baby-Monster factor

The fermionized theory factorizes pointwise on the shared spin structure:

\[
Z_{F,b}[\delta]
=Z_{\mathrm{free}}[\delta]\,Z_{VB,b}[\delta].
\]

The six odd-spin free-Majorana amplitudes vanish by the zero mode. The
transformed Monster vector must therefore obey six exact zero constraints.
On each of the ten even spin structures the free amplitude is nonzero, so

\[
\boxed{
Z_{VB,b}[\delta]
=\frac{Z_{F,b}[\delta]}{Z_{\mathrm{free}}[\delta]},
\qquad \delta\text{ even}.
}
\]

This reconstructs exactly the ten-component Baby-Monster vector required by
the relation-defect calculation.

## 3. The explicit defect word

Once the sixteen bosonic functions are supplied with compatible conventions,
apply \(K=S^2R^{-11}\) either before or after the Arf transform. The
[Arf-conjugation audit](arf-conjugated-baby-monster-k-multiplier.md)
shows that the multiplier itself is already fixed: the Baby factor is the
inverse free phase and the complete \(2A\) action is the pure \(3^3\,1\)
permutation.

    46C/D root h
       -> commuting pair (b=h^2 in 23AB, z=h^23 in 2A)
       -> 16 b-twined Monster amplitudes with flat z backgrounds
       -> invertible Arf/Fourier transform
       -> 16 fermionic spin amplitudes
       -> 6 odd-sector zero tests + 10 even sectors
       -> divide by known free Majorana
       -> Baby-Monster amplitude vector with fixed K multiplier

## 4. Remaining source object

The transform does not conjure the sixteen bosonic amplitudes from the five
genus-one centralizer traces. It converts the construction problem into one
native to the existing Monster/order-46 branch. The remaining source object
is either:

- direct twined Baby-Monster sewing data; or
- the sixteen genus-two Monster amplitudes with simultaneous order-23
  insertion and all flat \(2A\) backgrounds.

The second packet is tied to the certified \(46C/D\) pair and carries six
exact odd-spin null tests.

## Boundary

The finite Arf transform and conjugated multiplier are exact. The twined
Monster background vector is not yet constructed. Genus-one
McKay--Thompson series do not determine it.

## Sources and corpus links

- Lin and Shao, [*Duality Defect of the Monster CFT*](https://arxiv.org/abs/1911.00042)
- [Baby-Monster genus-two source gate](baby-monster-genus-two-source-gate.md)
- [Free-Majorana relation-defect multiplier](relation-defect-free-majorana-multiplier.md)
- [Arf-conjugated Baby-Monster \(K\) multiplier](arf-conjugated-baby-monster-k-multiplier.md)
- [Joined order-46 bridge](joined-bridge-map.md)
- [Order-46 observable ladder](order-46-observable-ladder.md)
