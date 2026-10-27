# Passive loss requires a bath ledger and can destroy the holonomy gap

**Date:** 27 October 2026

**Status:** exact finite passive-dilation and exceptional-point boundary; device-specific non-Hermitian tomography remains open

**Parents:** [joint impedance/holonomy identifiability](admissibility_152_scalar_impedance_cannot_identify_dark_holonomy_but_matrix_residues_can.md), [loss port and finite bath boundary](../rdg-maxwell-bridge/12_loss_port_and_finite_bath_boundary.md), [robustness window](admissibility_27_robustness_window_for_projective_return_coherent_holonomy_and_selection.md)

**Evidence:** [passive-loss ledger](../../../evidence/data/admissibility-passive-loss-holonomy-boundary-v1.json); [independent verifier](../../../verification/admissibility/verify_passive_loss_holonomy_boundary.mjs)

**Literature contacts:** [Gough and Zhang, passive quantum-linear realization theory](https://arxiv.org/abs/1311.1375); [Mehri-Dehnavi and Mostafazadeh, non-Hermitian geometric phase](https://arxiv.org/abs/0807.3405); [Hassan *et al.*, dynamical exceptional-point encircling](https://arxiv.org/abs/1706.09938)

## Result

Loss does not merely move a real pole downward. It changes which carrier is
closed, which eigenspaces remain degenerate and which notion of holonomy is
being measured.

An effective passive generator may be written

\[
K(q)=H(q)-\frac{i}{2}\Gamma(q),
\qquad
H=H^*,
\qquad
\Gamma\succeq0.
\]

Three regimes must be separated:

1. **uniform compatible loss:** (Gamma) is scalar on the target cluster and
   commutes with its projector; eigenvectors and Hermitian holonomy survive,
   multiplied by a common attenuation;
2. **differential loss:** (Gamma) resolves or mixes the cluster, replacing
   the rank-(r) degenerate eigenspace by distinct complex modes;
3. **exceptional regime:** eigenvalues and eigenvectors coalesce, the
   diagonalizable projector bundle fails and exceptional-point monodromy is
   not the Wilczek--Zee holonomy of the original self-adjoint family.

## Exact one-step passive dilation

Let the observed amplitude be

\[
a=r e^{i\theta},
\qquad 0<r<1.
\]

Set (b=\sqrt{1-r^2}) and

\[
U=
\begin{pmatrix}
a&b\\
b&-\overline a
\end{pmatrix}.
\]

Then (U) is unitary and compression to the first coordinate gives (a).
The missing norm (1-r^2) has not vanished; it moved into the second, bath
coordinate.

But a finite bath does not generate permanent Markovian loss. If the bath is
retained for a second step,

\[
(U^2)_{11}=a^2+b^2,
\]

whereas resetting or discarding the bath after every step produces (a^2).
The difference (b^2) is the return amplitude. Thus a lossy effective carrier
requires a declared bath preparation and reset rule, not just a complex pole.

## Exact passive exceptional point

Consider

\[
K=
\begin{pmatrix}
-i\gamma_1/2&g\\
g&-i\gamma_2/2
\end{pmatrix},
\qquad \gamma_1,\gamma_2\ge0.
\]

Its eigenvalues are

\[
\lambda_\pm=-\frac{i}{4}(\gamma_1+\gamma_2)
\pm\sqrt{g^2-\frac{(\gamma_1-\gamma_2)^2}{16}}.
\]

At (|\gamma_1-\gamma_2|=4|g|), the square root vanishes and the matrix is
defective. This requires no gain: (gamma_1=0,gamma_2=4g>0) is passive.
Consequently arbitrarily careful phase control cannot rescue the Hermitian
doublet once differential loss reaches this boundary.

## What survives loss

For a target projector (P(q)), the conservative holonomy remains the right
leading model only if

\[
[\Gamma(q),P(q)]=0,
\qquad
P\Gamma P=\gamma(q)P,
\]

and the complex gap from the target cluster to all other modes stays open.
Then loss is a common scalar inside the cluster. The normalized coherent
return can still be compared with the predicted unitary holonomy, while total
amplitude tests the bath ledger.

If those conditions fail, the experiment must use left and right
eigenvectors, biorthogonal residues and a non-Hermitian connection. Its
geometric phase may be complex, norm dependent and path-direction dependent.
Near an exceptional point, slow driving does not guarantee the ordinary
adiabatic outcome; mode selection can be dominated by differential decay.

Calling all of these records “topological holonomy” would erase the mechanism
the experiment is meant to distinguish.

## Revised experimental gates

Before interpreting a quarter-turn:

1. fit the full complex poles and matrix residues;
2. estimate (Gamma(q)) and test its commutator with the target projector;
3. bound differential loss within the cluster;
4. verify a nonzero complex spectral gap along the whole loop;
5. measure all accessible output and bath ports to close the energy ledger;
6. reverse the loop at matched speed to separate geometric transport from
   direction-dependent decay selection;
7. repeat at several traversal times to expose nonadiabatic and bath-memory
   effects;
8. declare whether the analysis uses Hermitian, biorthogonal or exceptional
   holonomy before fitting the result.

The experiment passes the conservative gate only when the normalized return
approaches a unitary matrix while the missing norm appears in calibrated
ports. It passes a non-Hermitian gate only when the complex generator predicts
both amplitude and state conversion without changing models.

## Implication for the larger programme

The “fluffy field” or substrate language can be made operational here: it is
the omitted bath carrier required to dilate a contraction. This does not make
the bath an aether. Its state, spectrum, coupling and recurrence time must be
measured. A genuinely Markovian semigroup requires an effectively fresh or
continuous bath limit; a finite hidden carrier eventually returns information.

The loss analysis also narrows the TUFT comparison. Real Beltrami spectra and
self-adjoint determinant formulae cannot be transferred directly to resonant
lossy hardware. Conversely, an exceptional-point phase is not evidence for a
fundamental Hopf defect unless the ordinary non-Hermitian model fails.

## Verdict

The joint holonomy/impedance experiment remains viable in the compatible-loss
regime. Differential loss supplies a measurable deformation and an exact
exceptional boundary, not a nuisance that can be divided out afterward. The
complete record must include bath power, complex residues, traversal-time
scaling and loop reversal. This closes the finite loss logic and leaves only a
device-specific parameter audit.
