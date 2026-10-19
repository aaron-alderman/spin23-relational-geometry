import assert from 'node:assert/strict';

// In the nontrivial-character basis (H,C,HC), V4 acts by diagonal signs.
const actions=[
  [1,1,1],
  [-1,1,-1],
  [1,-1,-1],
  [-1,-1,1],
];
// A symmetric form invariant under every sign action can have entry ij only
// when every group element has s_i s_j=1.  This leaves diagonal entries only.
const allowed=[];
for(let i=0;i<3;i++)for(let j=i;j<3;j++)if(actions.every(s=>s[i]*s[j]===1))allowed.push([i,j]);
assert.deepEqual(allowed,[[0,0],[1,1],[2,2]]);

// The order-three automorphism cyclically permutes H,C,HC. Invariance then
// equates the three diagonal coefficients, hence gives a definite form.
const cyclicInvariantForms='alpha times I3';
const lorentzChoices=[
  [1,-1,-1],[-1,1,-1],[-1,-1,1],
];
assert.equal(lorentzChoices.length,3);

console.log(JSON.stringify({
  protocol:'v4-contrast-metric-and-spin23-embedding/1',
  contrastBasis:['H','C','HC'],
  v4Actions:actions,
  invariantSymmetricFormEntries:allowed,
  generalV4InvariantForm:'diag(alpha_H,alpha_C,alpha_HC)',
  naturalFourierNorm:'diag(+1,+1,+1)',
  h2RelationshipMetric:'signature (1,2)',
  spin23PrimitiveMetric:'signature (2,3)',
  positiveIndexObstruction:'A positive-definite three-plane cannot embed isometrically in signature (2,3), whose maximal positive dimension is two.',
  lorentzianV4Choices:lorentzChoices,
  lorentzianChoiceCount:lorentzChoices.length,
  automorphismGroup:'Aut(V4)=S3 permutes the three nontrivial characters.',
  cyclicAutInvariantForms:cyclicInvariantForms,
  cyclicAutConsequence:'A nonzero form invariant under a 3-cycle has equal coefficients and is definite, never signature (1,2).',
  conclusion:'The three V4 contrasts match the dimension of H2(R) but not its metric canonically. A Lorentzian identification must distinguish one character and choose scales, breaking the character-permutation symmetry.',
  boundary:'A non-isometric linear embedding always exists by dimension. The obstruction concerns preserving the natural Fourier norm or a character-permutation-invariant bilinear form.',
  passed:true,
},null,2));
