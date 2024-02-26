import {init} from "./init.js";
import {pong} from "./pong.js";
import {ready} from "./ready.js";

/**
 *
 * @param {WebSocket} ws
 * @param obj
 * @return void
 */
export const webSocketRouter = (ws, obj) => {
    if (obj && typeof obj === 'object' && obj.type) {
        switch (obj.type) {
            case 'init':
                init(ws, obj);
                break;
            case 'ping':
                pong(ws);
            break;
            case 'playerReady':
                ready(ws, obj);
                break;
            default:
                ws.send(JSON.stringify({status: 'failed', payload: {message: 'Not supported message type'}})); // TODO: move to fn
        }
    }
};
