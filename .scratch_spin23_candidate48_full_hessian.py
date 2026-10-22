import importlib.util
import json
import sys


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


if __name__ == '__main__':
    carriers = [item for item in c.strong_carriers() if (s.tw(item['op'], 5), s.tw(item['op'], 10)) == (8, 4)]
    carrier = carriers[13]
    _, _, preserving, _, _, _, _, _, _ = g.generic_preserving_basis(carrier)
    weights = [0.05521353245782003, 0.0, 0.0, 0.007286467542179783, 0.0, 0.0, 0.03125000000000003]
    active = [(2, 9), (5, 10), (2, 6), (6, 7), (4, 8)]
    row = x.analyze(
        carrier,
        factor_builder=lambda _: [[generator] for generator in preserving],
        weights=weights,
        tangent_generators=preserving,
        random_kernel_samples=0,
        include_kernel_decomposition=False,
        active_labels=active,
    )
    keep = {
        'activeOrbits': active,
        'responseWeights': weights,
        'coordinateDimension': row['coordinateDimension'],
        'maximumAbsoluteGradientComponent': row['maximumAbsoluteGradientComponent'],
        'hessianMinimum': row['hessianMinimum'],
        'hessianMaximum': row['hessianMaximum'],
        'negativeEigenvalues': row['negativeEigenvalues'],
        'zeroEigenvalues': row['zeroEigenvalues'],
        'responseTangentRank': row['gaugeOrbitTangentRank'],
        'smallestEigenvalues': row['smallestEigenvalues'],
        'negativeModes': row['negativeModes'],
    }
    print(json.dumps({'protocol': 'spin23-candidate48-full-hessian/1', 'row': keep}, indent=2, default=list))
