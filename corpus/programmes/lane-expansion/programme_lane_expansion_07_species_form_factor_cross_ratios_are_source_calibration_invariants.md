# Lane Expansion 07: Species Form-Factor Cross-Ratios Are Source-Calibration Invariants

**Date:** 17 October 2026  
**Lane:** L6, amplitudes and bootstrap constraints; cross-link to L1 and L2  
**Claim status:** exact projective invariant and tree-level Standard-Model/Furey checkpoint; interacting form factors remain to be calculated  
**Certificate:** [verify_programme_species_form_factor_cross_ratios.mjs](../../../verification/verify/verify_programme_species_form_factor_cross_ratios.mjs)

## Result

Each matter species couples to the two candidate currents through a two-component vector. At the declared incidence/\(B-L\) checkpoint,

\[
r_f=(\lambda_f,q_f),
\]

with

\[
\begin{array}{c|rrrrrr}
f&Q&u^c&d^c&L&e^c&\nu^c\\ \hline
\lambda_f&5&5&1&1&1&0\\
q_f&1&-1&-1&-3&3&3
\end{array}.
\]

An unknown common calibration \(M\in GL(2,\mathbb R)\) sends every coupling vector to \(Mr_f\). Individual slopes and coupling ratios are basis dependent, but projective cross-ratios of four species are invariant.

For \((Q,u^c;d^c,e^c)\), the exact value is

\[
\boxed{\mathcal C(Q,u;d,e)=\frac{12}{7}.}
\]

This is a dimensionless, calibration-free form-factor checkpoint. It is not yet a novel prediction because the value follows from the chosen incidence and \(B-L\) weights. Its value is that it turns that choice into a direct falsifiable relation among four measured or calculated species couplings.

## 1. Projective construction

For two coupling vectors define their wedge

\[
\Delta_{fg}=\det(r_f,r_g)
=\lambda_fq_g-q_f\lambda_g.
\]

Under a common source redefinition,

\[
\Delta_{fg}\mapsto\det(M)\Delta_{fg}.
\]

Therefore

\[
\boxed{
\mathcal C(a,b;c,d)
=\frac{\Delta_{ac}\Delta_{bd}}
{\Delta_{ad}\Delta_{bc}}}
\]

is invariant whenever the denominator is nonzero.

For the stated quartet,

\[
\Delta_{Qd}=-6,
\quad
\Delta_{ue}=16,
\quad
\Delta_{Qe}=14,
\quad
\Delta_{ud}=-4,
\]

and hence

\[
\mathcal C(Q,u;d,e)
=\frac{(-6)(16)}{(14)(-4)}
=\frac{12}{7}.
\]

## 2. Form-factor interpretation

At a common momentum transfer, define the source-index form-factor vector for species \(f\):

\[
g_f(q^2)=
\begin{pmatrix}
F^f_\lambda(q^2)\\
F^f_{B-L}(q^2)
\end{pmatrix}.
\]

For example, a fermion matrix element may be decomposed as

\[
\langle f(p')|J_i^\mu|f(p)\rangle
=\bar u(p')
\left[
\gamma^\mu F^f_{1,i}(q^2)
+\frac{i\sigma^{\mu\nu}q_\nu}{2m_f}F^f_{2,i}(q^2)
+q^\mu F^f_{3,i}(q^2)
\right]u(p).
\]

Apply the cross-ratio separately to form factors with the same Lorentz structure and at the same kinematic point. Any common finite renormalization or source calibration cancels.

At the free charge checkpoint,

\[
g_f\propto r_f,
\]

so the cross-ratio is \(12/7\). Interactions can make it run through species-dependent vertex corrections and mixing with additional operators. That running is precisely useful information: it tests whether the two-current description behaves as one common projective frame or fragments into species-dependent effective sources.

## 3. Why this is better than comparing raw charges

A raw statement such as “the up-type incidence weight is five” depends on how the incidence source was normalized and sheared against \(B-L\). The cross-ratio does not. It compares four rays in source space, just as a projective surveyor can compare four sight-lines without knowing the absolute ruler length.

The observable also survives an orientation-reversing source transformation because every wedge acquires the same sign and the four signs cancel. It therefore tests the source geometry while remaining deliberately insensitive to the unresolved global orientation bit.

## 4. Landscape ledger

The six species define six marked points on \(\mathbb{RP}^1\). Their projective configuration is a compact, calibration-free summary of the candidate source map. It creates a shared object for:

- measurement-first tomography;
- RG flow of current form factors;
- amplitude and dispersion calculations;
- comparisons with topology-first source assignments;
- analogue implementations with six tagged channels.

Different quadruples give a family of rational checkpoint values. Only a small independent subset is needed because projective transformations have three real degrees of freedom.

## 5. Closure ledger

The value \(12/7\) is inherited from the declared incidence vector; it is not derived from Jordan, Spin(2,3) or exceptional structure. The closure question is whether another lane fixes the same projective configuration dynamically or constrains its interacting flow.

## 6. Concrete go/no-go calculation

Calculate the four matched form-factor vectors for \(Q,u^c,d^c,e^c\) at one ultraviolet scale and evolve them through electroweak and mass thresholds.

**Go signal:** after known Standard-Model corrections, the cross-ratio is stable or follows a parameter-reduced trajectory tied to the incidence/Yukawa graph.

**No-go signal:** independent allowed counterterms or SMEFT operators vary the four rays freely, leaving the cross-ratio unconstrained.

An experimental version uses four tagged processes coupled to the same two external source protocols and reconstructs the four coupling rays from interference data.

## Reproducibility

```powershell
node scripts\verify_programme_species_form_factor_cross_ratios.mjs
```

