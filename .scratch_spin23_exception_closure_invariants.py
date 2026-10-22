from concurrent.futures import ProcessPoolExecutor
import importlib.util, json, sys


def load(path, name):
    spec = importlib.util.spec_from_file_location(name, path)
    module = importlib.util.module_from_spec(spec)
    sys.modules[name] = module
    spec.loader.exec_module(module)
    return module


c = load('.scratch_spin23_connectors.py', 'c')
s = load('.scratch_spin23_all_robust_supports_fast.py', 's')
e = load('.scratch_spin23_exception_stabilizer_extension_closure.py', 'e')
z = load('.scratch_spin23_vacuum_centralizer_repair.py', 'z')


def analyze(carrier):
    stationary, audit, parent, stabilizer, coefficients, closure, residual = e.construct(carrier)
    return {
        'lpair': carrier['lpair'],
        'rpair': carrier['rpair'],
        'dimension': len(closure),
        'invariants': z.algebra_invariants(closure),
    }


if __name__ == '__main__':
    carriers = [
        x for x in c.strong_carriers()
        if (s.tw(x['op'], 5), s.tw(x['op'], 10)) == (8, 4)
        and x['lpair'] == ((8, 10), (10, 1))
        and x['rpair'][1] == (7, 5)
        and x['rpair'][0][1] in (2, 7)
    ]
    with ProcessPoolExecutor(max_workers=2) as pool:
        rows = list(pool.map(analyze, carriers))
    print(json.dumps({'protocol': 'spin23-exception-closure-invariants/1', 'rows': rows}, indent=2, default=list))
