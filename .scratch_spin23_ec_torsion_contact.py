import math

G_NEWTON_GEV_MINUS_2 = 6.70883e-39
KAPPA = 8.0 * math.pi * G_NEWTON_GEV_MINUS_2
C_AA = 3.0 * KAPPA / 16.0

SCALES_GEV = {
    "product_MR": 4443458625444.669,
    "product_MLambda": 468445499179697.0,
    "collapsed_MR": 11179320847.282255,
    "collapsed_MLambda": 110646633894115440.0,
    "reduced_Planck": 1.0 / math.sqrt(KAPPA),
}

print("PROTOCOL spin23-ec-torsion-contact/1")
print("KAPPA_GEV_MINUS_2", KAPPA)
print("C_AA_GEV_MINUS_2", C_AA)
for name, energy in SCALES_GEV.items():
    print(name, energy, C_AA * energy * energy)
print("PASSED", max(C_AA * e * e for n, e in SCALES_GEV.items() if n != "reduced_Planck") < 1.0)
