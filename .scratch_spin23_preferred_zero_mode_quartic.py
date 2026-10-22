import importlib.util,json,numpy as np
def load(path,name):
 spec=importlib.util.spec_from_file_location(name,path);m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m);return m
c=load('.scratch_spin23_connectors.py','c');h=load('.scratch_spin23_all_robust_hessian_scan.py','h')
car=next(x for x in c.strong_carriers() if x['lpair']==((1,5),(10,1)) and x['rpair']==((10,2),(4,10)));FM=h.field_builder(car)
def inv(F):
 S=F.T@F;return float(np.trace(S)**2),float(np.trace(S@S)),h.t4(FM((1,7),F))
samples=[np.array([[1.,0.],[0.,0.]]),np.eye(2),np.array([[1.,2.],[3.,4.]]),np.array([[0.,1.],[-1.,0.]])]
rows=[inv(F) for F in samples];M=np.array([[rows[0][0],rows[0][1]],[rows[1][0],rows[1][1]]]);a,b=np.linalg.solve(M,np.array([rows[0][2],rows[1][2]]));res=max(abs(q-a*i1-b*i2) for i1,i2,q in rows)
print(json.dumps({'protocol':'spin23-preferred-zero-mode-quartic/1','samples':rows,'coefficients':{'traceSquared':float(a),'traceSquare':float(b)},'maxResidual':float(res),'positiveDefinite':bool(a>=0 and a+b>0)},indent=2))
