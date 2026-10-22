# The t132 Trace Has a Nonzero Logarithmic Pole at the Regular Witness Coupling

**Status:** superseded numerical projection; see claim 1707 for the converged coupling scan

> **Supersession notice.**  The two finite-difference levels used below did
> not remove the leading residual Richardson remainder.  A third level moves
> the angular average from `0.4848459348` to `0.4930563167`; the latter agrees
> with the coupling-surface candidate `71/144`.  The nonzero conclusion is
> unchanged, but the coefficient printed below is not the final estimate.

**Depends on:** [the oriented determinant insertion](1705_the_t132_determinant_insertion_is_exactly_oriented_and_nonzero_before_pole_projection.md)

**Evidence:** [pole-projection ledger](../../../evidence/data/spin23-t132-pole-projection-v1.json) and [projection verifier](../../../verification/verify/verify_spin23_t132_pole_projection.py)

For the regular witness point

\[
  (\kappa,a_1,b_X)=(1,2,1),
\]

the symmetrized finite-difference trace was expanded first in
\(z=r^{-2}\), then Richardson-extrapolated in the external momentum.  The
coefficient of \(q^2/r^4\) depends, to the numerical resolution of the
calculation, only quadratically on

\[
  x=n_0^2,\qquad y=n_3^2,
\]

where the remaining directions enter through \(n_1^2+n_2^2=1-x-y\).
Eleven angular samples give maximum residuals \(9.3\times10^{-6}\) for a
quadratic fit and \(1.9\times10^{-6}\) for a cubic fit.  Their exact
Dirichlet moments on \(S^3\) give mutually consistent averages,

\[
 \left\langle c_{q^2/r^4}\right\rangle_{S^3}
 =0.484845934778101.
\]

Using the four-dimensional logarithmic radial factor
\(1/(16\pi^2\epsilon)\), the response coefficient is therefore

\[
 y_{132}=\frac{0.00307032274974331}{\epsilon},\qquad
 h^{TT}_1=\frac{y_{132}}2
 =\boxed{\frac{0.00153516137487165}{\epsilon}}.
\]

The value is decisively nonzero.  The nearby rational \(16/33\) for the
angular average is not asserted: the current computation is numerical and
its finite-difference uncertainty is larger than the discrepancy.

This closes the feasibility and pole-projection questions for `t132` at a
regular point.  It does not close the full first response function.  The
next operation is the same degree-four angular cubature at enough regular
coupling points to reconstruct and falsify candidate dependence on
\((a_1,b_X,\kappa)\).

## Reproduction

~~~powershell
& 'C:\Users\aaron\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe' verification/verify/verify_spin23_t132_pole_projection.py
~~~
