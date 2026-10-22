import importlib.util,json,numpy as np

def load(path,name):
 spec=importlib.util.spec_from_file_location(name,path);m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m);return m
c=load('.scratch_spin23_connectors.py','c')
s=load('.scratch_spin23_all_robust_supports_fast.py','s')

def qdiag(car,side):
 vals=[]
 for i,j in car['op']:
  d=c.DIMS[i]*c.DIMS[j]
  f=lambda z:1 if z in c.A else (-1 if z in c.B else 0)
  vals.extend([f(i if side=='L' else j)]*d)
 for i,j in car['op']:
  d=c.DIMS[i]*c.DIMS[j]
  f=lambda z:1 if z in c.A else (-1 if z in c.B else 0)
  vals.extend([f(j if side=='L' else i)]*d)
 return np.array(vals,float)

rng=np.random.default_rng(230535)
cars=[x for x in c.strong_carriers() if (s.tw(x['op'],5),s.tw(x['op'],10))==(8,4)]
maxerr=0.;minval=float('inf');trials=0
for car in cars:
 for side in ('L','R'):
  q=qdiag(car,side);q2=q*q;n=len(q)
  for _ in range(5):
   D=rng.normal(size=(n,n))+1j*rng.normal(size=(n,n))
   cq=(q[:,None]-q[None,:])*D
   cq2=(q2[:,None]-q2[None,:])*D
   sand=q2[:,None]*cq*q2[None,:]
   lhs=float(np.vdot(sand,sand).real)
   rhs=float(np.vdot(cq,cq).real-np.vdot(cq2,cq2).real)
   maxerr=max(maxerr,abs(lhs-rhs)/max(1,lhs))
   minval=min(minval,rhs);trials+=1
print(json.dumps({'protocol':'spin23-q-minus-q2-random-audit/1','carriers':len(cars),'sides':2,'complexRandomMatricesPerSide':5,'trials':trials,'maxRelativeIdentityError':maxerr,'minimumDifferenceValue':minval,'allNonnegative':minval>=-1e-8},indent=2))
