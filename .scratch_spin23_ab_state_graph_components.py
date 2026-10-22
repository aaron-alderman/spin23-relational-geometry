from collections import Counter,deque
from itertools import product
import importlib.util,json,numpy as np

def load(path,name):
 spec=importlib.util.spec_from_file_location(name,path);m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m);return m
c=load('.scratch_spin23_connectors.py','c');h=load('.scratch_spin23_all_robust_hessian_scan.py','h');s=load('.scratch_spin23_all_robust_supports_fast.py','s')

def audit(car):
 FM=h.field_builder(car);adj=[set() for _ in range(184)];basis=0
 labels=sorted({e['orbit'] for e in car['graph']['edges']})
 for label in labels:
  a,b=label
  if not ((a in c.A and b in c.B) or (b in c.A and a in c.B)):continue
  nr,nc=c.DIMS[b],c.DIMS[a]
  for x,y in product(range(nr),range(nc)):
   F=np.zeros((nr,nc));F[x,y]=1;D=FM(label,F);basis+=1
   ii,jj=np.nonzero(np.triu(np.abs(D)>1e-12,1))
   for i,j in zip(ii.tolist(),jj.tolist()):adj[i].add(j);adj[j].add(i)
 seen=set();sizes=[]
 for root in range(184):
  if root in seen or not adj[root]:continue
  q=deque([root]);seen.add(root);z=0
  while q:
   u=q.popleft();z+=1
   for v in adj[u]-seen:seen.add(v);q.append(v)
  sizes.append(z)
 # Upper-bound Lie algebra if every state-edge matrix unit were independent.
 suUpper=sum(z*z-1 for z in sizes)
 return {'componentSizes':sorted(sizes,reverse=True),'activeStates':sum(sizes),'isolatedStates':184-sum(sizes),'orbitMatrixBasis':basis,'suComponentUpper':suUpper}

cars=[x for x in c.strong_carriers() if (s.tw(x['op'],5),s.tw(x['op'],10))==(8,4)]
rows=[audit(x) for x in cars]
preferred=next(r for car,r in zip(cars,rows) if car['lpair']==((1,5),(10,1)) and car['rpair']==((10,2),(4,10)))
print(json.dumps({'protocol':'spin23-ab-state-graph-components/1','carriers':44,'componentPatternHistogram':dict(Counter(str(r['componentSizes']) for r in rows)),'activeStateHistogram':dict(Counter(r['activeStates'] for r in rows)),'suUpperHistogram':dict(Counter(r['suComponentUpper'] for r in rows)),'preferred':preferred},indent=2))
