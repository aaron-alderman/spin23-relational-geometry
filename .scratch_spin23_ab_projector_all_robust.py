from collections import Counter
import importlib.util,json,numpy as np

def load(path,name):
 spec=importlib.util.spec_from_file_location(name,path);m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m);return m

c=load('.scratch_spin23_connectors.py','c')
h=load('.scratch_spin23_all_robust_hessian_scan.py','h')
s=load('.scratch_spin23_all_robust_supports_fast.py','s')

def audit(car):
 op=car['op'];bd=[c.DIMS[i]*c.DIMS[j] for i,j in op];off=np.cumsum([0]+bd[:-1]).tolist();n=sum(bd);FM=h.field_builder(car)
 def proj(side,nodes):
  d=np.zeros(2*n)
  for k,(i,j) in enumerate(op):
   d[off[k]:off[k]+bd[k]]=int((i if side=='L' else j) in nodes)
   d[n+off[k]:n+off[k]+bd[k]]=int((j if side=='L' else i) in nodes)
  return d
 LA,LB,RA,RB=proj('L',c.A),proj('L',c.B),proj('R',c.A),proj('R',c.B)
 def select(D):
  return sum(float(np.sum((p[:,None]*D*q[None,:])**2)) for p,q in ((LA,LB),(LB,LA),(RA,RB),(RB,RA)))
 labels=sorted({e['orbit'] for e in car['graph']['edges']});bad=[]
 for label in labels:
  D=FM(label,h.canonical(label));z=h.t2(D);v=select(D);ab=(label[0] in c.A and label[1] in c.B) or (label[1] in c.A and label[0] in c.B)
  if abs(v-(z if ab else 0))>1e-9:bad.append({'label':label,'ab':ab,'trace':z,'selector':v})
 return {'lpair':car['lpair'],'rpair':car['rpair'],'labels':len(labels),'abLabels':sum((l[0] in c.A and l[1] in c.B) or (l[1] in c.A and l[0] in c.B) for l in labels),'bad':bad}

cars=[x for x in c.strong_carriers() if (s.tw(x['op'],5),s.tw(x['op'],10))==(8,4)]
rows=[audit(x) for x in cars]
print(json.dumps({'protocol':'spin23-ab-projector-all-robust/1','carriers':len(rows),'labelCountHistogram':dict(Counter(r['labels'] for r in rows)),'abLabelCountHistogram':dict(Counter(r['abLabels'] for r in rows)),'badCarrierCount':sum(bool(r['bad']) for r in rows),'bad': [r for r in rows if r['bad']]},default=list,indent=2))
