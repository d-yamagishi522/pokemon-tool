const http = require('http')
const port = process.env.PORT || 8000
http
  .createServer(function(request, response) {
    response.writeHead(200, { 'Content-Type': 'text/plain' })
    response.end('Hello World')
  })
  .listen(port)
