var socket;
var name = prompt('what your name?');
let message = document.getElementById('message');
let btn = document.getElementById('send');
let output = document.getElementById('output');
let actions = document.getElementById('actions');
name = name;

message.focus();

socket = io.connect('http://192.168.43.223:3000');
// socket = io('http://192.168.100.102:3000');

btn.addEventListener('click', () => {
	socket.emit('chat:message', {
		username: name,
		message: message.value
	});
	message.value = '';
});

if (message.value.lenght === 0) actions.innerHTML = '';
message.addEventListener('keypress', () => {
	socket.emit('chat:typing', name);
});

socket.on('chat:message', (data) => {
	actions.innerHTML = '';

	output.innerHTML += `<p>
	<strong>${data.username}: </strong>${data.message}
	</p> &nbsp`;

	output.scrollTop = output.scrollHeight;
});

socket.on('chat:typing', (data) => {
	actions.innerHTML = `<p><em>${data} is typing a message</em></p>`;
});
