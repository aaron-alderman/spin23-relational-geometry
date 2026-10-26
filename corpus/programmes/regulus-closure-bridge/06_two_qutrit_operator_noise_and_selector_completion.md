# Two-qutrit operator, noise and selector completion

**Date:** 27 October 2026

**Status:** exact finite operator model and exact relation-invariant dynamics;
physical selector remains an external-input question

**Programme:** [Regulus closure bridge](README.md)

**Evidence:** [machine record](../../../evidence/data/regulus-mub-selector-dynamics-v1.json)

**Verifier:** [independent certificate](../../../verification/verify/verify_regulus_mub_selector_dynamics.mjs)

## 1. Result

The spread/MUB dictionary has now been realized as an explicit two-qutrit
operator model rather than left as a theorem citation. On
\(\mathcal H=\mathbb C^3\otimes\mathbb C^3\), label displacement operators by

\[
v=(x_1,x_2,z_1,z_2)\in\mathbb F_3^4
\]

and use

\[
D(x,z)=\omega^{2x\cdot z}X^xZ^z,\qquad \omega=e^{2\pi i/3}.
\]

For a Lagrangian plane \(L=\langle u,v\rangle\), the nine projectors

\[
P_{a,b}
=\frac1{9}\sum_{s,t\in\mathbb F_3}
\omega^{-as-bt}D(su+tv)
\]

are rank-one, Hermitian, mutually orthogonal and sum to the identity. The
executable calculation constructs all of them and verifies:

- 40 maximal commuting Pauli classes;
- 9 projectors per class;
- all 360 two-qutrit stabilizer states;
- 36 complete frames of 10 bases and 90 states;
- mutual-unbiased overlap \(1/9\) for every pair of bases selected by a
  spread.

The largest floating-point verification residual is below
\(1.1\times10^{-15}\), against a \(10^{-10}\) tolerance.

### Clifford measurement compiler

Every commuting-class measurement is compiled from the corpus's established
finite control alphabet:

\[
\{F_1,F_2,D_1,D_2,\mathrm{Swap},U\},
\]

where \(F_i\) are local Fourier changes, \(D_i\) are local quadratic phases,
and \(U\) is the mutual shear/controlled phase. Breadth-first compilation from
the computational \(Z\)-plane reaches all 40 bases:

| Shortest preparation length | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| Number of bases | 1 | 2 | 3 | 5 | 7 | 11 | 8 | 3 |

Thus no basis requires more than seven finite generators before
device-specific optimization. Relative to the fixed two-qutrit tensor split:

- 16 of the 40 stabilizer bases are product bases;
- 24 are entangled bases;
- every one of the 36 complete MUB frames contains exactly four product and
  six entangled bases;
- lexicographically minimizing mutual gates proves every product basis needs
  zero \(U\) gates and every entangled basis needs exactly one.

The evidence record contains the preparation and inverse measurement word for
every basis. This is a logical Clifford compiler, not yet a pulse, electrode
or interferometer compiler.

### The control-cost selector fan

Once the alphabet is assigned physical costs, total frame preparation cost is
an explicit symmetry-breaking field. Weighted shortest-path compilation gives
the following samples. Frame numbers are the zero-based machine identifiers in
the evidence record.

| Cost profile | Cheapest frame or frames | Minimum total cost |
|---|---:|---:|
| all six generators cost 1 | 21 | 40 |
| mutual gate \(U\) costs 10 | 10, 11, 21 | 97 |
| local Fourier gates cost 5 | 5, 6, 7, 22, 23, 24, 29, 30, 31 | 117 |
| local phase gates cost 5 | 20 | 60 |
| swap costs 5 | 21 | 40 |
| asymmetric second-qutrit and mutual costs | 11, 21 | 79 |

These profiles prove that implementation can select a frame, but also that
the selected frame is not intrinsic. Shortest-path costs are piecewise-linear
functions of the gate weights, so weight space is divided into chambers in
which different frames or ties minimize the cost. The samples certify several
such chambers; they do not yet enumerate the complete polyhedral fan.

An exhaustive census of all \(4^6=4096\) positive integer cost vectors with
each generator weight in \(\{1,2,3,4\}\) finds 29 distinct minimizing sets.
Seventeen of the 36 frames occur in at least one cheapest set, while only
frames 10, 11, 20 and 21 occur as unique winners on this grid. Of the 4096
profiles, 2138 have a unique winner and 1958 have a tie. These frequencies
are a census of a chosen integer grid, not probabilities and not a proof that
the continuous positive fan contains no additional chambers.

This is the concrete bridge between the abstract no-selector result and a
laboratory choice: calibration supplies the external field. A device should
therefore report its gate-cost vector and pre-register the frame predicted by
that vector, rather than retrospectively calling frame 21 canonical.

## 2. The complete frame algebra

Let \(A_4\) join frames sharing four bases and \(A_1\) join frames sharing one
basis. Their graphs are

\[
A_4:\operatorname{SRG}(36,15,6,6),\qquad
A_1:\operatorname{SRG}(36,20,10,12),
\]

and \(A_1=J-I-A_4\). Exact matrix multiplication gives

\[
\begin{aligned}
A_4^2&=15I+6A_4+6A_1,\\
A_1^2&=20I+12A_4+10A_1,\\
A_4A_1&=8A_4+9A_1.
\end{aligned}
\]

Therefore every frame-relation-invariant linear operator lies in the
three-dimensional Bose–Mesner algebra

\[
\boxed{\mathcal A=\operatorname{span}\{I,A_4,A_1\}.}
\]

Its simultaneous spectral sectors have dimensions

\[
1\oplus15\oplus20,
\]

with adjacency eigenvalues

| Sector | Multiplicity | \(A_4\) | \(A_1\) |
|---|---:|---:|---:|
| uniform | 1 | 15 | 20 |
| four-overlap mode | 15 | 3 | -4 |
| one-overlap mode | 20 | -3 | 2 |

This is the promised “mini-system matrix”: 36 apparent frame coordinates
collapse to three invariant dynamical sectors when the relation algebra is
respected.

### The Hecke meaning

This algebra is the exact fiber-constant compression of the earlier
432-point Hecke carrier. Let \(H_{\mathrm{ds}}\) be a double-six stabilizer.
Then

\[
\begin{aligned}
W(E_6)/S_5&:\quad 432\text{ double-six/line flags},&
\dim\operatorname{End}_{W(E_6)}&=26,\\
W(E_6)/H_{\mathrm{ds}}&:\quad36\text{ double-sixes/frames},&
\dim\operatorname{End}_{W(E_6)}&=3.
\end{aligned}
\]

Since

\[
|H_{\mathrm{ds}}|=1440,\qquad |S_5|=120,\qquad
[H_{\mathrm{ds}}:S_5]=12,
\]

the map sums or averages the twelve incident cubic-line flags over each
double-six. Thus the 36-frame Bose–Mesner algebra is not a new disconnected
matrix system. It is the three-sector Hecke compression obtained by forgetting
which of the twelve cubic lines inside a frame was marked.

## 3. The overlap graph reconstructs more of the cubic surface

Exhausting the maximal cliques gives:

| Relation graph | Maximal clique | Count | Exact recovered object |
|---|---:|---:|---|
| four shared bases \(A_4\) | \(K_4\) | 135 | its four double-sixes jointly omit one tritangent triple; each of 45 tritangents occurs three times |
| one shared basis \(A_1\) | \(K_3\) | 120 | the unique symmetric-difference closure of an azygetic pair |
| one shared basis \(A_1\) | \(K_5\) | 216 | the five double-sixes have exactly one common skew pair of cubic lines |

All 216 skew pairs occur exactly once. Every one-overlap edge belongs to one
maximal \(K_3\) and six maximal \(K_5\)s. Hence the “unique third” of an
azygetic pair is detectable without inspecting cubic-line coordinates: it is
the third vertex of the unique maximal triangle containing that edge.

This extends the operational dictionary:

\[
\begin{aligned}
\text{one-basis maximal triangle}
&\longleftrightarrow
\text{azygetic closure},\\
\text{one-basis maximal five-clique}
&\longleftrightarrow
\text{skew cubic-line pair},\\
\text{four-basis maximal four-clique}
&\longrightarrow
\text{tritangent triple}.
\end{aligned}
\]

The number 216 here has a closed classical meaning: the 216 unordered skew
pairs among the 27 cubic lines. It is not a new \(E_8\) orbit.

## 4. Exact noise channel

Every convex relation-invariant discrete channel has the form

\[
K=\alpha I+\beta\frac{A_4}{15}+\gamma\frac{A_1}{20},
\qquad
\alpha+\beta+\gamma=1,\quad \alpha,\beta,\gamma\ge0.
\]

Its two nontrivial eigenvalues are

\[
\lambda_{15}=\alpha+\frac{\beta-\gamma}{5},
\qquad
\lambda_{20}=\alpha-\frac{\beta}{5}+\frac{\gamma}{10}.
\]

Likewise the continuous-time generator

\[
Q=u(A_4-15I)+v(A_1-20I),\qquad u,v\ge0,
\]

has decay rates

\[
0,\qquad -12u-24v,\qquad -18u-18v.
\]

Thus two measured relaxation rates determine the two relation-class jump
rates. More importantly, a measured \(36\times36\) transition matrix can be
projected onto \(\mathcal A\); the residual outside
\(\operatorname{span}\{I,A_4,A_1\}\) is a direct falsifier of
relation-invariant dynamics.

This is a channel on **frame labels**, appropriate to Clifford-valued control
noise or a coarse-grained selector variable. A generic quantum CPTP channel
need not map a complete stabilizer frame to another member of the 36-frame
set. Such a channel has a leakage component that must be measured before its
conditional frame-preserving part is fitted to the three-parameter algebra.

The [frame-channel fitter](../../../scripts/fit-regulus-frame-channel.mjs)
accepts a JSON object containing a 36 by 36 **matrix** and an optional
36-entry **leakageByInput** vector. Run

    node scripts/fit-regulus-frame-channel.mjs path/to/channel.json

It returns the fitted weights, both nontrivial sector eigenvalues,
relation-wise scatter, row-sum range, leakage summary and the normalized
residual outside the Bose--Mesner algebra. Its verifier recovers a known
invariant channel exactly and detects a row-preserving perturbation whose
global relation means are unchanged.

## 5. Linear noise does not select a frame

If both relation rates connect the graph, the invariant Markov process tends
to the uniform distribution. It forgets a selected frame rather than
creating one. This resolves one proposed selector:

\[
\boxed{\text{symmetric linear noise mixes; it does not spontaneously select}.}
\]

Selection requires nonlinearity, memory, a boundary condition, an external
field or a source-derived asymmetry.

## 6. Symmetry-breaking modes

A minimal mean-field selector is

\[
F(p)=T\sum_i p_i\log p_i
-\frac12p^\mathsf T(j_0I+j_4A_4+j_1A_1)p-h\cdot p.
\]

At the uniform state, the two nontrivial Hessian eigenvalues are

\[
\begin{aligned}
\mu_{15}&=36T-(j_0+3j_4-4j_1),\\
\mu_{20}&=36T-(j_0-3j_4+2j_1).
\end{aligned}
\]

Whichever crosses zero first identifies the type of instability:

- a 15-dimensional four-overlap mode; or
- a 20-dimensional one-overlap mode.

This gives a sharp detector for the *kind* of symmetry breaking. It still
cannot canonically name one of the 36 equivalent frames when \(h=0\). A
particular outcome can be spontaneous, but its identity is selected by
fluctuation, preparation history or an explicit bias.

There is also an exact zero-temperature optimization result. For pure
relation attraction,

\[
F_A(p)=-\frac j2p^\mathsf TAp,
\]

the Motzkin–Straus theorem says that the minima are uniform distributions on
maximum cliques:

- \(A_4\) has clique number four, so its 135 optima are the \(K_4\) clusters
  that recover tritangent omissions, with energy \(-3j/8\);
- \(A_1\) has clique number five, so its 216 optima are the \(K_5\) clusters
  that recover skew cubic-line pairs, with energy \(-2j/5\).

This is a sharper answer to the optimization intuition. A relation-only
objective naturally selects a **composite incidence object**, not a single
frame. A self-attraction or external field is required to collapse that
cluster to one vertex.

## 7. What has been resolved

| Question | Resolution |
|---|---|
| Does the abstract spread really give MUB operators? | yes, all 360 projectors constructed |
| Is the 36-frame dynamics an arbitrary matrix? | no, invariant linear dynamics has dimension three |
| How many relaxation observables are required after leakage is separated? | two nontrivial sector rates |
| Can symmetric linear noise choose one frame? | no; it converges to the uniform sector |
| Can the onset of selection be classified? | yes; the first instability is in the 15- or 20-dimensional sector |
| What does pure relation optimization select? | a 135-fold tritangent-cover cluster or a 216-fold skew-pair cluster |
| Does the mathematics choose the winning frame? | no; that requires asymmetry or nonlinear history |
| Can a declared implementation choose one? | yes; weighted compilation does, but the winner changes across hardware-cost chambers |
| Can the overlap graph recover cubic objects? | yes; 120 closures, 216 skew pairs and 45 tritangents |

## 8. Relation to the corpus's existing twirls

The three-dimensional frame algebra is not the same object as the earlier
quadratic handle twirl or the Clifford-multiplicity quantum channel.

- The [quadratic handle twirl](../../claims/0800-0899/839_color_twirling_kills_the_linear_handle_but_its_quadratic_relationship_channel_selects_the_unique_symplectic_carrier.md)
  acts on response bilinears and selects the symplectic-form line.
- The [Clifford multiplicity channel](../../claims/0700-0799/706_a_clifford_multiplicity_conditional_expectation_exactly_selects_h2r_without_the_g2_fixed_range_excess.md)
  is completely positive on a typed quantum response representation.
- The present Bose–Mesner channel is a classical stochastic process on 36
  complete measurement-frame labels.

Their roles can compose without being identified:

\[
\text{quadratic relationship selector}
\longrightarrow
\text{symplectic carrier}
\longrightarrow
\text{36 finite frames}
\longrightarrow
\text{frame-label noise or selection}.
\]

The first arrow may select *which carrier algebra survives*. The last process
still cannot explain why one complete frame is physically preferred.

## 9. Literature placement

The finite-field commuting-class construction for two qutrits is treated
explicitly in [Multicomplementary operators via finite Fourier
transform](https://doi.org/10.1088/0305-4470/38/12/015). The general
spread/MUB correspondence is developed in [Symplectic spreads, planar
functions and mutually unbiased bases](https://arxiv.org/abs/1306.3478).
The present contribution is the identification and exact operator-level
closure of the corpus's particular 36-frame \(E_6\) orbit.
