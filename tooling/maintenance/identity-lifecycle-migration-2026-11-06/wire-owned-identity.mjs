import {readFileSync,writeFileSync} from 'node:fs';
const file='.platform-reconstitution/sourcery-platform-reconciled/sdk/server/identity-runtime.mjs';let text=readFileSync(file,'utf8');
const start=text.indexOf('    this.database = new DatabaseSync(this.databaseFile);'),end=text.indexOf('\n  transaction(operation)',start),close=text.lastIndexOf('\n  close() {');if(start<0||end<0||close<0)throw Error('Expected identity source shape');
const oldClose=text.slice(close);if(!oldClose.includes('this.database.exec(identityLifecyclePolicyValue("sql.close.exec.0"));'))throw Error('Expected authored close SQL');
text=text.slice(0,start)+`    this.#databaseResource = createOwnedResource({
      acquire: () => new DatabaseSync(this.databaseFile),
      initialize: database => {
        this.database = database;
        initializeIdentityDatabase(database, {
          clock: () => iso(nowMs(this.now)),
          entropy: (bytes, encoding) => randomBytes(bytes).toString(encoding),
          migrate: timestamp => this.migratePlatformPrincipals(timestamp),
          assignKey: value => { this.csrfKey = value; },
          prune: () => this.prune(),
        });
      },
      prepareDispose: database => database.exec(identityLifecyclePolicyValue("sql.close.exec.0")),
      dispose: database => database.close(),
    });
  }
`+text.slice(end);
text=text.replace('export class SqliteHostIdentityRuntime {','export class SqliteHostIdentityRuntime {\n  #databaseResource;');
const from='  close() {\n    this.database.exec(identityLifecyclePolicyValue("sql.close.exec.0"));\n    this.database.close();\n  }';if(!text.includes(from))throw Error('Expected old close');text=text.replace(from,'  close() {\n    return this.#databaseResource.close();\n  }');
text=text.replace('identityLifecyclePolicyValue,initializeIdentityDatabase','identityLifecyclePolicyValue,identityLifecycleParameter,initializeIdentityDatabase');
text=text.replace('timestamp - 7 * 86_400_000','timestamp - identityLifecycleParameter("revokedRetentionMs")').replaceAll('randomBytes(18)','randomBytes(identityLifecycleParameter("eventEntropyBytes"))').replaceAll('randomBytes(32)','randomBytes(identityLifecycleParameter("sessionEntropyBytes"))');
text=text.replace('auditEvents({ limit = 100 } = {})','auditEvents({ limit = identityLifecycleParameter("auditDefaultLimit") } = {})').replace('Math.min(500, Number(limit) || 100)','Math.min(identityLifecycleParameter("auditMaximumLimit"), Number(limit) || identityLifecycleParameter("auditDefaultLimit"))').replace('operatorSnapshot({ limit = 50 } = {})','operatorSnapshot({ limit = identityLifecycleParameter("operatorDefaultLimit") } = {})');
writeFileSync(file,text);
const policyFile='.platform-reconstitution/sourcery-platform-reconciled/sdk/server/identity-lifecycle-policy.json',policy=JSON.parse(readFileSync(policyFile)),entropy=policy.expressions.roots['initialize.entropy'];entropy.entries.find(entry=>entry.name==='input').value.entries.find(entry=>entry.name==='bytes').value={kind:'field',object:{kind:'field',object:{kind:'field',object:{kind:'input',surface:'state'},field:'data'},field:'request'},field:'csrfEntropyBytes'};writeFileSync(policyFile,JSON.stringify(policy,null,2)+'\n');
