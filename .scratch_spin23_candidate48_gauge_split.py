import importlib.util
import json
import sys

import numpy as np


def load(path, name):
    spec = importlib.util.spec_from_file_location(name, path)
    module = importlib.util.module_from_spec(spec)
    sys.modules[name] = module
    spec.loader.exec_module(module)
    return module


c = load('.scratch_spin23_connectors.py', 'c')
s = load('.scratch_spin23_all_robust_supports_fast.py', 's')
x = load('.scratch_spin23_exception_factor_complex_hessian.py', 'x')
g = load('.scratch_spin23_candidate48_u14_kkt.py', 'g')
t = load('.scratch_spin23_u14_factor_tangent_hessian.py', 't')
a = load('.scratch_spin23_active23_scalar_module_audit.py', 'a')
f = load('.scratch_spin23_active23_first_shell_allgraph.py', 'f')


def admissible_factor_generators(carrier, labels):
    generators, _ = t.factor_lie_generators(carrier)
    fields, _ = f.build_fields(carrier, labels)
    field_data = [a.sparse_data(field) for field in fields]
    field_norms = np.array([np.vdot(field, field).real for field in fields])
    leakage = np.zeros((len(generators), len(generators)))
    for source_data in field_data:
        commutators = [a.commutator_with_sparse_field(generator, source_data) for generator in generators]
        overlaps = np.array([[a.sparse_inner(target, commutator) for target in field_data] for commutator in commutators])
        raw = np.array([[np.vdot(left, right).real for right in commutators] for left in commutators])
        leakage += raw - (overlaps / field_norms) @ overlaps.T
    values, vectors = np.linalg.eigh((leakage + leakage.T) / 2)
    tolerance = 1e-8 * max(1.0, float(values[-1]))
    admissible = [sum(vectors[i, j] * generators[i] for i in range(len(generators))) for j in np.where(values <= tolerance)[0]]
    return admissible, values


if __name__ == '__main__':
    carriers = [item for item in c.strong_carriers() if (s.tw(item['op'], 5), s.tw(item['op'], 10)) == (8, 4)]
    carrier = carriers[13]
    _, _, response, labels, _, _, _, _, _ = g.generic_preserving_basis(carrier)
    admissible, leakage_values = admissible_factor_generators(carrier, labels)
    weights = [0.05521353245782003, 0.0, 0.0, 0.007286467542179783, 0.0, 0.0, 0.03125000000000003]
    active = [(2, 9), (5, 10), (2, 6), (6, 7), (4, 8)]
    row = x.analyze(
        carrier,
        factor_builder=lambda _: [[generator] for generator in response],
        weights=weights,
        tangent_generators=admissible,
        random_kernel_samples=0,
        include_kernel_decomposition=False,
        active_labels=active,
        include_projector_decomposition=True,
        non_gauge_random_samples=0,
    )
    keep = {
        'fullFactorLieAlgebraDimension': 47,
        'admissibleTiedFactorAlgebraDimension': len(admissible),
        'leakageKernelSmallestEigenvalues': leakage_values[:min(20, len(leakage_values))].tolist(),
        'leakageFirstPositiveEigenvalue': float(leakage_values[len(admissible)]) if len(admissible) < len(leakage_values) else None,
        'hessianZeroEigenvalues': row['zeroEigenvalues'],
        'admissibleGaugeOrbitTangentRank': row['gaugeOrbitTangentRank'],
        'vacuumStabilizerDimension': row['vacuumStabilizerDimensionInsideClosure'],
        'nonGaugeKernelDimension': row['nonGaugeKernelDimension'],
        'maximumTangentProjectionResidual': row['maximumGaugeTangentProjectionResidual'],
        'hessianTimesTangentFrobeniusNorm': row['hessianTimesGaugeTangentFrobeniusNorm'],
        'minimumTangentToKernelPrincipalCosine': row['minimumGaugeTangentToKernelPrincipalCosine'],
        'kernelProjectorTraceByOrbit': row['kernelProjectorTraceByOrbit'],
        'kernelProjectorTraceByOrbitType': row['kernelProjectorTraceByOrbitType'],
        'gaugeProjectorTraceByOrbit': row['gaugeProjectorTraceByOrbit'],
        'nonGaugeProjectorTraceByOrbit': row['nonGaugeProjectorTraceByOrbit'],
        'nonGaugeProjectorTraceByOrbitType': row['nonGaugeProjectorTraceByOrbitType'],
        'phaseProbeLabels': row['phaseProbeLabels'],
        'phaseKernelProjectorGram': row['phaseKernelProjectorGram'],
        'phaseGaugeProjectorGram': row['phaseGaugeProjectorGram'],
        'phaseNonGaugeProjectorGram': row['phaseNonGaugeProjectorGram'],
        'twoSixTwoNinePhysicalDimension': row['twoSixTwoNinePhysicalDimension'],
        'twoSixTwoNinePhysicalBasis': row['twoSixTwoNinePhysicalBasis'],
    }
    print(json.dumps({'protocol': 'spin23-candidate48-gauge-split/1', 'row': keep}, indent=2))
