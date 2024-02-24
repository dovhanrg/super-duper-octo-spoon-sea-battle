import onReceive from "../model/actions/onReceive";
import {messageType, REMOTE_ADDR} from "../consts";

const messages: MessageType[] = [];

let isConnected = false;
let socket: WebSocket | null = null;

function connect() {
    socket = new WebSocket(REMOTE_ADDR);
    socket.onopen = () => {
        isConnected = true;
        console.log("[open] Connection established", socket?.readyState, messages);
        if (messages.length) {
            messages.forEach((message) => sendMessage(message));
        }
    };

    socket.onmessage = (event) => {
        console.log(`[message] Data received from server: ${event.data}`);
        onReceive(event.data);
    };


    socket.onclose = (event) => {
        isConnected = false;
        if (event.wasClean) {
            console.log(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
        } else {
            // e.g. server process killed or network down
            // event.code is usually 1006 in this case
            console.log('[close] Connection died');
            connect();
        }
    };

    socket.onerror = (error) => {
        console.log(`[error]`, error);
        // wrapper.onError();
    };
}

connect();


export type MessageType = {
    type: keyof typeof messageType;
    [p: string]: unknown;
};

export const sendMessage = (message: MessageType) => {
    console.log('trying to send message: ', socket?.readyState, message);
    if (socket && socket.readyState === 1) {
        socket.send(JSON.stringify(message));
    } else {
        messages.push(message);
    }
};

const pingPong = () => {
    setInterval(() => {
        if (isConnected) {
            sendMessage({type: 'ping'});
        }
    }, 5000);
}

pingPong();
