# Standard-Model Anomaly Gate for Any Furey–Jordan Synthesis

**Date:** 16 October 2026  
**Branch:** B11 Standard-Model representation synthesis  
**Claim status:** one-generation baseline verified; candidate combined modules must be checked against it

## 1. Left-handed convention

Use only left-handed Weyl fields:

\[
Q_L,\quad u^c,\quad d^c,\quad L_L,\quad e^c.
\]

Their hypercharges are

\[
\frac16,\quad-\frac23,\quad\frac13,\quad-\frac12,\quad1.
\]

This convention prevents sign errors caused by mixing left- and right-handed anomaly formulas.

## 2. Local anomaly cancellation

For one generation:

\[
[SU(3)]^3:\qquad 2-1-1=0,
\]

\[
[SU(3)]^2U(1):\qquad
2\left(\frac16\right)-\frac23+\frac13=0,
\]

\[
[SU(2)]^2U(1):\qquad
3\left(\frac16\right)-\frac12=0,
\]

\[
\mathrm{grav}^2U(1):\qquad
6\left(\frac16\right)
+3\left(-\frac23\right)
+3\left(\frac13\right)
+2\left(-\frac12\right)+1=0,
\]

and

\[
U(1)^3:\qquad
6\left(\frac16\right)^3
+3\left(-\frac23\right)^3
+3\left(\frac13\right)^3
+2\left(-\frac12\right)^3+1=0.
\]

## 3. Global (SU(2)) anomaly

Counting color copies, one generation has

\[
3+1=4
\]

left-handed weak doublets. The number is even, so the Witten \(SU(2)\) anomaly cancels.

## 4. Why this is a hard gate

A Furey representation match is not enough. After every projector, conjugation rule, selector and boundary condition, the surviving **chiral** module must reproduce these cancellations.

The gate must be rerun if the combined theory adds:

- mirror fermions;
- selector-charged fermions;
- extra \(U(1)\) factors;
- boundary-localized chiral modes;
- incomplete top-quark representations;
- family-nonuniversal charges.

Anomaly inflow can cancel a boundary anomaly, but then the bulk topological term and its quantized coefficient must be explicit.

## 5. Interaction with the Furey encoding

The current eight-state \(Cl(6)\) table encodes color and electric-charge-like sectors, not the full pre-Higgs chiral module. It cannot yet be submitted to this anomaly gate.

The staged encoding must add weak chirality and hypercharge before any anomaly-cancellation claim is admissible.

## 6. Stop-everything and falsification tests

**Positive:** the complete Furey-selected chiral module cancels every local and global anomaly without manually adding compensating mirrors, and any boundary anomaly has forced inflow.

**Negative:** a required multiplet is missing, the top sector remains incomplete, or cancellation needs arbitrary spectator fermions.

## 7. Certificate

[`scripts/verify-sm-one-generation-anomalies.mjs`](scripts/verify-sm-one-generation-anomalies.mjs) uses integer hypercharge units to verify all displayed anomaly numerators and the even weak-doublet count.

## Companion documents

- [Standard-Model commutant gate](56_standard_model_commutant_gate.md)
- [Furey minimal ideal](60_furey_cl6_minimal_ideal_encoding.md)
- [Furey–Standard Model synthesis](05_furey_spin23_standard_model_synthesis.md)
