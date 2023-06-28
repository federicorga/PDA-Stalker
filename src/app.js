import express from 'express';
import { Server } from 'socket.io';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
import viewsRouter from './routes/views.router.js';

const app = express();

app.use(express.static(`${__dirname}/public`)); // activar el uso de la carpeta estatica public

app.engine('handlebars', handlebars.engine()); //registra el motor de plantilla en este caso handelbars

app.set('views', `${__dirname}/views`); // activar el uso de views

app.set('view engine', 'handlebars'); //decirle a express que use handlebars como motor de plantilla


app.use('/', viewsRouter); // <-- views.router.js se va a renderizar en esta ruta


const server = app.listen(8080, () =>console.log("Server running")); //levantando server en puerto 8080

const io = new Server(server); //usar server con socket.io

//persistimos en memoria los mensajes que se envian al servidor usando array para almacenar

const messages=[];

io.on('connection',socket=>{

    const clientPort = socket.handshake.address; // puerto del cliente que se conecta
    console.log(`Nuevo cliente conectado...IP: ${clientPort}`);
    
  

    socket.on('message', data=>{ //recibo mensaje de usuario recibo datos por eso data
        messages.push(data); //guardo esos mensajes datos en el array
        
        io.emit('messageLogs', messages); // envio un mensajea todos mis usuarios con el array modificado con los mensajes
    });

    socket.on('authenticated',data=>{
        socket.emit('messageLogs',messages); //socket emit se envia al usuairo que se acaba de conectar.
        socket.broadcast.emit('newStalkerConnect',data); //enviamos a todos los usuarios menos al que se acaba de conectar, la conexion del nuevo usuario.
       
    });
})

// levantar server con node src/app.js
