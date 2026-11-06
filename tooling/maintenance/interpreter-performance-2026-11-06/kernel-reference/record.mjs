export function record(entries,evaluate) {
 const names=new Set();
 for(const entry of entries){if(typeof entry.name!=='string')throw new TypeError('record entries require authored name strings.');if(names.has(entry.name))throw new TypeError('Duplicate record entry name: '+entry.name);names.add(entry.name);}
 return Object.fromEntries(entries.map(entry=>[entry.name,evaluate(entry.value)]));
}
