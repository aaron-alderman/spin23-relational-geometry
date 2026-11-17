"""Charge-shell convergence with Feshbach exterior and response-residual bounds.

Analytic estimates apply to the infinite isolated rotor cell. Numerical eigenvalue
ordering is checked by sparse solves but is not interval-certified. They do not
bound the interacting chain's local-root or ground-dressing error.
"""
import argparse
import hashlib
import json
import time
from pathlib import Path
import numpy as np
from scipy import sparse
from scipy.sparse.linalg import LinearOperator, cg, eigsh

p=argparse.ArgumentParser()
p.add_argument('--prefix',required=True)
p.add_argument('--padding',type=float,default=1e-10)
args=p.parse_args();start=time.time();prefix=Path(args.prefix)
meta=json.loads(Path(str(prefix)+'.json').read_text());n=meta['dimension'];cutoff=meta['cutoff']
states=np.fromfile(str(prefix)+'.states.bin',dtype='<i2').reshape(n,8)
neighbors=np.fromfile(str(prefix)+'.neighbors.bin',dtype='<i4').reshape(n,16)
diag=np.fromfile(str(prefix)+'.diagonal.bin',dtype='<f8')
assert np.array_equal(states[::-1],-states)
assert n%2==1
m=n//2;rt2=np.sqrt(2.)
valid=neighbors>=0
rows=np.broadcast_to(np.arange(n,dtype=np.int32)[:,None],neighbors.shape)[valid]
cols=neighbors[valid]
vals=np.broadcast_to(-np.repeat(np.array(meta['amplitudes']),2)/2,neighbors.shape)[valid]
H=sparse.coo_matrix((vals,(rows,cols)),shape=(n,n)).tocsr()+sparse.diags(diag)
del rows,cols,vals,valid

# Enumerate every missing nearest-neighbor edge and identify shared exterior
# sites by collision-free base-128 integer keys. The actual exterior graph is
# unnecessary: V>=0 implies QHQ>=T_Q>=(cutoff+1)Q.
assert np.max(abs(states))<62
powers=np.left_shift(np.uint64(1),np.arange(8,dtype=np.uint64)*7)
keys=(states.astype(np.int64)+64).astype(np.uint64)@powers
outside_keys=[];outside_rows=[];outside_vals=[]
for ch in range(8):
 for slot,sign in [(2*ch,-1),(2*ch+1,1)]:
    row=np.flatnonzero(neighbors[:,slot]<0).astype(np.int32)
    outside_keys.append(keys[row]+powers[ch] if sign>0 else keys[row]-powers[ch])
    outside_rows.append(row)
    outside_vals.append(np.full(len(row),-meta['amplitudes'][ch]/2))
outside_keys=np.concatenate(outside_keys)
unique,indices=np.unique(outside_keys,return_inverse=True)
B=sparse.coo_matrix((np.concatenate(outside_vals),(np.concatenate(outside_rows),indices)),shape=(n,len(unique))).tocsr()
del outside_keys,outside_rows,outside_vals,unique,indices,keys,neighbors
print(json.dumps({'stage':'compiled','cutoff':cutoff,'dimension':n,'boundaryEdges':B.nnz,'exteriorSites':B.shape[1]}),flush=True)

def lift(v,parity):
    out=np.empty(n);out[:m]=v[:m]/rt2;out[m+1:]=parity*v[:m][::-1]/rt2
    out[m]=v[m] if parity==1 else 0
    return out
def reduce(v,parity):
    paired=(v[:m]+parity*v[m+1:][::-1])/rt2
    return np.r_[paired,v[m]] if parity==1 else paired
def parity_operator(fullmv,parity):
    size=m+(parity==1)
    return LinearOperator((size,size),matvec=lambda v:reduce(fullmv(lift(v,parity)),parity))
def low(operator,seed):
    e,V=eigsh(operator,k=2,which='SA',tol=2e-12,ncv=28,v0=np.random.default_rng(seed).normal(size=operator.shape[0]))
    order=np.argsort(e);e,V=e[order],V[:,order]
    residuals=[float(np.linalg.norm(operator@V[:,i]-e[i]*V[:,i])) for i in range(2)]
    return e,V,residuals
Hp={s:parity_operator(lambda v:H@v,s) for s in [1,-1]}
eP,VP,resP={}, {}, {}
for s in [1,-1]:
    eP[s],VP[s],resP[s]=low(Hp[s],823250+cutoff+s)
print(json.dumps({'stage':'ritz','cutoff':cutoff,'even':eP[1].tolist(),'odd':eP[-1].tolist()}),flush=True)
upper=max(eP[1][1],eP[-1][1])+args.padding
exterior_lower=cutoff+1
assert exterior_lower>upper
denominator=exterior_lower-upper
def lower_mv(v):return H@v-B@(B.T@v)/denominator
lower,lower_res={},{}
for s in [1,-1]:
    eig,_,res=low(parity_operator(lower_mv,s),923250+cutoff+s)
    lower[s]=eig-args.padding-np.array(res)
    lower_res[s]=res
E0=float(eP[1][0]);E1=float(eP[-1][0]);gap=E1-E0
assert eP[1][0]+args.padding<lower[-1][0]
g=lift(VP[1][:,0],1);first=lift(VP[-1][:,0],-1)
positions=np.arange(8)-3.5;dvalues=states@positions
bfull=dvalues*g;b=reduce(bfull,-1)
shifted=LinearOperator(Hp[-1].shape,matvec=lambda v:Hp[-1]@v-E0*v)
pre=LinearOperator(Hp[-1].shape,matvec=lambda v:v/(diag[:m]-E0))
y,info=cg(shifted,b,M=pre,rtol=2e-12,atol=0,maxiter=3000);assert info==0
z,info=cg(shifted,y,M=pre,rtol=2e-12,atol=0,maxiter=3000);assert info==0
yfull,zfull=lift(y,-1),lift(z,-1)
S=float(b@b);amp=float(first@bfull);W=amp*amp
M0=float(2*b@y);M2=float(2*y@z)
E0error=max(0.,E0+args.padding-lower[1][0])
even_separation=float(lower[1][1]-E0-args.padding)
odd_gap_lower=float(lower[-1][0]-E0-args.padding)
next_odd_separation=float(lower[-1][1]-E1-args.padding)
assert min(even_separation,odd_gap_lower,next_odd_separation)>0
ground_residual=float(np.hypot(np.linalg.norm(B.T@g),resP[1][0]))
first_residual=float(np.hypot(np.linalg.norm(B.T@first),resP[-1][0]))
eta0=min(2.,rt2*ground_residual/even_separation)
eta1=min(2.,rt2*first_residual/next_odd_separation)
def rayleigh_state_error(energy_error,separation):
    s2=min(1.,max(0.,energy_error/separation))
    # Stable form of sqrt(2*(1-sqrt(1-s2))).
    return np.sqrt(2*s2/(1+np.sqrt(1-s2)))
eta0=min(eta0,rayleigh_state_error(E0error,even_separation))
eta1=min(eta1,rayleigh_state_error(max(0.,E1+args.padding-lower[-1][0]),next_odd_separation))
K=np.array([[2,-1,0,0,0,0,0,0],[-1,2,-1,0,0,0,0,0],[0,-1,2,-1,0,0,0,-1],[0,0,-1,2,-1,0,0,0],[0,0,0,-1,2,-1,0,0],[0,0,0,0,-1,2,-1,0],[0,0,0,0,0,-1,2,0],[0,0,-1,0,0,0,0,2]])
Ccharge=float(2*positions@np.linalg.solve(K,positions))
# d^2 <= Ccharge*T <= Ccharge*H as quadratic forms. For e=g-g_P,
# <e,H e>=(E_P-E_true)+E_true*||e||^2.
source_error=float(np.sqrt(Ccharge*(E0error+(E0+args.padding)*eta0*eta0)))
bnorm=float(np.sqrt(S));true_bnorm_upper=bnorm+source_error
strength_error=source_error*(2*bnorm+source_error)
amplitude_error=source_error+eta1*bnorm
weight_error=amplitude_error*(2*abs(amp)+amplitude_error)
ey_res=float(np.linalg.norm(shifted@y-b));ez_res=float(np.linalg.norm(shifted@z-y))
ey=(ey_res+np.linalg.norm(B.T@yfull)+E0error*np.linalg.norm(y)+source_error)/odd_gap_lower
ez=(ez_res+np.linalg.norm(B.T@zfull)+E0error*np.linalg.norm(z)+ey)/odd_gap_lower
M0error=float(2*(source_error*np.linalg.norm(y)+true_bnorm_upper*ey))
M2error=float(2*(ey*np.linalg.norm(z)+(np.linalg.norm(y)+ey)*ez))
record={'schemaVersion':'e8-infinite-local-shell-error-estimate-v1','cutoff':cutoff,'dimension':n,
 'groundEnergy':E0,'groundEnergyLower':float(lower[1][0]),'groundEnergyErrorUpper':float(E0error),
 'firstOddEnergy':E1,'firstGap':float(gap),'firstPoleWeight':W,'firstPoleFraction':W/S,
 'totalDipoleStrength':S,'static':M0,'slope':M2,
 'errorBounds':{'firstPoleWeightAbsolute':float(weight_error),'totalStrengthAbsolute':float(strength_error),
     'staticAbsolute':M0error,'slopeAbsolute':M2error,'sourceNormAbsolute':source_error,
     'groundStateNorm':float(eta0),'firstOddStateNorm':float(eta1)},
 'boundInputs':{'exteriorEnergyLower':exterior_lower,'feshbachDenominator':float(denominator),
     'oddGapLower':odd_gap_lower,'nextOddSeparationLower':next_odd_separation,
     'evenSeparationLower':even_separation,'chargeFormConstant':Ccharge,
     'exteriorGroundResidual':float(np.linalg.norm(B.T@g)),
     'exteriorFirstResidual':float(np.linalg.norm(B.T@first)),
     'exteriorFirstInverseResidual':float(np.linalg.norm(B.T@yfull)),
     'exteriorSecondInverseResidual':float(np.linalg.norm(B.T@zfull)),
     'numericalPadding':args.padding},
 'ritzResiduals':{str(s):resP[s] for s in [1,-1]},'lowerComparisonResiduals':{str(s):lower_res[s] for s in [1,-1]},
 'inverseSolveResiduals':[ey_res,ez_res],
 'proof':[
 'H=T+sum_i u_i(1-cos theta_i)>=T, so QHQ>=cutoff+1.',
 'For energies below U, Feshbach self-energy <= B B^T/(cutoff+1-U). Eigenvalues of H_P-BB^T/denominator give lower comparison levels.',
 'Full Ritz residuals and parity-resolved lower spectral separations bound ground/first-odd state errors.',
 'd^2<=2(ell^T K^-1 ell) H controls the otherwise unbounded dipole on the ground-state error.',
 'Full inverse-equation residuals and the odd-gap lower bound control y=(H-E0)^-1 d g and z=(H-E0)^-2 d g; static=2b.y and slope=2y.z.'
 ],
 'scope':'Analytic exterior estimates evaluated in floating point, conditional on correct lowest eigenvalue identification and numerical margins; not interval-certified. Infinite isolated rotor cell only, not the interacting chain or physical electromagnetic calibration.',
 'codeSha256':hashlib.sha256(Path(__file__).read_bytes()).hexdigest(),'elapsedSeconds':time.time()-start}
dest=Path(f'evidence/data/translation-free-e8-charge-shell-{cutoff}-audit-v1.json')
dest.write_text(json.dumps(record,indent=2)+'\n')
print(json.dumps({'stage':'complete','output':str(dest),**record}),flush=True)
