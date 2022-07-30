const express=require('express')
const Contenedor = require('../t2/Contenedor')

const app = express()
const contenedor= new Contenedor('./products.txt')

app.get('/productos',async(req,res)=>{
    let products=await contenedor.getAll()
    res.send(products)
})
app.get('/productoRandom',async(req,res)=>{
    let products=await contenedor.getAll()
    let posRandom=Math.trunc(Math.random()*products.length)
    res.send(products[posRandom])
})


let server = app.listen(8080,()=>{
    console.log(`Server listeninig ${server.address().port} port`)
})
server.on('error',error=>console.log(error))