const WebSocket = require('ws');
const fs = require('fs')
const messageHandler = require('./messageHandler.js');

let port = 8081;
let maxConnections = 30;
let currentConnections = 0;
let ipsConnected = [];

const wss = new WebSocket.Server({
    port: port
})

wss.on('connection', ws => {
    currentConnections++
    if (currentConnections > maxConnections) ws.send([0, 0]); ws.close(); currentConnections--;
    if (ws._socket.remoteAddress !== '::ffff:127.0.0.1') {
    if (ipsConnected.includes(ws._socket.remoteAddress)) ws.send([0, 1]); ws.close(); currentConnections--;
    }
    ipsConnected.push(ws._socket.remoteAddress);
    console.log(`WSS -> Verbindung von IP ${ws._socket.remoteAddress}! (${currentConnections}/${maxConnections})`);
    ws.connectionID = currentConnections;
    ws.messageHandler = new messageHandler(ws);
    console.log(ws.messageHandler.ws._closeCode)
    ws.on('close', () => {
        ws.messageHandler.onclose();
        ipsConnected.splice(ipsConnected.indexOf(ws._socket.remoteAddress), 1);
        currentConnections--
        console.log(`WSS -> Verbindung zu IP ${ws._socket.remoteAddress} abgebrochen! (${currentConnections}/${maxConnections})`);
    })
})

console.log(`WebSocketServer gestarted! Port: ${port}, maximale Verbindungen: ${maxConnections}`);