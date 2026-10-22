from fractions import Fraction as F


# (name, copies of left-handed Weyl irreps, dim_SU2, dim_SU3, Y, T2, T3, stage)
sectors = [
    ("down singlet pairs", 4, 1, 3, F(1, 3), F(0), F(1, 2), "MK"),
    ("up singlet pairs", 4, 1, 3, F(2, 3), F(0), F(1, 2), "MK"),
    ("quark doublet pair", 2, 2, 3, F(1, 6), F(1, 2), F(1, 2), "MK"),
    ("lepton doublet pairs", 4, 2, 1, F(1, 2), F(1, 2), F(0), "MR"),
]


def jump(row):
    _, n, d2, d3, y, t2, t3, _ = row
    return {
        "bY": F(2, 3) * n * d2 * d3 * y * y,
        "b2": F(2, 3) * n * d3 * t2,
        "b3": F(2, 3) * n * d2 * t3,
        "states": n * d2 * d3,
    }


def total(rows):
    out = {"bY": F(0), "b2": F(0), "b3": F(0), "states": 0}
    for row in rows:
        for key, value in jump(row).items():
            out[key] += value
    return out


colored = total([row for row in sectors if row[-1] == "MK"])
leptons = total([row for row in sectors if row[-1] == "MR"])
all_exotics = total(sectors)

assert colored == {"bY": F(14, 3), "b2": F(2), "b3": F(4), "states": 36}
assert leptons == {"bY": F(4, 3), "b2": F(4, 3), "b3": F(0), "states": 8}
assert all_exotics == {"bY": F(6), "b2": F(10, 3), "b3": F(4), "states": 44}
assert F(-7) + colored["b3"] == F(-3)  # v364 collapsed color beta

for row in sectors:
    print(row[0], jump(row))
print("colored@MK", colored)
print("leptons@MR", leptons)
print("all", all_exotics)
print("SM b3 + colored", F(-7) + colored["b3"])
