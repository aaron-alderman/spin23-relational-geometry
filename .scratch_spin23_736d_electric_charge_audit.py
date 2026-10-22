from fractions import Fraction
from itertools import product
from collections import Counter

A={1,8};B={2,3,4,7,9};C={5,10};U={6}
DIMS={1:2,2:2,3:2,4:2,5:3,6:1,7:2,8:2,9:2,10:3}
phase={**{i:6 for i in A|B},**{i:49 for i in C},6:-123}
op=[(1,5),(1,5),(8,5),(5,2),(5,3),(5,4),(1,6),(8,6),(8,6),(6,4),(6,7),(6,7),(2,1),(7,8),(5,9),(9,10),(1,5),(10,1),(10,2),(4,10)]
allowed={Fraction(n,3) for n in range(-3,4)}
rows=[];all_charges=[];weighted_q=Counter();weighted_y=Counter()
sum_y=Fraction(0);sum_y3=Fraction(0);su2a2y=Fraction(0);su3_2y=Fraction(0)
su2a_doublets=0;positive_dimension=0;su3_cubic=0;color_dimension=0
for index,(i,j) in enumerate(op):
    x=Fraction(phase[i]-phase[j],43)
    nA=int(i in A)+int(j in A);nB=int(i in B)+int(j in B)
    weights=[sum(bits,Fraction(0)) for bits in product(*([[Fraction(-1,2),Fraction(1,2)]]*(nA+nB)))] if nA+nB else [Fraction(0)]
    charges=tuple(sorted({w+x/6 for w in weights}))
    spectator=DIMS[i]*DIMS[j]//(2**(nA+nB))
    assert spectator*(2**(nA+nB)) == DIMS[i]*DIMS[j]
    positive_dimension += DIMS[i]*DIMS[j]
    if i in C or j in C:
        color_dimension += DIMS[i]*DIMS[j]
        # H_(i,j) is fundamental when C is on the left and antifundamental
        # when C is on the right. The cubic index changes sign under duality.
        su3_cubic += (1 if i in C else -1)*(DIMS[i]*DIMS[j]//3)
    for abits in product(*([[Fraction(-1,2),Fraction(1,2)]]*nA)) if nA else [()]:
        for bbits in product(*([[Fraction(-1,2),Fraction(1,2)]]*nB)) if nB else [()]:
            q=sum(abits,Fraction(0))+sum(bbits,Fraction(0))+x/6
            y=sum(bbits,Fraction(0))+x/6
            weighted_q[q] += spectator
            weighted_y[y] += spectator
            sum_y += spectator*y
            sum_y3 += spectator*y**3
    if nA:
        # T(2_A)=1/2; trace Y over any B factor removes its T3_B part.
        su2a2y += Fraction(1,2)*spectator*(2**nB)*(x/6)
        su2a_doublets += spectator*(2**nB)
    if i in C or j in C:
        # T(3_C)=1/2; sum over weak multiplicities, with traceless T3 pieces.
        su3_2y += Fraction(1,2)*(2**(nA+nB))*(x/6)
    assert all(q in allowed for q in charges)
    rows.append((index,(i,j),int(x),nA,nB,tuple(str(q) for q in charges)))
    all_charges.extend(charges)
print('PROTOCOL spin23-736d-full-occurrence-electric-charge-audit/1')
for row in rows:print('ROW',row)
print('DISTINCT_CHARGES',tuple(str(q) for q in sorted(set(all_charges))))
print('OCCURRENCE_SPECTRA',Counter(row[-1] for row in rows))
print('POSITIVE_FINITE_DIMENSION',positive_dimension)
print('J_COMPLETED_FINITE_DIMENSION',2*positive_dimension)
print('SPINOR_TIMES_J_COMPLETED_DIMENSION',4*2*positive_dimension)
print('WEIGHTED_Q_HISTOGRAM',{str(k):weighted_q[k] for k in sorted(weighted_q)})
print('WEIGHTED_Y_HISTOGRAM',{str(k):weighted_y[k] for k in sorted(weighted_y)})
print('POSITIVE_Y_MOMENTS',{'sum_y':str(sum_y),'sum_y3':str(sum_y3)})
print('POSITIVE_MIXED_ANOMALIES',{'su2a2y':str(su2a2y),'su3_2y':str(su3_2y),'su2a_doublets_mod2':su2a_doublets%2})
print('PURE_SU3_CUBIC',su3_cubic)
print('SECTOR_DIMENSIONS',{'colored':color_dimension,'uncolored':positive_dimension-color_dimension})
print('SM_LIKE_FAMILY_EQUIVALENTS',{'quark_blocks':color_dimension//12,'lepton_blocks':(positive_dimension-color_dimension)//4})
print('NON_STANDARD_FRACTIONAL',[])
print('PASSED',positive_dimension==92 and 8*positive_dimension==736)
