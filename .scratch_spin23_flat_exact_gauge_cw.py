from fractions import Fraction as F
import math
import numpy as np

g2 = {"A":F(1,11), "B":F(1,11), "Bp":F(1,3), "X":F(1,5), "C":F(1,8), "Cp":F(1,4)}


def dot(v, w):
    return sum(F(v.get(k,0))*F(w.get(k,0))*g2[k] for k in g2)


vAB={"A":1,"B":-1}; vBBp={"B":1,"Bp":-1}; vB={"B":1}; vBX={"B":1,"X":-1}; vCCp={"C":1,"Cp":-1}


def tr_mass4(links):
    return sum(wi*wj*dot(vi,vj)**2 for wi,vi in links for wj,vj in links)


def polynomial_value(u):
    b=F(1,4)+u; c=F(1,4)-u; r=F(3,4)-u
    charged=[(u,vAB),(b,vBBp),(r/F(2),vB)]
    neutral=[(u,vAB),(b,vBBp),(r/F(2),vBX)]
    color=[(c,vCCp)]
    return 2*tr_mass4(charged)+tr_mass4(neutral)+8*tr_mass4(color)


y0,y1,ym1=polynomial_value(F(0)),polynomial_value(F(1)),polynomial_value(F(-1))
B=(y1-ym1)/2; A=(y1+ym1)/2-y0
umin=-B/(2*A)


def outer(vec, names):
    a=np.array([vec.get(name,0)*math.sqrt(float(g2[name])) for name in names])
    return np.outer(a,a)


def spectrum(u):
    b,c,r=.25+u,.25-u,.75-u
    weak_names=["A","B","Bp"]
    neutral_names=["A","B","Bp","X"]
    charged=u*outer(vAB,weak_names)+b*outer(vBBp,weak_names)+(r/2)*outer(vB,weak_names)
    neutral=u*outer(vAB,neutral_names)+b*outer(vBBp,neutral_names)+(r/2)*outer(vBX,neutral_names)
    color=c*float(g2["C"]+g2["Cp"])
    return np.concatenate([np.tile(np.linalg.eigvalsh(charged),2),np.linalg.eigvalsh(neutral),np.repeat(color,8)])


def cw(u,mu2):
    return sum(m*m*(math.log(m/mu2)-F(5,6)) for m in spectrum(u) if m>1e-14)


grid=np.linspace(0,.25,10001);mref=max(spectrum(0))
print("PROTOCOL spin23-flat-exact-block-gauge-cw/1")
print("TRM4",A,B,y0,"UMIN",umin,float(umin))
print("GRID",grid[np.argmin([sum(spectrum(u)**2) for u in grid])])
print("MREF",mref)
for factor in (.1,.3,1,3,10):
    vals=[cw(u,factor*mref) for u in grid];i=int(np.argmin(vals))
    print("CW",factor,grid[i],vals[-1]-vals[0])
