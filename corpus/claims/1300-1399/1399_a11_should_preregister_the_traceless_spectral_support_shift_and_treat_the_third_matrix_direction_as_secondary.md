# A11 should preregister the traceless spectral-support shift and treat the third matrix direction as secondary

**Date:** 20 October 2026  
**Status:** corrected preregistration with synthetic null, positive and power certificates; no physical data or protected-sector implementation  
**Protocol:** A11-Z3-TRACELESS-SUPPORT-PREREG-2

## Result in one sentence

A11's primary endpoint is now the positive spectral support and onset of the
traceless stress \(S=T_{xx}-T_{yy}\), or its calibrated differential two-port
analogue, because that observable survives scalar improvement and local contacts;
the signed third \(H_2\) matrix direction is retained only as a secondary endpoint
after \(\xi_\chi\) and the common trace/traceless port map are frozen, while an
Aharonov--Casher device tests continuous holonomy and a protected-\(\mathbb Z_3\)
platform additionally tests the required sector semantics.

## 1. Why the protocol must change

The first A11 protocol, result 1222, treated a holonomy-correlated third matrix
direction as primary. Results 1393 and 1396 found a precise failure of that choice:
the orientation-odd matrix component is a trace--traceless cross response, and the
allowed curvature improvement

\[
\xi_\chi R|\chi|^2
\]

changes the trace vertex. One allowed value of \(\xi_\chi\) sets the integrated
third direction to zero without changing positivity or the mode spectrum.

The traceless vertex is different:

\[
v_S=v_x-v_y={K_x-K_y\over E}.
\]

The common improvement cancels. Real local polynomial contacts have no
separated-frequency absorptive discontinuity. The lowest visible traceless
spectral support is therefore the correct scheme-robust primary observable.

This is a demotion, not a deletion, of the old endpoint. Once the missing trace
normalization is supplied, the full signed matrix remains informative.

## 2. Everyday picture

Imagine listening to two identical bells mounted along perpendicular axes. Adding
the same calibration offset to both microphones changes their average, but not
their difference.

The old test asked whether the complete two-microphone pattern pointed out of a
chosen plane. That answer depended on the common offset. The corrected test first
asks a simpler question: at what pitch does the difference microphone begin to
absorb energy, and does that pitch move when the holonomy is changed?

Only after the common microphone calibration is known do we use the full signed
pattern.

## 3. Primary spectral channel

For physical stress probes define

\[
S=T_{xx}-T_{yy}.
\]

For a passive two-port device with dissipative response

\[
C_h(\omega)={Y_h(\omega)+Y_h^\dagger(\omega)\over2}\succeq0,
\]

use the calibrated differential covector

\[
s={1\over\sqrt2}(1,-1),
\qquad
\rho_{S,h}(\omega)=s^TC_h(\omega)s\ge0.
\]

The hardware quantity is an operational analogue of traceless stress. It is a
literal stress observable only if the two ports are independently shown to be the
two metric/strain sources.

Under one common nonsingular port recalibration

\[
C\mapsto ACA^T,
\qquad s\mapsto A^{-T}s,
\]

the scalar \(s^TCs\) is invariant. The physical differential covector must be
calibrated before sector labels are revealed and then held fixed.

## 4. Support, onset and band contrasts

For sector \(h\in\{0,1,2\}\), define \(\Omega_h\) as the first independent
frequency-resolution element whose uncertainty-aware spectral weight exceeds a
frozen detection floor. “Independent” means separated by at least one measured
response width; oversampling one line does not create several discoveries.

The onset contrast is

\[
\boxed{
\Delta_\Omega=\Omega_0-{\Omega_1+\Omega_2\over2}.}
\]

For a preregistered band \(B\), define

\[
W_h(B)=\int_B\rho_{S,h}(\omega)\,d\omega
\]

and

\[
\boxed{
\Delta_W(B)={W_1(B)+W_2(B)\over2}-W_0(B).}
\]

A sector-independent spectral background or contact contribution cancels in
\(\Delta_W\). CP invariance predicts agreement of \(h=1\) and \(h=2\); averaging
them increases power but does not turn their continuous preparation into protected
sectors.

For the Gaussian reader fixture, the frozen prediction is

\[
\Omega_0=2.56124969,
\qquad
\Omega_1=\Omega_2=1.74426461,
\]

so

\[
\Delta_\Omega=0.81698508.
\]

The natural support window is therefore

\[
B=(1.74426461,2.56124969),
\]

split before unblinding into at least two independent resolution subbands. These
numbers belong to the toy parameters \(N=6,M=0.8\); a physical experiment must
replace them with its microscopic prediction and measured resolution.

## 5. Required validity controls

A run is interpretable only when:

1. the full dissipative matrix is positive semidefinite and \(\rho_S\ge0\) within
   uncertainty in every retained bin;
2. source/port definitions, gain, phase, contact prescription, frequency grid,
   environment and material state have identical hashes in all sectors;
3. sector order is randomized and repeated in forward and reverse order;
4. a sham preparation leaves the holonomy unchanged;
5. sector-independent background estimation is performed label blind;
6. temperature, drive amplitude and geometry are matched;
7. \(h=1\) and \(h=2\) agree within the frozen CP-even tolerance, unless a
   CP-odd microscopic term was preregistered;
8. at least two independent subbands and two independent replications are used;
9. the full pipeline passes a held-out null fixture and an independent
   implementation or experimental replication.

Changing the window, onset rule, linewidth model or differential port after seeing
sector labels invalidates the primary analysis.

## 6. Corrected advance rule

An **operational A11 advance** requires all validity controls and:

1. a positive familywise-corrected lower bound on \(\Delta_W\) in at least two
   preregistered independent subbands;
2. a positive lower bound on \(\Delta_\Omega\) above the instrumental resolution
   floor;
3. repetition of both statements in two independent replications;
4. null sham, reversed-order, background and common-calibration controls.

This establishes holonomy-correlated spectral support in a scheme-robust
differential channel. It does not yet identify Spin(2,3) as the cause.

A **Spin(2,3)-programme advance** additionally requires:

1. a microscopic defect action that predicted the same window, onset ordering and
   sector dependence without fitting the labelled response; and
2. protected \(\mathbb Z_3\) sector semantics, rather than three samples from a
   continuous phase dial.

Even this would advance the proposed mechanism, not prove that the complete
universe has dynamical \(Spin(2,3)\) symmetry.

## 7. Corrected null and powered-null logic

The primary null is not “the matrix span is at most two.” It is:

\[
H_0:\quad
\Delta_W(B)\le a_{\min}
\quad\text{or}\quad
\Delta_\Omega\le\Delta_{\min}
\]

for the microscopic model's frozen minimum effects, after nuisance and resolution
allowances.

A **powered null** may be declared only when:

- the achieved run covariance and sample count certify at least 90% joint power
  for both the minimum band excess and onset separation;
- two independent implementations put upper bounds below at least one required
  model-predicted primary effect throughout the frozen window;
- all validity controls pass.

If a model requires both support excess and onset separation, excluding either one
falsifies that realization. A valid result meeting neither the advance nor the
powered-null rule is **inconclusive**. “Not significant” is not a powered null.

A powered null on the Aharonov--Casher platform rules out that continuous-holonomy
reader implementation in the tested window. A powered null in a verified protected
\(\mathbb Z_3\) platform is stronger, but still rules out the specified reader,
coupling and frequency window—not every possible Spin(2,3) construction.

## 8. Updated power calculation

Let a normalized band contrast have target amplitude \(a\), single-run standard
deviation \(\sigma\), nuisance retention \(r\), worst-case bias \(b\), and \(n\)
runs in each of the three sectors. For independent equal-variance sector means,

\[
\operatorname{Var}\!\left[{\bar W_1+\bar W_2\over2}-\bar W_0\right]
={3\sigma^2\over2n}.
\]

For \(B\) preregistered subbands, a one-sided Bonferroni test and per-event power
\(1-\beta_e\) require

\[
\boxed{
n\ge
{3\sigma^2\left[z_{1-\alpha_{\rm FW}/B}+z_{1-\beta_e}\right]^2
\over2[ra-b]_+^2}.}
\]

There are four required pass events for two subbands and two replications. Assigning
the total 10% miss probability by the union bound gives per-event power \(0.975\).

For the synthetic planning values

\[
a=0.01,\quad\sigma=0.02,\quad r=0.85,\quad b=0.001,
\quad B=8,\quad\alpha_{\rm FW}=0.01,
\]

the verifier obtains

\[
n=265
\]

runs per sector per replication, or \(1590\) sector-runs across two replications.
This is a synthetic noise budget, not a physical signal estimate or feasibility
claim.

The analytic count covers the band contrast. Onset-separation power must be
certified separately using the frozen physical lineshape, damping and frequency
resolution. The full protocol is powered only when both budgets pass.

## 9. Secondary signed matrix endpoint

The old quantities—full response-span rank, plane residual and
\(A_\perp\)—remain secondary. They are admissible only if, before unblinding:

1. \(\xi_\chi\) is fixed by microscopic matching or one operational trace-stress
   renormalization condition;
2. one nonsingular common map from laboratory ports to trace/traceless metric
   sources is calibrated;
3. the \(G_2,G_0\) plane is frozen from theory or independent training data;
4. the original positivity, sham, contact and replication controls pass.

A secondary pass adds signed orientation information. A secondary failure does not
erase a primary support advance, because an allowed improvement can erase the
matrix direction. Conversely, a secondary pass cannot override a powered primary
null or rescue a protocol whose \(\xi_\chi\) and port map were fitted after
unblinding.

## 10. Mapping to the Aharonov--Casher platform

The near-term device of result 1230 is a two-path fluxon or phase-slip
interferometer enclosing a gate-controlled island. Its phase is

\[
W_{\rm AC}=e^{i2\pi n_g},
\]

sampled at

\[
n_g=0,{1\over3},{2\over3}.
\]

The primary measurement becomes the differential dissipative two-port spectrum
and its first verified resonance or support. The two nontrivial samples are
averaged for the CP-even contrast.

Decisive controls are:

- disable one coherent path, which must erase Aharonov--Casher interference;
- use a dummy gate matched for electrostatic loading but not enclosed charge;
- reverse and randomize the gate sweep;
- monitor offset-charge drift and quasiparticle-parity jumps;
- hold magnetic flux, temperature and microwave power fixed;
- use one common pre/post port calibration.

This is a topology-class-1 experiment: it samples three points of a continuous
\(U(1)\) holonomy. Passing the corrected primary endpoint would be valuable evidence
for a holonomy-sensitive reader and a strong apparatus validation. It is not
evidence for protected \(\mathbb Z_3\) order.

## 11. Mapping to a protected-\(\mathbb Z_3\) platform

The long-horizon platform uses verified clock sectors

\[
W|m\rangle=\omega^m|m\rangle,
\qquad
\omega=e^{2\pi i/3},
\qquad
X|m\rangle=|m+1\pmod3\rangle.
\]

The same differential positive spectrum and onset estimator are measured after
preparing \(|0\rangle,|1\rangle,|2\rangle\) with a validated nonlocal increment or
string operation. The experiment must additionally verify:

- \(W^3=I\) and all three eigenvalues in one admitted low-energy space;
- resistance to local perturbations;
- decreasing sector mixing/splitting with domain-wall separation or code size;
- \(2\pi\) branch permutation and \(6\pi\) fixed-sector return where predicted;
- poisoning lifetime longer than preparation plus response acquisition;
- rejection of ordinary Josephson periodicity, Landau--Zener mimics and local
  subgap resonances.

The scalar toy's numerical threshold window must not be copied into this device.
Its microscopic parafermion/discrete-gauge Hamiltonian and actual port operator
must predict the relevant support window and minimum effect first.

Only this topology-class-2 route can attach the primary spectral result to genuine
protected \(\mathbb Z_3\) sector semantics.

## 12. Synthetic certificate

The verifier constructs positive two-port spectral matrices with a common
background. In the null fixture every sector has identical differential support,
and the maximum contrast is exactly zero.

In the positive fixture the two nontrivial sectors have excess weights inside two
subbands of the toy threshold window. Their integrated contrasts are

\[
0.18\quad\text{and}\quad0.16.
\]

A sector-independent contact matrix cancels to
\(2.8\times10^{-17}\). A common nonsingular recalibration, accompanied by the
contragredient transformation of the physical differential covector, preserves
the observable to \(5.6\times10^{-17}\). The \(h=1,2\) spectra agree exactly.

This proves that the corrected analysis distinguishes its declared synthetic null
and positive fixtures. It supplies no physical evidence.

## 13. Final A11 verdict

The corrected hierarchy is:

\[
\boxed{
\begin{array}{ll}
\text{Primary:}&\text{traceless/differential spectral support and onset contrast;}\\
\text{Secondary:}&\text{signed third matrix direction after }\xi_\chi\text{ and port matching;}\\
\text{Near platform:}&\text{continuous-}U(1)\text{ Aharonov--Casher mechanism test;}\\
\text{Target platform:}&\text{verified protected-}\mathbb Z_3\text{ sector test.}
\end{array}}
\]

A11 remains unpassed because there are no physical data, no predicted physical
amplitude and no demonstrated protected platform inside the programme. The test is
now harder to fool: its primary endpoint survives the normalization ambiguity that
invalidated the old hierarchy.

## Artifacts

- `evidence/data/spin23-a11-corrected-traceless-threshold-protocol.json`
- `verification/verify/verify_spin23_a11_corrected_traceless_threshold_protocol.mjs`
- `corpus/claims/1300-1399/1393_the_full_scalar_stress_preserves_a_traceless_holonomy_threshold_but_not_a_scheme_invariant_third_matrix_direction.md`
- `corpus/claims/1300-1399/1396_no_current_principle_predicts_the_reader_curvature_coupling_so_only_the_traceless_threshold_is_scheme_robust.md`
- `corpus/claims/1200-1299/1230_the_nearest_a11_experiment_is_an_aharonov_casher_two_port_while_protected_z3_requires_verified_sector_algebra_and_scaling.md`

