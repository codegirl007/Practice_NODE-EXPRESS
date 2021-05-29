import http from 'http'
import fs from 'fs'

// const http = require('http');
// const fs = require('fs');

const PORT = 4000

const index = fs.readFileSync('./public/index.html')
const clanek1 = fs.readFileSync('./public/clanek1.html')
const clanek2 = fs.readFileSync('./public/clanek2.html')


const mujServer = http.createServer(function(request, response) {
  console.log(`Dostali jsme request na adresu ${request.url}`)

  response.writeHead(200, {
      'Content-Type': 'text/html'
  })

  if (request.url === '/clanek1.html') {
      response.write(clanek1)
  } else if (request.url === '/clanek2.html') {
      response.write(clanek2)
  } else {
      response.write(index)
  }

  response.end()
})

mujServer.listen(PORT, function() {
  console.log(`Server se spustil na portě ${PORT}`)
})

