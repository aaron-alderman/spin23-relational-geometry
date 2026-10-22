from collections import Counter
from itertools import combinations,product
from concurrent.futures import ProcessPoolExecutor
import importlib.util,json,numpy as np
def load(path,name):
 spec=importlib.util.spec_from_file_location(name,path);m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m);return m
c=load('.scratch_spin23_connectors.py','c');s=load('.scratch_spin23_all_robust_supports_fast.py','s');h=load('.scratch_spin23_all_robust_hessian_scan.py','h')

def analyze(item):
 car,weak=item;active=(weak,(5,10),(2,6),(6,7));FM=h.field_builder(car);mats=[FM(l,h.canonical(l)) for l in active]
 L=np.array([h.t2(M) for M in mats]);Q=np.diag([h.t4(M) for M in mats])
 for i,j in combinations(range(4),2):Q[i,j]=Q[j,i]=(h.t4(mats[i]+mats[j])-Q[i,i]-Q[j,j])/2
 if np.linalg.matrix_rank(Q)<4:return {'failure':'singular','lpair':car['lpair'],'rpair':car['rpair']}
 x=np.linalg.solve(2*Q,L)
 if min(x)<=1e-9:return {'failure':'nonpositive','lpair':car['lpair'],'rpair':car['rpair'],'x':x.tolist()}
 D0=sum(np.sqrt(x[i])*mats[i] for i in range(4));V0=-h.t2(D0)+h.t4(D0)
 phase={node:car['phase'][g] for g,group in enumerate(c.GROUPS) for node in group};colored=lambda l:(l[0] in {5,10})^(l[1] in {5,10})
 safe=[e for e in car['graph']['edges'] if not(colored(e['orbit']) and abs(phase[e['orbit'][0]]-phase[e['orbit'][1]])==172)]
 labels=sorted({e['orbit'] for e in safe});allowed=set(active);curv={}
 def V(D):return -h.t2(D)+h.t4(D)
 for label in labels:
  if label in active:continue
  nr,nc=c.DIMS[label[1]],c.DIMS[label[0]];basis=[]
  for i,j in product(range(nr),range(nc)):
   F=np.zeros((nr,nc));F[i,j]=1;basis.append(FM(label,F))
  A=np.zeros((len(basis),len(basis)))
  for i,Xi in enumerate(basis):
   A[i,i]=(V(D0+Xi)+V(D0-Xi))/2-V0-h.t4(Xi)
   for j in range(i):
    Xj=basis[j]
    def mix(t):return (V(D0+t*Xi+t*Xj)-V(D0+t*Xi-t*Xj)-V(D0-t*Xi+t*Xj)+V(D0-t*Xi-t*Xj))/(4*t*t)
    A[i,j]=A[j,i]=((4*mix(1)-mix(2))/3)/2
  mn=float(np.linalg.eigvalsh(A)[0]);curv[str(label)]=mn
  if mn>=-1e-8:allowed.add(label)
 edges=[e for e in safe if e['orbit'] in allowed];connected=c.connected_with_edges(len(car['op']),edges)
 return {'lpair':car['lpair'],'rpair':car['rpair'],'active':active,'x':x.tolist(),'allowedConnected':connected,'allowedLabels':sorted(allowed),'negativeLabels':[l for l in labels if l not in allowed],'curvatures':curv}

if __name__=='__main__':
 cars=[x for x in c.strong_carriers() if (s.tw(x['op'],5),s.tw(x['op'],10))==(8,4)]
 tasks=[]
 for car in cars:
  present={e['orbit'] for e in car['graph']['edges']}
  for weak in sorted(present&{tuple(sorted((9,b))) for b in c.B}):tasks.append((car,weak))
 with ProcessPoolExecutor(max_workers=4) as pool:rows=list(pool.map(analyze,tasks))
 print('PROTOCOL spin23-all-robust-all-weak-lock-nonnegative-connectivity/1')
 print('ATTEMPTS',len(rows),'CARRIERS',len(cars))
 print('STATUS',Counter(r['failure'] if 'failure' in r else ('connected' if r['allowedConnected'] else 'disconnected') for r in rows))
 print('CARRIERS_WITH_CONNECTED',len({(tuple(map(tuple,r['lpair'])),tuple(map(tuple,r['rpair']))) for r in rows if r.get('allowedConnected')}))
 for r in rows:
  if r.get('allowedConnected'):print('CONNECTED',json.dumps(r,default=list))
