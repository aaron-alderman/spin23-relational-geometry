from fractions import Fraction
import heapq,importlib.util,json
spec=importlib.util.spec_from_file_location('c','.scratch_spin23_connectors.py');c=importlib.util.module_from_spec(spec);spec.loader.exec_module(c)

def tw(op,node):return sum(Fraction(c.DIMS[j],2) if i==node else Fraction(c.DIMS[i],2) if j==node else 0 for i,j in op)
def merge(partition,edges):
 parent=list(range(len(partition)))
 def find(x):
  while parent[x]!=x:parent[x]=parent[parent[x]];x=parent[x]
  return x
 reps={}
 for i,z in enumerate(partition):
  if z in reps:parent[find(i)]=find(reps[z])
  else:reps[z]=i
 for e in edges:
  a,b=find(e['u']),find(e['v'])
  if a!=b:parent[a]=b
 roots=[find(i) for i in range(len(partition))];ren={}
 return tuple(ren.setdefault(x,len(ren)) for x in roots)
def optimum(carrier):
 phase={node:carrier['phase'][g] for g,group in enumerate(c.GROUPS) for node in group}
 colored=lambda l:(l[0] in {5,10})^(l[1] in {5,10})
 edges=[e for e in carrier['graph']['edges'] if not(colored(e['orbit']) and abs(phase[e['orbit'][0]]-phase[e['orbit'][1]])==172)]
 by={}
 for e in edges:by.setdefault(e['orbit'],[]).append(e)
 weak=sorted(set(by)&{tuple(sorted((9,b))) for b in c.B});answers=[]
 for w in weak:
  required=tuple(sorted({w,(5,10)}));state=tuple(range(len(carrier['op'])))
  for l in required:state=merge(state,by[l])
  cost=(sum(int(colored(l)) for l in required),len(required));q=[(cost,required,state)];best={state:cost}
  while q:
   co,path,st=heapq.heappop(q)
   if best.get(st)!=co:continue
   if len(set(st))==1:answers.append((co,path));break
   for l,le in by.items():
    ns=merge(st,le)
    if ns==st:continue
    nc=(co[0]+int(colored(l)),co[1]+1)
    if nc<best.get(ns,(999,999)):
     best[ns]=nc;heapq.heappush(q,(nc,tuple(sorted(path+(l,))),ns))
 return min(answers) if answers else None
def analyze(car):
 opt=optimum(car);labels=opt[1];weak=[l for l in labels if 9 in l and (l[0] in c.B or l[1] in c.B)];right=[l for l in labels if 6 in l and (l[0] in c.B or l[1] in c.B)]
 return {'lpair':car['lpair'],'rpair':car['rpair'],'cost':opt[0],'support':labels,'weak':weak,'right':right}

if __name__=='__main__':
 from concurrent.futures import ProcessPoolExecutor
 carriers=[car for car in c.strong_carriers() if (tw(car['op'],5),tw(car['op'],10))==(8,4)]
 with ProcessPoolExecutor(max_workers=4) as pool:rows=list(pool.map(analyze,carriers))
 print(json.dumps({'protocol':'spin23-all-robust-fast-safe-support/1','count':len(rows),'rows':rows},default=list))
