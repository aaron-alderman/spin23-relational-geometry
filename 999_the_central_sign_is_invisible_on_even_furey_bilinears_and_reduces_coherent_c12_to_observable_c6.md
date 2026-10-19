# The Central Sign Is Invisible on Even Furey Bilinears and Reduces Coherent C12 to Observable C6

**Date:** 18 October 2026  
**Branches:** Furey bilinears, central holonomy, observable algebra, placement cover, and fermion parity  
**Claim status:** exact even-algebra descent; microscopic gauge identification remains open  
**Certificate:** [prove_the_central_sign_descends_trivially_to_even_furey_bilinears_but_not_the_carrier.mjs](scripts/prove_the_central_sign_descends_trivially_to_even_furey_bilinears_but_not_the_carrier.mjs)

## Executive result

The central sign left uncancelled by document 998 is automatically invisible on an even Furey observable algebra, provided it acts with the same sign on both constituent legs.

Let \(V_F\) be the four-channel Higgs-dressed Furey carrier and let

\[
Z=-I_{V_F}.
\]

Then \(Z\) is nontrivial on every nonzero linear carrier state, but on a quadratic tensor

\[
B(v,w)=v\otimes w
\]

it acts as

\[
B(Zv,Zw)=(-v)\otimes(-w)=B(v,w).
\]

The same holds for Hermitian/endormorphism bilinears \(vw^\dagger\), symmetric outer products, antisymmetric pairings, Gram matrices, currents and stresses whenever both legs carry the same central character.

Thus the coherent carrier remembers the central \(-I\), while its even observable algebra quotients it:

\[
\boxed{C_{12}\text{ on amplitudes}\longrightarrow C_6\text{ on even bilinears}.}
\]

This is an observable-algebra descent. It is not yet proof that \(-I\) is a microscopic Standard-Model gauge transformation.

## 1. Exact quadratic descent

For a bilinear matrix \(Q\), the induced real action is

\[
Q\longmapsto ZQZ^T.
\]

Since \(Z=-I\),

\[
ZQZ^T=Q
\]

for every \(Q\), not only for a selected subspace. On \(V_F\otimes V_F\), \(\operatorname{Sym}^2V_F\), \(\Lambda^2V_F\), and \(\operatorname{End}(V_F)\), the diagonal central sign acts trivially.

This formalizes the recurring distinction already visible in the Veronese/Jordan and weak-Weyl branches:

\[
v\mapsto-v
\quad\text{but}\quad
vv^T\mapsto vv^T.
\]

The Jordan relationship carrier may therefore be single-valued even when its coherent square root is antiperiodic.

## 2. Exact order of the induced transport

Let \(\mathcal T\) be the twelve-dimensional real coherent transport of document 996. It obeys

\[
\mathcal T^6=-I_{12},
\qquad
\mathcal T^{12}=I_{12}.
\]

On symmetric bilinears, define

\[
\rho_2(\mathcal T):Q\mapsto\mathcal TQ\mathcal T^T.
\]

The certificate checks the complete 78-dimensional space \(\operatorname{Sym}^2(\mathbb R^{12})\). The induced action has exact order six:

\[
\rho_2(\mathcal T)^6=I,
\qquad
\rho_2(\mathcal T)^n\ne I\quad(1\leq n<6).
\]

Therefore the six-cycle is not merely a bookkeeping quotient. It is the exact cycle seen by all quadratic real observables of this transport representation.

## 3. Furey and Standard-Model typing

On the channel list \((u,\nu,d,e)\), all sixteen matrix-unit bilinears are fixed by the diagonal central sign. This includes the abstract channel-level forms underlying:

- Higgs-dressed Dirac responses such as \(\nu^c\nu\) and color-contracted \(\sum_a u_a^cu_a\);
- neutral Hermitian two-point kernels;
- the lepton–colour aggregate response matrix;
- quadratic handle/Kraus relationships; and
- candidate stress or current matrices.

Gauge neutrality remains a separate test. A holomorphic product of two charged fields can be central-even while still carrying nonzero hypercharge or color. Central descent never replaces the Standard-Model singlet condition.

## 4. The unequal-character boundary

The cancellation requires both legs to transform with the same central sign. If

\[
Zv=-v,
\qquad
Zw=+w,
\]

then

\[
B(Zv,Zw)=-B(v,w).
\]

Accordingly, a mixed carrier–background term, a fixed Higgs spurion not transported with the matter field, or a bilinear between sectors with unequal central characters can still detect \(-I\).

This is the decisive microscopic audit: determine the central character of every leg, including Higgs and conjugate/dagger structure, before declaring the sign gauge-trivial.

## 5. What has and has not closed

Closed:

- every diagonal even Furey bilinear is insensitive to the common central sign;
- the established coherent \(C_{12}\) transport descends to exact order six on the full symmetric-bilinear space;
- passive idler cancellation is unnecessary for quadratic observables;
- the antiperiodic carrier and periodic Jordan relationship are mutually consistent.

Open:

- whether the response central sign is literally fermion parity, the spin double-cover center, a weak-center action, or only an emergent projective redundancy;
- whether the physical edge bilinear transports both legs equivariantly;
- whether Higgs dressing preserves equal central character after vacuum selection;
- whether any measurable phase-sensitive observable remains odd under the sign.

## 6. Stop-everything and falsification tests

**Equivariant-bilinear trigger:** construct the Furey/Higgs response map \(B:V_F\times V_F\to H_2(\mathbb R)\) and prove \(B(Zv,Zw)=B(v,w)\) with the actual gauge and Lorentz contractions.

**Fermion-parity trigger:** identify the response \(-I\) with \((-1)^F\) or a spin-center action on the microscopic carrier and prove that the physical observable algebra is even.

**Odd-observable falsifier:** exhibit an allowed gauge-neutral measurable operator with only one centrally odd leg.

**Higgs-background falsifier:** the edge uses a fixed Higgs/background leg of opposite or trivial central character, so the completed response remains sign-odd.

**Gauge-overclaim:** central-evenness is used as proof of Standard-Model gauge neutrality without checking the full representation tensor product.

## Verdict

| Question | Verdict |
|---|---|
| Does \(-I\) act nontrivially on the coherent Furey carrier? | **Yes** |
| Does it act on an even bilinear with equally transformed legs? | **No** |
| What is the exact quadratic-observable transport order? | **6** |
| Is passive idler cancellation required for those observables? | **No** |
| Is \(-I\) proved to be a microscopic SM gauge transformation? | **Not yet** |

## Position in the corpus

- [passive-idler cocycle no-go](998_a_passive_idler_dilation_cannot_cancel_the_lossless_placement_cocycle_without_changing_the_observed_edge_map.md)
- [nested coherent/projective/population transport](996_the_graded_sideband_antiunitary_lifts_the_six_cycle_to_a_nested_c12_to_c6_to_c3_transport.md)
- [three relationship rays and quadratic Jordan descent](272_three_relationship_rays_span_the_two_face_jordan_space.md)
- [weak-Weyl central sign on quadratic observables](886_the_weak_weyl_reflection_supplies_the_missing_multiplicity_cycle_reversal_before_higgs_vacuum_selection.md)
- [quadratic color-twirled relationship channel](839_color_twirling_kills_the_linear_handle_but_its_quadratic_relationship_channel_selects_the_unique_symplectic_carrier.md)
