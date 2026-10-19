# Electromagnetic Superselection Protects the Neutrino \(H_2\) Corner

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B05, B08 and B11  
**Claim status:** exact commutant theorem for gauge-invariant two-point kernels; charged-spurion dynamics remains conditional

## 1. The leakage question

The neutrino corner

\[
p_\nu M_3(\mathbb C)p_\nu,
\qquad p_\nu=p_E+p_D,
\]

is not a two-sided ideal of the full linking algebra \(M_3(\mathbb C)_{(E;C,D)}\). Algebraically, generic \(M_3\) operations can mix it with the charged \(C\) direction.

A physical vacuum response is not a generic linking-algebra element. It must respect the unbroken gauge group.

After electroweak symmetry breaking, the relevant exact protection is electromagnetic \(U(1)_Q\).

## 2. Exact commutant theorem

In the ordered basis \((E,C,D)\), the endpoint electric charges are

\[
q_E=0,
\qquad q_C=1,
\qquad q_D=0.
\]

Hence

\[
U(\theta)=\operatorname{diag}(1,e^{i\theta},1).
\]

Let \(K\in M_3(\mathbb C)\) be a gauge-invariant two-point kernel:

\[
U(\theta)KU(\theta)^\dagger=K
\qquad\forall\theta.
\]

Entrywise,

\[
K_{ij}\mapsto e^{i(q_i-q_j)\theta}K_{ij}.
\]

Therefore

\[
K_{ij}=0
\qquad\text{whenever}\qquad q_i\ne q_j.
\]

Every invariant kernel has the form

\[
\boxed{
K=
\begin{pmatrix}
a&0&z\\
0&c&0\\
w&0&d
\end{pmatrix}.
}
\]

For a Hermitian kernel, \(w=\bar z\). Thus

\[
\operatorname{Comm}_{M_3}(U(1)_Q)
\cong M_2(\mathbb C)_{E,D}\oplus\mathbb C_C.
\]

The neutrino Peirce projection is central in this physical commutant:

\[
[p_\nu,K]=0
\qquad
\forall K\in\operatorname{Comm}(U(1)_Q).
\]

## 3. Consequence: no linear leakage

The neutral response and charged response split exactly:

\[
K=K_\nu\oplus K_C,
\qquad
K_\nu\in M_2(\mathbb C),
\quad K_C\in\mathbb C.
\]

Therefore gauge-preserving radiative corrections cannot generate a linear neutral–charged mixing term. They may:

- renormalize \(a,d,z\) inside the neutral block;
- renormalize the charged scalar \(c\);
- generate thresholds and branch cuts within either charge sector.

They cannot generate \(K_{EC}\) or \(K_{DC}\) without a charged insertion.

The earlier generic linking-algebra leakage obstruction is therefore absent for gauge-invariant two-point functions in an electromagnetism-preserving vacuum.

## 4. Reinterpreting the charged-channel Schur complement

The general Schur kernel

\[
K=\begin{pmatrix}A&b\\b^\dagger&c\end{pmatrix}
\]

with \(b\ne0\) is gauge **covariant**, not gauge invariant. The vector \(b\) carries the opposite charge of the \(C\) channel.

It can occur in:

- a background-dependent kernel before imposing gauge invariance;
- a source-generating functional with charged external sources;
- a gauge-fixed intermediate calculation;
- an operator-valued kernel containing a charged spurion;
- a phase in which electromagnetic \(U(1)\) is broken.

It cannot be a c-number vacuum two-point kernel while electromagnetism remains unbroken.

For the physical invariant vacuum kernel, \(b=0\), so charged-channel Schur elimination is trivial:

\[
R_\nu=A.
\]

Nontrivial charged-loop effects appear as gauge-invariant self-energy corrections already contained in \(A\), typically through paired vertices rather than a charged expectation value.

## 5. Real slice and radiative stability

Gauge symmetry protects the complex neutral corner \(H_2(\mathbb C)\), but it does not force its off-diagonal coordinate \(z\) to be real. Reciprocity or a CP-like antiunitary remains necessary for

\[
z=\bar z.
\]

Thus the selection hierarchy is now precise:

\[
U(1)_Q
\quad\Longrightarrow\quad
H_2(\mathbb C)_{E,D}\text{ is closed},
\]

\[
\kappa_{\rm reciprocity}
\quad\Longrightarrow\quad
H_2(\mathbb R)_{E,D}\text{ is fixed}.
\]

Gauge invariance supplies dynamical isolation; the antiunitary supplies the real form.

## 6. Connection to neutrino phases

Because both \(E\) and \(D\) are neutral, a complex off-diagonal Majorana/Dirac response is gauge allowed. Its imaginary \(\sigma_y\) coordinate cannot be removed by electromagnetic gauge transformations.

It may encode:

- a Majorana phase;
- absorptive spectral structure;
- CP violation;
- causal orientation in the retarded response.

Consequently the real-slice condition is physical, not a gauge choice.

## 7. Revised branch status

- **Established:** the neutrino corner is not an ideal of the full linking algebra.
- **Established:** it is a direct summand of the electromagnetic commutant algebra.
- **Established:** invariant two-point kernels cannot leak linearly into the charged direction.
- **Open:** whether the physical retarded/spectral kernel obeys the reciprocity antiunitary required for \(H_2(\mathbb R)\).
- **Open:** whether CP-violating neutrino phases source the orientation-odd component instead of being projected out.

## 8. Stop-everything and falsification gates

**Stop-everything positive:** the full Standard-Model vacuum polarization restricted to the completed Furey carrier has commutant exactly \(H_2(\mathbb C)_{E,D}\oplus\mathbb R_C\), and its causal antiunitary fixes the observed \(H_2(\mathbb R)\) response while retaining PMNS phases in the flavor factor.

**Radiative success:** all counterterms preserve the neutral direct summand and renormalize only its Jordan coordinates and flavor-valued spectral measure.

**Electromagnetic failure:** the proposed vacuum requires a charged expectation value or neutral--charged propagator, breaking the observed massless photon symmetry.

**Reality failure:** the neutral response is generically complex Hermitian and no source-derived reciprocity operation selects its real slice.

## 9. Certificate

The [electromagnetic-superselection certificate](../../../verification/verify/verify_em_superselection_neutrino_corner.mjs) solves the full linear commutant of \(\operatorname{diag}(1,e^{i\theta},1)\), verifies the \(M_2\oplus\mathbb C\) decomposition, centrality of the neutrino projection within the commutant, and failure of a charged off-diagonal kernel to remain invariant.

## Companion documents

- [Neutrino Peirce corner](168_neutrino_peirce_corner_restores_gauge_neutral_h2r.md)
- [Charged-channel Schur response](169_charged_channel_schur_elimination_to_neutrino_h2_response.md)
- [Antiunitary reciprocity selector](161_antiunitary_reciprocity_selector_and_five_directions.md)
- [Neutral Fock action and response separation](171_neutral_fock_action_and_positive_response_separation.md)

