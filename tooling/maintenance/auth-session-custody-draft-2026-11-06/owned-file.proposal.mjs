// Unselected mechanism proposal. The selecting host owns paths, permissions,
// encoding and idempotent close/discard capabilities; no filesystem is ambient.
const recoveries=new WeakMap();
export const filePublicationRecovery=fault=>recoveries.get(fault);
export function publishOwnedFile(request,capabilities,{signal}={}){
  const ports=new Map();
  for(const name of ['create','write','flush','close','publish','discard']){
    const descriptor=capabilities&&Object.getOwnPropertyDescriptor(capabilities,name);
    if(!descriptor||!Object.hasOwn(descriptor,'value')||typeof descriptor.value!=='function')throw new TypeError('Explicit own file publication capabilities required.');
    ports.set(name,descriptor.value);
  }
  const invoke=(name,...args)=>Reflect.apply(ports.get(name),capabilities,args);
  let resource,created=false,closed=false,published=false,discarded=false,recovering=false;
  const recover=()=>{
    if(recovering)throw new TypeError('Owned file recovery is already running.');
    recovering=true;
    try{
      const faults=[];
      if(created&&!closed)try{invoke('close',resource);closed=true;}catch(fault){faults.push(fault);}
      if(created&&!published&&!discarded)try{invoke('discard',resource);discarded=true;}catch(fault){faults.push(fault);}
      if(faults.length)throw new AggregateError(faults,'Owned file recovery remains incomplete.');
    }finally{recovering=false;}
  };
  try{
    signal?.throwIfAborted();
    resource=invoke('create',request);created=true;
    signal?.throwIfAborted();
    invoke('write',resource,request);
    signal?.throwIfAborted();
    invoke('flush',resource);
    signal?.throwIfAborted();
    invoke('close',resource);closed=true;
    signal?.throwIfAborted();
    const result=invoke('publish',resource,request);published=true;
    return result;
  }catch(primary){
    try{recover();}catch(cleanup){
      const error=new AggregateError([primary,...cleanup.errors],'File publication and recovery failed.',{cause:primary});
      const recovery=Object.freeze({
        close:recover,
        get state(){return Object.freeze({closed,published,discarded});},
      });
      recoveries.set(error,recovery);
      Object.defineProperty(error,'recovery',{value:recovery});
      throw error;
    }
    throw primary;
  }
}
