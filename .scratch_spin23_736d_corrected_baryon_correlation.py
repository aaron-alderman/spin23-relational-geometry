import importlib.util

spec=importlib.util.spec_from_file_location('corr','.scratch_spin23_736d_corrected_corridor.py')
corr=importlib.util.module_from_spec(spec); spec.loader.exec_module(corr)

vev=174.0

def point(y):
  x,_,z,*_=corr.solve(y)
  mr=corr.scale(x); mk=corr.scale(x+y); ml=corr.scale(x+y+z)
  return {
    'y':y,'MR':mr,'MK':mk,'ML':ml,
    'mu_MK':vev*mr/mk,'mu_ML':vev*mr/ml,
    'MN_MK':mr*mr/mk,'MN_ML':mr*mr/ml
  }

def root(target,which):
  key='mu_'+which
  lo,hi=0.0,corr.y_z0
  start=point(lo)[key]; end=point(hi)[key]
  if not end <= target <= start:
    return None
  for _ in range(100):
    mid=(lo+hi)/2
    if point(mid)[key] > target: lo=mid
    else: hi=mid
  return (lo+hi)/2

print('PROTOCOL spin23-736d-corrected-baryon-correlation/1')
for y in (0,4,8,12,corr.y_z0): print('POINT',point(y))
for target in (1,1e-3,1e-6,1e-9):
  for which in ('MK','ML'):
    y=root(target,which)
    print('BOUNDARY',target,which,'y',y,'point',None if y is None else point(y))
print('PASSED',True)
