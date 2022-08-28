const { promises: fs } = require('fs')

class ContenedorArchivo {

    constructor(path){
        this.path=path
        this.lastId=0
    }
    guardar= async (obj)=>{
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
    listar=async (id)=>{
        let arr=await this.listarAll()
        return arr.find(obj=>obj.id==id)
    }
    listarAll=async ()=>{
        try{
            const arr=await fs.readFile(this.path)
            return JSON.parse(arr)
        }catch(e){
            console.log(e)
            return []
        }
    } 
    borrar=async (id)=>{
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
    borrarTodo= async ()=>{
        try{
            await fs.writeFile(this.path,'[]')
        }catch(e){
            console.log(e)
        }
        
    }
    actualizar=async(id,obj)=>{
        let arr=await this.listarAll()
        if(arr=='')arr=[]
        let newObj={...obj,id}
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
    
}

module.exports = ContenedorArchivo