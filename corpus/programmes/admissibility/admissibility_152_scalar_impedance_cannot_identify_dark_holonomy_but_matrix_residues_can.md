# Scalar impedance cannot identify dark holonomy, but matrix residues can

**Date:** 27 October 2026

**Status:** exact finite identifiability no-go and repair; hardware port-rank audit remains open

**Parents:** [graded Beltrami spike](admissibility_149_graded_beltrami_impedance_defect_investigation_spike.md), [Lagrangian boundary spectral flow](admissibility_150_lagrangian_boundary_selector_and_maslov_spectral_flow.md), [curl eta orientation detector](admissibility_151_curl_eta_asymmetry_is_an_orientation_record_not_a_mass_formula.md), [positive-real impedance completion](../../claims/0700-0799/780_the_selected_unitary_scattering_checkpoint_embeds_in_a_reciprocal_rational_inner_response_with_positive_real_cayley_impedance.md)

**Evidence:** [joint-identifiability ledger](../../../evidence/data/admissibility-impedance-holonomy-identifiability-v1.json); [independent verifier](../../../verification/admissibility/verify_impedance_holonomy_identifiability.mjs)

**Literature contact:** [Gough and Zhang, realization theory of quantum linear systems](https://arxiv.org/abs/1311.1375); [Bondarenko, inverse spectral recovery from a Weyl matrix](https://arxiv.org/abs/1412.5962)

## Result

The original no-refit proposal was still too weak. A scalar impedance can
predict every pole and scalar residue it can see while remaining completely
blind to a moving degenerate eigenspace and its holonomy.

For a self-adjoint finite operator

\[
H(q)=\sum_a\lambda_a(q)P_a(q)
\]

and a port matrix (C), the compressed resolvent is

\[
G_C(z;q)=C^*(H(q)-zI)^{-1}C
=\sum_a\frac{C^*P_a(q)C}{\lambda_a(q)-z}.
\]

The poles record eigenvalues. The matrix residues

\[
R_a(q)=C^*P_a(q)C
\]

record only the part of each spectral projector visible through the ports.
If (C^*P_a=0), that eigenspace is dark. No frequency sweep of that transfer
function can reconstruct its holonomy.

## Exact dark-doublet no-go

Embed the AZ-026 spherical projector loop into four real dimensions. Let

\[
n(\phi)=
\left(s\cos\phi,s\sin\phi,c,0\right)^T,
\qquad
c=\frac34,
\qquad
s=\frac{\sqrt7}{4}.
\]

Let (P(\phi)) project onto the two-plane in the first three coordinates
orthogonal to (n(\phi)), with no component along (e_4). Define

\[
H(\phi)=\Delta(I-P(\phi)).
\]

The zero eigenspace is the moving doublet. It returns after one loop and has
the quarter-turn holonomy

\[
U_\gamma=R\left(2\pi(1-c)\right)=R(\pi/2)=J.
\]

Now use the scalar port (C=e_4). Since

\[
P(\phi)e_4=0,
\qquad
H(\phi)e_4=\Delta e_4,
\]

its entire response is

\[
G_{e_4}(z;\phi)=\frac1{\Delta-z},
\]

independent of (phi). It has the same pole and residue at every point of a
loop with nontrivial holonomy. This is an exact no-go:

\[
\boxed{
\text{complete scalar impedance record}
\centernot\Longrightarrow
\text{dark-eigenspace holonomy}.
}
\]

## Why residues are necessary but not always sufficient

For a simple eigenvalue, a scalar residue gives the squared overlap of the
port with its eigenvector. It loses phase and every component orthogonal to
the port. For a degenerate eigenvalue, one scalar residue is only one
quadratic form of the full projector and cannot recover an internal frame.

The relevant finite-dimensional condition is observability. The port-generated
Krylov span is

\[
\mathcal O(H,C)=\operatorname{span}
\{\operatorname{ran}C,H\operatorname{ran}C,H^2\operatorname{ran}C,\ldots\}.
\]

Any orthogonal complement of this span is transfer-function dark. A minimal
realization removes that invisible sector and is identifiable only up to an
internal unitary equivalence. Therefore even perfect pole/residue data do not
name microscopic coordinates without a calibrated port-to-carrier map.

## The matrix-residue repair

In the finite witness, choosing (C=I_4) yields the full resolvent. Its
residue at the zero pole is exactly (P(\phi)); hence the measured residue
path reconstructs the moving doublet projector. A discretized parallel
transport of those projectors can then predict the holonomy.

Full-state access is stronger than a practical experiment usually permits.
The necessary experimental replacement is a port set whose restriction to
the target eigenspace has full rank throughout the loop, plus enough known
carrier geometry to reconstruct the projector. For a rank-(r) degenerate
cluster, a single scalar port cannot have rank (r>1).

This revises the earlier shared no-refit gate:

\[
\boxed{
\begin{gathered}
\text{one frozen }(H_D(q),C)\\
\text{must predict poles }\lambda_a(q),
\text{ matrix residues }R_a(q),\\
\text{and holonomy of the reconstructed }P_a(q).
\end{gathered}
}
\]

Pole agreement without the residue-rank condition is not a test of holonomy.

## Defects and eta now fit into one ledger

A defect (D) can change four separately observable objects:

1. eigenvalues (lambda_a): pole motion;
2. visible projectors (C^*P_aC): residue motion;
3. the transported projector path: holonomy;
4. the signed balance of positive and negative branches: eta asymmetry.

The same calibrated defect must predict all four. This prevents a fit in which
one effective matrix explains impedance while another narrative explains the
quarter-turn or orientation sign.

There is also a useful failure taxonomy:

| failure | likely missing structure |
|---|---|
| correct poles, wrong residues | port map, mode shape or degeneracy model |
| correct residues pointwise, wrong holonomy | path ordering, phase reference or coherence |
| correct holonomy, wrong eta statistic | signed branch assignment, orientation or cutoff tail |
| all internal records close, detector fails | output chain, loss, calibration or nuisance model |

## Experimental design consequence

The next device must be multiport and phase coherent.

1. Establish the rank of the target cluster independently.
2. Choose enough ports that the measured residue matrix has that rank across
   the full control loop.
3. Measure the complex response matrix, not one reflection magnitude.
4. Fit the operator, port map, loss and detector calibration on training loops.
5. Hold out one defect setting and the reversed loop.
6. Predict pole trajectories, residue matrices, eta estimator and holonomy
   before unblinding.
7. Report the observability rank and all dark subspaces.

Topolectrical circuits offer direct multi-node access. Microwave networks and
synthetic-frequency photonics offer coherent phase control. Lithium niobate
is attractive only if the available electrodes and optical readout span the
target doublet rather than addressing one bright combination.

## Verdict

The proposed joint experiment survives, but only after a decisive repair:
**scalar impedance is insufficient**. The common carrier becomes identifiable
through matrix-valued residues and an explicit observability certificate.
This is the strongest result of the spike so far because it converts “measure
two effects in one device” into a rank condition that can fail before any
expensive holonomy claim is made.
