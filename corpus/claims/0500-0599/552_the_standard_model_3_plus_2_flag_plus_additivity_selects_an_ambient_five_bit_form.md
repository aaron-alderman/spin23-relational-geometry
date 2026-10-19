# The Standard-Model \(3+2\) flag plus additivity selects an ambient five-bit form

## Status

**Exact exhaustive invariant-form classification and explicit finite quadratic isometry. Physical derivation of the orientation sign and additivity axiom remains open.**

The coordinate-normal search found no \(S_3\times S_2\)-invariant ambient form. The full invariant search gives a more positive result.

Among all 128 \(\mathbb Z_4\)-quadratic polynomials invariant under the Standard-Model color/weak permutation group, exactly four are nondegenerate and have the ambient phase distribution

\[
0^{10},1^6,2^6,3^{10}.
\]

Exactly one of those four has no cross terms:

\[
\boxed{
q_{\rm SM}(x)
=3(x_1+x_2+x_3)+(x_4+x_5)
\pmod4.}
\]

Thus the \(3+2\) flag together with an additivity/locality requirement selects a unique candidate of the required Brown class.

## 1. General flag-invariant polynomial

Let

\[
C=x_1+x_2+x_3,
\qquad
W=x_4+x_5.
\]

Every \(S_3\times S_2\)-invariant quadratic polynomial has the form

\[
\begin{aligned}
q(x)=&
\alpha_C C+\alpha_W W\\
&+2\beta_{CC}(x_1x_2+x_1x_3+x_2x_3)\\
&+2\beta_{WW}x_4x_5\\
&+2\beta_{CW}CW
\pmod4,
\end{aligned}
\]

where

\[
\alpha_C,\alpha_W\in\mathbb Z_4,
\qquad
\beta_{CC},\beta_{WW},\beta_{CW}\in\mathbb F_2.
\]

There are

\[
4^2\cdot2^3=128
\]

such polynomials.

## 2. The four ambient-type invariant forms

Exhaustive enumeration leaves exactly four forms with nondegenerate polar pairing and the ambient value distribution:

\[
\begin{array}{c|ccccc}
&\alpha_C&\alpha_W&\beta_{CC}&\beta_{WW}&\beta_{CW}\\
\hline
q_1&1&1&0&0&1\\
q_2&1&2&0&1&0\\
q_3&3&1&0&0&0\\
q_4&3&2&0&1&1
\end{array}
\]

Each is explicitly \(GL(5,2)\)-isometric to

\[
q_J(a,b,c,d,e)=2ab+3c+2de.
\]

Therefore the Standard-Model flag does permit the ambient Brown class; it leaves four invariant refinements before additional selection.

## 3. Unique additive refinement

Requiring no pairwise cross terms means

\[
\beta_{CC}=\beta_{WW}=\beta_{CW}=0.
\]

Only \(q_3\) survives:

\[
\boxed{
q_{\rm SM}
=3C+W.}
\]

Its phase factorizes:

\[
i^{q_{\rm SM}(x)}
=\prod_{j=1}^3(-i)^{x_j}
\prod_{j=4}^5 i^{x_j}.
\]

Thus:

- each color oscillator contributes an inverse quarter phase;
- each weak oscillator contributes a forward quarter phase.

The form is manifestly invariant under permutations within the color triple and weak pair.

## 4. Phase distribution and Gauss sum

The Gauss sum factorizes:

\[
\sum_xi^{q_{\rm SM}(x)}
=(1-i)^3(1+i)^2
=4-4i.
\]

Hence the normalized phase is

\[
\frac{1-i}{\sqrt2},
\]

exactly the normalized Gauss phase of the ambient shell.

The \(3+2\) imbalance determines the phase:

\[
3\left(-\frac{\pi}{4}\right)
+2\left(\frac{\pi}{4}\right)
=-\frac{\pi}{4}.
\]

This is an exact arithmetic consequence of assigning opposite quarter-phase orientations to the color and weak blocks.

## 5. Explicit isometry to the ambient normal form

Let the ambient normal coordinates be

\[
(a,b,c,d,e).
\]

One explicit linear isometry sends the five source basis vectors to

\[
\begin{aligned}
x_1&\mapsto a+c,\\
x_2&\mapsto b+c,\\
x_3&\mapsto a+b+c+d+e,\\
x_4&\mapsto a+b+c+d,\\
x_5&\mapsto a+b+c+e.
\end{aligned}
\]

The five images are linearly independent over \(\mathbb F_2\), and direct evaluation on all 32 states gives

\[
\boxed{
q_J(\Phi x)=q_{\rm SM}(x).}
\]

This is a genuine non-coordinate intertwiner. It avoids distinguishing one color direction or pairing individual gauge coordinates.

## 6. What selects the sign?

The flag and additivity determine the coefficients within the chosen Brown orientation:

\[
3\text{ on color},\qquad1\text{ on weak}.
\]

Complex conjugation reverses all quarter phases and gives the opposite normalized Gauss phase. The source data considered so far do not yet prove why the ambient correspondence chooses

\[
(1-i)/\sqrt2
\]

rather than its conjugate.

Possible selectors include:

- chirality;
- the old quartic orientation character;
- a Pfaffian or determinant-line convention;
- the orientation of the Hadamard correspondence;
- Furey conjugation or weak-root transport.

The sign is an orientation problem, not a remaining isometry problem.

## 7. Meaning of additivity

The no-cross-term condition can be read as:

\[
q(x+y)=q(x)+q(y)
\]

whenever \(x,y\) occupy different source oscillator axes.

This is natural for independent local phase assignments, but it is not automatic from the anomaly code. The source code's transversal phase acts on field coordinates, whereas \(q_{\rm SM}\) is written on the five oscillator/Cartan bits.

Therefore “additivity” must eventually be derived from a Furey, Jordan, stress-response or code-sewing operation. It cannot simply be declared fundamental.

## 8. Consequences

### Established

- all 128 flag-invariant quadratic polynomials have been tested;
- exactly four have the ambient nondegenerate isometry type;
- all four admit explicit \(GL(5,2)\) isometries to \(q_J\);
- the no-cross-term condition selects \(q_{\rm SM}=3C+W\) uniquely;
- its Gauss phase equals the ambient phase;
- the explicit intertwiner preserves the full \(S_3\times S_2\) symmetry at the form level.

### Corrected

- the previous no-go applies only to coordinate-normal singleton-and-matching forms;
- the Standard-Model flag does support the ambient quadratic class through a non-coordinate map;
- the remaining obstruction is selection of additivity and orientation, not existence.

### Open

- deriving the opposite color/weak quarter phases;
- lifting \(\Phi\) from the finite bit space to an integral lattice map;
- identifying the phase with a physical determinant or anomaly line;
- relating the five oscillator bits explicitly to the Furey-completed matter TRO;
- testing the code automorphism action after transport through \(\Phi\).

## 9. Stop-everything and falsification gates

### Stop-everything

1. Furey's color/weak construction derives the phase assignment \((-i,-i,-i,+i,+i)\).
2. The old quartic orientation line fixes the sign of the normalized Gauss phase.
3. The finite isometry \(\Phi\) lifts to an integral Jordan/\(Spin(2,3)\) correspondence.
4. The transported code action embeds in \(O(q_J)\) and preserves the Hadamard lattice tower.

### Boundaries

- additivity is an additional axiom until derived;
- the finite isometry is not yet an integral field map;
- the opposite conjugate Brown orientation remains mathematically available;
- form invariance does not alone produce dynamics.

## Certificate and companions

> **Cycle 470 resolution.** The displayed finite isometry does lift unimodularly to an isometry
> \(\langle-2\rangle^3\oplus\langle2\rangle^2\cong U(2)\oplus\langle-2\rangle\oplus U(-2)\).
> See [The finite Standard-Model phase isometry lifts exactly to the integral \(Spin(2,3)\) intersection lattice](554_the_finite_standard_model_phase_isometry_lifts_exactly_to_the_integral_spin23_intersection_lattice.md). The remaining source-derivation and orientation gates are unchanged.

- [Flag-invariant five-bit classification and isometry certificate](../../../verification/classify/classify_five_bit_ambient_quadratic_twists_under_source_symmetry.mjs)
- [Coordinate-normal no-go, corrected scope](551_no_ambient_type_five_bit_twist_is_selected_by_the_standard_model_3_plus_2_flag.md)
- [Source isotropic five-bit quotient](550_the_source_five_sign_bits_are_totally_isotropic_and_do_not_equal_the_ambient_quadratic_shell.md)
- [Ambient five-bit shell](549_the_two_ambient_spin23_lattices_intersect_in_a_five_bit_quadratic_shell.md)
