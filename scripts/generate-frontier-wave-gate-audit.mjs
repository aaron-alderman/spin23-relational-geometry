import fs from 'node:fs';
import path from 'node:path';
const ROOT = process.cwd();
const WRITE = process.argv.includes('--write');
const OUT = 'corpus/programmes/frontier-physics-targets/frontier_wave_gate_audit_v1.json';
const OUT_MD = 'corpus/programmes/frontier-physics-targets/frontier_wave_gate_audit_v1.md';
const current = JSON.parse(fs.readFileSync(path.join(ROOT, OUT), 'utf8'));
const existing = new Map(current.packets.map(packet => [packet.sourceRef, packet]));
const topicMap = {
  76:['OT-038','OT-042'],77:['OT-026','OT-027','OT-038'],78:['OT-029','OT-039'],79:['OT-003','OT-004','OT-027','OT-032'],80:['OT-003','OT-004','OT-038'],81:['OT-027','OT-032'],
  82:['OT-027','OT-032'],83:['OT-027','OT-032'],84:['OT-027','OT-032'],85:['OT-026','OT-027'],86:['OT-027','OT-038'],87:['OT-024','OT-038'],88:['OT-033','OT-035'],
  89:['OT-026','OT-027'],90:['OT-027','OT-032'],91:['OT-001','OT-034','OT-048'],92:['OT-025','OT-045'],93:['OT-024','OT-038'],94:['OT-024','OT-038'],95:['OT-025','OT-045'],96:['OT-025','OT-045'],97:['OT-024','OT-038'],
  100:['OT-027','OT-032'],101:['OT-027','OT-032'],102:['OT-001','OT-034','OT-048'],103:['OT-001','OT-034','OT-048'],104:['OT-025','OT-045'],105:['OT-029','OT-039'],106:['OT-029','OT-039'],107:['OT-018','OT-019','OT-027'],108:['OT-033','OT-035'],109:['OT-033','OT-035'],
  110:['OT-045','OT-050'],111:['OT-045','OT-050'],112:['OT-045'],113:['OT-045'],114:['OT-024','OT-045'],115:['OT-024','OT-045'],116:['OT-025','OT-026','OT-027','OT-050'],117:['OT-025','OT-045'],118:['OT-024','OT-025','OT-026','OT-027','OT-045','OT-050'],
  119:['OT-045','OT-050'],120:['OT-045','OT-050'],121:['OT-024','OT-045'],122:['OT-024','OT-027','OT-045'],123:['OT-024','OT-027','OT-045'],124:['OT-024','OT-027','OT-045'],125:['OT-024','OT-027','OT-045'],
  126:['OT-024','OT-025','OT-027','OT-050'],127:['OT-025','OT-045'],128:['OT-024','OT-025','OT-027'],129:['OT-024','OT-025','OT-027','OT-050'],130:['OT-024','OT-025','OT-027','OT-050'],131:['OT-024','OT-025','OT-027','OT-050'],132:['OT-024','OT-025','OT-027','OT-050'],133:['OT-024','OT-027'],134:['OT-024','OT-025','OT-027','OT-050'],135:['OT-024','OT-026','OT-027','OT-050'],136:['OT-024','OT-025','OT-027','OT-050'],137:['OT-024','OT-025','OT-026','OT-027','OT-045','OT-050'],138:['OT-024','OT-025','OT-027'],139:['OT-024','OT-025','OT-027'],140:['OT-024','OT-025','OT-027','OT-050'],141:['OT-024','OT-025','OT-027'],142:['OT-024','OT-025','OT-027'],143:['OT-024','OT-025','OT-027'],144:['OT-024','OT-025','OT-027'],145:['OT-024','OT-025','OT-026','OT-027'],146:['OT-024','OT-025','OT-027'],147:['OT-024','OT-025','OT-026','OT-027','OT-045'],148:['OT-024','OT-025','OT-026','OT-027'],149:['OT-024','OT-025','OT-026','OT-027'],150:['OT-024','OT-025','OT-026','OT-027','OT-045','OT-050'],151:['OT-024','OT-025','OT-026','OT-027','OT-045'],152:['OT-024','OT-025','OT-026','OT-027'],153:['OT-024','OT-025','OT-026','OT-027'],154:['OT-024','OT-025','OT-026','OT-027'],155:['OT-024','OT-025','OT-026','OT-027','OT-045'],156:['OT-024','OT-025','OT-026','OT-027','OT-045'],157:['OT-024','OT-025','OT-026','OT-027','OT-045'],158:['OT-024','OT-025','OT-026','OT-027','OT-045'],159:['OT-024','OT-025','OT-026','OT-027','OT-045'],160:['OT-024','OT-025','OT-026','OT-027','OT-045'],161:['OT-024','OT-025','OT-026','OT-027','OT-045'],162:['OT-024','OT-025','OT-026','OT-027','OT-045'],163:['OT-024','OT-025','OT-026','OT-027','OT-045'],164:['OT-024','OT-025','OT-026','OT-027','OT-045']
};
topicMap[165] = ['OT-024','OT-025','OT-026','OT-027','OT-045'];
topicMap[166] = ['OT-024','OT-025','OT-026','OT-027','OT-045'];
topicMap[167] = ['OT-024','OT-025','OT-026','OT-027','OT-045'];
topicMap[168] = ['OT-024','OT-025','OT-026','OT-027','OT-045'];
topicMap[169] = ['OT-024','OT-025','OT-026','OT-027','OT-045'];
topicMap[170] = ['OT-024','OT-025','OT-026','OT-027','OT-045'];
topicMap[171] = ['OT-024','OT-025','OT-026','OT-027','OT-045'];
topicMap[172] = ['OT-024','OT-025','OT-026','OT-027','OT-045'];
topicMap[173] = ['OT-024','OT-025','OT-026','OT-027','OT-045'];
topicMap[174] = ['OT-024','OT-025','OT-026','OT-027','OT-045'];
topicMap[175] = ['OT-024','OT-025','OT-026','OT-027','OT-045'];
topicMap[176] = ['OT-024','OT-025','OT-026','OT-027','OT-045'];
topicMap[177] = ['OT-024','OT-025','OT-026','OT-027','OT-045'];
topicMap[178] = ['OT-024','OT-025','OT-026','OT-027','OT-045'];
topicMap[179] = ['OT-024','OT-025','OT-026','OT-027','OT-045'];
topicMap[180] = ['OT-024','OT-025','OT-026','OT-027','OT-045'];
topicMap[181] = ['OT-024','OT-025','OT-026','OT-027','OT-045'];
topicMap[182] = ['OT-024','OT-025','OT-026','OT-027','OT-045'];
topicMap[183] = ['OT-024','OT-025','OT-026','OT-027','OT-045'];
topicMap[184] = ['OT-024','OT-025','OT-026','OT-027','OT-045'];
topicMap[185] = ['OT-024','OT-025','OT-026','OT-027','OT-045'];
topicMap[186] = ['OT-024','OT-025','OT-026','OT-027','OT-045'];
topicMap[187] = ['OT-024','OT-025','OT-026','OT-027','OT-045'];
topicMap[188] = ['OT-024','OT-025','OT-026','OT-027','OT-045'];
topicMap[189] = ['OT-024','OT-025','OT-026','OT-027','OT-045'];
topicMap[190] = ['OT-024','OT-025','OT-026','OT-027','OT-045'];
topicMap[191] = ['OT-024','OT-025','OT-026','OT-027','OT-045'];
topicMap[192] = ['OT-024','OT-025','OT-026','OT-027','OT-045'];
topicMap[193] = ['OT-024','OT-025','OT-026','OT-027','OT-045'];
topicMap[194] = ['OT-024','OT-025','OT-026','OT-027','OT-045'];
topicMap[195] = ['OT-024','OT-025','OT-026','OT-027','OT-045'];
topicMap[196] = ['OT-024','OT-025','OT-026','OT-027','OT-045'];
topicMap[197] = ['OT-024','OT-025','OT-026','OT-027','OT-045'];
topicMap[198] = ['OT-024','OT-025','OT-026','OT-027','OT-045'];
topicMap[199] = ['OT-024','OT-025','OT-026','OT-027','OT-045'];
topicMap[200] = ['OT-024','OT-025','OT-026','OT-027','OT-045'];
topicMap[201] = ['OT-024','OT-025','OT-026','OT-027','OT-045'];
topicMap[202] = ['OT-024','OT-025','OT-026','OT-027','OT-045'];
topicMap[203] = ['OT-024','OT-025','OT-026','OT-027','OT-045'];
topicMap[204] = ['OT-024','OT-025','OT-026','OT-027','OT-045'];
topicMap[205] = ['OT-024','OT-025','OT-026','OT-027','OT-045'];
topicMap[206] = ['OT-024','OT-025','OT-026','OT-027','OT-045'];
topicMap[207] = ['OT-024','OT-025','OT-026','OT-027','OT-045'];
topicMap[208] = ['OT-024','OT-025','OT-026','OT-027','OT-045'];
topicMap[209] = ['OT-024','OT-025','OT-026','OT-027','OT-045'];
topicMap[210] = ['OT-024','OT-025','OT-026','OT-027','OT-045'];
topicMap[211] = ['OT-024','OT-025','OT-026','OT-027','OT-045'];
topicMap[212] = ['OT-024','OT-025','OT-026','OT-027','OT-045'];
topicMap[213] = ['OT-024','OT-025','OT-026','OT-027','OT-045'];
topicMap[214] = ['OT-024','OT-025','OT-026','OT-027','OT-045'];
topicMap[215] = ['OT-024','OT-025','OT-026','OT-027','OT-045'];
topicMap[216] = ['OT-024','OT-025','OT-026','OT-027','OT-045'];
topicMap[217] = ['OT-024','OT-025','OT-026','OT-027','OT-045'];
topicMap[218] = ['OT-024','OT-025','OT-026','OT-027','OT-045'];
topicMap[219] = ['OT-024','OT-025','OT-026','OT-027','OT-045'];
topicMap[220] = ['OT-024','OT-025','OT-026','OT-027','OT-045'];
topicMap[221] = ['OT-024','OT-025','OT-026','OT-027','OT-045'];
topicMap[222] = ['OT-024','OT-025','OT-026','OT-027','OT-045'];
topicMap[223] = ['OT-024','OT-025','OT-026','OT-027','OT-045'];
topicMap[224] = ['OT-024','OT-025','OT-026','OT-027','OT-045'];
topicMap[225] = ['OT-024','OT-025','OT-026','OT-027','OT-045'];
topicMap[226] = ['OT-024','OT-025','OT-026','OT-027','OT-045'];
topicMap[227] = ['OT-024','OT-025','OT-026','OT-027','OT-045'];
topicMap[228] = ['OT-024','OT-025','OT-026','OT-027','OT-045','OT-050'];
topicMap[229] = ['OT-003','OT-004','OT-024','OT-026','OT-027','OT-038'];
topicMap[230] = ['OT-001','OT-003','OT-004','OT-005','OT-024','OT-026','OT-027','OT-034','OT-050'];
topicMap[231] = ['OT-003','OT-005','OT-024','OT-026','OT-027','OT-034','OT-039','OT-045','OT-050'];
topicMap[232] = ['OT-003','OT-005','OT-024','OT-026','OT-027','OT-034','OT-039','OT-045','OT-050'];
topicMap[233] = ['OT-003','OT-005','OT-024','OT-026','OT-027','OT-034','OT-039','OT-045','OT-050'];
topicMap[234] = ['OT-003','OT-005','OT-024','OT-026','OT-027','OT-034','OT-039','OT-045','OT-050'];
topicMap[235] = ['OT-003','OT-005','OT-024','OT-026','OT-027','OT-034','OT-039','OT-045','OT-050'];
topicMap[236] = ['OT-003','OT-005','OT-024','OT-026','OT-027','OT-034','OT-039','OT-045','OT-050'];
topicMap[237] = ['OT-003','OT-005','OT-024','OT-026','OT-027','OT-034','OT-039','OT-045','OT-050'];
topicMap[238] = ['OT-003','OT-005','OT-024','OT-026','OT-027','OT-034','OT-039','OT-045','OT-050'];
topicMap[239] = ['OT-003','OT-005','OT-024','OT-026','OT-027','OT-034','OT-039','OT-045','OT-050'];
topicMap[240] = ['OT-003','OT-005','OT-024','OT-026','OT-027','OT-034','OT-039','OT-045','OT-050'];
topicMap[241] = ['OT-003','OT-005','OT-024','OT-026','OT-027','OT-034','OT-039','OT-045','OT-050'];
topicMap[242] = ['OT-003','OT-005','OT-024','OT-026','OT-027','OT-034','OT-039','OT-045','OT-050'];
topicMap[243] = ['OT-003','OT-005','OT-024','OT-026','OT-027','OT-034','OT-039','OT-045','OT-050'];
topicMap[244] = ['OT-003','OT-005','OT-024','OT-026','OT-027','OT-034','OT-039','OT-045','OT-050'];
topicMap[183] = ['OT-024','OT-025','OT-026','OT-027','OT-045'];
topicMap[184] = ['OT-024','OT-025','OT-026','OT-027','OT-045'];
topicMap[185] = ['OT-024','OT-025','OT-026','OT-027','OT-045'];
topicMap[186] = ['OT-024','OT-025','OT-026','OT-027','OT-045'];
const sources = ['wave-6','wave-7'].flatMap(wave => fs.readdirSync(path.join(ROOT, 'corpus/programmes/frontier', wave))
  .filter(name => name.startsWith(`frontier_${wave.replace('-', '')}_`) && name.endsWith('.md'))
  .map(name => `corpus/programmes/frontier/${wave}/${name}`)).sort();
const packets = sources.map(sourceRef => {
  if (existing.has(sourceRef)) return existing.get(sourceRef);
  const wave = /wave-(\d)/u.exec(sourceRef)?.[1];
  const number = Number(/frontier_wave\d+_(\d+)_/u.exec(sourceRef)?.[1]);
  const topics = topicMap[number] ?? [];
  if (!topics.length) throw new Error(`No authored topic ownership for ${sourceRef}`);
  return { id: `W${wave}-${number}`, status: /no_go|does_not_fix/u.test(sourceRef) ? 'closed' : 'live', sourceRef, topicIds: topics };
});
const output = { ...current, date: '2026-10-25', packets };
const wave6 = packets.filter(packet => packet.id.startsWith('W6-')).length;
const wave7 = packets.length - wave6;
const counts = Object.fromEntries(['live','superseded','closed'].map(status => [status, packets.filter(packet => packet.status === status).length]));
const md = `# Frontier Wave 6--7 gate audit v1\n\n**Date:** 25 October 2026  \n**Machine authority:** [wave gate audit](frontier_wave_gate_audit_v1.json)\n\nAll **${wave6} Wave 6** packets and **${wave7} Wave 7** packet files resolve to the maintained queue as live, superseded or closed. Reused display numbers retain stable audit identities instead of collapsing distinct files. The later chain-theory, detector, microwave, normalization, boundary and arithmetic packets are separately owned by their actual maintained topics; an exact no-go closes only its declared packet scope and does not erase the live neighbouring topic.\n\nStatus totals: live ${counts.live}; superseded ${counts.superseded}; closed ${counts.closed}.\n\nThe audit preserves the waves' stop rules. Exact quotient, lattice, composition and canonicalization results remain exact; their surviving physical or semantic translations are not promoted by association.\n`;
if (WRITE) {
  fs.writeFileSync(path.join(ROOT, OUT), `${JSON.stringify(output, null, 2)}\n`);
  fs.writeFileSync(path.join(ROOT, OUT_MD), md);
}
console.log(JSON.stringify({ result: 'pass', packets: packets.length, wave6, wave7, statusCounts: counts, outputs: [OUT, OUT_MD] }, null, 2));
