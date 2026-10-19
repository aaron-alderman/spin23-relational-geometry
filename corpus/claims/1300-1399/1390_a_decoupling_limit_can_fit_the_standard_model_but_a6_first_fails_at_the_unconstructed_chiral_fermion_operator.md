# A decoupling limit can fit the Standard Model, but A6 first fails at the unconstructed chiral fermion operator

**Date:** 20 October 2026  
**Gate:** A6, Standard-Model limit  
**Status:** conditional low-energy matching witness; not a derivation and not physical admission  
**Inputs:** [healthy bosonic point 1290](../1200-1299/1290_s_v1_contains_a_fully_healthy_quadratic_benchmark_but_one_completion_cannot_discharge_the_global_a4_gate.md), [effective selector 1235](../1200-1299/1235_an_oriented_boundary_can_select_one_anomaly_free_furey_tro_and_retain_cp_only_if_an_exchange_odd_portal_exists.md), and [candidate action 1199](../1100-1199/1199_minimal_typed_closure_action_v1_separates_the_derived_bf_sector_from_the_still_spurionic_flavour_response.md)  
**Evidence:** [machine-readable audit](../../../evidence/data/spin23-a6-low-energy-matching-audit.json) and [executable verifier](../../../verification/verify/verify_spin23_a6_low_energy_matching_audit.mjs)

## Result

There is a nonempty open neighbourhood around the displayed conditional decoupling point in which the \(S_{\rm v1}\) fields can reproduce the Standard Model at low energy while the extra vector, flavon and projector modes are heavy. No measure or global parameter scan is supplied. At the illustrative point the verifier finds

\[
m_Z=91.18748\ {\rm GeV},\qquad
m_{Z'}=15.00002\ {\rm TeV},
\]

\[
m_h=125.24999\ {\rm GeV},\qquad
m_s=22.36068\ {\rm TeV},
\]

with Higgs–flavon mixing \(2.46\times10^{-6}\), positive kinetic forms and exact cancellation of all displayed \(U(1)_X\) anomalies.

This is a **capacity result**, not a prediction. Almost every numerical quantity was chosen to match or decouple. The first obstruction that parameter choice cannot cure is earlier than collider matching:

\[
\boxed{
\text{no fermionic kinetic/Fock operator yet makes exactly one selected TRO propagate
while excluding its exchange partner as a mirror.}
}
\]

Consequently A6 remains blocked and physical admission remains false.

## 1. What “low-energy limit” means here

Imagine a musical chord heard through a wall. If all but one note are too high-pitched and too faint to pass through, the sound on the other side can resemble a single familiar note. That does not prove the instrument contains only that note; it shows that the other modes can be hidden by a large frequency gap.

Here the “wall” is the hierarchy

\[
E\ll m_{Z'},m_s,m_P,M_R.
\]

The desired low-energy fields are the Standard Model gauge bosons, one Higgs-like scalar and three chiral matter generations. Integrating out the heavy fields must leave small, controlled corrections. A decoupling calculation can establish that this is possible. It cannot establish which parameter point nature selects.

## 2. Conditional chiral spectrum and mirror count

Document 1235 supplies, at effective-spurion level, one of two exchange-related fifteen-component modules

\[
Q\oplus u^c\oplus d^c\oplus L\oplus e^c.
\]

For one generation its complex dimensions are

\[
6+3+3+2+1=15.
\]

Three supplied replicas therefore contain the Standard Model's \(45\) left-handed complex Weyl components. The candidate action also contains three Standard-Model-singlet \(\nu_R\), needed for the anomaly-free \(U(1)_X\) completion and available for a seesaw.

The conditional mirror count is zero only under the 1235 interpretation:

\[
T_B=\text{exchange/conjugate presentation of }T_A,
\]

not a second independent same-chirality Hilbert-space sector. This is an assumption about quantization, not a consequence of the finite block list. A list of representations does not specify anticommutation relations, a kinetic operator or which kernel is physical.

Therefore the sharp statement is:

| Question | Answer |
|---|---|
| Does the selected support have exactly one SM generation? | yes, algebraically |
| Do three replicas give \(45\) SM Weyl components? | yes, conditionally |
| Are same-chirality mirrors absent? | only if the selector assumption is imposed |
| Is that absence enforced by an operator/index calculation? | no |

## 3. Anomalies survive the threshold

The selected Standard-Model module cancels its local anomalies generation by generation and has four color-weighted weak doublets per generation, so the global \(SU(2)\) parity is even.

For the extra Abelian factor, the physical charge operator is

\[
X=B-2Y-3L_i.
\]

In a left-handed basis the right-handed charges are conjugated. With the selected family first, the lepton charges are

\[
X(L)=(-2,1,1),\qquad
X(e^c)=(1,-2,-2),\qquad
X(\nu^c)=(3,0,0).
\]

The quark rows are family universal:

\[
X(Q)=0,\qquad X(u^c)=1,\qquad X(d^c)=-1.
\]

The verifier obtains

\[
\mathcal A_{SU(3)^3}
=\mathcal A_{SU(3)^2X}
=\mathcal A_{SU(2)^2X}
=\mathcal A_{\mathrm{grav}^2X}
=\mathcal A_{X^3}
=\mathcal A_{Y^2X}
=\mathcal A_{YX^2}=0.
\]

Thus heavy thresholds need no arbitrary anomaly-cancelling mirror fermions. If a chiral heavy state is removed, its Wess–Zumino or inflow remainder must still be retained; simple deletion is not a valid matching operation. The present witness instead keeps the complete anomaly-free ultraviolet module and makes only the singlet neutrinos heavy.

## 4. Hypercharge and kinetic-mixing normalization

The compact integral generator is

\[
Y_6=6Y.
\]

The coupling must transform oppositely:

\[
g_{Y_6}={g_Y\over6},
\qquad
g_{Y_6}Y_6=g_YY.
\]

This matters because rescaling charges without rescaling the coupling changes the theory. It also matters for kinetic mixing. The coefficient \(\chi\) is not an invariant number by itself: it depends on the Abelian basis and the renormalization scale.

A valid matching prescription must declare:

1. the primitive compact basis \((Y_6,X)\);
2. the scale \(\mu\) at which \(\chi(\mu)\) is quoted;
3. the electroweak input scheme;
4. the field redefinition used to canonicalize the kinetic matrix;
5. the resulting mass-basis couplings to every fermion.

The witness uses \(G_F\) to set \(v_H\), chooses \(g,g_Y\) to reproduce the tree-level electroweak masses, and takes \(\chi=10^{-4}\) at the matching scale. These are input choices, not predictions.

## 5. Explicit decoupling point

Deform the healthy point of document 1290 within its open positivity region to

\[
\begin{aligned}
v_H&=246.22\ {\rm GeV},&
v_s&=50\ {\rm TeV},\\
g&=0.653,&
g_Y&=0.3496108791,\\
g_X&=0.1,&
\chi&=10^{-4},
\end{aligned}
\]

and

\[
\lambda_H=0.1293834774,\qquad
\lambda_s=0.1,\qquad
\lambda_{Hs}=10^{-4}.
\]

The Abelian kinetic eigenvalues are positive because \(|\chi|<1\). The quartic form is positive because

\[
4\lambda_H\lambda_s-\lambda_{Hs}^2>0.
\]

### Neutral vectors

Use the same charge vectors as the healthy benchmark,

\[
c_H=(-g/2,g_Y/2,-g_X),\qquad c_s=(0,0,3g_X),
\]

and

\[
M^2=v_H^2c_Hc_H^T+v_s^2c_sc_s^T.
\]

Solving the generalized eigenproblem against the kinetic matrix gives

\[
m_{\gamma,Z,Z'}=(0,\ 91.187477,\ 15000.020291)\ {\rm GeV}.
\]

The charged tree-level mass is

\[
m_W={gv_H\over2}=80.39083\ {\rm GeV}.
\]

The low-energy contact coefficient from the heavy vector is illustratively

\[
{g_X^2\over m_{Z'}^2}
=4.44\times10^{-11}\ {\rm GeV}^{-2},
\]

equivalent to a scale of roughly \(150\ {\rm TeV}\) for unit-normalized currents.

### Scalars

The radial Hessian is

\[
\mathcal M_{\rm radial}^2=
\begin{pmatrix}
2\lambda_Hv_H^2&\lambda_{Hs}v_Hv_s\\
\lambda_{Hs}v_Hv_s&2\lambda_sv_s^2
\end{pmatrix}.
\]

Its masses are

\[
(125.249988,\ 22360.679775)\ {\rm GeV}.
\]

The small-angle estimate

\[
\theta_{hs}\simeq
{\lambda_{Hs}v_Hv_s\over
2\lambda_sv_s^2-2\lambda_Hv_H^2}
=2.46\times10^{-6}
\]

makes Higgs-coupling dilution negligible at this illustrative point.

### Projector modes

The \(V_{\rm resp}\) Hessian remains an input. It can be chosen so the four real \(\mathbb{CP}^2\) tangent modes lie above, for example, \(10\ {\rm TeV}\), while keeping positive residues. Unlike the vector and flavon formulas, even that threshold is not determined until \(f_P\) and the response tensor are normalized. This sector is matchable only after adding data.

## 6. Yukawa and Majorana freedom

Once \(s\neq0\), the Peirce blocks cover an arbitrary complex \(3\times3\) Dirac matrix:

\[
\underbrace{PYP}_{1}
\oplus
\underbrace{QYQ}_{4}
\oplus
\underbrace{PYQ}_{2}
\oplus
\underbrace{QYP}_{2}
\quad\Rightarrow\quad 9\ \text{complex entries}.
\]

The Majorana support covers an arbitrary complex symmetric matrix:

\[
\underbrace{PMP}_{1}
\oplus
\underbrace{QMQ}_{3}
\oplus
\underbrace{PMQ+QMP}_{2}
\quad\Rightarrow\quad 6\ \text{independent complex entries}.
\]

For \(Y_u,Y_d,Y_e,Y_\nu\) and symmetric \(M_R\), this is

\[
4(9)(2)+6(2)=84
\]

raw real coefficients before field-basis redundancies.

That is enough freedom to fit observed masses, CKM mixing, PMNS mixing, CP phases and a seesaw spectrum. It is too much freedom to predict them. The nonzero CP invariant in document 1235 proves compatibility with CP violation, not its magnitude.

## 7. What present experiments actually require

Three current reference points are useful, with important qualifications.

1. The [2025 PDG \(Z'\) review](https://pdg.lbl.gov/2025/reviews/rpp2025-rev-zprime-searches.pdf) states that electroweak measurements typically limit the kinetic- and mass-mixing combinations that shift \(Z\) couplings to order \(10^{-3}\). The witness uses \(\chi=10^{-4}\) and a \(15\ {\rm TeV}\) vector, but only a full electroweak likelihood can certify the family-dependent model.

2. [CMS EXO-25-021](https://cms-results.web.cern.ch/cms-results/public-results/preliminary-results/EXO-25-021/index.html), using \(283\ {\rm fb}^{-1}\) at \(13.6\ {\rm TeV}\), reports a \(95\%\) confidence lower limit of \(5.55\ {\rm TeV}\) for the sequential-Standard-Model \(Z'\) benchmark. This is **not** a bound on \(B-3L_i\): production, branching fractions, width and flavor couplings differ. It shows why a visible electroweak-strength vector must be treated as multi-TeV and recast rather than declared safe from its mass alone.

3. ATLAS measured the \(13\ {\rm TeV}\) total Higgs production cross section as \(55.5^{+4.0}_{-3.8}\ {\rm pb}\), consistent with the Standard Model value \(55.6\pm2.5\ {\rm pb}\) ([JHEP 05 (2023) 028](https://arxiv.org/abs/2207.08615)). The illustrative scalar mixing is deliberately tiny. This single inclusive number is not a stand-alone scalar-mixing limit.

A defensible phenomenological admission would still require:

- a dilepton and contact-interaction recast with the actual \(X\) charges;
- electroweak precision fitting after kinetic and mass diagonalization;
- charged-lepton and neutrino flavor constraints after fixing the Yukawa rotations;
- heavy-neutral-lepton and neutrino-mass likelihoods;
- singlet-scalar searches and combined Higgs signal strengths;
- cosmological and defect constraints if the residual \(\mathbb Z_3\) sector is populated.

The important point is not that the illustrative point is experimentally excluded—it is not shown to be. The point is that a hierarchy can always be made safer by raising \(v_s\) or reducing couplings, so compatibility alone carries little explanatory weight.

## 8. Fits, conditional structure and predictions

| Item | Classification |
|---|---|
| SM representation content | exact conditional on the effective selector |
| zero mirror count | assumed by the selector interpretation, not operator-derived |
| anomaly cancellation | exact for the displayed module |
| \(X=B-2Y-3L_i\) charge pattern | conditional structural result |
| charge-three flavon and split \(\mathbb Z_3\) | conditional structural result |
| \(v_H,g,g_Y,m_h\) | matched inputs |
| \(m_{Z'},m_s,m_P,M_R\) | freely adjustable thresholds |
| CKM, PMNS and CP magnitudes | fitted coefficients |
| small \(\chi\) at one scale | matched input requiring RG specification |
| collider rate or new mass | no prediction |

Thus the strongest charitable statement is:

> \(S_{\rm v1}\) has enough structure to host the Standard Model and enough freedom to decouple its displayed additions. It does not yet explain the Standard Model numerical data, and it has not constructed the physical chiral Hilbert space whose spectrum it is meant to match.

## 9. First unavoidable missing datum

The earliest non-tunable gap is a fermionic kinetic/Fock realization of the selector.

It must provide:

1. a gauge-covariant Hilbert space carrying Lorentz spin and Grassmann statistics;
2. a kinetic or Dirac operator coupled to the exchange-odd boundary portal;
3. a kernel/index calculation selecting three copies of one fifteen-state TRO;
4. three allowed \(\nu_R\) singlets;
5. zero independent same-chirality exchange partners;
6. radiative stability of the projected-out blocks.

No choice of \(v_s\), \(g_X\), \(\chi\), a scalar mass or a Yukawa coefficient answers whether \(T_B\) is absent or propagating. That is why this datum comes before a more refined global fit.

If such an operator is supplied, the next missing object is a complete renormalized parameter card and likelihood. At that stage A6 would become an ordinary, difficult but well-posed BSM matching problem.

## 10. Verdict

\[
\boxed{
\text{conditional decoupling witness: yes}
\qquad
\text{numerical predictions: no}
\qquad
A6\text{ pass: no}.
}
\]

The audit rules out an immediate no-go: the extra bosonic sectors need not remain light, ghostly or strongly mixed. It also prevents a false positive: fitting every Standard-Model datum with unrestricted coefficients is not a derivation, and the physical mirror count is not known until the fermion operator exists.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_a6_low_energy_matching_audit.mjs
~~~

The verifier checks the \(45\)-component conditional chiral count, zero conditional mirror count, all seven displayed \(U(1)_X\) anomaly coefficients, the neutral generalized mass eigenvalues, scalar thresholds and mixing, contact scale, hypercharge normalization, and Dirac/Majorana parameter counts.
