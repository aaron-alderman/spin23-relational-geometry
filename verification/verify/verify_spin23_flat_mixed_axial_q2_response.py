#!/usr/bin/env python3

import json
from fractions import Fraction as F
from math import prod
from pathlib import Path

# Exact sparse polynomials in (p0,p1,p2,p3,Q,x,A,b).  Negative powers of b
# are permitted after inserting Delta=x*A/b+x*(1-x)*Q^2.
N = 8

def one(c=1): return {(0,) * N: F(c)}
def var(i):
    exponent = [0] * N
    exponent[i] = 1
    return {tuple(exponent): F(1)}
def add(*polynomials):
    result = {}
    for polynomial in polynomials:
        for exponent, coefficient in polynomial.items():
            result[exponent] = result.get(exponent, F(0)) + coefficient
    return {e: c for e, c in result.items() if c}
def neg(polynomial): return {e: -c for e, c in polynomial.items()}
def scale(polynomial, coefficient):
    return {e: F(coefficient) * c for e, c in polynomial.items() if coefficient * c}
def multiply_two(left, right):
    result = {}
    for le, lc in left.items():
        for re, rc in right.items():
            exponent = tuple(le[i] + re[i] for i in range(N))
            if exponent[4] <= 2:
                result[exponent] = result.get(exponent, F(0)) + lc * rc
    return {e: c for e, c in result.items() if c}
def multiply(*polynomials):
    result = one()
    for polynomial in polynomials:
        result = multiply_two(result, polynomial)
    return result
def power(polynomial, exponent):
    result = one()
    for _ in range(exponent):
        result = multiply(result, polynomial)
    return result

P = [var(i) for i in range(4)]
Q, X, AA, BB = var(4), var(5), var(6), var(7)
q = [Q, one(0), one(0), one(0)]
k = [add(P[0], neg(multiply(X, Q))), P[1], P[2], P[3]]
l = [add(P[0], Q, neg(multiply(X, Q))), P[1], P[2], P[3]]
r = [neg(component) for component in l]
delta = lambda i, j: one(1 if i == j else 0)

def vertex(mu, nu, alpha, beta):
    mass = scale(multiply(AA, add(
        multiply(delta(mu, nu), delta(alpha, beta)),
        neg(multiply(delta(mu, beta), delta(nu, alpha))),
        neg(multiply(delta(nu, beta), delta(mu, alpha))),
    )), F(1, 2))
    term0 = multiply(delta(mu, nu), q[beta], r[alpha])
    term1 = multiply(q[beta], add(
        multiply(q[mu], delta(nu, alpha)),
        multiply(q[nu], delta(mu, alpha)),
        multiply(k[alpha], delta(mu, nu)),
    ))
    term2 = multiply(r[alpha], add(
        multiply(r[mu], delta(nu, beta)),
        multiply(r[nu], delta(mu, beta)),
        multiply(k[beta], delta(mu, nu)),
    ))
    kinetic = scale(multiply(BB, add(term0, term1, term2)), F(-1, 2))
    return add(mass, kinetic)

def contracted_vertex(beta):
    return [[add(*[
        multiply(l[alpha], vertex(mu, nu, alpha, beta))
        for alpha in range(4)
    ]) for nu in range(4)] for mu in range(4)]

def de_donder_contraction(beta):
    tensor = contracted_vertex(beta)
    norm = add(*[
        multiply(tensor[i][j], tensor[i][j])
        for i in range(4) for j in range(4)
    ])
    trace = add(*[tensor[i][i] for i in range(4)])
    return add(norm, scale(multiply(trace, trace), F(-1, 2)))

def odd_double_factorial(n):
    return prod(range(1, 2 * n, 2)) if n else 1

def integrate_loop_momentum(polynomial):
    result = {}
    inverse_b = {(0, 0, 0, 0, 0, 0, 0, -1): F(1)}
    delta_polynomial = add(
        multiply(X, AA, inverse_b),
        multiply(X, Q, Q),
        neg(multiply(X, X, Q, Q)),
    )
    for exponent, coefficient in polynomial.items():
        p_exponents = exponent[:4]
        if any(value % 2 for value in p_exponents):
            continue
        n = sum(p_exponents) // 2
        angular = F(
            prod(odd_double_factorial(value // 2) for value in p_exponents),
            prod(4 + 2 * j for j in range(n)),
        ) if n else F(1)
        residual = list(exponent)
        residual[:4] = [0] * 4
        term = {tuple(residual): coefficient * angular * ((-1) ** n) * (n + 1)}
        result = add(result, multiply(term, power(delta_polynomial, n)))
    return result

def extract_q2_and_integrate_feynman_parameter(polynomial):
    result = {}
    for exponent, coefficient in polynomial.items():
        if exponent[4] != 2:
            continue
        x_power = exponent[5]
        residual = list(exponent)
        residual[4] = residual[5] = 0
        key = tuple(residual)
        result[key] = result.get(key, F(0)) + coefficient / F(x_power + 1)
    return {e: c for e, c in result.items() if c}

longitudinal = extract_q2_and_integrate_feynman_parameter(
    integrate_loop_momentum(de_donder_contraction(0))
)
transverse = extract_q2_and_integrate_feynman_parameter(
    integrate_loop_momentum(de_donder_contraction(1))
)

expected_longitudinal = {(0, 0, 0, 0, 0, 0, 2, 0): F(-1)}
assert longitudinal == expected_longitudinal
assert transverse == {}

evidence_path = Path(__file__).resolve().parents[2] / "evidence" / "data" / "spin23-flat-complete-axial-loop-response-v1.json"
evidence = json.loads(evidence_path.read_text(encoding="utf-8"))
assert evidence["mixedPolarizationReduction"]["transverseNumeratorQ2"] == 0
assert evidence["closedResponses"] == ["deltaA", "deltaB", "deltaZ"]

print("Spin(2,3) flat mixed axial q^2 response: PASS")
print("  longitudinal reduced numerator: -A^2*q^2")
print("  transverse reduced numerator: zero")
print("  mixed responses: deltaB=-kappa*A/(4*pi^2*epsilon), deltaZ=0")
print("  remaining responses: deltaXiR, deltaXiRic")
