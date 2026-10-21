import corpus from "./spin-2-3-open-letters-data.json" with { type: "json" };

export const SPIN23_OPEN_LETTERS_ROUTE = "/physics/spin-2-3/edition-3/open-letters";
export const SPIN23_OPEN_LETTERS_API = "/api/physics/spin-2-3/edition-3/open-letters";

export function buildSpin23OpenLetters(filters = {}) {
  let letters = corpus.letters.map(letter => ({ ...letter }));
  if (filters.status) letters = letters.filter(letter => letter.status === filters.status);
  if (filters.gate) letters = letters.filter(letter => letter.gates.includes(filters.gate));
  if (filters.person) letters = letters.filter(letter => letter.addressedTo.toLowerCase().includes(String(filters.person).toLowerCase()));
  letters.sort((left, right) => right.priority - left.priority || left.id.localeCompare(right.id));
  return Object.freeze({
    ...corpus,
    letters: Object.freeze(letters),
    counts: Object.freeze({
      letters: letters.length,
      people: new Set(letters.map(letter => letter.addressedTo)).size,
      gates: new Set(letters.flatMap(letter => letter.gates)).size,
      open: letters.filter(letter => letter.status === "open").length,
      draft: letters.filter(letter => letter.status === "draft").length
    })
  });
}

export default buildSpin23OpenLetters();
