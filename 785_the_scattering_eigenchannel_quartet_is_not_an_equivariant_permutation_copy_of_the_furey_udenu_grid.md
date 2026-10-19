# The Scattering Eigenchannel Quartet Is Not an Equivariant Permutation Copy of the Furey \(u,d,e,\nu\) Grid

## Claim

The four rank-one spectral lines of the selected scattering checkpoint do not carry a permutation representation of either:

- symplectic handle exchange; or
- antiunitary spatial flux reversal.

Moreover, the oriented-color action and handle exchange do not commute with the fully hyperbolic carrier word. Therefore the spectral quartet is not an equivariant relabeling of the Furey \(u,d,e,\nu\) grid.

The coherent scalar-support branch is consequently pinned as a **fixed field-label intertwiner**. A weaker interpretation survives: selector transformations act covariantly on a family of response matrices, while a fixed symmetry-broken response has mixed dynamical eigenchannels.

## 1. Projector-overlap test

Let \(P_i\) be the four rank-one spectral projectors of \(S_0\). For a unitary action \(G\), define

\[
O_{ij}(G)=\operatorname{tr}\left(P_iGP_jG^\dagger\right).
\]

For an antiunitary \(XK\), use

\[
O_{ij}(XK)=\operatorname{tr}\left(P_iX\overline{P_j}X^\dagger\right).
\]

If the action permutes spectral lines, every row and column of \(O\) is one-hot: one entry equals one and the others vanish.

## 2. Handle exchange mixes the lines

For simultaneous exchange of the two handles on both scattering sides, the largest entry in each overlap row is approximately

\[
0.773,quad0.456,quad0.523,quad0.773.
\]

None equals one. The remaining weight is spread over other eigenlines. Handle exchange therefore rotates the checkpoint eigenbasis rather than permuting it.

This is consistent with the nonzero exact carrier commutator

\[
[H,N]\ne0.
\]

The chosen fully hyperbolic word is not handle-exchange invariant even though handle exchange was one of the generators used to build it.

## 3. Flux reversal also mixes the lines

For the antiunitary side-exchange real structure, the row maxima are approximately

\[
0.678,quad0.871,quad0.578,quad0.578.
\]

Again no row is one-hot. Flux reversal is a valid real structure of the transfer family, but it does not give a simple permutation of the positive-frequency eigenchannels of the fixed scattering matrix.

This does not contradict reciprocity. Reciprocity constrains the full scattering matrix by transpose or antiunitary relations; it need not make each nondegenerate eigenline individually real or pairwise permuted in the chosen channel basis.

## 4. Oriented color is not a symmetry of the checkpoint

The exact real-carrier calculation gives

\[
[R,N]\ne0
\]

for the oriented-color generator \(R\) and the fully hyperbolic word \(N\). Thus oriented color maps the response to a different carrier matrix rather than acting internally on the four fixed eigenlines.

The original field grid, by contrast, carries explicit finite permutations such as the color cycle, channel flip and color/lepton flip. An invertible equivariant identification would have to preserve representation type. A continuously mixed projector action cannot be conjugate to a four-label permutation action.

## 5. Branch decision

### Pinned

There is no fixed map

\[
\{u,d,e,\nu\}\longrightarrow\{P_1,P_2,P_3,P_4\}
\]

that intertwines the declared handle, flux and oriented-color transformations as permutations of the spectral lines.

Cardinality four and approximate handle polarization are insufficient.

### Still live

The correct object may be a covariant response family

\[
S(z;\sigma),
\]

where \(\sigma\) denotes Higgs, orientation and sewing spurions. A selector \(g\) then obeys

\[
S(z;g\sigma)=U_gS(z;\sigma)U_g^{-1}
\]

or its antiunitary analogue. Eigenchannels at one fixed \(\sigma\) need not form a representation of the unbroken selector group.

This is the ordinary distinction between covariance of the theory and symmetry of a chosen background.

## 6. Next credible model

Promote the handle-area breaking parameter, mutual shear and boundary orientation to explicit spurions. Construct the orbit of the checkpoint under the selector generators and test:

1. whether the family closes with finitely many spurion types;
2. whether the symmetric point recovers the unique equal-area form;
3. whether typed Furey supports transform covariantly across the family; and
4. whether the broken-phase spectral projectors reproduce the calculated overlap matrices.

This replaces an impossible fixed intertwiner with a testable bundle of eigenchannels over parameter space.

## 7. Stop conditions

- Do not label the four fixed eigenlines \(u,d,e,\nu\) by number alone.
- Do not call a generator used in a word a symmetry of the resulting word without checking its commutator.
- Do not confuse reciprocity of the full matrix with permutation of its eigenvectors.
- Pin the entire coherent-support branch if no finite typed spurion family closes under the selector actions.

## 8. Executable certificate

```powershell
node scripts/test_handle_exchange_flux_reversal_and_oriented_color_on_scattering_eigenprojector_lines.mjs
```

The certificate constructs the spectral projectors, computes both unitary and antiunitary overlap matrices, rejects every permutation test and verifies the real-carrier commutators.

## Companion documents

- [Relational scattering eigenchannel participation](784_all_four_scattering_eigenchannels_are_rank_one_relational_superpositions_touching_both_handles_and_both_boundary_sides.md)
- [Sewn Furey handle-exchange typing obstruction](767_the_sewn_furey_ribbon_has_untyped_handle_exchange_but_no_standard_model_typed_exchange_between_c_and_d.md)
- [Physical color/code-carrier equivariance no-go](763_the_physical_color_cycle_acts_trivially_on_two_puncture_code_logicals_but_unipotently_on_the_arithmetic_carrier_so_no_equivariant_identification_exists.md)
