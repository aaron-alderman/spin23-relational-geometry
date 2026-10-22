import json
import numpy as np


def generator(a,b):
    item=np.zeros((5,5));item[a,b]=1;item[b,a]=-1
    return item


def pack(matrix):
    return matrix.ravel()


def rank(matrices,tolerance=1e-10):
    if not matrices:
        return 0
    values=np.linalg.svd(np.stack([pack(item) for item in matrices],axis=1),compute_uv=False)
    return int(np.sum(values>tolerance*max(1.0,float(values[0]))))


h=[generator(i,j) for i in range(4) for j in range(i+1,4)]
m=[generator(i,4) for i in range(4)]

# Adjoint 10 = h6 + m4.  The seed is the complete m4.
adjoint_forward=[a@v-v@a for a in m for v in m]
adjoint_reverse=[a@v-v@a for a in m for v in h]

# Symmetric traceless 14 = scalar1 + vector4 + tensor9 under SO(4).
vector=[]
for i in range(4):
    item=np.zeros((5,5));item[i,4]=item[4,i]=1/np.sqrt(2);vector.append(item)
scalar=np.diag([1,1,1,1,-4]).astype(float)/np.sqrt(20)
tensor=[]
for i in range(3):
    item=np.zeros((5,5));item[i,i]=1;item[3,3]=-1;tensor.append(item/np.sqrt(2))
for i in range(4):
    for j in range(i+1,4):
        item=np.zeros((5,5));item[i,j]=item[j,i]=1/np.sqrt(2);tensor.append(item)

sym_forward=[a@v-v@a for a in m for v in vector]
sym_reverse=[a@v-v@a for a in m for v in [scalar]+tensor]

def projection_residual(matrices,target):
    basis=np.stack([pack(item) for item in target],axis=1)
    q,_=np.linalg.qr(basis)
    return max(float(np.linalg.norm(pack(item)-q@(q.T@pack(item)))) for item in matrices)


print(json.dumps({
    'protocol':'spin23-ads-descendant-maps/1',
    'adjoint10':{
        'seedDimension':rank(m),
        'forwardImageRank':rank(adjoint_forward),
        'forwardTargetDimension':rank(h),
        'forwardOutsideTargetResidual':projection_residual(adjoint_forward,h),
        'reverseImageRank':rank(adjoint_reverse),
        'reverseTargetDimension':rank(m),
        'reverseOutsideTargetResidual':projection_residual(adjoint_reverse,m),
    },
    'symmetricTraceless14':{
        'seedDimension':rank(vector),
        'forwardImageRank':rank(sym_forward),
        'forwardTargetDimension':rank([scalar]+tensor),
        'forwardOutsideTargetResidual':projection_residual(sym_forward,[scalar]+tensor),
        'reverseImageRank':rank(sym_reverse),
        'reverseTargetDimension':rank(vector),
        'reverseOutsideTargetResidual':projection_residual(sym_reverse,vector),
    },
},indent=2))
