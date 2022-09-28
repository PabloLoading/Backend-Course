import mongoose from 'mongoose'
import {mongodb} from '../options.js'

await mongoose.connect(mongodb.cnxStr, mongodb.options)

class ContenedorMongoDb {

    constructor(nombreColeccion, esquema) {
        this.coleccion = mongoose.model(nombreColeccion, esquema)
    }

    async listar(id) {
        return await this.coleccion.find({_id:id})
    }

    async listarAll() {
        return await this.coleccion.find({})
    }

    async guardar(nuevoElem) {
       const a =await this.coleccion.create(nuevoElem)
    }

    async actualizar(nuevoElem,id) {
        try{
            await this.coleccion.updateOne({id_:id},nuevoElem)
            return true
        }
        catch(e){
            console.log(e)
            return false
        }
    }

    async borrar(id) {
        try{
            await this.coleccion.deleteOne({_id:id})
            return true
        }
        catch(e){
            console.log(e)
            return false
        }
    }

    async borrarAll() {
        await this.coleccion.deleteMany({})
    }
}

export default ContenedorMongoDb