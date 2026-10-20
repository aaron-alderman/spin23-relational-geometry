# The Laplacian--signless triangle fits CKM magnitudes only before mass order is joined

**Date:** 20 October 2026

**Gates:** A5 and A6

**Status:** constructive numerical witness plus bounded joint stress test; not a global no-go

**Depends on:** [the orientation-conjugate CKM falsifier](1477_the_orientation_conjugate_ckm_ansatz_predicts_magnitude_symmetry_and_is_excluded_by_vub_versus_vtd.md)

**Evidence:** [machine-readable witness and stress test](../../../evidence/data/spin23-triangle-laplacian-signless-joining.json), [executable verifier](../../../verification/verify/verify_spin23_triangle_laplacian_signless_joining.mjs), [Particle Data Group 2025 CKM review, Eq. 12.27](https://pdg.lbl.gov/2025/reviews/rpp2025-rev-ckm-matrix.pdf), and [Huang--Zhou common-scale running masses, Table II](https://arxiv.org/abs/2009.04851)

## Result

The weighted defect triangle itself supplies a canonical noncentral operator. For edges ((a,b,c)), let

\[
H_+=
\begin{pmatrix}
0&a&ce^{-i\delta}\\
a&0&b\\
ce^{i\delta}&b&0
\end{pmatrix},
\qquad
D=\operatorname{diag}(a+c,a+b,b+c).
\]

The minimal sector contrast tested here is

\[
K_u=D-H_+,
\qquad
K_d=D+\eta H_+^*.
\]

Thus (K_u) is a magnetic graph Laplacian and (K_d) is a weighted signless operator of the reverse orientation. On the odd triangle these are inequivalent. The construction uses one graph, its degree operator and one real sector coefficient; it does not insert an arbitrary second Hermitian matrix.

With the common edge scale fixed by (c=1), the four dimensionless parameters

\[
(a/c,b/c,\delta,\eta)
\]

can interpolate the 2025 PDG central CKM magnitudes extremely closely. One numerical witness has maximum entrywise magnitude residual (3.67\times10^{-6}) and (|J|=3.116\times10^{-5}).

That apparent convergence fails when the top-down operator and bottom-up mass hierarchy are joined. The witness requires the down-sector eigenvalue assignment

\[
(d,s,b)\longleftrightarrow(\lambda_3,\lambda_1,\lambda_2),
\]

a cyclic ordering. No affine map, and no strictly monotone spectral function, can realize that assignment. The fit therefore reproduces mixing magnitudes only after discarding the spectral meaning of the same operators.

## 1. Why the degree matrix is a legitimate middle

The previous repair needed a noncentral family operator derived from the defect incidence. The degree matrix meets that requirement:

- it is fixed by the same three edge weights as (H_+);
- it is noncentral exactly when the triangle is anisotropic;
- it transforms covariantly under relabelling of the three defect fibers;
- it introduces no new family eigenbasis.

The Laplacian/signless distinction is also discrete rather than fitted. On a bipartite graph the two signs are related by a vertex-sign transformation. The three-cycle is odd, so the distinction detects triangle frustration. The coefficient (eta), however, remains an unexplained sector input.

## 2. The false positive from unrestricted family relabelling

For

\[
(a,b,c,\delta,\eta)=
(41.61769875,1.35611915,1,2.98120183,0.33504831),
\]

the computed mixing magnitudes are

\[
|V|\simeq
\begin{pmatrix}
0.97435015&0.22500633&0.00373200\\
0.22487366&0.97348965&0.04182983\\
0.00858000&0.04111017&0.99911778
\end{pmatrix}.
\]

This is a useful capacity witness: the derived contrast removes the exact transpose symmetry of claim 1477 and spans CKM-like CP violation.

But the physical-order eigenvalues are

\[
\lambda_u=(1.1124,2.3878,84.4475),
\qquad
\lambda_d=(56.7410,2.3443,28.8623).
\]

The up ordering is monotone; the down ordering is neither increasing nor decreasing. Treating all (6\times6) row/column permutations as harmless therefore hid a mass-order obstruction.

## 3. Bottom-up spectral target

Using the common-scale full-Standard-Model running masses at \(\mu=M_Z\) from Huang and Zhou gives the affine-invariant mass-squared locations

\[
r_u=\frac{m_c^2-m_u^2}{m_t^2-m_u^2}
=1.35775\times10^{-5},
\qquad
r_d=\frac{m_s^2-m_d^2}{m_b^2-m_d^2}
=3.49738\times10^{-4}.
\]

These ratios are unchanged by a positive affine rescaling of a sector mass-squared operator. A negative affine slope merely reverses the eigenvalue order; it does not permit a cyclic permutation.

A deterministic seeded search over the four triangle parameters, restricted to increasing or decreasing eigenvalue assignments and scored jointly against the nine CKM magnitudes and ((r_u,r_d)), did not find a joined solution. Its best recorded witness improves the two hierarchy ratios only by destroying the Cabibbo block: it gives (|V_{us}|\simeq0.862) and (|V_{ud}|\simeq0.506). This is a bounded numerical result, not proof that no remote solution exists.

## 4. Top-down/bottom-up convergence audit

The five-stage method gives a sharper diagnosis than parameter counting:

1. **Top down:** the length-three defect and its weighted incidence canonically produce (H) and (D).
2. **Bottom up:** quark data require one unitary mixing matrix and two ordered hierarchical spectra.
3. **Middle:** the Laplacian/signless pair supplies two noncommuting operators from one triangle.
4. **Fan out:** downward it spans the CKM magnitudes; upward it remains a valid graph-incidence construction.
5. **Convergence test:** the same eigenvalue labels must carry the masses and the mixing rows/columns. They do not.

The failure is therefore not “the numbers are a little off.” It is a failure of one shared spectral labelling.

## 5. Next minimal repair

The next admissible term is not an arbitrary diagonal spurion. The same triangle generates another Hermitian noncentral operator,

\[
C_\pm=i[D,H_\pm].
\]

It vanishes for an equilateral triangle and is fixed by the existing incidence data. A single sector coefficient multiplying (C_-) is the smallest next test. With five dimensionless inputs against four mixing observables and two affine spectral ratios, it retains one held-out relation. If that relation fails, adding a generic family matrix is disallowed and this triangle realization should close.

## Verdict

\[
\boxed{
\text{CKM-magnitude interpolation: yes},\quad
\text{joined mixing-plus-mass spectrum: not found},\quad
\text{global exclusion: no}.
}
\]

## Reproduction

~~~powershell
node verification/verify/verify_spin23_triangle_laplacian_signless_joining.mjs
~~~
