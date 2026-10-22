from collections import Counter
from concurrent.futures import ProcessPoolExecutor
from fractions import Fraction
from itertools import combinations
import importlib.util, json, sys


def load(path, name):
    spec = importlib.util.spec_from_file_location(name, path)
    module = importlib.util.module_from_spec(spec)
    sys.modules[name] = module
    spec.loader.exec_module(module)
    return module


c = load('.scratch_spin23_connectors.py', 'c')
s = load('.scratch_spin23_all_robust_supports_fast.py', 's')
h = load('.scratch_spin23_all_robust_hessian_scan.py', 'h')
f = load('.scratch_spin23_ab_lie_closure_family.py', 'f')
IDEALS = ('SO8', 'SO10', 'SO4')


def key(row):
    return (tuple(map(tuple, row['lpair'])), tuple(map(tuple, row['rpair'])))


def nonpositive_labels(row):
    return {
        str(item['label']) for item in row['classes']
        if item['negative'] > 0 or item['zero'] > 0
    }


def covers(labels, incidence, subset):
    indices = [IDEALS.index(name) for name in subset]
    return all(any(incidence.get(label, (False, False, False))[i] for i in indices) for label in labels)


if __name__ == '__main__':
    carriers = [
        x for x in c.strong_carriers()
        if (s.tw(x['op'], 5), s.tw(x['op'], 10)) == (8, 4)
    ]
    factor_rows = [f.audit(carrier) for carrier in carriers]
    with ProcessPoolExecutor(max_workers=4) as pool:
        hessian_rows = list(pool.map(h.analyze, carriers))
    factors = {key(row): row for row in factor_rows}
    good = [row for row in hessian_rows if 'failure' not in row]
    subsets = [x for n in (1, 2, 3) for x in combinations(IDEALS, n)]
    coverage = Counter()
    minimal_histogram = Counter()
    carrier_results = []
    for row in good:
        labels = nonpositive_labels(row)
        incidence = factors[key(row)]['incidence']
        valid = [subset for subset in subsets if covers(labels, incidence, subset)]
        for subset in valid:
            coverage[subset] += 1
        nmin = min(map(len, valid)) if valid else None
        minimal = [subset for subset in valid if len(subset) == nmin]
        minimal_histogram[tuple(minimal)] += 1
        carrier_results.append({
            'lpair': row['lpair'],
            'rpair': row['rpair'],
            'nonpositiveLabels': sorted(labels),
            'minimalIdealCovers': minimal,
        })
    g8 = [Fraction(str(row['weights']['(4, 8)'][0])).limit_denominator(1000) for row in factor_rows]
    min_g8 = min(g8)
    print(json.dumps({
        'protocol': 'spin23-ideal-cover-family/1',
        'admissibleCarriers': len(good),
        'coverageCounts': {str(k): v for k, v in coverage.items()},
        'minimalCoverHistogram': {str(k): v for k, v in minimal_histogram.items()},
        'universalCovers': [subset for subset in subsets if coverage[subset] == len(good)],
        'gSO8WeightMinimumAll44': str(min_g8),
        'gOnlySO8CoefficientBound': str(Fraction(9, 25) / min_g8),
        'rows': carrier_results,
    }, indent=2, default=list))
