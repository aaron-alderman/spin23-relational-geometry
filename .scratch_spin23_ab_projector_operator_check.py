import importlib.util,json,numpy as np
def load(path,name):
 spec=importlib.util.spec_from_file_location(name,path);m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m);return m
c=load('.scratch_spin23_connectors.py','c');h=load('.scratch_spin23_all_robust_hessian_scan.py','h')
car=next(x for x in c.strong_carriers() if x['lpair']==((1,5),(10,1)) and x['rpair']==((10,2),(4,10)));FM=h.field_builder(car);op=car['op'];bd=[c.DIMS[i]*c.DIMS[j] for i,j in op];off=np.cumsum([0]+bd[:-1]).tolist()
def proj(side,nodes):
 d=np.zeros(184)
 for k,(i,j) in enumerate(op):
  z=bd[k];d[off[k]:off[k]+z]=int((i if side=='L' else j) in nodes)
  d[92+off[k]:92+off[k]+z]=int((j if side=='L' else i) in nodes)
 return np.diag(d)
LA,LB,RA,RB=proj('L',c.A),proj('L',c.B),proj('R',c.A),proj('R',c.B)
def hs(X):return float(np.sum(X*X))
def selector(D):return sum(hs(P@D@Q) for P,Q in ((LA,LB),(LB,LA),(RA,RB),(RB,RA)))
rows=[]
for label in sorted({e['orbit'] for e in car['graph']['edges']}):
 F=h.canonical(label);D=FM(label,F);z=h.t2(D);n=selector(D);ab=(label[0] in c.A and label[1] in c.B) or (label[1] in c.A and label[0] in c.B);rows.append({'label':label,'AB':ab,'traceD2':z,'selector':n,'ratio':None if z==0 else n/z})
print(json.dumps({'protocol':'spin23-ab-projector-operator-check/1','projectorChecks':{'LA2':float(np.linalg.norm(LA@LA-LA)),'LB2':float(np.linalg.norm(LB@LB-LB)),'LALB':float(np.linalg.norm(LA@LB))},'rows':rows,'allExact':all(abs(r['selector']-(r['traceD2'] if r['AB'] else 0))<1e-9 for r in rows)},default=list,indent=2))
