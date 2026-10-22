from itertools import combinations,product
import importlib.util,json,numpy as np
def load(path,name):
 spec=importlib.util.spec_from_file_location(name,path);m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m);return m
c=load('.scratch_spin23_connectors.py','c');h=load('.scratch_spin23_all_robust_hessian_scan.py','h')
car=next(x for x in c.strong_carriers() if x['lpair']==((1,5),(10,1)) and x['rpair']==((10,2),(4,10)));FM=h.field_builder(car)
labels=((1,2),(1,3),(1,4),(1,7),(1,9),(2,5),(2,6),(2,9),(4,8),(5,10),(6,7));names=[str(x) for x in labels];mats=[FM(l,h.canonical(l)) for l in labels];n=len(labels)
L=np.array([h.t2(M) for M in mats]);Q=np.diag([h.t4(M) for M in mats]);odd=0
for i,j in combinations(range(n),2):
 plus=h.t4(mats[i]+mats[j]);minus=h.t4(mats[i]-mats[j]);odd=max(odd,abs(plus-minus));Q[i,j]=Q[j,i]=((plus+minus)/2-Q[i,i]-Q[j,j])/2
allD=sum(mats);pairRecon=float(np.ones(n)@Q@np.ones(n));residual=h.t4(allD)-pairRecon
signRange=[]
for signs in product((-1,1),repeat=n):signRange.append(h.t4(sum(signs[i]*mats[i] for i in range(n))))
Leff=L.copy();delta=9/25
for i,label in enumerate(labels):
 if (label[0] in c.A and label[1] in c.B) or (label[1] in c.A and label[0] in c.B):Leff[i]-=delta*L[i]
phases=[]
for mask in range(1,1<<n):
 idx=[i for i in range(n) if mask>>i&1];QA=Q[np.ix_(idx,idx)]
 if np.linalg.eigvalsh(QA)[0]<-1e-8 or np.linalg.matrix_rank(QA)<len(idx):continue
 xA=np.linalg.solve(2*QA,Leff[idx])
 if min(xA)<-1e-8:continue
 x=np.zeros(n);x[idx]=xA;grad=-Leff+2*Q@x
 if any(grad[i]<-1e-8 for i in range(n) if i not in idx):continue
 energy=-Leff@x+x@Q@x;phases.append({'energy':float(energy),'active':[names[i] for i in idx if x[i]>1e-8],'x':{names[i]:float(x[i]) for i in idx if x[i]>1e-8},'zeroActive':[names[i] for i in idx if abs(x[i])<=1e-8]})
phases.sort(key=lambda z:z['energy'])
print(json.dumps({'protocol':'spin23-preferred-11radial-kkt-universal-ab-mass/1','labels':labels,'L':L.tolist(),'Leff':Leff.tolist(),'Q':Q.tolist(),'oddPairMax':odd,'allPlusResidualBeyondPair':residual,'signTrace4Range':[min(signRange),max(signRange)], 'kktCount':len(phases),'lowest':phases[:12]},default=list,indent=2))
