"""Code-native preview of proposed centerlines; no source micrograph is edited."""
import json
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

r=json.loads(Path('evidence/data/hcq-screening-pickup-geometry-v1.json').read_text())
g=r['geometry'];im=Image.new('RGB',(1580,790),'white');d=ImageDraw.Draw(im)
def font(size):return ImageFont.truetype('C:/Windows/Fonts/arial.ttf',size)
def xy(point):return (500+36*point[0],250-36*point[1])
def text(x,y,s,size=20,color='#111827'):d.text((x,y),s,font=font(size),fill=color)
text(32,20,'Candidate pickup layout for a redesigned hybrid charge interference device',30)
text(32,62,'Proposed micrometre dimensions; not the published chip CAD or a demonstrated 0.5% calibration',21,'#475569')
for x in range(-12,13,2):
    d.line([(500+36*x,160),(500+36*x,590)],fill='#f1f5f9',width=1)
    text(500+36*x-12,600,str(x),15,'#64748b')
for y in range(-8,3,2):
    d.line([(62,250-36*y),(935,250-36*y)],fill='#f1f5f9',width=1)
    text(22,250-36*y-10,str(y),15,'#64748b')
paths=[(g['driveCurrentModeCenterline'],'#c2410c',5),
       (g['sharedResonatorModeCenterline'],'#64748b',5),
       (g['dutLoopCenterline'],'#111827',6)]
for p,color,width in paths:d.line([xy(pt) for pt in p],fill=color,width=width)
colors=['#2563eb','#059669','#9333ea']
for (name,lobes),color in zip(g['magneticPickups'].items(),colors):
    for lobe in lobes:
        d.line([xy(p) for p in lobe['closedCenterline']],fill=color,width=4)
        p=lobe['closedCenterline'];cx=sum(x[0] for x in p[:-1])/4;cy=sum(x[1] for x in p[:-1])/4
        xx,yy=xy([cx,cy,0]);text(xx-8,yy-13,'+' if lobe['windingSign']>0 else '-',23,color)
for spec in [g['differentialVoltageTap'],g['matchedUnsharedVoltageTap']]:
    for point in spec['nodePositions']:
        xx,yy=xy(point);d.ellipse((xx-7,yy-7,xx+7,yy+7),fill='#dc2626')
# Symbolic junction pair and gate, not a lithographic specification.
for x in [-.5,.5]:
    xx,yy=xy([x,2,0]);d.rectangle((xx-5,yy-7,xx+5,yy+7),fill='white')
    d.line([(xx-3,yy-8),(xx-3,yy+8)],fill='#0891b2',width=3)
    d.line([(xx+3,yy-8),(xx+3,yy+8)],fill='#0891b2',width=3)
text(405,123,'JJ pair / island',18,'#0891b2')
legend=[('#111827','DUT loop: 4 x 4 um'),('#c2410c','Pump / external return mode'),
 ('#64748b','Resonator mode with shared branch'),('#2563eb','P_D: pump gradiometer'),
 ('#059669','P_R: shared-arm gradiometer'),('#9333ea','P_A: aperture guard'),
 ('#dc2626','Shared and unshared voltage taps')]
for j,(color,label) in enumerate(legend):
    yy=150+j*39;d.line([(1015,yy+13),(1060,yy+13)],fill=color,width=5)
    text(1075,yy,label,20,color)
text(1015,446,'Pickup plane: z = +0.30 um',20)
text(1015,474,'Insulated pump layer: z = -0.40 um',20)
text(1015,514,'Matched shared/monitor sections:',20)
text(1015,544,'length 4 um; width 0.25 um',20)
text(1015,585,'All geometric / film inputs are assumptions.',18,'#475569')
text(1015,614,'GHz complex calibration is still required.',18,'#475569')
d.line([(80,670),(224,670)],fill='#111827',width=5);text(127,684,'4 um',18)
text(300,654,'Magnetic pickups constrain current modes.',21)
text(300,684,'The matched voltage bridge measures kinetic branch drive and rejects DUT self response.',21)
text(32,744,'The 0.5% target is an acceptance bound to verify with calibration data; the drawing does not establish it.',20,'#7c2d12')
out=Path('evidence/data/hcq-screening-pickup-geometry-v1.png');im.save(out)
print(out)
