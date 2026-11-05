const show=async error=>{const detail={kind:'error',action:'module-load-or-browser-event',message:String(error?.message||error)};document.querySelector('#status').textContent=JSON.stringify(detail);await fetch('/observations',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(detail)});};
window.addEventListener('error',event=>{void show(event.error||event.message);});
window.addEventListener('unhandledrejection',event=>{void show(event.reason);});
await import('/native-workbench-page.mjs').catch(show);
