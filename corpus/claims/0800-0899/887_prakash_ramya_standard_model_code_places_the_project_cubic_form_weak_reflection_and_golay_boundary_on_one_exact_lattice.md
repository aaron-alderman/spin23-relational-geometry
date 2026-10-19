# The Prakash–Ramya Standard-Model Code Places the Project’s Cubic Form, Weak Reflection, and Golay Boundary on One Exact Lattice

**Date:** 17 October 2026  
**Source:** Shiroman Prakash and K. L. Ramya, *One generation of the Standard Model as a quantum error-correcting code*, arXiv:2610.21879v1 (15 October 2026)  
**Branches:** Furey five-mode labels, cubic anomaly form, weak Weyl reflection, quantum codes, Golay/Leech boundary, and Jordan-triple programme  
**Claim status:** paper results distinguished from new project-level deductions and conjectural bridges  
**Certificate:** [verify_the_standard_model_triorthogonal_code_and_weak_weyl_bridge.mjs](../../../verification/verify/verify_the_standard_model_triorthogonal_code_and_weak_weyl_bridge.mjs)  
**Primary sources:** [arXiv abstract](https://arxiv.org/abs/2610.21879v1), [full HTML](https://arxiv.org/html/2610.21879v1), [authors’ reproducibility repository](https://github.com/spdei/standard-model-code)

## Executive result

This paper is not merely thematically adjacent. It independently packages four objects already active in this programme into one exact construction:

\[
\boxed{
\text{five fermionic modes}
\longrightarrow
Spin(10)\text{ chiral }\mathbf{16}
\longrightarrow
\text{cubic anomaly form}
\longrightarrow
[[15,1,3]]_p\text{ triorthogonal code}.
}
\]

Its sharpest consequences for this project are:

1. the five-bit matter labelling used around Furey’s construction has a precise coding-theoretic meaning;
2. anomaly cancellation is literally the vanishing of a polarized cubic form on the charge lattice;
3. the weak-weight transposition \(q_4\leftrightarrow q_5\) is an exact automorphism fixing the removed \(\nu^c\), and is exactly the multiplicity-cycle reflection found in document 886;
4. the code’s doubling decomposition says all chirality resides in the weak-isospin linking row;
5. ternary Golay doubling produces a valid distance-five code but cannot directly lift to an anomaly-free integral spectrum with all-positive unit coefficients.

The paper does **not** prove that its anomaly cubic is the exceptional Jordan determinant, that the code is a dynamical spacetime substrate, or that its distance-three relations are identical to our signed \(K_3\) response triangle. Those are now sharply formulable comparison problems.

## 1. The construction proved in the paper

The sixteen left-handed Weyl fermions of a Standard Model generation completed by \(\nu^c\) are the chiral spinor of \(Spin(10)\). They are labelled by

\[
q=(q_1,\dots,q_5)\in\{\pm1\}^5
\]

with an even number of minus signs. Equivalently, they are the even-occupation states of five fermionic oscillators.

For charge vectors \(x,y,z\) indexed by fermions, define

\[
\tau_c(x,y,z)=\sum_\ell c_\ell x_\ell y_\ell z_\ell,
\]

where \(c_\ell\) is chirality. In the all-left-handed convention \(c_\ell=1\).

The paper proves that cancellation of all cubic and mixed gauge anomalies is exactly

\[
\tau_c|_\Lambda=0
\]

on the integral charge lattice \(\Lambda\). Reducing this lattice modulo any prime \(p\) gives a triorthogonal space.

Removing the gauge-singlet weight

\[
\nu^c=(1,1,1,1,1)
\]

punctures the sixteen-coordinate space and yields

\[
\boxed{[[15,1,3]]_p}
\]

for every prime \(p\). At \(p=2\) this is the Bravyi–Kitaev fifteen-qubit code; at odd primes it is the corresponding qudit construction. The removed \(\nu^c\) is the logical qudit. Gauge charges neutral on \(\nu^c\) are stabilizers. The remaining \(SO(10)\) charge, representable by \(B-L\) or \(\chi/5\), is the logical operation.

## 2. Executable reconstruction

The local certificate independently enumerates the sixteen even-parity sign vectors and verifies all \(5^3=125\) components

\[
\sum_q q_iq_jq_k=0.
\]

After deleting \(\nu^c\), each component becomes \(-1\), exactly the negative contribution of the removed all-plus weight. Thus the logical cubic phase is not metaphorically related to the missing fermion: it is the anomaly that fermion would cancel.

The certificate also verifies the explicit distance-three relation highlighted in the paper,

\[
\boxed{
\nu^c=e^c+u^c_1-d^c_1.
}
\]

This makes the minimal logical support a four-fermion neutral relation after the removed state is restored.

## 3. Direct Furey connection: five modes, not just five bits

**Subsequent resolution:** document 888 constructs the intertwiner explicitly. On the completed module it is \(q_i=1-2N_i\), followed only by a basis permutation, and it matches all sixteen published weights and all Standard Model charges. What remains open is the stronger source-product intertwiner, not the representation-level map.

Furey’s programme reconstructs one generation using fermionic ladder-operator structures built from division algebras and Clifford minimal ideals. The present paper uses the standard \(Spin(10)\) realization of the same one-generation counting: five fermionic oscillators, restricted to even occupation.

That gives a concrete comparison target:

\[
\text{Furey CAR basis}
\stackrel{?}{\longrightarrow}
\text{the paper’s five oscillator occupations}
\stackrel{}{longrightarrow}
\{\pm1\}_{\rm even}^5.
\]

The safe claim is representational: both constructions organize a generation through a five-mode fermionic Fock structure.

The open theorem is stronger: exhibit an explicit intertwiner from the completed Furey module used in this corpus to the paper’s ordered \(Spin(10)\) weight table, preserving color, weak isospin, hypercharge, conjugation and the cubic anomaly tensor.

If that intertwiner exists, the Furey particle dictionary acquires a canonical integral lattice and a family of reductions modulo every prime.

## 4. The weak reflection is now independently anchored

The paper chooses oscillators \(1,2,3\) as color and \(4,5\) as weak, with

\[
T_{3L}=\frac{q_4-q_5}{4}.
\]

The transposition

\[
r_L:q_4\leftrightarrow q_5

\]

fixes \(\nu^c\), preserves the even-parity weight set and reverses \(T_{3L}\). It swaps the two members of each weak doublet and fixes weak singlets.

This is exactly the reduced action required in document 886:

\[
(u,d,-u^c)\mapsto(d,u,-u^c).
\]

Moreover, the paper proves that the qutrit code has automorphism group

\[
S_5\times\mathbb Z_2,
\]

where \(S_5\) permutes the five oscillators and is the stabilizer of \(\nu^c\) in the \(Spin(10)\) Weyl group. Therefore \(q_4\leftrightarrow q_5\) is not an invented graph symmetry: it is a full code automorphism inherited from the Weyl group.

This strengthens document 886 at the unbroken weight/code level. The Higgs-vacuum qualification remains unchanged.

## 5. Doubling makes the weak row structurally special

The paper decomposes the fifteen-qudit code by “doubling” a seven-qudit \(P\)-code:

- one copy contains \(u^c,d^c,e^c\) and their color components;
- the second contains their Dirac partners \(u,d,e\);
- \(\nu\) is the seed while \(\nu^c\) is the removed logical coordinate;
- paired stabilizers span the vectorlike \(SU(3)_c\times U(1)_{\rm em}\) charges;
- the linking row is \(2T_{3L}\).

In the authors’ words, the generation is vectorlike under color and electromagnetism, while all its chirality resides in weak isospin. Algebraically, the two halves cancel their cubic residues except for the chiral linking structure.

For our programme this is a high-value structural clue. It says the weak reflection and the Dirac-pairing involution should be treated as separate operations:

\[
\text{Dirac pairing} \neq \text{weak cycle reversal},
\]

but the weak row is precisely what links the paired copies into a chiral whole.

That is compatible with the separation already found between Furey conjugation, neutral survivor exchange and multiplicity reflection.

## 6. Cubic form: exact bridge and exact boundary

The project has repeatedly suspected that “the cubic norm keeps everything locally consistent.” This paper gives a rigorous version of that sentence in one domain:

\[
\boxed{
\text{the polarized cubic anomaly vanishes on every triple of allowed charge directions.}
}
\]

This is a local consistency condition for a chiral gauge theory, and modulo \(p\) it is exactly the condition enabling a transversal non-Clifford logical gate.

But the form used here is

\[
\tau_c(x,y,z)=\sum_\ell c_\ell x_\ell y_\ell z_\ell,
\]

the diagonal coordinatewise cubic polarization. It is not automatically:

- the determinant on \(H_3(\mathbb O)\);
- the generic norm of a Jordan algebra;
- the Jordan triple product \(\{A,X,B\}\);
- the signed \(K_3\) mismatch Gram of documents 877–886.

The research question is now exact: can the anomaly lattice be embedded into a cubic Jordan system so that \(\tau_c\) is the restriction or polarization of its norm? Dimension counting or shared use of the word “cubic” is not enough.

## 7. The distance-three triangle: resonance without identification

The paper’s primitive logical relation

\[
\nu^c=e^c+u^c_1-d^c_1

\]

is a signed three-column dependency. Our Furey response closure

\[
d^c=u+d-u^c

\]

is also a signed three-input closure.

Both produce a distinguished vector as a signed combination of three matter labels. But their typings differ:

- the code relation lives in the five-dimensional \(Spin(10)\) charge lattice and defines a minimum logical operator;
- the Furey relation lives in the reduced response/multiplicity parameterization and controls a pulled-back Gram;
- the particle labels are different;
- neither relation has yet been derived from the other.

This is an unusually concrete comparison problem: enumerate the 25 minimum logical supports from the paper and test whether any orbit projects, through the explicit Furey intertwiner, to the signed multiplicity incidence frame.

## 8. Golay and Leech: a valuable no-go

The paper notes that doubling the fifteen-qutrit code with the ternary Golay code gives a

\[
[[37,1,5]]_3

\]

code. This is a real Golay bridge, but it comes with a sharp obstruction.

An integral \(P\)-lattice used in anomaly-free doubling must satisfy a quadratic condition of the form

\[
\sum_\ell \mu_\ell s_\ell^2=0.

\]

If all \(\mu_\ell>0\), this forces \(s=0\). The ternary Golay code uses all coefficients \(+1\), so this doubling does **not** lift directly to an anomaly-free integral fermion spectrum with those unit coefficients.

This matters for the programme’s Golay/Leech branch:

\[
\boxed{
\text{coding-theoretic extension exists}
\not\Rightarrow
\text{physical anomaly-lattice lift exists}.
}

The required missing object is an integral, indefinite-sign \(P\)-lattice—specifically the paper asks for distance five with \(|N|=1\)—not the ordinary positive-coefficient ternary Golay code by itself.

This does not kill a Leech/Golay route. It tells us what any viable route must change: signs, integrality data, or the meaning of the physical lift.

## 9. What this does and does not say about \(Spin(2,3)\)

The paper is built from \(Spin(10)\), not \(Spin(2,3)\). It supplies no theorem that the code’s logical qudit, automorphism group or cubic form reduces to \(Sp(4,\mathbb R)\cong Spin_0(2,3)\).

Its value for the \(Spin(2,3)\) goal is architectural:

1. it turns the matter spectrum into an exact cubic code/lattice;
2. it isolates the weak linking direction;
3. it supplies a canonical reflection reversing that direction;
4. it distinguishes discrete consistency data from continuous phase-space geometry.

A disciplined synthesis would seek an action of the Jordan-triple-derived \(Sp(4,\mathbb R)\) on a continuous carrier whose admissible matter boundary data are this triorthogonal lattice. That would make \(Spin(2,3)\) the carrier/interface group and the code the finite consistency condition. Nothing in the paper yet proves that coupling.

## 10. Highest-value next computations

### A. Explicit Furey–Spin(10) intertwiner

Map every completed Furey basis state to the paper’s five-sign table and verify all Standard Model charges. This is now the shortest path from “same five modes” to a theorem.

### B. Pull back the anomaly cubic

Express \(\tau_c\) in the Furey ladder-operator basis, then compare its polarization with the middle-slot Jordan/Furey response tensor. Equality, factorization or an irreducible mismatch would each be decisive.

### C. Enumerate minimum logical supports

Reproduce the 25 weight-three logical supports and classify their orbits under the weak transposition, color Weyl group and Furey conjugation. Test for the signed-triangle frame.

### D. Higgs-dressed code covariance

Add a Higgs spurion to the weak linking row and determine exactly how the \(q_4\leftrightarrow q_5\) automorphism survives or breaks after vacuum choice.

### E. Indefinite Golay replacement

Search for the distance-five integral \(P\)-lattice with mixed signs and \(|N|=1\) required for a genuine anomaly-free lift. This is the honest gateway from the Standard Model code toward the Golay/Leech branch.

### F. Continuous carrier coupling

Ask whether the code stabilizer/logical split defines a polarization, boundary condition or discrete quotient of a four-real-dimensional symplectic carrier. This is where \(Sp(4,\mathbb R)\) may enter; it should not be inserted earlier by analogy.

## 11. Stop-everything criteria

**Intertwiner trigger:** the full Furey basis is exactly the five-oscillator \(Spin(10)\) basis with all charges and conjugations preserved.

**Cubic trigger:** the pulled-back anomaly tensor is the restriction of a specific Jordan cubic norm, with an explicit embedding and polarization identity.

**Triangle trigger:** one orbit of minimum logical supports maps to the canonical middle-slot signed incidence frame.

**Carrier trigger:** the stabilizer/logical decomposition canonically yields a four-dimensional symplectic phase space with automorphism \(Sp(4,\mathbb R)\).

**Golay trigger:** a mixed-sign integral distance-five \(P\)-lattice with \(|N|=1\) is found and admits a physically typed anomaly-free spectrum.

**Negative trigger:** the Furey-to-weight map preserves particles but the anomaly cubic and response cubic lie in inequivalent invariant-tensor spaces.

## 12. Verdict

This paper gives the project a rigorous new backbone:

\[
\boxed{
\text{one generation}
=
\text{an integral triorthogonal lattice whose puncture is a universal }[[15,1,3]]_p\text{ code}.
}
\]

It also confirms that the weak Weyl reflection isolated from our signed triangle is a natural full-spectrum automorphism before Higgs-vacuum selection.

The strongest synthesis is therefore not “the Standard Model is literally a quantum computer.” It is:

\[
\boxed{
\text{anomaly cancellation, chiral matter organization and transversal cubic phase share one exact arithmetic structure.}
}

That structure is now ready to be compared—not conflated—with the project’s Jordan cubic, Furey response tensor, Golay/Leech branch and \(Spin(2,3)\) carrier.

## 13. Dependencies

- [weak Weyl reflection on the signed triangle](886_the_weak_weyl_reflection_supplies_the_missing_multiplicity_cycle_reversal_before_higgs_vacuum_selection.md)
- [canonical middle-slot frame](878_the_basis_independent_middle_slot_frame_of_the_furey_triple_selects_the_same_signed_k3_active_module.md)
- [signed \(K_3\) selector](877_equal_furey_triple_incidence_weights_and_cycle_closure_force_the_signed_k3_selector_and_isolate_the_exact_yukawa_obstruction.md)
- [Golay/Leech research branch](../0000-0099/33_octonions_leech_lattice_jordan_branch.md)
- [Jordan-triple to \(Sp(4,\mathbb R)\) determination](../0000-0099/42_jordan_triple_to_sp4r_determination.md)

