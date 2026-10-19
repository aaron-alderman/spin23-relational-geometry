# Freudenthal Action Investigation: Mechanism and No-Go Synthesis

**Date:** 17 October 2026  
**Decision:** accept the Gaussian--Schur derivation as an effective Euclidean/static mechanism; reject a scale-fixing exceptional action or contact-independent same-sign causal-response law  
**Scope:** derivation of (mathcal T(A,C)=0), equivalently (C=lambda A^{-1}), on the positive (H_2(mathbb R)) carrier

## Final answer

The Freudenthal critical-null equation can be derived independently inside the existing programme, but its honest physical scope is narrower than the exceptional language suggests.

The existing positive Gaussian boundary action produces a Schur boundary Hessian (R). Its actual marginal boundary covariance at temperature (T) is

\[
C_b=T R^{-1}.
\]

Therefore

\[
\boxed{
\mathcal T(R,C_b)=0,
\qquad q(R,C_b)=0,
\qquad RC_b=TI.
}

This is an action-level mechanism, not an exceptional ansatz. It follows from Gaussian integration, the block-inverse identity and equilibrium covariance.

What it fixes is

\[
\lambda=k_BT
\]

or, for a conventionally normalized Euclidean Gaussian mode, the corresponding (1) or (hbar) factor. This is a state or quantization normalization, not a newly derived Standard-Model parameter.

At the full causal-response level, there is an exact obstruction. Two same-convention Herglotz responses cannot satisfy (C=+lambda A^{-1}) with (lambda>0). Causal inversion is instead

\[
C=-lambda A^{-1}.
\]

It exchanges poles and zeros and generally changes the ultraviolet class. In addition, spectral data alone cannot reconstruct the inverse because real contact shifts leave the spectrum unchanged while changing the inverse.

Thus the completed result is:

> **A valid Gaussian stiffness--covariance mechanism exists, while a purely exceptional, contact-independent, same-sign causal-response mechanism does not.**

## 1. Mechanism theorem

Let a positive quadratic action be split into retained boundary variables (b) and hidden variables (h):

\[
S=\frac12
\begin{pmatrix}b\\h\end{pmatrix}^{T}
\begin{pmatrix}
K_{bb}&K_{bh}\\
K_{hb}&K_{hh}
\end{pmatrix}
\begin{pmatrix}b\\h\end{pmatrix}.
\]

Eliminating (h) yields

\[
R=K_{bb}-K_{bh}K_{hh}^{-1}K_{hb}.
\]

At temperature (T), the Gaussian covariance is (TK^{-1}), and the block-inverse theorem gives

\[
C_b=T(K^{-1})_{bb}=TR^{-1}.
\]

This applies directly to the scalar-star action already constructed in document 203. It also extends to any finite positive Gaussian network after the relevant null modes are removed.

## 2. Variational theorem

The same relation is the unique minimum of

\[
\Gamma_{A,kappa}(C)
=\operatorname{tr}(AC)-\kappalog\det C.
\]

The first variation gives

\[
A-kappa C^{-1}=0,
\]

while the Hessian

\[
\kappa\operatorname{tr}
\left(C^{-1}\delta C,C^{-1}\delta C\right)
\]

is strictly positive. Hence

\[
C=\kappa A^{-1}

\]

is a stable and unique saddle.

The action is naturally typed under

\[
(A,C)\mapsto(GAG^T,G^{-T}CG^{-1}),

\]

not under the same response congruence on both entries.

## 3. Invariant-action classification

On the restricted paired face, the dual-(GL(2)) scalar invariants are

\[
s=\operatorname{tr}(AC),
\qquad
p=\det Adet C.
\]

For any differentiable action (f(s,p)) with (f_s\ne0), a positive stationary point must lie on an inverse ray,

\[
C=\lambda A^{-1}.
\]

The scale obeys

\[
f_s(2\lambda,lambda^2)
+\lambda f_p(2\lambda,lambda^2)=0.
\]

For the Gaussian action (f=s-kappalog p), this fixes (lambda=kappa).

For any action depending only on the restricted Freudenthal quartic

\[
q=-2(s^2-4p),

\]

the equation is identically satisfied on every inverse ray. Therefore:

\[
\boxed{
\text{exceptional invariance alone selects the shape relation but cannot fix its scale.}
}

## 4. Constraint status of (lambda)

| Setting | (lambda) | Meaning |
|---|---:|---|
| classical Gaussian equilibrium | (k_BT) | state temperature |
| normalized Euclidean Gaussian mode | (1), with units restored by (hbar) and field conventions | quantization/normalization |
| pure Freudenthal-quartic action | arbitrary positive value | exact scale degeneracy |
| Ward identity alone | unfixed | support and normalization restriction only |
| UV slope alone | not identified with (lambda) | supplies a response frame, not entropy coefficient |
| full causal inversion | sign-reversed and normalization dependent | spectrum-generating duality |

The programme therefore obtains a falsifiable product law once a state and normalization are specified, but not a new fundamental number.

## 5. Positivity and Ward result

For (A>0), the log-det action is strictly convex and its solution has (C>0). If Ward identities produce null directions, the full determinant and inverse do not exist. One must first pass to the physical quotient:

\[
C_{m phys}=lambda A_{m phys}^{-1}.

\]

In unreduced coordinates the strongest statement is

\[
AC=lambda P_{m phys}.

\]

This agrees with the programme's existing pseudoinverse/range gate.

## 6. Causal and KMS no-go

For any invertible matrix with positive imaginary part,

\[
\operatorname{Im}[-A^{-1}]
=A^{-\dagger}(\operatorname{Im}A)A^{-1}>0.

\]

Thus (+A^{-1}) has negative imaginary part. A positive inverse relation cannot hold between two strictly passive Herglotz responses using the same convention.

KMS does not repair this. The noise/absorptive multiplier

\[
\coth(\beta\omega/2)

\]

is frequency dependent, while equal-time covariance is a spectral integral. The static (RC=TI) law cannot be promoted pointwise across frequency.

## 7. Contact and UV no-go

Real contact shifts

\[
F\mapsto F+Q

\]

leave (operatorname{Im}F) unchanged but change (-F^{-1}). Therefore no functional of contact-independent absorptive data alone can reconstruct the full inverse response.

UV asymptotics and subtraction constants can complete the dispersive reconstruction, but then the result is explicitly UV/contact dependent. Fixed Ward and UV data do not supply a hidden exceptional symmetry; earlier stabilizer calculations show that they generally reduce it.

## 8. Furey and orientation result

The Gaussian/log-det mechanism uses only trace, determinant and symmetric inversion. It is unchanged by simultaneous reversal of the selected octonionic link line. It therefore:

- does not choose a point in the surviving Furey link-line family;
- does not distinguish the scalar and Furey-imaginary axes;
- does not select the channel/flux orientation torsor;
- cannot recover the orientation-odd Walsh coherence from population data.

An orientation-sensitive term would require complex, antisymmetric or retarded information beyond this positive static action.

## 9. (E_7/E_8) quarantine

The exceptional parent recognizes the Gaussian inverse pair as a critical-null element. That is a mathematically meaningful compression of the action's result.

It does not follow that:

- the Gaussian action has physical (E_7) symmetry;
- the normalized causal response has physical (E_7) symmetry;
- (E_8) selects this action, temperature or boundary face;
- the critical equation is more fundamental than Gaussian inversion;
- (lambda) is an exceptional prediction.

The explanatory arrow currently runs from the effective action to the exceptional locus, not from (E_8) to observed dynamics.

## 10. Requirement audit

| Goal requirement | Evidence | Verdict |
|---|---|---|
| independent action derivation | Gaussian--Schur block inversion and log-det free energy | achieved for static/Euclidean effective theory |
| classify invariant actions | (f(s,p)) stationarity theorem | achieved on restricted paired carrier |
| transformation typing | dual congruence versus same response congruence | achieved |
| positivity | strict convexity and positive Gaussian kernel | achieved |
| Herglotz causality | forced minus-inversion theorem | exact obstruction established |
| Ward compatibility | physical quotient/projector formulation | achieved |
| UV/contact compatibility | contact reconstruction no-go and prior stabilizer results | exact obstruction established |
| Furey orientation | simultaneous-reversal blindness | exact negative result |
| established response inversion | identified with (-F^{-1}), distinct from static covariance | achieved |
| fix or constrain (lambda) | (lambda=k_BT) or Gaussian normalization; otherwise underdetermined | achieved |
| action-level new physical constraint | (RC=k_BT I) is falsifiable but standard, not a new SM relation | no novel fundamental constraint |
| precise no-go/underdetermination | quartic scale degeneracy plus causal/contact no-go | achieved |
| executable certificates | three passing scripts | achieved |

## 11. Programme decision

Retain the result under the label:

> **Gaussian--Schur realization of the Freudenthal critical-null locus.**

Its scientifically defensible content is:

1. the exceptional locus is dynamically realized by a broad and familiar class of positive effective actions;
2. the locus expresses stiffness--covariance duality;
3. temperature or Gaussian normalization fixes the scale in that layer;
4. exceptional invariance alone does not fix the scale;
5. the relation does not extend to two same-sign causal responses;
6. contact-independent spectral data cannot determine the full inverse partner.

The next genuinely physics-producing step would require an explicit Standard-Model stress/current boundary action whose measured Hessian and covariance obey the product law with independently calibrated normalization. Until then, the result is a rigorous effective mechanism and a rigorous limit on exceptional interpretation.

## Evidence bundle

1. [Log-det variational mechanism and scale no-go](freudenthal_action_01_logdet_variational_mechanism_and_scale_no_go.md)
2. [Gaussian--Schur boundary realization](freudenthal_action_02_gaussian_schur_boundary_realization.md)
3. [Causal, spectral and contact no-go](freudenthal_action_03_causal_spectral_and_contact_no_go.md)
4. [Prior Freudenthal restriction synthesis](freudenthal_parallel_synthesis_decision_memo.md)

The certificates verify the stationary action, convexity, dual covariance, Schur/covariance block identity, quartic nullity, scale degeneracy, Herglotz sign, KMS frequency dependence, contact obstruction and Ward-projector boundary.
