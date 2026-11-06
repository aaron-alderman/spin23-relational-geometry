import{cryptoEvidence,sha256Bytes}from"file:///C:/Users/aaron/grand-theory/.platform-reconstitution/expression-algebra/src/crypto-provider-evidence.mjs";
import{isCanonicalJson,canonicalJsonRefusal}from"file:///C:/Users/aaron/grand-theory/.platform-reconstitution/expression-algebra/src/operations/is-canonical-json.mjs";import{parseSpki}from"file:///C:/Users/aaron/grand-theory/.platform-reconstitution/expression-algebra/src/operations/parse-spki.mjs";
import{bindLocal}from"file:///C:/Users/aaron/grand-theory/.platform-reconstitution/expression-algebra/src/lexical-context.mjs";
import{spkiPublicKey}from"file:///C:/Users/aaron/grand-theory/.platform-reconstitution/expression-algebra/src/operations/spki-public-key.mjs";
import{verifyEd25519Outcome}from"file:///C:/Users/aaron/grand-theory/.platform-reconstitution/expression-algebra/src/operations/verify-ed25519.mjs";
import{utf8Bytes}from"file:///C:/Users/aaron/grand-theory/.platform-reconstitution/expression-algebra/src/operations/utf8-bytes.mjs";
import{addValue}from"file:///C:/Users/aaron/grand-theory/.platform-reconstitution/expression-algebra/src/operations/add.mjs";
import{subtractValue}from"file:///C:/Users/aaron/grand-theory/.platform-reconstitution/expression-algebra/src/operations/subtract.mjs";
import{multiplyValue}from"file:///C:/Users/aaron/grand-theory/.platform-reconstitution/expression-algebra/src/operations/multiply.mjs";
import{divideValue}from"file:///C:/Users/aaron/grand-theory/.platform-reconstitution/expression-algebra/src/operations/divide.mjs";
import{lessThanValue}from"file:///C:/Users/aaron/grand-theory/.platform-reconstitution/expression-algebra/src/operations/lessThan.mjs";
import{attemptValue}from"file:///C:/Users/aaron/grand-theory/.platform-reconstitution/expression-algebra/src/operations/attempt.mjs";
import{foldValue}from"file:///C:/Users/aaron/grand-theory/.platform-reconstitution/expression-algebra/src/operations/fold.mjs";
import{raiseValue}from"file:///C:/Users/aaron/grand-theory/.platform-reconstitution/expression-algebra/src/operations/raise.mjs";
import{lowerCaseValue}from"file:///C:/Users/aaron/grand-theory/.platform-reconstitution/expression-algebra/src/operations/lowerCase.mjs";
import{upperCaseValue}from"file:///C:/Users/aaron/grand-theory/.platform-reconstitution/expression-algebra/src/operations/upperCase.mjs";
import{encodeURIComponentValue}from"file:///C:/Users/aaron/grand-theory/.platform-reconstitution/expression-algebra/src/operations/encodeURIComponent.mjs";
import{decodeURIComponentValue}from"file:///C:/Users/aaron/grand-theory/.platform-reconstitution/expression-algebra/src/operations/decodeURIComponent.mjs";
import{toStringValue}from"file:///C:/Users/aaron/grand-theory/.platform-reconstitution/expression-algebra/src/operations/to-string.mjs";
import{numberValue}from"file:///C:/Users/aaron/grand-theory/.platform-reconstitution/expression-algebra/src/operations/number.mjs";
import{isFiniteValue}from"file:///C:/Users/aaron/grand-theory/.platform-reconstitution/expression-algebra/src/operations/is-finite.mjs";
import{isSafeIntegerValue}from"file:///C:/Users/aaron/grand-theory/.platform-reconstitution/expression-algebra/src/operations/is-safe-integer.mjs";
import{concatStringsValue}from"file:///C:/Users/aaron/grand-theory/.platform-reconstitution/expression-algebra/src/operations/concat-strings.mjs";
import{includesValue}from"file:///C:/Users/aaron/grand-theory/.platform-reconstitution/expression-algebra/src/operations/includes.mjs";
import{startsWithValue}from"file:///C:/Users/aaron/grand-theory/.platform-reconstitution/expression-algebra/src/operations/startsWith.mjs";
import{endsWithValue}from"file:///C:/Users/aaron/grand-theory/.platform-reconstitution/expression-algebra/src/operations/endsWith.mjs";
import{splitValue}from"file:///C:/Users/aaron/grand-theory/.platform-reconstitution/expression-algebra/src/operations/split.mjs";
import{joinValue}from"file:///C:/Users/aaron/grand-theory/.platform-reconstitution/expression-algebra/src/operations/join.mjs";
import{sliceValue}from"file:///C:/Users/aaron/grand-theory/.platform-reconstitution/expression-algebra/src/operations/slice.mjs";
import{jsonStringifyValue}from"file:///C:/Users/aaron/grand-theory/.platform-reconstitution/expression-algebra/src/operations/json-stringify.mjs";
import {recordFromEntries} from "file:///C:/Users/aaron/grand-theory/.platform-reconstitution/expression-algebra/src/operations/record-from-entries.mjs";
import {withInputSurface} from "file:///C:/Users/aaron/grand-theory/.platform-reconstitution/expression-algebra/src/operations/with-input-surface.mjs";
import {letValue} from "file:///C:/Users/aaron/grand-theory/.platform-reconstitution/expression-algebra/src/operations/let.mjs";
import {local} from "file:///C:/Users/aaron/grand-theory/.platform-reconstitution/expression-algebra/src/operations/local.mjs";
import {assertValue} from "file:///C:/Users/aaron/grand-theory/.platform-reconstitution/expression-algebra/src/operations/assert.mjs";
import {isPlainRecord} from "file:///C:/Users/aaron/grand-theory/.platform-reconstitution/expression-algebra/src/operations/is-plain-record.mjs";
import {keys} from "file:///C:/Users/aaron/grand-theory/.platform-reconstitution/expression-algebra/src/operations/keys.mjs";
import {hasOwn} from "file:///C:/Users/aaron/grand-theory/.platform-reconstitution/expression-algebra/src/operations/has-own.mjs";
import {get} from "file:///C:/Users/aaron/grand-theory/.platform-reconstitution/expression-algebra/src/operations/get.mjs";
import {every} from "file:///C:/Users/aaron/grand-theory/.platform-reconstitution/expression-algebra/src/operations/every.mjs";
import {map} from "file:///C:/Users/aaron/grand-theory/.platform-reconstitution/expression-algebra/src/operations/map.mjs";
import {and} from "file:///C:/Users/aaron/grand-theory/.platform-reconstitution/expression-algebra/src/operations/and.mjs";
import {list} from "file:///C:/Users/aaron/grand-theory/.platform-reconstitution/expression-algebra/src/operations/list.mjs";
import {record} from "file:///C:/Users/aaron/grand-theory/tooling/maintenance/interpreter-performance-2026-11-06/kernel-reference/record.mjs";
import {concatArrays} from "file:///C:/Users/aaron/grand-theory/.platform-reconstitution/expression-algebra/src/operations/concat-arrays.mjs";
import {uniqueStrings} from "file:///C:/Users/aaron/grand-theory/.platform-reconstitution/expression-algebra/src/operations/unique-strings.mjs";
import {sortStrings} from "file:///C:/Users/aaron/grand-theory/.platform-reconstitution/expression-algebra/src/operations/sort-strings.mjs";
import {mergeRecords} from "file:///C:/Users/aaron/grand-theory/.platform-reconstitution/expression-algebra/src/operations/merge-records.mjs";
import {freezeValue} from "file:///C:/Users/aaron/grand-theory/.platform-reconstitution/expression-algebra/src/operations/freeze-value.mjs";
import {canonicalJson} from "file:///C:/Users/aaron/grand-theory/.platform-reconstitution/expression-algebra/src/operations/canonical-json.mjs";
import {sha256} from "file:///C:/Users/aaron/grand-theory/.platform-reconstitution/expression-algebra/src/operations/sha256.mjs";
import {orderedEntries} from "file:///C:/Users/aaron/grand-theory/.platform-reconstitution/expression-algebra/src/ordered-entries.mjs";
export {graphFromRecords} from "file:///C:/Users/aaron/grand-theory/.platform-reconstitution/expression-algebra/src/graph-from-records.mjs";
import {canonicalEquals,truthy,VALUE_SEMANTICS_PROFILE} from "file:///C:/Users/aaron/grand-theory/.platform-reconstitution/expression-algebra/src/value-semantics.mjs";
import {input} from "file:///C:/Users/aaron/grand-theory/.platform-reconstitution/expression-algebra/src/operations/input.mjs";
import {typedLiteral} from "file:///C:/Users/aaron/grand-theory/.platform-reconstitution/expression-algebra/src/operations/typed-literal.mjs";
import {typeOf} from "file:///C:/Users/aaron/grand-theory/.platform-reconstitution/expression-algebra/src/operations/type-of.mjs";
import {strictEq} from "file:///C:/Users/aaron/grand-theory/.platform-reconstitution/expression-algebra/src/operations/strict-eq.mjs";
import {trim} from "file:///C:/Users/aaron/grand-theory/.platform-reconstitution/expression-algebra/src/operations/trim.mjs";
import {matches} from "file:///C:/Users/aaron/grand-theory/.platform-reconstitution/expression-algebra/src/operations/matches.mjs";
import {length} from "file:///C:/Users/aaron/grand-theory/.platform-reconstitution/expression-algebra/src/operations/length.mjs";
import {isArray} from "file:///C:/Users/aaron/grand-theory/.platform-reconstitution/expression-algebra/src/operations/is-array.mjs";
import {field} from "file:///C:/Users/aaron/grand-theory/.platform-reconstitution/expression-algebra/src/operations/field.mjs";

export {VALUE_SEMANTICS_PROFILE} from "file:///C:/Users/aaron/grand-theory/.platform-reconstitution/expression-algebra/src/value-semantics.mjs";
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
case 'attempt':return attemptValue(()=>evaluate(one('value')),failure=>evaluateExpression(source,one('fallback'),bindLocal(context,one('as')??'failure',failure),options),one('catchCodes'),failure=>options[residualState].residuals.push(Object.freeze({expression,...failure}))); 
case 'raise':return raiseValue(one('errorType'),evaluate(one('message')),one('errorCode'),expression);
case 'fold':return foldValue(evaluate(one('items')),one('as'),one('accumulator'),evaluate(one('initial')),context,ctx=>evaluateExpression(source,one('value'),ctx,options));
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
    case 'withInputSurface': return evaluateExpression(source,one('in'),withInputSurface(context,one('surface'),evaluate(one('value'))),options);
    case 'let': return letValue(one('name'),evaluate(one('value')),context,ctx=>evaluateExpression(source,one('in'),ctx,options));
    case 'local': return local(context,one('name'));
    case 'assert': {const test=evaluate(one('test'));if(profile===REDUCTION_VALUES_PROFILE){if(typeof test!=='boolean')throw new TypeError('assert requires a boolean test.');if(!test)return raiseValue('TypeError',one('message'),'assertion',expression);return evaluate(one('value'));}return assertValue(test,one('message'),()=>evaluate(one('value')));}
    case 'isPlainRecord': return isPlainRecord(evaluate(one('value')));
    case 'keys': return keys(evaluate(one('value')));
    case 'hasOwn': return hasOwn(evaluate(one('object')),evaluate(one('key')));
    case 'get': return get(evaluate(one('object')),evaluate(one('key')));
    case 'every': return every(evaluate(one('items')),one('as'),context,ctx=>evaluateExpression(source,one('test'),ctx,options));
    case 'map': return map(evaluate(one('items')),one('as'),context,ctx=>evaluateExpression(source,one('value'),ctx,options));
    case 'and': return and(orderedEntries(source,expression),evaluate);
    case 'list': return list(orderedEntries(source,expression),evaluate);
    case 'record': return record(orderedEntries(source,expression),evaluate);
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

export{compileExpressions,AUTHORING_PROTOCOL}from"file:///C:/Users/aaron/grand-theory/.platform-reconstitution/expression-algebra/src/compile-expressions.mjs";
