# Result 36: parallel round two reduces three selector questions to five coordinates, a rank-one orbit and colour-linearity

## Executive result

The second parallel round produced a positive reduction in every trunk, while preserving a clear boundary between organization and unique physical selection.

1. The direct Standard-Model current problem reduces exactly to five physical coordinates.
2. The exceptional Jordan action can select the rank-one orbit whose tangent space is the matter \(16\), although spontaneous symmetry breaking must still select a point on that orbit.
3. Full colour-linearity removes the three unwanted doubled-arrow links; retaining coloured fluctuations instead produces a coherent optional leptoquark sector.

These are compatible results. Together they replace three vague gaps with three typed choices: an experimental rank reduction, a vacuum choice and a colour representation rule.

## 1. Direct-current quotient

After including the five fermion phase currents, Higgs current, hypercharge equation-of-motion representative, contact freedom and the completed neutrino direction, the physical linear data reduce to

\[
(v_u,v_d,v_e,v_\nu;A_2).
\]

The shared-field channel metric is

\[
M=
\begin{pmatrix}
3/2&-5/6&-1&1\\
-5/6&3/2&1&-1\\
-1&1&5/2&-1/2\\
1&-1&-1/2&5/2
\end{pmatrix},
\]

with eigenvalues

\[
\frac23,\quad2,\quad\frac{8-\sqrt{37}}3,\quad\frac{8+\sqrt{37}}3.
\]

Neither incidence convention is an eigenray. Exact incidence/\(B-L\) two-current closure therefore fails already in the leading noncontact block.

The incidence family retains the non-generic UV relation

\[
A_2=A_3=v_u+v_d,
\]

while its two normalizations remain separated by \(v_e=2\) versus \(v_e=4\). This is a benchmark relation to test, not a dynamically selected axis.

## 2. Exceptional rank-one orbit and the selected matter tangent

For a primitive rank-one Jordan state \(p\), multiplication \(L_p\) has multiplicities

\[
1^{(1)},\qquad(1/2)^{(16)},\qquad0^{(10)}.
\]

The matter projector is intrinsic once \(p\) is given:

\[
P_{16}(p)=4L_p(1-L_p).
\]

Moreover the compact exceptional theory admits the invariant potential

\[
V(x)=\lambda(\|x\|^2-v^2)^2+\kappa\|x^\#\|^2,
\qquad\lambda,\kappa>0,
\]

whose zeros are normalized nonzero rank-one vectors. Thus an invariant action can select the correct orbit of crystal faces without inserting a rank-16 matrix projector.

It cannot select a unique face while preserving the full symmetry. Irreducibility gives

\[
\operatorname{End}_{E_6}(27)=\mathbb C,
\]

so a state-independent equivariant projector has rank zero or 27, never 16. A chosen vacuum supplies the remaining state data. This is ordinary spontaneous selection, not an algebraic contradiction.

The complement is physical rather than padding: the two cubic channels are \(16\,16\,10\) and \(1\,10\,10\); the \(10\) contains Higgs doublets and six coloured directions, and the singlet is the selected radial line. Charge-conjugation closure still requires at least the evident \(27\oplus\overline{27}\).

## 3. Gauge-dressed doubled-arrow geometry

The four desired links require the familiar colour-singlet Higgs doublets. The three additional links carry

\[
Q-L:\quad(\bar{\mathbf3},\mathbf1\oplus\mathbf3)_{1/3},
\]

\[
u^c-e^c,\ d^c-\nu^c:\quad(\mathbf3,\mathbf1)_{-1/3}.
\]

These are the standard \(S_1\) and optional \(S_3\) scalar-leptoquark representations. With \(B=-1/3\) and \(L=-1\), the classified links conserve baryon and lepton number. The same endpoint rule excludes the basic compatible diquark links, which is partial rather than complete proton protection.

Restoring the noncommutative colour action and requiring the finite Dirac operator to be colour-linear retains exactly the four desired Yukawa links and removes all three extras. Therefore the extra scalars are not compulsory. If coloured finite fluctuations are deliberately allowed, the graph instead organizes a coherent \(S_1\), optionally \(S_3\), extension.

## Updated crystal reading

The strongest charitable interpretation is now more precise:

> The exceptional structure can supply a homogeneous space of equivalent faces and an invariant energy selecting the rank-one class. A chosen face then has the completed Furey/Spin(10) generation as its tangent \(16\). Standard-Model colour-linearity selects the conventional Yukawa subgraph inside the broader doubled-arrow geometry.

What remains open is whether one common action connects these three levels and produces a non-generic measured relation. Without that connection they are compatible organizing structures, not evidence that the exceptional parent is fundamental.

## Next gates

1. Compute the Hessian and gauge spectrum around a selected rank-one exceptional vacuum, including the coloured directions in the \(10\).
2. Match the five direct-current coordinates to measurable correlators and determine whether data reduce their rank.
3. Test whether the same exceptional \(10\) that contains Higgs-compatible directions reproduces the colour-linear four-link spectral geometry or necessarily activates the optional leptoquark branch.

## Reproduction

- `scripts/verify_programme_gauge_typed_source_quotient_and_yukawa_channel_block.mjs`
- `scripts/verify_representation_trunk_peirce_16_selector_and_orbit.mjs`
- `scripts/verify_representation_trunk_exceptional_10_plus_1_roles.mjs`
- `scripts/gauge_dress_the_seven_doubled_furey_arrow_links.mjs`

All certificates pass.
