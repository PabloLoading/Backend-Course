
export const knexMysql={
    client:'mysql',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password:'',
        database: 'ecommerce'
    }
}
export const knexSqlite={
    client:'sqlite3',
    connection: {
        filename: '../db/mydb.sqlite'
    },
    useNullAsDefault: true
}
export const mongodb= {
    cnxStr: 'mongodb://localhost/ecommerce',
    options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000,
    }
}