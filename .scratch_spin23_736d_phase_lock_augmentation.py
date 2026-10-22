exec(open('.scratch_spin23_736d_two_doublet_cycles.py', encoding='utf-8').read())

ranked=[]
for cycle, labels in both_all:
    if len(cycle)%2: continue
    extras=set(labels)-safe
    ranked.append((len(extras), len(cycle), tuple(sorted(extras)), cycle, labels))
ranked.sort(key=lambda row:(row[0],row[1],row[2]))
minimum=min(row[0] for row in ranked)
best=[row for row in ranked if row[0]==minimum]
print('PROTOCOL spin23-736d-phase-lock-augmentation/1')
print('MINIMUM_EXTRA_LABELS',minimum)
print('MINIMUM_CYCLE_LENGTH_AT_MINIMUM_EXTRAS',min(row[1] for row in best))
print('EXTRA_SET_HISTOGRAM_AT_MINIMUM')
from collections import Counter
print(Counter(row[2] for row in best).most_common(20))
print('BEST_WITNESSES')
for row in best[:20]: print(row)
print('PASSED',minimum>=1)
