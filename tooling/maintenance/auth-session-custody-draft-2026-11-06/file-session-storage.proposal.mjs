import {publishOwnedFile} from './owned-file.proposal.mjs';
export function createFileSessionStorage(filesystem,join,entropy){
  if(typeof join!=='function'||typeof entropy!=='function')throw new TypeError('Explicit path and entropy capabilities required.');
  const operations=new Map();
  for(const name of ['mkdirSync','readdirSync','readFileSync','existsSync','unlinkSync','openSync','writeFileSync','fsyncSync','closeSync','renameSync']){
    const descriptor=filesystem&&Object.getOwnPropertyDescriptor(filesystem,name);
    if(!descriptor||!Object.hasOwn(descriptor,'value')||typeof descriptor.value!=='function')throw new TypeError('Explicit own filesystem capabilities required.');
    operations.set(name,descriptor.value);
  }
  const call=(name,...args)=>Reflect.apply(operations.get(name),filesystem,args);
  return {
    mkdir:directory=>call('mkdirSync',directory,{recursive:true}),
    files:directory=>call('readdirSync',directory),
    read:(path,encoding)=>call('readFileSync',path,encoding),
    exists:path=>call('existsSync',path),remove:path=>call('unlinkSync',path),
    sessionPath:(directory,id,suffix)=>join(directory,encodeURIComponent(id)+suffix),
    listedPath:(directory,name)=>join(directory,name),
    publish(target,bytes,parameters){
      const resources=new WeakMap(),record=token=>{const row=resources.get(token);if(!row)throw new TypeError('Owned staging resource required.');return row;};
      return publishOwnedFile({target,bytes},{
        create(request){
          const path=request.target+parameters.temporaryTag+entropy(parameters.temporaryEntropyBytes).toString(parameters.temporaryEncoding);
          const token=Object.freeze({}),row={path,fd:null,closed:false};resources.set(token,row);
          row.fd=call('openSync',path,'wx',parameters.fileMode);
          return token;
        },
        write(token,request){const row=record(token);return call('writeFileSync',row.fd,request.bytes,{encoding:parameters.encoding});},
        flush(token){return call('fsyncSync',record(token).fd);},
        close(token){const row=record(token);if(!row.closed){call('closeSync',row.fd);row.closed=true;}},
        publish(token,request){call('renameSync',record(token).path,request.target);return request.target;},
        discard(token){const row=record(token);if(call('existsSync',row.path))call('unlinkSync',row.path);},
      });
    },
  };
}
