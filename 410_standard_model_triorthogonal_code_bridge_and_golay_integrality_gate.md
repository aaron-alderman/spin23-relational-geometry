# The Standard-Model Triorthogonal Code: a New Cubic Bridge and a Golay Integrality Gate

**Date:** 17 October 2026  
**Primary source:** Shiroman Prakash and K. L. Ramya, [“One generation of the Standard Model as a quantum error-correcting code,” arXiv:2610.21879v1](https://arxiv.org/abs/2610.21879v1)  
**Branches:** B03, B09, B10, B11, B12 and B14  
**Claim status:** source theorem plus independent finite checks; relation to Furey/Jordan/\(Spin(2,3)\) is a new candidate bridge, not a result of the paper

## 1. Executive result

This paper supplies a rigorous missing link between four objects already active in the programme:

\[
\boxed{
\text{one chiral generation}
\longleftrightarrow
\text{five-bit spinor weights}
\longrightarrow
\text{cubic anomaly cancellation}
\longleftrightarrow
\text{triorthogonal code}.}
\]

With a right-handed neutrino, the sixteen left-handed Weyl fields of one \(SO(10)\) spinor are the even-parity sign vectors in \(\{\pm1\}^5\). Removing \(\nu^c\) yields a \([[15,1,3]]_p\) triorthogonal code for every prime \(p\). The fifteen observed chiral components are the physical qudits; the removed sterile state is the logical coordinate.

The bridge is mathematically exact. It does **not** show that spacetime is a quantum computer, that Standard-Model dynamics is error correction, or that \(Spin(2,3)\) follows from the code.

## 2. The cubic identity

For Weyl fermions with chirality signs \(c_\ell\) and integer charge vectors \(q_\ell\), define charge words \(x_\ell=q_\ell\cdot t\). The mixed cubic anomaly is

\[
\tau_c(x,y,z)=\sum_\ell c_\ell x_\ell y_\ell z_\ell.
\]

Anomaly cancellation says that this trilinear form vanishes on the charge lattice. Modulo a prime \(p\), the same condition is triorthogonality. The code condition is therefore not an analogy to anomaly cancellation; it is the same cubic equation interpreted over a finite field.

For the sixteen \(SO(10)\) spinor weights \(q\in\{\pm1\}^5\) with an even number of minus signs,

\[
\sum_q q_iq_jq_k=0,
\qquad
\sum_q q_iq_j=16\delta_{ij}.
\]

Our local certificate reconstructs all sixteen weights and verifies both identities exactly.

## 3. Why \(\nu^c\) is special

The empty five-oscillator state has weight \(q(\nu^c)=(1,1,1,1,1)\). Deleting this coordinate gives a one-logical-qudit code. The stabilizers are the symmetries under which the removed field is neutral. For primes \(p\ge5\), these are precisely the Standard Model gauge charges. The logical row may be taken to be \(B-L\), or the \(SO(10)\) charge \(\chi/5\) modulo stabilizers.

The full sixteen-state cubic anomaly vanishes. On the remaining fifteen fields,

\[
\sum\chi^3=10(1)^3+5(-3)^3=-125=-\chi(\nu^c)^3.
\]

The transversal non-Clifford logical phase is therefore the cubic anomaly that the removed sterile state would cancel. This gives an independent and unusually sharp reason that the sterile-neutrino corner is not just a discretionary sixteenth label.

## 4. Distance three and four-fermion relations

The code distance is three. No one or two remaining weights span \(q(\nu^c)\), while three suffice. Consequently a minimum undetectable logical operation is a neutral relation containing \(\nu^c\) and three other fields: a four-fermion charge structure.

The paper identifies 25 minimum supports. Examples include products of Dirac mass bilinears and \(B-L\)-conserving four-fermion combinations. They have the charge structure of operators obtainable by exchange of an \(SO(10)\) \(\mathbf{10}\), but are not automatically Standard Model invariant operators by themselves. Code distance classifies charge relations, not interaction strengths or dynamical generation.

## 5. Qubit and qutrit results

For \(p=2\), raw signs collapse, so the construction uses five sign-bit rows together with the all-one word. Their span is the triply-even Reed–Muller code \(RM(1,4)\). Puncturing the \(\nu^c\) coordinate gives the Bravyi–Kitaev fifteen-qubit code.

For \(p=3\), the authors report a computer-assisted classification:

- no distance-three triorthogonal qutrit code has length below 15;
- every \([[15,1,3]]_3\) triorthogonal code is equivalent to this one;
- its monomial automorphism group is \(S_5\times\mathbb Z_2\).

Our certificate verifies the weight identities, triply-even binary span, removed cubic anomaly, and distance three at \(p=3,5,7,11\). It does not reproduce the exhaustive qutrit classification.

## 6. Doubling and physical chirality

The fifteen-coordinate code is a doubled construction:

- seven right-handed-conjugate fields form one copy;
- their seven Dirac partners form a second copy;
- the neutrino is the seed;
- weak isospin \(2T_{3L}\) is the linking row.

The generation is vectorlike under \(SU(3)_c\times U(1)_{em}\), while its chirality sits in weak isospin. In the programme’s language this is a precise version of “two faces plus a linking relation”: paired electromagnetic/color faces are sewn by one chiral weak row.

That sentence is a structural translation. The paper does not identify the doubling with a Jordan triple, braid, Hopf fiber or \(H_2(\mathbb R)\) carrier.

## 7. Relation to Furey: strong overlap, no identity yet

The overlap is real:

1. Both descriptions use fermionic creation/annihilation or occupation-number language.
2. Furey’s basic \(Cl(6)\) ideal uses three ladder operators and has multiplicities \(1+3+3+1=8\).
3. The \(SO(10)\) spinor here uses five fermionic oscillators; its even Fock sector has dimension 16.
4. The programme independently found a fifteen-dimensional Furey matter TRO whose unique minimal ternary completion is a neutral \(D\to E\) arrow interpreted as \(\nu^c\).
5. It also found that the uncompleted \(8+7\) Yukawa grading forces one neutrino zero mode.

The new theorem therefore corroborates the **location** of the missing state: the sterile-neutrino corner is simultaneously the unique small ternary completion in the present Furey block model, the missing singlet in the fifteen-state Yukawa grading, and the logical coordinate of the triorthogonal anomaly code.

But the five \(SO(10)\) oscillators are not automatically Furey’s three complex-octonionic ladder operators plus her weak construction. An explicit intertwiner preserving charges, chirality, conjugation and the cubic form remains required.

## 8. Do not conflate the cubic forms

The programme has encountered the determinant on \(H_3(\mathbb O)\), polarized exceptional cubics, three-port holonomy, and now the coordinatewise anomaly form \(\tau_c\). They are not the same object merely because they are cubic.

The anomaly form lives on charge words:

\[
\tau_c(x,y,z)=\sum c_\ell x_\ell y_\ell z_\ell.
\]

The exceptional Jordan determinant is a nonassociative cubic norm on \(H_3(\mathbb O)\). A valid bridge must supply a map \(\Phi\) satisfying a polarization identity such as

\[
N_{E_6}(\Phi(x),\Phi(y),\Phi(z))
=\lambda\tau_c(x,y,z)
\]

on a declared integral sublattice or quotient. Without such a map, “both are cubic” is motivation, not evidence.

## 9. The Golay branch receives a precise obstruction

Doubling the fifteen-qutrit code with the ternary Golay code produces a \([[37,1,5]]_3\) code. However, it does **not** lift directly to an anomaly-free integral spectrum with unit coefficients.

An integral \(P\)-lattice obeys

\[
\sum_\ell\mu_\ell s_\ell^2=0.
\]

If all \(\mu_\ell>0\), then \(s=0\). A nontrivial integral lift requires coefficients of both signs, while the ordinary ternary Golay realization uses all coefficients \(+1\).

The arithmetic continuation is therefore no longer “attach Golay.” It is:

> Find a signed integral distance-five \(P\)-lattice with \(|N|=1\), or prove that the relevant exceptional/Leech structure supplies no such polarization.

This is a concrete correction to any assumption that the Golay name alone guarantees compatibility with chiral anomaly data.

## 10. Relation to \(Spin(2,3)\)

The paper does not derive or use the \(Spin_0(2,3)\cong Sp(4,\mathbb R)\) carrier. The plausible bridge is operational: show that stabilizer reduction or code sewing induces a positive two-face response or a physically selected four-real-dimensional symplectic logical phase space.

Merely observing that a logical qudit has a phase space is not enough to select the programme’s \(Sp(4,\mathbb R)\).

## 11. Highest-value new branches

### A. Explicit Furey/code intertwiner

Label the sixteen Furey-completed matter states by the five \(SO(10)\) occupation bits and test whether Furey conjugation, weak action and the unique \(D\to E\) sterile arrow reproduce the code’s stabilizer/logical split.

**Stop-everything result:** the unique ternary completion is forced to be exactly the punctured logical coordinate, with the same cubic form.

### B. Signed Golay \(P\)-lattice search

Search for an integral distance-five \(P\)-lattice with mixed signs and \(|N|=1\). Test exceptional-Jordan and octonionic integral lattices first.

**Stop-everything result:** a canonical exceptional signed polarization lifts the distance-five code to an anomaly-free integral spectrum.

### C. Three-generation nonidentical code sewing

Test whether the programme’s triality-breaking complex doublet supplies inequivalent gluing among three otherwise equivalent generation codes.

**Stop-everything result:** the same structure that permits CKM/PMNS CP violation also fixes a nontrivial code extension or automorphism breaking.

### D. Logical phase to \(Sp(4)\) response

Construct the smallest two-logical-variable or two-port response produced by puncturing or sewing and test whether its positive transfer maps close on a Siegel domain.

**Stop-everything result:** physically selected logical variables produce the same \(H_2(\mathbb R)\) carrier already found by Jordan-triple recursion.

## 12. Falsification gates

- **Cubic-name falsifier:** no identification of anomaly triorthogonality with the exceptional Jordan norm without an explicit norm-preserving map.
- **QECC-ontology falsifier:** no claim that elementary particles are physical qudits undergoing active error correction.
- **Furey falsifier:** shared occupation-number language is not an intertwiner.
- **Sterile falsifier:** the code privileges \(\nu^c\) mathematically but does not prove an accessible propagating right-handed neutrino.
- **Golay falsifier:** ordinary all-positive Golay coefficients fail the integral anomaly lift.
- **Monster falsifier:** the qutrit automorphism result is \(S_5\times\mathbb Z_2\), not the Monster.
- **Spin falsifier:** no \(Spin(2,3)\) conclusion follows until a four-real-dimensional symplectic response is constructed.

## 13. Certificate and source boundary

The [local triorthogonality certificate](scripts/verify_standard_model_generation_triorthogonal_code.mjs) independently checks the sixteen weights, cubic and quadratic identities, triply-even binary span, representative odd-prime distance, and removed \(\chi\)-anomaly.

The paper’s exhaustive qutrit minimality/uniqueness computation is cited rather than reimplemented. Its released code is linked from the [arXiv paper](https://arxiv.org/html/2610.21879v1).

## Companion documents

- [Furey \(Cl(6)\) minimal-ideal baseline](60_furey_cl6_minimal_ideal_encoding.md)
- [Unique right-handed-neutrino TRO completion](167_unique_right_handed_neutrino_tro_completion_and_spin23_tradeoff.md)
- [Fifteen-state Yukawa zero mode](312_the_fifteen_state_yukawa_grading_forces_one_neutrino_zero_mode_per_generation.md)
- [Octonion/Leech exceptional branch](33_octonions_leech_lattice_jordan_branch.md)
- [Braid congruence finite shadows](140_braid_congruence_reductions_and_finite_shadows.md)
- [Exceptional cubic phase split](329_the_exceptional_cubic_phase_splits_dirac_completion_from_majorana_index_breaking.md)
