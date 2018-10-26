const WebSocket = require('ws');

let server = "ws://127.0.0.1:8081";

let ws = new WebSocket(server);

ws.binaryType = "nodebuffer";
ws.onopen = () => {
    console.log('Verbindet mit Server!');
}

ws.onerror = () => {
    console.log('Fehler bei der Verbindung!');
}

ws.onmessage = (msg) => {
    let opcode = msg.data.readUInt8(0);
    
    switch (opcode) {
        case 0: 
            if (msg.data.readUInt8(1) == 0) console.log('Maximale Verbindungen erreicht! -> disconnect')
        break;
    }
}

ws.onclose = () => {

}
