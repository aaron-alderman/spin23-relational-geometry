import cmath, math, random

rng=random.Random(230736431)
max_ratio=-1.0
violations=0
for _ in range(200000):
  a=[complex(rng.gauss(0,1),rng.gauss(0,1)) for _ in range(2)]
  c=[complex(rng.gauss(0,1),rng.gauss(0,1)) for _ in range(2)]
  na=math.sqrt(sum(abs(x)**2 for x in a)); nc=math.sqrt(sum(abs(x)**2 for x in c))
  S=a[0]*c[1]-a[1]*c[0]
  ratio=S.real/(na*nc)
  max_ratio=max(max_ratio,ratio)
  if ratio>1+1e-12: violations+=1

def eigs(vp,vm,b):
  tr=b*(vm/vp+vp/vm)
  det=b*b-b*b
  return (0.0,tr,det)

print('PROTOCOL spin23-736d-soft-charged-stability/1')
print('RANDOM_FIXED_NORM_CAUCHY_TESTS',200000)
print('MAX_RE_S_OVER_NORMS',max_ratio)
print('VIOLATIONS',violations)
for vp,vm,b in [(1,1,1),(3,2,0.7),(0.2,5,4)]:
  print('CHARGED_EIGENVALUES',vp,vm,b,eigs(vp,vm,b))
print('PASSED',violations==0)
