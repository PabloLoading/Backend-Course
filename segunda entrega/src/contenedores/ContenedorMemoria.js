class ContenedorMemoria {

    constructor() {
        this.elementos = []
        this.lastId = 0
    }

    listar(id) {
        return this.productos.find(prod=>prod.id==id)
    }

    listarAll() {
        return this.productos
    }

    guardar(elem) {
        let id=this.lastId+1
        let obj={...elem,id}
        this.productos.push(obj)
        this.lastId++
        return obj
    }

    actualizar(elem,id) {
        this.borrar(id)
        this.productos.push(elem)
        return true
    }

    borrar(id) {
        this.productos=this.productos.filter(prod=>prod.id!=id)
        return true
    }

    borrarAll() {
        this.productos=[]
    }
}

export default ContenedorMemoria
