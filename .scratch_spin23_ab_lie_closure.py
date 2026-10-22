from collections import deque
from itertools import product
import importlib.util,json,numpy as np

def load(path,name):
 spec=importlib.util.spec_from_file_location(name,path);m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m);return m
c=load('.scratch_spin23_connectors.py','c');h=load('.scratch_spin23_all_robust_hessian_scan.py','h')
car=next(x for x in c.strong_carriers() if x['lpair']==((8,10),(10,1)) and x['rpair']==((10,2),(7,5)))
FM=h.field_builder(car)
gens=[];genlabels=[]
for label in sorted({e['orbit'] for e in car['graph']['edges']}):
 a,b=label
 if not ((a in c.A and b in c.B) or (b in c.A and a in c.B)):continue
 nr,nc=c.DIMS[b],c.DIMS[a]
 for x,y in product(range(nr),range(nc)):
  F=np.zeros((nr,nc));F[x,y]=1;gens.append(1j*FM(label,F));genlabels.append(str(label))

# Connected components of the union support.
adj=[set() for _ in range(184)]
for G in gens:
 ii,jj=np.nonzero(np.triu(np.abs(G)>1e-12,1))
 for i,j in zip(ii.tolist(),jj.tolist()):adj[i].add(j);adj[j].add(i)
seen=set();comps=[]
for r in range(184):
 if r in seen or not adj[r]:continue
 q=deque([r]);seen.add(r);z=[]
 while q:
  u=q.popleft();z.append(u)
  for v in adj[u]-seen:seen.add(v);q.append(v)
 comps.append(sorted(z))

def blocks(M):return [M[np.ix_(z,z)] for z in comps]
def vec(bs):
 z=np.concatenate([b.reshape(-1) for b in bs]);return np.concatenate([z.real,z.imag])
def comm(a,b):return [x@y-y@x for x,y in zip(a,b)]

basis=[];B=np.empty((0,2*sum(len(z)**2 for z in comps)));queue=deque()
def add(bs,tol=1e-9):
 global B
 v=vec(bs)
 for _ in range(2):
  if len(B):v=v-(B@v)@B
 n=np.linalg.norm(v)
 if n<tol:return False
 v/=n
 # Rescale blocks by same normalization after projection; reconstruct from v.
 m=sum(len(z)**2 for z in comps);zc=v[:m]+1j*v[m:];out=[];p=0
 for z in comps:
  n2=len(z)**2;out.append(zc[p:p+n2].reshape(len(z),len(z)));p+=n2
 basis.append(out);B=np.vstack([B,v]);queue.append(len(basis)-1);return True

for G in gens:add(blocks(G))
while queue:
 i=queue.popleft()
 # Snapshot length: new commutators with all basis elements known now.
 for j in range(i):add(comm(basis[i],basis[j]))

d=len(basis);derived=[];ads=[np.zeros((d,d)) for _ in range(d)]
for i in range(d):
 for j in range(i):
  cv=vec(comm(basis[i],basis[j]));co=B@cv;derived.append(co)
  ads[i][:,j]=co;ads[j][:,i]=-co
derivedDimension=int(np.linalg.matrix_rank(np.array(derived),tol=1e-7))
centerMap=np.vstack(ads)
centerDimension=d-int(np.linalg.matrix_rank(centerMap,tol=1e-7))
K=np.array([[np.trace(ads[i]@ads[j]) for j in range(d)] for i in range(d)])
ke,KV=np.linalg.eigh(K);clusters=[];idealSpaces=[];start=0;rng=np.random.default_rng(230545)
while start<d:
 end=start+1
 while end<d and abs(ke[end]-ke[start])<1e-6:end+=1
 V=KV[:,start:end];x=V@rng.normal(size=end-start);adX=sum(x[i]*ads[i] for i in range(d));restricted=V.T@adX@V
 rank=(end-start)-int(np.linalg.matrix_rank(restricted,tol=1e-7))
 clusters.append([float(ke[start]),end-start,rank]);idealSpaces.append(V);start=end
casimirs=[];allCs=[]
for V in idealSpaces:
 Cs=[np.zeros_like(b) for b in basis[0]]
 for a in range(V.shape[1]):
  T=[sum(V[i,a]*basis[i][k] for i in range(d)) for k in range(len(comps))]
  Cs=[C-X@X for C,X in zip(Cs,T)]
 vals=np.concatenate([np.linalg.eigvalsh(C) for C in Cs]);cc=[]
 for x in sorted(vals):
  if cc and abs(x-cc[-1][0])<1e-6:cc[-1][1]+=1
  else:cc.append([float(x),1])
 casimirs.append(cc);allCs.append(Cs)
joint=[]
weights=[1,np.sqrt(2),np.sqrt(3)]
for k,z in enumerate(comps):
 G=sum(weights[a]*allCs[a][k] for a in range(3));ev,U=np.linalg.eigh(G)
 for col in range(len(z)):
  u=U[:,col];joint.append(tuple(round(float(np.real(u.conj()@allCs[a][k]@u)),8) for a in range(3)))
from collections import Counter
jointHist={str(k):v for k,v in sorted(Counter(joint).items())}
seedWeights={}
for label in sorted(set(genlabels)):
 z=np.zeros(3)
 for G,L in zip(gens,genlabels):
  if L!=label:continue
  co=B@vec(blocks(G))
  for a,V in enumerate(idealSpaces):z[a]+=np.linalg.norm(V.T@co)**2
 seedWeights[label]=[float(x) for x in z]
print(json.dumps({'protocol':'spin23-ab-lie-closure/1','initialGenerators':len(gens),'componentSizes':sorted([len(z) for z in comps],reverse=True),'ambientBlockMatrixDimension':sum(len(z)**2 for z in comps),'realLieClosureDimension':d,'derivedAlgebraDimension':derivedDimension,'centerDimension':centerDimension,'killingMetricEigenClustersValueDimensionGenericRank':clusters,'idealCasimirEigenvalueMultiplicitiesOnActiveSpace':casimirs,'jointCasimirTupleMultiplicities':jointHist,'orbitSeedSquaredNormsByIdeal':seedWeights,'fullSuUpper':sum(len(z)**2-1 for z in comps)},indent=2))
