const admin=true

const checkAdmin=(req,res,next)=>{
    if(!admin){
        res.send({error:-1,descripcion: `ruta ${req.originalUrl} metodo ${req.method} no autorizado`})
    }
    else next()
}
export default checkAdmin