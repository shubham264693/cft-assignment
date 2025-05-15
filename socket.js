const { Server } = require('socket.io');
const jwt = require('jsonwebtoken');
const activeSessions = require('./utils/activeSessions');

let io;

function initSocket(server) {
    io = new Server(server, {
        cors: {
            origin: '*'
        }
    });

    io.use((socket, next) => {
        const token = socket.handshake.auth.token;
        try {
            const decoded = jwt.verify(token, 'TEST_SECRET');
            if (!activeSessions.isSessionActive(decoded.id, token)) {
                return next(new Error("Session not active. Login again."));
            }
            socket.user = decoded;
            next();
        } catch (err) {
            next(new Error("Authentication failed"));
        }
    });

    io.on('connection', (socket) => {
        console.log(`User ${socket.user.email} connected`);

        socket.on('joinRoom', (room) => {
            socket.join(room);
        });

        socket.on('sendMessage', ({ room, message }) => {
            io.to(room).emit('receiveMessage', { sender: socket.user.email, message });
        });

        socket.on('disconnect', () => {
            console.log(`User ${socket.user.email} disconnected`);
        });
    });
}

module.exports = { initSocket };