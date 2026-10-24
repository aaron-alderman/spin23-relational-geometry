# The distributed A2 shape: an exact cross-corpus identity

**Date:** 24 October 2026  
**Status:** exact representation-level convergence; physical identification remains unselected  
**Parent:** [Finite contextual Casimir experiment](admissibility_08_finite_contextual_casimir_experiment.md)  
**Evidence:** [Cross-corpus identity ledger](../../../evidence/data/admissibility-distributed-a2-shape-v1.json)  
**Verifier:** [Distributed A2 identity certificate](../../../verification/admissibility/verify_distributed_a2_shape_identity.mjs)

## Discovery

The three-site contextual Casimir benchmark reconstructs a matrix that already occurs, under different names, in several independently developed parts of the corpus. Let

\[
J=\begin{pmatrix}1&1&1\\1&1&1\\1&1&1\end{pmatrix},
\qquad
P_0=I-\frac13J,
\qquad
C=3I-J.
\]

Then exactly

\[
\boxed{C=3P_0.}
\]

Here \(P_0\) is the projector from the three-label permutation carrier onto its trace-zero \(A_2\) plane, while \(C\) is the Casimir-like operator obtained from the transposition class sum in the finite admissibility experiment. Thus the experiment's decomposition

\[
\mathbb R^3=\mathbf 1\oplus A_2
\]

is not merely similar to the corpus's recurrent singlet--doublet organization. It is the same standard \(S_3\)-module.

## Four exact appearances

### 1. Contextual admission

Uniform three-site relations have automorphism group \(S_3\). Their class-sum operator is

\[
C=3I-J,
\qquad
\operatorname{spec}(C)=\{0,3,3\}.
\]

The common mode is the singlet and the trace-zero plane is the relational doublet.

### 2. Family-to-placement transport

The established family/placement certificate uses the centered placement projector \(P_0\) and the three family augmentations \(\delta_i=B-3L_i\). Written as one symmetric matrix \(D\), those augmentations obey

\[
D=-3P_0=-C,
\qquad
D^TD=9P_0=3C.
\]

The family orbit and placement orbit are therefore the same \(A_2\) triangle at a fixed scale. Their continuous intertwiner freedom is only scalar, but six label bijections remain.

### 3. Furey incidence and the signed K3 selector

After the established sign conjugation, the Furey triple-incidence response takes the form

\[
M_F=2I+L_{K_3}.
\]

Since the complete-three-vertex Laplacian is

\[
L_{K_3}=3I-J=C,
\]

the selected Furey operator is exactly

\[
M_F=2I+C.
\]

Its spectral gap is the same eigenvalue separation carried by the contextual Casimir. This is an exact operator identity after the declared sign switch, not an identification of the underlying physical systems.

### 4. Typed partial sewing

The causal partial-sewing construction requires the environment

\[
E=\mathbf1_{\rm ref}\oplus A_{2,\rm residual}.
\]

That is precisely the representation decomposition selected by \(P_0\) and detected by \(C\). Its three anisotropic faces form a \(C_3\)-covariant orbit whose sum is isotropic, matching the three-label geometry at representation level.

## Orientation is the missing half of the shape

For a directed three-cycle \(T\), define

\[
K=T-T^T.
\]

The finite certificate gives the stronger identities

\[
K^2=-C,
\qquad
K^TK=C,
\qquad
P_0K=KP_0=K.
\]

Consequently

\[
J_{A_2}=\frac{K}{\sqrt3}
\]

satisfies

\[
J_{A_2}^2=-P_0.
\]

Restricted to the \(A_2\) plane, \(J_{A_2}\) is a normalized complex structure: it chooses an orientation and quarter-turn convention on the relational doublet. Cyclic permutations preserve it; reflections reverse it.

The hierarchy of retained symmetry is therefore exact:

| Admitted data | Stabilizer |
|---|---:|
| metric/projector \(C\) only | \(S_3\) |
| \(C\) plus orientation \(K\) | \(C_3\) |
| \(C\) plus one marked vertex | \(C_2\) |
| \(C\), orientation and a marked vertex | identity |

This supplies a compact local grammar for the corpus's recurring selector problem: a metric fixes the plane, orientation fixes a cyclic order, a mark fixes a basepoint, and both together fix a frame.

## What this finding changes

The shared type shape is now explicit:

\[
\boxed{
\text{three labels}
\;\longrightarrow\;
\mathbf1\oplus A_2
\;\longrightarrow\;
(P_0,C,K)
\;\longrightarrow\;
\text{metric, orientation and basepoint choices}.
}
\]

This is a useful piece of the proposed distributed atlas because it supplies a common coordinate chart across four branches. It also localizes the unresolved datum. The branches do not disagree about the shape of the relational plane; they fail to derive the map choosing which physical labels, sources or ports occupy its vertices and which orientation is realized.

The six-choice family/placement torsor now has a transparent factorization:

\[
|S_3|=6=3\times2,
\]

where the factor three is a basepoint choice and the factor two is an orientation choice. Current generation-blind or unoriented data select neither.

## What this does not establish

The identity does not prove that family labels, Furey channels, partial-sewing ports and contextual sites are the same physical objects. It does not supply:

- a source-native label bijection;
- a dynamical orientation selector;
- a common action or Ward identity;
- a detector map;
- an embedding into \(Spin(2,3)\) with physical meaning;
- or an \(E_8\) closure.

In particular, the occurrence of \(A_2\) inside exceptional root systems is too generic to count as evidence for \(E_8\). The admissible next step is not to name the parent. It is to test whether one provenance-bearing transformation transports \((P_0,C,K)\), including its labels and losses, between two of the established physical carriers.

## Next gate

Construct the smallest source-bearing commuting square

\[
\begin{array}{ccc}
\text{family/source labels} & \xrightarrow{\;\Phi\;} & \text{placement/port labels}\\
\downarrow (P_0,C,K) && \downarrow (P_0,C,K)\\
\text{family response} & \xrightarrow{\;\Phi\;} & \text{measured response}
\end{array}
\]

in which \(\Phi\) is fixed without importing a target label or orientation. Failure would show that the common \(A_2\) module is a universality class reached independently. Success would turn recurrent shape into transported identity.

## Verdict

\[
\boxed{
\text{common local type shape: established},\qquad
\text{physical cross-carrier identity: open},\qquad
\text{exceptional global closure: unlicensed}.
}
\]

