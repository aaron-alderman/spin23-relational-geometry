const f=(s,p,o)=>({s,p,o,pol:'is'});
export const dataSpaceFacts=[
 f('space','isa','DataSpace'),f('space','title','Native DataSpace qualification'),f('space','source','source'),f('space','asset','asset'),
 f('source','isa','DataSource'),f('source','source','mount'),f('source','sourceKind','filesystem'),f('source','label','Fixture source'),f('mount','isa','FilesystemMount'),
 f('asset','isa','DataAsset'),f('asset','source','source'),f('asset','sourceObject','file'),f('asset','assetKind','file'),f('asset','label','Fixture asset'),f('file','isa','File'),
 f('field','isa','DataField'),f('field','asset','asset'),f('field','sourceField','field.source'),f('field','inferenceState','accepted'),f('field','displayName','Fixture field'),f('field.source','isa','FileField')
];
export const canvasFacts=[
 f('nativeCanvas','isa','CanvasDocument'),f('nativeCanvas','width','480'),f('nativeCanvas','height','96'),f('nativeCanvas','cellWidth','8'),f('nativeCanvas','cellHeight','16'),f('nativeCanvas','palette','palette'),f('nativeCanvas','root','label'),
 f('palette','isa','CanvasPalette'),f('label','isa','CanvasText'),f('label','textExpr','text'),f('label','action','clickAction'),
 f('text','isa','CanvasExpr'),f('text','kind','literal'),f('text','value','Click this native canvas to set the witnessed state.'),
 f('clickAction','isa','CanvasAction'),f('clickAction','kind','setState'),f('clickAction','field','nativeClick'),f('clickAction','value','accepted'),
 ...[['widget','canvasWidgetType','CanvasText'],['expression','canvasExprKind','literal'],['action','canvasActionKind','setState'],['view-action','viewActionKind','setState']].flatMap(([s,family,value])=>[f('keyword.'+s,'isa','Keyword'),f('keyword.'+s,'family',family),f('keyword.'+s,'value',value)])
];
