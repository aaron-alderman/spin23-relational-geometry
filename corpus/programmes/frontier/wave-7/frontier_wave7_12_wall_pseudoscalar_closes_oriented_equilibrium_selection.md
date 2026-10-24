# Frontier Wave 7.12: The Wall Pseudoscalar Closes Oriented Equilibrium Selection

**Date:** 24 October 2026  
**Status:** exact effective-potential closure; microscopic coefficient remains open

## Result

The corpus already contained the physical transformation law needed to lift the projective selector. [Lane Expansion 06](../../lane-expansion/programme_lane_expansion_06_wall_reversal_flips_helicity_but_not_the_spin_summed_h2r_face_response.md) proves that a domain-wall orientation \(w=\pm1\) is invisible to a spin-summed response but reverses a helicity-resolved response.

That wall orientation is the missing pseudoscalar datum. It permits the reflection-invariant equilibrium coupling

\[
\boxed{
V_{\rm bridge}(P,Y;w)
=-\lambda\,w\,\chi(P,Y),
\qquad
\chi(P,Y)=\operatorname{Tr}(J^T[P,Y]).
}
\]

Although \(w\) and \(\chi\) each reverse under orientation reversal, their product does not. The coupling therefore selects an oriented lift without violating the two-projector \(O(2)\) no-go: it uses a genuinely new physical datum supplied by the wall.

## 1. Exact wall parity already in the corpus

For the wall Weyl mode

\[
H_w(\mathbf k)=w\,\boldsymbol\sigma\cdot\mathbf k,
\]

the existing theorem gives

\[
T_0(z,k)
=\frac{z}{k^2-z^2},
\qquad
T_h(z,k)
=\frac{wk}{k^2-z^2}.
\]

Thus

\[
T_0(-w)=T_0(w),
\qquad
T_h(-w)=-T_h(w).
\]

This is precisely the even/odd record split of [the three-record experiment](frontier_wave7_11_three_record_experiment_for_selection_orientation_and_population.md). The new experiment did not invent the parity: it recovered an already established wall-response theorem from the quotient-scar direction.

## 2. The oriented equilibrium potential

Combine the projective alignment term with the wall coupling:

\[
\boxed{
V_w(\theta)
=g\sin^2\theta-\lambda w\sin2\theta,
\qquad
g>0.
}
\]

The stationarity equation is

\[
\partial_\theta V_w
=g\sin2\theta-2\lambda w\cos2\theta=0,
\]

so the selected projective angle obeys

\[
\boxed{
\tan2\theta_*
=\frac{2\lambda w}{g}.
}
\]

Choosing the minimum branch,

\[
\boxed{
\theta_*(w)
=\frac12\operatorname{atan2}(2\lambda w,g)
\pmod{\pi}.
}
\]

Wall reversal flips the selected lift:

\[
\theta_*(-w)=-\theta_*(w).
\]

The overlap coordinate remains even,

\[
t_*=\cos^2\theta_*
=\frac12\left(
1+\frac{g}{\sqrt{g^2+4\lambda^2}}
\right),
\]

while the oriented coordinate follows the wall,

\[
\chi_*
=\sin2\theta_*
=\frac{2\lambda w}{\sqrt{g^2+4\lambda^2}}.
\]

## 3. Stability

At the minimum,

\[
\boxed{
V_w''(\theta_*)
=2\sqrt{g^2+4\lambda^2}>0.
}
\]

The minimum energy,

\[
V_{\min}
=\frac g2-\sqrt{\frac{g^2}{4}+\lambda^2},
\]

is independent of \(w\), as required by reflection symmetry. The two wall orientations are degenerate but select opposite lifts.

This is spontaneous/history-conditioned orientation rather than absolute orientation from nothing:

\[
\boxed{
\text{wall history }w
\quad\Longrightarrow\quad
\text{selected lift }\operatorname{sign}\chi_*.
}
\]

## 4. Why this does not evade the earlier no-go

With \(\lambda=0\), the potential reduces to \(g\sin^2\theta\), and only projective alignment remains. If the wall orientation is averaged,

\[
\frac12[V_{+}(\theta)+V_{-}(\theta)]
=g\sin^2\theta,
\]

the oriented term cancels. If the wall label is forgotten, no scalar constructed from \(P,Y\) alone can restore it.

The logic is therefore consistent:

- two unoriented projectors supply \(t\), not the sign of \(\chi\);
- the wall supplies a physical pseudoscalar \(w\);
- the product \(w\chi\) is an admissible equilibrium scalar;
- erasing or averaging \(w\) restores orientation blindness.

## 5. The exact missing microscopic operator

Lane Expansion 06 already identified the required bridge form,

\[
O_{\rm bridge}
=\Gamma_{\rm face}\otimes
(\hat{\mathbf k}\cdot\boldsymbol\sigma)
\otimes X_{\rm internal}.
\]

The coefficient \(\lambda\) in the effective potential is the low-energy scalar left after such a spin-face or spin-internal interaction is integrated out. The remaining frontier is no longer a vague request for “a coupling.” It is:

\[
\boxed{
\text{derive the sign, magnitude and radiative stability of }\lambda
\text{ from a source-native wall action.}
}
\]

If every permitted \(O_{\rm bridge}\) carries an arbitrary boundary coefficient, the mechanism is feasible but not predictive. If symmetry, anomaly inflow, a Ward identity or a measured microscopic response fixes \(\lambda\), the lightning path advances.

## 6. Experimental predictions

For otherwise matched walls \(w=\pm1\):

1. the scalar or spin-summed response is unchanged;
2. the helicity-resolved response reverses;
3. the selected projective overlap \(t_*\) is unchanged;
4. the selected oriented coordinate \(\chi_*\) reverses;
5. averaging wall histories restores the unoriented potential;
6. detector label randomization erases the measured odd record but does not undo physical selection already produced by the wall.

The fifth and sixth predictions distinguish physical state averaging from detector folding. Mixing wall histories changes the prepared ensemble; randomizing detector labels changes only the record.

## 7. Implication

The first oriented reflexive cycle is now complete at effective-model level:

\[
\boxed{
P
\to
\text{metastable wall }w
\to
\text{localized helicity}
\to
\lambda w\chi(P,Y)
\to
\theta_*(w)
\to
P'.
}
\]

It remains conventional effective physics until \(\lambda\) is derived and measured. But it establishes that boundary history can select an oriented lift through a symmetry-legal scalar, rather than by secretly inserting a target angle.

## Certificate

The companion [wall-pseudoscalar selector certificate](../../../../verification/verify/verify_wall_pseudoscalar_oriented_selector.mjs) verifies wall parity, the exact minimum, positive Hessian, history averaging and detector-folding separation.

