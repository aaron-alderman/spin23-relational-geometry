import importlib.util,json,numpy as np

def load(path,name):
 spec=importlib.util.spec_from_file_location(name,path);m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m);return m
k=load('.scratch_spin23_ab_commutator_leakage_kkt.py','k')

L=np.asarray(k.L,float);Q=np.asarray(k.Q,float);n=len(L)
w=np.array([1.0 if k.kind(l)=='AB' else (0.25 if k.kind(l)=='boundary' else 0.0) for l in k.labels])

def interval_ge(a,b,lo,hi,tol=1e-10):
 # a+b*d >= 0
 if abs(b)<tol:return (lo,hi) if a>=-tol else None
 z=-a/b
 if b>0:lo=max(lo,z)
 else:hi=min(hi,z)
 return (lo,hi) if hi+tol>=lo else None

phases=[]
for mask in range(1<<n):
 idx=[i for i in range(n) if mask>>i&1]
 if not idx:
  x0=np.zeros(n);x1=np.zeros(n)
 else:
  A=2*Q[np.ix_(idx,idx)]
  if np.linalg.matrix_rank(A)<len(idx) or np.linalg.eigvalsh(A)[0]<-1e-9:continue
  z0=np.linalg.solve(A,L[idx]);z1=np.linalg.solve(A,-L[idx]*w[idx])
  x0=np.zeros(n);x1=np.zeros(n);x0[idx]=z0;x1[idx]=z1
 lo,hi=0.0,float('inf')
 ok=True
 for i in idx:
  z=interval_ge(x0[i],x1[i],lo,hi)
  if z is None:ok=False;break
  lo,hi=z
 if not ok:continue
 g0=-L+2*Q@x0
 g1=L*w+2*Q@x1
 for i in range(n):
  if i in idx:continue
  z=interval_ge(g0[i],g1[i],lo,hi)
  if z is None:ok=False;break
  lo,hi=z
 if not ok or hi<-1e-9:continue
 lo=max(lo,0.0)
 # Matter energy E=-1/2 Leff.x on stationary active coordinates.
 e0=-.5*np.dot(L,x0)
 e1=-.5*(np.dot(L,x1)+np.dot(-L*w,x0))
 e2=-.5*np.dot(-L*w,x1)
 phases.append({'idx':idx,'lo':lo,'hi':hi,'e':(e0,e1,e2)})

def optimize(kappa,m,nu=0.0):
 Lam=m*kappa*kappa;best=None
 for p in phases:
  lo=p['lo'];hi=p['hi'];e0,e1,e2=p['e']
  # Total in delta: E(delta)+Lambda(delta/kappa-1)^2.
  # Optional product-Cartan contribution nu*kappa^2*y = nu*kappa*delta.
  a=e2+Lam/(kappa*kappa);b=e1-2*Lam/kappa+nu*kappa
  cand=[lo]
  if np.isfinite(hi):cand.append(hi)
  if a>0:
   z=-b/(2*a)
   if z>=lo-1e-9 and z<=hi+1e-9:cand.append(min(max(z,lo),hi))
  elif not np.isfinite(hi):
   continue
  for d in cand:
   val=e0+e1*d+e2*d*d+Lam*(d/kappa-1)**2+nu*kappa*d
   if best is None or val<best['energy']:
    best={'energy':val,'delta':d,'y':d/kappa,'active':[str(k.labels[i]) for i in p['idx']], 'phaseInterval':[lo,None if not np.isfinite(hi) else hi]}
 best.update({'kappa':kappa,'LambdaOverKappa2':m,'nu':nu,'desired':set(best['active'])=={'(2, 6)','(2, 9)','(5, 10)','(6, 7)'},'GActive':'(4, 8)' in best['active']})
 return best

rows=[]
for kap in [0.4,0.5,20/19]:
 for m in [1,2,2.5,5,10,20,100,250,300]:rows.append(optimize(kap,m))
transitions=[]
for kap in [0.4,0.5,20/19]:
 lo,hi=0.0,1000.0
 for _ in range(70):
  mid=(lo+hi)/2
  if optimize(kap,mid)['desired']:hi=mid
  else:lo=mid
 transitions.append({'kappa':kap,'criticalLambdaOverKappa2':hi,'above':optimize(kap,hi+1e-7),'below':optimize(kap,max(0,hi-1e-7))})
curvature=[]
kap=20/19
for m in [1,2,3,4,5,10]:
 grid=np.linspace(-50,50,4001);flags=[optimize(kap,m,float(nu))['desired'] for nu in grid]
 ids=[i for i,z in enumerate(flags) if z]
 if not ids:
  curvature.append({'LambdaOverKappa2':m,'desiredNuBand':None});continue
 left,right=grid[min(ids)],grid[max(ids)]
 # Refine the two change points.
 a,b=grid[min(ids)-1],left
 for _ in range(55):
  z=(a+b)/2
  if optimize(kap,m,z)['desired']:b=z
  else:a=z
 left=b
 a,b=right,grid[max(ids)+1]
 for _ in range(55):
  z=(a+b)/2
  if optimize(kap,m,z)['desired']:a=z
  else:b=z
 right=a
 curvature.append({'LambdaOverKappa2':m,'desiredNuBand':[left,right],'atZero':optimize(kap,m,0)['desired']})
print(json.dumps({'protocol':'spin23-dynamic-q-full-kkt/1','phaseCount':len(phases),'globalTransitions':transitions,'curvatureMapKappa20over19':curvature,'rows':rows},indent=2))
