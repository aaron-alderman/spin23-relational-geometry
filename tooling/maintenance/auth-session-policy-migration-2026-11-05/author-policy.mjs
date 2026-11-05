import {writeFileSync} from 'node:fs';
const value={kind:'input',surface:'value'}, input=surface=>({kind:'input',surface});
const literal=value=>({kind:'typedLiteral',valueType:'number',value:String(value)});
const less=(left,right)=>({kind:'lessThan',left,right});
const and=(...values)=>({kind:'and',entries:values.map(value=>({value}))});
const integerRange=(minimum,maximum=Number.MAX_SAFE_INTEGER)=>and({kind:'isSafeInteger',value},less(literal(minimum-1),value),less(value,literal(maximum+1)));
const roots={positive:integerRange(1),hostTtl:integerRange(60000),interval:integerRange(1000),forwardedTtl:integerRange(1,30000),skew:integerRange(0),clock:{kind:'isFinite',value},unexpired:less(input('now'),input('expiresAt')),expiry:{kind:'add',left:input('now'),right:input('ttlMs')}};
const fields={cookieTtlMs:{default:86400000,check:'positive'},hostTtlMs:{default:86400000,check:'hostTtl'},hostTouchMs:{default:60000,check:'interval'},maximumFailures:{default:5,check:'positive'},failureWindowMs:{default:900000,check:'interval'},lockoutMs:{default:900000,check:'interval'},signerTtlMs:{default:5000,check:'forwardedTtl'},maximumTtlMs:{default:30000,check:'forwardedTtl'},clockSkewMs:{default:1000,check:'skew'},snapshotTtlMs:{default:86400000,check:'positive'}};
writeFileSync('.platform-reconstitution/sourcery-platform-reconciled/sdk/server/auth-session-policy.json',JSON.stringify({protocol:'sourcery/authored-policy.v1',fields,expressions:{profile:'sourcery/expression-reduction-values/1',roots}},null,2)+'\n');
