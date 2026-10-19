# The A4 physical-state gate blocks the typed action but rejects only the naive two-time reading

**Status:** exact information-deficit certificate plus conditional quadratic-subsector audit  
**Date:** 19 October 2026  
**Machine-readable certificate:** `data/spin23-a4-physical-state-audit.json`  
**Verifier:** `scripts/verify_spin23_a4_physical_state_audit.mjs`

## Result

The physical-state gate A4 does **not** pass. It also does not yet fail for the displayed four-dimensional effective theory. Its correct status is **blocked**.

The reason is sharper than “more work is needed.” The candidate action in document 1199 is a typed inventory of terms, not a complete gauge-fixed quadratic functional. It omits numerical kinetic coefficients, a selected stationary vacuum, the complete potential, the constraint complex, boundary operator domains and physical pole residues. There are both healthy and ghostly choices consistent with that inventory. Consequently no derivation from the present input can decide the sign of the full physical Hilbert space.

One branch can already be rejected. If (Spin(2,3)) is read literally as the geometry of a five-dimensional spacetime with two independently physical times, the unconstrained free-scalar sector contains tachyonic four-dimensional modes and lacks the ordinary one-time Cauchy structure. By contrast, if (Spin_0(2,3)) is the conformal geometry of an (H_2(\mathbb R)) response cone, it introduces no additional time coordinate and therefore no (Spin(2,3))-specific propagating ghost.

The present result is therefore

\[
\boxed{
\text{reject naive literal two-time spacetime; retain response geometry; keep A4 blocked.}
}
\]

## 1. The two meanings must not be mixed

### 1.1 Literal spacetime meaning

Take a metric with two timelike coordinates,

\[
ds^2=-dt_1^2+d\mathbf x^2-dt_2^2.
\]

For a scalar of mass (m), a mode

\[
\Phi(t_1,\mathbf x,t_2)=\phi(t_1,\mathbf x)e^{i\omega_2t_2}
\]

appears in (3+1) dimensions with

\[
m_{\rm eff}^2=m^2-\omega_2^2.
\]

Every mode with (\omega_2^2>m^2) is tachyonic. More basically, an ultrahyperbolic equation with two independent time directions does not inherit the usual freely specifiable data on a codimension-one spatial surface. Compactifying the second time does not cure this: it discretizes the dangerous values of (\omega_2).

This is a minimal falsifier of the **unconstrained** literal reading, not a theorem against every theory using a ((2,3)) ambient form. A repair would need a closed first-class constraint or gauge symmetry whose physical cohomology removes every nonzero second-time momentum mode, followed by a proof of positive norm, lower-bounded energy and a well-posed (3+1) initial-value problem. The current action contains no such structure.

### 1.2 Response-geometry meaning

The positive matrices

\[
C=\begin{pmatrix}C_{11}&C_{12}\\C_{12}&C_{22}\end{pmatrix}\succeq0
\]

form the Jordan cone (H_2(\mathbb R)_+). Its conformal completion is locally (Spin_0(2,3)). Here the two entries label two measured response channels; they are not two spacetime times. The group acts on the geometry of possible responses, rather as coordinate transformations act on a chart of admissible instrument readings.

This interpretation has no extra-time ghost burden. It does **not** prove that the microscopic theory is unitary: spectral positivity is an input to the response theorem, so it cannot be used circularly to establish microscopic positivity.

## 2. Exact information-deficit theorem

Let (S_{\rm v1}) denote the displayed action. A physical-state proof requires at least:

1. a stationary background;
2. the second variation (\delta^2S_{\rm v1}) at that background;
3. gauge-fixing data and ghosts, or the full Dirac constraint algebra;
4. the physical BRST/constraint cohomology;
5. the domains of all differential operators at boundaries and defects;
6. the poles and residues of gauge-invariant propagators.

Those data are absent. This is not merely a missing numerical substitution. The displayed term inventory has inequivalent healthy and unhealthy completions.

For example, in the normalization

\[
\mathcal L_{\rm kin}=-\frac{B_Y^2}{4g_Y^2}
-\frac{f_X^2}{4e_X^2}-\frac\chi2 f_XB_Y,
\]

the two Abelian field strengths have kinetic matrix

\[
K=\begin{pmatrix}
g_Y^{-2}&\chi\\
\chi&e_X^{-2}
\end{pmatrix}.
\]

Sylvester's criterion gives the exact ghost-free condition

\[
g_Y^2>0,\qquad e_X^2>0,\qquad
\chi^2<\frac1{g_Y^2e_X^2}.
\]

At (g_Y=e_X=1), the allowed-looking choice (\chi=0.2) has eigenvalues (0.8,1.2), while (\chi=1.2) has eigenvalues (-0.2,2.2). Both have the same displayed list of action terms. The list therefore cannot decide A4.

Boundary data create a second independent deficit. On the half-line, the same differential expression (-d^2/dx^2) is nonnegative with Dirichlet data, while the self-adjoint Robin condition

\[
\psi'(0)=-\kappa\psi(0),\qquad \kappa>0,
\]

admits (\psi=e^{-\kappa x}) with eigenvalue (-\kappa^2). Thus even the word “self-adjoint” is insufficient: the domain and lower bound must both be proved.

## 3. Maximal audit of the declared quadratic subsector

### 3.1 Standard Model baseline

The ordinary Standard Model can be taken as a BRST-positive baseline. This is inherited input, not a result derived by the candidate. Gauge-fixing ghosts are bookkeeping fields in the cohomological construction and are not observable negative-energy particles.

### 3.2 Abelian gauge fields

The (U(1)_Y\)-(U(1)_X) kinetic block conditionally passes precisely in the positive region above. The charge-three scalar then gives one vector a nonnegative Higgs mass provided its scalar kinetic coefficient is positive. The candidate supplies neither a parameter point nor an RG proof that the inequality remains valid to its cutoff.

### 3.3 Charge-three flavon

For

\[
V_s=-\mu_s^2|s|^2+\lambda_s|s|^4,
\qquad
s=\frac{v+\rho}{\sqrt2}e^{i\theta},
\]

the broken stationary point obeys

\[
v^2=\frac{\mu_s^2}{\lambda_s},
\qquad
m_\rho^2=2\mu_s^2.
\]

This radial subsector conditionally passes when (\mu_s^2>0), (\lambda_s>0), and the scalar kinetic coefficient has the conventional sign. Higgs-flavon mixing cannot be certified until the complete two-field potential and its vacuum are supplied.

### 3.4 Projector modes

The (\mathbb{CP}^2) tangent kinetic metric is positive when (f_P^2>0). Its mass matrix is the constrained cross-Peirce Hessian of (V_{\rm resp}). Since the tensors (H_a), their coefficients and the selected stationary projector are not derived, the projector sector is kinetic-conditional but potential-blocked.

### 3.5 BF bulk and defect

Pure compact four-dimensional BF theory has no local propagating bulk oscillators. Therefore it has no perturbative bulk kinetic ghost to count. That is narrower than Hilbert-space positivity.

With a boundary or defect, the variational principle leaves a boundary symplectic problem. The claimed nine topological states on spatial (T^2) require the compact level-three reduction, a real star structure, gauge-invariant boundary conditions and unitary quantization. None follows solely from writing (3c\wedge da/(2\pi)). Charged defect matter must also be shown to be gapped. This sector is bulk-safe but boundary-blocked.

### 3.6 (H_2(\mathbb R)) response

Document 206 proves that a conserved positive spectral kernel yields a positive two-probe response. This is an exact theorem. It is downstream of physical-state positivity and cannot discharge A4: assuming a positive spectrum and then recovering a positive response is a consistency map, not a ghost audit.

## 4. A4 verdict

| Question | Verdict |
|---|---|
| Does the present candidate prove a positive physical Hilbert space? | No |
| Does it prove a ghost? | No, not for the four-dimensional EFT |
| Does the naive literal two-time scalar realization survive? | No |
| Does response-space (Spin(2,3)) add a second physical time? | No |
| Is there a nonempty conditionally healthy (U(1)_X\)-flavon region? | Yes |
| Are boundary/defect positivity and projector stability established? | No |
| A4 status | **Blocked** |

The smallest stop-everything falsifier is any one of:

- a gauge-invariant physical pole with negative residue;
- an unavoidable negative-norm class in the physical cohomology;
- a negative eigenvalue of the constrained vacuum Hessian that cannot be moved above zero without destroying the proposed phase;
- a boundary Hamiltonian unbounded below;
- a surviving physical mode with (\omega_2^2>m^2) in a literal second-time realization.

## 5. Minimal repair packet

The next candidate action should provide one finite, reproducible packet:

1. explicitly declare (H_2(\mathbb R)/Spin_0(2,3)) to be response geometry unless an extra-time constraint theory is actually supplied;
2. choose a vacuum and state every sign convention and coefficient;
3. print the complete bosonic quadratic Hessian, including Higgs, flavon, projector and Abelian mixing;
4. diagonalize the kinetic block and mass block separately;
5. state the gauge-fixing functional and BRST differential, or perform the Dirac constraint count;
6. specify boundary/defect operator domains and prove self-adjointness and a lower energy bound;
7. compute gauge-invariant propagator poles and residues.

Only that packet can move A4 from **blocked** to **pass** or **fail**. Adding further group correspondences, Jordan identifications or topological state counts cannot substitute for it.

## 6. Programme consequence

The physical-state audit favours the layered architecture already emerging from the corpus:

\[
\text{ordinary Lorentzian microscopic EFT}
\longrightarrow
\text{positive stress/current spectrum}
\longrightarrow
H_2(\mathbb R)\text{ response cone}
\longrightarrow
Spin_0(2,3)\text{ conformal geometry}.
\]

On this reading, (Spin(2,3)) is a geometry of admissible relations among observables, not an instruction to add a second physical clock. The literal-spacetime and response-geometry claims are different theories and must remain separately typed.

## Reproduction

Run:

```powershell
node scripts/verify_spin23_a4_physical_state_audit.mjs
```

The verifier checks the ontology boundary, constructs healthy and ghostly Abelian completions of the same term inventory, verifies the two-time mass shift, verifies the conditional flavon vacuum, and confirms that A4 and physical admission remain false.

## Source boundary

- [Typed candidate-action pilot](../../programmes/closure/spin23-action-pilot/candidate-action-v1.json)
- [Minimal typed closure action](../1100-1199/1199_minimal_typed_closure_action_v1_separates_the_derived_bf_sector_from_the_still_spurionic_flavour_response.md)
- [Standard Model stress-energy and two-time sign audit](../0000-0099/01_standard_model_as_stress_energy_full_analysis.md)
- [Conserved-stress spectral quotient](../0200-0299/206_conserved_stress_spectral_quotient_to_h2_response.md)

No claim is made here that the complete candidate is unitary, that the defect has been physically derived, or that (Spin(2,3)) is a microscopic symmetry.
