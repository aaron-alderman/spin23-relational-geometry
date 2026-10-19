# The Binary Theta Phase Is the Quartic Character Pulled Back along a Non-Split Quadratic Section

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B07, B09, B10, B13 and B14  
**Claim status:** exact finite extension and phase-pullback theorem; physical selection of the section remains open

## 1. Result

The quartic character

\[
\chi_r:M/I\to\mathbb Z_4
\]

does reproduce the binary Standard-Model/theta phase exactly—but not through a group homomorphism from the binary state plane.

Let \(r\) be the order-four generator and let \(s,t\) be the two null-leg order-two classes. Define

\[
\boxed{
\widetilde a=s-r,\qquad
\widetilde b=t-r.}
\]

Both have order four and satisfy

\[
\boxed{
2\widetilde a=2\widetilde b=2r\ne0.}
\]

Define the set-theoretic section

\[
\sigma:\mathbb F_2^2\to M/I,
\qquad
\sigma(a,b)=a\widetilde a+b\widetilde b,
\]

where \(a,b\in\{0,1\}\). Then

\[
\boxed{
\chi_r(\sigma(a,b))
=3a+3b\pmod4.}
\]

Therefore

\[
\boxed{
i^{\chi_r(\sigma(a,b))}
=(-i)^{a+b},}
\]

exactly the binary logical phase of the integral \(K_+\) word, the two-puncture Standard-Model code, and the negative \(D_2\) discriminant form.

## 2. Why the section must be non-homomorphic

Every homomorphism

\[
\mathbb F_2^2\to M/I
\]

sends the binary generators to elements of order at most two. For every such element \(g\),

\[
\chi_r(g)\in\{0,2\}.
\]

But the desired phases require

\[
\chi_r(\widetilde a)
=\chi_r(\widetilde b)
=3.
\]

Hence no group-homomorphic section can reproduce the theta phase. The failure of linearity is not an inconvenience; it is the required quadratic refinement.

## 3. The exact extension cocycle

For \(x=(a,b)\) and \(y=(c,d)\), the section defect is

\[
\sigma(x)+\sigma(y)-\sigma(x+y)
=2r\,(ac+bd),
\]

where addition in \(x+y\) is binary. Thus

\[
\boxed{
\delta\sigma(x,y)
=2r\,\langle x,y\rangle_{\rm dot}.}
\]

The common square line \(2G=\langle2r\rangle\) is exactly the central cocycle recording the binary dot product.

The associated phase satisfies

\[
q(x+y)-q(x)-q(y)
=2(ac+bd)\pmod4,
\]

which is the polarization of

\[
q(a,b)=3a+3b\pmod4.
\]

The previously mysterious characteristic line \(2G\) is therefore the obstruction to splitting the binary quadratic phase into an ordinary linear character.

## 4. Reconciliation of the earlier branches

This result joins four independently derived objects:

1. the binary two-puncture code phase
   \[
   (-i)^{a+b};
   \]
2. the negative \(D_2\) discriminant form
   \[
   q_4(a,b)=3a+3b;
   \]
3. the integral \(K_+\) word
   \[
   Q(a,b)=3a^2+4ab+3b^2;
   \]
4. the quartic quotient character
   \[
   i^{\chi_r}.
   \]

On binary inputs \(a^2=a\), \(b^2=b\), and the mixed \(4ab\) vanishes modulo four. Hence all four phase functions agree.

The earlier failure to place the phase directly on \(\langle s,t\rangle\) is now explained: the correct binary states are not the order-two elements \(s,t\), but their order-four lifts \(s-r,t-r\).

## 5. Global inversion

Global-negated puncture exchange acts by inversion on \(M/I\). Therefore

\[
\sigma(a,b)\mapsto-\sigma(a,b)
\]

and

\[
i^{\chi_r(\sigma(a,b))}
\mapsto
i^{-\chi_r(\sigma(a,b))}
=\overline{i^{\chi_r(\sigma(a,b))}}.
\]

This is exactly the expected conjugation of the binary theta/code phase.

## 6. What is and is not canonical

### Exact

- the order-four lifts \(s-r,t-r\);
- their common square \(2r\);
- the cocycle \(2r(ac+bd)\);
- the phase table \(0,3,3,2\);
- conjugation under quotient inversion.

### Still conditional

The lattice basis labels \(s,t,r\) come from the selected index-six fiber and common intersection. A physical derivation must still explain why the code/Furey binary states choose this particular section rather than another section differing by kernel elements.

The exact phase match sharply constrains that choice, but does not by itself turn it into dynamics.

## 7. Stop-everything and falsification gates

### Stop-everything

1. The code's finite Heisenberg extension maps its two logical generators to \(s-r,t-r\).
2. The theta line's cocycle is exactly the common-square class \(2r\).
3. A Furey or Jordan composition law produces these two order-four lifts without a fitted basis.

### Falsifiers and boundaries

- A homomorphic binary section cannot reproduce odd quarter phases.
- Choosing \(s,t\) without the \(-r\) lift gives the wrong phase.
- The result is a finite phase identification, not yet a physical Pfaffian-line isomorphism.
- It does not restore the already falsified support-swap/puncture-exchange equivariance.

## 8. Next calculations

1. Classify all quadratic sections with this phase and determine their stabilizer.
2. Identify whether field orientation selects \((s-r,t-r)\) uniquely.
3. Construct the corresponding finite Heisenberg extension explicitly.
4. Compare the qutrit reduction of the same integral lifts.

## Certificate and companions

- [Quartic-section phase certificate](../../../verification/lift/lift_binary_theta_phase_to_quartic_M_over_I_section.mjs)
- [Independent quartic character](536_the_quartic_m_over_i_character_is_an_independent_global_orientation_line.md)
- [Integral cross-prime phase word](505_the_integral_kplus_word_matches_the_full_binary_and_qutrit_projective_phases_but_not_a_canonical_global_phase.md)
- [Two-puncture binary code phase](503_the_two_puncture_binary_standard_model_code_reproduces_the_diagonal_theta_lift_but_not_the_mutual_shear.md)

