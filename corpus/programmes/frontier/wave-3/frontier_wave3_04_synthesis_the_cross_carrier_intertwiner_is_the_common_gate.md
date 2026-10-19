# Frontier wave 3 synthesis: the cross-carrier intertwiner is the common gate

**Date:** 18 October 2026  
**Parent:** [Wave 3 programme](frontier_wave3_00_operational_provenance_uv_programme.md)  
**Status:** wave complete; one operational construction, two independent scoped no-go results, one sharply defined reopening

## Verdict

Wave 3 asked whether measurement, the full finite geometry, or the smallest ultraviolet completion could choose the physical point left free by wave 2.

The answer is now precise:

1. **Measurement can determine the calibrated two-face response.** Four coherent intensity settings reconstruct a general response in (H_2(\mathbb C)); three suffice on a separately verified real slice.
2. **The presently represented Furey data do not orient the exceptional safe plane.** Their joint commutant contains (U(3)), which acts transitively on the full (\mathbb{CP}^2) projector family.
3. **Anomaly completion does not correlate the incidence ray with that plane.** Anomalies see charges and multiplicities, not eigenvectors in the mediator-copy space. A symmetry can protect an already supplied projector, but cannot discover it.

The two negative results are not merely similar. They identify the same missing typed object:

\[
\boxed{
T\text{ or }Y_F:\mathcal H_{\rm source}\longrightarrow W_{\rm mediator},
\qquad
K_W=Y_F^\dagger G_FY_F\not\propto I_3.
}
\]

It must be derived independently, select the source ray and the safe/danger orientation without fitted coefficients, and remain stable under every allowed counterterm and heavy threshold.

## 1. Operational closure is exact but conditional on realizable probes

For calibrated amplitudes

\[
A=(A_L,A_R)^T,
\qquad G=AA^\dagger,
\]

the settings

\[
L,\quad R,\quad L+R,\quad L+iR
\]

have rank four on (H_2(\mathbb C)). They determine the two diagonal intensities and both quadratures of the off-diagonal coherence. A common phase of (A) remains physically irrelevant. On a verified CP-real slice, (L,R,L+R) are rank complete.

This separates three claims that had previously been easy to blur:

- pure rates determine magnitudes only;
- real interference determines relative sign;
- quadrature interference determines a general relative phase.

For the restricted two-ray incidence fork, full tomography is unnecessary. A calibrated charged-lepton/top magnitude ratio separates the bare hypotheses by a factor four in rate. In the declared ALP benchmark, running and extra widths reduce the lifetime separation to about (2.76), while rare-kaon production is practically unchanged. Present upper limits do not choose a ray because the overall scale and nuisance couplings remain free.

The preregisterable low-mass signal vector is

\[
\left(m_a,\operatorname{BR}(K\to\pi a),c\tau_a,
\operatorname{BR}(a\to\ell\ell)\right),
\]

with gauge, flavour, matching and hidden-width nuisances profiled. This is a real experimental target, not a source-free prediction.

## 2. Finite-geometry provenance stops at a transitive commutant

On the minimal common carrier, all currently established Furey-side operators act as

\[
T_F\otimes I_3.
\]

Their joint commutant therefore contains (I\otimes U(3)). Since

\[
U(3)/(U(2)\times U(1))\cong\mathbb{CP}^2,
\]

the commutant moves any rank-two safe projector to any other. KO-six conjugate pairing leaves the full family; the stronger added constraint (P=\bar P) still leaves (\mathbb{RP}^2). Even transporting one safe electron line leaves (\mathbb{CP}^1), or (\mathbb{RP}^1) in the real restriction.

Once the danger covector

\[
q_{QQ}=(1,1,1)
\]

is imported, the positive functional

\[
F_{QQ}(P)=\operatorname{Tr}(A_{QQ}P)
\]

has the unique zero

\[
P_{QQ}=I-\frac{q_{QQ}^\dagger q_{QQ}}{q_{QQ}q_{QQ}^\dagger}.
\]

That proves source-level uniqueness, but not Furey provenance: the selection enters exactly with the imported covector.

## 3. Ultraviolet completion is orientation-blind

Both current rays are locally anomalous if promoted to a bare (U(1)_X). A Stückelberg/Green--Schwarz effective completion can cancel either anomaly polynomial and therefore selects neither. With one shifting phase the phase is eaten; a physical ALP requires another phase and hence another mixing datum.

More generally, for

\[
X_W=x_sP+x_d(1-P),
\]

all anomaly invariants depend only on

\[
\operatorname{Tr}(X_W^n)=2x_s^n+x_d^n.
\]

They are constant under (P\mapsto UPU^\dagger). Thus anomaly cancellation cannot see the point of (\mathbb{CP}^2).

The counterterm audit gives a strict dichotomy:

- if all mediator copies have the same character, generic allowed Hermitian counterterms rotate the plane and regenerate safe/danger propagation;
- if safe and danger receive distinct characters, the plane is protected, but its orientation was already inserted into the generator.

Replacing (\mathbb C\oplus\mathbb C) by (M_2(\mathbb C)\oplus\mathbb C) fixes abstract block dimensions, not their relative embedding in the external Clebsch frame.

## 4. Unified gate

The three wave-2 freedoms now reduce to one typed diagram:

\[
\begin{array}{ccc}
\mathcal H_{\rm source} & \xrightarrow{\;T\;} & W_{\rm mediator}\\[2mm]
\downarrow\text{ calibrated probes} && \downarrow\text{ spectral projector}\\[2mm]
H_2(\mathbb C) & \longleftarrow & K_W=T^\dagger G T.
\end{array}
\]

A successful bridge must pass all of the following gates:

1. **provenance:** (T) follows from an already independent Jordan, Furey, finite-Dirac or action construction;
2. **non-scalarity:** (K_W\not\propto I_3);
3. **orientation:** its simple eigenspace is the (QQ) danger line and its complement is the retained safe plane;
4. **ray selection:** the same construction chooses one incidence ray without a ray-specific fitted coefficient;
5. **protection:** every allowed counterterm, represented one-form and heavy threshold preserves the selected spectral split;
6. **operationality:** the resulting calibrated products enter a rank-complete or explicitly restricted measurement protocol.

Failing any one gate means the construction realizes a benchmark but does not derive the physical selector.

## 5. Stop-everything criterion

The programme should stop and reorganize around a result if an explicit (T) passes gates 1--5 and predicts a nondegenerate observable in gate 6. That would simultaneously:

- break the (U(3)) transitivity of the finite-geometry commutant;
- correlate a Standard-Model current direction with the exceptional mediator basis;
- convert the protected projector from inserted superselection data into a derived spectral object;
- turn the two-ray ALP comparison into a no-refit prediction or a finite list of predictions.

Conversely, a proof that every admissible cross-carrier Gram operator is scalar would close the internal selector programme at this rung. The surviving work would then be calibrated phenomenology rather than a derivation from (Spin(2,3)), Jordan or Furey structure.

## 6. Branch disposition

| Branch | Result | Disposition |
|---|---|---|
| two-face tomography | exact rank-four complex and rank-three real protocols | retain; awaits a realizable coherent source |
| two-ray ALP discriminator | explicit signal-level observable set; present limits insufficient | retain as calibrated benchmark |
| Furey projector provenance | (U(3)) acts transitively on (\mathbb{CP}^2) | pin until a non-scalar cross-carrier map exists |
| anomaly-completed UV source | both rays complete; anomalies are orientation-blind | close as a selector route |
| one-spurion protection | protects only a supplied orientation | close as a derivation route |
| larger abstract finite block | fixes ranks but not relative embedding | pin until a derived cross-map exists |
| cross-carrier operator (T) | not yet constructed or excluded | only live internal reopening |

## Evidence

- [Operational tomography and incidence preregistration](frontier_wave3_operational_01_minimum_tomography_and_incidence_preregistration.md)
- [Finite-geometry commutant audit](frontier_wave3_provenance_01_furey_data_leave_the_safe_projector_transitive.md)
- [Unique (QQ)-kernel functional and provenance boundary](frontier_wave3_provenance_02_the_QQ_functional_is_unique_but_not_furey_derived.md)
- [UV completion and orientation no-go](frontier_wave3_uv_01_anomaly_completion_orientation_no_go.md)

## Claimipedia status

The typed claim manifests contain 105 candidates after wave 3: 42 QFT/operational, 15 topology, 20 Kantor/Freudenthal and 28 exceptional/provenance/UV claims. They are prepared for Triage with their epistemic states preserved. The current Sourcery composer is proposal-only: it can produce review candidates and rejection receipts, but it cannot grant empirical authority or automatically admit claims to the Claimipedia corpus.
