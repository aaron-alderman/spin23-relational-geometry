# Frontier Parallel QFT 08: the electron functor is the unique minimal local realization, but it is not forced by the TRO

**Date:** 18 October 2026  
**Status:** exact uniqueness and Ward-character result; action-selection no-go; response normalization pinned  
**Certificate:** [verify_frontier_parallel_qft_electron_action_gate.mjs](scripts/verify_frontier_parallel_qft_electron_action_gate.mjs)

## Result

The last bridge divides into a closed kinematic half and an open dynamical half.

With the one-Higgs, one-generation Standard-Model field content, the Furey electron cycle has a unique renormalizable gauge- and Lorentz-invariant realization:

\[
\mathcal O_e=\epsilon_{ab}L^a e^c(H^\dagger)^b
\]

up to conjugation and an overall coefficient. Its dressed faces are

\[
\chi_L=H^\dagger L,
\qquad \chi_R=e^{c\dagger},
\]

and their relative source character is exactly

\[
d_e(x)=x_L+x_{e^c}-x_H.
\]

Thus the dressed-electron functor is the unique **minimal local realization** of the selected electron topology, and the operator map in QFT document 07 is exact.

However, the TRO and linking algebra do not force this invariant to occur in the action. The family

\[
S_{y_e}=S_{\rm kinetic}+S_{\rm gauge}
-\int d^4x\,[y_e\mathcal O_e+y_e^*\mathcal O_e^\dagger]
\]

has identical representations, TRO arrows and linking algebra for every (y_e\in\mathbb C), including (y_e=0). Therefore

\[
\boxed{\text{TRO/linking data}\not\Longrightarrow
\text{cyclic block-trace interaction rule}.}
\]

The irreducible missing datum is an action functional—equivalently a Dirac/Higgs operator, cyclic cocycle or declared interaction coefficient—that assigns a nonzero weight to the electron cycle.

## 1. Exact minimal uniqueness

Use

\[
L\sim(\mathbf1,\mathbf2)_{-1/2},\quad
e^c\sim(\mathbf1,\mathbf1)_{+1},\quad
H\sim(\mathbf1,\mathbf2)_{+1/2}.
\]

A dimension-four local operator containing (e^c), one other Weyl fermion and one Higgs field must be a colour, weak and hypercharge singlet; contract two undotted Weyl indices; and have dimension (3/2+3/2+1=4). Exhausting the one-generation fermions and (H,H^\dagger) leaves exactly

\[
Le^cH^\dagger.
\]

This is the same closed block cycle

\[
C\xrightarrow{e^c}E\xrightarrow{L}H\xrightarrow{h_C^\dagger}C
\]

found by the Furey calculation. Block composability and four-dimensional gauge/Lorentz invariance select the same monomial. This uniqueness excludes higher-dimensional operators, extra Higgs multiplets, derivatives and new fields.

## 2. A local background-source action generates (\rho_e)

Couple background Abelian sources to the phase currents of (L,e^c,H) in their kinetic terms, and include (y_e\mathcal O_e+\mathrm{h.c.}). For a source direction (x),

\[
L\mapsto e^{i\alpha x_L}L,
\quad e^c\mapsto e^{i\alpha x_{e^c}}e^c,
\quad H\mapsto e^{i\alpha x_H}H.
\]

The dressed faces transform through

\[
\rho_e(x)=\operatorname{diag}(x_L-x_H,-x_{e^c}),
\]

while

\[
\delta_x\mathcal O_e=i\alpha d_e(x)\mathcal O_e.
\]

The local Ward identity therefore has the typed form

\[
\partial_\mu J_x^\mu
=i y_e d_e(x)\mathcal O_e
-i y_e^*d_e(x)\mathcal O_e^\dagger
+\mathcal A_x+\text{EOM/contact terms},
\]

where (mathcal A_x) contains gauge anomalies when present. A conventional local action generates both the face representation and the QFT covector. It does not derive the value or nonvanishing of (y_e).

## 3. Why cyclic trace is genuinely extra

A TRO specifies ternary composition; a linking algebra specifies admissible block multiplication. Neither is an action functional. Three facts make the no-go exact:

1. Any (y_e\in\mathbb C) leaves block incidence unchanged.
2. (y_e=0) removes the interaction without changing the TRO or linking algebra.
3. Independent nonzero rescalings of the three arrows preserve the nonzero-cycle predicate while changing the trace magnitude and phase.

Even a canonical matrix trace on each simple block would neither choose relative weights between simple summands nor require every allowed cyclic word to appear. A trace/state plus an interaction or Dirac operator is extra data. The corpus's cyclic block-trace rule is consequently a defensible model-building axiom, but it is genuinely extra.

## 4. Ward normalization

The integer covector

\[
d_e=(0,0,0,1,1,0,-1)
\]

is fixed by the normalized phase action on elementary fields. It is independent of (y_e), the Higgs vacuum and composite normalization. The divergence amplitude is not fixed:

\[
\partial\cdot J_x\propto y_e d_e(x).
\]

A quantum calculation must also include wave-function and composite-operator renormalization, EOM/contact operators, anomaly operators and electroweak matching. Ward identities preserve the character and constrain counterterms; they do not derive (y_e), a spectral residue or a finite response normalization.

Thus

\[
\text{Ward normalization of the charge character}
\ne\text{normalization of the response kernel}.
\]

## 5. Lorentz typing and the broken-phase gate

The Yukawa action is Lorentz complete: the two left-handed Weyl indices contract antisymmetrically. The response faces require more care. Before symmetry breaking,

\[
[H^\dagger L]=\frac52,
\qquad [e^{c\dagger}]=\frac32.
\]

They do not form a homogeneous linear doublet. In the broken phase one may use

\[
\widetilde\chi_L=\frac{\sqrt2}{v}H^\dagger L,
\qquad \widetilde\chi_R=e^{c\dagger}.
\]

Both then have dimension (3/2), but they retain opposite Weyl chiralities. The local action packages them through a Dirac inverse-propagator structure

\[
\Gamma_e^{(2)}(p)=
\begin{pmatrix}
p\cdot\bar\sigma&m_e^*\\
m_e&p\cdot\sigma
\end{pmatrix},
\qquad m_e=\frac{y_ev}{\sqrt2},
\]

up to convention and radiative self-energies.

A scalar positive (H_2(\mathbb R)) response follows only after a declared helicity projection, Euclidean reflection-positive reduction, spectral-residue extraction or boundary-response construction. The Yukawa action supplies a Lorentz-covariant Dirac kernel, not automatically the scalar Jordan carrier.

## 6. Uniqueness ledger

| Layer | Result | Status |
|---|---|---|
| Furey block incidence | composable electron cycle | exact |
| Minimal SM gauge/Lorentz realization | (Le^cH^\dagger) is unique | exact |
| Source character | face contrast pulls back to (d_e) | exact |
| Local action realizing the character | background-source construction exists | exact |
| Presence of electron interaction | (y_e\ne0) | not forced by TRO |
| Magnitude and phase | (y_e) | independent action datum |
| Homogeneous dressed faces | requires (v) or another scale | broken-phase conditional |
| Scalar positive carrier | requires Lorentz/spectral projection | not derived |
| Physical two-point residue | dynamics and renormalization required | not derived |

## 7. Irreducible pin

The smallest missing action datum is

\[
\boxed{\text{an action functional }\mathscr S
\text{ with }\partial\mathscr S/\partial\mathcal O_e=y_e\ne0.}
\]

In linking-algebra language this is a cyclic functional together with an interaction/Dirac element assigning a nonzero coefficient to the electron three-cycle. Representation and incidence cannot reconstruct it because the (y_e=0) and (y_e\ne0) models have identical such data.

For the full (Spin(2,3)) response claim, one further representation datum is required: a Lorentz-compatible reduction

\[
\Gamma_e^{(2)}(p)\longrightarrow H_2(\mathbb R)_+
\]

that fixes the scalar face metric and spectral normalization. This is separate from the electron-cycle coefficient.

## 8. Verdict

\[
\boxed{
\begin{aligned}
&\text{Furey cycle + minimal SM typing}
\Longrightarrow\text{unique electron monomial and exact }d_e;\\
&\text{Furey TRO/linking algebra alone}
\not\Longrightarrow y_e\mathcal O_e\text{ in the action};\\
&\text{local SM action}\Longrightarrow\rho_e\text{ and the Ward identity};\\
&\text{local action alone}\not\Longrightarrow
\text{a normalized scalar }H_2(\mathbb R)\text{ response.}
\end{aligned}}
\]

The next live branch must propose or derive the missing action principle—spectral action, boundary effective action or another cyclic functional—and calculate the Lorentz-projected electron response kernel. Further algebraic cycling alone cannot decide this gate.

## 9. Dependencies

- [Cyclic Furey Yukawa topology](111_furey_cyclic_yukawa_topology_selection.md)
- [Surviving Furey linking algebras](112_furey_surviving_tro_linking_algebras.md)
- [Dressed charged-lepton response](118_dressed_charged_lepton_h2_response.md)
- [Lorentz and chiral-phase audit](132_lorentz_dimension_and_chiral_phase_audit.md)
- [Electron-cycle coefficient boundary](577_the_unique_electron_cycle_selects_the_neutral_response_channel_but_not_its_sign_phase_or_normalization.md)
- [Exact (d_e) intertwiner](frontier_parallel_qft_07_furey_electron_contrast_intertwines_exactly_with_de.md)

