# Dynatology 00: Ontology and Scope

**Date:** 24 October 2026  
**Status:** canonical investigation ontology; not a physical theory or claim of new mathematics

## Definition

Dynatology is the study of structured possibility under admissibility, transformation, realization and observation.

Its minimal object is

\[
\boxed{
\mathfrak D=(X,A,T,J,\rho,L,D,I,R).
}
\]

| Symbol | Role | Governing question |
|---|---|---|
| \(X\) | ambient carrier or possibility space | What alternatives are represented? |
| \(A\subseteq X\) | admissible region or admissibility predicate | Which alternatives satisfy the declared physical constraints? |
| \(T\) | allowed transformations, controls or interventions | Which admissible states can be connected? |
| \(J\) | objective, order, action or selection functional | Why is one admissible outcome preferred? |
| \(\rho\) | realization, restriction or quotient map | What becomes the effective physical carrier? |
| \(L\) | dynamics on the realized carrier | How does the realized state evolve? |
| \(D\) | detector, record or observational interface | Which distinctions are empirically available? |
| \(I\) | invariants, scars and recovery data | What survives or reveals the discarded alternatives? |
| \(R\) | scale and composition maps | Does the construction persist when systems or resolutions change? |

Not every investigation has every component. A missing component must be marked **undefined**, **open** or **not applicable**, never silently replaced by zero.

## The nine questions

The tuple produces a fixed sequence:

\[
\begin{aligned}
&\textbf{possibility:} &&x\in X?\\
&\textbf{admissibility:} &&x\in A?\\
&\textbf{reachability:} &&x\xrightarrow{T}y?\\
&\textbf{selection:} &&J(y)\preceq J(z)?\\
&\textbf{realization:} &&\rho(x)=\bar x?\\
&\textbf{dynamics:} &&\dot{\bar x}=L(\bar x)?\\
&\textbf{observation:} &&r\sim D(\bar x)?\\
&\textbf{recovery:} &&I(r)\text{ distinguishes fibers of }\rho?\\
&\textbf{composition:} &&R_{23}R_{12}\simeq R_{13}?
\end{aligned}
\]

These questions define different proof obligations.

## Four nested regions

The ontology distinguishes four commonly conflated sets:

\[
X_{\rm possible}
\supseteq
A_{\rm admissible}
\supseteq
V_{\rm viable}
\supseteq
Q_{\rm reachable}.
\]

- **Possible** means represented in the declared carrier.
- **Admissible** means consistent with stated algebraic, causal, positive, gauge, boundary and resource constraints.
- **Viable** means at least one allowed evolution remains admissible over the required duration.
- **Reachable** means an allowed control or endogenous trajectory actually connects the initial condition to the target.

An optimum outside \(Q_{\rm reachable}\) is not a physical selection. A reachable state outside \(A_{\rm admissible}\) is not a valid realization.

## Selection is not assumed

Writing physics as an optimization problem is meaningful only when \(J\) has provenance. It may arise from:

- an action or free energy;
- a stability or spectral criterion;
- entropy production or thermodynamic work;
- inference or control cost;
- boundary consistency;
- a variational principle; or
- a partial order rather than a scalar objective.

Admissibility alone supplies a feasible region, not its preferred point. Symmetry alone supplies an orbit, not its selected representative. If no physical \(J\) or selection dynamics is known, the selection coordinate remains open.

## Realization and observation are distinct quotients

The physical reduction \(\rho\) and detector map \(D\) need not coincide:

\[
X\xrightarrow{\rho}\bar X\xrightarrow{D}\mathcal R.
\]

A detector can impose an observational quotient even when the microscopic carrier remains resolved. Consequently:

\[
\text{observed symmetry}\not\Rightarrow\text{microscopic symmetry},
\qquad
\text{observed Markovianity}\not\Rightarrow\text{microscopic Markovianity}.
\]

This distinction is central to the [quotient-scar calculus](../frontier/wave-7/frontier_wave7_00_quotient_scar_calculus.md).

For a directed typed relation set, the free realization prior to quotient is
the typed two-rail carrier

\[
X_{\rm rel}=\mathbb R^V\otimes\mathbb R^{\{S,T\}}
\otimes\mathbb R^{\mathcal T}.
\]

Its positive Gram kernel retains source, target and type. The map identifying
the two rails and summing the type channels is a concrete realization quotient
\(\rho_{\rm support}\); it produces the ordinary Laplacian and may erase
direction and semantic type before any detector acts. Dynatology must therefore
allow realization loss and detector loss to occur at different stages.

## Dynatological defects

The programme tracks failures of expected commutation:

### Dynamical closure defect

\[
\Omega_L=\rho L-L_{\rm eff}\rho.
\]

When \(\Omega_L\neq0\), hidden elimination generally produces memory, fluctuating forces or initial-condition dependence.

### Observational sufficiency defect

Distinct states \(x,y\) are detector-equivalent when their record laws agree:

\[
D_\*P_x=D_\*P_y.
\]

This is a limitation of the declared experiment, not evidence that \(x=y\).

### Composition defect

\[
\Omega_R=R_{23}R_{12}-R_{13}.
\]

Its interpretation is carrier-specific: it may measure path-dependent coarse-graining, fitted basis drift, hysteresis or a genuine anomaly.

### Selection defect

If the optimum of \(J\) is an orbit or manifold rather than a point, the proposed selector is incomplete. A second relational datum may reduce the degeneracy; it must not be smuggled into the objective after the fact.

## Relationship to the exceptional ambient picture

The corpus may use \(E_8\), the magic square, Jordan algebras, Freudenthal systems and related representation structures as ambient architectures for \(X\). Dynatology does not promote that availability into a physical background claim.

The physical burden remains the complete descent:

\[
X_{\rm exceptional}
\to A
\to \bar X_{\rm physical}
\to L
\to D
\to\text{records}.
\]

Every arrow must specify its carrier, action, normalization and evidence.

## One-line doctrine

> Physics describes realized processes; dynatology audits the structured passage from possibility to realization and the evidence left by alternatives.

