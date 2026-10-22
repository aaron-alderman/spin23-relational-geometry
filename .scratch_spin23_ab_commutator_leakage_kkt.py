from itertools import combinations
import importlib.util,json,numpy as np
def load(path,name):
 spec=importlib.util.spec_from_file_location(name,path);m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m);return m
c=load('.scratch_spin23_connectors.py','c');h=load('.scratch_spin23_all_robust_hessian_scan.py','h')
car=next(x for x in c.strong_carriers() if x['lpair']==((1,5),(10,1)) and x['rpair']==((10,2),(4,10)));FM=h.field_builder(car)
labels=((1,2),(1,3),(1,4),(1,7),(1,9),(2,5),(2,6),(2,9),(4,8),(5,10),(6,7));names=[str(x) for x in labels];mats=[FM(l,h.canonical(l)) for l in labels];n=len(labels)
L=np.array([h.t2(M) for M in mats]);Q=np.diag([h.t4(M) for M in mats])
for i,j in combinations(range(n),2):Q[i,j]=Q[j,i]=(h.t4(mats[i]+mats[j])-Q[i,i]-Q[j,j])/2
def kind(l):
 a,b=l;aa=a in c.A;ab=b in c.A;ba=a in c.B;bb=b in c.B
 if (aa and bb) or (ab and ba):return 'AB'
 if (aa or ab or ba or bb):return 'boundary'
 return 'other'
desired={'(2, 6)','(2, 9)','(5, 10)','(6, 7)'};delta=9/25
def solve(r,d=delta):
 w=np.array([1 if kind(l)=='AB' else r if kind(l)=='boundary' else 0 for l in labels]);Leff=L*(1-d*w);ph=[]
 for mask in range(1,1<<n):
  idx=[i for i in range(n) if mask>>i&1];A=Q[np.ix_(idx,idx)]
  if np.linalg.matrix_rank(A)<len(idx) or np.linalg.eigvalsh(A)[0]<-1e-8:continue
  xA=np.linalg.solve(2*A,Leff[idx])
  if min(xA)<-1e-8:continue
  x=np.zeros(n);x[idx]=xA;g=-Leff+2*Q@x
  if any(g[i]<-1e-8 for i in range(n) if i not in idx):continue
  active={names[i] for i in idx if x[i]>1e-8};ph.append((float(-Leff@x+x@Q@x),active,{names[i]:float(x[i]) for i in idx if x[i]>1e-8}))
 ph.sort(key=lambda z:z[0]);best=ph[0];return {'delta':d,'r':r,'count':len(ph),'energy':best[0],'active':sorted(best[1]),'desired':best[1]==desired,'x':best[2],'gap':None if len(ph)<2 else ph[1][0]-best[0]}
if __name__=='__main__':
 grid=[0,.05,.1,.15,.2,.25,.3,.4,.5,.6,.75,1,1.5,2,2.5]
 print(json.dumps({'protocol':'spin23-ab-commutator-leakage-kkt/1','kind':{str(l):kind(l) for l in labels},'rows':[solve(r) for r in grid]},indent=2))
