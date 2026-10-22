import importlib.util,json,numpy as np
def load(path,name):
 spec=importlib.util.spec_from_file_location(name,path);m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m);return m
c=load('.scratch_spin23_connectors.py','c');h=load('.scratch_spin23_all_robust_hessian_scan.py','h');s=load('.scratch_spin23_all_robust_supports_fast.py','s')
def audit(car):
 op=car['op'];bd=[c.DIMS[i]*c.DIMS[j] for i,j in op];off=np.cumsum([0]+bd[:-1]).tolist();n=sum(bd);FM=h.field_builder(car)
 def pv(side,nodes):
  d=np.zeros(2*n)
  for k,(i,j) in enumerate(op):
   d[off[k]:off[k]+bd[k]]=int((i if side=='L' else j) in nodes)
   d[n+off[k]:n+off[k]+bd[k]]=int((j if side=='L' else i) in nodes)
  return d
 LA,LB,RA,RB=pv('L',c.A),pv('L',c.B),pv('R',c.A),pv('R',c.B)
 def commnorm(D,A,B):
  S=A+B;Q=A-B;X=S[:,None]*(Q[:,None]*D-D*Q[None,:])*S[None,:];return float(np.sum(X*X))/4
 bad=[]
 for l in sorted({e['orbit'] for e in car['graph']['edges']}):
  D=FM(l,h.canonical(l));v=commnorm(D,LA,LB)+commnorm(D,RA,RB);ab=(l[0] in c.A and l[1] in c.B) or (l[1] in c.A and l[0] in c.B);z=h.t2(D) if ab else 0
  if abs(v-z)>1e-9:bad.append({'label':l,'target':z,'value':v})
 return bad
cars=[x for x in c.strong_carriers() if (s.tw(x['op'],5),s.tw(x['op'],10))==(8,4)]
bad=[{'carrier':i,'bad':audit(x)} for i,x in enumerate(cars)];bad=[x for x in bad if x['bad']]
print(json.dumps({'protocol':'spin23-ab-commutator-identity/1','carriers':len(cars),'badCarrierCount':len(bad),'identity':'N_AB=(||S_L[Q_L,D]S_L||^2+||S_R[Q_R,D]S_R||^2)/4','bad':bad},indent=2))
