from collections import Counter,deque
from itertools import product
import importlib.util,json,numpy as np

def load(path,name):
 spec=importlib.util.spec_from_file_location(name,path);m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m);return m
c=load('.scratch_spin23_connectors.py','c');h=load('.scratch_spin23_all_robust_hessian_scan.py','h');s=load('.scratch_spin23_all_robust_supports_fast.py','s')

def audit(car,tol=1e-9,details=False):
 FM=h.field_builder(car);gens=[];genlabels=[]
 for label in sorted({e['orbit'] for e in car['graph']['edges']}):
  a,b=label
  if not ((a in c.A and b in c.B) or (b in c.A and a in c.B)):continue
  nr,nc=c.DIMS[b],c.DIMS[a]
  for x,y in product(range(nr),range(nc)):
   F=np.zeros((nr,nc));F[x,y]=1;gens.append(1j*FM(label,F));genlabels.append(str(label))
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
 def add(bs):
  nonlocal B
  v=vec(bs)
  for _ in range(2):
   if len(B):v=v-(B@v)@B
  norm=np.linalg.norm(v)
  if norm<tol:return False
  v/=norm;m=sum(len(z)**2 for z in comps);zc=v[:m]+1j*v[m:];out=[];p=0
  for z in comps:
   n2=len(z)**2;out.append(zc[p:p+n2].reshape(len(z),len(z)));p+=n2
  basis.append(out);B=np.vstack([B,v]);queue.append(len(basis)-1);return True
 for G in gens:add(blocks(G))
 while queue:
  i=queue.popleft()
  for j in range(i):add(comm(basis[i],basis[j]))
 d=len(basis);ads=[np.zeros((d,d)) for _ in range(d)]
 for i in range(d):
  for j in range(i):
   co=B@vec(comm(basis[i],basis[j]));ads[i][:,j]=co;ads[j][:,i]=-co
 K=np.array([[np.trace(ads[i]@ads[j]) for j in range(d)] for i in range(d)])
 ke,KV=np.linalg.eigh(K);spaces=[];start=0
 while start<d:
  end=start+1
  while end<d and abs(ke[end]-ke[start])<1e-6:end+=1
  spaces.append(KV[:,start:end]);start=end
 incidence={};rawWeights={}
 for label in sorted(set(genlabels)):
  w=np.zeros(3)
  for G,L in zip(gens,genlabels):
   if L!=label:continue
   co=B@vec(blocks(G))
   for a,V in enumerate(spaces):w[a]+=np.linalg.norm(V.T@co)**2
  incidence[label]=tuple(bool(x>1e-7) for x in w);rawWeights[label]=tuple(round(float(x/sum(w)),8) for x in w)
 result={'lpair':car['lpair'],'rpair':car['rpair'],'dimension':len(basis),'components':sorted([len(z) for z in comps],reverse=True),'incidence':incidence,'weights':rawWeights}
 if details:result.update({'_basis':basis,'_spaces':spaces,'_components':comps})
 return result

if __name__=='__main__':
 cars=[x for x in c.strong_carriers() if (s.tw(x['op'],5),s.tw(x['op'],10))==(8,4)]
 rows=[audit(x) for x in cars]
 pref=next(x for x in cars if x['lpair']==((1,5),(10,1)) and x['rpair']==((10,2),(4,10)))
 tols={str(t):audit(pref,t)['dimension'] for t in (1e-7,1e-8,1e-9,1e-10)}
 print(json.dumps({'protocol':'spin23-ab-lie-closure-family/1','carriers':44,'dimensionHistogram':dict(Counter(r['dimension'] for r in rows)),'componentPatternHistogram':dict(Counter(str(r['components']) for r in rows)),'gIncidenceHistogram':dict(Counter(str(r['incidence']['(4, 8)']) for r in rows)),'gNormalizedWeightHistogram':dict(Counter(str(r['weights']['(4, 8)']) for r in rows)),'so4SeedOrbitHistogram':dict(Counter(','.join(k for k,v in r['incidence'].items() if v[2]) for r in rows)),'incidencePatternCount':len({str(r['incidence']) for r in rows}),'preferredToleranceCheck':tols},indent=2))
