
const lblOnline  = document.querySelector('#lblOnline')
const lblOffline = document.querySelector('#lblOffline')
const txtMensaje = document.querySelector('#txtMensaje')
const btnEnviar  = document.querySelector('#btnEnviar')



const socket  = io()


socket.on('connect', ()=>{

    // console.log('conectado')
    lblOffline.style.display = 'none'
    lblOnline.style.display = ''

})
socket.on('disconnect', ()=>{
    lblOffline.style.display = '' 
    lblOnline.style.display = 'none'
    // console.log('Desconectado')

})
socket.on('enviar-mensaje', (payload)=>{
    console.log(payload)
})

btnEnviar.onclick = () =>{
    const mensaje = txtMensaje.value;

    const payload = {
        mensaje,
        id: '123abc',
        fecha: new Date().getTime()
    }
    socket.emit('enviar-mensaje', payload, ( arg )=>{
        console.log('desde el server', arg)
    })
}