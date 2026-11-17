"""Replay the exact, matched-source AdS tidal comparison using SymPy."""

import argparse
import json
from itertools import combinations, product
from pathlib import Path

from sympy import Matrix, Rational, eye, expand, simplify, solve, symbols, zeros


INDICES = range(4)
PAIRS = tuple(combinations(INDICES, 2))
RECORD = Path("evidence/data/ads-tidal-response-v1.json")


def clean(matrix):
    return matrix.applyfunc(simplify)


def curvature(connection, coordinates):
    return {
        (i, j): clean(
            connection[j].diff(coordinates[i]) - connection[i].diff(coordinates[j])
            + connection[i] * connection[j] - connection[j] * connection[i]
        )
        for i, j in PAIRS
    }


def component(two_form, i, j):
    if i == j:
        return zeros(4)
    if i < j:
        return two_form[i, j]
    return -two_form[j, i]


def tidal_tensor(two_form, metric, velocity, axes):
    along_detector = [
        clean(sum(
            (velocity[j] * component(two_form, i, j) for j in INDICES), zeros(4)
        ) * velocity)
        for i in INDICES
    ]
    return clean(Matrix([
        [(left.T * metric * Matrix.hstack(*along_detector) * right)[0] for right in axes]
        for left in axes
    ]))


def slab_fixture():
    u, v, x, z = coordinates = symbols("u v x z", real=True)
    ell = symbols("ell", positive=True)
    epsilon = symbols("epsilon", nonnegative=True)
    pulse = 64 * u**3 * (1 - u)**3
    # Work inside the pulse. Its value and first two derivatives match zero at the joins.
    for edge, order in product((0, 1), range(3)):
        assert pulse.diff(u, order).subs(u, edge) == 0

    # Solve the fixed null source with homogeneous Dirichlet metric data at both walls.
    a, b = symbols("a b")
    radial = z**2 + a * z**3 + b
    radial = expand(radial.subs(solve([radial.subs(z, wall) for wall in (1, 2)], (a, b))))
    assert simplify(radial.diff(z, 2) - 2 * radial.diff(z) / z) == -2
    assert all(radial.subs(z, wall) == 0 for wall in (1, 2))
    wave = epsilon * pulse * radial
    eta = Matrix([[0, -1, 0, 0], [-1, 0, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]])
    coframe = ell / z * Matrix([[1, 0, 0, 0], [-wave / 2, 1, 0, 0],
                                [0, 0, 1, 0], [0, 0, 0, 1]])
    return coordinates, ell, epsilon, pulse, radial, coframe, eta


def slab_connections(coordinates, coframe, eta):
    frame = clean(coframe.inv())
    metric = clean(coframe.T * eta * coframe)
    inverse = clean(metric.inv())
    derivatives = [metric.diff(q) for q in coordinates]
    levi_civita = [
        clean(inverse * Matrix(4, 4, lambda a, b:
              (derivatives[i][a, b] + derivatives[b][a, i] - derivatives[a][i, b]) / 2))
        for i in INDICES
    ]

    # Weitzenbock gauge and coincident gauge on the same coordinate slab.
    tegr = [clean(frame * coframe.diff(q)) for q in coordinates]
    stegr = [zeros(4) for _ in INDICES]
    flat_curvatures = [curvature(connection, coordinates) for connection in (tegr, stegr)]
    assert all(block == zeros(4) for tensors in flat_curvatures for block in tensors.values())
    assert all(clean(dg - gamma.T * metric - metric * gamma) == zeros(4)
               for dg, gamma in zip(derivatives, tegr))
    torsion = {
        (i, j): clean(metric * (tegr[i][:, j] - tegr[j][:, i]))
        for i, j in product(INDICES, repeat=2)
    }
    contortion = [
        clean(inverse * Matrix(4, 4, lambda a, b:
              (torsion[i, b][a] - torsion[b, a][i] + torsion[a, i][b]) / 2))
        for i in INDICES
    ]
    # Q_i = partial_i g in coincident gauge.
    disformation = [
        clean(inverse * Matrix(4, 4, lambda a, b:
              (derivatives[a][i, b] - derivatives[i][a, b] - derivatives[b][a, i]) / 2))
        for i in INDICES
    ]
    # Claim 1596 with a spinless source. Solve the algebraic Cartan torsion
    # equation using the torsion-free spin connection of the invertible coframe.
    omega = [clean((coframe * gamma - coframe.diff(q)) * frame)
             for q, gamma in zip(coordinates, levi_civita)]
    assert all(clean(w.T * eta + eta * w) == zeros(4) for w in omega)
    for i, j in PAIRS:
        assert clean(coframe[:, j].diff(coordinates[i]) - coframe[:, i].diff(coordinates[j])
                     + omega[i] * coframe[:, j] - omega[j] * coframe[:, i]) == zeros(4, 1)
    connections = {
        "GR": levi_civita,
        "TEGR": [clean(a - b) for a, b in zip(tegr, contortion)],
        "STEGR": [clean(a - b) for a, b in zip(stegr, disformation)],
        "minimal Spin(2,3)": [
            clean(frame * (coframe.diff(q) + w * coframe)) for q, w in zip(coordinates, omega)
        ],
    }
    return metric, connections, tegr, flat_curvatures, omega


def compare():
    coordinates, ell, epsilon, pulse, radial, coframe, eta = slab_fixture()
    u, _, _, z = coordinates
    wave = epsilon * pulse * radial
    frame = clean(coframe.inv())
    metric, connections, _, flat_curvatures, omega = slab_connections(coordinates, coframe, eta)
    inverse = clean(metric.inv())

    # The spinless null-dust equations are k^2=0 and divergence(rho*k)=0.
    null_covector = eye(4)[:, 0]
    null_vector = inverse * null_covector
    density = epsilon * pulse  # kappa times the physical null-dust density.
    volume = ell**4 / z**4
    assert (null_covector.T * null_vector)[0] == 0
    assert simplify(sum((volume * density * null_vector[i]).diff(q)
                        for i, q in enumerate(coordinates))) == 0

    riemann = {name: curvature(connections[name], coordinates)
               for name in ("GR", "TEGR", "STEGR")}
    gr_riemann = riemann["GR"]
    lorentz_curvature = curvature(omega, coordinates)
    shift = {
        (i, j): clean((coframe[:, i] * coframe[:, j].T - coframe[:, j] * coframe[:, i].T)
                      * eta / ell**2)
        for i, j in PAIRS
    }
    cartan_curvature = {pair: clean(lorentz_curvature[pair] + shift[pair]) for pair in PAIRS}
    assert all(clean(block.subs(epsilon, 0)) == zeros(4) for block in cartan_curvature.values())
    assert any(block != zeros(4) for block in cartan_curvature.values())
    riemann["minimal Spin(2,3)"] = {
        pair: clean(frame * (cartan_curvature[pair] - shift[pair]) * coframe) for pair in PAIRS
    }

    scale = z / ell
    velocity = scale * Matrix([1, (1 + wave) / 2, 0, 0])
    axes = [scale * eye(4)[:, 2], scale * eye(4)[:, 3],
            scale * Matrix([1, (wave - 1) / 2, 0, 0])]
    tetrad = Matrix.hstack(velocity, *axes)
    assert clean(tetrad.T * metric * tetrad) == Matrix.diag(-1, 1, 1, 1)
    sample = {u: Rational(1, 2), z: Rational(3, 2)}
    baseline = eye(3) / ell**2
    expected = Matrix.diag(9, 243, 0) * epsilon / (112 * ell**2)
    pulse_tide = z**2 / (2 * ell**2) * Matrix.diag(
        wave.diff(z) / z, wave.diff(z) / z - wave.diff(z, 2), 0
    )
    expected_stress = density * null_covector * null_covector.T
    results = {}
    for name, tensors in riemann.items():
        ricci = clean(Matrix(4, 4, lambda i, j:
                             sum(component(tensors, k, j)[k, i] for k in INDICES)))
        scalar = simplify((inverse * ricci).trace())
        residual = clean(ricci - metric * (scalar / 2 + 3 / ell**2) - expected_stress)
        assert residual == zeros(4), name
        tidal = tidal_tensor(tensors, metric, velocity, axes)
        assert clean(tidal.subs(epsilon, 0)) == baseline, name
        assert clean(tidal - baseline - pulse_tide) == zeros(3), name
        sample_tide = clean((tidal - baseline).subs(sample))
        assert sample_tide == expected, name
        assert all(clean(tensors[pair] - gr_riemann[pair]) == zeros(4) for pair in PAIRS), name
        results[name] = {
            "einsteinSourceResidualZero": True,
            "riemannTensorMatchesGR": True,
            "sampleTideInUnitsOfEpsilonOverEllSquared": [
                str(simplify(value * ell**2 / epsilon)) for value in sample_tide.diagonal()
            ],
        }

    trace_expected = simplify((velocity.T * expected_stress * velocity)[0].subs(sample))
    assert simplify(expected.trace() - trace_expected) == 0
    # Negative control: using the bare flat connection as the detector would
    # give a zero on/off difference even though the matched meter sees a tide.
    assert all(tidal_tensor(tensors, metric, velocity, axes) == zeros(3)
               for tensors in flat_curvatures)
    assert expected != zeros(3)
    return {
        "schemaVersion": "ads-tidal-response-v1",
        "evidenceFamily": "matched-ads-tidal-fixture",
        "source": "kappa T_uu = epsilon * 64*u^3*(1-u)^3 on 0<u<1; zero outside",
        "radialProfile": str(radial),
        "sample": {"u": "1/2", "z": "3/2", "axes": ["x", "z", "longitudinal"]},
        "readout": "R(E_i,U,E_j,U); relative-acceleration matrix is its negative",
        "vacuumTideInUnitsOfOneOverEllSquared": ["1", "1", "1"],
        "formulations": results,
        "checks": {
            "sourceConserved": True,
            "bothRadialMetricBoundaryValuesMatched": True,
            "traceMatchesRestFrameSource": True,
            "bareFlatConnectionMissesNonzeroOnOffResponse": True,
        },
        "verdict": {
            "exactMatchedBulkTidalResidualZero": True,
            "independentPhysicalMeasurement": False,
            "physicalAdmission": False,
            "boundaryChargeEquivalenceTested": False,
            "connectionSensitiveMatterTested": False,
        },
    }


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--write", action="store_true", help="Refresh the evidence record.")
    result = compare()
    if parser.parse_args().write:
        RECORD.write_text(json.dumps(result, indent=2) + "\n", encoding="utf-8")
    else:
        assert result == json.loads(RECORD.read_text(encoding="utf-8")), RECORD
    print(json.dumps(result, indent=2))
