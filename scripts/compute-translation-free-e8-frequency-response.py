"""Full finite-shell sub-resonant response; no local-root spectral truncation."""
import argparse
import hashlib
import json
from pathlib import Path
import numpy as np
from scipy import sparse
from scipy.sparse.linalg import LinearOperator,cg

p=argparse.ArgumentParser()
p.add_argument('--prefix',required=True)
p.add_argument('--fractions',default='0,0.2,0.4,0.6,0.8')
p.add_argument('--cache-count',type=int,default=65)
args=p.parse_args();prefix=Path(args.prefix)
source_sha=hashlib.sha256(Path(__file__).read_bytes()).hexdigest()
meta=json.loads(Path(str(prefix)+'.json').read_text())
assert meta['branch']=='cartan-kernel' and meta['kineticStrength']==1
n=meta['dimension'];m=n//2
states=np.fromfile(str(prefix)+'.states.bin',dtype='<i2').reshape(n,8)
neighbors=np.fromfile(str(prefix)+'.neighbors.bin',dtype='<i4').reshape(n,16)
diagonal=np.fromfile(str(prefix)+'.diagonal.bin',dtype='<f8')
valid=neighbors>=0
rows=np.broadcast_to(np.arange(n,dtype=np.int32)[:,None],neighbors.shape)[valid]
cols=neighbors[valid]
values=np.broadcast_to(-np.repeat(np.array(meta['amplitudes']),2)/2,neighbors.shape)[valid]
H=sparse.coo_matrix((values,(rows,cols)),shape=(n,n)).tocsr()+sparse.diags(diagonal)
del rows,cols,values,valid,neighbors
cache=np.load(str(prefix)+f'.eigen{args.cache_count}.npz')
energies=cache['energies'];V=cache['vectors'];g=V[:,0].copy();del V
assert np.array_equal(states[::-1],-states)
g=(g+g[::-1])/2;g/=np.linalg.norm(g)
E0=float(g@(H@g));gap=float(energies[1]-E0)
residual=float(np.linalg.norm(H@g-E0*g))
assert residual<1e-8
positions=np.arange(8)-3.5
source=(states@positions)*g
b=(source[:m]-source[m+1:][::-1])/np.sqrt(2.)
def lift(v):
 out=np.empty(n);out[:m]=v/np.sqrt(2.);out[m+1:]=-v[::-1]/np.sqrt(2.);out[m]=0
 return out
def base(v):
 w=H@lift(v)
 return (w[:m]-w[m+1:][::-1])/np.sqrt(2.)-E0*v
records=[]
for fraction in map(float,args.fractions.split(',')):
 omega=fraction*gap
 assert 0<=omega<gap
 sols=[];res=[]
 for sign in [-1,1]:
  A=LinearOperator((m,m),matvec=lambda v:base(v)+sign*omega*v)
  M=LinearOperator((m,m),matvec=lambda v:v/(diagonal[:m]-E0+sign*omega))
  y,info=cg(A,b,M=M,rtol=2e-11,atol=0,maxiter=3000);assert info==0
  sols.append(y);res.append(float(np.linalg.norm(A@y-b)/np.linalg.norm(b)))
 record={'fractionOfFirstGap':fraction,'omega':omega,'response':float(b@(sols[0]+sols[1])),'relativeResiduals':res}
 records.append(record);print(json.dumps(record),flush=True)
report={'schemaVersion':'e8-full-shell-frequency-response-v1','cutoff':meta['cutoff'],'dimension':n,
 'groundEnergy':E0,'firstGap':gap,'groundResidual':residual,'records':records,
 'source':'D/(q_c*pitch)=sum_i (i-3.5)n_i; same geometry as earlier audit',
 'method':'odd-sector inverse solves at H-E0-omega and H-E0+omega; entire finite charge shell',
 'codeSha256':source_sha,'scope':'Numerical isolated-cell finite-shell response. Chosen electric-source identification; no experimental calibration, contacts, damping or physical validation.'}
path=Path(f'evidence/data/translation-free-e8-frequency-response-shell{meta["cutoff"]}-v1.json')
path.write_text(json.dumps(report,indent=2)+'\n');print(json.dumps({'output':str(path)}),flush=True)
