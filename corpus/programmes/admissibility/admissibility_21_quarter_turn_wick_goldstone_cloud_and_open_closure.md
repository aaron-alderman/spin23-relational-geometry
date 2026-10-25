# The quarter-turn is the common operator, not one common physical process

**Date:** 24 October 2026  
**Status:** exact cross-corpus operator synthesis with a strict physical-typing boundary  
**Parent:** [Linear flow versus antiunitary edge dynamics](admissibility_20_linear_flow_versus_antiunitary_edge_dynamics.md)  
**Evidence:** [Quarter-turn mode ledger](../../../evidence/data/admissibility-quarter-turn-wick-goldstone-cloud-open-closure-v1.json)  
**Verifier:** [Quarter-turn mode certificate](../../../verification/admissibility/verify_quarter_turn_wick_goldstone_cloud_open_closure.mjs)

## Result

The corpus contains one recurring real operator

\[
J=\begin{pmatrix}0&-1\\1&0\end{pmatrix},
\qquad J^2=-I,
\qquad e^{(\pi/2)J}=J.
\]

After identifying \((x,y)\in\mathbb R^2\) with \(x+iy\in\mathbb C\), \(J\) **is multiplication by \(i\)**. The quarter-turn does not merely use a pre-existing complex number: on an oriented real plane it is the extra structure that makes that plane a complex line.

This gives precise content to the proposed “wick around a candle” picture. A Wick rotation uses the same quarter-turn algebra, but multiplication by \(i\) alone is not yet a spacetime Wick rotation. The latter additionally requires a time variable, an analytic continuation or contour prescription, and control of reflection positivity or Lorentzian reconstruction. The safe statement is

\[
\boxed{\text{quarter-turn}=\text{complex structure};\quad
\text{Wick rotation}=\text{complex structure}+\text{typed time continuation}.}
\]

The quarter-turn is now one branch of a larger exact local alphabet. Replacing
its square \(-I\) by \(+I\) gives the split-complex/hyperbolic generator;
degenerating it to square zero gives the dual-number/parabolic generator. All
three exponentiate inside the same two-dimensional symplectic group, but only
the negative-square branch is a rotation. See
[AZ-129](admissibility_129_elliptic_hyperbolic_parabolic_local_alphabet.md).

The stronger corpus-wide result is now typed in
[AZ-131](admissibility_131_the_authored_rail_grading_closes_the_local_clifford_cell_but_opens_a_coincidence_channel.md)
and [AZ-132](admissibility_132_cross_corpus_clifford_cell_atlas_and_exhaustion.md):
an authored grading and its reversing exchange can generate the quarter-turn,
with the two dual directions appearing as null mixtures. Several carriers
realize this local grammar independently; none is identified physically
without an intertwiner preserving its response and record.

## One operator, six typed appearances

The repetition is now exact rather than metaphorical.

### 1. Two realities generate the complex turn

For the two square-one antiunitaries

\[
A=\sigma_xK,
\qquad B=\sigma_zK,
\]

their anticommutation gives

\[
AB=J,
\qquad (AB)^2=-I.
\]

Thus the complex direction is the *relative displacement between two real structures*. It is not necessary to begin by assuming an independent scalar \(i\).

### 2. The active three-cycle carries the same orientation

For the integral active Coxeter generator

\[
C=\begin{pmatrix}1&3\\-1&-2\end{pmatrix},
\qquad C^3=I,
\]

the corpus derives

\[
I_0=-(I+2C),
\qquad I_0^2=-3I.
\]

After normalization, \(I_0/\sqrt3\) is a complex structure. The oriented \(C_3\) cycle therefore already contains a metric-dependent quarter-turn; the handle transports it to the neutral plane. This is the continuous orientation remembered by the discrete three-cycle.

### 3. The quarter-turn changes real-form charts

The two positive Jordan charts use reflection embeddings \(F\) and \(-F\). Their overlap transition is

\[
JFJ^{-1}=-F.
\]

It is not an \(S_3\) Weyl permutation. It is the order-four chart change needed to cover the whole positive \(A_2\) loss cone. In this role the quarter-turn is neither a particle nor time evolution; it is an atlas transition.

### 4. The same motion can be a Goldstone direction

The selected real form is a director

\[
[n]\in\mathbb{RP}^2.
\]

For the isotropic selector potential

\[
V_0(n)=\frac\lambda4(n^2-v^2)^2,
\]

the vacuum Hessian has spectrum

\[
(0,0,2\lambda v^2).
\]

The two tangent directions are Goldstone modes of \(SO(3)\to SO(2)\). A path

\[
n(t)=(0,\cos t,\sin t),
\qquad 0\le t\le\frac\pi2,
\]

is exactly the wall-to-Furey quarter-turn. Depending on the physical realization, this tangent motion is a Goldstone, a pseudo-Goldstone, an eaten gauge direction, a boundary-condition change, or only a coordinate equivalence. The matrix alone does not choose among these modes.

### 5. The “fluffy cloud of fields” is a positive fluctuation cloud

The corpus already has a precise cloud layer. A positive covariance \(C\) describes an ellipse of Gaussian fluctuations; its determinant is fluctuation area and \(\log\det C\) is the entropy/volume term. For an exchange-real proper complex Gaussian doublet,

\[
C=pI+x\sigma_x+y\sigma_y,
\qquad p^2\ge x^2+y^2,
\]

Wick reduction of the two relationship currents gives

\[
M_J=2\det(C)I+4rr^T,
\qquad r=(x,y)^T.
\]

This map fills all of \(H_2(\mathbb R)_+\). It is therefore legitimate to picture this rung as a cloud of field amplitudes whose quadratic correlations produce the positive response geometry. But the Wick map forgets \(r\mapsto-r\) and is not a Jordan, inverse or Schur homomorphism. The cloud supplies admissible positive responses; it does not by itself supply their orientation or dynamics.

### 6. The quarter-turn sews an open field into coherent closure

For real time-domain fields, Fourier reality gives

\[
q(-\omega)=\overline{q(+\omega)}.
\]

A local interface using the real quarter-turn therefore appears in frequency space as the antiunitary sewing

\[
\Gamma=JK.
\]

Repeated edge transport obeys

\[
J^6=-I,
\qquad J^{12}=I.
\]

The placement path closes after six steps only projectively; the coherent field closes after twelve. This is the exact \(C_{12}\to C_6\to C_3\) hierarchy: each quotient closes earlier by forgetting a distinction retained by the level above it.

## Closure to open

“Closure” and “open” occur in three different senses and must remain typed:

| Sense | Closed | Open |
|---|---|---|
| algebraic | the transported generators close to \(\mathfrak{sp}_4\cong\mathfrak{so}(2,3)\) | the microscopic action sourcing all generators is not derived |
| holonomic | the coherent real field returns after twelve quarter-turn edges | a six-step traversal retains the central \(-I\) memory |
| boundary/topological | a reflected fold closes the space by identification | the boundaryless full wall restores the translational Goldstone removed by the fold |

The last row is especially revealing. Closing a geometry by quotient can remove a physical zero mode and can obstruct a covariant self-adjoint Weyl domain. Reopening to the full wall restores the translation mode and a healthy boundaryless domain. “Open” is therefore not simply incomplete; it can be the larger admissible carrier from which a quotient had discarded motion.

## The emerging grammar

The combined chain is

\[
\begin{array}{c}
\text{two real structures}\\
\downarrow\ AB
\\[-1mm]
J^2=-I\quad(\text{complex direction})\\
\downarrow\ \text{selector orbit}
\\[-1mm]
\text{Goldstone / gauge / boundary mode}\\
\downarrow\ \text{Gaussian field fluctuations}
\\[-1mm]
H_2(\mathbb R)_+\quad(\text{positive response cloud})\\
\downarrow\ \text{real-interface sewing}
\\[-1mm]
C_{12}\to C_6\to C_3\quad(\text{successive remembered quotients})\\
\downarrow\ \text{generator closure}
\\[-1mm]
\mathfrak{sp}_4\cong\mathfrak{so}(2,3).
\end{array}
\]

This does not prove that one microscopic field performs every arrow. It establishes something narrower and stronger: the corpus has independently reconstructed the same quarter-turn at the reality, chart, symmetry-breaking, Gaussian-response, interface-holonomy and Lie-closure levels.

## Physical frontier

The new question is no longer whether the pattern exists. It is where nature places the typing boundary.

1. Is the selector director a genuine global field, a gauged field, or only a boundary datum?
2. Does the Gaussian fluctuation root arise from a gauge- and Lorentz-complete microscopic state?
3. Does the real interface act on the same carrier as the selector and Wick-current construction?
4. Can a time-contour continuation be derived, rather than inferred from the presence of \(J^2=-I\)?
5. Does the full-wall translation mode intertwine with the selector orientation modes or merely coexist with them?

Until those identifications are supplied, the quarter-turn is a common admissibility operator, not yet a universal physical mechanism.

