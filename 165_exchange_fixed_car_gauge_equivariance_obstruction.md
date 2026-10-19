# The Survivor Exchange Is Not by Itself a Gauge-Equivariant CAR Adjoint

**Date:** 17 October 2026  
**Branches:** B03, B06 and B11  
**Claim status:** exact gauge-equivariance obstruction; CP-twisted and conjugate-Nambu repairs classified

## 1. Why real dimension counting was insufficient

The fixed space of the exchange antiunitary on

\[
\mathcal M_A\oplus\mathcal M_B
\]

has the same real dimension as one complex fifteen-dimensional generation. That showed that doubling is not forced at the level of vector spaces.

It did not show that the second survivor can be interpreted as the adjoints of the first. A CAR adjoint must transform in the conjugate gauge and Lorentz representation.

This additional condition fails for the bare survivor exchange.

## 2. The one-line \(U(1)\) obstruction

Let a charged one-particle state transform as

\[
\rho_y(\theta)v=e^{iy\theta}v.
\]

For an anti-linear map \(J\),

\[
J\rho_y(\theta)v
=e^{-iy\theta}Jv.
\]

If the target carries the **same** charge \(y\), ordinary gauge equivariance would require

\[
e^{-iy\theta}Jv=e^{iy\theta}Jv
\]

for every \(\theta\). This is possible only for \(y=0\).

Both surviving Furey TROs contain the same five charged representation types:

\[
Q_{1/6},\quad u^c_{-2/3},\quad d^c_{1/3},
\quad L_{-1/2},\quad e^c_{1}.
\]

The neutral-label swap changes none of these hypercharges. Therefore an anti-linear exchange

\[
J_{AB}:\mathcal M_A\to\mathcal M_B
\]

cannot commute with the ordinary \(U(1)_Y\) action on any of the five sectors.

This already rules out the bare exchange as a gauge-equivariant CAR conjugation.

## 3. What a self-dual CAR construction actually requires

Let \(K\) be a one-particle Hilbert space. The self-dual or Nambu presentation uses

\[
\mathcal K=K\oplus\overline K
\]

with an antiunitary involution

\[
\Gamma(v,\overline w)=(w,\overline v)
\]

and field operators satisfying

\[
B(F)^*=B(\Gamma F).
\]

If \(K\) carries \(\rho(g)\), the second summand must carry \(\overline{\rho(g)}\). Then

\[
U(g)=\rho(g)\oplus\overline{\rho(g)}
\]

commutes with \(\Gamma\), and the second half supplies adjoints rather than independent mirror generators.

The Furey survivor pair instead supplies

\[
\mathcal M_A\oplus\mathcal M_B
\simeq R_{\rm SM}\oplus R_{\rm SM}
\]

at the block-representation level, not

\[
R_{\rm SM}\oplus\overline{R_{\rm SM}}.
\]

Hence the incidence exchange alone does not furnish the required self-dual CAR data.

## 4. Two possible repairs—and their meanings

### 4.1 Conjugate-Nambu reassignment

Declare that the \(B\) support carries the conjugate gauge action:

\[
\rho_B(g):=\overline{\rho_A(g)}.
\]

Then the exchange antiunitary is gauge equivariant and the fixed CAR algebra has one independent set of complex annihilation generators.

But this changes the representation action originally assigned by the Furey block commutator. It is an added particle/antiparticle polarization, not a consequence of neutral incidence.

### 4.2 CP-twisted exchange

Keep the same nominal representation on both supports but let the antiunitary cover the charge-conjugation automorphism of the gauge group:

\[
\alpha:
(g_3,g_2,e^{i\theta})
\mapsto
(\overline g_3,\overline g_2,e^{-i\theta}).
\]

Then

\[
J_{AB}\rho(g)=\rho(\alpha(g))J_{AB}.
\]

This is a legitimate CP-like or charge-conjugation symmetry condition. It is not the statement that \(J_{AB}\) commutes with local gauge transformations, and it is not by itself the CAR adjoint relation.

The distinction matters: an exact CP-twisted exchange can relate two physical sectors, whereas the CAR adjoint is part of the operator algebra and does not create a second sector.

## 5. Lorentz chirality adds the same requirement

The adjoint of a left-handed Weyl field transforms in the conjugate Lorentz representation. The present TRO inventory contains internal gauge blocks only; it has not supplied the required

\[
(\tfrac12,0)\longleftrightarrow(0,\tfrac12)
\]

map. Therefore even the conjugate-Nambu repair must be tensored with an explicit Lorentz charge-conjugation structure before it becomes a physical Fock construction.

## 6. Consequence for the CP branch

The previous exact result

\[
\mathcal J_B=-\mathcal J_A
\]

now has a sharper interpretation:

- under a true Nambu adjoint construction, it is conjugate bookkeeping and does not produce a second generation;
- under the unmodified Furey survivor action, it is a CP-twisted relation between two same-spectrum supports;
- if both supports are independently quantized and exchange symmetry is exact, the visible unoriented CP-odd invariant cancels;
- selecting one support becomes a real physical symmetry-breaking step.

## 7. Branch decision

The original optimistic path—identify \(\mathcal M_B\) directly with adjoints of \(\mathcal M_A\)—is closed.

The live alternatives are:

1. derive an additional conjugate gauge/Lorentz action from the full Clifford/Furey construction and build a genuine self-dual CAR algebra;
2. treat the survivor exchange as a CP-like outer symmetry and derive its breaking or boundary selection;
3. discard the exchange as physical and use the native real-form distinction to select one TRO.

## 8. Stop-everything and falsification gates

**Stop-everything positive:** the full endomorphic model supplies a canonical grading in which one survivor support carries \(R_{\rm SM}\), the other carries \(\overline{R_{\rm SM}}\), and the same involution exchanges Lorentz chirality, preserves the CAR form and produces the correct anomaly count.

**CP success:** a CP-twisted exchange is spontaneously or causally oriented by the same variable that selects the external \(H_2(\mathbb R)\) slice, leaving one observed sign of the Jarlskog invariant.

**Mirror failure:** both supports retain the same chiral gauge action and independent CAR generators; then the construction predicts a mirror generation.

**Gauge failure:** no extension of the exchange is compatible with local gauge covariance and the Higgs/Yukawa coin structure.

## 9. Certificate

The [CAR gauge-equivariance certificate](scripts/verify_exchange_car_gauge_obstruction.mjs) checks the hypercharge obstruction for all five matter sectors, verifies that conjugate-Nambu charges repair ordinary equivariance, and verifies that same-charge supports work only with the inversion automorphism of \(U(1)\).

## Companion documents

- [Exchange-paired Yukawas and the CP-orientation gate](164_exchange_paired_yukawas_and_cp_orientation_gate.md)
- [Dagger closure: antiparticles versus mirrors](151_dagger_antiparticle_vs_mirror_distinction.md)
- [Furey survivor-exchange antiunitary](162_furey_survivor_exchange_antiunitary_candidate.md)
- [Furey real-form obstruction and carrier escape](163_furey_real_form_obstruction_and_complex_carrier_escape.md)

