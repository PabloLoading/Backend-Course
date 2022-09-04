import knex from "knex"
import { knexMysql,knexSqlite } from "../options.js"
const mysql=knex(knexMysql)
const sqlite=knex(knexSqlite)

const createTables=async ()=>{
    try{
        await mysql.schema.createTable('productos',table=>{
            table.increments('id')
            table.string('nombre')
            table.integer('precio')
            table.string('foto')
        })
        console.log('product table generated correctly')
    }catch(e){console.log('error generating products table: '+e.code)}
    try{
        await sqlite.schema.createTable('mensajes',table=>{
            table.increments('id')
            table.string('user')
            table.integer('text')
            table.string('date')
        })
        console.log('messages table generated correctly')
    }catch(e){console.log('error generating messages table: '+e.code)}
}
createTables()