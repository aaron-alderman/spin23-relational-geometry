import math

K_BOUNDARY = 2.6328075675513523
Y_MAX = 16.107786484028377
SLOPE_Q = -2.0 * 0.3392568659127608
TARGET = 4.0 * math.pi * math.pi / 15.0

print("PROTOCOL spin23-heat-kernel-constant-scan/1")
print("K_BOUNDARY", K_BOUNDARY)
print("FOUR_PI2_OVER_15", TARGET)
print("RELATIVE_DIFFERENCE", (K_BOUNDARY - TARGET) / K_BOUNDARY)

# K(y)=K_boundary*exp(SLOPE_Q*(y-Y_MAX)).
y_target = Y_MAX + math.log(TARGET / K_BOUNDARY) / SLOPE_Q
z_slope = -0.2891760904684926
z_target = z_slope * (y_target - Y_MAX)
print("Y_TARGET", y_target)
print("Y_OVERSHOOT", y_target - Y_MAX)
print("FORMAL_Z", z_target)

hits = []
for numerator in range(1, 33):
    for denominator in range(1, 33):
        value = numerator * math.pi * math.pi / denominator
        rel = abs(value / K_BOUNDARY - 1.0)
        if rel < 0.01:
            hits.append((rel, numerator, denominator, value))
hits.sort()
print("SUBPERCENT_A_PI2_OVER_B_HITS", len(hits))
for row in hits[:12]:
    print("HIT", *row)
print("PASSED", TARGET < K_BOUNDARY and y_target > Y_MAX)
