import math

MBAR_GEV = 2.435323595526305e18
RAW_RATIO = 184.0
Y_MAX = 16.107786484028377
ML0_GEV = 468445499179697.0
DLOG_ML_DY = -0.3715670436187466 + 1.0 - 0.2891760904684926

def mlambda(y):
    return ML0_GEV * math.exp(DLOG_ML_DY * y)

def q(y):
    return (MBAR_GEV / mlambda(y)) ** 2

print("PROTOCOL spin23-trace-planck-stress/1")
for name, y in (("product", 0.0), ("collapsed", Y_MAX)):
    value = q(y)
    print(name, "MLambda", mlambda(y), "Q", value, "Q_over_184", value / RAW_RATIO)

formal_crossing_y = math.log(MBAR_GEV / (math.sqrt(RAW_RATIO) * ML0_GEV)) / DLOG_ML_DY
print("FORMAL_CROSSING_Y", formal_crossing_y)
print("CORRIDOR_CONTAINS_CROSSING", 0.0 <= formal_crossing_y <= Y_MAX)
print("PASSED", q(Y_MAX) > RAW_RATIO)
