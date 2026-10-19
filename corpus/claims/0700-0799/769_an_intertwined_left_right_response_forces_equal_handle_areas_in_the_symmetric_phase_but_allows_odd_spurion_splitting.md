# An Intertwined Left–Right Response Forces Equal Handle Areas in the Symmetric Phase but Allows Odd-Spurion Splitting

## Claim

Assume the missing matter-to-carrier map intertwines the simultaneous left–right Weyl operation of document 768 with the integral handle swap \(H\) of document 766. Then an unbroken left–right-covariant quadratic response forces the two oriented handle areas to be equal.

If symmetry breaking is represented by an exchange-odd spurion \(s\), covariance gives

\[
b(s)=a(-s).
\]

The mean area is therefore even in \(s\), while the area splitting is odd. Equal area is exact at the symmetric point, but a linear splitting is generically allowed after symmetry breaking.

## 1. Two-handle response

After orientation and handle locality have been selected, write the alternating response as

\[
J(a,b)=
\begin{pmatrix}
aJ_0&0\\
0&bJ_0
\end{pmatrix},
\qquad
J_0=\begin{pmatrix}0&1\\-1&0\end{pmatrix}.
\]

The handle exchange is

\[
H=\begin{pmatrix}0&I_2\\I_2&0\end{pmatrix},
\qquad
H^TJ(a,b)H=J(b,a).
\]

At an invariant background, response covariance requires \(H^TJH=J\), hence

\[
a=b.
\]

There is only one local alternating counterterm coefficient on the exchange-invariant two-handle carrier. This closes the simplest version of the counterterm test positively.

## 2. Broken phase and spurion parity

Let \(s\) reverse under handle exchange. The correct covariance equation is no longer invariance at fixed \(s\), but

\[
H^TJ(s)H=J(-s).
\]

For the block-local form this is equivalent to

\[
b(s)=a(-s).
\]

Define

\[
\bar a(s)=\frac{a(s)+b(s)}2,
\qquad
\delta a(s)=\frac{a(s)-b(s)}2.
\]

Then

\[
\bar a(-s)=\bar a(s),
\qquad
\delta a(-s)=-\delta a(s).
\]

For an analytic response,

\[
\bar a(s)=a_0+a_2s^2+a_4s^4+\cdots,
\]

while

\[
\delta a(s)=a_1s+a_3s^3+a_5s^5+\cdots.
\]

Thus exchange covariance protects equality at \(s=0\), but does not generically suppress its first broken-phase correction beyond first order.

## 3. What has and has not been proved

The result is an exact response theorem once three antecedents hold:

1. the physical carrier is the two-handle symplectic space;
2. the matter-to-carrier map sends the simultaneous left–right Weyl element to \(H\); and
3. the response is local in the selected handle splitting, or the allowed mixed blocks have been separately classified.

Documents 766 and 768 establish the two endpoint actions. They do not yet establish the intertwiner between them. That intertwiner is now the central missing arrow.

The theorem also does not say that measured low-energy parameters should be nearly equal. The size of \(s\) and the coefficient \(a_1\) are dynamical, and the observed vacuum strongly distinguishes up and down sectors.

## 4. Mixed-block boundary

The most general alternating form on four dimensions can contain an off-diagonal \(2\times2\) block. Earlier oriented-color covariance selected the block-diagonal two-area family. If the left–right completion restores additional mixed responses, they must be classified before claiming uniqueness of the full form.

This creates a sharp bifurcation:

- **positive:** the Furey sewing, charge typing and orientation forbid the mixed block, so exchange leaves the single coefficient \(a=b\);
- **negative:** symmetry permits independent exchange-even mixed blocks, so equal diagonal areas do not by themselves select the canonical carrier used in the arithmetic construction.

## 5. Stop-everything criterion

The decisive positive result would be an explicit, source-derived map

\[
\Phi:\text{left-right matter/Yukawa response}\longrightarrow
(\mathbb Z^4,J)
\]

such that

\[
\Phi\circ w=H\circ\Phi,
\]

with \(\Phi\) producing the already verified color-average lattice and excluding mixed alternating counterterms. Then

\[
\text{left-right symmetric phase}
\Longrightarrow a=b
\Longrightarrow Sp(4)
\Longrightarrow Spin_0(2,3)
\]

would be a derived chain rather than an analogy.

The decisive negative result would be a proof that every gauge- and sewing-compatible \(\Phi\) either has rank below four or permits independent invariant response blocks. That would pin the left–right equal-area route without damaging the other carrier branches.

## 6. Executable certificate

```powershell
node verification/verify/verify_handle_area_splitting_is_odd_under_left_right_exchange_breaking.mjs
```

The certificate verifies the exchange covariance for a general polynomial sample, equality at the symmetric point, and the even/odd decomposition of mean and splitting.

## Companion documents

- [Handle-exchange equal-area theorem](766_integral_handle_exchange_forces_equal_or_opposite_carrier_areas_but_is_not_a_microscopic_s5_symmetry.md)
- [Sewn-ribbon typed exchange obstruction](767_the_sewn_furey_ribbon_has_untyped_handle_exchange_but_no_standard_model_typed_exchange_between_c_and_d.md)
- [Minimal left-right gauge envelope](768_left_right_symmetry_is_the_minimal_gauge_envelope_of_the_furey_handle_exchange_but_equal_area_requires_an_invariant_response_phase.md)
