import express from 'express'
import productsRouter from './Routers/productsRouter.js'
import cartsRouter from './Routers/cartsRouter.js'
import dotenv from 'dotenv'

dotenv.config();

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.use('/api/productos', productsRouter)
app.use('/api/carritos', cartsRouter)

export default app