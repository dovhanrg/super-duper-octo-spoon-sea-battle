import {init} from "./init.js";


export const webSocketRouter = (ws, obj) => {
    if (obj && typeof obj === 'object' && obj.type) {
        switch (obj.type) {
            case 'init':
                init(ws, obj);
                break;
            default:
                ws.send(JSON.stringify({status: 'failed', payload: {message: 'Not supported message type'}})); // TODO: move to fn
        }
    }
};
