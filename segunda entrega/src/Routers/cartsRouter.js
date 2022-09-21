import { Router } from 'express'
import { carritosDao } from '../daos/index.js'

const cartsRouter = new Router()
const carts=carritosDao

cartsRouter.post('/',async(req,res)=>{
    let obj={productos:[],timestamp:Date.now()}
    let id =await carts.guardar(obj)
    res.send(`New cart saved with id: ${id}`)
})
cartsRouter.delete('/:id',async(req,res)=>{
    let deleted=await carts.borrar(req.params.id)
    if(deleted)res.send({status:'cart deleted correctly'})
    else res.send({status:'cart not found'})
})
cartsRouter.get('/:id/productos',async(req,res)=>{
    let cart = await carts.listar(req.params.id)
    if(!cart) res.send({status:'cart not found'})
    else res.send({productos:cart.productos})
})
cartsRouter.post('/:id/productos',async(req,res)=>{
    const id=req.params.id
    let cart = await carts.listar(id)
    if(!cart) res.send({status:'cart not found'})
    cart.productos.push(req.body)
    await carts.actualizar(cart,id)
    res.send({status:'product added correctly to the cart'})
})
cartsRouter.delete('/:id/productos/:id_prod',async(req,res)=>{
    const id=req.params.id
    const productId=req.params.id_prod
    let cart = await carts.listar(id)
    if(!cart) res.send({status:'cart not found'})
    const item=cart.productos.find(prod=>prod.Id==productId)
    if(!item)res.send({status:'item not found'})
    cart.productos=cart.productos.filter(prod=>prod.id!=productId)
    await carts.actualizar(id,cart)
    res.send({status:'product deleted correctly from the cart'})
})

export default cartsRouter