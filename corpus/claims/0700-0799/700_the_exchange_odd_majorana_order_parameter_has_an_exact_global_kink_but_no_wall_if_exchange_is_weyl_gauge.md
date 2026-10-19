# The Exchange-Odd Majorana Order Parameter Has an Exact Global Kink, but No Wall if Exchange Is Weyl Gauge

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B05, B07, B08, B09, B11, B12 and the Majorana symmetry-breaking branch  
**Claim status:** exact two-order-parameter Landau/kink theorem; whether the exchange is global or gauged remains a model-selection question  
**Certificate:** [verify_exchange_odd_majorana_order_parameter_kink.mjs](../../../verification/verify/verify_exchange_odd_majorana_order_parameter_kink.mjs)

## Executive result

The Majorana face asymmetry can be represented by an exact exchange-odd order parameter:

\[
m_+=\frac{m_L+m_R}{2},
\qquad
m_- =\frac{m_R-m_L}{2}.
\]

Under face exchange,

\[
m_+\mapsto m_+,
\qquad
m_-\mapsto-m_-.
\]

The exchange-invariant potential

\[
\boxed{
V(m_+,m_-)
=a(m_+-v)^2
+b(m_-^2-v^2)^2,
\qquad a,b,v>0,
}
\]

has exactly two minima:

\[
(m_L,m_R)=(0,2v)
\quad\text{and}\quad
(2v,0).
\]

If exchange is a global \(\mathbb Z_2\), these are distinct vacua and the model has the exact wall

\[
m_-(x)=v\tanh\bigl(v\sqrt{2b}\,x\bigr),
\qquad m_+(x)=v,
\]

with tension

\[
\boxed{
T_{\rm wall}
=\frac{4\sqrt{2b}}{3}v^3.
}
\]

If exchange is a Weyl gauge transformation of an enlarged group, the two minima are representatives of one gauge orbit. The global wall is then gauge-artificial; physical defects must instead be classified from the full vacuum quotient.

This is the precise global-versus-gauge fork behind a one-sided seesaw.

## 1. Exchange decomposition

The two-face Majorana tensor is

\[
\mathcal M
=m_+I+m_DS+m_-Z.
\]

Because

\[
SZS=-Z,
\]

the coefficient \(m_-\) is odd under exchange. The coefficient \(m_+\) is even.

The right-only and left-only seesaw orientations are

\[
(m_L,m_R)=(0,M)
\Longleftrightarrow
(m_+,m_-)=\left(\frac M2,+\frac M2\right),
\]

\[
(m_L,m_R)=(M,0)
\Longleftrightarrow
(m_+,m_-)=\left(\frac M2,-\frac M2\right).
\]

They are exchanged by \(S\).

## 2. Why the potential is minimal but not unique

Exchange symmetry requires the potential to be even in \(m_-\). It imposes no sign symmetry on the even variable \(m_+\), so centering it at a positive value \(v\) is allowed.

The displayed potential is the simplest decoupled polynomial selecting one-sided masses. At either minimum its Hessian is

\[
\operatorname{Hess}V
=
\begin{pmatrix}
2a&0\\
0&8bv^2
\end{pmatrix},
\]

which is positive definite.

Mixed terms such as \(m_+m_-^2\) are symmetry allowed and will shift masses and wall profiles. Therefore the polynomial is an existence model, not a uniquely derived Furey or Jordan potential.

## 3. Exact global kink

For a static one-dimensional profile with canonical kinetic term,

\[
E=\int dx\left[
\frac12(\partial_xm_-)^2
+b(m_-^2-v^2)^2
\right],
\]

the Euler–Lagrange equation is

\[
m_-''=4bm_-(m_-^2-v^2).
\]

The exact solution interpolating between the two vacua is

\[
m_-(x)=v\tanh(kx),
\qquad
k=v\sqrt{2b}.
\]

It satisfies the first integral

\[
\frac12(m_-')^2
=b(m_-^2-v^2)^2.
\]

The certificate verifies the differential equation and first integral at multiple points and numerically reproduces the analytic tension.

## 4. Global exchange interpretation

If \(S\) is a genuine global discrete symmetry, the vacuum manifold contains two disconnected points:

\[
\pi_0(\mathcal V)=\mathbb Z_2.
\]

A spatial region choosing a right-heavy seesaw and one choosing a left-heavy seesaw cannot be joined without crossing the wall. Cosmological stability then becomes a serious constraint unless:

- exchange breaking occurs before or during inflation;
- a small explicit bias removes one vacuum;
- walls decay through additional fields;
- or the model is never thermally restored.

These are physical requirements, not optional aesthetic details.

## 5. Weyl gauge interpretation

The finite Dirac exchange was identified as a Weyl operation inside the full \(SO(10)\) weight system. If the corresponding transformation is gauged in the ultraviolet, field configurations related by \(S\) are gauge equivalent.

Then

\[
(0,2v)\sim(2v,0)
\]

in the physical vacuum quotient. The two minima of a gauge-fixed potential do not imply a physical domain wall.

This does not prove there are no defects. Breaking a gauge group \(G\) to \(H\) must be classified using

\[
G/H
\]

with its actual global quotient. Strings, monopoles or textures may occur for different homotopy reasons. The present scalar kink is not sufficient evidence for them.

## 6. Spurion interpretation

If \(m_-\) is not dynamical, but a fixed exchange-odd spurion, there is no wall solution. Exchange is explicitly broken and the sign is external input.

This option is algebraically consistent but weakens the unification claim: the theory no longer explains why the right face rather than the left face becomes heavy.

The three cases must be kept separate:

| Status of \(m_-\) | Exchange | Vacuum consequence |
|---|---|---|
| dynamical, global | spontaneous | two vacua and a wall |
| dynamical, gauged Weyl | gauge orientation | one physical orbit; classify \(G/H\) |
| fixed spurion | explicit breaking | no wall; sign inserted |

## 7. Relation to the topology selector

The exchange-fixed CP selector is formulated on the response observable algebra. A nonzero \(m_-\) acts in the neutrino matter factor and biases one chirality face.

If the total Hilbert space factorizes as

\[
\mathcal H_{\rm response}
\otimes
\mathcal H_{\rm neutrino},
\]

then response exchange can remain a real-structure redundancy while neutrino exchange is broken by \(m_-\). The identical Pauli notation must not obscure the factor distinction.

If instead the same \(S\) acts irreducibly on both, a one-sided Majorana vacuum breaks the selector symmetry and the CP twirl requires reinterpretation as a broken-phase reduced channel.

## 8. Stop-everything and falsification criteria

Stop a proposed model if:

1. it predicts a global exchange wall but ignores cosmological consequences;
2. it declares the two minima gauge equivalent without embedding \(S\) in the ultraviolet gauge group;
3. it calls a fixed spurion spontaneous symmetry breaking;
4. it infers a physical wall from a gauge-fixed double-well alone;
5. it uses the same \(m_-\) to break matter exchange while assuming the identical exchange is exact on an inseparable response factor.

A stop-everything positive result would identify the ultraviolet gauge/global status of \(S\), derive the potential from the Furey/Jordan action and show how the selected vacuum leaves the low-energy \(Spin(2,3)\) observable carrier intact.

## 9. Next gates

1. Embed \(m_-\) into an explicit left-right or \(SO(10)\) scalar representation and compute the true vacuum quotient.
2. Add allowed mixed terms and determine whether the one-sided minima persist naturally.
3. Couple the kink/order parameter to the Higgs-frame Hopf bundle and test defect intersections.
4. Derive the broken-phase reduced CP selector if exchange is spontaneously broken.
5. Extend the potential to three-family complex symmetric Majorana order parameters.

## Reproducibility

    node scripts\verify_exchange_odd_majorana_order_parameter_kink.mjs

## Companion documents

- [Type-I seesaw decoupling is not the topology twirl](../0600-0699/699_type_i_seesaw_decoupling_selects_one_face_and_cannot_be_the_topology_twirl.md)
- [Majorana Takagi freedom versus topology exchange](../0600-0699/698_a_majorana_mass_reduces_takagi_phase_freedom_but_a_type_i_seesaw_breaks_exact_topology_exchange.md)
- [Higgs-frame Hopf defect](../0600-0699/696_the_higgs_dressed_exchange_has_a_hopf_frame_defect_but_not_a_topologically_protected_standard_model_string.md)
