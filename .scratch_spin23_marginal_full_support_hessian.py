from itertools import product
import importlib.util
import json
import numpy as np

spec=importlib.util.spec_from_file_location('c','.scratch_spin23_connectors.py')
c=importlib.util.module_from_spec(spec);spec.loader.exec_module(c)
target=next(x for x in c.strong_carriers() if x['lpair']==((8,10),(10,1)) and x['rpair']==((10,2),(7,5)))
op=target['op']; block_dims=[c.DIMS[i]*c.DIMS[j] for i,j in op]; offsets=np.cumsum([0]+block_dims[:-1]).tolist()
assert sum(block_dims)==92

ACTIVE={(2,9):np.eye(2),(5,10):np.eye(3),(2,6):np.array([[1.,0.]]),(6,7):np.array([[1.],[0.]])}
SUPPORT=((1,2),(1,3),(1,4),(1,5),(1,7),(1,8),(1,9),(2,6),(2,7),(2,9),(5,10),(6,7),(6,8),(8,9))

def field_matrix(label,Fcanonical):
    D=np.zeros((184,184))
    for edge in target['graph']['edges']:
        if edge['orbit']!=label:continue
        u,v=edge['u'],edge['v'];p,q=op[u],op[v]
        horizontal=p[1]==q[0] and p[0]!=q[1];vertical=p[0]==q[1] and p[1]!=q[0];assert horizontal!=vertical
        a,b=(p[0],q[1]) if horizontal else (p[1],q[0])
        F=Fcanonical if (a,b)==label else Fcanonical.T
        if horizontal:
            X=np.kron(F,np.eye(c.DIMS[p[1]]));XJ=np.kron(np.eye(c.DIMS[p[1]]),F)
        else:
            X=np.kron(np.eye(c.DIMS[p[0]]),F);XJ=np.kron(F,np.eye(c.DIMS[p[0]]))
        pu,jv,ju,pv=offsets[u],92+offsets[v],92+offsets[u],offsets[v]
        D[jv:jv+X.shape[0],pu:pu+X.shape[1]]+=X;D[pu:pu+X.shape[1],jv:jv+X.shape[0]]+=X.T
        D[pv:pv+XJ.shape[0],ju:ju+XJ.shape[1]]+=XJ;D[ju:ju+XJ.shape[1],pv:pv+XJ.shape[0]]+=XJ.T
    return D

def tr2(D):return float(np.trace(D@D))
def tr4(D):
    D2=D@D;return float(np.trace(D2@D2))
def V(D):return -tr2(D)+tr4(D)

x={(2,9):.25,(5,10):.25,(2,6):.5,(6,7):.25}
D0=sum(np.sqrt(x[label])*field_matrix(label,F) for label,F in ACTIVE.items());V0=V(D0)
results=[]
for label in SUPPORT:
    if label in ACTIVE:continue
    rows,cols=c.DIMS[label[1]],c.DIMS[label[0]]
    basis=[]
    for i,j in product(range(rows),range(cols)):
        F=np.zeros((rows,cols));F[i,j]=1;basis.append(field_matrix(label,F))
    n=len(basis);A=np.zeros((n,n));maxlin=maxcub=0
    for i,Xi in enumerate(basis):
        A[i,i]=(V(D0+Xi)+V(D0-Xi))/2-V0-tr4(Xi)
        dm1=V(D0+Xi)-V(D0-Xi);dm2=V(D0+2*Xi)-V(D0-2*Xi)
        maxlin=max(maxlin,abs((8*dm1-dm2)/12));maxcub=max(maxcub,abs((dm2-2*dm1)/12))
        for j in range(i):
            Xj=basis[j]
            def mixed(h):return (V(D0+h*Xi+h*Xj)-V(D0+h*Xi-h*Xj)-V(D0-h*Xi+h*Xj)+V(D0-h*Xi-h*Xj))/(4*h*h)
            A[i,j]=A[j,i]=((4*mixed(1)-mixed(2))/3)/2
    results.append({'label':label,'shape':[rows,cols],'eigenvalues':np.linalg.eigvalsh(A).tolist(),'rank':int(np.linalg.matrix_rank(A,tol=1e-8)),'maxBasisLinear':maxlin,'maxBasisCubic':maxcub})

print(json.dumps({'protocol':'spin23-marginal-full-support-real-hessian/1','backgroundPotential':V0,'support':SUPPORT,'results':results},indent=2))
