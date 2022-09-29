import express from 'express'
import { Server as HttpServer} from 'http'
import mongoose, { Mongoose } from 'mongoose'
import { Server as Socket} from 'socket.io'
import ContenedorMongoDb from '../Contenedores/ContenedorMongoDb.js'

import knexContainer from '../Contenedores/knexContainer.js'
import { knexMysql} from '../options.js'
import getMockedProducts from './utils/mockProducts.js'
import {schema,normalize,denormalize} from 'normalizr'

const norm={schema,denormalize}
export default norm

const authorSchema= new mongoose.Schema({
    email:{type:String,required:true},
    nombre:{type:String,required:true},
    apellido:{type:String,required:true},
    edad:{type:Number,required:true},
    alias:{type:String,required:true},
    avatar:{type:String,required:true}
})

const contenedorProductos = new knexContainer(knexMysql,'productos')
const contenedorMensajes=new ContenedorMongoDb('mensajes',{
    author:{type:authorSchema,required:true},
    text: {type:String,required:true},
    fyh: {type:String,required:true}
})

//--------------------------------------------
// NORMALIZACIÓN DE MENSAJES

const authorSchemaa = new schema.Entity('authors',undefined,{idAttribute:'email'})

const messageSchema = new schema.Entity('mensajes',{
    author:authorSchemaa
},{idAttribute:'_id'})

const postSchema = new schema.Entity('posts',{
    messages:[messageSchema]    
})

    
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
    const data = {
        id:'mensajes',
        messages:JSON.parse(JSON.stringify(mensajes))
    }
    const dataNorm=normalize(data,postSchema)
    socket.emit('products',await contenedorProductos.listarAll())
    socket.emit('messages',dataNorm,JSON.stringify(mensajes).length)

    socket.on('new-product',async producto=>{
        await contenedorProductos.guardar(producto)
        io.sockets.emit('products',await contenedorProductos.listarAll())
    })
    socket.on('new-msg',async msg=>{
        await contenedorMensajes.guardar(msg)
        mensajes= await contenedorMensajes.listarAll()
        io.sockets.emit('messages',mensajes)
    })

});

//--------------------------------------------
// agrego middlewares

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/',express.static('./public'))

app.get('/api/productos-test',(req,res)=>{
    res.send(getMockedProducts(5))
})
//--------------------------------------------
// inicio el servidor

const PORT = 8080
const connectedServer = httpServer.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${connectedServer.address().port}`)
})
connectedServer.on('error', error => console.log(`Error en servidor ${error}`))
