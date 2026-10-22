from collections import defaultdict

A={1,8}; B={2,3,4,7,9}; C={5,10}; U={6}
phase={**{i:6 for i in A|B},**{i:49 for i in C},6:-123}
op=[(1,5),(1,5),(8,5),(5,2),(5,3),(5,4),(1,6),(8,6),(8,6),(6,4),(6,7),(6,7),(2,1),(7,8),(5,9),(9,10),(1,5),(10,1),(10,2),(4,10)]

def components(index,edge):
    i,j=edge
    a=2 if i in A or j in A else 1
    color='3' if i in C else ('3bar' if j in C else '1')
    x=(phase[i]-phase[j])//43
    return [(index,edge,(a,color,x+bw)) for bw in ((-3,3) if i in B or j in B else (0,))]

def dual(rep):
    a,c,y=rep
    return (a,{'3':'3bar','3bar':'3','1':'1'}[c],-y)

def admissible(edge1,edge2):
    i,j=edge1; k,l=edge2
    return i==l or j==k

def connector_label(edge1,edge2):
    i,j=edge1; k,l=edge2
    if i==l: return tuple(sorted((j,k)))
    if j==k: return tuple(sorted((i,l)))
    return None

nodes=[node for n,e in enumerate(op) for node in components(n,e)]
by_rep=defaultdict(list)
for node in nodes: by_rep[node[2]].append(node)

def maximum_matching(left,right):
    links={u:[v for v in right if admissible(u[1],v[1])] for u in left}
    owner={}
    def augment(u,seen):
        for v in links[u]:
            key=(v[0],v[2])
            if key in seen: continue
            seen.add(key)
            if key not in owner or augment(owner[key],seen):
                owner[key]=u; return True
        return False
    size=sum(augment(u,set()) for u in left)
    pairs=[(u,v) for vkey,u in owner.items() for v in right if (v[0],v[2])==vkey]
    return size,pairs,links

classes=[]
seen=set()
for rep in sorted(by_rep):
    d=dual(rep)
    # Self-conjugate neutral singlets belong to the chiral-family residual;
    # they are a separate Majorana question, not a vectorlike pairing class.
    if rep==d or rep in seen or d not in by_rep: continue
    seen|={rep,d}
    left,right=by_rep[rep],by_rep[d]
    need=min(len(left),len(right))
    size,pairs,links=maximum_matching(left,right)
    classes.append((rep,d,len(left),len(right),need,size,pairs))

print('PROTOCOL spin23-736d-vectorlike-connector-matching/1')
for rep,d,nl,nr,need,size,pairs in classes:
    print('CLASS',rep,d,'COUNTS',nl,nr,'NEED',need,'MATCH',size)
    print('PAIRS',[(u[0],u[1],v[0],v[1]) for u,v in pairs])
    all_edges=[]
    for u in by_rep[rep]:
      for v in by_rep[d]:
        if admissible(u[1],v[1]): all_edges.append((u[0],v[0],connector_label(u[1],v[1])))
    print('ALL_EDGES',all_edges)
print('FULL_VECTORLIKE_COPY_RANK',sum(x[5] for x in classes))
print('REQUIRED_VECTORLIKE_COPY_RANK',sum(x[4] for x in classes))
neutral=by_rep[(1,'1',0)]
neutral_edges=[(u[0],v[0]) for a,u in enumerate(neutral) for v in neutral[a:] if admissible(u[1],v[1])]
print('NEUTRAL_SINGLET_OCCURRENCES',[(n,e) for n,e,_ in neutral])
print('DIRECT_MAJORANA_CONNECTORS',neutral_edges)
lepton_left=by_rep[(2,'1',-3)]; lepton_right=by_rep[(2,'1',3)]
lepton_edges=[(u[0],v[0],connector_label(u[1],v[1])) for u in lepton_left for v in lepton_right if admissible(u[1],v[1])]
print('LEPTON_VECTORLIKE_EDGES',lepton_edges)
print('LEPTON_REQUIRED_VEV_LABELS',sorted({x[2] for x in lepton_edges}))
print('PASSED',all(x[5]==x[4] for x in classes))
