# The Riemann Zeta Function Is a Real Spectral Analogy but Not Yet a Jordan–Spin(2,3) Identification

**Date:** 19 October 2026  
**Branches:** inverse spectral reconstruction, trace formulas, Riemann zeta, relational passive learning  
**Claim status:** rigorous conceptual bridge with a strict non-identification boundary

## Executive answer

Yes. The Riemann zeta function is highly relevant to the phrase **inverse spectral**, but not because the present Jordan cone has been shown to generate it.

The useful dictionary is:

\[
\boxed{
\begin{array}{ccl}
\text{prime numbers} &\leftrightarrow& \text{primitive microscopic cycles},\\
\text{zeta zeros} &\leftrightarrow& \text{global spectral data},\\
\text{explicit formula} &\leftrightarrow& \text{trace formula connecting the two}.
\end{array}}
\]

This is one of mathematics' deepest examples of local/multiplicative structure becoming global/spectral structure.

The programme's learning problem has a related shape:

\[
\text{hidden realization}
\longrightarrow
\text{observable response spectrum}
\longrightarrow
\text{attempted reconstruction}.
\]

But there is presently no derivation

\[
H_2(\mathbb R),\quad Spin_0(2,3),\quad
\text{or the three-ray learner}
\Longrightarrow
\zeta(s).
\]

That would be a new and extremely strong claim.

## 1. Why zeta is spectral

For \(\operatorname{Re}s>1\),

\[
\zeta(s)
=
\sum_{n=1}^{\infty}\frac1{n^s}
=
\prod_p\frac1{1-p^{-s}}.
\]

The sum is over all positive integers; the Euler product is over primes. The same analytic function therefore joins additive enumeration to multiplicative atoms.

Taking a logarithmic derivative gives

\[
-\frac{\zeta'(s)}{\zeta(s)}
=
\sum_{n=1}^{\infty}\frac{\Lambda(n)}{n^s},
\]

where \(\Lambda(n)\) is supported on prime powers. Poles of this logarithmic derivative occur at zeros and poles of \(\zeta\).

The explicit formulas of prime number theory turn this analytic relation into a trace-formula-like duality:

\[
\text{sum over primes and prime powers}
\quad\leftrightarrow\quad
\text{sum over nontrivial zeros}.
\]

This resembles the spectral-geometry relation

\[
\text{periodic classical orbits}
\quad\leftrightarrow\quad
\text{quantum eigenvalues}.
\]

Katz and Sarnak describe the extensive evidence for spectral interpretations, including the analogy with Frobenius spectra over finite fields and random-matrix statistics: [Zeroes of Zeta Functions and Symmetry](https://www.ams.org/bull/1999-36-01/S0273-0979-99-00766-1/).

## 2. The Hilbert–Pólya idea

The nontrivial zeros are written

\[
\rho_n=\frac12+i\gamma_n
\]

if they lie on the critical line.

The Hilbert–Pólya idea asks whether there is a natural self-adjoint operator \(H\) such that

\[
\operatorname{spec}(H)=\{\gamma_n\}.
\]

Because a self-adjoint operator has real eigenvalues, such a realization—if it captured every nontrivial zero in the required way—would force

\[
\operatorname{Re}\rho_n=\frac12.
\]

That would prove the Riemann hypothesis.

The hard part is not manufacturing an operator whose spectrum lists a prescribed sequence. The hard part is deriving a natural operator and trace formula whose geometry also explains the primes and the functional equation.

## 3. Connes' particularly relevant formulation

Alain Connes developed a noncommutative-geometric trace-formula interpretation in which critical zeros appear as an **absorption spectrum**, while hypothetical off-line zeros appear as resonances: [Trace formula in noncommutative geometry and the zeros of the Riemann zeta function](https://arxiv.org/abs/math/9811068).

“Absorption spectrum” is especially suggestive for this programme because the programme already treats observable physics through passive response, spectral discontinuities and hidden realizations.

But the resemblance must be handled carefully:

- Connes' setting uses adeles, ideles and noncommutative geometry;
- our current setting uses a two-face Jordan cone and matrix-Herglotz response;
- no functor or operator has been constructed between them;
- shared spectral language does not imply shared dynamics.

So this is a serious analogy, not yet a bridge.

## 4. Relation to inverse-spectral ambiguity

The zeta function illustrates both sides of the inverse problem.

### Complete analytic data are extraordinarily rigid

The full Euler product determines the primes. Conversely, the complete zero/pole data, functional equation, growth conditions and normalization can support reconstruction through Hadamard products and explicit formulas.

This is not merely a finite list of response samples. It is global analytic information.

### Finite spectral data remain radically incomplete

Knowing the first \(N\) zeros does not determine every prime or uniquely identify the underlying geometry. Many operators can share a finite initial spectrum. Even an entire prescribed spectrum does not automatically identify a unique operator up to physical equivalence.

Thus the zeta story reinforces document 1150:

\[
\boxed{
\text{spectral reconstruction becomes rigid only when}
\text{ analyticity, symmetry, growth and normalization are added.}
}
\]

The analogue of the missing learning prior is not “more numerical samples” alone. It is the entire structural package:

- Euler product;
- functional equation;
- analytic continuation;
- controlled order and growth;
- trace/explicit formula;
- positivity or self-adjointness condition.

## 5. Is \(\zeta\) a Herglotz response?

Not directly.

A scalar Herglotz function maps the upper half-plane into itself:

\[
\operatorname{Im}f(z)>0
\quad\text{when}\quad
\operatorname{Im}z>0.
\]

The Riemann zeta function does not satisfy this property globally. Its zeros are therefore not automatically poles of a positive passive response.

One can form related logarithmic derivatives, scattering functions or trace-formula distributions, but each requires its own positivity and analyticity analysis. Simply inserting \(\zeta\) or \(1/\zeta\) into the three-ray response would not establish passivity.

This is the first hard gate for any direct connection.

## 6. Is there a Jordan-cone connection?

There are general connections among:

- self-adjoint operators;
- spectral measures;
- positive kernels;
- symmetric spaces;
- Jordan algebras;
- automorphic forms and \(L\)-functions.

But the specific cone

\[
H_2(\mathbb R)_+
\]

does not automatically encode the primes or zeta zeros.

The Jordan cone could potentially organize a **matrix-valued spectral response** built from arithmetic data. To become substantive, one would need to specify:

1. the two physical or arithmetic faces;
2. the operator whose resolvent generates the response;
3. the positive spectral measure;
4. the role of the functional equation;
5. how primes enter a trace formula;
6. why the resulting object lives naturally in \(H_2(\mathbb R)\).

No such construction currently exists in this programme.

## 7. Is there a \(Spin(2,3)\) connection?

The present \(Spin_0(2,3)\) arises because

\[
Sp(4,\mathbb R)\cong Spin_0(2,3)
\]

is the conformal group associated with the \(H_2(\mathbb R)\) Jordan geometry.

There are rich theories of automorphic forms and \(L\)-functions for symplectic groups, including \(Sp(4)\). That fact alone does not identify the ordinary Riemann zeta function with this carrier. The Riemann zeta function is the degree-one prototype of an \(L\)-function; \(Sp(4)\) automorphic objects generally carry much richer data.

A valid bridge would require an explicit representation, automorphic quotient, trace formula or factorization—not merely the appearance of the same group name.

## 8. The important conceptual resonance

The strongest present connection is structural:

\[
\begin{array}{ccc}
\textbf{Arithmetic} && \textbf{Learning programme}\\[2mm]
\text{primes} && \text{hidden microscopic modes}\\
\text{zeros} && \text{global observable spectral features}\\
\text{Euler product} && \text{compositional realization law}\\
\text{functional equation} && \text{global duality/consistency constraint}\\
\text{explicit formula} && \text{forward/inverse spectral bridge}\\
\text{RH positivity} && \text{self-adjoint/passive realizability gate}
\end{array}
\]

The last row is deliberately schematic. The Riemann hypothesis is not equivalent to Jordan-cone positivity. Rather, both programmes ask whether a striking analytic pattern is the shadow of an underlying positive or self-adjoint operator.

That is the genuine shared intuition.

## 9. A learning interpretation

Zeta gives an idealized image of what a maximally constrained inverse learner would require.

A finite-data learner carries many possible hidden models. A zeta-like learner would progressively add:

\[
\text{local atoms}
+\text{composition law}
+\text{global symmetry}
+\text{analytic continuation}
+\text{growth constraint}
+\text{trace formula}.
\]

Each added compatibility law eliminates candidate realizations. The surviving object becomes rigid not because one observation was decisive, but because local and global consistency overdetermine one another.

This suggests a valuable principle for the research programme:

> Candidate generation should not search arbitrary poles. It should search realizations possessing a local-to-global factorization law.

For the Standard-Model branch, the analogue would be:

- local intermediate states and thresholds;
- composition/unitarity rules;
- Ward identities;
- crossing and analyticity;
- ultraviolet/OPE constraints;
- dispersion relations.

That is a more meaningful parallel than trying to place zeta zeros directly into \(Spin(2,3)\).

## 10. Stop-everything conditions

A direct arithmetic branch becomes serious only if at least one of the following appears:

1. a natural self-adjoint or passive operator derived from the Jordan-triple recursion whose trace formula contains prime powers;
2. a matrix-Herglotz function built canonically from completed zeta data;
3. an \(Sp(4)\) automorphic construction whose reduction yields the exact Riemann explicit formula;
4. a functional equation realized as a face exchange or symplectic involution;
5. a positivity statement equivalent to the Weil criterion or Riemann hypothesis, rather than merely reminiscent of it.

Without one of these, the zeta connection should remain a conceptual analogy.

## 10.1 Update: a natural local-arithmetic spectral family now exists

[AZ-147](../../programmes/admissibility/admissibility_147_xi_genus_two_weil_spectral_compression_and_hyperbolic_trace_gate.md)
records an important refinement. Suzuki constructs self-adjoint extensions of
the differentiation operator in Hilbert spaces defined by Weil's quadratic form
on finite intervals. Assuming RH, their positive eigenvalues converge
monotonically from above to the distinct positive zeta-zero ordinates as the
interval expands, even though each finite problem is defined from local
archimedean and prime-power data rather than the zeros. This crosses the
“natural operator” gate conditionally. It does not prove RH: positivity of the
unshifted Weil form and the global spectral realization enter under RH.

## 11. Decision

Keep the Riemann zeta function as a high-value comparison object, not as a claimed component of the physical theory.

Its real lesson is:

\[
\boxed{
\text{local atoms can determine a global spectrum only through}
\text{ an exceptionally rigid web of analytic consistency.}
}
\]

That lesson directly strengthens the learning programme. It explains what is missing between a collection of plausible spectral candidates and a uniquely compelled realization.
