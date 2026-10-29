import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const input = JSON.parse(await readFile(resolve(root, "evidence/data/prophecy-element-catalogue-v1.json"), "utf8"));
const allowedCandidacy = new Set(Object.keys(input.candidacyScale));
const protestantCanon = [
  "Genesis", "Exodus", "Leviticus", "Numbers", "Deuteronomy", "Joshua", "Judges", "Ruth", "1 Samuel", "2 Samuel", "1 Kings", "2 Kings", "1 Chronicles", "2 Chronicles", "Ezra", "Nehemiah", "Esther", "Job", "Psalms", "Proverbs", "Ecclesiastes", "Song of Solomon", "Isaiah", "Jeremiah", "Lamentations", "Ezekiel", "Daniel", "Hosea", "Joel", "Amos", "Obadiah", "Jonah", "Micah", "Nahum", "Habakkuk", "Zephaniah", "Haggai", "Zechariah", "Malachi", "Matthew", "Mark", "Luke", "John", "Acts", "Romans", "1 Corinthians", "2 Corinthians", "Galatians", "Ephesians", "Philippians", "Colossians", "1 Thessalonians", "2 Thessalonians", "1 Timothy", "2 Timothy", "Titus", "Philemon", "Hebrews", "James", "1 Peter", "2 Peter", "1 John", "2 John", "3 John", "Jude", "Revelation"
];
const ids = new Set();
const errors = [];

for (const [index, record] of input.records.entries()) {
  if (ids.has(record.id)) errors.push(`duplicate id: ${record.id}`);
  ids.add(record.id);
  for (const field of ["id", "collection", "book", "passage", "element", "candidacy", "horizon", "conditionality"]) {
    if (!record[field]) errors.push(`record ${index} missing ${field}`);
  }
  if (!allowedCandidacy.has(record.candidacy)) errors.push(`record ${record.id} has invalid candidacy`);
  if (!Array.isArray(record.markers) || record.markers.length === 0) errors.push(`record ${record.id} has no markers`);
}

const countBy = (key) => Object.fromEntries([...new Set(input.records.map((record) => record[key]))].sort().map((value) => [
  value,
  input.records.filter((record) => record[key] === value).length
]));

const result = {
  protocol: input.protocol,
  generatedAt: input.date,
  recordCount: input.records.length,
  uniqueIdCount: ids.size,
  collectionCounts: countBy("collection"),
  candidacyCounts: countBy("candidacy"),
  bookCount: new Set(input.records.map((record) => record.book)).size,
  canonicalCoverage: protestantCanon.map((book) => {
    const recordCount = input.records.filter((record) => record.book === book).length;
    return {
      book,
      recordCount,
      status: recordCount > 0 ? "catalogued" : Object.hasOwn(input.zeroRecordCanonicalBooks, book) ? "reviewed-zero-record" : "unreviewed"
    };
  }),
  canonicalUnreviewedCount: protestantCanon.filter((book) => !input.records.some((record) => record.book === book) && !Object.hasOwn(input.zeroRecordCanonicalBooks, book)).length,
  validationErrors: errors,
  catalogueComplete: false,
  incompleteness: input.scope.excludedForNow,
  nextStep: "Expand book-by-book and decompose every compound record into agent/action/object/place/time/condition atoms before any fulfilment ranking."
};

if (process.argv.includes("--write")) {
  await writeFile(resolve(root, "evidence/data/prophecy-element-catalogue-v1-result.json"), `${JSON.stringify(result, null, 2)}\n`, "utf8");
}

console.log(JSON.stringify(result, null, 2));
if (errors.length) process.exitCode = 1;
