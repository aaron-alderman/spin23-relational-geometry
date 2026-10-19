# If the Response Pfaffian Is a BDI Dirac Mass, Then Its Rank-One Wall Binds One Exact Zero Mode, but the Coupling Is Not Yet Derived

**Date:** 18 October 2026  
**Branches:** Pfaffian wall, one-dimensional Dirac operator, BDI symmetry, spectral flow, rank-one Jordan boundary  
**Claim status:** exact conditional continuum witness; no microscopic Standard-Model coupling  
**Certificate:** [verify_the_minimal_bdi_dirac_zero_mode_for_a_response_pfaffian_sign_wall.mjs](scripts/verify_the_minimal_bdi_dirac_zero_mode_for_a_response_pfaffian_sign_wall.mjs)

## Executive result

Document 1047 proved that reversing the oriented response-root sign

\[
\eta=\operatorname{sgn}\det\Psi
\]

forces a crossing of the rank-one Jordan boundary. That topology alone did not prove a bound mode.

There is, however, a minimal CAR-compatible witness. Use the raw Pfaffian coefficient

\[
a(x)=\det\Psi(x)
\]

as the mass of the one-dimensional real chiral Dirac/BdG operator

\[
\boxed{
H=-i\sigma_2\partial_x+a(x)\sigma_1.}
\]

It has

- time-reversal symmetry $T=K$, $T^2=+1$;
- particle-hole symmetry $C=\sigma_3K$, $C^2=+1$;
- chiral symmetry $S=\sigma_3$;
- Altland–Zirnbauer class BDI.

For the wall

\[
a(x)=\tanh x,
\]

there is one exact normalized zero mode,

\[
\boxed{
\psi_0(x)=
\frac{\operatorname{sech}x}{\sqrt2}
\begin{pmatrix}1\\0\end{pmatrix}.}
\]

Thus a response-Pfaffian sign wall can bind a protected mode if the Pfaffian coefficient enters a BDI mass term. The programme has not yet derived that coupling from Furey, Higgs or Standard-Model fields.

## 1. Symmetry class

In position representation,

\[
-i\sigma_2=
\begin{pmatrix}0&-1\\1&0\end{pmatrix}
\]

is real. Therefore $H$ is real when $a(x)$ is real:

\[
KHK^{-1}=H.
\]

Both kinetic and mass matrices anticommute with $\sigma_3$:

\[
\{\sigma_3,-i\sigma_2\}=0,
\qquad
\{\sigma_3,\sigma_1\}=0.
\]

Hence

\[
\sigma_3H\sigma_3=-H.
\]

Combining $K$ with $\sigma_3$ gives particle-hole symmetry

\[
C=\sigma_3K,
\qquad
CHC^{-1}=-H,
\qquad
C^2=+1.
\]

This is the minimal real BDI structure.

## 2. Exact zero mode

At zero energy,

\[
\left(-i\sigma_2\partial_x+a(x)\sigma_1\right)\psi=0.
\]

Multiplication by $i\sigma_2$ gives

\[
\partial_x\psi+a(x)\sigma_3\psi=0.
\]

For the $\sigma_3=+1$ component,

\[
\psi_+(x)
\propto
\exp\left[-\int_0^x a(y)\,dy\right].
\]

With $a(x)=\tanh x$,

\[
\int_0^x\tanh y\,dy=\log\cosh x,
\]

so

\[
\psi_+(x)\propto\operatorname{sech}x.
\]

The other chirality grows as $\cosh x$ and is not normalizable. Since

\[
\int_{-\infty}^{+\infty}\frac12\operatorname{sech}^2x\,dx=1,
\]

the stated mode is normalized and unique in this minimal channel.

## 3. General sign-changing profile

For a continuous real mass with

\[
a(-\infty)<0,
\qquad
a(+\infty)>0,
\]

the same formal solution

\[
\psi_+(x)\propto
\exp\left[-\int_0^x a(y)\,dy\right]
\]

decays at both ends under standard asymptotic-gap assumptions.

Reversing the wall orientation selects the opposite chiral component. The index is therefore controlled by the asymptotic mass signs.

Because

\[
a^2=\det Q,
\]

the mass zero coincides with the rank-one Jordan point established in document 1047.

## 4. What is conditional

The construction assumes a fermionic field $\chi$ with Hamiltonian density

\[
\mathcal H
=
\chi^\dagger
\left(-i\sigma_2\partial_x+a(x)\sigma_1\right)
\chi.
\]

Nothing yet proves that:

- the response-root coefficient $a$ couples linearly to a microscopic fermion;
- the relevant direction is a physical spatial coordinate rather than placement index or frequency;
- BDI time-reversal and chiral symmetries survive electroweak and flavour interactions;
- there is only one copy of the operator;
- interactions preserve the free-fermion index.

This is an existence theorem for the minimal operator that would turn the orientation wall into a protected bound state.

## 5. Relation to Furey and the Standard Model

The candidate mass has favorable structural properties:

- it is the response-root Pfaffian coefficient;
- it is odd under $h\chi$;
- its sign labels the two oriented Gram sheets;
- its zero is the rank-one Jordan boundary;
- the graded antiunitary exchanges its signs.

But $a$ is presently built from aggregate response amplitudes, not a demonstrated local gauge-singlet scalar field. A source-level Furey/Higgs intertwiner must show that a legal fermion bilinear receives the mass $a(x)$.

The complex three-generation Majorana determinant cannot simply replace $a$: without a compatible Real structure it is complex, and the BDI real-mass symmetry is lost.

## 6. Stability and failure modes

The zero is protected while:

- the asymptotic gap remains open;
- the mass remains real;
- chiral or the corresponding BDI index symmetry is preserved;
- an unpaired channel is present.

It can fail if:

- an allowed $\sigma_3$ or identity mass breaks the anticommutation;
- complex CP phases add a second mass component and let the vector rotate around zero;
- two copies couple and gap compatibly after symmetry reduction;
- the reflection signs are gauge rather than distinct asymptotic sectors.

The complex-mass escape is the operator version of document 352's Pfaffian-sign obstruction.

## 7. Stop-everything and falsification tests

**Furey mass trigger:** a gauge-complete Furey/Higgs boundary action produces $a(x)\chi^\dagger\sigma_1\chi$ with $a=\det\Psi$.

**Index trigger:** the physical CAR operator reduces to BDI and its index equals the asymptotic Pfaffian-sign difference.

**Localization trigger:** the seam interval has a rank-one endpoint where a normalizable neutral mode appears.

**CP falsifier:** an allowed complex second mass component connects the two signs without closing the spectral gap. Then the integer/real BDI wall protection is lost or reduced.

**Gauge falsifier:** $\eta=\pm1$ are related by a local gauge transformation. Then they cannot define distinct asymptotic masses.

**Multiplicity warning:** one zero mode in the minimal witness does not predict one new Standard-Model particle; physical copies and interactions must be counted.

## Verdict

| Question | Verdict |
|---|---|
| Does a BDI mass sign wall bind a zero mode? | **Yes** |
| Is the $\tanh x$ solution exact and normalizable? | **Yes** |
| Does its mass zero coincide with the rank-one Jordan boundary? | **Yes** |
| Is the response Pfaffian derived as a microscopic fermion mass? | **No** |
| Is BDI symmetry established for the Standard Model completion? | **No** |
| Is a new particle predicted? | **No** |

## Position in the corpus

- [oriented Gram-root sheets and rank-one wall](1047_fixing_the_phase_symplectic_orientation_reduces_the_gram_root_gauge_to_SO2_and_turns_the_pfaffian_sign_into_a_rank_one_separated_Z2_sheet.md)
- [response-root Pfaffian line](1046_the_oriented_area_is_exactly_the_pfaffian_line_of_the_response_root_but_its_microscopic_weak_higgs_identification_remains_open.md)
- [complex Majorana Pfaffian obstruction](352_the_neutral_majorana_pfaffian_is_det_m_but_cp_makes_it_complex_and_removes_the_sign.md)
- [minimal doubled CAR pairing](1032_doubling_the_carrier_is_the_minimal_two_antiunitary_car_pairing_repair_and_opposite_copy_charge_makes_it_neutral.md)
