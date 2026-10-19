# Stress Ward Identities Constrain the Inverse Problem but Do Not Supply the Missing Spectral Prior

**Date:** 19 October 2026  
**Branches:** Standard-Model stress tensor, inverse spectral reconstruction, Ward identities, OPE, \(H_2(\mathbb R)\), \(Spin_0(2,3)\)  
**Claim status:** synthesis of established corpus theorems with a sharpened inverse-problem conclusion

## Executive verdict

The stress tensor gives real additional structure, but not the structure needed to reverse document 1150's nonuniqueness theorem.

In a parity-even Lorentz-invariant four-dimensional vacuum, conservation reduces the nonlocal stress two-point function to spin-two and spin-zero spectral form factors:

\[
\rho_T(s)=\rho_2(s)P_2+\rho_0(s)P_0,
\qquad
\rho_2(s),\rho_0(s)\ge0.
\]

After two fixed conserved probes are chosen,

\[
\rho_{\rm probe}(s)
=
\rho_2(s)G_2+\rho_0(s)G_0
\in H_2(\mathbb R)_+.
\]

This is a strong kinematic result:

- longitudinal source directions are removed;
- positivity is preserved on the physical quotient;
- only two scalar vacuum spectral functions remain;
- local contact polynomials disappear from the cut discontinuity.

It is not a spectral reconstruction theorem. The Ward identity does not determine the functions \(\rho_2(s)\) and \(\rho_0(s)\), their thresholds, or their decomposition into poles and continua. It therefore does not supply the missing candidate-generation prior.

\[
\boxed{
\text{stress conservation constrains the admissible class;}
\quad
\text{it does not choose one member of that class.}
}
\]

## 1. What the Ward identity actually fixes

For a conserved symmetric stress tensor,

\[
q^\mu T_{\mu\nu}(q)=0.
\]

At nonzero momentum define

\[
\theta_{\mu\nu}
=
\eta_{\mu\nu}-\frac{q_\mu q_\nu}{q^2}.
\]

The transverse symmetric source space decomposes into a five-dimensional spin-two sector and a one-dimensional scalar-trace sector. The corresponding projectors \(P_2\) and \(P_0\) obey

\[
P_iP_j=\delta_{ij}P_i,
\qquad
\operatorname{rank}P_2=5,
\qquad
\operatorname{rank}P_0=1.
\]

Thus conservation fixes the tensor support and removes the four longitudinal directions. For conserved probes \(f_a^{\mu\nu}\), it also guarantees the range condition needed for the singular Schur/Feshbach quotient.

This is exactly the right mechanism for making the positive Jordan carrier legal. It is an admissibility theorem, not a normalization or spectral-support theorem.

## 2. What remains free

The most general parity-even vacuum spectral density still contains two nonnegative functions:

\[
\rho_2:\mathbb R_+\to\mathbb R_+,
\qquad
\rho_0:\mathbb R_+\to\mathbb R_+.
\]

The Ward identity permits, among many other possibilities:

- isolated stable poles;
- multiparticle branch cuts;
- mixtures of poles and continua;
- different mass thresholds;
- arbitrarily many positive spectral atoms in a rational approximation;
- different spectral weights sharing the same finite measurements.

Two choices of \(\rho_2,\rho_0\) can satisfy identical conservation laws and agree on any declared finite calibration set while differing elsewhere. The scalar counterexample of document 1150 can be inserted into either projector channel. The Lorentz Ward identity remains unchanged.

The same conclusion holds after projection to two faces:

\[
(G_s)_{ab}=\langle f_a,P_sf_b\rangle,
\qquad
\rho_{\rm probe}(s)=\rho_2(s)G_2+\rho_0(s)G_0.
\]

The matrices \(G_2,G_0\) are fixed by the probes; they do not determine the scalar coefficient functions.

## 3. The contact-term escape helps, but does not identify the spectrum

The renormalized stress correlator has the dispersive form

\[
F_s(q^2)
=
P_s(q^2)
+\int_0^\infty
\frac{\rho_s(\mu^2)}
{\mu^2-q^2-i0}\,d\mu^2,
\qquad s\in\{2,0\},
\]

where \(P_s\) is a subtraction polynomial.

At a single Euclidean momentum, local curvature/source counterterms occupy the same projector directions as the physical correlator. No algebraic projection can remove every permitted contact shift while retaining the physical form factors.

Across a physical cut,

\[
\operatorname{Disc}P_s=0,
\qquad
\operatorname{Disc}F_s=2i\,\operatorname{Im}F_s,
\]

so the spectral density is contact independent. This is an important success: the robust carrier datum is \(\rho_{\rm probe}(s)\), not an arbitrary subtraction-dependent static matrix.

But removing a nuisance parameter is not the same as determining the remaining function. Infinitely many positive spectral densities remain.

## 4. Conformal symmetry narrows the family but does not create a hidden-spectrum theorem

In an exactly traceless conformal theory,

\[
\rho_0(s)=0.
\]

For fixed probes,

\[
\rho_{\rm probe}(s)=\rho_2(s)G_2
\]

lies on one positive Jordan ray. Conformal invariance can also fix the two-point scaling form up to the stress normalization \(C_T\).

This is far more rigid than the massive Standard Model. Yet it makes the ambient \(H_2(\mathbb R)\) geometry less dynamical: the normalized matrix shape is constant, and only the scalar weight varies.

The interacting Standard Model is not an exact CFT. Masses, thresholds, running couplings, electroweak symmetry breaking and the trace anomaly activate nonconformal structure. They do not, by themselves, turn finite response samples into a unique pole decomposition.

## 5. What ultraviolet information can and cannot do

The operator-product expansion and renormalization group can constrain the large-Euclidean-momentum behavior of the form factors. Schematically,

\[
F_s(-Q^2)
\sim
Q^4
\left[
c_s(g(Q))\log\frac{Q^2}{\mu^2}
+\text{local terms}
\right]
+\sum_n\frac{C_{s,n}(Q)\langle\mathcal O_n\rangle}{Q^{\Delta_n-4}}.
\]

This can fix asymptotic coefficients or weighted spectral integrals after the correct subtractions are made. Such information is genuinely useful and may exclude the specific two-model ambiguity exhibited in document 1150.

It still does not generically determine a full positive measure:

- finitely many moments admit many representing measures;
- an asymptotic expansion need not converge to the full correlator;
- local subtraction terms must be separated from nonlocal data;
- perturbative/OPE control at large \(Q^2\) does not resolve all infrared thresholds;
- nonperturbative Standard-Model sectors, especially QCD, require additional input.

A sum rule is therefore an added equation, not an automatic consequence of writing down the Ward identity.

## 6. Existing stress sum rules illustrate the extra ingredients

Stress spectral sum rules do exist in special settings. They are obtained by combining analyticity and dispersion relations with additional infrared and ultraviolet control.

For example, Romatschke and Son derive stress spectral sum rules for thermal \(\mathcal N=4\) super-Yang–Mills and pure Yang–Mills using hydrodynamic behavior at small momentum and conformal or asymptotically free behavior at large momentum: [Spectral sum rules for the quark-gluon plasma](https://doi.org/10.1103/PhysRevD.80.065021).

This supports the precise lesson:

\[
\text{Ward identity}
+\text{positivity}
+\text{IR law}
+\text{UV law}
+\text{subtraction control}
\longrightarrow
\text{a useful sum rule}.
\]

The first two terms alone are insufficient. Moreover, a finite collection of sum rules ordinarily constrains moments or integrated differences; it does not automatically recover every pole and cut.

## 7. The Standard-Model-specific route

There are two fundamentally different reconstruction tasks.

### 7.1 Black-box inverse response

Infer \(\rho_2,\rho_0\) from finite measurements. This remains underdetermined unless an order, sparsity, smoothness or Bayesian prior is declared.

### 7.2 Microscopic forward calculation

Specify the renormalized Standard Model coupled to a background metric and calculate the stress spectral functions from:

- elementary and composite intermediate states;
- known masses and couplings;
- perturbative cuts where reliable;
- trace-anomaly operator mixing;
- nonperturbative QCD input;
- a declared improvement convention and renormalization scheme;
- contact-independent absorptive observables.

This second route does generate candidates: thresholds and intermediate states arise from the microscopic theory rather than from an unconstrained fit. It is difficult but conceptually well posed.

The programme should therefore stop asking the finite response to invent its own ontology. The candidate grammar should come from the Standard-Model spectrum and allowed stress insertions; response data then estimate weights, test omissions and select among controlled completions.

## 8. Consequence for the \(Spin(2,3)\) claim

The map

\[
\text{conserved stress spectrum}
\longrightarrow
\text{positive two-probe matrix}
\longrightarrow
H_2(\mathbb R)_+
\]

is valid.

Since the conformal group of \(H_2(\mathbb R)\) is

\[
Sp(4,\mathbb R)\cong Spin_0(2,3),
\]

the positive response has an ambient \(Spin(2,3)\) geometry.

But the physical vacuum family is

\[
\rho_{\rm probe}(s)
=
\rho_2(s)G_2+\rho_0(s)G_0,
\]

which spans at most a two-dimensional linear slice of the three-dimensional Jordan algebra. In the conformal limit it collapses to one ray. A generic \(Sp(4,\mathbb R)\) action leaves this physical family.

Therefore:

\[
\boxed{
\text{the stress Ward quotient derives the carrier,}
\quad
\text{not the full }Spin(2,3)\text{ dynamics.}
}
\]

Any physical \(Spin(2,3)\) claim must also preserve thresholds, spectral support, probe Gram matrices, dispersion relations and UV normalization.

## 9. Updated status of candidate generation

The new boundary is sharper than document 1150 alone:

| Layer | What it supplies | What it does not supply |
|---|---|---|
| Positivity/Herglotz property | admissible passive response | unique measure |
| Stress Ward identity | transverse quotient and two spin channels | \(\rho_2,\rho_0\) |
| Spectral discontinuity | contact-independent observable | pole/cut reconstruction |
| OPE/RG | asymptotic coefficients and possible moments | full infrared spectrum |
| Special sum rules | integrated constraints | generally a unique measure |
| Microscopic Standard Model | candidate thresholds and states | easy nonperturbative evaluation |
| \(H_2/Spin(2,3)\) geometry | organization and allowed cone transformations | physical selection of the spectral trajectory |

## 10. Stop-everything conditions

1. **Derived determinate moment problem.** A complete set of Standard-Model moments satisfies a determinacy criterion and uniquely fixes the relevant positive measure.
2. **Protected finite rank.** A symmetry or microscopic theorem bounds the response realization order and enough independent data identify it.
3. **Carrier-specific sum rule.** A relation between the two probe channels follows from the Jordan/\(Spin(2,3)\) construction and is absent from generic stress kinematics.
4. **Third physical tensor structure.** A specified medium, boundary or mixed conserved operator generates the missing third \(H_2\) direction with a fixed coefficient.
5. **Microscopic pole prediction.** A Standard-Model or beyond-Standard-Model calculation produces an isolated pole or threshold with a residue orientation fixed in the two-face space.
6. **Ambient-only verdict.** Every actual response remains on the one- or two-dimensional stress slice and no source-derived group action preserves the family; then \(Spin(2,3)\) is an organizing geometry, not a dynamical symmetry.

## 11. Decision

The first proposed escape from finite-data nonuniqueness fails in its strongest form:

\[
\boxed{
\text{Ward identities alone do not supply the missing spectral prior.}
}
\]

They remain essential because they define the physical quotient and reduce the candidate class. The next productive move is microscopic rather than purely inverse:

\[
\boxed{
\text{derive candidate spectral support from actual Standard-Model intermediate states,}
\quad
\text{then use positivity, Ward identities and data to test it.}
}
\]

This result integrates and sharpens documents 206–209, 214, 625–626, 649 and 1150. It leaves one especially valuable open question: whether the Jordan/\(Spin(2,3)\) construction predicts a channel relation or finite-rank constraint not already implied by ordinary stress-tensor kinematics.
