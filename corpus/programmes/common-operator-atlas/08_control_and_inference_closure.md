# Control and inference closure

## Result

The remaining operator chain closes as

\[
\boxed{
\text{carrier}
\to\text{detector record}
\to\text{innovation}
\to\text{state estimate}
\to\text{control error}
\to\text{actuation}
\to\text{carrier}.}
\]

This is not a circle of synonyms. Each arrow has its own carrier, clock,
information loss and failure condition. The detector becomes an active
selector only through a declared estimator and controller.

## Continuous state space and the Laplace face

For the finite-dimensional linear time-invariant system

\[
\dot x=Ax+Bu+w,\qquad y=Cx+Du+v,
\]

the zero-state Laplace transform gives

\[
Y(s)=H(s)U(s),\qquad H(s)=C(sI-A)^{-1}B+D.
\]

With a nonzero initial state there is an additional term
`C(sI-A)^{-1}x(0)`. Thus a transfer function is an input--output quotient, not
the whole state model. Different internal realizations can have the same
`H(s)`; only minimal controllable and observable realizations are unique up to
similarity.

The pole statement also needs a qualification. Eigenvalues of `A` can cancel
against zeros when a mode is unreachable from `B` or invisible to `C`.
Consequently, scalar transfer data cannot certify access to the full carrier.
This reproduces the corpus's matrix-residue observability boundary in standard
control language.

## Sampling and the z face

Under a zero-order-held input with sample interval `Delta`, exact sampling is

\[
x_{k+1}=Fx_k+G u_k+w_k,
\qquad
F=e^{A\Delta},\qquad
G=\int_0^\Delta e^{A\tau}B\,d\tau.
\]

The z-domain transfer is

\[
H(z)=C(zI-F)^{-1}G+D.
\]

This is a discretization edge, not a substitution `s=z`. Stability maps the
open left half-plane to the unit disk through `z=exp(s Delta)`. Sampling can
alias oscillations, and the matrix logarithm does not uniquely recover `A`
without a spectral branch and bandwidth assumption. Initial conditions and
hold convention remain part of the receipt.

## Reachability and visibility

The finite-horizon algebraic tests are

\[
\mathcal C=[B,AB,\ldots,A^{n-1}B],
\qquad
\mathcal O=\begin{bmatrix}C\\CA\\\vdots\\CA^{n-1}\end{bmatrix}.
\]

Full rank of `mathcal C` means every state direction is reachable in the ideal
linear model; full rank of `mathcal O` means distinct initial states can be
distinguished from a finite output history. Neither proves practical
conditioning. The smallest singular values, actuator limits, noise and model
uncertainty determine whether the nominal rank is usable.

Controllability and observability are dual after transposition, but control and
measurement are not physically identical. `B` and `C` refer to different
laboratory interfaces.

## Kalman innovation is the detector residual

For the discrete linear-Gaussian model

\[
x_{k+1}=Fx_k+Gu_k+w_k,\quad w_k\sim\mathcal N(0,Q),
\]

\[
y_k=Cx_k+v_k,\quad v_k\sim\mathcal N(0,R),
\]

the predict--innovate--update cycle is

\[
\hat x_k^-=F\hat x_{k-1}^+ + Gu_{k-1},
\quad P_k^-=FP_{k-1}^+F^T+Q,
\]

\[
r_k=y_k-C\hat x_k^-,\quad
S_k=CP_k^-C^T+R,\quad
K_k=P_k^-C^TS_k^{-1},
\]

\[
\hat x_k^+=\hat x_k^-+K_kr_k.
\]

The innovation `r_k` is the new detector content after subtracting what the
current model predicted. Under the admitted model it should be white with
covariance `S_k`. A colored, biased or configuration-dependent innovation is
therefore a model criticism channel, not merely an error to suppress.

The Gaussian boundary is explicit. In a linear-Gaussian system this recursion
is the exact conditional mean and covariance. Outside it, the same equations
are at most a linear minimum-variance approximation. Observability alone does
not guarantee filter stability if covariance assumptions, detectability or
numerics fail.

## PID and saturation

For error `e=r-y`, a parallel PID law is

\[
u_{\rm raw}=K_Pe+K_I\xi-K_D\dot y,
\qquad \dot\xi=e.
\]

Using the derivative of the measurement avoids a set-point derivative kick.
Physical actuators saturate, so the applied command is
`u=sat(u_raw)`. If integration continues while saturated, `xi` accumulates a
command the actuator never delivered. Back-calculation anti-windup adds

\[
\dot\xi=e+K_{aw}(u-u_{\rm raw}),
\]

with convention-dependent scaling. This makes actuator admissibility part of
the state rather than a late clipping operation.

## The noncommuting loop

Estimation and control do not generally commute:

\[
\text{measure}\circ\text{control}
\ne
\text{control}\circ\text{measure}.
\]

Actuation changes what is subsequently measurable, while estimation changes
which actuation is chosen. Closing a loop can improve a detector by stabilizing
drift, but it can also erase the residual that would have falsified the model.
The admissible design therefore separates:

1. **lock channel:** a nuisance observable the controller is authorized to
   suppress;
2. **science channel:** a held-out observable never used as the control error;
3. **innovation monitor:** a preregistered whiteness/bias test for model failure;
4. **safety channel:** saturation, slew and power limits that override control.

## Executable closure and refusals

The control-loop verifier checks:

- exact zero-order-hold discretization for a scalar plant;
- state-space recurrence against z-domain impulse convolution;
- full and deliberately deficient controllability/observability ranks;
- covariance contraction in a three-state Kalman update;
- an anti-windup recovery advantage under saturation;
- a three-mode loop whose orientation-sensitive output survives because PID
  is assigned only to common detuning;
- failure of a fixed transfer function to represent a saturated closed loop;
- failure of scalar output data to reveal an unobservable internal mode.

These tests close the diagram's control boxes at the scoped software level.
They do not validate a device model until `A,B,C,D,Q,R`, delays and limits are
identified from held-out physical data.
