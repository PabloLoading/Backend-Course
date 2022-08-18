const { promises: fs } = require('fs')

class ContenedorArchivo {

    constructor(path){
        this.path=path
    }
    guardar= async (obj)=>{
        let arr=await this.listarAll()
        if(arr=='')arr=[]
        let newId= arr.length==0 ? 1 : arr[arr.length-1].id+1
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
        let newArr=arr.filter(obj=>obj.id!=id)
        let str=JSON.stringify(newArr)
        try{
            await fs.writeFile(this.path,str)
        }catch(e){
            console.log(e)
        }

    }
    borrarTodo= async ()=>{
        try{
            await fs.writeFile(this.path,'[]')
        }catch(e){
            console.log(e)
        }
        
    }
    
}

module.exports = ContenedorArchivo