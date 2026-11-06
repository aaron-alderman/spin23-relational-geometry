import {keyTypeFailure,duplicateKeyFailure} from 'file:///C:/Users/aaron/grand-theory/.platform-reconstitution/expression-algebra/src/record-from-entries/policy.mjs';
import {isCompiledRecordGraph,compiledRecordNode} from 'file:///C:/Users/aaron/grand-theory/.platform-reconstitution/expression-algebra/src/graph-from-records/build.mjs';
import{cryptoEvidence,sha256Bytes}from'file:///C:/Users/aaron/grand-theory/.platform-reconstitution/expression-algebra/src/crypto-provider-evidence.mjs';
import{isCanonicalJson,canonicalJsonRefusal}from'file:///C:/Users/aaron/grand-theory/.platform-reconstitution/expression-algebra/src/operations/is-canonical-json.mjs';import{parseSpki}from'file:///C:/Users/aaron/grand-theory/.platform-reconstitution/expression-algebra/src/operations/parse-spki.mjs';
import{bindLocal}from'file:///C:/Users/aaron/grand-theory/.platform-reconstitution/expression-algebra/src/lexical-context.mjs';
import{spkiPublicKey}from'file:///C:/Users/aaron/grand-theory/.platform-reconstitution/expression-algebra/src/operations/spki-public-key.mjs';
import{verifyEd25519Outcome}from'file:///C:/Users/aaron/grand-theory/.platform-reconstitution/expression-algebra/src/operations/verify-ed25519.mjs';
import{utf8Bytes}from'file:///C:/Users/aaron/grand-theory/.platform-reconstitution/expression-algebra/src/operations/utf8-bytes.mjs';
import{addValue}from'file:///C:/Users/aaron/grand-theory/.platform-reconstitution/expression-algebra/src/operations/add.mjs';
import{subtractValue}from'file:///C:/Users/aaron/grand-theory/.platform-reconstitution/expression-algebra/src/operations/subtract.mjs';
import{multiplyValue}from'file:///C:/Users/aaron/grand-theory/.platform-reconstitution/expression-algebra/src/operations/multiply.mjs';
import{divideValue}from'file:///C:/Users/aaron/grand-theory/.platform-reconstitution/expression-algebra/src/operations/divide.mjs';
import{lessThanValue}from'file:///C:/Users/aaron/grand-theory/.platform-reconstitution/expression-algebra/src/operations/lessThan.mjs';
import{attemptValue}from'file:///C:/Users/aaron/grand-theory/.platform-reconstitution/expression-algebra/src/operations/attempt.mjs';
import{foldValue}from'file:///C:/Users/aaron/grand-theory/.platform-reconstitution/expression-algebra/src/operations/fold.mjs';
import{raiseValue}from'file:///C:/Users/aaron/grand-theory/.platform-reconstitution/expression-algebra/src/operations/raise.mjs';
import{lowerCaseValue}from'file:///C:/Users/aaron/grand-theory/.platform-reconstitution/expression-algebra/src/operations/lowerCase.mjs';
import{upperCaseValue}from'file:///C:/Users/aaron/grand-theory/.platform-reconstitution/expression-algebra/src/operations/upperCase.mjs';
import{encodeURIComponentValue}from'file:///C:/Users/aaron/grand-theory/.platform-reconstitution/expression-algebra/src/operations/encodeURIComponent.mjs';
import{decodeURIComponentValue}from'file:///C:/Users/aaron/grand-theory/.platform-reconstitution/expression-algebra/src/operations/decodeURIComponent.mjs';
import{toStringValue}from'file:///C:/Users/aaron/grand-theory/.platform-reconstitution/expression-algebra/src/operations/to-string.mjs';
import{numberValue}from'file:///C:/Users/aaron/grand-theory/.platform-reconstitution/expression-algebra/src/operations/number.mjs';
import{isFiniteValue}from'file:///C:/Users/aaron/grand-theory/.platform-reconstitution/expression-algebra/src/operations/is-finite.mjs';
import{isSafeIntegerValue}from'file:///C:/Users/aaron/grand-theory/.platform-reconstitution/expression-algebra/src/operations/is-safe-integer.mjs';
import{concatStringsValue}from'file:///C:/Users/aaron/grand-theory/.platform-reconstitution/expression-algebra/src/operations/concat-strings.mjs';
import{includesValue}from'file:///C:/Users/aaron/grand-theory/.platform-reconstitution/expression-algebra/src/operations/includes.mjs';
import{startsWithValue}from'file:///C:/Users/aaron/grand-theory/.platform-reconstitution/expression-algebra/src/operations/startsWith.mjs';
import{endsWithValue}from'file:///C:/Users/aaron/grand-theory/.platform-reconstitution/expression-algebra/src/operations/endsWith.mjs';
import{splitValue}from'file:///C:/Users/aaron/grand-theory/.platform-reconstitution/expression-algebra/src/operations/split.mjs';
import{joinValue}from'file:///C:/Users/aaron/grand-theory/.platform-reconstitution/expression-algebra/src/operations/join.mjs';
import{sliceValue}from'file:///C:/Users/aaron/grand-theory/.platform-reconstitution/expression-algebra/src/operations/slice.mjs';
import{jsonStringifyValue}from'file:///C:/Users/aaron/grand-theory/.platform-reconstitution/expression-algebra/src/operations/json-stringify.mjs';
import {recordFromEntries} from 'file:///C:/Users/aaron/grand-theory/.platform-reconstitution/expression-algebra/src/operations/record-from-entries.mjs';
import {withInputSurface} from 'file:///C:/Users/aaron/grand-theory/.platform-reconstitution/expression-algebra/src/operations/with-input-surface.mjs';
import {letValue} from 'file:///C:/Users/aaron/grand-theory/.platform-reconstitution/expression-algebra/src/operations/let.mjs';
import {local} from 'file:///C:/Users/aaron/grand-theory/.platform-reconstitution/expression-algebra/src/operations/local.mjs';
import {assertValue} from 'file:///C:/Users/aaron/grand-theory/.platform-reconstitution/expression-algebra/src/operations/assert.mjs';
import {isPlainRecord} from 'file:///C:/Users/aaron/grand-theory/.platform-reconstitution/expression-algebra/src/operations/is-plain-record.mjs';
import {keys} from 'file:///C:/Users/aaron/grand-theory/.platform-reconstitution/expression-algebra/src/operations/keys.mjs';
import {hasOwn} from 'file:///C:/Users/aaron/grand-theory/.platform-reconstitution/expression-algebra/src/operations/has-own.mjs';
import {get} from 'file:///C:/Users/aaron/grand-theory/.platform-reconstitution/expression-algebra/src/operations/get.mjs';
import {every} from 'file:///C:/Users/aaron/grand-theory/.platform-reconstitution/expression-algebra/src/operations/every.mjs';
import {map} from 'file:///C:/Users/aaron/grand-theory/.platform-reconstitution/expression-algebra/src/operations/map.mjs';
import {and} from 'file:///C:/Users/aaron/grand-theory/.platform-reconstitution/expression-algebra/src/operations/and.mjs';
import {list} from 'file:///C:/Users/aaron/grand-theory/.platform-reconstitution/expression-algebra/src/operations/list.mjs';
import {record,validateRecordEntries} from 'file:///C:/Users/aaron/grand-theory/.platform-reconstitution/expression-algebra/src/operations/record.mjs';
import {concatArrays} from 'file:///C:/Users/aaron/grand-theory/.platform-reconstitution/expression-algebra/src/operations/concat-arrays.mjs';
import {uniqueStrings} from 'file:///C:/Users/aaron/grand-theory/.platform-reconstitution/expression-algebra/src/operations/unique-strings.mjs';
import {sortStrings} from 'file:///C:/Users/aaron/grand-theory/.platform-reconstitution/expression-algebra/src/operations/sort-strings.mjs';
import {mergeRecords} from 'file:///C:/Users/aaron/grand-theory/.platform-reconstitution/expression-algebra/src/operations/merge-records.mjs';
import {freezeValue} from 'file:///C:/Users/aaron/grand-theory/.platform-reconstitution/expression-algebra/src/operations/freeze-value.mjs';
import {canonicalJson} from 'file:///C:/Users/aaron/grand-theory/.platform-reconstitution/expression-algebra/src/operations/canonical-json.mjs';
import {sha256} from 'file:///C:/Users/aaron/grand-theory/.platform-reconstitution/expression-algebra/src/operations/sha256.mjs';
import {orderedEntries} from 'file:///C:/Users/aaron/grand-theory/.platform-reconstitution/expression-algebra/src/ordered-entries.mjs';
export {graphFromRecords} from 'file:///C:/Users/aaron/grand-theory/.platform-reconstitution/expression-algebra/src/graph-from-records.mjs';
import {canonicalEquals,truthy,VALUE_SEMANTICS_PROFILE} from 'file:///C:/Users/aaron/grand-theory/.platform-reconstitution/expression-algebra/src/value-semantics.mjs';
import {input} from 'file:///C:/Users/aaron/grand-theory/.platform-reconstitution/expression-algebra/src/operations/input.mjs';
import {typedLiteral} from 'file:///C:/Users/aaron/grand-theory/.platform-reconstitution/expression-algebra/src/operations/typed-literal.mjs';
import {typeOf} from 'file:///C:/Users/aaron/grand-theory/.platform-reconstitution/expression-algebra/src/operations/type-of.mjs';
import {strictEq} from 'file:///C:/Users/aaron/grand-theory/.platform-reconstitution/expression-algebra/src/operations/strict-eq.mjs';
import {trim} from 'file:///C:/Users/aaron/grand-theory/.platform-reconstitution/expression-algebra/src/operations/trim.mjs';
import {matches} from 'file:///C:/Users/aaron/grand-theory/.platform-reconstitution/expression-algebra/src/operations/matches.mjs';
import {length} from 'file:///C:/Users/aaron/grand-theory/.platform-reconstitution/expression-algebra/src/operations/length.mjs';
import {isArray} from 'file:///C:/Users/aaron/grand-theory/.platform-reconstitution/expression-algebra/src/operations/is-array.mjs';
import {field} from 'file:///C:/Users/aaron/grand-theory/.platform-reconstitution/expression-algebra/src/operations/field.mjs';

export {VALUE_SEMANTICS_PROFILE} from 'file:///C:/Users/aaron/grand-theory/.platform-reconstitution/expression-algebra/src/value-semantics.mjs';
export const EXPRESSION_KINDS = Object.freeze(['literal','surfaceField','eq','if']);
export const TYPED_VALUES_PROFILE = 'sourcery/expression-typed-values/1';
export const TYPED_EXPRESSION_KINDS = Object.freeze([
  'literal','if','input','typedLiteral','typeOf','strictEq','trim','matches','length','isArray','field',
]);
export const STRUCTURED_VALUES_PROFILE = 'sourcery/expression-structured-values/1';
export const STRUCTURED_EXPRESSION_KINDS = Object.freeze([...TYPED_EXPRESSION_KINDS,
 'let','local','assert','isPlainRecord','keys','hasOwn','get','every','map','and','list','record',
 'concatArrays','uniqueStrings','sortStrings','mergeRecords','freezeValue','canonicalJson','sha256',
]);
export const COMPOSITION_VALUES_PROFILE = 'sourcery/expression-composition-values/1';
export const COMPOSITION_EXPRESSION_KINDS = Object.freeze([...STRUCTURED_EXPRESSION_KINDS,'recordFromEntries','withInputSurface']);
export const REDUCTION_VALUES_PROFILE='sourcery/expression-reduction-values/1';
export const REDUCTION_EXPRESSION_KINDS=Object.freeze([...COMPOSITION_EXPRESSION_KINDS,'isCanonicalJson','parseSpki',...["spkiPublicKey","verifyEd25519","utf8Bytes","add","subtract","multiply","divide","lessThan","attempt","fold","raise","lowerCase","upperCase","encodeURIComponent","decodeURIComponent","toString","number","isFinite","isSafeInteger","concatStrings","includes","startsWith","endsWith","split","join","slice","jsonStringify"]]);
export const EXPRESSION_PROFILES = Object.freeze({
 [REDUCTION_VALUES_PROFILE]:Object.freeze({id:REDUCTION_VALUES_PROFILE,kinds:REDUCTION_EXPRESSION_KINDS}),
  [VALUE_SEMANTICS_PROFILE]: Object.freeze({id:VALUE_SEMANTICS_PROFILE,kinds:EXPRESSION_KINDS}),
  [TYPED_VALUES_PROFILE]: Object.freeze({id:TYPED_VALUES_PROFILE,kinds:TYPED_EXPRESSION_KINDS}),
  [STRUCTURED_VALUES_PROFILE]: Object.freeze({id:STRUCTURED_VALUES_PROFILE,kinds:STRUCTURED_EXPRESSION_KINDS}),
  [COMPOSITION_VALUES_PROFILE]: Object.freeze({id:COMPOSITION_VALUES_PROFILE,kinds:COMPOSITION_EXPRESSION_KINDS}),
});
export const EXPRESSION_COMPONENT = Object.freeze({
  id:'sourcery.expression',
  valueSemantics:VALUE_SEMANTICS_PROFILE, kinds:EXPRESSION_KINDS,
  defaultProfile:VALUE_SEMANTICS_PROFILE, profiles:EXPRESSION_PROFILES,
});

// The source supplies the existing algebra graph's one(subject,predicate)
// operation. No DOM, parser, service, I/O or application policy is required.
// Composition hooks retain an existing consumer's diagnostics and recursion
// into its explicitly owned vocabulary; they do not enrol new operations.
const residualState=Symbol('evaluator-owned-residuals');
export function evaluateExpressionWithTrace(source,expression,context,options={}){const state={residuals:[],mechanisms:[]},value=evaluateExpression(source,expression,context,{...options,[residualState]:state});return Object.freeze({value,residuals:Object.freeze(state.residuals),mechanisms:Object.freeze(state.mechanisms)});}
export function evaluateExpression(source, expression, context, options = {}) {
  if (!source || typeof source.one !== 'function') throw new TypeError('Expression graph must implement one(subject, predicate)');
  const profile=options.profile ?? VALUE_SEMANTICS_PROFILE;
  if (typeof profile !== 'string') throw new TypeError('Expression profile must be a primitive string or nullish default.');
  if (!Object.hasOwn(EXPRESSION_PROFILES,profile)) throw new TypeError(`Unsupported expression profile: ${profile}`);
  if(profile===REDUCTION_VALUES_PROFILE&&!options[residualState])options={...options,[residualState]:{residuals:[],mechanisms:[]}};
  const typed=profile===TYPED_VALUES_PROFILE||profile===STRUCTURED_VALUES_PROFILE||profile===COMPOSITION_VALUES_PROFILE||profile===REDUCTION_VALUES_PROFILE;
  if (typed && (options.evaluateChild !== undefined || options.missingLiteral !== undefined)) {
    throw new TypeError('Typed expressions refuse composition callbacks.');
  }
  if (!expression) return '';
  const one = predicate => source.one(expression,predicate);
  const kind = one('kind');
  if (!EXPRESSION_PROFILES[profile].kinds.includes(kind)) throw new TypeError(`Unsupported expression kind: ${kind ?? '<missing>'}.`);
  const evaluate = child => options.evaluateChild
    ? options.evaluateChild(child)
    : evaluateExpression(source,child,context,options);
  return evaluateNode(expression,context,options,profile,typed,one,kind,evaluate,(child,next)=>evaluateExpression(source,child,next,options),()=>orderedEntries(source,expression));
}

function evaluateNode(expression,context,options,profile,typed,one,kind,evaluate,evaluateAt,entries){
  switch (kind) {
case 'isCanonicalJson':return isCanonicalJson(evaluate(one('value')));
case 'parseSpki':{const result=parseSpki(evaluate(one('value')));options[residualState].mechanisms.push(Object.freeze({expression,...result.evidence}));return result;}
case 'spkiPublicKey':{const input=evaluate(one('value')),value=spkiPublicKey(input);options[residualState].mechanisms.push(Object.freeze({expression,...cryptoEvidence('public-spki',{code:'decoded-spki',inputHash:sha256Bytes(input),keyType:value.type,derBase64:value.derBase64})}));return value;}
case 'verifyEd25519':{const result=verifyEd25519Outcome(evaluate(one('key')),evaluate(one('message')),evaluate(one('signature')));options[residualState].mechanisms.push(Object.freeze({expression,...result.evidence}));return result.value;}
case 'utf8Bytes':return utf8Bytes(evaluate(one('value')));
case 'add':return addValue(evaluate(one('left')),evaluate(one('right')));
case 'subtract':return subtractValue(evaluate(one('left')),evaluate(one('right')));
case 'multiply':return multiplyValue(evaluate(one('left')),evaluate(one('right')));
case 'divide':return divideValue(evaluate(one('left')),evaluate(one('right')));
case 'lessThan':return lessThanValue(evaluate(one('left')),evaluate(one('right')));
case 'lowerCase':return lowerCaseValue(evaluate(one('value')));
case 'upperCase':return upperCaseValue(evaluate(one('value')));
case 'encodeURIComponent':return encodeURIComponentValue(evaluate(one('value')));
case 'decodeURIComponent':return decodeURIComponentValue(evaluate(one('value')));
case 'toString':return toStringValue(evaluate(one('value')));
case 'number':return numberValue(evaluate(one('value')));
case 'isFinite':return isFiniteValue(evaluate(one('value')));
case 'isSafeInteger':return isSafeIntegerValue(evaluate(one('value')));
case 'concatStrings':return concatStringsValue(evaluate(one('value')));
case 'includes':return includesValue(evaluate(one('value')),evaluate(one('search')));
case 'startsWith':return startsWithValue(evaluate(one('value')),evaluate(one('search')));
case 'endsWith':return endsWithValue(evaluate(one('value')),evaluate(one('search')));
case 'split':return splitValue(evaluate(one('value')),evaluate(one('separator')));
case 'join':return joinValue(evaluate(one('value')),evaluate(one('separator')));
case 'attempt':return attemptValue(()=>evaluate(one('value')),failure=>evaluateAt(one('fallback'),bindLocal(context,one('as')??'failure',failure)),one('catchCodes'),failure=>options[residualState].residuals.push(Object.freeze({expression,...failure}))); 
case 'raise':return raiseValue(one('errorType'),evaluate(one('message')),one('errorCode'),expression);
case 'fold':return foldValue(evaluate(one('items')),one('as'),one('accumulator'),evaluate(one('initial')),context,ctx=>evaluateAt(one('value'),ctx));
case 'slice':return sliceValue(evaluate(one('value')),evaluate(one('start')),one('end')==null?undefined:evaluate(one('end')));
case 'jsonStringify':return jsonStringifyValue(evaluate(one('value')),one('space')??'0');

    case 'literal': {
      const value = one('value');
      if (value != null) return value;
      if (options.missingLiteral) return options.missingLiteral(expression);
      throw new TypeError(`Expression ${expression} is missing value.`);
    }
    case 'surfaceField': {
      const name=one('surface');
      let surface=context.typedSurfaces?.[name];
      if (surface == null) {
        if (!(name in context.surfaces)) throw new Error(`Unknown surface: ${name}`);
        surface=context.surfaces[name];
      }
      return surface?.[one('field')] ?? '';
    }
    case 'eq': return canonicalEquals(evaluate(one('left')),evaluate(one('right')));
    case 'if': {
      const condition=evaluate(one('condition'));
      if (typed && typeof condition !== 'boolean') throw new TypeError('Typed if requires a boolean condition.');
      return (typed ? condition : truthy(condition)) ? evaluate(one('then')) : evaluate(one('else'));
    }
    case 'recordFromEntries': return recordFromEntries(evaluate(one('value')));
    case 'withInputSurface': return evaluateAt(one('in'),withInputSurface(context,one('surface'),evaluate(one('value'))));
    case 'let': return letValue(one('name'),evaluate(one('value')),context,ctx=>evaluateAt(one('in'),ctx));
    case 'local': return local(context,one('name'));
    case 'assert': {const test=evaluate(one('test'));if(profile===REDUCTION_VALUES_PROFILE){if(typeof test!=='boolean')throw new TypeError('assert requires a boolean test.');if(!test)return raiseValue('TypeError',one('message'),'assertion',expression);return evaluate(one('value'));}return assertValue(test,one('message'),()=>evaluate(one('value')));}
    case 'isPlainRecord': return isPlainRecord(evaluate(one('value')));
    case 'keys': return keys(evaluate(one('value')));
    case 'hasOwn': return hasOwn(evaluate(one('object')),evaluate(one('key')));
    case 'get': return get(evaluate(one('object')),evaluate(one('key')));
    case 'every': return every(evaluate(one('items')),one('as'),context,ctx=>evaluateAt(one('test'),ctx));
    case 'map': return map(evaluate(one('items')),one('as'),context,ctx=>evaluateAt(one('value'),ctx));
    case 'and': return and(entries(),evaluate);
    case 'list': return list(entries(),evaluate);
    case 'record': return record(entries(),evaluate);
    case 'concatArrays': return concatArrays(evaluate(one('value')));
    case 'uniqueStrings': return uniqueStrings(evaluate(one('value')));
    case 'sortStrings': return sortStrings(evaluate(one('value')));
    case 'mergeRecords': return mergeRecords(evaluate(one('left')),evaluate(one('right')));
    case 'freezeValue': return freezeValue(evaluate(one('value')));
    case 'canonicalJson': {const value=evaluate(one('value'));if(profile===REDUCTION_VALUES_PROFILE){const refusal=canonicalJsonRefusal(value);if(refusal)throw new TypeError(refusal);}return canonicalJson(value);}
    case 'sha256': return sha256(evaluate(one('value')));
    case 'input': return input(context,one('surface'));
    case 'typedLiteral': return typedLiteral(one('valueType'),one('value'));
    case 'typeOf': return typeOf(evaluate(one('value')));
    case 'strictEq': return strictEq(evaluate(one('left')),evaluate(one('right')));
    case 'trim': return trim(evaluate(one('value')));
    case 'matches': return matches(evaluate(one('value')),one('pattern'),one('flags'));
    case 'length': return length(evaluate(one('value')));
    case 'isArray': return isArray(evaluate(one('value')));
    case 'field': return field(evaluate(one('object')),one('field'));
    default: throw new TypeError(`Unsupported expression kind: ${kind ?? '<missing>'}.`);
  }
}

export{compileExpressions,AUTHORING_PROTOCOL}from'file:///C:/Users/aaron/grand-theory/.platform-reconstitution/expression-algebra/src/compile-expressions.mjs';

// Preparation is restricted to the closed, immutable index built from records.
// Live graph providers retain the ordinary evaluator and its observable lookups.
export function prepareExpressionEvaluator(source,options={}){
 if(!isCompiledRecordGraph(source))throw new TypeError('Prepared evaluation requires an immutable compiled-record graph.');
 const profile=options.profile;
 if(![TYPED_VALUES_PROFILE,STRUCTURED_VALUES_PROFILE,COMPOSITION_VALUES_PROFILE,REDUCTION_VALUES_PROFILE].includes(profile))throw new TypeError('Prepared evaluation requires an explicit typed expression profile.');
 if(options.evaluateChild!==undefined||options.missingLiteral!==undefined)throw new TypeError('Typed expressions refuse composition callbacks.');
 const unresolved=Symbol('unresolved-private-binding'),recordScope=Symbol('exclusive-record-scope'),privateData=Symbol('private-data'),privateState=Symbol('private-state'),privateAction=Symbol('private-action'),plans=new Map(),empty=()=>'',special={literal:[],typedLiteral:[],input:[],local:[],and:[],list:[],record:[],if:['condition','then','else'],eq:['left','right'],strictEq:['left','right'],add:['left','right'],subtract:['left','right'],multiply:['left','right'],divide:['left','right'],lessThan:['left','right'],field:['object'],get:['object','key'],hasOwn:['object','key'],withInputSurface:['value','in'],let:['value','in'],assert:['test','value'],every:['items','test'],map:['items','value'],fold:['items','initial','value'],attempt:['value','fallback'],raise:['message'],slice:['value','start','end'],verifyEd25519:['key','message','signature']};
 const resolve=expression=>{
  if(!expression)return empty;
  if(plans.has(expression))return plans.get(expression);
  const raw=compiledRecordNode(source,expression),kind=raw?.kind;
  if(!EXPRESSION_PROFILES[profile].kinds.includes(kind))throw new TypeError(`Unsupported expression kind: ${kind??'<missing>'}.`);
  const referenceFields=Object.hasOwn(special,kind)?special[kind]:['value'],fields=Object.create(null);
  const edge=reference=>{let prepared;return(context,state)=>(prepared??=resolve(reference))(context,state);};
  for(const [key,value]of Object.entries(raw))fields[key]=referenceFields.includes(key)&&value!=null?edge(value):value;
  const one=predicate=>fields[predicate];let entryValues;
  const entries=()=>entryValues??=(orderedEntries(source,expression).map(entry=>({...entry,value:edge(entry.value)})));
  const privateDataMerge=kind==='mergeRecords'&&compiledRecordNode(source,raw.left)?.kind==='field'&&compiledRecordNode(source,raw.left)?.field==='data'&&compiledRecordNode(source,compiledRecordNode(source,raw.left)?.object)?.kind==='input'&&compiledRecordNode(source,compiledRecordNode(source,raw.left)?.object)?.surface==='state';
  const producesRecord=['record','recordFromEntries','mergeRecords'].includes(kind);
  const child=predicate=>{const reference=one(predicate);return typeof reference==='function'?reference:edge(reference);};
  let operation;
  const unary={input:null,typeOf,trim,length,isArray,isPlainRecord,keys,concatArrays,uniqueStrings,sortStrings,freezeValue,sha256,utf8Bytes,lowerCase:lowerCaseValue,upperCase:upperCaseValue,encodeURIComponent:encodeURIComponentValue,decodeURIComponent:decodeURIComponentValue,toString:toStringValue,number:numberValue,isFinite:isFiniteValue,isSafeInteger:isSafeIntegerValue,concatStrings:concatStringsValue,jsonStringify:null};
  const binary={strictEq,add:addValue,subtract:subtractValue,multiply:multiplyValue,divide:divideValue,lessThan:lessThanValue,hasOwn,get};
  const internal=(context,state,surface)=>{
   const slot=surface==='state'?privateState:privateAction;
   if(state[slot]!==unresolved)return state[slot];
   const value=input(context,surface);state[slot]=value;return value;
  };
  const frameData=(context,state)=>{
   if(state[privateData]!==unresolved)return state[privateData];
   const value=field(internal(context,state,'state'),'data');state[privateData]=value;return value;
  };
  if(kind==='input')operation=context=>input(context,raw.surface);
  else if(kind==='field'){
   const object=child('object'),receiver=compiledRecordNode(source,raw.object),surface=receiver?.kind==='input'&&['state','action'].includes(receiver.surface)?receiver.surface:null,isData=receiver?.kind==='field'&&receiver.field==='data'&&compiledRecordNode(source,receiver.object)?.kind==='input'&&compiledRecordNode(source,receiver.object)?.surface==='state';
   operation=(context,state)=>{
    const owned=state[recordScope];
    if(owned&&(surface||isData)){const value=isData?frameData(context,state):internal(context,state,surface);if(owned.records.has(value)&&typeof raw.field==='string')return Object.hasOwn(value,raw.field)?value[raw.field]:undefined;return field(value,raw.field);}
    return field(object(context,state),raw.field);
   };
  }
  else if(Object.hasOwn(unary,kind)&&unary[kind]){const value=child('value'),apply=unary[kind];operation=(context,state)=>apply(value(context,state));}
  else if(Object.hasOwn(binary,kind)){const left=child(['get','hasOwn'].includes(kind)?'object':'left'),right=child(['get','hasOwn'].includes(kind)?'key':'right'),apply=binary[kind];operation=(context,state)=>apply(left(context,state),right(context,state));}
  else if(kind==='if'){const condition=child('condition'),yes=child('then'),no=child('else');operation=(context,state)=>{const value=condition(context,state);if(typeof value!=='boolean')throw new TypeError('Typed if requires a boolean condition.');return(value?yes:no)(context,state);};}
  else if(kind==='record'){
   let dynamic,template;
   operation=(context,state)=>{
    if(!dynamic){const rows=entries(),rawRows=orderedEntries(source,expression);validateRecordEntries(rows);dynamic=[];const initial=[];
     for(let index=0;index<rows.length;index++){const row=rows[index],definition=compiledRecordNode(source,rawRows[index].value);let constant=false,value;
      try{if(definition?.kind==='typedLiteral'){value=typedLiteral(definition.valueType,definition.value);constant=true;}else if(definition?.kind==='literal'&&definition.value!=null){value=definition.value;constant=true;}}catch{}
      initial.push([row.name,value]);if(!constant)dynamic.push(row);
     }
     template=Object.fromEntries(initial);
    }
    const result={...template};for(const row of dynamic)result[row.name]=row.value(context,state);return result;
   };
  }
  else if(kind==='recordFromEntries'){
   const value=child('value');let analyzed=false,pairs;
   operation=(context,state)=>{
    if(!analyzed){analyzed=true;
     try{if(compiledRecordNode(source,raw.value)?.kind==='list'){const rows=orderedEntries(source,raw.value),plans=[];for(const row of rows){if(compiledRecordNode(source,row.value)?.kind!=='list')throw 0;const pair=orderedEntries(source,row.value);if(pair.length!==2)throw 0;plans.push([edge(pair[0].value),edge(pair[1].value)]);}pairs=plans;}}catch{pairs=undefined;}
    }
    if(!pairs)return recordFromEntries(value(context,state));
    const values=pairs.map(([key,value])=>[key(context,state),value(context,state)]),names=new Set();
    for(const pair of values){if(typeof pair[0]!=='string')keyTypeFailure();if(names.has(pair[0]))duplicateKeyFailure();names.add(pair[0]);}
    return Object.fromEntries(values);
   };
  }
  else if(kind==='withInputSurface'){
   const value=child('value'),inside=child('in');
   operation=(context,state)=>{const selected=value(context,state);if(state[recordScope]&&typeof raw.surface==='string'&&raw.surface&&context&&Reflect.ownKeys(context).length===1&&Object.hasOwn(context,'typedSurfaces'))return inside({typedSurfaces:{...context.typedSurfaces,[raw.surface]:selected}},state);return inside(withInputSurface(context,raw.surface,selected),state);};
  }
  else if(kind==='mergeRecords'){
   const leftValue=child('left'),rightValue=child('right');
   operation=(context,state)=>{const left=leftValue(context,state),right=rightValue(context,state),owned=state[recordScope];if(owned&&privateDataMerge&&owned.records.has(left)&&owned.records.has(right)){for(const key of Reflect.ownKeys(right))Object.defineProperty(left,key,{value:right[key],enumerable:true,writable:true,configurable:true});return left;}return mergeRecords(left,right);};
  }
  else operation=(context,state)=>{const evaluate=child=>typeof child==='function'?child(context,state):resolve(child)(context,state),evaluateAt=(child,next)=>typeof child==='function'?child(next,state):resolve(child)(next,state);return evaluateNode(expression,context,state,profile,true,one,kind,evaluate,evaluateAt,entries);};
  const call=producesRecord?(context,state)=>{const result=operation(context,state);state[recordScope]?.records.add(result);return result;}:operation;
  let plan=call;
  if(kind==='literal'||kind==='typedLiteral'){let ready=false,value;plan=(context,state)=>{if(!ready){value=call(context,state);ready=true;}return value;};}
  plans.set(expression,plan);return plan;
 };
 return Object.freeze({
  profile,
  // The caller must prove exclusive, non-escaping record custody. Ordinary
  // evaluate/evaluateWithTrace always retain canonical allocation semantics.
  createExclusiveRecordScope(){
   let owned={records:new WeakSet()},depth=0;const states=[];
   return Object.freeze({evaluate(expression,context){
    if(!owned)throw new TypeError('Exclusive record scope is closed.');
    const index=depth++,state=states[index]??=( {profile,[residualState]:{residuals:[],mechanisms:[]},[recordScope]:owned,[privateData]:unresolved,[privateState]:unresolved,[privateAction]:unresolved});
    state[privateData]=state[privateState]=state[privateAction]=unresolved;
    try{return resolve(expression)(context,state);}finally{state[residualState].residuals.length=0;state[residualState].mechanisms.length=0;state[privateData]=state[privateState]=state[privateAction]=unresolved;depth--;}
   },close(){owned=undefined;states.length=0;}});
  },
  evaluate(expression,context){return resolve(expression)(context,{profile,[residualState]:{residuals:[],mechanisms:[]}});},
  evaluateWithTrace(expression,context){const state={residuals:[],mechanisms:[]},value=resolve(expression)(context,{profile,[residualState]:state});return Object.freeze({value,residuals:Object.freeze(state.residuals),mechanisms:Object.freeze(state.mechanisms)});},
 });
}
