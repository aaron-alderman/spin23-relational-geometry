from fractions import Fraction
from itertools import product, combinations
from collections import Counter
from math import prod
import random
import numpy as np
import sys

dims={1:2,2:2,3:2,4:2,5:3,6:1,7:2,8:2}
core=((1,8),(2,3,4,7))
all_edges=[(i,j) for i in range(1,9) for j in range(i+1,9)]

def collapse(row):
    out=[0]*4; loc={x:k for k,b in enumerate(core) for x in b}
    for j,x in enumerate(row,1):
        if j in loc: out[loc[j]]+=x
        elif j==5:out[2]+=x
        elif j==6:out[3]+=x
    return out

def rref_null(A,n):
    a=[[Fraction(x) for x in r] for r in A if any(r)];piv=[];rr=0
    for c in range(n):
        p=next((i for i in range(rr,len(a)) if a[i][c]),None)
        if p is None:continue
        a[rr],a[p]=a[p],a[rr];q=a[rr][c];a[rr]=[x/q for x in a[rr]]
        for i in range(len(a)):
            if i!=rr and a[i][c]:
                q=a[i][c];a[i]=[a[i][j]-q*a[rr][j] for j in range(n)]
        piv.append(c);rr+=1
    free=[c for c in range(n) if c not in piv];out=[]
    for f in free:
        v=[Fraction(0)]*n;v[f]=1
        for i,c in reversed(list(enumerate(piv))):v[c]=-sum(a[i][j]*v[j] for j in free)
        out.append(v)
    return out

def det_bareiss(a):
    a=[r[:] for r in a];n=len(a);sg=1;prev=1
    for k in range(n-1):
        if not a[k][k]:
            z=next((i for i in range(k+1,n) if a[i][k]),None)
            if z is None:return 0
            a[k],a[z]=a[z],a[k];sg=-sg
        p=a[k][k]
        for i in range(k+1,n):
            for j in range(k+1,n):a[i][j]=(a[i][j]*p-a[i][k]*a[k][j])//prev
        prev=p
    return sg*a[-1][-1]

def incidence(op):
    z=[0]*8
    for i,j in op:z[i-1]+=dims[j];z[j-1]+=dims[i]
    return z

def rows(op):
    u=incidence(op);l3=[0]*8;lg=[0]*8;su=[]
    for i,j in op:
        q=[0]*8;q[i-1]=1;q[j-1]=-1;wg=4*dims[i]*dims[j]
        for k in range(8):lg[k]+=wg*q[k]
        if i==5 or j==5:
            other=j if i==5 else i;w=2*dims[other]
            for k in range(8):l3[k]+=w*q[k]
    for block in core:
        r=[0]*8
        for i,j in op:
            q=[0]*8;q[i-1]=1;q[j-1]=-1
            if i in block:
                for k in range(8):r[k]+=2*dims[j]*q[k]
            if j in block:
                for k in range(8):r[k]+=2*dims[i]*q[k]
        su.append(r)
    return [collapse(x) for x in [u,l3,lg]+su]

def scalar_orbits(op):
    neg=[(j,i) for i,j in op];c=Counter()
    for p in op:
        for n in neg:
            pair=None
            if p[1]==n[1]:pair=tuple(sorted((p[0],n[0])))
            elif p[0]==n[0]:pair=tuple(sorted((p[1],n[1])))
            if pair and pair[0]!=pair[1]:c[pair]+=1
    return {k:v//2 for k,v in c.items()}

def connected(es,vs):
    seen={next(iter(vs))}
    while True:
        n=seen|{b for a,b in es if a in seen and b in vs}|{a for a,b in es if b in seen and a in vs}
        if n==seen:return seen==set(vs)
        seen=n

def primitive(v):
    import math
    den=1
    for x in v:den=den*x.denominator//math.gcd(den,x.denominator)
    z=[int(x*den) for x in v];g=0
    for x in z:g=math.gcd(g,abs(x))
    z=[x//g for x in z]
    if next(x for x in z if x)<0:z=[-x for x in z]
    return z

def expand(v):
    return [v[0],v[1],v[1],v[1],v[2],v[3],v[1],v[0]]

def chiral(op,v):
    cls={1:0,8:0,2:1,3:1,4:1,7:1,5:2,6:3};net=Counter()
    for i,j in op:
        a,b=cls[i],cls[j]
        if a==b:continue
        lo,hi=sorted((a,b));net[(lo,hi)]+=1 if (a,b)==(lo,hi) else -1
    return {k:m for k,m in net.items() if m and v[k[0]]!=v[k[1]]}

def cubic(op,v):
    t=expand(v)
    return sum(4*dims[i]*dims[j]*(t[i-1]-t[j-1])**3 for i,j in op)

random.seed(230301)
best=[];stats=Counter()
for edgecount in ([] if any(x in sys.argv for x in ("--deletions","--deletions11","--subsets","--inspect","--inspect11","--inspect15","--inspect15b","--inspect17","--inspect18","--three-family-core","--three-family-complete","--three-family-redistribute","--three-family-trace","--trace-rge","--trace-spectrum","--trace-selfconsistent","--trace-fixedpoint","--lr-rge","--lr-deformations","--lr-fqr-carrier","--fqr-split","--fqr-split-search","--fqr-extra-search","--lr-fql-fqr","--lr-two-fqr","--lr-quark-grid","--lr-one-two-search","--lr-736-corridor","--lr-double-pairs-carrier","--lr-double-pairs-search","--lr-double-pairs-locking","--lr-product-matching","--lr-three-threshold","--lr-fql-threshold","--lr-fql-low-threshold","--color-chain","--inspect3f448","--mutations","--shrink","--shrink10","--color-extend","--k33-random","--k33-witten")) else range(10,18)):
    found=[]
    limit=350000 if edgecount<16 else 200000
    for trial in range(limit):
        chosen=random.sample(range(28),edgecount);mask=random.randrange(1<<edgecount)
        op=[]
        for z,ei in enumerate(chosen):
            i,j=all_edges[ei];op.append((j,i) if (mask>>z)&1 else (i,j))
        oc=scalar_orbits(op)
        if oc.get((1,8),0)<3:continue
        be={e for e in oc if set(e)<={2,3,4,7}}
        if not connected(be,{2,3,4,7}) or sum(oc[e] for e in be)<5:continue
        if not any(tuple(sorted((6,b))) in oc for b in (2,3,4,7)):continue
        if sum(dims[j] if i==5 else -dims[i] if j==5 else 0 for i,j in op)!=0:continue
        rr=rows(op)
        if np.linalg.matrix_rank(np.array(rr,float),tol=1e-9)>3:continue
        bas=rref_null(rr,4)
        if len(bas)!=1:continue
        v=bas[0]
        if v[0]!=v[1] or v[0]==v[2] or v[0]==v[3] or cubic(op,v):continue
        mu=[[0]*8 for _ in range(8)]
        for i,j in op:mu[i-1][j-1]+=1;mu[j-1][i-1]-=1
        det=det_bareiss(mu)
        if not det:continue
        chi=chiral(op,v)
        if not chi:continue
        hd=8*sum(dims[i]*dims[j] for i,j in op)
        found.append((hd,trial,det,op,primitive(expand(v)),chi,incidence(op),oc))
        found=sorted(found)[:5]
    print('EDGES',edgecount,'FOUND',len(found))
    for x in found:print('HIT',x)
    best.extend(found)
print('GLOBAL BEST')
for x in sorted(best)[:10]:print('BEST',x)

if "--deletions" in sys.argv or "--subsets" in sys.argv:
    target=[(3,7),(8,2),(3,5),(4,8),(3,1),(8,7),(2,1),(6,4),(7,1),(2,4),(1,4),(5,8),(8,6),(3,4)]
    def gates(op):
        oc=scalar_orbits(op);be={e for e in oc if set(e)<={2,3,4,7}}
        out={
            'A_two_cycles':oc.get((1,8),0)>=3,
            'B_two_cycles':connected(be,{2,3,4,7}) and sum(oc[e] for e in be)>=5,
            'B_S_channel':any(tuple(sorted((6,b))) in oc for b in (2,3,4,7)),
            'SU3_cubic':sum(dims[j] if i==5 else -dims[i] if j==5 else 0 for i,j in op)==0,
        }
        rr=rows(op);bas=rref_null(rr,4)
        out['kernel_one']=len(bas)==1
        out['BL_pattern']=bool(bas) and len(bas)==1 and bas[0][0]==bas[0][1] and bas[0][0]!=bas[0][2] and bas[0][0]!=bas[0][3] and cubic(op,bas[0])==0
        mu=[[0]*8 for _ in range(8)]
        for i,j in op:mu[i-1][j-1]+=1;mu[j-1][i-1]-=1
        out['Poincare']=det_bareiss(mu)!=0
        out['chiral']=bool(bas) and bool(chiral(op,bas[0]))
        return out
    if "--deletions" in sys.argv:
        print('FULL',gates(target))
        for k,e in enumerate(target):
            g=gates(target[:k]+target[k+1:])
            print('DELETE',e,'PASS',all(g.values()),'FAIL',[x for x,v in g.items() if not v])
    if "--subsets" in sys.argv:
        hits=[]
        for mask in range(1<<len(target)):
            if mask.bit_count()<8:continue
            op=[e for k,e in enumerate(target) if (mask>>k)&1]
            if all(gates(op).values()):
                hd=8*sum(dims[i]*dims[j] for i,j in op)
                hits.append((len(op),hd,op,gates(op),scalar_orbits(op)))
        print('SUBSET HITS',len(hits))
        for h in sorted(hits,key=lambda x:(x[0],x[1]))[:20]:print('SUBSET',h)

if "--inspect" in sys.argv:
    op=[(3,7),(8,2),(3,5),(4,8),(3,1),(8,7),(2,1),(6,4),(7,1),(1,4),(5,8),(8,6)]
    rr=rows(op);bas=rref_null(rr,4)
    mu=[[0]*8 for _ in range(8)]
    for i,j in op:mu[i-1][j-1]+=1;mu[j-1][i-1]-=1
    print('EDGES',op)
    print('DIM',8*sum(dims[i]*dims[j] for i,j in op),'DET',det_bareiss(mu),'INCIDENCE',incidence(op))
    print('ROWS',rr,'BASIS',bas,'PRIMITIVE',primitive(expand(bas[0])),'CUBIC',cubic(op,bas[0]),'CHIRAL',chiral(op,bas[0]))
    print('ORBITS',scalar_orbits(op))
    selected=set(scalar_orbits(op))
    neg=[(j,i) for i,j in op]
    wit={k:[] for k in selected}
    for pi,p in enumerate(op):
        for qi,n in enumerate(neg):
            pair=None;shared=None
            if p[1]==n[1]:pair=tuple(sorted((p[0],n[0])));shared=('right',p[1])
            elif p[0]==n[0]:pair=tuple(sorted((p[1],n[1])));shared=('left',p[0])
            if pair in selected:
                rec=(pi,op[pi],qi,op[qi],shared)
                if rec not in wit[pair]:wit[pair].append(rec)
    for k,v in wit.items():print('WITNESS',k,v)

if "--inspect11" in sys.argv:
    op=[(3,5),(4,8),(3,1),(8,7),(2,1),(6,4),(7,1),(1,4),(5,8),(8,6),(8,3)]
    rr=rows(op);bas=rref_null(rr,4)
    mu=[[0]*8 for _ in range(8)]
    for i,j in op:mu[i-1][j-1]+=1;mu[j-1][i-1]-=1
    print('EDGES',op)
    print('DIM',8*sum(dims[i]*dims[j] for i,j in op),'DET',det_bareiss(mu),'INCIDENCE',incidence(op))
    print('ROWS',rr,'BASIS',bas,'PRIMITIVE',primitive(expand(bas[0])),'CUBIC',cubic(op,bas[0]),'CHIRAL',chiral(op,bas[0]))
    print('ORBITS',scalar_orbits(op))
    selected=set(scalar_orbits(op));neg=[(j,i) for i,j in op];wit={k:[] for k in selected}
    for pi,p in enumerate(op):
        for qi,n in enumerate(neg):
            pair=None;shared=None
            if p[1]==n[1]:pair=tuple(sorted((p[0],n[0])));shared=('right',p[1])
            elif p[0]==n[0]:pair=tuple(sorted((p[1],n[1])));shared=('left',p[0])
            if pair in selected:wit[pair].append((pi,op[pi],qi,op[qi],shared))
    for k,v in wit.items():print('WITNESS11',k,v)

if "--inspect15" in sys.argv:
    op=[(3,5),(4,8),(3,1),(8,7),(2,1),(6,4),(7,1),(1,4),(5,8),(8,6),(8,3),(2,5),(4,5),(5,1),(5,7)]
    rr=rows(op);bas=rref_null(rr,4)
    mu=[[0]*8 for _ in range(8)]
    for i,j in op:mu[i-1][j-1]+=1;mu[j-1][i-1]-=1
    print('EDGES15',op)
    print('DIM15',8*sum(dims[i]*dims[j] for i,j in op),'DET15',det_bareiss(mu),'INCIDENCE15',incidence(op))
    print('ROWS15',rr,'BASIS15',bas,'PRIMITIVE15',primitive(expand(bas[0])),'CUBIC15',cubic(op,bas[0]),'CHIRAL15',chiral(op,bas[0]))
    print('ORBITS15',scalar_orbits(op))

if "--inspect15b" in sys.argv:
    op=[(1,5),(5,2),(5,3),(5,4),(7,5),(8,5),(3,1),(1,7),(8,3),(1,6),(3,2),(6,4),(1,2),(7,8),(2,8)]
    rr=rows(op);bas=rref_null(rr,4)
    mu=[[0]*8 for _ in range(8)]
    for i,j in op:mu[i-1][j-1]+=1;mu[j-1][i-1]-=1
    print('EDGES15B',op)
    print('DIM15B',8*sum(dims[i]*dims[j] for i,j in op),'DET15B',det_bareiss(mu),'INCIDENCE15B',incidence(op))
    print('ROWS15B',rr,'BASIS15B',bas,'PRIMITIVE15B',primitive(expand(bas[0])),'CUBIC15B',cubic(op,bas[0]),'CHIRAL15B',chiral(op,bas[0]))
    print('ORBITS15B',scalar_orbits(op))
    sedges=[]
    for a,b in combinations(range(len(op)),2):
        p=op[a];n=(op[b][1],op[b][0])
        if p[1]==n[1] or p[0]==n[0]:sedges.append((a,b))
    print('SECTOR_GRAPH15B',sedges)
    for part in (range(6),range(6,15)):
        vs=set(part);es=[e for e in sedges if e[0] in vs and e[1] in vs]
        print('PART15B',sorted(vs),'EDGES',es,'CYCLE_RANK',len(es)-len(vs)+1,'CONNECTED',connected(es,vs))

if "--inspect17" in sys.argv:
    op=[(5,1),(2,5),(5,3),(4,5),(7,5),(5,8),(8,6),(8,4),(8,3),(3,4),(6,7),(3,1),(7,8),(1,6),(6,4),(4,1),(1,7)]
    rr=rows(op);bas=rref_null(rr,4)
    mu=[[0]*8 for _ in range(8)]
    for i,j in op:mu[i-1][j-1]+=1;mu[j-1][i-1]-=1
    A={1,8};B={2,3,4,7}
    wp=lambda block:sum((dims[j] if i in block else 0)+(dims[i] if j in block else 0) for i,j in op)%2
    print('EDGES17',op)
    print('DIM17',8*sum(dims[i]*dims[j] for i,j in op),'DET17',det_bareiss(mu),'INCIDENCE17',incidence(op),'WITTEN17',wp(A),wp(B))
    print('ROWS17',rr,'BASIS17',bas,'PRIMITIVE17',primitive(expand(bas[0])),'CUBIC17',cubic(op,bas[0]),'CHIRAL17',chiral(op,bas[0]))
    print('ORBITS17',scalar_orbits(op))
    sedges=[]
    for a,b in combinations(range(len(op)),2):
        p=op[a];n=(op[b][1],op[b][0])
        if p[1]==n[1] or p[0]==n[0]:sedges.append((a,b))
    print('SECTOR_GRAPH17',sedges)
    for part in (range(6),range(6,17)):
        vs=set(part);es=[e for e in sedges if e[0] in vs and e[1] in vs]
        print('PART17',sorted(vs),'EDGES',es,'CYCLE_RANK',len(es)-len(vs)+1,'CONNECTED',connected(es,vs))

if "--inspect18" in sys.argv:
    op=[(1,5),(2,5),(5,3),(5,4),(5,7),(8,5),(1,2),(1,6),(8,1),(4,2),(6,3),(8,4),(2,8),(7,1),(8,7),(4,1),(6,4),(8,6)]
    rr=rows(op);bas=rref_null(rr,4)
    mu=[[0]*8 for _ in range(8)]
    for i,j in op:mu[i-1][j-1]+=1;mu[j-1][i-1]-=1
    A={1,8};B={2,3,4,7};wp=lambda block:sum((dims[j] if i in block else 0)+(dims[i] if j in block else 0) for i,j in op)%2
    print('EDGES18',op)
    print('DIM18',8*sum(dims[i]*dims[j] for i,j in op),'DET18',det_bareiss(mu),'INCIDENCE18',incidence(op),'WITTEN18',wp(A),wp(B))
    print('ROWS18',rr,'BASIS18',bas,'PRIMITIVE18',primitive(expand(bas[0])),'CUBIC18',cubic(op,bas[0]),'CHIRAL18',chiral(op,bas[0]))
    print('ORBITS18',scalar_orbits(op))
    sedges=[]
    for a,b in combinations(range(len(op)),2):
        p=op[a];n=(op[b][1],op[b][0])
        if p[1]==n[1] or p[0]==n[0]:sedges.append((a,b))
    for part in (range(6),range(6,18)):
        vs=set(part);es=[e for e in sedges if e[0] in vs and e[1] in vs]
        print('PART18',sorted(vs),'EDGES',es,'CYCLE_RANK',len(es)-len(vs)+1,'CONNECTED',connected(es,vs))

if "--three-family-core" in sys.argv:
    op=[(1,5),(1,5),(8,5),(5,2),(5,3),(5,4),
        (1,6),(1,6),(8,6),(6,2),(6,3),(6,4)]
    rr=rows(op);bas=rref_null(rr,4)
    mu=[[0]*8 for _ in range(8)]
    for i,j in op:mu[i-1][j-1]+=1;mu[j-1][i-1]-=1
    A={1,8};B={2,3,4,7};wp=lambda block:sum((dims[j] if i in block else 0)+(dims[i] if j in block else 0) for i,j in op)%2
    print('THREE_FAMILY_CORE',op)
    print('DIM3F',8*sum(dims[i]*dims[j] for i,j in op),'DET3F',det_bareiss(mu),'INCIDENCE3F',incidence(op),'WITTEN3F',wp(A),wp(B))
    print('ROWS3F',rr,'BASIS3F',bas,'PRIMITIVE3F',[primitive(expand(v)) for v in bas])
    print('CUBIC3F',[cubic(op,v) for v in bas],'CHIRAL3F',[chiral(op,v) for v in bas])

if "--three-family-complete" in sys.argv:
    core3=[(1,5),(1,5),(8,5),(5,2),(5,3),(5,4),
           (1,6),(1,6),(8,6),(6,2),(6,3),(6,4)]
    neutral_nodes=[1,2,3,4,7,8]
    neutral=[(i,j) for i,j in combinations(neutral_nodes,2)]
    for adds_n in range(6,9):
        hits=[];tested=0
        for undirected in combinations(neutral,adds_n):
          for signs in product((0,1),repeat=adds_n):
            adds=tuple((j,i) if signs[k] else (i,j) for k,(i,j) in enumerate(undirected))
            tested+=1;op=core3+list(adds)
            mu=[[0]*8 for _ in range(8)]
            for i,j in op:mu[i-1][j-1]+=1;mu[j-1][i-1]-=1
            det=det_bareiss(mu)
            if not det:continue
            rr=rows(op);bas=rref_null(rr,4)
            if len(bas)!=1:continue
            v=bas[0]
            if v[0]!=v[1] or v[0]==v[2] or v[0]==v[3] or cubic(op,v):continue
            if chiral(op,v)!={(0,2):3,(1,2):-3,(0,3):3,(1,3):-3}:continue
            hits.append((8*sum(dims[i]*dims[j] for i,j in op),abs(det),det,adds,primitive(expand(v)),incidence(op),scalar_orbits(op)))
        print('THREE_FAMILY_COMPLETE',adds_n,'TESTED',tested,'HITS',len(hits))
        for x in sorted(hits)[:20]:print('THREE_FAMILY_COMPLETE_HIT',x)
        if hits:break

if "--three-family-redistribute" in sys.argv:
    color3=[(1,5),(1,5),(8,5),(5,2),(5,3),(5,4)]
    neutral_nodes=[1,2,3,4,7,8]
    neutral=list(combinations(neutral_nodes,2))
    acomp=[(a,3-a) for a in range(4)]
    bcomp=[x for x in product(range(4),repeat=4) if sum(x)==3]
    for adds_n in range(0,6):
        hits=[];tested=0
        for ca in acomp:
          for cb in bcomp:
            leptons=[(1,6)]*ca[0]+[(8,6)]*ca[1]
            for node,m in zip((2,3,4,7),cb):leptons += [(6,node)]*m
            base=color3+leptons
            iter_supports=[()] if adds_n==0 else combinations(neutral,adds_n)
            for undirected in iter_supports:
              for signs in product((0,1),repeat=adds_n):
                adds=tuple((j,i) if signs[k] else (i,j) for k,(i,j) in enumerate(undirected))
                tested+=1;op=base+list(adds)
                mu=[[0]*8 for _ in range(8)]
                for i,j in op:mu[i-1][j-1]+=1;mu[j-1][i-1]-=1
                det=det_bareiss(mu)
                if not det:continue
                rr=rows(op);bas=rref_null(rr,4)
                if len(bas)!=1:continue
                v=bas[0]
                if v[0]!=v[1] or v[0]==v[2] or v[0]==v[3] or cubic(op,v):continue
                if chiral(op,v)!={(0,2):3,(1,2):-3,(0,3):3,(1,3):-3}:continue
                types=list(dict.fromkeys(e for e in op if 5 not in e))
                tes=[]
                for x,y in combinations(range(len(types)),2):
                    p=types[x];n=(types[y][1],types[y][0])
                    if p[1]==n[1] or p[0]==n[0]:tes.append((x,y))
                if not connected(tes,set(range(len(types)))):continue
                beta=len(tes)-len(types)+1
                if beta<2:continue
                hits.append((8*sum(dims[i]*dims[j] for i,j in op),abs(det),det,ca,cb,adds,primitive(expand(v)),incidence(op),types,tes,beta))
        print('THREE_FAMILY_REDISTRIBUTE',adds_n,'TESTED',tested,'HITS',len(hits))
        for x in sorted(hits)[:30]:print('THREE_FAMILY_REDISTRIBUTE_HIT',x)
        if hits:break

if "--inspect3f448" in sys.argv:
    op=[(1,5),(1,5),(8,5),(5,2),(5,3),(5,4),
        (1,6),(8,6),(8,6),(6,4),(6,7),(6,7),(2,1),(7,8)]
    rr=rows(op);bas=rref_null(rr,4)
    mu=[[0]*8 for _ in range(8)]
    for i,j in op:mu[i-1][j-1]+=1;mu[j-1][i-1]-=1
    A={1,8};B={2,3,4,7};wp=lambda block:sum((dims[j] if i in block else 0)+(dims[i] if j in block else 0) for i,j in op)%2
    print('EDGES3F448',op)
    print('DIM3F448',8*sum(dims[i]*dims[j] for i,j in op),'DET3F448',det_bareiss(mu),'INCIDENCE3F448',incidence(op),'WITTEN3F448',wp(A),wp(B))
    print('ROWS3F448',rr,'BASIS3F448',bas,'PRIMITIVE3F448',primitive(expand(bas[0])),'CUBIC3F448',cubic(op,bas[0]),'CHIRAL3F448',chiral(op,bas[0]))
    print('ORBITS3F448',scalar_orbits(op))

if "--three-family-trace" in sys.argv:
    color3=[(1,5),(1,5),(8,5),(5,2),(5,3),(5,4)]
    neutral_nodes=[1,2,3,4,7,8];neutral=list(combinations(neutral_nodes,2))
    acomp=[(a,3-a) for a in range(4)];bcomp=[x for x in product(range(4),repeat=4) if sum(x)==3]
    cls=lambda n:'A' if n in (1,8) else 'B'
    cats=Counter(); reps={}; total=0
    for ca in acomp:
      for cb in bcomp:
        leptons=[(1,6)]*ca[0]+[(8,6)]*ca[1]
        for node,m in zip((2,3,4,7),cb):leptons += [(6,node)]*m
        base=color3+leptons
        for undirected in combinations(neutral,2):
          for signs in product((0,1),repeat=2):
            adds=tuple((j,i) if signs[k] else (i,j) for k,(i,j) in enumerate(undirected));op=base+list(adds)
            mu=[[0]*8 for _ in range(8)]
            for i,j in op:mu[i-1][j-1]+=1;mu[j-1][i-1]-=1
            if not det_bareiss(mu):continue
            rr=rows(op);bas=rref_null(rr,4)
            if len(bas)!=1:continue
            v=bas[0]
            if v[0]!=v[1] or v[0]==v[2] or v[0]==v[3] or cubic(op,v):continue
            if chiral(op,v)!={(0,2):3,(1,2):-3,(0,3):3,(1,3):-3}:continue
            types=list(dict.fromkeys(e for e in op if 5 not in e));tes=[]
            for x,y in combinations(range(len(types)),2):
                p=types[x];n=(types[y][1],types[y][0])
                if p[1]==n[1] or p[0]==n[0]:tes.append((x,y))
            if not connected(tes,set(range(len(types)))) or len(tes)-len(types)+1<2:continue
            key=tuple(sorted(''.join(sorted((cls(i),cls(j)))) for i,j in adds))
            cats[key]+=1;total+=1;reps.setdefault(key,(ca,cb,adds,det_bareiss(mu),primitive(expand(v))))
    print('TRACE_CATEGORIES',total,cats)
    for k in sorted(reps):print('TRACE_REP',k,reps[k])

if "--trace-rge" in sys.argv:
    # Illustrative one-loop SM running below a single matching threshold.
    # Inputs are fixed benchmark numbers, not fitted or live data.
    import math
    mz=91.1876; alpha_em_inv=127.955; sin2=0.23122; alpha_s=0.1179
    alpha_em=1/alpha_em_inv
    alpha_y=alpha_em/(1-sin2); alpha_2=alpha_em/sin2
    inv0={'Y':1/alpha_y,'2':1/alpha_2,'3':1/alpha_s}
    beta={'Y':41/6,'2':-19/6,'3':-7}
    slope={k:-beta[k]/(2*math.pi) for k in beta}
    def solve_ratio(num,den,target):
        # alpha_num/alpha_den = A_den/A_num = target.
        return (target*inv0[num]-inv0[den])/(slope[den]-target*slope[num])
    def inv(k,t):return inv0[k]+slope[k]*t
    def ratio(num,den,t):return inv(den,t)/inv(num,t)
    t_w=solve_ratio('Y','2',2/3)
    t_c=solve_ratio('3','2',4/3)
    for label,t in [('WEAK_2_OVER_5',t_w),('COLOR_4_OVER_3',t_c)]:
        ay_a2=ratio('Y','2',t); a3_a2=ratio('3','2',t)
        print('TRACE_RGE',label,'LOG',t,'MU_GEV',mz*math.exp(t),
              'SIN2',ay_a2/(1+ay_a2),'A3_A2',a3_a2,
              'INV',inv('Y',t),inv('2',t),inv('3',t))
    # Also sample n vectorlike (2,2,0) bidoublets active all the way from MZ.
    # Below SU(2)R breaking each contributes Delta bY=Delta b2=4/3.
    for n in range(0,7):
        bn={'Y':41/6+n*4/3,'2':-19/6+n*4/3,'3':-7}
        sn={k:-bn[k]/(2*math.pi) for k in bn}
        def solve_n(num,den,target):
            return (target*inv0[num]-inv0[den])/(sn[den]-target*sn[num])
        tw=solve_n('Y','2',2/3);tc=solve_n('3','2',4/3)
        print('TRACE_RGE_BIDOUBLETS',n,'BETA',bn,'T_WEAK',tw,'T_COLOR',tc,
              'DELTA_T',tw-tc,'MU_WEAK',mz*math.exp(tw),'MU_COLOR',mz*math.exp(tc))

if "--trace-spectrum" in sys.argv:
    import math
    mz=91.1876; alpha_em_inv=127.955; sin2=0.23122; alpha_s=0.1179
    alpha_em=1/alpha_em_inv
    inv0={'Y':(1-sin2)/alpha_em,'2':sin2/alpha_em,'3':1/alpha_s}
    base={'Y':41/6,'2':-19/6,'3':-7}
    # One-loop contributions of vectorlike Dirac fermions, with ordinary Y.
    reps={
      'Q':{'Y':Fraction(2,9),'2':Fraction(2,1),'3':Fraction(4,3)},
      'U':{'Y':Fraction(16,9),'2':0,'3':Fraction(2,3)},
      'D':{'Y':Fraction(4,9),'2':0,'3':Fraction(2,3)},
      'L':{'Y':Fraction(2,3),'2':Fraction(2,3),'3':0},
      'E':{'Y':Fraction(4,3),'2':0,'3':0},
      'W':{'Y':0,'2':Fraction(8,3),'3':0},
      'G':{'Y':0,'2':0,'3':4},
    }
    names=list(reps);hits=[]
    for counts in product(range(5),repeat=len(names)):
      if not any(counts):continue
      db={k:sum(Fraction(counts[i])*reps[n][k] for i,n in enumerate(names)) for k in base}
      b={k:base[k]+float(db[k]) for k in base};s={k:-b[k]/(2*math.pi) for k in b}
      dw=s['2']-(2/3)*s['Y'];dc=s['2']-(4/3)*s['3']
      if not dw or not dc:continue
      tw=((2/3)*inv0['Y']-inv0['2'])/dw
      tc=((4/3)*inv0['3']-inv0['2'])/dc
      if 5<tw<45 and 5<tc<45:
        hits.append((abs(tw-tc),sum(counts),max(counts),counts,tw,tc,db))
    for h in sorted(hits)[:30]:
      gap,total,mx,counts,tw,tc,db=h
      print('TRACE_SPECTRUM',gap,total,dict(zip(names,counts)),
            'DB',{k:str(v) for k,v in db.items()},'T',tw,tc,'MU',mz*math.exp((tw+tc)/2))
    fixed={'Y':Fraction(8,3),'2':Fraction(8,3),'3':Fraction(0)}
    fixed_hits=[]
    for counts in product(range(5),repeat=len(names)):
      db={k:fixed[k]+sum(Fraction(counts[i])*reps[n][k] for i,n in enumerate(names)) for k in base}
      b={k:base[k]+float(db[k]) for k in base};s={k:-b[k]/(2*math.pi) for k in b}
      dw=s['2']-(2/3)*s['Y'];dc=s['2']-(4/3)*s['3']
      if not dw or not dc:continue
      tw=((2/3)*inv0['Y']-inv0['2'])/dw;tc=((4/3)*inv0['3']-inv0['2'])/dc
      if 5<tw<45 and 5<tc<45:
        fixed_hits.append((abs(tw-tc),sum(counts),max(counts),counts,tw,tc,db))
    for h in sorted(fixed_hits)[:20]:
      gap,total,mx,counts,tw,tc,db=h
      print('TRACE_SPECTRUM_FIXED2BI',gap,total,dict(zip(names,counts)),
            'DB',{k:str(v) for k,v in db.items()},'T',tw,tc,'MU',mz*math.exp((tw+tc)/2))
    # Exact two-variable solve when the fixed bidoublets and all extra reps share
    # one threshold tau, with x the common high-scale logarithm and z=x-tau.
    c0w=inv0['2']-(2/3)*inv0['Y']; c0c=inv0['2']-(4/3)*inv0['3']
    s0={k:-base[k]/(2*math.pi) for k in base}
    sw=s0['2']-(2/3)*s0['Y'];sc=s0['2']-(4/3)*s0['3']
    threshold_hits=[]
    for counts in product(range(5),repeat=len(names)):
      db={k:fixed[k]+sum(Fraction(counts[i])*reps[n][k] for i,n in enumerate(names)) for k in base}
      cw=(float(db['2'])-(2/3)*float(db['Y']))/(2*math.pi)
      cc=(float(db['2'])-(4/3)*float(db['3']))/(2*math.pi)
      det=sw*(-cc)-sc*(-cw)
      if abs(det)<1e-12:continue
      x=((-c0w)*(-cc)-(-c0c)*(-cw))/det
      z=(sw*(-c0c)-sc*(-c0w))/det
      tau=x-z
      if 0<=tau<=x and 5<x<45:
        threshold_hits.append((sum(counts),-tau,x,tau,counts,db))
    for total,ntau,x,tau,counts,db in sorted(threshold_hits)[:30]:
      print('TRACE_SPECTRUM_THRESHOLD',total,dict(zip(names,counts)),
            'DB',{k:str(v) for k,v in db.items()},'X',x,'TAU',tau,
            'MU_MATCH',mz*math.exp(x),'MU_THRESHOLD',mz*math.exp(tau))

if "--color-chain" in sys.argv:
    op=[(1,5),(1,5),(8,5),(5,2),(5,3),(5,4),
        (1,6),(8,6),(8,6),(6,4),(6,7),(6,7),(2,1),(7,8)]
    ext=op+[(5,9),(9,10)]
    mu=[[0]*10 for _ in range(10)]
    for i,j in ext:mu[i-1][j-1]+=1;mu[j-1][i-1]-=1
    dims10={**dims,9:3,10:3}
    print('COLOR_CHAIN_EDGES',[(5,9),(9,10)])
    print('COLOR_CHAIN_DET',det_bareiss(mu),'RANK',np.linalg.matrix_rank(np.array(mu,dtype=float)))
    print('COLOR_CHAIN_DIM',8*sum(dims10[i]*dims10[j] for i,j in ext),
          'ADDED_DIM',8*(dims10[5]*dims10[9]+dims10[9]*dims10[10]))
    print('COLOR_CHAIN_ROWS')
    for row in mu:print(row)
    def phase_rows(groups,color_groups):
        loc={node:k for k,g in enumerate(groups) for node in g};nv=len(groups)
        def cv(q):
            z=[0]*nv
            for node,val in enumerate(q,1):z[loc[node]]+=val
            return z
        inc=[0]*10;grav=[0]*10;su=[]
        for i,j in ext:
            inc[i-1]+=dims10[j];inc[j-1]+=dims10[i]
            q=[0]*10;q[i-1]=1;q[j-1]=-1;w=4*dims10[i]*dims10[j]
            for k in range(10):grav[k]+=w*q[k]
        color_rows=[]
        for cg in color_groups:
            r=[0]*10
            for i,j in ext:
                q=[0]*10;q[i-1]=1;q[j-1]=-1
                if i in cg:
                    for k in range(10):r[k]+=2*dims10[j]*q[k]
                if j in cg:
                    for k in range(10):r[k]+=2*dims10[i]*q[k]
            color_rows.append(cv(r))
        for block in ({1,8},{2,3,4,7}):
            r=[0]*10
            for i,j in ext:
                q=[0]*10;q[i-1]=1;q[j-1]=-1
                if i in block:
                    for k in range(10):r[k]+=2*dims10[j]*q[k]
                if j in block:
                    for k in range(10):r[k]+=2*dims10[i]*q[k]
            su.append(cv(r))
        rr=[cv(inc)]+color_rows+[cv(grav)]+su
        return rr,rref_null(rr,nv)
    product_groups=({1,8},{2,3,4,7},{5},{6},{9},{10})
    diagonal_groups=({1,8},{2,3,4,7},{5,9,10},{6})
    rp,kp=phase_rows(product_groups,({5},{9},{10}))
    rd,kd=phase_rows(diagonal_groups,({5,9,10},))
    print('COLOR_CHAIN_PRODUCT_ROWS',rp,'KERNEL',kp)
    print('COLOR_CHAIN_DIAGONAL_ROWS',rd,'KERNEL',kd,
          'PRIMITIVE',[primitive([v[0],v[1],v[2],v[3]]) for v in kd])
    for label,groups,ker in [('PRODUCT',product_groups,kp),('DIAGONAL',diagonal_groups,kd)]:
        for v in ker:
            phase={node:v[g] for g,group in enumerate(groups) for node in group}
            cub=sum(4*dims10[i]*dims10[j]*(phase[i]-phase[j])**3 for i,j in ext)
            print('COLOR_CHAIN_CUBIC',label,cub,'PHASE',phase)
    tri=ext+[(5,10)]
    mut=[[0]*10 for _ in range(10)]
    for i,j in tri:mut[i-1][j-1]+=1;mut[j-1][i-1]-=1
    print('COLOR_TRIANGLE_DET',det_bareiss(mut),'RANK',np.linalg.matrix_rank(np.array(mut,dtype=float)),
          'DIM',8*sum(dims10[i]*dims10[j] for i,j in tri))
    trio=ext+[(10,5)]
    muo=[[0]*10 for _ in range(10)]
    for i,j in trio:muo[i-1][j-1]+=1;muo[j-1][i-1]-=1
    print('COLOR_ORIENTED_TRIANGLE_DET',det_bareiss(muo),'RANK',np.linalg.matrix_rank(np.array(muo,dtype=float)),
          'DIM',8*sum(dims10[i]*dims10[j] for i,j in trio))

if "--trace-selfconsistent" in sys.argv:
    import math
    mz=91.1876;alpha_em_inv=127.955;sin2=0.23122;alpha_s=0.1179
    ae=1/alpha_em_inv
    a0={'Y':(1-sin2)/ae,'2':sin2/ae,'3':1/alpha_s}
    b0={'Y':41/6,'2':-19/6,'3':-7}
    db={'Y':8/3,'2':8/3,'3':8}
    s0={k:-b0[k]/(2*math.pi) for k in b0}
    rw=2/3;rc=4/9
    c0w=a0['2']-rw*a0['Y'];c0c=a0['2']-rc*a0['3']
    sw=s0['2']-rw*s0['Y'];sc=s0['2']-rc*s0['3']
    cw=(db['2']-rw*db['Y'])/(2*math.pi);cc=(db['2']-rc*db['3'])/(2*math.pi)
    det=sw*(-cc)-sc*(-cw)
    x=((-c0w)*(-cc)-(-c0c)*(-cw))/det
    z=(sw*(-c0c)-sc*(-c0w))/det;tau=x-z
    print('TRACE_SELFCONSISTENT','TARGETS',rw,rc,'X',x,'TAU',tau,
          'MU_MATCH',mz*math.exp(x),'MU_THRESHOLD',mz*math.exp(tau),
          'PHYSICAL_ORDER',0<=tau<=x)

if "--trace-fixedpoint" in sys.argv:
    import math
    mz=91.1876;alpha_em_inv=127.955;sin2=0.23122;alpha_s=0.1179;ae=1/alpha_em_inv
    a0={'Y':(1-sin2)/ae,'2':sin2/ae,'3':1/alpha_s}
    b0={'Y':41/6,'2':-19/6,'3':-7};s0={k:-b0[k]/(2*math.pi) for k in b0}
    ksm={'Y':Fraction(10),'2':Fraction(6),'3':Fraction(6)}
    fixed={'Y':Fraction(2),'2':Fraction(2),'3':Fraction(0)}
    kreps={
      'Q':{'Y':Fraction(1,3),'2':3,'3':2},
      'U':{'Y':Fraction(8,3),'2':0,'3':1},
      'D':{'Y':Fraction(2,3),'2':0,'3':1},
      'L':{'Y':1,'2':1,'3':0},
      'E':{'Y':2,'2':0,'3':0},
      'W':{'Y':0,'2':4,'3':0},
      'G':{'Y':0,'2':0,'3':6},
    }
    names=list(kreps);hits=[];rho=Fraction(2,3)
    for counts in product(range(5),repeat=len(names)):
      dk={k:fixed[k]+sum(Fraction(counts[i])*kreps[n][k] for i,n in enumerate(names)) for k in ksm}
      kt={k:ksm[k]+dk[k] for k in ksm};rw=float(kt['2']/kt['Y']);rc=float(kt['2']/kt['3'])
      db={k:rho*dk[k] for k in dk}
      c0w=a0['2']-rw*a0['Y'];c0c=a0['2']-rc*a0['3']
      sw=s0['2']-rw*s0['Y'];sc=s0['2']-rc*s0['3']
      cw=(float(db['2'])-rw*float(db['Y']))/(2*math.pi)
      cc=(float(db['2'])-rc*float(db['3']))/(2*math.pi)
      det=sw*(-cc)-sc*(-cw)
      if abs(det)<1e-12:continue
      x=((-c0w)*(-cc)-(-c0c)*(-cw))/det
      z=(sw*(-c0c)-sc*(-c0w))/det;tau=x-z
      if 0<=tau<=x and 5<x<45:
        hits.append((sum(counts),-tau,x,tau,counts,dk,kt,db))
    print('TRACE_FIXEDPOINT_COUNT',len(hits))
    for total,ntau,x,tau,counts,dk,kt,db in sorted(hits)[:30]:
      print('TRACE_FIXEDPOINT',total,dict(zip(names,counts)),
            'DK',{k:str(v) for k,v in dk.items()},'K',{k:str(v) for k,v in kt.items()},
            'X',x,'TAU',tau,'MU_MATCH',mz*math.exp(x),'MU_THRESHOLD',mz*math.exp(tau))
    wanted={(1,2,2,0,0,0,0):'LR_COMPLETE_Q_2UD',
            (0,1,1,1,1,0,0):'LR_COMPLETE_UD_L_EN'}
    for total,ntau,x,tau,counts,dk,kt,db in hits:
      if counts in wanted:
        print('TRACE_FIXEDPOINT_SPECIAL',wanted[counts],
              'DK',{k:str(v) for k,v in dk.items()},'K',{k:str(v) for k,v in kt.items()},
              'X',x,'TAU',tau,'MU_MATCH',mz*math.exp(x),'MU_THRESHOLD',mz*math.exp(tau))
    for counts,label in wanted.items():
      dk={k:fixed[k]+sum(Fraction(counts[i])*kreps[n][k] for i,n in enumerate(names)) for k in ksm}
      kt={k:ksm[k]+dk[k] for k in ksm};rw=float(kt['2']/kt['Y']);rc=float(kt['2']/kt['3'])
      db={k:rho*dk[k] for k in dk}
      c0w=a0['2']-rw*a0['Y'];c0c=a0['2']-rc*a0['3']
      sw=s0['2']-rw*s0['Y'];sc=s0['2']-rc*s0['3']
      cw=(float(db['2'])-rw*float(db['Y']))/(2*math.pi);cc=(float(db['2'])-rc*float(db['3']))/(2*math.pi)
      det=sw*(-cc)-sc*(-cw)
      x=((-c0w)*(-cc)-(-c0c)*(-cw))/det;z=(sw*(-c0c)-sc*(-c0w))/det;tau=x-z
      print('TRACE_FIXEDPOINT_COMPLETION',label,'DK',{k:str(v) for k,v in dk.items()},
            'K',{k:str(v) for k,v in kt.items()},'X',x,'TAU',tau,'PHYSICAL',0<=tau<=x,
            'MU_MATCH',mz*math.exp(x) if x<700 else 'overflow',
            'MU_THRESHOLD',mz*math.exp(tau) if tau<700 else 'overflow')

if "--lr-rge" in sys.argv:
    import math
    mz=91.1876;ae=1/127.955;sin2=0.23122;alpha_s=0.1179
    aY=(1-sin2)/ae;aL=sin2/ae;a3=1/alpha_s
    bsm={'Y':41/6,'L':-19/6,'3':-7}
    # Three LR families + one complex (1,2,2,0) + one complex (1,1,2,1/2).
    blr={'L':-3,'R':-17/6,'X':17/6,'3':-7}
    ssm={k:-v/(2*math.pi) for k,v in bsm.items()};slr={k:-v/(2*math.pi) for k,v in blr.items()}
    # Unknowns u=(tR, d=tLambda-tR, AR(tR)).
    # AL/8=A3/6; AR(Lambda)=AL(Lambda); AX(Lambda)=AL(Lambda)/2;
    # and AX(tR)=AY(tR)-AR(tR).
    M=np.array([
      [ssm['L']/8-ssm['3']/6, slr['L']/8-slr['3']/6, 0],
      [-ssm['L'], slr['R']-slr['L'], 1],
      [ssm['Y']-.5*ssm['L'], slr['X']-.5*slr['L'], -1]
    ],dtype=float)
    q=np.array([-(aL/8-a3/6),aL,-(aY-.5*aL)],dtype=float)
    tR,d,arR=np.linalg.solve(M,q);tL=tR+d;axR=aY+ssm['Y']*tR-arR
    vals={
      'AL':aL+ssm['L']*tR+slr['L']*d,
      'AR':arR+slr['R']*d,
      'AX':axR+slr['X']*d,
      'A3':a3+ssm['3']*tR+slr['3']*d}
    print('LR_RGE','TR',tR,'DELTA',d,'TL',tL,'MR',mz*math.exp(tR),'ML',mz*math.exp(tL),
          'AR_MR',arR,'AX_MR',axR,'VALUES',vals,
          'RATIOS',{k:vals[k]/v for k,v in {'AL':8,'AR':8,'AX':4,'A3':6}.items()},
          'PHYSICAL',0<=tR<=tL and arR>0 and axR>0 and all(v>0 for v in vals.values()))
    # Self-consistent carrier running: the two added fermionic bidoublet sectors
    # account for delta(kL,kR)=(2,2), hence delta(bL,bR)=(4/3,4/3).
    blrc={**blr,'L':blr['L']+4/3,'R':blr['R']+4/3}
    slrc={k:-v/(2*math.pi) for k,v in blrc.items()}
    Mc=np.array([
      [ssm['L']/8-ssm['3']/6, slrc['L']/8-slrc['3']/6, 0],
      [-ssm['L'], slrc['R']-slrc['L'], 1],
      [ssm['Y']-.5*ssm['L'], slrc['X']-.5*slrc['L'], -1]
    ],dtype=float)
    tR,d,arR=np.linalg.solve(Mc,q);tL=tR+d;axR=aY+ssm['Y']*tR-arR
    vals={'AL':aL+ssm['L']*tR+slrc['L']*d,'AR':arR+slrc['R']*d,
          'AX':axR+slrc['X']*d,'A3':a3+ssm['3']*tR+slrc['3']*d}
    print('LR_RGE_CARRIER','BETA',blrc,'TR',tR,'DELTA',d,'TL',tL,
          'MR',mz*math.exp(tR),'ML',mz*math.exp(tL),'AR_MR',arR,'AX_MR',axR,
          'VALUES',vals,'RATIOS',{k:vals[k]/v for k,v in {'AL':8,'AR':8,'AX':4,'A3':6}.items()},
          'PHYSICAL',0<=tR<=tL and arR>0 and axR>0 and all(v>0 for v in vals.values()))

if "--lr-deformations" in sys.argv:
    import math
    from itertools import combinations_with_replacement
    mz=91.1876;ae=1/127.955;sin2=0.23122;alpha_s=0.1179
    a={'Y':(1-sin2)/ae,'L':sin2/ae,'3':1/alpha_s}
    bsm={'Y':Fraction(41,6),'L':Fraction(-19,6),'3':Fraction(-7)}
    # Corrected v350 carrier baseline, including its fermionic completion sectors.
    kbase={'L':Fraction(8),'R':Fraction(8),'X':Fraction(4),'3':Fraction(6)}
    bbase={'L':Fraction(-5,3),'R':Fraction(-3,2),'X':Fraction(17,6),'3':Fraction(-7)}
    Z={q:Fraction(0) for q in ('L','R','X','3')}
    def V(**kw):return {q:Fraction(kw.get(q,0)) for q in Z}
    fermion_k={
      'fQL':V(L=3,X=Fraction(1,3),**{'3':2}),
      'fQR':V(R=3,X=Fraction(1,3),**{'3':2}),
      'fLL':V(L=1,X=1),'fLR':V(R=1,X=1),
      'fB':V(L=2,R=2),'fG':V(**{'3':6}),
      'fWL':V(L=4),'fWR':V(R=4)}
    reps={}
    for n,k in fermion_k.items():reps[n]=(k,{q:Fraction(2,3)*k[q] for q in Z})
    reps.update({
      'sB':(V(),V(L=Fraction(1,3),R=Fraction(1,3))),
      'sL':(V(),V(L=Fraction(1,6),X=Fraction(1,6))),
      'sR':(V(),V(R=Fraction(1,6),X=Fraction(1,6))),
      'sTL':(V(),V(L=Fraction(2,3),X=1)),
      'sTR':(V(),V(R=Fraction(2,3),X=1)),
      'sG':(V(),V(**{'3':1}))})
    names=list(reps);hits=[];tested=0
    ssm={q:-float(bsm[q])/(2*math.pi) for q in bsm}
    for total in range(0,7):
      for bag in combinations_with_replacement(names,total):
        tested+=1
        dk={q:sum((reps[n][0][q] for n in bag),Fraction(0)) for q in Z}
        db={q:sum((reps[n][1][q] for n in bag),Fraction(0)) for q in Z}
        k={q:kbase[q]+dk[q] for q in Z};b={q:bbase[q]+db[q] for q in Z}
        s={q:-float(b[q])/(2*math.pi) for q in Z}
        M=np.array([
          [ssm['L']/float(k['L'])-ssm['3']/float(k['3']),s['L']/float(k['L'])-s['3']/float(k['3']),0],
          [-ssm['L']/float(k['L']),s['R']/float(k['R'])-s['L']/float(k['L']),1/float(k['R'])],
          [ssm['Y']/float(k['X'])-ssm['L']/float(k['L']),s['X']/float(k['X'])-s['L']/float(k['L']),-1/float(k['X'])]
        ])
        qv=np.array([-(a['L']/float(k['L'])-a['3']/float(k['3'])),a['L']/float(k['L']),a['L']/float(k['L'])-a['Y']/float(k['X'])])
        if abs(np.linalg.det(M))<1e-12:continue
        tR,d,ar=np.linalg.solve(M,qv);tL=tR+d;ax=a['Y']+ssm['Y']*tR-ar
        vals={'L':a['L']+ssm['L']*tR+s['L']*d,'R':ar+s['R']*d,'X':ax+s['X']*d,'3':a['3']+ssm['3']*tR+s['3']*d}
        if 0<=tR<=tL<=40 and ar>0 and ax>0 and all(v>0 for v in vals.values()):
          hits.append((total,tL,tR,bag,k,b,vals,ar,ax))
      if hits:break
    print('LR_DEFORMATION_TESTED',tested,'MIN_TOTAL',hits[0][0] if hits else None,'HITS',len(hits))
    for total,tL,tR,bag,k,b,vals,ar,ax in sorted(hits,key=lambda h:(h[0],h[1],-h[2]))[:40]:
      print('LR_DEFORMATION',bag,'K',{q:str(k[q]) for q in Z},'B',{q:str(b[q]) for q in Z},
            'TR',tR,'TL',tL,'DELTA',tL-tR,'MR',mz*math.exp(tR),'ML',mz*math.exp(tL),
            'AR_MR',ar,'AX_MR',ax,'VALUES',vals)

if "--lr-fqr-carrier" in sys.argv:
    base=[(1,5),(1,5),(8,5),(5,2),(5,3),(5,4),
          (1,6),(8,6),(8,6),(6,4),(6,7),(6,7),(2,1),(7,8)]
    op=base+[(5,2),(2,5)]
    mu=[[0]*8 for _ in range(8)]
    for i,j in op:mu[i-1][j-1]+=1;mu[j-1][i-1]-=1
    rr=rows(op);bas=rref_null(rr,4)
    A={1,8};B={2,3,4,7};wp=lambda block:sum((dims[j] if i in block else 0)+(dims[i] if j in block else 0) for i,j in op)%2
    print('LR_FQR_CARRIER','DET',det_bareiss(mu),'RANK',np.linalg.matrix_rank(np.array(mu,dtype=float)),
          'DIM',8*sum(dims[i]*dims[j] for i,j in op),'COPIES',len(op),'INCIDENCE',incidence(op),
          'ROWS',rr,'KERNEL',bas,'PRIMITIVE',[primitive(expand(v)) for v in bas],
          'CUBIC',[cubic(op,v) for v in bas],'CHIRAL',[chiral(op,v) for v in bas],
          'WITTEN',(wp(A),wp(B)))

if "--fqr-split" in sys.argv:
    # Clone the right SU(2) and color summands.  The new positive sectors
    # H_5,9 and H_9,10 become an fQR plus its conjugate only after the
    # identifications 9~B and 10~C, while remaining distinct algebra types.
    base=[(1,5),(1,5),(8,5),(5,2),(5,3),(5,4),
          (1,6),(8,6),(8,6),(6,4),(6,7),(6,7),(2,1),(7,8)]
    op=base+[(5,9),(9,10)]
    dims10={**dims,9:2,10:3}
    mu=[[0]*10 for _ in range(10)]
    for i,j in op:mu[i-1][j-1]+=1;mu[j-1][i-1]-=1
    print('FQR_SPLIT','EDGES',op,'DET',det_bareiss(mu),
          'RANK',np.linalg.matrix_rank(np.array(mu,dtype=float)),
          'DIM',8*sum(dims10[i]*dims10[j] for i,j in op),
          'ADDED_DIM',8*sum(dims10[i]*dims10[j] for i,j in [(5,9),(9,10)]))
    print('FQR_SPLIT_MATRIX')
    for row in mu:print(row)

    def split_rows(groups,color_groups,su2_groups):
        loc={node:k for k,g in enumerate(groups) for node in g};nv=len(groups)
        def cv(q):
            z=[0]*nv
            for node,val in enumerate(q,1):z[loc[node]]+=val
            return z
        inc=[0]*10;grav=[0]*10
        for i,j in op:
            inc[i-1]+=dims10[j];inc[j-1]+=dims10[i]
            q=[0]*10;q[i-1]=1;q[j-1]=-1;w=4*dims10[i]*dims10[j]
            for k in range(10):grav[k]+=w*q[k]
        rows_out=[cv(inc)]
        for block in color_groups+su2_groups:
            r=[0]*10
            for i,j in op:
                q=[0]*10;q[i-1]=1;q[j-1]=-1
                if i in block:
                    for k in range(10):r[k]+=2*dims10[j]*q[k]
                if j in block:
                    for k in range(10):r[k]+=2*dims10[i]*q[k]
            rows_out.append(cv(r))
        rows_out.append(cv(grav))
        return rows_out,rref_null(rows_out,nv)

    product=({1,8},{2,3,4,7},{5},{6},{9},{10})
    diagonal=({1,8},{2,3,4,7,9},{5,10},{6})
    rp,kp=split_rows(product,({5},{10}),({1,8},{2,3,4,7},{9}))
    rd,kd=split_rows(diagonal,({5,10},),({1,8},{2,3,4,7,9}))
    print('FQR_SPLIT_PRODUCT_ROWS',rp,'KERNEL',kp,
          'PRIMITIVE',[primitive(v) for v in kp])
    print('FQR_SPLIT_DIAGONAL_ROWS',rd,'KERNEL',kd,
          'PRIMITIVE',[primitive(v) for v in kd])
    for label,groups,ker in [('PRODUCT',product,kp),('DIAGONAL',diagonal,kd)]:
        for v in ker:
            phase={node:v[g] for g,group in enumerate(groups) for node in group}
            cub=sum(4*dims10[i]*dims10[j]*(phase[i]-phase[j])**3 for i,j in op)
            print('FQR_SPLIT_CUBIC',label,cub,'PHASE',phase)
    def witten(block):
        return sum((dims10[j] if i in block else 0)+(dims10[i] if j in block else 0)
                   for i,j in op)%2
    cls={1:'A',8:'A',2:'B',3:'B',4:'B',7:'B',9:'B',5:'C',10:'C',6:'S'}
    flow=Counter()
    for i,j in op:
        a,b=cls[i],cls[j]
        if a!=b:flow[(a,b)]+=1
    print('FQR_SPLIT_WITTEN',witten({1,8}),witten({2,3,4,7,9}),
          'CLASS_FLOW',dict(flow))
    positive=Counter(op)
    collision=[]
    for ij,n in positive.items():
        reverse_positive=positive.get((ij[1],ij[0]),0)
        if reverse_positive:collision.append((ij,n,reverse_positive))
    print('FQR_SPLIT_ORIENTABILITY_COLLISIONS',collision)

if "--fqr-split-search" in sys.argv:
    base=[(1,5),(1,5),(8,5),(5,2),(5,3),(5,4),
          (1,6),(8,6),(8,6),(6,4),(6,7),(6,7),(2,1),(7,8)]
    dims10={**dims,9:2,10:3};B0={2,3,4,7};C0={5};Bp={9};Cp={10}
    product=({1,8},B0,C0,{6},Bp,Cp)
    diagonal=({1,8},B0|Bp,C0|Cp,{6})

    def generalized_rows(op,groups,color_groups,su2_groups):
        loc={node:k for k,g in enumerate(groups) for node in g};nv=len(groups)
        def cv(q):
            z=[0]*nv
            for node,val in enumerate(q,1):z[loc[node]]+=val
            return z
        inc=[0]*10;grav=[0]*10
        for i,j in op:
            inc[i-1]+=dims10[j];inc[j-1]+=dims10[i]
            q=[0]*10;q[i-1]=1;q[j-1]=-1;w=4*dims10[i]*dims10[j]
            for k in range(10):grav[k]+=w*q[k]
        out=[cv(inc)]
        for block in color_groups+su2_groups:
            r=[0]*10
            for i,j in op:
                q=[0]*10;q[i-1]=1;q[j-1]=-1
                if i in block:
                    for k in range(10):r[k]+=2*dims10[j]*q[k]
                if j in block:
                    for k in range(10):r[k]+=2*dims10[i]*q[k]
            out.append(cv(r))
        out.append(cv(grav))
        return out,rref_null(out,nv)

    def phase_map(groups,v):return {node:v[g] for g,group in enumerate(groups) for node in group}
    def cub(op,phase):return sum(4*dims10[i]*dims10[j]*(phase[i]-phase[j])**3 for i,j in op)
    def wp(op,block):return sum((dims10[j] if i in block else 0)+(dims10[i] if j in block else 0) for i,j in op)%2
    candidates=[]
    C=[5,10];B=[2,3,4,7,9]
    for c1 in C:
      for b1 in B:
       for b2 in B:
        for c2 in C:
         additions=[(c1,b1),(b2,c2)]
         if not ({9,10} <= {x for e in additions for x in e}):continue
         op=base+additions
         if any(Counter(op)[(j,i)] for i,j in op):continue
         mu=[[0]*10 for _ in range(10)]
         for i,j in op:mu[i-1][j-1]+=1;mu[j-1][i-1]-=1
         det=det_bareiss(mu)
         rp,kp=generalized_rows(op,product,(C0,Cp),({1,8},B0,Bp))
         rd,kd=generalized_rows(op,diagonal,(C0|Cp,),({1,8},B0|Bp))
         product_charge=None;product_cubic=None
         if len(kp)==1:
             ph=phase_map(product,kp[0])
             product_charge=(ph[c1]-ph[b1],ph[b2]-ph[c2])
             product_cubic=cub(op,ph)
         diagonal_charge=None;diagonal_cubic=None
         if len(kd)==1:
             ph=phase_map(diagonal,kd[0])
             diagonal_charge=(ph[c1]-ph[b1],ph[b2]-ph[c2])
             diagonal_cubic=cub(op,ph)
         candidates.append((additions,det,len(kp),
             [primitive(v) for v in kp],product_charge,product_cubic,
             len(kd),[primitive(v) for v in kd],diagonal_charge,diagonal_cubic,
             (wp(op,{1,8}),wp(op,B0),wp(op,Bp))))
    print('FQR_SPLIT_SEARCH_TESTED',len(candidates))
    full=[x for x in candidates if x[1] and x[2]==1 and x[4] and x[4][0] and x[4][0]==-x[4][1]
          and x[5]==0 and x[6]==1 and x[8] and x[8][0] and x[8][0]==-x[8][1]
          and x[9]==0 and x[10]==(0,0,0)]
    print('FQR_SPLIT_SEARCH_FULL_PRODUCT_CHARGED',len(full))
    for x in full:print('FQR_SPLIT_SEARCH_FULL_HIT',x)
    topo=[x for x in candidates if x[1] and x[6]==1 and x[8] and x[8][0] and x[8][0]==-x[8][1]
          and x[9]==0 and x[10][0]==0 and (x[10][1]+x[10][2])%2==0]
    print('FQR_SPLIT_SEARCH_DIAGONAL_TOPOLOGICAL',len(topo))
    for x in topo:print('FQR_SPLIT_SEARCH_DIAGONAL_HIT',x)

if "--fqr-extra-search" in sys.argv:
    from itertools import combinations_with_replacement
    base=[(1,5),(1,5),(8,5),(5,2),(5,3),(5,4),
          (1,6),(8,6),(8,6),(6,4),(6,7),(6,7),(2,1),(7,8),(5,9),(9,10)]
    dims10={**dims,9:2,10:3};groups=({1,8},{2,3,4,7},{5},{6},{9},{10})
    nonabelian=({5},{10},{1,8},{2,3,4,7},{9})
    loc={node:k for k,g in enumerate(groups) for node in g}
    def cv(q):
        z=[0]*6
        for node,val in enumerate(q,1):z[loc[node]]+=val
        return z
    def constraints(op):
        inc=[0]*10;grav=[0]*10
        for i,j in op:
            inc[i-1]+=dims10[j];inc[j-1]+=dims10[i]
            q=[0]*10;q[i-1]=1;q[j-1]=-1;w=4*dims10[i]*dims10[j]
            for k in range(10):grav[k]+=w*q[k]
        out=[cv(inc)]
        for block in nonabelian:
            r=[0]*10
            for i,j in op:
                q=[0]*10;q[i-1]=1;q[j-1]=-1
                if i in block:
                    for k in range(10):r[k]+=2*dims10[j]*q[k]
                if j in block:
                    for k in range(10):r[k]+=2*dims10[i]*q[k]
            out.append(cv(r))
        out.append(cv(grav))
        return out,rref_null(out,6)
    def wp(op,block):return sum((dims10[j] if i in block else 0)+(dims10[i] if j in block else 0) for i,j in op)%2
    def matrix(op):
        z=[[0]*10 for _ in range(10)]
        for i,j in op:z[i-1][j-1]+=1;z[j-1][i-1]-=1
        return z
    used_reverse={(j,i) for i,j in base}
    edge_types=[]
    for i in range(1,11):
      for j in range(1,11):
       if i==j or (i,j) in used_reverse:continue
       edge_types.append((i,j))
    for added_n in range(1,4):
      tested=0;algebraic=[];physical=[]
      for additions in combinations_with_replacement(edge_types,added_n):
        op=base+list(additions);positive=Counter(op)
        if any(positive[(j,i)] for i,j in positive):continue
        tested+=1
        if any(wp(op,b) for b in ({1,8},{2,3,4,7},{9})):continue
        mu=matrix(op);det=det_bareiss(mu)
        if not det:continue
        rr,ker=constraints(op)
        if len(ker)!=1:continue
        v=ker[0];phase={node:v[g] for g,group in enumerate(groups) for node in group}
        cubic10=sum(4*dims10[i]*dims10[j]*(phase[i]-phase[j])**3 for i,j in op)
        if cubic10:continue
        qpair=(phase[5]-phase[9],phase[9]-phase[10])
        if not qpair[0] or qpair[0]!=-qpair[1]:continue
        rec=(additions,det,primitive(v),qpair,8*sum(dims10[i]*dims10[j] for i,j in additions))
        algebraic.append(rec)
        if phase[9]==phase[2] and phase[10]==phase[5]:physical.append(rec)
      print('FQR_EXTRA',added_n,'TESTED',tested,'ALGEBRAIC',len(algebraic),'LOCK_COMPATIBLE',len(physical))
      for x in sorted(algebraic,key=lambda z:(z[-1],z[0]))[:30]:print('FQR_EXTRA_ALGEBRAIC_HIT',x)
      for x in sorted(physical,key=lambda z:(z[-1],z[0]))[:30]:print('FQR_EXTRA_LOCK_HIT',x)
      if physical:break

if "--lr-fql-fqr" in sys.argv:
    import math
    mz=91.1876;ae=1/127.955;sin2=0.23122;alpha_s=0.1179
    a={'Y':(1-sin2)/ae,'L':sin2/ae,'3':1/alpha_s}
    bsm={'Y':41/6,'L':-19/6,'3':-7}
    # Corrected v350 carrier plus one vectorlike fQL and one vectorlike fQR.
    k={'L':11,'R':11,'X':Fraction(14,3),'3':10}
    b={'L':Fraction(1,3),'R':Fraction(1,2),'X':Fraction(59,18),'3':Fraction(-13,3)}
    ssm={q:-float(v)/(2*math.pi) for q,v in bsm.items()}
    slr={q:-float(v)/(2*math.pi) for q,v in b.items()}
    M=np.array([
      [ssm['L']/float(k['L'])-ssm['3']/float(k['3']),slr['L']/float(k['L'])-slr['3']/float(k['3']),0],
      [-ssm['L']/float(k['L']),slr['R']/float(k['R'])-slr['L']/float(k['L']),1/float(k['R'])],
      [ssm['Y']/float(k['X'])-ssm['L']/float(k['L']),slr['X']/float(k['X'])-slr['L']/float(k['L']),-1/float(k['X'])]
    ])
    qv=np.array([-(a['L']/float(k['L'])-a['3']/float(k['3'])),
                 a['L']/float(k['L']),a['L']/float(k['L'])-a['Y']/float(k['X'])])
    tR,d,ar=np.linalg.solve(M,qv);tL=tR+d;ax=a['Y']+ssm['Y']*tR-ar
    vals={'L':a['L']+ssm['L']*tR+slr['L']*d,'R':ar+slr['R']*d,
          'X':ax+slr['X']*d,'3':a['3']+ssm['3']*tR+slr['3']*d}
    print('LR_FQL_FQR','K',{q:str(v) for q,v in k.items()},'B',{q:str(v) for q,v in b.items()},
          'TR',tR,'DELTA',d,'TL',tL,'MR',mz*math.exp(tR),'ML',mz*math.exp(tL),
          'AR_MR',ar,'AX_MR',ax,'VALUES',vals,
          'RATIOS',{q:vals[q]/float(k[q]) for q in k},
          'PHYSICAL',0<=tR<=tL and ar>0 and ax>0 and all(x>0 for x in vals.values()))
    op=[(1,5),(1,5),(8,5),(5,2),(5,3),(5,4),
        (1,6),(8,6),(8,6),(6,4),(6,7),(6,7),(2,1),(7,8),
        (5,9),(9,10),(1,5),(10,1)]
    dims10={**dims,9:2,10:3};mu=[[0]*10 for _ in range(10)]
    for i,j in op:mu[i-1][j-1]+=1;mu[j-1][i-1]-=1
    print('LR_FQL_FQR_CARRIER','DET',det_bareiss(mu),
          'RANK',np.linalg.matrix_rank(np.array(mu,dtype=float)),
          'DIM',8*sum(dims10[i]*dims10[j] for i,j in op),'COPIES',len(op),
          'ORIENTABILITY_COLLISIONS',[(ij,n,Counter(op)[(ij[1],ij[0])]) for ij,n in Counter(op).items() if Counter(op)[(ij[1],ij[0])]])

if "--lr-two-fqr" in sys.argv:
    import math
    mz=91.1876;ae=1/127.955;sin2=0.23122;alpha_s=0.1179
    a={'Y':(1-sin2)/ae,'L':sin2/ae,'3':1/alpha_s}
    bsm={'Y':41/6,'L':-19/6,'3':-7}
    k={'L':8,'R':14,'X':Fraction(14,3),'3':10}
    b={'L':Fraction(-5,3),'R':Fraction(5,2),'X':Fraction(59,18),'3':Fraction(-13,3)}
    s0={q:-float(v)/(2*math.pi) for q,v in bsm.items()};s={q:-float(v)/(2*math.pi) for q,v in b.items()}
    M=np.array([
      [s0['L']/float(k['L'])-s0['3']/float(k['3']),s['L']/float(k['L'])-s['3']/float(k['3']),0],
      [-s0['L']/float(k['L']),s['R']/float(k['R'])-s['L']/float(k['L']),1/float(k['R'])],
      [s0['Y']/float(k['X'])-s0['L']/float(k['L']),s['X']/float(k['X'])-s['L']/float(k['L']),-1/float(k['X'])]
    ])
    q=np.array([-(a['L']/float(k['L'])-a['3']/float(k['3'])),a['L']/float(k['L']),a['L']/float(k['L'])-a['Y']/float(k['X'])])
    tR,d,ar=np.linalg.solve(M,q);tL=tR+d;ax=a['Y']+s0['Y']*tR-ar
    vals={'L':a['L']+s0['L']*tR+s['L']*d,'R':ar+s['R']*d,
          'X':ax+s['X']*d,'3':a['3']+s0['3']*tR+s['3']*d}
    print('LR_TWO_FQR','K',{q:str(v) for q,v in k.items()},'B',{q:str(v) for q,v in b.items()},
          'TR',tR,'DELTA',d,'TL',tL,'MR',mz*math.exp(tR),'ML',mz*math.exp(tL),
          'AR_MR',ar,'AX_MR',ax,'VALUES',vals,'RATIOS',{q:vals[q]/float(k[q]) for q in k},
          'PHYSICAL',0<=tR<=tL and ar>0 and ax>0 and all(z>0 for z in vals.values()))
    op=[(1,5),(1,5),(8,5),(5,2),(5,3),(5,4),
        (1,6),(8,6),(8,6),(6,4),(6,7),(6,7),(2,1),(7,8),
        (5,9),(9,10),(7,5),(10,2)]
    dims10={**dims,9:2,10:3};mu=[[0]*10 for _ in range(10)]
    for i,j in op:mu[i-1][j-1]+=1;mu[j-1][i-1]-=1
    print('LR_TWO_FQR_CARRIER','DET',det_bareiss(mu),'RANK',np.linalg.matrix_rank(np.array(mu,float)),
          'DIM',8*sum(dims10[i]*dims10[j] for i,j in op),'COPIES',len(op),
          'COLLISIONS',[(ij,n,Counter(op)[(ij[1],ij[0])]) for ij,n in Counter(op).items() if Counter(op)[(ij[1],ij[0])]])

if "--lr-quark-grid" in sys.argv:
    import math
    mz=91.1876;ae=1/127.955;sin2=0.23122;alpha_s=0.1179
    a={'Y':(1-sin2)/ae,'L':sin2/ae,'3':1/alpha_s}
    bsm={'Y':41/6,'L':-19/6,'3':-7};s0={q:-v/(2*math.pi) for q,v in bsm.items()}
    hits=[]
    for nL in range(11):
      for nR in range(11):
        k={'L':8+3*nL,'R':8+3*nR,'X':4+Fraction(nL+nR,3),'3':6+2*(nL+nR)}
        b={'L':Fraction(-5,3)+2*nL,'R':Fraction(-3,2)+2*nR,
           'X':Fraction(17,6)+Fraction(2*(nL+nR),9),'3':Fraction(-7)+Fraction(4*(nL+nR),3)}
        s={q:-float(v)/(2*math.pi) for q,v in b.items()}
        M=np.array([
          [s0['L']/float(k['L'])-s0['3']/float(k['3']),s['L']/float(k['L'])-s['3']/float(k['3']),0],
          [-s0['L']/float(k['L']),s['R']/float(k['R'])-s['L']/float(k['L']),1/float(k['R'])],
          [s0['Y']/float(k['X'])-s0['L']/float(k['L']),s['X']/float(k['X'])-s['L']/float(k['L']),-1/float(k['X'])]])
        q=np.array([-(a['L']/float(k['L'])-a['3']/float(k['3'])),a['L']/float(k['L']),a['L']/float(k['L'])-a['Y']/float(k['X'])])
        if abs(np.linalg.det(M))<1e-12:continue
        tR,d,ar=np.linalg.solve(M,q);tL=tR+d;ax=a['Y']+s0['Y']*tR-ar
        vals={'L':a['L']+s0['L']*tR+s['L']*d,'R':ar+s['R']*d,
              'X':ax+s['X']*d,'3':a['3']+s0['3']*tR+s['3']*d}
        physical=0<=tR<=tL<=50 and ar>0 and ax>0 and all(z>0 for z in vals.values())
        if physical:hits.append((nL,nR,tR,d,tL,mz*math.exp(tR),mz*math.exp(tL),min(vals.values())))
        print('LR_QUARK_GRID',nL,nR,'TR',tR,'D',d,'TL',tL,'PHYSICAL',physical)
    print('LR_QUARK_GRID_HITS',len(hits))
    for h in hits:print('LR_QUARK_GRID_HIT',h)

if "--lr-double-pairs-carrier" in sys.argv:
    import math
    base=[(1,5),(1,5),(8,5),(5,2),(5,3),(5,4),
          (1,6),(8,6),(8,6),(6,4),(6,7),(6,7),(2,1),(7,8),
          (5,9),(9,10),(1,5),(10,1)]
    fql=[((1,5),(10,1)),((1,5),(10,8)),((8,5),(10,1)),((8,5),(10,8))]
    fqr=[((7,5),(10,2)),((7,5),(10,3)),((7,5),(10,4)),((7,5),(10,7))]
    dims10={**dims,9:2,10:3};groups=({1,8},{2,3,4,7},{5},{6},{9},{10})
    nonabelian=({5},{10},{1,8},{2,3,4,7},{9});loc={node:k for k,g in enumerate(groups) for node in g}
    def cv(q):
        z=[0]*6
        for node,val in enumerate(q,1):z[loc[node]]+=val
        return z
    def constraints(op):
        inc=[0]*10;grav=[0]*10
        for i,j in op:
            inc[i-1]+=dims10[j];inc[j-1]+=dims10[i]
            q=[0]*10;q[i-1]=1;q[j-1]=-1;w=4*dims10[i]*dims10[j]
            for k0 in range(10):grav[k0]+=w*q[k0]
        out=[cv(inc)]
        for block in nonabelian:
            r=[0]*10
            for i,j in op:
                q=[0]*10;q[i-1]=1;q[j-1]=-1
                if i in block:
                    for k0 in range(10):r[k0]+=2*dims10[j]*q[k0]
                if j in block:
                    for k0 in range(10):r[k0]+=2*dims10[i]*q[k0]
            out.append(cv(r))
        out.append(cv(grav));return out,rref_null(out,6)
    def wp(op,block):return sum((dims10[j] if i in block else 0)+(dims10[i] if j in block else 0) for i,j in op)%2
    hits=[]
    for lpair in fql:
      for rpair in fqr:
        op=base+list(lpair)+list(rpair);mu=[[0]*10 for _ in range(10)]
        for i,j in op:mu[i-1][j-1]+=1;mu[j-1][i-1]-=1
        det=det_bareiss(mu);rows10,ker=constraints(op)
        if len(ker)!=1:continue
        v=ker[0];phase={node:v[g] for g,group in enumerate(groups) for node in group}
        cub=sum(4*dims10[i]*dims10[j]*(phase[i]-phase[j])**3 for i,j in op)
        collision=[ij for ij in Counter(op) if Counter(op)[(ij[1],ij[0])]]
        rec=(lpair,rpair,det,primitive(v),cub,(wp(op,{1,8}),wp(op,{2,3,4,7}),wp(op,{9})),collision)
        if det and not cub and rec[5]==(0,0,0) and not collision and phase[9]==phase[2] and phase[10]==phase[5]:hits.append(rec)
        print('LR_DOUBLE_PAIRS_CASE',rec)
    print('LR_DOUBLE_PAIRS_HITS',len(hits))
    for x in hits:print('LR_DOUBLE_PAIRS_HIT',x)
    # Common-threshold nL=nR=2 running, including exact matched couplings.
    mz=91.1876;ae=1/127.955;sin2=0.23122;alpha_s=0.1179
    a={'Y':(1-sin2)/ae,'L':sin2/ae,'3':1/alpha_s};b0={'Y':41/6,'L':-19/6,'3':-7}
    k={'L':14,'R':14,'X':Fraction(16,3),'3':14};b={'L':Fraction(7,3),'R':Fraction(5,2),'X':Fraction(67,18),'3':Fraction(-5,3)}
    s0={q:-v/(2*math.pi) for q,v in b0.items()};s={q:-float(v)/(2*math.pi) for q,v in b.items()}
    M=np.array([[s0['L']/14-s0['3']/14,s['L']/14-s['3']/14,0],[-s0['L']/14,s['R']/14-s['L']/14,1/14],[s0['Y']/(16/3)-s0['L']/14,s['X']/(16/3)-s['L']/14,-1/(16/3)]])
    q=np.array([-(a['L']/14-a['3']/14),a['L']/14,a['L']/14-a['Y']/(16/3)])
    tR,d,ar=np.linalg.solve(M,q);tL=tR+d;ax=a['Y']+s0['Y']*tR-ar
    vals={'L':a['L']+s0['L']*tR+s['L']*d,'R':ar+s['R']*d,'X':ax+s['X']*d,'3':a['3']+s0['3']*tR+s['3']*d}
    print('LR_DOUBLE_PAIRS_RGE','TR',tR,'D',d,'TL',tL,'MR',mz*math.exp(tR),'ML',mz*math.exp(tL),
          'AR_MR',ar,'AX_MR',ax,'VALUES',vals,'RATIOS',{q:vals[q]/float(k[q]) for q in k})

if "--lr-one-two-search" in sys.argv:
    base=[(1,5),(1,5),(8,5),(5,2),(5,3),(5,4),
          (1,6),(8,6),(8,6),(6,4),(6,7),(6,7),(2,1),(7,8),(5,9),(9,10)]
    dims10={**dims,9:2,10:3};A={1,8};Bold={2,3,4,7};groups=(A,Bold,{5},{6},{9},{10});nonabelian=({5},{10},A,Bold,{9})
    loc={node:k for k,g in enumerate(groups) for node in g}
    def cv12(q):
        z=[0]*6
        for node,val in enumerate(q,1):z[loc[node]]+=val
        return z
    def cons12(op):
        inc=[0]*10;grav=[0]*10
        for i,j in op:
            inc[i-1]+=dims10[j];inc[j-1]+=dims10[i]
            q=[0]*10;q[i-1]=1;q[j-1]=-1;w=4*dims10[i]*dims10[j]
            for k0 in range(10):grav[k0]+=w*q[k0]
        out=[cv12(inc)]
        for block in nonabelian:
            r=[0]*10
            for i,j in op:
                q=[0]*10;q[i-1]=1;q[j-1]=-1
                if i in block:
                    for k0 in range(10):r[k0]+=2*dims10[j]*q[k0]
                if j in block:
                    for k0 in range(10):r[k0]+=2*dims10[i]*q[k0]
            out.append(cv12(r))
        out.append(cv12(grav));return rref_null(out,6)
    def wp12(op,block):return sum((dims10[j] if i in block else 0)+(dims10[i] if j in block else 0) for i,j in op)%2
    def pairs12(left,right):
        out=[]
        for l1 in left:
          for r1 in right:
           for r2 in right:
            for l2 in left:
             p=((l1,r1),(r2,l2))
             if p[0]!=(p[1][1],p[1][0]):out.append(p)
        return out
    fql=pairs12(A,{5,10});fqr=pairs12({5,10},Bold|{9})
    hits=[];tested=0
    for lpair in fql:
      for rpair in fqr:
        op=base+list(lpair)+list(rpair);cnt=Counter(op)
        if any(cnt[(j,i)] for i,j in cnt):continue
        if any(wp12(op,g) for g in (A,Bold,{9})):continue
        tested+=1;mu=[[0]*10 for _ in range(10)]
        for i,j in op:mu[i-1][j-1]+=1;mu[j-1][i-1]-=1
        det=det_bareiss(mu)
        if not det:continue
        ker=cons12(op)
        if len(ker)!=1:continue
        v=ker[0];ph={node:v[g] for g,group in enumerate(groups) for node in group}
        cub=sum(4*dims10[i]*dims10[j]*(ph[i]-ph[j])**3 for i,j in op)
        if cub or ph[9]!=ph[2] or ph[10]!=ph[5] or ph[5]==ph[2]:continue
        orbits=scalar_orbits(op);weak=sum(orbits.get(tuple(sorted((9,b))),0) for b in Bold);color=orbits.get((5,10),0)
        inc=[0]*11
        for i,j in op:inc[i]+=dims10[j];inc[j]+=dims10[i]
        ks=(Fraction(sum(inc[i] for i in A),2),Fraction(sum(inc[i] for i in Bold),2),Fraction(inc[9],2),Fraction(inc[5],2),Fraction(inc[10],2))
        hits.append((lpair,rpair,det,primitive(v),8*sum(dims10[i]*dims10[j] for i,j in op),weak,color,ks,orbits))
    strong=[x for x in hits if x[5] and x[6]]
    print('LR_ONE_TWO_SEARCH','FQL_PAIR_TYPES',len(fql),'FQR_PAIR_TYPES',len(fqr),'TESTED',tested,'HITS',len(hits),'STRONG',len(strong))
    print('LR_ONE_TWO_DISTRIBUTION','DETS',dict(sorted(Counter(abs(x[2]) for x in strong).items())),
          'WEIGHTS',dict(Counter(x[7] for x in strong)),'WEAK',dict(sorted(Counter(x[5] for x in strong).items())),
          'COLOR',dict(sorted(Counter(x[6] for x in strong).items())))
    for x in sorted(strong,key=lambda z:(abs(z[2]),-z[5]-z[6],z[0],z[1]))[:30]:print('LR_ONE_TWO_STRONG_HIT',x)

if "--lr-736-corridor" in sys.argv:
    import math
    mz=91.1876;ae=1/127.955;sin2=0.23122;alpha_s=0.1179
    a={'Y':(1-sin2)/ae,'L':sin2/ae,'3':1/alpha_s};b0={'Y':41/6,'L':-19/6,'3':-7}
    k={'L':11,'R':14,'X':5,'3':12}
    bc={'L':Fraction(1,3),'R':Fraction(5,2),'X':Fraction(7,2),'3':-3}
    bp={'L':Fraction(1,3),'R':-Fraction(25,6),'X':Fraction(7,2),'3':-13}
    s0={q:-float(v)/(2*math.pi) for q,v in b0.items()};sc={q:-float(v)/(2*math.pi) for q,v in bc.items()};sp={q:-float(v)/(2*math.pi) for q,v in bp.items()}
    def solve736(y):
        M=np.array([[s0['L']/11-s0['3']/12,sp['L']/11-sp['3']/12,0],
                    [-s0['L']/11,sp['R']/14-sp['L']/11,1/14],
                    [s0['Y']/5-s0['L']/11,sp['X']/5-sp['L']/11,-1/5]])
        rhs=np.array([-(a['L']/11-a['3']/12)-(sc['L']/11-sc['3']/12)*y,
                      a['L']/11+(sc['L']/11-sc['R']/14)*y,
                      a['L']/11-a['Y']/5+(sc['L']/11-sc['X']/5)*y])
        x,z,ar=np.linalg.solve(M,rhs);ax=a['Y']+s0['Y']*x-ar
        vals={'L':a['L']+s0['L']*x+sc['L']*y+sp['L']*z,
              'R':ar+sc['R']*y+sp['R']*z,'X':ax+sc['X']*y+sp['X']*z,
              '3':a['3']+s0['3']*x+sc['3']*y+sp['3']*z}
        c=vals['L']/11
        # Conservative individual color parents for the 8+4 and 10+2 splits.
        def acp(kcp):
            bcp=-11+Fraction(2,3)*kcp+Fraction(1,2)
            return float(kcp)*c+float(bcp)*z/(2*math.pi)
        return x,y,z,c,vals,acp(4),acp(2)
    r0=solve736(0);r1=solve736(1);ymax=-r0[2]/(r1[2]-r0[2])
    def root_for_log(target):
        # total log x+y+z is affine in y.
        t0=r0[0]+r0[2];t1=r1[0]+1+r1[2]
        return (target-t0)/(t1-t0)
    planck=1.22089e19;reduced=2.435e18
    yp=root_for_log(math.log(planck/mz));yr=root_for_log(math.log(reduced/mz))
    for y in (0,yr,yp,ymax/2,ymax):
        x,y,z,c,vals,a4,a2=solve736(y)
        print('LR_736_CORRIDOR','Y',y,'X',x,'Z',z,'TOTAL',x+y+z,
              'MR',mz*math.exp(x),'MK',mz*math.exp(x+y),'ML',mz*math.exp(x+y+z),
              'C',c,'ACP4',a4,'ACP2',a2,'PHYSICAL',x>=0 and y>=0 and z>=-1e-9 and min(vals.values())>0)
    print('LR_736_CORRIDOR_BOUNDS','YMAX',ymax,'Y_REDUCED_PLANCK',yr,'Y_PLANCK',yp,
          'REDUCED_SAMPLE',solve736(yr),'PLANCK_SAMPLE',solve736(yp))

if "--lr-double-pairs-search" in sys.argv:
    from itertools import combinations_with_replacement
    base=[(1,5),(1,5),(8,5),(5,2),(5,3),(5,4),
          (1,6),(8,6),(8,6),(6,4),(6,7),(6,7),(2,1),(7,8),(5,9),(9,10)]
    dims10={**dims,9:2,10:3};A={1,8};B={2,3,4,7,9};C={5,10}
    groups=(A,{2,3,4,7},{5},{6},{9},{10});nonabelian=({5},{10},A,{2,3,4,7},{9})
    loc={node:k for k,g in enumerate(groups) for node in g}
    def cv(q):
        z=[0]*6
        for node,val in enumerate(q,1):z[loc[node]]+=val
        return z
    def cons(op):
        inc=[0]*10;grav=[0]*10
        for i,j in op:
            inc[i-1]+=dims10[j];inc[j-1]+=dims10[i]
            q=[0]*10;q[i-1]=1;q[j-1]=-1;w=4*dims10[i]*dims10[j]
            for k0 in range(10):grav[k0]+=w*q[k0]
        out=[cv(inc)]
        for block in nonabelian:
            r=[0]*10
            for i,j in op:
                q=[0]*10;q[i-1]=1;q[j-1]=-1
                if i in block:
                    for k0 in range(10):r[k0]+=2*dims10[j]*q[k0]
                if j in block:
                    for k0 in range(10):r[k0]+=2*dims10[i]*q[k0]
            out.append(cv(r))
        out.append(cv(grav));return rref_null(out,6)
    def wp(op,block):return sum((dims10[j] if i in block else 0)+(dims10[i] if j in block else 0) for i,j in op)%2
    def pairs(left,right):
        out=[]
        for l1 in left:
          for r1 in right:
           for r2 in right:
            for l2 in left:
             p=((l1,r1),(r2,l2))
             if p[0]!=(p[1][1],p[1][0]):out.append(p)
        return out
    fql=pairs(A,C);fqr=pairs(C,B)
    hits=[];tested=0
    for lpairs in combinations_with_replacement(fql,2):
      for rpair in fqr:
        op=base+list(lpairs[0])+list(lpairs[1])+list(rpair);cnt=Counter(op)
        if any(cnt[(j,i)] for i,j in cnt):continue
        if any(wp(op,g) for g in (A,{2,3,4,7},{9})):continue
        tested+=1;mu=[[0]*10 for _ in range(10)]
        for i,j in op:mu[i-1][j-1]+=1;mu[j-1][i-1]-=1
        det=det_bareiss(mu)
        if not det:continue
        ker=cons(op)
        if len(ker)!=1:continue
        v=ker[0];ph={node:v[g] for g,group in enumerate(groups) for node in group}
        cub=sum(4*dims10[i]*dims10[j]*(ph[i]-ph[j])**3 for i,j in op)
        if cub or ph[9]!=ph[2] or ph[10]!=ph[5] or ph[5]==ph[2]:continue
        orbits=scalar_orbits(op)
        weak=sum(orbits.get(tuple(sorted((9,b))),0) for b in (2,3,4,7))
        color=orbits.get((5,10),0)
        hits.append((lpairs,rpair,det,primitive(v),8*sum(dims10[i]*dims10[j] for i,j in op),weak,color,orbits))
    print('LR_DOUBLE_PAIRS_SEARCH','FQL_PAIR_TYPES',len(fql),'FQR_PAIR_TYPES',len(fqr),'TESTED',tested,'HITS',len(hits))
    strong=[x for x in hits if x[5] and x[6]]
    weak_only=[x for x in hits if x[5] and not x[6]]
    color_only=[x for x in hits if x[6] and not x[5]]
    neither=[x for x in hits if not x[5] and not x[6]]
    print('LR_DOUBLE_PAIRS_ORBITS','BOTH',len(strong),'WEAK_ONLY',len(weak_only),'COLOR_ONLY',len(color_only),'NEITHER',len(neither))
    weak_support=Counter(b for x in strong for b in (2,3,4,7) if x[7].get(tuple(sorted((9,b))),0))
    print('LR_DOUBLE_PAIRS_ORBIT_DISTRIBUTION','WEAK_SUPPORT',dict(sorted(weak_support.items())),
          'WEAK_MULTIPLICITY',dict(sorted(Counter(x[5] for x in strong).items())),
          'COLOR_MULTIPLICITY',dict(sorted(Counter(x[6] for x in strong).items())),
          'DETERMINANT_ABS',dict(sorted(Counter(abs(x[2]) for x in strong).items())))
    # Parent trace-weight splits and a conservative individual-coupling test at
    # the complex-locking, MK=MR endpoint.  Set the inherited R scalar allocation
    # to zero for each tested parent; mandatory locking contributions remain.
    c_uv=3.265422296315674;z_product=0.5893132800270806
    split_records=[]
    for x in strong:
      op=base+list(x[0][0])+list(x[0][1])+list(x[1]);inc=[0]*11
      for i,j in op:inc[i]+=dims10[j];inc[j]+=dims10[i]
      ks=(Fraction(sum(inc[i] for i in (2,3,4,7)),2),Fraction(inc[9],2),Fraction(inc[5],2),Fraction(inc[10],2))
      bs=(-Fraction(22,3)+Fraction(2,3)*ks[0]+Fraction(1,3),
          -Fraction(22,3)+Fraction(2,3)*ks[1]+Fraction(1,3),
          -11+Fraction(2,3)*ks[2]+Fraction(1,2),
          -11+Fraction(2,3)*ks[3]+Fraction(1,2))
      amr=tuple(float(k)*c_uv+float(b)*z_product/(2*np.pi) for k,b in zip(ks,bs))
      split_records.append((ks,bs,amr,min(amr)))
    print('LR_DOUBLE_PAIRS_PARENT_SPLITS','DISTINCT',len(set(x[0] for x in split_records)),
          'HISTOGRAM',dict(sorted(Counter(x[0] for x in split_records).items(),key=lambda z:tuple(float(q) for q in z[0]))),
          'MIN_PARENT_AMR',min(x[3] for x in split_records),
          'ARGMIN',min(split_records,key=lambda x:x[3]),'NONPOSITIVE',sum(x[3]<=0 for x in split_records))
    for x in sorted(strong,key=lambda z:(abs(z[2]),-z[5]-z[6],z[0],z[1]))[:50]:print('LR_DOUBLE_PAIRS_STRONG_HIT',x)
    if not strong:
      for x in sorted(hits,key=lambda z:(-bool(z[5])-bool(z[6]),-z[5]-z[6],abs(z[2]),z[0],z[1]))[:20]:print('LR_DOUBLE_PAIRS_BEST_ORBIT_HIT',x)

if "--lr-double-pairs-locking" in sys.argv:
    import math
    mz=91.1876;ae=1/127.955;sin2=0.23122;alpha_s=0.1179
    a={'Y':(1-sin2)/ae,'L':sin2/ae,'3':1/alpha_s};b0={'Y':41/6,'L':-19/6,'3':-7}
    k={'L':14,'R':14,'X':Fraction(16,3),'3':14};base={'L':Fraction(7,3),'R':Fraction(5,2),'X':Fraction(67,18),'3':Fraction(-5,3)}
    s0={q:-v/(2*math.pi) for q,v in b0.items()}
    cases=[('NONE',Fraction(0),Fraction(0)),
           ('REAL_COUNTING',Fraction(1,3),Fraction(1,2)),
           ('MIXED',Fraction(1,3),Fraction(1)),
           ('COMPLEX_COUNTING',Fraction(2,3),Fraction(1))]
    for label,dbR,db3 in cases:
        b={**base,'R':base['R']+dbR,'3':base['3']+db3};s={q:-float(v)/(2*math.pi) for q,v in b.items()}
        M=np.array([[s0['L']/14-s0['3']/14,s['L']/14-s['3']/14,0],[-s0['L']/14,s['R']/14-s['L']/14,1/14],[s0['Y']/(16/3)-s0['L']/14,s['X']/(16/3)-s['L']/14,-1/(16/3)]])
        q=np.array([-(a['L']/14-a['3']/14),a['L']/14,a['L']/14-a['Y']/(16/3)])
        tR,d,ar=np.linalg.solve(M,q);tL=tR+d;ax=a['Y']+s0['Y']*tR-ar
        vals={'L':a['L']+s0['L']*tR+s['L']*d,'R':ar+s['R']*d,'X':ax+s['X']*d,'3':a['3']+s0['3']*tR+s['3']*d}
        print('LR_DOUBLE_PAIRS_LOCKING',label,'DBR',dbR,'DB3',db3,'B',{q:str(v) for q,v in b.items()},
              'TR',tR,'D',d,'TL',tL,'MR',mz*math.exp(tR),'ML',mz*math.exp(tL),
              'AR_MR',ar,'AX_MR',ax,'VALUES',vals,'PHYSICAL',0<=tR<=tL<=50 and min(vals.values())>0)
    # Continuous robustness rectangle for 0<=Delta bR<=1 and 0<=Delta b3<=1.5.
    valid=[]
    for dbR in np.linspace(0,1,101):
      for db3 in np.linspace(0,1.5,151):
        b={**base,'R':float(base['R'])+dbR,'3':float(base['3'])+db3};s={q:-float(v)/(2*math.pi) for q,v in b.items()}
        M=np.array([[s0['L']/14-s0['3']/14,s['L']/14-s['3']/14,0],[-s0['L']/14,s['R']/14-s['L']/14,1/14],[s0['Y']/(16/3)-s0['L']/14,s['X']/(16/3)-s['L']/14,-1/(16/3)]])
        tR,d,ar=np.linalg.solve(M,q);tL=tR+d;ax=a['Y']+s0['Y']*tR-ar
        vals=[a['L']+s0['L']*tR+s['L']*d,ar+s['R']*d,ax+s['X']*d,a['3']+s0['3']*tR+s['3']*d]
        if 0<=tR<=tL<=50 and min(vals)>0:valid.append((dbR,db3,tR,d,tL))
    print('LR_DOUBLE_PAIRS_LOCKING_GRID','VALID',len(valid),'TOTAL',101*151,
          'MAX_DBR',max((x[0] for x in valid),default=None),'MAX_DB3',max((x[1] for x in valid),default=None),
          'MIN_D',min((x[3] for x in valid),default=None))

if "--lr-product-matching" in sys.argv:
    # Above MR the strong representative has separate B,B' and C,C' gauge bosons.
    # Spectral weights from half-incidences are kB=11,kB'=3,kC=8,kC'=6.
    # At the locking threshold A_R=A_B+A_B' and A_3=A_C+A_C'.  Hence the
    # scale equations depend on sums of parent beta coefficients, including
    # a second nonabelian gauge-boson contribution absent in collapsed running.
    import math
    mz=91.1876;ae=1/127.955;sin2=0.23122;alpha_s=0.1179
    a={'Y':(1-sin2)/ae,'L':sin2/ae,'3':1/alpha_s};b0={'Y':41/6,'L':-19/6,'3':-7}
    k={'L':14,'Rsum':14,'X':Fraction(16,3),'3sum':14}
    # Fermions give (2/3)k.  The pre-locking R scalar total 1/2 is inherited
    # from the collapsed spectrum; its allocation between B and B' is irrelevant
    # to the summed equations.  Locking bifundamentals contribute to both parents.
    cases=[('NO_LOCKING',Fraction(0),Fraction(0)),
           ('REAL_LOCKING',Fraction(1,3),Fraction(1,2)),
           ('COMPLEX_LOCKING',Fraction(2,3),Fraction(1))]
    s0={q:-v/(2*math.pi) for q,v in b0.items()}
    for label,dbR,db3 in cases:
        b={'L':Fraction(7,3),'Rsum':-Fraction(16,3)+Fraction(1,2)+dbR,
           'X':Fraction(67,18),'3sum':-Fraction(38,3)+db3}
        s={q:-float(v)/(2*math.pi) for q,v in b.items()}
        M=np.array([[s0['L']/14-s0['3']/14,s['L']/14-s['3sum']/14,0],
                    [-s0['L']/14,s['Rsum']/14-s['L']/14,1/14],
                    [s0['Y']/(16/3)-s0['L']/14,s['X']/(16/3)-s['L']/14,-1/(16/3)]])
        q=np.array([-(a['L']/14-a['3']/14),a['L']/14,a['L']/14-a['Y']/(16/3)])
        tR,d,ar=np.linalg.solve(M,q);tL=tR+d;ax=a['Y']+s0['Y']*tR-ar
        vals={'L':a['L']+s0['L']*tR+s['L']*d,'Rsum':ar+s['Rsum']*d,
              'X':ax+s['X']*d,'3sum':a['3']+s0['3']*tR+s['3sum']*d}
        c=vals['L']/14
        # Individual UV values follow from the spectral boundary. Run them down
        # using fermion-only parent betas plus an illustrative even split of the
        # inherited R scalars. Locking contributions are fixed per parent.
        lockR=dbR/2;lock3=db3/2
        parent_b={'B':-Fraction(22,3)+Fraction(22,3)+Fraction(1,4)+lockR,
                  'Bp':-Fraction(22,3)+Fraction(2,1)+Fraction(1,4)+lockR,
                  'C':-11+Fraction(16,3)+lock3,
                  'Cp':-11+Fraction(4,1)+lock3}
        parent_k={'B':11,'Bp':3,'C':8,'Cp':6}
        parent_MR={g:float(parent_k[g])*c+float(parent_b[g])/(2*math.pi)*d for g in parent_k}
        print('LR_PRODUCT_MATCHING',label,'K',k,'B',{z:str(v) for z,v in b.items()},
              'TR',tR,'D',d,'TL',tL,'MR',mz*math.exp(tR),'ML',mz*math.exp(tL),
              'VALUES',vals,'C',c,'PARENT_B',{z:str(v) for z,v in parent_b.items()},
              'PARENT_MR',parent_MR,'MATCH_R',parent_MR['B']+parent_MR['Bp'],
              'MATCH_3',parent_MR['C']+parent_MR['Cp'],
              'PHYSICAL',0<=tR<=tL<=50 and min(vals.values())>0 and min(parent_MR.values())>0)

if "--lr-three-threshold" in sys.argv:
    # MZ < MR < MK < MLambda.  The ordinary diagonal LR theory runs over
    # y=log(MK/MR), and the cloned product theory over z=log(MLambda/MK).
    # Use complex locking bifundamentals in the product interval.
    import math
    mz=91.1876;ae=1/127.955;sin2=0.23122;alpha_s=0.1179
    a={'Y':(1-sin2)/ae,'L':sin2/ae,'3':1/alpha_s};b0={'Y':41/6,'L':-19/6,'3':-7}
    k={'L':14,'R':14,'X':Fraction(16,3),'3':14}
    bc={'L':Fraction(7,3),'R':Fraction(5,2),'X':Fraction(67,18),'3':Fraction(-5,3)}
    bp={'L':Fraction(7,3),'R':-Fraction(25,6),'X':Fraction(67,18),'3':-Fraction(35,3)}
    s0={q:-float(v)/(2*math.pi) for q,v in b0.items()};sc={q:-float(v)/(2*math.pi) for q,v in bc.items()};sp={q:-float(v)/(2*math.pi) for q,v in bp.items()}
    def solve_y(y):
        # Unknowns x=log(MR/MZ), z=log(ML/MK), and A_R(MR).
        M=np.array([[s0['L']/14-s0['3']/14,sp['L']/14-sp['3']/14,0],
                    [-s0['L']/14,sp['R']/14-sp['L']/14,1/14],
                    [s0['Y']/(16/3)-s0['L']/14,sp['X']/(16/3)-sp['L']/14,-1/(16/3)]])
        rhs=np.array([-(a['L']/14-a['3']/14)-(sc['L']/14-sc['3']/14)*y,
                      a['L']/14+(sc['L']/14-sc['R']/14)*y,
                      a['L']/14-a['Y']/(16/3)+(sc['L']/14-sc['X']/(16/3))*y])
        x,z,ar=np.linalg.solve(M,rhs);ax=a['Y']+s0['Y']*x-ar
        vals={'L':a['L']+s0['L']*x+sc['L']*y+sp['L']*z,
              'R':ar+sc['R']*y+sp['R']*z,
              'X':ax+sc['X']*y+sp['X']*z,
              '3':a['3']+s0['3']*x+sc['3']*y+sp['3']*z}
        return x,y,z,ar,ax,vals
    # Because the system is affine in y, the z=0 endpoint is obtained from two samples.
    r0=solve_y(0);r1=solve_y(1);ymax=-r0[2]/(r1[2]-r0[2])
    samples=[0,ymax/4,ymax/2,3*ymax/4,ymax]
    for y in samples:
        x,y,z,ar,ax,vals=solve_y(y);mk=mz*math.exp(x+y);ml=mk*math.exp(z)
        print('LR_THREE_THRESHOLD','Y',y,'X',x,'Z',z,'TOTAL_HIGH',y+z,
              'MR',mz*math.exp(x),'MK',mk,'ML',ml,'AR',ar,'AX',ax,
              'VALUES',vals,'PHYSICAL',0<=x and 0<=y and z>=-1e-10 and x+y+z<=50 and min(vals.values())>0)
    good=[]
    for y in np.linspace(0,ymax,1001):
        x,y,z,ar,ax,vals=solve_y(y)
        if x>=0 and z>=-1e-10 and x+y+z<=50 and min(vals.values())>0:good.append((x,y,z,ar,ax,min(vals.values())))
    print('LR_THREE_THRESHOLD_GRID','YMAX',ymax,'VALID',len(good),'TOTAL',1001,
          'X_RANGE',(min(x[0] for x in good),max(x[0] for x in good)),
          'Z_RANGE',(min(x[2] for x in good),max(x[2] for x in good)),
          'TOTAL_HIGH_RANGE',(min(x[1]+x[2] for x in good),max(x[1]+x[2] for x in good)))

if "--lr-fql-threshold" in sys.argv:
    import math
    mz=91.1876;ae=1/127.955;sin2=0.23122;alpha_s=0.1179
    a={'Y':(1-sin2)/ae,'L':sin2/ae,'3':1/alpha_s}
    bsm={'Y':41/6,'L':-19/6,'3':-7}
    # Interval 1 has only the fQR repair; interval 2 also has its anomaly-completing fQL.
    b1={'L':Fraction(-5,3),'R':Fraction(1,2),'X':Fraction(55,18),'3':Fraction(-17,3)}
    b2={'L':Fraction(1,3),'R':Fraction(1,2),'X':Fraction(59,18),'3':Fraction(-13,3)}
    k={'L':11,'R':11,'X':Fraction(14,3),'3':10}
    s0={q:-float(v)/(2*math.pi) for q,v in bsm.items()}
    s1={q:-float(v)/(2*math.pi) for q,v in b1.items()}
    s2={q:-float(v)/(2*math.pi) for q,v in b2.items()}
    # Unknowns are tR, d1=log(MQL/MR), AR(MR); d2=log(ML/MQL) is the parameter.
    M=np.array([
      [s0['L']/float(k['L'])-s0['3']/float(k['3']),s1['L']/float(k['L'])-s1['3']/float(k['3']),0],
      [-s0['L']/float(k['L']),s1['R']/float(k['R'])-s1['L']/float(k['L']),1/float(k['R'])],
      [s0['Y']/float(k['X'])-s0['L']/float(k['L']),s1['X']/float(k['X'])-s1['L']/float(k['L']),-1/float(k['X'])]
    ])
    c=np.array([-(a['L']/float(k['L'])-a['3']/float(k['3'])),
                a['L']/float(k['L']),a['L']/float(k['L'])-a['Y']/float(k['X'])])
    v2=np.array([-(s2['L']/float(k['L'])-s2['3']/float(k['3'])),
                 -(s2['R']/float(k['R'])-s2['L']/float(k['L'])),
                 -(s2['X']/float(k['X'])-s2['L']/float(k['L']))])
    x0=np.linalg.solve(M,c);x1=np.linalg.solve(M,v2)
    print('LR_FQL_THRESHOLD_AFFINE','AT_D2_0',x0,'SLOPE',x1)
    valid=[]
    for d2 in np.linspace(0,50,10001):
        tR,d1,ar=x0+x1*d2;tL=tR+d1+d2;ax=a['Y']+s0['Y']*tR-ar
        vals={'L':a['L']+s0['L']*tR+s1['L']*d1+s2['L']*d2,
              'R':ar+s1['R']*d1+s2['R']*d2,
              'X':ax+s1['X']*d1+s2['X']*d2,
              '3':a['3']+s0['3']*tR+s1['3']*d1+s2['3']*d2}
        if tR>=0 and d1>=0 and d2>=0 and tL<=50 and ar>0 and ax>0 and all(z>0 for z in vals.values()):
            valid.append((d2,tR,d1,tL,ar,ax,vals))
    print('LR_FQL_THRESHOLD_VALID_SAMPLES',len(valid))
    for z in ([valid[0],valid[len(valid)//2],valid[-1]] if valid else []):
        d2,tR,d1,tL,ar,ax,vals=z
        print('LR_FQL_THRESHOLD_POINT','D2',d2,'TR',tR,'D1',d1,'TL',tL,
              'MR',mz*math.exp(tR),'MQL',mz*math.exp(tR+d1),'ML',mz*math.exp(tL),
              'AR_MR',ar,'AX_MR',ax,'VALUES',vals)

if "--lr-fql-low-threshold" in sys.argv:
    import math
    mz=91.1876;ae=1/127.955;sin2=0.23122;alpha_s=0.1179
    a={'Y':(1-sin2)/ae,'L':sin2/ae,'3':1/alpha_s}
    b0={'Y':Fraction(41,6),'L':Fraction(-19,6),'3':Fraction(-7)}
    bq={'Y':b0['Y']+Fraction(2,9),'L':b0['L']+2,'3':b0['3']+Fraction(4,3)}
    b2={'L':Fraction(1,3),'R':Fraction(1,2),'X':Fraction(59,18),'3':Fraction(-13,3)}
    k={'L':11,'R':11,'X':Fraction(14,3),'3':10}
    s0={q:-float(v)/(2*math.pi) for q,v in b0.items()}
    sq={q:-float(v)/(2*math.pi) for q,v in bq.items()}
    s2={q:-float(v)/(2*math.pi) for q,v in b2.items()}
    # Unknowns tQ=log(MQL/MZ), dR=log(MR/MQL), AR(MR); dL=log(ML/MR) parameter.
    M=np.array([
      [s0['L']/float(k['L'])-s0['3']/float(k['3']),sq['L']/float(k['L'])-sq['3']/float(k['3']),0],
      [-s0['L']/float(k['L']),-sq['L']/float(k['L']),1/float(k['R'])],
      [s0['Y']/float(k['X'])-s0['L']/float(k['L']),sq['Y']/float(k['X'])-sq['L']/float(k['L']),-1/float(k['X'])]
    ])
    c=np.array([-(a['L']/float(k['L'])-a['3']/float(k['3'])),
                a['L']/float(k['L']),a['L']/float(k['L'])-a['Y']/float(k['X'])])
    vl=np.array([-(s2['L']/float(k['L'])-s2['3']/float(k['3'])),
                 -(s2['R']/float(k['R'])-s2['L']/float(k['L'])),
                 -(s2['X']/float(k['X'])-s2['L']/float(k['L']))])
    x0=np.linalg.solve(M,c);x1=np.linalg.solve(M,vl)
    print('LR_FQL_LOW_AFFINE','AT_DL_0',x0,'SLOPE',x1)
    valid=[]
    for dL in np.linspace(0,50,10001):
        tQ,dR,ar=x0+x1*dL;tR=tQ+dR;tTot=tR+dL
        ay=a['Y']+s0['Y']*tQ+sq['Y']*dR;ax=ay-ar
        vals={'L':a['L']+s0['L']*tQ+sq['L']*dR+s2['L']*dL,
              'R':ar+s2['R']*dL,'X':ax+s2['X']*dL,
              '3':a['3']+s0['3']*tQ+sq['3']*dR+s2['3']*dL}
        if tQ>=0 and dR>=0 and dL>=0 and tTot<=50 and ar>0 and ax>0 and all(z>0 for z in vals.values()):
            valid.append((dL,tQ,dR,tR,tTot,ar,ax,vals))
    print('LR_FQL_LOW_VALID_SAMPLES',len(valid))
    for z in ([valid[0],valid[len(valid)//2],valid[-1]] if valid else []):
        dL,tQ,dR,tR,tTot,ar,ax,vals=z
        print('LR_FQL_LOW_POINT','DL',dL,'TQ',tQ,'DR',dR,'TR',tR,'TTOT',tTot,
              'MQL',mz*math.exp(tQ),'MR',mz*math.exp(tR),'ML',mz*math.exp(tTot),
              'AR_MR',ar,'AX_MR',ax,'VALUES',vals)
if "--deletions11" in sys.argv:
    op=[(3,5),(4,8),(3,1),(8,7),(2,1),(6,4),(7,1),(1,4),(5,8),(8,6),(8,3)]
    def brief(op):
        oc=scalar_orbits(op);be={e for e in oc if set(e)<={2,3,4,7}}
        rr=rows(op);bas=rref_null(rr,4)
        mu=[[0]*8 for _ in range(8)]
        for i,j in op:mu[i-1][j-1]+=1;mu[j-1][i-1]-=1
        return [oc.get((1,8),0)>=3,connected(be,{2,3,4,7}) and sum(oc[e] for e in be)>=5,any(tuple(sorted((6,b))) in oc for b in (2,3,4,7)),len(bas)==1,bool(det_bareiss(mu))]
    for k,e in enumerate(op):print('DELETE11',e,brief(op[:k]+op[k+1:]))

if "--mutations" in sys.argv:
    target=[(3,7),(8,2),(3,5),(4,8),(3,1),(8,7),(2,1),(6,4),(7,1),(1,4),(5,8),(8,6)]
    universe=[(i,j) for i in range(1,9) for j in range(1,9) if i!=j]
    def gates2(op):
        if len({tuple(sorted(e)) for e in op}) != len(op): return False
        oc=scalar_orbits(op);be={e for e in oc if set(e)<={2,3,4,7}}
        if oc.get((1,8),0)<3:return False
        if not connected(be,{2,3,4,7}) or sum(oc[e] for e in be)<5:return False
        if not any(tuple(sorted((6,b))) in oc for b in (2,3,4,7)):return False
        if sum(dims[j] if i==5 else -dims[i] if j==5 else 0 for i,j in op)!=0:return False
        rr=rows(op);bas=rref_null(rr,4)
        if len(bas)!=1:return False
        v=bas[0]
        if v[0]!=v[1] or v[0]==v[2] or v[0]==v[3] or cubic(op,v):return False
        mu=[[0]*8 for _ in range(8)]
        for i,j in op:mu[i-1][j-1]+=1;mu[j-1][i-1]-=1
        if not det_bareiss(mu) or not chiral(op,v):return False
        return True
    for radius in (1,2):
        hits=[];tested=0
        for drops in combinations(range(len(target)),radius):
            kept=[e for k,e in enumerate(target) if k not in drops]
            used={tuple(sorted(e)) for e in kept}
            choices=[e for e in universe if tuple(sorted(e)) not in used]
            for adds in combinations(choices,radius):
                if len({tuple(sorted(e)) for e in adds})<radius:continue
                tested+=1;op=kept+list(adds)
                if gates2(op):
                    hd=8*sum(dims[i]*dims[j] for i,j in op)
                    hits.append((hd,drops,adds,op))
        uniq={tuple(sorted(x[3])):x for x in hits}
        vals=sorted(uniq.values())
        print('MUTATION_RADIUS',radius,'TESTED',tested,'HITS',len(vals))
        for x in vals[:20]:print('MUTATION_HIT',x)

if "--shrink" in sys.argv:
    target=[(3,7),(8,2),(3,5),(4,8),(3,1),(8,7),(2,1),(6,4),(7,1),(1,4),(5,8),(8,6)]
    universe=[(i,j) for i in range(1,9) for j in range(1,9) if i!=j]
    def gates3(op):
        if len({tuple(sorted(e)) for e in op}) != len(op): return False
        oc=scalar_orbits(op);be={e for e in oc if set(e)<={2,3,4,7}}
        if oc.get((1,8),0)<3:return False
        if not connected(be,{2,3,4,7}) or sum(oc[e] for e in be)<5:return False
        if not any(tuple(sorted((6,b))) in oc for b in (2,3,4,7)):return False
        if sum(dims[j] if i==5 else -dims[i] if j==5 else 0 for i,j in op)!=0:return False
        rr=rows(op);bas=rref_null(rr,4)
        if len(bas)!=1:return False
        v=bas[0]
        if v[0]!=v[1] or v[0]==v[2] or v[0]==v[3] or cubic(op,v):return False
        mu=[[0]*8 for _ in range(8)]
        for i,j in op:mu[i-1][j-1]+=1;mu[j-1][i-1]-=1
        return bool(det_bareiss(mu) and chiral(op,v))
    for drops_n,adds_n in ((2,1),(3,2)):
        hits=[];tested=0
        for drops in combinations(range(len(target)),drops_n):
            kept=[e for k,e in enumerate(target) if k not in drops]
            used={tuple(sorted(e)) for e in kept}
            choices=[e for e in universe if tuple(sorted(e)) not in used]
            for adds in combinations(choices,adds_n):
                if len({tuple(sorted(e)) for e in adds})<adds_n:continue
                tested+=1;op=kept+list(adds)
                if gates3(op):hits.append((8*sum(dims[i]*dims[j] for i,j in op),drops,adds,op))
        uniq={tuple(sorted(x[3])):x for x in hits}
        print('SHRINK',drops_n,adds_n,'TESTED',tested,'HITS',len(uniq))
        for x in sorted(uniq.values())[:20]:print('SHRINK_HIT',x)

if "--shrink10" in sys.argv:
    target=[(3,5),(4,8),(3,1),(8,7),(2,1),(6,4),(7,1),(1,4),(5,8),(8,6),(8,3)]
    universe=[(i,j) for i in range(1,9) for j in range(1,9) if i!=j]
    def gates4(op):
        if len({tuple(sorted(e)) for e in op}) != len(op): return False
        oc=scalar_orbits(op);be={e for e in oc if set(e)<={2,3,4,7}}
        if oc.get((1,8),0)<3:return False
        if not connected(be,{2,3,4,7}) or sum(oc[e] for e in be)<5:return False
        if not any(tuple(sorted((6,b))) in oc for b in (2,3,4,7)):return False
        if sum(dims[j] if i==5 else -dims[i] if j==5 else 0 for i,j in op)!=0:return False
        rr=rows(op);bas=rref_null(rr,4)
        if len(bas)!=1:return False
        v=bas[0]
        if v[0]!=v[1] or v[0]==v[2] or v[0]==v[3] or cubic(op,v):return False
        mu=[[0]*8 for _ in range(8)]
        for i,j in op:mu[i-1][j-1]+=1;mu[j-1][i-1]-=1
        return bool(det_bareiss(mu) and chiral(op,v))
    for drops_n,adds_n in ((2,1),(3,2)):
        hits=[];tested=0
        for drops in combinations(range(len(target)),drops_n):
            kept=[e for k,e in enumerate(target) if k not in drops]
            used={tuple(sorted(e)) for e in kept}
            choices=[e for e in universe if tuple(sorted(e)) not in used]
            for adds in combinations(choices,adds_n):
                if len({tuple(sorted(e)) for e in adds})<adds_n:continue
                tested+=1;op=kept+list(adds)
                if gates4(op):hits.append((8*sum(dims[i]*dims[j] for i,j in op),drops,adds,op))
        uniq={tuple(sorted(x[3])):x for x in hits}
        print('SHRINK10',drops_n,adds_n,'TESTED',tested,'HITS',len(uniq))
        for x in sorted(uniq.values())[:20]:print('SHRINK10_HIT',x)

if "--color-extend" in sys.argv:
    target=[(3,5),(4,8),(3,1),(8,7),(2,1),(6,4),(7,1),(1,4),(5,8),(8,6),(8,3)]
    universe=[(i,j) for i in range(1,9) for j in range(1,9) if i!=j]
    A={1,8};B={2,3,4,7}
    def color_ab(op):
        around=[]
        for k,(i,j) in enumerate(op):
            if i==5:around.append((k,j,-1))
            elif j==5:around.append((k,i,1))
        out=[]
        for (ki,a,sa),(kj,b,sb) in combinations(around,2):
            if sa==sb:continue
            if (a in A and b in B) or (a in B and b in A):
                out.append((tuple(sorted((a,b))),ki,kj))
        return out
    def color_cycle_rank(op):
        around=[]
        for k,(i,j) in enumerate(op):
            if i==5:around.append((k,j,-1))
            elif j==5:around.append((k,i,1))
        edges=[]
        for (ki,a,sa),(kj,b,sb) in combinations(around,2):
            if sa!=sb:edges.append((ki,kj))
        if not around:return 0,len(around),len(edges)
        verts={k for k,_,_ in around};seen=set();components=0
        for root in verts:
            if root in seen:continue
            components+=1;stack=[root];seen.add(root)
            while stack:
                x=stack.pop()
                for a,b in edges:
                    y=b if a==x else a if b==x else None
                    if y is not None and y not in seen:seen.add(y);stack.append(y)
        return len(edges)-len(verts)+components,len(verts),len(edges)
    def gates5(op):
        if len({tuple(sorted(e)) for e in op}) != len(op):return False
        oc=scalar_orbits(op);be={e for e in oc if set(e)<={2,3,4,7}}
        if oc.get((1,8),0)<3:return False
        if not connected(be,{2,3,4,7}) or sum(oc[e] for e in be)<5:return False
        if not any(tuple(sorted((6,b))) in oc for b in B):return False
        if sum(dims[j] if i==5 else -dims[i] if j==5 else 0 for i,j in op)!=0:return False
        rr=rows(op);bas=rref_null(rr,4)
        if len(bas)!=1:return False
        v=bas[0]
        if v[0]!=v[1] or v[0]==v[2] or v[0]==v[3] or cubic(op,v):return False
        mu=[[0]*8 for _ in range(8)]
        for i,j in op:mu[i-1][j-1]+=1;mu[j-1][i-1]-=1
        return bool(det_bareiss(mu) and chiral(op,v))
    # Exhaust all pure additions through four sectors, then bounded replacements.
    used={tuple(sorted(e)) for e in target}
    choices=[e for e in universe if tuple(sorted(e)) not in used]
    for adds_n in range(1,5):
        hits=[];tested=0
        for adds in combinations(choices,adds_n):
            if len({tuple(sorted(e)) for e in adds})<adds_n:continue
            tested+=1;op=target+list(adds)
            cab=color_ab(op)
            if len(cab)>=3 and gates5(op):
                hits.append((8*sum(dims[i]*dims[j] for i,j in op),adds,cab,op,primitive(expand(rref_null(rows(op),4)[0]))))
        print('COLOR_ADD',adds_n,'TESTED',tested,'HITS',len(hits))
        for x in sorted(hits)[:20]:print('COLOR_ADD_HIT',x)
        strong=[x for x in hits if color_cycle_rank(x[3])[0]>=2]
        print('COLOR_ADD_STRONG',adds_n,'HITS',len(strong))
        for x in sorted(strong)[:20]:print('COLOR_ADD_STRONG_HIT',color_cycle_rank(x[3]),x)
    for drops_n,adds_n in ((1,2),(2,3)):
        hits=[];tested=0
        for drops in combinations(range(len(target)),drops_n):
            kept=[e for k,e in enumerate(target) if k not in drops]
            used={tuple(sorted(e)) for e in kept}
            choices=[e for e in universe if tuple(sorted(e)) not in used]
            for adds in combinations(choices,adds_n):
                if len({tuple(sorted(e)) for e in adds})<adds_n:continue
                tested+=1;op=kept+list(adds);cab=color_ab(op)
                if len(cab)>=3 and gates5(op):
                    hits.append((8*sum(dims[i]*dims[j] for i,j in op),drops,adds,cab,op,primitive(expand(rref_null(rows(op),4)[0]))))
        uniq={tuple(sorted(x[4])):x for x in hits}
        print('COLOR_REPLACE',drops_n,adds_n,'TESTED',tested,'HITS',len(uniq))
        for x in sorted(uniq.values())[:20]:print('COLOR_REPLACE_HIT',x)

if "--k33-random" in sys.argv:
    rng=random.Random(3211501)
    color_endpoints=[1,2,3,4,7,8]
    noncolor=[(i,j) for i in range(1,9) for j in range(i+1,9) if i!=5 and j!=5]
    def gates6(op):
        oc=scalar_orbits(op);be={e for e in oc if set(e)<={2,3,4,7}}
        if oc.get((1,8),0)<3:return False
        if not connected(be,{2,3,4,7}) or sum(oc[e] for e in be)<5:return False
        if not any(tuple(sorted((6,b))) in oc for b in (2,3,4,7)):return False
        rr=rows(op);bas=rref_null(rr,4)
        if len(bas)!=1:return False
        v=bas[0]
        if v[0]!=v[1] or v[0]==v[2] or v[0]==v[3] or cubic(op,v):return False
        mu=[[0]*8 for _ in range(8)]
        for i,j in op:mu[i-1][j-1]+=1;mu[j-1][i-1]-=1
        return bool(det_bareiss(mu) and chiral(op,v))
    for edgecount in range(11,16):
        hits={};trials=500000
        for trial in range(trials):
            toward=set(rng.sample(color_endpoints,3))
            color=[(a,5) if a in toward else (5,a) for a in color_endpoints]
            chosen=rng.sample(noncolor,edgecount-6);mask=rng.randrange(1<<len(chosen))
            rest=[(j,i) if (mask>>k)&1 else (i,j) for k,(i,j) in enumerate(chosen)]
            op=color+rest
            if gates6(op):
                key=tuple(sorted(op));hd=8*sum(dims[i]*dims[j] for i,j in op)
                hits[key]=(hd,trial,sorted(toward),op,primitive(expand(rref_null(rows(op),4)[0])),det_bareiss([[sum(1 if (i,j)==e else -1 if (j,i)==e else 0 for e in op) for j in range(1,9)] for i in range(1,9)]))
        vals=sorted(hits.values())
        print('K33_RANDOM',edgecount,'TRIALS',trials,'UNIQUE_HITS',len(vals))
        for x in vals[:10]:print('K33_RANDOM_HIT',x)

if "--k33-witten" in sys.argv:
    rng=random.Random(3231701)
    color_endpoints=[1,2,3,4,7,8];A={1,8};B={2,3,4,7}
    noncolor=[(i,j) for i in range(1,9) for j in range(i+1,9) if i!=5 and j!=5]
    def witten(op,block):
        return sum((dims[j] if i in block else 0)+(dims[i] if j in block else 0) for i,j in op)%2
    def gates7(op):
        oc=scalar_orbits(op);be={e for e in oc if set(e)<=B}
        if oc.get((1,8),0)<3:return False
        if not connected(be,B) or sum(oc[e] for e in be)<5:return False
        if not any(tuple(sorted((6,b))) in oc for b in B):return False
        if witten(op,A) or witten(op,B):return False
        rr=rows(op);bas=rref_null(rr,4)
        if len(bas)!=1:return False
        v=bas[0]
        if v[0]!=v[1] or v[0]==v[2] or v[0]==v[3] or cubic(op,v):return False
        mu=[[0]*8 for _ in range(8)]
        for i,j in op:mu[i-1][j-1]+=1;mu[j-1][i-1]-=1
        return bool(det_bareiss(mu) and chiral(op,v))
    for edgecount in range(15,19):
        hits={};trials=500000
        for trial in range(trials):
            toward=set(rng.sample(color_endpoints,3))
            color=[(a,5) if a in toward else (5,a) for a in color_endpoints]
            chosen=rng.sample(noncolor,edgecount-6);mask=rng.randrange(1<<len(chosen))
            rest=[(j,i) if (mask>>k)&1 else (i,j) for k,(i,j) in enumerate(chosen)]
            op=color+rest
            if gates7(op):
                key=tuple(sorted(op));hd=8*sum(dims[i]*dims[j] for i,j in op)
                mu=[[0]*8 for _ in range(8)]
                for i,j in op:mu[i-1][j-1]+=1;mu[j-1][i-1]-=1
                hits[key]=(hd,trial,sorted(toward),op,primitive(expand(rref_null(rows(op),4)[0])),det_bareiss(mu),witten(op,A),witten(op,B))
        vals=sorted(hits.values())
        print('K33_WITTEN',edgecount,'TRIALS',trials,'UNIQUE_HITS',len(vals))
        for x in vals[:10]:print('K33_WITTEN_HIT',x)
