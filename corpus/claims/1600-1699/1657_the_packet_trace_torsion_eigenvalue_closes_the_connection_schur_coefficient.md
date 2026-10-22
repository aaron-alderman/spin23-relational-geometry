# The Packet Trace-Torsion Eigenvalue Closes the Connection Schur Coefficient

**Date:** 22 October 2026

**Gates:** A1, A2, A4, A6, A7, A8 and A11

**Status:** exact packet-v1 algebraic trace calibration

**Depends on:** [the trace-torsion Schur reduction](1656_only_the_trace_torsion_schur_channel_survives_the_fixed_coframe_msbar_reduction.md) and [quantization packet v1](../../programmes/closure/spin23-gravity-route/quantization-packet-v1.md)

**Evidence:** [trace-eigenvalue ledger](../../../evidence/data/spin23-packet-trace-torsion-eigenvalue-v1.json) and [verifier](../../../verification/verify/verify_spin23_packet_trace_torsion_eigenvalue.mjs)

## Result

The symbolic trace-torsion eigenvalue \(C_t\) in claim 1656 is fixed by the
packet action itself. In the packet's form and Hodge conventions,

\[
R^{ab}(\omega)\wedge\eta_{ab}
=R^{ab}(\mathring\omega)\wedge\eta_{ab}
-{2\over3}t_\mu t^\mu\eta+	ext{boundary}+	ext{other irreps},
\]

while

\[
{}^{(2)}T^a\wedge*{}^{(2)}T_a
={1\over3}t_\mu t^\mu\eta.
\]

Therefore the trace part of the frozen action is

\[
\mathcal L_t
={a_2-2\over6\kappa}t_\mu t^\mu
={C_t\over2}t_\mu t^\mu,
\]

and hence

\[
\boxed{C_t={a_2-2\over3\kappa}}.
\]

On the critical surface \(a_2=-2a_1\),

\[
\boxed{C_t=-{2(a_1+1)\over3\kappa}}.
\]

The admitted branch has \(a_1>0\) and positive gravitational coupling, so
this auxiliary eigenvalue is nonzero. The Schur reduction is well defined.

## Closed Schur coefficient

Substituting this value into claim 1656 gives

\[
\Delta\mathcal L_{\rm Schur}^{(\bar p^2)}
=-{2\kappa b_X^2\over3(a_2-2)}
\left(\bar p_\mu Ds+\bar Xs_\mu\right)^2.
\]

On the critical surface this becomes

\[
\boxed{
\Delta\mathcal L_{\rm Schur}^{(\bar p^2)}
={\kappa b_X^2\over3(a_1+1)}
\left(\bar p_\mu Ds+\bar Xs_\mu\right)^2.
}
\]

Thus every coefficient in the fixed-coframe connection insertion is now
expressed in frozen packet couplings.

## Certificate

The verifier does not import a component scalar-curvature identity. It:

1. constructs the pure trace torsion \(T^a=e^a\wedge t/3\);
2. reconstructs the metric-compatible contorsion;
3. evaluates \(R_{ab}=K_a{}^c\wedge K_{cb}\) on a constant orthonormal
   frame;
4. contracts \(R^{ab}\wedge\eta_{ab}\); and
5. independently evaluates the projector norm.

All four basis one-forms give the Lorentz-covariant coefficients
\(-2/3\) and \(+1/3\), respectively.

## Remaining boundary

The fixed-coframe connection sector is closed through quadratic axial-source
order. What remains is the coframe completion of the reduced operator and
the associated functional trace on the explicit matching backgrounds.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_packet_trace_torsion_eigenvalue.mjs
~~~
