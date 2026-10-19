# The Response Selector and the CAR Adjoint Are Two Distinct Antiunitaries

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B06, B08 and B11  
**Claim status:** exact self-dual-CAR degree count and gauge-equivariance distinction; a common source intertwiner for both antiunitaries remains open

## 1. Why this distinction is now mandatory

The recent population-normal construction established an exact survivor-pair response selector:

\[
\Theta_{\rm sel}(v_A,v_B)
=(\bar v_B,\bar v_A).
\]

It fixes the positive \(J_z\cong H_2(\mathbb R)\) Gram carrier. But the two survivor TROs carry the same chiral Standard-Model representations. Consequently \(\Theta_{\rm sel}\) cannot by itself be the CAR adjoint of charged fermion fields.

Two antiunitaries must be kept separate.

## 2. Selector exchange

On the completed neutral survivor pair,

\[
\boxed{\Theta_{\rm sel}=sK_0,}
\]

where \(s\) swaps the two survivor labels and \(K_0\) conjugates coefficients.

Its physical job is to impose

\[
\Theta_{\rm sel}:
\begin{pmatrix}a&c\\\bar c&b\end{pmatrix}
\mapsto
\begin{pmatrix}b&c\\\bar c&a\end{pmatrix},
\]

so the fixed response has \(a=b\). It selects the population-normal Jordan carrier and preserves the charged complex relationship plane.

For a charged one-particle state, however, coefficient conjugation reverses the gauge phase while the target survivor still carries the original charge. Unless the charge vanishes, this does not commute with the local gauge action.

## 3. Nambu/CAR conjugation

Let \(K\) be the one-generation chiral one-particle space with gauge/Lorentz representation \(R\). The self-dual CAR space is

\[
\mathcal K=K\oplus\overline K
\]

with

\[
\boxed{
\Gamma_{\rm CAR}(v,\bar w)
=(w,\bar v),
\qquad
\Gamma_{\rm CAR}^2=1.}
\]

The gauge action is

\[
U(g)=\rho_R(g)\oplus\overline{\rho_R(g)},
\]

and

\[
[U(g),\Gamma_{\rm CAR}]=0.
\]

Furey’s source-derived complex conjugation \(C_F\) reverses gauge representation and Lorentz chirality. Conditionally combining it with neutral exchange gives

\[
\Gamma_{\rm CAR}=sC_F.
\]

This—not bare survivor exchange—is the candidate fermionic adjoint.

## 4. Exact independent-degree count

Choose a basis projection \(P\) onto \(K\subset\mathcal K\) satisfying

\[
P+\Gamma_{\rm CAR}P\Gamma_{\rm CAR}=I,
\qquad
P\Gamma_{\rm CAR}P=0.
\]

For one Furey generation,

\[
\dim_{\mathbb C}K=15,
\qquad
\dim_{\mathbb C}\mathcal K=30.
\]

The independent annihilation operators are the 15 modes in \(PK\). The complementary 15 modes are their adjoints through

\[
B(F)^*=B(\Gamma_{\rm CAR}F).
\]

The finite-mode Fock dimension is therefore

\[
2^{15},
\]

not \(2^{30}\). If both halves were independently quantized, the dimension would instead be \(2^{30}\), signaling genuine doubling.

## 5. Mirror criterion

The conjugate half is not a mirror when all of the following hold:

1. it carries the conjugate gauge and Lorentz representation;
2. \(\Gamma_{\rm CAR}\) identifies its field operators with adjoints;
3. a basis projection chooses only one independent annihilation subspace;
4. anomaly counting is performed on that chiral subspace only;
5. the Hamiltonian/Bogoliubov dynamics preserves the self-dual CAR condition.

It is an independent mirror if it has independent annihilation operators or retains the same chiral gauge action without an adjoint relation.

Real-dimension equality alone decides none of these points.

## 6. How both antiunitaries can coexist

The required architecture is

\[
\begin{array}{ll}
\Theta_{\rm sel}:&\text{acts on survivor response labels and fixes }J_z;\\
\Gamma_{\rm CAR}:&\text{acts on particle/adjoint polarization and fixes the CAR reality.}
\end{array}
\]

Their domains and jobs differ. A full synthesis needs a common completed carrier on which:

- both are isometries;
- their commutator or graded commutator is specified;
- gauge and Lorentz generators have the correct parity under each;
- the Gram compression is \(\Theta_{\rm sel}\)-equivariant;
- the Fock Hamiltonian is \(\Gamma_{\rm CAR}\)-self-dual;
- complex structure \(\mathcal J\) supports CP without creating an independent population polarization.

## 7. Consequence for the recent Furey–\(Spin(2,3)\) bridge

The positive survivor Gram and population-normal \(H_2(\mathbb R)\) results remain valid. They are response-level statements and do not require \(\Theta_{\rm sel}\) to be the CAR adjoint.

What must be withdrawn is the stronger shortcut

\[
\text{survivor exchange}
\stackrel{\text{wrong}}{=}
\text{fermion adjoint}.
\]

The correct chain is

\[
\text{Furey response exchange}
\to J_z^+
\to Spin(2,3),
\]

in parallel with

\[
\text{Furey gauge/Lorentz conjugation}
\to\text{self-dual CAR}
\to\text{one independent chiral generation}.
\]

The missing common intertwiner is now sharply specified.

## 8. Stop-everything and falsification gates

**Stop-everything trigger:** one completed Furey module carries both \(\Theta_{\rm sel}\) and \(\Gamma_{\rm CAR}\), with a compatible basis projection, Gram compression, chiral kinetic operator and nonzero CP invariant.

**No-mirror trigger:** the CAR basis projection has rank 15 and the complementary support is provably the adjoint algebra, not an independent field set.

**Gauge falsifier:** same-charge survivor exchange is used as an ordinary gauge-equivariant CAR involution.

**Counting falsifier:** 30 complex self-dual carrier coordinates are counted as 30 independent annihilation modes despite the CAR reality relation.

**Mirror falsifier:** both survivor supports retain independent creation/annihilation generators with the same chiral gauge action.

## 9. Certificate

The [selector-exchange versus Nambu-CAR certificate](scripts/verify_selector_exchange_vs_nambu_car_adjoint.mjs) checks gauge equivariance for the conjugate action, failure for same-charge exchange, the rank-15 basis projection and the \(2^{15}\) versus \(2^{30}\) Fock count.

## Companion documents

- [Exchange-fixed CAR gauge-equivariance obstruction](165_exchange_fixed_car_gauge_equivariance_obstruction.md)
- [Furey conjugation supplies the Nambu map](166_furey_complex_conjugation_repairs_nambu_but_not_neutral_exchange.md)
- [Furey exchange and population-normal carrier](303_furey_survivor_exchange_induces_the_charge_compatible_population_normal_real_form.md)
- [Exchange-fixed positive Gram compression](304_exchange_fixed_survivor_amplitudes_compress_to_a_positive_h2r_spectral_carrier.md)
