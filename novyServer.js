import express from 'express'

const app = express()

const PORT = 4000

app.use(function (request, response, next) {
    console.log(`Dostali jsme request typu ${request.method} na adresu ${request.url}`)
    next()
})

app.use(express.static('public'))

app.use(express.json())

let messages = [ 
    {
        id: 1,
        text: 'First!!!'
    },
    {   id: 2,
        text: 'Hello everyone'
    }
]

let posledniID = 2

app.get('/messages', function (request, response) {
    response.status(200)
    response.send(messages)
})

app.get('/messages/:idcko', function (request, response) {
    const idcko = Number(request.params.idcko)
    
    const spravaPodId = messages.find((element) => element.id === idcko)
    response.status(200)
    response.send(spravaPodId)
})

app.post('/messages', function (request, response) {
    console.log(request.body)

    posledniID = posledniID + 1

    const novaZprava = {
        id: posledniID,
        text: request.body.text
    }

    messages.push(novaZprava)
    response.status(201)
    response.send(novaZprava)
})

app.delete('/messages/:idcko', function (request, response) {
    const idNaSmazani = Number(request.params.idcko)
    console.log(`Mažeme zprávu s id ${idNaSmazani}`)
    messages = messages.filter((element) => element.id !== idNaSmazani)
    response.status(204)
    response.end()
})

app.listen(PORT, function() {
   console.log(`Server bezi na portu ${PORT}`)
})