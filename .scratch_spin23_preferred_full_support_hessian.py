from itertools import product
import importlib.util,json,numpy as np
spec=importlib.util.spec_from_file_location('c','.scratch_spin23_connectors.py');c=importlib.util.module_from_spec(spec);spec.loader.exec_module(c)
target=next(x for x in c.strong_carriers() if x['lpair']==((1,5),(10,1)) and x['rpair']==((10,2),(4,10)))
op=target['op'];bd=[c.DIMS[i]*c.DIMS[j] for i,j in op];off=np.cumsum([0]+bd[:-1]).tolist();assert sum(bd)==92
ACTIVE={(2,9):np.eye(2),(5,10):np.eye(3),(2,6):np.array([[1.,0.]]),(6,7):np.array([[1.],[0.]])}
SUPPORT=((1,2),(1,3),(1,4),(1,5),(1,7),(1,9),(2,6),(2,9),(4,8),(5,10),(6,7))
def FM(label,F0):
 D=np.zeros((184,184))
 for e in target['graph']['edges']:
  if e['orbit']!=label:continue
  u,v=e['u'],e['v'];p,q=op[u],op[v];h=p[1]==q[0] and p[0]!=q[1];z=p[0]==q[1] and p[1]!=q[0];assert h!=z
  a,b=(p[0],q[1]) if h else (p[1],q[0]);F=F0 if (a,b)==label else F0.T
  if h:X=np.kron(F,np.eye(c.DIMS[p[1]]));XJ=np.kron(np.eye(c.DIMS[p[1]]),F)
  else:X=np.kron(np.eye(c.DIMS[p[0]]),F);XJ=np.kron(F,np.eye(c.DIMS[p[0]]))
  pu,jv,ju,pv=off[u],92+off[v],92+off[u],off[v]
  D[jv:jv+X.shape[0],pu:pu+X.shape[1]]+=X;D[pu:pu+X.shape[1],jv:jv+X.shape[0]]+=X.T
  D[pv:pv+XJ.shape[0],ju:ju+XJ.shape[1]]+=XJ;D[ju:ju+XJ.shape[1],pv:pv+XJ.shape[0]]+=XJ.T
 return D
def t2(D):return float(np.trace(D@D))
def t4(D):Q=D@D;return float(np.trace(Q@Q))
def V(D):return -t2(D)+t4(D)
x={(2,9):.3,(5,10):.2,(2,6):.5,(6,7):.25};D0=sum(np.sqrt(x[l])*FM(l,F) for l,F in ACTIVE.items());V0=V(D0);out=[]
for label in SUPPORT:
 if label in ACTIVE:continue
 nr,nc=c.DIMS[label[1]],c.DIMS[label[0]];basis=[]
 for i,j in product(range(nr),range(nc)):
  F=np.zeros((nr,nc));F[i,j]=1;basis.append(FM(label,F))
 n=len(basis);A=np.zeros((n,n));ml=mc=0
 for i,Xi in enumerate(basis):
  A[i,i]=(V(D0+Xi)+V(D0-Xi))/2-V0-t4(Xi);d1=V(D0+Xi)-V(D0-Xi);d2=V(D0+2*Xi)-V(D0-2*Xi);ml=max(ml,abs((8*d1-d2)/12));mc=max(mc,abs((d2-2*d1)/12))
  for j in range(i):
   Xj=basis[j]
   def mix(h):return (V(D0+h*Xi+h*Xj)-V(D0+h*Xi-h*Xj)-V(D0-h*Xi+h*Xj)+V(D0-h*Xi-h*Xj))/(4*h*h)
   A[i,j]=A[j,i]=((4*mix(1)-mix(2))/3)/2
 out.append({'label':label,'shape':[nr,nc],'eigenvalues':np.linalg.eigvalsh(A).tolist(),'rank':int(np.linalg.matrix_rank(A,tol=1e-8)),'maxBasisLinear':ml,'maxBasisCubic':mc})
print(json.dumps({'protocol':'spin23-preferred-full-support-real-hessian/1','backgroundPotential':V0,'support':SUPPORT,'results':out},indent=2))
