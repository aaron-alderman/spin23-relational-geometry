# The pi-flux signless triangle forces the up-mass slope positive

**Date:** 20 October 2026

**Gates:** A5 and A6

**Status:** exact spectral inequality plus bounded audit of the two surviving delta-equals-pi branches

**Depends on:** [the corrected phasor and ordering audit](1481_exact_phasor_bounds_exclude_one_spectral_witness_and_a_rooted_branch_overpredicts_vcb.md)

**Evidence:** [machine-readable branch audit](../../../evidence/data/spin23-pi-flux-signless-slope-bound.json) and [executable verifier](../../../verification/verify/verify_spin23_pi_flux_signless_slope_bound.mjs)

## Result

At loop phase (delta=\pi), a vertex-sign gauge transformation turns

\[
K_u=D-H_+
\]

into the weighted signless Laplacian (Q) of the positive triangle. If its edge weights are (a,b,c\ge0), put (S=a+b+c) and order its eigenvalues as (lambda_1\le\lambda_2\le\lambda_3). Then

\[
\boxed{\lambda_2\le\frac S2}
\]

and its affine spectral location satisfies

\[
\boxed{
r_{\rm sorted}=\frac{\lambda_2-\lambda_1}{\lambda_3-\lambda_1}\le\frac13.
}
\]

Consequently a negative affine mass-squared slope, which reverses the order, obeys

\[
r_{\rm physical}=1-r_{\rm sorted}\ge\frac23.
\]

It cannot reproduce the observed up-sector location (r_u\simeq1.36\times10^{-5}). The up-sector affine slope is therefore forced positive on the entire (delta=\pi) triangle family.

## Proof

The signless Laplacian has

\[
\operatorname{tr}Q=2S,
\qquad
e_2(Q)=3(ab+bc+ca),
\qquad
\det Q=4abc.
\]

Its characteristic polynomial at (S/2) is

\[
\det\left(\frac S2I-Q\right)
=-\frac18\left(3S^3-12S(ab+bc+ca)+32abc\right).
\]

Schur's degree-three inequality gives

\[
S^3+9abc\ge4S(ab+bc+ca),
\]

so the bracket equals three times the Schur remainder plus (5abc) and is nonnegative. Hence the characteristic polynomial is nonpositive at (S/2).

Also, the Rayleigh quotient of ((1,-1,0)) is ((b+c)/2\le S/2), so (lambda_1\le S/2), while (lambda_3>S/2) follows from the trace. The characteristic-polynomial sign then forces (lambda_2\le S/2).

Finally, using (lambda_1+lambda_2+lambda_3=2S),

\[
r_{\rm sorted}\le\frac13
\Longleftrightarrow
4\lambda_2\le2S+\lambda_1,
\]

which follows from (4\lambda_2\le2S\le2S+\lambda_1), since (Q\succeq0).

The bound is sharp: at ((a,b,c)=(1/2,1/2,0)), the spectrum is ((0,1/2,3/2)) and (r=1/3).

## Corrected branch inventory

The four nominal affine slope-sign choices reduce at (delta=\pi) to two:

- up increasing/down increasing;
- up increasing/down decreasing, with the *sorted* down target rooted at (1-r_d).

The two branches with decreasing up slope have no solution by the theorem, not merely because a search missed them.

A bounded scan over 161 logarithmic (a/c) values and all detected roots found 389 increasing/increasing solutions and 197 increasing/decreasing solutions. Their best recorded four-observable log scores were (1.5844) and (0.7377), respectively. Neither approached the CKM target, but these are not certified global minima.

## Boundary

The proof uses the (pi)-flux gauge equivalence to a positive signless Laplacian. It does not extend automatically to general (delta). The next search should leave the (delta=\pi) boundary and use the centered-cubic elimination to enumerate the two-dimensional general-holonomy surface with slope signs built in from the start.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_pi_flux_signless_slope_bound.mjs
~~~
