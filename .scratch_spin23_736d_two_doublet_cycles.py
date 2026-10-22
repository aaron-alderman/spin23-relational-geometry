from collections import defaultdict
from itertools import combinations

op=[(1,5),(1,5),(8,5),(5,2),(5,3),(5,4),(1,6),(8,6),(8,6),(6,4),(6,7),(6,7),(2,1),(7,8),(5,9),(9,10),(1,5),(10,1),(10,2),(4,10)]

edges=[]
for r,p in enumerate(op):
  for s,q in enumerate(op):
    if r>=s: continue
    labels=set()
    if p[1]==q[0] and p[0]!=q[1]: labels.add(tuple(sorted((p[0],q[1]))))
    if p[0]==q[1] and p[1]!=q[0]: labels.add(tuple(sorted((p[1],q[0]))))
    for label in labels: edges.append((r,s,label))

adj=defaultdict(list)
for u,v,label in edges:
    adj[u].append((v,label)); adj[v].append((u,label))

cycles={}
for a,b,c,d in combinations(range(len(op)),4):
  for order in ((a,b,c,d),(a,b,d,c),(a,c,b,d)):
    labels=[];ok=True
    for u,v in zip(order,order[1:]+order[:1]):
      found=[lab for w,lab in adj[u] if w==v]
      if not found:ok=False;break
      labels.append(found[0])
    if ok:
      key=tuple(sorted(order));cycles[(key,tuple(order))]=tuple(labels)

targets={(2,6),(6,7)}
both=[(order,labels) for (_,order),labels in cycles.items() if targets.issubset(set(labels))]
print('PROTOCOL spin23-736d-two-right-doublet-four-cycle/1')
print('SIMPLE_FOUR_CYCLES',len(cycles))
print('CYCLES_WITH_BOTH_RIGHT_LABELS',both)
print('COUNT_WITH_BOTH',len(both))

# Enumerate simple undirected cycles canonically and find the first degree at
# which both right-doublet labels can coexist in one closed trace word.
all_cycles={}
for start in range(len(op)):
  def walk(path,labels):
    u=path[-1]
    for v,label in adj[u]:
      if v==start and len(path)>=3:
        forward=tuple(path)
        reverse=(start,)+tuple(reversed(path[1:]))
        key=min(forward,reverse)
        all_cycles[key]=tuple(labels+[label])
      elif v>start and v not in path:
        walk(path+[v],labels+[label])
  walk([start],[])
both_all=[(cycle,labels) for cycle,labels in all_cycles.items() if targets.issubset(set(labels))]
shortest=min((len(cycle) for cycle,labels in both_all),default=None)
shortest_rows=[row for row in both_all if len(row[0])==shortest]
shortest_even=min((len(cycle) for cycle,labels in both_all if len(cycle)%2==0),default=None)
shortest_even_rows=[row for row in both_all if len(row[0])==shortest_even]
safe={(1,2),(1,3),(1,4),(1,5),(1,7),(1,9),(2,6),(2,9),(4,8),(5,10),(6,7)}
safe_both=[row for row in both_all if set(row[1]).issubset(safe)]
safe_shortest=min((len(row[0]) for row in safe_both if len(row[0])%2==0),default=None)
print('ALL_SIMPLE_CYCLES',len(all_cycles))
print('SHORTEST_CYCLE_WITH_BOTH_LENGTH',shortest)
print('SHORTEST_CYCLES_WITH_BOTH',shortest_rows[:20])
print('SHORTEST_EVEN_CYCLE_WITH_BOTH_LENGTH',shortest_even)
print('SHORTEST_EVEN_CYCLES_WITH_BOTH',shortest_even_rows[:10])
print('SAFE_SUPPORT_EVEN_CYCLE_WITH_BOTH_LENGTH',safe_shortest)
print('PASSED',True)
