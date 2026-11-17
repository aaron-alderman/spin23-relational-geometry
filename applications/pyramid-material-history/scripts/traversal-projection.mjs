// Publication-owned integrity/read-model adapter. No path search or scientific inference.
export const traversalCollections=['regions','facets','materials','ports','connections','candidates','traversals'];
export function projectTraversal(g,knownIds,operationIds){
  const records=traversalCollections.flatMap(k=>g[k]);
  const ids=new Set(records.map(r=>r.id)),known=new Set([...knownIds,...ids]);
  if(ids.size!==records.length)throw Error('Duplicate traversal identity.');
  if(g.authority.empiricalAuthority!==false||g.authority.entails!==false||g.authority.noveltyEstablished!==false||g.substrate.newRuntimeLane!==false)throw Error('Traversal authority must remain bounded.');
  const referenceFields=['region','axes','evidenceRefs','related','inputs','outputs','start','connections','candidates','sourceAnchors','materials','traversals','incoming','outgoing'];
  for(const r of records){
    if(!r.label||!r.summary)throw Error('Traversal record needs a label and summary: '+r.id);
    for(const field of referenceFields)for(const id of r[field]||[])if(!known.has(id))throw Error('Unresolved traversal reference '+r.id+' '+id);
  }
  const ports=new Set(g.ports.map(r=>r.id)),edges=new Map(g.connections.map(e=>[e.id,e]));
  for(const c of g.candidates)if(c.status!=='Untested candidate question; no novelty claim'||!c.strongestRival||!c.defeat||!c.novelty||!c.nextAction)throw Error('Candidate needs bounded novelty, rival and defeat conditions.');
  for(const f of g.facets)if(!f.options.includes('Other / unresolved within this axis')||!f.partition||!f.requiredEvidence||!f.confound||!f.variation||!f.residual)throw Error('Axis must retain its partition, evidence and residual.');
  const statuses=new Set(['Conditional connection','Unresolved gap','Rejected implication']);
  const families=new Set(['grounding','transformational','evidential','compilation','control','semantic','negative']);
  for(const e of g.connections){
    if(!ports.has(e.fromPort)||!ports.has(e.toPort)||e.inputs[0]!==e.fromPort||e.outputs.length!==1||e.outputs[0]!==e.toPort||e.inputs.length<2||new Set(e.inputs).size!==e.inputs.length)throw Error('Connection must preserve one declared direction and all joint prerequisites: '+e.id);
    if(!operationIds.has(e.operation)||!statuses.has(e.status)||!families.has(e.relationFamily))throw Error('Unknown operation or relation disposition: '+e.id);
    if(!e.conditions||!e.losses.length||!e.alternative||!e.discriminatingTest||!e.stopRule||!e.reopen||!e.evidenceRefs.length||e.independenceEstablished!==false)throw Error('Incomplete connection contract: '+e.id);
    if((e.status==='Rejected implication')!==(e.relationFamily==='negative'))throw Error('Negative relation disposition mismatch.');
  }
  const routes=g.traversals.map(r=>{
    let current=r.start[0];const steps=[];
    if(r.start.length!==1||!ports.has(current))throw Error('Invalid traversal start.');
    r.connections.forEach((id,i)=>{
      const e=edges.get(id);if(!e||e.fromPort!==current)throw Error('Disconnected ordered traversal '+r.id+' at '+id);
      if(e.status==='Rejected implication'&&i!==r.connections.length-1)throw Error('Rejected implication must terminate its declared route.');
      steps.push({order:i+1,connection:id,from:e.fromPort,to:e.toPort,requiredTogether:[...e.inputs],additionalPrerequisites:e.inputs.slice(1),status:e.status,conditions:e.conditions,losses:e.losses,evidenceRefs:e.evidenceRefs});current=e.toPort;
    });
    return {id:r.id,start:r.start[0],end:current,steps,eligibleScientificConclusion:false,disposition:r.status,stopRule:r.stopRule};
  });
  return {protocol:'material-history-traversal-reading-projection/1',counts:Object.fromEntries(traversalCollections.map(k=>[k,g[k].length])),routes,connections:g.connections.map(e=>({id:e.id,allInputs:e.inputs,outputs:e.outputs,status:e.status,automaticTraversalAllowed:false})),scope:'Integrity and navigation only. Required inputs are displayed, not satisfied. Ordered routes are authored, not discovered by a new solver. No novelty, scientific eligibility, source independence or engineering ranking is inferred.'};
}
