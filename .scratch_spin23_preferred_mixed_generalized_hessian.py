from itertools import product
import importlib.util,json,numpy as np
def load(path,name):
 spec=importlib.util.spec_from_file_location(name,path);m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m);return m
c=load('.scratch_spin23_connectors.py','c');h=load('.scratch_spin23_all_robust_hessian_scan.py','h')
car=next(x for x in c.strong_carriers() if x['lpair']==((1,5),(10,1)) and x['rpair']==((10,2),(4,10)))
FM=h.field_builder(car);active=((2,9),(5,10),(2,6),(6,7));x=(.3,.2,.5,.25);D0=sum(np.sqrt(x[i])*FM(l,h.canonical(l)) for i,l in enumerate(active))
inactive=((1,2),(1,3),(1,4),(1,7),(1,9),(1,10),(4,8));basis=[];meta=[]
for label in inactive:
 nr,nc=c.DIMS[label[1]],c.DIMS[label[0]]
 for i,j in product(range(nr),range(nc)):
  F=np.zeros((nr,nc));F[i,j]=1;basis.append(FM(label,F));meta.append((label,i,j))
def V(D):return -h.t2(D)+h.t4(D)
V0=V(D0);n=len(basis);A=np.zeros((n,n));K=np.zeros((n,n))
for i,Xi in enumerate(basis):
 A[i,i]=(V(D0+Xi)+V(D0-Xi))/2-V0-h.t4(Xi)
 for j in range(i+1):
  Xj=basis[j];K[i,j]=K[j,i]=float(np.trace(Xi@Xj))
  if j<i:
   def mix(t):return (V(D0+t*Xi+t*Xj)-V(D0+t*Xi-t*Xj)-V(D0-t*Xi+t*Xj)+V(D0-t*Xi-t*Xj))/(4*t*t)
   A[i,j]=A[j,i]=((4*mix(1)-mix(2))/3)/2
ke,ku=np.linalg.eigh(K);assert min(ke)>1e-9;Ki=ku@np.diag(1/np.sqrt(ke))@ku.T;G=Ki@A@Ki;evals,evecs=np.linalg.eigh(G)
groups=[]
for z in evals:
 if not groups or abs(z-groups[-1][0])>1e-8:groups.append([float(z),1])
 else:groups[-1][1]+=1
neg=[]
for col,z in enumerate(evals):
 if z>=-1e-8:continue
 v=Ki@evecs[:,col];weights={}
 for coeff,m in zip(v,meta):weights[str(m[0])]=weights.get(str(m[0]),0)+float(coeff*coeff*K[meta.index(m),meta.index(m)])
 neg.append({'eigenvalue':float(z),'labelWeights':weights})
g_indices=[i for i,m in enumerate(meta) if m[0]==(4,8)]
def mineig(delta):
 S=A.copy()
 for i in g_indices:
  for j in g_indices:S[i,j]+=delta*K[i,j]
 return float(np.linalg.eigvalsh(Ki@S@Ki)[0])
lo,hi=0.,2.
for _ in range(80):
 mid=(lo+hi)/2
 if mineig(mid)>=-1e-10:hi=mid
 else:lo=mid
print(json.dumps({'protocol':'spin23-preferred-mixed-generalized-hessian/1','components':n,'kineticOffdiagMax':float(np.max(np.abs(K-np.diag(np.diag(K))))),'spectrum':groups,'negativeModes':neg,'gOnlyShiftThreshold':hi,'minAtNineTwentyFifths':mineig(9/25),'meta':meta},default=list,indent=2))
