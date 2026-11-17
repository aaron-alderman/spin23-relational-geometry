"""Independent sparse solve and full-shell local charge-tail audit.

Uses the exact finite charge-shell operator exported by the existing JS solver.
No claim about states outside that shell or a physical electromagnetic device.
"""
import argparse
import hashlib
import json
import time
from pathlib import Path

import numpy as np
import scipy
from scipy import sparse
from scipy.sparse.linalg import LinearOperator, cg, eigsh

SOURCE_SHA256 = hashlib.sha256(Path(__file__).read_bytes()).hexdigest()

p = argparse.ArgumentParser()
p.add_argument('--prefix', default='.tmp/e8-charge-convergence/shell8')
p.add_argument('--roots', type=int, default=32)
p.add_argument('--ncv', type=int)
args = p.parse_args()
prefix = Path(args.prefix)
meta = json.loads(Path(str(prefix)+'.json').read_text())
n = meta['dimension']
states = np.fromfile(str(prefix)+'.states.bin', dtype='<i2').reshape(n, 8)
neighbors = np.fromfile(str(prefix)+'.neighbors.bin', dtype='<i4').reshape(n, 16)
diagonal = np.fromfile(str(prefix)+'.diagonal.bin', dtype='<f8')
assert np.array_equal(states[::-1], -states)
valid = neighbors >= 0
row = np.broadcast_to(np.arange(n)[:, None], neighbors.shape)[valid]
col = neighbors[valid]
values = np.broadcast_to(-np.repeat(np.array(meta['amplitudes']), 2)/2, neighbors.shape)[valid]
H = sparse.coo_matrix((values, (row, col)), shape=(n, n)).tocsr()+sparse.diags(diagonal)
del row, col, values
count = args.roots+1  # include the next excitation for tail-energy estimates
cache = Path(str(prefix)+f'.eigen{count}.npz')
operator_hash = hashlib.sha256(b''.join(Path(str(prefix)+s).read_bytes() for s in ['.json','.states.bin','.neighbors.bin','.diagonal.bin'])).hexdigest()
started = time.time()
print(json.dumps({'stage':'local-eigensolve','dimension':n,'roots':count,'cached':cache.exists()}), flush=True)
if cache.exists():
    data = np.load(cache)
    assert str(data['operator_hash']) == operator_hash
    energies, vectors = data['energies'], data['vectors']
else:
    energies, vectors = eigsh(H, k=count, which='SA', tol=2e-12, ncv=args.ncv or max(2*count+8, 40), v0=np.random.default_rng(823248).normal(size=n))
    order = np.argsort(energies)
    energies, vectors = energies[order], vectors[:, order]
    for i in range(count):
        if vectors[np.argmax(np.abs(vectors[:, i])), i] < 0:
            vectors[:, i] *= -1
    np.savez(cache, energies=energies, vectors=vectors, operator_hash=operator_hash)
residuals = np.linalg.norm(H@vectors-vectors*energies, axis=0)
parities = np.sum(vectors*vectors[::-1], axis=0)
assert max(residuals) < 1e-8
assert max(abs(abs(parities)-1)) < 1e-7
print(json.dumps({'stage':'operators','seconds':time.time()-started,'maxResidual':float(max(residuals))}), flush=True)
Q, C, A = [], [], []
for i in range(8):
    Q.append(vectors.T@(states[:, i, None]*vectors))
    minus, plus = neighbors[:, 2*i], neighbors[:, 2*i+1]
    work = np.zeros_like(vectors)
    work[minus >= 0] = vectors[minus[minus >= 0]]
    projected_minus = vectors.T@work
    work.fill(0)
    work[plus >= 0] = vectors[plus[plus >= 0]]
    projected_plus = vectors.T@work
    C.append((projected_minus+projected_plus)/2)
    A.append((projected_plus-projected_minus)/2)
    del work
    print(json.dumps({'stage':'channel','channel':i}), flush=True)
positions = np.arange(8)-3.5
dvalues = states@positions
D = vectors.T@(dvalues[:, None]*vectors)
D2 = vectors.T@((dvalues*dvalues)[:, None]*vectors)
ground = vectors[:, 0]
b = dvalues*ground
b -= ground*np.dot(ground, b)
strength = float(b@b)
def mv(v):
    return H@v-energies[0]*v+ground*np.dot(ground, v)
shifted = LinearOperator((n,n), matvec=mv)
preconditioner = LinearOperator((n,n), matvec=lambda v:v/(diagonal-energies[0]))
y, info = cg(shifted, b, M=preconditioner, rtol=2e-11, atol=0, maxiter=3000)
assert info == 0
z, info = cg(shifted, y, M=preconditioner, rtol=2e-11, atol=0, maxiter=3000)
assert info == 0
full_static, full_slope = float(2*b@y), float(2*y@z)
first_moment_direct=float(b@(H@b-energies[0]*b))
first_moment_commutator=float(sum(meta['amplitudes'][i]*positions[i]**2*C[i][0,0]/2 for i in range(8)))
assert abs(first_moment_direct-first_moment_commutator)<1e-8
tail_records = []
for r in [4,6,8,12,16,24,32,48,64]:
    if r > args.roots: continue
    weights = D[1:r, 0]**2
    gaps = energies[1:r]-energies[0]
    omitted = max(0., strength-float(sum(weights)))
    delta = float(energies[r]-energies[0])
    retained_static, retained_slope = float(sum(2*weights/gaps)), float(sum(2*weights/gaps**3))
    tail_records.append({'roots':r,'retainedStrength':float(sum(weights)),'omittedStrength':omitted,
        'omittedFraction':omitted/strength,'nextGap':delta,
        'retainedStatic':retained_static,'retainedSlope':retained_slope,
        'actualStaticTail':full_static-retained_static,'actualSlopeTail':full_slope-retained_slope,
        'staticTailUpper':2*omitted/delta,'slopeTailUpper':2*omitted/delta**3})
boundary = np.isclose(diagonal-sum(meta['amplitudes']), meta['cutoff'])
dictionary = {'schemaVersion':'translation-free-e8-local-operator-dictionary-v1',
    'settings':{'cutoff':meta['cutoff'],'roots':count,'potential':.5,'branch':meta['branch'],'basisStates':n},
    'levels':[{'energy':float(e),'residual':float(r)} for e,r in zip(energies,residuals)],
    'parities':np.sign(parities).astype(int).tolist(),
    'boundaryProbabilities':np.sum(vectors[boundary]**2,axis=0).tolist(),
    'cosineMatrices':[x.tolist() for x in C], 'sineProxyMatrices':[x.tolist() for x in A],
    'projectedChargeMatrices':[x.tolist() for x in Q],
    'projectedDipoleSquaredMatrix':D2.tolist(), 'dipolePositionsInPitchUnits':positions.tolist(),
    'chargeExtension':{'method':'direct charge-basis integration','operatorSha256':operator_hash},
    'claimBoundary':'Direct finite-shell local solve; includes next state for tail estimates. No physical unit calibration or infinite-shell bound.'}
shell_tag='' if meta['cutoff']==8 else f"-shell{meta['cutoff']}"
dest = Path(f'evidence/data/translation-free-e8-local-charge-dictionary-r{count}{shell_tag}-direct-v1.json')
dest.write_text(json.dumps(dictionary,indent=2)+'\n')
report = {'schemaVersion':'e8-full-shell-local-charge-tail-v1','dictionary':str(dest),'dimension':n,
    'codeSha256':SOURCE_SHA256,
    'numpy':np.__version__,'scipy':scipy.__version__,'operatorSha256':operator_hash,
    'maximumResidual':float(max(residuals)), 'totalChargeDriveStrength':strength,
    'fullShellStatic':full_static,'fullShellSlope':full_slope,
    'firstMomentDirect':first_moment_direct,'firstMomentDoubleCommutator':first_moment_commutator,
    'inverseSolveRelativeResiduals':[float(np.linalg.norm(mv(y)-b)/np.linalg.norm(b)),float(np.linalg.norm(mv(z)-y)/np.linalg.norm(y))],
    'records':tail_records,
    'tailFormula':'W_tail=||d|0>||^2-sum_retained |d_a0|^2; M0_tail<=2 W_tail/nextGap; M2_tail<=2 W_tail/nextGap^3',
    'boundary':'Numerical finite-shell estimates assuming the computed lowest states are correctly ordered. No formal interval certification, no omitted-shell bound, and no interacting-chain tail-energy bound.',
    'elapsedSeconds':time.time()-started}
Path(f'evidence/data/translation-free-e8-full-shell-local-charge-tail{shell_tag}-v1.json').write_text(json.dumps(report,indent=2)+'\n')
print(json.dumps({'stage':'complete',**report}),flush=True)
