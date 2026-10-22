from math import sqrt,log,exp

V=174.0
MNU=0.05e-9
MPL=1.22089e19
MPLR=2.435e18

POINTS=[
    ('product',0.0,4.443458625444685e12,4.443458625444685e12,4.6844549917969856e14),
    ('midpoint',17.749414518310253,1.402860864062517e9,7.169475452225421e16,7.36133101656297e17),
    ('reduced-planck-boundary',20.634495753814033,3.784353800056864e8,3.462895409366732e17,2.435e18),
    ('planck-boundary',24.522664115275496,6.473372264379494e7,2.8919334161863864e18,1.22089e19),
    ('collapsed',35.498829036620506,4.4290242574753135e5,1.1567875970695919e21,1.1567875970695261e21),
]

def req(mn):return sqrt(MNU*mn)/V
def mixing(mn):return sqrt(MNU/mn)

for name,y,mr,mk,ml in POINTS:
    direct=req(mr)
    vals={
        'Lambda=MK':(mr*mr/mk,req(mr*mr/mk)),
        'Lambda=ML':(mr*mr/ml,req(mr*mr/ml)),
        'Lambda=MPlReduced':(mr*mr/MPLR,req(mr*mr/MPLR)),
        'Lambda=MPl':(mr*mr/MPL,req(mr*mr/MPL)),
    }
    print(name,'corridorY',y,'MR',mr,'directYukawa',direct)
    for label,(mn,yukawa) in vals.items():print(' ',label,'MN',mn,'yNu',yukawa,'mixing',mixing(mn),'MN_over_MR',mn/mr)

MZ=91.1876
x0=24.609535235904065;z0=4.657986721552554
y1=20.634495753814033;x1=15.238636966805249;z1=1.9504267868840823
sx=(x1-x0)/y1;sz=(z1-z0)/y1
for cutoff,constant,slope in [('MK',x0,sx-1),('ML',x0-z0,sx-1-sz)]:
    for target in (174.0,1000.0):
        y=(log(target/MZ)-constant)/slope;x=x0+sx*y;z=z0+sz*y
        mr=MZ*exp(x);mk=MZ*exp(x+y);ml=MZ*exp(x+y+z)
        print('HEAVY_BOUNDARY','Lambda='+cutoff,'targetMN',target,'corridorY',y,'MR',mr,'MK',mk,'ML',ml,'yNu',req(target))
