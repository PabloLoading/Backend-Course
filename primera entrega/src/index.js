const express=require('express')
const getProductsRouter = require('./Routers/productsRouter')
const getCartsRouter = require('./Routers/cartsRouter')

const app=express()
const productsRouter = getProductsRouter()
const cartsRouter=getCartsRouter()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api/productos',productsRouter)
app.use('/api/carrito',cartsRouter)

app.use((req,res)=>{
    res.send({error:-2,descripcion:`ruta ${req.originalUrl} metodo ${req.method} no implementado`})
})

const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`))

module.exports=app