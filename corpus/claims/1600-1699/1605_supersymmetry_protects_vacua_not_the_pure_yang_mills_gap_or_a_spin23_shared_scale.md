# Supersymmetry Protects Vacua, Not the Pure Yang--Mills Gap or a Spin(2,3) Shared Scale

**Date:** 21 October 2026

**Gates:** A1, A2, A3, A4, A6, A7, A8 and A11

**Status:** finite holomorphic-vacuum, index, soft-decoupling and AdS-supergravity audit; the supersymmetric route is exhausted without a continuity theorem or additional ultraviolet boundary condition

**Depends on:** [the explicit minimal Spin(2,3) action](../1500-1599/1596_the_explicit_minimal_spin23_action_has_only_the_massless_graviton_and_torsion_square_does_not_create_a_gap.md), [the E6 threshold/shared-scale no-go](../1500-1599/1597_e6_threshold_descent_leaves_lambda_qcd_exponentially_sensitive_and_no_spin5_su3_scale_is_protected.md), and [supersymmetry as an optional extension](../1500-1599/1588_eight_external_phenomena_define_typed_validation_lanes_not_one_spin23_explanation.md)

**Evidence:** [supersymmetry/holomorphy ledger](../../../evidence/data/spin23-susy-holomorphic-mass-gap-shared-scale-audit.json) and [deterministic verifier](../../../verification/verify/verify_spin23_susy_holomorphic_mass_gap_shared_scale_audit.mjs)

## Result

Pure four-dimensional \(\mathcal N=1\) supersymmetric Yang--Mills (SYM) is a
valuable controlled neighbour of ordinary Yang--Mills. Holomorphy, anomalies
and the Witten index fix its vacuum multiplicity and gaugino-condensate phases.
They do **not** fix a positive physical mass gap, control the nonsupersymmetric
decoupling limit, or identify the strong scale with the Spin(2,3)/AdS scale.

The sharp result is

\[
\boxed{
\begin{array}{c}
\mathcal N=1\ {\rm SYM}:\quad N\ {\rm vacua},\quad
\langle S\rangle_k=\Lambda_{\rm SYM}^3e^{i(\theta+2\pi k)/N};\\[2mm]
\text{but}\quad
\Delta_{\rm physical},\ \text{soft continuity to pure YM},\
\Lambda_{\rm QCD}/\ell^{-1}\quad\text{are not protected.}
\end{array}}
\]

There is one genuine Spin(2,3) bridge: the bosonic subgroup of the
four-dimensional \(\mathcal N=1\) AdS supergroup \(OSp(1|4)\) is
\(Sp(4,\mathbb R)\simeq Spin(2,3)\). In an unbroken AdS supergravity vacuum,
\(m_{3/2}=\ell^{-1}\) in standard conventions. This relation exists only
after adding local supersymmetry and a gravitino. It is not a consequence of
the bosonic Spin(2,3) action.

## What holomorphy fixes

For pure \(SU(N)\) SYM, choose the normalization

\[
S=-{1\over32\pi^2}{\rm tr}\,W^\alpha W_\alpha,
\qquad
S_k=\Lambda_{\rm SYM}^3
e^{i(\theta+2\pi k)/N},\quad k=0,\ldots,N-1.
\]

This is the breaking \(\mathbb Z_{2N}\to\mathbb Z_2\). A branchwise
Veneziano--Yankielowicz superpotential may be written

\[
W_{\rm VY}=N S\left[\log\left({S\over\Lambda^3}\right)-1\right],
\]

with branch data restoring all \(N\) extrema. For the finite \(SU(3)\)
witness at \(\theta=0\), \(\Lambda=1\), the three condensates are the cube
roots of unity:

\[
(1,-\tfrac12+i\tfrac{\sqrt3}{2},-\tfrac12-i\tfrac{\sqrt3}{2}),
\qquad \sum_kS_k=0,\qquad |S_k|=1.
\]

These are exact holomorphic and anomaly data. They do not determine the
non-holomorphic Kähler metric of the composite field. In the local
dimensionless toy with kinetic coefficient \(Z\), the canonically normalized
curvature scale is

\[
m_{\rm toy}={|W''(S_k)|\over Z}={N\over Z|S_k|}.
\]

For the identical \(SU(3)\) extrema, \(Z=(0.1,1,10)\) gives
\(m_{\rm toy}=(30,3,0.3)\). This is not a spectrum calculation; it is a
counterexample to inferring a mass from the holomorphic superpotential alone.
The unknown Kähler data can continuously change the curvature while leaving
every protected vacuum datum unchanged.

## The Witten index is not a gap theorem

For pure \(SU(N)\) SYM the index is \(I=N\), consistently counting the
supersymmetric vacua. Consider a finite supersymmetric spectrum with three
bosonic zero-energy vacua and, at energy \(\epsilon>0\), one paired bosonic
and fermionic state. Then

\[
I(\beta)=3+e^{-\beta\epsilon}-e^{-\beta\epsilon}=3
\]

for \(\epsilon=10^{-2},1,100\), or indeed any positive \(\epsilon\). The
index proves neither a uniform lower bound on the first excitation nor the
existence, locality, reflection positivity and infinite-volume control needed
for the four-dimensional Yang--Mills mass-gap problem. It constrains vacuum
parity, not the spectral measure.

## A soft gaugino mass lifts vacua, not the proof obstacle

Add a small real gaugino mass \(m_\lambda\). With the normalization above, its
leading branch energies may be represented as

\[
\Delta E_k=-2m_\lambda\Lambda_{\rm SYM}^3
\cos{\theta+2\pi k\over N}+O(m_\lambda^2).
\]

For \(N=3\), \(m_\lambda=0.05\), \(\Lambda=1\), the finite witness is

\[
\begin{array}{c|ccc}
\theta&E_0&E_1&E_2\\\hline
0&-0.10&0.05&0.05\\
\pi&-0.05&0.10&-0.05
\end{array}
\]

Thus the vacuum-energy splitting is \(0.15\), and a branch crossing occurs at
\(\theta=\pi\). Neither number is a particle mass gap. The expansion controls
only \(m_\lambda\ll\Lambda_{\rm SYM}\), whereas decoupling the gluino to
obtain pure Yang--Mills requires \(m_\lambda\gg\Lambda_{\rm SYM}\). There is
no common controlled regime.

One-loop threshold matching makes the missing bridge explicit. From
\(b_{\rm SYM}=3N\) and \(b_{\rm YM}=11N/3\), continuity of the coupling at
\(m_\lambda\) gives

\[
\Lambda_{\rm YM}^{11N/3}
=m_\lambda^{2N/3}\Lambda_{\rm SYM}^{3N},
\qquad
\Lambda_{\rm YM}=m_\lambda^{2/11}
\Lambda_{\rm SYM}^{9/11}.
\]

At fixed \(\Lambda_{\rm SYM}=1\), masses
\(m_\lambda=(0.01,0.1,1,10,100)\) give

\[
\Lambda_{\rm YM}=(0.432876,0.657933,1,1.519911,2.310130).
\]

The formula transfers boundary data; it does not predict a gap. Reaching pure
YM requires a conjecture that confinement and a positive gap persist without
a phase transition along the whole soft-deformation path. Holomorphy and the
index cease to supply the needed spectral control once supersymmetry is
broken.

## The genuine AdS relation and its remaining free constant

In minimal \(\mathcal N=1\) supergravity, a supersymmetric AdS vacuum obeys

\[
m_{3/2}=e^{K/(2M_{\rm Pl}^2)}{|W|\over M_{\rm Pl}^2},
\qquad
\Lambda_{\rm grav}=-3m_{3/2}^2=-{3\over\ell^2}.
\]

This is the strongest available \(OSp(1|4)\) shared-scale statement. Now let a
hidden pure \(SU(N)\) sector generate, schematically,
\(W_{{\rm cond},k}=N\Lambda_{\rm SYM}^3e^{2\pi ik/N}\), and take the finite
toy \(M_{\rm Pl}=1\), \(K=0\), \(N=3\), \(\Lambda_{\rm SYM}=0.01\). For
\(k=0\), \(W_{\rm cond}=3\times10^{-6}\). Yet the allowed constant \(W_0\)
gives

\[
\begin{array}{c|ccc}
W_0&0&-W_{\rm cond}&+W_{\rm cond}\\\hline
m_{3/2}&3\times10^{-6}&0&6\times10^{-6}\\
\Lambda_{\rm grav}&-2.7\times10^{-11}&0&-1.08\times10^{-10}
\end{array}
\]

with the same condensate in every column. Kähler data, the gauge kinetic
function, supersymmetry breaking and uplift add further freedom. Therefore
\(\ell^{-1}\sim\Lambda_{\rm SYM}^3/M_{\rm Pl}^2\) is a conditional model
ansatz, not a prediction of Spin(2,3), and it does not identify the hidden
supersymmetric scale with ordinary \(\Lambda_{\rm QCD}\).

## Exact boundary of the result

Supersymmetry and holomorphy protect:

- the Witten index and hence vacuum multiplicity under index-preserving deformations;
- condensate phases, anomaly matching and the \(N\)-branch structure;
- holomorphic superpotential data and, where applicable, BPS central charges;
- the AdS supermultiplet relation \(m_{3/2}=\ell^{-1}\) in an unbroken supergravity vacuum.

They do not protect:

- a positive numerical lower bound on the physical non-BPS spectrum;
- the Kähler metric or full spectral density;
- uniform control from small soft mass to the pure-YM decoupling limit;
- constructive existence, reflection positivity or infinite-volume clustering;
- the superpotential constant, uplift or cosmological vacuum energy;
- an identification of a hidden SYM scale, \(\Lambda_{\rm QCD}\), and the Spin(2,3) radius.

The route would reopen only with at least one genuinely new result: a uniform
positive spectral bound valid along the complete soft path; a constructive
continuum theorem transporting it to pure Yang--Mills; or a UV principle that
fixes the gauge coupling, Kähler data, \(W_0\), supersymmetry-breaking sector
and embedding simultaneously. No existing protected SUSY datum supplies any
of these.

## Primary sources

- E. Witten, [*Constraints on Supersymmetry Breaking*](https://doi.org/10.1016/0550-3213(82)90071-2), *Nucl. Phys. B* **202** (1982) 253.
- G. Veneziano and S. Yankielowicz, [*An Effective Lagrangian for the Pure N=1 Supersymmetric Yang-Mills Theory*](https://doi.org/10.1016/0370-2693(82)90828-0), *Phys. Lett. B* **113** (1982) 231.
- G. R. Farrar, G. Gabadadze and M. Schwetz, [*The Spectrum of Softly Broken N=1 Supersymmetric Yang-Mills Theory*](https://arxiv.org/abs/hep-th/9806204).
- O. Aharony, E. Schreiber and J. Sonnenschein, [*Stable Non-Supersymmetric Supergravity Solutions from Deformations of the Maldacena-Nunez Background*](https://arxiv.org/abs/hep-th/0201224), including the controlled-small-deformation limitation.
- P. Salgado, M. Cataldo and S. del Campo, [*Supergravity with cosmological constant and the AdS group*](https://arxiv.org/abs/hep-th/0305004), for the \(OSp(1|4)\) extension of the AdS gauge construction.
