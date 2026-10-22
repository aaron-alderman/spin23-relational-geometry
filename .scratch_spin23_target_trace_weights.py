from fractions import Fraction
import importlib.util

spec=importlib.util.spec_from_file_location('c','.scratch_spin23_connectors.py')
c=importlib.util.module_from_spec(spec);spec.loader.exec_module(c)
target=next(x for x in c.strong_carriers() if x['lpair']==((8,10),(10,1)) and x['rpair']==((10,2),(7,5)))
def weight(nodes):
    out=Fraction(0)
    for i,j in target['op']:
        if i in nodes:out+=Fraction(c.DIMS[j],2)
        if j in nodes:out+=Fraction(c.DIMS[i],2)
    return out
for name,nodes in [('A',c.A),('B',c.B),('Bp',{9}),('C',{5}),('Cp',{10})]:print(name,weight(nodes))
print(target['op'])
