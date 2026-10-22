# The t132 Pole Surface Is Numerically a B-Independent Quadratic in a1

**Status:** converged numerical reconstruction; exact candidate not yet proved

**Supersedes:** the under-extrapolated coefficient in [claim 1706](1706_the_t132_trace_has_a_nonzero_logarithmic_pole_at_the_regular_witness_coupling.md)

**Evidence:** [coupling-surface ledger](../../../evidence/data/spin23-t132-coupling-surface-v1.json), [surface verifier](../../../verification/verify/verify_spin23_t132_coupling_surface.py), and [live scan](../../../verification/verify/scan_spin23_t132_couplings.py)

Factoring the packet Hessian shows exactly that the determinant trace can
depend on \(\kappa\) and \(b_X\) only through

\[
 B=\kappa b_X.
\]

A twelve-point scan on \(a_1=(1,2,3,4)\) and \(B=(1/2,1,2)\), using seven
radii, the exact four-node degree-four angular cubature, two internal
Richardson levels, and a second extrapolation between them, is consistent
with

\[
 \boxed{\left\langle c_{q^2/r^4}\right\rangle
 =\frac{18a_1^2+3a_1-7}{144}}
\]

and no dependence on \(B\).  The largest absolute residual over all twelve
points is \(5.64\times10^{-4}\), with the residual decreasing systematically
as the finite-difference levels are refined.  At the witness point,

\[
 R_{1/16}=0.493056316673778,
 \qquad \frac{71}{144}=0.493055555555556,
\]

whose difference is \(7.61\times10^{-7}\).  If the rational candidate is
confirmed analytically, then

\[
 h^{TT}_1(a_1)=
 \frac{18a_1^2+3a_1-7}{4608\pi^2\epsilon},
 \qquad
 h^{TT}_1(2)=\frac{71}{4608\pi^2\epsilon}.
\]

The numerical evidence is strong enough to select the next path but not to
promote the boxed expression to an exact result.  The next operation is
analytic differentiation in the external momentum followed by an exact
large-loop-momentum reduction.  That calculation must prove both the
quadratic \(a_1\) dependence and cancellation of \(B\).

## Reproduction

~~~powershell
& 'C:\Users\aaron\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe' verification/verify/verify_spin23_t132_coupling_surface.py
$env:SPIN23_SCAN_FINE_GRID='1'
& 'C:\Users\aaron\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe' verification/verify/scan_spin23_t132_couplings.py
~~~
