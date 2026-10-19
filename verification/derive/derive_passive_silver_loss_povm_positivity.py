"""Exact symbolic reduction of the passive silver-loss C3 POVM conditions.

This is a derivation aid.  The companion .mjs certificate evaluates the
resulting rational identities without requiring SymPy.
"""

import argparse

import sympy as s


p, q = s.symbols("p q", nonnegative=True)
t = s.sqrt(2)
r, h = 1 + t, t - 1


def parts(x, gamma):
    den = (x**2 + gamma**2) ** 2
    real = (
        x**4 * (1 - gamma**2) ** 2
        - gamma**2 * x**2 * (x**2 + 1) ** 2
    ) / den
    imag = -2 * gamma * x**3 * (1 - gamma**2) * (x**2 + 1) / den
    return s.cancel(real), s.cancel(imag)


# Use a common positive denominator from the start.  This avoids an enormous
# generic rational simplification and exposes the exact polynomial whose sign
# controls each POVM effect.
Da, Db = (p**2 + r**2) ** 2, (q**2 + h**2) ** 2
M = s.expand(Da * Db)
X = p**4 * (1 + r**2 * p**2) ** 2
Y = q**4 * (1 + h**2 * q**2) ** 2
U = p**2 * q**2 * (
    (1 - p**2) ** 2 * (1 - q**2) ** 2
    - 16 * p * q * (1 + p**2) * (1 + q**2)
)
V = 4 * p**2 * q**2 * (
    q * (1 - p**2) ** 2 * (1 + q**2)
    + p * (1 + p**2) * (1 - q**2) ** 2
)
xM, yM = s.expand(X * Db), s.expand(Y * Da)

N_p0a = s.expand(4 * M - xM + 3 * yM + 6 * U)
N_p0d = s.expand(4 * M + 3 * xM - yM + 6 * U)
N_1mp0a = s.expand(8 * M + xM - 3 * yM - 6 * U)
N_1mp0d = s.expand(8 * M - 3 * xM + yM - 6 * U)
N_det1 = s.expand(
    N_1mp0a * N_1mp0d
    - 9 * (-xM - yM + 2 * U) ** 2
    - 144 * V**2
)


expressions = {
    "p0a": (N_p0a, 12 * M),
    "p0d": (N_p0d, 12 * M),
    "1-p0a": (N_1mp0a, 12 * M),
    "1-p0d": (N_1mp0d, 12 * M),
    "detP1": (N_det1, 576 * M**2),
}

parser = argparse.ArgumentParser()
parser.add_argument("--factor", action="store_true")
parser.add_argument("--bernstein", action="store_true")
args = parser.parse_args()


def bernstein_coefficients(poly):
    """Power-to-Bernstein conversion on [0,1]^2 at the full bidegree."""
    m, n = poly.degree_list()
    power = poly.as_dict()
    result = []
    for i in range(m + 1):
        for j in range(n + 1):
            value = s.S.Zero
            for k in range(i + 1):
                for ell in range(j + 1):
                    value += (
                        power.get((k, ell), s.S.Zero)
                        * s.binomial(i, k) / s.binomial(m, k)
                        * s.binomial(j, ell) / s.binomial(n, ell)
                    )
            result.append(s.simplify(value))
    return result

for name, (numerator, denominator) in expressions.items():
    print(name)
    poly = s.Poly(numerator, p, q, extension=t)
    print("  degree:", poly.degree_list(), "terms:", len(poly.terms()))
    print("  denominator:", s.factor(denominator, extension=t))
    if args.bernstein:
        coefficients = bernstein_coefficients(poly)
        numeric = [float(s.N(value, 17)) for value in coefficients]
        exact_signs = [s.sign(value) for value in coefficients]
        assert all(sign in (s.S.Zero, s.S.One) for sign in exact_signs)
        width = poly.degree(q) + 1
        zero_indices = [divmod(index, width) for index, sign in enumerate(exact_signs) if sign == 0]
        print(
            "  Bernstein:",
            "count=", len(coefficients),
            "exact_nonnegative=", True,
            "zero_indices=", zero_indices,
            "minimum=", min(numeric),
        )
    if args.factor:
        print("  numerator:", s.factor(numerator, extension=t))
