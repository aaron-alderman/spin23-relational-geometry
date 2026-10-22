import importlib.util,json,numpy as np
spec=importlib.util.spec_from_file_location('k','.scratch_spin23_ab_commutator_leakage_kkt.py');k=importlib.util.module_from_spec(spec);spec.loader.exec_module(k)
idx=[6,7,9,10];Q=k.Q[np.ix_(idx,idx)];L=k.L[idx]
def active_min(d):
 t=d/4;x=np.array([.5-t/2,.3-11*t/20,.2+t/20,.25-t/4]);R=np.diag(np.sqrt(x));A=4*R@Q@R;Ki=np.diag(1/np.sqrt(L));ev=np.linalg.eigvalsh(Ki@A@Ki);return x,ev
def inactive_min(d):return min(-9/25+183*d/200,1/5+13*d/40)
grid=np.linspace(24/61+1e-7,24/11-1e-7,20001);rows=[]
for d in grid:
 x,ev=active_min(d);rows.append((min(inactive_min(d),ev[0]),d,inactive_min(d),ev[0],x,ev))
best=max(rows,key=lambda z:z[0]);samples=[]
for d in [24/61,.4,.5,56/59,1,1.5,2,24/11]:
 x,ev=active_min(d);samples.append({'delta':d,'inactiveMin':inactive_min(d),'activeRadial':ev.tolist(),'activeX':x.tolist(),'combinedMin':min(inactive_min(d),ev[0])})
print(json.dumps({'protocol':'spin23-unrestricted-active-radial-margin/1','window':['24/61','24/11'],'bestGrid':{'delta':best[1],'combinedMin':best[0],'inactiveMin':best[2],'activeRadialMin':best[3],'activeX':best[4].tolist(),'activeSpectrum':best[5].tolist()},'samples':samples},indent=2))
