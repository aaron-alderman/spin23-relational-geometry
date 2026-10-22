from fractions import Fraction

A={1,8}; B={2,3,4,7,9}; C={5,10}; U={6}
phase={**{i:6 for i in A|B},**{i:49 for i in C},6:-123}
op=[(1,5),(1,5),(8,5),(5,2),(5,3),(5,4),(1,6),(8,6),(8,6),(6,4),(6,7),(6,7),(2,1),(7,8),(5,9),(9,10),(1,5),(10,1),(10,2),(4,10)]

# A central element is encoded by p,q in Z2, r in Z3, and theta=k*pi/3.
# Its phase on H_(i,j) is measured in sixth-turns.
def central_exponent(i,j,p,q,r,k):
    e=0
    e += 3*p*((i in A)+(j in A))
    e += 3*q*((i in B)+(j in B))
    e += 2*r*((i in C)-(j in C))
    x=(phase[i]-phase[j])//43
    e += k*x
    return e%6

kernel=[]
for p in range(2):
  for q in range(2):
    for r in range(3):
      for k in range(6):
        if all(central_exponent(i,j,p,q,r,k)==0 for i,j in op):
          kernel.append((p,q,r,k))

generator=(1,1,1,1)
generated=[((n*generator[0])%2,(n*generator[1])%2,(n*generator[2])%3,(n*generator[3])%6) for n in range(6)]
assert set(kernel)==set(generated)

# For the neutral component of a B doublet with X=3, the torus character is
# -theta_B + 3 theta_X in integer-normalized circle coordinates. Its gcd is 1,
# hence the stabilizer kernel is connected. A singlet of X=3 would have gcd 3.
doublet_character=(-1,3)
singlet_character=(0,3)

print('PROTOCOL spin23-736d-global-quotient/1')
print('CENTRAL_KERNEL',kernel)
print('CYCLIC_GENERATOR',generator)
print('FAITHFUL_QUOTIENT','(SU2_A x SU2_B x SU3_C x U1_X)/Z6')
print('DOUBLET_CHARACTER',doublet_character,'GCD',1,'COMPONENTS',1)
print('SINGLET_COUNTERFACTUAL',singlet_character,'GCD',3,'COMPONENTS',3)
print('INDEPENDENT_Z3_REMNANT',False)

# After right breaking use integer-normalized y=6Y=6T3_B+X.  Enumerate the
# central kernel of SU2_A x SU3_C x U1_y on every resulting weight state.
def low_exponents(i,j,p,r,k):
    n_a=(i in A)+(j in A)
    color_orientation=(i in C)-(j in C)
    x=(phase[i]-phase[j])//43
    b_weights=(-3,3) if ((i in B)+(j in B)) else (0,)
    return [
      (3*p*n_a + 2*r*color_orientation + k*(bw+x))%6
      for bw in b_weights
    ]

low_kernel=[]
for p in range(2):
  for r in range(3):
    for k in range(6):
      if all(e==0 for i,j in op for e in low_exponents(i,j,p,r,k)):
        low_kernel.append((p,r,k))
low_generator=(1,1,1)
low_generated=[((n*low_generator[0])%2,(n*low_generator[1])%3,(n*low_generator[2])%6) for n in range(6)]
assert set(low_kernel)==set(low_generated)
print('LOW_ENERGY_CENTRAL_KERNEL',low_kernel)
print('LOW_ENERGY_QUOTIENT','(SU2_A x SU3_C x U1_y)/Z6, y=6Y')
print('PASSED',True)
