import * as io from 'socket.io-client'
let socket;

function openConnection(url) {
    socket = io(url);
}

function subscribeToUpdates(companies){
    socket.on('connect', () => {
        socket.emit('subscribe', 'aapl')
    })
    socket.on('message', message => console.log(JSON.parse(message)))
}

function listenToUpdates() {
    socket.on('message', message => console.log(JSON.parse(message)))
}

export { openConnection, subscribeToUpdates, listenToUpdates }