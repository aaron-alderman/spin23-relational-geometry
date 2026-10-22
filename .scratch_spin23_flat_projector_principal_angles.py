import contextlib, io, runpy, math
import numpy as np

with contextlib.redirect_stdout(io.StringIO()):
    env=runpy.run_path('.scratch_spin23_flat_fermion_determinant_cw.py')
mats=env['mats']

def D(u):
    x=(.25+u,.25-u,.5-u,.25,u)
    return sum(math.sqrt(max(0,v))*M for v,M in zip(x,mats))

P0=2*D(0)@D(0)
eig,vec=np.linalg.eigh(P0)
B0=vec[:,eig>.5]
print('PROTOCOL spin23-flat-projector-principal-angles/1')
for u in (0,.025,.05,.075,.1,.125,.15,.175,.2,.225,.25):
    P=2*D(u)@D(u)
    cos2=np.linalg.eigvalsh(B0.T@P@B0)
    groups=[]
    for z in sorted(cos2):
        if not groups or abs(z-groups[-1][0])>1e-8:groups.append([float(z),1])
        else:groups[-1][1]+=1
    print('U',u,'COS2',groups,'COMMUTATOR',np.linalg.norm(P0@P-P@P0,'fro'))
max_residual=0.0
for u in np.linspace(0,.25,101):
    P=2*D(float(u))@D(float(u))
    actual=np.linalg.eigvalsh(B0.T@P@B0)
    predicted=np.array(sorted([1-4*u]*12+[1-2*u]*4+[(1+math.sqrt(max(0,1-16*u*u)))/2]*12+[1]*36))
    max_residual=max(max_residual,float(np.max(np.abs(actual-predicted))))
print('MAX_CLOSED_FORM_RESIDUAL',max_residual)
