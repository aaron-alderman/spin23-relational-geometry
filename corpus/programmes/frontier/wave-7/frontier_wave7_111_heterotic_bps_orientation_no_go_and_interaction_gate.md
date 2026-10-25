# Frontier Wave 7.111: The Heterotic Carrier Is Physical, but Its BPS Index Still Forgets 23A/23B Orientation

**Date:** 25 October 2026

**Status:** exact physical carrier dictionary and generator-change theorem; all multiplicity/index orientation tests ruled out; BPS interaction or defect-junction amplitude remains open

**Evidence:** [heterotic orientation record](../../../../evidence/data/heterotic-monster-bps-orientation-gate-v1.json)

**Certificate:** [heterotic orientation verifier](../../../../verification/verify/verify_heterotic_monster_bps_orientation_gate.mjs)

## Result

The Monstrous CHL construction supplies the physical carrier missing from the
bare Monster Lie algebra:

\[
(n,m)=\text{winding and momentum grades},
\qquad
\kappa((n,m),(n',m'))=\frac{nm'+n'm}{N}.
\]

At \(N=23\), changing the marked generator from \(g\) to \(g^a\) transforms
the Fourier-resolved twisted-sector characters by

\[
F^{g^a}_{l,k}=F^g_{al,a^{-1}k}.
\]

For the fifth-power exchange between the two Monster order-23 classes,
\(a=5\) and \(5^{-1}=14\pmod {23}\).  Therefore the physical charge-label
transformation is

\[
D_5(l,k)=(5l,14k)\pmod {23}.
\]

This is exactly the finite orientation operation already derived in the
Moonshine lane.  It is no longer an unexplained arithmetic coincidence: it
is the relabelling induced on the CHL model's twist/winding and
charge/momentum residues when the cyclic generator is changed.

The same calculation closes a tempting shortcut.  Since

\[
(5l)(14k)\equiv lk\pmod {23},
\]

the discriminant quadratic form, BPS root norm, root multiplicity and every
character depending only on \(lk\) are unchanged.  Consequently neither the
full supersymmetric index nor a charge-resolved **multiplicity** measurement
can distinguish \(23A\) from \(23B\).  The next observable must probe
composition: a BPS three-point/OPE coefficient, cross-grade intertwiner or
defect-junction amplitude.

## 1. Derivation from the physical sector decomposition

For an order-\(N\) Monster element \(g\), Paquette--Persson--Volpato define

\[
F^g_{l,k}(\tau)=\frac1N\sum_{j\bmod N}
e^{-2\pi i jk/N}T_{g^l,g^j}(\tau).
\]

This is the graded character of the \(g=e^{2\pi i k/N}\) eigenspace in the
\(g^l\)-twisted sector.  Put \(h=g^a\) with \(a\) invertible modulo \(N\).
Changing variables \(j'=aj\) gives

\[
\begin{aligned}
F^h_{l,k}
&=\frac1N\sum_j e^{-2\pi i jk/N}T_{g^{al},g^{aj}}\\
&=\frac1N\sum_{j'}e^{-2\pi i j'a^{-1}k/N}
T_{g^{al},g^{j'}}\\
&=F^g_{al,a^{-1}k}.
\end{aligned}
\]

In the CHL model, \(l\) is winding/twist residue and \(k\) is
momentum/charge residue.  Thus the corpus map

\[
(l,k)\mapsto(a l,a^{-1}k)
\]

has a direct physical interpretation.

## 2. The physical detector that almost works

The refined BPS index is

\[
Z(R,\beta,b,v)=
\operatorname{Tr}_{\mathcal H_{\rm BPS}}
\left((-1)^F e^{-\beta H}e^{2\pi i bW}e^{2\pi i vM}\right),
\]

where \(W\) and \(M\) are total winding and momentum.  The background
parameters \(b\) and \(v\) are therefore physical Fourier controls.  In
principle they resolve the two rails and all \((l,k)\) residue sectors.

But for the order-23 module characters already reconstructed in the corpus,
the nonzero sector character depends only on the product \(lk\pmod {23}\).
Since \(D_5\) preserves that product, Fourier resolution recovers the labelled
plane but not an absolute A/B orientation.  A calibrated choice of positive
circle direction declares a marking; it does not create an invariant capable
of distinguishing two generator conventions.

This is the physical version of the genus-one no-go.

## 3. Exact dicyclic closure on the BPS charge plane

Let

\[
S(l,k)=(k,-l),
\qquad
D_5(l,k)=(5l,14k).
\]

Then

\[
D_5^{22}=1,
\qquad
D_5^{11}=-I,
\qquad
S^2=-I,
\qquad
S D_5 S^{-1}=D_5^{-1}.
\]

Hence \(D_5\) and \(S\) generate the order-44 dicyclic group already found in
the finite defect analysis.  The heterotic construction promotes its carrier
labels to physical winding/momentum sectors and its bilinear form to the
Lorentzian two-point pairing.  It does not promote the dicyclic quotient to a
continuous \(Spin(2,3)\) action.

## 4. Why spectra cannot finish the proof

For a BPS root \(\gamma=(n,m)\),

\[
\operatorname{mult}(n,m)=
\widehat c_{n,m}\!\left(\frac{nm}{23}\right).
\]

The generator change sends the same multiplicity to the relabelled root and
preserves its norm.  Two-point functions also pair only opposite roots, so
their support and normalization class do not supply orientation by
themselves.  The following entire class of tests is therefore insufficient:

- scalar McKay--Thompson series;
- the second-quantized supersymmetric index;
- BPS energy spectra;
- winding/momentum multiplicities;
- root norms and two-point selection rules;
- any statistic depending only on \(nm\bmod23\).

This is stronger than saying that the experiment is difficult.  It identifies
the quotient through which all those observables factor.

## 5. The surviving physical observable

The next datum must retain how different grades compose.  A minimal candidate
is a normalized three-point amplitude

\[
\mathcal A(\gamma_1,\gamma_2,\gamma_3)
=\left\langle
V_{\gamma_1}(z_1)V_{\gamma_2}(z_2)V_{\gamma_3}(z_3)
\right\rangle,
\qquad
\gamma_1+\gamma_2+\gamma_3=0,
\]

or its defect-junction analogue, evaluated on a triple whose marked lift is
exchanged by \(D_5\).  The test is not whether raw coefficients differ in a
chosen basis.  The gauge-invariant target is a closed composition such as a
ratio or holonomy built from several three-point coefficients so that state
rephasings cancel.

A suitable witness \(\Omega\) must satisfy:

1. it is invariant under independent rephasing of external BPS states;
2. it is not determined by root multiplicities or the bilinear form;
3. it has a declared transformation under \(D_5\);
4. the order-46 junction connects it to the \(2A\) fermionic seam;
5. it is measurable as an interference phase or normalized scattering/OPE
   ratio on the proposed carrier.

The most economical construction is a closed tetrahedral or associator loop
of intertwiners.  That is the physical counterpart of moving from characters
to \(F\)-symbols: spectra give the types, while the closed composition probes
the program.

## 6. Experimental protocol template

1. Resolve winding and momentum using the conjugate controls \(b,v\).
2. Tomographically identify three compatible BPS grades with sum zero.
3. Measure two association orders for their composition.
4. Form a closed phase ratio cancelling preparation and detector gains.
5. Repeat after the calibrated fifth-power relabelling \(D_5\).
6. Compare against three controls:
   - a factorized \(C_{23}\) clock model;
   - a model with identical multiplicities but randomized intertwiners;
   - orientation reversal of the physical circle.
7. Promote only if the closed phase obeys the predicted dicyclic/defect
   covariance and rejects the smaller controls.

The heterotic theory supplies the exact target amplitude conceptually, but a
laboratory platform and evaluated order-23 structure constants are not yet
available.  The protocol is therefore executable once those two declared
inputs exist; it is not yet an experimental result.

## 7. Consequence for the proof programme

The physical lift has advanced by one full layer:

```text
II_1,1 grading                    established mathematics
        ↓
winding/momentum carrier          established heterotic physics
        ↓
charge-resolved BPS index         established, orientation-blind
        ↓
BPS OPE / defect-junction loop    next open physical witness
        ↓
laboratory carrier                open
```

The proof programme should not spend further effort on order-23 degeneracy
tables as orientation detectors.  It should compute or source the smallest
cross-grade intertwiner loop and then ask which controllable carrier can
measure it.

The inference and detector pattern is now implemented in the
[Z23 composition-witness toy](frontier_wave7_112_z23_composition_witness_toy_reconstruction.md):
23 theories with identical fusion and spectra are separated by a
gauge-invariant closed associator loop, including a blind reconstruction under
bounded phase perturbations.  It is a methodology certificate, not sourced
Monster intertwiner data.

## Sources

- Paquette, Persson and Volpato, [*Monstrous BPS-Algebras and the Superstring Origin of Moonshine*](https://arxiv.org/abs/1601.05412)
- Paquette, Persson and Volpato, [*BPS Algebras, Genus Zero, and the Heterotic Monster*](https://arxiv.org/abs/1701.05169)
- [Monster physical-realization ladder](frontier_wave7_110_monster_physics_realization_ladder.md)
- [Moonshine programme](../../moonshine-program-lattice/README.md)

