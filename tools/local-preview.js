const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..', 'dist');
const types = { '.css': 'text/css', '.html': 'text/html', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.js': 'text/javascript', '.json': 'application/json', '.pdf': 'application/pdf', '.png': 'image/png' };

const server = http.createServer((request, response) => {
  const url = new URL(request.url, 'http://localhost');
  let file = path.resolve(root, `.${decodeURIComponent(url.pathname)}`);
  if (!file.startsWith(root)) { response.writeHead(403).end(); return; }
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
  fs.readFile(file, (error, data) => {
    if (error) { response.writeHead(404).end('Not found'); return; }
    response.writeHead(200, { 'Content-Type': types[path.extname(file).toLowerCase()] || 'application/octet-stream' });
    response.end(data);
  });
});

const port = Number(process.env.PREVIEW_PORT || 8765);
server.listen(port, () => console.log(`Preview: http://127.0.0.1:${port}`));
