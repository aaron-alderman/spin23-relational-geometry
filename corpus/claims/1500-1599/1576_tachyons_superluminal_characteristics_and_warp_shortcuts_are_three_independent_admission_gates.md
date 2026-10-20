# Tachyons, Superluminal Characteristics and Warp Shortcuts Are Three Independent Admission Gates

**Date:** 20 October 2026

**Gates:** A4, A6 and A8

**Status:** exact diagnostic separation with finite witnesses; no physical faster-than-light solution derived

**Depends on:** [the physical-state rejection of literal two-time propagation](../1200-1299/1220_the_a4_physical_state_gate_blocks_the_typed_action_but_rejects_only_the_naive_two_time_reading.md) and [the current three-family portal construction](1575_a_residual_Z3_family_cycle_realizes_the_two_copy_frame_and_protects_a_three_family_E6_portal.md)

**Evidence:** [causal-spectrum ledger](../../../evidence/data/spin23-causal-spectrum-warp-gate.json) and [deterministic verifier](../../../verification/verify/verify_spin23_causal_spectrum_warp_gate.mjs)

## Result

The programme must not use *tachyon*, *faster than light* and *warp* as
synonyms.  They are controlled by three different mathematical objects:

\[
\boxed{
\begin{array}{rcl}
\text{vacuum stability}&\leftrightarrow&\text{Hessian},\\
\text{local signal cone}&\leftrightarrow&\text{principal symbol},\\
\text{geometric shortcut}&\leftrightarrow&\text{metric/global causal relation}.
\end{array}}
\]

For the symmetry-breaking witness

\[
V(\phi)=-{\mu^2\over2}\phi^2+{\lambda\over4}\phi^4,
\qquad \mu^2,\lambda>0,
\]

the symmetric point has \(V''(0)=-\mu^2\), whereas the two selected vacua
have \(V''(\pm\mu/\sqrt\lambda)=2\mu^2>0\).  The tachyon is the instability
that performs the breaking; it is not a superluminal asymptotic particle.
In an AdS4 phase a negative scalar mass is not even sufficient for
instability: the witness \(m^2\ell^2=-2\) lies above the
Breitenlohner--Freedman bound \(-9/4\).

For

\[
\partial_t^2\phi-c_s^2\partial_x^2\phi+m^2\phi=0,
\]

the characteristic polynomial is \(-\omega^2+c_s^2k^2\); the lower-order
mass term does not enter.  Changing the sign of \(m^2\) therefore does not
change the front cone.  Superluminality is a principal-symbol question,
not a mass-sign question.

Finally,

\[
ds^2=-dt^2+(dx-vdt)^2
\]

has coordinate light speeds \(v\pm1\), which may exceed one, but constant
\(v\) is removed by \(x'=x-vt\).  The metric is flat and supplies no
physical shortcut.  A warp claim requires an inhomogeneous geometry or
nontrivial global connectivity plus a sourced, stable stress tensor.

## Spin(2,3) consequence

The numeral in \(Spin(2,3)\) is a signature label, not a prediction of a
tachyon or a spin-two particle.  A viable selector action must pass all
three independent gates:

1. the selected vacuum Hessian is positive on physical non-gauge modes;
2. the coupled field equations are hyperbolic and their characteristic
   cones are identified;
3. any proposed shortcut is a solution of those equations with an
   admissible source, global causal structure and quantum backreaction.

The exact earlier rejection of two independently propagating times remains
in force.  Reading \(Spin(2,3)\) as a Cartan/conformal/response group does
not introduce a second physical time coordinate.

## Warp and portal boundary

The E6 scalar portal of claim 1575 is an internal interaction channel.  It
does not alter spacetime connectivity.  Promoting *portal* to a geometric
portal requires a new theorem: a selector or defect configuration must
induce a tetrad and metric whose causal relation contains the proposed
shortcut.  Connection holonomy or relational adjacency alone is not that
theorem.

The primary geometric benchmark is Alcubierre's metric construction, which
demonstrates global effective motion but explicitly requires exotic matter
in ordinary GR: [Alcubierre, *The warp drive: hyper-fast travel within
general relativity*](https://arxiv.org/abs/gr-qc/0009013).  The present
claim neither imports that metric nor asserts that the Spin(2,3) selector
can source it.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_causal_spectrum_warp_gate.mjs
~~~
