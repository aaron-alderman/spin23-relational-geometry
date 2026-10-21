import { buildSpin23OpenLetters } from "./spin-2-3-open-letters.mjs";

const e = value => String(value ?? "").replace(/[&<>\"]/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[char]));

function letterCard(letter) {
  const search = [letter.id, letter.title, letter.addressedTo, letter.field, letter.question, ...letter.gates, ...letter.basis].join(" ").toLowerCase();
  return `<article class="letter" id="${e(letter.id)}" data-status="${e(letter.status)}" data-search="${e(search)}">
    <header><div><span>${e(letter.id)}</span><b>${e(letter.status)}</b></div><small>priority ${e(letter.priority)}</small></header>
    <p class="address">An open technical letter to <strong>${e(letter.addressedTo)}</strong></p>
    <h2>${e(letter.title)}</h2>
    <p class="field">${e(letter.field)}</p>
    <div class="gates">${letter.gates.map(gate => `<a href="/physics/spin-2-3/edition-3/open-questions">${e(gate)}</a>`).join("")}</div>
    <section><h3>Why this is adjacent</h3><p>${e(letter.adjacency)}</p></section>
    <section class="question"><h3>The bounded question</h3><p>${e(letter.question)}</p></section>
    <section><h3>Exact programme basis</h3><ul>${letter.basis.map(item => `<li>${e(item)}</li>`).join("")}</ul></section>
    <div class="fork"><section><h3>If it advances</h3><p>${e(letter.advanceIf)}</p></section><section><h3>If it stops</h3><p>${e(letter.stopIf)}</p></section></div>
    <blockquote>${e(letter.request)}</blockquote>
    <footer><a href="${e(letter.profileUrl)}">Public profile</a><a href="${e(letter.workUrl)}">Relevant work</a><a href="#protocol">Reply protocol</a></footer>
  </article>`;
}

export function spin23OpenLettersPage(model = buildSpin23OpenLetters()) {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Open technical letters · Spin(2,3) Edition 3 · Claimipedia</title><meta name="description" content="Public, bounded technical questions connecting the Spin(2,3) programme's open gates to adjacent experts and literatures."><link rel="stylesheet" href="/spin-2-3-open-letters.css"></head><body>
  <header class="site"><a href="/">CLAIMIPEDIA</a><nav><a href="/physics/spin-2-3/edition-3">Edition 3</a><a href="${e(model.questionRoute)}">Open questions</a><a href="#letters">Letters</a><a href="#protocol">Protocol</a><a href="/api/physics/spin-2-3/edition-3/open-letters">JSON</a></nav></header>
  <main><section class="hero"><div><p class="eyebrow">EDITION 3 · OPEN TECHNICAL LETTERS · ${e(model.version)}</p><h1>Ask the person<br><em>closest to the obstruction.</em></h1><p>These are not prestige appeals. Each letter exports one bounded question from the programme, identifies what would change if it succeeds or fails, and remains useful as a public research object even if nobody replies.</p></div><aside><dl><div><dt>Letters</dt><dd>${model.counts.letters}</dd></div><div><dt>People</dt><dd>${model.counts.people}</dd></div><div><dt>Gates touched</dt><dd>${model.counts.gates}</dd></div><div><dt>Open</dt><dd>${model.counts.open}</dd></div></dl><p>${e(model.boundary)}</p></aside></section>
  <section class="premise"><span>OUTREACH AS RESEARCH</span><p>Addressed expertise helps locate errors, prior art, and sharper tests. It does not transfer authority. A reply changes the corpus only through inspectable reasons or evidence; silence changes nothing.</p></section>
  <section class="register" id="letters"><header><div><p class="eyebrow">LETTER REGISTER</p><h2>One letter. One obstruction. Two branches.</h2></div><form onsubmit="return false"><label>Search<input id="letter-search" type="search" placeholder="Jordan, chirality, twistor…"></label><label>Status<select id="letter-status"><option value="">All statuses</option>${model.statusVocabulary.map(status => `<option value="${e(status)}">${e(status)}</option>`).join("")}</select></label><button id="letter-clear" type="button">Clear</button></form><p id="letter-count" aria-live="polite">Showing ${model.letters.length} letters</p></header><div class="letter-list">${model.letters.map(letterCard).join("")}</div></section>
  <section class="protocol" id="protocol"><header><p class="eyebrow">CORRESPONDENCE PROTOCOL</p><h2>Correction before endorsement.</h2></header><ol><li><b>Public basis</b><span>Link the exact gate, calculation, and claim under discussion.</span></li><li><b>Bounded ask</b><span>Request a theorem, counterexample, correction, or reference—not approval of the whole programme.</span></li><li><b>No presumed relationship</b><span>Publication here does not imply that the addressee has seen, accepted, or replied to the letter.</span></li><li><b>Reason-bearing updates</b><span>Record replies only with permission; update the programme through their mathematical or empirical content.</span></li><li><b>Silence is null</b><span>No response is owed and non-response is never evidence for or against a branch.</span></li></ol><aside><b>Authoring boundary</b><p>${e(model.method)}</p></aside></section></main>
  <footer><span>${e(model.protocol)}</span><span>Invitation ≠ endorsement · reply ≠ authority · silence ≠ evidence</span></footer>
  <script type="module">const cards=[...document.querySelectorAll('.letter')],search=document.querySelector('#letter-search'),status=document.querySelector('#letter-status'),count=document.querySelector('#letter-count');function filter(){const q=search.value.trim().toLowerCase(),s=status.value;let n=0;for(const card of cards){const show=(!q||card.dataset.search.includes(q))&&(!s||card.dataset.status===s);card.hidden=!show;if(show)n++}count.textContent='Showing '+n+' letter'+(n===1?'':'s')}search.addEventListener('input',filter);status.addEventListener('change',filter);document.querySelector('#letter-clear').addEventListener('click',()=>{search.value='';status.value='';filter();search.focus()});</script></body></html>`;
}

export default spin23OpenLettersPage();
