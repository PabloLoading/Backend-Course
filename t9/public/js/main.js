
const socket = io.connect();

//------------------------------------------------------------------------------------

const formAgregarProducto = document.getElementById('formAgregarProducto')
formAgregarProducto.addEventListener('submit', e => {
    e.preventDefault()
    const producto = {
        nombre: document.getElementById('nombre').value,
        precio: document.getElementById('precio').value,
        foto: document.getElementById('foto').value
    }
    socket.emit('new-product', producto);
    formAgregarProducto.reset()
})

socket.on('products', productos => {
    makeHtmlTable(productos).then(html => {
        document.getElementById('productos').innerHTML = html
    })
});

function makeHtmlTable(productos) {
    return fetch('../plantillas/tabla-productos.hbs')
        .then(respuesta => respuesta.text())
        .then(plantilla => {
            const template = Handlebars.compile(plantilla);
            const html = template({ productos })
            return html
        })
}


/* --------------------- DESNORMALIZACIÓN DE MENSAJES ---------------------------- */

const {schema,denormalize} = normalizr

const authorSchemaa = new schema.Entity('authors',undefined,{idAttribute:'email'})

const messageSchema = new schema.Entity('mensajes',{
    author:authorSchemaa
},{idAttribute:'_id'})

const postSchema = new schema.Entity('posts',{
    messages:[messageSchema]    
})

const getDesnorm=data=>{
    return denormalize(data.result,postSchema,data.entities)
}

/* ----------------------------------------------------------------------------- */

const inputUsername = document.getElementById('username')
const inputMensaje = document.getElementById('inputMensaje')
const btnEnviar = document.getElementById('btnEnviar')

const formPublicarMensaje = document.getElementById('formPublicarMensaje')
formPublicarMensaje.addEventListener('submit', e => {
    e.preventDefault()

    const mensaje = {
        author: {
            email: inputUsername.value,
            nombre: document.getElementById('firstname').value,
            apellido: document.getElementById('lastname').value,
            edad: document.getElementById('age').value,
            alias: document.getElementById('alias').value,
            avatar: document.getElementById('avatar').value
        },
        fyh:new Date().toLocaleString(), 
        text: inputMensaje.value
    }

    socket.emit('new-msg', mensaje);
    formPublicarMensaje.reset()
    inputMensaje.focus()
})

socket.on('messages', (mensajesNorm,mensajesLength) => {

    const porcentajeC=Math.trunc((JSON.stringify(mensajesNorm).length/mensajesLength)*100)
    console.log(`Porcentaje de compresión ${porcentajeC}%`)
    document.getElementById('compresion-info').innerText = porcentajeC
    const mensajesDesnorm=getDesnorm(mensajesNorm).messages
    const html = makeHtmlList(mensajesDesnorm)
    document.getElementById('mensajes').innerHTML = html;
})

function makeHtmlList(mensajes) {
    return mensajes.map(mensaje => {
        return (`
            <div>
                <b style="color:blue;">${mensaje.author.email}</b>
                [<span style="color:brown;">${mensaje.fyh}</span>] :
                <i style="color:green;">${mensaje.text}</i>
                <img width="50" src="${mensaje.author.avatar}" alt=" ">
            </div>
        `)
    }).join(" ");
}

inputUsername.addEventListener('input', () => {
    const hayEmail = inputUsername.value.length
    const hayTexto = inputMensaje.value.length
    inputMensaje.disabled = !hayEmail
    btnEnviar.disabled = !hayEmail || !hayTexto
})

inputMensaje.addEventListener('input', () => {
    const hayTexto = inputMensaje.value.length
    btnEnviar.disabled = !hayTexto
})
