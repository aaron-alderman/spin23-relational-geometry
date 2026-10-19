# The minimum-variance response functional is a canonical relative selector, but Standard Model family spaces and weights remain noncanonical

## Main result

Once a Hermitian family-response tensor \(H\) is available, there is a natural positive alignment functional on primitive projectors:

\[
\boxed{
V_H(P)=\kappa\|[P,H]\|_{\mathrm{HS}}^2
=2\kappa\left(
\langle H^2\rangle_P-langle H\rangle_P^2
\right),
\qquad
\langle A\rangle_P:=\operatorname{Tr}(PA).
}

For \(\kappa>0\), this is twice the variance of \(H\) in the rank-one state selected by \(P\). Its minima are exactly the eigenprojectors of \(H\).

For several response tensors,

\[
V_{\mathrm{align}}(P)
=\sum_a\kappa_a\|[P,H_a]\|_{\mathrm{HS}}^2

\]

selects a state minimizing their weighted total variance. Noncommuting tensors can generically remove the discrete eigenline degeneracy of any one tensor and produce an isolated rank-one direction.

This is a concrete relative closure mechanism. However, the Standard Model does not provide one canonical Hermitian tensor on one canonical common family bundle. Its Yukawa matrices connect several inequivalent left- and right-handed family spaces, and neither their relative identification nor the coefficients \(\kappa_a\) follow from the present action. Empirical-Yukawa closure is therefore well defined only after additional typing and weighting data are supplied.

## 1. Derivation of the variance identity

Let

\[
P=|p\rangle\langle p|,
\qquad
\langle p|p\rangle=1,
\]

and let \(H=H^\dagger\). Then

\[
[P,H]^\dagger=-[P,H].

\]

The Hilbert–Schmidt norm is

\[
\|[P,H]\|_{\mathrm{HS}}^2
=\operatorname{Tr}\!\left([P,H]^\dagger[P,H]\right).

\]

Expanding and using \(P^2=P\),

\[
\begin{aligned}
\|[P,H]\|_{\mathrm{HS}}^2
&=-\operatorname{Tr}([P,H]^2)\\
&=2\operatorname{Tr}(PH^2)-2\operatorname{Tr}(PHPH).
\end{aligned}

Because \(P\) has rank one,

\[
PHP=\langle H\rangle_P P,

\]

so

\[
\operatorname{Tr}(PHPH)=\langle H\rangle_P^2.

\]

Therefore

\[
\boxed{
\|[P,H]\|_{\mathrm{HS}}^2
=2\left(
\langle H^2\rangle_P-langle H\rangle_P^2
\right).
}

The right-hand side is twice the ordinary variance of \(H\) in state \(P\).

## 2. Exact minimizers for one tensor

Variance is nonnegative:

\[
V_H(P)\ge0.

\]

It vanishes exactly when

\[
[P,H]=0.

\]

For rank-one \(P\), this means the image of \(P\) is an eigenspace of \(H\). If \(H\) has three distinct eigenvalues, there are precisely three minima:

\[
P=\Pi_1(H),
\quad
P=\Pi_2(H),
\quad
P=\Pi_3(H).

\]

Thus the variance functional aligns the projector with the response eigenframe but does not decide which eigenline is exceptional.

An additional linear term

\[
-\eta\operatorname{Tr}(PH)

\]

selects an extremal eigenline according to the sign of \(\eta\), but the sign and magnitude of \(\eta\) must come from dynamics.

## 3. Local masses around an eigenprojector

Let \(H|i\rangle=\lambda_i|i\rangle\) and take

\[
P_i=|i\rangle\langle i|.

\]

Perturb the selected vector toward \(|j\rangle\):

\[
|p(\epsilon)\rangle
=\sqrt{1-|\epsilon|^2}|i\rangle
+\epsilon|j\rangle.

\]

To quadratic order,

\[
V_H(P(\epsilon))
=2\kappa(\lambda_i-\lambda_j)^2|\epsilon|^2
+O(|\epsilon|^3).

\]

The projector-orientation mass is controlled by the squared eigenvalue gap. Nondegenerate response spectra gap all \(\mathbb{CP}^2\) tangent directions around each eigenprojector.

## 4. Several noncommuting response tensors

Let

\[
V(P)
=\sum_a\kappa_a\|[P,H_a]\|_{\mathrm{HS}}^2,
\qquad
\kappa_a>0.

\]

Then

\[
V(P)
=2\sum_a\kappa_a
\left(
\langle H_a^2\rangle_P-langle H_a\rangle_P^2
\right).

\]

If all \(H_a\) share a common eigenvector, the corresponding projector can have zero total variance. If they have no common eigenvector, the minimum is positive and represents the best compromise state.

For generic noncommuting triples \(H_a\), the minimizers are isolated except at parameter values producing an accidental degeneracy. Hence multiple family responses can select a unique projector even when each tensor alone leaves three eigenline choices.

The stationarity equation is nonlinear because \(\langle H_a\rangle_P\) depends on \(P\). Varying gives the response

\[
\mathcal R_{\mathrm{align}}[P]
=2\sum_a\kappa_a
\left(
H_a^2-2\langle H_a\rangle_P H_a
\right)

\]

up to additions proportional to the identity and convention-dependent overall factors. Projector stationarity is

\[
[P,\mathcal R_{\mathrm{align}}[P]]=0.

\]

This is a genuine self-consistent spectral equation rather than the spectral decomposition of one fixed matrix.

## 5. Standard Model family-space typing

The Standard Model Yukawa maps do not all act on one family vector space. Schematically,

\[
\begin{aligned}
Y_u&:V_Q\to V_u,\\
Y_d&:V_Q\to V_d,\\
Y_e&:V_L\to V_e,\\
Y_\nu&:V_L\to V_\nu,\\
M_R&:V_\nu^*\to V_\nu.
\end{aligned}

Each Yukawa yields two Hermitian tensors on different bundles:

\[
Y_fY_f^\dagger\in\operatorname{End}(V_{\mathrm{left}}),
\qquad
Y_f^\dagger Y_f\in\operatorname{End}(V_{\mathrm{right}}).

\]

For example,

\[
H_u^{(Q)}=Y_uY_u^\dagger,
\qquad
H_d^{(Q)}=Y_dY_d^\dagger

\]

can be combined on \(V_Q\), while

\[
H_e^{(L)}=Y_eY_e^\dagger,
\qquad
H_\nu^{(L)}=Y_\nu Y_\nu^\dagger

\]

can be combined on \(V_L\). But there is no Standard Model gauge principle canonically identifying

\[
V_Q\cong V_L

\]

or the several right-handed family spaces.

Thus one can define separate selectors

\[
P_Q\in\operatorname{End}(V_Q),
\qquad
P_L\in\operatorname{End}(V_L),

\]

but a single universal family projector requires additional intertwiners or unification data.

## 6. The lepton branch is better typed than a universal-family branch

The anomaly-free symmetries \(B-3L_i\) distinguish a lepton family while assigning universal baryonic charge to quarks. The primitive rank split is therefore naturally and directly represented on the lepton family bundle

\[
V_L\cong\mathbb C^3.

\]

On this bundle the two obvious response tensors are

\[
H_e=Y_eY_e^\dagger,
\qquad
H_\nu=Y_\nu Y_\nu^\dagger

\]

or the low-energy Majorana combination if the seesaw has been integrated out.

The empirical-Yukawa alignment functional is then

\[
V_L(P)
=\kappa_e\|[P,H_e]\|^2
+\kappa_\nu\|[P,H_\nu]\|^2.

\]

Nontrivial lepton mixing means \(H_e\) and \(H_\nu\) are not simultaneously diagonal in general. Their competition can isolate a unique projector.

However, this does not yet select one of \(B-3L_e\), \(B-3L_\mu\), or \(B-3L_\tau\) without specifying \(\kappa_e,\kappa_\nu\), the neutrino spectrum, and the relevant Majorana phases.

## 7. No canonical relative weighting

The matrices \(H_e\) and \(H_\nu\) have different physical dimensions or vastly different numerical scales depending on convention and seesaw completion. Even after forming dimensionless normalized matrices, several choices are possible:

\[
\widehat H
=\frac{H}{\operatorname{Tr}H},
\qquad
\frac{H}{\|H\|},
\qquad
\log(H/\mu^2),
\qquad
f(H/\mu^2).

\]

Different choices can move the minimum of the variance functional. Equal coefficients are not basis dependent, but they are sector-normalization dependent and therefore not canonical.

The weights \(\kappa_a\) must be obtained from:

- loop coefficients in a specified action;
- common ultraviolet normalization from a unifying representation;
- spectral-action coefficients;
- or measured/assumed matching conditions.

Without one of these, the minimum-variance selector is a family of models rather than one prediction.

## 8. Stress-energy interpretation

The variance functional can be viewed as the energetic cost of incompatibility between a proposed split and a family response. But universal stress-energy still supplies only scalar coefficients unless the action already contains the family tensors \(H_a\).

Once Yukawa or self-energy data are present, stress-energy loops may determine the coefficients \(\kappa_a\). They can weight the response, but they do not manufacture the noncommuting matrices from a family-blind theory.

Thus the original sandwich becomes

\[
T
\;\mathbb S_{P,H_a}\;
T,

\]

not merely \(T\mathbb S_PT\). The family tensor is an essential typed input to the middle operation.

## 9. Relation to full-frame selection

Once \(P_1=P\) minimizes the total variance, restrict the same response tensors to

\[
Q_1=I-P_1.

\]

A charge-three link \(S:L_1\to Q_1\) defines \(P_2\). Its directional potential can be the restricted variance

\[
V_2(P_2)
=\sum_a\widetilde\kappa_a
\|[P_2,Q_1H_aQ_1]\|^2.

\]

Then

\[
P_3=I-P_1-P_2.

\]

This supplies a recursive spectral construction of the full Jordan frame. The hierarchy of response gaps determines the hierarchy of orientation masses.

## 10. Status of empirical-Yukawa closure

The branch is now sharply classified.

### Proven

- A positive basis-covariant alignment functional exists.
- Its one-tensor minima are exactly spectral projectors.
- Multiple noncommuting tensors can generically yield isolated minima.
- Its Hessian is controlled by response eigenvalue gaps.
- The same construction recursively selects a full Jordan frame.

### Underived

- A canonical common family bundle beyond the lepton-left branch.
- The coefficients and normalization functions weighting different response tensors.
- The neutrino absolute spectrum and Majorana response needed for a numerical selector.
- A microscopic derivation of the variance functional from the closure action.

### Consequence

Empirical Standard Model data can constrain a family of projector selectors, but the present programme cannot yet claim that the observed Yukawas uniquely derive one \(B-3L_i\) branch.

## 11. Next calculations

Three live continuations remain.

1. **Loop derivation:** derive the coefficient and sign of \(\|[P,H]\|^2\) from fermions coupled to the determinant-neutral connection and charge-three link.
2. **Neutrino scan:** evaluate the selector across allowed neutrino masses, ordering, mixing, CP and Majorana phases to see whether one projector basin is robust.
3. **Unifying normalization:** test whether the Furey/Jordan representation supplies a common metric identifying the several family spaces and fixing the \(\kappa_a\).

Failure of all three would leave family orientation sharply indeterminate while preserving the rest of the rank-split/BF construction.

