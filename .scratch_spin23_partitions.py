from fractions import Fraction
from itertools import product
from math import prod

nodes = (1, 2, 3, 4, 7, 8)
dims = {1:2,2:2,3:2,4:2,5:3,6:1,7:2,8:2}
P = [(1,2),(1,3),(4,1),(1,5),(7,1),(1,8),(2,3),(2,5),(2,6),(5,3),(4,5),(6,4),(5,7),(5,8)]
U = [13,8,7,6,12,4,5,5]
L3 = [1,1,-1,1,0,0,-1,-1]
Lg = [5,4,-7,4,0,0,-1,-5]

def parts(seq):
    if not seq:
        yield []
        return
    x, *rest = seq
    for p in parts(rest):
        yield [[x]] + [b[:] for b in p]
        for i in range(len(p)):
            q = [b[:] for b in p]
            q[i] = [x] + q[i]
            yield q

def canon(p):
    return tuple(sorted((tuple(sorted(b)) for b in p), key=lambda b:b[0]))

def rref_null(A, n):
    a = [[Fraction(x) for x in row] for row in A if any(row)]
    piv=[]; r=0
    for c in range(n):
        k=next((k for k in range(r,len(a)) if a[k][c]),None)
        if k is None: continue
        a[r],a[k]=a[k],a[r]
        z=a[r][c]; a[r]=[v/z for v in a[r]]
        for k in range(len(a)):
            if k!=r and a[k][c]:
                z=a[k][c]; a[k]=[a[k][j]-z*a[r][j] for j in range(n)]
        piv.append(c); r+=1
        if r==len(a): break
    free=[c for c in range(n) if c not in piv]
    basis=[]
    for f in free:
        v=[Fraction(0) for _ in range(n)]; v[f]=1
        for rr,c in reversed(list(enumerate(piv))):
            v[c]=-sum(a[rr][j]*v[j] for j in free)
        basis.append(v)
    return basis

def collapse(row, blocks):
    out=[0]*(len(blocks)+2)
    loc={x:i for i,b in enumerate(blocks) for x in b}
    for j,x in enumerate(row, start=1):
        if j in loc: out[loc[j]] += x
        elif j==5: out[-2]+=x
        elif j==6: out[-1]+=x
    return out

def su2row(block):
    row=[0]*8
    for i,j in P:
        if i in block:
            row[i-1] += 2*dims[j]
            row[j-1] -= 2*dims[j]
        if j in block:
            row[i-1] += 2*dims[i]
            row[j-1] -= 2*dims[i]
    return row

def expand(v, blocks):
    t=[Fraction(0)]*8
    for k,b in enumerate(blocks):
        for x in b:t[x-1]=v[k]
    t[4]=v[-2]; t[5]=v[-1]
    return t

def cubic(t):
    return sum(4*dims[i]*dims[j]*(t[i-1]-t[j-1])**3 for i,j in P)

def poly3(basis, blocks, oriented=P):
    # symmetric ordered-tuple coefficient tensor compressed as monomial exponents
    from collections import defaultdict
    out=defaultdict(Fraction)
    eb=[expand(v,blocks) for v in basis]
    d=len(basis)
    for i,j in oriented:
        q=[v[i-1]-v[j-1] for v in eb]
        w=4*dims[i]*dims[j]
        for a in range(d):
            for b in range(d):
                for c in range(d):
                    ex=[0]*d
                    ex[a]+=1; ex[b]+=1; ex[c]+=1
                    out[tuple(ex)] += w*q[a]*q[b]*q[c]
    return {k:v for k,v in sorted(out.items(), reverse=True) if v}

def primitive(v):
    import math
    from functools import reduce
    den=1
    for x in v: den=den*x.denominator//math.gcd(den,x.denominator)
    z=[int(x*den) for x in v]
    g=reduce(math.gcd,(abs(x) for x in z if x),0) or 1
    z=[x//g for x in z]
    if next((x for x in z if x),1)<0:z=[-x for x in z]
    return z

allp=sorted({canon(p) for p in parts(nodes)}, key=lambda p:(len(p),p))
print('partitions',len(allp))
print('nodewise SU2 rows')
for x in nodes: print(x,su2row({x}))
surv=[]
for blocks in allp:
    rows=[collapse(r,blocks) for r in (U,L3,Lg)] + [collapse(su2row(set(b)),blocks) for b in blocks]
    basis=rref_null(rows,len(blocks)+2)
    diff=[v for v in basis if len({v[i] for i in range(len(blocks))})>1]
    if diff:
        # brute rational projective coefficients in {-3..3} to find cubic-zero differentiated direction
        found=[]
        for coeff in product(range(-3,4), repeat=len(basis)):
            if not any(coeff): continue
            v=[sum(Fraction(coeff[k])*basis[k][j] for k in range(len(basis))) for j in range(len(basis[0]))]
            if len({v[i] for i in range(len(blocks))})>1 and cubic(expand(v,blocks))==0:
                found.append((coeff,v)); break
        surv.append((blocks,basis,found))
print('linear differentiated',len(surv))
print('cubic witnessed',sum(bool(x[2]) for x in surv))
for blocks,basis,found in surv:
    witness=primitive(expand(found[0][1],blocks)) if found else None
    charges=[witness[i-1]-witness[j-1] for i,j in P] if witness else None
    print('P',blocks,'null',len(basis),'poly',poly3(basis,blocks),'witness',witness,'charges',charges)

def anomaly_rows(oriented, blocks):
    l3=[0]*8; lg=[0]*8
    for i,j in oriented:
        q=[0]*8; q[i-1]=1; q[j-1]=-1
        wg=4*dims[i]*dims[j]
        for k in range(8): lg[k]+=wg*q[k]
        if i==5 or j==5:
            other=j if i==5 else i
            w3=2*dims[other]
            for k in range(8): l3[k]+=w3*q[k]
    su=[]
    for block in blocks:
        row=[0]*8
        for i,j in oriented:
            q=[0]*8; q[i-1]=1; q[j-1]=-1
            if i in block:
                for k in range(8): row[k]+=2*dims[j]*q[k]
            if j in block:
                for k in range(8): row[k]+=2*dims[i]*q[k]
        su.append(row)
    return [U,l3,lg]+su

def det_bareiss(a):
    a=[r[:] for r in a]; n=len(a); sign=1; prev=1
    for k in range(n-1):
        if a[k][k]==0:
            z=next((i for i in range(k+1,n) if a[i][k]),None)
            if z is None:return 0
            a[k],a[z]=a[z],a[k]; sign=-sign
        p=a[k][k]
        for i in range(k+1,n):
            for j in range(k+1,n): a[i][j]=(a[i][j]*p-a[i][k]*a[k][j])//prev
        prev=p
    return sign*a[-1][-1]

core=((1,8),(2,3,4,7))
print('single orientation flips on core partition')
for e,(u,v) in enumerate(P):
    op=P[:]; op[e]=(v,u)
    mu=[[0]*8 for _ in range(8)]
    for i,j in op:mu[i-1][j-1]=1;mu[j-1][i-1]=-1
    rows=[collapse(r,core) for r in anomaly_rows(op,core)]
    bas=rref_null(rows,4)
    pol=poly3(bas,core,op) if bas else {}
    diff=any(v[0]!=v[1] for v in bas)
    print((u,v),'det',det_bareiss(mu),'null',len(bas),'diff',diff,'poly',pol,'basis',bas)

from itertools import combinations
print('two orientation flips summary')
two=[]
def chirality_signature(oriented, bas):
    cls={1:0,8:0,2:1,3:1,4:1,7:1,5:2,6:3}
    net={}
    for i,j in oriented:
        a,b=cls[i],cls[j]
        if a==b:continue
        lo,hi=sorted((a,b)); sg=1 if (a,b)==(lo,hi) else -1
        net[(lo,hi)]=net.get((lo,hi),0)+sg
    active=[]
    for pair,m in net.items():
        if m and any(v[pair[0]]!=v[pair[1]] for v in bas):active.append((pair,m))
    return active
for aa,bb in combinations(range(len(P)),2):
    op=P[:]
    for e in (aa,bb):
        u,v=op[e];op[e]=(v,u)
    mu=[[0]*8 for _ in range(8)]
    for i,j in op:mu[i-1][j-1]=1;mu[j-1][i-1]=-1
    det=det_bareiss(mu)
    rows=[collapse(r,core) for r in anomaly_rows(op,core)]
    bas=rref_null(rows,4)
    diff=any(v[0]!=v[1] for v in bas)
    pol=poly3(bas,core,op) if bas else {}
    witness=None
    if diff:
        for coeff in product(range(-6,7),repeat=len(bas)):
            if not any(coeff):continue
            vv=[sum(Fraction(coeff[k])*bas[k][j] for k in range(len(bas))) for j in range(4)]
            if vv[0]!=vv[1] and cubic(expand(vv,core))==0: # wrong oriented fixed below
                tt=expand(vv,core)
                cv=sum(4*dims[i]*dims[j]*(tt[i-1]-tt[j-1])**3 for i,j in op)
                if cv==0:witness=primitive(tt);break
    chi=chirality_signature(op,bas)
    two.append((aa,bb,det,len(bas),diff,not bool(pol),witness,pol,bas,chi))
from collections import Counter
print(Counter((x[2]!=0,x[3],x[4],x[5],x[6] is not None) for x in two))
print('invertible differentiated chiral',sum(bool(x[9]) and x[2]!=0 for x in two))
for x in two:
    if x[2] and x[4] and x[6] is not None and x[9]:
        aa,bb,det,nb,diff,ident,wit,pol,bas,chi=x
        print('chiral candidate',P[aa],P[bb],'det',det,'null',nb,'chi',chi,'witness',wit,'poly',pol,'basis',bas)

print('all orientations summary')
stats=Counter(); examples={}
for mask in range(0):
    op=[]
    for e,(u,v) in enumerate(P):op.append((v,u) if (mask>>e)&1 else (u,v))
    mu=[[0]*8 for _ in range(8)]
    for i,j in op:mu[i-1][j-1]=1;mu[j-1][i-1]=-1
    det=det_bareiss(mu)
    rows=[collapse(r,core) for r in anomaly_rows(op,core)]
    bas=rref_null(rows,4)
    diff=any(v[0]!=v[1] for v in bas)
    pol=poly3(bas,core,op) if bas else {}
    chi=chirality_signature(op,bas)
    key=(det!=0,len(bas),diff,bool(pol),bool(chi))
    stats[key]+=1
    examples.setdefault(key,(mask,det,bas,pol,chi))
print(stats)
print('invertible differentiated chiral',sum(n for k,n in stats.items() if k[0] and k[2] and k[4]))
for k,n in stats.items():
    if k[0] and k[2]:print('class',k,'count',n,'example',examples[k])

def incidence_u(oriented):
    row=[0]*8
    for i,j in oriented:
        row[i-1]+=dims[j]; row[j-1]+=dims[i]
    return row

def su3_cubic(oriented):
    z=0
    for i,j in oriented:
        if i==5:z+=dims[j]
        if j==5:z-=dims[i]
    return z

def eval_poly(pol,coeff):
    return sum(v*prod(Fraction(coeff[i])**e for i,e in enumerate(ex)) for ex,v in pol.items())

def find_cubic_witness(bas,pol,limit=20):
    if not bas:return None
    for coeff in product(range(-limit,limit+1),repeat=len(bas)):
        if not any(coeff):continue
        vv=[sum(Fraction(coeff[k])*bas[k][j] for k in range(len(bas))) for j in range(4)]
        if vv[0]==vv[1]:continue
        if eval_poly(pol,coeff)==0:return (coeff,primitive(expand(vv,core)))
    return None

def assess(op):
    mu=[[0]*8 for _ in range(8)]
    for i,j in op:mu[i-1][j-1]+=1;mu[j-1][i-1]-=1
    det=det_bareiss(mu)
    rows=anomaly_rows(op,core); rows[0]=incidence_u(op)
    bas=rref_null([collapse(r,core) for r in rows],4)
    pol=poly3(bas,core,op) if bas else {}
    wit=find_cubic_witness(bas,pol)
    chi=chirality_signature(op,bas)
    return det,su3_cubic(op),bas,pol,wit,chi,incidence_u(op)

all_edges=[(i,j) for i in range(1,9) for j in range(i+1,9)]
support={tuple(sorted(e)) for e in P}
absent=[e for e in all_edges if e not in support]
print('support mutation counts absent',absent)
for kind,cases in (
    ('delete',[(('del',P[k]),P[:k]+P[k+1:]) for k in range(len(P))]),
    ('add',[(('add',e,sg),P+([e] if sg==1 else [(e[1],e[0])])) for e in absent for sg in (1,-1)])
):
    cc=Counter(); hits=[]
    for desc,op in cases:
        det,c3,bas,pol,wit,chi,uu=assess(op)
        key=(det!=0,c3==0,bool(bas),wit is not None,bool(chi))
        cc[key]+=1
        if det and c3==0 and wit and chi:hits.append((desc,det,bas,pol,wit,chi,uu))
    print(kind,cc,'hits',len(hits))
    for h in hits[:10]:print(' HIT',h)

repl=[]
for k,old in enumerate(P):
    base=P[:k]+P[k+1:]
    for e in absent:
        for sg in (1,-1):repl.append((('replace',old,e,sg),base+([e] if sg==1 else [(e[1],e[0])])))
cc=Counter();hits=[]
for desc,op in repl:
    det,c3,bas,pol,wit,chi,uu=assess(op)
    key=(det!=0,c3==0,bool(bas),wit is not None,bool(chi))
    cc[key]+=1
    if det and c3==0 and wit and chi:hits.append((desc,det,bas,pol,wit,chi,uu,op))
print('replace',cc,'hits',len(hits))
for h in hits[:30]:print(' HIT',h)

print('random unrestricted support search')
import random, numpy as np
random.seed(230295)
rhits=[]; rstats=Counter(); near=[]
for trial in range(0):
    op=[]
    for e in all_edges:
        z=random.randrange(3)
        if z==1:op.append(e)
        elif z==2:op.append((e[1],e[0]))
    if len(op)<4:continue
    if su3_cubic(op)!=0:
        rstats['su3cubic']+=1;continue
    rows=anomaly_rows(op,core);rows[0]=incidence_u(op)
    cr=[collapse(r,core) for r in rows]
    if np.linalg.matrix_rank(np.array(cr,dtype=float),tol=1e-9)>3:
        rstats['rank4']+=1;continue
    det,_,bas,pol,wit,chi,uu=assess(op)
    if not det:rstats['singular']+=1;continue
    if not bas:rstats['exactrank4']+=1;continue
    if not chi:rstats['nonchiral']+=1;continue
    if not wit:
        rstats['nocubicwitness']+=1;rstats['nocubic_dim_'+str(len(bas))]+=1
        if len(near)<10:near.append((trial,det,len(op),op,bas,pol,chi,uu))
        continue
    rstats['hit']+=1;rhits.append((trial,det,len(op),op,bas,pol,wit,chi,uu))
    if len(rhits)>=10:break
print(rstats,'hits',len(rhits))
for h in rhits:print(' RANDOM HIT',h)
for h in near:print(' RANDOM NEAR',h)

print('sparse chiral support search')
random.seed(230296)
sparse={}
for edgecount in range(8,8):
    seen=set(); found=[]
    for trial in range(40000):
        chosen=tuple(sorted(random.sample(range(28),edgecount)))
        mask=random.randrange(1<<edgecount)
        key=(chosen,mask)
        if key in seen:continue
        seen.add(key)
        op=[]
        for z,ei in enumerate(chosen):
            i,j=all_edges[ei];op.append((j,i) if (mask>>z)&1 else (i,j))
        if su3_cubic(op)!=0:continue
        rows=anomaly_rows(op,core);rows[0]=incidence_u(op)
        cr=[collapse(r,core) for r in rows]
        if np.linalg.matrix_rank(np.array(cr,dtype=float),tol=1e-9)>3:continue
        det,c3,bas,pol,wit,chi,uu=assess(op)
        if not det or not bas or not chi or pol:continue
        vv=primitive(expand(bas[0],core)) if len(bas)==1 else None
        found.append((det,op,bas,vv,chi,uu))
        if len(found)>=5:break
    sparse[edgecount]=found
    print('edgecount',edgecount,'found',len(found))
    for h in found:print(' SPARSE HIT',h)

print('ultrasparse chiral support search')
random.seed(230297)
for edgecount in range(4,4):
    seen=set(); found=[]
    for trial in range(150000):
        chosen=tuple(sorted(random.sample(range(28),edgecount)));mask=random.randrange(1<<edgecount)
        key=(chosen,mask)
        if key in seen:continue
        seen.add(key);op=[]
        for z,ei in enumerate(chosen):
            i,j=all_edges[ei];op.append((j,i) if (mask>>z)&1 else (i,j))
        if su3_cubic(op)!=0:continue
        rows=anomaly_rows(op,core);rows[0]=incidence_u(op)
        cr=[collapse(r,core) for r in rows]
        if np.linalg.matrix_rank(np.array(cr,dtype=float),tol=1e-9)>3:continue
        det,c3,bas,pol,wit,chi,uu=assess(op)
        if det and bas and chi and not pol:
            found.append((det,op,bas,primitive(expand(bas[0],core)) if len(bas)==1 else None,chi,uu))
            if len(found)>=5:break
    print('edgecount',edgecount,'sampled',len(seen),'found',len(found))
    for h in found:print(' ULTRASPARSE HIT',h)

def scalar_edges(op):
    neg=[(j,i) for i,j in op]
    out=set()
    for p in op:
        for n in neg:
            pair=None
            if p[1]==n[1]:pair=tuple(sorted((p[0],n[0])))
            elif p[0]==n[0]:pair=tuple(sorted((p[1],n[1])))
            if pair and pair[0]!=pair[1]:out.add(pair)
    return out

def connected_subset(es,verts):
    seen={next(iter(verts))}
    while True:
        new=seen|{b for a,b in es if a in seen and b in verts}|{a for a,b in es if b in seen and a in verts}
        if new==seen:return seen==set(verts)
        seen=new

print('connector-compatible chiral search')
random.seed(230298);good=[];cstats=Counter()
for trial in range(300000):
    edgecount=random.randint(10,22)
    chosen=random.sample(range(28),edgecount);mask=random.randrange(1<<edgecount);op=[]
    for z,ei in enumerate(chosen):
        i,j=all_edges[ei];op.append((j,i) if (mask>>z)&1 else (i,j))
    se=scalar_edges(op)
    if (1,8) not in se:cstats['noA']+=1;continue
    if not connected_subset(se,{2,3,4,7}):cstats['noB']+=1;continue
    if not any(tuple(sorted((6,b))) in se for b in (2,3,4,7)):cstats['noBS']+=1;continue
    if su3_cubic(op)!=0:cstats['su3']+=1;continue
    rows=anomaly_rows(op,core);rows[0]=incidence_u(op);cr=[collapse(r,core) for r in rows]
    if np.linalg.matrix_rank(np.array(cr,dtype=float),tol=1e-9)>3:cstats['rank']+=1;continue
    det,c3,bas,pol,wit,chi,uu=assess(op)
    if not det:cstats['singular']+=1;continue
    if not bas or not chi or pol:cstats['anomaly']+=1;continue
    # require the exact kernel to identify A=B and retain both C and S charge differences
    if len(bas)!=1 or bas[0][0]!=bas[0][1] or bas[0][0]==bas[0][2] or bas[0][0]==bas[0][3]:cstats['pattern']+=1;continue
    good.append((trial,det,op,bas,primitive(expand(bas[0],core)),chi,incidence_u(op),sorted(se)))
    if len(good)>=5:break
print(cstats,'found',len(good))
for h in good:print(' CONNECTOR HIT',h)

def scalar_orbit_counts(op):
    neg=[(j,i) for i,j in op];counts=Counter()
    for p in op:
        for n in neg:
            pair=None
            if p[1]==n[1]:pair=tuple(sorted((p[0],n[0])))
            elif p[0]==n[0]:pair=tuple(sorted((p[1],n[1])))
            if pair and pair[0]!=pair[1]:counts[pair]+=1
    return {k:v//2 for k,v in counts.items()}

print('holonomy-rich connector-compatible search')
random.seed(230299);rich=[];hstats=Counter()
for trial in range(500000):
    edgecount=random.randint(14,26);chosen=random.sample(range(28),edgecount);mask=random.randrange(1<<edgecount);op=[]
    for z,ei in enumerate(chosen):
        i,j=all_edges[ei];op.append((j,i) if (mask>>z)&1 else (i,j))
    oc=scalar_orbit_counts(op);se=set(oc)
    if oc.get((1,8),0)<2:hstats['Ahol']+=1;continue
    bedges={e for e in se if e[0] in {2,3,4,7} and e[1] in {2,3,4,7}}
    if not connected_subset(bedges,{2,3,4,7}) or sum(oc[e] for e in bedges)<4:hstats['Bhol']+=1;continue
    if not any(tuple(sorted((6,b))) in se for b in (2,3,4,7)):hstats['noBS']+=1;continue
    if su3_cubic(op)!=0:hstats['su3']+=1;continue
    rows=anomaly_rows(op,core);rows[0]=incidence_u(op);cr=[collapse(r,core) for r in rows]
    if np.linalg.matrix_rank(np.array(cr,dtype=float),tol=1e-9)>3:hstats['rank']+=1;continue
    det,c3,bas,pol,wit,chi,uu=assess(op)
    if not det:hstats['singular']+=1;continue
    if not bas or not chi or pol or len(bas)!=1 or bas[0][0]!=bas[0][1] or bas[0][0]==bas[0][2] or bas[0][0]==bas[0][3]:hstats['anomaly']+=1;continue
    rich.append((trial,det,op,bas,primitive(expand(bas[0],core)),chi,uu,oc))
    if len(rich)>=3:break
print(hstats,'found',len(rich))
for h in rich:print(' RICH HIT',h)
