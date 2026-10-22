from collections import Counter
import importlib.util,json

def load(path,name):
 spec=importlib.util.spec_from_file_location(name,path);m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m);return m
c=load('.scratch_spin23_connectors.py','c')
s=load('.scratch_spin23_all_robust_supports_fast.py','s')

group={node:('A' if node in c.A else 'B' if node in c.B else str(node)) for node in c.DIMS}

def audit(car):
 if 'graph' not in car:car={**car,'graph':c.connector_graph(car['op'])}
 hp=Counter();hm=Counter();gp=Counter();gm=Counter()
 for i,j in car['op']:
  # Positive module (i,j), then J partner (j,i); Q_L reads first index.
  for left,right in ((i,j),(j,i)):
   d=c.DIMS[left]*c.DIMS[right]
   if left in c.A:hp[right]+=d;gp[group[right]]+=d
   if left in c.B:hm[right]+=d;gm[group[right]]+=d
 common=sum(min(hp[k],hm[k]) for k in set(hp)|set(hm))
 broken=sum(2*hp[k]*hm[k] for k in set(hp)|set(hm))
 abmediators={}
 for e in car['graph']['edges']:
  a,b=e['orbit']
  if not ((a in c.A and b in c.B) or (b in c.A and a in c.B)):continue
  p,r=car['op'][e['u']],car['op'][e['v']]
  shared=p[1] if p[1]==r[0] else p[0]
  abmediators.setdefault(str(e['orbit']),set()).add(shared)
 commonnodes={k for k in hp if hp[k] and hm[k]}
 medset=set().union(*abmediators.values()) if abmediators else set()
 return {'nodePlus':dict(sorted(hp.items())),'nodeMinus':dict(sorted(hm.items())),'groupPlus':dict(sorted(gp.items())),'groupMinus':dict(sorted(gm.items())),'nodeMatched':hp==hm,'groupMatched':gp==gm,'maxMatchedDimension':common,'spectatorBlockBrokenGenerators':broken,'allABMediatorsCommon':medset<=commonnodes,'abMediators':{z:sorted(v) for z,v in sorted(abmediators.items())}}

cars=[x for x in c.strong_carriers() if (s.tw(x['op'],5),s.tw(x['op'],10))==(8,4)]
rows=[audit(x) for x in cars]
print(json.dumps({'protocol':'spin23-q-support-representation-pairing/1','carriers':len(rows),'nodeMatched':sum(r['nodeMatched'] for r in rows),'groupMatched':sum(r['groupMatched'] for r in rows),'matchedDimensionHistogram':dict(Counter(r['maxMatchedDimension'] for r in rows)),'brokenGeneratorHistogram':dict(Counter(r['spectatorBlockBrokenGenerators'] for r in rows)),'allABMediatorsCommonCarriers':sum(r['allABMediatorsCommon'] for r in rows),'distinctPatterns':len({json.dumps(r,sort_keys=True) for r in rows}),'preferred':audit({'op':c.BASE+[(1,5),(10,1),(10,2),(4,10)]})},indent=2))
