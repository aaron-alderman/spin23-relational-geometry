# Cyclic tile composition: one real channel and one complex relational channel

**Date:** 24 October 2026  
**Status:** exact local composition calculus; cross-carrier physical gluing remains open  
**Parent:** [A2 operator sweep](admissibility_10_a2_operator_sweep_and_frontier.md)  
**Evidence:** [Composition ledger](../../../evidence/data/admissibility-cyclic-tile-composition-v1.json)  
**Verifier:** [Cyclic tile composition certificate](../../../verification/admissibility/verify_cyclic_tile_composition.mjs)

## Result

The distributed three-state tile is not only a recurring normal form. It is a closed compositional algebra. Write

\[
M(a,b,c)=aI+bC+cK,
\]

with

\[
C=3I-J,
\qquad
K=T-T^T.
\]

The generators satisfy

\[
C^2=3C,
\qquad
K^2=-C,
\qquad
CK=KC=3K.
\]

Consequently the product of any two tiles is another tile:

\[
M(a,b,c)M(a',b',c')=M(a'',b'',c''),
\]

where

\[
a''=aa',
\]

\[
b''=ab'+ba'+3bb'-cc',
\]

\[
c''=ac'+ca'+3bc'+3cb'.
\]

This gives an exact local rule for composing compatible mini-systems once their labels and orientations have been aligned.

## Spectral coordinates

The algebra diagonalizes conceptually without choosing a complex basis. Define

\[
r=a,
\qquad
z=a+3b+i\sqrt3,c.
\]

Then

\[
\boxed{
M(a,b,c)\longleftrightarrow(r,z)\in\mathbb R\oplus\mathbb C
}
\]

and composition becomes

\[
(r,z)(r',z')=(rr',zz').
\]

The common singlet carries the real eigenvalue \(r\). The oriented \(A_2\) plane carries the conjugate eigenvalue pair

\[
z,\bar z
=a+3b\pm i\sqrt3,c.
\]

Therefore

\[
\det M=a\big((a+3b)^2+3c^2\big).
\]

A tile is invertible precisely when

\[
a\ne0
\quad\text{and}\quad
(a+3b,c)\ne(0,0).
\]

Transpose acts as relational complex conjugation:

\[
M(a,b,c)^T=M(a,b,-c)
\quad\longleftrightarrow\quad
(r,\bar z).
\]

Thus reversal does not alter the common channel or the even relational scale. It reverses only relational phase.

## Positivity and passivity

For every real vector \(x\),

\[
x^TKx=0.
\]

The quadratic form therefore depends only on the symmetric part

\[
\frac{M+M^T}{2}=aI+bC.
\]

It is positive semidefinite exactly when

\[
a\ge0,
\qquad
a+3b\ge0.
\]

The orientation coefficient \(c\) is invisible to instantaneous quadratic dissipation. It can nevertheless appear in phase-sensitive, nonreciprocal or circulation-sensitive records. This is the same boundary found in the finite Casimir experiment: even data determine \(C\), while orientation requires an odd observable.

## Dynamics

For a constant generator \(M(a,b,c)\), the evolution operator remains inside the tile algebra. In spectral coordinates,

\[
e^{tM}longleftrightarrow
\left(e^{ta},e^{t(a+3b+i\sqrt3c)}\right).
\]

Hence the relational plane has:

- growth or attenuation rate \(a+3b\);
- angular circulation rate \(\sqrt3c\);
- accumulated relational phase \(\sqrt3ct\).

This gives the earlier dynamic map a precise local realization. Amplitude modulation changes the magnitude of the relational complex channel; phase or frequency modulation changes its argument; lag is encoded by the frequency-dependent phase of \(z(\omega)\); resonance occurs when a transfer denominator approaches zero in either the singlet or relational channel.

For a frequency-dependent tile

\[
M(\omega)=a(\omega)I+b(\omega)C+c(\omega)K,
\]

the two reduced transfer functions are

\[
r(\omega)=a(\omega),
\qquad
z(\omega)=a(\omega)+3b(\omega)+i\sqrt3c(\omega).
\]

This reduces a three-channel cyclic response to one common-mode response plus one complex relational response without discarding orientation.

## What is—and is not—captured

The tile calculus naturally describes:

- a common mode and relational doublet;
- even separation and odd circulation;
- phase accumulation and reversal;
- linear gain, attenuation and resonance;
- repeated composition of aligned cyclic subsystems;
- and detector designs comparing \(c\) with \(-c\).

It does not by itself describe hysteresis or metastability. Those require coefficients depending on internal state, multiple stable branches, memory kernels or nonlinear evolution. Nor does the calculus align two independently labelled tiles. A permutation changes the basepoint convention; a reflection conjugates \(z\). The physical gluing map must declare which operation occurs.

## The gluing obstruction in its smallest form

Suppose two mini-systems carry tile coordinates \((r_1,z_1)\) and \((r_2,z_2)\). If their orientation and labels are faithfully aligned, composition gives

\[
(r_2r_1,z_2z_1).
\]

If their relative orientation is unknown, the second factor may instead be \(\bar z_2\). Even when all even observables agree, the two composites

\[
z_2z_1
\qquad\text{and}\qquad
\bar z_2z_1
\]

need not agree. This is the minimal mathematical form of the corpus's orientation and label torsors: the local matrices are known, but the transition function is not.

## Consequence for the larger atlas

The distributed matrix should be assembled from local blocks carrying at least

\[
(r,z;\text{units},\text{regime},\text{labels},\text{orientation},\text{provenance}).
\]

Numerical matrix multiplication is admissible only after the nonnumeric typing agrees. Sourcery's existing signature, assumption and loss checks are therefore not administrative decoration; they are the conditions under which the local \(\mathbb R\oplus\mathbb C\) composition has physical meaning.

## Next gate

Build the typed tile atlas as a graph. Each node should record its \((r,z)\) law and physical signature. Each edge should record an actual intertwiner, its label permutation, whether it preserves or conjugates orientation, its units and regime changes, and every irreversible loss. The first global closure calculation should use only edges that pass those gates.

