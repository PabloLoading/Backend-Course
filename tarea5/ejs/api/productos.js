class ProductosApi {
    constructor() {
        this.productos = []
        this.lastId = 0
    }

    listar(id) {
        return this.productos.find(prod=>prod.id==id)
    }
    
    listarAll() {
        return this.productos
    }

    guardar(prod) {
        let id=this.lastId+1
        let obj={...prod,id}
        this.productos.push(obj)
        this.lastId++
        return obj
    }

    actualizar(prod, id) {
        this.borrar(id)
        let obj={...prod,id}
        this.productos.push(obj)
    }

    borrar(id) {
        this.productos=this.productos.filter(prod=>prod.id!=id)
    }
}
module.exports=ProductosApi
