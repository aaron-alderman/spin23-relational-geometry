# The minimal dynamical Yukawa–Majorana potential extremizes at permutation alignment, so generic mixing needs extra structure

## Main result

Promoting the charged-lepton and neutrino Yukawa matrices to dynamical bifundamental fields does not by itself close the flavour-selection problem.

Under the full kinetic flavour group

\[
G_F=U(3)_L\times U(3)_e\times U(3)_N,
\]

let

\[
Y_e\mapsto U_LY_eU_e^\dagger,
\qquad
Y_\nu\mapsto U_LY_\nu U_N^\dagger.
\]

Define the left-handed Hermitian tensors

\[
H_e=Y_eY_e^\dagger,
\qquad
H_\nu=Y_\nu Y_\nu^\dagger.
\]

At renormalizable polynomial order, the basic term carrying their relative left-handed orientation is

\[
\kappa\operatorname{Tr}(H_eH_\nu).
\]

For fixed nondegenerate singular values, its extrema occur when the two eigenframes are related by a permutation. Hence the minimal invariant potential predicts trivial/permuted mixing or continuous degeneracy, not a generic PMNS matrix.

A right-handed Majorana field can select reality and align the right-handed neutrino frame, but it does not by itself create a generic noncommuting left-handed pair. Nontrivial mixing requires additional invariants, additional flavons, reduced flavour symmetry, higher-dimensional terms, or radiative dynamics. Each option introduces new structure and coefficients that must be audited.

## 1. Typed dynamical fields

Treat

\[
Y_e\in\operatorname{Hom}(V_e,V_L),
\qquad
Y_\nu\in\operatorname{Hom}(V_N,V_L)
\]

as scalar fields in family space. Their kinetic terms are invariant under

\[
U(3)_L\times U(3)_e\times U(3)_N.

\]

A right-handed Majorana field is a complex symmetric tensor

\[
M_R\in\operatorname{Sym}^2(V_N^*)

\]

transforming by unitary congruence.

The projector \(P\) acts on \(V_L\), so only tensors transported to \(V_L\) can directly appear in its response equation. The simplest are \(H_e\) and \(H_\nu\).

## 2. Renormalizable self-invariants

For one bifundamental \(Y\), the continuous flavour invariants through quartic order include

\[
\operatorname{Tr}(YY^\dagger),
\qquad
\left(\operatorname{Tr}(YY^\dagger)\right)^2,
\qquad
\operatorname{Tr}\!\left((YY^\dagger)^2\right),

\]

along with determinant terms when allowed by the chosen Abelian flavour charges.

These terms determine singular values but are independent of the left and right unitary frames. They cannot generate mixing by themselves.

For two bifundamentals sharing \(V_L\), the basic quartic cross-invariant is

\[
I_{e\nu}=\operatorname{Tr}(H_eH_\nu).

\]

Products such as

\[
\operatorname{Tr}H_e\operatorname{Tr}H_\nu

\]

depend only on spectra and contain no relative-frame information.

## 3. Doubly stochastic reduction

Choose the charged-lepton eigenbasis:

\[
H_e=D_e=\operatorname{diag}(a_1,a_2,a_3),

\]

and write

\[
H_\nu=UD_\nu U^\dagger,
\qquad
D_\nu=\operatorname{diag}(b_1,b_2,b_3).

\]

Then

\[
\begin{aligned}
\operatorname{Tr}(H_eH_\nu)
&=\operatorname{Tr}(D_eUD_\nu U^\dagger)\\
&=\sum_{i,j}a_i b_j|U_{ij}|^2.
\end{aligned}

\]

Define

\[
B_{ij}=|U_{ij}|^2.

\]

Unitarity implies

\[
B_{ij}\ge0,
\qquad
\sum_jB_{ij}=1,
\qquad
\sum_iB_{ij}=1.

\]

Thus \(B\) is doubly stochastic. The cross-invariant is a linear functional on the doubly stochastic polytope:

\[
I_{e\nu}=a^TBb.

\]

## 4. Permutation extrema

The extreme points of the doubly stochastic polytope are permutation matrices. A linear functional reaches its global extrema on extreme points. Therefore

\[
\boxed{
\operatorname{Tr}(H_eH_\nu)
\text{ is extremized when }
|U_{ij}|^2
\text{ is a permutation matrix.}
}

\]

For ordered eigenvalues, the sign of \(\kappa\) determines whether large eigenvalues align with large or small eigenvalues. Either way, the stationary minimum has no generic mixing angles.

If spectra are degenerate, continuous families of orientations remain. Degeneracy produces flat directions, not realistic isolated mixing.

## 5. Consequence for the projector

The same minimal potential may include

\[
V_P
=\kappa_e\|[P,H_e]\|^2
+\kappa_\nu\|[P,H_\nu]\|^2.

\]

If the Yukawa potential first aligns \(H_e\) and \(H_\nu\), they share an eigenframe. Then \(P\) can align with one common eigenline, but the resulting lepton mixing is a permutation matrix.

Thus a minimal dynamical-Yukawa completion can select a projector while simultaneously destroying the observed reason for needing two noncommuting response tensors.

This is a closure tension:

\[
\boxed{
\text{the simplest potential that dynamically fixes the response also makes the response tensors commute.}
}

\]

## 6. Majorana field and right-frame alignment

The Majorana tensor transforms on \(V_N\). Its self-potential can determine Takagi singular values and possibly reduce \(U(3)_N\) to an orthogonal or discrete subgroup.

Mixed invariants such as

\[
\operatorname{Tr}(Y_\nu^\dagger Y_\nu M_R^\dagger M_R)

\]

align the right singular frame of \(Y_\nu\) with the Takagi frame of \(M_R\). After seesaw reduction,

\[
m_\nu=-v^2Y_\nu M_R^{-1}Y_\nu^T,

\]

this can produce nontrivial structure on \(V_L\), particularly when eigenvalue hierarchies and congruence phases are present.

But the Majorana tensor is itself a second dynamical family object. Its potential and mixed couplings determine the result. No unique values or signs follow from the current Jordan/Furey data.

Moreover, a Majorana metric proportional to the identity preserves too much symmetry and selects no axis; a nondegenerate Majorana matrix selects axes only by introducing the desired hierarchy into its own vacuum.

## 7. Ways to evade permutation alignment

### Higher-order mixed invariants

Terms such as

\[
\operatorname{Tr}(H_eH_\nu H_eH_\nu),
\qquad
\operatorname{Tr}([H_e,H_\nu]^\dagger[H_e,H_\nu]),

\]

can alter the relative-frame potential. Their coefficients are independent in ordinary effective field theory.

### Additional flavons

Several bifundamentals or adjoints can frustrate pairwise alignment and produce noncommuting vacua. This increases the field and parameter inventory.

### Reduced flavour symmetry

Majorana reality, discrete family groups, or exceptional incidence can permit invariants forbidden by full \(U(3)^3\). The reduction itself must be derived rather than selected for the desired mixing.

### Radiative vacuum misalignment

Loop corrections can compete with tree-level alignment. A successful model must show a stable noncommuting minimum and radiative closure rather than tune unrelated coefficients.

### Boundary-orientation coupling

A pseudoscalar defect orientation may couple to

\[
i[H_e,H_\nu]

\]

and bias a complex frame. This remains an allowed portal with an underived coefficient.

## 8. Parameter-count warning

Once all symmetry-allowed higher invariants are admitted, a generic noncommuting vacuum can usually be engineered. That is not the same as deriving it.

For closure, the relevant test is not existence but rigidity:

\[
\boxed{
\text{Does one source principle fix the allowed invariants and their relative coefficients?}
}

\]

If coefficients remain independent, the potential merely repackages the observed flavour matrices as vacuum parameters.

## 9. Relation to the scalar-flavon branch

The charge-three scalar \(s\) can remain minimal and derive the BF sector independently of the Yukawa-frame problem. Fixed neutral maps \(K\) then reproduce the effective Yukawa textures.

Promoting \(K\) or the Yukawas to dynamical fields moves from effective topological closure to absolute flavour closure and immediately encounters the permutation-alignment theorem.

This reinforces the programme split:

\[
\begin{aligned}
\text{charge-three/BF descent}&:\quad\text{minimal and coherent},\\
\text{absolute flavour dynamics}&:\quad\text{requires nonminimal structure}.
\end{aligned}

\]

## 10. Scoped no-go

Under all of the following assumptions:

1. full \(U(3)_L\times U(3)_e\times U(3)_N\) covariance;
2. one charged-lepton and one Dirac-neutrino bifundamental;
3. polynomial potential through renormalizable order;
4. no additional generation-sensitive tensor;
5. nondegenerate fixed singular values;

the relative left-handed-frame extrema are permutation alignments.

Therefore:

\[
\boxed{
\text{the minimal dynamical Yukawa model cannot derive generic observed lepton mixing.}
}

\]

The no-go does not exclude nonminimal Majorana/flavon/discrete-family models. It proves that such extra structure is necessary.

## 11. Next branch

The remaining absolute-closure question is whether the existing exceptional/Furey/Jordan programme supplies exactly the additional invariant needed to evade permutation alignment without reopening the full coefficient freedom.

The existing generation-commutant results say no for simple replication. A successful continuation must therefore be genuinely generation-sensitive and must output a noncommuting vacuum rather than merely permit one.

