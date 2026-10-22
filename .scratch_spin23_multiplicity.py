from fractions import Fraction
import sys


def rank(a):
    a = [[Fraction(x) for x in row] for row in a]
    rows = len(a)
    cols = len(a[0]) if rows else 0
    r = 0
    for c in range(cols):
        pivot = next((i for i in range(r, rows) if a[i][c]), None)
        if pivot is None:
            continue
        a[r], a[pivot] = a[pivot], a[r]
        p = a[r][c]
        a[r] = [x / p for x in a[r]]
        for i in range(rows):
            if i != r and a[i][c]:
                q = a[i][c]
                a[i] = [a[i][j] - q * a[r][j] for j in range(cols)]
        r += 1
    return r


def det_bareiss(a):
    a=[row[:] for row in a]; n=len(a); sign=1; prev=1
    for k in range(n-1):
        if not a[k][k]:
            p=next((i for i in range(k+1,n) if a[i][k]),None)
            if p is None:return 0
            a[k],a[p]=a[p],a[k];sign=-sign
        pivot=a[k][k]
        for i in range(k+1,n):
            for j in range(k+1,n):a[i][j]=(a[i][j]*pivot-a[i][k]*a[k][j])//prev
        prev=pivot
    return sign*a[-1][-1]


I = [[int(i == j) for j in range(4)] for i in range(4)]
Z = [[0 for _ in range(4)] for _ in range(4)]
H1 = [[1, 0, 0, 0], [0, 2, 0, 0], [0, 0, -1, 0], [0, 0, 0, -2]]
H2 = [[0, 0, 1, 1], [0, 0, 1, 2], [1, 1, 0, 0], [1, 2, 0, 0]]


def stack(a, b):
    return [row[:] for row in a] + [row[:] for row in b]


def commutant(block_sizes, links, include_adjoints=True):
    names = list(block_sizes)
    offsets = {}
    total = 0
    for name in names:
        n = block_sizes[name]
        offsets[name] = total
        total += n * n

    def var(name, i, j):
        return offsets[name] + i * block_sizes[name] + j

    equations = []
    for target, source, t in links:
        nt, ns = block_sizes[target], block_sizes[source]
        assert len(t) == nt and len(t[0]) == ns
        for i in range(nt):
            for j in range(ns):
                row = [0] * total
                for k in range(nt):
                    row[var(target, i, k)] += t[k][j]
                for k in range(ns):
                    row[var(source, k, j)] -= t[i][k]
                equations.append(row)
        if include_adjoints:
            tt = [list(row) for row in zip(*t)]
            for i in range(ns):
                for j in range(nt):
                    row = [0] * total
                    for k in range(ns):
                        row[var(source, i, k)] += tt[k][j]
                    for k in range(nt):
                        row[var(target, k, j)] -= tt[i][k]
                    equations.append(row)
    r = rank(equations)
    return {"unknowns": total, "rank": r, "nullity": total-r}


blocks = {"A1x2": 8, "A8": 4, "B2": 4, "B3": 4, "B4": 4}
links = [
    ("A1x2", "B2", stack(I, Z)),
    ("A1x2", "B3", stack(Z, I)),
    ("A1x2", "B4", stack(H1, H2)),
    ("A8", "B2", I),
    ("A8", "B3", H1),
    ("A8", "B4", H2),
]

print({
    "blocks": blocks,
    "links": [(a, b, [len(t), len(t[0])]) for a, b, t in links],
    "directed_only": commutant(blocks, links, include_adjoints=False),
    "self_adjoint_completed": commutant(blocks, links, include_adjoints=True),
})

if "--colored-dirac" in sys.argv:
    anames=list(blocks);aoff={};adim=0
    for name in anames:aoff[name]=adim;adim+=blocks[name]
    d=[[0]*adim for _ in range(adim)]
    for target,source,t in links:
        ot,os=aoff[target],aoff[source]
        for i,row in enumerate(t):
            for j,x in enumerate(row):d[ot+i][os+j]=x;d[os+j][ot+i]=x
    print('COLORED_DIRAC',adim,rank(d),det_bareiss(d))


# v329 colorless component for the selected 448D carrier.
colorless_types = {
    "H16": ((1, 6), 4),
    "H86x2": ((8, 6), 8),
    "H64": ((6, 4), 4),
    "H67x2": ((6, 7), 8),
    "H21": ((2, 1), 4),
    "H78": ((7, 8), 4),
}


def rectangle_adjacent(p, q):
    n = (q[1], q[0])
    return p[1] == n[1] or p[0] == n[0]


import random
import numpy as np
from itertools import combinations
rng = random.Random(329448)
colorless_blocks = {name: size for name, (_, size) in colorless_types.items()}
allowed = []
for ai, (a, (pa, na)) in enumerate(colorless_types.items()):
    for b, (pb, nb) in list(colorless_types.items())[ai + 1:]:
        if rectangle_adjacent(pa, pb):
            allowed.append((a, b))


best = None
best_links = None
for trial in range(1):
    trial_links = []
    for target, source in allowed:
        nt, ns = colorless_blocks[target], colorless_blocks[source]
        t = [[rng.randrange(-2, 3) for _ in range(ns)] for _ in range(nt)]
        trial_links.append((target, source, t))
    result = commutant(colorless_blocks, trial_links, include_adjoints=True)
    if best is None or result["nullity"] < best["nullity"]:
        best = result
        best_links = trial_links
    if result["nullity"] == 1:
        break

print({
    "v329_colorless_blocks": colorless_blocks,
    "allowed_type_links": allowed,
    "trials_used": trial + 1,
    "best": best,
    "witness_matrices": best_links if best and best["nullity"] == 1 else None,
})


def commutant_matrix(block_sizes, links, include_adjoints=True):
    names = list(block_sizes); offsets = {}; total = 0
    for name in names:
        n = block_sizes[name]; offsets[name] = total; total += n*n
    def var(name, i, j): return offsets[name] + i*block_sizes[name] + j
    equations = []
    for target, source, t in links:
        nt, ns = block_sizes[target], block_sizes[source]
        for i in range(nt):
            for j in range(ns):
                row = [0]*total
                for k in range(nt): row[var(target,i,k)] += t[k][j]
                for k in range(ns): row[var(source,k,j)] -= t[i][k]
                equations.append(row)
        if include_adjoints:
            tt = [list(row) for row in zip(*t)]
            for i in range(ns):
                for j in range(nt):
                    row = [0]*total
                    for k in range(ns): row[var(source,i,k)] += tt[k][j]
                    for k in range(nt): row[var(target,k,j)] -= tt[i][k]
                    equations.append(row)
    return equations


if "--sparse" in sys.argv:
    srng = random.Random(330448)
    sparse_best = None
    for trial in range(200):
        density = 0.08 + 0.22*(trial % 20)/19
        trial_links=[]; nonzero=0
        for target,source in allowed:
            nt,ns=colorless_blocks[target],colorless_blocks[source]
            t=[]
            for _ in range(nt):
                row=[]
                for _ in range(ns):
                    x=srng.choice((-1,1)) if srng.random()<density else 0
                    nonzero += bool(x); row.append(x)
                t.append(row)
            trial_links.append((target,source,t))
        eq=commutant_matrix(colorless_blocks,trial_links,True)
        nr=np.linalg.matrix_rank(np.asarray(eq,dtype=float),tol=1e-9)
        if nr==191 and (sparse_best is None or nonzero<sparse_best[0]):
            er=rank(eq)
            if er==191:
                sparse_best=(nonzero,trial,density,trial_links)
                print('SPARSE_BEST',sparse_best)
    print('SPARSE_FINAL',sparse_best)

if "--link-subsets" in sys.argv:
    subset_hits=[]
    for k in range(1,len(best_links)+1):
        for ids in combinations(range(len(best_links)),k):
            ls=[best_links[i] for i in ids]
            eq=commutant_matrix(colorless_blocks,ls,True)
            nr=np.linalg.matrix_rank(np.asarray(eq,dtype=float),tol=1e-9)
            if nr==191:
                er=rank(eq)
                if er==191: subset_hits.append((k,ids))
        print('LINK_SUBSETS',k,'HITS',sum(x[0]==k for x in subset_hits))
        if subset_hits: break
    print('LINK_SUBSET_HITS',subset_hits)

if "--sparse-tree" in sys.argv:
    tree_allowed=[allowed[i] for i in (0,1,2,4,5)]
    trng=random.Random(330005)
    tree_best=None
    for trial in range(500):
        density=0.10+0.30*(trial%30)/29
        ls=[];nonzero=0
        for target,source in tree_allowed:
            nt,ns=colorless_blocks[target],colorless_blocks[source]
            t=[]
            for _ in range(nt):
                row=[]
                for _ in range(ns):
                    x=trng.choice((-1,1)) if trng.random()<density else 0
                    nonzero+=bool(x);row.append(x)
                t.append(row)
            ls.append((target,source,t))
        eq=commutant_matrix(colorless_blocks,ls,True)
        nr=np.linalg.matrix_rank(np.asarray(eq,dtype=float),tol=1e-9)
        if nr==191 and (tree_best is None or nonzero<tree_best[0]):
            if rank(eq)==191:
                tree_best=(nonzero,trial,density,ls)
                print('SPARSE_TREE_BEST',tree_best)
    print('SPARSE_TREE_FINAL',tree_best)

if "--spin-factorized-tree" in sys.argv:
    tree_allowed=[allowed[i] for i in (0,1,2,4,5)]
    frng=random.Random(331448)
    basis=[I,H1,H2]
    def combo(cs):
        return [[sum(cs[z]*basis[z][i][j] for z in range(3)) for j in range(4)] for i in range(4)]
    def block_matrix(rt,cs,blocks):
        out=[[0]*(cs*4) for _ in range(rt*4)]
        for bi in range(rt):
            for bj in range(cs):
                q=blocks[bi][bj]
                for i in range(4):
                    for j in range(4):out[bi*4+i][bj*4+j]=q[i][j]
        return out
    fact_best=None
    for trial in range(100):
        ls=[];recipes=[]
        for target,source in tree_allowed:
            rt=colorless_blocks[target]//4;cs=colorless_blocks[source]//4
            coeff=[];blocks=[]
            for bi in range(rt):
                cr=[];br=[]
                for bj in range(cs):
                    v=[frng.randrange(-2,3) for _ in range(3)]
                    cr.append(v);br.append(combo(v))
                coeff.append(cr);blocks.append(br)
            ls.append((target,source,block_matrix(rt,cs,blocks)));recipes.append((target,source,coeff))
        eq=commutant_matrix(colorless_blocks,ls,True)
        nr=np.linalg.matrix_rank(np.asarray(eq,dtype=float),tol=1e-9)
        if nr==191 and rank(eq)==191:
            fact_best=(trial,recipes,ls);break
    print('SPIN_FACTORIZED_TREE',fact_best)
    if fact_best:
        inv=[]
        for target,source,t in fact_best[2]:
            inv.append((target,source,len(t),len(t[0]),rank(t),det_bareiss(t) if len(t)==len(t[0]) else None))
        print('SPIN_FACTORIZED_INVARIANTS',inv)

if "--joint-subsets" in sys.argv:
    names=list(colorless_blocks); boff={};dim=0
    for name in names:boff[name]=dim;dim+=colorless_blocks[name]
    def dirac_matrix(ls):
        d=[[0]*dim for _ in range(dim)]
        for target,source,t in ls:
            ot,os=boff[target],boff[source]
            for i,row in enumerate(t):
                for j,x in enumerate(row):d[ot+i][os+j]+=x;d[os+j][ot+i]+=x
        return d
    joint=[]
    for k in range(1,len(best_links)+1):
        for ids in combinations(range(len(best_links)),k):
            ls=[best_links[i] for i in ids]
            ceq=commutant_matrix(colorless_blocks,ls,True)
            cr=np.linalg.matrix_rank(np.asarray(ceq,float),tol=1e-9)
            if cr!=191:continue
            d=dirac_matrix(ls);dr=np.linalg.matrix_rank(np.asarray(d,float),tol=1e-9)
            if dr==dim and rank(ceq)==191 and rank(d)==dim:joint.append((k,ids,det_bareiss(d)))
        print('JOINT_SUBSETS',k,'HITS',sum(x[0]==k for x in joint))
        if joint:break
    print('JOINT_HITS',joint)

if "--spin-factorized-joint" in sys.argv:
    joint_allowed=[allowed[i] for i in (0,2,3,4,6)]
    jrng=random.Random(332448); basis=[I,H1,H2]
    names=list(colorless_blocks);boff={};dim=0
    for name in names:boff[name]=dim;dim+=colorless_blocks[name]
    def fcombo(cs):return [[sum(cs[z]*basis[z][i][j] for z in range(3)) for j in range(4)] for i in range(4)]
    def fblocks(rt,cs,bs):
        out=[[0]*(cs*4) for _ in range(rt*4)]
        for bi in range(rt):
            for bj in range(cs):
                q=bs[bi][bj]
                for i in range(4):
                    for j in range(4):out[bi*4+i][bj*4+j]=q[i][j]
        return out
    def fdirac(ls):
        d=[[0]*dim for _ in range(dim)]
        for target,source,t in ls:
            ot,os=boff[target],boff[source]
            for i,row in enumerate(t):
                for j,x in enumerate(row):d[ot+i][os+j]+=x;d[os+j][ot+i]+=x
        return d
    joint_fact=None
    for trial in range(100):
        ls=[];recipes=[]
        for target,source in joint_allowed:
            rt=colorless_blocks[target]//4;cs=colorless_blocks[source]//4
            coeff=[];bs=[]
            for bi in range(rt):
                cr=[];br=[]
                for bj in range(cs):
                    v=[jrng.randrange(-2,3) for _ in range(3)];cr.append(v);br.append(fcombo(v))
                coeff.append(cr);bs.append(br)
            ls.append((target,source,fblocks(rt,cs,bs)));recipes.append((target,source,coeff))
        ceq=commutant_matrix(colorless_blocks,ls,True);d=fdirac(ls)
        if np.linalg.matrix_rank(np.asarray(ceq,float),tol=1e-9)==191 and np.linalg.matrix_rank(np.asarray(d,float),tol=1e-9)==32:
            if rank(ceq)==191 and rank(d)==32:
                joint_fact=(trial,recipes,det_bareiss(d),[(a,b,rank(t),det_bareiss(t) if len(t)==len(t[0]) else None) for a,b,t in ls]);break
    print('SPIN_FACTORIZED_JOINT',joint_fact)

if "--topology" in sys.argv:
    def topology(ids):
        es=[allowed[i] for i in ids];adj={v:set() for v in colorless_blocks}
        for a,b in es:adj[a].add(b);adj[b].add(a)
        side={};ok=True
        for root in adj:
            if root in side:continue
            side[root]=0;stack=[root]
            while stack:
                x=stack.pop()
                for y in adj[x]:
                    if y not in side:side[y]=1-side[x];stack.append(y)
                    elif side[y]==side[x]:ok=False
        conn=len({*side})==len(adj) and all(adj[v] for v in adj)
        # connectivity explicitly
        seen={next(iter(adj))};front=list(seen)
        while front:
            x=front.pop()
            for y in adj[x]-seen:seen.add(y);front.append(y)
        conn=len(seen)==len(adj)
        L=[v for v in adj if side[v]==0];R=[v for v in adj if side[v]==1]
        hall=True;bad=[]
        for q in range(1,len(L)+1):
            for ss in combinations(L,q):
                ns=set().union(*(adj[x] for x in ss))
                if sum(colorless_blocks[x] for x in ss)>sum(colorless_blocks[x] for x in ns):hall=False;bad.append((ss,tuple(ns)))
        return conn,ok,L,R,sum(colorless_blocks[x] for x in L),sum(colorless_blocks[x] for x in R),hall,bad
    for ids in combinations(range(len(allowed)),5):
        print('TOPOLOGY',ids,[allowed[i] for i in ids],topology(ids))
