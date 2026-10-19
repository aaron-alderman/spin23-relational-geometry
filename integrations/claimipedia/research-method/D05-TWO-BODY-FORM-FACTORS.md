# D-05 physical two-body anomaly tomography

## Result

The four-particle cut is not required to obtain a full-rank anomaly-response matrix. Physical two-particle states already suffice when massive-vector polarizations are kept distinct.

Use

- `O_H=Phi^dagger Phi-v^2/2`;
- `X_F=F_mu_nu F^mu_nu/2`;
- `X_lambda=-(Phi^dagger Phi)^2/2`.

For common invariant mass `s` above the Higgs-pair and vector-pair thresholds, the tree-level response vectors `R=(F_XF/F_H,F_Xlambda/F_H)` are

`R_hh=(0,-3v^2 s/[2(s+2m_h^2)])`,

`R_T=((s-2m_A^2)(s-m_h^2)/(2m_A^2),-v^2/2)`,

`R_L=(2m_A^2(s-m_h^2)/(s-2m_A^2),-v^2/2)`.

Consequently,

`det[R_T-R_hh ; R_L-R_hh]`

equals

`v^2(s-m_h^2)/(s+2m_h^2) * (s-m_h^2)s(s-4m_A^2)/[2m_A^2(s-2m_A^2)]`.

It is nonzero throughout the common physical continuum. The two projective differences relative to `hh` therefore determine both the gauge and quartic anomaly coefficients in the declared two-operator truncation.

## Why polarization matters

The Higgs source reaches a vector pair through a scalar Higgs pole and is proportional to `epsilon_1 dot epsilon_2`. The gauge kinetic operator has the tensor amplitude

`2[(p_1 dot p_2)(epsilon_1 dot epsilon_2)-(p_1 dot epsilon_2)(p_2 dot epsilon_1)]`.

These structures give different transverse and longitudinal ratios away from threshold. At `s=4m_A^2`, the two ratios coincide and the response matrix loses one direction. An inclusive polarization sum can therefore erase information that is present in polarization-resolved form factors.

## Spectral consequence

For positive channel weights `w_i`, the metric–Higgs Gram determinant obeys

`det rho=sum_{i<j} w_i w_j (r_i-r_j)^2`.

It is positive for nonzero beta coefficients whenever the channel ratios split, and collapses at the fixed point. However, the order remains important:

- projective differences occur at bi-grade `(one two-particle cut loop, one beta-coefficient loop)`;
- the positive determinant is quadratic in beta coefficients and first appears one uniform order later;
- this is still substantially earlier than the four-particle route.

## Qualification

The formulas are on-shell physical tree form factors with explicit operator conventions. The next gate is their BRST/equivalence-theorem audit and the question of whether an experimentally inclusive observable retains polarization information.
