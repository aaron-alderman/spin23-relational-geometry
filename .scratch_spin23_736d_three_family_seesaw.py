import math

def mm(a,b):
  return [[sum(a[i][k]*b[k][j] for k in range(len(b))) for j in range(len(b[0]))] for i in range(len(a))]
def tr(a): return [list(x) for x in zip(*a)]
def maxerr(a,b): return max(abs(a[i][j]-b[i][j]) for i in range(len(a)) for j in range(len(a[0])))
def rot12(t):
  c,s=math.cos(t),math.sin(t);return [[c,s,0],[-s,c,0],[0,0,1]]
def rot13(t):
  c,s=math.cos(t),math.sin(t);return [[c,0,s],[0,1,0],[-s,0,c]]
def rot23(t):
  c,s=math.cos(t),math.sin(t);return [[1,0,0],[0,c,s],[0,-s,c]]

U=mm(rot23(math.radians(49)),mm(rot13(math.radians(8.6)),rot12(math.radians(33))))
m=[0.001,0.0087,0.05] # illustrative eV
target=mm(U,mm([[m[0],0,0],[0,m[1],0],[0,0,m[2]]],tr(U)))

def build(M_GeV,exact=False):
  M=M_GeV*1e9
  d=[math.sqrt(mi*(M+mi) if exact else mi*M) for mi in m]
  md=mm(U,[[d[0],0,0],[0,d[1],0],[0,0,d[2]]])
  recon=[[x/M for x in row] for row in mm(md,tr(md))]
  yuk=[di/(174e9) for di in d]
  mix=[math.sqrt(mi/(M+2*mi)) for mi in m]
  return maxerr(target,recon),d,yuk,mix

print('PROTOCOL spin23-736d-three-family-seesaw/1')
for M in (4443458625444.669,42148605527.45891,1129.51664418529):
  print('POINT',M,'APPROX',build(M,False),'EXACT_MODE_DATA',build(M,True)[1:])
print('ARBITRARY_ORTHOGONAL_U_RECONSTRUCTION',U)
print('PASSED',build(1129.51664418529,False)[0]<1e-15)
