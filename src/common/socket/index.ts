import onReceive from "../model/actions/onReceive";
import {messageType, REMOTE_ADDR, seaBattleUserIDKey} from "../consts";

const messages: MessageType[] = [];

const userID = localStorage.getItem(seaBattleUserIDKey);
console.log({userID});
// TODO: try class for wrapper
// const wrapper = {
//     onSend: (message: SendMessageType) => {
//         socket.send(JSON.stringify(message));
//     },
//     onMessage: (data: string) => {
//
//     },
// };
console.log(REMOTE_ADDR);
const socket = new WebSocket('ws://localhost:8080/ws');

console.log('socket.readyState', socket.readyState);

socket.onopen = () => {
    console.log("[open] Connection established", socket.readyState, messages);
    if (messages.length) {
        messages.forEach((message) => sendMessage(message));
    }
    // if (!userID) {
    //     socket.send(JSON.stringify({type: 'init'}));
    // } else {
    //     socket.send(JSON.stringify({type: 'init', id: userID}));
    // }
};

export type MessageType = {
    type: keyof typeof messageType;
    [p: string]: unknown;
};

export const sendMessage = (message: MessageType) => {
    console.log('trying to send message: ', socket.readyState, message);
    if (socket.readyState !== 1) {
        messages.push(message);
    } else {
        socket.send(JSON.stringify(message));
    }
};

socket.onmessage = (event) => {
    console.log(`[message] Data received from server: ${event.data}`);
    onReceive(event.data);
};
socket.onclose = (event) => {
    if (event.wasClean) {
        console.log(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
    } else {
        // e.g. server process killed or network down
        // event.code is usually 1006 in this case
        console.log('[close] Connection died');
    }
    // wrapper.onClose();
};

socket.onerror = (error) => {
    console.log(`[error]`, error);
    // wrapper.onError();
};