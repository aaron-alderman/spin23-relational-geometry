from collections import Counter, deque
from fractions import Fraction
from itertools import product, combinations
import argparse
import heapq

DIMS={1:2,2:2,3:2,4:2,5:3,6:1,7:2,8:2,9:2,10:3}
A={1,8}; B={2,3,4,7}; GROUPS=(A,B,{5},{6},{9},{10}); NONABELIAN=({5},{10},A,B,{9})
BASE=[(1,5),(1,5),(8,5),(5,2),(5,3),(5,4),(1,6),(8,6),(8,6),(6,4),(6,7),(6,7),(2,1),(7,8),(5,9),(9,10)]

def rref_null(matrix,width):
    a=[[Fraction(x) for x in row] for row in matrix if any(row)]; pivots=[]; rank=0
    for col in range(width):
        pivot=next((i for i in range(rank,len(a)) if a[i][col]),None)
        if pivot is None: continue
        a[rank],a[pivot]=a[pivot],a[rank]; q=a[rank][col]; a[rank]=[x/q for x in a[rank]]
        for i in range(len(a)):
            if i!=rank and a[i][col]:
                q=a[i][col]; a[i]=[a[i][j]-q*a[rank][j] for j in range(width)]
        pivots.append(col); rank+=1
    free=[c for c in range(width) if c not in pivots]; out=[]
    for f in free:
        v=[Fraction(0)]*width; v[f]=1
        for i,col in reversed(list(enumerate(pivots))): v[col]=-sum(a[i][j]*v[j] for j in free)
        out.append(v)
    return out

def primitive(v):
    from math import gcd
    den=1
    for x in v: den=den*x.denominator//gcd(den,x.denominator)
    z=[int(x*den) for x in v]; g=0
    for x in z: g=gcd(g,abs(x))
    z=[x//g for x in z]
    if next(x for x in z if x)<0: z=[-x for x in z]
    return tuple(z)

def det_bareiss(a):
    a=[row[:] for row in a]; n=len(a); sign=1; previous=1
    for k in range(n-1):
        if not a[k][k]:
            swap=next((i for i in range(k+1,n) if a[i][k]),None)
            if swap is None:return 0
            a[k],a[swap]=a[swap],a[k]; sign=-sign
        pivot=a[k][k]
        for i in range(k+1,n):
            for j in range(k+1,n):a[i][j]=(a[i][j]*pivot-a[i][k]*a[k][j])//previous
        previous=pivot
    return sign*a[-1][-1]

def pair_types(left,right):
    out=[]
    for l1,r1,r2,l2 in product(left,right,right,left):
        pair=((l1,r1),(r2,l2))
        if pair[0]!=(pair[1][1],pair[1][0]):out.append(pair)
    return out

def constraints(op):
    loc={node:g for g,group in enumerate(GROUPS) for node in group}
    def collapse(q):
        z=[0]*6
        for node,value in enumerate(q,1):z[loc[node]]+=value
        return z
    incidence=[0]*10; grav=[0]*10
    for i,j in op:
        incidence[i-1]+=DIMS[j];incidence[j-1]+=DIMS[i]
        q=[0]*10;q[i-1],q[j-1]=1,-1;weight=4*DIMS[i]*DIMS[j]
        for k in range(10):grav[k]+=weight*q[k]
    rows=[collapse(incidence)]
    for block in NONABELIAN:
        row=[0]*10
        for i,j in op:
            q=[0]*10;q[i-1],q[j-1]=1,-1
            if i in block:
                for k in range(10):row[k]+=2*DIMS[j]*q[k]
            if j in block:
                for k in range(10):row[k]+=2*DIMS[i]*q[k]
        rows.append(collapse(row))
    rows.append(collapse(grav));return rref_null(rows,6)

def witten(op,block):
    return sum((DIMS[j] if i in block else 0)+(DIMS[i] if j in block else 0) for i,j in op)%2

def connector_graph(op):
    # Vertex r is an occurrence of positive bimodule p_r=(i,j). Comparing it
    # with Jp_s=(j_s,i_s) permits a D_F entry when one algebra index agrees.
    edges=[]; adjacency=[set() for _ in op]
    for r,p in enumerate(op):
        for s,b in enumerate(op):
            if r>=s:continue
            labels=set()
            if p[1]==b[0] and p[0]!=b[1]:labels.add(tuple(sorted((p[0],b[1]))))
            if p[0]==b[1] and p[1]!=b[0]:labels.add(tuple(sorted((p[1],b[0]))))
            for label in sorted(labels):
                edges.append({'u':r,'v':s,'orbit':label});adjacency[r].add(s);adjacency[s].add(r)
    components=[];unseen=set(range(len(op)))
    while unseen:
        root=min(unseen);seen={root};queue=deque([root])
        while queue:
            u=queue.popleft()
            for v in adjacency[u]-seen:seen.add(v);queue.append(v)
        components.append(tuple(sorted(seen)));unseen-=seen
    return {'edges':edges,'adjacency':adjacency,'components':components}

def strong_carriers():
    for lpair in pair_types(A,{5,10}):
      for rpair in pair_types({5,10},B|{9}):
        op=BASE+list(lpair)+list(rpair);cnt=Counter(op)
        if any(cnt[(j,i)] for i,j in cnt) or any(witten(op,g) for g in (A,B,{9})):continue
        mu=[[0]*10 for _ in range(10)]
        for i,j in op:mu[i-1][j-1]+=1;mu[j-1][i-1]-=1
        det=det_bareiss(mu)
        if not det:continue
        kernel=constraints(op)
        if len(kernel)!=1:continue
        phase={node:kernel[0][g] for g,group in enumerate(GROUPS) for node in group}
        cubic=sum(4*DIMS[i]*DIMS[j]*(phase[i]-phase[j])**3 for i,j in op)
        if cubic or phase[9]!=phase[2] or phase[10]!=phase[5] or phase[5]==phase[2]:continue
        graph=connector_graph(op);weak_labels={tuple(sorted((9,b))) for b in B}
        weak=sum(1 for edge in graph['edges'] if edge['orbit'] in weak_labels)
        color=sum(1 for edge in graph['edges'] if edge['orbit']==(5,10))
        if weak and color:yield {'op':op,'lpair':lpair,'rpair':rpair,'det':det,'phase':primitive(kernel[0]),'graph':graph}

def edge_key(edge):return (edge['u'],edge['v'],edge['orbit'])

def connected_with_edges(n,edges):
    adjacency=[set() for _ in range(n)]
    for edge in edges:adjacency[edge['u']].add(edge['v']);adjacency[edge['v']].add(edge['u'])
    seen={0};queue=deque([0])
    while queue:
        u=queue.popleft()
        for v in adjacency[u]-seen:seen.add(v);queue.append(v)
    return len(seen)==n

def bridges(n,edges):
    return [edge for k,edge in enumerate(edges) if not connected_with_edges(n,edges[:k]+edges[k+1:])]

def minimum_required_tree(n,edges,weak_labels,color_label=(5,10)):
    weak_edges=[e for e in edges if e['orbit'] in weak_labels];color_edges=[e for e in edges if e['orbit']==color_label]
    best=None
    for w in weak_edges:
      for c in color_edges:
        chosen=[];parent=list(range(n))
        def find(x):
            while parent[x]!=x:parent[x]=parent[parent[x]];x=parent[x]
            return x
        def add(edge):
            a,b=find(edge['u']),find(edge['v'])
            if a==b:return False
            parent[a]=b;chosen.append(edge);return True
        add(w);add(c)
        for edge in edges:
            if edge is not w and edge is not c:add(edge)
        if len(chosen)==n-1:
            rec=(len(chosen),tuple(edge_key(e) for e in chosen),edge_key(w),edge_key(c))
            if best is None or rec<best:best=rec
    return best

def minimum_orbit_species(n,edges,weak_labels,color_label=(5,10)):
    by_label={label:[] for label in {e['orbit'] for e in edges}}
    for edge in edges:by_label[edge['orbit']].append(edge)
    weak_present=sorted(weak_labels & set(by_label))
    labels=sorted(by_label)
    def merged_partition(partition,label):
        parent=list(range(n))
        def find(x):
            while parent[x]!=x:parent[x]=parent[parent[x]];x=parent[x]
            return x
        representatives={}
        for vertex,component in enumerate(partition):
            if component in representatives:parent[find(vertex)]=find(representatives[component])
            else:representatives[component]=vertex
        for edge in by_label[label]:
            a,b=find(edge['u']),find(edge['v'])
            if a!=b:parent[a]=b
        roots=[find(i) for i in range(n)];renumber={}
        return tuple(renumber.setdefault(root,len(renumber)) for root in roots)
    best=[]
    for weak in weak_present:
        required=tuple(sorted({weak,color_label}));partition=tuple(range(n))
        for label in required:partition=merged_partition(partition,label)
        queue=deque([(partition,required)]);seen={partition}
        while queue:
            state,chosen=queue.popleft()
            if len(set(state))==1:best.append(chosen);break
            for label in labels:
                if label in chosen:continue
                nxt=merged_partition(state,label)
                if nxt==state or nxt in seen:continue
                seen.add(nxt);queue.append((nxt,tuple(sorted(chosen+(label,)))))
    return min(best,key=lambda selected:(len(selected),selected)) if best else None

def minimum_weighted_species(n,edges,weak_labels,weight,color_label=(5,10)):
    by_label={label:[] for label in {e['orbit'] for e in edges}}
    for edge in edges:by_label[edge['orbit']].append(edge)
    labels=sorted(by_label)
    def merge(partition,label):
        parent=list(range(n))
        def find(x):
            while parent[x]!=x:parent[x]=parent[parent[x]];x=parent[x]
            return x
        reps={}
        for vertex,component in enumerate(partition):
            if component in reps:parent[find(vertex)]=find(reps[component])
            else:reps[component]=vertex
        for edge in by_label[label]:
            a,b=find(edge['u']),find(edge['v'])
            if a!=b:parent[a]=b
        roots=[find(i) for i in range(n)];renumber={}
        return tuple(renumber.setdefault(root,len(renumber)) for root in roots)
    answers=[]
    for weak in sorted(weak_labels & set(by_label)):
        required=tuple(sorted({weak,color_label}));state=tuple(range(n))
        for label in required:state=merge(state,label)
        start_cost=(sum(weight(label) for label in required),len(required));queue=[(start_cost,required,state)];best={state:start_cost}
        while queue:
            cost,chosen,state=heapq.heappop(queue)
            if best.get(state)!=cost:continue
            if len(set(state))==1:answers.append((cost,chosen));break
            for label in labels:
                if label in chosen:continue
                nxt=merge(state,label)
                if nxt==state:continue
                nxt_cost=(cost[0]+weight(label),cost[1]+1)
                if nxt_cost<best.get(nxt,(10**9,10**9)):
                    best[nxt]=nxt_cost;heapq.heappush(queue,(nxt_cost,tuple(sorted(chosen+(label,))),nxt))
    return min(answers) if answers else None

def summarize(carrier):
    op=carrier['op'];graph=carrier['graph'];edges=graph['edges'];weak_labels={tuple(sorted((9,b))) for b in B}
    bridge_set={edge_key(e) for e in bridges(len(op),edges)}
    weak_edges=[e for e in edges if e['orbit'] in weak_labels];color_edges=[e for e in edges if e['orbit']==(5,10)]
    orbit_counts=Counter(e['orbit'] for e in edges)
    return {'connected':len(graph['components'])==1,'components':tuple(len(c) for c in graph['components']),
            'vertices':len(op),'distinct_types':len(set(op)),'edges':len(edges),
            'cycle_rank':len(edges)-len(op)+len(graph['components']),'bridges':len(bridge_set),
            'weak_edges':len(weak_edges),'color_edges':len(color_edges),
            'weak_bridges':sum(edge_key(e) in bridge_set for e in weak_edges),
            'color_bridges':sum(edge_key(e) in bridge_set for e in color_edges),
            'required_tree':minimum_required_tree(len(op),edges,weak_labels),
            'minimum_orbit_species':minimum_orbit_species(len(op),edges,weak_labels),
            'orbit_counts':tuple(sorted(orbit_counts.items()))}

def summarize_quotient(carrier):
    op=sorted(set(carrier['op']));graph=connector_graph(op);edges=graph['edges'];weak_labels={tuple(sorted((9,b))) for b in B}
    species=minimum_orbit_species(len(op),edges,weak_labels)
    bridge_count=len(bridges(len(op),edges))
    return {'connected':len(graph['components'])==1,'components':tuple(len(c) for c in graph['components']),
            'vertices':len(op),'edges':len(edges),'cycle_rank':len(edges)-len(op)+len(graph['components']),
            'bridges':bridge_count,'minimum_orbit_species':species}

def summarize_color(carrier):
    edges=carrier['graph']['edges'];n=len(carrier['op']);weak_labels={tuple(sorted((9,b))) for b in B};color_nodes={5,10}
    phase={node:value for value,nodes in zip(carrier['phase'],(A,B,{5},{6},{9},{10})) for node in nodes}
    is_colored=lambda label:int((label[0] in color_nodes)^(label[1] in color_nodes))
    optimum=minimum_weighted_species(n,edges,weak_labels,is_colored)
    no_direct=[edge for edge in edges if not (is_colored(edge['orbit']) and abs(phase[edge['orbit'][0]]-phase[edge['orbit'][1]])==172)]
    safe=minimum_weighted_species(n,no_direct,weak_labels,is_colored)
    return {'optimum':optimum,'withoutDirectQuarkLepton':safe}

def summarize_color_multiplicity(carrier):
    edges=carrier['graph']['edges'];n=len(carrier['op']);phase={node:carrier['phase'][g] for g,group in enumerate(GROUPS) for node in group};weak_labels={tuple(sorted((9,b))) for b in B};color_nodes={5,10}
    colored=lambda label:(label[0] in color_nodes)^(label[1] in color_nodes)
    admissible=[e for e in edges if not (colored(e['orbit']) and abs(phase[e['orbit'][0]]-phase[e['orbit'][1]])==172)]
    optimum=minimum_weighted_species(n,admissible,weak_labels,lambda label:int(colored(label)))
    candidates=[]
    for label in sorted({e['orbit'] for e in admissible if colored(e['orbit'])}):
        restricted=[e for e in admissible if not colored(e['orbit']) or e['orbit']==label]
        species=minimum_orbit_species(n,restricted,weak_labels)
        if species is not None and (1,len(species))==optimum[0]:candidates.append((label,sum(e['orbit']==label for e in restricted)))
    return (min(count for _,count in candidates),tuple(candidates),carrier['lpair'],carrier['rpair'],optimum[0])

def main():
    parser=argparse.ArgumentParser();parser.add_argument('--all',action='store_true');parser.add_argument('--preferred',action='store_true');parser.add_argument('--census',action='store_true');parser.add_argument('--quotient-census',action='store_true');parser.add_argument('--color-census',action='store_true');parser.add_argument('--color-multiplicity-census',action='store_true');parser.add_argument('--exception-details',action='store_true');parser.add_argument('--classify-preferred',action='store_true');parser.add_argument('--colored-edges',action='store_true');parser.add_argument('--baryon-proxy',action='store_true');parser.add_argument('--real-even-lift',action='store_true');args=parser.parse_args()
    carriers=list(strong_carriers())
    if args.preferred:
        carriers=[c for c in carriers if c['lpair']==((1,5),(10,1)) and c['rpair']==((10,2),(4,10))]
    if args.classify_preferred:
        carrier=next(c for c in carriers if c['lpair']==((1,5),(10,1)) and c['rpair']==((10,2),(4,10)))
        summary=summarize(carrier);labels=summary['minimum_orbit_species']
        group={1:'A',8:'A',2:'B',3:'B',4:'B',7:'B',5:'C',6:'U',9:'Bp',10:'Cp'}
        phase={node:value for value,nodes in zip(carrier['phase'],(A,B,{5},{6},{9},{10})) for node in nodes}
        records=[]
        for i,j in labels:records.append(((i,j),tuple(sorted((group[i],group[j]))),phase[i]-phase[j]))
        locked={'Bp':'B','Cp':'C'}
        post=[(label,tuple(sorted((locked.get(x,x),locked.get(y,y)))),charge) for label,(x,y),charge in records]
        print('CLASSIFY_PRODUCT',records);print('CLASSIFY_PRODUCT_TYPES',sorted(set((rep,abs(q)) for label,rep,q in records)))
        print('CLASSIFY_LOCKED',post);print('CLASSIFY_LOCKED_TYPES',sorted(set((rep,abs(q)) for label,rep,q in post)))
        return
    if args.colored_edges:
        carrier=next(c for c in carriers if c['lpair']==((1,5),(10,1)) and c['rpair']==((10,2),(4,10)))
        phase={node:value for value,nodes in zip(carrier['phase'],(A,B,{5},{6},{9},{10})) for node in nodes}
        for index,arrow in enumerate(carrier['op']):print('VERTEX',index,arrow,'X',(phase[arrow[0]]-phase[arrow[1]])//43)
        color_nodes={5,10}
        colored_labels=sorted({edge['orbit'] for edge in carrier['graph']['edges'] if (edge['orbit'][0] in color_nodes)^(edge['orbit'][1] in color_nodes)})
        for label in colored_labels:
            print('ORBIT',label)
            for edge in carrier['graph']['edges']:
                if edge['orbit']==label:print(' EDGE',edge['u'],carrier['op'][edge['u']],edge['v'],carrier['op'][edge['v']])
            remaining=[edge for edge in carrier['graph']['edges'] if edge['orbit']!=label]
            print(' CONNECTED_WITHOUT_LABEL',connected_with_edges(len(carrier['op']),remaining))
        both=[edge for edge in carrier['graph']['edges'] if edge['orbit'] not in {(1,5),(5,7)}]
        print('CONNECTED_WITHOUT_BOTH_COLORED_LABELS',connected_with_edges(len(carrier['op']),both))
        weak_labels={tuple(sorted((9,b))) for b in B}
        print('MINIMUM_SPECIES_WITHOUT_BOTH',minimum_orbit_species(len(carrier['op']),both,weak_labels))
        no_colored=[edge for edge in carrier['graph']['edges'] if not ((edge['orbit'][0] in color_nodes)^(edge['orbit'][1] in color_nodes))]
        print('CONNECTED_WITHOUT_ANY_SINGLE_COLOR_ENDPOINT',connected_with_edges(len(carrier['op']),no_colored))
        print('MINIMUM_SPECIES_WITHOUT_ANY_SINGLE_COLOR_ENDPOINT',minimum_orbit_species(len(carrier['op']),no_colored,weak_labels))
        weighted=minimum_weighted_species(len(carrier['op']),carrier['graph']['edges'],weak_labels,
                                          lambda label:int((label[0] in color_nodes)^(label[1] in color_nodes)))
        print('LEXICOGRAPHIC_MINIMUM_COLORED_THEN_TOTAL',weighted)
        for keep in colored_labels:
            restricted=[edge for edge in carrier['graph']['edges'] if not ((edge['orbit'][0] in color_nodes)^(edge['orbit'][1] in color_nodes)) or edge['orbit']==keep]
            print('SINGLE_COLORED_OPTION',keep,minimum_orbit_species(len(carrier['op']),restricted,weak_labels))
        return
    if args.color_census:
        from concurrent.futures import ProcessPoolExecutor
        with ProcessPoolExecutor(max_workers=4) as pool:summaries=list(pool.map(summarize_color,carriers))
        print('COLOR_COST_HISTOGRAM',dict(Counter(s['optimum'][0] for s in summaries)))
        print('SAFE_COLOR_COST_HISTOGRAM',dict(Counter(s['withoutDirectQuarkLepton'][0] if s['withoutDirectQuarkLepton'] else None for s in summaries)))
        for carrier,summary in list(zip(carriers,summaries))[:12]:print('COLOR_CARRIER',carrier['lpair'],carrier['rpair'],'DET',carrier['det'],summary)
        return
    if args.color_multiplicity_census:
        from concurrent.futures import ProcessPoolExecutor
        carriers=list(strong_carriers())
        with ProcessPoolExecutor(max_workers=4) as pool:rows=list(pool.map(summarize_color_multiplicity,carriers))
        print('MIN_SAFE_COLORED_ORBIT_OCCURRENCE_HISTOGRAM',Counter(row[0] for row in rows))
        print('ALL_HAVE_SINGLE_EDGE_SAFE_OPTIMUM',all(row[0]==1 for row in rows))
        for row in sorted(rows,key=lambda x:(-x[0],x[2],x[3]))[:12]:print('MULTIPLICITY_ROW',row)
        return
    if args.exception_details:
        targets={(((8,5),(10,1)),((5,2),(7,5))),(((8,5),(10,8)),((5,2),(7,5)))}
        for carrier in strong_carriers():
            if (carrier['lpair'],carrier['rpair']) not in targets:continue
            print('EXCEPTION','FQL',carrier['lpair'],'FQR',carrier['rpair'],'PHASE',carrier['phase'])
            for i,p in enumerate(carrier['op']):print('VERTEX',i,p)
            for label in ((1,5),(2,5),(5,7)):
                print('LABEL',label)
                for edge in carrier['graph']['edges']:
                    if edge['orbit']==label:print(' EDGE',edge['u'],carrier['op'][edge['u']],edge['v'],carrier['op'][edge['v']])
        return
    if args.baryon_proxy:
        carrier=next(c for c in carriers if c['lpair']==((1,5),(10,1)) and c['rpair']==((10,2),(4,10)))
        labels={(1,2),(1,3),(1,4),(1,5),(1,7),(1,9),(2,6),(2,9),(4,8),(5,10),(6,7)}
        phase={node:value for value,nodes in zip(carrier['phase'],(A,B,{5},{6},{9},{10})) for node in nodes}
        for edge in carrier['graph']['edges']:
            if edge['orbit'] not in labels:continue
            u,v=edge['u'],edge['v'];au,av=carrier['op'][u],carrier['op'][v]
            xu=(phase[au[0]]-phase[au[1]])//43;xv=(phase[av[0]]-phase[av[1]])//43
            print('SUPPORT_EDGE',edge['orbit'],u,au,'X',xu,v,av,'X',xv)
        return
    if args.real_even_lift:
        carrier=next(c for c in carriers if c['lpair']==((1,5),(10,1)) and c['rpair']==((10,2),(4,10)))
        modes=Counter();ambiguous=[];incidence=[Counter() for _ in carrier['op']];local_edges=[{'left':[],'right':[]} for _ in carrier['op']]
        for edge in carrier['graph']['edges']:
            p=carrier['op'][edge['u']];q=carrier['op'][edge['v']]
            horizontal=p[1]==q[0] and p[0]!=q[1]
            vertical=p[0]==q[1] and p[1]!=q[0]
            modes['horizontal' if horizontal else 'vertical' if vertical else 'invalid']+=1
            if horizontal:
                incidence[edge['u']]['left']+=1;incidence[edge['v']]['right']+=1
                local_edges[edge['u']]['left'].append(edge);local_edges[edge['v']]['right'].append(edge)
            if vertical:
                incidence[edge['u']]['right']+=1;incidence[edge['v']]['left']+=1
                local_edges[edge['u']]['right'].append(edge);local_edges[edge['v']]['left'].append(edge)
            if horizontal==vertical:ambiguous.append((edge,p,q,horizontal,vertical))
        print('PROTOCOL spin23-736d-global-real-even-lift/1')
        print('OCCURRENCES',len(carrier['op']))
        print('CONNECTORS',len(carrier['graph']['edges']))
        print('RECTANGLE_MODES',dict(modes))
        print('AMBIGUOUS_OR_INVALID',ambiguous)
        print('ORDER_ONE_LOCAL',not ambiguous and modes['invalid']==0)
        print('GRADING_LIFT','P_r:+ -> J(P_s):-; J(P_r):- -> P_s:+')
        print('REALITY_LIFT','D_e + D_e* + J D_e J^-1 + J D_e* J^-1')
        print('CYCLE_OBSTRUCTION',False)
        mixed=[row['left']*row['right'] for row in incidence]
        print('INCIDENCE_LEFT_RIGHT',[(carrier['op'][i],row['left'],row['right'],mixed[i]) for i,row in enumerate(incidence)])
        print('MIXED_CORNER_COUNT',sum(mixed))
        print('MIXED_CORNER_ACTIVE_VERTICES',sum(x>0 for x in mixed))
        print('MIXED_CORNER_MAX_AT_VERTEX',max(mixed))
        pair_counts=Counter()
        for incident in local_edges:
            for left in incident['left']:
                for right in incident['right']:
                    pair_counts[tuple(sorted((left['orbit'],right['orbit'])))]+=1
        print('MIXED_ORBIT_PAIR_TYPES',len(pair_counts))
        print('MIXED_ORBIT_PAIR_COUNTS',sorted(pair_counts.items(),key=lambda item:(-item[1],item[0])))
        colored=(1,5)
        colored_pairs={pair:count for pair,count in pair_counts.items() if colored in pair}
        print('COLORED_MIXED_ORBIT_PAIR_TYPES',len(colored_pairs))
        print('COLORED_MIXED_CHANNELS',sum(colored_pairs.values()))
        print('COLORED_MIXED_PAIR_COUNTS',sorted(colored_pairs.items(),key=lambda item:(-item[1],item[0])))
        safe={(1,2),(1,3),(1,4),(1,5),(1,7),(1,9),(2,6),(2,9),(4,8),(5,10),(6,7)}
        safe_pairs={pair:count for pair,count in pair_counts.items() if pair[0] in safe and pair[1] in safe}
        safe_colored={pair:count for pair,count in safe_pairs.items() if colored in pair}
        print('SAFE_SUPPORT_MIXED_ORBIT_PAIR_TYPES',len(safe_pairs))
        print('SAFE_SUPPORT_MIXED_CHANNELS',sum(safe_pairs.values()))
        print('SAFE_SUPPORT_MIXED_PAIR_COUNTS',sorted(safe_pairs.items()))
        print('SAFE_SUPPORT_COLORED_MIXED_PAIR_TYPES',len(safe_colored))
        print('SAFE_SUPPORT_COLORED_MIXED_CHANNELS',sum(safe_colored.values()))
        print('SAFE_SUPPORT_COLORED_MIXED_PAIR_COUNTS',sorted(safe_colored.items()))
        for vertex,incident in enumerate(local_edges):
            for left in incident['left']:
                for right in incident['right']:
                    pair=tuple(sorted((left['orbit'],right['orbit'])))
                    if colored in pair and pair[0] in safe and pair[1] in safe:
                        print('SAFE_COLORED_CORNER',vertex,carrier['op'][vertex],'LEFT',edge_key(left),'RIGHT',edge_key(right),'PAIR',pair)
        return
    if args.census or args.quotient_census:
        from concurrent.futures import ProcessPoolExecutor
        function=summarize_quotient if args.quotient_census else summarize
        with ProcessPoolExecutor(max_workers=4) as pool:summaries=list(pool.map(function,carriers))
        records=list(zip(carriers,summaries))
    else:records=[(c,summarize(c)) for c in carriers]
    hist=Counter((s['connected'],s['components'],s['edges'],s['cycle_rank'],s['bridges']) for c,s in records)
    print('CARRIERS',len(records));print('STRUCTURE_HISTOGRAM')
    for key,count in sorted(hist.items()):print(count,key)
    if args.census or args.quotient_census:
        counts=Counter(len(s['minimum_orbit_species']) for c,s in records)
        print('MINIMUM_SPECIES_HISTOGRAM',dict(sorted(counts.items())))
        for carrier,summary in sorted(records,key=lambda cs:(len(cs[1]['minimum_orbit_species']),abs(cs[0]['det']),cs[0]['lpair'],cs[0]['rpair']))[:12]:
            print('MINIMUM_SPECIES_CARRIER','COUNT',len(summary['minimum_orbit_species']),'FQL',carrier['lpair'],'FQR',carrier['rpair'],'DET',carrier['det'],'LABELS',summary['minimum_orbit_species'])
        return
    ranked=sorted(records,key=lambda cs:(not cs[1]['connected'],cs[1]['edges'],cs[1]['cycle_rank'],-cs[1]['weak_edges']-cs[1]['color_edges'],cs[0]['lpair'],cs[0]['rpair']))
    print('BEST')
    for carrier,summary in ranked[:(len(ranked) if args.all else 12)]:
        print('CARRIER',carrier['lpair'],carrier['rpair'],'DET',carrier['det'],'PHASE',carrier['phase'])
        print('SUMMARY',summary)
    preferred_l=((1,5),(10,1));preferred_r=((10,2),(4,10))
    for carrier,summary in records:
        if carrier['lpair']==preferred_l and carrier['rpair']==preferred_r:
            print('V364_PREFERRED',carrier['lpair'],carrier['rpair'],'DET',carrier['det'],'PHASE',carrier['phase'])
            print('V364_SUMMARY',summary)

if __name__=='__main__':main()
