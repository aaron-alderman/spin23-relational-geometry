from collections import Counter
from itertools import combinations,product
from fractions import Fraction
from concurrent.futures import ProcessPoolExecutor
import importlib.util,json,numpy as np

def load(path,name):
 spec=importlib.util.spec_from_file_location(name,path);m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m);return m
c=load('.scratch_spin23_connectors.py','c');s=load('.scratch_spin23_all_robust_supports_fast.py','s')

def field_builder(carrier):
 op=carrier['op'];bd=[c.DIMS[i]*c.DIMS[j] for i,j in op];off=np.cumsum([0]+bd[:-1]).tolist();assert sum(bd)==92
 def FM(label,F0):
  D=np.zeros((184,184))
  for e in carrier['graph']['edges']:
   if e['orbit']!=label:continue
   u,v=e['u'],e['v'];p,q=op[u],op[v];h=p[1]==q[0] and p[0]!=q[1];z=p[0]==q[1] and p[1]!=q[0];assert h!=z
   a,b=(p[0],q[1]) if h else (p[1],q[0]);F=F0 if (a,b)==label else F0.T
   if h:X=np.kron(F,np.eye(c.DIMS[p[1]]));XJ=np.kron(np.eye(c.DIMS[p[1]]),F)
   else:X=np.kron(np.eye(c.DIMS[p[0]]),F);XJ=np.kron(F,np.eye(c.DIMS[p[0]]))
   pu,jv,ju,pv=off[u],92+off[v],92+off[u],off[v]
   D[jv:jv+X.shape[0],pu:pu+X.shape[1]]+=X;D[pu:pu+X.shape[1],jv:jv+X.shape[0]]+=X.T
   D[pv:pv+XJ.shape[0],ju:ju+XJ.shape[1]]+=XJ;D[ju:ju+XJ.shape[1],pv:pv+XJ.shape[0]]+=XJ.T
  return D
 return FM
def canonical(label):
 nr,nc=c.DIMS[label[1]],c.DIMS[label[0]]
 if nr==nc:return np.eye(nr)
 F=np.zeros((nr,nc));F[0,0]=1;return F
def t2(D):return float(np.trace(D@D))
def t4(D):Q=D@D;return float(np.trace(Q@Q))
def analyze(carrier):
 opt=s.optimum(carrier);support=opt[1];weak=next(l for l in support if 9 in l and (l[0] in c.B or l[1] in c.B));active=(weak,(5,10),(2,6),(6,7));FM=field_builder(carrier);mats=[FM(l,canonical(l)) for l in active]
 L=np.array([t2(M) for M in mats]);Q=np.diag([t4(M) for M in mats])
 for i,j in combinations(range(4),2):Q[i,j]=Q[j,i]=(t4(mats[i]+mats[j])-Q[i,i]-Q[j,j])/2
 if np.linalg.matrix_rank(Q)<4:return {'lpair':carrier['lpair'],'rpair':carrier['rpair'],'support':support,'failure':'singular-active-Q'}
 x=np.linalg.solve(2*Q,L)
 if min(x)<=1e-9:return {'lpair':carrier['lpair'],'rpair':carrier['rpair'],'support':support,'active':active,'x':x.tolist(),'failure':'nonpositive-active'}
 D0=sum(np.sqrt(x[i])*mats[i] for i in range(4));V0=-t2(D0)+t4(D0);classes=[]
 for label in support:
  if label in active:continue
  nr,nc=c.DIMS[label[1]],c.DIMS[label[0]];basis=[]
  for i,j in product(range(nr),range(nc)):
   F=np.zeros((nr,nc));F[i,j]=1;basis.append(FM(label,F))
  n=len(basis);A=np.zeros((n,n))
  def V(D):return -t2(D)+t4(D)
  for i,Xi in enumerate(basis):
   A[i,i]=(V(D0+Xi)+V(D0-Xi))/2-V0-t4(Xi)
   for j in range(i):
    Xj=basis[j]
    def mix(h):return (V(D0+h*Xi+h*Xj)-V(D0+h*Xi-h*Xj)-V(D0-h*Xi+h*Xj)+V(D0-h*Xi-h*Xj))/(4*h*h)
    A[i,j]=A[j,i]=((4*mix(1)-mix(2))/3)/2
  eig=np.linalg.eigvalsh(A);classes.append({'label':label,'min':float(eig[0]),'max':float(eig[-1]),'negative':int(np.sum(eig<-1e-8)),'zero':int(np.sum(abs(eig)<=1e-8))})
 return {'lpair':carrier['lpair'],'rpair':carrier['rpair'],'cost':opt[0],'support':support,'active':active,'x':x.tolist(),'energy':V0,'negativeClasses':sum(z['negative']>0 for z in classes),'negativeComponents':sum(z['negative'] for z in classes),'zeroClasses':sum(z['zero']>0 for z in classes),'classes':classes}

if __name__=='__main__':
 carriers=[x for x in c.strong_carriers() if (s.tw(x['op'],5),s.tw(x['op'],10))==(8,4)]
 with ProcessPoolExecutor(max_workers=4) as pool:rows=list(pool.map(analyze,carriers))
 good=[r for r in rows if 'failure' not in r]
 print('PROTOCOL spin23-all-robust-full-support-hessian/1')
 print('COUNT',len(rows),'FAILURES',Counter(r.get('failure') for r in rows))
 print('NEGATIVE_CLASS_HIST',Counter(r['negativeClasses'] for r in good))
 print('NEGATIVE_COMPONENT_HIST',Counter(r['negativeComponents'] for r in good))
 print('ZERO_CLASS_HIST',Counter(r['zeroClasses'] for r in good))
 for r in sorted(good,key=lambda z:(z['negativeClasses'],z['negativeComponents'],z['zeroClasses'],z['cost'],z['lpair'],z['rpair']))[:12]:print('BEST',json.dumps(r,default=list))
