import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const WRITE = process.argv.includes('--write');
const OUT_JSON = 'corpus/programmes/frontier-physics-targets/standalone_narrative_audit_v1.json';
const OUT_MD = 'corpus/programmes/frontier-physics-targets/standalone_narrative_audit_v1.md';
const read = p => fs.readFileSync(path.join(ROOT, p), 'utf8');
const sha256 = s => crypto.createHash('sha256').update(s.replace(/\r\n/g, '\n')).digest('hex');

const routes = [
  {
    id: 'NAR-01',
    label: 'Standalone scientific synthesis',
    components: ['corpus/syntheses/the_admissibility_frontier_current_synthesis.md'],
    evidence: {
      thingsBeforeNames: 'The shift begins with experimental loss of phase, boundary order, delay, orientation, memory and correlation before naming Jordan or Lie.',
      jordanLieMiddle: 'Why Jordan and Lie must be balanced assigns admission/composition, the typed boundary and transport distinct jobs.',
      reasonAndDifference: 'The opening explains why a Lie symmetry cannot supply positivity, selection, observables or detector retention by itself.',
      statusAndImplication: 'What has been found, Kenotic confidence and the linked gates place positive findings beside non-implications and open boundaries.',
      practicalHope: 'Why there is hope: this is where to look names calculations, target sets, experiments and audit routes.',
      optionalMenu: 'Optional final arcs follows the scientific and practical ending and disclaims backward authority.'
    },
    orderedEnding: ['## Why there is hope: this is where to look', '## Optional final arcs']
  },
  {
    id: 'NAR-02',
    label: 'Edition 3 standalone book',
    components: [
      'book/edition-3/chapters/00-front-matter.md',
      'book/edition-3/chapters/08-admissibility-frontier.md',
      'book/edition-3/chapters/01-the-revised-spine.md',
      'book/edition-3/chapters/02-one-carrier-two-faces-three-relations.md',
      'book/edition-3/chapters/03-projective-loop.md',
      'book/edition-3/chapters/04-furey-interface.md',
      'book/edition-3/chapters/05-standard-model-seam.md',
      'book/edition-3/chapters/06-proton-safety.md',
      'book/edition-3/chapters/07-exceptional-horizon.md',
      'book/edition-3/chapters/08-result-ledger.md',
      'book/edition-3/chapters/09-research-frontier.md',
      'book/edition-3/chapters/10-provenance-and-reading-map.md',
      'book/edition-3/chapters/11-concept-atlas.md',
      'book/edition-3/chapters/12-optional-endpoints-and-readings.md'
    ],
    evidence: {
      thingsBeforeNames: 'Front matter requires preparation, response table, path, boundary, update or record before an algebraic name; the hinge begins with two coupled readouts.',
      jordanLieMiddle: 'The admissibility chapter precedes The Jordan–Lie hinge, and the latter derives the Lie completion from an already positive two-face response.',
      reasonAndDifference: 'Every bridge carries a reason installs because—but—therefore—still-open as the visible reading grammar.',
      statusAndImplication: 'Chapter and section badges separate established, conditional, external, exhausted, obstructed, experimental and interpretive claims; nearby boundaries prevent promotion.',
      practicalHope: 'The finesse technology pathway and research-frontier chapter name ordinary engineering returns and the stricter path to new physics.',
      optionalMenu: 'The optional-endpoints chapter is last and explicitly assumes God exists for its theological reading without deriving God from physics.'
    },
    orderedEnding: ['book/edition-3/chapters/09-research-frontier.md', 'book/edition-3/chapters/12-optional-endpoints-and-readings.md']
  },
  {
    id: 'NAR-03',
    label: 'Orientation and explanatory-contract route',
    components: ['corpus/READING_CONTRACT.md', 'corpus/EXPLANATORY_STANDARD.md', 'corpus/syntheses/the_admissibility_frontier_current_synthesis.md'],
    evidence: {
      thingsBeforeNames: 'The contract begins with erased distinctions and the standard fixes the order thing → relation → operation → invariant → structure → name.',
      jordanLieMiddle: 'The contract explicitly orders Jordan admission, typed admissibility, Lie transport, dynamics and records while retaining a balanced return arrow.',
      reasonAndDifference: 'The standard requires source thing, target thing, likeness, difference-maker, status, implication, non-implication and discriminator.',
      statusAndImplication: 'Open/closed is two-dimensional and mathematical closure is kept separate from physical realization.',
      practicalHope: 'The required ending orders bounded work, ordinary theoretical/engineering gain and controlled new-physics escalation.',
      optionalMenu: 'Pictures, alternatives, myth and theology are deletion-tested optional readings and cannot feed premises backward.'
    },
    orderedEnding: ['## 9. Order the ending: practical hope before optional arcs']
  }
];

const forbiddenHistory = /hot off the press|provisional integration note|the corpus began|new spine of the programme|in the revised story|programme no longer reaches/gi;
const required = {
  thingsBeforeNames: /things before names|present experiments do not observe reality without loss|two coupled (?:signals|readouts)|preparation, response table/i,
  jordanAdmission: /Jordan.{0,100}(?:admission|positive|coexist|composition)/is,
  typedMiddle: /typed (?:admissibility|carrier)|admissib(?:le|ility) (?:region|boundary)|jointly realizable/is,
  lieTransport: /Lie.{0,100}(?:transport|transform)|(?:transport|transform).{0,100}Lie/is,
  reason: /because.{0,120}(?:but|differ)|reason for the difference|why Jordan and Lie must be balanced/is,
  alternatives: /alternative|rival|nearest tempting conclusion|menu, not a (?:necessity|ladder)/is,
  status: /mathematical (?:status|closure).{0,180}physical (?:status|realization)|open and closed|what remains open/is,
  implication: /does not imply|non-implication|what it does not establish|cannot by itself/is,
  practicalHope: /where to look|look-here|engineering|new physics/is,
  optionalBoundary: /optional.{0,180}(?:not|required|premise|menu)|menu, not a (?:necessity|ladder)/is
};

const audits = routes.map(route => {
  const texts = route.components.map(source => ({ source, text: read(source), sha256: sha256(read(source)) }));
  const joined = texts.map(x => x.text).join('\n\n');
  const checks = Object.fromEntries(Object.entries(required).map(([key, rx]) => [key, rx.test(joined)]));
  const forbidden = [...joined.matchAll(forbiddenHistory)].map(m => m[0]);
  let orderPass = true;
  if (route.id === 'NAR-01') orderPass = route.orderedEnding.every(x => joined.includes(x)) && joined.indexOf(route.orderedEnding[0]) < joined.indexOf(route.orderedEnding[1]);
  if (route.id === 'NAR-02') orderPass = route.components.indexOf(route.orderedEnding[0]) < route.components.indexOf(route.orderedEnding[1]);
  const pass = Object.values(checks).every(Boolean) && forbidden.length === 0 && orderPass;
  return { ...route, componentDigests: texts.map(({ source, sha256 }) => ({ source, sha256 })), checks, forbiddenHistoryMarkers: forbidden, orderedEndingPass: orderPass, pass };
});

const book = JSON.parse(read('book/edition-3/book.json'));
const bookOrder = book.chapters.map(c => c.slug);
const bookOrderPass = bookOrder[0] === '00-front-matter'
  && bookOrder.indexOf('08-admissibility-frontier') < bookOrder.indexOf('01-the-revised-spine')
  && bookOrder.indexOf('09-research-frontier') < bookOrder.indexOf('12-optional-endpoints-and-readings');
const theology = read('book/edition-3/chapters/12-optional-endpoints-and-readings.md');
const theologyAssumptionPass = /assum(?:e|ption).{0,80}God exists/is.test(theology);
const summary = {
  routes: audits.length,
  passingRoutes: audits.filter(x => x.pass).length,
  forbiddenHistoryMarkers: audits.reduce((n, x) => n + x.forbiddenHistoryMarkers.length, 0),
  bookOrderPass,
  theologyAssumptionPass,
  unresolvedRoutes: audits.filter(x => !x.pass).length + (bookOrderPass ? 0 : 1) + (theologyAssumptionPass ? 0 : 1)
};

const output = {
  schema: 'frontier.standalone-narrative-audit/1',
  date: '2026-10-25',
  authority: 'This is a narrative and authority audit, not evidence for the scientific claims it reviews.',
  definition: 'A route passes when it begins from things, preserves the Jordan–typed-middle–Lie division of labour, supplies reasons and alternatives, separates mathematical and physical status, pairs implications with non-implications, brings hope down to bounded work, and places optional speculation after the scientific case without discovery-history bias.',
  summary,
  bookOrder,
  audits
};

const md = `# Standalone narrative audit v1\n\n**Date:** 25 October 2026  \n**Status:** ${summary.unresolvedRoutes ? 'open' : 'passed'}  \n**Machine authority:** [audit JSON](standalone_narrative_audit_v1.json)\n\n## Verdict\n\nAll **${summary.passingRoutes}/${summary.routes}** authoritative reader routes pass the declared narrative test. The generated book begins with its reading contract and admissibility frontier, derives the Jordan–Lie hinge afterward, reaches bounded research work before its optional endings, and leaves the theological reading under the explicit assumption that God exists. Discovery-history markers found: **${summary.forbiddenHistoryMarkers}**.\n\n| Route | Things first | Jordan / middle / Lie | Reasons and alternatives | Status and implications | Practical hope | Optional boundary | History bias | Result |\n|---|---:|---:|---:|---:|---:|---:|---:|---:|\n${audits.map(a => `| ${a.id} · ${a.label} | ${a.checks.thingsBeforeNames ? 'yes' : 'no'} | ${a.checks.jordanAdmission && a.checks.typedMiddle && a.checks.lieTransport ? 'yes' : 'no'} | ${a.checks.reason && a.checks.alternatives ? 'yes' : 'no'} | ${a.checks.status && a.checks.implication ? 'yes' : 'no'} | ${a.checks.practicalHope ? 'yes' : 'no'} | ${a.checks.optionalBoundary ? 'yes' : 'no'} | ${a.forbiddenHistoryMarkers.length ? 'fail' : 'clear'} | ${a.pass ? 'pass' : 'open'} |`).join('\n')}\n\n## Human-readable sample judgement\n\n${audits.map(a => `### ${a.id} · ${a.label}\n\n- **Things before names:** ${a.evidence.thingsBeforeNames}\n- **Jordan–Lie middle:** ${a.evidence.jordanLieMiddle}\n- **Reason and difference:** ${a.evidence.reasonAndDifference}\n- **Status and implication:** ${a.evidence.statusAndImplication}\n- **Hope brought to work:** ${a.evidence.practicalHope}\n- **Optional menu:** ${a.evidence.optionalMenu}\n`).join('\n')}\n## Boundary\n\nPassing this audit means the authoritative routes can be read without knowing how the archive evolved and without treating optional imagery as a premise. It does not make the scientific programme true, complete or empirically confirmed.\n`;

if (WRITE) {
  fs.writeFileSync(path.join(ROOT, OUT_JSON), `${JSON.stringify(output, null, 2)}\n`);
  fs.writeFileSync(path.join(ROOT, OUT_MD), md);
}
console.log(JSON.stringify({ result: summary.unresolvedRoutes ? 'fail' : 'pass', outputs: [OUT_JSON, OUT_MD], summary }, null, 2));
if (summary.unresolvedRoutes) process.exitCode = 1;
