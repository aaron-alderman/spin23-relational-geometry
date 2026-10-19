# Frontier Parallel QFT 04: exact reduction of the remaining loop and threshold work

**Date:** 18 October 2026  
**Status:** executable calculation specification after the exact seven-current reduction; no claim that unevaluated master integrals are complete results  
**Depends on:** [seven-current reduction](frontier_parallel_qft_03_seven_current_one_loop_reduction.md), [Born cut](frontier_parallel_qft_01_born_incidence_bl_current_cut.md)

## Outcome

The full background-source problem is now small enough to specify without ambiguity but not small enough to claim as evaluated. The matrix algebra is finished: all Yukawa dependence enters through four channel functions acting on the exact block \(R\). What remains is the calculation of those channel functions, the off-shell EOM/contact completion, and their threshold matching.

The computation should be organized around

\[
\Gamma_Y(\mu)=D^{-1}V^T F_{\overline{\rm MS}}(y,g,\lambda;\mu)V
+\Gamma_{\rm anomaly/EOM},
\]

and

\[
\rho_{\partial J}(s)=V^T F_{\rm cut}(s)V.
\]

At leading order and with diagonal one-generation Yukawas, \(F\) is diagonal. Gauge corrections can dress each channel; flavor mixing and higher orders can make it non-diagonal, but compensated gauge invariance still requires the Yukawa-breaking part to factor through \(V\).

## 1. Minimal diagram and master-integral inventory

### A. Ultraviolet current-insertion poles

Compute amputated Green functions with one insertion of each of the seven currents and external fermion or Higgs legs. The gauge-independent Yukawa block requires the sum of:

- left- and right-fermion self energies with a Higgs/fermion loop;
- Higgs self energy with a fermion loop;
- current-vertex corrections with one Yukawa pair;
- counterterm insertions required by the Yukawa and field renormalizations.

Their ultraviolet poles reduce to massless one-loop two-point and three-point integrals. The result must annihilate \(Y,B,L\), be self-adjoint in the source metric after the appropriate lowering of indices, and reduce to \(D^{-1}V^TFV\). These tests are more stringent than comparing individual gauge-dependent diagrams.

### B. Off-shell source and EOM completion

For an off-shell background vector source one must additionally project onto

\[
\{j_Q,j_u,j_d,j_L,j_e,j_N,j_H,
\partial_\nu B^{\nu\mu},
\partial^\mu(H^\dagger H)\}.
\]

The last two representatives distinguish genuine operator mixing from contact/EOM reshuffling. Required amplitudes are source--hypercharge two-point functions and longitudinal source--Higgs form factors. Their local parts fix the subtraction tensor; their separated discontinuities decide whether any additional physical channel survives the quotient.

### C. Nonlocal \(O(y^2)\) current response

The direct current-current correlator at \(O(y^2)\) contains two-loop sunset/self-energy-insertion topologies. In the unbroken massless theory the absorptive divergence response reduces to the known three-body phase-space integral and yields

\[
F_{\rm cut}(s)=\frac{s^2}{192\pi^3}
\operatorname{diag}(3|y_u|^2,3|y_d|^2,|y_e|^2,|y_\nu|^2).
\]

The finite transverse current response requires the corresponding massless two-loop propagator masters. It cannot be recovered from the divergence norm alone because transverse finite terms and subtraction constants contain extra information.

### D. Broken-phase thresholds

After electroweak breaking, the minimum finite basis contains:

- massive one-loop \(B_0\) bubbles for the Born vector/axial cuts already derived;
- massive vertex/self-energy \(B_0\) and \(C_0\) functions for one-loop source form factors;
- massive sunrise/dispersive integrals for the \(O(y^2)\) two-point response;
- finite decoupling coefficients at \(m_t,m_H,m_W,m_Z\);
- hadronic vector, axial and pseudoscalar spectral input below the perturbative QCD window.

Near light-quark thresholds the free-quark staircase is not a controlled substitute for data, lattice input, or QCD sum rules.

## 2. Required checks before admitting a matrix

Any future explicit result must pass all of the following:

1. \(VY=VB=VL=0\) in the Yukawa pole matrix;
2. exact \(B-L\) transversality before Majorana breaking;
3. gauge-parameter cancellation after vertices, legs and EOM representatives are combined;
4. agreement between the ultraviolet logarithm of the nonlocal correlator and the insertion anomalous dimension;
5. positivity of every physical cut;
6. rank loss exactly when a channel weight vanishes;
7. matching-scale cancellation between running and finite threshold terms;
8. recovery of the Born matrices in the zero-interaction limit.

Failure of checks 1--4 is a calculation error or an incomplete basis, not new physics.

## 3. What existing ALP calculations can and cannot supply

The ALP effective-theory literature already provides complete one-loop running and finite off-shell form factors for broad sets of derivative fermion and anomalous gauge couplings. It is directly useful for basis conversion, gauge-parameter cancellation, electroweak matching, and calibrated derivative-source realizations.

It does not automatically finish the present problem because:

- this programme retains a right-handed-neutrino current and neutrino Yukawa channel;
- a generic transverse vector source is not identical to a derivative ALP source;
- the full matrix-valued current-current response contains information beyond one ALP form factor;
- the EOM/contact quotient must match the conventions of the seven-current census.

The efficient route is therefore to adapt and extend the published one-loop basis machinery, not to infer the seven-current matrix by renaming ALP coefficients.

## 4. Precise branch verdict

### Stop

Stop treating \(\operatorname{span}\{\lambda,B-L\}\) as a closed RG subsystem. The exact rank-six invariance test rules this out for every nonzero Yukawa-weight assignment in the declared leading structure.

### No-go

There is a leading-order no-go for obtaining a two-dimensional invariant source plane from either surviving incidence normalization plus \(B-L\) by Yukawa running alone.

### Indeterminate

It remains indeterminate whether a specified experiment, mediator, boundary condition, or spectral projection suppresses the other three broken directions over a useful energy window. That is an operational low-rank question, not an RG-invariance claim.

### Continue

Keep alive:

- the full four-channel broken block and its generalized spectral eigenvalues;
- threshold-stratified low-rank approximations, explicitly energy qualified;
- calibrated source/mediator matching;
- two-scale congruence invariants and signed interference tomography.

## 5. Next bounded execution

The next executable strike should calculate one generation with \(y_u\neq0\) and the other three Yukawas set to zero, including \((j_Q,j_{u^c},j_H)\), hypercharge EOM, and gradient representatives. This rank-one channel has three advantages:

1. the exact answer must be proportional to the outer product of the first row of \(V\);
2. every orthogonal current supplies a Ward null test;
3. the massive top threshold can be compared with known axial/vector and ALP form factors.

Only after that rank-one module passes should the four channels be assembled. Because the rows of \(V\) are already proven independent, adding channels is then controlled composition rather than a new tensor-algebra problem.

## Primary literature boundary

- Chala, Guedes, Ramos and Santiago compute the complete one-loop evolution of the CP-even ALP EFT above and below the electroweak scale in [Running in the ALPs](https://arxiv.org/abs/2012.09017).
- Bonilla, Brivio, Gavela and Sanz give finite off-shell one-loop ALP couplings and emphasize basis conversion and gauge-invariant combinations of vertex and leg graphs in [One-loop corrections to ALP couplings](https://arxiv.org/abs/2107.11392).
- Nakayama develops compensated gauge invariance and vector beta functions in [Vector Beta Function](https://arxiv.org/abs/1310.0574).

These sources delimit reusable machinery. The exact \(3\oplus4\) reduction, non-invariance theorem for both incidence candidates, and generic saturation of the six-dimensional external-source quotient are the programme-specific results.

