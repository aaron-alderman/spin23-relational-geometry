# Majorana Nambu Pole Area and the CAR-Identification Gate

**Date:** 17 October 2026  
**Branches:** B03, B05, B06 and B11  
**Claim status:** exact flavor-phase and positive-residue construction; identification with the external Furey/Jordan faces remains open

## 1. Why revisit the Majorana branch

Ordinary neutrino residues have the form

\[
U_{\alpha i}\overline{U_{\beta i}}
\]

and erase Majorana column phases. An anomalous particle--hole correlator instead contains

\[
U_{\alpha i}U_{\beta i}.
\]

The earlier Nambu analysis correctly showed that one raw imaginary matrix entry is basis dependent. The two-frequency construction now permits a relational quantity: compare the phases of two distinct mass-pole residues after fixing the charged-lepton flavor tag.

## 2. Positive Nambu residue for one flavor tag

Choose a charged-current flavor channel \(\alpha\). At mass pole \(i\), the flavor part of the particle--hole residue can be written

\[
\mathcal N_i^{(\alpha)}
=w_i
\begin{pmatrix}
|U_{\alpha i}|^2&U_{\alpha i}^{,2}\\
\overline{U_{\alpha i}}^{,2}&|U_{\alpha i}|^2
\end{pmatrix},
\qquad w_i\ge0.
\]

It is Hermitian, positive semidefinite and rank one:

\[
\det\mathcal N_i^{(\alpha)}=0.
\]

Spin, helicity and propagator denominators multiply this flavor factor and must be restored in a complete field-theory calculation. They do not alter the phase statement when their pole weights are real and positive.

## 3. Normalized anomalous coherence

For \(w_i|U_{\alpha i}|^2\ne0\), define

\[
c_i^{(\alpha)}
=
\frac{U_{\alpha i}^{,2}}
{|U_{\alpha i}|^2}.
\]

It has unit magnitude. The Nambu pole area is

\[
\boxed{
\mathcal A_{ij}^{N,\alpha}
:=
\operatorname{Im}
\left[
c_i^{(\alpha)}
\overline{c_j^{(\alpha)}}
\right]
}
\]

or explicitly

\[
\mathcal A_{ij}^{N,\alpha}
=
\frac{
\operatorname{Im}
\left[
U_{\alpha i}^{,2}
\overline{U_{\alpha j}}^{,2}
\right]}
{|U_{\alpha i}U_{\alpha j}|^2}.
\]

This is the normalized two-pole version of a Majorana-type rephasing invariant.

## 4. Charged-flavor rephasing invariance

Under the residual charged-lepton-frame rephasing

\[
U_{\alpha i}\mapsto e^{i\phi_\alpha}U_{\alpha i},
\]

every pole coherence in row \(\alpha\) gains the same phase:

\[
c_i^{(\alpha)}\mapsto e^{2i\phi_\alpha}c_i^{(\alpha)}.
\]

It cancels from \(\mathcal A_{ij}^{N,\alpha}\). The observable is therefore not the raw basis-dependent \(\sigma_y\) coefficient criticized in the earlier analysis; it is a relative phase between labeled mass poles and a charged-lepton spectral channel.

An arbitrary weak-basis expression would use the charged-lepton spectral projector \(P_\alpha\), as in the existing projector invariant. The charged-current tag is its operational realization.

## 5. Majorana-phase sensitivity

Write the PMNS matrix as

\[
U=V(\theta_{12},\theta_{13},\theta_{23},\delta)
\operatorname{diag}
\left(e^{i\eta_1/2},e^{i\eta_2/2},e^{i\eta_3/2}\right).
\]

In the conventional electron row, \(V_{e1}=c_{12}c_{13}\) and \(V_{e2}=s_{12}c_{13}\) are real. Hence

\[
c_1^{(e)}=e^{i\eta_1},
\qquad
c_2^{(e)}=e^{i\eta_2},
\]

and

\[
\boxed{
\mathcal A_{12}^{N,e}
=\sin(\eta_1-\eta_2).
}
\]

This pair isolates a Majorana phase difference without contamination from the Dirac phase in the standard parameterization.

Majorana mass eigenfields permit only discrete sign changes, \(U_{\alpha i}\mapsto-U_{\alpha i}\), which leave \(U_{\alpha i}^2\) unchanged. The area changes sign under CP conjugation.

If a relevant mass or channel amplitude vanishes, the corresponding anomalous residue is zero and its normalized phase is undefined; only unnormalized wedges remain meaningful.

## 6. Relation to lepton-number violation

The area belongs to the anomalous, lepton-number-violating spectral sector. It cannot be extracted from ordinary oscillation probabilities alone. A physical measurement requires interference between amplitudes sensitive to the anomalous correlator, such as a specified \(\Delta L=2\) process.

The unnormalized numerator carries pole weights and masses and is suppressed when lepton-number violation decouples. Normalization isolates geometry but not an event rate.

## 7. The Furey CAR gate

The exchange-paired Furey neutral arrows already form a two-cycle. There are two inequivalent interpretations:

1. **Nambu/Majorana:** the reverse arrow is the CAR-conjugate presentation of the same neutral degree of freedom;
2. **sterile Dirac pair:** the reverse arrow is an independent Weyl field.

Only the first interpretation identifies the arrow pair with the particle--hole faces of \(\mathcal N_i\). If it holds, the pole area is a concrete orientation observable living in the same neutral corner that supplies the candidate \(H_2(\mathbb R)\) carrier.

Even then, one further distinction remains: an internal Nambu corner is not automatically the external relational carrier. A source-derived response map must carry its pole area into the external two-port observable.

## 8. What has and has not converged

The following chain is now mathematically explicit:

\[
\text{Majorana phases}
\Longrightarrow
\text{relative anomalous pole phase}
\Longrightarrow
\mathcal A_{ij}^{N,\alpha}
\Longrightarrow
\text{orientation-odd Nambu response}.
\]

The missing chain is

\[
\text{Furey exchanged arrows}
\stackrel{?}{=}
\text{CAR Nambu faces}
\stackrel{?}{\longrightarrow}
\text{external Jordan response}.
\]

This is narrower and stronger than saying merely that a complex Majorana mass has an imaginary part.

## 9. Stop-everything and falsification gates

**CAR identification:** a full Fock construction proves that the exchanged arrow is the adjoint/charge conjugate of the original rather than an independent sterile field.

**Response descent:** the same anomalous pole area appears in a gauge-invariant external two-port response with fixed normalization.

**Observable success:** a calculable \(\Delta L=2\) interference measurement determines the sign or magnitude of \(\mathcal A_{ij}^{N,\alpha}\).

**Dirac-pair failure:** the arrows are independent fields. Then their block phase is an ordinary sterile mixing phase, not the Majorana Nambu area derived here.

**Factor-locality failure:** the internal Nambu area is nonzero but every admissible external response remains real and separable.

## 10. Certificate

The [Majorana Nambu pole-area certificate](scripts/verify_majorana_nambu_pole_area.mjs) verifies positive rank-one residues, charged-flavor rephasing invariance, invariance under Majorana sign changes, CP oddness and the exact electron-row identity \(\mathcal A_{12}^{N,e}=\sin(\eta_1-\eta_2)\).

## Companion documents

- [Majorana Nambu sigma-y is not a basis-invariant orientation](175_majorana_nambu_sigma_y_is_not_a_basis_invariant_orientation.md)
- [Weak-basis Majorana projector invariant](181_weak_basis_majorana_invariant_from_charged_lepton_projectors.md)
- [Exchange-paired neutrino two-cycle](170_exchange_paired_neutrino_two_cycle_and_majorana_gate.md)
- [Dimensionless two-frequency orientation observable](189_dimensionless_two_frequency_orientation_observable.md)
