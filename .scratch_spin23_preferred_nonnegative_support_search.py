from itertools import combinations,product
import importlib.util,json,numpy as np
def load(path,name):
 spec=importlib.util.spec_from_file_location(name,path);m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m);return m
c=load('.scratch_spin23_connectors.py','c');h=load('.scratch_spin23_all_robust_hessian_scan.py','h')
car=next(x for x in c.strong_carriers() if x['lpair']==((1,5),(10,1)) and x['rpair']==((10,2),(4,10)))
active=((2,9),(5,10),(2,6),(6,7));x=(.3,.2,.5,.25);FM=h.field_builder(car);mats=[FM(l,h.canonical(l)) for l in active];D0=sum(np.sqrt(x[i])*mats[i] for i in range(4))
def V(D):return -h.t2(D)+h.t4(D)
V0=V(D0);phase={node:car['phase'][g] for g,group in enumerate(c.GROUPS) for node in group};colored=lambda l:(l[0] in {5,10})^(l[1] in {5,10})
safeedges=[e for e in car['graph']['edges'] if not(colored(e['orbit']) and abs(phase[e['orbit'][0]]-phase[e['orbit'][1]])==172)]
labels=sorted({e['orbit'] for e in safeedges});rows=[];allowed=set(active)
for label in labels:
 if label in active:rows.append({'label':label,'status':'active'});continue
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
 eig=np.linalg.eigvalsh(A);kinetic=[h.t2(X) for X in basis];mn=float(eig[0]);rows.append({'label':label,'min':mn,'max':float(eig[-1]),'negative':int(np.sum(eig<-1e-8)),'zero':int(np.sum(abs(eig)<=1e-8)),'kineticWeights':kinetic})
 if mn>=-1e-8:allowed.add(label)
allowededges=[e for e in safeedges if e['orbit'] in allowed]
weak={tuple(sorted((9,b))) for b in c.B}
opt=c.minimum_weighted_species(len(car['op']),allowededges,weak,lambda l:int(colored(l)))
repair_options={}
for repair in ((2,8),(3,8),(4,8),(5,7),(8,9)):
 trial=[e for e in safeedges if e['orbit'] in allowed or e['orbit']==repair]
 repair_options[str(repair)]=c.minimum_weighted_species(len(car['op']),trial,weak,lambda l:int(colored(l)))
def comps(edges):
 adj=[set() for _ in car['op']]
 for e in edges:adj[e['u']].add(e['v']);adj[e['v']].add(e['u'])
 unseen=set(range(len(adj)));out=[]
 while unseen:
  root=min(unseen);seen={root};q=[root]
  while q:
   u=q.pop()
   for v in adj[u]-seen:seen.add(v);q.append(v)
  out.append({'indices':sorted(seen),'modules':[car['op'][i] for i in sorted(seen)]});unseen-=seen
 return sorted(out,key=lambda z:(-len(z['indices']),z['indices']))
print(json.dumps({'protocol':'spin23-preferred-nonnegative-support-search/1','allowedConnected':c.connected_with_edges(len(car['op']),allowededges),'components':comps(allowededges),'optimum':opt,'singleRepairOptions':repair_options,'rows':rows},default=list,indent=2))
