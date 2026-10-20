# Two E6 Singlet VEVs Isolate One Chiral 16, but the Exotic-Mass Field Reintroduces a Second Dirac Portal

**Date:** 20 October 2026

**Gates:** A2, A5 and A6

**Status:** exact reduced E6 mass-rank and post-breaking support construction; positive chiral-index result, negative automatic one-invariant portal result

**Depends on:** [the chiral E6 carrier audit](1560_the_chiral_E6_27_is_a_third_carrier_branch_but_its_cubic_does_not_close_reality_grading_or_the_portal_Ward_line.md), [the ordinary-real E6 audit](1561_the_ordinary_real_E6_carrier_repairs_J_and_shares_a_parent_yukawa_ray_but_cannot_isolate_the_oriented_family_or_portal_line.md), [the four-route synthesis](1563_E6_reopens_the_27_and_54_carriers_but_one_parent_invariant_still_does_not_make_a_physical_portal_Ward_line.md), and [the parallel-source theorem](1557_the_minimal_Ward_completion_is_a_parallel_master_source_bundle_but_no_sourced_typed_intertwiner_realizes_it.md)

**Primary sources:** [the renormalizable E6 27/351-prime model](https://arxiv.org/abs/1311.0775), [E6 vectorlike masses from the 27 cubic](https://arxiv.org/abs/1604.08328), and [the E6 relation between Spin(10) 10 and 126 Yukawa branches](https://arxiv.org/abs/2212.11315)

**Evidence:** [mass-rank and portal ledger](../../../evidence/data/spin23-e6-27-singlet-mass-rank-portal-audit.json) and [deterministic verifier](../../../verification/verify/verify_spin23_e6_27_singlet_mass_rank_portal_audit.mjs)

## Result

The first requested E6 mass-rank calculation is positive.  In the charge
convention

\[
27_F=16_1\oplus10_{-2}\oplus1_4,
\]

Let \(\mathcal S_{351}\) denote the symmetric E6 Yukawa representation
that contracts two matter 27s.  It is \(\overline{351'}\) in the
upper-index-27 convention of the cited renormalizable model (and is often
called \(351'\) after reversing all conjugation conventions).  Take the two
Spin(10)-singlet scalar directions

\[
s\in1_4\subset27_H,
\qquad
t\in1_{-8}\subset\mathcal S_{351,H}.
\]

The invariant branch products

\[
10_{-2}\,10_{-2}\,1_4,
\qquad
1_4\,1_4\,1_{-8}
\]

give the high-scale fermion mass operator

\[
M_{E_6\to Spin(10)}=
0_{16}\oplus m_{10}I_{10}\oplus m_1,
\qquad
m_{10}=c_sY_{27}s,
\qquad
m_1=c_tY_{\mathcal S}t.
\]

For nonzero \(m_{10}m_1\),

\[
\operatorname{rank}M=11,
\qquad
\dim\ker M=16.
\]

Exactly one chiral Spin(10) family survives while all eleven exotic states
are heavy.  Moreover the surviving support is canonical after the breaking
direction has been chosen.  If \(Q_\psi\) has eigenvalues \(1,-2,4\) on
\(16,10,1\), then

\[
P_{16}=-\frac{(Q_\psi+2)(Q_\psi-4)}9
\]

is an idempotent of rank 16, equals the kernel projector of \(M\), and
commutes with the unbroken Spin(10) action.  This closes the first two tests
proposed in claim 1563 at the reduced representation level:

\[
\boxed{
\text{full exotic rank}=11,
\qquad
\text{surviving chiral index}=16,
\qquad
\text{post-breaking support projector}=P_{16}.}
\]

The construction does not close the portal problem.  The same \(27_H\)
whose singlet \(s\) is needed for the exotic-ten mass also contains
\(10_H\), and the same invariant coefficient \(Y_{27}\) permits

\[
16_F16_F10_H\subset27_F27_F27_H.
\]

The \(\mathcal S_{351,H}\) supplies a second symmetric invariant coefficient
\(Y_{\mathcal S}\) and contains its own \(10_H\) Dirac projection together with
the \(\overline{126}_H\) Majorana projection.  Below E6 breaking, the most
general one-family portal pair is therefore

\[
\begin{aligned}
g_D={}&Y_{27}c_D^{27}v_D^{27}Z_D^{27}
      +Y_{\mathcal S}c_D^{351}v_D^{351}Z_D^{351},\\
g_M={}&Y_{\mathcal S}c_M^{351}v_M^{351}Z_M^{351}.
\end{aligned}
\]

Thus the field that solves the exotic rank problem generically restores an
independent transverse Dirac direction.  Retaining the one-invariant E6
near miss requires the additional inert-alignment condition

\[
v_D^{27}=0
\]

or a symmetry that removes the corresponding light doublet/Yukawa
projection.  E6 representation theory alone does not impose that condition.

Even after it is imposed, the surviving ratio

\[
\frac{g_D}{g_M}
=\frac{c_D^{351}v_D^{351}Z_D^{351}}
       {c_M^{351}v_M^{351}Z_M^{351}}
\]

is not fixed or threshold-parallel without an additional vacuum and Ward
law.  The exact branch decision is therefore

\[
\boxed{
\begin{array}{rcl}
\text{rank-11 exotic lift}&=&\mathrm{SAT},\\
\text{canonical post-breaking }P_{16}&=&\mathrm{SAT},\\
\text{one light chiral 16}&=&\mathrm{SAT},\\
\text{single portal invariant in the generic minimal field set}&=&\mathrm{NO},\\
\text{normalized RG/threshold-parallel portal line}&=&\mathrm{NOT\ DERIVED}.
\end{array}}
\]

## 1. Why the two singlets are minimal in this branch

The exotic \(10_F\) is a real Spin(10) representation but carries
\(U(1)_\psi\) charge \(-2\).  A Spin(10)-preserving bilinear mass therefore
needs charge \(+4\), supplied by the singlet in \(27_H\).  The fermionic
singlet has charge \(+4\), so its Majorana bilinear needs charge \(-8\),
supplied by the singlet direction in \(\mathcal S_{351,H}\).

One nonzero VEV cannot perform both jobs because the two bilinears have
different \(U(1)_\psi\) charges.  With both VEVs nonzero, every state in the
Spin(10) 10 receives the common representation-level mass \(m_{10}\), and
the remaining singlet receives \(m_1\).  No component of the 16 has an
allowed Spin(10)-singlet mass partner in this chiral matter spectrum.

This is a representation-level theorem.  Clebsch normalizations are absorbed
in nonzero \(c_s,c_t\); they cannot change the ranks.

## 2. The projector is derived only after symmetry breaking

At unbroken E6, claim 1561 correctly found no equivariant rank-16 projector:
the 27 is irreducible.  The singlet VEVs select the subgroup direction and
make \(Q_\psi\) a distinguished broken generator.  Its three eigenvalues
then separate the Spin(10) isotypic components.

Lagrange interpolation gives

\[
P_{16}(q)=\frac{(q+2)(q-4)}{(1+2)(1-4)}.
\]

It evaluates to one at \(q=1\) and zero at \(q=-2,4\).  Hence

\[
P_{16}^2=P_{16},
\qquad
\operatorname{tr}P_{16}=16,
\qquad
MP_{16}=P_{16}M=0.
\]

The earlier no-projector statement and this positive result are therefore
compatible: the selector is not E6-equivariant, but it is canonical relative
to the chosen \(E_6\to Spin(10)\times U(1)_\psi\) breaking direction and
the gapped exotic mass operator.

This does not yet identify the internal H16 relation labels with individual
physical family components.  It derives the sixteen-dimensional support,
not the seven-edge oriented mask inside it.

## 3. A stable reduced vacuum exists

At the two-singlet level, nonzero values are not algebraically inconsistent.
For example,

\[
V_{\rm red}
=\lambda_s(|s|^2-v_s^2)^2
+\lambda_t(|t|^2-v_t^2)^2
+\kappa(|s|^2-v_s^2)(|t|^2-v_t^2)
\]

has a stable minimum at \((|s|^2,|t|^2)=(v_s^2,v_t^2)\) whenever

\[
\lambda_s>0,
\qquad
\lambda_t>0,
\qquad
4\lambda_s\lambda_t>\kappa^2.
\]

This proves a nonempty open reduced parameter region with the required
rank.  It does not prove that the complete renormalizable E6 potential has
no competing non-singlet instability or that this is its global vacuum.
Those are deliberately retained as physical admission tests.

## 4. Why exotic rank and portal uniqueness pull in opposite directions

The singlet and bidoublet components of \(27_H\) belong to one irreducible
E6 multiplet.  Introducing the former to lift \(10_F\) necessarily admits
the latter at the representation level.  Its Yukawa coefficient \(Y_{27}\)
is independent of \(Y_{\mathcal S}\).

This does not force the \(27_H\) bidoublet to acquire an electroweak VEV.
It does mean that setting its contribution to zero is a scalar-doublet
alignment problem, not a consequence of the exotic mass rank.  Scalar
mixing after E6 breaking can also rotate the light Higgs into both parent
multiplets.

The exact next subtest is therefore finite: build the bidoublet mass matrix
from the complete scalar potential and determine whether a symmetry-protected
light eigenvector has zero \(27_H\) component.  If not, the portal source
space is at least two-dimensional before loop corrections.

## 5. Ward and threshold boundary

Suppose the inert condition succeeds and the light Dirac doublet lies purely
in \(\mathcal S_{351,H}\).  The one parent coefficient still descends through distinct
branches.  Define

\[
R(\mu)=\frac{c_Dv_DZ_D}{c_Mv_MZ_M}.
\]

Then

\[
\frac{d\log R}{d\log\mu}
=\gamma_{v_D}+\gamma_{Z_D}-\gamma_{v_M}-\gamma_{Z_M},
\]

with analogous finite jumps at every threshold.  The Dirac bidoublet and
Majorana triplet have different Pati--Salam quantum numbers, so no unbroken
subgroup identity makes the right-hand side vanish generically.  This is
the claim-1557 parallel-source condition in the explicit E6 branch.

Thus the construction reaches the Ward gate rather than bypassing it.

## 6. Consequence for the four carrier routes

The chiral 27 route now has a concrete advantage over a bare state-count
proposal: it admits a rank-11 exotic mass and a canonical post-breaking
family projector.  The 54 route inherits the same block construction on
both J-related sheets.  If its conjugate sheet is kinematic, the projectors
are exchanged by J; if it is independent Weyl matter, the earlier
vectorlike-decoupling problem remains.

The 16 and 32 routes avoid the 10+1 exotic rank problem but do not receive
the E6 parent-invariant correlation.  None of the four routes yet derives
the oriented seven-edge mask or the normalized portal line.

## Spin(2,3) status

This calculation identifies a precise place where Spin(2,3) could become
decisive.  The E6 vacuum supplies the coarse support projector \(P_{16}\).
A Spin(2,3)-compatible relation structure would then have to refine that
projector into the H16 grading and oriented edge mask, protect the inert
\(27_H\) bidoublet alignment, and make the surviving \(\mathcal S_{351,H}\) source line
parallel.  None of those refinements follows from the present data.

## Verdict

The first explicit E6 rank test succeeds: two singlet VEVs lift exactly the
extra \(10+1\) and canonically expose one chiral 16.  This is the strongest
constructive result yet for the 27 route.

The same minimal mechanism exposes the next obstruction.  Lifting the
exotic 10 requires a \(27_H\), whose independent Yukawa invariant supplies
a second allowed Dirac portal.  A successful E6 completion must therefore
derive an inert-doublet alignment and then still pass the normalized
RG/threshold parallelism test.  The programme has moved from an unspecified
mass-rank question to one finite scalar-doublet alignment and source-bundle
calculation.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_e6_27_singlet_mass_rank_portal_audit.mjs
~~~
