from fractions import Fraction as F
import importlib.util,json
def load(path,name):
 spec=importlib.util.spec_from_file_location(name,path);m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m);return m
k=load('.scratch_spin23_ab_commutator_leakage_kkt.py','k')
L=[F(round(x)) for x in k.L];Q=[[F(round(x)) for x in row] for row in k.Q];active=[6,7,9,10];inactive=[i for i in range(k.n) if i not in active]
def solve(A,b):
 M=[row[:]+[z] for row,z in zip(A,b)];n=len(M)
 for j in range(n):
  p=next(i for i in range(j,n) if M[i][j]);M[j],M[p]=M[p],M[j];q=M[j][j];M[j]=[z/q for z in M[j]]
  for i in range(n):
   if i==j:continue
   q=M[i][j];M[i]=[a-q*b for a,b in zip(M[i],M[j])]
 return [M[i][-1] for i in range(n)]
A=[[2*Q[i][j] for j in active] for i in active];b0=[L[i] for i in active];bt=[-L[i] if k.kind(k.labels[i])=='boundary' else F(0) for i in active]
x0=solve(A,b0);xt=solve(A,bt)
def linstr(a,b=F(0),c=F(0)):
 terms=[]
 if a:terms.append(str(a))
 if b:terms.append(('+' if b>0 and terms else '')+str(b)+'*delta')
 if c:terms.append(('+' if c>0 and terms else '')+str(c)+'*t')
 return ''.join(terms) or '0'
grads={}
for i in inactive:
 a=-L[i]+sum(2*Q[i][j]*x0[z] for z,j in enumerate(active));b=L[i] if k.kind(k.labels[i])=='AB' else F(0);ct=L[i] if k.kind(k.labels[i])=='boundary' else F(0);ct+=sum(2*Q[i][j]*xt[z] for z,j in enumerate(active));grads[str(k.labels[i])]=(a,b,ct)
ga,gb,gc=grads[str(k.labels[8])]
out={'protocol':'spin23-ab-leakage-symbolic-wedge/1','variables':{'delta':'A-B coefficient','t':'absolute boundary leakage coefficient = delta*r'},'activeSolution':{str(k.labels[i]):linstr(x0[z],F(0),xt[z]) for z,i in enumerate(active)},'inactiveGradients':{name:linstr(*v) for name,v in grads.items()},'gStabilityInequality':f'delta >= {(-ga)/gb} + {(-gc)/gb}*t','atDelta9over25':'G stable only for t<=0, hence r<=0','unrestrictedRay':'t=delta/4 implies delta >= 24/61'}
print(json.dumps(out,indent=2))
