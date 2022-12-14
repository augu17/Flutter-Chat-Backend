const { io } = require('../index');
const { checkJWT } = require('../helpers/jwt');
const { connectedUser, disconnectedUser, addMessage } = require('../controller/socket');

// Mensajes de Sockets
io.on('connection', (client) => {
    console.log('Cliente conectado');

    const [valid, uid] = checkJWT(client.handshake.headers['x-token']);
    // verificar autenticacion
    if (!valid) {
        return client.disconnect();
    }

    //cliente autenticado
    connectedUser(uid);

    //Ingresar a un usuario a una sala
    //sala global, client.id
    client.join(uid);

    //Escuchar del cliente el msg personal
    client.on('personal-msg', (payload) => {

        addMessage(payload);
        io.to(payload.for).emit('personal-msg', payload);
    })

    client.on('disconnect', () => {
        console.log('Cliente desconectado');
        disconnectedUser(uid);
    });

    // client.on('mensaje', (payload) => {
    //     console.log('Mensaje', payload);

    //     io.emit('mensaje', { admin: 'Nuevo mensaje' });

    // });
});
