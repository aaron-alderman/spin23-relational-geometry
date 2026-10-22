import random, math

def analytic(vp,vm,b,lamS):
  p=vp*vm/2
  x=min(1.0,max(0.0,b/(lamS*p))) if lamS>0 else 1.0
  k=b-lamS*p
  charged=k*(vm/vp+vp/vm)
  pseudoscalar=b*(vm/vp+vp/vm)
  return x,k,charged,pseudoscalar

def brute(vp,vm,b,lamS,n=100001):
  p=vp*vm/2
  best=(None,float('inf'))
  for i in range(n):
    x=i/(n-1)
    val=lamS*p*p*x*x-2*b*p*x
    if val<best[1]:best=(x,val)
  return best

cases=[(1,1,1,1),(1,1,0.2,1),(3,2,0.7,0.1),(3,2,0.7,0.5),(2,5,4,-0.3)]
print('PROTOCOL spin23-736d-lambdaS-orientation/1')
for c in cases:
  print('CASE',c,'ANALYTIC',analytic(*c),'BRUTE',brute(*c))
rng=random.Random(230736432); failures=0
for _ in range(1000):
  vp=10**rng.uniform(-1,1);vm=10**rng.uniform(-1,1)
  b=10**rng.uniform(-2,1);lamS=rng.uniform(-2,2)
  x,*_=analytic(vp,vm,b,lamS); xb,_=brute(vp,vm,b,lamS,10001)
  if abs(x-xb)>2e-4:failures+=1
print('RANDOM_CASES',1000,'FAILURES',failures)
print('PASSED',failures==0)
