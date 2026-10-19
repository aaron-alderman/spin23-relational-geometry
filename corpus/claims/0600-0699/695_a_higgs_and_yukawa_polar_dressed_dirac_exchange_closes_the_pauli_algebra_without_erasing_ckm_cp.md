# A Higgs- and Yukawa-Polar-Dressed Dirac Exchange Closes the Pauli Algebra Without Erasing CKM CP

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B05, B06, B07, B08, B11, B13 and the dressed-exchange branch  
**Claim status:** exact broken-phase finite construction away from Higgs zeros and Yukawa rank defects; not yet a fundamental exchange law  
**Certificate:** [verify_higgs_polar_dressed_exchange_preserves_complex_yukawas.mjs](../../../verification/verify/verify_higgs_polar_dressed_exchange_preserves_complex_yukawas.mjs)

## Executive result

A local Higgs-dressed Dirac exchange exists wherever the Higgs field is nonzero. Including the polar unitaries of the Yukawa matrices makes that exchange commute exactly with the full complex mass operator while preserving nonzero CKM-type CP curvature.

Let \(h\) be a normalized Higgs doublet and

\[
\widetilde h=i\sigma_2\bar h.
\]

Then

\[
F_h=(\widetilde h,h)\in U(2)
\]

is a local weak frame. For three families, write the up- and down-type mass matrices in polar form

\[
M_u=U_uP_u,
\qquad
M_d=U_dP_d,
\]

with \(P_u,P_d\ge0\). Define the Higgs–flavor dressing

\[
D_h=
\bigl[\widetilde h\otimes U_u,
      h\otimes U_d\bigr].
\]

This is a unitary map from the two singlet flavor sectors to the weak-doublet flavor sector. The dressed exchange

\[
S_h=
\begin{pmatrix}
0&D_h\\
D_h^\dagger&0
\end{pmatrix}
\]

obeys

\[
S_h^2=I,
\qquad
\{S_h,Z_{\rm chir}\}=0.
\]

For

\[
M=D_h\operatorname{diag}(P_u,P_d),
\qquad
H_M=
\begin{pmatrix}
0&M\\M^\dagger&0
\end{pmatrix},
\]

one has

\[
\boxed{[S_h,H_M]=0.}
\]

The certificate simultaneously realizes a nonzero Jarlskog-type commutator determinant. Exchange covariance therefore does not force Yukawa matrices real and does not erase CKM CP.

## 1. The Higgs supplies the missing representation map

A bare exchange between weak singlets and weak doublets cannot commute with the Standard-Model gauge action because the two faces carry different representations.

A nonzero Higgs field supplies an intertwining direction. The two normalized vectors

\[
h,qquad \widetilde h=i\sigma_2\bar h
\]

are orthonormal and span the weak doublet. They distinguish the down- and up-type channels covariantly.

Under a weak gauge transformation \(g\),

\[
h\mapsto gh,
\qquad
\widetilde h\mapsto g\widetilde h,
\]

so the frame transforms on its left. This is exactly what is needed to map the singlet channel sum into the doublet bundle.

The construction is local wherever \(h^\dagger h\ne0\). It cannot be extended through a Higgs zero without extra patching data.

## 2. Why the Yukawa polar unitaries are necessary

The Higgs frame alone knows which weak component is up-like or down-like. It does not know the complex flavor orientation.

For a general mass matrix, polar decomposition separates

\[
M_f=U_fP_f
\]

into:

- a unitary flavor orientation \(U_f\);
- a positive spectrum \(P_f\).

The exchange must include \(U_f\) to commute with the Hermitian Dirac mass operator. A bare exchange with \(U_u=U_d=I\) fails whenever the actual polar orientations are nontrivial. The certificate verifies this failure explicitly.

The dressed exchange is therefore response dependent. It is adapted to the Yukawa background rather than imposed independently of it.

## 3. Exact Pauli structure

On the doublet/singlet decomposition define

\[
Z_{\rm chir}=
\begin{pmatrix}
-I&0\\0&I
\end{pmatrix}.
\]

Because \(D_h\) is unitary,

\[
S_h^2=I.
\]

Since \(S_h\) is off-diagonal and \(Z_{\rm chir}\) is diagonal,

\[
S_hZ_{\rm chir}=-Z_{\rm chir}S_h.
\]

Thus the Higgs/Yukawa dressing preserves the same topology Pauli algebra found on the discrete sixteen-state generation.

The exchange is no longer gauge blind: its Higgs frame transforms covariantly with the weak bundle.

## 4. Compatibility with complex flavor CP

Choose

\[
U_u=I,
\qquad
U_d=F_3,

\]

where \(F_3\) is the three-dimensional discrete Fourier matrix, and choose nondegenerate positive \(P_u,P_d\). Then

\[
H_u=M_uM_u^\dagger,
\qquad
H_d=M_dM_d^\dagger
\]

have a nonzero imaginary commutator determinant:

\[
\operatorname{Im}\det[H_u,H_d]\ne0.
\]

The same data define \(S_h\) and satisfy \([S_h,H_M]=0\). Therefore:

\[
\boxed{
\text{dressed exchange covariance}
\not\Rightarrow
\text{vanishing flavor CP}.
}
\]

This agrees with the earlier exchange-paired CP analysis: CP orientation can live in the polar unitary and reverse under conjugate exchange without disappearing inside one oriented sector.

## 5. What has and has not been derived

Derived exactly:

1. a gauge-covariant local frame from nonzero Higgs data;
2. a unitary exchange between singlet and doublet channel bundles;
3. closure of the topology Pauli relations;
4. commutation with arbitrary full-rank complex mass matrices after polar dressing;
5. compatibility with a nonzero CKM-type invariant.

Not derived:

1. why the exchange should be constructed from the Yukawa polar factors;
2. a smooth definition through \(h=0\);
3. a canonical polar unitary when a Yukawa matrix has a kernel;
4. covariance of the full unbroken-phase kinetic and gauge action under a dynamical exchange;
5. a microscopic Lindblad or gauge-constraint origin.

## 6. Predictivity boundary

There are two logically different uses of \(S_h\):

### Compatibility construction

Given \(M_u,M_d\), build \(S_h\) from their polar unitaries. Then exchange covariance is automatic and imposes no constraint on CKM parameters.

### Fundamental symmetry

Specify \(S_h\) independently and require \([S_h,H_M]=0\). Then it constrains the Yukawa polar orientations and may become predictive.

The present certificate establishes the first. It must not be advertised as the second.

## 7. Higgs zeros and rank defects

The normalized frame uses

\[
h/\sqrt{h^\dagger h}.
\]

At a Higgs zero it is undefined. Similarly, the polar unitary is nonunique on the kernel of a rank-deficient mass matrix.

These are not removable notational defects. They can carry topology:

- electroweak defects or restoration regions obstruct the Higgs frame;
- massless neutrino modes obstruct a unique exchange on flavor kernels;
- patch transition functions may retain precisely the orientation information lost by the Jordan observable algebra.

The defect branch should therefore be pinned, not regularized away without physical input.

## 8. Stop-everything and falsification criteria

Stop treating the dressed exchange as fundamental if:

1. it can only be defined after inserting the measured Yukawa matrices;
2. no local patching law exists through Higgs zeros;
3. rank-deficient neutrino sectors make physical predictions depend on an arbitrary polar extension;
4. the corresponding exchange of gauge fields is nonlocal or anomalous;
5. an equal physical trace over exchange orientations cancels observed CP-odd quantities.

A stop-everything positive result would derive \(D_h\) from the Furey/Jordan action before Yukawa parameters are chosen and would then constrain the polar unitaries while retaining the observed CKM and PMNS invariants.

## 9. Next gates

1. Construct patch transition functions around Higgs zeros and compute their winding.
2. Classify the exchange ambiguity on Yukawa kernels, especially a massless-neutrino subspace.
3. Test the dressed exchange on the complete gauge kinetic operator, not only the mass block.
4. Ask whether Furey's two Higgs blocks canonically determine \(D_h\) independently of measured Yukawas.
5. Compare the induced orientation bundle with the \(H_2(\mathbb R)\)/\(Spin(2,3)\) response orientation.

## Reproducibility

    node scripts\verify_higgs_polar_dressed_exchange_preserves_complex_yukawas.mjs

## Companion documents

- [Topology parity is the weak center](694_topology_parity_is_the_su2l_center_all_yukawas_are_even_but_dirac_exchange_requires_enlarged_covariance.md)
- [Exchange-paired Yukawas and CP orientation](../0100-0199/164_exchange_paired_yukawas_and_cp_orientation_gate.md)
- [A factor-local selector commutes with the full Yukawa operator](../0200-0299/255_factor_local_selector_commutes_with_full_one_generation_yukawa_operator.md)
- [The full Higgs/Yukawa portal is gauge covariant](../0200-0299/237_full_one_generation_higgs_yukawa_portal_is_gauge_covariant.md)
