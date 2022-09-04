import knex from "knex"

class knexContainer{
    
    constructor(config,tableName){
        this.knexConnection=knex(config)
        this.tableName=tableName
    }

    guardar= async (obj)=>{
        await this.knexConnection(this.tableName).insert(obj)
        
    }
    listar=async (id)=>{
        const item= this.knexConnection.from(this.tableName).select('*')
        .where('id',id)
        return item
    }
    listarAll=async ()=>{
            const all=await this.knexConnection.from(this.tableName).select('*')
            return all
        
    } 
    borrar=async (id)=>{
        this.knexConnection.from(this.tableName).select('*')
        .where('id',id)
        .del()
    }
    borrarTodo= async ()=>{
        this.knexConnection.from(this.tableName).select('*')
        .del()
    }
}
export default knexContainer