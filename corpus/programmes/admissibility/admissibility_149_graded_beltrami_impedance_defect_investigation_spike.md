# Graded Beltrami, impedance and defect investigation spike

**Date:** 27 October 2026

**Status:** admitted bounded programme; first mathematical spike complete; no universal-unification claim admitted

**Parents:** [quarter-turn and two-datum contraction](admissibility_26_three_mode_quarter_turn_and_two_datum_contraction.md), [elliptic/hyperbolic/parabolic alphabet](admissibility_129_elliptic_hyperbolic_parabolic_local_alphabet.md), [positive-real impedance completion](../../claims/0700-0799/780_the_selected_unitary_scattering_checkpoint_embeds_in_a_reciprocal_rational_inner_response_with_positive_real_cayley_impedance.md), [RDG--Maxwell bridge](../rdg-maxwell-bridge/README.md)

**Evidence:** [machine-readable spike ledger](../../../evidence/data/admissibility-graded-beltrami-impedance-defect-spike-v1.json); [independent verifier](../../../verification/admissibility/verify_graded_beltrami_impedance_defect_spike.mjs)

**Primary literature:** [Bär, *The curl operator on odd-dimensional manifolds*](https://arxiv.org/abs/1702.02044); [Epstein, Greengard and O'Neil, *Debye Sources, Beltrami Fields, and a Complex Structure on Maxwell Fields*](https://arxiv.org/abs/1308.5425); [Lee *et al.*, *Topolectrical circuits*](https://arxiv.org/abs/1705.01077); [Cheng *et al.*, synthetic-frequency band-structure spectroscopy](https://arxiv.org/abs/2303.10545)

**Proposal under audit:** [Nielsen, *Topological Unified Field Theory*](https://philarchive.org/rec/NIETTU)

## Admission decision

The corpus admits the following chain as a serious investigation programme:

\[
\boxed{
\text{geometry and boundary}
\to \text{graded curl/Beltrami operator}
\to \text{helicity eigenspaces}
\to \text{projector holonomy}
\to \text{defect-conditioned resolvent}
\to \text{impedance/scattering record}.
}
\]

Every arrow already has a conventional mathematical or experimental meaning.
What is new here is the demand that one declared operator, domain and defect
carry the information through the entire chain without changing meanings or
refitting each record independently.

This admits the mathematics that motivated the TUFT comparison. It does not
admit the stronger claims that a universal Hopf bundle derives known forces,
that zeta-regularized curl determinants are particle masses, or that a single
scale predicts the Standard Model. Those statements remain external proposals
until their operator domains, dimensions, couplings, renormalization and
held-out predictions close.

## 1. The first obstruction is a parity law

Let (M^{2p+1}) be a closed oriented Riemannian manifold and restrict to the
appropriate co-closed (p)-forms. Write

\[
B_p=*d.
\]

With the standard (L^2) pairing, integration by parts gives

\[
B_p^*=(-1)^{p+1}B_p,
\qquad
B_p^2=(-1)^{p+1}\Delta_p
\]

on the declared domain. Therefore one uniform assertion that (B_p) is a
self-adjoint operator on every odd sphere is false:

| carrier | middle degree | type of (B_p) | square |
|---|---:|---|---|
| (S^1) | 0 | skew-adjoint | (-\Delta_0) |
| (S^3) | 1 | self-adjoint | (+\Delta_1) |
| (S^5) | 2 | skew-adjoint | (-\Delta_2) |
| (S^7) | 3 | self-adjoint | (+\Delta_3) |
| (S^9) | 4 | skew-adjoint | (-\Delta_4) |

There is a clean repair:

\[
\widehat B_p=
\begin{cases}
B_p,&p\text{ odd},\\
iB_p,&p\text{ even}.
\end{cases}
\]

Then (widehat B_p) is self-adjoint and
(widehat B_p^2=\Delta_p). But the factor of (i) is not cosmetic. It
changes real structures, determinant phases, Gaussian signs and the relation
between first-order flow and second-order oscillation. The repaired object is
a **graded family**, not one unchanged real operator copied across a tower.

This is the first productive result of the spike. The proposed tower survives
only after becoming typed in exactly the way the corpus requires.

## 2. Maxwell supplies the honest physical bridge

In source-free, homogeneous, time-harmonic Maxwell theory, the helicity
combinations

\[
F_\pm=E\pm iZH,
\qquad
Z=\sqrt{\mu/\varepsilon},
\qquad
k=\omega\sqrt{\mu\varepsilon}
\]

obey a Beltrami equation, up to the chosen time convention,

\[
\nabla\times F_\pm=\pm kF_\pm.
\]

Here the quarter-turn is not metaphorical. Multiplication by (i) rotates a
coherent field through one quadrature; a quarter period of harmonic evolution
does the same in the real two-plane. Boundary conditions decide which curl
realization is self-adjoint and which discrete spectrum is observed. Bär's
odd-dimensional curl analysis and the bounded-domain Maxwell--Beltrami work
of Epstein, Greengard and O'Neil make this bridge conventional rather than
speculative.

The correspondence is nevertheless narrower than a unification claim:

- a Maxwell helicity mode is not a particle-generation label;
- an eigenfrequency is not automatically a rest mass;
- a Hopf-linked field texture is not automatically a fundamental defect; and
- the complex structure on Maxwell solutions does not choose the corpus's
  physical carrier by itself.

## 3. The quarter-turn lives on a moving eigenspace, not in the word “curl”

The exact quarter-turn already proved in AZ-026 is a Wilczek--Zee holonomy of a
gapped rank-two projector. A Beltrami operator can supply the needed
eigenspace, but does not supply the loop automatically.

For a controlled family (B(q)), choose an isolated two-dimensional spectral
cluster with projector (P(q)). Along a closed parameter loop (q(t)), the
adiabatic connection is

\[
\mathcal A=P\,dP
\]

in an orthonormal moving frame, and the coherent return is

\[
U_\gamma=\mathcal P\exp\left(-\oint_\gamma\mathcal A\right).
\]

A quarter-turn occurs only if the loop geometry produces
(U_\gamma=\pm J), with (J^2=-I), while the spectral gap stays open and
loss does not erase coherence. This separates four claims that had been
drifting together:

1. the operator has Beltrami eigenmodes;
2. two modes form a controlled gapped doublet;
3. a parameter loop gives a nontrivial holonomy;
4. that holonomy is read by a phase-sensitive detector.

Only their conjunction creates the physical quarter-turn channel.

## 4. Defects act first by changing the operator domain or resolvent

A defect may change coefficients, topology, boundary conditions or the
operator domain. These are not interchangeable. Once the perturbed
self-adjoint realization (B_D) is declared, its resolvent

\[
R_D(z)=(B_D-zI)^{-1},\qquad \operatorname{Im}z>0,
\]

has positive imaginary quadratic forms:

\[
\operatorname{Im}\langle c,R_D(z)c\rangle\ge 0.
\]

Thus a port compression (G_D(z)=C^*R_D(z)C) is a matrix Herglotz function.
After the rotation (F_D=-iG_D), its real part is positive, and a Cayley map
produces a contractive scattering response. This is the precise bridge from
an internal spectral ladder to passive impedance geometry.

The bridge explains why defects can be visible as impedance peaks without
being new particles. Topolectrical circuits are an explicit established
example: a circuit Laplacian carries the spectrum and topological boundary
resonances appear in an impedance readout.

## 5. The shared no-refit closure test

The spike's strongest consequence is a paired prediction rather than another
analogy. Independently calibrate one defect (D), one operator family
(B_D(q)), one boundary domain and one port map (C). Then predict, without
separate fitting:

1. the oriented holonomy of a gapped two-mode cluster around a loop in (q);
2. the displacement and residues of the corresponding poles in
   (G_D(z)=C^*(B_D-zI)^{-1}C).

The two records interrogate different aspects of the same declared object.
Holonomy tests eigenvectors and their transport. Impedance tests eigenvalues,
port overlaps and passivity. A model that fits only one is incomplete.

The minimal laboratory sequence is:

1. use a three-mode microwave, topolectrical or synthetic-frequency device;
2. calibrate all pairwise couplings, loss, port response and boundary loading;
3. insert or tune one localized defect without changing the analysis model;
4. traverse a loop predicted to give (+\pi/2), then reverse it to predict
   (-\pi/2);
5. measure coherent state tomography and the full complex impedance spectrum;
6. hold out one loop orientation and one defect strength until prediction;
7. require the same parameters to predict both the holonomy and pole ledger.

Lithium niobate is a plausible optical/synthetic-frequency host because it
provides programmable complex couplings and coherent readout. A topolectrical
network is the easier first implementation because its operator and impedance
are directly accessible. Neither platform is evidence for a fundamental
substrate; each is a falsifiable emulator of the relational chain.

## 6. What each outcome means

| outcome | admissible conclusion |
|---|---|
| holonomy and pole motion both close | one operator/domain/defect model carries geometry into two independent records |
| poles close but holonomy fails | spectrum is adequate; eigenvector transport, degeneracy or coherence model is not |
| holonomy closes but poles fail | projector geometry is adequate; port, boundary, loss or constitutive model is not |
| both fail conventionally | the proposed shared carrier is rejected for that device |
| a reproducible residual survives all controls | retain an anomaly and compare typed extensions; do not call it new physics yet |

The experiment is useful in every row. The programme therefore meets the
corpus standard for an admissibility-frontier target.

## 7. Where the spike does and does not lead

It leads to a real intersection among five previously adjacent corpus lanes:

- the Clifford quarter-turn becomes a measured coherent quadrature;
- the Hopf/Beltrami lane supplies a legitimate operator and helicity basis;
- defects become domain or coefficient interventions rather than free-standing
  ontological objects;
- the spectral ladder becomes a resolvent pole ledger; and
- positive-real impedance carries the result to a detector.

It does **not** yet lead from the Hopf tower to the Standard Model, gravity or
absolute mass values. Those extensions need representation dictionaries,
dimensionally correct couplings, anomaly and renormalization control, and
comparisons with existing precision limits. The graded repair makes such work
more difficult but also more honest: every rung must now declare whether its
first-order generator is real skew-adjoint or complex self-adjoint.

## Verdict

The fruitful object is not “TUFT” taken as a package. It is the repaired and
testable relational channel

\[
\boxed{
(B_D,\operatorname{Dom}B_D,P_\gamma,C)
\longmapsto
(U_\gamma,G_D(z))
}
\]

with one shared parameter ledger. That channel is now admitted. Its first
finite verifier checks the parity repair, the quarter-turn algebra, Herglotz
positivity, Cayley contractivity and common defect-pole ledger. The next
frontier is a continuum or hardware realization in which the same defect
predicts both records before unblinding.

