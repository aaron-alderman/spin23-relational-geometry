# An oriented boundary can select one anomaly-free Furey TRO and retain CP only if an exchange-odd portal exists

**Date:** 20 October 2026  
**Branches:** root gate A5, Furey matter TROs, boundary orientation, chirality, anomalies and flavour CP  
**Claim status:** explicit selector tuple passes all finite algebraic gates at effective-spurion level; microscopic boundary-to-internal portal remains absent

## Result in one sentence

An oriented boundary sign can covariantly select one of the two exchange-related, cyclic-Yukawa-compatible, anomaly-free fifteen-state Furey matter TROs while a complex three-family flavour sector retains a nonzero CP-odd invariant; the construction fails as a fundamental derivation at the first physical bridge because no microscopic exchange-odd operator has yet been derived that couples the spacetime boundary orientation to the internal \(O_1\leftrightarrow R\) neutral-block exchange.

## 1. Everyday picture

Two otherwise identical doors can be built as left-hinged and right-hinged versions. An arrow painted on the corridor tells us which way is “forward,” but the arrow does not choose a door unless the door frame contains a latch that connects corridor orientation to hinge orientation.

Here:

- the corridor arrow is a measured boundary or defect orientation;
- the two hinge choices are the two surviving Furey matter TROs;
- the latch is an exchange-odd portal operator;
- observed CP violation is a handed pattern painted on the selected door.

The corpus has the two doors and can paint either one consistently. It has not yet derived the latch.

## 2. The explicit selector tuple

Write the candidate as

\[
\boxed{(G,D,X,f,V,\operatorname{Stab},\mathcal F)}
\]

with the following entries.

### Group (G)

Take

\[
G=\mathbb Z_2=\{1,g\}.
\]

Its nontrivial element exchanges the two otherwise indistinguishable neutral blocks,

\[
g:O_1\longleftrightarrow R.
\]

### Input data (D)

Use a nonzero measured orientation

\[
\chi\in\{+1,-1\}.
\]

A concrete realization is the sign of a nonzero flux through an oriented defect,

\[
\chi=\operatorname{sgn}(n_\mu j^\mu),
\]

where \(n\) is the declared defect normal and \(j\) is a calibrated current or winding flow. Reversing the boundary orientation sends \(\chi\mapsto-\chi\).

The input also includes the observed complex three-family flavour tensors \(H_u,H_d\). They are retained physical anisotropy data, not claimed to be derived by this selector.

### Candidate output space (X)

The cyclic-Yukawa tournament has already reduced four anomaly-free one-generation TROs to the exchange pair

\[
X=\{T_A,T_B\},
\qquad
g:T_A\longleftrightarrow T_B.
\]

### Selector (f)

Define

\[
f(+1)=T_A,
\qquad
f(-1)=T_B.
\]

It is equivariant:

\[
f(g\chi)=g f(\chi).
\]

This escapes the theorem of document 1221 legitimately. The input is no longer \(G\)-fixed.

### Effective action (V)

Assign the exchange character

\[
\epsilon(T_A)=+1,
\qquad
\epsilon(T_B)=-1

\]

and write

\[
V_{\rm sel}=-\lambda\chi\epsilon(T),
\qquad \lambda>0.
\]

Both \(\chi\) and \(\epsilon\) reverse under \(g\), so their product is invariant. For \(\chi=+1\), \(T_A\) is the unique minimum; for \(\chi=-1\), \(T_B\) is.

This is an admissible effective action. Section 8 identifies why it is not yet a microscopic derivation.

### Stabilizer

For either nonzero \(\chi\),

\[
\operatorname{Stab}_{\mathbb Z_2}(\chi)=\{1\}.
\]

The orientation removes the exchange degeneracy. Because \(\chi\) is a Standard-Model gauge singlet, it need not break

\[
SU(3)_c\times SU(2)_L\times U(1)_Y.
\]

### Falsifier set (\(\mathcal F\))

The construction fails if the orientation cannot be measured and reversed; if reversing it does not exchange the internal topology; if the portal breaks the gauge group; if the selected support is not ternary closed; if any anomaly is nonzero; if CP is forced to zero; or if both exchange partners remain independent same-chirality propagating matter.

## 3. The selected chiral modules

Using `target <- source` notation, the common blocks are

\[
Q:O_2\leftarrow H,
\qquad
u^c:C\leftarrow O_2.
\]

For \(T_A\), choose

\[
d^c:O_1\leftarrow O_2,
\qquad
L:H\leftarrow R,
\qquad
e^c:R\leftarrow C.
\]

For \(T_B\), exchange \(O_1\leftrightarrow R\):

\[
d^c:R\leftarrow O_2,
\qquad
L:H\leftarrow O_1,
\qquad
e^c:O_1\leftarrow C.
\]

Each contains exactly

\[
Q\oplus u^c\oplus d^c\oplus L\oplus e^c

\]

with complex dimension

\[
6+3+3+2+1=15.
\]

The executable certificate verifies directly that both five-block supports close under

\[
XY^\dagger Z.
\]

The exchange maps every block of \(T_A\) to the corresponding block of \(T_B\). No dagger-reverse block is added as an independent same-chirality field.

This construction uses the two solutions already isolated by the cyclic Yukawa rule. The selector does not rescue either complete coarse \(LXR\) eigenspace; document 109 proved those are anomalous and representation-incomplete.

## 4. Exact anomaly audit

Use \(Y_6=6Y\). One selected generation has

\[
\begin{array}{c|c|c}
\text{field}&(SU(3),SU(2))&Y_6\\ \hline
Q&(\mathbf3,\mathbf2)&1\\
u^c&(\bar{\mathbf3},\mathbf1)&-4\\
d^c&(\bar{\mathbf3},\mathbf1)&2\\
L&(\mathbf1,\mathbf2)&-3\\
e^c&(\mathbf1,\mathbf1)&6
\end{array}
\]

The certificate obtains

\[
\begin{aligned}
[SU(3)]^3 &: 2-1-1=0,\\
[SU(3)]^2U(1) &:2-4+2=0,\\
[SU(2)]^2U(1) &:3-3=0,\\
\mathrm{grav}^2U(1) &:6-12+6-6+6=0,\\
U(1)^3 &:6-192+24-54+216=0.
\end{aligned}
\]

There are \(3+1=4\) color-weighted weak doublets, so the global \(SU(2)\) parity also vanishes.

Three replicated generations remain anomaly-free because every anomaly coefficient is already zero generation by generation. Replication is an input to this A5 test; the selector does not derive why nature has three families.

## 5. CP survives because the selector is not a universal reality condition

Take the positive Hermitian flavour data

\[
H_u=\operatorname{diag}(1,4,16),
\qquad
H_d=
\begin{pmatrix}
3&1&-i\\
1&3&1\\
i&1&3
\end{pmatrix}.
\]

The leading principal minors of \(H_d\) are

\[
3,\qquad8,\qquad18,
\]

so \(H_d\) is positive definite. Exact Gaussian-integer arithmetic gives

\[
\det[H_u,H_d]=1080i.
\]

Thus

\[
\mathcal J_{\det}=\operatorname{Im}\det[H_u,H_d]=1080\ne0.
\]

Under the exchange,

\[
\left(T_A,H_u,H_d\right)
\longleftrightarrow
\left(T_B,\bar H_u,\bar H_d\right),
\]

and

\[
\mathcal J_{\det}\longmapsto-\mathcal J_{\det}.
\]

The two boundary orientations therefore carry opposite CP orientation without forcing either Yukawa pair to be real.

The lowest exchange-even correlation is

\[
V_{\rm CP}
=-\kappa\chi\frac{\mathcal J_{\det}}{J_{\rm scale}},
\qquad \kappa>0.
\]

This passes the CP-retention test that killed the universal real selector. It does not derive the magnitude of the CKM phase.

## 6. What the tuple genuinely accomplishes

At effective-spurion level, every requested A5 component now exists:

| Requirement | Result |
|---|---|
| physically interpretable transforming input | signed boundary flux/orientation \(\chi\) |
| declared group action | \(\chi\leftrightarrow-\chi\), \(O_1\leftrightarrow R\) |
| covariant selector | \(f(-\chi)=g f(\chi)\) |
| unique output for fixed input | \(T_A\) or \(T_B\) |
| chiral module | one mirror-free fifteen-state generation, replicated three times |
| ternary closure | exact for both selected supports |
| local anomalies | all zero |
| global weak anomaly | zero |
| nonzero CP invariant | \(\mathcal J_{\det}=\pm1080\) |
| universal-reality problem | avoided; flavour tensors remain complex |

This is more than an abstract list of escape routes. It is one complete finite selector tuple and decision rule. It is not yet a dynamical model because \(\epsilon(T)\) has not been represented by a local path-integral operator.

## 7. What it does not accomplish

The tuple does not derive:

- the existence or magnitude of the physical boundary flux;
- the number of generations;
- the Yukawa matrices or their CP magnitude;
- Lorentz spin and Grassmann statistics;
- the Higgs locking coefficients;
- protection against radiative population of unused blocks;
- the microscopic coupling between boundary and internal exchange.

It also assumes that \(T_B\) is the exchange/conjugate presentation of the alternative orientation, not an additional independent propagating mirror sector. A Fock-space construction must eventually enforce that interpretation.

## 8. Earliest obstruction: the missing latch

The earliest failure is a type mismatch.

The boundary sign \(\chi\) belongs to spacetime or defect geometry. It is a gauge-singlet pseudoscalar after contraction with the oriented flux. The exchange

\[
O_1\longleftrightarrow R

\]

acts on two internal neutral blocks. Nothing in the current action says that reversing the former must exchange the latter.

The term

\[
-\lambda\chi\epsilon(T)

\]

is invariant, but writing an invariant term is not the same as deriving its operator. The symbol \(\epsilon(T)\) must come from a local internal observable.

Therefore:

\[
\boxed{
\text{A5 passes as an effective selector tuple but remains missing as a source-derived physical mechanism.}
}
\]

This is the earliest obstruction. It occurs before anomaly or CP failure; those later gates pass.

## 9. Smallest extra datum

The minimum addition is one exchange-odd portal operator \(B_-\) satisfying

\[
gB_-g^{-1}=-B_-,

\]

with opposite eigenvalues on the two candidate TROs. The microscopic boundary action must contain a derived contraction of the form

\[
S_{\rm portal}\supset
\int_{\partial M}\chi\,B_-.
\]

It must satisfy four tests:

1. \(B_-\) is a gauge and Lorentz scalar after the boundary contraction;
2. its sign on \(T_A,T_B\) is fixed by the block representation rather than assigned afterward;
3. its coefficient follows from boundary orientation, index, winding or measured flux;
4. integrating out the boundary does not restore an equal incoherent sum over both orientations.

If Yukawa orientation is also to be dynamically selected rather than merely retained, \(B_-\) must couple to an exchange-odd dynamical flavour field whose vacuum has nonzero \(\mathcal J_{\det}\). A fixed numerical Yukawa matrix cannot minimize a potential.

This one portal is smaller than adding a new family symmetry, mirror spectrum or universal antiunitary structure.

## 10. Falsification programme

The candidate should be rejected if any of the following occurs:

1. no gauge-invariant local \(B_-\) exists in the microscopic field inventory;
2. every candidate \(B_-\) also breaks color, weak isospin or hypercharge;
3. boundary reversal changes only external response and leaves \(O_1,R\) indistinguishable;
4. radiative closure repopulates the unused block maps as light fields;
5. the Fock construction makes \(T_A\oplus T_B\) two independent same-chirality generations;
6. the portal makes both \(H_u,H_d\) simultaneously real;
7. anomaly inflow is invoked even though the admitted four-dimensional module already fails its intrinsic anomaly test;
8. the sign of CP is inserted independently of the measured boundary orientation.

A positive completion requires an explicit microscopic \(B_-\), its boundary coefficient, the physical-state quantization and a reversible correlation between boundary orientation, selected block topology and CP-odd response.

## Certificate and evidence

[Machine-readable tuple](../../../evidence/data/a5-oriented-boundary-cp-selector-tuple.json) records the complete tuple, module blocks, action, stabilizer, falsifiers and missing portal.

[Executable verifier](../../../verification/verify/verify_a5_oriented_boundary_cp_selector_tuple.mjs) independently verifies:

- exact exchange of \(T_A,T_B\);
- closure of both supports under \(XY^\dagger Z\);
- complex dimension fifteen;
- all five local anomaly cancellations and global weak parity;
- preservation under three-family replication;
- positivity of the explicit flavour matrices;
- \(\det[H_u,H_d]=1080i\) and sign reversal under conjugation;
- selector covariance and unique action minimum.

Companion results:

- `corpus/claims/0100-0199/110_furey_anomaly_free_one_generation_tros.md`
- `corpus/claims/0100-0199/111_furey_cyclic_yukawa_topology_selection.md`
- `corpus/claims/0100-0199/164_exchange_paired_yukawas_and_cp_orientation_gate.md`
- `corpus/claims/1200-1299/1221_symmetric_data_cannot_select_a_nonfixed_orientation_and_a5_requires_a_covariant_selector_input.md`
