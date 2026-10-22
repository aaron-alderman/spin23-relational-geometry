import math,numpy as np
from fractions import Fraction as F
g2={'A':F(1,11),'B':F(1,11),'Bp':F(1,3),'X':F(1,5),'C':F(1,8),'Cp':F(1,4)}
def outer(v,names):
 a=np.array([v.get(k,0)*math.sqrt(float(g2[k])) for k in names]);return np.outer(a,a)
vAB={'A':1,'B':-1};vBBp={'B':1,'Bp':-1};vB={'B':1};vBX={'B':1,'X':-1};vCC={'C':1,'Cp':-1}
def spectrum(q):
 b,r,col=.3,.75,.2;wn=['A','B','Bp'];nn=['A','B','Bp','X']
 charged=q*outer(vAB,wn)+b*outer(vBBp,wn)+(r/2)*outer(vB,wn)
 neutral=q*outer(vAB,nn)+b*outer(vBBp,nn)+(r/2)*outer(vBX,nn)
 color=col*float(g2['C']+g2['Cp'])
 return np.concatenate([np.tile(np.linalg.eigvalsh(charged),2),np.linalg.eigvalsh(neutral),np.repeat(color,8)])
def trm4(q):m=spectrum(q);return float(m@m)
def cw(q,mu2):return sum(m*m*(math.log(m/mu2)-5/6) for m in spectrum(q) if m>1e-14)
eps=1e-7;mref=max(spectrum(0));print('PROTOCOL spin23-preferred-ab-bias-gauge/1');print('TRM4_DERIVATIVE',(trm4(eps)-trm4(0))/eps,'EXACT','81/2420')
for factor in (.1,.3,1,3,10):print('CW_DERIVATIVE',factor,(cw(eps,factor*mref)-cw(0,factor*mref))/eps)
