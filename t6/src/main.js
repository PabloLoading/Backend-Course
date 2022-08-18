const express = require('express')


const { Server: HttpServer } = require('http')
const { Server: Socket } = require('socket.io')

const ContenedorMemoria = require('../contenedores/ContenedorMemoria.js')
const ContenedorArchivo = require('../contenedores/ContenedorArchivo.js')

const contenedorProductos = new ContenedorMemoria()
const contenedorMensajes=new ContenedorArchivo('src/mensajes.txt')

//--------------------------------------------
// instancio servidor, socket y api

const app = express()
const httpServer= new HttpServer(app)
const io = new Socket(httpServer)

//--------------------------------------------
// configuro el socket

io.on('connection', async socket => {
    console.log('new client detected')
    let mensajes=await contenedorMensajes.listarAll()

    socket.emit('products',contenedorProductos.listarAll())
    socket.emit('mensajes',mensajes)

    socket.on('new-product',producto=>{
        contenedorProductos.guardar(producto)
        io.sockets.emit('products',contenedorProductos.listarAll())
    })
    socket.on('new-msg',async msg=>{
        await contenedorMensajes.guardar(msg)
        mensajes= await contenedorMensajes.listarAll()
        io.sockets.emit('mensajes',mensajes)
    })

});

//--------------------------------------------
// agrego middlewares

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))


//--------------------------------------------
// inicio el servidor

const PORT = 8080
const connectedServer = httpServer.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${connectedServer.address().port}`)
})
connectedServer.on('error', error => console.log(`Error en servidor ${error}`))
