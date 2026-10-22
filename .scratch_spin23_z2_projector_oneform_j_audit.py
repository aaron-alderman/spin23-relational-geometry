from itertools import product
import importlib.util,json,numpy as np

def load(path,name):
 spec=importlib.util.spec_from_file_location(name,path);m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m);return m
c=load('.scratch_spin23_connectors.py','c')
h=load('.scratch_spin23_all_robust_hessian_scan.py','h')
s=load('.scratch_spin23_all_robust_supports_fast.py','s')

def audit(car):
 op=car['op'];bd=[c.DIMS[i]*c.DIMS[j] for i,j in op];off=np.cumsum([0]+bd[:-1]).tolist();n=sum(bd);FM=h.field_builder(car)
 def qdiag(side):
  z=np.zeros(2*n)
  for k,(i,j) in enumerate(op):
   q=lambda a:1 if a in c.A else (-1 if a in c.B else 0)
   z[off[k]:off[k]+bd[k]]=q(i if side=='L' else j)
   z[n+off[k]:n+off[k]+bd[k]]=q(j if side=='L' else i)
  return z
 qL,qR=qdiag('L'),qdiag('R');sL=qL*qL;sR=qR*qR
 def pi(D,q,ss):return .5*(ss[:,None]*D*ss[None,:]-q[:,None]*D*q[None,:])
 # Explicit antiunitary J=U K swaps every positive module with its tensor-flipped partner.
 U=np.zeros((2*n,2*n))
 for k,(i,j) in enumerate(op):
  di,dj=c.DIMS[i],c.DIMS[j];K=np.zeros((di*dj,di*dj))
  for a in range(di):
   for b in range(dj):K[b*di+a,a*dj+b]=1
  p=off[k];r=n+off[k];U[r:r+bd[k],p:p+bd[k]]=K;U[p:p+bd[k],r:r+bd[k]]=K.T
 def jact(X):return U@X.conj()@U.T
 labels=sorted({e['orbit'] for e in car['graph']['edges']});maxsel=0.;maxj=0.;maxjd=0.;basisCount=0;bad=[]
 for label in labels:
  nr,nc=c.DIMS[label[1]],c.DIMS[label[0]]
  isab=(label[0] in c.A and label[1] in c.B) or (label[1] in c.A and label[0] in c.B)
  for a,b in product(range(nr),range(nc)):
   F=np.zeros((nr,nc));F[a,b]=1;D=FM(label,F);basisCount+=1
   PL,PR=pi(D,qL,sL),pi(D,qR,sR)
   # Each A-B one-form can live in either left/right-selected entries; their sum of norms reproduces D.
   target=np.vdot(D,D).real if isab else 0.0
   got=np.vdot(PL,PL).real+np.vdot(PR,PR).real
   maxsel=max(maxsel,abs(got-target)/max(1,target))
   maxjd=max(maxjd,np.linalg.norm(jact(D)-D)/max(1,np.linalg.norm(D)))
   maxj=max(maxj,np.linalg.norm(jact(PL)-PR)/max(1,np.linalg.norm(PR)))
   if abs(got-target)>1e-8:bad.append({'label':label,'basis':[a,b],'got':got,'target':target})
 return {'basisCount':basisCount,'maxSelectorRelativeError':maxsel,'maxJDiracRelativeError':maxjd,'maxJExchangeRelativeError':maxj,'bad':bad}

cars=[x for x in c.strong_carriers() if (s.tw(x['op'],5),s.tw(x['op'],10))==(8,4)]
rows=[audit(x) for x in cars]
print(json.dumps({'protocol':'spin23-z2-projector-oneform-j-audit/1','carriers':len(rows),'totalOneFormMatrixBases':sum(r['basisCount'] for r in rows),'maxSelectorRelativeError':max(r['maxSelectorRelativeError'] for r in rows),'maxJDiracRelativeError':max(r['maxJDiracRelativeError'] for r in rows),'maxJExchangeRelativeError':max(r['maxJExchangeRelativeError'] for r in rows),'badCount':sum(len(r['bad']) for r in rows)},indent=2))
