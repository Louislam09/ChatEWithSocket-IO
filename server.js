const express = require('express');
const path = require('path');

const app = express();

const server = app.listen(3000, () => {
	console.log('my server is running well !!');
});

app.use(express.static('public'));
// app.use(express.static(path.join(__dirname, 'public')));

const socket = require('socket.io');

// var io = socket.listen(server);
const io = socket(server);

// This listen new connection to my server
io.sockets.on('connection', (socket) => {
	console.log('New connection ', socket.id);

	socket.on('chat:message', (data) => {
		io.sockets.emit('chat:message', data);
	});

	socket.on('chat:typing', (data) => {
		socket.broadcast.emit('chat:typing', data);
	});
});
