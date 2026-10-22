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
u = load('.scratch_spin23_u14_isotropic_kkt.py', 'u')


if __name__ == '__main__':
    carrier = next(
        item for item in c.strong_carriers()
        if (s.tw(item['op'], 5), s.tw(item['op'], 10)) == (8, 4)
        and item['lpair'] == ((8, 10), (10, 1))
        and item['rpair'] == ((10, 2), (7, 5))
    )
    _, _, preserving, _, _, _, _, _ = u.preserving_basis(carrier)
    scale = float(sys.argv[1]) if len(sys.argv) > 1 else 1.0
    samples = int(sys.argv[2]) if len(sys.argv) > 2 else 512
    weights = [scale * value for value in [0.0, 13.512637655080349, 0.0, 42.15686185546493]]
    row = x.analyze(
        carrier,
        factor_builder=lambda _: [[generator] for generator in preserving],
        weights=weights,
        tangent_generators=preserving,
        random_kernel_samples=samples,
        include_kernel_decomposition=True,
    )
    row['basisCaveat'] = 'Weights refer to an arbitrary orthonormal leakage-kernel eigenbasis.'
    row['rayScale'] = scale
    print(json.dumps({'protocol': 'spin23-u14-diagonal-complex-hessian/1', 'row': row}, indent=2, default=list))
