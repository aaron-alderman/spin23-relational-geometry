from itertools import product
import importlib.util,json,numpy as np,sys
def load(path,name):
 spec=importlib.util.spec_from_file_location(name,path);m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m);return m
c=load('.scratch_spin23_connectors.py','c');h=load('.scratch_spin23_all_robust_hessian_scan.py','h')
car=next(x for x in c.strong_carriers() if x['lpair']==((1,5),(10,1)) and x['rpair']==((10,2),(4,10)));FM=h.field_builder(car)
delta=float(sys.argv[1]) if len(sys.argv)>1 else 2/5;t=delta/4
active=((2,6),(2,9),(5,10),(6,7));x=(.5-t/2,.3-11*t/20,.2+t/20,.25-t/4);D0=sum(np.sqrt(x[i])*FM(l,h.canonical(l)) for i,l in enumerate(active))
support=((1,2),(1,3),(1,4),(1,7),(1,9),(2,5),(2,6),(2,9),(4,8),(5,10),(6,7));inactive=tuple(l for l in support if l not in active);basis=[];meta=[]
for label in inactive:
 nr,nc=c.DIMS[label[1]],c.DIMS[label[0]]
 for i,j in product(range(nr),range(nc)):
  F=np.zeros((nr,nc));F[i,j]=1;basis.append(FM(label,F));meta.append((label,i,j))
def kind(l):
 a,b=l;aa=a in c.A;ab=b in c.A;ba=a in c.B;bb=b in c.B
 if (aa and bb) or (ab and ba):return 'AB'
 if aa or ab or ba or bb:return 'boundary'
 return 'other'
def coeff(l):return delta if kind(l)=='AB' else t if kind(l)=='boundary' else 0
def V(D):return -h.t2(D)+h.t4(D)
V0=V(D0);n=len(basis);A=np.zeros((n,n));K=np.zeros((n,n));C=np.zeros((n,n))
for i,Xi in enumerate(basis):
 A[i,i]=(V(D0+Xi)+V(D0-Xi))/2-V0-h.t4(Xi)
 for j in range(i+1):
  Xj=basis[j];K[i,j]=K[j,i]=float(np.trace(Xi@Xj));C[i,j]=C[j,i]=(coeff(meta[i][0]) if meta[i][0]==meta[j][0] else 0)*K[i,j]
  if j<i:
   def mix(q):return (V(D0+q*Xi+q*Xj)-V(D0+q*Xi-q*Xj)-V(D0-q*Xi+q*Xj)+V(D0-q*Xi-q*Xj))/(4*q*q)
   A[i,j]=A[j,i]=((4*mix(1)-mix(2))/3)/2
ke,ku=np.linalg.eigh(K);Ki=ku@np.diag(1/np.sqrt(ke))@ku.T;evals,evecs=np.linalg.eigh(Ki@(A+C)@Ki)
groups=[]
for z in evals:
 if not groups or abs(z-groups[-1][0])>1e-8:groups.append([float(z),1])
 else:groups[-1][1]+=1
bad=[]
for col,z in enumerate(evals):
 if z>=-1e-8:continue
 v=Ki@evecs[:,col];weights={}
 for q,m in enumerate(meta):weights[str(m[0])]=weights.get(str(m[0]),0)+float(v[q]*v[q]*K[q,q])
 bad.append({'eigenvalue':float(z),'weights':weights})
light=[]
for col,z in enumerate(evals):
 if z>evals[0]+1e-8:continue
 v=Ki@evecs[:,col];weights={}
 for q,m in enumerate(meta):weights[str(m[0])]=weights.get(str(m[0]),0)+float(v[q]*v[q]*K[q,q])
 light.append({'eigenvalue':float(z),'weights':weights})
print(json.dumps({'protocol':'spin23-unrestricted-benchmark-hessian/1','delta':delta,'t':t,'active':{str(l):q for l,q in zip(active,x)},'inactiveComponents':n,'kineticOffdiagMax':float(np.max(np.abs(K-np.diag(np.diag(K))))),'spectrum':groups,'negative':bad,'minimum':float(evals[0]),'lightModes':light},indent=2))
