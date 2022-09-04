const socket = io.connect();

//------------------------------------------------------------------------------------

const formAgregarProducto = document.getElementById('formAgregarProducto')
formAgregarProducto.addEventListener('submit', e => {
    e.preventDefault()
    const producto={
        nombre: document.getElementById('nombre').value,
        precio: document.getElementById('precio').value,
        foto: document.getElementById('foto').value
    }
    socket.emit('new-product',producto)
})

socket.on('products', async productos => {
    let html= await makeHtmlTable(productos)
    document.getElementById('productos').innerHTML=html
    //generar el html y colocarlo en el tag productos llamando al funcion makeHtmlTable
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

//-------------------------------------------------------------------------------------

const inputUsername = document.getElementById('inputUsername')
const inputMensaje = document.getElementById('inputMensaje')
const btnEnviar = document.getElementById('btnEnviar')

const formPublicarMensaje = document.getElementById('formPublicarMensaje')
formPublicarMensaje.addEventListener('submit', e => {
    e.preventDefault()
    const msg={
        user: inputUsername.value,
        text: inputMensaje.value,
        date:new Date().toLocaleString()
    }
    socket.emit('new-msg',msg)
    formPublicarMensaje.reset()
    inputMensaje.focus()
    //Armar el objeto de mensaje y luego emitir mensaje al evento nuevoMensaje con sockets
})

socket.on('mensajes', mensajes => {
    const html = makeHtmlList(mensajes)
    document.getElementById('mensajes').innerHTML = html;
})

function makeHtmlList(mensajes) {
    return mensajes.map(msg=>`<div><span class='user-msg'>${msg.user} </span><span class='date-msg'> [${msg.date}]</span> 
    : <span class='greeny-msg'>${msg.text}</span></div>`).join(' ')
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
