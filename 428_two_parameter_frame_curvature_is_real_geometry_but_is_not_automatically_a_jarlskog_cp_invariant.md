# Two-Parameter Frame Curvature Is Real Geometry but Is Not Automatically a Jarlskog CP Invariant

**Date:** 17 October 2026  
**Branches:** B02, B03, B06, B08 and B11  
**Claim status:** exact perturbative curvature theorem and explicit CP-real counterexample to a naive curvature–CP identification

## 1. The next invariant exists

Consider a nondegenerate Hermitian family

\[
L(x,y)=\Lambda+xX+yY+O(x^2,xy,y^2),
\]

with \(X=X^\dagger\), \(Y=Y^\dagger\), and

\[
\Lambda=\operatorname{diag}(\lambda_1,\lambda_2,\lambda_3).
\]

For the \(i\)-th eigenline, the Berry curvature at the origin is

\[
\boxed{
F^{(i)}_{xy}
=2\,\operatorname{Im}
\sum_{j\ne i}
\frac{X_{ij}Y_{ji}}
{(\lambda_i-\lambda_j)^2}
}
\]

up to the overall orientation/sign convention for the Berry connection.

Unlike one-parameter running, this two-form can be nonzero and is invariant under rephasing of the local eigenvector.

## 2. Curvature does not by itself mean CP violation

Take \(\Lambda\) and \(X\) to be real symmetric, so the entire starting flavor data admit ordinary complex conjugation as a CP real structure. Define a second Hermitian tangent

\[
Y=i[\Lambda,X].
\]

Since \([\Lambda,X]\) is real antisymmetric, \(Y\) is Hermitian. Then

\[
X_{ij}Y_{ji}
=i(\lambda_j-\lambda_i)|X_{ij}|^2,
\]

and generically

\[
F^{(i)}_{xy}\ne0.
\]

Nevertheless, the Jarlskog-type commutator cubic of the real pair vanishes:

\[
\operatorname{Im}\operatorname{Tr}[\Lambda,X]^3=0.
\]

Thus

\[
\boxed{
\text{nonzero eigenframe curvature}
\centernot\Longrightarrow
\text{flavor CP violation}.
}
\]

The second tangent \(Y=i[\Lambda,X]\) itself uses the ambient complex structure. The curvature detects the geometry of the chosen parameter surface, not automatically an antiunitary-odd observable of the underlying theory.

## 3. The actual commutator-cubic CP invariant

For two Hermitian flavor matrices

\[
H_u=Y_uY_u^\dagger,
\qquad
H_d=Y_dY_d^\dagger,
\]

a standard CP-odd polynomial is

\[
\mathcal J_{\rm alg}
=\operatorname{Im}\operatorname{Tr}[H_u,H_d]^3.
\]

For three nondegenerate generations it is proportional to the ordinary Jarlskog invariant times products of mass-squared differences. It:

- is invariant under simultaneous flavor-basis conjugation;
- changes sign under coefficient-wise complex conjugation;
- vanishes when the pair can be made simultaneously CP-real;
- requires the three-generation cyclic phase information absent from a generic single eigenline curvature.

The certificate evaluates both a real-mixing case with \(\mathcal J_{\rm alg}=0\) and a complex CKM-type case with \(\mathcal J_{\rm alg}\ne0\).

## 4. What a valid curvature–CP bridge must prove

A physical parameter-space curvature can encode CP only if the construction specifies:

1. the two or more physical parameter directions;
2. their transformation under the relevant antiunitary CP operation;
3. a basis-invariant contraction of the curvature;
4. oddness of that contraction under CP;
5. vanishing whenever \(\mathcal J_{\rm alg}=0\), apart from explicitly identified additional CP sources;
6. proportionality or another controlled relation to measured flavor invariants.

Without these steps, “Berry curvature explains CKM phase” is an analogy, not a result.

## 5. A candidate direction, not yet a theorem

The commutator cubic is a cyclic three-link invariant. This suggests that a determinant line or non-Abelian rank-three frame bundle may be more natural than the curvature of one eigenline.

Possible constructions include:

- a Chern–Simons-type three-form on a three-parameter Yukawa family;
- a Wilson loop whose leading non-Abelian term contains three commutators;
- a determinant/Pfaffian line curvature contracted with a third spurion direction;
- a singular-frame flag holonomy around a locus of spectral degeneracy.

These are open paths. No equality with the Jarlskog polynomial has been derived.

## 6. Relation to the real Jordan carrier

The local direct sum of \(H_2(\mathbb R)\) face blocks can remain valid fiberwise while its flavor eigenframes have nonzero curvature. This separates:

- local positive Jordan geometry;
- global flavor-frame topology;
- CP-odd algebraic invariants.

The three may interact, but none should be identified with another without a map preserving their transformation laws.

In particular, a nonzero curvature of the flavor frame does not enlarge the local face carrier from \(H_2(\mathbb R)\) to \(H_2(\mathbb C)\). It obstructs a global trivialization of the chosen decomposition.

## 7. Branch decision

- **Closed:** a two-parameter nondegenerate Hermitian family has the stated eigenline Berry curvature.
- **Closed:** an explicitly CP-real matrix pair can yield nonzero curvature for a chosen complex tangent surface.
- **Closed:** generic curvature is not sufficient evidence of Jarlskog CP.
- **Closed:** the commutator cubic passes the required basis-invariance and CP-odd tests.
- **Open:** a physically defined multiparameter response curvature whose invariant contraction reduces to the commutator cubic.
- **Open:** a determinant-line or flag-holonomy bridge to the exceptional/Furey sewing phase.

## 8. Stop-everything and falsification gates

**Stop-everything trigger:** derive a source-defined response/flag holonomy whose lowest nonzero invariant is exactly proportional to \(\operatorname{ImTr}[H_u,H_d]^3\) and which simultaneously compares the exceptional and Furey determinant lines.

**CP falsifier:** the proposed geometric invariant remains nonzero for a fully CP-real representative without an independently specified CP-odd background.

**Basis falsifier:** the proposed scalar changes under simultaneous unitary conjugation of all flavor spurions.

**Curvature falsifier:** the perturbative value disagrees with the inverse-gap formula for an isolated eigenline.

**Degeneracy warning:** use non-Abelian projector curvature when eigenvalues collide.

## 9. Certificate

The [two-parameter curvature versus CP certificate](scripts/verify_two_parameter_frame_curvature_is_not_automatically_cp.mjs) verifies nonzero Berry curvature in a CP-real example, vanishing commutator-cubic CP invariant there, and a nonzero commutator cubic for a complex CKM-type frame.

## Companion documents

- [Mixed-spurion frame connection and one-parameter flatness](427_the_mixed_spurion_flow_has_an_exact_frame_connection_but_one_parameter_running_has_no_intrinsic_curvature.md)
- [Single- versus mixed-spurion real-frame theorem](426_single_spurion_self_energies_preserve_the_real_face_frame_but_mixed_yukawa_spurions_generically_rotate_it.md)
- [Real face carrier with complex flavor CP](120_real_face_carrier_complex_flavor_cp.md)
- [Three-flavor real-face/complex-PMNS carrier](174_three_flavor_real_face_complex_pmns_spectral_carrier.md)
