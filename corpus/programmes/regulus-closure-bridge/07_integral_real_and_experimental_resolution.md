# Integral, real and experimental resolution of the regulus frame carrier

**Date:** 27 October 2026

**Status:** exact lift obstruction; executable experimental protocol;
device realization open

**Programme:** [Regulus closure bridge](README.md)

**Evidence:** [machine record](../../../evidence/data/regulus-mub-selector-dynamics-v1.json)

## 1. The integral lift exists only as a quotient

Reduction modulo three is surjective:

\[
Sp(4,\mathbb Z)\longrightarrow Sp(4,\mathbb F_3).
\]

Consequently every individual finite symplectic transformation has integral
lifts, and the genus-two carrier is a genuine integral source for the finite
Pauli action. But this does not provide a subgroup section.

If a homomorphic section existed, it would embed the order-51,840 group
\(Sp(4,\mathbb F_3)\) faithfully into \(GL(4,\mathbb Z)\). The largest finite
subgroup of \(GL(4,\mathbb Z)\) has order 1,152, realized by the \(F_4\) Weyl
group. Hence:

\[
\boxed{
Sp(4,\mathbb Z)\twoheadrightarrow Sp(4,\mathbb F_3)
\quad\text{does not split}.}
\]

The finite frame carrier is therefore a congruence quotient with an infinite
kernel, not a finite configuration sitting canonically inside the integral
group. This sharpens the earlier statement that a Fourier or Dehn-twist lift
is not automatically physical dynamics.

For a finite gate \(g\), the complete lift set is a coset

\[
\widetilde g\,\Gamma(3),
\qquad
\Gamma(3)=\ker\!\left[Sp(4,\mathbb Z)\to Sp(4,\mathbb F_3)\right].
\]

Different members have the same action on finite Pauli labels but may carry
different word length, real path, metaplectic phase and Maslov data. Those
differences are precisely what the finite frame model forgets. A physical
implementation must therefore calibrate a lift; the mod-three gate name does
not determine its continuous dynamics.

The finite-subgroup bound follows the low-dimensional classification of
Conway and Sloane:
[Low-dimensional lattices II: Subgroups of GL(n,Z)](http://neilsloane.com/doc/Me146.pdf).

## 2. The same obstruction persists over the real four-carrier

Every finite subgroup of \(Sp(4,\mathbb R)\) is conjugate into its maximal
compact subgroup \(U(2)\). A faithful action of the simple group
\(PSp_4(3)\) in \(U(2)\) would give a faithful projective two-dimensional
unitary representation. Its projective image would be a finite rotation
group, but the only nonabelian simple finite rotation group is \(A_5\), not
the order-25,920 group \(PSp_4(3)\).

Thus the complete 36-frame symmetry does not embed faithfully into the real
four-dimensional symplectic carrier either. The valid relationship is

\[
\text{integral/real carrier}
\xrightarrow{\text{reduction and quotient}}
\text{finite frame carrier},
\]

not a symmetry-preserving inclusion in the reverse direction.

This does not prevent individual finite gates from being lifted to real or
integral symplectic paths. It prevents all choices from being made
simultaneously, canonically and with the finite multiplication law intact.
The congruence-kernel path data are unavoidable.

## 3. Nearest experimental protocol

The smallest decisive experiment needs one controllable nine-dimensional
Hilbert space interpreted as two qutrits.

1. Calibrate the two-qutrit Weyl operators \(X_1,X_2,Z_1,Z_2\).
2. Compile the 40 commuting-class measurements using the supplied Clifford
   words. The logical maximum is seven generators; each complete frame has
   four product measurements and six entangled measurements, each of the
   latter requiring at least one mutual gate.
3. Calibrate a physical cost for each available generator, re-run weighted
   compilation, and pre-register the cheapest predicted frame or tied set.
   This turns implementation asymmetry into a prospective selector test.
4. Verify rank-one completeness within each basis and overlap \(1/9\) for
   bases placed in one spread.
5. Assemble all 36 ten-basis frames.
6. Apply calibrated frame-preserving Clifford controls or evolve a
   coarse-grained selector variable on the frame labels.
7. Quantify leakage into outputs that are not any of the 36 complete frames.
8. Estimate the conditional \(36\times36\) frame transition matrix.
9. Fit

   \[
   K=\alpha I+\beta A_4/15+\gamma A_1/20
   \]

   on a training subset and predict held-out one-overlap and four-overlap
   transitions.
10. Measure the residual perpendicular to
   \(\operatorname{span}\{I,A_4,A_1\}\).

The experiment has four principal outcomes:

| Result | Meaning |
|---|---|
| projector/MUB tests fail | the device does not realize the intended two-qutrit carrier |
| MUB tests pass but frame leakage is large | the carrier is measurable, but the applied process is not a frame-label dynamics |
| leakage is controlled but the relation-algebra residual is resolved | the finite geometry is realized, but its frame noise is generic rather than exceptional |
| MUB tests and held-out relation dynamics pass | the exceptional incidence is an operational organizing symmetry of that device |

None of these outcomes alone establishes a new fundamental interaction.

## 4. Why thin-film lithium niobate is a plausible platform

Lithium niobate is relevant instrumentally, not ontologically. A
frequency-bin implementation can encode a nine-state space, apply coherent
electro-optic mode mixing, retain phase references and measure high-dimensional
correlations. Recent work reports:

- coherent phase measurements across frequency bins from a
  [quasi-phase-matched lithium-niobate microring](https://doi.org/10.1364/CLEO_FS.2024.FTu4F.3);
- an integrated thin-film lithium-niobate
  [quantum frequency processor](https://arxiv.org/abs/2603.11471) with
  programmable frequency control and entangling logic;
- arbitrary high-speed projective measurements in a thin-film
  lithium-niobate [time-bin receiver](https://arxiv.org/abs/2604.16695).

These results establish relevant control primitives. They do not establish
that one existing chip can already implement all 40 commuting classes with
the required fidelity. The first engineering calculation is a gate
compilation and loss/leakage budget for the explicit projectors in the
machine record.

## 5. Physical Plücker observable

The experiment supplies an operational Plücker map only if four calibrated
phase-space generators obey:

\[
[D(u),D(v)]=0
\quad\Longleftrightarrow\quad
\omega(u,v)=0,
\]

and two independent commuting labels define the measured basis independently
of generator choice. In that case the measured commuting class is genuinely
a Lagrangian plane, and its primitive wedge is a detector-derived Plücker
coordinate.

This is enough to realize the finite geometry. It is not enough to identify
the optical modes with spacetime lines or the real \(Spin(2,3)\) carrier.
That stronger claim requires a common integral response lattice and a
measured real symplectic transport whose mod-three reduction agrees with the
finite labels.

## 6. Consequences for \(E_8\)

The new operator model strengthens the existing no-go rather than reopening
the 240-root shortcut. The natural permutation module on the 36 frames
decomposes as

\[
1\oplus15\oplus20.
\]

It is a complete \(E_6\)-incidence measurement algebra, not the
\(72+6+81+81\) root decomposition associated with
\(E_6\times A_2\subset E_8\). The already-failed equivariant identification
of 240 trihedra with 240 phase fibres is unchanged.

The maximal-clique calculation does produce 216 objects, but closes rather
than opens that coincidence: the 216 maximal one-basis \(K_5\)s are
equivariantly the 216 unordered skew pairs among the 27 cubic lines. They are
internal \(E_6\) incidence objects. Their count must not be identified with
one of the 216-sized orbits that arose in the separate \(E_8\)
\(A_2\)-subsystem audit without a new intertwiner.

An \(E_8\) branch can reopen only through a new representation-level
intertwiner, nonstandard subgroup, or integral norm-two lattice construction.
No further relabelling of the present 36 frames can supply it.

## 7. Resolution ledger

| Proposed route | Outcome |
|---|---|
| explicit MUB realization | completed computationally |
| measurement compilation | all 40 bases compiled in at most seven logical Clifford generators; every frame has four product and six one-mutual-gate entangled bases |
| implementation selector | weighted compilation exhibits multiple hardware-cost chambers with different cheapest frames; selection is operational but not intrinsic |
| relation-dependent noise | complete two-rate model and residual test |
| measured-channel analysis | reusable fitter separates leakage and returns invariant weights, sector eigenvalues and off-algebra residual |
| spontaneous selection by linear noise | ruled out |
| nonlinear symmetry breaking | instability sectors derived; winning frame remains contingent |
| canonical integral embedding | ruled out by finite-subgroup order |
| canonical real four-dimensional embedding | ruled out by maximal-compact/projective classification |
| physical Plücker observable | exact device criterion; requires implementation |
| lithium-niobate realization | plausible control platform; compilation and calibration required |
| \(E_8\) recovery from the 36 frames | no; representation types remain incompatible |
