(() => {
  "use strict";
  setTimeout(() => {
    const stage = document.getElementById("stage");
    const counts = document.getElementById("counts");
    if (!stage || stage.querySelector("canvas") || !window.SPIN23_CONCEPT_GRAPH) return;

    const graph = window.SPIN23_CONCEPT_GRAPH;
    const detail = document.getElementById("detail");
    const search = document.getElementById("search");
    const groupFilter = document.getElementById("group-filter");
    const statusFilter = document.getElementById("status-filter");
    const nodeSelect = document.getElementById("node-select");
    const flattenButton = document.getElementById("flatten");
    const resetButton = document.getElementById("reset");
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    stage.appendChild(canvas);

    const groups = { carrier:"Mathematical carrier",closure:"Spin closure",physics:"Physical realization",obstruction:"Obstruction",topology:"Projective topology",exceptional:"Exceptional horizon",frontier:"Decisive frontier" };
    const style = getComputedStyle(document.documentElement);
    const colors = { established:"--teal",conditional:"--gold",underdetermined:"--blue",obstructed:"--red",missing:"--ink",analogical:"--purple" };
    const getColor = status => style.getPropertyValue(colors[status]).trim();
    const neutral = () => style.getPropertyValue("--muted").trim();
    const paper = () => style.getPropertyValue("--paper").trim();
    const ink = () => style.getPropertyValue("--ink").trim();
    const escapeHtml = value => String(value).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;");
    const remoteEvidenceHref = path => { const [file,hash]=path.split("#"); return `https://github.com/aaron-alderman/spin23-relational-geometry/blob/main/${encodeURI(file)}${hash?`#${encodeURIComponent(hash)}`:""}`; };
    const localEvidenceHref = path => { const [file,hash]=path.split("#"); return `../../${encodeURI(file)}${hash?`#${encodeURIComponent(hash)}`:""}`; };
    let rotationX = -.05;
    let rotationY = .08;
    let zoom = 1;
    let flattened = false;
    let selectedId = null;
    let dragging = false;
    let downX = 0;
    let downY = 0;
    let lastX = 0;
    let lastY = 0;
    let pixelRatio = Math.min(devicePixelRatio || 1,2);
    let projected = [];
    let labelHits = [];

    for (const [value,label] of Object.entries(groups)) if (![...groupFilter.options].some(option => option.value === value)) groupFilter.add(new Option(label,value));
    for (const status of Object.keys(graph.statuses)) if (![...statusFilter.options].some(option => option.value === status)) statusFilter.add(new Option(status,status));
    for (const node of [...graph.nodes].sort((a,b) => a.label.localeCompare(b.label))) if (![...nodeSelect.options].some(option => option.value === node.id)) nodeSelect.add(new Option(node.label,node.id));

    function visible(node) {
      const term = search.value.trim().toLowerCase();
      return (groupFilter.value === "all" || groupFilter.value === node.group) &&
        (statusFilter.value === "all" || statusFilter.value === node.status) &&
        (!term || `${node.label} ${node.description}`.toLowerCase().includes(term));
    }

    function project(node) {
      const z0 = flattened ? 0 : node.z;
      const cy = Math.cos(rotationY), sy = Math.sin(rotationY), cx = Math.cos(rotationX), sx = Math.sin(rotationX);
      const x1 = node.x * cy - z0 * sy;
      const z1 = node.x * sy + z0 * cy;
      const y1 = node.y * cx - z1 * sx;
      const z2 = node.y * sx + z1 * cx;
      const logicalWidth = Math.max(1, canvas.width / pixelRatio);
      const fitScale = Math.min(640, logicalWidth * .60) * pixelRatio;
      const scale = zoom * fitScale / (900 + z2);
      return { node, x:canvas.width/2 + x1*scale, y:canvas.height/2 + y1*scale, z:z2, scale };
    }

    function drawShape(item) {
      const radius = Math.max(6 * pixelRatio, 11 * item.scale) * (item.node.id === selectedId ? 1.45 : 1);
      context.save();
      context.translate(item.x,item.y);
      context.fillStyle = getColor(item.node.status);
      context.strokeStyle = paper();
      context.lineWidth = (item.node.id === selectedId ? 3 : 1) * pixelRatio;
      context.beginPath();
      if (item.node.group === "physics") context.rect(-radius,-radius,radius*2,radius*2);
      else if (item.node.group === "topology") { context.arc(0,0,radius,0,Math.PI*2); context.arc(0,0,radius*.45,0,Math.PI*2,true); }
      else if (["closure","exceptional","frontier","obstruction"].includes(item.node.group)) {
        const sides = item.node.group === "closure" ? 4 : item.node.group === "obstruction" ? 3 : 6;
        for (let i=0;i<sides;i++) { const angle=-Math.PI/2+i*Math.PI*2/sides; const x=Math.cos(angle)*radius,y=Math.sin(angle)*radius; i?context.lineTo(x,y):context.moveTo(x,y); }
        context.closePath();
      } else context.arc(0,0,radius,0,Math.PI*2);
      context.fill("evenodd");
      context.stroke();
      context.restore();
      return radius;
    }

    function draw() {
      const ratio = Math.min(devicePixelRatio || 1,2);
      pixelRatio = ratio;
      const rect = stage.getBoundingClientRect();
      const width = Math.max(1,Math.round(rect.width*ratio)), height = Math.max(1,Math.round(rect.height*ratio));
      if (canvas.width !== width || canvas.height !== height) { canvas.width=width; canvas.height=height; canvas.style.width=`${rect.width}px`; canvas.style.height=`${rect.height}px`; }
      context.clearRect(0,0,width,height);
      projected = graph.nodes.filter(visible).map(project).sort((a,b)=>a.z-b.z);
      const byId = new Map(projected.map(item=>[item.node.id,item]));
      const shownEdges = graph.edges.filter(edge=>byId.has(edge.source)&&byId.has(edge.target));
      for (const edge of shownEdges) {
        const a=byId.get(edge.source), b=byId.get(edge.target);
        context.beginPath(); context.moveTo(a.x,a.y); context.lineTo(b.x,b.y);
        context.strokeStyle = getColor(edge.status);
        context.globalAlpha = edge.status === "established" ? .82 : edge.status === "conditional" ? .72 : .64;
        context.lineWidth = (edge.type === "obstructs" ? 3 : 1.4) * ratio;
        context.setLineDash(["analogous","separates"].includes(edge.type) ? [2.5*ratio,5*ratio] : ["requires","extends"].includes(edge.type) ? [9*ratio,6*ratio] : []);
        context.stroke();
      }
      context.globalAlpha=1; context.setLineDash([]);
      const radii=new Map();
      for (const item of projected) radii.set(item.node.id,drawShape(item));
      const occupied=[];
      labelHits=[];
      const overlapArea=(a,b)=>Math.max(0,Math.min(a.right,b.right)-Math.max(a.left,b.left))*Math.max(0,Math.min(a.bottom,b.bottom)-Math.max(a.top,b.top));
      const labelOrder=[...projected].sort((a,b)=>Number(b.node.id===selectedId)-Number(a.node.id===selectedId)||Number(b.node.status==="established")-Number(a.node.status==="established")||a.z-b.z);
      for (const item of labelOrder) {
        const fontSize=Math.max(10*ratio,11*item.scale);
        context.font=`700 ${fontSize}px Aptos, Segoe UI, sans-serif`;
        context.textAlign="center"; context.textBaseline="middle";
        const words=item.node.label.split(/\s+/u), maxTextWidth=150*ratio, lines=[];
        for(const word of words){const current=lines.at(-1)||"";const trial=current?`${current} ${word}`:word;if(current&&context.measureText(trial).width>maxTextWidth)lines.push(word);else if(lines.length)lines[lines.length-1]=trial;else lines.push(trial);}
        const textWidth=Math.min(maxTextWidth,Math.max(...lines.map(line=>context.measureText(line).width)));
        const lineHeight=fontSize*1.22,padX=7*ratio,padY=5*ratio,boxWidth=textWidth+padX*2,boxHeight=lines.length*lineHeight+padY*2;
        const gap=radii.get(item.node.id)+(item.node.id===selectedId?18:12)*ratio;
        const candidates=[[-boxWidth/2,-boxHeight-gap],[-boxWidth/2,gap],[gap,-boxHeight/2],[-boxWidth-gap,-boxHeight/2],[gap,-boxHeight-gap],[-boxWidth-gap,-boxHeight-gap],[gap,gap],[-boxWidth-gap,gap]];
        let best=null;
        for(const [dx,dy] of candidates){const placedX=Math.max(5*ratio,Math.min(width-boxWidth-5*ratio,item.x+dx)),placedY=Math.max(5*ratio,Math.min(height-boxHeight-5*ratio,item.y+dy)),actualDx=placedX-item.x,actualDy=placedY-item.y;const rect={left:placedX-3*ratio,top:placedY-3*ratio,right:placedX+boxWidth+3*ratio,bottom:placedY+boxHeight+3*ratio};const overlap=occupied.reduce((sum,other)=>sum+overlapArea(rect,other),0);const score=overlap*1000+Math.hypot(actualDx+boxWidth/2,actualDy+boxHeight/2);if(!best||score<best.score)best={score,dx:actualDx,dy:actualDy,rect};}
        const boxX=item.x+best.dx,boxY=item.y+best.dy;
        context.globalAlpha=.96;context.fillStyle=paper();context.fillRect(boxX,boxY,boxWidth,boxHeight);
        context.globalAlpha=1;context.strokeStyle=getColor(item.node.status);context.lineWidth=(item.node.id===selectedId?3:1.5)*ratio;context.strokeRect(boxX,boxY,boxWidth,boxHeight);
        context.fillStyle=ink();lines.forEach((line,index)=>context.fillText(line,boxX+boxWidth/2,boxY+padY+lineHeight*(index+.5)));
        occupied.push(best.rect);
        labelHits.push({node:item.node,rect:best.rect});
      }
      counts.textContent=`${projected.length} concepts · ${shownEdges.length} typed connections${flattened ? " · flattened" : " · fallback canvas"}`;
    }

    function renderDetail(node) {
      const edges=graph.edges.filter(edge=>edge.source===node.id||edge.target===node.id);
      const rows=edges.map(edge=>{const other=graph.nodes.find(candidate=>candidate.id===(edge.source===node.id?edge.target:edge.source));return `<li><strong>${escapeHtml(edge.type)}</strong> ${edge.source===node.id?"→":"←"} <button type="button" class="connection-button" data-node-id="${escapeHtml(other.id)}">${escapeHtml(other.label)}</button>${edge.label?` · ${escapeHtml(edge.label)}`:""} <em>(${escapeHtml(edge.status)})</em></li>`;}).join("");
      detail.style.setProperty("--detail-color",getColor(node.status));
      detail.innerHTML=`<p class="detail-status">${escapeHtml(node.status)} · ${escapeHtml(groups[node.group])}</p><h3>${escapeHtml(node.label)}</h3><p>${escapeHtml(node.description)}</p><h4>Typed connections</h4><ul class="connections">${rows}</ul><h4>Evidence and source links</h4><ul class="sources evidence-list">${node.evidence.map(path=>`<li><span>${escapeHtml(path.split("/").at(-1))}</span><span><a href="${localEvidenceHref(path)}">Open locally</a> · <a href="${remoteEvidenceHref(path)}" target="_blank" rel="noreferrer">GitHub ↗</a></span></li>`).join("")}</ul>`;
      detail.scrollTop=0;
    }

    function select(id) { selectedId=id||null; if(id){const node=graph.nodes.find(item=>item.id===id);nodeSelect.value=id;renderDetail(node);} draw(); }
    function filters(){if(selectedId&&!visible(graph.nodes.find(node=>node.id===selectedId)))selectedId=null;draw();}
    search.addEventListener("input",filters); groupFilter.addEventListener("change",filters); statusFilter.addEventListener("change",filters);
    nodeSelect.addEventListener("change",()=>nodeSelect.value&&select(nodeSelect.value));
    detail.addEventListener("click",event=>{const button=event.target.closest("[data-node-id]");if(button)select(button.dataset.nodeId);});
    flattenButton.addEventListener("click",()=>{flattened=!flattened;flattenButton.setAttribute("aria-pressed",String(flattened));flattenButton.textContent=flattened?"Restore depth":"Flatten depth";draw();});
    resetButton.addEventListener("click",()=>{rotationX=-.05;rotationY=.08;zoom=1;flattened=false;search.value="";groupFilter.value="all";statusFilter.value="all";nodeSelect.value="";selectedId=null;flattenButton.setAttribute("aria-pressed","false");flattenButton.textContent="Flatten depth";draw();});
    canvas.addEventListener("pointerdown",event=>{dragging=true;downX=lastX=event.clientX;downY=lastY=event.clientY;canvas.setPointerCapture(event.pointerId);});
    canvas.addEventListener("pointermove",event=>{const ratio=Math.min(devicePixelRatio||1,2),rect=canvas.getBoundingClientRect(),x=(event.clientX-rect.left)*ratio,y=(event.clientY-rect.top)*ratio;if(!dragging){const overLabel=labelHits.some(hit=>x>=hit.rect.left&&x<=hit.rect.right&&y>=hit.rect.top&&y<=hit.rect.bottom);const overNode=projected.some(item=>Math.hypot(item.x-x,item.y-y)<18*ratio);canvas.style.cursor=overLabel||overNode?"pointer":"grab";return;}rotationY+=(event.clientX-lastX)*.006;rotationX+=(event.clientY-lastY)*.006;lastX=event.clientX;lastY=event.clientY;draw();});
    canvas.addEventListener("pointerup",event=>{if(Math.abs(event.clientX-downX)<4&&Math.abs(event.clientY-downY)<4){const ratio=Math.min(devicePixelRatio||1,2),rect=canvas.getBoundingClientRect(),x=(event.clientX-rect.left)*ratio,y=(event.clientY-rect.top)*ratio;const labelHit=[...labelHits].reverse().find(hit=>x>=hit.rect.left&&x<=hit.rect.right&&y>=hit.rect.top&&y<=hit.rect.bottom);const nodeHit=[...projected].reverse().find(item=>Math.hypot(item.x-x,item.y-y)<18*ratio);const hit=labelHit?.node||nodeHit?.node;if(hit)select(hit.id);}dragging=false;});
    canvas.addEventListener("wheel",event=>{event.preventDefault();zoom=Math.max(.5,Math.min(2.2,zoom*(event.deltaY>0?.92:1.08)));draw();},{passive:false});
    new ResizeObserver(draw).observe(stage);
    draw();
  }, 900);
})();
