# Result 32: the canonical middle-slot metric does not survive neutrino completion as the incidence selector

## Question

Result 29 found two plausible incidence rulers on the completed sixteen-state Furey carrier:

\[
(5,5,1,1,1,0)
\quad\hbox{and}\quad
(5,5,1,1,3,0).
\]

Could the folder's strongest basis-independent internal metric choose between them?

The candidate is the middle-slot Hilbert--Schmidt frame

\[
q_{\rm mid}(X)=
\sum_{A,B}\|A\widetilde X B+B\widetilde X A\|_{\rm HS}^2.
\]

On the earlier fifteen-state carrier this construction was important because it selected the same active signed-\(K_3\) module as the coordinate incidence calculation without choosing matrix units by hand.

## Completed calculation

Repeating the complete contraction after adding the unique right-handed-neutrino arrow gives the sector-scalar weights

\[
\boxed{(Q,u^c,d^c,L,e^c,\nu^c)=(14,14,8,2,6,12).}
\]

Every sector now has positive weight. In particular,

\[
\ker F_{\rm mid}^{(16)}=0,
\]

whereas both incidence conventions have kernel \(\nu^c\).

Therefore the canonical middle-slot metric selects neither the deduplicated nor the multiplicity-preserving completed incidence spectrum.

## Why completion changes the answer

Adding \(\nu^c\) does more than append a silent one-dimensional box. It closes a neutral ternary cycle with \(L\) and the Higgs-side blocks. Because the Hilbert--Schmidt frame sums every outer relation, the new arrow creates extra response paths for several old sectors and also responds strongly itself.

This is the algebraic analogue of adding a new strut to a bridge: the load carried by every connected beam can change. One cannot keep the old stiffness matrix and merely append a zero.

## Consequence

The following proposed shortcut fails:

> Use the canonical internal middle-slot frame to derive the completed incidence ALP ray.

The absorptive Standard-Model metric does not repair this: by Result 19 it is weighted by running Yukawa couplings and selects an energy-dependent, top-dominated broken direction rather than either integer incidence spectrum.

Thus two independently motivated metrics have now been tested:

| metric | outcome |
|---|---|
| absorptive Yukawa spectral measure | physical and scheme-clean, but top/threshold dominated rather than incidence-like |
| completed Furey middle-slot Hilbert--Schmidt frame | basis-independent internally, but has no sterile-neutrino kernel and matches neither incidence normalization |

The exact ALP charge ray remains underived. More sharply, any successful selector must explain why it retains the completed incidence kernel when the most direct full-frame contraction does not.

## Next bounded test

The remaining candidate in Result 31 is an action-derived source quadratic form. It must be calculated after neutrino completion, not inherited from the fifteen-state model.

**Go:** integrating out declared outer fields produces a positive quadratic form whose kernel is \(\nu^c\), whose nonzero sector ratios are regulator-independent and whose low-energy quotient maps to one ALP ray.

**No-go:** every such form either becomes full rank like \(F_{\rm mid}^{(16)}\) or depends on arbitrary source normalization. Then the robust algebraic prediction ends at the kernel of the separate incidence equations and the ALP pattern must remain a benchmark family.

## Reproduction

```powershell
node scripts\classify_completed_furey_middle_slot_frame.mjs
```

The script rebuilds all sixteen matrix-unit arrows and all outer-slot contractions, asserts the exact sector weights and asserts the empty kernel.
