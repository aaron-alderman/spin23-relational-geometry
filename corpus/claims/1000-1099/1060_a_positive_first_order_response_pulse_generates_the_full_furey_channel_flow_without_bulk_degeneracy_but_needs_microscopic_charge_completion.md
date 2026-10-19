# A Positive First-Order Response Pulse Generates the Full Furey Channel Flow Without Bulk Degeneracy but Needs Microscopic Charge Completion

**Date:** 18 October 2026  
**Branches:** Furey response product, effective action, positive pulse Hamiltonian, boundary evolution, full \(\mathfrak{sp}_4\) control, microscopic charge gate  
**Claim status:** exact effective response action; microscopic Standard-Model operator open  
**Certificate:** [construct_the_minimal_positive_response_pulse_for_the_furey_channel_flow.mjs](../../../verification/construct/construct_the_minimal_positive_response_pulse_for_the_furey_channel_flow.mjs)

## Executive result

The continuous \(F_Cp\) response flow has a minimal stable first-order action. It need not be an exact symmetry of the unequal broken-phase bulk kernel.

Let

\[
G=F_Cp,
\qquad
G^T=-G,
\qquad
G^2=-I.
\]

Then

\[
Q=iG
\]

is Hermitian and satisfies

\[
Q^2=I.
\]

For a complex response vector \(z\in\mathbb C^4\), take

\[
\boxed{
H_{\rm pulse}(t)
=\mu(t)I+i\,g(t)G.
}
\]

The Schrödinger-type equation

\[
i\dot z=H_{\rm pulse}z
\]

becomes

\[
\dot z=-i\mu z+gGz.
\]

Since the two terms commute, its exact evolution is

\[
\boxed{
z(t_f)
=e^{-i\int\mu dt}
e^{\theta G}z(t_i),
\qquad
\theta=\int g(t)\,dt.
}
\]

The first factor is a common phase. The second is exactly the required Furey channel rotation.

The instantaneous eigenvalues are

\[
\mu-g,\qquad\mu-g,\qquad\mu+g,\qquad\mu+g.
\]

Thus

\[
\boxed{\mu(t)\ge |g(t)|}
\]

makes the Hamiltonian positive semidefinite at every time without changing the relative channel motion.

Under the reducing aggregate map,

\[
AGA^T=\varepsilon,
\]

so the pulse descends exactly to

\[
H_{\rm root}(t)
=\mu(t)I+i\,g(t)\varepsilon.
\]

This closes the effective response-action gate for the third full-\(\mathfrak{sp}_4\) seed. It does not supply the microscopic Standard-Model operator that mixes the four Higgs-dressed response channels.

## 1. Hermiticity

Because \(G\) is real,

\[
(iG)^\dagger
=-iG^T
=iG.
\]

Hence \(Q=iG\) is Hermitian. Moreover,

\[
Q^2=(iG)^2=-G^2=I.
\]

Its spectrum lies in \(\{+1,-1\}\). Since \(\operatorname{tr}G=0\), the two signs occur with equal multiplicity.

The shifted Hamiltonian

\[
\mu I+gQ
\]

is positive semidefinite precisely when

\[
\mu\ge|g|.
\]

The positive offset contributes only common phase evolution to the normalized response direction. It does not alter the \(SO(2)\) channel rotation.

## 2. First-order action

A manifestly real first-order Lagrangian is

\[
L
=\frac{i}{2}
\left(
z^\dagger\dot z-\dot z^\dagger z
\right)
-z^\dagger H_{\rm pulse}z.
\]

Varying \(z^\dagger\) gives

\[
i\dot z=H_{\rm pulse}z.
\]

For a pulse supported on a finite boundary interval,

\[
g(t)=0
\]

outside that interval. Its only coherent internal datum is the integrated angle

\[
\theta=\int g(t)\,dt.
\]

Choosing

\[
\theta=\frac\pi2
\]

implements

\[
e^{\theta G}=G=F_Cp.
\]

Other angles realize the full continuous interpolation whose existence was established in document 1059.

## 3. Why bulk degeneracy is not required

If \(G\) is claimed to be a symmetry of a static diagonal response kernel \(R\), then

\[
[R,G]=0
\]

requires

\[
r_u=r_e,
\qquad
r_\nu=r_d.
\]

The pulse construction makes a different claim. It places \(G\) directly in the time-dependent Hamiltonian. A Hamiltonian generator need not commute with every other Hamiltonian term.

For an isolated pulse, or in an interaction picture where the remaining kernel is negligible or compensated during the boundary interval, the exact evolution is \(e^{\theta G}\) without crossed bulk degeneracy.

If a noncommuting bulk kernel remains active during the pulse, the evolution is time ordered and the simple factorization fails. That case requires a control calculation, not a symmetry argument.

## 4. Exact descent to the response root

The aggregate map satisfies

\[
AA^T=I,
\qquad
AG=\varepsilon A.
\]

Therefore

\[
AGA^T=\varepsilon.
\]

The compressed Hamiltonian is

\[
\begin{aligned}
AH_{\rm pulse}A^T
&=\mu AA^T+i g AGA^T\\
&=\mu I+i g\varepsilon.
\end{aligned}
\]

The source and root Schrödinger evolutions commute with aggregation throughout the pulse:

\[
A\,U_{\rm src}(t_f,t_i)
=U_{\rm root}(t_f,t_i)\,A.
\]

This supplies an effective action for exactly the generator used in the three-seed \(\mathfrak{sp}_4\) closure.

## 5. Physical interpretation options

The effective pulse can represent several distinct mechanisms:

### Boundary conversion

A localized interface briefly couples lepton-like and quark-like response composites. The flow need not survive as a bulk symmetry.

### Heavy mediator

Integrating out a massive charge-carrying field produces the off-diagonal response kernel over a short scale. The coefficient \(g(t)\) then inherits suppression by the mediator mass.

### Spurionic transport

The response basis and its coupling tensors rotate together. The pulse is a connection between charts rather than a physical global symmetry.

### Control idealization

The pulse is an effective unitary gate summarizing more detailed time-ordered dynamics. Its exact generator must then be recovered as a Magnus or adiabatic limit.

These interpretations have different phenomenology and must not be merged.

## 6. Microscopic obstruction

At response level, \(z=(u,\nu,d,e)\) denotes Higgs-dressed composite amplitudes. At fundamental-field level, the entries carry different color, hypercharge, baryon and lepton assignments before contraction.

A microscopic realization of

\[
z^\dagger iGz
\]

must specify:

- all weak and color contractions;
- whether it is a bilinear, four-fermion or higher composite operator;
- the charge of any mediator;
- baryon- and lepton-number selection rules;
- whether proton decay is induced;
- the Lorentz representation and Hermiticity of the operator;
- how the bosonic response action descends from CAR fields.

Without this completion, the positive response pulse is a consistent effective model, not a Standard-Model interaction.

## 7. Relation to full \(Sp(4,\mathbb R)\) generation

Documents 1058–1059 established the three algebraic generators:

\[
\mathcal A=J\otimes e_-,
\qquad
\mathcal H=K\otimes D,
\qquad
\mathcal C=I\otimes\varepsilon.
\]

The present pulse supplies an effective time-dependent Hamiltonian for \(\mathcal C\). If comparable actions exist for \(\mathcal A\) and \(\mathcal H\), piecewise control by the three pulses generates the connected group

\[
Sp(4,\mathbb R)\cong Spin_0(2,3).
\]

This is a controllability statement at response level. It is not a claim that the uncontrolled physical system explores the whole group, nor that all generators are symmetries.

## 8. Stop-everything tests and falsifiers

**Microscopic operator trigger:** construct a gauge-invariant Hermitian source operator whose response reduction is \(iF_Cp\).

**Mediator trigger:** identify a heavy representation whose exchange generates the required crossed pairs while satisfying proton-decay bounds.

**Control trigger:** derive the pulse as the leading Magnus term of a source-resolved boundary interaction and bound higher commutators.

**Positivity falsifier:** use \(i gG\) as a Hamiltonian but claim it is positive without the shift; its eigenvalues are \(\pm g\).

**Bulk/pulse falsifier:** infer crossed mass degeneracy from the existence of a driven pulse, or infer a pulse from a global symmetry. They are different dynamical statements.

**Typing falsifier:** apply the response bilinear directly to bare quark and lepton fields without restoring their gauge and CAR indices.

## Verdict

| Question | Verdict |
|---|---|
| Is \(iF_Cp\) Hermitian? | **Yes** |
| Does it generate the required continuous response rotation? | **Yes** |
| Can the Hamiltonian be made positive semidefinite? | **Yes, with \(\mu\ge|g|\)** |
| Does a pulse require crossed bulk degeneracy? | **No** |
| Does it descend exactly to \(i\varepsilon\)? | **Yes** |
| Is the microscopic Standard-Model operator known? | **No** |

## Position in the corpus

- [continuous source-to-root flow](1059_the_linear_furey_product_FCp_exponentiates_exactly_to_the_missing_continuous_sp4_channel_rotation_but_its_action_term_is_open.md)
- [three-generator full closure](1058_a_three_generator_jordan_furey_recursion_closes_all_of_sp4_but_requires_the_furey_channel_rotation_as_a_continuous_flow.md)
- [projected oscillator action for the controlled turn](1040_a_positive_projected_oscillator_generates_the_controlled_fourier_tkk_intertwiner_as_a_passive_quarter_period_boundary_flow.md)
