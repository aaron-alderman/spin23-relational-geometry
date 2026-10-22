from collections import Counter
from concurrent.futures import ProcessPoolExecutor
import importlib.util, json, sys


def load(path, name):
    spec = importlib.util.spec_from_file_location(name, path)
    module = importlib.util.module_from_spec(spec)
    sys.modules[name] = module
    spec.loader.exec_module(module)
    return module


h = load('.scratch_spin23_all_robust_hessian_scan.py', 'h')
s = load('.scratch_spin23_all_robust_supports_fast.py', 's')
c = load('.scratch_spin23_connectors.py', 'c')


def labels(row, key):
    return tuple(str(x['label']) for x in row['classes'] if x[key] > 0)


if __name__ == '__main__':
    carriers = [
        x for x in c.strong_carriers()
        if (s.tw(x['op'], 5), s.tw(x['op'], 10)) == (8, 4)
    ]
    with ProcessPoolExecutor(max_workers=4) as pool:
        rows = list(pool.map(h.analyze, carriers))
    good = [row for row in rows if 'failure' not in row]
    compact = []
    for row in good:
        compact.append({
            'lpair': row['lpair'],
            'rpair': row['rpair'],
            'negativeLabels': labels(row, 'negative'),
            'zeroLabels': labels(row, 'zero'),
        })
    print(json.dumps({
        'protocol': 'spin23-all-robust-hessian-summary/1',
        'successful': len(good),
        'failures': dict(Counter(row.get('failure') for row in rows if 'failure' in row)),
        'negativeSetHistogram': {str(k): v for k, v in Counter(tuple(x['negativeLabels']) for x in compact).items()},
        'zeroSetHistogram': {str(k): v for k, v in Counter(tuple(x['zeroLabels']) for x in compact).items()},
        'rows': compact,
    }, indent=2, default=list))
