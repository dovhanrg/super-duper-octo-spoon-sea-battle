import {init} from "./init.js";
import {pong} from "./pong.js";


export const webSocketRouter = (ws, obj) => {
    if (obj && typeof obj === 'object' && obj.type) {
        switch (obj.type) {
            case 'init':
                init(ws, obj);
                break;
            case 'ping':
                pong(ws);
            break;
            case 'playerStarted':
                ws.send(JSON.stringify({type: 'playerStarted_resp'})); // TODO: move to fn
                break;
            default:
                ws.send(JSON.stringify({status: 'failed', payload: {message: 'Not supported message type'}})); // TODO: move to fn
        }
    }
};
