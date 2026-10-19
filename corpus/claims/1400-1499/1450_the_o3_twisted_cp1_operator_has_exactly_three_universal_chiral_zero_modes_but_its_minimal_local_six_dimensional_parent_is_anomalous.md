# The \(\mathcal O(3)\)-twisted \(\mathbb{CP}^1\) operator has exactly three universal chiral zero modes, but its minimal local six-dimensional parent is anomalous

**Date:** 20 October 2026  
**Gate:** A6, complete operator / locality / anomaly kill test  
**Status:** formal index-three operator constructed exactly; minimal local \(M_4\times\mathbb{CP}^1\) realization ruled out  
**Depends on:** [canonical \(\mathcal O(3)\) bridge 1397](../1300-1399/1397_the_completion_cp1_canonically_inherits_o3_and_index_three_but_no_current_action_makes_it_the_fermion_family_dirac_space.md), [finite-operator obstruction 1394](../1300-1399/1394_no_finite_four_dimensional_operator_derives_three_selected_generations_but_an_o3_twisted_cp1_dirac_operator_is_the_minimal_index_three_escape.md), and [effective selector 1235](../1200-1299/1235_an_oriented_boundary_can_select_one_anomaly_free_furey_tro_and_retain_cp_only_if_an_exchange_odd_portal_exists.md)  
**Evidence:** [machine-readable calculation](../../../evidence/data/spin23-a6-local-six-dimensional-index-three-kill-test.json) and [executable verifier](../../../verification/verify/verify_spin23_a6_local_six_dimensional_index_three_kill_test.mjs)

## Result

There is a precise operator that gives three copies of every selected Standard Model multiplet and of a sterile neutrino:

\[
 D_{\rm form}
 =D_{M_4}\otimes 1+\gamma_5\otimes D_{\mathbb{CP}^1,\mathcal O(3)}.
\]

The internal operator has

\[
 \dim\ker D_+=3,\qquad \dim\ker D_-=0,
 \qquad \operatorname{index}D=3.
\]

Because the same line and connection are tensored with every gauge representation, the family index is exactly the same for

\[
 Q, u^c, d^c, L, e^c, N.
\]

This produces \(3\times15=45\) charged Standard Model Weyl components and three sterile components. Gauge equivariance is exact: the Standard Model gauge action is on the representation factor and the family connection is on \(\mathcal O(3)\), so the two actions commute.

That is the strongest positive result. It is a formal tensor-product construction, not yet a viable local six-dimensional theory.

If it is promoted to the minimal local action on \(M_4\times\mathbb{CP}^1\), all six-dimensional Weyl parents must have the same six-dimensional chirality in order for the common internal \(+3\) index to give the same four-dimensional chirality. Their irreducible gravitational anomaly then adds with coefficient proportional to

\[
 6+3+3+2+1+1=16\ne0.
\]

The Abelian and mixed gauge traces are also nonzero. A six-dimensional Dirac repair cancels these anomalies only by adding the opposite six-dimensional chirality, which produces three opposite-chirality four-dimensional zero modes for every multiplet: the mirror sector returns.

Therefore

\[
\boxed{
\begin{array}{ll}
\text{universal formal family index three:}&\textbf{derived},\\
\text{minimal local six-dimensional completion:}&\textbf{ruled out},\\
\text{three-generation physical derivation:}&\textbf{not yet obtained}.
\end{array}}
\]

## 1. What “formal” and “local” mean

A map printed on paper can correctly describe three roads without being a road. In the same way, a tensor-product operator can correctly count three modes without supplying a local higher-dimensional field theory that can be quantized consistently.

The formal construction needs only two Hilbert-space factors and their operators. A local construction additionally needs:

- a six-dimensional spinor field at every point of \(M_4\times\mathbb{CP}^1\);
- a local kinetic action and integration measure;
- a background or dynamical connection producing the degree-three flux;
- a consistent reality/CAR structure;
- cancellation of local and global quantum anomalies;
- a reduction prescription for every nonzero Kaluza--Klein mode.

The first list is supplied below. The anomaly requirement fails for the minimal declared field content.

## 2. Complete gauge-equivariant formal operator

Let

\[
 \mathcal H_{\rm one}
 =\mathcal H_Q\oplus\mathcal H_{u^c}\oplus\mathcal H_{d^c}
 \oplus\mathcal H_L\oplus\mathcal H_{e^c}\oplus\mathcal H_N
\]

carry the left-handed representations

\[
 (\mathbf3,\mathbf2)_{1/6}\oplus
 (\bar{\mathbf3},\mathbf1)_{-2/3}\oplus
 (\bar{\mathbf3},\mathbf1)_{1/3}\oplus
 (\mathbf1,\mathbf2)_{-1/2}\oplus
 (\mathbf1,\mathbf1)_1\oplus
 (\mathbf1,\mathbf1)_0.
\]

Write \(Y_6=6Y\), so the integer charges are \(1,-4,2,-3,6,0\). Let \(L_F=\mathcal O(3)\) over the completion \(\mathbb{CP}^1\), with a unitary connection of Chern number three. On

\[
 \mathcal H_{\rm form}=\mathcal H_{\rm one}\widehat\otimes
 L^2(S_{\mathbb{CP}^1}\otimes L_F)
\]

define

\[
 D_{\rm form}=D_4\otimes1+\gamma_5\otimes D_F.
\]

For every \(g\in G_{\rm SM}\),

\[
 [D_F,\rho(g)]=0,
\]

because the two operators act on different tensor factors. Thus restriction to the three-dimensional zero-mode space is identical for every multiplet:

\[
 \mathcal H_{\rm light}
 =\mathcal H_{\rm one}\otimes\ker D_{F,+}
 \cong \mathcal H_{\rm one}\otimes\mathbb C^3.
\]

This establishes universality. It does not derive the Standard Model representation \(\mathcal H_{\rm one}\), its four-dimensional chirality, or its Yukawa matrices; those remain inputs.

## 3. The local six-dimensional candidate

The literal local candidate is

\[
 S_6=\sum_r\int_{M_4\times\mathbb{CP}^1}
 d^6x\sqrt{|g_6|}\;
 i\,\overline\Psi_r\Gamma^M
 (\nabla_M+A_M^{\rm SM}+A_M^F)\Psi_r,
\]

where every \(\Psi_r\) is a six-dimensional Weyl fermion in the representation \(r\), and every species is twisted by the same \(L_F=\mathcal O(3)\).

With

\[
 \Gamma_7=\gamma_5\otimes\sigma_3,
\]

six-dimensional chirality is the product of four-dimensional and internal chirality. The \(+3\) monopole has three zero modes of one internal chirality. Consequently, equal four-dimensional chirality for all six multiplets requires equal six-dimensional chirality for all six parent fields.

This is the point at which the formal and local constructions separate.

## 4. Exact zero modes and Kaluza--Klein tower

For monopole number \(n=3\) on a round sphere of radius \(R\),

\[
 \operatorname{index}D_F=n=3.
\]

Equivalently, \(S^+\otimes\mathcal O(3)=\mathcal O(2)\), whose holomorphic sections have basis

\[
 1, z, z^2.
\]

The nonzero spectrum is

\[
 \lambda_{k,\pm}=\pm\frac1R\sqrt{k(k+3)},
 \qquad d_k=2k+3,qquad k=1,2,\ldots .
\]

The first massive level therefore has mass \(2/R\) and degeneracy five for each sign. The conjugate bundle \(\mathcal O(-3)\) has index \(-3\): its three zero modes have the opposite internal chirality, and its nonzero spectrum is the same.

With orthonormal zero modes \(\eta_a\), dimensional reduction is the explicit expansion

\[
 \Psi_r(x,y)=\sum_{a=1}^{3}\psi_{r,a}(x)\eta_a(y)
 +\sum_{k\ge1,\alpha}\psi_{r,k,\alpha}(x)\eta_{k,\alpha}(y).
\]

Integrating over \(\mathbb{CP}^1\) gives

\[
 S_{4,\rm light}
 =\sum_{r}\sum_{a=1}^{3}
 \int_{M_4}d^4x\;i\bar\psi_{r,a}\not D_r\psi_{r,a},
\]

while each nonzero \(\pm\lambda_k\) pair becomes a four-dimensional massive Dirac level of mass \(|\lambda_k|\) and multiplicity \(2k+3\). This is the precise sense in which the index produces a family count while the rest of the internal spectrum produces a vectorlike KK tower.

For an internal-coordinate-independent six-dimensional gauge zero mode,

\[
 \frac1{g_4^2}=\frac{4\pi R^2}{g_6^2},
 \qquad g_4=\frac{g_6}{\sqrt{4\pi R^2}}.
\]

Canonical normalization follows from orthonormal internal wavefunctions. Yukawa and Majorana matrices do not follow from the index: they are overlap integrals involving as-yet unspecified internal Higgs, flavon, and projector profiles.

## 5. Local six-dimensional anomaly kill test

For a six-dimensional Weyl fermion the anomaly polynomial is an eight-form. Opposite six-dimensional chiralities contribute with opposite sign. Because the common \(+3\) index demands one common parent chirality, the irreducible gravitational term is proportional to the total complex representation dimension,

\[
 \sum_r\dim r=16.
\]

It cannot cancel within the proposed field content. A Green--Schwarz tensor can cancel suitable factorized pieces, but it does not erase an uncancelled irreducible \(\operatorname{tr}R^4\) coefficient; opposite-chirality matter or equivalent new ultraviolet data are required.

The relative gauge traces make the failure more explicit. With \(Y_6=6Y\), the one-parent spectrum gives

\[
\begin{array}{c|r}
\text{trace or coefficient}&\text{value}\\ \hline
\sum d_rY_6&0\\
\sum d_rY_6^2&120\\
\sum d_rY_6^3&0\\
\sum d_rY_6^4&2280\\
SU(3)^4&4\\
SU(2)^4&4\\
SU(3)^2Y_6^2&22\\
SU(2)^2Y_6^2&12\\
Y_6SU(3)^3&4
\end{array}
\]

The displayed nonzero entries are relative representation traces, not a choice of anomaly-polynomial normalization. Their nonvanishing is normalization-independent. In particular, \(Y_6SU(3)^3=4\) is an irreducible local gauge anomaly; the quartic \(SU(3)\) and \(SU(2)\) traces are reducible for these groups and would require a factorized Green--Schwarz completion rather than vanishing separately.

There is also an independent global \(SU(2)\) obstruction. A six-dimensional theory requires

\[
 N(2_+)-N(2_-)=0\pmod 6.
\]

The common-chirality parent has three color copies of \(Q\) plus one \(L\), hence

\[
 N(2_+)-N(2_-)=4\not\equiv0\pmod6.
\]

This exposes an important difference: one six-dimensional bulk generation whose flux has index three is not three six-dimensional generations. The three appears only after reduction, too late to cancel the parent theory's global anomaly.

This obstruction is consistent with the established six-dimensional Standard Model literature: viable six-dimensional assignments use nontrivial chirality patterns and extra consistency conditions rather than putting every multiplet in the same six-dimensional chirality. See Dobrescu and Poppitz, [“Number of Fermion Generations Derived from Anomaly Cancellation”](https://arxiv.org/abs/hep-ph/0102010), and Erler, [“Anomaly Cancellation in Six Dimensions”](https://arxiv.org/abs/hep-th/9304104).

### Why a six-dimensional Dirac parent does not solve the target problem

Adding the opposite six-dimensional chirality cancels the anomaly species by species. But under the same internal flux, the relation

\[
 \chi_6=\chi_4\chi_2
\]

then gives three zero modes of the opposite four-dimensional chirality as well. The reduced spectrum is vectorlike: three desired modes plus three mirrors for every multiplet.

An orbifold projection, boundary condition, domain wall, or spectator spectrum might remove or relocate the mirror modes. None is present in the declared construction, and each brings its own localized or inflow anomaly conditions. They are possible repairs, not consequences of \(\mathcal O(3)\).

## 6. Four-dimensional anomaly audit

After formal projection to the desired zero modes, ordinary Standard Model anomalies cancel generation by generation:

\[
\begin{aligned}
SU(3)^3 &: 2-1-1=0,\\
SU(3)^2Y_6 &:2(1)-4+2=0,\\
SU(2)^2Y_6 &:3(1)-3=0,\\
\operatorname{grav}^2Y_6 &: \sum d_rY_6=0,\\
Y_6^3 &: \sum d_rY_6^3=0.
\end{aligned}
\]

There are four weak doublets per generation, so the four-dimensional Witten \(SU(2)\) anomaly also vanishes. Multiplication by three preserves every cancellation; the sterile \(N\) is neutral.

The family connection cannot simply be reinterpreted as a dynamical four-dimensional \(U(1)_F\) under which every field has charge one. Per family that would give

\[
 \operatorname{grav}^2F=F^3=16,
 \quad SU(3)^2F=SU(2)^2F=4,
 \quad Y_6^2F=120.
\]

Thus it must remain a fixed internal spin\(^c\)/bundle background with no four-dimensional gauge zero mode, or acquire additional anomaly-cancelling matter or inflow.

## 7. CAR reality, conjugates, and mirrors

Charge conjugation maps

\[
 (r,\mathcal O(3))\longmapsto
 (\bar r,\mathcal O(-3)).
\]

Accordingly, the real one-particle space must contain both flux blocks,

\[
 \mathcal K_{\rm real}=\mathcal K_{+3}\oplus\overline{\mathcal K_{+3}},
\]

with an antilinear involution \(J\) exchanging them. The doubled block has 48 particle modes and 48 conjugate modes at zero energy. The latter are antiparticle creation operators, not a second 48-dimensional physical generation space, only if the self-dual CAR constraint identifies them as adjoints. Quantizing both blocks as independent left-handed fields would double the theory and produce mirrors.

At a finite spectral cutoff the Nambu antisymmetric operator can be written schematically as

\[
 \mathcal A=
 \begin{pmatrix}0&D\\-D^T&0\end{pmatrix},
 \qquad \operatorname{Pf}\mathcal A=\pm\det D.
\]

This is the correct Pfaffian packaging of the complex determinant; it does not cancel the six-dimensional chiral anomaly. A genuinely sterile Majorana Pfaffian needs a gauge- and bundle-invariant antisymmetric pairing.

There is a further local obstruction: two sterile zero modes carrying \(\mathcal O(3)\) have a bilinear in \(\mathcal O(6)\). A local Majorana coefficient must therefore be a section of \(\mathcal O(-6)\). No nowhere-vanishing such section exists. Pairing \(\mathcal O(3)\) with \(\mathcal O(-3)\) is bundle invariant but is Dirac/vectorlike and reintroduces the opposite-index sector. The existing spacetime charge-three flavon is not automatically an \(\mathcal O(-6)\) field on the completion sphere.

Hence the twist supplies three sterile states, but not their Majorana mass or a seesaw.

## 8. What is derived, inserted, and ruled out

### Exact

- The pulled-back anticanonical line is \(\mathcal O(3)\).
- Its spin-Dirac index on \(\mathbb{CP}^1\) is three.
- A universal tensor product gives the same family multiplicity to all six multiplets.
- The conjugate line has index \(-3\).
- The KK spectrum, first gap \(2/R\), and degeneracies follow from the round-sphere monopole Dirac operator.
- Three projected Standard Model generations are four-dimensionally anomaly-free.
- The minimal all-same-chirality local six-dimensional spectrum has a nonzero irreducible gravitational anomaly.
- It also has irreducible \(Y_6SU(3)^3\) and global \(SU(2)\) anomalies; the latter sees four, not twelve, bulk weak doublets.
- A vectorlike six-dimensional repair produces opposite-chirality four-dimensional zero modes.

### Model-dependent or inserted

- Treating the completion \(\mathbb{CP}^1\) as a physical propagation coordinate.
- The radius \(R\), six-dimensional kinetic normalization, and flux-supporting dynamics.
- The 4D chiral carrier and its gauge representations in the formal construction.
- Yukawa textures, Higgs profiles, sterile pairing, and the Kaluza--Klein threshold.
- Any orbifold, boundary, inflow, Green--Schwarz, or spectator repair.

### Ruled out

The minimal local theory consisting only of one same-chirality six-dimensional parent for each of \(Q,u^c,d^c,L,e^c,N\), all twisted by the common \(\mathcal O(3)\), is not a consistent quantum gauge theory. Its local six-dimensional anomaly polynomial and its global \(SU(2)\) anomaly are both nonzero.

## 9. Minimal repair and first falsifier

There are two honest continuations:

1. **Spectral, not literal, internal geometry.** Keep \(D_{\rm form}\) as a finite/spectral family operator. Then the index-three result survives, but four-dimensional chirality and the Standard Model carrier remain inputs. This is a family-replication mechanism, not a six-dimensional unification.
2. **Add ultraviolet structure.** Supply an explicit opposite-chirality spectator/inflow/Green--Schwarz sector whose complete eight-form anomaly polynomial cancels while its net four-dimensional index is zero; also supply an \(\mathcal O(-6)\) Majorana pairing datum or another sterile-mass mechanism. An orbifold or boundary projection must include its localized anomaly ledger.

The first decisive falsifier of any claimed local completion is simple: compute its full six-dimensional eight-form anomaly polynomial. If the \(\operatorname{tr}R^4\) coefficient or any irreducible gauge coefficient is nonzero, it is not a local completion. If anomaly cancellation requires an opposite-chirality bulk copy with the same flux, its reduced mirror kernel must be shown explicitly absent rather than verbally projected away.

## 10. Gate verdict

\[
\boxed{
\text{A6 remains blocked at the local-action step.}
}
\]

The programme now has more than an integer coincidence: it has a canonical degree-three bundle and a complete formal gauge-equivariant operator. The remaining gap is also sharper than before. It is not “find a way to get three.” It is:

> Construct an anomaly-free local or spectral real structure that preserves the universal \(+3\) chiral kernel, eliminates independent mirror kernels, and supplies a bundle-invariant sterile pairing without inserting those outcomes by hand.

