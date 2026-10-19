# Left–Right Symmetry Is the Minimal Gauge Envelope of the Furey Handle Exchange, but Equal Area Requires an Invariant Response Phase

## Claim

The handle exchange

\[
u\leftrightarrow d,\qquad \nu\leftrightarrow e,
\]

is only half-realized by the Standard Model gauge representation: it acts within the two left-handed \(SU(2)_L\) doublets, but the corresponding right-handed fields are inequivalent hypercharge singlets. The minimal gauge enlargement that completes the exchange is

\[
SU(3)_c\times SU(2)_L\times SU(2)_R\times U(1)_{B-L},
\]

with a right-handed neutrino. A simultaneous Weyl reflection in \(SU(2)_L\) and \(SU(2)_R\) then exchanges the sewn handles \(C=(u,e)\) and \(D=(d,\nu)\).

This makes left–right restoration a credible source for the equal-area selector. It does not yet prove equal areas in the broken low-energy phase: the Higgs background, Yukawa response and sources must also be invariant under the exchange.

## 1. Standard Model representation ledger

For one generation,

\[
Q_L=(u_L,d_L)\sim(\mathbf3,\mathbf2)_{1/6},
\qquad
L_L=(\nu_L,e_L)\sim(\mathbf1,\mathbf2)_{-1/2}.
\]

The nontrivial Weyl element of \(SU(2)_L\) exchanges each pair, up to the conventional sign required by determinant one. Thus the left half of the desired channel flip is already a gauge transformation.

On the right,

\[
u_R\sim(\mathbf3,\mathbf1)_{2/3},\quad
d_R\sim(\mathbf3,\mathbf1)_{-1/3},
\]

and, in the neutrino-completed theory,

\[
\nu_R\sim(\mathbf1,\mathbf1)_0,
\quad
e_R\sim(\mathbf1,\mathbf1)_{-1}.
\]

Each proposed pair has different hypercharge. No Standard Model gauge generator connects it. The obstruction in document 767 is therefore chiral and exact, not merely a consequence of unequal measured masses.

## 2. Minimal left–right completion

Under the left–right group, take

\[
Q_R=(u_R,d_R)\sim(\mathbf3,\mathbf1,\mathbf2)_{1/3},
\qquad
L_R=(\nu_R,e_R)\sim(\mathbf1,\mathbf1,\mathbf2)_{-1},
\]

alongside the usual left doublets. The simultaneous nontrivial Weyl element

\[
w=(w_L,w_R)\in SU(2)_L\times SU(2)_R
\]

then implements channel flip on both chiralities. At the sector level it sends

\[
C=(u,e)\longleftrightarrow(d,\nu)=D.
\]

The right-handed neutrino is not decorative here: without it the leptonic right doublet and therefore the complete handle exchange do not exist. This dovetails with the independent Furey and ternary-completion branch that singled out the \(\nu^c\) arrow.

## 3. Why Pati–Salam is optional for this step

Pati–Salam,

\[
SU(4)\times SU(2)_L\times SU(2)_R,
\]

contains the left–right completion and organizes quarks and leptons in common four-dimensional multiplets. It is therefore a natural larger setting. It is not required to exchange the handles: the channel flip preserves colored versus singlet type, so \(SU(2)_R\) supplies precisely the missing operation.

The alternative color/lepton flip from document 767 is less direct. After a specific \(SU(3)_c\subset SU(4)\) is selected, its color subspace is three-dimensional and its lepton line one-dimensional. An \(SU(4)\) Weyl element can exchange one chosen color basis line with the lepton line, but cannot bijectively exchange the whole color triplet sector with the whole lepton sector. The four-name quotient suppresses this multiplicity obstruction.

## 4. Gauge symmetry is not yet response reciprocity

The equal-area theorem requires the physical response pairing to obey

\[
H^T J(a,b)H=J(a,b).
\]

Finding \(H\) in the enlarged gauge group supplies a necessary kinematic operation, but an actual background is invariant only if every datum is transformed consistently. In particular:

- the Higgs bidoublet or other order parameter must lie on an exchange-invariant orbit;
- source and boundary conditions must not distinguish the two channel orientations;
- the effective Yukawa and threshold response must give equal norms to the exchanged planes; and
- symmetry breaking to \(U(1)_{\rm em}\), together with unequal masses and Yukawa matrices, generally destroys the low-energy exchange.

Thus the strongest licensed implication is

\[
\text{unbroken left-right response covariance}
\Longrightarrow C\leftrightarrow D
\Longrightarrow a=b.
\]

It is not

\[
\text{observed low-energy Standard Model}\Longrightarrow a=b.
\]

## 5. High-value next calculation

Let \(G_C\) and \(G_D\) be the integrated antisymmetric response forms on the two sewn handles. The dynamical selector is the equality, after canonical normalization,

\[
G_C=H^T G_DH.
\]

The next calculation should derive these two forms from the same left–right-covariant quadratic effective action, then introduce Higgs and Yukawa breaking spurions and compute the splitting

\[
\delta J=G_C-H^TG_DH.
\]

If \(\delta J=0\) is protected before breaking and its low-energy correction is controlled, equal area has a real UV origin. If independent invariant counterterms already allow arbitrary \(G_C\) and \(G_D\), left–right gauge symmetry alone does not select the ratio and this branch must be pinned.

## 6. Stop conditions

- Do not identify a gauge transformation with a symmetry of a fixed symmetry-breaking vacuum.
- Do not infer equal response norms merely because the two handles have equal field counts.
- Do not use Pati–Salam to erase the color-triplet/lepton-line multiplicity distinction after symmetry breaking.
- Do not call the channel flip a Standard Model symmetry on complete chiral matter.
- Do not claim a prediction until the invariant quadratic response and its allowed counterterms have been classified.

## 7. Executable certificate

```powershell
node scripts/verify_left_right_completion_is_the_minimal_gauge_envelope_for_furey_handle_exchange.mjs
```

The certificate verifies that the Standard Model connects exactly the two left-handed pairs, while the left–right representation connects all four pairs and exchanges the sewn handles.

## Companion documents

- [Sewn Furey handle-exchange obstruction](767_the_sewn_furey_ribbon_has_untyped_handle_exchange_but_no_standard_model_typed_exchange_between_c_and_d.md)
- [Unique right-handed-neutrino TRO completion](167_unique_right_handed_neutrino_tro_completion_and_spin23_tradeoff.md)
- [Handle-exchange equal-area theorem](766_integral_handle_exchange_forces_equal_or_opposite_carrier_areas_but_is_not_a_microscopic_s5_symmetry.md)
