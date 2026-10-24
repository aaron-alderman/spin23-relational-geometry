# Frontier Wave 7.7: Minimal Reflexive Closure and the Neutral Common Mode

**Date:** 24 October 2026  
**Status:** exact local closure theorem and executable certificate; microscopic carrier open

## Result

The smallest honest extension of projector-only feedback has two evolving rails: a selected coordinate (p) and a retained memory coordinate (y). Near any branch, let

\[
\begin{pmatrix}p_{n+1}\\y_{n+1}\end{pmatrix}
=
M_0
\begin{pmatrix}p_n\\y_n\end{pmatrix},
\qquad
M_0=
\begin{pmatrix}
r&1-r\\
\mu&1-\mu
\end{pmatrix}.
\]

The first rail moves toward the remembered datum; the second updates from the selected rail. The two eigenvalues are

\[
\boxed{1,quad r-\mu.}
\]

Thus |(r-\mu)|<1 makes the *difference* between the rails contract, but the common displacement ((1,1)) remains neutral. The machine finds relational consistency (p=y); it does not choose where on the symmetry orbit that common value lies.

This is the dynamical form of the projector-only equivariance no-go. Adding an evolving second rail is enough for synchronization, not for absolute orientation.

## Optimization form

The same distinction is visible before dynamics. With only a rail-coupling energy,

\[
E_0(p,y)=\frac{\kappa}{2}(p-y)^2,
\]

the Hessian is

\[
H_0=\kappa
\begin{pmatrix}1&-1\\-1&1\end{pmatrix}.
\]

It has one positive relative eigenvalue and one zero common eigenvalue. The minima form a line (p=y). This is precisely the user's optimization picture: the dynamics can collapse toward a line or surface while still failing to select one point on it.

## The smallest datum that closes the remaining direction

Let (b) be a boundary, defect or persistent historical record and update

\[
\begin{pmatrix}p_{n+1}\\y_{n+1}\end{pmatrix}
=
M_b
\begin{pmatrix}p_n\\y_n\end{pmatrix}
+
\begin{pmatrix}0\\\nu b\end{pmatrix},
\qquad
M_b=
\begin{pmatrix}
r&1-r\\
\mu&1-\mu-\nu
\end{pmatrix}.
\]

The unique fixed point is

\[
\boxed{p_*=y_*=b.}
\]

For the certified choice

\[
r=\frac13,
\qquad
\mu=\frac14,
\qquad
\nu=\frac12,
\]

the tangent eigenvalues are

\[
\lambda_{\pm}=\frac{7\pm\sqrt{97}}{24},
\]

both strictly inside the unit circle. The boundary/history term has converted the neutral common direction into a contractive one.

Equivalently,

\[
E_b(p,y)=\frac{\kappa}{2}(p-y)^2+
\frac{\eta}{2}(y-b)^2
\]

has Hessian determinant (kappa\eta>0) and a unique minimum at (p=y=b).

## What kind of symmetry breaking is this?

The status depends entirely on where (b) comes from:

- **external fixed (b):** explicit boundary selection;
- **a metastable (b) chosen by an earlier fluctuation and then retained:** spontaneous, history-selected branching;
- **(b=f(p)) generated equivariantly from the same instantaneous projector:** no new datum; the common neutral orbit returns;
- **a hidden (b) inferred only through lag or hysteresis:** effective memory, whose kernel and noise must be measured.

So boundary memory is not a verbal escape hatch. It supplies genuinely new information only if two states with the same present projector can carry different (b). Operationally, there must be a preparation or hysteresis protocol that holds (P) fixed while changing the later response.

## The orientation bit remains separate

A director projector satisfies

\[
nn^T=(-n)(-n)^T.
\]

Neither rail can reconstruct the sign of the oriented lift from projectors alone. A quarter-turn therefore still needs an orientation bit, loop direction or coherent phase reference (s). The minimal closed state is not just (P), but schematically

\[
\boxed{(P,;Y,;B,;s).}
\]

These entries have different jobs:

- (P): present admissible structure;
- (Y): dynamically updated relational memory;
- (B): persistent branch/boundary record removing the common neutral mode;
- (s): oriented lift needed to distinguish (J) from (J^{-1}).

They may be realized by fewer microscopic fields, but they cannot be erased as independent *roles* without restoring a no-go.

## Implication for the ladder

The two rails are now mathematically identifiable:

\[
\text{present structure }P
\quad\Longleftrightarrow\quad
\text{retained response/history }Y.
\]

Crossbars synchronize them. A boundary or metastable record terminates the remaining sliding freedom. Oriented transport then acts on the coherent lift rather than on the bare projector. Long-lived synchronized records can become walls and defects; those modify the admissible loops; the loops feed new holonomy back into the next selection problem.

This does not yet derive matter or topology from admissibility. It does isolate the first nontrivial closure mechanism and its unavoidable missing datum.

## Falsifiable discriminator

Prepare two runs with indistinguishable present projector (P) but opposite or otherwise distinct stored histories (B). Apply the same closed control loop and compare:

1. the selected return coordinate;
2. the relaxation eigenvalues;
3. the sign of coherent quarter-turn holonomy;
4. hysteresis under loop reversal.

If all later observables are determined by present (P), then (B) is redundant and the model collapses to the projector-only no-go. If a reproducible history-conditioned difference survives after controls for drift and detector memory, the extra rail is operationally real.

## Certificate

The companion verifier [checks the neutral eigenmode, the anchored contraction, the exact fixed point and the director-orientation obstruction](../../../../verification/verify/verify_minimal_reflexive_boundary_memory_closure.mjs).

