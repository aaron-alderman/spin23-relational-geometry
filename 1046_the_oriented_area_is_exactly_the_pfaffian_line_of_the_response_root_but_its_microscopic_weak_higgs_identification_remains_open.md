# The Oriented Area Is Exactly the Pfaffian Line of the Response Root, but Its Microscopic Weak/Higgs Identification Remains Open

**Date:** 18 October 2026  
**Branches:** response-root Gram map, Pfaffian orientation line, Furey grading, controlled Fourier turn, gauge typing  
**Claim status:** exact response-level Pfaffian identity and covariance; microscopic weak/Higgs identification open  
**Certificate:** [identify_the_response_root_oriented_area_as_the_pfaffian_of_the_pulled_back_phase_form.mjs](scripts/identify_the_response_root_oriented_area_as_the_pfaffian_of_the_pulled_back_phase_form.mjs)

## Executive result

The signed area introduced in document 1045 is not merely analogous to a Pfaffian. It is exactly one.

Write the four-real response root as

\[
\Psi=(u\;v)\in M_2(\mathbb R),
\]

with neutral-Peirce phase symplectic form

\[
J_{\rm phase}=
\begin{pmatrix}0&1\\-1&0\end{pmatrix}.
\]

Pull this form back to the lepton–colour response doublet:

\[
\Omega_\Psi=\Psi^T J_{\rm phase}\Psi.
\]

The two-dimensional determinant identity gives

\[
\boxed{
\Omega_\Psi=(\det\Psi)\,\varepsilon_{LQ}.}
\]

Since the Pfaffian of a $2\times2$ alternating matrix is its upper-right entry,

\[
\boxed{
\operatorname{Pf}(\Omega_\Psi)
=\det\Psi
=u^TJv
=a.}
\]

Thus the oriented area is precisely the coefficient of the canonical alternating tensor on the response doublet. Its square is the Jordan Gram determinant:

\[
a^2=\det(\Psi^T\Psi).
\]

This closes the algebraic Pfaffian-line gate at response-root level. It does not yet prove that this line is the microscopic weak/Higgs Pfaffian of the Furey construction.

## 1. The pullback identity

For every $2\times2$ real matrix $\Psi$,

\[
\Psi^T J\Psi=(\det\Psi)J.
\]

This is the defining covariance of the area form. In the present typing:

- $J_{\rm phase}$ lives on neutral Peirce quadratures;
- $\varepsilon_{LQ}$ lives on the lepton–colour response doublet;
- $\Psi$ is the carrier map between them;
- $a=\det\Psi$ is the coefficient line relating the two alternating forms.

The Gram map

\[
Q=\Psi^T\Psi\in H_2(\mathbb R)_+
\]

forgets the sign of $a$ because

\[
\det Q=(\det\Psi)^2.
\]

The root-to-relationship map is therefore literally the orientation double cover of the positive Jordan cone.

## 2. Exact transformation laws

For a right channel transformation $R$,

\[
\det(\Psi R^T)=\det(R)\det(\Psi).
\]

Consequently:

| Channel operation | Determinant | Action on $a$ |
|---|---:|---:|
| $D=h\chi$ | $-1$ | $a\mapsto-a$ |
| $X$ exchange | $-1$ | $a\mapsto-a$ |
| $\varepsilon=DX$ | $+1$ | $a\mapsto a$ |

This is exactly the odd $h\chi$ parity required of the Pfaffian orientation line in document 938.

The realified graded antiunitary acts on the root matrix as

\[
\Psi\mapsto K_{\rm phase}\Psi\varepsilon_{LQ}^T.
\]

Because $\det K=-1$ and $\det\varepsilon=+1$,

\[
a\mapsto-a.
\]

This does not contradict document 969's statement that the full interface preserves the Pfaffian alternating tensor type. The tensor $\varepsilon$ is preserved under conjugation, while the orientation coefficient of the transported root changes under the phase reflection. Tensor covariance and state-orientation parity are distinct claims.

## 3. Controlled Fourier action

The negative-face controlled turn sends

\[
\Psi=(u\;v)
\longmapsto
\Psi'=(u\;Jv).
\]

For

\[
c=u^Tv,
\qquad
a=u^TJv,
\]

one obtains

\[
c'=a,
\qquad
a'=-c.
\]

Equivalently,

\[
\Psi'^TJ\Psi'=(-c)\varepsilon.
\]

The TKK carrier twist converts the symmetric response correlation into the coefficient of the pulled-back Pfaffian form. The antitwist converts it back.

## 4. Comparison with the earlier Pfaffian branches

The corpus contains three Pfaffian notions that must remain distinguished.

### Response-root Pfaffian

\[
\operatorname{Pf}(\Psi^TJ\Psi)=\det\Psi.
\]

This is real, two-dimensional and exact. It is the orientation line of the Gram-map fiber.

### Weak/Higgs Pfaffian sign

The weak coherent lift is

\[
U_{\rm weak}=\eta_{\rm Pf}\varepsilon.
\]

Its coefficient $\eta_{\rm Pf}=\pm1$ is $h\chi$-odd and can orient the placement cycle. The response-root coefficient $a$ transforms in the same one-dimensional sign representation, so an equivariant identification exists up to a nonzero real scale. A microscopic Furey/Higgs map fixing that scale and normalization has not been derived.

### Three-flavour Majorana Pfaffian

For a complex Majorana mass,

\[
\operatorname{Pf}(M\otimes\varepsilon)=\det M
\]

is generically complex. It has no canonical real sign when CP-violating phase paths are allowed. The real response-root Pfaffian must not be identified with this complex flavour determinant without an additional compatible real structure.

## 5. What has closed

Closed exactly:

- $a$ is the Pfaffian of a canonically defined pulled-back alternating form;
- $a^2$ is the Jordan Gram determinant;
- $a$ is odd under $h\chi$ and channel exchange;
- the root Gram map forgets precisely its sign;
- the controlled Fourier turn rotates symmetric correlation into this Pfaffian coefficient;
- the response-root and weak Pfaffian coefficients carry the same real sign representation.

Still open:

- an explicit microscopic map from the weak/Higgs alternating bilinear to $\Omega_\Psi$;
- normalization of $a$ to a discrete sign away from a fixed-radius or nondegenerate slice;
- treatment of zeros where $\det\Psi=0$ and the orientation line changes sheet;
- compatibility with complex three-generation CP phases;
- gauge-, Lorentz- and CAR-complete locality of the response-root bilinear.

## 6. Stop-everything and falsification tests

**Intertwiner trigger:** the completed Furey/Higgs source map sends its weak alternating tensor to $\Psi^TJ\Psi$. Then the weak Pfaffian sign and response-root orientation are the same line, not merely isomorphic representations.

**Normalization trigger:** the boundary action fixes $|\det\Psi|$ away from zero. Then $\operatorname{sgn}\det\Psi$ becomes a protected discrete seam orientation.

**Zero-mode trigger:** changing the paired-seam chirality forces $\det\Psi$ through zero. Then the orientation sectors are separated by a rank-one Jordan boundary and may support a protected localized mode.

**CP trigger:** a generalized CP/Real structure maps the complex Majorana determinant phase to the real response-root line at invariant loci.

**Falsifier:** $a$ is treated as gauge invariant merely because it is invariant under the emergent response $SL(2,\mathbb R)$. Microscopic gauge invariance is a separate calculation.

**Falsifier:** preservation of the alternating tensor $\varepsilon$ under conjugation is used to claim that every state's coefficient $a$ is even under the antiunitary.

**Falsifier:** the complex three-flavour Majorana Pfaffian is assigned the sign of the real response-root determinant without a physical real structure.

## Verdict

| Question | Verdict |
|---|---|
| Is $a=u^TJv$ exactly a Pfaffian? | **Yes** |
| Pfaffian of what? | **The phase symplectic form pulled back by the response root** |
| Is $a^2$ the Jordan Gram determinant? | **Yes** |
| Does it have the weak Pfaffian's $h\chi$ parity? | **Yes** |
| Are the two Pfaffian lines microscopically identified? | **Not yet** |
| Is it the complex three-flavour Majorana Pfaffian? | **No established identification** |

## Position in the corpus

- [local correlation–area duality](1045_the_paired_twist_interval_is_locally_visible_as_a_quarter_rotation_between_jordan_correlation_and_oriented_area.md)
- [minimal response root and Jordan Gram](1001_the_neutral_furey_peirce_line_times_the_lepton_color_doublet_is_the_minimal_four_real_response_root_and_its_gram_is_the_jordan_carrier.md)
- [weak Pfaffian orientation parity](938_the_weak_pfaffian_sign_has_exactly_the_right_odd_parity_to_pair_with_cycle_orientation_but_the_coupling_is_not_yet_derived.md)
- [graded Pfaffian sideband interface](969_the_graded_sideband_interface_preserves_pfaffian_alignment_and_is_a_quaternionic_antiunitary_with_square_minus_identity.md)
- [complex Majorana Pfaffian boundary](352_the_neutral_majorana_pfaffian_is_det_m_but_cp_makes_it_complex_and_removes_the_sign.md)
