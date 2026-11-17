import { createHash } from 'node:crypto';
import { FactStore } from './surface-rel-core.mjs';

const operators = new Set(['one','optional','objects','subjects','members','has','map','filter','some','every','list','record',
  'append','eq','includes','not','and','or','if','count','at','hash','concat','add','range','distinct']);
export function evaluate(value, env) {
  if (typeof value === 'string' && value.startsWith('$')) return value.slice(1).split('.').reduce((o,k) => o?.[k], env);
  if (value && typeof value === 'object' && !Array.isArray(value)) return Object.fromEntries(Object.entries(value).map(([k,v]) => [k,evaluate(v,env)]));
  if (!Array.isArray(value)) return value;
  if (!operators.has(value[0])) return value.map(x => evaluate(x,env));
  const [op,...args] = value, v = i => evaluate(args[i],env);
  const query = method => v(0)[method](x => evaluate(args[2],{...env,[args[1]]:x}));
  switch(op) {
    case 'one': case 'optional': {
      const values = env.state.activeObjects(v(0),v(1)).map(String);
      if (values.length > 1 || (op === 'one' && values.length !== 1)) throw new TypeError(`${v(0)}.${v(1)} cardinality`);
      return values[0] ?? null;
    }
    case 'objects': return env.state.activeObjects(v(0),v(1)).map(String);
    case 'subjects': return env.state.subjects(v(0),v(1)).map(String);
    case 'members': { const r = env.r[v(0)]; return env.state.activeObjects(r.root,r.member).map(String); }
    case 'has': return env.state.hasActive(v(0),v(1),v(2));
    case 'map': return query('map'); case 'filter': return query('filter');
    case 'some': return query('some'); case 'every': return query('every');
    case 'list': return args.map(x => evaluate(x,env));
    case 'record': return evaluate(args[0],env);
    case 'append': {const a=v(0),b=v(1);if(!Array.isArray(a)||!Array.isArray(b))throw new TypeError('append requires arrays');return a.concat(b);}
    case 'eq': return JSON.stringify(v(0)) === JSON.stringify(v(1));
    case 'includes': return v(0).includes(v(1));
    case 'not': return !v(0);
    case 'and': return args.every(x => Boolean(evaluate(x,env)));
    case 'or': return args.map(x => evaluate(x,env)).find(Boolean) ?? null;
    case 'if': return evaluate(args[v(0) ? 1 : 2],env);
    case 'count': return v(0).length; case 'at': return v(0)?.[v(1)];
    case 'hash': return createHash('sha256').update(JSON.stringify(v(0))).digest('hex');
    case 'concat': return args.map(x => evaluate(x,env)).join('');
    case 'add': return Number(v(0)) + Number(v(1));
    case 'range': return Array.from({length:v(0)},(_,i)=>i+1);
    case 'distinct': return [...new Set(v(0))];
    default: throw new TypeError(`Unknown expression ${op}`);
  }
}
export function steps(program,env,output=[]) {
  for (const step of program) {
    if (step.let) env[step.let] = evaluate(step.value,env);
    else if (step.assert) { if (!evaluate(step.assert,env)) throw new TypeError(step.message); }
    else if (step.text) { const value=evaluate(step.text,env); if (typeof value !== 'string' || !value.trim() || value !== value.trim()) throw new TypeError(`${step.name} must be non-empty trimmed text.`); }
    else if (step.call) steps(env.model.queries[step.call],env,output);
    else if (step.when) { if(evaluate(step.when,env)) steps(step.then,env,output); }
    else if (step.each) for(const value of evaluate(step.each,env)) steps(step.steps,{...env,[step.as]:value},output);
    else if (step.fold) {
      let accumulator = evaluate(step.initial,env);
      for (const value of evaluate(step.fold,env)) {
        const local={...env,[step.as]:value,[step.accumulator]:accumulator};
        steps(step.steps,local); accumulator=evaluate(step.yield,local);
      }
      env[step.into]=accumulator;
    } else if (step.member) {
      const r=env.r[step.member], id=evaluate(step.id,env);
      if(!env.state.hasActive(r.root,r.member,id)||!env.state.hasActive(id,'isa',r.type)) throw new TypeError('Member contract failed');
    } else if(step.fact) { const [s,p,o,pol='is']=step.fact.map(x=>evaluate(x,env)); output.push({s,p,o:String(o),pol}); }
    else throw new TypeError('Unknown statement');
  }
  return output;
}
export const environment = (model,state,contract,floor,input={}) => ({ model,state:FactStore.from(state),c:contract,b:floor.binding,f:floor,...input });

export function validate(model,state,contract,floor,id) {
  const env=environment(model,state,contract,floor,{id}); steps(model.queries.validate,env); return env;
}
export function plan(model,state,contract,floor,input) {
  const env=environment(model,state,contract,floor,{appointmentAt:null,provenance:null,reason:null,...input,id:input.occurrenceId});
  if(!env.model.transitions[input.kind]) throw new TypeError('Unsupported transition');
  steps(model.queries.validate,env); steps(model.transitions[input.kind].guards,env);
  steps(model.allocation,env);
  const templates=model.transitions[input.kind].templates;
  const facts=Object.fromEntries(Object.entries(templates).map(([key,tuple])=>[key,steps([{fact:tuple}],env)[0]]));
  const delta=model.transitions[input.kind].plannerOrder.map(key=>facts[key]);
  return {env,delta,eventId:env.new,from:env.from,to:env.to,expectedHistoryLength:env.historyLength};
}
// Evaluate obligations against the proposed candidate, independently of commit.
export function checkPreservation(model,state,contract,floor,input,delta) {
  const before=FactStore.from(state), after=before.fork().appendMany(delta);
  const env=environment(model,before,contract,floor,{id:input.occurrenceId,input});
  steps(model.queries.validate,env);
  const recorded=model.preservation.map(rule=>({rule,before:evaluate(rule.value,env)}));
  validate(model,after,contract,floor,input.occurrenceId);
  steps(model.postconditions,{...env,state:after,prior:{historyLength:env.historyLength,from:env.from,appointment:env.appointment},...input});
  for(const {rule,before:value} of recorded) {
    const actual=evaluate(rule.value,{...env,state:after});
    if(JSON.stringify(value)!==JSON.stringify(actual)) throw new TypeError(`Preservation failed: ${rule.name}`);
  }
  // Frame check over active subject/predicate cells, including unrelated records.
  const allowed=evaluate(model.writableCells,env);
  const cells=new Map([...before,...after].map(f=>[JSON.stringify([f.s,f.p]),[f.s,f.p]]));
  const newSubjects=new Set(evaluate(model.freshSubjects,env));
  for(const [s,p] of cells.values()) {
    if(newSubjects.has(s) || allowed.some(([a,b])=>a===s&&b===p)) continue;
    const a=before.activeObjects(s,p).map(String), b=after.activeObjects(s,p).map(String);
    if(JSON.stringify(a)!==JSON.stringify(b)) throw new TypeError(`Frame failed: ${s}.${p}`);
  }
  return after;
}
