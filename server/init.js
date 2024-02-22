import {state} from "./state.js";
import {randomUUID} from "node:crypto";


export const init = (ws, obj) => {
    console.log('init request received: ', obj);
    if ('id' in obj && obj.id in state) {
        state[obj.id] = {
            ...state[obj.id],
            timestamp: new Date(),
            ...obj,
        };
        ws.send(JSON.stringify({
            type: 'init_resp',
            status: 'success',
            id: state[obj.id].id,
            message: 'updated session timestamp ' + new Date(),}));
    } else {
        const id = randomUUID();
        state[id] = {
            timestamp: new Date(),
            id,
            ...obj,
        };
        ws.send(JSON.stringify({
            type: 'init_resp',
            status: 'success',
            id,
            message: 'initialised session id'
        }));
    }
    console.log(state);
}