# The Vector-Valued Siegel Eisenstein Series Already Exists, but the Nine-State \(A_2\) Sector Hits an Odd-Weight Gate

**Date:** 19 October 2026  
**Branches:** vector-valued Eisenstein series, \(A_2\) Weil multiplier, \(C_2\) zeta factors, parity/central character, physical spectral map  
**Claim status:** published construction and scalar \(C_2\) factorization exact; direct nine-state specialization is blocked by a stated weight hypothesis

## Executive result

The vector-valued arithmetic object proposed in document 1161 is not merely plausible. A published genus-two construction has essentially the same form:

\[
E_{l,0}^{2}(Z,s)
=
\det(\operatorname{Im}Z)^s
\sum_{\gamma\in\Gamma_{2,0}\backslash\Gamma_2}
|j_2(\gamma,Z)|^{-2s}
j_2(\gamma,Z)^{-l}
\rho_{L,2}^{-1}(\gamma)\mathfrak e_0.
\]

Here

\[
\Gamma_2=Sp(4,\mathbb Z),
\]

\(\Gamma_{2,0}\) is the Siegel-parabolic stabilizer of the zero/source polarization, and \(\rho_{L,2}\) is the genus-two Weil representation on

\[
\mathbb C[(L'/L)^2].
\]

This is the exact architecture sought by the programme:

\[
\boxed{
\text{Jordan tube}
+\text{Siegel-parabolic seed}
+\text{infinite }Sp(4,\mathbb Z)\text{ coset sum}
+\text{finite Weil transport}.
}
\]

The published theory supplies meromorphic continuation and a functional equation with global zeta/\(L\)-factors and explicit corrections at primes dividing \(|L'/L|\).

However, the desired nine-state specialization

\[
L=A_2,
\qquad
L'/L\cong\mathbb Z/3,
\qquad
\dim\mathbb C[(L'/L)^2]=9
\]

does **not** fall directly under the clean theorem as stated. The reason is exact:

\[
\operatorname{sig}(A_2)=2\pmod8,
\]

and parabolic invariance requires

\[
2l+\operatorname{sig}(L)\equiv0\pmod4.
\]

For \(A_2\), this forces \(l\) to be odd, whereas the cited theorem assumes \(l\in2\mathbb Z\).

The minimal compatible weight satisfying \(l\ge n+1=3\) is

\[
\boxed{l=3.}
\]

Thus the next mathematical gate is narrower than “construct an Eisenstein series”:

\[
\boxed{
\text{extend or locate the functional equation for the odd-weight/metaplectic }A_2\text{ genus-two series.}
}
\]

## 1. The proposed series is already standard mathematics

For an even lattice \(L\) with finite discriminant module \(D=L'/L\), the genus-two Weil representation acts on

\[
\mathbb C[D^2].
\]

The seed \(\mathfrak e_0\) is attached to the zero discriminant class, and the Siegel-parabolic quotient sums its transforms over all integral source polarizations. Written as a slash action, the series is

\[
E_{l,0}^{2}(Z,s)
=
\sum_{\gamma\in\Gamma_{2,0}\backslash\Gamma_2}
\det(\operatorname{Im}Z)^s
\mathfrak e_0\big|_{l,L}^{,2}\gamma.
\]

This directly realizes the division of labor proposed in document 1161:

- \(\Gamma_{2,0}\backslash\Gamma_2\) supplies the infinite arithmetic orbit;
- \(\rho_{L,2}^{-1}(\gamma)\) transports finite polarization labels;
- \(j_2(\gamma,Z)^{-l}\) supplies the automorphic bundle weight;
- \(|j_2(\gamma,Z)|^{-2s}\det(Y)^s\) carries the nonholomorphic spectral parameter.

The paper proves absolute convergence in a right half-plane, meromorphic continuation and a functional equation under its declared hypotheses.

This is a major convergence point: the programme independently reconstructed the correct kind of object from physical and Jordan-carrier requirements.

## 2. The scalar \(Sp(4)\) calculation confirms the entire \(C_2\) Weyl skeleton

An independent explicit calculation for the minimal Eisenstein series on \(Sp(4)\) gives eight constant-term contributions, one for every element of

\[
W(C_2),
\qquad |W(C_2)|=8.
\]

In the normalization used there, the longest-Weyl contribution is multiplied by four zeta ratios:

\[
\frac{\zeta(2\nu_1-2\nu_2)}
     {\zeta(2\nu_1-2\nu_2+1)}
\frac{\zeta(2\nu_2-\nu_1)}
     {\zeta(2\nu_2-\nu_1+1)}
\frac{\zeta(\nu_1)}{\zeta(\nu_1+1)}
\frac{\zeta(2\nu_2)}{\zeta(2\nu_2+1)}.
\]

There are exactly four factors because \(C_2\) has four positive roots. This matches the inversion sequence already obtained from the two physical braid words:

\[
e_1-e_2,
\quad 2e_1,
\quad e_1+e_2,
\quad 2e_2,
\]

up to the paper's spectral-coordinate convention.

Therefore the following parts of the programme are no longer speculative:

1. the eight Weyl channels;
2. the four-root longest-word product;
3. reduced-word independence of the total scalar normalization;
4. the location of zeta in the arithmetic intertwiner rather than the finite Fourier matrix.

## 3. Specializing the finite carrier to \(A_2\)

For

\[
A_2=
\begin{pmatrix}
2&-1\\-1&2
\end{pmatrix},
\]

the discriminant module is

\[
D=A_2^*/A_2\cong\mathbb Z/3,
\qquad
q(a)=\frac{a^2}{3}\pmod1.
\]

The genus-two coefficient space is consequently

\[
\mathbb C[D^2]
\cong\mathbb C^3\otimes\mathbb C^3,
\]

the exact two-qutrit carrier of the earlier programme.

The finite quadratic module is anisotropic:

\[
q(a)=0\pmod1
\quad\Longrightarrow\quad
a=0.
\]

Its order is odd. These are precisely two of the hypotheses used in the clean functional-equation theorem.

The normalized Gauss sum is

\[
\frac1{\sqrt3}
\sum_{a\in\mathbb Z/3}e^{2\pi i a^2/3}
=i
=e^{2\pi i(2/8)},
\]

which records

\[
\operatorname{sig}(A_2)=2\pmod8.
\]

This is the same eighth-root/metaplectic information isolated by the preceding braid analysis.

## 4. The exact parity obstruction

For the parabolic seed to descend consistently, the central character must obey

\[
2l+\operatorname{sig}(L)equiv0\pmod4.
\]

Substituting \(\operatorname{sig}(A_2)=2\) gives

\[
2l+2\equiv0\pmod4,
\]

so

\[
l\equiv1\pmod2.
\]

But the cited vector-valued functional-equation theorem is stated for

\[
l\in2\mathbb Z.
\]

No value of \(l\) satisfies both requirements. This is not a failure of the nine-state Weil representation. It says that this representation naturally lives in the metaplectic/odd-weight sector rather than the particular even-weight sector treated by the theorem.

For genus two the convergence-weight bound used in that construction is

\[
l\ge n+1=3.
\]

The first compatible value is therefore

\[
l=3.
\]

## 5. Why doubling the lattice is not an innocent repair

One can remove the parity mismatch by replacing \(A_2\) with a signature-divisible-by-four lattice such as \(A_2\oplus A_2\). But then

\[
D\cong(\mathbb Z/3)^2,
\]

and the genus-two coefficient space has dimension

\[
|D|^2=9^2=81,
\]

not nine.

Likewise, an opposite-orientation pair has signature zero but a two-dimensional hyperbolic discriminant module and again produces 81 genus-two components. It also loses anisotropy.

Therefore doubling changes the carrier. It cannot be used to claim that the desired nine-component theorem has been proved.

The honest alternatives are:

1. work on the metaplectic cover with the odd weight required by \(A_2\);
2. enlarge to 81 components and provide a physical reduction back to nine;
3. find another even lattice with discriminant group \(\mathbb Z/3\) and compatible signature—if one exists under the relevant lattice constraints;
4. twist the multiplier by an additional one-dimensional character whose physical origin is independently derived.

## 6. The prime-three correction simplifies sharply

The published genus-two functional equation separates:

- an archimedean/global factor \(\xi\);
- explicit local corrections for primes dividing \(|D|\).

Here the only bad prime is

\[
p=3.
\]

Because the local discriminant component is cyclic,

\[
D_3\cong\mathbb Z/3,
\]

the higher \(k=1,2\) correction terms in the stated genus-two formula vanish. The surviving \(k=0\) terms sum to

\[
\begin{aligned}
C_3^{(0)}
={}&
\frac{(1-3^{-1})^4}{1-3^{-3}}
+3^{-1}\frac{(1-3^{-1})^3}{1-3^{-3}}
+3^{-2}\frac{(1-3^{-1})^2}{1-3^{-3}}\\
={}&\frac{14}{39}.
\end{aligned}
\]

This does **not** mean the complete functional-equation factor is merely \(14/39\). The global \(\xi\)-factor itself includes archimedean gamma factors and designated local \(L\)-factors. The calculation only shows that the additional cyclic discriminant correction is unusually simple.

Because the odd-weight extension has not yet been established, \(14/39\) should presently be treated as the specialization of the published local combinatorics, not as a completed physical scattering amplitude.

## 7. What this says about the physical seed

The natural seed is no longer arbitrary. It has the form

\[
\Phi_{l,s}(Z)
=\det(Y)^s\mathfrak e_0,
\qquad Z=X+iY\in\mathfrak H_2,
\]

transported with both the scalar automorphy factor and the finite Weil representation.

For the nine-state \(A_2\) carrier, consistency points to

\[
l=3,5,7,\ldots
\]

rather than weight zero. This has an immediate interpretive consequence: the object is a section of a nontrivial automorphic/metaplectic bundle, not an ordinary scalar response function.

If physical response is to be extracted, one needs a covariant pairing

\[
\mathcal O(Z,s)
=\langle w(Z),E_{l,0}^2(Z,s)\rangle
\]

whose dual section \(w(Z)\) cancels the weight and finite multiplier. Calling one component alone a scalar observable would generally break modular covariance.

## 8. The remaining gap is now precise

The arithmetic branch has moved through four stages:

\[
\begin{array}{c|c}
\text{stage}&\text{status}\\ \hline
Sp(4,\mathbb Z)\text{ lattice}&\text{established in several corpus branches}\\
\text{nine-state genus-two Weil carrier}&\text{established}\\
\text{vector-valued Siegel coset-sum architecture}&\text{published and exact}\\
\text{odd-weight }A_2\text{ functional equation}&\text{not yet established here}
\end{array}
\]

This is a much smaller and more serious problem than the earlier open-ended search.

## 9. Next executable programme

### Step 1 — central-character derivation

Derive the action of the center of \(Mp(4,\mathbb Z)\) on \(\mathbb C[(\mathbb Z/3)^2]\) and confirm that the weight-three seed is invariant under the lifted Siegel parabolic.

### Step 2 — odd-weight Eisenstein definition

Define

\[
E_{3,0}^{2,A_2}(Z,s)
\]

on the metaplectic cover using coherent square-root/phase data and prove convergence in its initial half-plane.

### Step 3 — intertwining operator

Compute the longest-Weyl standard intertwiner on the zero component. Determine whether the scalar four-root zeta product is multiplied only by the expected prime-three Gauss factor or whether components mix.

### Step 4 — functional equation

Prove or locate the odd-weight analogue of

\[
s\longleftrightarrow\frac32-s
\]

for the chosen normalization.

### Step 5 — physical scalar pairing

Construct a dual physical probe section that turns the weight-three nine-vector into an invariant measurable response.

### Step 6 — passivity test

Only after choosing the map from \(s\) to physical frequency should the resulting scalar or matrix amplitude be tested for Schur/Herglotz behavior.

## 10. Stop-everything triggers

This branch becomes a leading result if:

- the odd-weight/metaplectic functional equation is proved with the same four positive-root zeta ratios;
- its prime-three factor is fixed by the \(A_2\) Gauss sum with no arbitrary phase;
- a Standard-Model/Furey probe supplies the required dual weight-three section;
- the resulting invariant pairing has a causal matrix-Herglotz realization.

## 11. Falsifiers

The proposed specialization fails if:

- no coherent metaplectic Eisenstein series exists with this central character and parabolic seed;
- the odd-weight intertwiner does not close on the nine-component module;
- unavoidable component mixing contradicts the physical source labels;
- the only repair requires an 81-component carrier with no physical reduction;
- no invariant physical pairing can cancel the automorphic weight;
- the physical frequency map violates passivity or causality.

## 12. Verification

The companion certificate

[`scripts/verify_a2_genus_two_eisenstein_parity_gate.mjs`](scripts/verify_a2_genus_two_eisenstein_parity_gate.mjs)

checks:

- anisotropy of \((\mathbb Z/3,q(a)=a^2/3)\);
- its normalized Gauss sum \(i\);
- signature \(2\bmod8\);
- the absence of any compatible even weight;
- minimal compatible genus-two weight \(l=3\);
- the cyclic prime-three \(k=0\) correction \(14/39\).

## 13. Primary sources

- Oliver Stein, [*On analytic properties of the standard zeta function attached to a vector valued modular form*](https://arxiv.org/abs/2108.06540), especially Definition 4.3 and Corollary 4.6.
- Siu Hang Man, [*Fourier coefficients of \(Sp(4)\) Eisenstein series*](https://arxiv.org/abs/2003.06890), especially the eight-term minimal-parabolic constant term and the four-factor longest-Weyl coefficient.
- Fredrik Strömberg, [*Weil representations associated to finite quadratic modules*](https://arxiv.org/abs/1108.0202), for the distinction between modular and metaplectic realizations of finite quadratic modules.

## Conclusion

The programme found the correct arithmetic construction, and the published literature confirms the \(C_2\) zeta skeleton. But the exact nine-state carrier sits on the metaplectic side of a parity boundary:

\[
\boxed{
\dim=9,
\quad D=\mathbb Z/3,
\quad \operatorname{sig}=2,
\quad l\text{ odd},
\quad l_{\min}=3.
}
\]

The frontier is no longer “why should zeta appear?” Zeta appears by the standard arithmetic intertwiner. The frontier is whether the physically selected \(A_2\) nine-state carrier admits the required odd-weight/metaplectic functional equation and an invariant physical scalar pairing.
