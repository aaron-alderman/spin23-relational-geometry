# \(\mathcal O(0)\) is the unique zero-index \(\mathbb{CP}^1\) spectator, but no single ordinary Dirac or real structure generates the flux split

**Date:** 20 October 2026

**Gate:** A6, uniqueness and origin test after the anomaly repair

**Status:** unique minimal line-bundle spectator derived; ordinary single-Dirac and canonical-real-structure origins ruled out

**Depends on:** [the local-parent anomaly kill test](1450_the_o3_twisted_cp1_operator_has_exactly_three_universal_chiral_zero_modes_but_its_minimal_local_six_dimensional_parent_is_anomalous.md) and [the flux-split spectator repair](1457_opposite_chirality_o0_spectators_cancel_the_o3_parent_anomalies_without_restoring_massless_mirrors.md)

**Evidence:** [machine-readable certificate](../../../evidence/data/spin23-a6-unique-zero-index-spectator-and-clifford-origin-no-go.json) and [executable verifier](../../../verification/verify/verify_spin23_a6_unique_zero_index_spectator_and_clifford_origin_no_go.mjs)

> **Subsequent sterile-pair boundary (document 1466).** The selected (mathcal O(3)) pair requires an (mathcal O(-6)) coefficient, whose regular holomorphic section space is zero. Any smooth nonzero repair necessarily carries a six-unit defect ledger and constitutes a new field/background sector; the (mathcal O(0)) spectator does not supply it. See [1466](1466_the_o3_sterile_triplet_has_no_holomorphic_majorana_coefficient_and_any_smooth_o_minus6_repair_is_a_new_defect_sector.md).

## Result

Within ordinary holomorphic line-bundle compactifications on \(\mathbb{CP}^1\), the spectator used in document 1457 is unique. Every holomorphic line bundle is \(\mathcal O(n)\), and

\[
 \operatorname{index}D_{\mathcal O(n)}=n.
\]

Requiring the anomaly-cancelling opposite-six-dimensional-chirality spectator to contribute no net four-dimensional chirality forces \(n=0\). Since

\[
 \operatorname{Pic}^0(\mathbb{CP}^1)=0,
\]

the only such holomorphic line is \(\mathcal O(0)\). On the round sphere its Dirac operator has no kernel, so it supplies no accidental vectorlike zero-mode pair either.

This uniqueness does not produce the spectator from the selected \(\mathcal O(3)\) field. In fact two natural attempts fail exactly:

1. the two twists cannot be the chiral halves of one ordinary Clifford-compatible Dirac bundle;
2. the canonical charge-conjugation real structure sends \(\mathcal O(3)\) to \(\mathcal O(-3)\), not to \(\mathcal O(0)\).

Therefore the repair requires an independent spectator Weyl complex, a boundary/defect construction, or a genuinely enlarged superconnection. It is the unique minimal repair in its class, but its existence is still new matter data rather than a consequence of the current \(Spin(2,3)\) action.

## 1. Uniqueness of the zero-index spectator

The Picard group is

\[
 \operatorname{Pic}(\mathbb{CP}^1)\cong\mathbb Z,
 \qquad [L]=[\mathcal O(n)].
\]

For the chosen spin structure,

\[
 S^+=\mathcal O(-1),
 \qquad S^-=\mathcal O(1),
\]

and the twisted Dirac index is

\[
 \dim\ker D_+-\dim\ker D_-=n.
\]

An opposite-chirality spectator cancels the six-dimensional representation anomaly independently of \(n\), but avoiding a net mirror index requires

\[
 n=0.
\]

There is no nontrivial flat holomorphic line hidden at degree zero because the genus is zero. Thus

\[
 \boxed{L_{\rm spectator}=\mathcal O(0)}
\]

is unique in the line-bundle class.

The round-sphere spectrum is

\[
 \lambda_{\ell,\pm}=\pm\frac{\ell+1}{R},
 \qquad d_\ell=2(\ell+1),
 \qquad \ell\ge0.
\]

Its first mass is \(1/R\) and there is no zero mode. This is stronger than zero index alone, which on a general geometry would permit paired zero modes.

## 2. Single-Dirac origin no-go

An ordinary Dirac-type operator has principal symbol

\[
 \sigma_D(\xi)=i\,c(\xi).
\]

For a twist \(E\), Clifford multiplication maps

\[
 c(\xi):S^+\otimes E\longrightarrow S^-\otimes E.
\]

If the two chiral halves are instead assigned twists \(E_+\) and \(E_-\), ellipticity requires the symbol to be a bundle isomorphism for every nonzero \(\xi\). After removing the spin factor, this requires

\[
 E_+\cong E_-.
\]

But

\[
 c_1(\mathcal O(3))=3,
 \qquad c_1(\mathcal O(0))=0,
\]

so no such isomorphism exists.

The same obstruction appears if one tries to write a chirality-projected connection on one full spinor bundle,

\[
 \nabla'=\nabla^{\rm spin}+A_F P_+.
\]

Since \(P_+c(\xi)=c(\xi)P_-\),

\[
 [A_FP_+,c(\xi)]
 =A_Fc(\xi)(P_--P_+),
\]

which is generically nonzero. The connection is not an ordinary Clifford connection. The flux split therefore cannot be hidden inside a conventional Dirac operator by multiplying the connection by chirality.

This no-go does not invalidate document 1457. That construction uses two independent Weyl complexes:

\[
 D^+_{\mathcal O(3)}
 \quad\text{and}\quad
 D^-_{\mathcal O(0)},
\]

each of which is separately a valid twisted chiral Dirac operator.

## 3. Canonical real-structure no-go

Charge conjugation sends a complex line to its conjugate dual:

\[
 J:\mathcal O(n)\longmapsto\mathcal O(-n).
\]

Consequently

\[
 J\mathcal O(3)=\mathcal O(-3)\ne\mathcal O(0).
\]

The Nambu/CAR real structure supplies the antiparticle block of the selected field, not the anomaly-cancelling spectator. Treating \(\mathcal O(0)\) as the real partner would be a bundle-degree error.

Thus neither the ordinary Dirac symbol nor the already-declared real structure derives the new matter sector.

## 4. Mixing does not destroy the net three

The combined Fredholm index is

\[
 \operatorname{index}D_{\rm total}=3+0=3.
\]

Any smooth mixing that preserves ellipticity and the asymptotic bundle class leaves this index unchanged. It may move or pair individual modes, but it cannot remove the net three chiral modes without a change of Fredholm class, a singularity or an opposite index.

In the holomorphic category, a direct mixing from the selected line to the spectator would be a section of

\[
 \operatorname{Hom}(\mathcal O(3),\mathcal O(0))
 =\mathcal O(-3),
\]

and

\[
 H^0(\mathbb{CP}^1,\mathcal O(-3))=0.
\]

So holomorphic mixing in that direction is absent automatically. More general smooth or nonholomorphic couplings require additional coefficient fields, but the net index remains protected.

## 5. Path back to \(Spin(2,3)\)

The programme now has the chain

\[
 Spin_0(2,3)
 \to \text{selected projector orbit}
 \to \mathbb{CP}^1
 \to \mathcal O(3)
 \to \operatorname{index}3,
\]

plus a unique minimal anomaly-cancelling line spectator

\[
 \mathcal O(0)_-.
\]

What the chain does not contain is an operation that creates an independent opposite-chirality Standard Model carrier and assigns it degree zero. The shortest remaining A6 bridge is therefore no longer ambiguous:

> Construct a \(Spin(2,3)\)-compatible boundary module, spectral triple or superconnection whose field content contains the independent \(\mathcal O(0)_-\) Weyl complex, whose selected complex carries \(\mathcal O(3)_+\), and whose anomaly and index reduce to documents 1457--1458.

Failure to construct that module leaves the repair as a consistent ultraviolet completion choice rather than an emergent prediction.

## 6. Exhaustion verdict for this subbranch

\[
\boxed{
\begin{array}{ll}
\text{zero-index line spectator:}&\textbf{uniquely }\mathcal O(0),\\
\text{massless mirror kernel:}&\textbf{absent on the round sphere},\\
\text{single ordinary Dirac origin:}&\textbf{ruled out},\\
\text{canonical real-structure origin:}&\textbf{ruled out},\\
\text{independent boundary/matter origin:}&\textbf{external construction required}.
\end{array}}
\]

Within ordinary line-bundle and Clifford geometry, this branch is exhausted.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_a6_unique_zero_index_spectator_and_clifford_origin_no_go.mjs
~~~
