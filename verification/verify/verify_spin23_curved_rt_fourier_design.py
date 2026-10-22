#!/usr/bin/env python3
"""Verify the Bianchi-compatible Fourier design for hRT3 and hRT5."""

from fractions import Fraction as F


N = 4
q = [F(1), F(0), F(0), F(0)]
r = [-x for x in q]


def torsion(labels):
    out = [[[F(0) for _ in range(N)] for _ in range(N)] for _ in range(N)]
    for label in labels:
        a, b, c = map(int, label)
        out[a][b][c] += 1
        out[c][b][a] -= 1
    return out


def response(frame_index):
    # The exponential coframe e=exp(f) gives metric perturbation h=2f.
    h = [[F(0) for _ in range(N)] for _ in range(N)]
    h[frame_index][frame_index] = 2
    trace_h = sum(h[a][a] for a in range(N))
    r2 = sum(x*x for x in r)
    ricci = [[F(0) for _ in range(N)] for _ in range(N)]
    for a in range(N):
        for b in range(N):
            ricci[a][b] = F(1,2) * (
                -sum(r[c]*r[a]*h[c][b] for c in range(N))
                -sum(r[c]*r[b]*h[c][a] for c in range(N))
                +r2*h[a][b] + r[a]*r[b]*trace_h
            )
    scalar = sum(ricci[a][a] for a in range(N))

    t = torsion(["011"])
    div1 = [[sum(q[m]*t[m][a][b] for m in range(N))
             for b in range(N)] for a in range(N)]
    hrt3 = sum(ricci[a][b]*div1[a][b] for a in range(N) for b in range(N))
    hrt5 = scalar*sum(div1[a][a] for a in range(N))
    return [hrt3, hrt5]


matrix = [response(1), response(2)]
assert matrix == [[F(1), F(2)], [F(0), F(2)]]
assert matrix[0][0]*matrix[1][1]-matrix[0][1]*matrix[1][0] == 2

# For measured pole amplitudes y_A,y_B (after dividing the common Fourier i),
# hRT3=y_A-y_B and hRT5=y_B/2.
for h3, h5 in ((F(7,3), F(-5,4)), (F(-2), F(9,7))):
    y_a = h3 + 2*h5
    y_b = 2*h5
    assert y_a-y_b == h3
    assert y_b/2 == h5

print("Spin(2,3) curved RT Fourier source design: PASS")
print("  response matrix: [[1,2],[0,2]]")
print("  determinant: 2")
print("  inverse: hRT3=yA-yB, hRT5=yB/2")
