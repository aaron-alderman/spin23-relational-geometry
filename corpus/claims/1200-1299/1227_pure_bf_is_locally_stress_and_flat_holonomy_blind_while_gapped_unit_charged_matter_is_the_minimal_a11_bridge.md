# Pure BF is locally stress- and flat-holonomy-blind, while gapped unit-charged matter is the minimal A11 bridge

**Date:** 20 October 2026  
**Status:** exact local-operator and flat-holonomy no-gos plus a synthetic spectral witness; no defect-localized charged field, coefficient or response scale is derived  
**Role in the corpus:** microscopic-coupling continuation of the preregistered A11 response protocol

## Result in one sentence

The level-three BF term carries the required global \(Z_3\) holonomy but has no
bulk Hilbert stress, while the first metric-dependent pure-gauge operators are
local field-strength squares that vanish on flat holonomy sectors; the smallest
local field theory capable of both carrying stress and reading the flat sector is
therefore a gapped defect field of residual charge one or two, whose kinetic term
has defect dimension three, but its existence, mass, response coefficient and
transverse two-probe Gram matrix are not predicted by the current typed action.

## 1. The everyday picture before the field theory

Imagine a perfectly flat circular railway. Three settings differ only in the
instruction that a charged carriage acquires zero, one-third or two-thirds of a
turn of phase after completing the loop.

A spirit level placed on a short piece of track reads the same thing in all three
settings: every local segment is flat. A carriage that travels around the whole
loop can distinguish them because its allowed standing waves change.

That is the central separation:

- local field strength is the spirit level;
- holonomy is the accumulated instruction around the loop;
- charged matter is the carriage;
- stress response records how the carriage's spectrum reacts when the track is
  stretched or distorted.

Pure topology stores the instruction. A local charged degree of freedom is needed
to turn it into mechanical or spectral response.

## 2. Setting and dimension convention

On the \(2+1\)-dimensional defect \(\Sigma_3\), retain

\[
S_{\rm BF}={3\over2\pi}\int_{\Sigma_3}c\wedge da.
\]

Use defect engineering dimensions with \([\partial]=1\) and the topological
normalization

\[
[a]=[c]=1,
\qquad [f_a]=[f_c]=2.
\]

Then \(c\wedge da\) has dimension three and a Maxwell term \(f^2\) has dimension
four with an inverse-mass coefficient. These are defect EFT dimensions; they are
not the engineering dimensions of the original four-dimensional fields before
reduction.

For the discrete-symmetry column below, take the conventional assignment in which
\(a\) is a polar one-form and \(c\) is axial, making the mutual BF term parity/time-
reversal even. Exact CP labels ultimately require the microscopic charge and
orientation conventions.

The census assumes local diffeomorphism-invariant defect scalars made from the
induced metric and BF fields, with no extra preferred tangential vector. A vector
source could contract the dual of one field strength at lower dimension, but that
source would itself be added medium/probe structure, and the term would still
vanish when the local field strength vanishes.

## 3. Local-operator census

| Operator | Defect dimension | Metric stress? | Flat \(Z_3\) reader? | Third-direction status |
|---|---:|---|---|---|
| \(c\wedge da\) | 3 | No bulk Hilbert stress | Stores global sector, but no local stress readout | No |
| \(a\wedge da\), \(c\wedge dc\) | 3 | No bulk Hilbert stress | Changes the topological twist | No; also threatens the required untwisted carrier |
| \(Z_{IJ}f_I{}_{ij}f_J{}^{ij}/(4\Lambda)\) | 4 | Yes | No when \(f_I=0\) | Conditional third direction under flux, but not flat-holonomy correlated |
| \(|D_{3a}s|^2+m_s^2|s|^2\) | 3 | Yes | No: residual charge \(3\equiv0\pmod3\) | Can add defect response, not A11 sector dependence |
| \(|D_{qa}\phi|^2+m_\phi^2|\phi|^2\), \(q=1,2\) | 3 | Yes | Yes, through the global spectrum | Minimal viable form; transverse Gram still must be proved |
| parity-paired \(\bar\psi(i\not D_a-m)\psi\) | 3 | Yes | Yes, through the global spectrum | Viable after the localized parity-anomaly audit |
| \(R_\Sigma f_I f_J/\Lambda^3\) and descendants | 6+ | Yes | No on locally flat gauge sectors | Higher-order and not a solution |
| Wilson loop \(W_q(C)=e^{iq\oint_Ca}\) | nonlocal | Only through its detector/contour realization | Directly | Clean observable, not a local microscopic operator |

For the Maxwell matrix, the diagonal terms are even under the conventional BF
parity assignment while \(f_a\cdot f_c\) is odd. A self Chern--Simons term is
parity odd for an ordinary one-form and is quantized rather than a continuously
tunable stress portal.

## 4. No-go I: the pure topological sector has no bulk Hilbert stress

The BF action can be written using differential forms and orientation alone. It
does not require the induced metric \(\gamma_{ij}\). Therefore

\[
\tau^{ij}_{\rm BF}
=-{2\over\sqrt{|\gamma|}}
{\delta S_{\rm BF}\over\delta\gamma_{ij}}
=0
\]

in the closed defect bulk. The same statement holds for pure Chern--Simons terms.
They may change finite phases, edge anomalies and global state counting, but
metric variation does not turn them into the A11 stress matrix.

This no-go has a precise boundary: a physical boundary can support metric-dependent
edge modes. Those modes are additional non-topological degrees of freedom. They do
not constitute stress generated by pure BF in the closed bulk.

## 5. No-go II: local curvature cannot read flat holonomy

The three sectors are labelled by

\[
\exp\!\left(i\oint_Ca\right)=e^{2\pi ih/3},
\qquad h=0,1,2,
\]

while locally

\[
f_a=da=0,
\qquad f_c=dc=0.
\]

Every strictly local gauge-invariant polynomial made only from \(f_a,f_c\), their
covariant derivatives and the same local geometry consequently has the same value
in all three sectors. In particular, Maxwell and curvature-dressed Maxwell terms
can produce stress for flux excitations, but cannot distinguish a flat connection
by local evaluation.

This is an exact locality statement, not a claim that holonomy is unobservable.
It says a path encircling the noncontractible cycle, or a charged spectrum defined
on that complete cycle, must participate.

## 6. No-go III: the charge-three flavon creates the remnant but cannot read it

A field of residual charge \(q\) acquires phase

\[
e^{2\pi iqh/3}.
\]

For the existing flavon, \(q=3\), so this phase is one for every \(h\). Its radial
and kinetic terms are metric dependent and can contribute defect stress, but its
spectrum cannot distinguish the three residual flat holonomies.

Thus the same scalar that Higgses \(U(1)_X\) to \(Z_3\) is not the missing A11
reader. Residual charge one or two is required.

## 7. The minimal viable local completion

Introduce a gapped defect-localized complex scalar of residual charge
\(q\not\equiv0\pmod3\):

\[
S_\phi=\int_{\Sigma_3}\sqrt{|\gamma|}\,
\left(\gamma^{ij}(D_i\phi)^*D_j\phi+m_\phi^2|\phi|^2\right),
\qquad
D_i=\partial_i-iq a_i.
\]

This operator is local, gauge invariant, metric dependent and CP even with an
ordinary complex-scalar assignment. Metric variation supplies a gauge-invariant
defect stress tensor schematically

\[
\tau_{ij}^{(\phi)}
=(D_i\phi)^*D_j\phi+(D_j\phi)^*D_i\phi
-\gamma_{ij}\left(|D\phi|^2+m_\phi^2|\phi|^2\right).
\]

On a cycle of length \(L\), its covariant momenta are shifted:

\[
k_n(h)={2\pi\over L}\left(n+{qh\over3}\right).
\]

Hence the determinant

\[
\Gamma_h[\gamma]
=\operatorname{Tr}\log(-D_a^2+m_\phi^2)
\]

and its second metric variation can depend on \(h\). The microscopic action is
local, but after \(\phi\) is integrated out the holonomy-dependent contribution is
necessarily global/nonlocal. For a large gap or long cycle it is suppressed by
winding and can become extremely small. That suppression is a prediction to
calculate, not a reason to assign an arbitrary detectable coefficient.

This is the smallest viable *operator form*. The current typed action does not
derive a defect-localized \(q=1\) or \(q=2\) field. Some bulk Standard Model fields
have suitable \(U(1)_X\) charges, but their localization, gap, boundary conditions
and anomaly-safe defect spectrum remain missing.

## 8. Conservation qualification

The defect contribution is distributional in the four-dimensional stress tensor.
Its Ward identity closes only after including the bulk stress, defect embedding
equation and displacement operator that accounts for normal momentum exchange.
A rigid externally held defect need not have a separately conserved defect stress.

Therefore the A11 calculation must vary the complete bulk-plus-defect action and
verify the combined diffeomorphism Ward identity. Inserting \(\tau_{ij}^{(\phi)}\)
into an otherwise conserved two-probe kernel without the displacement terms is not
an admissible shortcut.

## 9. A charged reader is necessary but not sufficient for a third direction

Let \(G_2,G_0\) be the frozen ordinary response-plane matrices and let \(G_\phi\)
be the fixed-probe Gram matrix generated by the charged defect stress. Define

\[
V_\phi
=\det\big[v(G_2),v(G_0),v(G_\phi)\big].
\]

Then:

\[
V_\phi=0
\quad\Longrightarrow\quad
\text{the operator only changes the two existing form factors},
\]

while

\[
V_\phi\ne0
\]

is necessary for a third \(H_2(\mathbb R)\) direction. Defect localization supplies
a normal vector and tangential projector, so an additional tensor structure is
allowed. It is not guaranteed: the actual probes may project it back into the old
plane.

The response has the schematic form

\[
C_h(\omega)
=\rho_2(\omega)G_2+\rho_0(\omega)G_0
+\kappa\,F_h(\omega;m_\phi,L)G_\phi.
\]

A11 requires all three of the following:

1. \(F_h\) varies with the prepared holonomy sector;
2. \(V_\phi\ne0\);
3. \(\kappa\), the mass and the frequency dependence are derived before comparison
   with data.

No value of \(\kappa\), \(m_\phi\) or \(L\) is currently predicted.

## 10. CP and orientation constraint

For an unbroken CP or time-reversal symmetry, the sectors \(h=1\) and \(h=2=-1\)
are conjugate and an ordinary CP-even spectral response obeys

\[
C_1(\omega)=C_2(\omega).
\]

The A11 cosine/sine omnibus statistic can still detect the distinction between
\(h=0\) and the conjugate pair. It cannot infer a preferred orientation from that
pattern. A signed splitting \(C_1\ne C_2\) requires a CP/T-odd observable, a chosen
defect orientation, or microscopic CP/T breaking.

This prevents a CP-even finite-size shift from being re-described as spontaneous
orientation selection.

## 11. Executable witness

The certificate places a flat connection on a finite cycle. All local curvatures
are zero, while the three Wilson phases are exactly

\[
0,\quad {2\pi\over3},\quad {4\pi\over3}.
\]

It then verifies:

- charge-one spectra distinguish \(h=0\) from the nontrivial conjugate pair;
- the \(h=1\) and \(h=2\) spectra agree in the CP-even fixture;
- charge-three spectra are identical in all sectors;
- a synthetic transverse \(G_\phi\) produces response rank three and nonzero
  holonomy-correlated transverse amplitude;
- a synthetic \(G_\parallel\in\operatorname{span}\{G_2,G_0\}\) remains rank two
  despite the same charge-one spectral shift;
- every response matrix remains positive.

The chosen Gram matrix and coefficient are witnesses of logical capacity, not
parameters derived from \(S_{\rm v1}\).

## 12. Decision for the candidate action

The microscopic-coupling lane has produced a sharp fork.

### Pure BF or pure local-gauge completion

Closed for A11 flat-holonomy stress response. Topological terms have no bulk
stress, and local field-strength terms are blind when the connection is flat.

### Charge-three flavon completion

Closed as the holonomy reader. It is neutral under the residual group it creates.

### Gapped residual-charge matter

Open and minimal. It can read holonomy and carry stress, but the current action
must derive:

1. a localized anomaly-safe \(q=1\) or \(q=2\) mode;
2. its gap and boundary conditions;
3. the compact cycle or multiply connected propagation path;
4. the complete conserved bulk/defect stress operator;
5. \(G_\phi\) for the preregistered probes;
6. the coefficient and frequency window.

Only after these are fixed does document 1222 become a genuinely predictive
falsification test. Until then A11 remains `missing`, and physical admission stays
false.

## Evidence

- [Machine-readable operator ledger](../../../evidence/data/spin23-a11-microscopic-coupling-ledger.json)
- [Flat-holonomy and response certificate](../../../verification/verify/verify_spin23_a11_microscopic_coupling_ledger.mjs)
- [A11 preregistration](1222_a_preregistered_z3_holonomy_response_test_can_separate_a_third_physical_direction_from_ambient_spin23_geometry.md)
- [Typed action](../1100-1199/1199_minimal_typed_closure_action_v1_separates_the_derived_bf_sector_from_the_still_spurionic_flavour_response.md)
- [Pure-BF memory no-go](1200_the_pure_z3_bf_carrier_forgets_the_projector_so_reflexive_closure_requires_non_topological_boundary_memory.md)
- [Untwisted-carrier parity gate](../1100-1199/1182_only_the_untwisted_z3_defect_has_the_two_qutrit_exponent_module_and_the_bf_orbifold_projects_bulk_discrete_theta_out_of_the_zero_modes.md)
