const fs = require('fs');

class messageHandler {
    constructor(ws) {
        this.ws = ws;
        this.IP = this.ws._socket.remoteAddress;
        this.handleMessages();
    }

    send(data) {
        if (this.ws && this.ws.readyState == WebSocket.OPEN) this.ws.send(data);
    }

    handleMessages() {
        this.ws.on('message', msg => {
            let buf = msg.data;
            this.onMessage(buf);
          });
    }

    onMessage(data) {
        let opcode = data.readUInt8(0);

        switch (opcode) {
        }
    }

    log(msg) {
        console.log(`WSS-> Client ${this.IP} (${this.ws.connectionID}) > ${msg}`);
    }

    onclose() {
    }
}

module.exports = messageHandler;