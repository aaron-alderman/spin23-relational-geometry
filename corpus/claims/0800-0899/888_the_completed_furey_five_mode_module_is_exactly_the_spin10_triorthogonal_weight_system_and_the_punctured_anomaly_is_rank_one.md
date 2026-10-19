# The Completed Furey Five-Mode Module Is Exactly the \(Spin(10)\) Triorthogonal Weight System, and the Punctured Anomaly Is Rank One

**Date:** 17 October 2026  
**Branches:** Furey completion, five-mode Fock space, \(Spin(10)\) weights, anomaly cubic, weak Weyl reflection, and code puncturing  
**Claim status:** exact representation-level intertwiner; source division-algebra product and response-tensor identification remain open  
**Certificate:** [intertwine_the_completed_furey_fock_module_with_the_spin10_triorthogonal_code.mjs](../../../verification/intertwine/intertwine_the_completed_furey_fock_module_with_the_spin10_triorthogonal_code.mjs)  
**External input:** [Prakash–Ramya, arXiv:2610.21879v1](https://arxiv.org/abs/2610.21879v1)

## Executive result

The principal open gate in document 887 closes positively at the completed-module level.

The sixteen named states already used in the Furey/TRO corpus are the even part of a five-mode fermionic Fock space. If \(N_i\in\{0,1\}\) is occupation of mode \(i\), define

\[
\boxed{q_i=1-2N_i.}
\]

Then the resulting five-sign vectors reproduce all sixteen entries of Prakash and Ramya’s ordered \(Spin(10)\) weight table exactly, particle by particle. The map preserves

\[
T_{3L},\quad T_{3R},\quad B-L,\quad Y,\quad Q_{\rm em},
\]

and intertwines the color and weak root actions because both are the same fermionic bilinears \(a_i^\dagger a_j\) on the same even Fock space.

This is stronger than a coincidence of state counts:

\[
\boxed{
\mathcal F^{\rm even}_5\text{ in the completed Furey module}
\cong
\mathbf{16}_{\rm spin}\text{ used by the Standard-Model code}
}
\]

as a labelled Standard-Model weight representation.

The anomaly pullback is also unexpectedly simple. On the full generation it vanishes identically. After removing \(\nu^c\), its tensor is

\[
\boxed{
\tau^{\rm punct}_{ijk}=-1=-a_i a_j a_k,
\qquad
a=(1,1,1,1,1).
}
\]

Thus the entire residual cubic anomaly of the punctured code is a symmetric tensor of rank one: the cube of the missing all-plus weight.

## 1. The exact state map

Let an occupation set \(O\subset\{1,2,3,4,5\}\) have even cardinality. The completed Furey particle dictionary is

\[
\begin{array}{c|c}
O & \text{field}\\ \hline
\varnothing & \nu^c\\
\{i,5\},\ i\le3 & u_i\\
\{i,4\},\ i\le3 & d_i\\
\{1,2,3\}\setminus\{i\} & u_i^c\\
\{4,5\} & e^c\\
\{1,2,3,4,5\}\setminus\{i\},\ i\le3 & d_i^c\\
\{1,2,3,5\} & \nu\\
\{1,2,3,4\} & e.
\end{array}
\]

Assign a minus sign to an occupied mode and a plus sign to an unoccupied mode. Then, for example,

\[
u_1:\{1,5\}\mapsto(-,+,+,+,-),
\]

\[
d_1^c:\{2,3,4,5\}\mapsto(+,-,-,-,-),
\]

and

\[
\nu^c:\varnothing\mapsto(+,+,+,+,+).
\]

These are exactly the published \(Spin(10)\) weights. The certificate checks all sixteen rows, not only representative families.

## 2. Charge preservation

With modes \(1,2,3\) designated as color and modes \(4,5\) as weak, the charges are

\[
T_{3L}=\frac{q_4-q_5}{4},
\qquad
T_{3R}=\frac{q_4+q_5}{4},
\]

\[
B-L=\frac{q_1+q_2+q_3}{3},
\qquad
Y=\frac12(B-L)-T_{3R},
\]

\[
Q_{\rm em}=T_{3L}+Y.
\]

Substituting \(q_i=1-2N_i\) produces the conventional charges for every named state. In particular,

\[
Q=(u,d):(B-L,Y)=\left(\frac13,\frac16\right),
\]

\[
u^c:\left(-\frac13,-\frac23\right),
\qquad
d^c:\left(-\frac13,\frac13\right),
\]

and

\[
L=(\nu,e):(-1,-\tfrac12).
\]

The intertwiner from the corpus ordering to the paper’s ordering is therefore just a permutation matrix \(P\). There is no nontrivial rescaling, complex change of basis or charge relabelling.

## 3. Lie-action intertwining

The completed-module certificate of document 618 already used

\[
E_{ij}=a_i^\dagger a_j

\]

for the color roots \(E_{12},E_{21},E_{23},E_{32}\) and weak roots \(E_{45},E_{54}\), together with the five number operators.

The \(Spin(10)\) weight construction uses those same five oscillators. Hence

\[
P\rho_{\rm Furey}(E_{ij})
=
\rho_{\rm code}(E_{ij})P
\]

and

\[
P\rho_{\rm Furey}(N_i)
=
\rho_{\rm code}(N_i)P.
\]

The label-and-charge match is therefore a representation intertwiner, not merely a bijection of particles.

## 4. Pullback of the cubic anomaly

On the five Cartan charge directions define diagonal operators

\[
Q_i=I-2N_i.
\]

The polarized anomaly tensor on the full even Fock module is

\[
\tau_{ijk}
=
\operatorname{Tr}_{\mathcal F^{\rm even}_5}(Q_iQ_jQ_k).
\]

Direct enumeration gives

\[
\boxed{\tau_{ijk}=0\quad\text{for all }i,j,k.}
\]

Equivalently, for any three Cartan directions \(r,s,t\in\mathbb R^5\),

\[
\operatorname{Tr}\bigl(Q(r)Q(s)Q(t)\bigr)=0.
\]

This is precisely the integral triorthogonality of the generation.

After puncturing the vacuum state \(\nu^c\), whose charge vector is \(a=(1,1,1,1,1)\),

\[
\tau^{\rm punct}(r,s,t)
=-(a\cdot r)(a\cdot s)(a\cdot t).
\]

Therefore

\[
\boxed{
\tau^{\rm punct}=-a^{\otimes3}.
}
\]

The logical cubic gate is the rank-one residue of the removed vacuum weight.

## 5. A new “singular versus relational” interpretation

This gives a precise instance of a recurring theme in the programme:

- the complete relational population cancels the cubic obstruction exactly;
- removing one singular state leaves a pure rank-one cubic residue;
- the missing state becomes the logical degree of freedom;
- restoring it closes the consistency equation.

Symbolically,

\[
\text{complete relation}=0,
\qquad
\text{punctured relation}=-\text{singular}^{\otimes3}.
\]

This is not yet a dynamical claim. It is an exact identity on the charge lattice.

## 6. Weak reflection inside the Furey module

Swapping weak modes

\[
N_4\leftrightarrow N_5
\]

is the same as

\[
q_4\leftrightarrow q_5.
\]

On named Furey states it acts as

\[
u_i\leftrightarrow d_i,
\qquad
\nu\leftrightarrow e,
\]

while fixing

\[
u_i^c,d_i^c,e^c,\nu^c.
\]

Thus document 886’s multiplicity reflection is not only an abstract action on three response labels. It extends to the complete sixteen-state Furey/Fock representation and agrees with the code’s weak Weyl automorphism.

At the endpoint level it exchanges the two weak endpoints \(H_4\leftrightarrow H_5\). Whether that endpoint exchange is canonical in the original nested division-algebra presentation, rather than only in its completed Fock realization, remains a source-level question.

## 7. Exact boundary with the Jordan/Furey response triple

The anomaly tensor and the middle response are now available on the same completed particle space, but they are not tensors of the same type:

\[
\tau:\mathfrak h^{\otimes3}\to\mathbb R
\]

is a symmetric scalar trilinear form on Cartan charge directions, whereas

\[
\mathcal B(A,X,Z)=A\widetilde XZ+Z\widetilde XA
\]

is an operator-valued ternary response on TRO arrows. Its canonical selector arises only after the quadratic contraction

\[
q_{\rm mid}(X)=\sum_{A,Z}\|\mathcal B(A,X,Z)\|^2.
\]

Accordingly,

\[
\boxed{
\tau\ne\mathcal B
\quad\text{as presently typed.}
}
\]

The meaningful next question is whether a canonical charge insertion or trace turns \(\mathcal B\) into \(\tau\), or whether both descend from a larger cubic/Jordan norm through different contractions.

## 8. Consequences for the research graph

### Closed positively

- identical sixteen labelled weights;
- identical five-mode occupation basis;
- identical Standard Model charges;
- identical color and weak root representation at completed-module level;
- exact weak Weyl action across the whole generation;
- exact anomaly-cubic pullback to Furey number operators.

### Still open

- equality or functorial relation between the source division-algebra product and the \(Spin(10)\) Clifford product;
- a contraction of the Furey/Jordan response triple producing the anomaly cubic;
- extension from the discrete code lattice to the four-real symplectic carrier;
- Higgs-vacuum treatment of the weak reflection;
- a physically admissible mixed-sign Golay lift.

## 9. Stop-everything and falsification criteria

**Source-algebra trigger:** the map \(q_i=1-2N_i\) extends to an explicit algebra homomorphism intertwining Furey’s division-algebra ladder operators with the five \(Spin(10)\) Clifford oscillators.

**Cubic trigger:** a canonical scalar contraction of \(\mathcal B\) equals \(\tau\) on all Cartan insertions.

**Jordan trigger:** the rank-one punctured cubic \(-a^{\otimes3}\) is obtained as the restriction of a named Jordan determinant along an explicitly embedded line and its polarization agrees on the full charge subspace.

**Carrier trigger:** the logical/stabilizer quotient canonically yields the four-real representation on which the already-derived \(Sp(4,\mathbb R)\) acts.

**Negative trigger:** the source-algebra map preserves the weight module but fails multiplication or conjugation. Then the code connection remains exact representation theory but is not an algebra-level unification.

**Falsifier:** treating the anomaly cubic and the middle-slot frame as identical merely because both originate in ternary expressions.

## 10. Verdict

The Furey and Standard-Model-code descriptions share an exact representation-theoretic core:

\[
\boxed{
\text{completed Furey matter module}
=
\text{even five-oscillator }Spin(10)\text{ module}
}
\]

up to ordering of basis states.

The puncture adds a second exact result:

\[
\boxed{
\text{residual anomaly after removing }\nu^c
=
-\bigl(q(\nu^c)\bigr)^{\otimes3}.
}
\]

The next frontier is no longer identification of the states. It is identification—or rigorous separation—of the products and cubic tensors acting on those states.

## 11. Dependencies

- [Prakash–Ramya code synthesis](887_prakash_ramya_standard_model_code_places_the_project_cubic_form_weak_reflection_and_golay_boundary_on_one_exact_lattice.md)
- [weak Weyl multiplicity reflection](886_the_weak_weyl_reflection_supplies_the_missing_multiplicity_cycle_reversal_before_higgs_vacuum_selection.md)
- [completed Furey exchange intertwiner](../0600-0699/618_the_neutral_furey_exchange_intertwines_the_completed_standard_model_module.md)
- [middle-slot response frame](878_the_basis_independent_middle_slot_frame_of_the_furey_triple_selects_the_same_signed_k3_active_module.md)

