import { promises as fs } from 'fs'
import config from '../config.js'

class ContenedorArchivo {

    constructor(ruta) {
        this.path = `${config.fileSystem.path}/${ruta}`
        this.lastId=0
    }

    async listar(id) {
        let arr=await this.listarAll()
        return arr.find(obj=>obj.id==id)
    }

    async listarAll() {
        try{
            const arr=await fs.readFile(this.path)
            return JSON.parse(arr)
        }catch(e){
            console.log(e)
            return []
        }
    }

    async guardar(obj) {
        let arr=await this.listarAll()
        if(arr=='')arr=[]
        let newId= ++this.lastId
        arr.push({...obj,id:newId})
        let str=JSON.stringify(arr)
        try{
            await fs.writeFile(this.path,str)
        }catch(e){
            console.log(e)
        }
        return newId
    }

    async actualizar(elem,id) {
        let arr=await this.listarAll()
        if(arr=='')arr=[]
        let newObj={...elem,id}
        let newArr=arr.map(item=>item.id==id ? newObj : item)
        let str= JSON.stringify(newArr)
        try{
            await fs.writeFile(this.path,str);
            return true
        }
        catch(e){
            console.log(e)
            return false
        }
    }

    async borrar(id) {
        let arr=await this.listarAll()
        let productFound=arr.find(prod=>prod.id==id)
        if(!productFound)return false
        let newArr=arr.filter(obj=>obj.id!=id)
        let str=JSON.stringify(newArr)
        try{
            await fs.writeFile(this.path,str)
            return true
        }catch(e){
            console.log(e)
            return false
        }
    }

    async borrarAll() {
        try{
            await fs.writeFile(this.path,'[]')
        }catch(e){
            console.log(e)
        }
    }
}


export default ContenedorArchivo