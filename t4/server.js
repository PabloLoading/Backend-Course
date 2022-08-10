const express = require('express')
const { Router } = express
const ProductosApi = require('./api/productos.js')

// router de productos

const productosApi = new ProductosApi()
const productosRouter = new Router()

productosRouter.use(express.json())
productosRouter.use(express.urlencoded({ extended: true }))

//rutas usando productosRouter

productosRouter.get('/',(req,res)=>{
    let productos=productosApi.listarAll()
    res.send({productos})
})
productosRouter.get('/:id',(req,res)=>{
    let id=req.params.id
    let producto=productosApi.listar(id)
    if(!producto){
        res.send({error: 'producto no encontrado'})
    }
    res.send({producto})
})
productosRouter.post('/',(req,res)=>{
    let producto=productosApi.guardar(req.body)
    res.send({producto})
})
productosRouter.put('/:id',(req,res)=>{
    let id=req.params.id
    productosApi.actualizar(req.body,id)
    res.send('No hubo errores')
})
productosRouter.delete('/:id',(req,res)=>{
    let id=req.params.id
    productosApi.borrar(id)
    res.send('No hubo errores')
})


// servidor

const app = express()
app.use('/',express.static('public'))
app.use('/api/productos', productosRouter)

const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`))
