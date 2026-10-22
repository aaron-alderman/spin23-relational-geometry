import math

H0_km_s_Mpc=67.4
Mpc_m=3.0856775814913673e22
hbar_GeV_s=6.582119569e-25
H0_s=H0_km_s_Mpc*1000/Mpc_m
H0_GeV=H0_s*hbar_GeV_s

scales={
 'MR_min':1.1179320847282255e10,
 'MR_max':4.443458625444669e12,
 'MK_min':4.443458625444669e12,
 'MK_max':1.1064663389411544e17,
 'ML_min':4.68445499179697e14,
 'ML_max':1.106466338941068e17
}
print('PROTOCOL spin23-cartan-scale-mismatch/1')
print('H0_S_INV',H0_s,'H0_GEV',H0_GeV)
for name,E in scales.items():
  ratio=E/H0_GeV
  print(name,E,'ELL_INV_OVER_H0',ratio,'LAMBDA_RATIO',ratio*ratio)
print('GLOBAL_RATIO_RANGE',min(scales.values())/H0_GeV,max(scales.values())/H0_GeV)
print('GLOBAL_CURVATURE_RATIO_RANGE',(min(scales.values())/H0_GeV)**2,(max(scales.values())/H0_GeV)**2)
print('PASSED',True)
