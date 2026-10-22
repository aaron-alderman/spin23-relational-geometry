import importlib.util,json,numpy as np

def load(path,name):
 spec=importlib.util.spec_from_file_location(name,path);m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m);return m
k=load('.scratch_spin23_ab_commutator_leakage_kkt.py','k')
L=np.asarray(k.L,float);Q=np.asarray(k.Q,float);n=len(L);names=[str(x) for x in k.labels]
w8={'(1, 4)':1/13,'(1, 7)':1,'(4, 8)':2/5}
w10={'(1, 2)':1,'(1, 3)':1,'(1, 4)':9/13,'(4, 8)':3/5}
w4={'(1, 4)':3/13}
desired={'(2, 6)','(2, 9)','(5, 10)','(6, 7)'}

def solve(c8=0,c10=0,c4=0):
 mass=np.array([c8*w8.get(z,0)+c10*w10.get(z,0)+c4*w4.get(z,0) for z in names]);Leff=L*(1-mass);ph=[]
 for mask in range(1,1<<n):
  idx=[i for i in range(n) if mask>>i&1];A=Q[np.ix_(idx,idx)]
  if np.linalg.matrix_rank(A)<len(idx) or np.linalg.eigvalsh(A)[0]<-1e-8:continue
  xA=np.linalg.solve(2*A,Leff[idx])
  if min(xA)<-1e-8:continue
  x=np.zeros(n);x[idx]=xA;g=-Leff+2*Q@x
  if any(g[i]<-1e-8 for i in range(n) if i not in idx):continue
  active={names[i] for i in idx if x[i]>1e-8};ph.append((float(-Leff@x+x@Q@x),active,{names[i]:float(x[i]) for i in idx if x[i]>1e-8}))
 ph.sort(key=lambda z:z[0]);b=ph[0];return {'c8':c8,'c10':c10,'c4':c4,'energy':b[0],'active':sorted(b[1]),'desired':b[1]==desired,'x':b[2]}

def threshold(which):
 lo,hi=0.,2.
 for _ in range(70):
  z=(lo+hi)/2;args={'c8':0,'c10':0,'c4':0};args[which]=z
  if solve(**args)['desired']:hi=z
  else:lo=z
 return hi,solve(**{**{'c8':0,'c10':0,'c4':0},which:hi+1e-8})

print(json.dumps({'protocol':'spin23-ideal-weighted-repair-kkt/1','pureSO8':threshold('c8'),'pureSO10':threshold('c10'),'pureSO4':threshold('c4'),'equalBenchmarks':[solve(c8=x,c10=x,c4=x) for x in (.35,.36,.37)],'pureSO8Benchmarks':[solve(c8=x) for x in (.89,.9,.91,1.0)],'pureSO10Benchmarks':[solve(c10=x) for x in (.59,.6,.61,1.0)]},indent=2))
