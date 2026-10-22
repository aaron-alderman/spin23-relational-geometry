import math, random

def analytic(lp,lm,lc,ls):
  leff=lc+min(0.0,ls)
  return lp>0 and lm>0 and leff>-2*math.sqrt(lp*lm)

def grid_min(lp,lm,lc,ls,n=2001):
  # Normalize r_+ + r_- = 1. The minimizing x is an endpoint.
  best=float('inf')
  for i in range(n):
    rp=i/(n-1); rm=1-rp
    for x2 in (0.0,1.0):
      q=lp*rp*rp+lm*rm*rm+(lc+ls*x2)*rp*rm
      best=min(best,q)
  return best

rng=random.Random(230736433); mismatches=0; tested=0
for _ in range(1000):
  lp=10**rng.uniform(-1,1);lm=10**rng.uniform(-1,1)
  boundary=-2*math.sqrt(lp*lm)
  ls=rng.uniform(-4,4)
  # Stay away from the exact boundary so grid resolution is decisive.
  leff=boundary+rng.choice((-1,1))*rng.uniform(0.02,4)
  lc=leff-min(0.0,ls)
  a=analytic(lp,lm,lc,ls); g=grid_min(lp,lm,lc,ls)>-1e-8
  tested+=1
  if a!=g:mismatches+=1
print('PROTOCOL spin23-736d-lambdaS-boundedness/1')
print('CONDITION lambda+>0 lambda->0 lambda_c+min(0,lambda_S)>-2sqrt(lambda+lambda-)')
print('RANDOM_CASES',tested,'MISMATCHES',mismatches)
print('PASSED',mismatches==0)
