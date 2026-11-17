"""Replay the matched Dirichlet charges of the exact AdS tidal fixture."""

import argparse
import json
import sys
from pathlib import Path

from sympy import Matrix, Rational, eye, integrate, simplify, sqrt, symbols, zeros

sys.dont_write_bytecode = True
from verify_ads_tidal_response import clean, slab_connections, slab_fixture


RECORD = Path("evidence/data/ads-boundary-charges-v1.json")


def compare():
    coordinates, ell, epsilon, pulse, radial, coframe, eta = slab_fixture()
    u, _, _, z = coordinates
    kappa = symbols("kappa", positive=True)
    metric, connections, tegr, _, _ = slab_connections(coordinates, coframe, eta)
    inverse = clean(metric.inv())
    tangent = metric[:3, :3]
    coordinate_time = Matrix([1, 1, 0]) / sqrt(2)
    translations = {
        "partial_t": coordinate_time,
        "partial_y": Matrix([-1, 1, 0]) / sqrt(2),
        "partial_x": eye(3)[:, 2],
        "partial_v": eye(3)[:, 1],
    }
    assert integrate(pulse, (u, 0, 1)) == Rational(16, 35)

    # T_z = T^a{}_{za}; Q_z and Qtilde_z in coincident gauge.
    torsion_trace_z = simplify(sum(tegr[3][i, i] - tegr[i][i, 3] for i in range(4)))
    q_trace_z = simplify((inverse * metric.diff(z)).trace())
    q_second_trace_z = simplify(sum(
        inverse[i, j] * metric[i, 3].diff(coordinates[j]) for i in range(4) for j in range(4)
    ))
    expected = {1: ("5/14", "5/28"), 2: ("2/7", "1/14")}
    charge_scale = sqrt(2) * ell**2 * epsilon / kappa
    results = {}
    two_wall_densities = []
    two_wall_energies = []
    for name, connection in connections.items():
        walls = {}
        energies = []
        energy_densities = []
        for wall, outward in ((1, -1), (2, 1)):
            normal_z = outward * ell / z
            normal_up_z = simplify(inverse[3, 3] * normal_z)
            extrinsic = Matrix(3, 3, lambda a, b: -normal_z * connection[a][3, b])
            trace = simplify((inverse[:3, :3] * extrinsic).trace())
            assert clean(extrinsic - normal_up_z * tangent.diff(z) / 2) == zeros(3)
            assert trace == -3 * outward / ell
            if name == "TEGR":
                assert simplify(trace - normal_up_z * torsion_trace_z) == 0
            if name == "STEGR":
                assert simplify(2 * trace - normal_up_z * (q_trace_z - q_second_trace_z)) == 0

            stress = clean((trace * tangent - extrinsic).subs(z, wall) / kappa)
            wall_metric = clean(tangent.subs(z, wall))
            assert wall_metric == wall_metric.subs(epsilon, 0)
            delta = clean(stress - stress.subs(epsilon, 0))
            coefficient = simplify(delta[0, 0] / (ell * epsilon * pulse / kappa))
            assert delta == delta[0, 0] * eye(3)[:, 0] * eye(3)[0, :]
            mixed = clean(wall_metric.inv() * delta)
            assert mixed.trace() == 0
            assert all(simplify(sum(mixed[a, b].diff(coordinates[a]) for a in range(3))) == 0
                       for b in range(3))
            # The conjugate stress is nonzero even though a variation of h_uu misses it.
            raised = clean(mixed * wall_metric.inv())
            assert raised[0, 0] == 0 and raised[1, 1] != 0

            observer = wall / ell * coordinate_time
            assert simplify((observer.T * wall_metric * observer)[0]) == -1
            densities = {
                label: simplify((ell / wall)**2 * (observer.T * delta * xi)[0])
                for label, xi in translations.items()
            }
            energy_coefficient = simplify(densities["partial_t"] / (ell**2 * epsilon * pulse / kappa))
            assert (str(coefficient), str(energy_coefficient)) == expected[wall]
            assert simplify(densities["partial_t"] + densities["partial_y"]) == 0
            assert densities["partial_x"] == densities["partial_v"] == 0
            energy_densities.append(densities["partial_t"])
            # At fixed t, the positive integration measure is |dy| = sqrt(2) |du|.
            integrated = {label: simplify(sqrt(2) * integrate(value, (u, 0, 1)))
                          for label, value in densities.items()}
            energies.append(integrated["partial_t"])
            walls[str(wall)] = {
                "deltaStressUUInUnitsOfEllEpsilonPulseOverKappa": str(coefficient),
                "translationChargesPerCoordinateXInUnitsOfSqrt2EllSquaredEpsilonOverKappa": {
                    label: str(simplify(value / charge_scale)) for label, value in integrated.items()
                },
            }
        results[name] = walls
        two_wall_densities.append(sum(energy_densities))
        two_wall_energies.append(sum(energies))
    assert all(walls == results["GR"] for walls in results.values())

    # A separate balance check integrates the conserved dust current on the same cut.
    assert simplify(radial - (z - 1) * (2 - z) * (3 * z + 2) / 7) == 0
    null = eye(4)[:, 0]
    matter = epsilon * pulse / kappa * null * null.T
    xi_t = Matrix([1, 1, 0, 0]) / sqrt(2)
    current = clean(-inverse * matter * xi_t)
    volume = ell**4 / z**4
    assert current[3] == 0
    assert simplify(sum((volume * current[a]).diff(q) for a, q in enumerate(coordinates))) == 0
    assert simplify((xi_t.T * inverse * xi_t)[0] + z**2 / ell**2 * (1 + epsilon * pulse * radial / 2)) == 0
    bulk_density = simplify(volume * (xi_t.T * current)[0])
    radial_integral = integrate(bulk_density, (z, 1, 2))
    assert all(simplify(density - radial_integral) == 0 for density in two_wall_densities)
    bulk_energy = simplify(sqrt(2) * integrate(radial_integral, (u, 0, 1)))
    assert all(simplify(energy - bulk_energy) == 0 for energy in two_wall_energies)
    total = simplify(bulk_energy / charge_scale)
    assert total == Rational(4, 35)
    return {
        "schemaVersion": "ads-boundary-charges-v1",
        "evidenceFamily": "matched-ads-tidal-fixture",
        "ensemble": "matched metric Dirichlet action, vacuum subtraction on each timelike wall",
        "sourceRecord": "evidence/data/ads-tidal-response-v1.json",
        "chargeConvention": "integral of future wall observer contracted into delta stress and coordinate generator",
        "formulations": results,
        "twoWallEnergyPerCoordinateXInUnitsOfSqrt2EllSquaredEpsilonOverKappa": str(total),
        "checks": {
            "teleparallelFluxesCancelGHYInSlabGauge": True,
            "wallStressTracelessAndConserved": True,
            "restrictedUUVariationMissesNullStress": True,
            "twoWallEnergyEqualsIntegratedDustCurrent": True,
        },
        "verdict": {
            "exactMatchedDirichletWallChargeResidualZero": True,
            "eachWallHasNonzeroVacuumSubtractedEnergyForPositivePulse": True,
            "independentConnectionOrFrameChargesCompared": False,
            "independentPhysicalMeasurement": False,
            "physicalAdmission": False,
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
