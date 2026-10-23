# Healthy Axion--Torsion Mixing Preserves Only a Total Residue Norm, Not the PGT-Pole Coupling

**Date:** 23 October 2026

**Status:** exact two-mode kinetic, mass and source-mixing theorem

**Depends on:** [the concrete compactification boundary](1756_three_generation_topology_succeeds_but_the_stabilized_torsional_vacuum_is_the_irreducible_missing_input.md) and [the healthy critical PGT pole](../1600-1699/1622_the_full_local_pgt_route_contains_a_healthy_critical_pseudoscalar_sector_but_not_an_open_quantum_region.md)

**Evidence:** [two-mode ledger](../../../evidence/data/spin23-axion-torsion-two-mode-mixing-v1.json) and [verifier](../../../verification/verify/verify_spin23_axion_torsion_two_mode_mixing.mjs)

## General two-mode reduction

Let \(\Phi=(a,t)^T\) contain a stabilized heterotic axion and the longitudinal
PGT pseudoscalar torsion coordinate.  The most general real quadratic system
relevant to pole selection is

\[
 \mathcal L_2={1\over2}\partial_\mu\Phi^T K\partial^\mu\Phi
 -{1\over2}\Phi^TM^2\Phi+J_5\,g^T\Phi,
\]

where health requires \(K>0\) and positive generalized eigenvalues of
\((M^2,K)\).  Write

\[
 \Phi=K^{-1/2}O\chi,
 \qquad
 O^TK^{-1/2}M^2K^{-1/2}O
   =\operatorname{diag}(m_1^2,m_2^2).
\]

The mass-basis source couplings are

\[
 h=O^TK^{-1/2}g.
\]

Consequently the exchange kernel is

\[
 g^T(p^2K+M^2)^{-1}g
 =\sum_{i=1}^2{h_i^2\over p^2+m_i^2},
\]

and positivity gives nonnegative pole residues.  Orthogonality fixes only

\[
 \boxed{h_1^2+h_2^2=g^TK^{-1}g}.
\]

It does not fix either residue separately.

## Finite witness containing one eighth

Take \(K=I\), positive pole masses \((m_1^2,m_2^2)=(1,9)\), and let the
original source couple only to torsion with \(g=(0,1/4)^T\).  With

\[
 \Phi=R(\theta)\chi,
 \qquad
 R(\theta)=
 \begin{pmatrix}\cos\theta&-\sin\theta\\
                 \sin\theta& \cos\theta\end{pmatrix},
\]

the two couplings are

\[
 h_1={1\over4}\sin\theta,
 \qquad
 h_2={1\over4}\cos\theta.
\]

Every \(\theta\) has the same healthy masses and total residue \(1/16\).
Nevertheless \(h_1\) equals \(0\), \(1/8\), and \(1/4\) at
\(\theta=0,\pi/6,\pi/2\), respectively.  The value \(1/8\) is admitted but
not selected.

## Implication for the compactification route

The three-generation index is unaffected by this continuous rotation: it is
a topological bundle index, whereas \(K\), \(M^2\), and \(g\) are normalized
low-energy data.  A stabilized vacuum must therefore calculate the mixing
angle and source vector.  Positivity, fixed pole masses and three-generation
topology cannot substitute for that calculation.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_axion_torsion_two_mode_mixing.mjs
~~~
