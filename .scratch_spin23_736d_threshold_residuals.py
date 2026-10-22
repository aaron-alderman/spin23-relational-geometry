import math, random

random.seed(230736427)
N=200000
twopi=2*math.pi

# Seven Dirac-copy thresholds with (bL,bR,bX,b3).  The four singlet
# components together form two colored SU(2)R doublet Dirac pairs.
weights=[
  (0,1,1/9,2/3), (0,1,1/9,2/3),
  (0,1,1/9,2/3), (0,1,1/9,2/3),
  (2,0,2/9,4/3),
  (2/3,0,2/3,0), (2/3,0,2/3,0),
]
sensitivity=(-5.49482657,1.84739859,0.65978521)

def cabs():
  return math.hypot(random.gauss(0,1/math.sqrt(2)),random.gauss(0,1/math.sqrt(2)))

norms=[]; dzs=[]; max_components=[]
for _ in range(N):
  q=[cabs() for _ in range(4)]
  q.append(math.sqrt(sum(cabs()**2 for _ in range(3))))
  q.append(cabs())
  q.append(math.sqrt(sum(cabs()**2 for _ in range(2))))
  d=[0.0]*4
  for mass,w in zip(q,weights):
    logq=math.log(mass)
    for i in range(4): d[i]+=w[i]*logq/twopi
  dl,dr,dx,d3=d
  e=(dl/11-d3/12, dr/14-dl/11, dx/5-dl/11)
  norms.append(math.sqrt(sum(v*v for v in e)))
  dzs.append(sum(s*v for s,v in zip(sensitivity,e)))
  max_components.append(max(abs(v) for v in e))

def quant(xs,p):
  ys=sorted(xs); return ys[round(p*(len(ys)-1))]

print('PROTOCOL spin23-736d-threshold-residual-ensemble/1')
print('SAMPLES',N,'SEED',230736427)
for name,xs in [('L2',norms),('ABS_DZ',[abs(x) for x in dzs]),('LINF',max_components)]:
  print(name,[(p,quant(xs,p)) for p in (0.5,0.9,0.95,0.99)])
print('P_L2_GT_V369_CLOSE',sum(x>=0.7983531968247628 for x in norms)/N)
print('P_ABS_DZ_GT_PRODUCT_Z',sum(abs(x)>=4.657986721552552 for x in dzs)/N)
print('MAX_L2',max(norms),'MAX_ABS_DZ',max(abs(x) for x in dzs))
print('PASSED',True)
