import json
import numpy as np

s1=np.array([[0,1],[1,0]],complex)
s2=np.array([[0,-1j],[1j,0]],complex)
s3=np.array([[1,0],[0,-1]],complex)
I2=np.eye(2,dtype=complex); I4=np.eye(4,dtype=complex)
e=[np.kron(s1,s1),np.kron(s1,s2),np.kron(s1,s3),np.kron(s2,I2),np.kron(s3,I2)]
G=[1j*e[0],e[1],e[2],e[3],1j*e[4]]
signature=[-1,1,1,1,-1]
N=G[4]
chir=1j*G[0]@G[1]@G[2]@G[3]
Beta=1j*G[0]@G[4]

def tr(z):
    q=complex(np.trace(z))
    return {'real':float(np.real_if_close(q).real),'imag':float(np.real_if_close(q).imag)}
def err(z): return float(np.linalg.norm(z))
def kadj(x): return Beta@x.conj().T@Beta

rows=[]
B=chir@N
for a in range(4):
    J=(G[a]@G[4]-G[4]@G[a])/4
    A=J@N-N@J
    rows.append({
        'a':a,
        'vectorSignature':signature[a],
        'betaConjugationError':err(Beta@G[a]@Beta-signature[a]*G[a]),
        'kreinAdjointEigenvalue': 1 if err(kadj(A)-A)<1e-10 else (-1 if err(kadj(A)+A)<1e-10 else None),
        'kreinHSNorm':tr(kadj(A)@A),
        'kreinHSMixed':tr(kadj(A)@B),
        'singleBetaNorm':tr(A.conj().T@Beta@A),
        'singleBetaMixed':tr(A.conj().T@Beta@B)
    })

out={
    'protocol':'spin23-product-compensator-krein/1',
    'Beta':'i Gamma_0 Gamma_4',
    'betaHermitianError':err(Beta.conj().T-Beta),
    'betaSquareError':err(Beta@Beta-I4),
    'inducedVectorActionErrors':[err(Beta@G[a]@Beta-(signature[a] if a in (0,4) else 1)*G[a]) for a in range(5)],
    'finiteLikeB':{
        'chiralityTimesNScalar':'i I4',
        'kreinAdjointEigenvalue':1 if err(kadj(B)-B)<1e-10 else (-1 if err(kadj(B)+B)<1e-10 else None),
        'kreinHSNorm':tr(kadj(B)@B),
        'singleBetaNorm':tr(B.conj().T@Beta@B)
    },
    'brokenDirections':rows,
    'conclusion':'Two-Beta operator Krein-HS pairing cancels every mixed term but is indefinite across residual Lorentz directions. The single-Beta trace makes all displayed pure and mixed traces vanish in this irreducible 4-spinor trace, so it cannot supply the desired quadratic action without an additional insertion or trace prescription.'
}
print(json.dumps(out,indent=2))
