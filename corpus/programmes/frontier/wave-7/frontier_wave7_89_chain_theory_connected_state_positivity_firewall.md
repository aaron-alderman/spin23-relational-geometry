# Frontier Wave 7.89: The Connected-State Positivity Firewall

**Date:** 25 October 2026
**Status:** exact state-space interpretation and positivity no-go
**Certificate:** [connected-state positivity verifier](../../../../verification/verify/verify_chain_theory_connected_state_positivity_firewall.mjs)

## Result

The 24-dimensional factor in the Chain denominator has a precise physical
interpretation, but it is not an autonomous state space.  For a normalized
qutrit--qubit density operator, fixing both endpoint marginals to be maximally
mixed leaves an affine family

\[
\boxed{
\rho=\frac{I_6}{6}+C,
\qquad
\operatorname{Tr}_{2}C=0,
\qquad
\operatorname{Tr}_{3}C=0,
\qquad
\rho\succeq0.
}
\]

The translation space for \(C\) is

\[
\mathfrak{su}(2)_{\rm Herm}
\otimes
\mathfrak{su}(3)_{\rm Herm},
\]

with real dimension \(3\cdot8=24\).  Positivity carves a bounded convex body
out of this affine 24-plane.  This is the first exact realization of the
earlier “filled and unfilled admissibility zone” language inside the Chain
bridge.

## 1. Why the affine dimension is 24

The normalized state space on \(\mathbb C^2\otimes\mathbb C^3\) has affine
dimension

\[
6^2-1=35.
\]

Fixing the qubit marginal imposes three independent traceless constraints;
fixing the qutrit marginal imposes eight.  Therefore

\[
35-3-8=24.
\]

Equivalently, the endomorphism decomposition from wave 7.86 leaves precisely
the \((\mathbf3,\mathbf8)\) connected component once the scalar and both local
Bloch components have been fixed.

This makes “unread” operationally sharper:

\[
\boxed{
\text{local endpoint records erased or fixed;
relational correlations retained.}
}
\]

It does not mean that the third link has no physical state.

## 2. The positivity no-go

Every connected operator \(C\) has trace zero.  If \(C\succeq0\), then all
its eigenvalues are nonnegative and sum to zero, so

\[
C=0.
\]

Therefore the 24-dimensional connected linear space contains no nonzero
positive state.  Positivity belongs to the affine completion

\[
I_6/6+C,
\]

not to \(C\) alone.

This closes two tempting shortcuts:

1. the unread factor cannot be called a 24-dimensional density-matrix cone;
2. no trace-preserving completely positive channel can output normalized
   states whose entire operator range lies in the connected linear sector.

## 3. Double-centering is not a physical channel

The Hilbert--Schmidt projector onto connected correlations is

\[
\mathcal P_{\rm conn}(X)
=X
-\frac{I_2}{2}\otimes\operatorname{Tr}_2X
-\operatorname{Tr}_3X\otimes\frac{I_3}{3}
+\frac{\operatorname{Tr}X}{6}I_6.
\]

For a product pure state it returns the tensor product of the two centered
local projectors.  Its spectrum contains negative eigenvalues.  Even the
naive affine repair

\[
X\longmapsto I_6/6+\mathcal P_{\rm conn}(X)
\]

is not positive on all states; the certificate gives an explicit product
counterexample with minimum eigenvalue \(-1/6\).

Thus “discard the marginals but keep every correlation unchanged” is not a
universal quantum channel.  The unread preparation must instead be restricted
to an already admissible fixed-marginal state family, or must add enough noise
to preserve positivity.

## 4. A visible admissibility boundary

Choose one connected direction

\[
C(t)=t\,\sigma_z\otimes\lambda_3,
\]

where both factors have eigenvalues \((1,-1)\), with the qutrit generator
having an additional zero eigenvalue.  Then

\[
\rho(t)=I_6/6+C(t)\succeq0
\quad\Longleftrightarrow\quad
-\frac16\le t\le\frac16.
\]

At either endpoint two eigenvalues reach zero.  Inside the interval the state
is admissible; outside it the same algebraic correlation coordinates are
unphysical.  In a general direction \(C\), the boundary is set by its extreme
eigenvalues.

This gives the Chain programme an actual geometry of known versus forbidden
states rather than only a dimension count.

## 5. What the Steinitz/Fock construction changes

Wave 7.88 imported a rigorous example in which the vacuum is the common range
of compatible finite tests.  The present no-go shows that this logic cannot be
copied by projecting density operators linearly onto the connected subspace.

The correct analogue is a constraint protocol:

1. test or prepare fixed endpoint marginals;
2. retain the joint state only when it lies in the positive affine fiber;
3. regard the 24 numbers as correlation coordinates inside that fiber;
4. define which coarse measurements make those correlations operationally
   unread, latent or recoverable.

In other words, admissibility selects a convex state body, not merely a vector
subspace.

## 6. Consequence for the denominator

The factorization

\[
31104=36\times36\times24
\]

now has a more defensible reading:

- each read link exposes a full 36-dimensional Hermitian operator frame;
- the unread link is coordinated within a 24-dimensional fixed-marginal
  affine fiber;
- physical preparations occupy only the positive part of that fiber.

The number 24 counts independent correlation coordinates.  It does not count
24 mutually exclusive states and does not by itself prescribe a uniform trace
measure.  The target normalization must still justify how this affine
coordinate dimension enters the response denominator.

## 7. Next experimental gate

Prepare qutrit--qubit states with controlled maximally mixed marginals and
scan selected connected directions.  For each direction:

1. locate the positivity endpoints by eigenvalue tomography;
2. compare the boundary with complete-positivity bounds of the preparation
   channel;
3. implement the two read instruments and estimate which record sectors
   survive exchange;
4. test whether qutrit order phase remains accessible when local marginals are
   erased;
5. compare sign-only and phase-complete record kernels without fitting
   \(\alpha\).

This is a finite quantum-information experiment.  A positive result would
derive the configuration and record gates, not yet the photon identification.

## Verdict

The 24-dimensional factor is real and canonical, but it is affine rather than
conical:

\[
\boxed{
24
=\dim\{\rho:\rho_2=I_2/2,\ \rho_3=I_3/3\},
\quad
\rho\ge0\text{ supplies the boundary.}
}
\]

This both strengthens and constrains the Chain bridge.  The denominator has a
natural correlation-coordinate meaning, while positivity forbids treating
the unread sector as a standalone state or as the output of naive
double-centering.

## Corpus anchors

- [rectangular endomorphism bridge](frontier_wave7_86_chain_theory_rectangular_endomorphism_bridge.md)
- [zeta--sphaleron bridge audit](frontier_wave7_88_zeta_sphaleron_alpha_bridge_audit.md)
- [positive but not completely positive selector](../../../claims/0600-0699/686_the_real_slice_selector_is_positive_but_not_a_completely_positive_quantum_channel.md)
- [Chain inverse reconstruction](frontier_wave7_82_chain_theory_two_by_three_inverse_reconstruction.md)
