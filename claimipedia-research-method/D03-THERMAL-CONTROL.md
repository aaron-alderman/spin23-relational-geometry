# D-03 thermal-stress positive control

## Result

The thermal-stress construction supplies a clean positive control for an open `H_2(R)` response image.

After the Ward quotient, choose two probes with independent amplitudes in tensor, shear/vector and sound/scalar channels. Their Gram matrices may be represented by

`G_T=[[1,0],[0,0]]`,

`G_V=[[0,0],[0,1]]`,

`G_S=[[1,1],[1,1]]`.

They span all three real symmetric coordinates. With positive channel weights,

`rho(a,b,c)=aG_T+bG_V+cG_S=[[a+c,c],[c,b+c]]`.

For `a,b,c>0`, this matrix is positive definite. The Jacobian from the three independent weights to `(rho_11,rho_22,sqrt(2)rho_12)` has determinant `sqrt(2)`, so independently variable channel weights give an open physical subcone.

## Why this is only a control

Thermal kinematics permits three independent response structures. It does not prove that a particular Standard-Model state makes their weights independently controllable, nor that `Sp(4,R)` maps the full thermal family into itself.

A one-parameter frequency scan can even produce three linearly independent sampled matrices while its local image remains a one-dimensional curve. Linear sample span and Jacobian rank must therefore be audited separately.

## Benchmark for metric–Higgs

The metric–Higgs branch now has three threshold-resolved projective directions structurally. To match the thermal control it must show that physical controls—frequency, momentum, temperature or Higgs background—vary their weights with rank three. If the weights obey one hidden relation, the image remains a surface despite its full linear span.
