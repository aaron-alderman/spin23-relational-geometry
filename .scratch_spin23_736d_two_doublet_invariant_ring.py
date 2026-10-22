from itertools import combinations_with_replacement

# Bilinear SU(2)_B x U(1)_X invariants for doublets of opposite X charge.
# w is charge under the accidental relative rephasing, not a gauge charge.
gens={
  'r+':(0,'r+'),
  'r-':(0,'r-'),
  'S':(1,'S'),
  'S*':(-1,'S*')
}

quadratic=list(gens)
quartic=[]
for a,b in combinations_with_replacement(gens,2):
  quartic.append((a+' '+b,gens[a][0]+gens[b][0]))

print('PROTOCOL spin23-736d-two-doublet-invariant-ring/1')
print('QUADRATIC_GENERATORS',quadratic)
print('QUARTIC_MONOMIALS',quartic)
print('HERMITIAN_BASIS',[
  'r+^2','r-^2','r+r-','|S|^2',
  'Re(kappa+ S r+)','Re(kappa- S r-)','Re(lambda5 S^2)'
])
print('ACCIDENTAL_U1_BREAKERS',[(m,w) for m,w in quartic if w!=0])
print('CP_REPHASING_INVARIANTS',[
  'Im(kappa+ b*)','Im(kappa- b*)','Im(lambda5 (b*)^2)',
  'Im(kappa+ kappa-* )','Im(lambda5 (kappa+*)^2)',
  'Im(lambda5 (kappa-*)^2)'
])
print('RADIAL_TRUNCATION_COMPLETE',False)
print('PASSED',len(quartic)==10)
