import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { createServer } from 'node:http';

// The deployment serves the exact standalone build. It has no other file or write route.
const html = readFileSync(new URL('../dist/index.html', import.meta.url));
const source = html.toString('utf8').replace(/\r\n?/g, '\n');
const digest = value => createHash('sha256').update(value).digest('base64');
const allow = tag => [...source.matchAll(new RegExp('<'+tag+'>([\\s\\S]*?)</'+tag+'>','g'))]
  .map(([, body]) => "'sha256-"+digest(body)+"'").join(' ');
const scripts = allow('script');
const styles = allow('style');
if (!scripts || !styles) throw new Error('Explorer build is missing its inline script or styles');
const headers = {
  'Content-Type': 'text/html; charset=utf-8',
  'Content-Length': html.length,
  'Cache-Control': 'no-store',
  'X-Content-Type-Options': 'nosniff',
  'Content-Security-Policy': "default-src 'none'; script-src "+scripts+"; style-src "+styles+
    "; base-uri 'none'; form-action 'none'; frame-ancestors 'none'",
};
const port = Number(process.env.PORT ?? '24195');
if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error('Invalid PORT');
createServer((req, res) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.writeHead(405, {Allow:'GET, HEAD'}).end();
    return;
  }
  const route = req.url?.split('?')[0];
  if (route === '/favicon.ico') { res.writeHead(204).end(); return; }
  if (route !== '/' && route !== '/household-explorer-v2.html') {
    res.writeHead(404).end();
    return;
  }
  res.writeHead(200, headers).end(req.method === 'HEAD' ? undefined : html);
}).listen(port, '127.0.0.1', () => console.log('The Field household explorer: http://127.0.0.1:'+port+'/'));
