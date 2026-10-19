# Result 35: the gauge-typed source quotient has one anomaly coordinate and no incidence eigenray

**Date:** 17 October 2026  
**Workstream:** physical sources, gauge-typed renormalisation and ALP readout  
**Status:** exact operator quotient and leading noncontact Yukawa channel block; full diagrammatic counterterms and threshold matching remain open  
**Certificate:** [verify_programme_gauge_typed_source_quotient_and_yukawa_channel_block.mjs](scripts/verify_programme_gauge_typed_source_quotient_and_yukawa_channel_block.mjs)

## Result in ordinary language

The next layer of the direct-current problem can be reduced without guessing a renormalisation matrix.

Start with the five gauge-charged fermion phase currents, the Higgs phase current and the hypercharge equation-of-motion representative. Adding the completed sterile-neutrino current supplies the seventh phase direction and the fourth, neutrino-Yukawa breaking channel.

After removing the gauged hypercharge direction and all purely local equation-of-motion/contact information, the completed theory contains exactly five physically active linear coordinates:

\[
\boxed{(v_u,v_d,v_e,v_\nu;a_2).}
\]

The first four say how strongly a source breaks the four Yukawa interactions. The fifth is the one independent gauge-anomaly coordinate, which may be represented by the weak \(SU(2)^2\)-source anomaly.

The only direction invisible to all five coordinates, after hypercharge is quotiented, is completed \(B-L\).

This is the same five-dimensional physical quotient found from the ALP basis, now derived directly from the gauge-typed current basis.

## 1. Raw gauge-typed basis

For the fifteen-state Standard Model, the gauge-active phase basis is

\[
(j_Q,j_{u^c},j_{d^c},j_L,j_{e^c},j_H),
\]

with

\[
j_H^\mu=iH^\dagger\overleftrightarrow D^\mu H.
\]

An off-shell basis may additionally retain

\[
E_B^\mu=\partial_\nu B^{\nu\mu}-g'J_Y^\mu.
\]

This is an equation-of-motion operator. It is required when organising counterterms and contact identities, but it vanishes between separated physical insertions. It does not create an eighth physical source direction.

The completed Dirac-neutrino theory adds \(j_{\nu^c}\), giving the seven phase currents

\[
(j_Q,j_{u^c},j_{d^c},j_L,j_{e^c},j_{\nu^c},j_H).
\]

The total gradient \(\partial^\mu(H^\dagger H)\) belongs to the longitudinal/contact sector and is likewise excluded only after stating the quotient.

## 2. Exact Yukawa map

In the completed basis, the four Yukawa rows are

\[
V=
\begin{pmatrix}
1&1&0&0&0&0&1\\
1&0&1&0&0&0&-1\\
0&0&0&1&1&0&-1\\
0&0&0&1&0&1&1
\end{pmatrix}.
\]

They map a source charge vector to

\[
(v_u,v_d,v_e,v_\nu)=Vx.
\]

The kernel is spanned by hypercharge, baryon number and lepton number. Thus the Yukawa-broken quotient is exactly four-dimensional.

## 3. The smallest exact noncontact mixing block

Using the free separated-point current metric

\[
D=\operatorname{diag}(6,3,3,2,1,1,1),
\]

the induced metric on the four Yukawa descendants is

\[
M=VD^{-1}V^T
=
\begin{pmatrix}
\frac32&-\frac56&-1&1\\
-\frac56&\frac32&1&-1\\
-1&1&\frac52&-\frac12\\
1&-1&-\frac12&\frac52
\end{pmatrix}.
\]

This matrix is the smallest exact block carrying all shared-field mixing. Its off-diagonal entries have a simple origin: the up and down operators share \(Q\) but use opposite Higgs orientation; the charged-lepton and neutrino operators share \(L\) and also use opposite Higgs orientation.

In the sum/difference basis

\[
(u+d, e+\nu, u-d, e-\nu),
\]

it splits into two one-dimensional blocks and one two-dimensional block. Its exact eigenvalues are

\[
\boxed{
\frac23,quad 2,quad
\frac{8-\sqrt{37}}3,quad
\frac{8+\sqrt{37}}3.
}
\]

All are positive and distinct.

For the five gauge-charged fermion currents plus Higgs, before neutrino completion, the charged-Yukawa block has exact eigenvalues

\[
\boxed{\frac23,quad1,quad\frac{23}{6}.}
\]

Thus the sterile completion changes the physical mixing block rather than appending an inert zero.

## 4. Why hypercharge/EOM cannot change this block

Hypercharge lies in \(\ker V\). For every descendant coordinate \(z\), its canonical lift is \(D^{-1}V^Tz\), and

\[
\langle Y,D^{-1}V^Tz\rangle_D
=Y^TV^Tz
=(VY)^Tz=0.
\]

Therefore the entire broken block is already perpendicular to the hypercharge direction. Quotienting the hypercharge equation-of-motion representative leaves \(M\) exactly unchanged.

The same argument shows that local changes of representative along baryon or lepton number do not change the four Yukawa coordinates. Contact terms can change subtraction polynomials, but not the positive-energy discontinuity encoded by this block.

## 5. Gauge anomalies add only one coordinate

Use the declared linear anomaly rows

\[
\begin{aligned}
A_3&=2SU(3)^2-X,\\
A_2&=2SU(2)^2-X,\\
A_{Y^2}&=(6Y)^2-X,\\
A_{\rm grav}&=\mathrm{gravity}^2-X.
\end{aligned}
\]

They satisfy the exact row identities

\[
A_3=V_u+V_d,
\]

\[
A_{Y^2}=48V_u+12V_d+36V_e-18A_2,
\]

and

\[
A_{\rm grav}=3V_u+3V_d+V_e+V_\nu.
\]

Consequently only \(A_2\) adds a new direction beyond the four Yukawa violations:

\[
\operatorname{rank}\begin{pmatrix}V\\A\end{pmatrix}=5,
\qquad
\ker(V,A)=\operatorname{span}\{Y,3(B-L)\}.
\]

After the gauged hypercharge quotient, completed \(B-L\) is the unique null current.

This identifies the exact contact/EOM-insensitive current quotient without computing a convention-dependent seven-by-seven anomalous-dimension matrix.

## 6. Incidence inside the five-coordinate quotient

The two completed incidence conventions map to

\[
\lambda_d\longmapsto(10,6,2,1;16),
\]

and

\[
\lambda_m\longmapsto(10,6,4,1;16).
\]

They share one non-generic, shear-invariant relation:

\[
\boxed{A_2=A_3=v_u+v_d=16}
\]

in the declared standard anomaly normalization. This relation is unchanged by adding hypercharge or \(B-L\).

However, neither Yukawa-breaking vector is an eigenvector of \(M\). Each has nonzero support in every relevant shared-field channel. Therefore:

\[
\boxed{\text{the incidence ray is not multiplicatively closed even in the smallest exact noncontact block}.}
\]

The equality of the two anomaly coefficients is a UV signature of the declared source charges, not a dynamically selected or RG-invariant incidence eigenray. Equality between differently normalized gauge factors must not be presented as a unification prediction without a normalization and matching prescription.

## 7. Contact and scheme quotient

Three layers must be kept distinct:

1. **Off-shell counterterm basis:** retain \(E_B^\mu\), the Higgs gradient, BRST-exact terms and local source polynomials.
2. **Separated-point current quotient:** remove EOM and total-gradient insertions; quotient gauged hypercharge.
3. **Absorptive physical quotient:** take the positive-energy discontinuity, which removes all finite local contact polynomials.

At the third layer, the exact linear data are the five coordinates \((Vx,A_2x)\), modulo overall probe normalization. A coupling-dependent finite change of broken-source coordinates may alter a displayed running anomalous-dimension matrix, but it cannot turn incidence into an eigenvector of the fixed leading spectral block above.

## 8. Go/no implications

### Direct-current programme

**Go:** use the five-coordinate quotient, not an assumed two-current closure. The next diagrammatic calculation only needs to determine the energy-dependent positive metric and interference terms on these five coordinates.

**No-go for exact two-current closure:** the incidence vector is not an eigenvector of the exact shared-field Yukawa block. Beyond the protected \(B-L\) axis, four Yukawa channels and one anomaly channel are physically available. A two-current truncation requires a measured hierarchy, threshold regime or external projection; algebra alone does not close it.

**Remaining falsifier:** if a specified noncontact observable has rank one throughout a finite energy interval and its unique broken singular vector tracks incidence rather than the top channel, the effective two-current model is recovered operationally.

### Action-derived incidence selector

The hypercharge/EOM completion supplies no new selector. It acts entirely in the protected/contact sector and leaves the broken channel metric unchanged. Together with Result 33, the ordinary free action therefore does not derive the incidence kernel or its integer ratios.

### ALP programme

The five-coordinate quotient is precisely the natural physical ALP coupling space after redundant fermion-current directions are removed. Therefore:

- do not fit hypercharge/EOM or \(B-L\) shear as physical parameters;
- retain four Yukawa-breaking coordinates and one independent anomaly coordinate in a model-independent analysis;
- test the incidence benchmarks as lower-dimensional UV hypotheses inside that space;
- preserve the charged-lepton fork \(v_e=2\) versus \(v_e=4\);
- optionally test the common UV relation \(A_2=A_3=v_u+v_d\), while allowing RG evolution and threshold matching to map it into the chosen low-energy basis.

The exact five-coordinate quotient supports the reduced-rank ALP programme. It does not promote either incidence benchmark to a derived law.

## 9. Next bounded calculation

Compute one physical five-by-five absorptive response at a declared energy, beginning with the top, bottom, charged-lepton and weak-anomaly cuts. Profile only experimentally realizable source normalizations. The decision test is whether its singular spectrum reduces to one stable broken direction plus \(B-L\), or whether at least two broken directions remain resolvable.

