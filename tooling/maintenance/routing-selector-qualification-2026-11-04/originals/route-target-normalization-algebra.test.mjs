import test from 'node:test';
import assert from 'node:assert/strict';
import {routeTargetNormalizationValue} from '../../expression-algebra/src/index.mjs';

test('route target normalization preserves explicit path, port and href fallback',()=>{
 const target={path:' /docs ',port:' 8080 ',href:''};
 assert.equal(routeTargetNormalizationValue({mode:'path',target}),'/docs');
 assert.equal(routeTargetNormalizationValue({mode:'port',target}),'8080');
 assert.equal(routeTargetNormalizationValue({mode:'href',target}),'/docs');
 assert.equal(routeTargetNormalizationValue({mode:'href',target:{path:'/docs',href:'https://example.test/docs'}}),'https://example.test/docs');
});

test('route target normalization rejects unknown modes explicitly',()=>{
 assert.throws(()=>routeTargetNormalizationValue({mode:'unknown',target:{}}),/Unknown route target normalization mode/);
});
