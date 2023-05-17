const express = require('express')
const cors = require('cors');


class Server{
    constructor(){
        this.app = express()
        this.port = process.env.PORT;
        this.server = require('http').createServer(this.app)
        this.io = require('socket.io')(this.server);

        this.paths = { }


        //Middlewares
        this.middlewares();
        
        //Rutas de mi app
        this.routes();

        //Sockets
        this.sockets();
         
    }
    
    middlewares(){
        //CORS
        this.app.use(cors());

        //Directorio público
        this.app.use(express.static('public'))

    
    }

    routes(){
        //this.app.use(this.paths.auth, require('../routes/auth'))
    }

    //Sockets
    sockets(){
        this.io.on("connection", (socket) => {
            console.log('cliente conectado', socket.id)
            socket.on('disconnect', ()=>{
                // console.log('cliente desconectado')
            })

            socket.on('enviar-mensaje', (payload, callback) =>{
                // console.log(payload)
                const id = 123456
                callback({id, fecha: new Date().getTime()})
                this.io.emit('enviar-mensaje', payload)
            })
            
        })
    }


    listen(){
        this.server.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto ${this.port}`)
        })
    }

}




module.exports = Server;



