import json
import numpy as np


eta=np.diag([-1.0,-1.0,1.0,1.0,1.0])

# Lambda^2(V): induced form, then reverse its overall sign to match the
# previously measured Killing convention (six positive, four negative).
wedge=[]
for i in range(5):
    for j in range(i+1,5):
        item=np.zeros((5,5));item[i,j]=1;item[j,i]=-1
        wedge.append(item)
wedge_gram=np.array([[0.5*np.einsum('ij,ik,jl,kl',a,eta,eta,b) for b in wedge] for a in wedge])
killing_convention=-wedge_gram

# Symmetric tensors with Frobenius-normalized coordinate basis. Restrict the
# induced form to the Euclidean orthogonal complement of eta (the trace line).
symmetric=[]
for i in range(5):
    item=np.zeros((5,5));item[i,i]=1;symmetric.append(item)
for i in range(5):
    for j in range(i+1,5):
        item=np.zeros((5,5));item[i,j]=item[j,i]=1/np.sqrt(2);symmetric.append(item)
sym_gram=np.array([[np.einsum('ij,ik,jl,kl',a,eta,eta,b) for b in symmetric] for a in symmetric])
trace_coordinates=np.array([np.vdot(item,eta).real for item in symmetric])
_,_,vh=np.linalg.svd(trace_coordinates[None,:])
traceless_basis=vh[1:,:].T
traceless_gram=traceless_basis.T@sym_gram@traceless_basis

def signature(matrix,tolerance=1e-9):
    values=np.linalg.eigvalsh((matrix+matrix.T)/2)
    return {
        'negative':int(np.sum(values<-tolerance)),
        'zero':int(np.sum(abs(values)<=tolerance)),
        'positive':int(np.sum(values>tolerance)),
        'eigenvalues':values.tolist(),
    }

adjoint_signature=signature(killing_convention)
tensor_signature=signature(traceless_gram)
nontrivial={
    'positive':6*adjoint_signature['positive']+tensor_signature['positive'],
    'negative':6*adjoint_signature['negative']+tensor_signature['negative'],
}

print(json.dumps({
    'protocol':'spin23-completed-module-signature/1',
    'vectorMetricSignature':{'negative':2,'positive':3},
    'adjoint10':adjoint_signature,
    'symmetricTraceless14':tensor_signature,
    'completedModule':{
        'decomposition':'94*1 + 6*10 + 14',
        'nontrivialSignature':nontrivial,
        'singletSignFreedom':94,
        'allSingletsPositiveSignature':{
            'positive':nontrivial['positive']+94,
            'negative':nontrivial['negative'],
        },
    },
},indent=2))
