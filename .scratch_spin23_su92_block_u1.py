from math import gcd

blocks = {"g": (4, 0), "A": (2, 3), "B": (2, 3), "C": (3, -4)}
trace = sum(dim * charge for dim, charge in blocks.values())

print("PROTOCOL spin23-su92-block-u1/1")
print("TRACE", trace)
names = list(blocks)
for i, left in enumerate(names):
    for right in names[i + 1:]:
        multiplicity = 2 * blocks[left][0] * blocks[right][0]
        charge = blocks[left][1] - blocks[right][1]
        print("PAIR", left, right, "REAL_GENERATORS", multiplicity, "U1_CHARGE_PAIR", charge, -charge)
print("PASSED", trace == 0)
