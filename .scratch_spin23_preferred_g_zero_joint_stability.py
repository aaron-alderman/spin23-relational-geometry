from itertools import combinations,product
import importlib.util,json,numpy as np
def load(path,name):
 spec=importlib.util.spec_from_file_location(name,path);m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m);return m
c=load('.scratch_spin23_connectors.py','c');h=load('.scratch_spin23_all_robust_hessian_scan.py','h')
car=next(x for x in c.strong_carriers() if x['lpair']==((1,5),(10,1)) and x['rpair']==((10,2),(4,10)));FM=h.field_builder(car)
active=((2,9),(5,10),(2,6),(6,7));x=(.3,.2,.5,.25);D0=sum(np.sqrt(x[i])*FM(l,h.canonical(l)) for i,l in enumerate(active))
basis=[];meta=[]
for label in ((1,7),(4,8)):
 for i,j in product(range(2),repeat=2):
  F=np.zeros((2,2));F[i,j]=1;basis.append(FM(label,F));meta.append((label,i,j))
def V(D):return -h.t2(D)+h.t4(D)
V0=V(D0);directions=[]
for count in (1,2,3):
 for inds in combinations(range(8),count):
  for signs in product((-1,1),repeat=count):
   if signs[0]<0:continue
   v=np.zeros(8)
   for i,s in zip(inds,signs):v[i]=s
   directions.append(v)
rows=[]
for v in directions:
 Y=sum(v[i]*basis[i] for i in range(8));dm1=V(D0+Y)-V(D0-Y);dm2=V(D0+2*Y)-V(D0-2*Y);linear=(8*dm1-dm2)/12;cubic=(dm2-2*dm1)/12
 quartic=h.t4(Y);K=sum(v[i]*v[j]*float(np.trace(basis[i]@basis[j])) for i in range(8) for j in range(8));rows.append((linear,cubic,quartic,K,quartic/(K*K)))
print(json.dumps({'protocol':'spin23-preferred-g-zero-joint-stability/1','directions':len(rows),'maxAbsLinear':max(abs(r[0]) for r in rows),'maxAbsCubic':max(abs(r[1]) for r in rows),'minQuartic':min(r[2] for r in rows),'minQuarticOverK2':min(r[4] for r in rows),'meta':meta},default=list,indent=2))
