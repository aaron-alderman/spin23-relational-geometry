from collections import Counter

A={1,8}; B={2,3,4,7,9}; C={5,10}; U={6}
phase={**{i:6 for i in A|B},**{i:49 for i in C},6:-123}
op=[(1,5),(1,5),(8,5),(5,2),(5,3),(5,4),(1,6),(8,6),(8,6),(6,4),(6,7),(6,7),(2,1),(7,8),(5,9),(9,10),(1,5),(10,1),(10,2),(4,10)]

def low_irreps(i,j):
    a=2 if i in A or j in A else 1
    color='3' if i in C else ('3bar' if j in C else '1')
    x=(phase[i]-phase[j])//43
    return [(a,color,x+bw) for bw in ((-3,3) if i in B or j in B else (0,))]

counts=Counter(rep for edge in op for rep in low_irreps(*edge))

conjugate=lambda rep:(rep[0],{'3':'3bar','3bar':'3','1':'1'}[rep[1]],-rep[2])
reps=set(counts)
pairs=[]; residual=Counter(counts)
for rep in sorted(reps):
    dual=conjugate(rep)
    if rep>dual or rep==dual: continue
    n=min(residual[rep],residual[dual])
    if n:
      pairs.append((rep,dual,n))
      residual[rep]-=n; residual[dual]-=n

residual=Counter({k:v for k,v in residual.items() if v})
expected=Counter({
  (2,'3bar',-1):3,
  (1,'3',4):3,
  (1,'3',-2):3,
  (2,'1',3):3,
  (1,'1',-6):3,
  (1,'1',0):3,
})
assert residual==expected

dim=lambda rep:rep[0]*(3 if rep[1] in ('3','3bar') else 1)
vectorlike_dim=sum(n*(dim(rep)+dim(dual)) for rep,dual,n in pairs)
chiral_dim=sum(n*dim(rep) for rep,n in residual.items())
assert vectorlike_dim==44 and chiral_dim==48 and vectorlike_dim+chiral_dim==92

grav_y=sum(n*dim(rep)*rep[2] for rep,n in residual.items())
cubic_y=sum(n*dim(rep)*rep[2]**3 for rep,n in residual.items())
su2_y=sum(n*(3 if rep[1] in ('3','3bar') else 1)*rep[2] for rep,n in residual.items() if rep[0]==2)
su3_y=sum(n*rep[0]*rep[2] for rep,n in residual.items() if rep[1] in ('3','3bar'))
su3_cubic=sum(n*rep[0]*(1 if rep[1]=='3' else -1) for rep,n in residual.items() if rep[1] in ('3','3bar'))
witten=sum(n*(3 if rep[1] in ('3','3bar') else 1) for rep,n in residual.items() if rep[0]==2)%2
assert (grav_y,cubic_y,su2_y,su3_y,su3_cubic,witten)==(0,0,0,0,0,0)

print('PROTOCOL spin23-736d-low-energy-chiral-index/1')
print('IRREP_COUNTS',dict(sorted(counts.items())))
print('VECTORLIKE_PAIRS',pairs)
print('VECTORLIKE_DIMENSION',vectorlike_dim)
print('CHIRAL_RESIDUAL',dict(sorted(residual.items())))
print('CHIRAL_DIMENSION',chiral_dim)
print('FAMILY_ORIENTATION','three conjugate Standard-Model families with neutral singlets')
print('RESIDUAL_ANOMALIES',{'grav_y':grav_y,'cubic_y':cubic_y,'su2_y':su2_y,'su3_y':su3_y,'su3_cubic':su3_cubic,'witten_parity':witten})
print('PASSED',True)
