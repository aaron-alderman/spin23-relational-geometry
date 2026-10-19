# The Hermitian Furey Selector Is a Two-Topology Correspondence

**Date:** 17 October 2026  
**Branches:** B03, B08 and B11  
**Claim status:** exact typing theorem; physical realization of the paired faces remains open  
**Certificate:** [classify_furey_exchange_as_two_topology_correspondence.mjs](scripts/classify_furey_exchange_as_two_topology_correspondence.mjs)

## Result

The linear neutral exchange

\[
S:T_A\longrightarrow T_B
\]

is an exact unitary equivalence between the two surviving fifteen-dimensional matter TROs, but it is not an internal automorphism of either TRO.

The two spaces share

\[
T_A\cap T_B=Q\oplus u^c,
\qquad \dim_{\mathbb C}(T_A\cap T_B)=9.
\]

Their \(d^c,L,e^c\) sectors occupy different neutral block incidences, contributing six distinct dimensions on each side. Hence

\[
\dim_{\mathbb C}(T_A+T_B)=15+15-9=21.
\]

The certificate verifies

\[
S(T_A)=T_B,
\qquad
S(T_A)\ne T_A.
\]

## Correct categorical interpretation

The Hermitian law

\[
R_x^{\rm H}(z)=xS(x)^\dagger z+zS(x)^\dagger x
\]

is therefore a cross-topology pairing. It belongs naturally to the language of correspondences, paired boundary faces, bimodules or two-vacuum comparison—not to the internal Jordan triple product of one chosen TRO.

This recovers the originating \(A,X,B\) intuition in a precise form:

\[
\boxed{
\text{one state in }T_A
\quad\text{is compared through }S\text{ with its relational partner in }T_B.
}
\]

The response may take values in the common ambient linking algebra even though its middle partner lies in the exchanged TRO.

## What the source already supplies

The abstract linking-algebra classification proves that \(T_A\) and \(T_B\) have identical factorization and are conjugate under \(O_1\leftrightarrow R\). It also proves that the relational roles \(D\) and \(E\) are intrinsic while their absolute assignments to the nested-origin labels \(O_1,R\) are not fixed by TRO incidence.

Thus the source retained by the completed module supplies an exact equivalence class of two faces. It does not yet say that both faces are simultaneous physical sectors.

## Physical alternatives

At least four interpretations remain open:

1. \(T_A,T_B\) are two boundary faces of one response problem;
2. they are two vacua or domains connected by an interface operator;
3. their exchange is a redundancy, so only exchange-invariant observables are physical;
4. one topology is physical and the other only supplies an auxiliary conjugate used in a positive kernel.

Each interpretation changes the required action, Hilbert space and locality conditions. They cannot be conflated.

## Stop-everything criterion

If the physical theory selects one topology with no paired face, auxiliary conjugate or exchange redundancy, then \(S\) is unavailable as an observable internal operation and the Hermitian selector loses its physical foundation. Its algebraic zero-locus theorem would remain valid only in the ambient two-topology correspondence.

## Highest-value next gate

Construct a positive two-face kernel on \(T_A\oplus T_B\) and determine whether exchange-fixed observables reduce to the already established \(H_2(\mathbb R)\) carrier without doubling propagating chiral matter. This is the most direct bridge from the present correspondence to \(Sp(4,\mathbb R)\cong Spin_0(2,3)\).

## Revisit after the completely positive exchange construction

Conjugate-sector doubling now supplies an exact random-unitary exchange twirl whose action on paired block-diagonal observables is the real-slice projection. This resolves the complete-positivity obstruction that afflicts direct transpose averaging on one complex sector.

It does not close the physical gate: the full exchange-fixed doubled algebra contains off-diagonal topology coherences. Exact reduction to the desired carrier still requires the Furey action, vacuum or operator typing to superselect the paired block-diagonal sector without creating propagating mirrors. See [the doubled exchange selector](687_doubling_the_conjugate_topologies_turns_the_real_slice_selector_into_a_cp_exchange_twirl.md).

## Reproducibility

```powershell
node scripts/classify_furey_exchange_as_two_topology_correspondence.mjs
```
