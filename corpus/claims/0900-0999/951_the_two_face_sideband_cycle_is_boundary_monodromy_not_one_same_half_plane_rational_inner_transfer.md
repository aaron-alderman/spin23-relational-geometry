# The Two-Face Sideband Cycle Is Boundary Monodromy, Not One Same-Half-Plane Rational-Inner Transfer

**Date:** 17 October 2026  
**Branches:** causality, sideband analyticity, rational-inner dilation, local real interface, loss, and active Coxeter monodromy  
**Claim status:** exact analytic no-go in the ordinary same-half-plane category  
**Certificate:** [prove_the_two_face_sideband_cycle_is_not_one_same_half_plane_rational_inner_transfer.mjs](../../../verification/prove/prove_the_two_face_sideband_cycle_is_not_one_same_half_plane_rational_inner_transfer.mjs)

## Executive result

The two-face expression

\[
\mathcal C(\omega)=D S(-\omega)D S(+\omega)
\]

is an exact conservative boundary cycle, but it is not the boundary value of one ordinary upper-half-plane analytic rational-inner transfer using \(z\) as a common forward-frequency variable.

The obstruction is not a lack of environment ports.  It is analytic orientation.  The factor \(S(-z)\) moves the lower-half-plane poles of \(S(z)\) into the upper half-plane.  Those poles do not cancel:

- for strict loss, noncancellation is already visible in the determinant;
- at zero loss, the determinant cancels but the noncommuting response grading leaves poles in individual matrix entries.

Therefore no finite-dimensional same-half-plane rational-inner matrix \(\widetilde{\mathcal C}(z)\) and constant embedding \(J\) can satisfy

\[
J^*\widetilde{\mathcal C}(z)J
=D S(-z)D S(z)
\]

on a domain containing the upper half-plane.  Compression preserves analyticity.

The correct exact category is the one already suggested by the physics:

\[
\boxed{\text{two oppositely oriented analytic faces}+\text{local real-interface sewing}.}
\]

## 1. Strict-loss determinant obstruction

For one eigenchannel let

\[
f(z)=\left(\frac{z-ia}{z+ib}\right)^2,
\qquad 0<a<b.
\]

Its two-face determinant factor is

\[
f(-z)f(z)
=\left(\frac{z^2+a^2}{z^2+b^2}\right)^2.
\]

At the upper-half-plane point \(z=ib\), the denominator vanishes while

\[
z^2+a^2=a^2-b^2\ne0.
\]

Thus the pole cannot cancel.  The complete normal/tangent determinant contains such a factor for each lossy eigenchannel.  No analytic dilation can have a nonanalytic compression.

## 2. Why losslessness does not rescue a common analytic transfer

When \(a=b=\gamma\),

\[
f(-z)=f(z)^{-1},
\]

so the determinant obstruction disappears.  But the grading \(D\) is not diagonal in the response eigenbasis.

With the fixed 60-degree response rotation \(U\),

\[
M=U^TDU
=\begin{pmatrix}
-1/2&-\sqrt3/2\\
-\sqrt3/2&1/2
\end{pmatrix}.
\]

Writing \(F=\operatorname{diag}(f_n,f_t)\), the lossless cycle in that basis is

\[
M F^{-1}M F.
\]

Its off-diagonal entry contains

\[
M_{12}M_{11}\frac{f_t}{f_n}.
\]

Because \(M_{12}M_{11}=\sqrt3/4\ne0\) and \(\gamma_n\ne\gamma_t\), \(f_n\) has a zero at \(z=i\gamma_n\) where \(f_t\) is finite and nonzero.  Hence the entry has an upper-half-plane pole.  The finite-frequency order-three checkpoint is exact, but the entire \(z\)-dependent cycle is not a single causal transfer function.

## 3. Interpretation of documents 949–950

The six- and ten-port two-face constructions remain unitary for each real boundary frequency.  They are exact conservative **boundary families** assembled from two separately analytic faces.  Calling the whole product one rational-inner transfer in the same frequency orientation would be wrong.

This distinction is structural:

| object | analytic status |
|---|---|
| each positive-oriented face | upper-half-plane rational inner after dilation |
| opposite face in its own oriented coordinate | rational inner |
| product written as \(S(-z)S(z)\) in one coordinate | generally has upper-half-plane poles |
| real-interface cycle on the boundary | exact conservative monodromy |

The local interface does not violate causality.  It reverses orientation between two analytic charts and uses Fourier reality to identify their boundary data.

## 4. Consequence for port minimality

The proposed search for a direct four-port same-half-plane dilation of the complete cycle is closed negatively in the ordinary category.  Increasing the environment dimension cannot restore analyticity of the prescribed observed corner.

Meaningful alternatives are:

1. retain two oriented faces and ask for minimal ports per face;
2. formulate a real two-sided or Krein-space colligation with an explicit orientation reversal;
3. use a Floquet frequency-converting system with separate input and output frequency coordinates;
4. study the cycle only as a discrete boundary monodromy at the selected frequency.

The minimal four-port theorem for each strict-loss face remains valid.  The six-port fresh-environment boundary cascade remains valid.  “Globally minimal rational-inner cycle” is not a well-posed target until the analytic category is changed.

## 5. Jordan-triple reading

This no-go strengthens rather than weakens the relational interpretation.  The composition is not multiplication of two endomorphisms living in one analytic chart.  It uses a middle operation that reverses the face orientation:

\[
(\text{face }+)
\xrightarrow{\;DK\;}
(\text{face }-)
\xrightarrow{\;\text{return}\;}
\text{monodromy}.
\]

The “twist” is therefore genuine categorical data.  Removing it to force a single complex-linear transfer changes the problem.

## 6. What remains open

- minimal realization theory in the two-oriented-face category;
- a real state-space or Floquet formulation that treats the frequency reversal as an explicit port map;
- whether the neutral handle acts as the chart-exchange operation on the full carrier;
- whether the Galois trace pair belongs to the internal state of each face or to the interface;
- microscopic derivation of the real interface and loss parameters.

## 7. Stop-everything and falsification criteria

**Oriented-colligation trigger:** a rigorous two-chart realization theorem gives a minimal conservative state space and identifies its interface invariant.

**Handle trigger:** the selector handle is proved to implement the analytic-chart exchange while preserving the full symplectic carrier.

**Floquet trigger:** a causal frequency-converting realization reproduces the boundary monodromy with explicit pump-energy and noise accounting.

**Same-half-plane falsifier:** a proposed analytic completion leaves the upper poles of \(S(-z)\) uncancelled.

**Checkpoint overclaim:** equality at \(\omega_0\) is used to claim equality of analytic functions on a frequency domain.

**Port-count warning:** adding ports is offered as a cure for a pole in the prescribed observed compression.

## 8. Verdict

| Question | Verdict |
|---|---|
| Is each face separately rational inner after dilation? | **yes** |
| Is the real-frequency two-face family conservative? | **yes** |
| Is the full product one same-half-plane analytic transfer under \(z\mapsto-z\)? | **no** |
| Does strict loss leave an uncancelled upper pole? | **yes, already in the determinant** |
| Does losslessness cancel every matrix pole? | **no, not when \(D\) mixes unequal scales** |
| Is the exact \(C_3\) checkpoint retained? | **yes** |
| Correct category | **two oriented faces plus real-interface monodromy** |

## 9. Position in the corpus

- [minimal four-port face and six-port boundary cascade](950_spectral_factorization_compresses_each_squared_loss_channel_to_two_ports_and_the_full_two_face_cycle_to_six.md)
- [local real interface](908_a_local_real_interface_supplies_the_antiunitary_sideband_twist_and_closes_the_boundary_monodromy_model.md)
- [sideband Coxeter checkpoint](904_a_sideband_reversing_rational_inner_boundary_cycle_realizes_the_exact_a2_coxeter_element_with_positive_pole_scales.md)
- [antiunitary implementation classification](906_the_sideband_exchange_in_the_a2_cycle_is_an_antiunitary_boundary_sewing_not_a_single_mode_passive_bosonic_evolution.md)
