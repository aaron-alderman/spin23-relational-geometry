const bag = (tokens) => [...Map.groupBy(tokens, (token) => token)]
  .map(([token, values]) => `${token}*${values.length}`).sort().join("|");
const windows = (word, width) => width > word.length ? [] : Array.from(
  { length: word.length - width + 1 }, (_, index) => word.slice(index, index + width),
);
const signature = (word, radius) => JSON.stringify({
  prefix: word.slice(0, radius),
  suffix: word.slice(-radius || word.length),
  decks: Array.from({ length: radius + 1 }, (_, index) => bag(windows(word, index + 1))),
});
const words = (length) => Array.from(
  { length: 2 ** length }, (_, value) => value.toString(2).padStart(length, "0"),
);
const partitionStats = (items, key) => {
  const groups = [...Map.groupBy(items, key).values()];
  return {
    distinct: groups.length,
    collisionGroups: groups.filter((group) => group.length > 1).length,
    collisionPairs: groups.reduce((sum, group) => sum + group.length * (group.length - 1) / 2, 0),
    largestFibre: Math.max(...groups.map((group) => group.length)),
    uniqueObjects: groups.filter((group) => group.length === 1).length,
  };
};

const lengths = [];
for (let length = 1; length <= 14; length += 1) {
  const corpus = words(length);
  const byLeafBag = partitionStats(corpus, (word) => [...word].filter((bit) => bit === "1").length);
  const radii = [];
  let injectiveRadius = null;
  for (let radius = 1; radius <= length; radius += 1) {
    const stats = partitionStats(corpus, (word) => signature(word, radius));
    radii.push({ radius, ...stats });
    if (stats.distinct === corpus.length) {
      injectiveRadius = radius;
      break;
    }
  }
  lengths.push({
    length,
    objects: corpus.length,
    D0: { distinct: 1, collisionGroups: 1, collisionPairs: corpus.length * (corpus.length - 1) / 2, largestFibre: corpus.length, uniqueObjects: corpus.length === 1 ? 1 : 0 },
    D1: byLeafBag,
    injectiveRadius,
    radii,
  });
}

export const result = {
  schema: "monster-lean-adaptive-depth-census/1",
  date: "2026-10-24",
  family: "all binary-labelled right-associated arrow types of lengths 1 through 14",
  totalObjectsAcrossLengths: lengths.reduce((sum, row) => sum + row.objects, 0),
  lengths,
};
if (import.meta.url === new URL(`file:///${process.argv[1].replaceAll("\\\\", "/")}`).href && process.argv.includes("--summary")) {
  console.log(JSON.stringify(result.lengths.map((row) => ({
    length: row.length,
    objects: row.objects,
    leafBagCollisionPairs: row.D1.collisionPairs,
    injectiveRadius: row.injectiveRadius,
    radiusCensus: row.radii.map(({ radius, distinct, collisionPairs, largestFibre, uniqueObjects }) => ({
      radius, distinct, collisionPairs, largestFibre, uniqueObjects,
    })),
  })), null, 2));
} else if (import.meta.url === new URL(`file:///${process.argv[1].replaceAll("\\\\", "/")}`).href) {
  console.log(JSON.stringify(result, null, 2));
}
