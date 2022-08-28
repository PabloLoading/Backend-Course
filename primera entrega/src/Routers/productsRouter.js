const ContenedorArchivo=require('../Contenedores/ContenedorArchivo')
const { Router } = require('express')
const {checkAdmin} = require('../middlewares')

const productsRouter = new Router()
const products=new ContenedorArchivo('data/products.json')


const getProductsRouter=()=>{
    productsRouter.get('/:id', async(req,res)=>{
        let product = await products.listar(req.params.id)
        if(product) res.send(product)
        else res.send({error: 'product not found with that id'})
    })
    productsRouter.get('/',async(req,res)=>{
         res.send(await products.listarAll())
     })
    productsRouter.post('/',checkAdmin,async(req,res)=>{
        let obj ={timestamp: Date.now(),...req.body}
        let id=await products.guardar(obj)
        res.send(`New product saved with id: ${id}`)
    })
    productsRouter.put('/:id',checkAdmin,async(req,res)=>{
        const id = req.params.id
        let obj=await req.body
        let updated=await products.actualizar(id,obj)
        if(updated) res.send({status:'updated correctly',newObj:obj})
        else res.send({status:'item not found'})

    })
    productsRouter.delete('/:id',checkAdmin,async(req,res)=>{
        let deleted=products.borrar(req.params.id)
        if(deleted)res.send({status:'deleted correctly'})
        else res.send({status:'item not found'})
        
    })
    console.log('products routes loaded!')
    return productsRouter
}
module.exports=getProductsRouter