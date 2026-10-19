# The Raw Furey TRO Product Fails the Second Kantor Identity While Its Structurable Linking Product Passes

## Claim status

Exhaustive finite-basis theorem on the exact completed Furey matter TRO. The direct Kantor branch is closed by an explicit counterexample. The natural structurable-linking branch passes both defining identities and remains open for five-graded Lie closure and orientation detection.

## 1. Why this test is necessary

The oriented product

\[
(x,y,z)_{\rm TRO}=xy^*z
\]

retains the order of its outer entries. Its Jordan symmetrization

\[
\{x,y,z\}_{J}
=\frac12(xy^*z+zy^*x)
\]

forgets that order. It was therefore plausible that the programme was passing too early from a richer Kantor object to a Jordan observable shadow.

Plausibility is not enough. A Kantor triple system must satisfy two independent identities. The second is exactly what creates the nonzero \(\mathfrak g_{\pm2}\) layers of its associated five-grading.

The convention used here is

\[
L(x,y)z=(x,y,z),
\qquad
K(x,y)z=(x,z,y)-(y,z,x),
\]

with identities

\[
[L(u,v),L(x,y)]
=L((u,v,x),y)-L(x,(v,u,y)),
\]

and

\[
K(K(u,v)x,y)
=K(u,v)L(x,y)+L(y,x)K(u,v).
\]

These are the standard Kantor identities; see the primary account of the structurable correspondence in [Elduque–Kamiya–Okubo](https://arxiv.org/abs/1205.2489) and the associated five-graded construction in [Palmkvist](https://arxiv.org/abs/math/0504544).

## 2. Exact completed matter basis

The certificate uses the already established decomposition

\[
\mathcal T_F
=M_{3,2}\oplus M_{2,3}\oplus M_{2,1}\oplus M_{1,2},
\]

with complex dimension

\[
6+6+2+2=16.
\]

On matrix units in one rectangle,

\[
E_{ij}E_{kl}^*E_{mn}
=\delta_{jl}\delta_{km}E_{in},
\]

and products between different direct-sum components vanish. No inferred octonionic or exceptional multiplication is added.

## 3. Direct raw-product verdict

The first Kantor identity passes all

\[
16^5=1{,}048{,}576
\]

ordered matrix-unit cases. This is the associative ternary derivation law already expected of a TRO.

The second identity fails. The first certificate counterexample is

\[
u=E^{Q}_{00},
\quad
v=E^{Q}_{01},
\quad
x=y=z=E^{Q}_{00}.
\]

Thus

\[
\boxed{(mathcal T_F,xy^*z)\text{ is not a Kantor triple system}.}
\]

The raw outer-order defect operators have span rank \(32\), but that does not rescue the construction: without the second identity they cannot be declared the \(\mathfrak g_{\pm2}\) layers of an associated Kantor Lie algebra.

This closes the strongest proposed branch. The existence of a nonzero order defect is not sufficient; its coherence law fails.

## 4. Natural structurable-linking replacement

The TRO has a canonical associative dagger-closed linking algebra. Every associative algebra with involution is structurable, and its canonical Kantor product is

\[
V_{x,y}z
=(x y^*)z+(z y^*)x-(z x^*)y.
\]

Restricting this product to the off-diagonal Furey TRO corner remains closed. The certificate tests

\[
(x,y,z)_{\rm str}
=xy^*z+zy^*x-zx^*y
\]

on the same sixteen basis elements.

Both Kantor identities pass all \(1{,}048{,}576\) cases independently. Therefore

\[
\boxed{(mathcal T_F,(xyz)_{\rm str})\text{ is a Kantor triple system}.}
\]

Its \(K(x,y)\)-operator span has dimension

\[
\boxed{5}. 
\]

The associated five-grading therefore has potentially nonzero \(\mathfrak g_{\pm2}\) layers. Their closure and interpretation must be computed rather than guessed to be exceptional.

Because dagger is conjugate-linear, the certificate also repeats the structurable audit on the full real basis \(\{E_{ij},iE_{ij}\}\), component by component. All 499,712 cases pass for each identity. The subsequent closure is worked out in [the full complex and real-slice five-grading theorem](831_the_structurable_furey_five_grading_is_classical_and_spin23_appears_only_on_the_real_lepton_slice.md).

## 5. The structurable product is not merely the old Jordan triple

For the raw TRO product, outer symmetrization is exactly the established Hermitian Jordan triple:

\[
\frac12\bigl((xyz)_{\rm TRO}+(zyx)_{\rm TRO}\bigr)
=\frac12(xy^*z+zy^*x).
\]

All \(16^3=4096\) basis triples verify this identity.

The structurable product behaves differently. Its outer symmetrization agrees with the old Jordan triple on \(3940\) basis triples but disagrees on \(156\). The first mismatch is

\[
x=E^Q_{00},
\qquad y=E^Q_{00},
\qquad z=E^Q_{01}.
\]

Hence the following shortcut is false:

\[
\text{structurable Kantor product}
\xrightarrow{\text{outer symmetrize}}
\text{existing TRO Jordan product}.
\]

The old Jordan observable is the symmetrization of the **raw** ordered TRO product, not of the corrected structurable Kantor product.

## 6. Current branch graph

\[
\begin{array}{c}
xy^*z\\
\swarrow\hspace{2cm}\searrow\\
\text{outer symmetrize}\quad\text{test Kantor identities}\\
\downarrow\hspace{2.6cm}\downarrow\ \text{fails identity 2}\\
\text{known Jordan triple}\quad\text{direct five-grading closed}\\[4pt]
\text{linking algebra with }*\\
\downarrow\\
xy^*z+zy^*x-zx^*y\\
\downarrow\ \text{both identities pass}\\
\text{genuine Kantor branch with }\dim K=5.
\end{array}
\]

## 7. What must be tested next

The valid branch now has bounded obligations:

1. construct the associated \(5\)-grading explicitly;
2. compute \(\dim\mathfrak g_i\) and full commutator closure;
3. identify the resulting Lie algebra component by component;
4. determine whether \(K(x,y)\) detects the established orientation-odd Walsh phase;
5. decide whether the construction adds an invariant or merely repackages the known linking algebra;
6. exhibit the precise projection, if any, recovering the \(H_2(\mathbb R)\to\mathfrak{sp}(4,\mathbb R)\) response face.

No exceptional label is permitted before these checks.

## 8. Stop-everything and falsification criteria

- **Direct branch falsifier:** the displayed second-identity counterexample; triggered.
- **Structurable identity falsifier:** any basis failure; none found.
- **Five-grading stop:** \(\mathfrak g_{\pm2}=0\); not triggered because \(\dim K=5\).
- **Novelty stop:** full closure is only the standard classical linking algebra and the \(K\)-layer detects no orientation invariant.
- **Jordan-shadow success:** an explicit invariant-preserving projection maps the five-grading to the established \(H_2(\mathbb R)\) three-grading.
- **Orientation success:** the sign or phase measured in documents 800/802/822 appears gauge-invariantly in a \(K\)-operator or \(\mathfrak g_{\pm2}\) bracket.
- **Stop-everything signal:** the same nonzero Kantor defect both selects the physical orientation and reduces to the observed \(Spin(2,3)\) response carrier.

## 9. Executable certificate

    node verification/test/test_the_completed_furey_tro_unsymmetrized_product_against_the_kantor_identities.mjs

The certificate performs two separate exhaustive \(16^5\) identity audits for each product, computes both \(K\)-operator spans, verifies raw outer symmetrization on all \(16^3\) triples, and counts the structurable/Jordan mismatches.

## Companion documents

- [Furey orientation as an exact TRO](../0100-0199/108_furey_oriented_bimodule_ternary_closure.md)
- [Dirac face exchange reverses TRO outer order](../0400-0499/414_dirac_doubling_is_an_internal_weyl_face_exchange_while_charge_conjugation_requires_the_opposite_spinor.md)
- [Hermitian reduction loses oriented information](../0600-0699/690_dirac_face_exchange_becomes_the_cp_topology_real_structure_only_on_hermitian_observables.md)
- [Completed matter TRO ideal no-go](811_the_completed_furey_matter_tro_has_no_proper_four_channel_ternary_quotient_so_the_bridge_must_use_higgs_dressed_pairing.md)
