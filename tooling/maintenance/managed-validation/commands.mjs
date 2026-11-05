import {spawn} from 'node:child_process';
import {createWriteStream,realpathSync} from 'node:fs';
import {mkdir,lstat} from 'node:fs/promises';
import {join} from 'node:path';
import {finished} from 'node:stream/promises';
import {fileURLToPath} from 'node:url';

export async function runCommand(lease,{name,executable=process.execPath,args,cwd,env=process.env,signal,timeoutMs=1200000,maxLogBytes=8*2**20}){
 if(!/^[a-z0-9-]+$/u.test(name)||!Number.isSafeInteger(timeoutMs)||timeoutMs<1||!Number.isSafeInteger(maxLogBytes)||maxLogBytes<1)throw Error('Invalid command policy');
 signal?.throwIfAborted();
 const temporary=join(lease.work,'.temporary');await mkdir(temporary,{recursive:true});const temporaryStat=await lstat(temporary);if(!temporaryStat.isDirectory()||temporaryStat.isSymbolicLink()||realpathSync.native(temporary).toLowerCase()!==temporary.toLowerCase())throw Error('Owned temporary directory required');
 env={...env,TEMP:temporary,TMP:temporary,TMPDIR:temporary};delete env.NODE_TEST_CONTEXT;
 const windows=process.platform==='win32',launchExecutable=windows?join(process.env.SYSTEMROOT,'System32/WindowsPowerShell/v1.0/powershell.exe'):executable,launchArgs=windows?['-NoLogo','-NoProfile','-NonInteractive','-ExecutionPolicy','Bypass','-File',fileURLToPath(new URL('./windows-job.ps1',import.meta.url)),'-Executable',executable,'-ArgumentsBase64',Buffer.from(JSON.stringify(args)).toString('base64'),'-WorkingDirectory',cwd]:args;
 const log=createWriteStream(join(lease.receipts,name+'.log'),{flags:'wx'}),child=spawn(launchExecutable,launchArgs,{cwd,env,windowsHide:true,detached:!windows,stdio:['ignore','pipe','pipe']});
 const logFinished=finished(log);logFinished.catch(()=>{});
 let bytes=0,refusal,stopping;
 child.once('exit',()=>{if(!windows&&child.pid){try{process.kill(-child.pid,'SIGKILL');}catch(error){if(error.code!=='ESRCH')refusal??=error;}}});
 const closed=new Promise(resolve=>{child.once('error',error=>resolve({error}));child.once('close',(code,signal)=>resolve({code,signal}));});
 const stop=reason=>{refusal??=reason;return stopping??=(async()=>{if(!child.pid)return;if(windows){if(!child.kill('SIGKILL')&&child.exitCode===null)throw Error('Owned job launcher could not be stopped');}else{try{process.kill(-child.pid,'SIGKILL');}catch(e){if(e.code!=='ESRCH')throw e;}}})().catch(error=>{refusal=new AggregateError([refusal,error],'Child termination failed');});};
 const abort=()=>void stop(signal.reason||Error('Validation interrupted'));
 const timer=setTimeout(()=>void stop(Error('Validation command exceeded its deadline')),timeoutMs);
 const watcher=setInterval(()=>{try{if(lease.freeBytes()<lease.minFreeBytes)void stop(Error('Validation free-space reserve exhausted'));}catch(error){void stop(error);}},1000);
 for(const stream of [child.stdout,child.stderr])stream.on('data',data=>{bytes+=data.length;if(bytes>maxLogBytes){void stop(Error('Validation command log budget exceeded'));return;}if(!log.write(data)){stream.pause();log.once('drain',()=>stream.resume());}});
 log.on('error',error=>void stop(error));signal?.addEventListener('abort',abort,{once:true});
 try{if(child.pid)await lease.childStarted(child.pid);if(signal?.aborted)abort();const result=await closed;if(stopping)await stopping;if(!windows&&child.pid){try{process.kill(-child.pid,'SIGKILL');}catch(e){if(e.code!=='ESRCH')throw e;}}if(child.pid)await lease.childStopped(child.pid);log.end();await logFinished;if(refusal)throw refusal;if(result.error)throw result.error;if(result.code!==0)throw Error(name+' failed: '+JSON.stringify(result));await lease.checkBudget();return {name,args,code:0,logBytes:bytes};}
 catch(error){await stop(error);await closed;if(child.pid)await lease.childStopped(child.pid).catch(()=>{});throw refusal||error;}
 finally{clearTimeout(timer);clearInterval(watcher);signal?.removeEventListener('abort',abort);if(!log.writableEnded)log.end();}
}
