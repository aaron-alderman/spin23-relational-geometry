import {evaluate,steps} from './surface-process-engine.mjs';

// Reusable host interpreter. Domains supply data and a closed implementation register.
export async function executeProcess(program,env,{compute,ports}) {
  for(const node of program) {
    if(node.each) {
      for(const value of evaluate(node.each,env)) await executeProcess(node.steps,{...env,[node.as]:value},{compute,ports});
    } else if(node.when) {
      if(evaluate(node.when,env)) await executeProcess(node.then,env,{compute,ports});
    } else if(node.try) {
      try { await executeProcess(node.try,env,{compute,ports}); }
      catch(error) { env[node.error]= {name:error.name,message:error.message}; await executeProcess(node.catch,env,{compute,ports}); }
    } else if(node.call) {
      await executeProcess(env.model.queries[node.call],env,{compute,ports});
    } else if(node.compute||node.port) {
      const register=node.compute?compute:ports,name=node.compute||node.port;
      if(!Object.hasOwn(register,name)) throw Error('Unregistered implementation: '+name);
      env[node.into]=await register[name](evaluate(node.args,env));
    } else steps([node],env);
  }
  return env;
}
