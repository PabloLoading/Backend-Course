const {promises:fs} = require('fs')

class Contenedor{
    constructor(path){
        this.path=path
    }
    save= async (obj)=>{
        let arr=await this.getAll()
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
    getById=async (id)=>{
        let arr=await this.getAll()
        return arr.find(obj=>obj.id==id)
    }
    getAll=async ()=>{
        try{
            const arr=await fs.readFile(this.path)
            return JSON.parse(arr)
        }catch(e){
            console.log(e)
            return []
        }
    } 
    deleteById=async (id)=>{
        let arr=await this.getAll()
        let newArr=arr.filter(obj=>obj.id!=id)
        let str=JSON.stringify(newArr)
        try{
            await fs.writeFile(this.path,str)
        }catch(e){
            console.log(e)
        }

    }
    deleteAll= async ()=>{
        try{
            await fs.writeFile(this.path,'[]')
        }catch(e){
            console.log(e)
        }
        
    } 
}
module.exports=Contenedor