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
      const scale = zoom * 640 * pixelRatio / (900 + z2);
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
        context.strokeStyle = ["obstructs","separates"].includes(edge.type) ? getColor("obstructed") : edge.status === "analogical" ? getColor("analogical") : neutral();
        context.globalAlpha = edge.status === "established" ? .72 : .48;
        context.lineWidth = (edge.type === "obstructs" ? 3 : 1.4) * ratio;
        context.setLineDash(["requires","analogous","extends"].includes(edge.type)||edge.status!=="established" ? [8*ratio,6*ratio] : []);
        context.stroke();
      }
      context.globalAlpha=1; context.setLineDash([]);
      for (const item of projected) {
        const radius=drawShape(item);
        context.font=`600 ${Math.max(11*ratio,12*item.scale)}px Aptos, Segoe UI, sans-serif`;
        context.textAlign="center"; context.textBaseline="bottom";
        const measure=context.measureText(item.node.label); const pad=4*ratio;
        context.fillStyle=paper(); context.globalAlpha=.9;
        context.fillRect(item.x-measure.width/2-pad,item.y-radius-22*ratio,measure.width+pad*2,18*ratio);
        context.globalAlpha=1; context.fillStyle=ink(); context.fillText(item.node.label,item.x,item.y-radius-7*ratio);
      }
      counts.textContent=`${projected.length} concepts · ${shownEdges.length} typed connections${flattened ? " · flattened" : " · fallback canvas"}`;
    }

    function renderDetail(node) {
      const edges=graph.edges.filter(edge=>edge.source===node.id||edge.target===node.id);
      const rows=edges.map(edge=>{const other=graph.nodes.find(candidate=>candidate.id===(edge.source===node.id?edge.target:edge.source));return `<li><strong>${edge.type}</strong> ${edge.source===node.id?"→":"←"} ${other.label} · ${edge.label} <em>(${edge.status})</em></li>`;}).join("");
      detail.style.setProperty("--detail-color",getColor(node.status));
      detail.innerHTML=`<p class="detail-status">${node.status} · ${groups[node.group]}</p><h3>${node.label}</h3><p>${node.description}</p><ul class="connections">${rows}</ul><p class="sources"><strong>Evidence</strong><br>${node.evidence.map(path=>`<a href="https://github.com/aaron-alderman/spin23-relational-geometry/blob/main/${encodeURI(path.split("#")[0])}">${path.split("/").at(-1)}</a>`).join("<br>")}</p>`;
    }

    function select(id) { selectedId=id||null; if(id){const node=graph.nodes.find(item=>item.id===id);nodeSelect.value=id;renderDetail(node);} draw(); }
    function filters(){if(selectedId&&!visible(graph.nodes.find(node=>node.id===selectedId)))selectedId=null;draw();}
    search.addEventListener("input",filters); groupFilter.addEventListener("change",filters); statusFilter.addEventListener("change",filters);
    nodeSelect.addEventListener("change",()=>nodeSelect.value&&select(nodeSelect.value));
    flattenButton.addEventListener("click",()=>{flattened=!flattened;flattenButton.setAttribute("aria-pressed",String(flattened));flattenButton.textContent=flattened?"Restore depth":"Flatten depth";draw();});
    resetButton.addEventListener("click",()=>{rotationX=-.05;rotationY=.08;zoom=1;flattened=false;search.value="";groupFilter.value="all";statusFilter.value="all";nodeSelect.value="";selectedId=null;flattenButton.setAttribute("aria-pressed","false");flattenButton.textContent="Flatten depth";draw();});
    canvas.addEventListener("pointerdown",event=>{dragging=true;downX=lastX=event.clientX;downY=lastY=event.clientY;canvas.setPointerCapture(event.pointerId);});
    canvas.addEventListener("pointermove",event=>{if(!dragging)return;rotationY+=(event.clientX-lastX)*.006;rotationX+=(event.clientY-lastY)*.006;lastX=event.clientX;lastY=event.clientY;draw();});
    canvas.addEventListener("pointerup",event=>{if(Math.abs(event.clientX-downX)<4&&Math.abs(event.clientY-downY)<4){const ratio=Math.min(devicePixelRatio||1,2);const x=(event.clientX-canvas.getBoundingClientRect().left)*ratio,y=(event.clientY-canvas.getBoundingClientRect().top)*ratio;const hit=[...projected].reverse().find(item=>Math.hypot(item.x-x,item.y-y)<18*ratio);if(hit)select(hit.node.id);}dragging=false;});
    canvas.addEventListener("wheel",event=>{event.preventDefault();zoom=Math.max(.5,Math.min(2.2,zoom*(event.deltaY>0?.92:1.08)));draw();},{passive:false});
    new ResizeObserver(draw).observe(stage);
    draw();
  }, 900);
})();
