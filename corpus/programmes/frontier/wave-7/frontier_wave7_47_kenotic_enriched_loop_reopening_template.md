# Frontier Wave 7.47: Minimal Enriched Loop Reopening Template

**Date:** 24 October 2026  
**Status:** exact conditional toy model; proposed enrichment, not a Claimipedia extraction  
**Ledger:** [enriched loop toy v1](claimipedia_kenotic_enriched_loop_toy_v1.json)  
**Certificate:** [enriched loop verifier](../../../../verification/verify/verify_claimipedia_kenotic_enriched_loop_toy.mjs)

## Result

The natural three-branch cover has already closed negatively: all of its
overlaps are the same junction, its nerve is a filled triangle and scalar data
glue. This note asks the next legitimate question without pretending the new
data have been found: **what is the smallest exact object that would reopen the
branch?**

Take three patches with three distinct pairwise overlaps and no triple
overlap. Their nerve is the boundary of a triangle. Put a real line on each
patch and a transition sign \(g_{ij}\in\{+1,-1\}\) on each overlap. Local
sections obey

\[
s_2=g_{12}s_1,\qquad s_3=g_{23}s_2,\qquad s_1=g_{31}s_3.
\]

A nonzero global section exists exactly when

\[
h=g_{31}g_{23}g_{12}=+1.
\]

The product \(h\) is unchanged if the sign convention on any local patch is
reversed. It is therefore the first gauge-invariant residue available to this
minimal enrichment.

## Two controls

For the untwisted control \((g_{12},g_{23},g_{31})=(+1,+1,+1)\), the transition
matrix has rank two. Over \(\mathbb Q\), \(H^0\) and \(H^1\) are both
one-dimensional. A normalized marker has two global choices, related by an
overall sign.

For the twisted control \((+1,+1,-1)\), the transition matrix has full rank
three. A marker transported around the loop returns reversed, and no nonzero
global section exists.

There is an important typing correction. With rational **vector-space**
coefficients the twisted local system has

\[
H^0=0,\qquad H^1=0.
\]

The obstruction is not a nonzero rational \(H^1\) class. It is the holonomy
sign, or equivalently the nontrivial principal \(\mathbb Z_2\) line-bundle
class in \(H^1(S^1;\mathbb Z_2)\). “No global nonzero section,” “nonzero
cohomology” and “nontrivial holonomy” are related ideas, but they are not
interchangeable statements.

## Why this is the minimum

The construction adds exactly what the fixed graph lacked:

1. three genuinely distinct overlap carriers;
2. no common triple intersection filling the loop;
3. an authored transition on every overlap;
4. a gauge-invariant ordered product; and
5. a readout: compare a transported marker with its prepared orientation.

Remove the distinct overlaps and the loop collapses. Remove the transitions
and there is nothing to multiply. Restore a common triple overlap without a
compatible higher coherence law and the model is underspecified. Remove the
return comparison and the sign has no detector.

## What Claimipedia would have to supply

The current graph does not instantiate this model. Promotion requires three
evidence-bearing records that each join a different pair of sectors without
all three reducing to the same kenosis node. Each pair must also carry an
authored comparison rule whose sign or orientation has operational meaning.
Only then may the loop product be calculated from the corpus rather than
chosen for a toy.

The decision rule is finite:

- if every evidence-backed loop has \(h=+1\), the sign-twist branch closes for
  those loops;
- if a loop has \(h=-1\), repeat under patch-sign changes and alternative
  refinements;
- promote the result only if the return sign is invariant under those changes
  and the overlaps retain independent provenance.

## Physical analogue

A laboratory version would use three local frames or modes connected by
pairwise transfer stages. Prepare an oriented marker, transport it around the
three stages and compare it with the initial marker. A reversal-odd return is
useful only after dynamical phase, cable order, detector parity, calibration
conventions and ordinary hysteresis have been modeled or reversed.

This is a detector design pattern, not a prediction. Its ordinary engineering
return is a calibrated loop-consistency test. Its new-physics return would be
a robust residual that no admitted transfer model can reproduce.

## Boundary

This construction demonstrates sufficiency, not presence. It does not derive
new Claimipedia edges, identify God with a topological class, or establish a
physical carrier. The natural adjacency cover remains a filled-simplex no-go.
Wave 7.47 merely turns its reopening condition into an executable object.

The [physical-detector bridge](frontier_wave7_48_sign_holonomy_physical_detector_bridge.md)
shows that the science programme already contains an exact central-return
analogue and a compatible detector packet. That map does not supply the
knowledge graph's missing overlaps.
