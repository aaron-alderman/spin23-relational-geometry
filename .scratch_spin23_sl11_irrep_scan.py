from fractions import Fraction

N = 11
MAX_BOXES = 30
TARGETS = {736, 4 * 736}

def partitions(total, maximum=None, prefix=()):
    if total == 0:
        yield prefix
        return
    if maximum is None or maximum > total:
        maximum = total
    for first in range(maximum, 0, -1):
        if len(prefix) >= N - 1:
            break
        yield from partitions(total - first, first, prefix + (first,))

def su_dimension(shape):
    result = Fraction(1, 1)
    for i, row_len in enumerate(shape):
        for j in range(row_len):
            below = sum(1 for lower in shape[i + 1:] if lower > j)
            hook = row_len - j + below
            result *= Fraction(N + j - i, hook)
    assert result.denominator == 1
    return result.numerator

hits = []
nearest = {target: [] for target in TARGETS}
scanned = 0
for boxes in range(1, MAX_BOXES + 1):
    for shape in partitions(boxes):
        scanned += 1
        dim = su_dimension(shape)
        if dim in TARGETS:
            hits.append((boxes, shape, dim))
        for target in TARGETS:
            nearest[target].append((abs(dim - target), dim, boxes, shape))

print("PROTOCOL spin23-sl11-irrep-scan/1")
print("MAX_BOXES", MAX_BOXES)
print("SCANNED", scanned)
print("EXACT_HITS", hits)
for target in sorted(TARGETS):
    rows = sorted(set(nearest[target]))[:12]
    print("NEAREST", target)
    for row in rows:
        print(row)
print("PASSED", True)

# Exhaustive Dynkin-label scan for every canonical SU(11) irrep of dimension
# at most 4000. Weyl dimension is monotone in every nonnegative label, so a
# branch can be pruned as soon as its partial assignment exceeds the bound.
MAX_DIMENSION = 4000

def dynkin_dimension(labels):
    result = Fraction(1, 1)
    for i in range(N - 1):
        running = 0
        for j in range(i + 1, N):
            running += labels[j - 1]
            result *= Fraction(running + j - i, j - i)
    assert result.denominator == 1
    return result.numerator

bounded = []

def scan_labels(prefix):
    if len(prefix) == N - 1:
        dim = dynkin_dimension(prefix)
        if dim <= MAX_DIMENSION:
            bounded.append((dim, tuple(prefix)))
        return
    value = 0
    while True:
        trial = prefix + [value] + [0] * (N - 2 - len(prefix))
        if dynkin_dimension(trial) > MAX_DIMENSION:
            break
        scan_labels(prefix + [value])
        value += 1

scan_labels([])
bounded_unique = sorted(set(bounded))
print("BOUNDED_MAX_DIMENSION", MAX_DIMENSION)
print("BOUNDED_IRREPS", len(bounded_unique))
print("BOUNDED_EXACT_HITS", [row for row in bounded_unique if row[0] in TARGETS])
for target in sorted(TARGETS):
    print("BOUNDED_NEAREST", target)
    for dim, labels in sorted(bounded_unique, key=lambda row: abs(row[0] - target))[:12]:
        print(abs(dim - target), dim, labels)

unique_dims = sorted({dim for dim, labels in bounded_unique if dim > 1})
print("UNIQUE_NONTRIVIAL_DIMS_LE_736", [d for d in unique_dims if d <= 736])

def minimum_sum(target):
    best = [None] * (target + 1)
    best[0] = []
    for total in range(1, target + 1):
        candidates = []
        for dim in unique_dims:
            if dim > total:
                break
            if best[total - dim] is not None:
                candidates.append(best[total - dim] + [dim])
        if candidates:
            best[total] = min(candidates, key=lambda row: (len(row), row))
    return best[target]

for target in sorted(TARGETS):
    print("MINIMUM_REDUCIBLE_SUM", target, minimum_sum(target))
