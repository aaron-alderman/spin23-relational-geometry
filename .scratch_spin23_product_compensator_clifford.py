import json,numpy as np
s1=np.array([[0,1],[1,0]],complex);s2=np.array([[0,-1j],[1j,0]],complex);s3=np.array([[1,0],[0,-1]],complex);I=np.eye(2)
e=[np.kron(s1,s1),np.kron(s1,s2),np.kron(s1,s3),np.kron(s2,I),np.kron(s3,I)]
# Signature (-,+,+,+,-): indices 0..3 residual Lorentz, 4 broken timelike.
G=[1j*e[0],e[1],e[2],e[3],1j*e[4]];eta=[-1,1,1,1,-1];N=G[4]
chir=1j*G[0]@G[1]@G[2]@G[3]
def fnorm(x):return float(np.linalg.norm(x))
cliff=max(fnorm(G[a]@G[b]+G[b]@G[a]-2*(eta[a] if a==b else 0)*np.eye(4)) for a in range(5) for b in range(5))
rows=[]
for a in range(4):
 J=(G[a]@G[4]-G[4]@G[a])/4
 C=J@N-N@J
 B=chir@N
 rows.append({'a':a,'cartanVsGammaError':min(fnorm(C-G[a]),fnorm(C+G[a])),'mixedTrace':complex(np.trace(C.conj().T@B)).real,'mixedTraceImag':complex(np.trace(C.conj().T@B)).imag,'traceC':complex(np.trace(C)).real})
z=np.trace((chir@N))/4
print(json.dumps({'protocol':'spin23-product-compensator-clifford/1','signature':eta,'cliffordError':cliff,'N2Error':fnorm(N@N+np.eye(4)),'chirality2Error':fnorm(chir@chir-np.eye(4)),'chiralityTimesNScalar':{'real':float(z.real),'imag':float(z.imag),'error':fnorm(chir@N-z*np.eye(4))},'brokenDirections':rows},indent=2))
