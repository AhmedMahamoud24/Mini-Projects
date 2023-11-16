const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Welcome to my FruitApp');
});

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
