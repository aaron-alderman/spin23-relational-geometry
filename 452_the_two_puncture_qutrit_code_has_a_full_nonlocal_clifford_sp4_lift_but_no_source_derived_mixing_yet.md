# The Two-Puncture Qutrit Code Has a Full Nonlocal Clifford (Sp(4)) Lift but No Source-Derived Mixing Yet

**Date:** 17 October 2026  
**Branches:** B01, B04, B07, B09, B10, B12 and B14  
**Claim status:** exact stabilizer and symplectic-normalizer construction for the \((\nu^c,e^c)\) qutrit code

## 1. Question resolved

The abstract logical phase space of a two-qudit code has automorphism group \(Sp(4,\mathbb F_p)\), while the visible \(S_3\times S_2\) Weyl stabilizer of the \((\nu^c,e^c)\) punctures acts trivially.

Does the actual qutrit stabilizer code nevertheless admit physical Clifford operations realizing the full logical symplectic group?

Yes—if arbitrary encoded, generally nonlocal Clifford operations are allowed.

## 2. Explicit CSS code at (p=3)

Starting from the five charge rows of the sixteen even-parity spinor weights and deleting \(\nu^c\) and \(e^c\), the certificate constructs a length-14 CSS code with

\[
\dim S_X=3,
\qquad
\dim S_Z=9.
\]

Therefore

\[
k=14-3-9=2.
\]

This explicitly realizes the source's \([[14,2,2]]_3\) parameter count.

## 3. Logical symplectic basis

The two puncture-evaluation functionals select two logical \(X\) words. Solving the dual finite-field equations gives logical \(Z\) representatives satisfying

\[
\langle X_i,Z_j\rangle=\delta_{ij},
\qquad
\langle X_i,X_j\rangle
=
\langle Z_i,Z_j\rangle=0.
\]

Thus

\[
(X_1,X_2,Z_1,Z_2)
\]

is an explicit symplectic logical basis inside the 28-dimensional physical Pauli exponent space.

## 4. Physical transvection lift

For any physical Pauli exponent \(v\) commuting with the stabilizer, define

\[
T_v(w)=w+\omega(w,v)v.
\]

This is a symplectic transvection. If \(v\) represents a logical Pauli, then

\[
\omega(s,v)=0
\]

for every stabilizer \(s\), so

\[
T_v(s)=s.
\]

The operation fixes the stabilizer pointwise while inducing the corresponding transvection on logical phase space.

The certificate lifts eight generating logical vectors and verifies for each one:

1. all 12 stabilizers are fixed exactly;
2. the logical basis transforms by the intended \(4\times4\) transvection;
3. the induced generators are those already shown to generate all of \(Sp(4,\mathbb F_3)\).

Hence

\[
\boxed{
Sp(4,\mathbb F_3)
\text{ has a full physical Clifford-normalizer lift on the code.}
}

## 5. Why this is still not the desired derivation

This construction is generic stabilizer-code technology. Given an encoded symplectic basis, logical Clifford transvections can be lifted by multi-qudit Clifford operations. It does not rely on the Standard-Model interpretation of the coordinates.

The chosen representatives have physical supports

\[
7,7,3,4,14,3,9,10
\]

for the eight seed transvections. These weights depend on representative choices and have not been minimized, but they make clear that the exhibited realization is not a uniform one-site transversal action.

Therefore the result establishes **existence in the physical Clifford normalizer**, not:

- locality;
- transversality;
- fault-tolerant low-depth implementation;
- emergence from Furey ternary composition;
- compatibility across all primes through one integral operation;
- a real positive \(Sp(4,\mathbb R)\) response.

## 6. The source-derived transversal gate does not mix the logical pair

The triorthogonal construction supplies a transversal non-Clifford phase that acts as the same inverse phase gate on each removed logical coordinate. It is diagonal and factorized across the two logical qudits.

That operation is important for coding theory but does not by itself generate the relational mixing needed to distinguish a genuine two-port \(Sp(4)\) carrier from two independent one-port phases.

The missing source-derived generator must couple the two logical coordinates or exchange their \(X\) and \(Z\) sectors.

## 7. Revised bridge hierarchy

The finite branch now has four levels:

1. **Kinematics:** \(\mathbb F_3^4\) with symplectic form — exact.
2. **Abstract group:** \(Sp(4,\mathbb F_3)\) — exact.
3. **Generic encoded lift:** full physical Clifford normalizer — exact.
4. **Source-derived, prime-compatible, positive lift:** not established.

Only level 4 would materially connect the code to the continuous \(Spin_0(2,3)\) carrier.

## 8. Branch decision

- **Closed:** explicit \([[14,2,2]]_3\) CSS stabilizer construction.
- **Closed:** explicit logical symplectic basis.
- **Closed:** physical transvection lifts fixing the stabilizer pointwise.
- **Closed:** full logical \(Sp(4,\mathbb F_3)\) is realizable by encoded Clifford operations.
- **Open:** minimal-support and circuit-depth optimization.
- **Open:** transversal or geometrically local generators.
- **Open:** operations selected by the five-bit/Furey/mediator structure.
- **Open:** compatible \(Sp(4,\mathbb Z)\) lift and positive real form.

## 9. Stop-everything and falsification gates

**Stop-everything trigger:** a small source-derived gate set—rather than arbitrary encoding synthesis—generates a Zariski-dense arithmetic subgroup and has a positive transfer interpretation.

**Relational trigger:** one native operation mixes the two puncture coordinates and survives as a two-port response transformation across primes.

**Genericity falsifier:** existence of an encoded Clifford normalizer is presented as special evidence for the Standard Model.

**Transversality falsifier:** a high-support logical-Pauli transvection is described as transversal without a tensor-product decomposition.

**Continuum falsifier:** finite Clifford realizability is claimed to select the noncompact real form without positivity data.

## 10. Certificate

The [qutrit logical-Clifford lift certificate](scripts/verify_two_puncture_qutrit_code_has_nonlocal_clifford_lift_of_full_sp4.mjs) constructs the CSS stabilizers and logical basis, lifts eight symplectic transvections, verifies pointwise stabilizer preservation and records representative physical supports.

## Companion documents

- [Two-puncture finite \(Sp(4)\) shadow](450_two_punctures_produce_an_exact_finite_sp4_shadow_but_do_not_select_the_spin23_real_carrier.md)
- [Two-puncture Weyl action is logical identity](451_the_nu_c_e_c_two_puncture_stabilizer_selects_the_sm_3_plus_2_flag_but_acts_trivially_on_logical_phase_space.md)
- [Jordan-triple to real \(Sp(4)\)](42_jordan_triple_to_sp4r_determination.md)
- [Finite braid congruence shadows](140_braid_congruence_reductions_and_finite_shadows.md)
