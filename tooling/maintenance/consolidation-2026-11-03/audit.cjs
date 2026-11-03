// Read-only topology audit. No symlink traversal, source edits, or credential contents.
const fs = require('node:fs');
const path = require('node:path');
const cp = require('node:child_process');
const crypto = require('node:crypto');
const root = process.cwd();
const destination = process.argv[2];
if (!destination) throw new Error('Usage: node audit.cjs <receipt.json>');
const digest = data => crypto.createHash('sha256').update(data).digest('hex');
const slash = p => p.replaceAll('\\', '/');
function git(cwd, args) {
  const r = cp.spawnSync('git', ['-c', `safe.directory=${slash(path.resolve(cwd))}`, '-C', cwd, ...args], {encoding: 'utf8', timeout: 15000, maxBuffer: 32 * 1024 * 1024});
  return {exit: r.status, stdout: (r.stdout || '').trim(), stderr: (r.stderr || '').trim()};
}
const receipt = {schema: 'local-consolidation-audit/1', capturedAt: new Date().toISOString(), root, repositories: [], files: [], links: [], errors: [], sizes: {}};
function walk(dir, category, source = true) {
  let bytes = 0;
  let entries;
  try { entries = fs.readdirSync(dir, {withFileTypes: true}); }
  catch (e) {receipt.errors.push({path: slash(path.relative(root, dir)), error: e.code}); return 0;}
  for (const entry of entries.sort((a,b) => a.name.localeCompare(b.name))) {
    const file = path.join(dir, entry.name), relative = slash(path.relative(root, file));
    if (entry.isSymbolicLink()) {receipt.links.push({path: relative, target: fs.readlinkSync(file)}); continue;}
    if (entry.name === '.git') {
      console.error('Repository:', slash(path.relative(root,dir)));
      const commands = {};
      for (const [key,args] of Object.entries({head:['rev-parse','HEAD'], branch:['branch','--show-current'], status:['status','--porcelain=v1'], refs:['show-ref'], worktrees:['worktree','list','--porcelain'], common:['rev-parse','--git-common-dir']})) commands[key] = git(dir,args);
      receipt.repositories.push({path: slash(path.relative(root,dir)) || '.', marker: entry.isFile() ? fs.readFileSync(file,'utf8').trim() : 'directory', ...commands});
      continue;
    }
    if (entry.name === 'node_modules') continue;
    if (entry.isDirectory()) bytes += walk(file,category,source);
    else {try {const data=fs.readFileSync(file); bytes+=data.length; receipt.files.push({path:relative, bytes:data.length, sha256:digest(data),category});}catch(e){receipt.errors.push({path:relative,error:e.code});}}
  }
  return bytes;
}
for (const dir of ['.platform-reconstitution', 'expression-algebra', 'reconciliation-check', ' .platform-reconstitution', '.platform-reconstitutionsourcery-platform', 'output']) {
  console.error('Inventory:',dir);
  if (fs.existsSync(dir)) receipt.sizes[dir] = walk(dir,dir);
}
receipt.main = {head:git(root,['rev-parse','HEAD']),status:git(root,['status','--short']),refs:git(root,['show-ref']),worktrees:git(root,['worktree','list','--porcelain'])};
const manifest = JSON.stringify(receipt.files);
receipt.fileManifestSha256=digest(manifest);
fs.writeFileSync(destination,JSON.stringify(receipt,null,2)+'\n');
console.log(JSON.stringify({destination,files:receipt.files.length,repositories:receipt.repositories.length,errors:receipt.errors,sizes:receipt.sizes,fileManifestSha256:receipt.fileManifestSha256},null,2));
