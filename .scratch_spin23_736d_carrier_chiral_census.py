import importlib.util
from collections import Counter,defaultdict
from itertools import combinations

spec=importlib.util.spec_from_file_location('conn','.scratch_spin23_connectors.py')
conn=importlib.util.module_from_spec(spec); spec.loader.exec_module(conn)

A={1,8}; B={2,3,4,7,9}; C={5,10}
phase={**{i:6 for i in A|B},**{i:49 for i in C},6:-123}

def components(index,edge):
    i,j=edge;a=2 if i in A or j in A else 1
    color='3' if i in C else ('3bar' if j in C else '1')
    x=(phase[i]-phase[j])//43
    return [(index,edge,(a,color,x+bw)) for bw in ((-3,3) if i in B or j in B else (0,))]

def dual(rep):
    return (rep[0],{'3':'3bar','3bar':'3','1':'1'}[rep[1]],-rep[2])

def label(e1,e2):
    i,j=e1;k,l=e2
    if i==l:return tuple(sorted((j,k)))
    if j==k:return tuple(sorted((i,l)))
    return None

def maxmatch(left,right,allowed_labels=None):
    links={u:[v for v in right if label(u[1],v[1]) is not None and (allowed_labels is None or label(u[1],v[1]) in allowed_labels)] for u in left}
    owner={}
    def aug(u,seen):
      for v in links[u]:
        key=(v[0],v[2])
        if key in seen:continue
        seen.add(key)
        if key not in owner or aug(owner[key],seen):owner[key]=u;return True
      return False
    return sum(aug(u,set()) for u in left)

standard=Counter({(2,'3',1):3,(1,'3bar',-4):3,(1,'3bar',2):3,(2,'1',-3):3,(1,'1',6):3,(1,'1',0):3})
conjugate=Counter({dual(k):v for k,v in standard.items()})

rows=[]
for carrier in conn.strong_carriers():
    op=carrier['op']; by=defaultdict(list)
    for n,e in enumerate(op):
      for node in components(n,e):by[node[2]].append(node)
    residual=Counter({k:len(v) for k,v in by.items()})
    seen=set();all_full=True
    for rep in list(residual):
      d=dual(rep)
      if rep==d or rep in seen or d not in residual:continue
      seen|={rep,d};need=min(residual[rep],residual[d])
      if maxmatch(by[rep],by[d])<need:all_full=False
      residual[rep]-=need;residual[d]-=need
    residual=Counter({k:v for k,v in residual.items() if v})
    family='standard' if residual==standard else ('conjugate' if residual==conjugate else 'other')
    left=by.get((2,'1',-3),[]);right=by.get((2,'1',3),[]);need=min(len(left),len(right))
    labels=sorted({label(u[1],v[1]) for u in left for v in right if label(u[1],v[1])})
    minlabels=None;witness=None
    for size in range(len(labels)+1):
      for subset in combinations(labels,size):
        if maxmatch(left,right,set(subset))==need:minlabels=size;witness=subset;break
      if minlabels is not None:break
    rows.append({'lpair':carrier['lpair'],'rpair':carrier['rpair'],'family':family,'fullVectorlikeSupport':all_full,'rightPairNeed':need,'minRightLabels':minlabels,'rightLabelWitness':witness})

print('PROTOCOL spin23-736d-carrier-chiral-census/1')
print('CARRIERS',len(rows))
print('FAMILY_HISTOGRAM',Counter(r['family'] for r in rows))
print('FULL_VECTORLIKE_SUPPORT',sum(r['fullVectorlikeSupport'] for r in rows))
print('MIN_RIGHT_LABEL_HISTOGRAM',Counter((r['family'],r['minRightLabels']) for r in rows))
best=[r for r in rows if r['family'] in ('standard','conjugate') and r['fullVectorlikeSupport'] and r['minRightLabels']==1]
print('ONE_RIGHT_LABEL_THREE_FAMILY_CARRIERS',len(best))
for row in best:print('BEST',row)
print('PASSED',len(rows)==56)
