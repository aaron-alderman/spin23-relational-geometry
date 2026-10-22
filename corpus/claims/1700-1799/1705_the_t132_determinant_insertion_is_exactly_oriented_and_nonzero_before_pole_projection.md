# The t132 Determinant Insertion Is Exactly Oriented and Nonzero before Pole Projection

**Date:** 23 October 2026

**Status:** exact intrinsic-Fourier integrand milestone; angular pole projection remains open

**Depends on:** [the flat packet propagator](1704_the_flat_packet_hessian_has_an_exact_34_component_inverse_and_the_expected_de_donder_schur_limit.md)

**Evidence:** [Fourier determinant ledger](../../../evidence/data/spin23-t132-fourier-determinant-insertion-v1.json) and [vectorized verifier](../../../verification/verify/verify_spin23_t132_pole_trace.py)

## Result

A vectorized Fourier-jet engine now constructs all \(34^2\) Hessian entries
in one geometric expansion.  Each derivative carries its factor of \(i\)
inside the algebra, rather than being restored block by block afterward.
The engine constructs both oriented source vertices explicitly:

\[
 H_1(q;p,-p-q),\qquad H_1(-q;p+q,-p),
\]

and verifies

\[
 H_1(-q;p+q,-p)=H_1(q;p,-p-q)^\dagger
\]

with zero numerical residual at the rational witness.

For \(p=(2,3,5,7)\), \(q=e_0\), and
\((\kappa,a_1,b_X)=(1,2,1)\), the packet matrices have ranks

\[
 \operatorname{rank}H_1=30,
 \qquad
 \operatorname{rank}H_2=7.
\]

The complete determinant insertion is

\[
 {1\over2}\operatorname{tr}(G(p)H_2)
 -{1\over4}\operatorname{tr}
 [G(p)H_1(q)G(p+q)H_1(-q)].
\]

At the witness its two terms are

\[
 I_{\rm seagull}=-0.6379310344827596,
 \qquad
 I_{\rm bubble}=-2.2217272513477755,
\]

and hence

\[
 \boxed{I_{t132}=-2.859658285830535.}
\]

The nonzero sum rules out an accidental seagull--bubble cancellation.  It
does not by itself equal a counterterm coefficient: it is one point of the
unintegrated loop symbol.

## Projection correction

The exploratory radial calculation also identifies and rejects a tempting
shortcut.  At fixed \(q=1\), the \(r^{-4}\) term mixes the desired
\(q^2(\nabla T)^2\) response with lower-derivative mass terms and a
\(q^4\) contribution from the curvature sector.  The valid projection is:

1. combine \(I(q)+I(-q)-2I(0)\) to isolate the even source-momentum
   response;
2. use two nonzero source momenta and Richardson extrapolation to remove the
   \(q^4\) term;
3. expand only in even powers of the inverse loop radius; and
4. average the isolated \(q^2/r^4\) coefficient over \(S^3\).

The first coarse angular rules disagree at the few-percent level, so no
pole coefficient is promoted at this checkpoint.  The live task is to
stabilize the radial coefficient on symmetry-related directions and then
use an angular rule of sufficient degree.

## Reproduction

~~~powershell
& 'C:\Users\aaron\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe' verification/verify/verify_spin23_t132_pole_trace.py
~~~
