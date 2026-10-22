from fractions import Fraction as F
import importlib.util,json

def load(path,name):
 spec=importlib.util.spec_from_file_location(name,path);m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m);return m

k=load('.scratch_spin23_ab_commutator_leakage_kkt.py','k')
L=[F(round(x)) for x in k.L]
Q=[[F(round(x)) for x in row] for row in k.Q]
active=[6,7,9,10]

def solve(A,b):
 M=[row[:]+[z] for row,z in zip(A,b)];n=len(M)
 for j in range(n):
  p=next(i for i in range(j,n) if M[i][j]);M[j],M[p]=M[p],M[j];q=M[j][j];M[j]=[z/q for z in M[j]]
  for i in range(n):
   if i==j:continue
   q=M[i][j];M[i]=[a-q*b for a,b in zip(M[i],M[j])]
 return [M[i][-1] for i in range(n)]

A=[[2*Q[i][j] for j in active] for i in active]
# On the unrestricted ray, effective linear coefficient is L_i*(1-delta*w_i),
# with w=1/4 for boundary active fields and 0 otherwise.
b0=[L[i] for i in active]
b1=[-L[i]*F(1,4) if k.kind(k.labels[i])=='boundary' else F(0) for i in active]
x0=solve(A,b0);x1=solve(A,b1)

def dot(a,b):return sum(x*y for x,y in zip(a,b))
# E_min=-1/2 b(delta).x(delta).
e0=-F(1,2)*dot(b0,x0)
e1=-F(1,2)*(dot(b0,x1)+dot(b1,x0))
e2=-F(1,2)*dot(b1,x1)

# W(y)=E(kappa*y)+Lambda*(y-1)^2.
# convex iff Lambda+e2*kappa^2>0; stationary y=(2Lambda-e1*kappa)/(2*(Lambda+e2*kappa^2)).
out={
 'protocol':'spin23-dynamic-q-backreaction/1',
 'activeLabels':[str(k.labels[i]) for i in active],
 'x0':[str(x) for x in x0],
 'xDeltaSlope':[str(x) for x in x1],
 'emin':{'constant':str(e0),'linear':str(e1),'quadratic':str(e2)},
 'dynamic':{
  'variable':'y=q^2>=0; delta=kappa*y',
  'potential':'W(y)=E_min(kappa*y)+Lambda*(y-1)^2',
  'boundedness':f'Lambda > {-e2}*kappa^2',
  'stationary':'y*=(2 Lambda-e1 kappa)/(2(Lambda+e2 kappa^2))',
  'shift':'y*-1=-(e1*kappa+2*e2*kappa^2)/(2(Lambda+e2*kappa^2))'
 },
 'benchmarks':[]
}
for kap in [F(2,5),F(1,2),F(20,19)]:
 # choose Lambda = m*kappa^2 threshold for m=1,2,5,10 where admissible
 for m in [F(1),F(2),F(5),F(10)]:
  Lam=m*kap*kap
  den=2*(Lam+e2*kap*kap)
  if den<=0:continue
  y=(2*Lam-e1*kap)/den
  delta=kap*y
  out['benchmarks'].append({'kappa':str(kap),'LambdaOverKappa2':str(m),'yStar':str(y),'deltaEffective':str(delta),'insideRadialWindow':delta>F(24,61) and delta<F(24,11)})
print(json.dumps(out,indent=2))
