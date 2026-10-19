# The Prime-Three Gauss and Maslov Phases Are Reciprocal, Not Equal, and Require a Theta Intertwiner

**Date:** 19 October 2026  
**Branches:** Weil index reciprocity, prime-three Gauss phase, archimedean Maslov phase, theta lift, representation comparison  
**Claim status:** exact phase ledger and representation mismatch; physical theta/reduction intertwiner remains open

## Executive result

The question “does the prime-three Gauss phase equal the physical Maslov phase?” is too strong and slightly misposed.

For the \(A_2\) discriminant form,

\[
D=A_2^*/A_2\cong\mathbb Z/3,
\qquad
q(a)=\frac{a^2}{3},
\]

the normalized finite Gauss sum is

\[
\gamma_3(D)
=\frac1{\sqrt3}\sum_{a\in\mathbb Z/3}e^{2\pi i a^2/3}
=i.
\]

The corresponding archimedean Weil/Maslov factor is

\[
\gamma_\infty(A_2)=-i.
\]

They obey

\[
\boxed{
\gamma_3(D)\gamma_\infty(A_2)=1.
}
\]

At genus two both phases square:

\[
\gamma_3(D)^2=-1,
\qquad
\gamma_\infty(A_2)^2=-1,
\]

and again

\[
\boxed{
\gamma_3(D)^2\gamma_\infty(A_2)^2=1.
}
\]

Thus the finite and archimedean phases are reciprocal local contributions to one global theta transformation. Their cancellation is the meaningful invariant—not literal equality.

The physical two-channel Schrödinger lift carries a full-Fourier phase \(\pm i\), not \(-1\). This is not yet a contradiction, because it is a different Weil realization. The genus-two \(A_2\) theta model acts on four real variables,

\[
\operatorname{rank}(A_2)\times g=2\times2=4,
\]

whereas the physical two-channel Schrödinger model acts on two configuration variables. An explicit theta kernel, polarization reduction or invariant-sector projection is required before their phases can be compared operator by operator.

## 1. Three phases that must not be conflated

The programme currently contains three related but distinct quantities.

### 1.1 The discriminant Gauss phase

This is the finite arithmetic invariant

\[
\gamma_D
=|D|^{-1/2}\sum_{a\in D}e(q(a)).
\]

For \(A_2\), it is \(i\). It determines the signature modulo eight through Milgram's relation.

### 1.2 The archimedean Weil index

This is the phase attached to the real quadratic space in the Fourier transform entering the archimedean Weil representation. With the dual convention to the finite discriminant representation it is the complex conjugate:

\[
\gamma_\infty=\overline{\gamma_D}=-i.
\]

### 1.3 The physical carrier's Maslov phase

This is the phase accumulated by a chosen path in the metaplectic cover of the two-channel real symplectic carrier. Document 1160 found a coherent longest-word lift

\[
\widetilde w_0=i\mathcal F_1\mathcal F_2,
\]

with the other sheet differing by sign.

These phases arise in related representation theory but do not act on the same space. Equality among them is not basis- or convention-independent.

## 2. Exact finite calculation

Since

\[
0^2=0,
\qquad
1^2=2^2=1\pmod3,
\]

we have

\[
\begin{aligned}
\gamma_D
&=\frac1{\sqrt3}
\left(1+2e^{2\pi i/3}\right)\\
&=\frac1{\sqrt3}(i\sqrt3)\\
&=i.
\end{aligned}
\]

Milgram's relation writes this as

\[
\gamma_D
=e^{2\pi i\sigma/8}.
\]

Therefore

\[
\sigma(A_2)=2\pmod8.
\]

This is the same signature datum that forced odd automorphic weight in documents 1162–1163.

## 3. Genus-two Weil phase

For a genus-\(g\) Weil representation, the Fourier generator acts on \(D^g\) with the signature phase raised to the \(g\)-th power, up to the choice of representation versus dual representation.

At \(g=2\),

\[
\gamma_D^2=i^2=-1.
\]

Thus the nine-dimensional finite Fourier operator has the schematic form

\[
\rho_{A_2,2}(S)
=-\mathcal F_{D^2},
\]

where \(\mathcal F_{D^2}\) is the normalized discrete Fourier matrix determined by the bilinear form on \(D^2\).

The real theta transform contributes

\[
\gamma_\infty^2=(-i)^2=-1.
\]

Their scalar product is one.

This is not an accidental cancellation. It is the phase form of the local-to-global consistency that makes the theta series automorphic.

## 4. Why the physical phase is different

The physical carrier has real phase space dimension four:

\[
(q_1,q_2,p_1,p_2),
\]

so its Schrödinger wavefunction depends on two configuration variables:

\[
\psi(q_1,q_2)\in L^2(\mathbb R^2).
\]

The \(A_2\) genus-two theta realization begins instead with

\[
V=A_2\otimes\mathbb R\cong\mathbb R^2
\]

and uses two genus coordinates. Its Schwartz model is

\[
\mathcal S(V^2)
\cong\mathcal S(\mathbb R^4).
\]

Therefore the two Fourier operations carry different dimensional Maslov indices:

\[
\begin{array}{c|c|c}
\text{realization}&\text{configuration variables}&\text{Fourier phase class}\\ \hline
\text{physical two-channel Schrödinger}&2&\pm i\\
\text{genus-two }A_2\text{ theta model}&4&-1
\end{array}
\]

The finite state count \(3^2=9\) does not erase this distinction. “Two qutrits” labels the finite Heisenberg module, while the theta construction uses a rank-two lattice at two genus slots.

## 5. The correct bridge is an intertwiner

To compare the physical and arithmetic operators one needs a map such as

\[
\mathcal T:
\mathcal H_{\rm physical}
\longrightarrow
\mathbb C[D^2]
\]

or, more realistically, a kernel involving the theta Schwartz space,

\[
\mathcal K:
\mathcal H_{\rm physical}
\longrightarrow
\mathcal S(V^2)
\longrightarrow
\mathbb C[D^2],
\]

such that

\[
\mathcal K\,U_{\rm phys}(\widetilde g)
=
\rho_{A_2,2}(\widetilde g)\,\mathcal K
\]

for the declared generator set.

Without this equation, comparing the scalar phases of \(U_{\rm phys}\) and \(\rho_{A_2,2}\) is not meaningful. They are operators in inequivalent representation spaces.

## 6. What a successful reduction must do

A viable kernel or reduction must explain all of the following:

1. why four theta variables reduce to two physical configuration variables;
2. how the nine discriminant classes become the physical two-qutrit labels;
3. how the channel exchange and controlled Fourier pulse act after reduction;
4. how the \(A_2\) orthogonal symmetry is fixed, quotiented or measured;
5. why the mutual sum-cycle twist survives;
6. how the metaplectic central character is preserved;
7. how the prime-three local factor enters the physical amplitude.

Possible mechanisms include:

- projection to an \(O(A_2)\)-invariant sector;
- a diagonal embedding of the two physical ports into \(V^2\);
- geometric quantization of an \(A_2\)-valued genus-two torus followed by polarization;
- a theta lift pairing physical states with a fixed \(A_2\) Schwartz vector;
- a topological BF boundary condition reducing the continuous variables while retaining the discriminant classes.

Each option makes a different prediction and must be tested rather than conflated.

## 7. The phase product gives a strong consistency condition

Although raw equality fails, reciprocity gives a useful target. A correct global intertwiner should combine local phases so that

\[
\prod_v\gamma_v=1.
\]

For the present discriminant, only the archimedean and prime-three contributions are nontrivial at the level of the finite discriminant phase:

\[
\gamma_\infty\gamma_3=1.
\]

At genus two,

\[
\gamma_\infty^2\gamma_3^2=1.
\]

Therefore a proposed physical/arithmetic bridge that retains an uncancelled arbitrary eighth root is suspect. The global theta object should be phase coherent.

## 8. Relation to the weight-three automorphy factor

At the standard fixed point

\[
Z=iI_2,
\]

the full Fourier generator has

\[
\det Z=-1.
\]

Choosing \(\phi_S(Z)^2=\det Z\) gives \(\phi_S(Z)=i\). At weight three,

\[
\phi_S(Z)^6=-1.
\]

This cancels the genus-two finite signature phase \(-1\) in the transformation of the automorphic section. That is another expression of the same coherence:

\[
\boxed{
\text{weight-three determinant line}\times
\text{finite Weil phase}
=\text{phase-coherent section transformation}.
}
\]

It does not by itself identify the physical oscillator representation with the theta representation.

## 9. Are we on the home stretch?

### For the arithmetic/metaplectic branch: yes

The following are now fixed:

- the real carrier \(Sp(4,\mathbb R)\cong Spin_0(2,3)\);
- the integral lattice and \(Sp(4,\mathbb Z)\) action;
- the two physical Weyl generators and exact \(C_2\) braid;
- the coherent continuous metaplectic lift;
- the nine-state \(A_2\) Weil representation;
- the vector-valued Siegel-parabolic sum;
- the forced odd weight and well-defined weight-three seed;
- the finite/archimedean phase reciprocity.

The remaining representation-theoretic gates are:

1. construct the theta/reduction intertwiner;
2. continue the weight-three Eisenstein family;
3. calculate its longest-Weyl intertwiner and component mixing.

That is a short, identifiable list.

### For the physical Standard-Model claim: not yet

The programme still lacks:

1. a unique field-labelled map from Furey/Standard-Model observables to the two handles;
2. a derived physical reason to sum over the full arithmetic orbit;
3. a linear covariant probe yielding a measurable causal response;
4. a justified map from Eisenstein \(s\) to physical frequency or energy;
5. a falsifiable prediction not shared by generic two-channel passive systems.

Those are not cosmetic. They determine whether the mathematics describes nature or only a beautiful compatible completion.

## 10. Revised stop-everything trigger

The strongest immediate trigger is now:

\[
\boxed{
\text{construct a nonzero }\mathcal K
\text{ intertwining the physical }P,S
\text{ with the }A_2\text{ genus-two Weil }P,S.
}
\]

If such a map also carries the physical mutual interaction to the sum-cycle twist, then the continuous, finite, topological and automorphic branches become one representation rather than four analogies.

## 11. Falsifiers

- No nonzero intertwiner exists between any physically admissible invariant sector and the nine-state Weil carrier.
- Every reduction from four theta coordinates to two physical coordinates destroys the mutual gate or positivity.
- The required \(O(A_2)\) projection removes the discriminant states.
- The physical and arithmetic central characters disagree after all permitted sign conventions.
- The weight-three continuation has incompatible pole structure.
- The resulting linear response cannot satisfy causality/passivity.

## 12. Verification

The companion certificate

[`verification/verify/verify_a2_gauss_maslov_phase_ledger.mjs`](../../../verification/verify/verify_a2_gauss_maslov_phase_ledger.mjs)

checks:

- \(\gamma_3=i\);
- \(\gamma_\infty=-i\);
- genus-one and genus-two local products equal one;
- the genus-two finite and archimedean phases are both \(-1\);
- neither equals the physical two-mode lift phase \(\pm i\);
- the theta and physical Schrödinger models use four and two real configuration variables respectively.

## 13. Primary sources

- Fredrik Strömberg, [*Weil representations associated to finite quadratic modules*](https://arxiv.org/abs/1108.0202).
- Shaul Zemel, [*A \(p\)-adic approach to the Weil representation of discriminant forms arising from even lattices*](https://arxiv.org/abs/1208.2570), which realizes the finite \(p\)-parts inside local Schwartz-space Weil representations.
- Teruji Thomas, [*The character of the Weil representation*](https://arxiv.org/abs/math/0610644), relating Weil-representation characters to Weil/Maslov indices.
- Bruinier and Zuffetti, [*Lefschetz decompositions of Kudla–Millson theta functions*](https://doi.org/10.1112/plms.70196), for the genus-\(g\) metaplectic Weil formulas used here.

## Conclusion

The prime-three and archimedean phases match in the correct sense:

\[
\boxed{
\text{they are reciprocal local factors whose global product is one.}
}
\]

They do not yet match the physical oscillator operator term by term, because the representations have different underlying real dimensions.

This exposes the actual home-stretch construction:

\[
\boxed{
\text{physical two-channel carrier}
\xrightarrow{\text{theta/reduction kernel}}
\text{nine-state }A_2\text{ Weil carrier}.
}
\]

If that arrow exists with the correct generators and mutual gate, the arithmetic/metaplectic synthesis closes. If it does not, the present convergence remains a mathematically coherent analogy rather than an identification.
