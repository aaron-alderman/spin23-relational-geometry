import math
from fractions import Fraction as F

mz=91.1876; ae=1/127.955; sin2=0.23122; alpha_s=0.1179
a={'Y':(1-sin2)/ae,'L':sin2/ae,'3':1/alpha_s}
b0={'Y':F(41,6),'L':-F(19,6),'3':-F(7)}
k={'L':11,'R':14,'X':5,'3':12}

# Corrected diagonal LR phase: three chiral families plus the two vectorlike
# lepton doublet pairs, with the colored vectorlike complement decoupled at MK.
bc={'L':-F(5,3),'R':-F(3,2),'X':F(17,6),'3':-F(7)}
# Above MK the complete product spectrum and complex locking fields are active.
bp={'L':F(1,3),'R':-F(25,6),'X':F(7,2),'3':-F(13)}
s0={q:-float(v)/(2*math.pi) for q,v in b0.items()}
sc={q:-float(v)/(2*math.pi) for q,v in bc.items()}
sp={q:-float(v)/(2*math.pi) for q,v in bp.items()}

def solve(y):
    M=[
      [s0['L']/11-s0['3']/12,sp['L']/11-sp['3']/12,0],
      [-s0['L']/11,sp['R']/14-sp['L']/11,1/14],
      [s0['Y']/5-s0['L']/11,sp['X']/5-sp['L']/11,-1/5]
    ]
    rhs=[
      -(a['L']/11-a['3']/12)-(sc['L']/11-sc['3']/12)*y,
      a['L']/11+(sc['L']/11-sc['R']/14)*y,
      a['L']/11-a['Y']/5+(sc['L']/11-sc['X']/5)*y
    ]
    aug=[row[:]+[rhs[i]] for i,row in enumerate(M)]
    for col in range(3):
        pivot=max(range(col,3),key=lambda r:abs(aug[r][col]))
        aug[col],aug[pivot]=aug[pivot],aug[col]
        p=aug[col][col]
        aug[col]=[v/p for v in aug[col]]
        for r in range(3):
            if r==col: continue
            f=aug[r][col]
            aug[r]=[aug[r][c]-f*aug[col][c] for c in range(4)]
    x,z,ar=[aug[i][3] for i in range(3)]
    ax=a['Y']+s0['Y']*x-ar
    vals={
      'L':a['L']+s0['L']*x+sc['L']*y+sp['L']*z,
      'R':ar+sc['R']*y+sp['R']*z,
      'X':ax+sc['X']*y+sp['X']*z,
      '3':a['3']+s0['3']*x+sc['3']*y+sp['3']*z,
    }
    c=vals['L']/11
    def parent_values(color_split):
        kc,kcp=color_split
        parent_k={'B':11,'Bp':3,'C':kc,'Cp':kcp}
        parent_b={
          'B':-F(22,3)+F(2,3)*11+F(1,3),
          'Bp':-F(22,3)+F(2,3)*3+F(1,3),
          'C':-F(11)+F(2,3)*kc+F(1,2),
          'Cp':-F(11)+F(2,3)*kcp+F(1,2),
        }
        return {g:float(parent_k[g])*c+float(parent_b[g])*z/(2*math.pi) for g in parent_k}
    return x,y,z,ar,ax,vals,c,parent_values((8,4)),parent_values((10,2))

r0=solve(0); r1=solve(1)
y_z0=-r0[2]/(r1[2]-r0[2])
y_x0=-r0[0]/(r1[0]-r0[0])

def scale(logv): return mz*math.exp(logv)
print('PROTOCOL spin23-736d-corrected-corridor/1')
print('BETAS',bc,bp)
print('AFFINE_SLOPES','dx/dy',r1[0]-r0[0],'dz/dy',r1[2]-r0[2])
print('ENDPOINTS','y_z0',y_z0,'y_x0',y_x0)
for y in [0,1,2,4,8,12,y_z0]:
    x,y,z,ar,ax,vals,c,p84,p102=solve(y)
    print('POINT',y,'x',x,'z',z,'MR',scale(x),'MK',scale(x+y),'ML',scale(x+y+z),'minA',min(vals.values()),'c',c,'p84',p84,'p102',p102,'physical',min(x,y,z,min(vals.values()),min(p84.values()),min(p102.values()))>=-1e-9)

valid=[]
upper=max(0,y_z0)
for i in range(10001):
    y=upper*i/10000
    row=solve(y); x,_,z,_,_,vals,_,p84,p102=row
    if min(x,y,z,min(vals.values()))>=-1e-9: valid.append(row)
print('VALID',len(valid),'OF',10001)
if valid:
    print('RANGES','y',(valid[0][1],valid[-1][1]),'x',(min(r[0] for r in valid),max(r[0] for r in valid)),'z',(min(r[2] for r in valid),max(r[2] for r in valid)))
    print('PARENT_MINIMA','8+4',min(min(r[7].values()) for r in valid),'10+2',min(min(r[8].values()) for r in valid))
print('PASSED',len(valid)>0)
