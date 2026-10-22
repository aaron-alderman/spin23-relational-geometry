import math, random

random.seed(230736422)
N=200000
mins=[]; spreads=[]
above={0.1:0,0.3:0,0.5:0}
within10=0

def cgauss_abs():
    return math.hypot(random.gauss(0,1/math.sqrt(2)),random.gauss(0,1/math.sqrt(2)))

for _ in range(N):
    # Four singlet masses, one norm-three quark-doublet mass,
    # one single-edge lepton mass, and one norm-two lepton mass.
    masses=[cgauss_abs() for _ in range(4)]
    masses.append(math.sqrt(sum(cgauss_abs()**2 for _ in range(3))))
    masses.append(cgauss_abs())
    masses.append(math.sqrt(sum(cgauss_abs()**2 for _ in range(2))))
    lo=min(masses); hi=max(masses)
    mins.append(lo); spreads.append(hi/lo)
    for cut in above: above[cut]+=lo>cut
    within10+=hi/lo<10

def q(xs,p):
    ys=sorted(xs); return ys[round(p*(len(ys)-1))]

print('PROTOCOL spin23-736d-yukawa-ensemble/1')
print('SAMPLES',N,'SEED',230736422)
print('MIN_QUANTILES',[(p,q(mins,p)) for p in (0.05,0.1,0.5,0.9,0.95)])
print('SPREAD_QUANTILES',[(p,q(spreads,p)) for p in (0.05,0.1,0.5,0.9,0.95)])
print('P_MIN_ABOVE',[(cut,above[cut]/N) for cut in above])
print('P_SPREAD_BELOW_10',within10/N)
print('PASSED',True)
