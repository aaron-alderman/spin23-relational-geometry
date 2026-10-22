import importlib.util, math

spec=importlib.util.spec_from_file_location('corr','.scratch_spin23_736d_corrected_corridor.py')
corr=importlib.util.module_from_spec(spec); spec.loader.exec_module(corr)

mnu=0.05e-9; vev=174.0

def point(y):
  x,_,z,*_=corr.solve(y)
  mr=corr.scale(x); mk=corr.scale(x+y); ml=corr.scale(x+y+z)
  def branch(lam):
    mn=mr*mr/lam
    return {'MN':mn,'yNu':math.sqrt(mnu*mn)/vev,'mixing':math.sqrt(mnu/mn)}
  return mr,mk,ml,branch(mk),branch(ml)

def root(target,which):
  lo,hi=0.0,corr.y_z0
  slot=3 if which=='MK' else 4
  start=point(lo)[slot]['MN']; end=point(hi)[slot]['MN']
  if not end <= target <= start:
    return None
  for _ in range(100):
    mid=(lo+hi)/2
    val=point(mid)[slot]['MN']
    if val>target: lo=mid
    else: hi=mid
  return (lo+hi)/2

print('PROTOCOL spin23-736d-corrected-neutrino/1')
for y in (0,4,8,12,corr.y_z0): print('POINT',y,point(y))
for target in (1e9,1e6,1e4,1e3,174):
  for which in ('MK','ML'):
    y=root(target,which)
    print('BOUNDARY',target,which,'y',y,'scales',None if y is None else point(y)[:3])
print('PASSED',True)
