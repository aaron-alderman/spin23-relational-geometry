import contextlib
import io
import math
import runpy
import numpy as np

with contextlib.redirect_stdout(io.StringIO()):
    env = runpy.run_path('.scratch_spin23_marginal_nonradial_hessian.py')

field_matrix = env['field_matrix']
labels = ((2,9),(5,10),(2,6),(6,7),(1,4))
mats = [field_matrix(label) for label in labels]


def values(u):
    x = (0.25+u,0.25-u,0.5-u,0.25,u)
    D = sum(math.sqrt(max(0,v))*M for v,M in zip(x,mats))
    eigen = np.linalg.eigvalsh(D)
    mass2 = eigen*eigen
    t2 = float(np.sum(mass2))
    t4 = float(np.dot(mass2,mass2))
    spectral_log = float(sum(z*z*math.log(z) for z in mass2 if z>1e-13))
    partial_isometry_residual=float(np.linalg.norm(D@D@D-0.5*D,ord='fro'))
    projection_residual=float(np.linalg.norm((2*D@D)@(2*D@D)-2*D@D,ord='fro'))
    return t2,t4,spectral_log,mass2,partial_isometry_residual,projection_residual


grid=np.linspace(0,.25,1001)
rows=[values(float(u)) for u in grid]
logs=np.array([row[2] for row in rows])
imax=int(np.argmax(logs));imin=int(np.argmin(logs))
print('PROTOCOL spin23-flat-fermion-determinant-cw/1')
print('TRD2_RANGE',min(r[0] for r in rows),max(r[0] for r in rows))
print('TRD4_RANGE',min(r[1] for r in rows),max(r[1] for r in rows))
print('MAX_PARTIAL_ISOMETRY_RESIDUAL',max(r[4] for r in rows))
print('MAX_PROJECTION_RESIDUAL',max(r[5] for r in rows))
print('SPECTRAL_LOG_MIN',grid[imin],logs[imin])
print('SPECTRAL_LOG_MAX',grid[imax],logs[imax])
print('FERMION_CW_MIN',grid[imax])
for u in (0,.025,.05,.075,.1,.125,.15,.175,.2,.225,.25):
    t2,t4,slog,m2,partial_residual,projection_residual=values(u)
    nonzero=m2[m2>1e-10]
    rounded=[]
    for z in sorted(nonzero):
        if not rounded or abs(z-rounded[-1][0])>1e-8:rounded.append([z,1])
        else:rounded[-1][1]+=1
    print('SAMPLE',u,t2,t4,slog,'RANK',len(nonzero),'MASS2',rounded,'RESIDUALS',partial_residual,projection_residual)
