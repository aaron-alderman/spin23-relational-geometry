from fractions import Fraction

# Track powers of ell after F=R+s e e/ell^2 and overall c=ell^q/G.
terms={'Euler_RR':0,'Einstein_R_ee':-2,'cosmological_e4':-4}
print('PROTOCOL spin23-poincare-contraction/1')
for q in (0,2,4):
  print('OVERALL_ELL_POWER',q,{k:q+p for k,p in terms.items()})
print('FINITE_EINSTEIN_REQUIRES_q',2)
print('AT_q2',{'Euler_RR':'ell^2/G topological','Einstein_R_ee':'1/G finite','cosmological_e4':'1/(G ell^2) -> 0'})
print('ALGEBRA','P_a=J_a4/ell; [P_a,P_b]=+/- J_ab/ell^2 -> 0')
print('PASSED',terms['Einstein_R_ee']+2==0 and terms['cosmological_e4']+2==-2)
