from collections import Counter
import importlib.util,json

def load(path,name):
 spec=importlib.util.spec_from_file_location(name,path);m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m);return m

c=load('.scratch_spin23_connectors.py','c')
h=load('.scratch_spin23_all_robust_hessian_scan.py','h')
s=load('.scratch_spin23_all_robust_supports_fast.py','s')

def q(node):
 return 1 if node in c.A else (-1 if node in c.B else 0)

def audit(car):
 rows=[]
 for i,j in car['op']:
  d=c.DIMS[i]*c.DIMS[j]
  rows.append((d,q(i),q(j)))
 # J completion swaps left/right and doubles the total representation.
 dim=2*sum(d for d,_,_ in rows)
 trQL=sum(d*(qi+qj) for d,qi,qj in rows)
 trQL2=sum(d*(qi*qi+qj*qj) for d,qi,qj in rows)
 trQLQR=2*sum(d*qi*qj for d,qi,qj in rows)
 trSLSR=2*sum(d*(qi*qi)*(qj*qj) for d,qi,qj in rows)
 return {'lpair':car['lpair'],'rpair':car['rpair'],'dim':dim,'trQL':trQL,'trQL2':trQL2,'trQLQR':trQLQR,'trSLSR':trSLSR}

cars=[x for x in c.strong_carriers() if (s.tw(x['op'],5),s.tw(x['op'],10))==(8,4)]
rows=[audit(x) for x in cars]
preferred=[(1,5),(1,5),(8,5),(5,2),(5,3),(5,4),(1,6),(8,6),(8,6),(6,4),(6,7),(6,7),(2,1),(7,8),(5,9),(9,10),(1,5),(10,1),(10,2),(4,10)]
pref=audit({'op':preferred,'lpair':None,'rpair':None})
keys=['dim','trQL','trQL2','trQLQR','trSLSR']
print(json.dumps({'protocol':'spin23-finite-q-trace-census/1','carriers':len(rows),'preferred':pref,'histograms':{k:dict(sorted(Counter(r[k] for r in rows).items())) for k in keys},'rows':rows},default=list,indent=2))
