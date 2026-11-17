// Static preview adapter retained from Halloween Monster Hunt; output root and port adapted.
import {createReadStream,existsSync,statSync} from 'node:fs';
import {createServer} from 'node:http';
import {extname,join,normalize,resolve,sep} from 'node:path';
const root=resolve(import.meta.dirname,'..','_site');
const port=Number(process.env.PORT||4187);
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.mjs':'text/javascript; charset=utf-8','.json':'application/json; charset=utf-8','.md':'text/markdown; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.woff':'font/woff','.woff2':'font/woff2'};
createServer((request,response)=>{
  let clean;try{clean=decodeURIComponent((request.url||'/').split('?')[0]);}catch{response.writeHead(400);response.end();return;}
  let file=join(root,normalize(clean).replace(/^([/\\])+/,'') );
  if(file!==root&&!file.startsWith(root+sep)){response.writeHead(404);response.end();return;}
  if(existsSync(file)&&statSync(file).isDirectory())file=join(file,'index.html');
  if(!existsSync(file)||statSync(file).isDirectory()){response.writeHead(404,{'content-type':'text/plain'});response.end('Not found');return;}
  response.writeHead(200,{'content-type':types[extname(file)]||'application/octet-stream','cache-control':'no-store'});createReadStream(file).pipe(response);
}).listen(port,'127.0.0.1',()=>console.log('The Missing Middle: http://127.0.0.1:'+port+'/'));
