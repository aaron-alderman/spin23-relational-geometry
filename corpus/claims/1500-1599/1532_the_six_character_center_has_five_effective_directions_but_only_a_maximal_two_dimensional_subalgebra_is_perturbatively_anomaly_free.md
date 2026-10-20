# The Six-Character Center Has Five Effective Directions, but Only a Maximal Two-Dimensional Subalgebra Is Perturbatively Anomaly-Free

**Date:** 20 October 2026

**Gates:** A2, A5 and A6

**Status:** exact gauge-kernel, unimodularity and abelian anomaly audit on the declared unit-multiplicity 12-state chiral label spectrum; physical Pati--Salam multiplicities remain absent

**Depends on:** [the explicit six-character ordinary completion](1529_the_six_character_completion_is_an_exact_real_even_label_geometry_but_not_a_physical_pati_salam_completion.md) and [the graded-chain physical-lift obstruction](1526_the_graded_spectator_chain_has_no_sourced_pati_salam_bimodule_lift_and_an_ordinary_completion_requires_six_characters.md)

**Evidence:** [gauge and anomaly ledger](../../../evidence/data/spin23-six-character-gauge-kernel-unimodularity-anomalies.json) and [deterministic verifier](../../../verification/verify/verify_spin23_six_character_gauge_kernel_unimodularity_anomalies.mjs)

## Result

The ordinary six-character label geometry is not automatically a consistent
gauge theory.

For

\[
A_F=\mathbb C_P\oplus\mathbb C_I\oplus\mathbb C_N
\oplus\mathbb C_S\oplus\mathbb C_T\oplus\mathbb C_U,
\]

a central infinitesimal phase \(\theta=(\theta_P,\ldots,\theta_U)\) acts on
the bimodule state \(e_{ab}\) with charge

\[
q_{ab}(\theta)=\theta_a-\theta_b.
\]

The character support graph is connected. Hence the charge-incidence matrix
has rank five and its only continuous kernel is the common diagonal:

\[
\boxed{
\mathfrak u(1)^6/\mathfrak u(1)_{\rm diag}
\cong\mathfrak u(1)^5.}
\]

Unimodularity of the declared left representation chooses one representative
of each quotient class; it does not remove another effective direction. The
complete \(U(1)^5\) has nonzero mixed-gravitational and cubic abelian anomaly
tensors.

There is nevertheless a nontrivial exact survivor. A maximal simultaneous
anomaly-free linear subalgebra has dimension two. One unimodular basis is

\[
w_1=(0,1,0,0,-1,0),
\qquad
w_2=(-1,-1,1,1,1,1)
\]

in the order \((P,I,N,S,T,U)\). On their span, the last three left-handed
charges are the negatives of the first three. Therefore every pure and mixed
cubic component, and the gravitational trace, vanishes.

Thus the bounded decision is

\[
\boxed{
\text{finite label geometry: consistent};\qquad
U(1)^5\text{ gauging: anomalous};\qquad
U(1)^2\text{ subgauging: anomaly-free}.}
\]

This does not promote the construction to a physical Pati--Salam theory. The
calculation uses unit label multiplicities and no colour, weak, generation or
family tensor factors.

## 1. Central charge matrix and kernel

The twelve charge rows are

\[
\begin{array}{c|rrrrrr}
 &P&I&N&S&T&U\\ \hline
PN& 1&0&-1&0&0&0\\
NP&-1&0& 1&0&0&0\\
IN&0& 1&-1&0&0&0\\
NI&0&-1& 1&0&0&0\\
IP&-1&1&0&0&0&0\\
PI& 1&-1&0&0&0&0\\
PS&1&0&0&-1&0&0\\
SP&-1&0&0&1&0&0\\
TP&-1&0&0&0&1&0\\
PT&1&0&0&0&-1&0\\
TU&0&0&0&0&1&-1\\
UT&0&0&0&0&-1&1
\end{array}
\]

Every row annihilates \({\bf1}=(1,1,1,1,1,1)\). Conversely, equality of
phases along every edge of the connected character graph forces all six
phases equal. Therefore

\[
\ker Q=\mathbb R{\bf1},
\qquad
\operatorname{rank}Q=5.
\]

This is the continuous gauge kernel. Possible finite quotients depend on the
global unitary lift and are not fixed by the infinitesimal audit.

## 2. What unimodularity does here

In the declared twelve-state left representation, the six characters occur
with multiplicities

\[
n=(4,2,2,1,2,1).
\]

The ordinary finite-triple condition \(\operatorname{Tr}_{H_F}\pi(\theta)=0\)
is

\[
\boxed{4\theta_P+2\theta_I+2\theta_N+\theta_S
+2\theta_T+\theta_U=0.}
\]

But \(n\cdot{\bf1}=12\ne0\). Each effective charge class
\([\theta]\in\mathbb R^6/\mathbb R{\bf1}\) therefore has one and only one
representative on this hyperplane. Unimodularity fixes the redundant
diagonal phase rather than reducing \(\mathfrak u(1)^5\) to
\(\mathfrak u(1)^4\).

There is a second trace that must not be confused with this one. The lifted
gauge charge is \(Q=\pi(\theta)-\pi^o(\theta)\). Its trace over all twelve
states vanishes automatically because \(e_{ab}\) is paired with \(e_{ba}\).
Imposing \(\operatorname{Tr}Q=0\) would be vacuous.

## 3. Chiral anomaly convention

Choose the six \(\gamma=+1\) representatives

\[
PN,\quad NI,\quad IP,\quad SP,\quad PT,\quad TU.
\]

Their charge vectors are

\[
\begin{split}
v_1&=P-N,&v_2&=N-I,&v_3&=I-P,\\
v_4&=S-P,&v_5&=P-T,&v_6&=T-U.
\end{split}
\]

This is the declared six-state chiral normalization. Equivalently, one may trace
\(\gamma Q\) and \(\gamma Q^3\) on all twelve states; because \(J\) reverses
both chirality and charge, those traces are twice the six-state values and
have the same zero locus.

There are no nonabelian gauge factors in the bare \(\mathbb C^6\) label
algebra. The perturbative tensors to test are therefore the mixed
gravitational covector and the complete symmetric abelian cubic tensor,
including all mixed \(U(1)_aU(1)_bU(1)_c\) components.

## 4. Mixed gravitational anomaly

Summing the six charge rows gives

\[
G=(0,0,0,1,0,-1),
\]

so a direction \(\theta\) has

\[
\boxed{\mathcal A_{\rm grav}(\theta)=\theta_S-\theta_U.}
\]

The complete five-dimensional quotient is therefore already anomalous at
linear order. Unimodularity does not imply \(\theta_S=\theta_U\).

## 5. Cubic and mixed abelian tensor

Define

\[
T_{abc}=\sum_{r=1}^{6}v_{r,a}v_{r,b}v_{r,c}.
\]

Its nonzero components, listed for sorted indices and extended by symmetry,
are

\[
\begin{array}{c|rrrrrrrrrrrrrr}
abc&PPI&PPN&PPS&PPT&PII&PNN&PSS&PTT&IIN&INN&SSS&TTU&TUU&UUU\\ \hline
T_{abc}&1&-1&1&-1&-1&1&-1&1&1&-1&1&-1&1&-1.
\end{array}
\]

Equivalently, the anomaly polynomial on one central direction is

\[
\boxed{
\mathcal A_3(\theta)=
(P-N)^3+(N-I)^3+(I-P)^3
+(S-P)^3+(P-T)^3+(T-U)^3.}
\]

The tensor is visibly nonzero, so the full \(U(1)^5\) cannot be gauged with
this chiral spectrum.

## 6. Exact anomaly-free two-plane

Impose, modulo the diagonal kernel,

\[
\theta_S=\theta_U=\theta_N,
\qquad
\theta_T=\theta_P+\theta_N-\theta_I.
\]

Then

\[
(v_4,v_5,v_6)=-(v_1,v_2,v_3)
\]

as linear forms on the remaining two-dimensional quotient. All odd anomaly
tensors cancel pairwise. In particular,

\[
G|_W=0,
\qquad
T|_{W\times W\times W}=0.
\]

The displayed \(w_1,w_2\) are independent representatives satisfying the
unimodularity trace condition. Hence this is a genuine simultaneous
\(U(1)^2\), not merely two separately anomaly-free rays with a mixed anomaly
between them.

## 7. Why dimension two is maximal

After imposing \(S=U\) and fixing the diagonal quotient by \(P=0\), use
coordinates \((I,N,T,S)\). The cubic becomes

\[
\frac13\mathcal A_3
=F(I,N,T,S)
=NI(I-N)+TS(S-T).
\]

Its gradient is

\[
\nabla F=
\bigl(N(2I-N),\ I(I-2N),\ S(S-2T),\ T(2S-T)\bigr).
\]

The first pair can vanish only at \(I=N=0\): if both are nonzero it would
require \(N=2I\) and \(I=2N\), hence \(3I=0\). The same argument applies to
\((T,S)\). Thus the projective cubic surface \(F=0\) in \(\mathbb P^3\) is
smooth.

A three-dimensional vector subspace on which the full cubic tensor vanished
would project to a plane contained in this cubic surface. Its defining linear
form would then divide \(F\), contradicting smoothness. Therefore no
simultaneous anomaly-free linear subalgebra has effective dimension three.
The exhibited dimension-two subspace is maximal.

There are other isolated anomaly-free \(U(1)\) rays on \(F=0\). They do not
enlarge this maximal simultaneous linear gauge algebra.

### Added-character directions by themselves

The question has a sharper answer on the purely added \((S,T,U)\) slice,
where \(P=I=N=0\). The gravitational condition gives \(S=U\), and then

\[
\mathcal A_3=3TS(S-T).
\]

Consequently there are exactly three anomaly-free projective rays in this
slice, represented by

\[
(S,T,U)=(0,1,0),\qquad(1,0,1),\qquad(1,1,1).
\]

Thus nontrivial added-only \(U(1)\) directions do exist. No two of these
distinct rays span an anomaly-free plane: their mixed cubic components are
nonzero. The maximum added-only linear subalgebra is one-dimensional, even
though mixed old/new charge combinations support the two-dimensional plane
found above.

## 8. Physical interpretation and repair

This audit sharpens rather than repairs claim 1529. The six-character object
remains a consistent finite label geometry, but gauging every central label
phase produces an anomalous abelian theory.

The smallest internal repair is to gauge only an anomaly-free subalgebra,
for example the displayed \(U(1)^2\), and treat the remaining label phases as
global bookkeeping or absent. Other repairs require genuinely new data:

1. add chiral bimodule multiplicities whose linear and cubic anomaly tensors
   cancel the residual tensors;
2. provide a physical central extension selecting different gauged
   combinations; or
3. embed the labels into a correspondence with specified colour, weak and
   family multiplicities and recompute every trace.

The last option is not a detail. Tensoring a label state with a physical
multiplet weights its anomaly contribution by that multiplicity and may add
nonabelian mixed anomalies. Nothing in the present \(C^6\) ledger fixes those
weights.

## Boundaries

**Spectrum boundary:** every result uses exactly the twelve recorded simple
bimodule states with unit multiplicity.

**Gauge boundary:** the calculation concerns the central abelian lift of
\(C^6\). It does not certify a Pati--Salam or Standard-Model gauge group.

**Unimodularity boundary:** the full-left-representation convention is
explicit. A physical particle-subspace convention needs a physical lift;
on the present paired incidence graph it likewise chooses a diagonal-kernel
representative rather than cancelling the anomaly tensors.

**Global-anomaly boundary:** only perturbative cubic and mixed-gravitational
abelian anomalies are tested. Global form, charge lattice and discrete
quotients remain unspecified.

## Verdict

\[
\boxed{
\begin{array}{rcl}
\ker Q&=&\mathfrak u(1)_{\rm diag},\\
\mathfrak g_{\rm eff}&=&\mathfrak u(1)^5,\\
\mathfrak g_{\rm eff}\text{ fully gauged}&=&\mathrm{ANOMALOUS},\\
\dim\mathfrak g_{\rm anomaly\mbox{-}free}^{\rm max}&=&2.
\end{array}}
\]

Finite-label consistency and perturbative gauge consistency are different
gates. The six-character completion passes the first and fails the second if
all effective central directions are gauged. Its exact anomaly-free
\(U(1)^2\) is a viable label-level subgauging, not yet a sourced physical
gauge theory.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_six_character_gauge_kernel_unimodularity_anomalies.mjs
node verification/verify/verify_spin23_six_character_ordinary_correspondence_completion.mjs
~~~
